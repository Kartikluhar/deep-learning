/**
 * MLForge System Design Topics Syllabus Data
 * Comprehensive educational content covering Fundamentals, Networking, APIs,
 * Databases, Caching, Load Balancing, Scalability, Distributed Systems,
 * Messaging, Architecture, Storage, Reliability, Security, and Observability.
 * Follows the 11-point learning structure with zero fluff and clear English.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sysdesign = window.MLForge.sysdesign || {};
window.MLForge.sysdesign.data = window.MLForge.sysdesign.data || {};

MLForge.sysdesign.data.categories = [
  { id: 'fundamentals', title: 'System Design Fundamentals', icon: 'layers', color: '#f59e0b' },
  { id: 'networking', title: 'Networking Fundamentals', icon: 'globe', color: '#0ea5e9' },
  { id: 'api-design', title: 'API Design & Protocols', icon: 'code', color: '#10b981' },
  { id: 'databases', title: 'Database Design & Scaling', icon: 'database', color: '#8b5cf6' },
  { id: 'caching', title: 'Caching & Data Storage', icon: 'zap', color: '#f97316' },
  { id: 'load-balancing', title: 'Load Balancing & Proxies', icon: 'git-merge', color: '#06b6d4' },
  { id: 'scalability', title: 'Scalability & Estimation', icon: 'trending-up', color: '#3b82f6' },
  { id: 'distributed-systems', title: 'Distributed Systems Core', icon: 'cpu', color: '#ec4899' },
  { id: 'messaging', title: 'Message Queues & Events', icon: 'mail', color: '#f59e0b' },
  { id: 'architecture', title: 'Monoliths & Microservices', icon: 'grid', color: '#10b981' },
  { id: 'storage-cdn', title: 'Storage & Content Delivery', icon: 'hard-drive', color: '#0ea5e9' },
  { id: 'reliability', title: 'Reliability & Fault Tolerance', icon: 'shield', color: '#10b981' },
  { id: 'security', title: 'Security in System Design', icon: 'lock', color: '#f43f5e' },
  { id: 'observability', title: 'Observability & Monitoring', icon: 'activity', color: '#8b5cf6' }
];

MLForge.sysdesign.data.topics = [
  // =========================================================================
  // 1. FUNDAMENTALS
  // =========================================================================
  {
    id: 'intro-to-system-design',
    category: 'fundamentals',
    categoryTitle: 'System Design Fundamentals',
    title: 'What is System Design?',
    difficulty: 'Beginner',
    timeToRead: '8 min',
    summary: 'The process of defining the architecture, components, modules, interfaces, and data for a system to satisfy specified requirements.',
    definition: 'System Design is the art and engineering discipline of planning, structuring, and connecting software components (servers, databases, caches, queues, and networks) to solve business problems at scale while meeting functional, performance, and financial goals.',
    whyItMatters: 'Writing code that works for 10 users on your laptop is easy. Making that code handle 50 million concurrent users across 5 continents with sub-100ms latency and 99.99% uptime requires system design. Without it, databases crash, costs skyrocket, and applications suffer catastrophic downtime.',
    analogy: 'Think of coding like baking a single cake in your kitchen. System design is designing an automated factory that bakes 100,000 fresh cakes every day, delivers them globally without spoilage, and keeps running even if a mixer or delivery truck breaks down.',
    howItWorks: [
      '1. Clarify Requirements: Distinguish must-have features (Functional) from system qualities like speed and uptime (Non-Functional).',
      '2. Estimate Scale: Quantify daily active users, read/write traffic ratios, bandwidth, and storage growth over 5 years.',
      '3. High-Level Blueprint: Map how clients connect to load balancers, application servers, caches, and storage tiers.',
      '4. Component Deep Dive: Choose the right database (SQL vs NoSQL), caching pattern, and communication protocol (REST, gRPC, WebSocket).',
      '5. Address Bottlenecks: Introduce replication, sharding, redundancy, rate limiting, and circuit breakers.'
    ],
    diagram: `
+------------+       +-------------------+       +--------------------+
|   Client   | ----> |   Load Balancer   | ----> | Application Server |
| (Web/App)  | <---- | (Distributes load)| <---- |  (Business Logic)  |
+------------+       +-------------------+       +--------------------+
                                                          |          |
                                         +----------------+          +---------------+
                                         | Read/Write                                | Fast Cache
                                         v                                           v
                              +--------------------+                      +--------------------+
                              |  Primary Database  |                      |    Redis Cache     |
                              |  (Persistent Data) |                      |  (In-Memory Speed) |
                              +--------------------+                      +--------------------+
    `,
    advantages: [
      'Predictable Scalability: Allows services to grow from thousands to millions of users without rewrites.',
      'High Reliability: Isolates failures so one crashing component does not bring down the entire system.',
      'Cost Efficiency: Prevents over-provisioning expensive cloud infrastructure through smart tiering and caching.'
    ],
    disadvantages: [
      'Architectural Complexity: Introducing microservices, caches, and queues increases debugging and operational overhead.',
      'Data Consistency Challenges: Distributed data stores introduce replication lag and eventual consistency issues.',
      'Increased Latency if poorly planned: Cascading network hops between microservices can degrade user experience.'
    ],
    whenToUse: 'When building any application intended for production, especially when user traffic, data volume, or reliability expectations exceed single-server capacity.',
    whenToAvoid: 'Premature optimization for tiny hobby projects or proof-of-concepts where simplicity and fast prototyping outweigh scalability concerns.',
    interviewQuestions: [
      {
        q: 'What is the primary difference between High-Level Design (HLD) and Low-Level Design (LLD)?',
        a: 'HLD focuses on system architecture, component boundaries, data flow, APIs, and database selection across distributed nodes. LLD focuses on object-oriented class structure, design patterns (Factory, Strategy), method signatures, and algorithmic execution within a single service.'
      },
      {
        q: 'What are Non-Functional Requirements (NFRs) and why are they critical?',
        a: 'NFRs define system performance and operational criteria (e.g. latency under 150ms, 99.99% availability, data durability, horizontal scalability, and GDPR compliance) rather than specific business features.'
      }
    ],
    relatedTopics: ['horizontal-vs-vertical-scaling', 'cap-theorem', 'latency-vs-throughput']
  },

  {
    id: 'horizontal-vs-vertical-scaling',
    category: 'fundamentals',
    categoryTitle: 'System Design Fundamentals',
    title: 'Horizontal vs Vertical Scaling',
    difficulty: 'Beginner',
    timeToRead: '10 min',
    summary: 'Scale Up (beefier hardware) vs Scale Out (more machines) and how to choose the right strategy.',
    definition: 'Scaling is the ability of a system to handle increasing load by adjusting hardware resources. Vertical scaling (Scaling Up) adds more CPU, RAM, or SSD storage to a single server. Horizontal scaling (Scaling Out) adds more independent machines to a distributed pool.',
    whyItMatters: 'Every server has a physical hardware ceiling. If you only scale vertically, you will eventually hit hardware limits, pay exponentially higher costs, and suffer complete downtime during maintenance. Horizontal scaling provides near-infinite scale and fault tolerance.',
    analogy: 'Vertical scaling is like replacing your bicycle with a sports car, then a semi-truck; eventually, no single vehicle can carry more. Horizontal scaling is hiring a fleet of 50 delivery vans—if one van breaks down, the other 49 keep delivering packages.',
    howItWorks: [
      '1. Vertical Scaling: Upgrade AWS instance from t3.micro (2 vCPU, 1GB RAM) to m6i.32xlarge (128 vCPU, 512GB RAM). Requires zero application architecture changes but incurs downtime during instance resizing.',
      '2. Horizontal Scaling: Place a Stateless Application Server behind a Load Balancer. When traffic spikes, an Auto-Scaling Group spins up 10 new server replicas.',
      '3. Session Handling: Stateless servers store session tokens in a centralized Redis store or JWTs, allowing any server in the fleet to handle any incoming request.'
    ],
    diagram: `
VERTICAL SCALING (SCALE UP):               HORIZONTAL SCALING (SCALE OUT):
+-------------------------+               +-------------+       +-------------+
|     Single Machine      |               |  Server 1   |       |  Server 2   |
|   16 CPU -> 128 CPU     |               | (4 CPU 16G) |       | (4 CPU 16G) |
|   32GB RAM -> 512GB RAM |               +-------------+       +-------------+
|   * Hardware Ceiling    |                      ^                     ^
|   * Single Point Failure|                      |                     |
+-------------------------+                      +----------+----------+
                                                            |
                                                   +-----------------+
                                                   |  Load Balancer  |
                                                   +-----------------+
    `,
    advantages: [
      'Horizontal: Virtually limitless capacity; zero downtime during server upgrades; natural redundancy.',
      'Vertical: Simplest to implement; zero distributed systems complexity; no network serialization overhead.'
    ],
    disadvantages: [
      'Horizontal: Requires stateless services; load balancers required; complex distributed debugging.',
      'Vertical: Hardware limit ceiling; very high cost at the high end; single point of failure (SPOF).'
    ],
    whenToUse: 'Use vertical scaling in early-stage startups and for read-heavy relational databases. Use horizontal scaling for application web tiers, microservices, and modern distributed databases (Cassandra, MongoDB).',
    whenToAvoid: 'Avoid pure vertical scaling when 99.99% availability is mandatory, as single-machine hardware failure causes 100% outage.',
    interviewQuestions: [
      {
        q: 'Why must servers be stateless to achieve true horizontal scaling?',
        a: 'If Server A stores user login state in local RAM, subsequent requests routed to Server B will fail with unauthorized errors. Stateless servers delegate all state to external caches (Redis) or persistent databases, allowing any server to handle any request.'
      }
    ],
    relatedTopics: ['stateless-vs-stateful', 'load-balancing-algorithms', 'database-sharding']
  },

  {
    id: 'latency-vs-throughput',
    category: 'fundamentals',
    categoryTitle: 'System Design Fundamentals',
    title: 'Latency vs Throughput',
    difficulty: 'Beginner',
    timeToRead: '8 min',
    summary: 'Understanding time delay (latency) versus data volume over time (throughput).',
    definition: 'Latency is the duration of time it takes for a single request to travel from client to server and return a response (measured in milliseconds). Throughput is the total volume of requests or data a system can successfully process within a given time window (measured in RPS or MB/s).',
    whyItMatters: 'A system can have high throughput but terrible latency (e.g. processing 10,000 batch jobs per minute, but each takes 3 minutes). Conversely, a system can have sub-5ms latency for 1 user, but collapse under 500 concurrent users. Understanding the trade-off is critical to performance tuning.',
    analogy: 'Think of a highway. Latency is how fast a single car travels from City A to City B (e.g. 60 mph takes 1 hour). Throughput is how many cars pass through a toll booth per minute. Widening the highway to 8 lanes increases throughput dramatically, but does not make a single car drive any faster than 60 mph.',
    howItWorks: [
      '1. Little’s Law governs queues: $L = \\lambda \\times W$, where $L$ is concurrent requests, $\\lambda$ is throughput (arrival rate), and $W$ is average response latency.',
      '2. Latency Percentiles: Never measure average latency; averages hide worst-case outliers. Measure p50 (median), p95, p99, and p99.9 (the latency experienced by the slowest 0.1% of requests).',
      '3. Network Latency vs Processing Latency: Total latency = Network transit time (speed of light in fiber) + OS socket time + Server compute time + Database query time.'
    ],
    diagram: `
+-------------------------------------------------------------------------+
| LATENCY: Duration to complete 1 request (e.g., 42ms)                    |
| Client ============================================> Server [42ms]       |
+-------------------------------------------------------------------------+
| THROUGHPUT: Total requests completed per second (e.g., 5,000 RPS)        |
| Req 1 ----------------> [ Server Pool ] ----> Done                      |
| Req 2 ----------------> [ Server Pool ] ----> Done (5,000 requests/sec) |
| Req 3 ----------------> [ Server Pool ] ----> Done                      |
+-------------------------------------------------------------------------+
    `,
    advantages: [
      'Low Latency: Delights end users, boosts conversion rates (Amazon found 100ms latency cost 1% in sales).',
      'High Throughput: Allows efficient infrastructure utilization and handles viral marketing spikes.'
    ],
    disadvantages: [
      'Optimizing for raw throughput (e.g. heavy batching) often hurts single-request latency.',
      'Sub-millisecond latency optimizations (e.g. memory caches, multi-region edges) increase operational cost.'
    ],
    whenToUse: 'Optimize latency for interactive user applications (web UI, checkout, search autocomplete). Optimize throughput for batch pipelines, video rendering, and analytics ingest.',
    whenToAvoid: 'Do not optimize for extreme sub-10ms latency until profiling proves user satisfaction or revenue is blocked by it.',
    interviewQuestions: [
      {
        q: 'Why should you monitor p99 latency instead of average latency?',
        a: 'If 99 requests take 10ms and 1 request takes 10,000ms (10s), the average is ~109ms, masking the severe failure. A single web page often makes 50 sub-requests; if each has a 1% chance of hitting p99, over 40% of page views will suffer the 10-second hang.'
      }
    ],
    relatedTopics: ['observability-metrics', 'caching-strategies', 'load-balancing-algorithms']
  },

  {
    id: 'cap-theorem',
    category: 'fundamentals',
    categoryTitle: 'System Design Fundamentals',
    title: 'CAP Theorem Demystified',
    difficulty: 'Intermediate',
    timeToRead: '12 min',
    summary: 'Consistency, Availability, and Partition Tolerance: The reality of network partitions in distributed storage.',
    definition: 'Formulated by Eric Brewer, the CAP theorem states that any distributed data store can simultaneously guarantee at most two out of three properties: Consistency (every read receives the most recent write or an error), Availability (every non-failing node returns a non-error response), and Partition Tolerance (the system continues to operate despite dropped or delayed network messages).',
    whyItMatters: 'Network cables get cut, routers reboot, and cloud availability zones experience packet loss. In a distributed network, Network Partitions (P) are an unavoidable physical reality. Therefore, when a partition occurs, a system must trade off between Consistency (CP) and Availability (AP).',
    analogy: 'Imagine two bank branches in New York and London. A fiber cable under the Atlantic snaps (Partition). A customer deposits $100 in London and calls their friend in New York to withdraw it. The NY branch has two choices: Refuse the withdrawal until the cable is fixed (Choose Consistency, sacrifice Availability), or give them the money based on stale records (Choose Availability, risk inconsistent account balance).',
    howItWorks: [
      '1. Consistency (C): Linearizable consistency. All nodes see the exact same data at the same time.',
      '2. Availability (A): Every surviving node returns a valid response without timing out, even if data is slightly stale.',
      '3. Partition Tolerance (P): The cluster maintains functionality when communication between servers is broken.',
      '4. The Realistic Choice: You cannot choose "CA" across a network because you cannot choose to eliminate network failures. In practice, the question is: "When a partition happens, do you prefer CP or AP?"'
    ],
    diagram: `
                          +------------------------+
                          |      CAP THEOREM       |
                          +------------------------+
                                     /  \\
                                    /    \\
                                   /      \\
                        +---------+        +---------+
                        |   CP    |        |   AP    |
                        | System  |        | System  |
                        +---------+        +---------+
                         /       \\          /       \\
             Consistency          Partition          Availability
             (Strict Data)        Tolerance          (Always Responds)
             Examples:            (Required)         Examples:
             HBase, MongoDB,                         Cassandra, DynamoDB,
             Spanner, Redis                          CouchDB, DNS
    `,
    advantages: [
      'CP Systems: Financial transactions, banking, inventory counts, and booking systems stay 100% accurate.',
      'AP Systems: Social media feeds, streaming comments, and product reviews remain accessible even during major regional fiber cuts.'
    ],
    disadvantages: [
      'CP: Throws errors or blocks requests during network hiccups.',
      'AP: Users may see out-of-date or temporarily conflicting data (requiring eventual reconciliation like CRDTs or last-write-wins).'
    ],
    whenToUse: 'Choose CP for payment gateways, stock trading, and auth permissions. Choose AP for shopping carts, notification counters, and social feeds.',
    whenToAvoid: 'Never assume a database is permanently fixed as CP or AP; modern databases like Cassandra and DynamoDB allow tuning consistency per read/write query ($R + W > N$).',
    interviewQuestions: [
      {
        q: 'Why is "CA" (Consistency + Availability without Partition Tolerance) impossible in distributed systems?',
        a: 'Because distributed networks are physically incapable of guaranteeing zero dropped packets. If a network partition occurs, you must either disconnect nodes to maintain consistency (sacrificing A) or allow disconnected nodes to answer independently (sacrificing C).'
      }
    ],
    relatedTopics: ['distributed-consensus', 'acid-vs-base', 'eventual-consistency']
  },

  // =========================================================================
  // 2. NETWORKING FUNDAMENTALS
  // =========================================================================
  {
    id: 'how-the-internet-works',
    category: 'networking',
    categoryTitle: 'Networking Fundamentals',
    title: 'How the Internet Works: URL to Page Load',
    difficulty: 'Beginner',
    timeToRead: '12 min',
    summary: 'The complete journey of typing a URL into a browser until the webpage renders on screen.',
    definition: 'The comprehensive sequence of network protocols and distributed steps involved when a client initiates a web request: DNS lookup, TCP 3-way handshake, TLS cryptographic negotiation, HTTP request routing through CDN/Load Balancers, server compute, and browser DOM rendering.',
    whyItMatters: 'This is the single most common foundation question in senior software engineering interviews. Knowing every hop in the lifecycle enables engineers to pinpoint where latency originates and diagnose networking failures.',
    analogy: 'Typing a URL is like ordering takeout: You look up the restaurant’s phone number in a directory (DNS), call them and confirm both parties can hear each other (TCP Handshake), speak in a secret code so eavesdroppers cannot steal your credit card (TLS), place the order (HTTP Request), the kitchen cooks the food (Server Processing), and you unpack the meal on your dining table (Browser Rendering).',
    howItWorks: [
      '1. Browser checks local DNS cache, OS hosts file, and queries Recursive DNS resolver to resolve hostname (e.g., example.com) to an IP address (e.g., 93.184.216.34).',
      '2. Client initiates TCP 3-Way Handshake with the target server IP: SYN -> SYN-ACK -> ACK.',
      '3. TLS Handshake establishes an encrypted session using asymmetric key exchange (ECDHE) and symmetric session encryption (AES-GCM).',
      '4. Client sends HTTP GET request with headers (User-Agent, Accept-Encoding, Cookies).',
      '5. Reverse Proxy / CDN edge terminates TLS, checks cache, and forwards request to origin Application Server.',
      '6. Server executes business logic, queries database/cache, and returns HTTP 200 OK with HTML payload.',
      '7. Browser parses HTML, builds DOM tree, downloads CSS/JS, and executes layout and paint.'
    ],
    diagram: `
1. Client Browser -------- (DNS Query: api.app.com) --------> 2. DNS Server (Returns 104.21.4.19)
         |
         | --- TCP Handshake [SYN / SYN-ACK / ACK] ---------> 3. Cloudflare CDN / Edge
         | --- TLS 1.3 Key Exchange [ClientHello / ServerHello]
         |
         | --- HTTP/2 GET /feed?page=1 ---------------------> 4. API Gateway / Nginx
                                                                     |
                                                              5. Load Balancer
                                                                     |
                                                              6. App Server Fleet
                                                                     |
                                                              +------+------+
                                                              |             |
                                                           7. Cache      8. SQL DB
    `,
    advantages: [
      'Layered abstraction (OSI/TCP-IP models) allows browser developers to write web apps without worrying about physical undersea fiber optics.'
    ],
    disadvantages: [
      'Multiple sequential round-trips (DNS + TCP + TLS) create latency before the first byte of application data even transmits.'
    ],
    whenToUse: 'Fundamental understanding required for debugging connection timeouts, SSL certificate errors, CDN cache misses, and CORS problems.',
    whenToAvoid: 'N/A (Universal computing foundation).',
    interviewQuestions: [
      {
        q: 'What is connection reuse and how does HTTP Keep-Alive / HTTP/2 multiplexing improve latency?',
        a: 'Creating a new TCP + TLS connection takes 3 to 4 network round-trips (~100-300ms). HTTP Keep-Alive leaves the TCP socket open so subsequent requests reuse the established tunnel. HTTP/2 goes further by multiplexing hundreds of parallel requests over a single TCP connection without Head-of-Line blocking at the application layer.'
      }
    ],
    relatedTopics: ['tcp-vs-udp', 'rest-vs-grpc', 'websockets-vs-sse']
  },

  {
    id: 'tcp-vs-udp',
    category: 'networking',
    categoryTitle: 'Networking Fundamentals',
    title: 'TCP vs UDP Protocols',
    difficulty: 'Beginner',
    timeToRead: '9 min',
    summary: 'Reliable, ordered connection streams (TCP) vs fast, lightweight datagram packets (UDP).',
    definition: 'TCP (Transmission Control Protocol) is a connection-oriented transport protocol that guarantees reliable delivery, error checking, and exact packet ordering. UDP (User Datagram Protocol) is a connectionless protocol that sends packets (datagrams) with minimum overhead and no delivery guarantee.',
    whyItMatters: 'Choosing the wrong transport protocol can ruin user experience. Using TCP for live voice calls causes awkward audio buffering when a packet drops. Using UDP for financial bank transfers causes lost deposit records.',
    analogy: 'TCP is a certified registered postal delivery with tracking numbers and signature confirmation upon delivery. If a parcel is lost, the post office automatically resends it. UDP is shouting a sports commentary to a crowd through a megaphone: it is instantaneous, but if someone coughs and misses a sentence, you do not stop the game to repeat it.',
    howItWorks: [
      '1. TCP Handshake: 3-way handshake (SYN, SYN-ACK, ACK) establishes connection sequence numbers.',
      '2. TCP Flow & Congestion Control: Uses sliding windows and algorithms like BBR/Cubic to slow down transmission when routers get congested.',
      '3. UDP Transmission: Wraps payload in a lightweight 8-byte header and blasts it to destination IP/port immediately with zero handshake.',
      '4. Modern Evolution: HTTP/3 is built on QUIC, which runs on top of UDP to combine the speed of UDP with connection-level encryption and user-space reliability.'
    ],
    diagram: `
TCP (RELIABLE & ORDERED):
Client -------- [SYN] --------> Server
Client <---- [SYN-ACK] -------- Server
Client -------- [ACK] --------> Server (Connected!)
Client ---- [Packet 1] -------> Server (ACK 1 returned)
Client ---- [Packet 2 Lost] --> Server (Retransmitted!)

UDP (FIRE AND FORGET):
Client -------- [Datagram 1] --------> Server
Client -------- [Datagram 2] --------> Server (No ACK, No Retries)
Client -------- [Datagram 3] --------> Server
    `,
    advantages: [
      'TCP: 100% data integrity; guaranteed ordering; automatic congestion backoff.',
      'UDP: Minimal latency (zero handshake round-trips); tiny 8-byte header overhead; ideal for real-time broadcasts.'
    ],
    disadvantages: [
      'TCP: Head-of-line blocking (if packet 2 is delayed, packets 3 and 4 must wait in buffer); higher header overhead (20-60 bytes).',
      'UDP: Packets can arrive out of order, duplicated, or disappear completely with zero notification.'
    ],
    whenToUse: 'TCP: Web browsing (HTTP/1.1, HTTP/2), email (SMTP), file transfers (FTP/SSH), database connections. UDP: Online multiplayer gaming, VoIP (Zoom, Discord), live video streaming, DNS lookups, and HTTP/3 (QUIC).',
    whenToAvoid: 'Never use plain UDP when missing a single byte corrupts the message (e.g., zip files, financial transactions, database writes).',
    interviewQuestions: [
      {
        q: 'Why does HTTP/3 choose UDP instead of TCP?',
        a: 'In HTTP/2 over TCP, if a single TCP packet is dropped, all parallel multiplexed streams stall until that one packet is retransmitted (TCP Head-of-Line Blocking). HTTP/3 uses QUIC over UDP, implementing loss recovery independently per stream so packet loss in Stream A never delays Stream B.'
      }
    ],
    relatedTopics: ['how-the-internet-works', 'websockets-vs-sse', 'rest-vs-grpc']
  },

  {
    id: 'websockets-vs-sse',
    category: 'networking',
    categoryTitle: 'Networking Fundamentals',
    title: 'WebSockets vs Server-Sent Events (SSE) vs Polling',
    difficulty: 'Intermediate',
    timeToRead: '11 min',
    summary: 'Bi-directional real-time communication vs server push vs polling alternatives.',
    definition: 'Techniques for real-time data exchange: Short Polling repeatedly requests data on a fixed timer; Long Polling holds requests open until the server has new data; Server-Sent Events (SSE) opens a persistent one-way HTTP stream from server to client; WebSockets upgrades an HTTP connection to a full-duplex bi-directional TCP socket.',
    whyItMatters: 'Real-time features like chat apps, live stock tickers, AI text streaming, and collaborative documents require pushing updates to clients without the massive CPU and network overhead of polling.',
    analogy: 'Short Polling is a child in the back seat asking "Are we there yet?" every 5 seconds. Long Polling is asking the driver "Tell me when we arrive" and waiting silently until they answer. SSE is listening to a radio news broadcast: you listen continuously as updates stream out, but you cannot talk back through the radio. WebSockets is a two-way phone call: both people can talk and listen simultaneously.',
    howItWorks: [
      '1. Short Polling: Client sends `setInterval(() => fetch("/updates"), 3000)`. 99% of requests return empty 304/200, wasting bandwidth.',
      '2. Long Polling: Client sends request; server suspends response until new message arrives or timeout expires; client immediately reconnects.',
      '3. Server-Sent Events (SSE): Client connects via `new EventSource("/stream")` over standard HTTP/2 with `text/event-stream`. Automatic reconnection and message IDs built into browser.',
      '4. WebSockets: Client sends HTTP request with `Upgrade: websocket`. Server responds `101 Switching Protocols`. The socket stays open for lightweight binary/text frames in both directions.'
    ],
    diagram: `
POLLING:                   SSE (ONE-WAY STREAM):         WEBSOCKETS (BI-DIRECTIONAL):
Client      Server         Client          Server         Client            Server
  |--- Req --->|             |--- HTTP Get --->|            |--- WS Upgrade ->|
  |<-- Resp ---|             |                 |            |<-- 101 Switch --|
  | (pause 3s) |             |<-- Data event 1-|            |<=== Msg 1 =====>|
  |--- Req --->|             |<-- Data event 2-|            |<=== Msg 2 =====>|
  |<-- Resp ---|             |<-- Data event 3-|            |<=== Msg 3 =====>|
    `,
    advantages: [
      'SSE: Simple HTTP/2 protocol; automatic reconnects; works through corporate firewalls; perfect for AI LLM token streaming.',
      'WebSockets: Ultra-low latency; bi-directional; binary frame support; lowest per-message overhead (~2-10 bytes).'
    ],
    disadvantages: [
      'SSE: Unidirectional (client must use separate HTTP POSTs to send messages to server).',
      'WebSockets: Stateful connections complicate load balancing; requires sticky sessions or Redis Pub/Sub backplane; bypasses HTTP caching.'
    ],
    whenToUse: 'Use SSE for ChatGPT-style text streaming, stock price feeds, and notification bells. Use WebSockets for multiplayer gaming, live chat applications, and real-time whiteboards (Figma/Google Docs).',
    whenToAvoid: 'Avoid WebSockets when updates occur infrequently (e.g. daily reports); standard REST endpoints are far simpler to maintain.',
    interviewQuestions: [
      {
        q: 'How do you scale WebSockets horizontally across 100 backend servers?',
        a: 'Because WebSockets are persistent stateful connections, User A on Server 1 cannot talk directly to User B on Server 5. You connect all WebSocket servers to a distributed Pub/Sub message broker (like Redis Pub/Sub, Kafka, or RabbitMQ). When User A sends a message, Server 1 publishes it to Redis, which fans out to Server 5 to deliver to User B.'
      }
    ],
    relatedTopics: ['tcp-vs-udp', 'api-design-rest', 'load-balancing-algorithms']
  },

  // =========================================================================
  // 3. API DESIGN
  // =========================================================================
  {
    id: 'api-design-rest',
    category: 'api-design',
    categoryTitle: 'API Design & Protocols',
    title: 'REST API Best Practices',
    difficulty: 'Beginner',
    timeToRead: '12 min',
    summary: 'Resource-based URL naming, HTTP verbs, status codes, pagination, and error contracts.',
    definition: 'REST (Representational State Transfer) is an architectural style for networked applications that uses standard HTTP verbs (GET, POST, PUT, PATCH, DELETE) to manipulate stateless resources identified by clean URIs.',
    whyItMatters: 'Bad API design creates confusion, breaks backward compatibility, causes frontend bugs, and slows down development teams. A well-designed REST API is intuitive, self-documenting, and scalable.',
    analogy: 'A well-designed API is like a clean filing cabinet. Drawers are labeled with plural nouns (`/customers`, `/invoices`), and you perform actions using standard verbs: look inside (GET), add a new folder (POST), replace a folder (PUT), update one page (PATCH), or shred it (DELETE).',
    howItWorks: [
      '1. Nouns not Verbs: Use `GET /api/v1/orders/123`, NEVER `GET /api/v1/getOrder?id=123` or `POST /api/v1/deleteOrder`.',
      '2. Plural Collections: Always prefer plural names: `/api/v1/users`, `/api/v1/products`.',
      '3. Nesting for Relationships: `GET /api/v1/authors/42/books` to fetch books belonging to author 42.',
      '4. HTTP Verbs: GET (Read, safe, idempotent), POST (Create, non-idempotent), PUT (Full update, idempotent), PATCH (Partial update), DELETE (Remove, idempotent).',
      '5. Status Codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized (missing credentials), 403 Forbidden (insufficient permissions), 404 Not Found, 409 Conflict, 429 Too Many Requests, 500 Internal Error, 503 Service Unavailable.'
    ],
    diagram: `
CLIENT REQUEST:
GET /api/v1/products?category=electronics&page=2&limit=20
Headers: Authorization: Bearer <jwt_token>

SERVER RESPONSE:
HTTP/1.1 200 OK
Content-Type: application/json
{
  "data": [
    { "id": "prod_101", "name": "Wireless Headphones", "price": 99.99 }
  ],
  "pagination": {
    "page": 2,
    "limit": 20,
    "totalRecords": 345,
    "totalPages": 18,
    "hasNext": true
  }
}
    `,
    advantages: [
      'Universal standardization: Every language and framework has native HTTP client support.',
      'Stateless caching: HTTP proxies and browser caches automatically cache GET responses using ETag and Cache-Control headers.'
    ],
    disadvantages: [
      'Over-fetching / Under-fetching: Clients often download fields they do not need, or must make 4 round-trips to assemble a dashboard.',
      'Textual JSON overhead compared to binary protocols like Protobuf/gRPC.'
    ],
    whenToUse: 'Public-facing third-party APIs, web and mobile client communications, and standard CRUD business microservices.',
    whenToAvoid: 'High-throughput internal microservice-to-microservice calls where microsecond latency and compact binary payloads are essential (use gRPC instead).',
    interviewQuestions: [
      {
        q: 'What makes an HTTP method "Idempotent"? Give examples.',
        a: 'An operation is idempotent if executing it once has the exact same side-effect as executing it multiple times consecutively. GET, PUT, and DELETE are idempotent (calling DELETE /users/5 ten times still leaves user 5 deleted). POST is NOT idempotent (calling POST /payments ten times may bill the customer ten times).'
      }
    ],
    relatedTopics: ['rest-vs-grpc', 'api-rate-limiting', 'idempotency-keys']
  },

  {
    id: 'rest-vs-grpc',
    category: 'api-design',
    categoryTitle: 'API Design & Protocols',
    title: 'REST vs gRPC vs GraphQL',
    difficulty: 'Intermediate',
    timeToRead: '11 min',
    summary: 'When to choose JSON over HTTP, binary Protobuf over HTTP/2, or flexible graph queries.',
    definition: 'REST uses JSON over HTTP/1.1 or HTTP/2 for resource endpoints. gRPC is Google’s open-source RPC framework that compiles Protocol Buffers (Protobuf) into high-performance binary over HTTP/2. GraphQL is an API query language by Meta that allows clients to specify the exact fields they require.',
    whyItMatters: 'Modern architectures mix these protocols: GraphQL for complex mobile app frontends, REST for public integrations, and gRPC for internal microservice communication where serialization performance matters.',
    analogy: 'REST is a fixed set menu at a restaurant. GraphQL is a buffet where you pick only the two items you want on your plate. gRPC is a pneumatic tube system between chefs in the kitchen communicating in rapid telegraph code.',
    howItWorks: [
      '1. Protocol Buffers (gRPC): Defined in `.proto` files with strict typing. Serializes to binary (typically 5x to 10x smaller and faster than JSON parsing).',
      '2. GraphQL Queries: Client posts `query { user(id: 1) { name, email, orders { total } } }`. The server returns exactly those keys, eliminating over-fetching.',
      '3. Network Transport: gRPC strictly uses HTTP/2 multiplexing, header compression (HPACK), and bi-directional streaming.'
    ],
    diagram: `
+--------------------------------------------------------------------------+
| PROTOCOL COMPARISON                                                      |
+-------------------+-----------------------+------------------------------+
| Feature           | REST (JSON)           | gRPC (Protobuf)              |
+-------------------+-----------------------+------------------------------+
| Payload Format    | Text / JSON           | Binary Protocol Buffer       |
| Transport         | HTTP/1.1 or HTTP/2    | Strictly HTTP/2              |
| Contract          | OpenAPI / Swagger     | Strictly typed .proto schema |
| Speed / Size      | Moderate              | Ultra-fast / Very small      |
| Browser Support   | Universal             | Requires gRPC-Web proxy      |
| Best Use Case     | Public & Mobile APIs  | Internal Microservices       |
+-------------------+-----------------------+------------------------------+
    `,
    advantages: [
      'gRPC: 7-10x faster serialization; strict compile-time type safety; built-in code generation in 10+ languages.',
      'GraphQL: Solves over-fetching and under-fetching for complex mobile views with single queries.',
      'REST: Zero learning curve; ubiquitous tooling; standard browser fetch support.'
    ],
    disadvantages: [
      'gRPC: Payloads are not human-readable; browser support requires translation proxies.',
      'GraphQL: Difficult to cache at the CDN HTTP layer; complex nested queries can trigger N+1 database performance catastrophes.'
    ],
    whenToUse: 'Use gRPC for backend microservice-to-microservice traffic. Use GraphQL for complex mobile dashboards with varied screens. Use REST for public APIs and standard SaaS integrations.',
    whenToAvoid: 'Do not adopt GraphQL solely because it is popular if your application only performs simple CRUD queries.',
    interviewQuestions: [
      {
        q: 'Why is Protobuf serialization so much faster than JSON serialization?',
        a: 'JSON is text-based and requires CPU-intensive string scanning, quote escaping, and type inference on every parse. Protobuf encodes field keys as small numeric tags (varints) and stores data in compact binary offsets, requiring minimal CPU work to unpack directly into memory structs.'
      }
    ],
    relatedTopics: ['api-design-rest', 'how-the-internet-works', 'microservices-architecture']
  },

  // =========================================================================
  // 4. DATABASE DESIGN & SCALING
  // =========================================================================
  {
    id: 'sql-vs-nosql',
    category: 'databases',
    categoryTitle: 'Database Design & Scaling',
    title: 'SQL vs NoSQL: The Definitive Guide',
    difficulty: 'Beginner',
    timeToRead: '14 min',
    summary: 'Relational ACID databases vs Key-Value, Document, Wide-Column, and Graph stores.',
    definition: 'SQL (Relational) databases organize structured data into predefined schemas with tables, rows, columns, and foreign key relationships, enforcing strict ACID transactions. NoSQL (Non-Relational) databases use flexible data models (Document, Key-Value, Wide-Column, or Graph) optimized for horizontal scalability, high write throughput, and schema flexibility.',
    whyItMatters: 'Picking the wrong database is the most expensive mistake in system design. Migrating a 20-terabyte database from NoSQL to SQL (or vice versa) while serving live production traffic takes months of painful engineering.',
    analogy: 'SQL is like an Excel spreadsheet workbook with strict formula columns and foreign key cross-references: you cannot put a string in a currency column, and rows are neatly structured. NoSQL is like a folder of flexible JSON text files: each file can have completely different fields without asking permission.',
    howItWorks: [
      '1. Relational (PostgreSQL, MySQL): Normalized schemas (3NF) to eliminate data redundancy. Complex JOINs allow querying across multiple tables. ACID transactions guarantee money balances never corrupt.',
      '2. Document (MongoDB, CouchDB): Stores data as self-contained BSON/JSON documents. Ideal when data has nested hierarchies (e.g. blog post with comments and tags).',
      '3. Key-Value (Redis, DynamoDB): Blazing fast $O(1)$ lookups by primary key. Perfect for sessions, user carts, and caching.',
      '4. Wide-Column (Cassandra, ScyllaDB): Optimized for write-heavy, time-series, or multi-petabyte datasets distributed across hundreds of nodes.',
      '5. Graph (Neo4j, Amazon Neptune): Optimized for traversing interconnected nodes and edges (social graphs, fraud detection networks).'
    ],
    diagram: `
SQL RELATIONAL (PostgreSQL):
[Users Table] (id, name, email)
      | 1
      | 
      | Many
[Orders Table] (id, user_id, total, created_at) ---> JOIN Queries on Foreign Keys

NoSQL DOCUMENT (MongoDB):
{
  "_id": "order_789",
  "customer": { "name": "Alice", "email": "alice@example.com" },
  "items": [
    { "sku": "A1", "name": "Coffee Maker", "qty": 1, "price": 49.99 }
  ],
  "total": 49.99
} (Entire order stored in 1 atomic document without JOINs)
    `,
    advantages: [
      'SQL: ACID compliance ensures data integrity; powerful expressive SQL queries with aggregations and JOINs; mature ecosystem.',
      'NoSQL: Natural horizontal scaling across commodity servers; flexible schemas without blocking schema migrations; high write speeds.'
    ],
    disadvantages: [
      'SQL: Challenging to scale writes horizontally beyond a single primary node; schema alterations on billion-row tables can lock databases.',
      'NoSQL: Denormalized data means updates must be duplicated across multiple records; eventual consistency risks reading stale data.'
    ],
    whenToUse: 'SQL: Financial systems, e-commerce checkouts, SaaS multi-tenant apps with relational models. NoSQL: High-velocity analytics, user activity streams, real-time gaming leaderboards, and large document catalogs.',
    whenToAvoid: 'Avoid NoSQL when your business requires complex multi-table JOINs and strict multi-record ACID guarantees.',
    interviewQuestions: [
      {
        q: 'When would you deliberately denormalize data in a relational database?',
        a: 'When read query volume is extremely high and multi-table JOINs are choking database CPU. By pre-computing and duplicating foreign data into the parent table (e.g., storing customer_name directly inside the orders table), you turn an expensive multi-table JOIN into a single fast index lookup, trading extra storage for speed.'
      }
    ],
    relatedTopics: ['database-indexing', 'database-sharding', 'acid-vs-base']
  },

  {
    id: 'database-indexing',
    category: 'databases',
    categoryTitle: 'Database Design & Scaling',
    title: 'Database Indexing: B-Trees and Hash Indexes',
    difficulty: 'Intermediate',
    timeToRead: '12 min',
    summary: 'How indexes accelerate queries from $O(N)$ full table scans to $O(\\log N)$ tree lookups, and the write performance cost.',
    definition: 'A database index is a specialized data structure (most commonly a self-balancing B+ Tree) that maintains an ordered reference to table rows, allowing the database query engine to locate matching rows in logarithmic time $O(\\log N)$ instead of scanning every page on disk.',
    whyItMatters: 'On a table with 50 million rows, a query without an index forces a Full Table Scan that takes 15 seconds and maxes out disk I/O. With a B+ Tree index, the exact same query takes 2 milliseconds.',
    analogy: 'Imagine looking for a recipe in a 1,000-page cookbook. Without an index, you must flip through every single page from 1 to 1,000 (Full Table Scan). An index is the alphabetical index at the back of the book: look up "Chocolate Soufflé", see page 412, and jump straight there.',
    howItWorks: [
      '1. B+ Tree Structure: Internal nodes store keys and child pointers; all actual row pointers or row data live in leaf nodes.',
      '2. Doubly-Linked Leaves: Leaf nodes are connected via a doubly-linked list, making range queries (`WHERE age BETWEEN 20 AND 30`) fast by seeking to the first node and scanning sequentially.',
      '3. Composite Indexes: An index on `(last_name, first_name)` can answer queries on `last_name` OR `(last_name, first_name)`, but CANNOT answer queries searching only for `first_name` (The Leftmost Prefix Rule).',
      '4. Write Penalty: Every `INSERT`, `UPDATE`, or `DELETE` must rebalance and write to every index on that table, slowing down write-heavy workloads.'
    ],
    diagram: `
B+ TREE ROOT NODE:                       [ 50 ]
                                        /      \\
INTERNAL NODES:                 [ 25 ]            [ 75 ]
                               /      \\          /      \\
LEAF NODES (Data):      [ 10, 20 ] <-> [ 30, 40 ] <-> [ 60, 70 ] <-> [ 80, 90 ]
                         |   |          |   |          |   |          |   |
POINTERS TO DISK ROWS: [Row Data]     [Row Data]     [Row Data]     [Row Data]
    `,
    advantages: [
      'Accelerates `SELECT`, `WHERE`, `ORDER BY`, `GROUP BY`, and `JOIN` clauses from seconds to milliseconds.',
      'Enforces data uniqueness constraints (`UNIQUE INDEX`).'
    ],
    disadvantages: [
      'Disk Space: Indexes consume 20% to 50% extra disk space beyond raw table data.',
      'Write Overhead: Slows down insert and update speeds because the tree must balance itself on changes.'
    ],
    whenToUse: 'Columns frequently referenced in `WHERE` clauses, `JOIN` conditions, and `ORDER BY` sorting.',
    whenToAvoid: 'Low cardinality columns (e.g. gender or boolean flags where 50% of rows match); tables with millions of writes per second and minimal reads.',
    interviewQuestions: [
      {
        q: 'Why do relational databases use B+ Trees instead of Binary Search Trees (BST) or Red-Black Trees for on-disk indexes?',
        a: 'Binary search trees have low fan-out, resulting in very deep trees (many levels). Disk reads are slow block operations. B+ Trees have huge fan-out (hundreds of keys per node), keeping the tree depth to just 3 or 4 levels even for millions of rows. This minimizes disk I/O seeks.'
      }
    ],
    relatedTopics: ['sql-vs-nosql', 'database-sharding', 'caching-strategies']
  },

  {
    id: 'database-sharding',
    category: 'databases',
    categoryTitle: 'Database Design & Scaling',
    title: 'Database Sharding & Replication',
    difficulty: 'Advanced',
    timeToRead: '14 min',
    summary: 'Horizontal database partitioning, range vs hash sharding, consistent hashing, and primary-replica setups.',
    definition: 'Sharding (Horizontal Partitioning) is the architectural practice of splitting a single database table across multiple physical database server instances. Each individual partition is called a Shard, holding a subset of the total dataset determined by a Shard Key.',
    whyItMatters: 'When a database grows beyond 5 terabytes or traffic exceeds 50,000 writes per second, no single physical server can handle the load. Sharding distributes both storage and write throughput across a fleet of independent database machines.',
    analogy: 'Imagine a library so large that a single building collapses under the weight of books. Sharding is opening 26 separate library buildings across the city: Building A holds authors with names starting with A, Building B holds B, and so on.',
    howItWorks: [
      '1. Read Replicas (Replication): One Primary node handles all `INSERT/UPDATE/DELETE` writes and streams write-ahead logs (WAL) to multiple Read Replicas. Clients send read queries to replicas, scaling read capacity.',
      '2. Range-Based Sharding: Shards data based on value ranges (e.g. Users with ID 1-1M on Shard 1, 1M-2M on Shard 2). Can create Hot Spot bottlenecks if new users flood the highest range.',
      '3. Hash-Based Sharding: Applies a hash function to the Shard Key: `ShardID = Hash(UserID) % TotalShards`. Distributes data evenly across shards.',
      '4. Consistent Hashing: Maps both shards and keys onto a virtual ring (0 to $2^{32}-1$). Adding or removing a shard only moves $K/N$ keys, avoiding complete rehashing.'
    ],
    diagram: `
CLIENT WRITE --------> [ Router / Coordinator ]
                              |
              +---------------+---------------+
              |                               |
    Hash(UserID) % 3 == 0           Hash(UserID) % 3 == 1
              v                               v
       +--------------+                +--------------+
       |   SHARD 1    |                |   SHARD 2    |
       | Users 0-33%  |                | Users 34-66% |
       +--------------+                +--------------+
              | Replication                   | Replication
              v                               v
       +--------------+                +--------------+
       | Read Replica |                | Read Replica |
       +--------------+                +--------------+
    `,
    advantages: [
      'Infinite Write Scaling: Adding shards multiplies total write IOPS and storage capacity.',
      'Blast Radius Reduction: If Shard 3 crashes, only 20% of users are affected; the other 80% continue working uninterrupted.'
    ],
    disadvantages: [
      'Cross-Shard JOINs: Joining tables located on different physical shards is notoriously slow and complex.',
      'Re-sharding Complexity: Adding a new shard requires redistributing gigabytes of live records across servers.',
      'Distributed Transactions: Multi-shard updates require 2-Phase Commit (2PC) or Saga patterns, increasing latency.'
    ],
    whenToUse: 'When write traffic or storage exceeds single-server vertical limits (typically > 5TB data or > 30,000 writes/sec).',
    whenToAvoid: 'Premature sharding. Always exhaust Read Replicas, Caching (Redis), and Table Partitioning before committing to distributed sharding.',
    interviewQuestions: [
      {
        q: 'What is a Hot Shard (or Hot Partition) and how do you mitigate it?',
        a: 'A Hot Shard occurs when an uneven distribution of traffic overwhelms one specific shard (e.g. a celebrity user like Taylor Swift with 100M followers receiving millions of writes on Shard 4). Mitigations include salting the shard key (appending random digits `UserID_0`, `UserID_1` to distribute writes) or caching the celebrity data in distributed memory.'
      }
    ],
    relatedTopics: ['sql-vs-nosql', 'cap-theorem', 'caching-strategies']
  },

  // =========================================================================
  // 5. CACHING & PERFORMANCE
  // =========================================================================
  {
    id: 'caching-strategies',
    category: 'caching',
    categoryTitle: 'Caching & Data Storage',
    title: 'Caching Patterns & Invalidation Strategies',
    difficulty: 'Intermediate',
    timeToRead: '13 min',
    summary: 'Cache-Aside, Write-Through, Write-Behind, TTLs, and cache stampede prevention.',
    definition: 'Caching is the technique of storing copies of frequently accessed data in fast, in-memory hardware (like RAM via Redis or Memcached) to serve read requests in microseconds, bypassing slow disk-bound database queries.',
    whyItMatters: 'RAM access takes ~100 nanoseconds; SSD reads take ~100 microseconds; database network queries take ~10 to 50 milliseconds. A high cache hit ratio (e.g. 95%) allows a database to comfortably handle 20x higher user traffic without scaling hardware.',
    analogy: 'Imagine an office worker who constantly needs a specific paper form. Walking to the basement archive room to fetch it every single time is querying the database. Keeping a stack of 10 copies directly on top of your desk is caching. If the legal department updates the form, throwing away the old copies on your desk is cache invalidation.',
    howItWorks: [
      '1. Cache-Aside (Lazy Loading): Application checks cache first. On Cache Hit, return data. On Cache Miss, read from database, write value into cache with a TTL (Time-To-Live), and return.',
      '2. Write-Through: Application writes data to the cache; the cache synchronously writes to the database before confirming success. Guarantees consistency, but slows writes.',
      '3. Write-Behind (Write-Back): Application writes to cache immediately; the cache asynchronously flushes batched writes to the database in the background. Ultra-fast writes, but risks data loss if cache crashes.',
      '4. Eviction Policies: When cache RAM fills up: LRU (Least Recently Used), LFU (Least Frequently Used), and FIFO (First In, First Out).'
    ],
    diagram: `
CACHE-ASIDE PATTERN (READ FLOW):
Client ---- 1. GET /user/42 ----> App Server
                                       |
                   +--- 2. Check Cache | (Cache Miss)
                   |                   v
                   |          +------------------+
                   |          |   Redis Cache    |
                   |          +------------------+
                   |                   ^
                   |                   | 4. Populate Cache
                   v                   |
          +------------------+---------+
          | Primary Database | 3. Query DB
          +------------------+
    `,
    advantages: [
      'Sub-millisecond read latency.',
      'Shields primary databases from read traffic spikes (e.g. Black Friday or viral tweets).'
    ],
    disadvantages: [
      'Cache Invalidation is hard: "There are only two hard things in Computer Science: cache invalidation and naming things." — Phil Karlton.',
      'Stale Data: Reading data that was updated in the DB but not yet invalidated in the cache.'
    ],
    whenToUse: 'Read-heavy systems ($> 80\\%$ reads) with repetitive query patterns (product catalogs, user profiles, trending feeds).',
    whenToAvoid: 'Write-heavy data that is rarely read again; strictly transactional financial records where reading stale data causes overdrafts.',
    interviewQuestions: [
      {
        q: 'What is a Cache Stampede (or Thundering Herd) and how do you prevent it?',
        a: 'A Cache Stampede occurs when a very popular cached key (e.g. homepage banner) expires under heavy load, causing 10,000 concurrent requests to hit the database simultaneously to recompute the value. Mitigations include mutex locking (only 1 thread queries DB while others wait), probabilistic early expiration (XFetch), or background refresh crons before TTL expires.'
      }
    ],
    relatedTopics: ['database-indexing', 'latency-vs-throughput', 'redis-deep-dive']
  },

  // =========================================================================
  // 6. LOAD BALANCING
  // =========================================================================
  {
    id: 'load-balancing-algorithms',
    category: 'load-balancing',
    categoryTitle: 'Load Balancing & Proxies',
    title: 'Load Balancing: L4 vs L7 & Algorithms',
    difficulty: 'Intermediate',
    timeToRead: '12 min',
    summary: 'Layer 4 transport routing vs Layer 7 application routing, health checks, and balancing algorithms.',
    definition: 'A Load Balancer acts as a reverse-proxy traffic cop that sits in front of a server fleet, distributing incoming network traffic evenly across healthy backend instances to maximize throughput, minimize latency, and ensure zero downtime.',
    whyItMatters: 'Without a load balancer, if one server crashes, all users routed to it experience an outage. If one server receives 90% of traffic, it overheats while neighboring servers sit idle. Load balancing enables seamless horizontal scaling and rolling deployments.',
    analogy: 'A load balancer is the queue manager at an airport security checkpoint. Instead of letting travelers randomly cram into Line 1 while Line 4 is empty, the manager checks which security agent is free and directs the next passenger to the shortest queue.',
    howItWorks: [
      '1. Layer 4 (Transport): Operates at TCP/UDP level. Routes packets based on IP address and port without inspecting the HTTP payload. Ultra-fast, low CPU overhead.',
      '2. Layer 7 (Application): Operates at HTTP/HTTPS level. Inspects URL paths, HTTP headers, and cookies to route `/api/videos` to video servers and `/api/checkout` to payment servers.',
      '3. Health Checks: Periodically pings backend servers (`GET /health`). If a server fails 3 consecutive checks, it is removed from the routing pool automatically.',
      '4. Algorithms: Round Robin, Weighted Round Robin, Least Connections, IP Hash, and Consistent Hashing.'
    ],
    diagram: `
                     +---------------------------------------+
                     |             Internet Traffic          |
                     +---------------------------------------+
                                         |
                                         v
                     +---------------------------------------+
                     |    Layer 7 Load Balancer (Nginx/ALB)   |
                     |  Routes based on Path & Health Checks |
                     +---------------------------------------+
                                  /      |      \\
                      /api/users /       |       \\ /api/images
                                v        v        v
                         +--------+ +--------+ +--------+
                         | Server | | Server | | Server |
                         |   #1   | |   #2   | |   #3   |
                         +--------+ +--------+ +--------+
    `,
    advantages: [
      'High Availability: Automatically routes around crashed servers within seconds.',
      'Smart Routing: Layer 7 allows path-based routing, SSL termination, and rate limiting at the edge.'
    ],
    disadvantages: [
      'Potential Single Point of Failure (SPOF) if only a single load balancer instance is deployed (solve with active-passive VRRP/Keepalived or DNS Anycast).',
      'Sticky sessions can lead to uneven load if some sessions are significantly heavier than others.'
    ],
    whenToUse: 'In front of every production application server tier, microservice cluster, and database read replica pool.',
    whenToAvoid: 'Direct single-instance dev environments or simple static sites hosted directly on object storage/CDNs.',
    interviewQuestions: [
      {
        q: 'When should you use the "Least Connections" algorithm instead of "Round Robin"?',
        a: 'Round Robin assumes all requests take roughly equal processing time. In systems with long-lived connections or variable request weights (e.g. video streaming, file conversions, or complex database queries), Round Robin can overload a server that is still processing 20 heavy jobs. Least Connections sends new requests to whichever server currently has the fewest active open connections.'
      }
    ],
    relatedTopics: ['horizontal-vs-vertical-scaling', 'caching-strategies', 'api-design-rest']
  },

  // =========================================================================
  // 7. DISTRIBUTED SYSTEMS
  // =========================================================================
  {
    id: 'distributed-consensus',
    category: 'distributed-systems',
    categoryTitle: 'Distributed Systems Core',
    title: 'Distributed Consensus: Raft & Paxos',
    difficulty: 'Advanced',
    timeToRead: '15 min',
    summary: 'How distributed nodes agree on a single source of truth in the presence of node crashes and network latency.',
    definition: 'Consensus is the fundamental problem in distributed computing where multiple independent computers (nodes) must reach mutual agreement on data values, leader election, or state machine transitions, even when some nodes crash or messages are delayed or reordered.',
    whyItMatters: 'Without consensus, distributed databases suffer from Split-Brain syndromes (two leaders accepting conflicting writes simultaneously), destroying database consistency. Raft powers etcd (Kubernetes), Consul, and Kafka’s KRaft.',
    analogy: 'Imagine a committee of 5 board members who only communicate via letters. Some postal carriers lose letters or arrive late. Consensus is an agreed-upon rule: "No business decision is official unless at least 3 members (a Quorum: $(N/2)+1$) sign off on the exact same proposal."'
    ,
    howItWorks: [
      '1. Quorum Rule: In an $N$-node cluster, any decision requires agreement from a majority: $\\lfloor N/2 \\rfloor + 1$. A 5-node cluster survives 2 dead nodes; a 3-node cluster survives 1 dead node.',
      '2. Raft Roles: Nodes exist in one of three states: Follower, Candidate, or Leader.',
      '3. Leader Election: If a Follower receives no heartbeat within a randomized election timeout (e.g. 150-300ms), it becomes a Candidate, increments the Term number, votes for itself, and requests votes.',
      '4. Log Replication: The elected Leader receives client writes, appends them to its local log, sends `AppendEntries` RPCs to followers, and only commits the entry once a majority confirm.'
    ],
    diagram: `
RAFT LEADER ELECTION (5-Node Quorum = 3):
[ Node 1 ] Follower (Hears Heartbeat)
[ Node 2 ] Follower (Hears Heartbeat)
[ Node 3 ] LEADER   (Broadcasts Heartbeats to maintain authority)
[ Node 4 ] Follower (Hears Heartbeat)
[ Node 5 ] CRASHED  (Offline)

Client ---> Writes to Leader (Node 3) ---> Replicates to Node 1, 2, 4 ---> Majority Confirmed (4/5)!
    `,
    advantages: [
      'Guarantees linearizable consistency and eliminates split-brain data corruption.',
      'Automatic leader failover within hundreds of milliseconds of leader crash.'
    ],
    disadvantages: [
      'High latency overhead: Every write requires network round-trips to a majority of cluster nodes.',
      'Loss of Quorum: If more than half the nodes crash (e.g. 3 dead out of 5), the entire cluster freezes and becomes read-only.'
    ],
    whenToUse: 'Distributed metadata coordination (Kubernetes etcd, ZooKeeper, distributed locks, service registries).',
    whenToAvoid: 'High-throughput business data stores where millions of writes per second would choke on synchronous quorum round-trips.',
    interviewQuestions: [
      {
        q: 'Why do consensus clusters almost always use an odd number of nodes (3, 5, or 7)?',
        a: 'Because an even number of nodes provides no extra fault tolerance while increasing network overhead. A 4-node cluster requires a majority of 3 to agree, so it can only tolerate 1 failure—the exact same tolerance as a 3-node cluster, which also tolerates 1 failure. Odd numbers avoid split votes.'
      }
    ],
    relatedTopics: ['cap-theorem', 'database-sharding', 'message-queues-kafka']
  },

  // =========================================================================
  // 8. MESSAGE QUEUES & EVENT ARCHITECTURES
  // =========================================================================
  {
    id: 'message-queues-kafka',
    category: 'messaging',
    categoryTitle: 'Message Queues & Events',
    title: 'Message Queues vs Event Streams: RabbitMQ vs Kafka',
    difficulty: 'Intermediate',
    timeToRead: '14 min',
    summary: 'Decoupling services, asynchronous worker queues, event-driven architecture, and pub-sub.',
    definition: 'A Message Queue (like RabbitMQ) routes messages to individual worker consumers and deletes them once acknowledged. An Event Streaming Log (like Apache Kafka) appends immutable, partitioned events to a persistent disk log, allowing multiple independent consumer groups to read and replay data at their own pace.',
    whyItMatters: 'Synchronous REST calls between microservices create tight coupling: if the Email Service is slow or down, the Checkout Service times out and the customer cannot buy. Message queues decouple services so requests are buffered reliably.',
    analogy: 'RabbitMQ is like a postal delivery box: a mail carrier drops off letters, workers grab letters, open them, and throw them in the shredder once finished. Kafka is like a public newspaper: news articles are printed chronologically in an immutable daily paper; readers can read today’s edition, or go back to last month’s archives and re-read from page 1.',
    howItWorks: [
      '1. Producers publish events/messages to an Exchange or Topic.',
      '2. The Message Broker buffers the messages in memory or disk.',
      '3. Consumer Workers pull messages, process them, and send an `ACK` (Acknowledgement).',
      '4. Dead-Letter Queues (DLQ): If a poisoned message repeatedly fails processing 3 times, it is routed to a DLQ for developer inspection.',
      '5. Kafka Partitions: Topics are divided into partitions; each partition maintains strict ordering and scales horizontally across consumer group members.'
    ],
    diagram: `
DECOUPLED EVENT PIPELINE:
[ Checkout Service ] ---- 1. Publish "OrderPlaced" ----> +--------------------+
                                                          |    Kafka / Queue   |
                                                          | (Buffers 10k msg)  |
                                                          +--------------------+
                                                           /        |        \\
                                               Consumer A /         |         \\ Consumer C
                                                         v          v          v
                                                    [Payment]   [Inventory]   [Email Notify]
    `,
    advantages: [
      'Asynchronous Decoupling: Checkout succeeds in 10ms without waiting for slow email or fraud check APIs.',
      'Spike Flattening (Backpressure): Buffers sudden traffic bursts (e.g. 50,000 orders/min) while workers process at steady 5,000/min.',
      'Fault Tolerance: If the notification service is down for 3 hours, messages sit safely in the queue until it reboots.'
    ],
    disadvantages: [
      'Eventual Consistency: The user may see "Order Submitted" before their inventory or loyalty points update.',
      'Duplicate Messages: Network timeouts can trigger message re-delivery; consumers MUST be designed to be idempotent.'
    ],
    whenToUse: 'Asynchronous tasks (sending emails, video transcoding, PDF generation), microservice event broadcasting, and real-time streaming analytics.',
    whenToAvoid: 'Synchronous operations where the caller immediately requires the computation result to proceed (e.g. credit card CVV authorization).',
    interviewQuestions: [
      {
        q: 'How do you guarantee exactly-once processing in a distributed message queue system?',
        a: 'True physical "exactly-once delivery" across a network is mathematically impossible due to the Two Generals problem. Instead, we achieve "effectively exactly-once processing" by combining At-Least-Once Delivery with Idempotent Consumer processing (using unique message deduplication IDs in Redis or database unique constraints).'
      }
    ],
    relatedTopics: ['distributed-consensus', 'reliability-patterns', 'microservices-architecture']
  },

  // =========================================================================
  // 9. ARCHITECTURE
  // =========================================================================
  {
    id: 'microservices-architecture',
    category: 'architecture',
    categoryTitle: 'Monoliths & Microservices',
    title: 'Monoliths vs Microservices vs Modular Monoliths',
    difficulty: 'Intermediate',
    timeToRead: '13 min',
    summary: 'The operational realities, service boundaries, database-per-service rule, and organizational trade-offs.',
    definition: 'A Monolith packages all business domains into a single deployable artifact sharing a unified database. A Microservices architecture breaks an application into loosely coupled, independently deployable services organized around business capabilities, with each service owning its own private datastore.',
    whyItMatters: 'Many startups prematurely adopt microservices and drown in network complexity, distributed transactions, and DevOps overhead. Choosing the right architectural boundary is crucial to developer velocity and team scaling.',
    analogy: 'A Monolith is an all-in-one Swiss Army Knife: compact, easy to carry, and all tools are in one place. Microservices is a giant professional mechanic’s toolbox where every tool is in its own drawer with its own power supply: it takes longer to set up, but 10 mechanics can work simultaneously on different parts of an airplane without bumping elbows.',
    howItWorks: [
      '1. Conway’s Law: "Organizations design systems that mirror their own communication structures." Microservices enable independent 5-to-8 person engineering teams.',
      '2. Database Per Service: Service A CANNOT query Service B’s database directly; it must request data via API or event streams.',
      '3. API Gateway: Sits between clients and microservices to handle routing, authentication, rate limiting, and response aggregation (BFF pattern).',
      '4. Modular Monolith Alternative: Keep single deployable binary and single database, but enforce strict in-code module boundaries via interfaces and clean architecture.'
    ],
    diagram: `
MONOLITH ARCHITECTURE:                   MICROSERVICES ARCHITECTURE:
+-------------------------------+        Client ----> [ API Gateway ]
|        Single Codebase        |                            |
| [Auth]  [Billing]  [Catalog]  |              +-------------+-------------+
+-------------------------------+              |             |             |
                |                              v             v             v
                v                         [Auth Svc]    [Billing Svc] [Catalog Svc]
     +--------------------+                    |             |             |
     |  Shared Database   |                    v             v             v
     +--------------------+               [(Private DB)] [(Private DB)] [(Private DB)]
    `,
    advantages: [
      'Microservices: Independent deployments without coordinated release trains; independent auto-scaling per service; tech-stack flexibility.',
      'Monolith: Simple local debugging; instant ACID database transactions; zero network serialization latency.'
    ],
    disadvantages: [
      'Microservices: Complex distributed tracing; partial network failures; difficult distributed transactions (requires Saga pattern); steep DevOps learning curve.',
      'Monolith: Large deployments become risky; slow test suites; scaling requires duplicating the entire application footprint.'
    ],
    whenToUse: 'Start with a Monolith or Modular Monolith for small-to-medium teams. Migrate to Microservices when engineering headcount exceeds 50-100 engineers and deployment coordination bottlenecks team velocity.',
    whenToAvoid: 'Never start a brand new early-stage startup with 20 microservices before product-market fit is established.',
    interviewQuestions: [
      {
        q: 'What is the Saga pattern and why is it needed in microservices?',
        a: 'Because microservices follow the "Database per Service" rule, standard multi-table ACID transactions across services are impossible. A Saga coordinates distributed transactions as a sequence of local transactions across services. If Step 3 fails (e.g. payment declined), the Saga executes compensating transactions backward (e.g. cancel reserved inventory) to restore consistency.'
      }
    ],
    relatedTopics: ['api-design-rest', 'message-queues-kafka', 'observability-metrics']
  },

  // =========================================================================
  // 10. RELIABILITY & RESILIENCE
  // =========================================================================
  {
    id: 'reliability-patterns',
    category: 'reliability',
    categoryTitle: 'Reliability & Fault Tolerance',
    title: 'Resilience Patterns: Circuit Breakers, Bulkheads & Retries',
    difficulty: 'Intermediate',
    timeToRead: '11 min',
    summary: 'Preventing cascading failures in distributed architectures with exponential backoff, jitter, and circuit breakers.',
    definition: 'Resilience patterns are software engineering designs (Circuit Breakers, Exponential Backoff with Jitter, Bulkheads, and Fallbacks) that prevent transient network glitches or a single degrading downstream service from causing catastrophic cascading outages across an entire system.',
    whyItMatters: 'If Service A calls Service B with an unconstrained retry loop, and Service B slows down, Service A will exhaust all its worker threads waiting for timeouts. Service A then crashes, bringing down Service C. Circuit breakers stop this chain reaction.',
    analogy: 'A software Circuit Breaker functions exactly like the electrical circuit breaker in your house: if a kitchen appliance shorts out, the breaker trips open to cut off electricity immediately, protecting your entire house from catching fire.',
    howItWorks: [
      '1. Circuit Breaker States: Closed (normal traffic flows), Open (downstream service is failing; requests immediately fail fast without calling downstream), Half-Open (allows trial requests to check if downstream recovered).',
      '2. Exponential Backoff & Jitter: When retrying a failed call, increase delay exponentially ($2^n$) and add random randomness (jitter) so 10,000 clients do not retry simultaneously and DDoS the recovering server.',
      '3. Bulkhead Pattern: Isolates resource pools (e.g. separate thread pools or connection limits for Payment API vs Recommendation API) so failures in recommendations never starve payments.',
      '4. Fallbacks: Return cached or degraded data (e.g., "Recommendations unavailable" or static defaults) instead of displaying an HTTP 500 error page.'
    ],
    diagram: `
CIRCUIT BREAKER STATE MACHINE:
                Failure threshold reached (> 50% errors)
       +--------------------------------------------------------+
       |                                                        |
       v                                                        |
+-------------+                 +-----------+            +-------------+
|    OPEN     | -- Timeout ---> | HALF-OPEN | -- Pass -> |   CLOSED    |
| (Fail Fast) |    expired      | (Test Req)|            | (Normal Ops)|
+-------------+                 +-----------+            +-------------+
       ^                              |                         |
       |                              v                         |
       +--------------------- Test request fails ---------------+
    `,
    advantages: [
      'Stops cascading distributed system collapses.',
      'Provides graceful degradation so users can still complete primary actions (e.g., checkout) even if secondary features (e.g., reviews) are down.'
    ],
    disadvantages: [
      'Increases code complexity; tuning timeouts and error thresholds requires extensive production monitoring.'
    ],
    whenToUse: 'Around all network calls between microservices, external third-party API integrations, and database connections.',
    whenToAvoid: 'Local in-memory function calls within the same process.',
    interviewQuestions: [
      {
        q: 'Why must you add random "Jitter" to exponential backoff retries?',
        a: 'If a database briefly restarts, thousands of waiting clients backing off at fixed intervals ($1s, 2s, 4s, 8s$) will all retry at the exact same millisecond mark in synchronization (Thundering Herd). Adding randomized jitter spreads the retry attempts smoothly across time, allowing the recovering database to breathe.'
      }
    ],
    relatedTopics: ['microservices-architecture', 'observability-metrics', 'load-balancing-algorithms']
  },

  // =========================================================================
  // 11. SECURITY
  // =========================================================================
  {
    id: 'security-in-system-design',
    category: 'security',
    categoryTitle: 'Security in System Design',
    title: 'Security: Authentication, Authorization & Encryption',
    difficulty: 'Intermediate',
    timeToRead: '12 min',
    summary: 'AuthN vs AuthZ, OAuth2 & JWT tokens, RBAC, encryption at rest/transit, and API security.',
    definition: 'The architectural practice of integrating security controls across the system lifecycle: verifying identity (Authentication), enforcing permissions (Authorization), securing communication channels (TLS in transit), encrypting databases (AES-256 at rest), and mitigating common attacks (SQLi, XSS, CSRF, and DDoS).',
    whyItMatters: 'A single security breach can destroy customer trust, incur millions of dollars in GDPR/regulatory fines, and cause existential legal liability. Security cannot be bolted on at the end; it must be designed into component boundaries.',
    analogy: 'Authentication is showing your passport at an airport border counter to prove who you are. Authorization is checking your boarding pass to see if you have permission to enter the First Class lounge or board Flight 302.',
    howItWorks: [
      '1. Authentication (AuthN): Verifies "Who are you?" (Passwords, Passkeys, OAuth 2.0 / OIDC, MFA).',
      '2. Authorization (AuthZ): Verifies "What are you allowed to do?" (Role-Based Access Control [RBAC] or Attribute-Based Access Control [ABAC]).',
      '3. JSON Web Tokens (JWT): Signed stateless tokens containing claims (`sub`, `roles`, `exp`) that services verify using public keys without querying a database.',
      '4. Encryption in Transit: Strict TLS 1.3 encryption on all public endpoints and mutual TLS (mTLS) between internal microservices.',
      '5. Encryption at Rest: Transparent database and S3 bucket encryption using hardware security modules (KMS/HSM).'
    ],
    diagram: `
OAUTH 2.0 / JWT AUTHENTICATION FLOW:
Client ---- 1. Login with credentials ----> Auth Server (Identity Provider)
Client <--- 2. Returns signed JWT token ---+
  |
  +--- 3. GET /orders [Header: Bearer <jwt>] ---> API Gateway / Resource Server
                                                       |
                                        4. Verify cryptographic signature
                                           Check role ("admin"?) and expiration
                                                       |
                                                       v
                                            Returns 200 OK + User Orders
    `,
    advantages: [
      'Stateless JWTs allow distributed microservices to verify authorization locally without database lookups.',
      'Zero-Trust architecture ensures compromised internal networks cannot sniff plaintext traffic.'
    ],
    disadvantages: [
      'JWT Revocation Problem: Because JWTs are stateless, revoking a compromised token before its expiration requires maintaining a distributed blocklist in Redis.'
    ],
    whenToUse: 'Mandatory for every web application, microservice gateway, and database storage layer.',
    whenToAvoid: 'Never write your own custom cryptographic encryption algorithms; always rely on audited standards (AES-GCM, ECDSA, Argon2, bcrypt).',
    interviewQuestions: [
      {
        q: 'How do you handle immediate JWT revocation if a user logs out or is banned?',
        a: 'Keep Access Token lifetimes very short (e.g. 5-15 minutes) and issue a long-lived Refresh Token stored in a database. If revoked, invalidate the Refresh Token in the database so the user cannot obtain a new Access Token. For immediate invalidation, maintain a fast Redis blacklist of revoked token JTI IDs checked at the API gateway.'
      }
    ],
    relatedTopics: ['api-design-rest', 'reliability-patterns', 'microservices-architecture']
  },

  // =========================================================================
  // 12. OBSERVABILITY
  // =========================================================================
  {
    id: 'observability-metrics',
    category: 'observability',
    categoryTitle: 'Observability & Monitoring',
    title: 'The Three Pillars of Observability: Logs, Metrics & Traces',
    difficulty: 'Intermediate',
    timeToRead: '11 min',
    summary: 'Distributed tracing, structured logging, Golden Signals, and alert design.',
    definition: 'Observability is the measure of how well you can infer the internal states of a system based on its external outputs. It relies on the Three Pillars: Structured Logs (discrete timestamped events), Metrics (aggregated numeric time-series), and Distributed Tracing (end-to-end request path tracking across microservices).',
    whyItMatters: 'In a distributed system of 50 microservices, a user request that times out after 10 seconds could be failing anywhere. Without distributed tracing, engineers spend hours playing detective across 50 disconnected log files.',
    analogy: 'Metrics are the dashboard gauges in your car showing speed and fuel level (aggregated health). Logs are the flight black box recording exact timestamps of every button pressed. Tracing is GPS breadcrumbs following the entire road trip from doorstep to destination, showing exactly which intersection had the 20-minute traffic jam.',
    howItWorks: [
      '1. Correlation IDs / Trace IDs: The API gateway injects a unique `X-Trace-ID: abc-123` into request headers. Every downstream microservice forwards this ID in logs and RPC calls.',
      '2. Distributed Tracing: Tracks a Trace consisting of multiple Spans (e.g. Span 1: API Gateway 15ms, Span 2: Order Service 45ms, Span 3: Postgres Query 120ms).',
      '3. Google’s 4 Golden Signals: Latency, Traffic (RPS), Errors (error rate %), and Saturation (CPU/Memory % utilization).',
      '4. Alert Fatigue Prevention: Alert on Symptoms affecting users (e.g. Error rate > 1% or checkout latency > 1s) rather than raw internal metrics (e.g. single server CPU spiked).'
    ],
    diagram: `
DISTRIBUTED TRACE VISUALIZATION (Trace ID: #98fe-a1):
Total Request Duration: 210ms
[ API Gateway (210ms) ===================================================== ]
    |-- [ Auth Check (20ms) === ]
    |-- [ Order Service (180ms) ===================================== ]
            |-- [ Redis Cache Check (5ms) = ]
            |-- [ Postgres Query (145ms) ====================== ]
            |-- [ Kafka Publish (15ms) == ]
    `,
    advantages: [
      'Pinpoints exact latency bottlenecks across microservices within seconds.',
      'Structured JSON logs enable fast filtering in tools like Elasticsearch and Grafana Loki.'
    ],
    disadvantages: [
      'Storage Cost: Collecting 100% of traces and high-cardinality metrics at scale requires gigabytes of ingestion bandwidth (requires sampling strategies).'
    ],
    whenToUse: 'Essential for any distributed microservices architecture, serverless fleet, or production API.',
    whenToAvoid: 'Avoid full 100% trace sampling in ultra-high-volume pipelines; sample 1% to 5% of healthy requests and 100% of error traces.',
    interviewQuestions: [
      {
        q: 'What is High Cardinality in metrics and why can it crash a monitoring system like Prometheus?',
        a: 'Cardinality is the number of unique combinations of metric label values. If you add `user_id` as a label on an HTTP request counter, every unique user creates a new time-series in memory. With 10 million users, this consumes tens of gigabytes of RAM and crashes the time-series database. Never use high-cardinality values (User IDs, UUIDs) as metric labels.'
      }
    ],
    relatedTopics: ['microservices-architecture', 'latency-vs-throughput', 'reliability-patterns']
  }
];

