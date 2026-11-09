/**
 * MLForge Cloud Computing & DevOps Curriculum Topics Database
 * Comprehensive, beginner-friendly lessons written in simple English with
 * daily life analogies, step-by-step explanations, line-by-line code breakdowns,
 * architecture diagrams, common mistakes, and interview Q&As.
 */

window.MLForge = window.MLForge || {};
window.MLForge.devops = window.MLForge.devops || {};
window.MLForge.devops.data = window.MLForge.devops.data || {};

MLForge.devops.data.topics = [
  // =========================================================================
  // CATEGORY 1: CLOUD COMPUTING FUNDAMENTALS
  // =========================================================================
  {
    id: "cloud-fundamentals",
    title: "What is Cloud Computing & Why Do We Need It?",
    category: "Cloud Fundamentals",
    categoryNumber: 1,
    difficulty: "Beginner",
    readTime: "10 min",
    summary: "Discover what cloud computing actually is, why traditional physical servers created massive problems for companies, and how modern on-demand cloud infrastructure works.",
    content: `
      <h2>1. Simple Definition: What is Cloud Computing?</h2>
      <p>Imagine you need electricity to run your refrigerator and charge your phone. Do you build an electrical power station in your backyard? Of course not! You simply plug your cord into the wall outlet, use the electricity, and pay a monthly bill only for the exact kilowatt-hours you consumed.</p>
      <p><strong>Cloud Computing</strong> works on the exact same principle, but for computing power. Instead of buying physical computers, hard drives, cables, and cooling fans to host your website, you rent computers owned by tech giants (like Amazon, Microsoft, and Google) over the Internet. You only pay for what you use, and you can release them whenever you want.</p>

      <div class="devops-card-analogy">
        <strong>Everyday Analogy:</strong> Owning an on-premises server is like buying an entire bus when you only need to commute to college once a week. You must pay for fuel, tires, insurance, repairs, and parking. Cloud computing is like booking an Uber: you get a ride on demand, reach your destination, pay for the distance traveled, and never worry about engine maintenance!
      </div>

      <h2>2. Why Do We Need Cloud Computing? The Problem with Traditional Servers</h2>
      <p>Before the cloud, if you wanted to launch an online store:</p>
      <ul>
        <li><strong>Enormous Upfront Cost (CapEx):</strong> You had to spend \$10,000+ buying physical server racks, backup generators, and enterprise routers before writing a single line of code.</li>
        <li><strong>Painfully Slow Setup:</strong> Ordering a server from Dell or HP took 4 to 8 weeks to ship, plus days to rack, cable, and install the operating system.</li>
        <li><strong>Capacity Guesswork:</strong> If your website had 500 visitors a day, your server sat 95% idle, wasting electricity. But if a viral video brought 100,000 visitors on Black Friday, your single server crashed, losing thousands of dollars.</li>
        <li><strong>Hardware Failures:</strong> Hard drives die, fans burn out, and power cuts happen. If a drive failed at 2:00 AM on Sunday, an engineer had to physically drive to the data center to swap the disk.</li>
      </ul>

      <h2>3. How Cloud Computing Works Under the Hood</h2>
      <p>Cloud providers construct massive warehouse-sized buildings called <strong>Data Centers</strong> in strategic locations around the world. Inside these data centers are hundreds of thousands of high-performance servers connected by ultra-fast fiber optic cables.</p>
      <p>Through a technology called <strong>Virtualization</strong>, the cloud provider slices one physical server into dozens of smaller, isolated <strong>Virtual Machines (VMs)</strong>. When you click <em>"Launch Instance"</em> on AWS, software creates a virtual machine for you in under 30 seconds.</p>

      <div class="devops-diagram-container">
        <div class="devops-diagram-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
          Traditional On-Premises vs Cloud Computing Model
        </div>
        <pre class="devops-code-pre" style="color: #38bdf8;">
+------------------------------------+       +------------------------------------+
|      TRADITIONAL ON-PREMISES       |       |          CLOUD COMPUTING           |
+------------------------------------+       +------------------------------------+
| [You Manage Everything]            |       | [You Manage]                       |
|   - Applications & Code            |       |   - Applications & Code            |
|   - Operating System & Patches     |       |   - Configurations & Data          |
|   - Physical Servers & Blades      |       |                                    |
|   - Storage Arrays (SAN/NAS)       |       | [Cloud Provider Manages]           |
|   - Network Switches & Firewalls   |       |   - Hypervisor Virtualization      |
|   - Electricity, AC, Diesel Gens   |       |   - Physical Servers & Hard Drives |
|   - Physical Security Guards       |       |   - Power, Cooling, & Data Centers |
+------------------------------------+       +------------------------------------+
        HIGH UPFRONT COST (CapEx)                     PAY-AS-YOU-GO (OpEx)
        Weeks to Deploy                               Seconds to Launch
        Fixed Capacity                                Infinite Elastic Scaling
        </pre>
      </div>

      <h2>4. Key Benefits of Cloud Computing</h2>
      <ol>
        <li><strong>Trade Capital Expense for Variable Expense:</strong> Instead of investing millions upfront in real estate and hardware, you pay only for running compute minutes.</li>
        <li><strong>Massive Economies of Scale:</strong> Because Amazon and Google buy hundreds of thousands of servers at bulk discounts, they pass those savings down to you at cents per hour.</li>
        <li><strong>Stop Guessing Capacity:</strong> You scale up automatically when traffic surges and scale down when traffic drops so you never pay for idle servers.</li>
        <li><strong>Increase Speed & Agility:</strong> New server resources are available in seconds with an API call or click, letting developers experiment rapidly.</li>
        <li><strong>Go Global in Minutes:</strong> Deploy applications to North America, Europe, Asia, and Australia simultaneously with a few clicks.</li>
      </ol>

      <h2>5. Common Mistakes Beginners Make</h2>
      <div class="devops-card-warning">
        <strong>Common Mistake: Leaving Unused Cloud Resources Running!</strong><br>
        In cloud computing, a running virtual machine incurs charges every second, even if no user visits your website. Beginners often launch a large server for a weekend tutorial and forget to terminate it, resulting in unexpected credit card charges. <strong>Best practice:</strong> Always set up AWS Billing Alerts and stop or terminate instances when you finish testing.
      </div>

      <h2>6. Top Interview Questions & Answers</h2>
      <div class="devops-qa-card">
        <div class="devops-qa-question" onclick="this.parentElement.classList.toggle('open')">
          <span>Q1: What is the difference between Scalability and Elasticity?</span>
          <span>+</span>
        </div>
        <div class="devops-qa-answer">
          <strong>Scalability</strong> is the <em>ability</em> of a system to handle increased load by adding resources (either scaling up with a bigger machine or scaling out with more machines).<br><br>
          <strong>Elasticity</strong> is the <em>automatic</em> process of growing and shrinking resources in real time based on fluctuating demand. A system can be scalable (you can manually add 10 servers) without being elastic (it automatically adds 10 servers at 6 PM and removes them at 10 PM).
        </div>
      </div>

      <h2>7. Hands-on Practice Exercise</h2>
      <p>Log into a free tier cloud account (like AWS Free Tier) or sign up for a student credit account. Note down the geographic region you are assigned to (e.g. <code>us-east-1</code>) and observe how the latency changes when pinging a server across the globe.</p>
    `
  },

  {
    id: "cloud-infrastructure-virtualization",
    title: "Virtualization, Hypervisors & Containers vs VMs",
    category: "Cloud Fundamentals",
    categoryNumber: 1,
    difficulty: "Beginner",
    readTime: "12 min",
    summary: "Understand the core technology powering all cloud computing: how Hypervisors carve bare metal into Virtual Machines, and how Containers revolutionize application isolation.",
    content: `
      <h2>1. What is Virtualization?</h2>
      <p>Before virtualization, every physical computer could only run <strong>one operating system</strong> at a time. If you had a powerful 64-core server running Windows Server, and your company website only used 3% of the CPU, the remaining 97% was completely wasted. You could not safely install an incompatible Linux application on the same box.</p>
      <p><strong>Virtualization</strong> is software technology that separates physical computer hardware from the operating systems running on it. It allows one physical computer to host multiple independent, isolated <strong>Virtual Machines (VMs)</strong> simultaneously.</p>

      <h2>2. What is a Hypervisor?</h2>
      <p>A <strong>Hypervisor</strong> (also called a Virtual Machine Monitor or VMM) is the specialized software layer that creates and manages virtual machines. It tricks the guest operating system into believing it has its own dedicated physical CPU, RAM, network card, and hard drive.</p>

      <div class="devops-table-wrapper">
        <table class="devops-concept-table">
          <thead>
            <tr><th>Feature</th><th>Type 1 Hypervisor (Bare-Metal)</th><th>Type 2 Hypervisor (Hosted)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Where it Runs</strong></td><td>Installed directly on physical computer hardware (no host OS)</td><td>Runs as an app inside an existing OS (like Windows or macOS)</td></tr>
            <tr><td><strong>Performance</strong></td><td>Near native speed, very low overhead</td><td>Slower due to passing through host OS layer</td></tr>
            <tr><td><strong>Industry Examples</strong></td><td>VMware ESXi, KVM (Kernel-based VM), Microsoft Hyper-V, AWS Nitro</td><td>VirtualBox, VMware Workstation, Parallels Desktop</td></tr>
            <tr><td><strong>Primary Use Case</strong></td><td>Enterprise cloud data centers (AWS, Azure, GCP)</td><td>Developers testing software on personal laptops</td></tr>
          </tbody>
        </table>
      </div>

      <h2>3. Virtual Machines vs Containers: The Big Comparison</h2>
      <p>Both VMs and Containers provide isolation, but they achieve it at completely different layers of the software stack:</p>
      <ul>
        <li><strong>Virtual Machine (VM):</strong> Virtualizes the <em>hardware</em>. Each VM includes a complete Guest Operating System (kernel, drivers, system libraries) weighing several gigabytes. Booting a VM takes 30 seconds to several minutes.</li>
        <li><strong>Container (Docker):</strong> Virtualizes the <em>operating system</em>. All containers share the host machine's Linux kernel while keeping their files, processes, and network isolated. A container image weighs megabytes and boots in milliseconds!</li>
      </ul>

      <div class="devops-diagram-container">
        <div class="devops-diagram-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
          Architecture: Virtual Machines vs Containers
        </div>
        <pre class="devops-code-pre" style="color: #38bdf8;">
+------------------------------------+       +------------------------------------+
|       VIRTUAL MACHINES (VMs)       |       |        CONTAINERS (DOCKER)         |
+------------------------------------+       +------------------------------------+
| [App A]     [App B]     [App C]    |       | [App A]     [App B]     [App C]    |
| [Bins/Libs] [Bins/Libs] [Bins/Libs]|       | [Bins/Libs] [Bins/Libs] [Bins/Libs]|
| [Guest OS]  [Guest OS]  [Guest OS] |       +------------------------------------+
| (Ubuntu)    (Windows)   (Debian)   |       |       CONTAINER ENGINE (Docker)    |
+------------------------------------+       +------------------------------------+
|       HYPERVISOR (KVM / ESXi)      |       |      HOST OPERATING SYSTEM (Linux) |
+------------------------------------+       +------------------------------------+
|      PHYSICAL SERVER HARDWARE      |       |      PHYSICAL SERVER HARDWARE      |
+------------------------------------+       +------------------------------------+
Heavyweight (Gigabytes per VM)               Lightweight (Megabytes per container)
Slow boot (30-120 seconds)                   Instant boot (milliseconds)
Strong isolation (Hardware boundary)         Process isolation (Namespaces & cgroups)
        </pre>
      </div>

      <h2>4. Key Linux Kernel Technologies Powering Containers</h2>
      <p>Docker containers do not use magic; they rely on two native Linux kernel features:</p>
      <ol>
        <li><strong>Namespaces (Isolation):</strong> Creates a private sandbox for each container. The container gets its own Process IDs (PID), Network interfaces (NET), Mount points (MNT), and Users (USER). A process inside a container cannot see processes outside.</li>
        <li><strong>Control Groups (cgroups - Resource Limiting):</strong> Controls and limits how much CPU, RAM, disk I/O, and network bandwidth a container is allowed to consume so one runaway script cannot crash the entire host machine.</li>
      </ol>

      <h2>5. Common Mistakes Beginners Make</h2>
      <div class="devops-card-warning">
        <strong>Thinking Containers Replace VMs Completely:</strong> In production clouds (AWS EC2, Google Cloud), containers almost always run <em>inside</em> Virtual Machines. VMs provide the hard security boundary between different client accounts, while containers provide lightweight packaging and fast deployment inside your own VM.
      </div>
    `
  },

  {
    id: "cloud-service-models",
    title: "Cloud Service Models: IaaS, PaaS, SaaS & Serverless (FaaS)",
    category: "Cloud Fundamentals",
    categoryNumber: 1,
    difficulty: "Beginner",
    readTime: "10 min",
    summary: "Master the 4 fundamental cloud service delivery models: Infrastructure as a Service, Platform as a Service, Software as a Service, and Functions as a Service.",
    content: `
      <h2>1. The Four Cloud Service Models</h2>
      <p>Cloud services are categorized by how much control you have versus how much the cloud provider handles for you. Think of it as a spectrum from total control to total convenience.</p>

      <div class="devops-card-analogy">
        <strong>The Famous "Pizza as a Service" Analogy:</strong><br>
        <ul>
          <li><strong>Traditional On-Premises = Make Pizza at Home:</strong> You buy flour, cheese, and tomatoes, own the oven, provide gas, set the dining table, and wash the dishes.</li>
          <li><strong>IaaS = Take and Bake Pizza:</strong> The store makes the raw pizza dough and toppings (infrastructure), but you take it home, bake it in your oven, and provide drinks and plates.</li>
          <li><strong>PaaS = Pizza Delivery:</strong> You call Domino's. They make the pizza, cook it in their oven, and deliver it hot to your door. You just provide the table and eat.</li>
          <li><strong>SaaS = Dine Out at an Italian Restaurant:</strong> You sit down, order, eat, and leave. You do not touch the kitchen, oven, or dirty plates.</li>
        </ul>
      </div>

      <h2>2. Deep Dive Into Each Model</h2>
      
      <h3>1. IaaS (Infrastructure as a Service)</h3>
      <p><strong>What it is:</strong> You rent raw computing building blocks: virtual servers, hard disks, and virtual networks. The provider maintains the physical servers and cables; you install and maintain the operating system, security patches, database software, and your code.</p>
      <p><strong>Examples:</strong> AWS EC2, Google Compute Engine (GCE), Azure Virtual Machines, DigitalOcean Droplets.</p>
      <p><strong>When to use:</strong> When you need complete control over the OS, custom kernel modules, specific database versions, or legacy applications.</p>

      <h3>2. PaaS (Platform as a Service)</h3>
      <p><strong>What it is:</strong> The cloud provider gives you a ready-to-use development environment. You do not manage the operating system, web server (Nginx/Apache), or runtime updates. You simply push your code (e.g. <code>git push heroku main</code>) and the platform builds and runs it.</p>
      <p><strong>Examples:</strong> AWS Elastic Beanstalk, Heroku, Google App Engine, Render, Railway.</p>
      <p><strong>When to use:</strong> When you want developers to focus 100% on building application features without spending time configuring Linux servers or firewall rules.</p>

      <h3>3. SaaS (Software as a Service)</h3>
      <p><strong>What it is:</strong> A complete, finished software application delivered over the web browser. End users consume the software without caring about the underlying servers, databases, or code.</p>
      <p><strong>Examples:</strong> Gmail, Google Drive, Microsoft 365, Slack, Salesforce, Canva.</p>
      <p><strong>When to use:</strong> Standard business tools where writing custom software adds zero competitive advantage.</p>

      <h3>4. FaaS / Serverless (Function as a Service)</h3>
      <p><strong>What it is:</strong> You do not even manage an application server process. You write a single function (e.g., resize an uploaded photo, process a Stripe payment) and upload it. The cloud provider only executes your code when an event triggers it, runs it in milliseconds, and turns it off. You pay zero cents when your code is not running!</p>
      <p><strong>Examples:</strong> AWS Lambda, Google Cloud Functions, Azure Functions.</p>

      <div class="devops-table-wrapper">
        <table class="devops-concept-table">
          <thead>
            <tr><th>Layer</th><th>On-Premises</th><th>IaaS</th><th>PaaS</th><th>FaaS</th><th>SaaS</th></tr>
          </thead>
          <tbody>
            <tr><td>Applications</td><td>You</td><td>You</td><td>You</td><td>You (Functions)</td><td>Provider</td></tr>
            <tr><td>Data</td><td>You</td><td>You</td><td>You</td><td>You</td><td>Provider</td></tr>
            <tr><td>Runtime (Node/Python)</td><td>You</td><td>You</td><td>Provider</td><td>Provider</td><td>Provider</td></tr>
            <tr><td>Middleware / OS</td><td>You</td><td>You</td><td>Provider</td><td>Provider</td><td>Provider</td></tr>
            <tr><td>Virtualization & Servers</td><td>You</td><td>Provider</td><td>Provider</td><td>Provider</td><td>Provider</td></tr>
            <tr><td>Storage & Networking</td><td>You</td><td>Provider</td><td>Provider</td><td>Provider</td><td>Provider</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  {
    id: "cloud-deployment-models",
    title: "Cloud Deployment Models: Public, Private, Hybrid & Multi-Cloud",
    category: "Cloud Fundamentals",
    categoryNumber: 1,
    difficulty: "Beginner",
    readTime: "8 min",
    summary: "Understand where cloud resources physically live: Public Cloud, Private Cloud, Hybrid Cloud, and modern Multi-Cloud architectures.",
    content: `
      <h2>1. The 4 Deployment Models</h2>
      <p>Where your cloud infrastructure physically resides and who has access to it determines your <strong>deployment model</strong>.</p>

      <h3>1. Public Cloud</h3>
      <p>Computing resources are owned and operated by a third-party cloud provider (AWS, Google Cloud, Microsoft Azure) and shared across multiple customer organizations ("tenants") over the public internet. Each tenant's data is isolated and encrypted.</p>
      <ul>
        <li><strong>Pros:</strong> Zero hardware purchases, near-infinite scalability, pay only for what you use, global footprint.</li>
        <li><strong>Cons:</strong> Strictest regulations in some countries (defense, banking) may prohibit storing sensitive citizens' data on public multi-tenant hardware.</li>
      </ul>

      <h3>2. Private Cloud</h3>
      <p>Cloud infrastructure provisioned for exclusive use by a single organization. It can be physically located in the company's own on-premises data center or hosted by a third party.</p>
      <ul>
        <li><strong>Pros:</strong> Maximum data control, strict compliance with national security laws, dedicated hardware performance.</li>
        <li><strong>Cons:</strong> Extremely high CapEx costs, ongoing staff maintenance overhead, limited flexibility to scale up.</li>
      </ul>

      <h3>3. Hybrid Cloud</h3>
      <p>Combines an on-premises private cloud with a public cloud, bound together by secure VPN or dedicated high-speed fiber cables (like AWS Direct Connect). Applications and data share workloads between both environments.</p>
      <div class="devops-card-tip">
        <strong>Real-World Use Case: Cloud Bursting</strong><br>
        A retail bank keeps its sensitive customer bank account ledger safely inside its private on-premises database. But during the December holiday shopping rush, it automatically spins up 200 web servers in AWS Public Cloud to process search queries and product catalogs, scaling down when the rush ends!
      </div>

      <h3>4. Multi-Cloud</h3>
      <p>Using services from two or more independent public cloud providers (e.g. running your web frontend in AWS, your BigQuery analytics in Google Cloud, and your enterprise Active Directory in Microsoft Azure).</p>
      <ul>
        <li><strong>Why companies do it:</strong> Prevents vendor lock-in, increases bargaining power for pricing discounts, and provides disaster recovery if an entire cloud provider suffers a major regional outage.</li>
        <li><strong>Challenge:</strong> Managing multiple IAM permissions, billing dashboards, and networking tunnels requires specialized engineering skills.</li>
      </ul>
    `
  },

  {
    id: "cloud-architecture-distributed",
    title: "Cloud Architecture: Distributed Systems, Microservices & Serverless",
    category: "Cloud Fundamentals",
    categoryNumber: 1,
    difficulty: "Intermediate",
    readTime: "12 min",
    summary: "Learn how modern cloud applications are structured: High Availability, Fault Tolerance, Load Balancing, Microservices, and Event-Driven Architecture.",
    content: `
      <h2>1. Core Tenets of Resilient Cloud Architecture</h2>
      <p>In traditional architecture, engineers hoped their single server would never crash. In cloud architecture, the golden rule is: <strong>Design for failure!</strong> Everything will eventually fail: hard drives crash, power switches flip, and lightning strikes data centers. A well-designed cloud application continues running without the user noticing a single glitch.</p>

      <h3>High Availability (HA)</h3>
      <p>A system designed to operate continuously without interruption for a long time. Achieved by eliminating single points of failure (SPOF) and running duplicate servers across multiple geographically separated <strong>Availability Zones (AZs)</strong>.</p>

      <h3>Fault Tolerance</h3>
      <p>The ability of a system to continue operating properly even when one or more of its components fail. For example, if you run 4 web servers behind an Elastic Load Balancer and 1 server suddenly dies, the load balancer automatically stops sending traffic to the dead server and routes 100% of requests to the 3 healthy ones.</p>

      <h3>Disaster Recovery (DR)</h3>
      <p>Strategies to restore operations after a catastrophic event (e.g., an earthquake destroys an entire geographic region). Measured by two key metrics:</p>
      <ul>
        <li><strong>RPO (Recovery Point Objective):</strong> How much data loss can your business tolerate? (e.g., 5 minutes of database transactions).</li>
        <li><strong>RTO (Recovery Time Objective):</strong> How long can your service be down before being restored? (e.g., must be back online within 15 minutes).</li>
      </ul>

      <h2>2. Monolith vs Microservices in the Cloud</h2>
      <div class="devops-diagram-container">
        <div class="devops-diagram-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          Monolithic vs Microservices Architecture
        </div>
        <pre class="devops-code-pre" style="color: #38bdf8;">
+------------------------------------+       +------------------------------------+
|        MONOLITHIC ARCHITECTURE     |       |      MICROSERVICES ARCHITECTURE    |
+------------------------------------+       +------------------------------------+
|  [Single Large Codebase]           |       |  [API Gateway / Load Balancer]     |
|   - User Authentication            |       |     |          |          |        |
|   - Product Catalog                |       |     v          v          v        |
|   - Order Processing               |       | [Auth API] [Catalog]  [Orders]     |
|   - Payment Gateway                |       |   (Node)    (Python)   (Go)        |
|                                    |       |     |          |          |        |
|  [Single Massive Database]         |       |  [Auth DB] [Prod DB]  [Order DB]   |
+------------------------------------+       +------------------------------------+
One bug crashes the entire website.          Fault-isolated: If Orders crashes,
Scaling requires scaling the whole app.      Users can still browse the Catalog!
        </pre>
      </div>

      <h2>3. Event-Driven & Asynchronous Architecture</h2>
      <p>In synchronous systems, the frontend waits for the backend to complete a heavy operation (like sending an email or generating a PDF invoice). If the email server is slow, the user's checkout button hangs.</p>
      <p>In <strong>Event-Driven Cloud Architecture</strong>, the web application writes an event message to a queue (like AWS SQS or Kafka) and responds to the user immediately: <em>"Order received!"</em>. A background worker picks up the message and sends the email asynchronously.</p>
    `
  },

  // =========================================================================
  // CATEGORY 2: AWS (AMAZON WEB SERVICES)
  // =========================================================================
  {
    id: "aws-fundamentals-infra",
    title: "AWS Global Infrastructure, Console, CLI & IAM Fundamentals",
    category: "AWS Services",
    categoryNumber: 2,
    difficulty: "Beginner",
    readTime: "12 min",
    summary: "Explore Amazon Web Services: Global Regions, Availability Zones, Edge Locations, AWS CLI setup, Free Tier billing safety, and the AWS Shared Responsibility Model.",
    content: `
      <h2>1. What is AWS?</h2>
      <p><strong>Amazon Web Services (AWS)</strong> is the world's most widely adopted and comprehensive cloud computing platform, offering over 200 fully featured services from data centers globally. Launched by Amazon in 2006, it powers millions of businesses, from startups like Airbnb and Netflix to government agencies like NASA.</p>

      <h2>2. AWS Global Infrastructure: Regions, AZs & Edge Locations</h2>
      <ul>
        <li><strong>AWS Region:</strong> A separate geographic area around the world (e.g. <code>us-east-1</code> in North Virginia, <code>eu-west-1</code> in Ireland, <code>ap-south-1</code> in Mumbai). Each region is completely isolated from other regions for fault tolerance and compliance.</li>
        <li><strong>Availability Zone (AZ):</strong> One or more discrete data centers within an AWS Region, with redundant power, networking, and connectivity. They are separated by tens of kilometers (to protect against fires or floods) but connected by ultra-low latency fiber cables (&lt;1ms). For example, <code>us-east-1a</code>, <code>us-east-1b</code>, <code>us-east-1c</code>.</li>
        <li><strong>Edge Locations:</strong> Hundreds of localized Points of Presence (PoP) worldwide used by <strong>CloudFront (CDN)</strong> and <strong>Route 53</strong> to cache content close to end users for ultra-fast loading.</li>
      </ul>

      <h2>3. The AWS Shared Responsibility Model</h2>
      <div class="devops-card-callout">
        <strong>The Golden Rule of AWS Security:</strong><br>
        <strong>AWS is responsible for security OF the cloud:</strong> Physical data center security, hardware maintenance, network infrastructure, host operating system, and virtualization hypervisor.<br><br>
        <strong>YOU are responsible for security IN the cloud:</strong> Your guest OS patches, your application code, database configurations, firewall rules (Security Groups), and user permissions (IAM passwords and API keys).
      </div>

      <h2>4. AWS CLI Installation & Configuration</h2>
      <p>While you can use the web console, professional DevOps engineers manage AWS using the <strong>AWS Command Line Interface (CLI)</strong>.</p>
      
      <div class="devops-terminal-block">
        <div class="devops-terminal-header">
          <div class="devops-terminal-dots">
            <span class="devops-terminal-dot devops-dot-red"></span>
            <span class="devops-terminal-dot devops-dot-yellow"></span>
            <span class="devops-terminal-dot devops-dot-green"></span>
          </div>
          <span style="font-size: 0.75rem; color: #94a3b8;">bash - AWS CLI Setup</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-terminal-content">
# 1. Configure your AWS credentials
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-1
Default output format [None]: json

# 2. Verify who you are authenticated as
$ aws sts get-caller-identity
{
    "UserId": "AIDAS6EXAMPLEKEY",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/devops-engineer"
}

# 3. List your S3 buckets
$ aws s3 ls
2026-01-15 09:12:44 mlforge-app-assets
2026-02-20 14:35:10 production-database-backups
        </pre>
      </div>

      <h2>5. IAM Fundamentals (Identity and Access Management)</h2>
      <p><strong>IAM</strong> is the security gatekeeper of your AWS account. It answers two questions: <em>Who are you? (Authentication)</em> and <em>What are you allowed to do? (Authorization)</em>.</p>
      <ul>
        <li><strong>Root User:</strong> The account owner email. Has complete, unrestricted access. <em>Never use the root account for daily tasks!</em> Lock it with Multi-Factor Authentication (MFA).</li>
        <li><strong>IAM Users:</strong> Individual accounts for people or CLI tools with specific usernames and passwords.</li>
        <li><strong>IAM Groups:</strong> Collections of users (e.g. <code>Developers</code>, <code>Admins</code>) to apply permissions in bulk.</li>
        <li><strong>IAM Roles:</strong> Temporary credentials assumed by AWS services (e.g. allowing an EC2 instance to read an S3 bucket without hardcoding access keys in your code).</li>
        <li><strong>IAM Policies:</strong> JSON documents specifying <code>Effect: Allow/Deny</code>, <code>Action</code> (e.g. <code>s3:GetObject</code>), and <code>Resource</code>.</li>
      </ul>
    `
  },

  {
    id: "aws-compute-ec2-scaling",
    title: "AWS EC2, Instance Types, Security Groups, ALB & Auto Scaling",
    category: "AWS Services",
    categoryNumber: 2,
    difficulty: "Intermediate",
    readTime: "15 min",
    summary: "Deep dive into Amazon Elastic Compute Cloud (EC2): choosing instance types, configuring security groups, setting up Elastic Load Balancing (ALB), and automated Auto Scaling Groups (ASG).",
    content: `
      <h2>1. What is Amazon EC2?</h2>
      <p><strong>Amazon Elastic Compute Cloud (EC2)</strong> is a web service that provides resizable compute capacity in the cloud. It is the virtual server equivalent of having a computer in your bedroom, but hosted in Amazon's data centers with 99.99% uptime.</p>

      <h2>2. Decoding EC2 Instance Type Names</h2>
      <p>When launching an instance, you see names like <code>t3.micro</code>, <code>c6g.xlarge</code>, or <code>m5.2xlarge</code>. Here is how to decode them:</p>
      <div class="devops-card-callout">
        <strong>Formula: [Family][Generation][Optional Capabilities] . [Size]</strong><br>
        Example: <code>c6gn.2xlarge</code><br>
        - <strong>c:</strong> Compute Optimized family (high CPU-to-memory ratio)<br>
        - <strong>6:</strong> 6th generation hardware (newer CPU architecture)<br>
        - <strong>g:</strong> Graviton processor (AWS custom ARM-based chip, 40% better price/perf)<br>
        - <strong>n:</strong> Network optimized (up to 100 Gbps network bandwidth)<br>
        - <strong>2xlarge:</strong> Size (8 vCPUs, 16 GiB RAM)
      </div>

      <h2>3. Security Groups vs Network ACLs (NACLs)</h2>
      <p>Security Groups are your EC2 instance's personal virtual firewall. Remember these crucial differences:</p>
      <div class="devops-table-wrapper">
        <table class="devops-concept-table">
          <thead>
            <tr><th>Feature</th><th>Security Group (SG)</th><th>Network ACL (NACL)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Level</strong></td><td>Instance level (operates at virtual network card)</td><td>Subnet level (first line of defense)</td></tr>
            <tr><td><strong>State</strong></td><td><strong>Stateful:</strong> If you allow inbound traffic on port 80, the return outbound traffic is automatically allowed.</td><td><strong>Stateless:</strong> Inbound and outbound traffic must be explicitly allowed.</td></tr>
            <tr><td><strong>Rule Types</strong></td><td>ALLOW rules only (all else is denied by default)</td><td>ALLOW and DENY rules in numbered priority order</td></tr>
          </tbody>
        </table>
      </div>

      <h2>4. Elastic Load Balancing (ELB) & Auto Scaling Groups (ASG)</h2>
      <p>To build a fault-tolerant web application:</p>
      <ol>
        <li><strong>Application Load Balancer (ALB):</strong> Operates at Layer 7 (HTTP/HTTPS). Inspects incoming URLs and distributes requests evenly across multiple EC2 instances in different Availability Zones.</li>
        <li><strong>Auto Scaling Group (ASG):</strong> Monitors the average CPU utilization of your EC2 instances. If CPU exceeds 70%, ASG automatically launches 2 more EC2 instances and registers them with the ALB. When CPU drops below 30%, it terminates the extra instances to save money.</li>
      </ol>

      <div class="devops-diagram-container">
        <div class="devops-diagram-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          High Availability EC2 Architecture with ALB & Auto Scaling
        </div>
        <pre class="devops-code-pre" style="color: #38bdf8;">
                     [Internet Users]
                            | (HTTPS:443)
                            v
            [Application Load Balancer (ALB)]
               /                         \
              v (Health Check OK)         v (Health Check OK)
      +-------------------+      +-------------------+
      | AZ-1 (us-east-1a) |      | AZ-2 (us-east-1b) |
      |   [EC2 Instance]  |      |   [EC2 Instance]  |
      |  (App Server #1)  |      |  (App Server #2)  |
      +-------------------+      +-------------------+
               \                         /
                v                       v
               [Auto Scaling Group (ASG)]
             (Min: 2, Desired: 2, Max: 10)
        </pre>
      </div>

      <h2>5. Launching an EC2 Instance with User Data Script</h2>
      <div class="devops-code-block">
        <div class="devops-code-header">
          <span>bash - EC2 User Data Bootstrap Script</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-code-pre">
<span style="color: #6ee7b7;">#!/bin/bash</span>
<span style="color: #94a3b8;"># Update system packages</span>
apt-get update -y

<span style="color: #94a3b8;"># Install Nginx web server automatically on instance boot</span>
apt-get install -y nginx

<span style="color: #94a3b8;"># Start and enable Nginx service</span>
systemctl start nginx
systemctl enable nginx

<span style="color: #94a3b8;"># Write a custom welcome page with instance hostname</span>
echo "&lt;h1&gt;Hello from MLForge EC2 Instance: $(hostname -f)&lt;/h1&gt;" &gt; /var/www/html/index.html
        </pre>
      </div>
    `
  },

  {
    id: "aws-containers-serverless",
    title: "AWS Lambda, ECS, EKS & AWS Fargate",
    category: "AWS Services",
    categoryNumber: 2,
    difficulty: "Intermediate",
    readTime: "14 min",
    summary: "Compare AWS container and serverless offerings: Lambda functions, Elastic Container Service (ECS), Elastic Kubernetes Service (EKS), and serverless Fargate compute.",
    content: `
      <h2>1. The Spectrum of Compute on AWS</h2>
      <p>AWS provides 3 primary ways to run applications without managing raw EC2 virtual servers:</p>

      <h3>1. AWS Lambda (True Serverless)</h3>
      <p>You upload your code (Python, Node.js, Go, Java). When an event occurs (an image is uploaded to S3, an HTTP request hits API Gateway, or a database row is inserted), Lambda allocates execution memory, runs your code in milliseconds, and immediately shuts down.</p>
      <ul>
        <li><strong>Billing:</strong> You pay only for execution time in milliseconds and memory consumed. Zero idle cost.</li>
        <li><strong>Cold Start:</strong> If a function has not run recently, the first execution may take 200ms to 1s to spin up a micro-VM.</li>
        <li><strong>Timeout limit:</strong> Maximum 15 minutes per execution. Not suitable for long-running batch jobs or continuous background sockets.</li>
      </ul>

      <h3>2. AWS ECS (Elastic Container Service)</h3>
      <p>Amazon's native container orchestration service. Highly integrated with AWS IAM, CloudWatch, and Load Balancers. Simpler to learn and operate than Kubernetes if you are 100% committed to the AWS ecosystem.</p>

      <h3>3. AWS EKS (Elastic Kubernetes Service)</h3>
      <p>Managed Kubernetes on AWS. Runs standard, upstream Kubernetes so your configuration files (YAML) are 100% portable across AWS, Google Cloud, and on-premises clusters. Best for companies with large microservices architectures.</p>

      <h3>4. AWS Fargate (Serverless Containers)</h3>
      <p>Normally, ECS and EKS require you to manage the underlying EC2 worker nodes (patching Linux, managing disk space). <strong>AWS Fargate</strong> eliminates this: you specify your container CPU and RAM requirements, and AWS manages the infrastructure transparently!</p>

      <div class="devops-table-wrapper">
        <table class="devops-concept-table">
          <thead>
            <tr><th>Feature</th><th>AWS Lambda</th><th>AWS ECS with Fargate</th><th>AWS EKS</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Unit of Work</strong></td><td>Individual Function</td><td>Docker Container (Task)</td><td>Kubernetes Pods</td></tr>
            <tr><td><strong>Max Execution Time</strong></td><td>15 minutes</td><td>Unlimited (Runs 24/7)</td><td>Unlimited (Runs 24/7)</td></tr>
            <tr><td><strong>Server Management</strong></td><td>Zero servers</td><td>Zero servers (Fargate)</td><td>Managed Control Plane + Node Groups</td></tr>
            <tr><td><strong>Best For</strong></td><td>Event processing, webhooks, lightweight APIs</td><td>Containerized microservices, APIs</td><td>Enterprise Kubernetes standard</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  {
    id: "aws-storage-s3-ebs",
    title: "AWS Storage: S3, Storage Classes, EBS, EFS & Glacier",
    category: "AWS Services",
    categoryNumber: 2,
    difficulty: "Beginner",
    readTime: "12 min",
    summary: "Master cloud storage: Amazon S3 object storage, buckets, versioning, lifecycle policies, static website hosting, EBS block storage, and EFS shared file systems.",
    content: `
      <h2>1. The 3 Types of Cloud Storage</h2>
      <ol>
        <li><strong>Object Storage (Amazon S3):</strong> Files (objects) stored in flat buckets with unique keys, metadata, and HTTP URLs. Highly scalable, virtually infinite capacity. Cannot be mounted as a boot hard drive.</li>
        <li><strong>Block Storage (Amazon EBS):</strong> Virtual hard drives attached to one EC2 instance at a time over a high-speed storage network. Perfect for operating systems and databases that require low latency.</li>
        <li><strong>File Storage (Amazon EFS):</strong> Managed network file system (NFS) that can be mounted simultaneously by hundreds of EC2 instances and containers for shared access.</li>
      </ol>

      <h2>2. Amazon S3 (Simple Storage Service)</h2>
      <p>S3 is designed for <strong>99.999999999% (11 9's)</strong> of data durability. If you store 10,000,000 files on S3, you can expect to lose an average of one file every 10,000 years because AWS automatically copies your data across at least 3 distinct Availability Zones!</p>

      <h3>S3 Storage Classes</h3>
      <div class="devops-table-wrapper">
        <table class="devops-concept-table">
          <thead>
            <tr><th>Storage Class</th><th>Retrieval Time</th><th>Durability</th><th>Ideal Use Case</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>S3 Standard</strong></td><td>Milliseconds</td><td>99.999999999%</td><td>Frequently accessed web assets, profile pictures</td></tr>
            <tr><td><strong>S3 Intelligent-Tiering</strong></td><td>Milliseconds</td><td>99.999999999%</td><td>Data with unknown or changing access patterns (auto moves)</td></tr>
            <tr><td><strong>S3 Standard-IA</strong></td><td>Milliseconds</td><td>99.999999999%</td><td>Infrequently accessed backups, disaster recovery files</td></tr>
            <tr><td><strong>S3 Glacier Flexible</strong></td><td>Minutes to hours</td><td>99.999999999%</td><td>Long-term archive (annual financial audits)</td></tr>
            <tr><td><strong>S3 Glacier Deep Archive</strong></td><td>12 to 48 hours</td><td>99.999999999%</td><td>Lowest cost storage (\$0.00099/GB/month) for legal compliance</td></tr>
          </tbody>
        </table>
      </div>

      <h2>3. S3 Bucket Lifecycle Rules</h2>
      <p>Instead of manually moving old files, configure automated <strong>Lifecycle Rules</strong>:</p>
      <ul>
        <li>Day 0: File uploaded to <strong>S3 Standard</strong>.</li>
        <li>Day 30: Transition automatically to <strong>S3 Standard-IA</strong> (saves 50% cost).</li>
        <li>Day 90: Transition automatically to <strong>S3 Glacier Deep Archive</strong> (saves 95% cost).</li>
        <li>Day 365: Permanently delete object.</li>
      </ul>
    `
  },

  {
    id: "aws-databases-rds-nosql",
    title: "AWS Database Services: RDS, Aurora, DynamoDB & ElastiCache",
    category: "AWS Services",
    categoryNumber: 2,
    difficulty: "Intermediate",
    readTime: "14 min",
    summary: "Learn when to use relational databases (RDS & Aurora), NoSQL document databases (DynamoDB), and in-memory caches (Redis/ElastiCache) in production.",
    content: `
      <h2>1. Self-Managed Database on EC2 vs Managed AWS RDS</h2>
      <p>You <em>could</em> launch an EC2 instance, install PostgreSQL, and manage it yourself. But here is why companies choose <strong>Amazon RDS (Relational Database Service)</strong>:</p>
      <ul>
        <li><strong>Automated Backups:</strong> Point-in-time recovery to any second within your retention window (up to 35 days).</li>
        <li><strong>Multi-AZ Failover:</strong> Synchronously replicates your database to a standby replica in a second Availability Zone. If the primary hardware dies, AWS automatically switches DNS to the standby in under 60 seconds with zero data loss.</li>
        <li><strong>Read Replicas:</strong> Spreads heavy read traffic (e.g. reporting dashboards) across up to 15 read-only database copies.</li>
        <li><strong>Automatic OS & DB Patching:</strong> AWS handles security patches during scheduled maintenance windows.</li>
      </ul>

      <h2>2. Amazon Aurora: Cloud-Native Relational Engine</h2>
      <p><strong>Amazon Aurora</strong> is a proprietary relational database engine developed by AWS that is 100% compatible with MySQL and PostgreSQL. It separates the compute engine from the storage tier:</p>
      <ul>
        <li>5x faster than standard MySQL, 3x faster than standard PostgreSQL.</li>
        <li>Replicates 6 copies of your data across 3 Availability Zones automatically.</li>
        <li>Storage auto-scales from 10 GB up to 128 TB without any downtime or manual resizing.</li>
      </ul>

      <h2>3. Amazon DynamoDB: Serverless High-Speed NoSQL</h2>
      <p>A fully managed, serverless, key-value and document database that delivers consistent, <strong>single-digit millisecond latency</strong> at any scale. It handles millions of requests per second for Amazon Prime Day and Snapchat.</p>
      <div class="devops-card-tip">
        <strong>DynamoDB Partition Key Concept:</strong> DynamoDB shards data across multiple internal storage nodes using a mathematical hash of your <strong>Partition Key (PK)</strong>. As long as your partition keys are evenly distributed (e.g. <code>user_id</code>), it scales infinitely without bottlenecking.
      </div>

      <h2>4. In-Memory Caching: Amazon ElastiCache (Redis)</h2>
      <p>Databases that read from disk (even fast NVMe SSDs) take 2ms to 15ms per query. <strong>Amazon ElastiCache for Redis</strong> stores data entirely in RAM, answering queries in <strong>sub-millisecond (&lt;0.5ms)</strong> time. Use it to cache session tokens, leaderboards, and frequent SQL query results.</p>
    `
  },

  {
    id: "aws-networking-vpc",
    title: "AWS Networking: VPC, Subnets, Gateways, Route Tables & Route 53",
    category: "AWS Services",
    categoryNumber: 2,
    difficulty: "Advanced",
    readTime: "16 min",
    summary: "Master cloud networking: Virtual Private Cloud (VPC), Public vs Private Subnets, Internet Gateways (IGW), NAT Gateways, Route Tables, and Route 53 DNS.",
    content: `
      <h2>1. What is an Amazon VPC (Virtual Private Cloud)?</h2>
      <p>An <strong>Amazon VPC</strong> is your own isolated, private virtual network inside the AWS cloud. It is logically isolated from all other customer networks. You control the IP address range (CIDR block), create subnets, configure route tables, and setup network gateways.</p>

      <h2>2. Public Subnets vs Private Subnets</h2>
      <div class="devops-card-callout">
        <strong>The Golden Architectural Rule of Security:</strong><br>
        - <strong>Public Subnet:</strong> Has a direct route to an <strong>Internet Gateway (IGW)</strong>. Instances inside receive public IP addresses. Only put internet-facing resources here: Load Balancers, Bastion Hosts.<br><br>
        - <strong>Private Subnet:</strong> Has NO direct route to the Internet. Instances have only private IP addresses (e.g. <code>10.0.2.15</code>). Your application servers and databases MUST live here so hackers on the Internet cannot probe their ports directly!
      </div>

      <h2>3. How Private Subnets Access the Internet: NAT Gateway</h2>
      <p>Your backend servers in private subnets cannot accept inbound connections from the internet, but they still need to download Linux security updates (<code>apt update</code>) or talk to Stripe API. How?</p>
      <p>A <strong>NAT Gateway (Network Address Translation)</strong> lives in the public subnet. When a private EC2 instance requests an update, it routes through the NAT Gateway, which masks the private IP with its own Elastic IP, fetches the package, and forwards it back safely.</p>

      <div class="devops-diagram-container">
        <div class="devops-diagram-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
          Standard Production 2-Tier VPC Architecture
        </div>
        <pre class="devops-code-pre" style="color: #38bdf8;">
+--------------------------------------------------------------------------+
|  VPC (10.0.0.0/16)                                                       |
|                                                                          |
|  [PUBLIC SUBNET (10.0.1.0/24)] <---------> [Internet Gateway (IGW)] <---> Internet
|    - Application Load Balancer (ALB)                                     |
|    - NAT Gateway (with Elastic IP)                                       |
|          ^                                                               |
|          | (Outbound traffic only via NAT)                               |
|          v                                                               |
|  [PRIVATE SUBNET (10.0.2.0/24)]                                          |
|    - EC2 Backend Application Servers (Django / FastAPI)                  |
|    - Amazon RDS PostgreSQL Database (Multi-AZ)                           |
+--------------------------------------------------------------------------+
        </pre>
      </div>

      <h2>4. Route 53: Highly Available Cloud DNS</h2>
      <p>Amazon Route 53 translates human-friendly domain names (like <code>www.mlforge.com</code>) into computer IP addresses (like <code>54.239.28.85</code>). Key routing policies:</p>
      <ul>
        <li><strong>Simple Routing:</strong> Standard single-record lookup.</li>
        <li><strong>Weighted Routing:</strong> Route 80% of traffic to version 1 and 20% to version 2 (Canary testing).</li>
        <li><strong>Latency-based Routing:</strong> Directs users to the AWS region that provides the lowest network latency.</li>
        <li><strong>Failover Routing:</strong> Routes users to a backup secondary region if the primary region fails health checks.</li>
      </ul>
    `
  },

  {
    id: "aws-security-iam",
    title: "AWS Security: IAM Policies, KMS, Secrets Manager & Shield",
    category: "AWS Services",
    categoryNumber: 2,
    difficulty: "Intermediate",
    readTime: "14 min",
    summary: "Secure cloud workloads using IAM Least Privilege, AWS KMS encryption, Secrets Manager rotation, AWS WAF web firewalls, and GuardDuty threat detection.",
    content: `
      <h2>1. The Principle of Least Privilege</h2>
      <p>Every IAM user, application, and service role must be granted <strong>only the minimum permissions necessary</strong> to complete its job, and not a single permission more.</p>

      <h2>2. Understanding IAM Policy JSON Documents</h2>
      <div class="devops-code-block">
        <div class="devops-code-header">
          <span>json - Production IAM Read-Only S3 Policy</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-code-pre">
{
  <span style="color: #93c5fd;">"Version"</span>: <span style="color: #86efac;">"2012-10-17"</span>,
  <span style="color: #93c5fd;">"Statement"</span>: [
    {
      <span style="color: #93c5fd;">"Sid"</span>: <span style="color: #86efac;">"AllowReadBucketAssets"</span>,
      <span style="color: #93c5fd;">"Effect"</span>: <span style="color: #86efac;">"Allow"</span>,
      <span style="color: #93c5fd;">"Action"</span>: [
        <span style="color: #86efac;">"s3:GetObject"</span>,
        <span style="color: #86efac;">"s3:ListBucket"</span>
      ],
      <span style="color: #93c5fd;">"Resource"</span>: [
        <span style="color: #86efac;">"arn:aws:s3:::mlforge-production-assets"</span>,
        <span style="color: #86efac;">"arn:aws:s3:::mlforge-production-assets/*"</span>
      ]
    }
  ]
}
        </pre>
      </div>

      <h2>3. Secrets Management: Secrets Manager vs Parameter Store</h2>
      <p>Never commit database passwords or API keys to GitHub! Use:</p>
      <ul>
        <li><strong>AWS Systems Manager Parameter Store:</strong> Secure, hierarchical storage for configuration parameters and passwords (Standard tier is free).</li>
        <li><strong>AWS Secrets Manager:</strong> Advanced secret storage that supports automatic password rotation for RDS databases without application downtime.</li>
      </ul>

      <h2>4. AWS WAF, Shield & GuardDuty</h2>
      <ul>
        <li><strong>AWS WAF (Web Application Firewall):</strong> Filters malicious web traffic at Layer 7. Protects against SQL Injection, Cross-Site Scripting (XSS), and bot scraping before requests ever hit your servers.</li>
        <li><strong>AWS Shield:</strong> Managed Distributed Denial of Service (DDoS) protection. Shield Standard is enabled automatically for all AWS customers at zero cost.</li>
        <li><strong>Amazon GuardDuty:</strong> Intelligent threat detection service that continuously monitors VPC flow logs, DNS logs, and CloudTrail events using machine learning to detect compromised accounts or crypto-mining instances.</li>
      </ul>
    `
  },

  {
    id: "aws-monitoring-management",
    title: "AWS Monitoring: CloudWatch, CloudTrail & Cost Management",
    category: "AWS Services",
    categoryNumber: 2,
    difficulty: "Intermediate",
    readTime: "12 min",
    summary: "Monitor infrastructure health with Amazon CloudWatch metrics and alarms, track API audit logs with CloudTrail, and control expenses with AWS Budgets.",
    content: `
      <h2>1. Amazon CloudWatch: Metrics, Alarms & Logs</h2>
      <p><strong>CloudWatch</strong> is the central observability service for AWS resources:</p>
      <ul>
        <li><strong>Metrics:</strong> Time-series data collected every 1 or 5 minutes (CPUUtilization, NetworkIn, DiskReadBytes).</li>
        <li><strong>Alarms:</strong> Automated triggers. If CPU &gt; 80% for 5 minutes, CloudWatch can send an SMS via SNS, trigger an Auto Scaling policy, or reboot a stuck EC2 instance.</li>
        <li><strong>CloudWatch Logs:</strong> Centralized log aggregation for application logs, Nginx access logs, and Lambda execution outputs.</li>
      </ul>

      <h2>2. CloudWatch vs AWS CloudTrail: The Big Interview Distinction</h2>
      <div class="devops-card-callout">
        <strong>CloudWatch</strong> answers: <em>"How are my resources performing?"</em> (CPU is at 45%, Memory is at 60%, Latency is 120ms).<br><br>
        <strong>CloudTrail</strong> answers: <em>"Who did what, when, and from where?"</em> (User 'alice' deleted S3 bucket 'finance-data' at 3:15 PM from IP address 198.51.100.4). CloudTrail records every AWS API call for compliance and forensic auditing.
      </div>

      <h2>3. Cloud Cost Management: Budgets & Cost Explorer</h2>
      <p>To avoid bill shocks:</p>
      <ol>
        <li><strong>AWS Budgets:</strong> Set a custom monthly budget limit (e.g. \$20/month for student learning). Configure an alert to email you when your actual or forecasted spend exceeds 80%.</li>
        <li><strong>AWS Cost Explorer:</strong> Interactive visual interface to track your daily and monthly spend broken down by service (EC2 vs RDS vs S3).</li>
      </ol>
    `
  },

  {
    id: "aws-advanced-services",
    title: "AWS Advanced Services: SQS, SNS, EventBridge, SageMaker & Bedrock",
    category: "AWS Services",
    categoryNumber: 2,
    difficulty: "Advanced",
    readTime: "15 min",
    summary: "Explore advanced cloud capabilities: asynchronous messaging with SQS and SNS, event buses, ETL pipelines, and Generative AI on AWS with Amazon Bedrock.",
    content: `
      <h2>1. SQS (Simple Queue Service) vs SNS (Simple Notification Service)</h2>
      <div class="devops-table-wrapper">
        <table class="devops-concept-table">
          <thead>
            <tr><th>Feature</th><th>Amazon SQS (Queue)</th><th>Amazon SNS (Pub/Sub)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Pattern</strong></td><td><strong>Point-to-Point (Pull):</strong> Messages wait in the queue until a consumer pulls and processes them.</td><td><strong>Publish / Subscribe (Push):</strong> Publisher pushes a message to a topic, and SNS fans it out immediately to all subscribers.</td></tr>
            <tr><td><strong>Consumers</strong></td><td>One consumer processes each message.</td><td>Many subscribers (HTTP, SQS, Email, SMS, Lambda).</td></tr>
            <tr><td><strong>Retention</strong></td><td>Messages persist for up to 14 days.</td><td>No persistence (if no subscriber is listening, message is dropped).</td></tr>
          </tbody>
        </table>
      </div>

      <h2>2. EventBridge & Step Functions</h2>
      <ul>
        <li><strong>Amazon EventBridge:</strong> Serverless event bus that routes events between AWS services, SaaS apps (Zendesk, Shopify), and custom applications with schema discovery.</li>
        <li><strong>AWS Step Functions:</strong> Visual workflow orchestrator to coordinate multi-step microservices (e.g., Check Inventory &rarr; Charge Credit Card &rarr; Send Shipping Notification) with automatic retry logic and error branching.</li>
      </ul>

      <h2>3. AI & Machine Learning on AWS: SageMaker & Bedrock</h2>
      <ul>
        <li><strong>Amazon SageMaker:</strong> Fully managed platform for data scientists and ML engineers to build, train, tune, and deploy machine learning models at petabyte scale.</li>
        <li><strong>Amazon Bedrock:</strong> The easiest way to build Generative AI applications using Foundation Models (Anthropic Claude, Meta Llama, Amazon Titan) via a single unified API without managing GPU server clusters.</li>
      </ul>
    `
  },

  // =========================================================================
  // CATEGORY 3: DOCKER & CONTAINERIZATION
  // =========================================================================
  {
    id: "docker-fundamentals-architecture",
    title: "Docker Fundamentals: Why Docker & The 'Works on My Machine' Problem",
    category: "Docker & Containers",
    categoryNumber: 3,
    difficulty: "Beginner",
    readTime: "12 min",
    summary: "Understand why Docker transformed modern software engineering, how containers eliminate environmental inconsistencies, and the client-server Docker architecture.",
    content: `
      <h2>1. The Classic 'Works on My Machine' Nightmare</h2>
      <p>Before Docker, software development suffered from a notorious problem:</p>
      <p>A developer writes a Python 3.10 web app on their MacBook using PostgreSQL 14. It runs smoothly on their laptop. But when they send the code to QA or deploy it to the production Ubuntu server, the app crashes with errors: <em>Python 3.8 installed instead of 3.10, missing C++ compilation libraries, different file path slashes!</em></p>
      
      <div class="devops-card-analogy">
        <strong>The Shipping Container Analogy:</strong><br>
        Before standard shipping containers in 1956, dockworkers loaded bags of coffee, barrels of oil, and crates of bananas one by one. If a banana crate got wet or squished, goods spoiled. Shipping containers standardized the package: a steel box that fits onto any ship, any train, and any truck anywhere in the world.<br><br>
        <strong>Docker is the shipping container for code:</strong> It bundles your application code, exact programming language version, libraries, configurations, and environment variables into one standard unit that runs identically on a developer's Mac, a Windows laptop, and an AWS EC2 Linux server!
      </div>

      <h2>2. Images vs Containers</h2>
      <ul>
        <li><strong>Docker Image:</strong> A read-only blueprint or template containing the application code, runtime, and libraries. Think of an image as a <em>class</em> in OOP or an unbaked cake recipe.</li>
        <li><strong>Docker Container:</strong> A runnable, live instance of a Docker image. Think of a container as an <em>object</em> instantiated from a class, or the actual baked cake. You can launch 10 identical containers from 1 single image!</li>
      </ul>

      <h2>3. Docker Architecture (Client-Server Engine)</h2>
      <div class="devops-diagram-container">
        <div class="devops-diagram-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/></svg>
          Docker Engine Client-Server Architecture
        </div>
        <pre class="devops-code-pre" style="color: #38bdf8;">
+-----------------------+          +-----------------------------------------+          +-------------------------+
|     DOCKER CLIENT     |          |             DOCKER HOST (DAEMON)        |          |     REGISTRY (HUB)      |
|  (CLI / Desktop UI)   |          |                (dockerd)                |          |   (hub.docker.com)      |
+-----------------------+          +-----------------------------------------+          +-------------------------+
|                       |  REST    |                                         |  PULL    |                         |
|  $ docker build   ----|--------->|  Builds image from Dockerfile           |<---------|  Official Images:       |
|  $ docker run     ----|--------->|  Creates & runs isolated containers     |          |    - python:3.11-slim   |
|  $ docker pull    ----|--------->|  Local Image Cache:                     |  PUSH    |    - postgres:15-alpine |
|                       |          |    - my-app:v1.0                        |--------->|    - nginx:alpine       |
+-----------------------+          +-----------------------------------------+          +-------------------------+
        </pre>
      </div>
    `
  },

  {
    id: "docker-commands-lifecycle",
    title: "Docker Commands: Master CLI Reference with Examples & Outputs",
    category: "Docker & Containers",
    categoryNumber: 3,
    difficulty: "Beginner",
    readTime: "14 min",
    summary: "Comprehensive guide to all essential Docker commands: running, stopping, inspecting, debugging, building, and managing container lifecycles.",
    content: `
      <h2>1. The Complete Container Lifecycle</h2>
      <p>A container moves through distinct states: <strong>Created &rarr; Running &rarr; Paused &rarr; Stopped &rarr; Removed</strong>.</p>

      <h2>2. Essential Docker Commands Explained Step by Step</h2>

      <div class="devops-terminal-block">
        <div class="devops-terminal-header">
          <div class="devops-terminal-dots">
            <span class="devops-terminal-dot devops-dot-red"></span>
            <span class="devops-terminal-dot devops-dot-yellow"></span>
            <span class="devops-terminal-dot devops-dot-green"></span>
          </div>
          <span style="font-size: 0.75rem; color: #94a3b8;">bash - Running Containers</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-terminal-content">
# 1. Run an Nginx web server in detached mode with port mapping
$ docker run -d --name web-server -p 8080:80 nginx:alpine
Unable to find image 'nginx:alpine' locally
alpine: Pulling from library/nginx
Digest: sha256:435a72061266016da10c85c2b0e9d564
Status: Downloaded newer image for nginx:alpine
c4b8e21a8d3876e9f291040854316a3fa9d8329605

# 2. List running containers
$ docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                  NAMES
c4b8e21a8d38   nginx:alpine   "/docker-entrypoint.…"   5 seconds ago   Up 4 seconds   0.0.0.0:8080->80/tcp   web-server
        </pre>
      </div>

      <div class="devops-table-wrapper">
        <table class="devops-concept-table">
          <thead>
            <tr><th>Flag</th><th>Full Name</th><th>Purpose</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr><td><code>-d</code></td><td>Detached</td><td>Runs container in the background (frees your terminal shell)</td><td><code>docker run -d nginx</code></td></tr>
            <tr><td><code>-p</code></td><td>Port Mapping</td><td>Maps <code>[HostPort]:[ContainerPort]</code></td><td><code>-p 8080:80</code></td></tr>
            <tr><td><code>--name</code></td><td>Custom Name</td><td>Assigns a friendly name instead of random generated string</td><td><code>--name my-postgres</code></td></tr>
            <tr><td><code>-v</code></td><td>Volume</td><td>Mounts host folder or managed volume into container</td><td><code>-v mydata:/var/lib/postgresql/data</code></td></tr>
            <tr><td><code>-e</code></td><td>Environment</td><td>Passes environment variable into container runtime</td><td><code>-e POSTGRES_PASSWORD=secret123</code></td></tr>
            <tr><td><code>--rm</code></td><td>Auto-Remove</td><td>Automatically removes container when it stops (great for one-off scripts)</td><td><code>docker run --rm python python -c "print(2+2)"</code></td></tr>
          </tbody>
        </table>
      </div>

      <h2>3. Debugging Running Containers</h2>
      <div class="devops-terminal-block">
        <div class="devops-terminal-header">
          <div class="devops-terminal-dots">
            <span class="devops-terminal-dot devops-dot-red"></span>
            <span class="devops-terminal-dot devops-dot-yellow"></span>
            <span class="devops-terminal-dot devops-dot-green"></span>
          </div>
          <span style="font-size: 0.75rem; color: #94a3b8;">bash - Container Logs & Exec Shell</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-terminal-content">
# Stream container standard output logs in real time
$ docker logs -f web-server
192.168.1.15 - - [09/Nov/2026:12:00:01 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.81.0"

# Open an interactive terminal shell inside the running container
$ docker exec -it web-server sh
/ # ls -l /usr/share/nginx/html/
total 8
-rw-r--r-- 1 root root 615 Nov 09 12:00 index.html
/ # exit
        </pre>
      </div>
    `
  },

  {
    id: "dockerfile-mastery",
    title: "Dockerfile Mastery: Production Examples for Python, Django, FastAPI & React",
    category: "Docker & Containers",
    categoryNumber: 3,
    difficulty: "Intermediate",
    readTime: "16 min",
    summary: "Write production-ready, secure Dockerfiles: FROM, WORKDIR, COPY, RUN, CMD, ENTRYPOINT, multi-stage builds, and line-by-line real-world examples.",
    content: `
      <h2>1. Anatomy of a Dockerfile</h2>
      <p>A <strong>Dockerfile</strong> is a plain text file containing sequential instructions that Docker executes to automatically assemble a container image.</p>

      <h2>2. Production FastAPI Application Dockerfile (Line by Line)</h2>
      <div class="devops-code-block">
        <div class="devops-code-header">
          <span>Dockerfile - FastAPI Production Image</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-code-pre">
<span style="color: #f43f5e;">FROM</span> python:3.11-slim

<span style="color: #94a3b8;"># Set working directory inside container</span>
<span style="color: #f43f5e;">WORKDIR</span> /app

<span style="color: #94a3b8;"># Prevent Python from writing .pyc files and buffer output</span>
<span style="color: #f43f5e;">ENV</span> PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

<span style="color: #94a3b8;"># Copy requirements FIRST to leverage Docker layer caching</span>
<span style="color: #f43f5e;">COPY</span> requirements.txt .
<span style="color: #f43f5e;">RUN</span> pip install --no-cache-dir -r requirements.txt

<span style="color: #94a3b8;"># Copy remaining source code</span>
<span style="color: #f43f5e;">COPY</span> . .

<span style="color: #94a3b8;"># Security Best Practice: Run as non-root user!</span>
<span style="color: #f43f5e;">RUN</span> adduser --disabled-password --gecos "" appuser &amp;&amp; chown -R appuser:appuser /app
<span style="color: #f43f5e;">USER</span> appuser

<span style="color: #f43f5e;">EXPOSE</span> 8000
<span style="color: #f43f5e;">CMD</span> [<span style="color: #86efac;">"uvicorn"</span>, <span style="color: #86efac;">"main:app"</span>, <span style="color: #86efac;">"--host"</span>, <span style="color: #86efac;">"0.0.0.0"</span>, <span style="color: #86efac;">"--port"</span>, <span style="color: #86efac;">"8000"</span>]
        </pre>
      </div>

      <h2>3. Multi-Stage Build: Production React App with Nginx</h2>
      <p>In traditional builds, Node.js, npm dependencies, and source files weigh 800+ MB. With <strong>Multi-Stage Builds</strong>, we build React with Node.js in stage 1, copy <em>only</em> the compiled static HTML/CSS/JS files into a tiny 25 MB Nginx Alpine image in stage 2, and discard the heavy Node.js environment!</p>

      <div class="devops-code-block">
        <div class="devops-code-header">
          <span>Dockerfile - React Multi-Stage Build</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-code-pre">
<span style="color: #94a3b8;"># --- STAGE 1: Build the React Application ---</span>
<span style="color: #f43f5e;">FROM</span> node:18-alpine <span style="color: #f43f5e;">AS</span> builder
<span style="color: #f43f5e;">WORKDIR</span> /app
<span style="color: #f43f5e;">COPY</span> package*.json ./
<span style="color: #f43f5e;">RUN</span> npm ci
<span style="color: #f43f5e;">COPY</span> . .
<span style="color: #f43f5e;">RUN</span> npm run build

<span style="color: #94a3b8;"># --- STAGE 2: Serve with lightweight Nginx (Only 25 MB!) ---</span>
<span style="color: #f43f5e;">FROM</span> nginx:alpine
<span style="color: #f43f5e;">COPY</span> --from=builder /app/dist /usr/share/nginx/html
<span style="color: #f43f5e;">EXPOSE</span> 80
<span style="color: #f43f5e;">CMD</span> [<span style="color: #86efac;">"nginx"</span>, <span style="color: #86efac;">"-g"</span>, <span style="color: #86efac;">"daemon off;"</span>]
        </pre>
      </div>
    `
  },

  {
    id: "docker-advanced-compose",
    title: "Docker Compose: Multi-Container Apps (Django, Postgres, Redis & Celery)",
    category: "Docker & Containers",
    categoryNumber: 3,
    difficulty: "Intermediate",
    readTime: "15 min",
    summary: "Orchestrate multi-container applications with docker-compose.yml: services, networks, persistent volumes, environment variables, and health checks.",
    content: `
      <h2>1. Why Docker Compose?</h2>
      <p>Running a single container is easy with <code>docker run</code>. But modern applications require multiple components: a web frontend, an API backend, a PostgreSQL database, a Redis cache, and Celery background workers. Running 5 separate <code>docker run</code> commands with long network flags and volume arguments is error-prone.</p>
      <p><strong>Docker Compose</strong> allows you to define and run your entire multi-container application stack in a single declarative YAML file (<code>docker-compose.yml</code>), and start everything with one command: <code>docker compose up -d</code>!</p>

      <h2>2. Production Django + PostgreSQL Compose File</h2>
      <div class="devops-code-block">
        <div class="devops-code-header">
          <span>yaml - docker-compose.yml (Django + Postgres)</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-code-pre">
<span style="color: #93c5fd;">version</span>: <span style="color: #86efac;">"3.8"</span>

<span style="color: #93c5fd;">services</span>:
  <span style="color: #93c5fd;">db</span>:
    <span style="color: #93c5fd;">image</span>: postgres:15-alpine
    <span style="color: #93c5fd;">volumes</span>:
      - postgres_data:/var/lib/postgresql/data/
    <span style="color: #93c5fd;">environment</span>:
      - POSTGRES_DB=app_db
      - POSTGRES_USER=app_user
      - POSTGRES_PASSWORD=secret_password
    <span style="color: #93c5fd;">healthcheck</span>:
      <span style="color: #93c5fd;">test</span>: [<span style="color: #86efac;">"CMD-SHELL"</span>, <span style="color: #86efac;">"pg_isready -U app_user -d app_db"</span>]
      <span style="color: #93c5fd;">interval</span>: 5s
      <span style="color: #93c5fd;">timeout</span>: 5s
      <span style="color: #93c5fd;">retries</span>: 5

  <span style="color: #93c5fd;">web</span>:
    <span style="color: #93c5fd;">build</span>: .
    <span style="color: #93c5fd;">command</span>: python manage.py runserver 0.0.0.0:8000
    <span style="color: #93c5fd;">volumes</span>:
      - .:/app
    <span style="color: #93c5fd;">ports</span>:
      - <span style="color: #86efac;">"8000:8000"</span>
    <span style="color: #93c5fd;">environment</span>:
      - DB_HOST=db
      - DB_NAME=app_db
      - DB_USER=app_user
      - DB_PASSWORD=secret_password
    <span style="color: #93c5fd;">depends_on</span>:
      <span style="color: #93c5fd;">db</span>:
        <span style="color: #93c5fd;">condition</span>: service_healthy

<span style="color: #93c5fd;">volumes</span>:
  <span style="color: #93c5fd;">postgres_data</span>:
        </pre>
      </div>

      <h2>3. Docker Networks & Service Discovery</h2>
      <p>Notice that the <code>web</code> service connects to the database using <code>DB_HOST=db</code>. Docker Compose automatically creates an internal bridge network and a built-in DNS server that resolves service names (like <code>db</code>) to their container IP addresses automatically!</p>
    `
  },

  // =========================================================================
  // CATEGORY 4: KUBERNETES
  // =========================================================================
  {
    id: "kubernetes-fundamentals-arch",
    title: "Kubernetes Architecture: Control Plane, Worker Nodes & Pods",
    category: "Kubernetes",
    categoryNumber: 4,
    difficulty: "Intermediate",
    readTime: "14 min",
    summary: "Discover the world's leading container orchestrator: why Docker is not enough for production, Control Plane components (etcd, API server), and Worker Nodes.",
    content: `
      <h2>1. Why Kubernetes? Problems Docker Cannot Solve Alone</h2>
      <p>Docker is fantastic at packaging and running a container on a <em>single computer</em>. But what happens when your website grows to 500 containers running across 50 physical servers?</p>
      <ul>
        <li>What if Server #4 physically dies at 3:00 AM? Who restarts its 12 containers on another server?</li>
        <li>How do you distribute incoming traffic evenly across 30 containers?</li>
        <li>How do you upgrade your app from v1 to v2 with zero downtime?</li>
        <li>How do you automatically scale from 10 containers to 100 when traffic spikes?</li>
      </ul>
      <p><strong>Kubernetes (K8s)</strong> is an open-source container orchestration engine originally designed by Google to automate deployment, scaling, healing, and management of containerized applications across a cluster of servers.</p>

      <h2>2. Kubernetes Architecture Overview</h2>
      <div class="devops-diagram-container">
        <div class="devops-diagram-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/></svg>
          Kubernetes Cluster Architecture: Control Plane & Worker Nodes
        </div>
        <pre class="devops-code-pre" style="color: #38bdf8;">
+-----------------------------------------------------------------------------+
|                        CONTROL PLANE (The Brain)                            |
|                                                                             |
|  [kube-apiserver] <---> [etcd] (Distributed Key-Value Store)                |
|         ^                                                                   |
|         |---------> [kube-scheduler] (Assigns Pods to healthy Worker Nodes) |
|         |                                                                   |
|         +---------> [kube-controller-manager] (Self-Healing & Replication)   |
+-----------------------------------------------------------------------------+
               |                                            |
               v                                            v
+-------------------------------+            +-------------------------------+
|    WORKER NODE 1 (Minion)     |            |    WORKER NODE 2 (Minion)     |
+-------------------------------+            +-------------------------------+
| [kubelet] (Node Agent)        |            | [kubelet] (Node Agent)        |
| [kube-proxy] (Network Rules)  |            | [kube-proxy] (Network Rules)  |
| [Containerd] (Runtime)        |            | [Containerd] (Runtime)        |
|                               |            |                               |
|   +-----------------------+   |            |   +-----------------------+   |
|   | Pod (App Container)   |   |            |   | Pod (App Container)   |   |
|   +-----------------------+   |            |   +-----------------------+   |
+-------------------------------+            +-------------------------------+
        </pre>
      </div>

      <h2>3. Deep Dive: Control Plane Components</h2>
      <ol>
        <li><strong>kube-apiserver:</strong> The central gateway. Every command from <code>kubectl</code>, worker nodes, and internal controllers communicates via this REST API.</li>
        <li><strong>etcd:</strong> A distributed, consistent key-value store that acts as the single source of truth for the entire cluster state.</li>
        <li><strong>kube-scheduler:</strong> Watches for newly created Pods with no assigned node and selects the best worker node based on available CPU, RAM, and affinity rules.</li>
        <li><strong>kube-controller-manager:</strong> Constantly monitors cluster state. If a node dies, the controller detects it and schedules replacement pods to maintain the desired replica count.</li>
      </ol>
    `
  },

  {
    id: "kubernetes-objects-workloads",
    title: "Kubernetes Objects: Pods, Deployments, Services & Ingress",
    category: "Kubernetes",
    categoryNumber: 4,
    difficulty: "Intermediate",
    readTime: "15 min",
    summary: "Master core Kubernetes objects: Pods, Deployments for zero-downtime rolling updates, Services (ClusterIP, NodePort, LoadBalancer), ConfigMaps, Secrets, and Ingress.",
    content: `
      <h2>1. The Smallest Unit: What is a Pod?</h2>
      <p>In Kubernetes, you never deploy a single container directly. You deploy a <strong>Pod</strong>. A Pod represents a single instance of a running process in your cluster and wraps one (or occasionally more tightly coupled) containers that share the exact same network IP and storage volumes.</p>

      <h2>2. Production Kubernetes Deployment YAML Manifest</h2>
      <div class="devops-code-block">
        <div class="devops-code-header">
          <span>yaml - deployment.yaml (Production Web App)</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-code-pre">
<span style="color: #93c5fd;">apiVersion</span>: apps/v1
<span style="color: #93c5fd;">kind</span>: Deployment
<span style="color: #93c5fd;">metadata</span>:
  <span style="color: #93c5fd;">name</span>: web-app-deployment
  <span style="color: #93c5fd;">labels</span>:
    <span style="color: #93c5fd;">app</span>: web-app
<span style="color: #93c5fd;">spec</span>:
  <span style="color: #93c5fd;">replicas</span>: 3
  <span style="color: #93c5fd;">selector</span>:
    <span style="color: #93c5fd;">matchLabels</span>:
      <span style="color: #93c5fd;">app</span>: web-app
  <span style="color: #93c5fd;">template</span>:
    <span style="color: #93c5fd;">metadata</span>:
      <span style="color: #93c5fd;">labels</span>:
        <span style="color: #93c5fd;">app</span>: web-app
    <span style="color: #93c5fd;">spec</span>:
      <span style="color: #93c5fd;">containers</span>:
      - <span style="color: #93c5fd;">name</span>: web-app
        <span style="color: #93c5fd;">image</span>: nginx:1.25-alpine
        <span style="color: #93c5fd;">ports</span>:
        - <span style="color: #93c5fd;">containerPort</span>: 80
        <span style="color: #93c5fd;">resources</span>:
          <span style="color: #93c5fd;">requests</span>:
            <span style="color: #93c5fd;">memory</span>: <span style="color: #86efac;">"64Mi"</span>
            <span style="color: #93c5fd;">cpu</span>: <span style="color: #86efac;">"50m"</span>
          <span style="color: #93c5fd;">limits</span>:
            <span style="color: #93c5fd;">memory</span>: <span style="color: #86efac;">"128Mi"</span>
            <span style="color: #93c5fd;">cpu</span>: <span style="color: #86efac;">"100m"</span>
        </pre>
      </div>

      <h2>3. Kubernetes Services: How Traffic Reaches Pods</h2>
      <p>Pods are ephemeral: they die and get recreated with completely new random IP addresses. A <strong>Service</strong> provides a static, stable IP address and DNS name in front of a dynamic group of Pods using label selectors.</p>
      <ul>
        <li><strong>ClusterIP (Default):</strong> Exposes the service internally inside the cluster. Perfect for private databases and backend APIs.</li>
        <li><strong>NodePort:</strong> Exposes the service on each Worker Node's IP at a static port (between 30000-32767).</li>
        <li><strong>LoadBalancer:</strong> Provisions an external Cloud Load Balancer (e.g. AWS Network Load Balancer) that routes public internet traffic directly into the service.</li>
        <li><strong>Ingress:</strong> Smart HTTP/HTTPS Layer 7 reverse proxy that routes traffic based on domain names (e.g. <code>api.example.com</code> vs <code>app.example.com</code>) to different Services under a single IP address.</li>
      </ul>
    `
  },

  {
    id: "kubectl-commands-operations",
    title: "Kubectl Commands: Day-to-Day Operations & Debugging Guide",
    category: "Kubernetes",
    categoryNumber: 4,
    difficulty: "Intermediate",
    readTime: "12 min",
    summary: "Command line operations with kubectl: inspecting cluster status, managing deployments, viewing live container logs, scaling replicas, and port forwarding.",
    content: `
      <h2>1. The Swiss Army Knife of Kubernetes</h2>
      <p><code>kubectl</code> is the official command-line tool for controlling Kubernetes clusters via the <code>kube-apiserver</code>.</p>

      <div class="devops-terminal-block">
        <div class="devops-terminal-header">
          <div class="devops-terminal-dots">
            <span class="devops-terminal-dot devops-dot-red"></span>
            <span class="devops-terminal-dot devops-dot-yellow"></span>
            <span class="devops-terminal-dot devops-dot-green"></span>
          </div>
          <span style="font-size: 0.75rem; color: #94a3b8;">bash - Essential kubectl Commands</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-terminal-content">
# 1. View all nodes in the cluster
$ kubectl get nodes
NAME                               STATUS   ROLES           AGE   VERSION
ip-10-0-1-50.ec2.internal          Ready    control-plane   12d   v1.28.2
ip-10-0-2-101.ec2.internal         Ready    &lt;none&gt;          12d   v1.28.2
ip-10-0-2-102.ec2.internal         Ready    &lt;none&gt;          12d   v1.28.2

# 2. Apply a manifest file declaratively
$ kubectl apply -f deployment.yaml
deployment.apps/web-app-deployment created

# 3. View running pods with their internal IP addresses
$ kubectl get pods -o wide
NAME                                  READY   STATUS    RESTARTS   AGE   IP           NODE
web-app-deployment-7848d7c9-4j8kp     1/1     Running   0          45s   10.244.1.4   ip-10-0-2-101
web-app-deployment-7848d7c9-9m2bx     1/1     Running   0          45s   10.244.2.8   ip-10-0-2-102
web-app-deployment-7848d7c9-z5wql     1/1     Running   0          45s   10.244.1.5   ip-10-0-2-101

# 4. Scale up the deployment on demand
$ kubectl scale deployment web-app-deployment --replicas=5
deployment.apps/web-app-deployment scaled

# 5. Rollout history and undo a bad deployment
$ kubectl rollout status deployment/web-app-deployment
$ kubectl rollout undo deployment/web-app-deployment
        </pre>
      </div>

      <h2>2. Port Forwarding for Local Debugging</h2>
      <p>Need to test a private database or Redis pod without exposing it to the internet?</p>
      <div class="devops-terminal-block">
        <pre class="devops-terminal-content">
# Forward local port 5432 to the remote Postgres pod port 5432
$ kubectl port-forward pod/postgres-pod-79f8b 5432:5432
Forwarding from 127.0.0.1:5432 -> 5432
# Now connect your local pgAdmin or DBeaver to localhost:5432!
        </pre>
      </div>
    `
  },

  {
    id: "kubernetes-advanced-helm",
    title: "Advanced Kubernetes: Health Probes, HPA, RBAC & Helm Charts",
    category: "Kubernetes",
    categoryNumber: 4,
    difficulty: "Advanced",
    readTime: "16 min",
    summary: "Production Kubernetes engineering: Liveness vs Readiness probes, Horizontal Pod Autoscaler (HPA), RBAC security, and Helm package manager.",
    content: `
      <h2>1. Health Probes: Liveness vs Readiness vs Startup</h2>
      <div class="devops-card-callout">
        <strong>Liveness Probe:</strong> Answers <em>"Is the container alive or deadlocked?"</em> If this probe fails 3 times, Kubernetes forcefully kills the container and restarts it.<br><br>
        <strong>Readiness Probe:</strong> Answers <em>"Is the container ready to accept network traffic?"</em> While your app is booting or loading machine learning weights into memory, it is NOT ready. Kubernetes temporarily removes it from Service load balancers so users never see HTTP 502/503 errors.
      </div>

      <h2>2. Horizontal Pod Autoscaler (HPA)</h2>
      <p>Automatically scales the number of Pod replicas based on observed CPU utilization or custom Prometheus metrics.</p>
      <div class="devops-code-block">
        <div class="devops-code-header">
          <span>yaml - HorizontalPodAutoscaler</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-code-pre">
<span style="color: #93c5fd;">apiVersion</span>: autoscaling/v2
<span style="color: #93c5fd;">kind</span>: HorizontalPodAutoscaler
<span style="color: #93c5fd;">metadata</span>:
  <span style="color: #93c5fd;">name</span>: web-app-hpa
<span style="color: #93c5fd;">spec</span>:
  <span style="color: #93c5fd;">scaleTargetRef</span>:
    <span style="color: #93c5fd;">apiVersion</span>: apps/v1
    <span style="color: #93c5fd;">kind</span>: Deployment
    <span style="color: #93c5fd;">name</span>: web-app-deployment
  <span style="color: #93c5fd;">minReplicas</span>: 2
  <span style="color: #93c5fd;">maxReplicas</span>: 10
  <span style="color: #93c5fd;">metrics</span>:
  - <span style="color: #93c5fd;">type</span>: Resource
    <span style="color: #93c5fd;">resource</span>:
      <span style="color: #93c5fd;">name</span>: cpu
      <span style="color: #93c5fd;">target</span>:
        <span style="color: #93c5fd;">type</span>: Utilization
        <span style="color: #93c5fd;">averageUtilization</span>: 75
        </pre>
      </div>

      <h2>3. Helm: The Package Manager for Kubernetes</h2>
      <p>Installing an enterprise production monitoring tool like Prometheus would require writing 30+ separate YAML manifests (Deployments, ConfigMaps, Secrets, RBAC, Services). <strong>Helm</strong> packages these into reusable <strong>Charts</strong>.</p>
      <div class="devops-terminal-block">
        <pre class="devops-terminal-content">
# Add the official bitnami repository and install PostgreSQL with one command!
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm install my-postgres bitnami/postgresql --set auth.postgresPassword=secret123
        </pre>
      </div>
    `
  },

  // =========================================================================
  // CATEGORY 5: LINUX & SHELL SCRIPTING
  // =========================================================================
  {
    id: "linux-fundamentals-filesystem",
    title: "Linux Fundamentals: Kernel, Shell & File System Hierarchy",
    category: "Linux & Scripting",
    categoryNumber: 5,
    difficulty: "Beginner",
    readTime: "12 min",
    summary: "Master the operating system powering 95%+ of all production cloud servers: Linux architecture, the terminal shell, and the standard root directory hierarchy.",
    content: `
      <h2>1. Why Linux Powers the Entire Internet</h2>
      <p>Over 95% of public cloud workloads run on Linux. It is open source, extraordinarily stable (servers regularly run for years without rebooting), consumes minimal hardware resources, and offers full command-line automation.</p>

      <h2>2. Linux Architecture: Hardware, Kernel & Shell</h2>
      <ul>
        <li><strong>Hardware:</strong> Physical CPU, RAM, NVMe disks, and network interfaces.</li>
        <li><strong>Kernel:</strong> The core program at the heart of Linux. Manages memory allocation, hardware drivers, CPU scheduling, and process execution.</li>
        <li><strong>Shell:</strong> The command language interpreter (e.g. <code>bash</code>, <code>zsh</code>) that accepts commands typed by a human engineer or automated script and instructs the kernel to execute them.</li>
        <li><strong>User Space / Utilities:</strong> Programs like <code>ls</code>, <code>grep</code>, <code>systemd</code>, and your web applications.</li>
      </ul>

      <h2>3. The Linux File System Hierarchy Explained</h2>
      <p>In Windows, you have separate drive letters (<code>C:\\</code>, <code>D:\\</code>). In Linux, <strong>everything is a file</strong>, and all files and disks branch from a single root directory: <code>/</code>.</p>
      <div class="devops-table-wrapper">
        <table class="devops-concept-table">
          <thead>
            <tr><th>Directory</th><th>Name</th><th>What Lives Here</th></tr>
          </thead>
          <tbody>
            <tr><td><code>/bin</code> & <code>/usr/bin</code></td><td>Binaries</td><td>Essential executable commands (<code>ls</code>, <code>cp</code>, <code>cat</code>, <code>python</code>)</td></tr>
            <tr><td><code>/etc</code></td><td>Editable Text Configs</td><td>System configuration files (Nginx configs, SSH keys, passwords)</td></tr>
            <tr><td><code>/var</code></td><td>Variable Data</td><td>Frequently changing data: application logs (<code>/var/log</code>), databases</td></tr>
            <tr><td><code>/home</code></td><td>Home Folders</td><td>Personal user workspaces (e.g. <code>/home/ubuntu</code>)</td></tr>
            <tr><td><code>/root</code></td><td>Root Home</td><td>Home directory for the supreme administrative user (root)</td></tr>
            <tr><td><code>/tmp</code></td><td>Temporary</td><td>Temporary files wiped on system reboot</td></tr>
            <tr><td><code>/dev</code></td><td>Devices</td><td>Hardware device representations (hard disks: <code>/dev/sda</code>)</td></tr>
            <tr><td><code>/proc</code> & <code>/sys</code></td><td>Virtual Filesystems</td><td>Live kernel information (CPU info, running process memory)</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  {
    id: "linux-commands-library",
    title: "Linux Commands Library: Files, Processes, Networking & System",
    category: "Linux & Scripting",
    categoryNumber: 5,
    difficulty: "Beginner",
    readTime: "15 min",
    summary: "Essential Linux commands organized by category: file operations, grep & text processing, systemd services, networking tools, and performance monitors.",
    content: `
      <h2>1. File & Directory Navigation</h2>
      <div class="devops-terminal-block">
        <div class="devops-terminal-header">
          <span style="font-size: 0.75rem; color: #94a3b8;">bash - Navigation & Files</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-terminal-content">
$ pwd                     # Print working directory
/home/ubuntu

$ ls -la                  # List all files including hidden with permissions & size
drwxr-xr-x 4 ubuntu ubuntu 4096 Nov 09 10:00 .
-rw-r--r-- 1 ubuntu ubuntu  220 Jan 01  2026 .bashrc
drwxr-xr-x 2 ubuntu ubuntu 4096 Nov 09 10:05 my_project

$ mkdir -p app/src        # Create nested directory tree
$ touch app/src/main.py   # Create empty file
$ cp -r app/ backup/      # Recursively copy directory
$ rm -rf old_folder       # Forcefully delete directory without prompting
        </pre>
      </div>

      <h2>2. Powerful Text Processing: grep, awk, sed & tail</h2>
      <div class="devops-terminal-block">
        <div class="devops-terminal-header">
          <span style="font-size: 0.75rem; color: #94a3b8;">bash - Log Inspection</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard('grep \"ERROR\" /var/log/nginx/error.log\ntail -f /var/log/syslog\nawk \'{print $1, $9}\' /var/log/nginx/access.log | head -n 10')">Copy</button>
        </div>
        <pre class="devops-terminal-content">
# 1. Search for errors in logs case-insensitively with line numbers
$ grep -in "error" /var/log/nginx/error.log

# 2. Follow live log updates in real time
$ tail -f /var/log/nginx/access.log

# 3. Print only Client IP ($1) and HTTP Status Code ($9) using awk
$ awk '{print $1, $9}' /var/log/nginx/access.log | head -n 5
192.168.1.50 200
192.168.1.52 404
10.0.1.20 200
        </pre>
      </div>

      <h2>3. Process & System Monitoring: top, htop, free, df</h2>
      <ul>
        <li><code>top</code> / <code>htop</code>: Interactive task manager displaying live CPU and RAM consumption per process.</li>
        <li><code>free -h</code>: Shows free and used RAM in human-readable gigabytes.</li>
        <li><code>df -h</code>: Shows disk space usage across all mounted disk partitions.</li>
        <li><code>kill -9 &lt;PID&gt;</code>: Forcefully terminates an unresponsive process.</li>
      </ul>
    `
  },

  {
    id: "linux-advanced-bash-scripting",
    title: "Advanced Linux: Permissions, SSH Keys, Systemd & Bash Scripting",
    category: "Linux & Scripting",
    categoryNumber: 5,
    difficulty: "Intermediate",
    readTime: "15 min",
    summary: "Automate system tasks with Bash scripts, manage octal permissions (chmod 755), configure passwordless SSH keys, and run background services with systemd.",
    content: `
      <h2>1. Understanding Linux File Permissions (chmod 755 vs 600)</h2>
      <p>Every file has 3 permission categories: <strong>Owner (u)</strong>, <strong>Group (g)</strong>, and <strong>Others (o)</strong>. Each category has 3 rights:</p>
      <ul>
        <li><strong>Read (r):</strong> Value 4</li>
        <li><strong>Write (w):</strong> Value 2</li>
        <li><strong>Execute (x):</strong> Value 1</li>
      </ul>
      <p>Adding them up creates the 3-digit octal permission:</p>
      <div class="devops-card-tip">
        <strong>Common Permission Codes:</strong><br>
        - <code>chmod 755 script.sh</code> &rarr; Owner: 7 (rwx), Group: 5 (r-x), Others: 5 (r-x). Standard for executable scripts.<br>
        - <code>chmod 600 id_rsa</code> &rarr; Owner: 6 (rw-), Group: 0, Others: 0. Mandatory for private SSH keys so others cannot read your credentials.<br>
        - <code>chmod 644 file.txt</code> &rarr; Owner: 6 (rw-), Group: 4 (r--), Others: 4 (r--). Standard readable files.
      </div>

      <h2>2. Production Bash Script Example: Automated Database Backup & S3 Upload</h2>
      <div class="devops-code-block">
        <div class="devops-code-header">
          <span>bash - backup_database.sh</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-code-pre">
<span style="color: #6ee7b7;">#!/bin/bash</span>
<span style="color: #94a3b8;"># Exit immediately if a command exits with a non-zero status</span>
<span style="color: #f43f5e;">set</span> -euo pipefail

TIMESTAMP=$(date +<span style="color: #86efac;">"%Y%m%d_%H%M%S"</span>)
BACKUP_DIR=<span style="color: #86efac;">"/tmp/db_backups"</span>
BACKUP_FILE=<span style="color: #86efac;">"$BACKUP_DIR/db_backup_$TIMESTAMP.sql.gz"</span>
S3_BUCKET=<span style="color: #86efac;">"s3://my-production-backups"</span>

mkdir -p <span style="color: #86efac;">"$BACKUP_DIR"</span>
echo <span style="color: #86efac;">"Starting PostgreSQL backup..."</span>
pg_dump -U postgres app_db | gzip &gt; <span style="color: #86efac;">"$BACKUP_FILE"</span>

echo <span style="color: #86efac;">"Uploading to Amazon S3..."</span>
aws s3 cp <span style="color: #86efac;">"$BACKUP_FILE"</span> <span style="color: #86efac;">"$S3_BUCKET/"</span>

<span style="color: #94a3b8;"># Clean up temporary local file</span>
rm -f <span style="color: #86efac;">"$BACKUP_FILE"</span>
echo <span style="color: #86efac;">"Backup completed successfully!"</span>
        </pre>
      </div>

      <h2>3. Managing Long-Running Services with Systemd</h2>
      <p>How do production applications (like Django, FastAPI, Node.js) automatically restart if they crash or when the server reboots? With <strong>systemd</strong> unit files!</p>
      <div class="devops-code-block">
        <div class="devops-code-header">
          <span>ini - /etc/systemd/system/fastapi.service</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-code-pre">
[Unit]
Description=FastAPI Application Daemon
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/app
ExecStart=/home/ubuntu/app/venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
        </pre>
      </div>
    `
  },

  // =========================================================================
  // CATEGORY 6: CI/CD PIPELINES
  // =========================================================================
  {
    id: "cicd-fundamentals-strategies",
    title: "CI/CD Pipelines & Deployment Strategies (Rolling, Blue-Green, Canary)",
    category: "CI/CD & Automation",
    categoryNumber: 6,
    difficulty: "Beginner",
    readTime: "12 min",
    summary: "Continuous Integration vs Continuous Delivery vs Continuous Deployment, building automated testing pipelines, and mastering zero-downtime deployment strategies.",
    content: `
      <h2>1. What is CI/CD?</h2>
      <ul>
        <li><strong>Continuous Integration (CI):</strong> Developers frequently commit code changes to a shared Git branch. Every push triggers an automated build and test suite to detect bugs immediately.</li>
        <li><strong>Continuous Delivery (CD):</strong> Code changes that pass tests are automatically packaged and deployed to a staging environment, ready for manual one-click release to production.</li>
        <li><strong>Continuous Deployment:</strong> Every change that passes automated tests is deployed straight to production automatically with zero human intervention!</li>
      </ul>

      <h2>2. Modern Deployment Strategies</h2>
      
      <h3>1. Rolling Deployment</h3>
      <p>Gradually replaces old version instances with new version instances one by one behind a load balancer. Zero downtime, and requires no extra hardware capacity.</p>

      <h3>2. Blue-Green Deployment</h3>
      <p>Maintains two identical production environments: <strong>Blue (currently live v1)</strong> and <strong>Green (idle new v2)</strong>. You deploy v2 to Green and test it thoroughly. When ready, switch the load balancer router to point to Green in one second! If a critical bug is found, flip the router back to Blue instantly.</p>

      <h3>3. Canary Deployment</h3>
      <p>Routes a tiny percentage of live user traffic (e.g. 5%) to the new version while 95% remains on the old version. If error rates remain normal, you gradually increase traffic to 25%, 50%, and finally 100%.</p>

      <div class="devops-diagram-container">
        <div class="devops-diagram-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          Deployment Strategies Compared
        </div>
        <pre class="devops-code-pre" style="color: #38bdf8;">
+------------------------------------+       +------------------------------------+
|       BLUE-GREEN DEPLOYMENT        |       |         CANARY DEPLOYMENT          |
+------------------------------------+       +------------------------------------+
|  [Router / Load Balancer]          |       |  [Router / Load Balancer]          |
|       |                            |       |       |                      |     |
|       v (100% Traffic Switch)      |       |       v (95% Users)          v (5%)|
|  [BLUE: v1.0]   -->   [GREEN: v2.0]|       |  [Cluster v1.0]      [Canary v2.0] |
|  (Current Live)       (New Release)|       |  (Stable Release)    (Testing New) |
+------------------------------------+       +------------------------------------+
Instant 1-second rollback                    Low risk: Only 5% of users impacted
Requires 2x server infrastructure            Requires fine-grained traffic routing
        </pre>
      </div>
    `
  },

  // =========================================================================
  // CATEGORY 7: JENKINS
  // =========================================================================
  {
    id: "jenkins-mastery-pipelines",
    title: "Jenkins: Declarative Pipelines, Jenkinsfile & AWS EC2 Deployment",
    category: "CI/CD & Automation",
    categoryNumber: 7,
    difficulty: "Intermediate",
    readTime: "15 min",
    summary: "Master Jenkins: Controller and Agent architecture, writing Declarative Jenkinsfile pipelines line by line, building Docker images, and deploying to AWS EC2.",
    content: `
      <h2>1. What is Jenkins & Its Architecture</h2>
      <p><strong>Jenkins</strong> is the venerable open-source automation server that established the CI/CD revolution. It uses a <strong>Controller-Agent</strong> architecture:</p>
      <ul>
        <li><strong>Jenkins Controller:</strong> Schedules jobs, serves the web dashboard, manages plugins and credentials.</li>
        <li><strong>Jenkins Agents (Build Executors):</strong> Dedicated virtual machines or Docker containers that execute the actual compiling, testing, and Docker builds so the controller never gets overloaded.</li>
      </ul>

      <h2>2. Production Declarative Jenkinsfile (Line by Line)</h2>
      <div class="devops-code-block">
        <div class="devops-code-header">
          <span>groovy - Jenkinsfile (Declarative Pipeline)</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-code-pre">
<span style="color: #f43f5e;">pipeline</span> {
    <span style="color: #93c5fd;">agent</span> any
    
    <span style="color: #93c5fd;">environment</span> {
        DOCKER_HUB = credentials(<span style="color: #86efac;">'docker-hub-credentials'</span>)
        IMAGE_NAME = <span style="color: #86efac;">'myusername/mlforge-app'</span>
    }
    
    <span style="color: #93c5fd;">stages</span> {
        <span style="color: #f43f5e;">stage</span>(<span style="color: #86efac;">'Code Checkout'</span>) {
            <span style="color: #93c5fd;">steps</span> {
                checkout scm
            }
        }
        
        <span style="color: #f43f5e;">stage</span>(<span style="color: #86efac;">'Run Unit Tests'</span>) {
            <span style="color: #93c5fd;">steps</span> {
                sh <span style="color: #86efac;">'pip install -r requirements.txt'</span>
                sh <span style="color: #86efac;">'pytest tests/'</span>
            }
        }
        
        <span style="color: #f43f5e;">stage</span>(<span style="color: #86efac;">'Build Docker Image'</span>) {
            <span style="color: #93c5fd;">steps</span> {
                sh <span style="color: #86efac;">"docker build -t \${IMAGE_NAME}:\${BUILD_NUMBER} ."</span>
            }
        }
        
        <span style="color: #f43f5e;">stage</span>(<span style="color: #86efac;">'Publish to Docker Hub'</span>) {
            <span style="color: #93c5fd;">steps</span> {
                sh <span style="color: #86efac;">'echo $DOCKER_HUB_PSW | docker login -u $DOCKER_HUB_USR --password-stdin'</span>
                sh <span style="color: #86efac;">"docker push \${IMAGE_NAME}:\${BUILD_NUMBER}"</span>
            }
        }
    }
    
    <span style="color: #93c5fd;">post</span> {
        <span style="color: #f43f5e;">always</span> {
            sh <span style="color: #86efac;">'docker logout'</span>
        }
        <span style="color: #f43f5e;">failure</span> {
            echo <span style="color: #86efac;">'Pipeline failed! Sending notification...'</span>
        }
    }
}
        </pre>
      </div>
    `
  },

  // =========================================================================
  // CATEGORY 8: GITHUB ACTIONS
  // =========================================================================
  {
    id: "github-actions-mastery",
    title: "GitHub Actions: Workflows, YAML, Secrets & Jenkins vs Actions",
    category: "CI/CD & Automation",
    categoryNumber: 8,
    difficulty: "Intermediate",
    readTime: "15 min",
    summary: "Complete guide to GitHub Actions: workflows, events, matrix builds, secrets, automated testing, building Docker images, and an in-depth comparison of Jenkins vs GitHub Actions.",
    content: `
      <h2>1. What is GitHub Actions?</h2>
      <p><strong>GitHub Actions</strong> is GitHub's built-in CI/CD and automation platform. It allows you to run automated workflows directly inside your GitHub repository without installing, hosting, or maintaining a dedicated Jenkins server.</p>

      <h2>2. Production CI/CD Workflow YAML File</h2>
      <div class="devops-code-block">
        <div class="devops-code-header">
          <span>yaml - .github/workflows/ci.yml</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-code-pre">
<span style="color: #93c5fd;">name</span>: CI/CD Pipeline

<span style="color: #93c5fd;">on</span>:
  <span style="color: #93c5fd;">push</span>:
    <span style="color: #93c5fd;">branches</span>: [ main ]
  <span style="color: #93c5fd;">pull_request</span>:
    <span style="color: #93c5fd;">branches</span>: [ main ]

<span style="color: #93c5fd;">jobs</span>:
  <span style="color: #93c5fd;">test</span>:
    <span style="color: #93c5fd;">runs-on</span>: ubuntu-latest
    <span style="color: #93c5fd;">steps</span>:
    - <span style="color: #93c5fd;">name</span>: Checkout code
      <span style="color: #93c5fd;">uses</span>: actions/checkout@v4

    - <span style="color: #93c5fd;">name</span>: Set up Python 3.11
      <span style="color: #93c5fd;">uses</span>: actions/setup-python@v5
      <span style="color: #93c5fd;">with</span>:
        <span style="color: #93c5fd;">python-version</span>: <span style="color: #86efac;">"3.11"</span>

    - <span style="color: #93c5fd;">name</span>: Cache dependencies
      <span style="color: #93c5fd;">uses</span>: actions/cache@v3
      <span style="color: #93c5fd;">with</span>:
        <span style="color: #93c5fd;">path</span>: ~/.cache/pip
        <span style="color: #93c5fd;">key</span>: \${{ runner.os }}-pip-\${{ hashFiles('**/requirements.txt') }}

    - <span style="color: #93c5fd;">name</span>: Install dependencies
      <span style="color: #93c5fd;">run</span>: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt

    - <span style="color: #93c5fd;">name</span>: Run unit tests
      <span style="color: #93c5fd;">run</span>: pytest --cov=app tests/
        </pre>
      </div>

      <h2>3. Industry Comparison: Jenkins vs GitHub Actions</h2>
      <div class="devops-table-wrapper">
        <table class="devops-concept-table">
          <thead>
            <tr><th>Feature</th><th>Jenkins</th><th>GitHub Actions</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Hosting</strong></td><td>Self-hosted (You maintain the server, security patches & plugins)</td><td>Cloud-hosted by GitHub (Zero infrastructure maintenance)</td></tr>
            <tr><td><strong>Setup Time</strong></td><td>Hours to days</td><td>Minutes (Just commit a <code>.github/workflows/*.yml</code> file)</td></tr>
            <tr><td><strong>Marketplace</strong></td><td>Community plugins (often suffer from version conflicts)</td><td>GitHub Marketplace (Pre-built verified actions)</td></tr>
            <tr><td><strong>Best When</strong></td><td>Legacy corporate on-premise data centers, complex air-gapped security</td><td>Modern cloud-native startups, open-source projects, fast teams</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // =========================================================================
  // CATEGORY 9: NGINX & WEB SERVERS
  // =========================================================================
  {
    id: "nginx-webservers-reverse-proxy",
    title: "Nginx: Reverse Proxy, Load Balancing, Gzip & SSL Configuration",
    category: "Web Servers",
    categoryNumber: 9,
    difficulty: "Intermediate",
    readTime: "14 min",
    summary: "Master Nginx: Forward vs Reverse Proxy, serving static files, SSL/TLS certificates with Let's Encrypt, rate limiting, and production proxy configs for Django and FastAPI.",
    content: `
      <h2>1. What is Nginx & Why Do We Need a Reverse Proxy?</h2>
      <p>Python web frameworks like Django and FastAPI have built-in web servers (like Uvicorn or Gunicorn). However, you should <strong>never expose them directly to the public Internet</strong>. They are not optimized for handling slow network connections, serving static images, or terminating SSL encryption.</p>
      <p><strong>Nginx</strong> is a high-performance HTTP web server and <strong>Reverse Proxy</strong> that sits in front of your Python application. It handles incoming HTTPS requests, compresses responses with Gzip, serves static CSS/JS files instantly from disk cache, and forwards API calls to your Python backend.</p>

      <h2>2. Production Nginx Configuration (Line by Line)</h2>
      <div class="devops-code-block">
        <div class="devops-code-header">
          <span>nginx - /etc/nginx/sites-available/mlforge.conf</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-code-pre">
<span style="color: #93c5fd;">upstream</span> backend_app {
    server 127.0.0.1:8000;
}

<span style="color: #94a3b8;"># Redirect all HTTP traffic to HTTPS</span>
<span style="color: #f43f5e;">server</span> {
    listen 80;
    server_name api.mlforge.com;
    return 301 https://$host$request_uri;
}

<span style="color: #94a3b8;"># Secure HTTPS Server Block</span>
<span style="color: #f43f5e;">server</span> {
    listen 443 ssl http2;
    server_name api.mlforge.com;

    <span style="color: #94a3b8;"># SSL Certificates managed by Certbot</span>
    ssl_certificate /etc/letsencrypt/live/api.mlforge.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.mlforge.com/privkey.pem;

    <span style="color: #94a3b8;"># Serve static files directly from disk without touching Python</span>
    location /static/ {
        alias /home/ubuntu/app/static/;
        expires 30d;
    }

    <span style="color: #94a3b8;"># Reverse proxy all API requests to Uvicorn / Gunicorn</span>
    location / {
        proxy_pass http://backend_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
        </pre>
      </div>
    `
  },

  // =========================================================================
  // CATEGORY 10: DEPLOYMENT & HOSTING
  // =========================================================================
  {
    id: "deployment-hosting-platforms",
    title: "Deployment & Hosting Platforms: Vercel, Netlify, Render, Railway & AWS",
    category: "Deployment & Hosting",
    categoryNumber: 10,
    difficulty: "Intermediate",
    readTime: "14 min",
    summary: "Compare modern deployment platforms: frontend hosting (Vercel, Netlify, Cloudflare Pages), PaaS containers (Render, Railway), and enterprise cloud (AWS).",
    content: `
      <h2>1. Where Should You Host Your Application?</h2>
      <p>Choosing the right hosting platform depends on your stack, budget, and traffic:</p>

      <div class="devops-table-wrapper">
        <table class="devops-concept-table">
          <thead>
            <tr><th>Platform</th><th>Best For</th><th>Pricing</th><th>Key Strength</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Vercel / Netlify</strong></td><td>Frontend frameworks (React, Next.js, Vue)</td><td>Generous free tier</td><td>Instant Git deployments, Edge CDN, preview URLs for every pull request</td></tr>
            <tr><td><strong>Render / Railway</strong></td><td>Backend APIs (Django, FastAPI, Node) + Postgres</td><td>Free trial / \$5-15/mo</td><td>Zero DevOps setup: auto-detects Dockerfile, managed PostgreSQL</td></tr>
            <tr><td><strong>DigitalOcean</strong></td><td>Small to medium production servers</td><td>From \$4/mo</td><td>Simple predictable pricing, straightforward Droplets</td></tr>
            <tr><td><strong>AWS (EC2, ECS, EKS)</strong></td><td>Enterprise, scalable, microservices</td><td>Pay-per-second</td><td>Infinite scalability, 200+ specialized services, global footprint</td></tr>
          </tbody>
        </table>
      </div>

      <h2>2. Development vs Production Checklist</h2>
      <ul>
        <li><strong>Debug Mode:</strong> Set <code>DEBUG = False</code> in production. Leaving debug on exposes secret database credentials and stack traces to attackers.</li>
        <li><strong>Environment Variables:</strong> Never hardcode secrets. Inject them via your hosting platform's dashboard or AWS Secrets Manager.</li>
        <li><strong>Database Backups:</strong> Enable automated daily snapshots and test restoring from a backup at least once a quarter.</li>
        <li><strong>HTTPS Everywhere:</strong> Ensure all HTTP traffic redirects to HTTPS using valid TLS certificates (Let's Encrypt / AWS Certificate Manager).</li>
      </ul>
    `
  },

  // =========================================================================
  // CATEGORY 11: INFRASTRUCTURE AS CODE (IAC)
  // =========================================================================
  {
    id: "terraform-infrastructure-as-code",
    title: "Terraform & IaC: Providers, Resources, State & Best Practices",
    category: "Infrastructure as Code",
    categoryNumber: 11,
    difficulty: "Advanced",
    readTime: "16 min",
    summary: "Master HashiCorp Terraform: why clicking in the AWS web console is dangerous, declarative HCL syntax, managing state files, and provisioning EC2, S3, and VPCs.",
    content: `
      <h2>1. What is Infrastructure as Code (IaC)?</h2>
      <p>Before IaC, engineers logged into the AWS web console and manually clicked buttons to launch servers, create subnets, and configure firewalls. This <strong>manual approach leads to configuration drift</strong>, cannot be reviewed in code pull requests, and cannot be duplicated easily across development, staging, and production.</p>
      <p><strong>Infrastructure as Code (IaC)</strong> treats your servers, networks, and databases as software code written in declarative configuration files (like Terraform's HashiCorp Configuration Language - HCL). You can version control your infrastructure in Git, review changes in Pull Requests, and reproduce entire multi-region cloud environments in minutes!</p>

      <h2>2. Terraform Workflow: The 4 Golden Commands</h2>
      <ol>
        <li><code>terraform init</code>: Downloads required cloud provider plugins (e.g. AWS Provider).</li>
        <li><code>terraform plan</code>: Compares your code against live cloud infrastructure and generates an execution plan showing exactly what will be added, modified, or destroyed.</li>
        <li><code>terraform apply</code>: Executes the changes in the cloud.</li>
        <li><code>terraform destroy</code>: Deletes all provisioned infrastructure to stop billing.</li>
      </ol>

      <h2>3. Complete Terraform Example: Provisioning AWS S3 & EC2</h2>
      <div class="devops-code-block">
        <div class="devops-code-header">
          <span>hcl - main.tf</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-code-pre">
<span style="color: #f43f5e;">terraform</span> {
  required_providers {
    aws = {
      source  = <span style="color: #86efac;">"hashicorp/aws"</span>
      version = <span style="color: #86efac;">"~&gt; 5.0"</span>
    }
  }
}

<span style="color: #f43f5e;">provider</span> <span style="color: #86efac;">"aws"</span> {
  region = <span style="color: #86efac;">"us-east-1"</span>
}

<span style="color: #94a3b8;"># Create an S3 Bucket</span>
<span style="color: #f43f5e;">resource</span> <span style="color: #86efac;">"aws_s3_bucket"</span> <span style="color: #86efac;">"app_bucket"</span> {
  bucket = <span style="color: #86efac;">"mlforge-prod-assets-2026"</span>
  
  tags = {
    Environment = <span style="color: #86efac;">"Production"</span>
    ManagedBy   = <span style="color: #86efac;">"Terraform"</span>
  }
}

<span style="color: #94a3b8;"># Launch an EC2 Web Server</span>
<span style="color: #f43f5e;">resource</span> <span style="color: #86efac;">"aws_instance"</span> <span style="color: #86efac;">"web_server"</span> {
  ami           = <span style="color: #86efac;">"ami-0c7217cdde317cfec"</span> <span style="color: #94a3b8;"># Ubuntu 22.04 LTS</span>
  instance_type = <span style="color: #86efac;">"t3.micro"</span>

  tags = {
    Name = <span style="color: #86efac;">"MLForge-WebServer"</span>
  }
}
        </pre>
      </div>

      <h2>4. The Crucial Role of Terraform State (terraform.tfstate)</h2>
      <p>Terraform keeps track of all created cloud resources in a state file. In team production environments, <strong>never commit <code>terraform.tfstate</code> to Git!</strong> Store remote state in an encrypted Amazon S3 bucket with <strong>DynamoDB state locking</strong> so two engineers cannot apply changes simultaneously and corrupt the state.</p>
    `
  },

  // =========================================================================
  // CATEGORY 12: MONITORING, LOGGING & OBSERVABILITY
  // =========================================================================
  {
    id: "monitoring-logging-observability",
    title: "Monitoring & Observability: Metrics, Logs, Traces, Prometheus & Grafana",
    category: "Monitoring & Observability",
    categoryNumber: 12,
    difficulty: "Intermediate",
    readTime: "14 min",
    summary: "The 3 pillars of observability: Metrics vs Logs vs Traces, setting up Prometheus metric scraping, visualizing live dashboards with Grafana, and SLI/SLO/SLA definitions.",
    content: `
      <h2>1. The 3 Pillars of Observability</h2>
      <ul>
        <li><strong>Metrics (Numeric aggregations over time):</strong> CPU usage is 85%, HTTP request rate is 450 req/sec, P99 latency is 180ms. Cheap to store, perfect for real-time alerting.</li>
        <li><strong>Logs (Discrete timestamped text events):</strong> <em>"User 42 failed password login at 10:14:02 AM"</em>. Crucial for debugging exact root causes and forensic auditing.</li>
        <li><strong>Traces (End-to-end request journeys):</strong> Tracks a single user request as it travels across 5 microservices (Frontend &rarr; Auth API &rarr; Order Service &rarr; Payment Gateway &rarr; Database) to reveal exactly which microservice caused a 2-second bottleneck.</li>
      </ul>

      <h2>2. Prometheus & Grafana Architecture</h2>
      <p><strong>Prometheus</strong> pulls (scrapes) numerical metrics from your application endpoints (e.g. <code>http://app:8000/metrics</code>) at regular intervals (e.g. every 15s) and stores them in a high-performance time-series database. <strong>Grafana</strong> connects to Prometheus to render interactive, beautiful charts and dashboards.</p>

      <div class="devops-diagram-container">
        <div class="devops-diagram-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          Prometheus & Grafana Observability Flow
        </div>
        <pre class="devops-code-pre" style="color: #38bdf8;">
[Web App / Node Exporter]  <-----(Scrapes :9100/metrics)-----+ [PROMETHEUS TSDB]
[PostgreSQL Exporter    ]  <-----(Every 15 seconds)----------+       |
                                                                     | PromQL Queries
                                                                     v
                                                            [GRAFANA DASHBOARD]
                                                            (Visual Graphs & Alerts)
        </pre>
      </div>

      <h2>3. Understanding SLI, SLO & SLA</h2>
      <div class="devops-card-callout">
        - <strong>SLI (Service Level Indicator):</strong> The actual metric measured in production. (e.g. <em>"99.95% of HTTP requests returned status 200 in under 200ms this month."</em>)<br><br>
        - <strong>SLO (Service Level Objective):</strong> The internal target your engineering team sets. (e.g. <em>"Our goal is 99.9% uptime."</em>)<br><br>
        - <strong>SLA (Service Level Agreement):</strong> The legally binding contractual agreement with paying clients with financial penalties if breached. (e.g. <em>"If uptime drops below 99.0%, clients receive a 20% billing credit refund."</em>)
      </div>
    `
  },

  // =========================================================================
  // CATEGORY 13: DEVSECOPS & CLOUD SECURITY
  // =========================================================================
  {
    id: "devsecops-cloud-security",
    title: "DevSecOps: Shift-Left Security, SAST, DAST, Trivy & Secret Management",
    category: "DevSecOps & Security",
    categoryNumber: 13,
    difficulty: "Advanced",
    readTime: "14 min",
    summary: "Integrate automated security into CI/CD: Shift-Left philosophy, Static Analysis (SAST), Dynamic Testing (DAST), container scanning with Trivy, and HashiCorp Vault.",
    content: `
      <h2>1. What is DevSecOps? (Shift-Left Security)</h2>
      <p>Historically, software security was audited by a separate security team right before production release. If they found vulnerabilities, deployment was delayed by weeks. <strong>DevSecOps</strong> integrates automated security scanning into every step of the developer's CI/CD pipeline so vulnerabilities are caught early ("Shift-Left") before code ever merges to main.</p>

      <h2>2. The Core Application Security Scans</h2>
      <ul>
        <li><strong>SAST (Static Application Security Testing):</strong> Scans uncompiled source code for security flaws (e.g. SQL injections, hardcoded passwords, unsafe regex). Tools: <strong>SonarQube</strong>, <strong>Semgrep</strong>.</li>
        <li><strong>SCA (Software Composition Analysis):</strong> Scans third-party open source packages (e.g. <code>npm</code> or <code>pip</code> dependencies) against known Common Vulnerabilities and Exposures (CVE) databases. Tools: <strong>Snyk</strong>, <strong>OWASP Dependency-Check</strong>.</li>
        <li><strong>Container Vulnerability Scanning:</strong> Scans Docker base images and OS packages for known exploits. Tools: <strong>Trivy</strong>, <strong>Clair</strong>.</li>
        <li><strong>DAST (Dynamic Application Security Testing):</strong> Tests the running application from the outside like a hacker, probing URLs for XSS and authentication bypasses. Tools: <strong>OWASP ZAP</strong>.</li>
      </ul>

      <h2>3. Scanning a Docker Image with Trivy</h2>
      <div class="devops-terminal-block">
        <div class="devops-terminal-header">
          <span style="font-size: 0.75rem; color: #94a3b8;">bash - Trivy Container Scan</span>
          <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(this.parentElement.nextElementSibling.innerText)">Copy</button>
        </div>
        <pre class="devops-terminal-content">
$ trivy image --severity HIGH,CRITICAL my-app:latest
my-app:latest (debian 11.2)
===========================
Total: 2 (HIGH: 1, CRITICAL: 1)

+----------------+----------------+----------+-------------------+---------------+---------------------------------------+
|    LIBRARY     | VULNERABILITY  | SEVERITY | INSTALLED VERSION | FIXED VERSION |                 TITLE                 |
+----------------+----------------+----------+-------------------+---------------+---------------------------------------+
| libssl1.1      | CVE-2023-0286  | HIGH     | 1.1.1n-0+deb11u3  | 1.1.1n-0+deb11u4| openssl: X.400 address type confusion |
| zlib1g         | CVE-2022-37434 | CRITICAL | 1:1.2.11.dfsg-2   | 1:1.2.11.dfsg-2+deb11u2| zlib: heap-based buffer over-read  |
+----------------+----------------+----------+-------------------+---------------+---------------------------------------+
        </pre>
      </div>
    `
  },

  // =========================================================================
  // CATEGORY 14: DEVOPS TOOLS ECOSYSTEM
  // =========================================================================
  {
    id: "devops-tools-ecosystem",
    title: "DevOps Tools Ecosystem: Ansible, Artifacts, Registries & Build Tools",
    category: "DevOps Ecosystem",
    categoryNumber: 14,
    difficulty: "Beginner",
    readTime: "10 min",
    summary: "Industry reference guide: Configuration management (Ansible), build tools (Maven, npm, pip), artifact managers (Artifactory), container registries, and clouds.",
    content: `
      <h2>1. Configuration Management: Ansible vs Terraform</h2>
      <p>A common beginner confusion is: <em>"When do I use Terraform vs Ansible?"</em></p>
      <div class="devops-card-callout">
        <strong>Terraform is an Infrastructure Provisioner:</strong> It creates the cloud resources (VPCs, EC2 instances, S3 buckets, RDS databases).<br><br>
        <strong>Ansible is a Configuration Manager:</strong> Once the EC2 instance exists, Ansible connects via SSH without needing any client agent installed and installs software, writes configuration files, and restarts services.
      </div>

      <h2>2. Artifact Management & Container Registries</h2>
      <ul>
        <li><strong>Container Registries:</strong> Secure repositories that store and version compiled Docker images (<strong>Docker Hub</strong>, <strong>Amazon ECR</strong>, <strong>GitHub Container Registry - GHCR</strong>).</li>
        <li><strong>Artifact Repositories:</strong> Store compiled binaries, JAR files, and private package tarballs (<strong>JFrog Artifactory</strong>, <strong>Sonatype Nexus</strong>).</li>
      </ul>

      <h2>3. The Big Three Cloud Providers Compared</h2>
      <div class="devops-table-wrapper">
        <table class="devops-concept-table">
          <thead>
            <tr><th>Capability</th><th>Amazon Web Services (AWS)</th><th>Google Cloud Platform (GCP)</th><th>Microsoft Azure</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Market Leader</strong></td><td>Largest global market share (~31%)</td><td>Third place (~11%)</td><td>Second place (~25%)</td></tr>
            <tr><td><strong>Primary Strength</strong></td><td>Widest breadth of specialized services</td><td>Data analytics (BigQuery), AI/ML, Kubernetes</td><td>Enterprise Windows, Active Directory integration</td></tr>
            <tr><td><strong>Virtual Servers</strong></td><td>Amazon EC2</td><td>Google Compute Engine (GCE)</td><td>Azure Virtual Machines</td></tr>
            <tr><td><strong>Object Storage</strong></td><td>Amazon S3</td><td>Google Cloud Storage (GCS)</td><td>Azure Blob Storage</td></tr>
            <tr><td><strong>Managed Kubernetes</strong></td><td>Amazon EKS</td><td>Google Kubernetes Engine (GKE)</td><td>Azure Kubernetes Service (AKS)</td></tr>
          </tbody>
        </table>
      </div>
    `
  }
];
