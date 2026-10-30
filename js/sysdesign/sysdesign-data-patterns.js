/**
 * MLForge System Design Patterns Catalog
 * Complete architectural patterns repository with problems, workflows, diagrams,
 * pros/cons, use cases, anti-patterns, and interview follow-ups.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sysdesign = window.MLForge.sysdesign || {};
window.MLForge.sysdesign.data = window.MLForge.sysdesign.data || {};

MLForge.sysdesign.data.patterns = [
  {
    id: 'cache-aside',
    name: 'Cache-Aside (Lazy Loading)',
    category: 'Caching',
    problem: 'Directly querying databases for repetitive reads causes high query latency, high CPU load, and limits system throughput.',
    workflow: '1. Application receives read request.\n2. Application checks Cache (Redis).\n3. If Cache Hit: Return cached value immediately.\n4. If Cache Miss: Query Database, store result in Cache with a TTL, and return to client.',
    diagram: `
Client ---> App Server ---> 1. Check Redis? ---> Hit: Return
                   |
                   +-------> 2. Miss: Query DB ---> 3. Write to Redis (TTL)
    `,
    example: 'E-commerce product catalog: Fetching product details by ID `GET /products/123`. Product specs rarely change, so caching for 1 hour saves millions of SQL queries.',
    advantages: [
      'Only requested data is cached, conserving memory.',
      'Node failure resilience: If Redis crashes, application continues functioning by querying the database directly (though with degraded latency).'
    ],
    disadvantages: [
      'Cache Miss Penalty: The first request for any key incurs the overhead of three round-trips (Cache read + DB query + Cache write).',
      'Stale Data Risk: If data is updated directly in DB, cache remains stale until TTL expires unless explicit invalidation is called.'
    ],
    whenToUse: 'General read-heavy workloads where data changes infrequently and temporary slight staleness is acceptable.',
    whenNotToUse: 'Workloads where reads are random and non-repeating (wastes cache memory), or where 100% strict real-time freshness is required.',
    interviewQuestion: 'How do you prevent cache inconsistency in Cache-Aside when an update occurs? Answer: When updating data, update the database first, and then explicitly DELETE (invalidate) the cache key rather than setting the new value. Deleting prevents race conditions between concurrent write threads.'
  },

  {
    id: 'circuit-breaker',
    name: 'Circuit Breaker',
    category: 'Resilience',
    problem: 'When a downstream microservice or external API is failing or slow, upstream services waste threads waiting on timeouts, causing cascading system-wide crashes.',
    workflow: '1. Closed State: Normal operation; requests pass through. Failures increment an error counter.\n2. Open State: When failure percentage crosses threshold (e.g. >50% errors over 10s), the breaker trips Open. All subsequent requests fail immediately without calling the downstream service.\n3. Half-Open State: After a cooldown sleep window (e.g. 30s), trial requests test downstream health. If successful, resets to Closed; if failing, trips back to Open.',
    diagram: `
          +----------------------- Failure Threshold Reached ------------------------+
          |                                                                         |
          v                                                                         |
    +-----------+                  +-------------+                           +------------+
    |   OPEN    | --- Timeout ---> |  HALF-OPEN  | --- Trial Succeeds -----> |   CLOSED   |
    | (Blocked) |     Expires      | (Trial Req) |                           | (Allowed)  |
    +-----------+                  +-------------+                           +------------+
          ^                               |                                         |
          +------- Trial Fails -----------+                                         |
          |                                                                         |
          +----------------------------------- Normal Operation --------------------+
    `,
    example: 'Payment gateway calling Fraud Detection API: If Fraud API times out, Circuit Breaker trips and payments immediately fallback to basic rule-based checks, keeping the checkout funnel open.',
    advantages: [
      'Fails fast in 1ms instead of hanging for 10-second socket timeouts.',
      'Gives struggling downstream services breathing room to recover without being hammered by retries.'
    ],
    disadvantages: [
      'Requires fallback logic for degraded states.',
      'Tuning sensitivity thresholds (timeout duration, error rate %) requires testing under real production traffic.'
    ],
    whenToUse: 'Every synchronous remote network call between microservices or external third-party partner APIs.',
    whenNotToUse: 'Local in-process calls or asynchronous background worker jobs where delayed retries are harmless.',
    interviewQuestion: 'What is the difference between a Circuit Breaker and a Retry with Exponential Backoff? Answer: Retries are for short transient errors (e.g. single dropped packet). Circuit Breakers handle sustained downstream outages by stopping all attempts completely.'
  },

  {
    id: 'rate-limiter-token-bucket',
    name: 'Token Bucket Rate Limiter',
    category: 'Traffic Management',
    problem: 'Malicious attacks, abusive bots, or runaway client loops can overwhelm backend servers with requests (Denial of Service).',
    workflow: '1. A bucket has a maximum capacity of $B$ tokens.\n2. Tokens are added to the bucket at a constant refill rate of $R$ tokens per second.\n3. When a request arrives, the limiter checks for available tokens: if $\\ge 1$, 1 token is consumed and request proceeds; if empty, returns HTTP 429 Too Many Requests.',
    diagram: `
Refill: +R tokens/sec ---------> +-------------------+
                                 |  Bucket Capacity  |
                                 |       (B=10)      |
                                 |  [T] [T] [T] [T]  |
                                 +-------------------+
                                           |
Incoming Request -----------------> 1 Token Consumed?
                                     /             \\
                              Yes: Process     No: 429 Too Many Requests
    `,
    example: 'Public API Rate Limiting: GitHub allows 5,000 requests per hour per user. Using Token Bucket, users can send short bursts of 10 requests at once, provided average sustained traffic stays within limits.',
    advantages: [
      'Memory efficient: Only requires storing two numbers per user (token count and last refill timestamp).',
      'Allows natural traffic bursts without rejecting legitimate rapid user clicks.'
    ],
    disadvantages: [
      'Race conditions in distributed environments if multiple servers check tokens concurrently without atomic Redis Lua scripts.',
      'Cannot guarantee perfectly smooth traffic flow compared to Leaky Bucket.'
    ],
    whenToUse: 'API gateways, public SaaS endpoints, login endpoint brute-force protection.',
    whenNotToUse: 'Where traffic must be strictly smoothed without any bursts (use Leaky Bucket instead).',
    interviewQuestion: 'How do you implement a distributed Token Bucket in Redis for 100 API gateway nodes? Answer: Execute a Redis Lua script containing the token calculation. Because Redis executes Lua scripts atomically on a single thread, it eliminates race conditions without distributed locks.'
  },

  {
    id: 'transactional-outbox',
    name: 'Transactional Outbox Pattern',
    category: 'Data & Messaging',
    problem: 'Updating a database and publishing an event to Kafka in two separate steps risks partial failure: the database write commits, but network fails before publishing to Kafka (Dual-Write Problem).',
    workflow: '1. Within a single local ACID database transaction, write business data to the primary table AND insert the event into an `outbox` table in the same database.\n2. A separate background process (or Change Data Capture tool like Debezium) reads new records from the `outbox` table and publishes them to the message broker (Kafka).\n3. Once successfully published, mark the outbox record as processed or delete it.',
    diagram: `
+------------------- Single Local ACID Transaction --------------------+
|                                                                      |
|  1. INSERT INTO orders (...)      2. INSERT INTO outbox_events (...) |
|     (Primary Business Table)         (Pending Event Message)         |
+----------------------------------------------------------------------+
                                                          |
                                           3. Polling or CDC (Debezium)
                                                          v
                                               +----------------------+
                                               |  Kafka / Event Bus   |
                                               +----------------------+
    `,
    example: 'Order checkout in microservices: Saving the `Order` record and publishing `OrderCreatedEvent` to notify Inventory and Payment services must be 100% atomic.',
    advantages: [
      'Guarantees at-least-once message publishing without distributed 2-Phase Commit (2PC) transactions.',
      'Works with standard relational databases (PostgreSQL, MySQL) using existing transaction mechanisms.'
    ],
    disadvantages: [
      'Outbox table requires ongoing cleanup/pruning to prevent runaway table size.',
      'Downstream consumers must be idempotent to handle potential duplicate events.'
    ],
    whenToUse: 'Any event-driven microservice architecture that updates local state and must notify other services via message queues.',
    whenNotToUse: 'Systems where eventual consistency is unacceptable and synchronous two-phase locking is legally mandated.',
    interviewQuestion: 'Why is Polling the outbox table worse than Log-based CDC (Change Data Capture)? Answer: Polling introduces database query overhead and latency delay (e.g. every 1s). CDC reads the database Write-Ahead Log (WAL) directly at the storage level with zero query load and sub-second event streaming.'
  },

  {
    id: 'cqrs',
    name: 'CQRS (Command Query Responsibility Segregation)',
    category: 'Architecture',
    problem: 'Complex applications have radically different access patterns for writes (strict validation, normalization) versus reads (complex filters, aggregations, high concurrency). A single database model becomes bottlenecked trying to do both.',
    workflow: '1. Commands (Write Model): Handle `CreateOrder`, `UpdateProfile`. Validates business rules, enforces invariants, and writes to a normalized relational database (PostgreSQL).\n2. Read Model: An event bus streams changes to a denormalized read-optimized store (Elasticsearch or Redis).\n3. Queries (Read Model): Read requests hit the read store directly with fast, pre-indexed lookups without touching the write database.',
    diagram: `
Command (Write) ---> [ Command Handler ] ---> [ Primary DB (SQL) ]
                                                      |
                                            Event Published / CDC
                                                      v
Query (Read) <------ [ Read Model ] <-------- [ Elasticsearch / Read Store ]
    `,
    example: 'E-commerce Search & Product Catalog: Adding a product (Write) validates inventory in PostgreSQL. Searching for products with 20 filters and facets (Read) queries an Elasticsearch cluster synchronized via events.',
    advantages: [
      'Independent scaling of read and write workloads.',
      'Optimized data schemas: normalized 3NF for writes, flat denormalized JSON for reads.'
    ],
    disadvantages: [
      'Eventual Consistency: The read model lags slightly behind the write model (replication lag).',
      'High architectural and maintenance complexity.'
    ],
    whenToUse: 'High-traffic systems with high read-to-write ratios ($> 100:1$) and complex multi-facet querying.',
    whenNotToUse: 'Simple CRUD applications where a single relational database with basic indexing is more than fast enough.',
    interviewQuestion: 'How does CQRS handle "Read-Your-Own-Writes" consistency when a user updates their profile and immediately views the page? Answer: Return the updated data directly in the write command response, or configure the client to read from the primary write database for 5 seconds after a user update before reverting to the read replica.'
  },

  {
    id: 'saga-pattern',
    name: 'Saga Pattern (Distributed Transactions)',
    category: 'Architecture',
    problem: 'In microservices with independent databases, traditional distributed ACID transactions (2PC - Two-Phase Commit) lock database rows across services, crippling performance and causing deadlocks.',
    workflow: '1. Decomposes a distributed transaction into a sequence of local transactions.\n2. Each local transaction updates its database and publishes an event or message.\n3. The next service listens to the event and executes its local transaction.\n4. If a step fails (e.g., payment declined), compensating transactions execute backward (e.g., cancel reserved hotel room, refund points) to undo changes.',
    diagram: `
HAPPY PATH:
[ Order Service ] -- 1. Create Order --> [ Payment Service ] -- 2. Charge Card --> [ Shipping Service ]

FAILURE & COMPENSATING TRANSACTIONS:
[ Order Service ] <--- 4. Cancel Order <--- [ Payment Service ] <--- 3. Out of Stock! --- [ Shipping Service ]
    `,
    example: 'Booking a travel vacation: 1. Reserve flight -> 2. Reserve hotel -> 3. Charge credit card. If credit card charge fails, cancel hotel reservation and cancel flight seat reservation.',
    advantages: [
      'Eliminates blocking 2-Phase Commit database locks across microservices.',
      'Supports long-running business workflows that take minutes or hours.'
    ],
    disadvantages: [
      'Requires writing compensating rollback logic for every single business transaction.',
      'Data is eventually consistent; intermediate states are visible to other queries (lack of transaction Isolation).'
    ],
    whenToUse: 'Distributed business workflows requiring multi-service coordination.',
    whenNotToUse: 'When an all-or-nothing guarantee is required within a single service (use standard database transactions instead).',
    interviewQuestion: 'What are the two styles of Saga implementation: Choreography vs Orchestration? Answer: Choreography has services listen to events and decide the next step independently (decentralized, good for simple workflows). Orchestration uses a centralized coordinator service (like Temporal or AWS Step Functions) that explicitly commands each service what to do next (easier to monitor and manage for complex flows).'
  },

  {
    id: 'strangler-fig',
    name: 'Strangler Fig Pattern (Monolith Migration)',
    category: 'Migration',
    problem: 'Rewriting a giant legacy monolithic application from scratch (the "Big Bang" rewrite) usually takes years, exceeds budget, and has an extremely high rate of catastrophic failure.',
    workflow: '1. Place an API Gateway / Reverse Proxy in front of the existing legacy monolith.\n2. Identify a single bounded domain to extract (e.g. Notifications or User Reviews).\n3. Build the new microservice independently.\n4. Configure the API Gateway to route `/api/notifications` traffic to the new microservice while sending all other routes to the legacy monolith.\n5. Repeat step by step until the monolith is completely replaced and can be decommissioned.',
    diagram: `
Client ---> [ API Gateway / Reverse Proxy ]
                     /                \\
       (New Routes) /                  \\ (Legacy Routes)
                   v                    v
          [ New Microservice ]    [ Legacy Monolith ]
          (Grows over time)       (Shrinks over time until zero)
    `,
    example: 'E-commerce platform migration: Extracting the Reviews service first, then Search, then Payments, gradually strangling the legacy monolith without downtime.',
    advantages: [
      'Zero downtime during multi-year architecture migrations.',
      'Immediate delivery of business value in weeks instead of waiting years for a full rewrite.'
    ],
    disadvantages: [
      'Requires maintaining data synchronization between old and new databases during the transition.',
      'Running dual systems increases operational complexity.'
    ],
    whenToUse: 'Modernizing legacy mission-critical monolithic systems.',
    whenNotToUse: 'Small monoliths where team size is under 5 engineers and modular code refactoring is sufficient.',
    interviewQuestion: 'How do you handle shared database tables between the old monolith and a new microservice during Strangler migration? Answer: Use Change Data Capture (CDC) or database triggers to bi-directionally sync records between the legacy table and the new service’s private database until the cutover is complete.'
  },

  {
    id: 'consistent-hashing',
    name: 'Consistent Hashing',
    category: 'Distributed Systems',
    problem: 'Using traditional modular hashing (`server = hash(key) % N`) to distribute keys across $N$ cache servers causes almost ALL keys (typically $\\approx N/(N+1)$) to remap when a server is added or removed, causing massive cache stampedes and database crashes.',
    workflow: '1. Map both servers and keys onto a circular hash ring (0 to $2^{32}-1$) using the same hash function (MD5/SHA-1).\n2. To find which server holds a key, hash the key to a position on the ring and walk clockwise until finding the first server node.\n3. Virtual Nodes (Vnodes): Each physical server is assigned multiple positions (e.g. 100-200 virtual nodes) across the ring to ensure even, balanced distribution.',
    diagram: `
HASH RING (0 to 2^32 - 1):
                      [ Server A ] (pos 0)
                     /            \\
          (Key 1) *                 \\
                 /                    * (Key 2)
       [ Server C ] (pos 240)          \\
                 \\                     [ Server B ] (pos 120)
                   * (Key 3)          /
                     \\               /
                      +-------------+
    Adding Server D only remaps keys between C and D, leaving other servers untouched!
    `,
    example: 'Distributed Caching (Memcached/Redis clusters) and Distributed Key-Value stores (Amazon DynamoDB, Apache Cassandra).',
    advantages: [
      'Minimal key redistribution: When adding/removing 1 node from $N$ nodes, only $1/N$ of keys are moved on average.',
      'Virtual nodes prevent hot spots and uneven load distributions.'
    ],
    disadvantages: [
      'More complex to implement and maintain than simple modulo arithmetic.'
    ],
    whenToUse: 'Distributed caches, DHTs (Distributed Hash Tables), load balancers with sticky sessions, and partition routers.',
    whenNotToUse: 'Small, static systems with a fixed number of servers that never scale up or down.',
    interviewQuestion: 'Why are Virtual Nodes essential in Consistent Hashing? Answer: Without virtual nodes, physical servers end up non-uniformly spaced around the ring, causing one server to be responsible for 60% of the ring circumference (a hot spot). Virtual nodes replicate each physical server across 150 points on the ring, statistically guaranteeing an even traffic spread within ~5% variation.'
  }
];

