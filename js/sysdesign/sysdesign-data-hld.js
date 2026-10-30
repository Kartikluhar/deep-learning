/**
 * MLForge High-Level Design (HLD) Framework & Real-World Case Studies
 * Comprehensive architecture blueprints across Beginner, Intermediate, and Advanced tiers.
 * Covers requirements, capacity estimation, APIs, schemas, architecture diagrams,
 * request flows, scaling strategies, and interview follow-up questions.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sysdesign = window.MLForge.sysdesign || {};
window.MLForge.sysdesign.data = window.MLForge.sysdesign.data || {};

MLForge.sysdesign.data.hldFramework = [
  { step: 1, title: 'Understand the Problem & Scope', desc: 'Ask clarifying questions. Identify target users, business objectives, and feature boundaries.' },
  { step: 2, title: 'Define Functional Requirements', desc: 'List exact core user capabilities (e.g. "User can shorten long URL", "Redirect within 100ms").' },
  { step: 3, title: 'Define Non-Functional Requirements (NFRs)', desc: 'Establish availability (99.99%), latency targets (p99 < 150ms), consistency model (Eventual vs Strong), and durability.' },
  { step: 4, title: 'Back-of-the-Envelope Capacity Estimation', desc: 'Calculate Daily Active Users (DAU), read/write RPS, network bandwidth, and 5-year storage growth.' },
  { step: 5, title: 'Define API Interface', desc: 'Establish clean REST/gRPC endpoints, query parameters, request payloads, and response status codes.' },
  { step: 6, title: 'Design Data Model & Database Choice', desc: 'Choose SQL vs NoSQL. Define database schemas, primary keys, indexes, and relationship cardinality.' },
  { step: 7, title: 'High-Level Architecture Diagram', desc: 'Draw end-to-end components: Clients -> DNS/CDN -> Load Balancer -> App Servers -> Cache -> Database.' },
  { step: 8, title: 'Detailed Component Deep Dive', desc: 'Detail the read and write request flows step-by-step across all microservices.' },
  { step: 9, title: 'Identify Bottlenecks & Single Points of Failure', desc: 'Spot CPU hotspots, database write saturation, network partition risks, and failover paths.' },
  { step: 10, title: 'Introduce Caching Strategy', desc: 'Select cache tiering (Redis/Memcached, CDN edge), eviction policy (LRU), and invalidation triggers.' },
  { step: 11, title: 'Introduce Load Balancing & Auto-Scaling', desc: 'Configure Layer 7 reverse proxies, health checks, and horizontal pod auto-scalers.' },
  { step: 12, title: 'Asynchronous Processing & Message Queues', desc: 'Decouple slow tasks (emails, video transcoding, indexing) using Kafka or RabbitMQ.' },
  { step: 13, title: 'Security & Access Control', desc: 'Implement TLS encryption, rate limiting, OAuth2/JWT auth, and SQLi/XSS sanitization.' },
  { step: 14, title: 'Observability & Monitoring', desc: 'Setup distributed tracing (OpenTelemetry), log aggregation, Golden Signals metrics, and alerts.' },
  { step: 15, title: 'Discuss Trade-Offs & Alternatives', desc: 'Explain why alternative designs were rejected (e.g. Cassandra vs PostgreSQL, Polling vs WebSockets).' },
  { step: 16, title: 'Future Extensibility', desc: 'Discuss multi-region disaster recovery, data sharding, and planned feature expansions.' }
];

MLForge.sysdesign.data.caseStudies = [
  // =========================================================================
  // CASE STUDY 1: URL SHORTENER (TINYURL)
  // =========================================================================
  {
    id: 'url-shortener',
    title: 'Design a URL Shortener (TinyURL / Bitly)',
    tier: 'Beginner',
    readTime: '15 min',
    summary: 'A highly scalable service that converts long URLs into compact 7-character aliases and redirects users in milliseconds.',
    problemStatement: 'Design a service like TinyURL or Bitly that takes long web URLs (e.g. 200 characters) and generates a short alias (e.g. https://tiny.cc/xyz12a) that permanently redirects visitors to the original address.',
    functionalReqs: [
      'Given a long URL, generate a unique 7-character alphanumeric short link.',
      'When accessing a short link, redirect the client with HTTP 301 or 302 to the original destination.',
      'Allow custom short aliases (e.g. https://tiny.cc/my-portfolio) if available.',
      'Links can optionally expire after a user-specified expiration date.',
      'Basic click metrics and analytics tracking (total clicks, referrers).'
    ],
    nonFunctionalReqs: [
      'High Availability: 99.99% uptime. Link redirection must never fail.',
      'Ultra-Low Latency: Redirections must execute in < 20ms.',
      'Read-Heavy Workload: 100:1 read-to-write ratio.',
      'Non-Guessable Short Links: Prevent crawlers from scraping sequential URLs.'
    ],
    capacityEstimations: {
      writeRPS: '100 writes/sec (10M new links created per month)',
      readRPS: '10,000 reads/sec (1B redirects per month, 100:1 ratio)',
      storage5Years: '15 Terabytes (600M links * 500 bytes per record over 5 years)',
      bandwidthIn: '50 KB/sec incoming write payload',
      bandwidthOut: '5 MB/sec outgoing redirection traffic',
      cacheMemory: '100 GB RAM (caching the top 20% most popular daily links via 80/20 Pareto rule)'
    },
    apiDesign: [
      {
        endpoint: 'POST /api/v1/urls',
        desc: 'Generate a short URL',
        request: '{\n  "longUrl": "https://example.com/very-long-path",\n  "customAlias": "my-cool-link",\n  "expireDate": "2027-12-31T23:59:59Z"\n}',
        response: 'HTTP 201 Created\n{\n  "shortUrl": "https://tiny.cc/my-cool-link",\n  "createdAt": "2026-10-30T12:00:00Z"\n}'
      },
      {
        endpoint: 'GET /{shortCode}',
        desc: 'Redirect short URL to long URL',
        request: 'GET /xyz12a',
        response: 'HTTP 302 Found\nLocation: https://example.com/very-long-path'
      }
    ],
    dataModel: `
TABLE urls (
    id BIGINT PRIMARY KEY,              -- Unique 64-bit integer
    short_code VARCHAR(7) UNIQUE,       -- Base62 encoded string (Indexed)
    original_url VARCHAR(2048) NOT NULL,-- Target long URL
    user_id BIGINT NULL,                -- Owner user account
    created_at TIMESTAMP NOT NULL,
    expires_at TIMESTAMP NULL
);
CREATE INDEX idx_short_code ON urls(short_code);
    `,
    architecture: `
+------------+       +-------------------+       +-----------------------+
|   Client   | ----> |   Cloudflare CDN  | ----> |  Load Balancer (Nginx)|
+------------+       +-------------------+       +-----------------------+
                                                             |
                                            +----------------+----------------+
                                            |                                 |
                                            v                                 v
                                   [ Web App Server 1 ]              [ Web App Server 2 ]
                                            |                                 |
                          +-----------------+----------------+                |
                          |                                  |                |
                          v                                  v                v
                 +-------------------+              +-------------------+   +--------------------+
                 | Redis Cache Pool  |              |   PostgreSQL /    |   | Kafka Click Stream |
                 | (Hot URL Lookup)  |              | DynamoDB Shards   |   | (Async Analytics)  |
                 +-------------------+              +-------------------+   +--------------------+
    `,
    requestFlow: [
      'Write Flow (Create Short Link): Client posts long URL -> Load Balancer routes to App Server -> App Server requests a unique 64-bit ID from a distributed Key Generation Service (or Snowflake ID) -> Encodes ID to Base62 (7 chars: `[a-zA-Z0-9]`) -> Writes mapping to Database & Redis -> Returns short URL.',
      'Read Flow (Redirect Link): Client hits `GET /xyz12a` -> CDN edge checks cache; if miss, routes to App Server -> App Server queries Redis (sub-1ms hit) -> If Redis hit, returns `302 Found` with `Location: <longUrl>` -> Async message pushed to Kafka to increment click counter -> Browser redirects instantly.'
    ],
    scalingAndBottlenecks: [
      'Base62 Encoding Capacity: 62 characters ($26 + 26 + 10$). A 7-character string allows $62^7 \\approx 3.52 \\text{ trillion}$ unique URLs, far exceeding 5-year requirements.',
      'Hash Collisions Avoidance: Using MD5/SHA-256 and truncating causes hash collisions. Using an auto-incrementing ID converted to Base62 mathematically guarantees ZERO collisions.',
      'HTTP 301 vs 302 Redirect: 301 is Permanent Redirect (browser caches redirection locally, meaning backend never receives click analytics). 302 is Temporary Redirect (browser calls server on every click, preserving real-time analytics).'
    ],
    interviewFollowUps: [
      {
        q: 'How do you prevent crawlers from enumerating sequential short links?',
        a: 'If you use an sequential integer ID (1, 2, 3 -> a, b, c), attackers can scrape every URL. Solution: Pass the sequential integer through a lightweight Feistel cipher or token scrambler before Base62 encoding to produce pseudo-random looking strings.'
      },
      {
        q: 'Why choose DynamoDB or Cassandra instead of MySQL for this service?',
        a: 'Because the data access pattern is purely key-value lookups (`short_code -> long_url`) with zero JOINs and zero complex multi-row transactions. Distributed NoSQL key-value stores scale horizontally with consistent sub-5ms lookups.'
      }
    ]
  },

  // =========================================================================
  // CASE STUDY 2: RATE LIMITER
  // =========================================================================
  {
    id: 'rate-limiter-service',
    tier: 'Beginner',
    title: 'Design an API Rate Limiter Service',
    readTime: '14 min',
    summary: 'A distributed throttling system that protects APIs from DDoS, credential stuffing, and resource hogging.',
    problemStatement: 'Design a distributed rate limiter that can be deployed as an API gateway middleware to throttle excessive requests from IP addresses or authenticated user tokens, returning HTTP 429 Too Many Requests.',
    functionalReqs: [
      'Limit users to $N$ requests per time window (e.g. 100 requests per minute per IP).',
      'Return standard HTTP headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.',
      'When limit is exceeded, immediately reject with HTTP 429 and `Retry-After` header.',
      'Configurable rules per tier (e.g. Free Tier: 60 req/min, Enterprise: 10,000 req/min).'
    ],
    nonFunctionalReqs: [
      'Minimal Latency Overhead: Must evaluate each request in < 2ms.',
      'Distributed Accuracy: Rate limits must be synchronized across a fleet of 50 API gateway instances.',
      'High Fault Tolerance: If the rate limiter service crashes, it must fail open (allow requests) rather than blocking all legitimate user traffic.'
    ],
    capacityEstimations: {
      writeRPS: '50,000 incoming requests per second to evaluate',
      storageMemory: '10 GB Redis memory to track 10 million active users per hour',
      latencyTarget: 'p99 < 1.5ms per check'
    },
    apiDesign: [
      {
        endpoint: 'HTTP Response Headers',
        desc: 'Rate limit tracking headers sent on every response',
        request: 'GET /api/v1/resource',
        response: 'HTTP 200 OK\nX-RateLimit-Limit: 100\nX-RateLimit-Remaining: 74\nX-RateLimit-Reset: 1730304000'
      }
    ],
    dataModel: `
REDIS HASH: user:<user_id>:tokens
  - tokens: 85 (current available tokens)
  - last_refill: 1730303940 (Unix epoch seconds)
  - TTL: 3600 seconds
    `,
    architecture: `
Client ---> [ Cloudflare DDoS Filter ]
                   |
                   v
         [ API Gateway Cluster ]
                   |
    1. Check Tokens / Execute Lua Script
                   v
       +-----------------------+
       | Redis Cluster (Memory)|
       | Sliding Window Counter|
       +-----------------------+
         /                   \\
   Token Available      Exceeded (> limit)
        v                    v
[ Backend Services ]   [ HTTP 429 Too Many Requests ]
    `,
    requestFlow: [
      '1. Client request arrives at API Gateway.',
      '2. Gateway extracts identification key (API Key or Client IP).',
      '3. Gateway runs atomic Redis Lua script implementing Sliding Window Log or Token Bucket.',
      '4. If allowed, increments counter and forwards request to backend microservice with rate limit headers.',
      '5. If rejected, immediately drops request and returns HTTP 429.'
    ],
    scalingAndBottlenecks: [
      'Race Conditions: Two parallel requests from the same user hitting Gateway 1 and Gateway 2 at the exact same millisecond could both read token count = 1. Solved using atomic Redis Lua scripts.',
      'Sliding Window vs Fixed Window: Fixed window counters suffer from the "Boundary Burst Problem" (user can send 100 requests at 00:59 and 100 requests at 01:00, pushing 200 requests in 2 seconds). Sliding window prevents this.'
    ],
    interviewFollowUps: [
      {
        q: 'What happens if Redis becomes unreachable or suffers high latency?',
        a: 'The rate limiter should implement a Fail-Open policy with a local in-memory fallback. If Redis fails to respond within 5ms, log a warning and let the request proceed to backend services to avoid a total system outage.'
      }
    ]
  },

  // =========================================================================
  // CASE STUDY 3: REAL-TIME CHAT APPLICATION (WHATSAPP / SLACK)
  // =========================================================================
  {
    id: 'chat-application',
    tier: 'Intermediate',
    title: 'Design a Real-Time Chat App (WhatsApp / Slack)',
    readTime: '18 min',
    summary: 'A bi-directional messaging platform supporting 1-on-1 chats, group channels, online presence, and message delivery receipts.',
    problemStatement: 'Design a real-time messaging platform supporting 50 million daily active users, 1-on-1 private messaging, group chats of up to 500 members, read receipts (sent, delivered, read), and offline message synchronization.',
    functionalReqs: [
      'Real-time 1-on-1 and group messaging with sub-second delivery.',
      'Message status receipts: Sent (single check), Delivered (double check), Read (blue check).',
      'Offline message queueing: Deliver pending messages as soon as an offline user reconnects.',
      'Online/Offline presence indicator.',
      'Media file sharing (images, voice notes, documents).'
    ],
    nonFunctionalReqs: [
      'Ultra-Low Latency: Message delivery < 150ms globally.',
      'Zero Message Loss: Every sent message must be persistently stored.',
      'End-to-End Encryption (E2EE) for 1-on-1 chats.',
      'High Concurrency: Handle 5 million persistent WebSocket connections.'
    ],
    capacityEstimations: {
      writeRPS: '50,000 messages sent per second',
      storageDaily: '100 GB text messages stored per day (excluding media)',
      activeConnections: '5,000,000 concurrent WebSocket connections',
      memoryPerConnection: '10 KB per TCP socket -> 50 GB RAM across connection gateway fleet'
    },
    apiDesign: [
      {
        endpoint: 'WebSocket /ws/v1/chat',
        desc: 'Bi-directional persistent socket for message streams and receipts',
        request: '{\n  "action": "SEND_MSG",\n  "recipientId": "user_456",\n  "content": "Hey, are you free?",\n  "msgId": "uuid-789"\n}',
        response: '{\n  "event": "MSG_ACK",\n  "msgId": "uuid-789",\n  "status": "SENT",\n  "serverTime": 1730304000\n}'
      }
    ],
    dataModel: `
TABLE messages (
    message_id BIGINT PRIMARY KEY,
    conversation_id UUID NOT NULL,
    sender_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(10) NOT NULL, -- SENT, DELIVERED, READ
    created_at TIMESTAMP NOT NULL
);
-- Optimized Cassandra / ScyllaDB schema for fast chronological retrieval:
CREATE TABLE conversation_messages (
    conversation_id uuid,
    bucket_month text,
    message_id timeuuid,
    sender_id bigint,
    content text,
    PRIMARY KEY ((conversation_id, bucket_month), message_id)
) WITH CLUSTERING ORDER BY (message_id DESC);
    `,
    architecture: `
User A (Mobile) ======= WebSocket Connection =======> [ WebSocket Gateway Server 1 ]
                                                                 |
                                                   1. Publish message to Redis Pub/Sub
                                                                 v
                                                     +------------------------+
                                                     |  Redis Pub/Sub / Kafka |
                                                     +------------------------+
                                                                 |
                                                   2. Route to Server holding User B
                                                                 v
User B (Mobile) <====== WebSocket Connection <======= [ WebSocket Gateway Server 4 ]
                                                                 |
                                                      3. Save to Cassandra Cluster
                                                                 v
                                                     +------------------------+
                                                     |   Cassandra Database   |
                                                     |    (Chat History)      |
                                                     +------------------------+
    `,
    requestFlow: [
      '1. User A sends message over open WebSocket to WebSocket Gateway 1.',
      '2. Gateway 1 authenticates token, stores message asynchronously in Cassandra, and queries Redis Session Store to find which gateway holds User B.',
      '3. Redis reveals User B is connected to Gateway 4.',
      '4. Gateway 1 publishes message to Redis Pub/Sub channel for Gateway 4.',
      '5. Gateway 4 pushes message down User B’s open WebSocket.',
      '6. If User B is offline, message is stored in pending offline inbox table, and a push notification is sent via APNs / Firebase (FCM).'
    ],
    scalingAndBottlenecks: [
      'Socket Gateway Scaling: A single Linux server can handle ~50,000 to 100,000 open TCP sockets with tuned epoll and ulimit settings. 5M users requires ~50 gateway nodes.',
      'Group Chat Fan-Out: If a user posts in a group with 500 members, the system must write 500 messages or fan out to 500 sockets. For large groups, fan-out on read (shared timeline) is used instead of duplicating messages 500 times.'
    ],
    interviewFollowUps: [
      {
        q: 'How do you maintain strict message ordering when messages travel over different network paths?',
        a: 'Client-generated timestamps are unreliable because user clocks drift or can be manipulated. Solution: The chat server assigns a monotonically increasing unique 64-bit ID (Twitter Snowflake or Cassandra TimeUUID) when the message reaches the server gateway.'
      }
    ]
  },

  // =========================================================================
  // CASE STUDY 4: YOUTUBE / NETFLIX VIDEO STREAMING PLATFORM
  // =========================================================================
  {
    id: 'youtube-video-platform',
    tier: 'Advanced',
    title: 'Design a Video Streaming Service (YouTube / Netflix)',
    readTime: '22 min',
    summary: 'A global video platform handling large multipart uploads, distributed chunked transcoding, multi-bitrate HLS/DASH streaming, and CDN edge delivery.',
    problemStatement: 'Design a scalable global video platform supporting 1 billion active users, video uploads from mobile/desktop creators, background transcoding into multiple resolutions (4K, 1080p, 720p, 360p), and smooth adaptive-bitrate video playback worldwide.',
    functionalReqs: [
      'Creators can upload videos of any format (up to 20 GB).',
      'System transcodes videos into adaptive bitrate chunks (HLS / MPEG-DASH).',
      'Users can stream videos smoothly with automatic resolution adjustment based on network speed.',
      'Video search by title and tags.',
      'View counts, likes, and comments.'
    ],
    nonFunctionalReqs: [
      'High Video Availability and 99.999% data durability for original media.',
      'Smooth Playback: Zero video buffering or stuttering during stream.',
      'Massive Storage Capacity: Multiple petabytes of new video uploaded daily.',
      'Global Low Latency: Sub-2 second video start time worldwide.'
    ],
    capacityEstimations: {
      dailyUploads: '500,000 new videos uploaded per day (average raw size 500 MB)',
      dailyStorage: '250 Terabytes raw video per day -> 1 Petabyte/day after multi-resolution transcoding',
      videoPlaybacks: '5 billion views per day',
      egressBandwidth: '5 Terabits per second (Tbps) global video streaming traffic'
    },
    apiDesign: [
      {
        endpoint: 'POST /api/v1/videos/upload-session',
        desc: 'Initiate a resumable multipart upload',
        request: '{\n  "filename": "my_vlog.mp4",\n  "fileSizeBytes": 1048576000,\n  "contentType": "video/mp4"\n}',
        response: 'HTTP 201 Created\n{\n  "uploadId": "upl_987",\n  "chunkSize": 10485760,\n  "uploadUrl": "https://s3.amazonaws.com/uploads/upl_987?signature=..."\n}'
      },
      {
        endpoint: 'GET /api/v1/videos/{id}/manifest.m3u8',
        desc: 'Fetch HLS streaming playlist manifest with bitrate variations',
        request: 'GET /videos/v123/manifest.m3u8',
        response: '#EXTM3U\n#EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080\n1080p.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360\n360p.m3u8'
      }
    ],
    dataModel: `
TABLE videos (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    creator_id BIGINT NOT NULL,
    duration_seconds INT NOT NULL,
    status VARCHAR(20) NOT NULL, -- UPLOADING, PROCESSING, READY, FAILED
    manifest_url VARCHAR(512),
    created_at TIMESTAMP NOT NULL
);
CREATE INDEX idx_creator_id ON videos(creator_id);
    `,
    architecture: `
CREATOR UPLOAD PIPELINE:
Creator ---> [ API Server ] ---> Returns S3 Presigned URL
Creator ---> Directly uploads chunks to [ AWS S3 Raw Storage Bucket ]
                                                      |
                                           S3 Event Notification
                                                      v
                                        +----------------------------+
                                        |  Kafka Transcoding Queue   |
                                        +----------------------------+
                                                      |
                                                      v
                                        +----------------------------+
                                        | Transcoder Worker Fleet    |
                                        | (FFmpeg: 1080p, 720p, 360p)|
                                        +----------------------------+
                                                      |
                                                      v
                                        [ Transcoded S3 Master Bucket ]

VIEWER STREAMING PIPELINE:
Viewer (Phone/TV) ---> [ Edge CDN (Cloudflare/Akamai) ] ---> [ S3 Video Chunks ]
    `,
    requestFlow: [
      '1. Creator requests upload session; API server issues Amazon S3 Presigned URLs for multipart chunk uploads.',
      '2. Creator uploads directly to S3, completely bypassing application servers to preserve server bandwidth.',
      '3. S3 triggers an ObjectCreated event into a Kafka topic.',
      '4. Distributed worker fleet (using FFmpeg) pulls the video, chops it into 4-second `.ts` chunks across resolutions (4K, 1080p, 720p, 360p), and compiles an `.m3u8` master manifest file.',
      '5. Output chunks are saved to Transcoded S3 storage.',
      '6. When a viewer plays the video, their media player fetches the HLS manifest via a CDN edge node, automatically shifting bitrates if network fluctuates.'
    ],
    scalingAndBottlenecks: [
      'CDN Caching Strategy: Video streaming consumes enormous bandwidth (Tbps). 98% of video playback bytes MUST be served directly by CDN edge caches located inside Internet Service Provider (ISP) points of presence, shielding S3 from astronomical egress costs.',
      'Long-Tail Storage Tiering: Videos not viewed in 90 days are automatically transitioned from S3 Standard to S3 Infrequent Access or Glacier Deep Archive, saving 80% on storage expenses.'
    ],
    interviewFollowUps: [
      {
        q: 'How does YouTube display real-time view counts when millions of users watch a viral video simultaneously?',
        a: 'Directly incrementing a single row in MySQL (`UPDATE videos SET views = views + 1 WHERE id = 123`) causes severe database row lock contention. Solution: Buffer view count increments in Redis HyperLogLog / Redis counters or Kafka events, and asynchronously batch-flush aggregated sums (e.g. +10,000 views) to the primary database every 10 seconds.'
      }
    ]
  }
];

