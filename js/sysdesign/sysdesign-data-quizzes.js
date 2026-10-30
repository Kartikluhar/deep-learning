/**
 * MLForge System Design Practice Quizzes Data
 * Multiple-choice, scenario-based, and calculation questions with detailed explanations.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sysdesign = window.MLForge.sysdesign || {};
window.MLForge.sysdesign.data = window.MLForge.sysdesign.data || {};

MLForge.sysdesign.data.quizzes = [
  {
    id: 'quiz-cap-1',
    category: 'fundamentals',
    categoryTitle: 'System Design Fundamentals',
    difficulty: 'Intermediate',
    question: 'According to the CAP Theorem, what happens to a distributed system during an unavoidable network partition?',
    options: [
      'The system can maintain both Consistency and Availability by scaling up vertically.',
      'The system must choose between returning consistent data (CP) or guaranteeing availability (AP).',
      'The database automatically converts from NoSQL to SQL to prevent data loss.',
      'Partition tolerance is optional in modern cloud environments like AWS and GCP.'
    ],
    correctIndex: 1,
    explanation: 'Network partitions are a physical reality of distributed networks. When a partition occurs, nodes cannot communicate; therefore, the system must either refuse writes to maintain strict consistency (CP) or accept writes on disconnected nodes and become temporarily inconsistent (AP).'
  },
  {
    id: 'quiz-cache-1',
    category: 'caching',
    categoryTitle: 'Caching & Performance',
    difficulty: 'Beginner',
    question: 'In the Cache-Aside pattern, what should an application do when updating a record in the database?',
    options: [
      'Write the new value to the database, and DELETE (invalidate) the key in the cache.',
      'Write the new value directly to the cache, and let the cache update the database tomorrow.',
      'Only update the database, never touching the cache.',
      'Delete the entire database table and recompute all records.'
    ],
    correctIndex: 0,
    explanation: 'In Cache-Aside, deleting (invalidating) the cache key after updating the database is the safest pattern. It prevents race conditions where two concurrent update threads could overwrite each other in the cache with stale data.'
  },
  {
    id: 'quiz-db-1',
    category: 'databases',
    categoryTitle: 'Database Design & Scaling',
    difficulty: 'Intermediate',
    question: 'Why do relational databases use B+ Trees instead of standard Binary Search Trees (BST) for disk indexes?',
    options: [
      'B+ Trees require zero disk space.',
      'B+ Trees have a much higher branching fan-out, minimizing the number of slow disk I/O seeks required to locate a row.',
      'Binary Search Trees cannot store numbers greater than 1,000.',
      'B+ Trees eliminate the need for primary keys.'
    ],
    correctIndex: 1,
    explanation: 'Disk reads are slow block operations. B+ Trees store hundreds of keys per node, keeping the tree depth to just 3-4 levels even for millions of rows. This means locating any record takes only 3-4 disk seeks, whereas a deep binary tree would require 20+ seeks.'
  },
  {
    id: 'quiz-mq-1',
    category: 'messaging',
    categoryTitle: 'Message Queues & Events',
    difficulty: 'Intermediate',
    question: 'What is the purpose of a Dead-Letter Queue (DLQ) in an event-driven system?',
    options: [
      'To speed up CPU clock speed on message broker instances.',
      'To permanently store deleted user accounts for GDPR compliance.',
      'To capture and isolate poison messages that repeatedly fail processing, preventing them from blocking the main queue.',
      'To compress video files into MP4 format.'
    ],
    correctIndex: 2,
    explanation: 'If a corrupted message (poison message) crashes consumer workers, retrying it endlessly will block the queue. A DLQ catches messages after a maximum retry threshold (e.g. 3 attempts) for safe developer inspection.'
  },
  {
    id: 'quiz-load-1',
    category: 'load-balancing',
    categoryTitle: 'Load Balancing & Proxies',
    difficulty: 'Intermediate',
    question: 'When should a load balancer use the "Least Connections" algorithm instead of "Round Robin"?',
    options: [
      'When all incoming requests are identical 1ms ping requests.',
      'When requests vary significantly in processing duration (e.g. long video uploads vs fast profile reads).',
      'When there is only 1 single backend server.',
      'When HTTP caching is disabled on the browser.'
    ],
    correctIndex: 1,
    explanation: 'Round Robin blindly rotates through servers regardless of their active workload. If Server 1 receives 5 long-running video uploads, Round Robin still sends it more work. Least Connections directs new traffic to whichever server currently has the fewest active open connections.'
  },
  {
    id: 'quiz-scale-1',
    category: 'scalability',
    categoryTitle: 'Scalability & Estimation',
    difficulty: 'Beginner',
    question: 'If a service receives 8.64 million requests in a 24-hour day, what is its average Requests Per Second (RPS)?',
    options: [
      '10 RPS',
      '100 RPS',
      '1,000 RPS',
      '10,000 RPS'
    ],
    correctIndex: 1,
    explanation: 'There are 86,400 seconds in a day ($24 \\times 60 \\times 60$). Average RPS = $8,640,000 / 86,400 = 100$ requests per second.'
  },
  {
    id: 'quiz-sec-1',
    category: 'security',
    categoryTitle: 'Security in System Design',
    difficulty: 'Intermediate',
    question: 'What is the primary difference between Authentication and Authorization?',
    options: [
      'Authentication is encryption at rest; Authorization is encryption in transit.',
      'Authentication verifies WHO you are; Authorization determines WHAT you are allowed to do.',
      'Authentication is for databases; Authorization is for load balancers.',
      'They are identical terms with no technical distinction.'
    ],
    correctIndex: 1,
    explanation: 'Authentication (AuthN) proves your identity (e.g. logging in with username and password). Authorization (AuthZ) verifies whether your authenticated identity possesses the permissions/roles required to access a specific resource (e.g. Admin privileges).'
  },
  {
    id: 'quiz-resil-1',
    category: 'reliability',
    categoryTitle: 'Reliability & Fault Tolerance',
    difficulty: 'Advanced',
    question: 'Why is randomized Jitter added to Exponential Backoff retry algorithms?',
    options: [
      'To confuse hackers attempting timing attacks.',
      'To prevent the "Thundering Herd" problem where thousands of retrying clients hit a recovering server at the exact same millisecond.',
      'To reduce the size of JSON payloads over TLS.',
      'To force the client to restart their browser.'
    ],
    correctIndex: 1,
    explanation: 'Without jitter, all clients that failed at time $T$ will retry at the exact same interval (e.g. $T+1s, T+2s, T+4s$), bombarding the struggling database with synchronized spikes. Adding jitter spreads retries evenly across time.'
  }
];

