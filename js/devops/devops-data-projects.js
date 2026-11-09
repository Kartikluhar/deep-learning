/**
 * MLForge Practical Cloud Computing & DevOps Projects Database
 * 21 Industry-Level Hands-On Projects (5 Beginner, 8 Intermediate, 8 Advanced)
 * Complete with description, objectives, architecture, folder structure, configs,
 * testing steps, common errors, and real-world resume descriptions.
 */

window.MLForge = window.MLForge || {};
window.MLForge.devops = window.MLForge.devops || {};
window.MLForge.devops.data = window.MLForge.devops.data || {};

MLForge.devops.data.projects = [
  // =========================================================================
  // BEGINNER PROJECTS (1-5)
  // =========================================================================
  {
    id: "proj-docker-python-app",
    title: "1. Containerize a Python Application with Docker",
    tier: "Beginner",
    category: "Docker",
    time: "30 min",
    description: "Build an isolated, reproducible Docker image for a Python utility application with dependency caching and non-root security.",
    objectives: [
      "Write a multi-layer Dockerfile using python:3.11-slim",
      "Optimize build layer caching using pip and requirements.txt",
      "Implement a non-root Linux user for container security",
      "Mount local files into the container using bind mounts"
    ],
    tech: ["Docker", "Python 3.11", "Linux", "Docker Hub"],
    architecture: `Source Code -> Dockerfile -> Docker Build Engine -> Local Image -> Isolated Running Container`,
    folderStructure: `
python-docker-app/
├── app/
│   └── main.py
├── requirements.txt
├── .dockerignore
└── Dockerfile
    `,
    configs: [
      {
        filename: "Dockerfile",
        code: `FROM python:3.11-slim
WORKDIR /app
ENV PYTHONUNBUFFERED=1
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN adduser --disabled-password --gecos "" appuser
USER appuser
CMD ["python", "app/main.py"]`
      },
      {
        filename: ".dockerignore",
        code: `__pycache__
*.pyc
.git
.env
venv/`
      }
    ],
    commands: [
      "docker build -t python-runner:v1 .",
      "docker run --rm python-runner:v1"
    ],
    expectedOutput: "[INFO] Application started inside Docker! Processing batch tasks... Completed 100 items in 0.42s.",
    testing: "Run the container with `docker run --rm python-runner:v1`. Verify that `whoami` inside the container returns `appuser` (non-root).",
    resumeBullet: "Containerized Python microservices using Docker and Alpine/slim base images, cutting container startup times by 60% and enforcing non-root user execution principles."
  },

  {
    id: "proj-s3-static-website",
    title: "2. Host a Global Static Website Using AWS S3 & CloudFront",
    tier: "Beginner",
    category: "AWS Storage",
    time: "25 min",
    description: "Configure an Amazon S3 bucket for static website hosting and distribute it globally with sub-50ms latency using CloudFront CDN.",
    objectives: [
      "Create a globally unique S3 bucket with public website hosting enabled",
      "Attach an S3 Bucket Policy allowing anonymous read access to website assets",
      "Distribute the site across global Edge Locations with AWS CloudFront CDN",
      "Setup custom index.html and error.html fallback pages"
    ],
    tech: ["AWS S3", "AWS CloudFront", "HTML/CSS", "Route 53 DNS"],
    architecture: `Global End Users -> CloudFront Edge Locations (Cache) -> S3 Static Bucket (Origin)`,
    folderStructure: `
my-portfolio/
├── index.html
├── style.css
├── app.js
└── error.html
    `,
    configs: [
      {
        filename: "s3-bucket-policy.json",
        code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-portfolio-bucket-2026/*"
    }
  ]
}`
      }
    ],
    commands: [
      "aws s3 mb s3://my-portfolio-bucket-2026",
      "aws s3 website s3://my-portfolio-bucket-2026/ --index-document index.html --error-document error.html",
      "aws s3 sync . s3://my-portfolio-bucket-2026/ --acl public-read"
    ],
    expectedOutput: "upload: ./index.html to s3://my-portfolio-bucket-2026/index.html. Website endpoint: http://my-portfolio-bucket-2026.s3-website-us-east-1.amazonaws.com",
    testing: "Open the S3 website endpoint in your browser. Verify that page routing and CSS files load with HTTP status 200.",
    resumeBullet: "Engineered serverless static web hosting infrastructure using AWS S3 and CloudFront CDN, reducing hosting costs to under $0.50/month with 99.99% availability."
  },

  {
    id: "proj-ec2-launch-configure",
    title: "3. Launch & Harden an AWS EC2 Production Linux Server",
    tier: "Beginner",
    category: "AWS Compute",
    time: "35 min",
    description: "Launch an Ubuntu EC2 instance, configure Security Groups, setup SSH key authentication, enable Uncomplicated Firewall (UFW), and automate security updates.",
    objectives: [
      "Generate and protect an SSH RSA/ED25519 key pair with chmod 400",
      "Configure AWS VPC Security Groups restricting SSH access to your specific CIDR IP",
      "Bootstrap the instance with unattended security updates and fail2ban brute-force protection",
      "Install and configure an Nginx web server"
    ],
    tech: ["AWS EC2", "Ubuntu Linux", "SSH", "UFW Firewall", "fail2ban"],
    architecture: `Developer (SSH Key) -> Port 22 -> EC2 Instance (Security Group + UFW + Fail2Ban)`,
    folderStructure: `
ec2-setup/
├── bootstrap.sh
└── deploy_keys.sh
    `,
    configs: [
      {
        filename: "bootstrap.sh",
        code: `#!/bin/bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y ufw fail2ban nginx
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
echo "y" | sudo ufw enable
sudo systemctl enable fail2ban && sudo systemctl start fail2ban`
      }
    ],
    commands: [
      "chmod 400 my-ec2-key.pem",
      "ssh -i my-ec2-key.pem ubuntu@<EC2_PUBLIC_IP>",
      "bash bootstrap.sh"
    ],
    expectedOutput: "Status: active. Firewall is active and enabled on system startup. Fail2ban service is active (running).",
    testing: "Verify SSH connections from unauthorized IPs get blocked and Nginx answers HTTP on port 80.",
    resumeBullet: "Provisioned and hardened AWS EC2 cloud instances using Linux UFW firewalls, fail2ban intrusion prevention, and automated security patch management."
  },

  {
    id: "proj-deploy-react-app",
    title: "4. Deploy a React SPA with Vite to Vercel & Netlify",
    tier: "Beginner",
    category: "Hosting",
    time: "20 min",
    description: "Build and deploy a modern React single-page application with automated continuous deployment on GitHub pull requests and custom DNS domains.",
    objectives: [
      "Initialize and build a modern React app using Vite and TypeScript",
      "Connect repository to Vercel with preview deployment URLs",
      "Configure SPA client-side routing rewrites in vercel.json",
      "Set environment variables across Development, Preview, and Production"
    ],
    tech: ["React", "Vite", "Vercel", "GitHub Actions"],
    architecture: `Developer Push -> GitHub -> Vercel Build Server -> Global Anycast CDN`,
    folderStructure: `
react-vite-app/
├── src/
├── dist/
├── vercel.json
├── package.json
└── vite.config.js
    `,
    configs: [
      {
        filename: "vercel.json",
        code: `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`
      }
    ],
    commands: [
      "npm create vite@latest my-app -- --template react",
      "npm install && npm run build",
      "vercel --prod"
    ],
    expectedOutput: "Production: https://my-app-unique-id.vercel.app [copied to clipboard]",
    testing: "Navigate directly to a sub-route like `/profile` and refresh the browser; ensure no 404 error occurs.",
    resumeBullet: "Configured automated CI/CD deployment pipelines on Vercel for React SPAs, cutting release deployment cycles to under 60 seconds with 100% test coverage."
  },

  {
    id: "proj-linux-monitoring-script",
    title: "5. Automated Linux Health Monitoring & Alerting Script",
    tier: "Beginner",
    category: "Linux & Bash",
    time: "30 min",
    description: "Write a production Bash script that continuously audits CPU, RAM, disk space, and zombie processes, sending automated Discord/Slack webhook alerts on anomalies.",
    objectives: [
      "Parse `top`, `free -m`, and `df -h` metrics in Bash",
      "Implement threshold evaluations (>80% RAM or Disk triggers an alert)",
      "Send rich JSON payload alerts to a Discord or Slack webhook via `curl`",
      "Schedule script execution every 5 minutes using cron"
    ],
    tech: ["Bash", "Linux", "Cron", "cURL", "Slack Webhooks"],
    architecture: `Cron Job (*/5 * * * *) -> monitor.sh (Audits RAM/CPU/Disk) -> If >80% -> cURL -> Webhook Alert`,
    folderStructure: `
system-monitor/
├── monitor.sh
└── config.env
    `,
    configs: [
      {
        filename: "monitor.sh",
        code: `#!/bin/bash
set -euo pipefail

WEBHOOK_URL="https://discord.com/api/webhooks/your/webhook/url"
HOST=$(hostname)
CPU_LOAD=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'.' -f1)
MEM_USED_PCT=$(free | awk '/Mem:/ {printf("%.0f", $3/$2 * 100.0)}')
DISK_USED_PCT=$(df -h / | awk 'NR==2 {print $5}' | tr -d '%')

if [ "$MEM_USED_PCT" -gt 80 ] || [ "$DISK_USED_PCT" -gt 85 ]; then
  MESSAGE="⚠️ WARNING on $HOST: RAM at $MEM_USED_PCT% | Disk at $DISK_USED_PCT% | CPU at $CPU_LOAD%"
  curl -s -H "Content-Type: application/json" -X POST -d "{\"content\": \"$MESSAGE\"}" "$WEBHOOK_URL"
fi`
      }
    ],
    commands: [
      "chmod +x monitor.sh",
      "./monitor.sh",
      "(crontab -l 2>/dev/null; echo '*/5 * * * * /home/ubuntu/monitor.sh') | crontab -"
    ],
    expectedOutput: "Cron job installed: `crontab -l` confirms script executes every 5 minutes.",
    testing: "Simulate high memory using `stress-ng --vm 1 --vm-bytes 85% -t 60s` and observe the incoming webhook notification.",
    resumeBullet: "Developed automated Linux system observability Bash scripts with cron scheduling and webhook alerting, preventing server outages before user impact."
  },

  // =========================================================================
  // INTERMEDIATE PROJECTS (6-13)
  // =========================================================================
  {
    id: "proj-dockerize-django",
    title: "6. Production-Ready Dockerization of Django",
    tier: "Intermediate",
    category: "Docker",
    time: "45 min",
    description: "Build an enterprise-grade Docker container for Django with Gunicorn WSGI, automated static file collection, and health checks.",
    objectives: [
      "Create multi-stage Docker build separating development and production",
      "Configure Gunicorn with multiple worker processes based on vCPU counts",
      "Implement a Docker healthcheck probe testing the /health/ endpoint",
      "Run as an unprivileged appuser"
    ],
    tech: ["Django", "Docker", "Gunicorn", "Python 3.11"],
    architecture: `Dockerfile -> Python 3.11 Slim -> Gunicorn WSGI (Workers: 2*vCPU+1) -> Django App`,
    folderStructure: `
django-docker/
├── Dockerfile
├── entrypoint.sh
├── requirements.txt
└── myapp/
    `,
    configs: [
      {
        filename: "Dockerfile",
        code: `FROM python:3.11-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN adduser --disabled-password --gecos "" appuser && chown -R appuser:appuser /app
USER appuser
HEALTHCHECK --interval=15s --timeout=3s --retries=3 CMD curl -f http://localhost:8000/health/ || exit 1
EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "myapp.wsgi:application"]`
      }
    ],
    commands: [
      "docker build -t django-prod:latest .",
      "docker run -d -p 8000:8000 --name django-app django-prod:latest"
    ],
    expectedOutput: "[INFO] Listening at: http://0.0.0.0:8000 (PID 1). Worker spawned (PID 7).",
    testing: "Run `docker inspect --format='{{json .State.Health.Status}}' django-app` and verify it reports 'healthy'.",
    resumeBullet: "Engineered production Docker containers for Django enterprise applications, reducing image sizes by 65% through multi-stage caching and security hardening."
  },

  {
    id: "proj-dockerize-fastapi",
    title: "7. High-Performance Containerization of FastAPI",
    tier: "Intermediate",
    category: "Docker",
    time: "40 min",
    description: "Containerize a modern async FastAPI application using Uvicorn workers and Pydantic validation for high-concurrency microservices.",
    objectives: [
      "Configure asynchronous Uvicorn workers with standard uvloop extensions",
      "Implement multi-stage building to strip compilation dependencies",
      "Configure Docker volume mounts for hot-reloading in development"
    ],
    tech: ["FastAPI", "Uvicorn", "Docker", "AsyncIO"],
    architecture: `Docker Host -> Uvicorn ASGI Server (uvloop) -> FastAPI Async Routes`,
    folderStructure: `
fastapi-docker/
├── Dockerfile
├── requirements.txt
└── main.py
    `,
    configs: [
      {
        filename: "Dockerfile",
        code: `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]`
      }
    ],
    commands: [
      "docker build -t fastapi-app:v1 .",
      "docker run -d -p 8000:8000 fastapi-app:v1"
    ],
    expectedOutput: "INFO: Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)",
    testing: "Send 1,000 requests using Apache Bench `ab -n 1000 -c 50 http://localhost:8000/docs` and observe zero failed requests.",
    resumeBullet: "Containerized high-throughput asynchronous FastAPI microservices with Uvicorn uvloop, supporting 4,500+ requests per second under container resource constraints."
  },

  {
    id: "proj-django-postgres-compose",
    title: "8. Full-Stack Django + PostgreSQL with Docker Compose",
    tier: "Intermediate",
    category: "Docker Compose",
    time: "45 min",
    description: "Launch an isolated multi-container stack with Django, PostgreSQL 15, named persistent volumes, and health check dependency coordination.",
    objectives: [
      "Define services, networks, and named volumes in docker-compose.yml",
      "Use `depends_on` with `condition: service_healthy` to wait for PostgreSQL before starting Django",
      "Ensure persistent database state across container destroy cycles"
    ],
    tech: ["Docker Compose", "Django", "PostgreSQL", "Linux"],
    architecture: `Client (:8000) -> Django Container -> Internal Docker Network -> Postgres Container (:5432)`,
    folderStructure: `
django-postgres-stack/
├── docker-compose.yml
├── Dockerfile
├── requirements.txt
└── app/
    `,
    configs: [
      {
        filename: "docker-compose.yml",
        code: `version: '3.8'
services:
  db:
    image: postgres:15-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: dev_db
      POSTGRES_USER: dev_user
      POSTGRES_PASSWORD: dev_password
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dev_user -d dev_db"]
      interval: 5s
      timeout: 5s
      retries: 5
  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/app
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgres://dev_user:dev_password@db:5432/dev_db
    depends_on:
      db:
        condition: service_healthy
volumes:
  pgdata:`
      }
    ],
    commands: [
      "docker compose up -d --build",
      "docker compose ps",
      "docker compose exec web python manage.py migrate"
    ],
    expectedOutput: "django-postgres-stack-db-1 Up (healthy), django-postgres-stack-web-1 Up 0.0.0.0:8000->8000/tcp",
    testing: "Create a user in Django admin, execute `docker compose down`, restart with `docker compose up -d`, and verify the user persists in PostgreSQL.",
    resumeBullet: "Architected multi-tier Docker Compose environments with database health checks and persistent volume storage, streamlining local developer onboarding from days to minutes."
  },

  {
    id: "proj-github-actions-ci",
    title: "9. Automated GitHub Actions CI Testing & Linting Pipeline",
    tier: "Intermediate",
    category: "CI/CD",
    time: "40 min",
    description: "Construct an automated Continuous Integration pipeline triggered on Pull Requests with matrix testing across multiple Python versions and code coverage reports.",
    objectives: [
      "Write multi-job GitHub Actions workflow triggered on push and pull_request",
      "Execute matrix builds across Python 3.10 and 3.11",
      "Run Flake8 linting and Black code style formatting checks",
      "Upload automated CodeCov coverage reports"
    ],
    tech: ["GitHub Actions", "Pytest", "Flake8", "Black", "Python Matrix"],
    architecture: `Pull Request -> GitHub Runner -> Job 1: Lint (Flake8) -> Job 2: Test Matrix (Pytest) -> Pass/Fail Badge`,
    folderStructure: `
repo/
├── .github/
│   └── workflows/
│       └── ci.yml
├── tests/
└── src/
    `,
    configs: [
      {
        filename: ".github/workflows/ci.yml",
        code: `name: CI Test Suite
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.11" }
      - run: pip install flake8 black
      - run: flake8 . --max-line-length=88
      - run: black --check .

  test:
    needs: lint
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.10", "3.11"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: \${{ matrix.python-version }} }
      - run: pip install -r requirements.txt pytest pytest-cov
      - run: pytest --cov=src tests/`
      }
    ],
    commands: [
      "git add .github/workflows/ci.yml",
      "git commit -m 'Add automated CI testing pipeline'",
      "git push origin main"
    ],
    expectedOutput: "All checks have passed! 2 successful checks in 42s.",
    testing: "Open a test pull request with a deliberate formatting violation; verify that the pipeline fails and prevents merge.",
    resumeBullet: "Built production CI/CD pipelines in GitHub Actions with dependency caching and parallel test matrix execution, preventing regressions and enforcing 90%+ code coverage."
  },

  {
    id: "proj-jenkins-docker-pipeline",
    title: "10. Automated Jenkins Pipeline for Docker Builds",
    tier: "Intermediate",
    category: "CI/CD",
    time: "50 min",
    description: "Install and configure a Jenkins CI server, connect GitHub webhooks, build Docker container images, and publish them to a Docker Registry.",
    objectives: [
      "Setup Jenkins Controller on an Ubuntu virtual machine",
      "Configure Docker in Docker (DinD) permissions for the Jenkins executor",
      "Store encrypted Docker Hub credentials using Jenkins Credentials Binding",
      "Write a Declarative Jenkinsfile pipeline with automated clean-up stages"
    ],
    tech: ["Jenkins", "Docker Hub", "Groovy", "Linux", "Webhooks"],
    architecture: `GitHub Webhook -> Jenkins Controller -> Build Container -> Run Tests -> Push to Docker Hub`,
    folderStructure: `
project/
├── Jenkinsfile
├── Dockerfile
└── app/
    `,
    configs: [
      {
        filename: "Jenkinsfile",
        code: `pipeline {
    agent any
    environment {
        REGISTRY_CRED = credentials('docker-hub-login')
        IMAGE = 'myaccount/demo-app'
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build & Test') {
            steps {
                sh 'docker build -t $IMAGE:$BUILD_NUMBER .'
                sh 'docker run --rm $IMAGE:$BUILD_NUMBER pytest'
            }
        }
        stage('Publish') {
            steps {
                sh 'echo $REGISTRY_CRED_PSW | docker login -u $REGISTRY_CRED_USR --password-stdin'
                sh 'docker push $IMAGE:$BUILD_NUMBER'
            }
        }
    }
}`
      }
    ],
    commands: [
      "sudo systemctl start jenkins",
      "tail -n 20 /var/log/jenkins/jenkins.log"
    ],
    expectedOutput: "SUCCESS. Finished: SUCCESS. Pushed myaccount/demo-app:12 to Docker Hub.",
    testing: "Trigger a commit in Git; verify Jenkins receives the webhook and executes the 3 pipeline stages with green checkmarks.",
    resumeBullet: "Constructed enterprise Jenkins automated pipelines with automated Docker builds, linting, unit testing, and registry artifact publishing."
  },

  {
    id: "proj-nginx-reverse-proxy",
    title: "11. Configure Nginx as a Secure Reverse Proxy & Load Balancer",
    tier: "Intermediate",
    category: "Nginx",
    time: "40 min",
    description: "Configure Nginx with round-robin load balancing across multiple backend app instances, Gzip compression, and rate limiting against DDoS attacks.",
    objectives: [
      "Define an upstream pool of backend application servers",
      "Implement client IP rate limiting with `limit_req_zone`",
      "Enable high-speed Gzip compression for JSON, CSS, and JS assets",
      "Configure security headers (X-Frame-Options, X-Content-Type-Options)"
    ],
    tech: ["Nginx", "HTTP/2", "Load Balancing", "Linux"],
    architecture: `Internet Clients -> Nginx (:80) -> Load Balances between Server A (:8001) & Server B (:8002)`,
    folderStructure: `
/etc/nginx/
├── nginx.conf
└── conf.d/
    └── load_balancer.conf
    `,
    configs: [
      {
        filename: "load_balancer.conf",
        code: `limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

upstream backend_cluster {
    least_conn;
    server 127.0.0.1:8001 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:8002 max_fails=3 fail_timeout=10s;
}

server {
    listen 80;
    server_name api.myservice.com;

    gzip on;
    gzip_types application/json text/css application/javascript;

    location / {
        limit_req zone=api_limit burst=20 nodelay;
        proxy_pass http://backend_cluster;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`
      }
    ],
    commands: [
      "sudo nginx -t",
      "sudo systemctl reload nginx"
    ],
    expectedOutput: "syntax is ok. test is successful. Nginx reloaded without dropping active client connections.",
    testing: "Send 50 rapid requests using `curl`; verify requests exceeding 10 req/s receive HTTP 429 Too Many Requests.",
    resumeBullet: "Configured resilient Nginx reverse proxies with least-connections load balancing, rate limiting, and Gzip compression, decreasing P95 API latencies by 35%."
  },

  {
    id: "proj-ec2-https-ssl",
    title: "12. Production EC2 Hosting with Let's Encrypt SSL & Auto-Renewal",
    tier: "Intermediate",
    category: "AWS & Security",
    time: "35 min",
    description: "Point a real DNS domain to an AWS EC2 instance, install Certbot, obtain a free trusted Let's Encrypt TLS certificate, and verify auto-renewal cron timers.",
    objectives: [
      "Configure an A record in DNS pointing your domain to the EC2 Elastic IP",
      "Install and configure Certbot with the Nginx plugin",
      "Achieve an A+ SSL security rating on SSL Labs with TLS 1.2/1.3",
      "Test certificate renewal dry-run using systemd timers"
    ],
    tech: ["Certbot", "Let's Encrypt", "TLS/SSL", "AWS EC2", "Nginx"],
    architecture: `Client -> HTTPS (Port 443 with TLS 1.3 Encryption) -> Nginx -> Certbot Auto-Renewal Timer`,
    folderStructure: `
/etc/letsencrypt/
├── live/
│   └── yourdomain.com/
│       ├── fullchain.pem
│       └── privkey.pem
    `,
    configs: [
      {
        filename: "certbot-command",
        code: `sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com --redirect --agree-tos --email admin@yourdomain.com`
      }
    ],
    commands: [
      "sudo apt install -y certbot python3-certbot-nginx",
      "sudo certbot --nginx -d yourdomain.com",
      "sudo certbot renew --dry-run"
    ],
    expectedOutput: "Congratulations! Your certificate and chain have been saved at /etc/letsencrypt/live/yourdomain.com/fullchain.pem. Dry run was successful.",
    testing: "Visit `https://yourdomain.com` in Chrome; verify the lock icon appears and HTTP requests automatically redirect to HTTPS.",
    resumeBullet: "Implemented end-to-end TLS/SSL certificate automation with Certbot and Let's Encrypt on AWS EC2, guaranteeing 100% encrypted traffic and automated renewals."
  },

  {
    id: "proj-prometheus-grafana-setup",
    title: "13. Infrastructure Monitoring with Prometheus & Grafana",
    tier: "Intermediate",
    category: "Monitoring",
    time: "45 min",
    description: "Deploy Prometheus, Node Exporter, and Grafana using Docker Compose to collect real-time Linux hardware metrics and visualize live dashboards.",
    objectives: [
      "Deploy Node Exporter to scrape CPU, Memory, Disk, and Network stats",
      "Configure Prometheus targets and scraping jobs in prometheus.yml",
      "Connect Prometheus data source to Grafana and import dashboard #1860",
      "Configure alert rules notifying on CPU utilization >85%"
    ],
    tech: ["Prometheus", "Grafana", "Node Exporter", "Docker Compose"],
    architecture: `Node Exporter (:9100) -> Prometheus scrapes metrics every 15s -> Grafana renders dashboard (:3000)`,
    folderStructure: `
monitoring-stack/
├── docker-compose.yml
└── prometheus.yml
    `,
    configs: [
      {
        filename: "prometheus.yml",
        code: `global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['node-exporter:9100']`
      },
      {
        filename: "docker-compose.yml",
        code: `version: '3.8'
services:
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
  node-exporter:
    image: prom/node-exporter:latest
    ports:
      - "9100:9100"
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    depends_on:
      - prometheus`
      }
    ],
    commands: [
      "docker compose up -d",
      "curl http://localhost:9090/-/healthy",
      "curl http://localhost:9100/metrics | head -n 15"
    ],
    expectedOutput: "Prometheus Server is Ready. Grafana dashboard accessible at http://localhost:3000 (admin/admin).",
    testing: "Open Grafana, add Prometheus datasource at `http://prometheus:9090`, import dashboard 1860, and view live CPU gauges.",
    resumeBullet: "Deployed full-stack observability infrastructure using Prometheus and Grafana, capturing 50+ system and application metrics with automated threshold alarms."
  },

  // =========================================================================
  // ADVANCED PROJECTS (14-21)
  // =========================================================================
  {
    id: "proj-full-cicd-ec2",
    title: "14. Complete CI/CD Pipeline (GitHub Actions + Docker + AWS EC2)",
    tier: "Advanced",
    category: "Full CI/CD",
    time: "60 min",
    description: "End-to-end automated deployment pipeline: developer git push triggers unit tests, builds and tags multi-arch Docker image, pushes to Amazon ECR, and deploys to AWS EC2 with zero downtime.",
    objectives: [
      "Automate testing with pytest and code coverage in GitHub Actions",
      "Build production Docker container image and push to Amazon ECR",
      "SSH into remote EC2 instance, execute rolling update, and run health check",
      "Send Discord deployment success notification with Git commit hash"
    ],
    tech: ["GitHub Actions", "Docker", "Amazon ECR", "AWS EC2", "SSH", "Nginx"],
    architecture: `git push -> GitHub Action -> Pytest -> Push ECR -> SSH EC2 -> docker pull & restart -> Healthcheck OK`,
    folderStructure: `
enterprise-cicd/
├── .github/workflows/deploy.yml
├── Dockerfile
├── docker-compose.prod.yml
└── src/
    `,
    configs: [
      {
        filename: ".github/workflows/deploy.yml",
        code: `name: Production Deployment
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Log in to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2
      - name: Build & Push Image
        run: |
          IMAGE_URI=\${{ steps.login-ecr.outputs.registry }}/app:\${{ github.sha }}
          docker build -t $IMAGE_URI .
          docker push $IMAGE_URI
      - name: Deploy to EC2
        uses: appleboy/ssh-action@master
        with:
          host: \${{ secrets.EC2_HOST }}
          username: ubuntu
          key: \${{ secrets.EC2_SSH_KEY }}
          script: |
            aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin \${{ steps.login-ecr.outputs.registry }}
            docker stop web || true && docker rm web || true
            docker run -d --name web -p 80:8000 --restart always \${{ steps.login-ecr.outputs.registry }}/app:\${{ github.sha }}`
      }
    ],
    commands: [
      "git push origin main",
      "curl -I https://api.myproduction.com/health/"
    ],
    expectedOutput: "HTTP/1.1 200 OK. New container running image with SHA: 4f1a92e.",
    testing: "Commit a small change to `main`; observe the entire build, ECR push, and EC2 container swap finish in under 90 seconds.",
    resumeBullet: "Engineered automated enterprise CI/CD pipelines using GitHub Actions and Amazon ECR, deploying zero-downtime container updates to AWS EC2 in under 90 seconds."
  },

  {
    id: "proj-k8s-multi-service",
    title: "15. Kubernetes Multi-Service Microservices Deployment",
    tier: "Advanced",
    category: "Kubernetes",
    time: "60 min",
    description: "Deploy a resilient microservices architecture on Kubernetes: Frontend SPA, Backend REST API, PostgreSQL database with PVC, ConfigMaps, and Ingress TLS.",
    objectives: [
      "Create persistent storage using PersistentVolumeClaims (PVC)",
      "Deploy replicated backend API pods with HorizontalPodAutoscaler (HPA)",
      "Configure Nginx Ingress Controller routing /api to backend and / to frontend",
      "Inject sensitive credentials securely using Kubernetes Secrets"
    ],
    tech: ["Kubernetes", "kubectl", "Ingress Nginx", "Persistent Volumes", "HPA"],
    architecture: `Ingress (TLS) -> / (Frontend Service: 3 Pods) AND /api (Backend Service: 5 Pods) -> Postgres (StatefulSet + PVC)`,
    folderStructure: `
k8s-manifests/
├── 01-namespace.yaml
├── 02-secrets.yaml
├── 03-postgres-pvc.yaml
├── 04-postgres-statefulset.yaml
├── 05-backend-deployment.yaml
├── 06-frontend-deployment.yaml
└── 07-ingress.yaml
    `,
    configs: [
      {
        filename: "05-backend-deployment.yaml",
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: myrepo/api:v1.2
        ports:
        - containerPort: 8000
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 10
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 250m
            memory: 256Mi`
      }
    ],
    commands: [
      "kubectl apply -f k8s-manifests/",
      "kubectl get pods -n production",
      "kubectl get ingress -n production"
    ],
    expectedOutput: "All 3 API pods and 1 Postgres pod Running (1/1). Ingress shows assigned address.",
    testing: "Delete one API pod with `kubectl delete pod`; verify Kubernetes immediately spins up a replacement pod in under 2 seconds.",
    resumeBullet: "Architected multi-tier Kubernetes microservices deployments with rolling updates, self-healing pod controllers, and horizontal pod autoscaling."
  },

  {
    id: "proj-terraform-aws-infra",
    title: "16. Automated AWS Infrastructure Provisioning with Terraform",
    tier: "Advanced",
    category: "Terraform",
    time: "55 min",
    description: "Write modular Terraform code to provision a production AWS environment: 2-Tier VPC, Public & Private Subnets, Internet Gateway, NAT Gateway, Security Groups, and EC2 cluster.",
    objectives: [
      "Write reusable Terraform modules with input variables and outputs",
      "Provision a multi-AZ VPC across us-east-1a and us-east-1b",
      "Configure remote state storage in Amazon S3 with DynamoDB state locking",
      "Execute `terraform plan` and verify infrastructure drift"
    ],
    tech: ["Terraform", "AWS VPC", "AWS EC2", "AWS S3", "HCL"],
    architecture: `main.tf -> Terraform Provider -> AWS API -> 1 VPC + 4 Subnets + 1 IGW + 1 NAT Gateway + 2 EC2 Instances`,
    folderStructure: `
terraform-infra/
├── main.tf
├── variables.tf
├── outputs.tf
├── terraform.tfvars
└── modules/
    ├── vpc/
    └── compute/
    `,
    configs: [
      {
        filename: "main.tf",
        code: `terraform {
  backend "s3" {
    bucket         = "my-tf-state-bucket-2026"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
  }
}

module "vpc" {
  source = "./modules/vpc"
  cidr   = "10.0.0.0/16"
}

module "compute" {
  source         = "./modules/compute"
  vpc_id         = module.vpc.vpc_id
  subnet_id      = module.vpc.public_subnet_ids[0]
  instance_type  = var.instance_type
}`
      }
    ],
    commands: [
      "terraform init",
      "terraform plan -out=tfplan",
      "terraform apply tfplan"
    ],
    expectedOutput: "Apply complete! Resources: 14 added, 0 changed, 0 destroyed. Outputs: vpc_id = 'vpc-0a8b9c...'",
    testing: "Inspect AWS console; verify that the VPC, subnets, route tables, and instances were created with exact tags.",
    resumeBullet: "Provisioned scalable multi-AZ cloud infrastructure using Terraform Infrastructure as Code (IaC) modules with remote S3 state and DynamoDB locking."
  },

  {
    id: "proj-microservices-compose",
    title: "17. Microservices Stack (React, FastAPI, Redis, Celery & Postgres)",
    tier: "Advanced",
    category: "Docker Compose",
    time: "50 min",
    description: "Build an asynchronous distributed task processing pipeline with a React frontend, FastAPI API gateway, Redis message broker, and Celery background workers.",
    objectives: [
      "Orchestrate 5 interconnected containers in docker-compose.yml",
      "Dispatch asynchronous heavy computation tasks to Celery via Redis broker",
      "Query task completion status via REST polling API",
      "Configure isolated internal networks"
    ],
    tech: ["FastAPI", "Celery", "Redis", "PostgreSQL", "React", "Docker Compose"],
    architecture: `React -> FastAPI -> Redis (Task Queue) -> Celery Worker (Executes heavy task) -> Postgres`,
    folderStructure: `
microservices/
├── docker-compose.yml
├── backend/
│   ├── main.py
│   └── tasks.py
└── frontend/
    `,
    configs: [
      {
        filename: "docker-compose.yml",
        code: `version: '3.8'
services:
  api:
    build: ./backend
    command: uvicorn main:app --host 0.0.0.0 --port 8000
    ports: ["8000:8000"]
    depends_on: [redis, db]
  worker:
    build: ./backend
    command: celery -A tasks worker --loglevel=info
    depends_on: [redis, db]
  redis:
    image: redis:7-alpine
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: pass`
      }
    ],
    commands: [
      "docker compose up -d",
      "curl -X POST http://localhost:8000/process-task"
    ],
    expectedOutput: "{\"task_id\": \"b89a-4c2d\", \"status\": \"Processing in background by Celery worker\"}",
    testing: "Check `docker compose logs -f worker` and verify Celery prints task received and task succeeded.",
    resumeBullet: "Architected distributed asynchronous microservices using FastAPI, Celery, and Redis message brokers, eliminating UI bottlenecks for compute-heavy workloads."
  },

  {
    id: "proj-full-monitoring-prometheus",
    title: "18. Enterprise Monitoring & Alerting (Prometheus, Grafana, Alertmanager)",
    tier: "Advanced",
    category: "Monitoring",
    time: "55 min",
    description: "Build an enterprise observability platform collecting metrics from multiple hosts and apps, routing critical alerts through Alertmanager to Slack and PagerDuty.",
    objectives: [
      "Configure Prometheus Alerting Rules in YAML (HighCPU, ServiceDown, DiskFull)",
      "Setup Alertmanager with grouping, silencing, and notification routing",
      "Build custom Grafana dashboard tracking API request rates, P95 latencies, and HTTP 5xx errors",
      "Simulate service failures and verify alert delivery"
    ],
    tech: ["Prometheus", "Grafana", "Alertmanager", "Slack Integration", "PromQL"],
    architecture: `Apps & Servers -> Prometheus -> Alertmanager (Groups & Deduplicates) -> Slack / PagerDuty Alert`,
    folderStructure: `
enterprise-monitoring/
├── docker-compose.yml
├── prometheus.yml
├── alert.rules.yml
└── alertmanager.yml
    `,
    configs: [
      {
        filename: "alert.rules.yml",
        code: `groups:
  - name: production_alerts
    rules:
      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Instance {{ $labels.instance }} is DOWN"
          description: "Target has failed to answer metric scrapes for over 60 seconds."`
      }
    ],
    commands: [
      "docker compose up -d",
      "curl http://localhost:9093/#/alerts"
    ],
    expectedOutput: "Alertmanager active. 0 firing alerts. Slack receiver configured.",
    testing: "Stop a monitored container with `docker stop web`; observe Alertmanager fire an alert within 60 seconds to your Slack channel.",
    resumeBullet: "Deployed enterprise Prometheus and Alertmanager monitoring stacks, decreasing incident Mean Time to Detect (MTTD) by 75% with automated Slack routing."
  },

  {
    id: "proj-aws-ha-architecture",
    title: "19. AWS Highly Available Multi-AZ Architecture",
    tier: "Advanced",
    category: "AWS Cloud",
    time: "60 min",
    description: "Design and implement a fault-tolerant AWS production topology across 2 Availability Zones with ALB, Auto Scaling, Multi-AZ RDS, and S3 assets.",
    objectives: [
      "Distribute EC2 instances across 2 Availability Zones behind an Application Load Balancer",
      "Configure automated target group health checks for zero-downtime rolling deploys",
      "Provision Amazon RDS PostgreSQL in Multi-AZ synchronous replication mode",
      "Implement AWS Auto Scaling policies scaling on average CPU utilization >70%"
    ],
    tech: ["AWS EC2", "AWS ALB", "AWS ASG", "AWS RDS Multi-AZ", "Route 53"],
    architecture: `Internet -> Route 53 -> ALB (us-east-1a & 1b) -> EC2 ASG Instances -> RDS Multi-AZ (Primary & Standby)`,
    folderStructure: `
aws-ha-topology/
├── cloudformation.yaml
└── alb-health-check.py
    `,
    configs: [
      {
        filename: "asg-policy.json",
        code: `{
  "TargetValue": 70.0,
  "PredefinedMetricSpecification": {
    "PredefinedMetricType": "ASGAverageCPUUtilization"
  }
}`
      }
    ],
    commands: [
      "aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names my-asg",
      "aws elbv2 describe-target-health --target-group-arn <TARGET_GROUP_ARN>"
    ],
    expectedOutput: "Target health: 2 instances healthy (State: healthy). Multi-AZ replica in us-east-1b in sync.",
    testing: "Manually terminate an EC2 instance in us-east-1a; verify the ALB routes 100% of traffic to us-east-1b while ASG launches a replacement.",
    resumeBullet: "Engineered 99.99% high-availability AWS cloud infrastructure using Multi-AZ ALBs, Auto Scaling Groups, and synchronous RDS failover clusters."
  },

  {
    id: "proj-devsecops-pipeline",
    title: "20. DevSecOps Pipeline with SAST, SCA & Container Scanning",
    tier: "Advanced",
    category: "DevSecOps",
    time: "55 min",
    description: "Build an automated security gate in GitHub Actions that scans source code with SonarQube/Semgrep, audits dependencies with Snyk/pip-audit, and checks Docker images with Trivy.",
    objectives: [
      "Implement Shift-Left security checks running on every git commit",
      "Fail the CI/CD pipeline if high or critical CVE vulnerabilities are detected",
      "Scan container images with Trivy and output SARIF reports to GitHub Security tab",
      "Detect committed credentials and API keys with TruffleHog"
    ],
    tech: ["Trivy", "Semgrep", "TruffleHog", "GitHub Actions", "Docker"],
    architecture: `Git Commit -> Secrets Scan (TruffleHog) -> SAST (Semgrep) -> Dependency Audit -> Trivy Container Scan -> Deploy`,
    folderStructure: `
devsecops-pipeline/
├── .github/workflows/security.yml
├── Dockerfile
└── requirements.txt
    `,
    configs: [
      {
        filename: ".github/workflows/security.yml",
        code: `name: DevSecOps Security Gate
on: [push, pull_request]
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - name: Scan for Secret Leaks
        uses: trufflesecurity/trufflehog@main
        with: { path: ./, base: \${{ github.event.repository.default_branch }} }
      - name: SAST Code Analysis
        run: |
          pip install semgrep
          semgrep --config "p/security-audit" --error .
      - name: Build Docker Image
        run: docker build -t myapp:local .
      - name: Container Vulnerability Scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myapp:local'
          exit-code: '1'
          severity: 'CRITICAL,HIGH'`
      }
    ],
    commands: [
      "trivy image --severity HIGH,CRITICAL myapp:local",
      "semgrep scan --config auto"
    ],
    expectedOutput: "No high severity vulnerabilities found. Pipeline passed security criteria.",
    testing: "Commit a dummy AWS access key `AKIAIOSFODNN7EXAMPLE`; verify TruffleHog flags the secret and fails the pipeline.",
    resumeBullet: "Integrated automated DevSecOps security scanning (Trivy, Semgrep, TruffleHog) into CI/CD pipelines, remediating 40+ CVE vulnerabilities prior to release."
  },

  {
    id: "proj-end-to-end-automated-rollback",
    title: "21. Cloud Deployment with Automated Health Checks & Rollback",
    tier: "Advanced",
    category: "CI/CD & SRE",
    time: "60 min",
    description: "Implement a zero-risk deployment system that deploys a new container release, runs post-deployment synthetic user tests, and automatically rolls back to the previous version if error rates spike.",
    objectives: [
      "Tag Docker images with deterministic Git commit SHA hashes",
      "Perform blue-green or canary release using dynamic Nginx or Kubernetes rollout",
      "Monitor error rates for 3 minutes post-deploy",
      "Trigger automated rollback script if HTTP 500 error rate exceeds 1%"
    ],
    tech: ["Bash", "Docker", "Nginx", "GitHub Actions", "cURL"],
    architecture: `Deploy v2 -> Synthetic Smoke Tests -> If Failed (HTTP 5xx > 1%) -> Auto Rollback to v1 & Alert Slack`,
    folderStructure: `
safe-deploy/
├── deploy.sh
├── rollback.sh
├── smoke_test.sh
└── docker-compose.yml
    `,
    configs: [
      {
        filename: "deploy.sh",
        code: `#!/bin/bash
set -euo pipefail

PREV_TAG=$(cat CURRENT_TAG 2>/dev/null || echo "v1.0")
NEW_TAG=$1

echo "[DEPLOY] Upgrading from $PREV_TAG to $NEW_TAG..."
docker stop app_current && docker rm app_current
docker run -d --name app_current -p 8000:8000 myrepo/app:$NEW_TAG

echo "[VERIFY] Running synthetic smoke tests..."
if ./smoke_test.sh; then
  echo "[SUCCESS] Smoke tests passed! Persisting $NEW_TAG."
  echo "$NEW_TAG" > CURRENT_TAG
else
  echo "[ALERT] Smoke tests failed! Initiating automated rollback to $PREV_TAG..."
  ./rollback.sh "$PREV_TAG"
  exit 1
fi`
      }
    ],
    commands: [
      "./deploy.sh v2.1",
      "./smoke_test.sh"
    ],
    expectedOutput: "[VERIFY] Smoke test 1/5 OK (200), test 2/5 OK (200)... [SUCCESS] Deployment healthy.",
    testing: "Deploy an image with a deliberate crashing route; observe the deploy script catch the HTTP 500 and immediately restore the previous container.",
    resumeBullet: "Developed automated zero-downtime deployment pipelines with synthetic post-deploy smoke tests and automated rollbacks, reducing deployment failure recovery times to under 30 seconds."
  }
];

