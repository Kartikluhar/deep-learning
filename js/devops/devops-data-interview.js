/**
 * MLForge Cloud Computing & DevOps Interview Preparation Database
 * Comprehensive categorized Q&As with short answers, detailed explanations,
 * common candidate traps, scenario-based real company questions, and interactive MCQs.
 */

window.MLForge = window.MLForge || {};
window.MLForge.devops = window.MLForge.devops || {};
window.MLForge.devops.data = window.MLForge.devops.data || {};

MLForge.devops.data.interview = {
  questions: [
    // 1. Beginner Questions
    {
      category: "Beginner",
      question: "What is the difference between On-Premises and Cloud Computing?",
      shortAnswer: "On-premises requires buying, operating, and maintaining physical server hardware in your own building. Cloud computing is renting infrastructure on-demand over the Internet with pay-as-you-go pricing.",
      detailed: "On-premises requires massive upfront capital expenditure (CapEx), long lead times to order hardware (4-8 weeks), and dedicated staff to manage electricity, cooling, and hardware failures. Cloud computing converts CapEx into variable operating expenses (OpEx), enables spinning up servers in seconds, and provides near-infinite elastic scaling.",
      trap: "Do not say cloud is always cheaper. If an enterprise has steady, predictable 24/7 compute workloads for 10 years, owning bare metal can sometimes be cheaper than unoptimized cloud instances.",
      scenario: "A startup with unknown viral potential should choose Cloud Computing to scale easily and avoid bankruptcy if the app flops."
    },
    {
      category: "Beginner",
      question: "What is the difference between an Image and a Container in Docker?",
      shortAnswer: "An Image is a read-only blueprint (class); a Container is a live, running instance of that image (object).",
      detailed: "A Docker Image consists of stacked read-only filesystem layers containing the OS libraries, runtime, and code. When you run `docker run`, the Docker Engine adds a thin writable layer on top of the image to create an isolated running process called a Container.",
      trap: "Confusing images with containers. You cannot 'SSH' into an image; you can only execute commands inside a running container.",
      scenario: "You build one Docker image `my-api:v1.0` and deploy 5 identical containers of that image across 5 worker nodes behind a load balancer."
    },

    // 2. AWS Interview Questions
    {
      category: "AWS",
      question: "What is the difference between an AWS Region and an Availability Zone (AZ)?",
      shortAnswer: "A Region is a distinct geographic area around the world; an Availability Zone is one or more discrete, isolated data centers inside that Region.",
      detailed: "AWS Regions (e.g. us-east-1 in Virginia, eu-central-1 in Frankfurt) are completely isolated from one another. Each region contains multiple AZs (e.g. us-east-1a, us-east-1b, us-east-1c) located tens of miles apart to protect against local disasters (floods, power grid failure) while connected by ultra-low-latency private fiber.",
      trap: "Saying an AZ is just a single computer. An AZ is one or more full-sized, physically independent data centers.",
      scenario: "To achieve High Availability, you deploy web servers across at least 2 Availability Zones so if lightning strikes one data center, the other continues serving traffic seamlessly."
    },
    {
      category: "AWS",
      question: "What is the difference between Security Groups and Network ACLs (NACLs)?",
      shortAnswer: "Security Groups are stateful virtual firewalls at the instance level; NACLs are stateless firewalls at the subnet level.",
      detailed: "Security Groups evaluate traffic at the virtual network interface of an EC2 instance. They are stateful: if you allow inbound port 443, the outbound response is automatically allowed. NACLs evaluate traffic entering and leaving an entire subnet and are stateless (both inbound and outbound rules must be explicitly configured).",
      trap: "Trying to write a DENY rule in a Security Group. Security Groups only support ALLOW rules (everything else is implicitly denied). NACLs support both ALLOW and DENY.",
      scenario: "If an IP address is actively launching a DDoS attack against your web servers, block that specific IP immediately using a DENY rule in the subnet's Network ACL."
    },
    {
      category: "AWS",
      question: "Explain the AWS Shared Responsibility Model.",
      shortAnswer: "AWS is responsible for security OF the cloud; the customer is responsible for security IN the cloud.",
      detailed: "AWS manages the physical data centers, hardware, hypervisors, and network facilities. The customer manages guest operating system patches, application code, firewall configurations (Security Groups), database data, and IAM identity credentials.",
      trap: "Assuming AWS will back up your database or patch your EC2 Linux kernel automatically. In IaaS (EC2), that is 100% your responsibility.",
      scenario: "If an S3 bucket is left publicly writable and an attacker steals customer data, the fault lies with the customer's IAM misconfiguration, not AWS."
    },

    // 3. Docker Interview Questions
    {
      category: "Docker",
      question: "How do Docker Volumes differ from Bind Mounts?",
      shortAnswer: "Volumes are stored and managed entirely by Docker in /var/lib/docker/volumes; Bind Mounts map a specific, arbitrary folder from the host filesystem directly into the container.",
      detailed: "Volumes are portable, isolated from the host directory structure, managed via `docker volume` CLI, and support volume drivers for remote cloud storage. Bind Mounts rely on the host's directory structure and are typically used in local development for live hot-reloading.",
      trap: "Using Bind Mounts in production. Bind mounts can expose sensitive host system files and break container portability across different host OS environments.",
      scenario: "Use Docker Volumes for database persistence (e.g. PostgreSQL `pgdata`), and Bind Mounts for local development to sync code changes instantly."
    },
    {
      category: "Docker",
      question: "What is the difference between the CMD and ENTRYPOINT instructions in a Dockerfile?",
      shortAnswer: "ENTRYPOINT defines the core executable of the container; CMD provides default arguments that can easily be overridden from the command line.",
      detailed: "When both are used together, ENTRYPOINT is fixed, and CMD acts as the default parameters. For example: `ENTRYPOINT ['python', 'app.py']` and `CMD ['--port', '8000']`. Running `docker run my-image --port 9000` overrides CMD while preserving ENTRYPOINT.",
      trap: "Using the shell form `CMD command arg` instead of the exec JSON array format `CMD ['command', 'arg']`. The shell form runs `/bin/sh -c`, which prevents the process from receiving Unix SIGTERM signals.",
      scenario: "In CLI tools (like curl container), make `curl` the ENTRYPOINT so the user can simply type `docker run my-curl https://google.com`."
    },

    // 4. Kubernetes Interview Questions
    {
      category: "Kubernetes",
      question: "What happens when a Kubernetes Pod crashes? What component fixes it?",
      shortAnswer: "The Kubelet restarts container failures locally; if the whole node dies, the Controller Manager detects it and the Scheduler assigns a replacement Pod to a healthy node.",
      detailed: "If a container crashes, the Kubelet on that worker node observes the failure and restarts it based on the Pod's `restartPolicy`. If an entire worker node disconnects or dies, the `kube-controller-manager` notices the missing node heartbeat and instructs `kube-scheduler` to schedule new Pod replicas on surviving nodes.",
      trap: "Saying etcd restarts the pod. etcd is only a passive database; controllers perform the active reconciliation loop.",
      scenario: "A memory leak triggers an Out Of Memory (OOMKilled) error. Kubelet terminates the container and restarts it with exponential backoff."
    },
    {
      category: "Kubernetes",
      question: "What is the difference between a Deployment and a StatefulSet?",
      shortAnswer: "Deployments manage stateless pods with interchangeable random names; StatefulSets manage stateful pods with persistent unique identities and ordered lifecycles.",
      detailed: "Deployments treat Pods like cattle (ephemeral, any pod can be replaced by any other pod). StatefulSets treat Pods like pets (e.g., `mysql-0`, `mysql-1`). Each StatefulSet pod gets a persistent unique hostname, sticky network identity, and its own dedicated Persistent Volume that survives pod deletion.",
      trap: "Running a database cluster (PostgreSQL/Cassandra) inside a standard Deployment. Replicas would share or overwrite data volumes.",
      scenario: "Stateless web APIs use Deployments. Distributed databases with primary-replica architectures use StatefulSets."
    },

    // 5. Linux Interview Questions
    {
      category: "Linux",
      question: "What do the numbers mean in 'chmod 755' and 'chmod 600'?",
      shortAnswer: "They represent permissions for Owner, Group, and Others where Read=4, Write=2, Execute=1.",
      detailed: "7 = 4+2+1 (Read, Write, Execute). 5 = 4+0+1 (Read, Execute). 0 = No permissions. In 755: Owner has full rwx, Group has r-x, and Others have r-x. In 600: Owner has rw-, and everyone else has zero access.",
      trap: "Using `chmod 777` in production as a lazy fix for permission denied errors. This allows any user or compromised process to overwrite your executable scripts.",
      scenario: "SSH private key files (`id_rsa`) strictly require `chmod 600` or `chmod 400`. If group or others can read the file, SSH rejects the connection with a 'UNPROTECTED PRIVATE KEY FILE' warning."
    },

    // 6. CI/CD & GitHub Actions / Jenkins
    {
      category: "CI/CD",
      question: "What is the difference between Continuous Delivery and Continuous Deployment?",
      shortAnswer: "Continuous Delivery requires a human approval step to deploy to production; Continuous Deployment deploys every passing commit to production automatically.",
      detailed: "Both automate the build, test, and staging pipeline. In Continuous Delivery, artifacts are ready to ship at any moment, but a product manager or lead engineer clicks 'Approve Release'. In Continuous Deployment, if all automated unit, integration, and security tests pass, code goes live to production customers automatically within minutes.",
      trap: "Saying they are interchangeable terms. The key difference is the presence of a human approval gate.",
      scenario: "Healthcare and banking apps with regulatory compliance often enforce Continuous Delivery. SaaS startups deploy multiple times a day using Continuous Deployment."
    },
    {
      category: "CI/CD",
      question: "How do you securely handle API keys and passwords in GitHub Actions?",
      shortAnswer: "Store them in GitHub Encrypted Repository Secrets and reference them in YAML using ${{ secrets.SECRET_NAME }}.",
      detailed: "GitHub encrypts secrets with Libsodium public-key cryptography. They are masked with `***` in build console logs. Workflows access them as environment variables during execution without exposing them in commit history.",
      trap: "Echoing secrets in debug commands (e.g. `echo $API_KEY | base64`). Base64 encoding bypasses GitHub's automatic string masking and leaks credentials in logs.",
      scenario: "Store AWS credentials as `AWS_ACCESS_KEY_ID` in repo secrets, and inject them into the deployment job runner."
    },

    // 7. Scenario-Based Questions
    {
      category: "Scenario",
      question: "Scenario: A production web application suddenly reports 100% CPU usage and users get 504 Gateway Timeouts. How do you troubleshoot and fix it?",
      shortAnswer: "1) Check metrics/alarms, 2) SSH into server and run `htop`/`top`, 3) Inspect slow database queries and Nginx access logs, 4) Scale horizontally if it's organic traffic surge, or kill runaway process/restart service.",
      detailed: "First, inspect CloudWatch metrics and Application Load Balancer target response times to identify which nodes are impacted. Second, SSH into the instance and run `htop` to identify the culprit process (PID) and whether CPU is user-bound or I/O-wait. Third, inspect `/var/log/nginx/access.log` to check for malicious scraping or DDoS spikes. Fourth, if CPU is bound by runaway database queries, inspect `pg_stat_activity` in PostgreSQL. Fifth, increase Auto Scaling Group capacity while optimizing code.",
      trap: "Immediately rebooting the server without checking logs or capturing a stack dump, destroying the evidence needed to fix the root cause.",
      scenario: "A missing database index caused a table scan over 20,000,000 rows on every login request. Adding a composite B-tree index brought CPU back to 12% instantly."
    },
    {
      category: "Scenario",
      question: "Scenario: A CI/CD build passed all tests, but immediately after deploying to production, 80% of customer checkout requests fail. What is your immediate action?",
      shortAnswer: "Immediately initiate an automated rollback to the previous stable release, then investigate the bug in staging.",
      detailed: "Never attempt to 'fix forward' or debug complex code in production during an active outage. Roll back the deployment to the previous stable Git commit / Docker image tag immediately using Blue-Green switching or `kubectl rollout undo`. Once customer traffic is restored to 100% health, replicate the error in a staging environment with production-like data.",
      trap: "Trying to edit code directly on the production server via SSH to patch the bug.",
      scenario: "A database migration column name did not match the newly deployed code. Rolling back restored checkout functionality in 30 seconds."
    }
  ],

  // Multiple Choice Questions (MCQs)
  mcqs: [
    {
      id: "mcq-1",
      question: "Which AWS service provides serverless compute where you upload code and pay only for milliseconds of execution time?",
      options: ["Amazon EC2", "AWS Lambda", "AWS Elastic Beanstalk", "Amazon ECS"],
      answer: 1,
      explanation: "AWS Lambda is Amazon's Function as a Service (FaaS) offering that runs code in response to events without provisioning or managing virtual servers."
    },
    {
      id: "mcq-2",
      question: "In Docker, which instruction is executed during image build time to install software packages?",
      options: ["CMD", "RUN", "ENTRYPOINT", "ENV"],
      answer: 1,
      explanation: "RUN executes shell commands inside the build container and commits the result to a new image layer. CMD and ENTRYPOINT define commands executed when the container starts."
    },
    {
      id: "mcq-3",
      question: "Which Kubernetes component is a distributed, consistent key-value database acting as the single source of truth for the entire cluster?",
      options: ["kube-apiserver", "kubelet", "etcd", "kube-proxy"],
      answer: 2,
      explanation: "etcd is the distributed key-value store that holds all cluster states, configurations, secrets, and metadata."
    },
    {
      id: "mcq-4",
      question: "Which Linux command displays live CPU and memory utilization broken down by running processes in an interactive interface?",
      options: ["df -h", "htop", "free -m", "uname -r"],
      answer: 1,
      explanation: "`htop` (or `top`) provides an interactive, real-time view of running processes, CPU cores, memory meters, and process trees."
    },
    {
      id: "mcq-5",
      question: "What is the primary difference between a rolling deployment and a blue-green deployment?",
      options: [
        "Rolling deployment requires 2x infrastructure; blue-green does not",
        "Blue-green deployment maintains two full identical production environments; rolling gradually replaces instances",
        "Rolling deployment has higher downtime than blue-green",
        "Blue-green is only supported on Kubernetes"
      ],
      answer: 1,
      explanation: "Blue-green maintains two identical environments (Blue=Live, Green=Idle) allowing instant 1-second router cutover and rollback. Rolling gradually replaces instances in-place."
    }
  ]
};

