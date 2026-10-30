/**
 * MLForge System Design Glossary & Quick Revision Data
 * Searchable terminology catalog with clear definitions, practical examples,
 * and high-yield architectural revision sheets.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sysdesign = window.MLForge.sysdesign || {};
window.MLForge.sysdesign.data = window.MLForge.sysdesign.data || {};

MLForge.sysdesign.data.glossary = [
  {
    term: 'API Gateway',
    category: 'Architecture',
    definition: 'A single entry-point reverse proxy that sits between clients and microservices, handling routing, authentication, rate limiting, and request transformation.',
    example: 'AWS API Gateway, Kong, or Nginx routing `/api/v1/checkout` to the Payment Microservice while validating JWT tokens.',
    related: ['Microservices', 'Reverse Proxy', 'Rate Limiting'],
    topicLink: '#sysdesign/topic/api-design-rest'
  },
  {
    term: 'Availability',
    category: 'Reliability',
    definition: 'The percentage of time a system remains operational and accessible to process requests over a given period (often expressed in "nines").',
    example: '99.99% availability ("Four Nines") allows at most 52.6 minutes of unscheduled downtime across an entire calendar year.',
    related: ['Fault Tolerance', 'SLA', 'SLO'],
    topicLink: '#sysdesign/topic/reliability-patterns'
  },
  {
    term: 'Backpressure',
    category: 'Messaging',
    definition: 'A flow-control mechanism where a downstream system signals an upstream producer to slow down or pause message transmission when incoming traffic exceeds processing capacity.',
    example: 'A consumer worker signaling a Kafka broker to pause polling while it catches up on writing to a saturated database.',
    related: ['Message Queue', 'Throughput', 'Circuit Breaker'],
    topicLink: '#sysdesign/topic/message-queues-kafka'
  },
  {
    term: 'CAP Theorem',
    category: 'Distributed Systems',
    definition: 'The principle that a distributed data store can simultaneously provide at most two of three guarantees: Consistency, Availability, and Partition Tolerance.',
    example: 'During a cross-datacenter network fiber cut, MongoDB defaults to CP (refusing writes on minority partitions), while Cassandra defaults to AP (accepting writes on both sides).',
    related: ['Partition Tolerance', 'Eventual Consistency', 'Quorum'],
    topicLink: '#sysdesign/topic/cap-theorem'
  },
  {
    term: 'Circuit Breaker',
    category: 'Resilience',
    definition: 'A design pattern that monitors remote calls and automatically trips Open after a failure threshold is crossed, failing fast to prevent cascading system collapse.',
    example: 'If an external credit scoring API times out for 50% of requests, the circuit breaker stops calling it for 30 seconds and returns fallback estimates.',
    related: ['Bulkhead', 'Exponential Backoff', 'Fault Tolerance'],
    topicLink: '#sysdesign/topic/reliability-patterns'
  },
  {
    term: 'Consistent Hashing',
    category: 'Distributed Systems',
    definition: 'A distributed hashing algorithm that maps both server nodes and data keys to a circular ring, ensuring that adding or removing a node only requires moving $K/N$ keys.',
    example: 'DynamoDB and Memcached clusters using virtual nodes on a hash ring so resizing a cache cluster does not evict all cached data.',
    related: ['Database Sharding', 'Load Balancing', 'Cache Stampede'],
    topicLink: '#sysdesign/topic/database-sharding'
  },
  {
    term: 'CQRS (Command Query Responsibility Segregation)',
    category: 'Architecture',
    definition: 'An architectural pattern that separates operations that mutate data (Commands) from operations that read data (Queries) into distinct models.',
    example: 'Writing e-commerce orders into PostgreSQL (Command) and querying catalog search with facets in Elasticsearch (Query).',
    related: ['Event Sourcing', 'Materialized Views', 'Read Replicas'],
    topicLink: '#sysdesign/topic/microservices-architecture'
  },
  {
    term: 'Database Sharding',
    category: 'Databases',
    definition: 'Horizontal partitioning of a database table across multiple independent physical database servers based on a shard key.',
    example: 'Partitioning a 100-million user table so Users with IDs 1-50M reside on Shard 1, and 50M-100M reside on Shard 2.',
    related: ['Horizontal Scaling', 'Consistent Hashing', 'Replication'],
    topicLink: '#sysdesign/topic/database-sharding'
  },
  {
    term: 'Dead-Letter Queue (DLQ)',
    category: 'Messaging',
    definition: 'A specialized holding queue where a message broker automatically isolates messages that repeatedly fail processing after a maximum retry threshold.',
    example: 'An invoice message containing corrupt JSON that crashes worker parsers is diverted to a DLQ for developer debugging.',
    related: ['Message Queue', 'Idempotency', 'Poison Message'],
    topicLink: '#sysdesign/topic/message-queues-kafka'
  },
  {
    term: 'Eventual Consistency',
    category: 'Distributed Systems',
    definition: 'A consistency model where, in the absence of new updates, all replicas across a distributed system will eventually converge to display the same data value.',
    example: 'YouTube view counts or Twitter follower numbers: when someone clicks subscribe, other users may see the count update a few seconds later.',
    related: ['CAP Theorem', 'Strong Consistency', 'Replication Lag'],
    topicLink: '#sysdesign/topic/cap-theorem'
  },
  {
    term: 'Horizontal Scaling (Scale Out)',
    category: 'Fundamentals',
    definition: 'Increasing system capacity by adding more individual machines or virtual instances to an interconnected pool behind a load balancer.',
    example: 'Spinning up 20 additional stateless container instances in Kubernetes when Black Friday shopping traffic spikes.',
    related: ['Vertical Scaling', 'Load Balancer', 'Stateless Architecture'],
    topicLink: '#sysdesign/topic/horizontal-vs-vertical-scaling'
  },
  {
    term: 'Idempotency',
    category: 'API Design',
    definition: 'The property of an operation where executing it multiple times consecutively produces the exact same outcome as executing it once, without unintended side effects.',
    example: 'An API endpoint `POST /payments/charge` that takes an `Idempotency-Key` header so network retries never double-charge a customer.',
    related: ['REST', 'HTTP Verbs', 'Transactional Outbox'],
    topicLink: '#sysdesign/topic/api-design-rest'
  },
  {
    term: 'Latency',
    category: 'Fundamentals',
    definition: 'The duration of time it takes for a data packet or request to travel from its source to its destination and return a response (typically measured in milliseconds).',
    example: 'A user clicking "Add to Cart" and waiting 85ms for the confirmation badge to appear.',
    related: ['Throughput', 'p99 Percentile', 'RTT'],
    topicLink: '#sysdesign/topic/latency-vs-throughput'
  },
  {
    term: 'Load Balancer',
    category: 'Load Balancing',
    definition: 'A reverse proxy device or software that distributes incoming network traffic across multiple backend servers based on algorithms and health checks.',
    example: 'An AWS Application Load Balancer (ALB) routing incoming HTTPS traffic across 10 EC2 instances using Least Connections.',
    related: ['Reverse Proxy', 'Layer 4 vs Layer 7', 'Round Robin'],
    topicLink: '#sysdesign/topic/load-balancing-algorithms'
  },
  {
    term: 'Little\'s Law',
    category: 'Scalability',
    definition: 'A fundamental queuing formula stating that the long-term average number of items $L$ in a stationary queueing system is equal to the arrival rate $\\lambda$ multiplied by the average time $W$ spent in the system: $L = \\lambda \\times W$.',
    example: 'If an API receives 500 requests per second ($\\lambda = 500$) and average request latency is 0.2 seconds ($W = 0.2s$), the server fleet must concurrently hold $L = 500 \\times 0.2 = 100$ concurrent requests.',
    related: ['Throughput', 'Latency', 'Capacity Planning'],
    topicLink: '#sysdesign/topic/latency-vs-throughput'
  },
  {
    term: 'RPO (Recovery Point Objective)',
    category: 'Reliability',
    definition: 'The maximum acceptable age of files or data that must be recovered from backup storage for normal operations to resume after a disaster (measures data loss).',
    example: 'If a database is backed up hourly, an outage at 2:50 PM with backup at 2:00 PM means up to 50 minutes of data is permanently lost (RPO = 1 hour).',
    related: ['RTO', 'Disaster Recovery', 'High Availability'],
    topicLink: '#sysdesign/topic/reliability-patterns'
  },
  {
    term: 'RTO (Recovery Time Objective)',
    category: 'Reliability',
    definition: 'The maximum acceptable duration of clock time that can elapse between an outage and the full restoration of service (measures downtime duration).',
    example: 'An RTO target of 15 minutes means engineering must failover to backup servers and restore live traffic within 15 minutes of an incident.',
    related: ['RPO', 'Availability', 'Failover'],
    topicLink: '#sysdesign/topic/reliability-patterns'
  },
  {
    term: 'SLA / SLO / SLI',
    category: 'Observability',
    definition: 'SLI (Service Level Indicator) is the real-time measured metric. SLO (Service Level Objective) is the internal target goal. SLA (Service Level Agreement) is the legal contract with customers with financial penalties for failure.',
    example: 'SLI: Current month latency is 45ms. SLO: Internal goal of 99.9% requests < 100ms. SLA: Legal promise of 99.5% uptime or customers receive a 15% billing credit.',
    related: ['Availability', 'Error Budget', 'Observability'],
    topicLink: '#sysdesign/topic/observability-metrics'
  },
  {
    term: 'Throughput',
    category: 'Fundamentals',
    definition: 'The total volume of requests or data units a system can successfully process within a given time frame (measured in requests/sec or megabytes/sec).',
    example: 'A payment gateway cluster successfully processing 12,500 credit card authorizations per second at peak Black Friday load.',
    related: ['Latency', 'RPS', 'Bandwidth'],
    topicLink: '#sysdesign/topic/latency-vs-throughput'
  },
  {
    term: 'WebSocket',
    category: 'Networking',
    definition: 'A communication protocol providing full-duplex, bi-directional, persistent TCP communication channels over a single socket connection.',
    example: 'A live multiplayer game or online chat app where both player movement and chat text stream continuously in real time.',
    related: ['Server-Sent Events', 'Polling', 'TCP'],
    topicLink: '#sysdesign/topic/websockets-vs-sse'
  }
];

MLForge.sysdesign.data.quickRevisionSheets = [
  {
    id: 'cap-cheat-sheet',
    title: 'CAP Theorem Decision Matrix',
    content: `
| System Category | Trade-Off | Primary Guarantee | Typical Databases | Best Use Cases |
| :--- | :--- | :--- | :--- | :--- |
| **CP System** | Sacrifices Availability during partition | Strict Data Consistency | HBase, MongoDB, Redis, Spanner | Financial balances, stock orders, user authentication, ticket seat reservation |
| **AP System** | Sacrifices Consistency during partition | Continuous High Availability | Cassandra, DynamoDB, CouchDB, DNS | Social media feeds, product reviews, video comments, shopping cart browsing |
    `
  },
  {
    id: 'db-selection-matrix',
    title: 'Database Selection Guide',
    content: `
| Data Need | Optimal Database | Key Strengths | Avoid When |
| :--- | :--- | :--- | :--- |
| **Structured Relational with ACID** | PostgreSQL / MySQL | Foreign keys, complex multi-table JOINs, transactional reliability | Massive multi-terabyte writes per second across distributed shards |
| **High Velocity Key-Value Lookups** | Redis / DynamoDB | Sub-millisecond $O(1)$ read/write speeds, auto-sharding | Complex multi-row relational JOINs and complex analytical aggregations |
| **Flexible Hierarchical Documents** | MongoDB | Dynamic JSON schemas, nested arrays, fast single-document mutations | Heavy relational cross-collection foreign key relationships |
| **Time-Series / Write-Heavy Petabytes** | Cassandra / ScyllaDB | Masterless write scaling, append-only LSM trees, zero single points of failure | ACID transactions requiring immediate consistency across multiple tables |
| **Full-Text Search & Log Analytics** | Elasticsearch / OpenSearch | Inverted indexes, fuzzy text matching, faceted aggregations | Primary source-of-truth transactional storage (not durable for ledger writes) |
    `
  },
  {
    id: 'caching-eviction-rules',
    title: 'Cache Eviction & Invalidation Cheat Sheet',
    content: `
| Strategy / Policy | Mechanism | Best Suited For | Critical Consideration |
| :--- | :--- | :--- | :--- |
| **LRU (Least Recently Used)** | Evicts keys not accessed for the longest time | General web applications, user sessions, news feeds | Simple to implement with Doubly Linked List + Hash Map |
| **LFU (Least Frequently Used)** | Evicts keys with the lowest total access frequency count | Long-term popular reference data, top product categories | Keys that were popular during a brief viral spike can linger in memory |
| **Cache-Aside (Lazy Load)** | App reads cache; if miss, queries DB and populates cache | General read-heavy applications | Update DB first, then DELETE the cache key to avoid race conditions |
| **Write-Through** | Synchronously writes to Cache AND Database before returning | Financial or user settings where data loss is unacceptable | Slower write latency because every write requires two synchronous hops |
    `
  }
];

