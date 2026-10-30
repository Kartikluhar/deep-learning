/**
 * MLForge System Design Interview Preparation Question Bank
 * Curated technical interview questions across all difficulty levels and domains,
 * complete with structured hints, step-by-step solutions, trade-off breakdowns,
 * common pitfalls, and follow-up discussion points.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sysdesign = window.MLForge.sysdesign || {};
window.MLForge.sysdesign.data = window.MLForge.sysdesign.data || {};

MLForge.sysdesign.data.interviewQuestions = [
  {
    id: 'int-url-shortener',
    title: 'How would you design a scalable URL shortener like TinyURL?',
    difficulty: 'Beginner',
    category: 'HLD',
    topicsTested: ['Base62 Encoding', 'Key Generation Service', 'Read-Heavy Caching', 'HTTP 301 vs 302'],
    hints: [
      'Think about how many unique short codes a 7-character string can represent in Base62 ($62^7$).',
      'What are the trade-offs of using MD5 hash vs an auto-incrementing ID?',
      'Why is HTTP 302 preferred over HTTP 301 for tracking click analytics?'
    ],
    structuredApproach: [
      '1. Clarify Requirements: Write traffic (~100/s), Read traffic (~10,000/s, 100:1 read-heavy ratio), 5-year storage (~15 TB).',
      '2. Base62 ID Generation: Avoid hash collisions by using a distributed Snowflake ID generator or pre-allocated range token service, converted to Base62.',
      '3. Storage: Key-value store (DynamoDB/Cassandra) with (short_code -> original_url).',
      '4. Caching: Redis cluster caching top 20% of links, serving 90%+ reads in sub-millisecond time.',
      '5. Analytics: Asynchronously log click events to Kafka so analytics writes never block the user redirect response.'
    ],
    expectedArchitecture: 'Clients -> CDN / Edge -> Layer 7 Load Balancer -> App Server Fleet -> Redis Cache Cluster -> NoSQL DB + Kafka Click Stream.',
    tradeOffs: 'HTTP 301 permanently caches in browser (saves server bandwidth, but loses click tracking). HTTP 302 routes every request to backend (adds minor server load, but provides 100% accurate click analytics).',
    commonMistakes: [
      'Using random strings and checking the DB for duplicates in an active loop ($O(N)$ DB queries).',
      'Using a single relational database without read replicas or Redis caching.',
      'Ignoring URL expiration cleanup strategies.'
    ],
    followUpQuestions: [
      'How would you handle custom alias collisions?',
      'How do you delete or purge expired links without locking database tables?'
    ]
  },

  {
    id: 'int-rate-limiter',
    title: 'How would you design a distributed rate limiter for a high-traffic API?',
    difficulty: 'Beginner',
    category: 'Traffic Management',
    topicsTested: ['Token Bucket', 'Sliding Window Counter', 'Redis Lua Scripts', 'Distributed Race Conditions'],
    hints: [
      'Why does Fixed Window Counter fail at the boundary between two minutes?',
      'How do you avoid race conditions when multiple API gateways check Redis concurrently?',
      'What happens if the Redis rate-limiting cluster goes down? Should you block or allow traffic?'
    ],
    structuredApproach: [
      '1. Requirements: Throttle by user ID or IP address (e.g. 100 requests per minute). Return HTTP 429.',
      '2. Algorithm Choice: Token Bucket allows bursts while maintaining average throughput. Sliding Window Counter provides exact window limits with minimal memory.',
      '3. Storage: Redis In-Memory store with keys expiring via TTL.',
      '4. Concurrency: Execute checks via Redis Lua scripts to ensure atomic check-and-decrement.',
      '5. Resilience: Fail-open strategy with local in-memory fallback if Redis is unreachable.'
    ],
    expectedArchitecture: 'Client -> Cloudflare Edge -> API Gateway (executes Redis Lua Token Bucket check) -> Allowed: Backend Services / Rejected: HTTP 429.',
    tradeOffs: 'Sliding Window Log is 100% accurate but consumes high memory (storing every request timestamp). Sliding Window Counter uses approximation ($99\\%$ accurate) but requires only a single integer counter per window.',
    commonMistakes: [
      'Checking and setting Redis keys in two separate network round-trips without transactions or Lua scripts, causing race condition exploits.',
      'Failing closed during a cache outage, taking down the entire website because the rate limiter crashed.'
    ],
    followUpQuestions: [
      'How do you handle rate limits across different geographic regions?',
      'How do you design a tiered rate limiter for Free vs Enterprise tiers?'
    ]
  },

  {
    id: 'int-chat-app',
    title: 'How would you design a real-time messaging system like WhatsApp?',
    difficulty: 'Intermediate',
    category: 'Real-Time Systems',
    topicsTested: ['WebSockets', 'Connection Management', 'Redis Pub/Sub', 'Message Deduplication', 'Cassandra'],
    hints: [
      'Why are WebSockets preferred over HTTP polling for chat?',
      'How do you route a message from User A on Server 1 to User B on Server 5?',
      'What database is optimal for storing sequential, chronological chat history?'
    ],
    structuredApproach: [
      '1. Requirements: Real-time 1-on-1 and group chat, delivery receipts, offline messaging, message ordering.',
      '2. Connection Layer: Fleet of WebSocket Gateway servers maintaining persistent TCP sockets.',
      '3. Routing Layer: Redis Session Registry tracks which WebSocket server holds each active user. Redis Pub/Sub distributes messages between gateway nodes.',
      '4. Persistence: Apache Cassandra or ScyllaDB with partition key `conversation_id` and clustering key `message_id (TimeUUID)`.',
      '5. Push Notifications: If recipient is offline, queue message in DB and trigger Apple APNs / Google FCM.'
    ],
    expectedArchitecture: 'Mobile Clients -> WebSocket Gateways -> Redis Session Store & Pub/Sub backplane -> Cassandra Chat Store + Kafka / APNs Notification Pipeline.',
    tradeOffs: 'Fan-out on write (pushing a copy to every member’s inbox) is fast for 1-on-1 chats but catastrophic for 500-person groups. Use fan-out on read (shared timeline) for group channels.',
    commonMistakes: [
      'Relying on client device timestamps for message sorting instead of server-generated monotonically increasing IDs.',
      'Storing active WebSocket socket connections in relational databases.'
    ],
    followUpQuestions: [
      'How do you implement End-to-End Encryption (E2EE) using the Signal Protocol?',
      'How do you handle presence status (online/offline) without overwhelming the database with heartbeats?'
    ]
  },

  {
    id: 'int-prevent-duplicate-payments',
    title: 'How would you prevent duplicate payment transactions in an e-commerce checkout?',
    difficulty: 'Intermediate',
    category: 'Reliability & Transactions',
    topicsTested: ['Idempotency Keys', 'Distributed Locking', 'Database Unique Constraints', 'Two-Phase Commit'],
    hints: [
      'What happens if a user double-clicks the "Pay Now" button?',
      'What happens if the payment gateway charges the card, but a network drop prevents the success response from reaching your server?'
    ],
    structuredApproach: [
      '1. Client Idempotency Key: Frontend generates a unique UUID `Idempotency-Key` when the checkout page loads.',
      '2. Atomic Mutex Lock: When payment request hits the server, attempt to acquire a distributed Redis lock with key `lock:payment:<idempotency_key>` with a 30s TTL.',
      '3. Database Check: Check `payments` table for an existing record with that idempotency key.',
      '4. Payment Execution: Call Stripe/Bank with the idempotency key passed through.',
      '5. State Machine: Record payment status (PENDING -> SUCCESS / FAILED) in a database transaction with a `UNIQUE INDEX` on `idempotency_key`.'
    ],
    expectedArchitecture: 'Client (Idempotency Key) -> API Gateway -> Payment Service -> Redis Mutex Lock -> SQL DB (Unique Constraint) -> External Bank Gateway.',
    tradeOffs: 'Distributed locks in Redis are fast but can expire before a slow bank call finishes. Pairing Redis locks with strict relational database `UNIQUE` constraints provides ironclad protection.',
    commonMistakes: [
      'Relying only on frontend button disabling (attackers can bypass with cURL or network retries).',
      'Not passing the idempotency key to the external payment processor.'
    ],
    followUpQuestions: [
      'How do you handle a scenario where the bank charges the user but your database crashes before saving the receipt?',
      'How do Webhooks from the payment provider provide eventual reconciliation?'
    ]
  },

  {
    id: 'int-search-autocomplete',
    title: 'How would you design a real-time Typeahead / Search Autocomplete system?',
    difficulty: 'Intermediate',
    category: 'Data Structures & HLD',
    topicsTested: ['Trie Data Structure', 'Prefix Caching', 'Sampling & Aggregation', 'Debouncing'],
    hints: [
      'How do you find the top 5 most popular search terms starting with "sys"?',
      'Can you store an entire Trie in memory across multiple servers?',
      'How do you update search query frequencies without slowing down search queries?'
    ],
    structuredApproach: [
      '1. Requirements: Return top 5 suggestions within < 30ms as user types each character.',
      '2. Core Data Structure: Prefix Trie where each node stores the top 5 pre-computed queries to avoid tree traversal at query time.',
      '3. Data Storage: In-memory Trie servers partitioned by prefix (e.g. Server 1 holds a-m, Server 2 holds n-z) or Redis Sorted Sets (ZSETs).',
      '4. Offline Analytics Pipeline: Stream search queries into Kafka -> Spark / Flink aggregation pipeline computes hourly query frequencies -> builds new Trie snapshots -> pushes to Trie cache nodes.',
      '5. Client-Side Optimization: Debounce keystrokes (wait 150ms after typing stops) and cache recent prefix results in browser memory.'
    ],
    expectedArchitecture: 'Client (Debounced) -> CDN Edge (Prefix Cache) -> Autocomplete Service -> In-Memory Trie Cache Nodes. Offline: Kafka -> Aggregation Engine -> Trie Rebuilder.',
    tradeOffs: 'Pre-computing top 5 results at every Trie node increases memory usage by 4x, but reduces query time from $O(P + K \\log K)$ to instant $O(1)$ lookup.',
    commonMistakes: [
      'Querying SQL database with `LIKE "%query%"` on every single keystroke.',
      'Updating Trie node frequencies synchronously on every single search query.'
    ],
    followUpQuestions: [
      'How would you personalize search suggestions based on the user’s recent search history?',
      'How do you filter offensive or prohibited terms from autocomplete suggestions in real time?'
    ]
  },

  {
    id: 'int-handle-db-failure',
    title: 'How would you handle a sudden Primary Database failure without data loss?',
    difficulty: 'Advanced',
    category: 'Reliability & Fault Tolerance',
    topicsTested: ['Leader Election', 'Replication Lag', 'Split-Brain', 'Fencing Tokens', 'Automated Failover'],
    hints: [
      'How does the system detect that the primary database is truly dead versus just a brief network hiccup?',
      'What happens if a Read Replica that was promoted to Primary was 2 seconds behind on replication?',
      'How do you prevent the old Primary from waking up and accepting conflicting writes (Split-Brain)?'
    ],
    structuredApproach: [
      '1. Health Check Heartbeats: Consensus cluster (ZooKeeper, etcd, or Consul) monitors primary node with heartbeats (e.g. 3 consecutive missed pings over 10s).',
      '2. Leader Promotion: The consensus coordinator triggers a failover, selecting the Read Replica with the highest Log Sequence Number (LSN) to minimize replication data loss.',
      '3. Fencing / STONITH (Shoot The Other Node In The Head): Power down or revoke network access from the old primary to eliminate Split-Brain.',
      '4. DNS / Virtual IP Switch: Update the database connection pool or virtual IP to point application servers to the new primary.',
      '5. Graceful Degradation: During the 10-20 second failover window, app servers queue writes or return read-only mode rather than crashing.'
    ],
    expectedArchitecture: 'Primary DB -> Streaming WAL Replication -> Read Replicas. Orchestrator (Consul/etcd) with Fencing tokens -> App Server Connection Pools.',
    tradeOffs: 'Asynchronous replication offers high write throughput but risks losing transactions during primary crash. Synchronous replication (Semi-Sync) guarantees zero data loss but increases write latency.',
    commonMistakes: [
      'Automated failover that triggers too eagerly on a 500ms network blip, causing flapping leaders.',
      'Neglecting Fencing Tokens, allowing two nodes to believe they are the write primary simultaneously.'
    ],
    followUpQuestions: [
      'What is Dual-Master replication and why is it usually avoided in high-write systems?',
      'How does Raft-based distributed storage (like CockroachDB or AWS Aurora) automate this process?'
    ]
  }
];

