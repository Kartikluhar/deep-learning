/**
 * MLForge Real-World Deployment Tutorials Database
 * 12 Complete Step-by-Step Production Deployment Tutorials
 * Includes required tools, architecture, commands, configs, testing, and error handling.
 */

window.MLForge = window.MLForge || {};
window.MLForge.devops = window.MLForge.devops || {};
window.MLForge.devops.data = window.MLForge.devops.data || {};

MLForge.devops.data.tutorials = [
  {
    id: "deploy-django-aws-ec2",
    title: "1. Deploy Django on AWS EC2 with Gunicorn, Nginx & SSL",
    category: "AWS & Linux",
    difficulty: "Intermediate",
    time: "25 min",
    summary: "Complete production guide to deploying a Django web application on an Ubuntu AWS EC2 instance using Gunicorn WSGI, Nginx reverse proxy, Systemd, and free Let's Encrypt SSL.",
    tools: ["AWS EC2", "Ubuntu 22.04 LTS", "Python 3.11", "Gunicorn", "Nginx", "Certbot (SSL)"],
    architecture: `Client (HTTPS:443) -> Nginx (Reverse Proxy & Static Files) -> Gunicorn (Unix Socket) -> Django Application -> PostgreSQL`,
    steps: [
      {
        step: 1,
        title: "Launch and Prepare AWS EC2 Instance",
        content: `
          <p>Launch an Ubuntu 22.04 LTS <code>t3.micro</code> (Free Tier eligible) instance. In your Security Group, open:</p>
          <ul>
            <li><strong>SSH (Port 22):</strong> Restrict to your IP.</li>
            <li><strong>HTTP (Port 80):</strong> Open to <code>0.0.0.0/0</code>.</li>
            <li><strong>HTTPS (Port 443):</strong> Open to <code>0.0.0.0/0</code>.</li>
          </ul>
          <p>SSH into your instance and update packages:</p>
          <pre class="devops-terminal-content">
$ ssh -i my-key.pem ubuntu@&lt;EC2_PUBLIC_IP&gt;
$ sudo apt update && sudo apt upgrade -y
$ sudo apt install -y python3-pip python3-venv nginx git
          </pre>
        `
      },
      {
        step: 2,
        title: "Clone Code and Setup Virtual Environment",
        content: `
          <pre class="devops-terminal-content">
$ cd /home/ubuntu
$ git clone https://github.com/your-username/django-app.git app
$ cd app
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install --upgrade pip
$ pip install -r requirements.txt
$ pip install gunicorn
          </pre>
        `
      },
      {
        step: 3,
        title: "Configure Environment Variables & Static Files",
        content: `
          <p>Create a secure <code>.env</code> file:</p>
          <pre class="devops-terminal-content">
$ nano /home/ubuntu/app/.env
# Add the following:
DEBUG=False
SECRET_KEY="your-generated-random-secret-key"
ALLOWED_HOSTS="yourdomain.com,www.yourdomain.com,&lt;EC2_PUBLIC_IP&gt;"
DATABASE_URL="postgres://user:password@db-host:5432/dbname"
          </pre>
          <p>Collect static assets and run database migrations:</p>
          <pre class="devops-terminal-content">
$ python manage.py migrate
$ python manage.py collectstatic --noinput
          </pre>
        `
      },
      {
        step: 4,
        title: "Configure Gunicorn with Systemd",
        content: `
          <p>Create <code>/etc/systemd/system/gunicorn.service</code>:</p>
          <pre class="devops-code-pre">
[Unit]
Description=Gunicorn daemon for Django Application
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/app
ExecStart=/home/ubuntu/app/venv/bin/gunicorn \
          --access-logfile - \
          --workers 3 \
          --bind unix:/run/gunicorn.sock \
          myproject.wsgi:application
Restart=always

[Install]
WantedBy=multi-user.target
          </pre>
          <p>Start and enable the Gunicorn service:</p>
          <pre class="devops-terminal-content">
$ sudo systemctl start gunicorn
$ sudo systemctl enable gunicorn
$ sudo systemctl status gunicorn
          </pre>
        `
      },
      {
        step: 5,
        title: "Configure Nginx Reverse Proxy & SSL",
        content: `
          <p>Create <code>/etc/nginx/sites-available/django.conf</code>:</p>
          <pre class="devops-code-pre">
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        alias /home/ubuntu/app/staticfiles/;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    }
}
          </pre>
          <p>Enable the site and obtain a free SSL certificate:</p>
          <pre class="devops-terminal-content">
$ sudo ln -s /etc/nginx/sites-available/django.conf /etc/nginx/sites-enabled/
$ sudo nginx -t
$ sudo systemctl restart nginx
$ sudo apt install -y certbot python3-certbot-nginx
$ sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
          </pre>
        `
      }
    ],
    commonErrors: [
      {
        error: "502 Bad Gateway from Nginx",
        cause: "Gunicorn is not running or the socket file permissions in /run/gunicorn.sock do not permit www-data to read.",
        fix: "Check `sudo journalctl -u gunicorn -n 50` and verify the Gunicorn process is active."
      },
      {
        error: "DisallowedHost at / error in Django",
        cause: "The domain name or EC2 IP is not listed in ALLOWED_HOSTS in settings.py.",
        fix: "Add your domain or IP to ALLOWED_HOSTS and restart gunicorn."
      }
    ]
  },

  {
    id: "deploy-fastapi-aws-ec2",
    title: "2. Deploy FastAPI on AWS EC2 with Uvicorn & Nginx",
    category: "AWS & Linux",
    difficulty: "Intermediate",
    time: "20 min",
    summary: "Deploy an asynchronous, high-performance FastAPI application using Uvicorn worker processes managed by Systemd behind Nginx on AWS EC2.",
    tools: ["AWS EC2", "FastAPI", "Uvicorn", "Nginx", "Systemd"],
    architecture: `Client (HTTPS) -> Nginx (SSL & Proxy) -> Uvicorn ASGI Server (127.0.0.1:8000) -> FastAPI App`,
    steps: [
      {
        step: 1,
        title: "Instance Preparation & Virtualenv",
        content: `
          <pre class="devops-terminal-content">
$ sudo apt update && sudo apt install -y python3-pip python3-venv nginx
$ mkdir -p ~/fastapi-app && cd ~/fastapi-app
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install fastapi "uvicorn[standard]" gunicorn
          </pre>
        `
      },
      {
        step: 2,
        title: "FastAPI Application & Systemd Service",
        content: `
          <p>Create <code>/etc/systemd/system/fastapi.service</code>:</p>
          <pre class="devops-code-pre">
[Unit]
Description=FastAPI Uvicorn Application
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/fastapi-app
ExecStart=/home/ubuntu/fastapi-app/venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000 --workers 4
Restart=always

[Install]
WantedBy=multi-user.target
          </pre>
          <pre class="devops-terminal-content">
$ sudo systemctl daemon-reload
$ sudo systemctl start fastapi
$ sudo systemctl enable fastapi
          </pre>
        `
      },
      {
        step: 3,
        title: "Nginx Reverse Proxy Configuration",
        content: `
          <p>Create <code>/etc/nginx/sites-available/fastapi.conf</code>:</p>
          <pre class="devops-code-pre">
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
          </pre>
          <pre class="devops-terminal-content">
$ sudo ln -s /etc/nginx/sites-available/fastapi.conf /etc/nginx/sites-enabled/
$ sudo nginx -t && sudo systemctl reload nginx
          </pre>
        `
      }
    ],
    commonErrors: [
      {
        error: "Address already in use on port 8000",
        cause: "Another process is already bound to port 8000.",
        fix: "Run `sudo lsof -i :8000` to find the conflicting PID and kill it."
      }
    ]
  },

  {
    id: "deploy-react-vercel",
    title: "3. Deploy React on Vercel with Custom Domains",
    category: "Frontend Hosting",
    difficulty: "Beginner",
    time: "10 min",
    summary: "Instant automated Git deployment of modern React and Vite single-page applications to Vercel's global Edge CDN network.",
    tools: ["React", "Vite", "GitHub", "Vercel CLI", "Custom DNS"],
    architecture: `Git Push (GitHub) -> Vercel Build Pipeline -> Global Edge CDN distribution (Anycast)`,
    steps: [
      {
        step: 1,
        title: "Connect Repository to Vercel",
        content: `
          <p>Push your React code to a GitHub repository. Sign into <a href="https://vercel.com" target="_blank">vercel.com</a>, click <strong>Add New Project</strong>, and import your repository.</p>
        `
      },
      {
        step: 2,
        title: "Configure Build Settings & Environment Variables",
        content: `
          <p>Vercel automatically detects Vite or Create React App:</p>
          <ul>
            <li><strong>Framework Preset:</strong> Vite</li>
            <li><strong>Build Command:</strong> <code>npm run build</code></li>
            <li><strong>Output Directory:</strong> <code>dist</code></li>
          </ul>
          <p>Add environment variables (e.g. <code>VITE_API_URL=https://api.yourdomain.com</code>) under Project Settings &rarr; Environment Variables.</p>
        `
      },
      {
        step: 3,
        title: "Custom Domain & SPA Client-Side Routing",
        content: `
          <p>To prevent 404 errors on browser page refresh with React Router, create a <code>vercel.json</code> file in your project root:</p>
          <pre class="devops-code-pre">
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
          </pre>
        `
      }
    ],
    commonErrors: [
      {
        error: "404 Not Found when reloading sub-routes like /dashboard",
        cause: "Vercel tries to find a static file named dashboard.html instead of delegating routing to index.html.",
        fix: "Add the `rewrites` configuration to `vercel.json` as shown above."
      }
    ]
  },

  {
    id: "deploy-react-django",
    title: "4. Deploy Full-Stack React + Django Application",
    category: "Full Stack",
    difficulty: "Intermediate",
    time: "25 min",
    summary: "Deploy a unified full-stack architecture: React frontend talking to Django REST Framework API, handling CORS headers, and serving static bundles.",
    tools: ["React", "Django REST Framework", "django-cors-headers", "Nginx"],
    architecture: `Browser -> Nginx -> / (React Static Files) OR /api/ (Django Gunicorn backend)`,
    steps: [
      {
        step: 1,
        title: "Configure Django CORS Headers",
        content: `
          <p>Install and enable <code>django-cors-headers</code> in <code>settings.py</code>:</p>
          <pre class="devops-code-pre">
INSTALLED_APPS = [
    ...,
    'corsheaders',
    'rest_framework',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # MUST be at top!
    'django.middleware.common.CommonMiddleware',
    ...,
]

CORS_ALLOWED_ORIGINS = [
    "https://your-react-domain.com",
    "http://localhost:5173",
]
          </pre>
        `
      },
      {
        step: 2,
        title: "Unified Nginx Routing",
        content: `
          <p>Route frontend and backend through a single Nginx configuration:</p>
          <pre class="devops-code-pre">
server {
    listen 80;
    server_name myapp.com;

    # 1. Frontend React build
    location / {
        root /var/www/react-app/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # 2. Django Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
          </pre>
        `
      }
    ],
    commonErrors: [
      {
        error: "CORS error: No 'Access-Control-Allow-Origin' header present",
        cause: "CorsMiddleware is either missing or placed below CommonMiddleware in settings.py.",
        fix: "Place CorsMiddleware as the very first middleware item in Django settings.py."
      }
    ]
  },

  {
    id: "deploy-django-postgresql",
    title: "5. Deploy Django + PostgreSQL (AWS RDS)",
    category: "Databases & AWS",
    difficulty: "Intermediate",
    time: "20 min",
    summary: "Connect production Django to a highly available Amazon RDS PostgreSQL instance with security groups, connection pooling, and automated migrations.",
    tools: ["Django", "AWS RDS PostgreSQL", "psycopg2-binary", "AWS VPC"],
    architecture: `EC2 (Private Subnet) -> Port 5432 (Security Group) -> AWS RDS PostgreSQL (Multi-AZ)`,
    steps: [
      {
        step: 1,
        title: "Provision RDS PostgreSQL Instance",
        content: `
          <p>Create a PostgreSQL database on AWS RDS. Set up a Security Group that allows inbound traffic on port 5432 <strong>ONLY from your EC2 Security Group ID</strong>, never from 0.0.0.0/0!</p>
        `
      },
      {
        step: 2,
        title: "Configure Django settings.py with dj-database-url",
        content: `
          <pre class="devops-code-pre">
import dj_database_url
import os

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600,
        ssl_require=True
    )
}
          </pre>
        `
      }
    ],
    commonErrors: [
      {
        error: "psycopg2.OperationalError: could not connect to server: Connection timed out",
        cause: "RDS Security Group does not allow inbound port 5432 from the EC2 instance.",
        fix: "Add an inbound rule in the RDS Security Group permitting PostgreSQL (5432) from the EC2 Security Group."
      }
    ]
  },

  {
    id: "deploy-fastapi-postgresql",
    title: "6. Deploy FastAPI + PostgreSQL with Asyncpg & Alembic",
    category: "Databases",
    difficulty: "Intermediate",
    time: "20 min",
    summary: "Build an asynchronous production database layer with SQLAlchemy 2.0, asyncpg connection pooling, and Alembic database schema migrations.",
    tools: ["FastAPI", "SQLAlchemy 2.0", "Asyncpg", "Alembic", "PostgreSQL"],
    architecture: `FastAPI Async Workers -> Async Connection Pool (asyncpg) -> PostgreSQL`,
    steps: [
      {
        step: 1,
        title: "Asynchronous Connection Pool Setup",
        content: `
          <pre class="devops-code-pre">
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
import os

DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql+asyncpg://user:pass@localhost:5432/app")

engine = create_async_engine(
    DATABASE_URL,
    pool_size=20,
    max_overflow=10,
    pool_pre_ping=True
)

AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)
          </pre>
        `
      }
    ],
    commonErrors: [
      {
        error: "Cannot create async engine with postgresql:// URL",
        cause: "Default URL uses synchronous psycopg2 driver.",
        fix: "Specify driver explicitly as `postgresql+asyncpg://`."
      }
    ]
  },

  {
    id: "deploy-apps-using-docker",
    title: "7. Deploy Applications Using Standalone Docker",
    category: "Docker",
    difficulty: "Beginner",
    time: "15 min",
    summary: "Containerize any application, build optimized container images, publish to Docker Hub, and run containerized workloads with restart policies.",
    tools: ["Docker Engine", "Docker Hub", "Linux Host"],
    architecture: `Code -> Docker Build -> Docker Registry (Push) -> Production Host (Pull & Run)`,
    steps: [
      {
        step: 1,
        title: "Build and Tag Image",
        content: `
          <pre class="devops-terminal-content">
$ docker build -t myusername/web-app:v1.0 .
$ docker login
$ docker push myusername/web-app:v1.0
          </pre>
        `
      },
      {
        step: 2,
        title: "Run with Production Restart Policies & Resource Limits",
        content: `
          <pre class="devops-terminal-content">
$ docker run -d \
    --name production-app \
    --restart unless-stopped \
    --memory="512m" \
    --cpus="1.0" \
    -p 80:8000 \
    --env-file .env.production \
    myusername/web-app:v1.0
          </pre>
        `
      }
    ],
    commonErrors: [
      {
        error: "Container exits immediately after starting",
        cause: "The container command (CMD) finished or crashed.",
        fix: "Run `docker logs production-app` to inspect the exact fatal exception."
      }
    ]
  },

  {
    id: "deploy-apps-docker-compose",
    title: "8. Deploy Multi-Tier Apps Using Docker Compose",
    category: "Docker",
    difficulty: "Intermediate",
    time: "20 min",
    summary: "Orchestrate multi-container production environments (Web, Database, Cache, Reverse Proxy) with persistent storage and network isolation.",
    tools: ["Docker Compose", "PostgreSQL", "Nginx", "Redis"],
    architecture: `Nginx Container (:80/:443) -> Web App Container (:8000) -> Postgres (:5432) & Redis (:6379)`,
    steps: [
      {
        step: 1,
        title: "Run and Manage Stack in Production",
        content: `
          <pre class="devops-terminal-content">
# 1. Start all services in background
$ docker compose -f docker-compose.prod.yml up -d --build

# 2. Check health status
$ docker compose ps

# 3. View live aggregated logs
$ docker compose logs -f web db
          </pre>
        `
      }
    ],
    commonErrors: [
      {
        error: "Database data lost when containers are removed",
        cause: "Anonymous or missing volume definition.",
        fix: "Define a named persistent volume under the root `volumes:` block."
      }
    ]
  },

  {
    id: "deploy-using-github-actions",
    title: "9. Deploy Applications Using GitHub Actions CI/CD",
    category: "CI/CD",
    difficulty: "Intermediate",
    time: "20 min",
    summary: "Automate continuous delivery: on git push to main, run tests, build Docker image, push to Amazon ECR or Docker Hub, and deploy via SSH.",
    tools: ["GitHub Actions", "SSH Agent", "Docker", "AWS EC2"],
    architecture: `git push -> GitHub Action Runner -> Run Tests -> SSH into EC2 -> docker pull & restart`,
    steps: [
      {
        step: 1,
        title: "Setup GitHub Repository Secrets",
        content: `
          <p>Under Repo Settings &rarr; Secrets and variables &rarr; Actions, add:</p>
          <ul>
            <li><code>HOST</code>: EC2 public IP or domain.</li>
            <li><code>USERNAME</code>: <code>ubuntu</code>.</li>
            <li><code>SSH_PRIVATE_KEY</code>: Contents of your EC2 <code>.pem</code> file.</li>
          </ul>
        `
      },
      {
        step: 2,
        title: "Automated Deploy Step YAML",
        content: `
          <pre class="devops-code-pre">
- name: Deploy to EC2 via SSH
  uses: appleboy/ssh-action@master
  with:
    host: \${{ secrets.HOST }}
    username: \${{ secrets.USERNAME }}
    key: \${{ secrets.SSH_PRIVATE_KEY }}
    script: |
      cd /home/ubuntu/app
      git pull origin main
      docker compose down
      docker compose up -d --build
          </pre>
        `
      }
    ],
    commonErrors: [
      {
        error: "Host key verification failed during SSH step",
        cause: "SSH agent does not have the host public key in known_hosts.",
        fix: "Ensure your SSH action automatically accepts or provisions host keys."
      }
    ]
  },

  {
    id: "deploy-using-jenkins",
    title: "10. Deploy Applications Using Jenkins Pipelines",
    category: "CI/CD",
    difficulty: "Advanced",
    time: "25 min",
    summary: "Configure automated webhooks from GitHub to Jenkins, run automated build agents, and execute blue-green deployments to staging and production.",
    tools: ["Jenkins", "GitHub Webhooks", "Docker Pipeline Plugin", "SSH Credentials"],
    architecture: `GitHub Push -> Webhook Trigger -> Jenkins Controller -> Agent Node executes pipeline -> Deploy`,
    steps: [
      {
        step: 1,
        title: "Configure GitHub Webhook",
        content: `
          <p>In GitHub Repo Settings &rarr; Webhooks, set Payload URL to: <code>http://jenkins-server:8080/github-webhook/</code>.</p>
        `
      }
    ],
    commonErrors: [
      {
        error: "Jenkins permission denied: docker.sock",
        cause: "The `jenkins` Linux system user is not a member of the `docker` group.",
        fix: "Run `sudo usermod -aG docker jenkins && sudo systemctl restart jenkins`."
      }
    ]
  },

  {
    id: "deploy-containerized-aws-ecs",
    title: "11. Deploy Containerized Application to AWS ECS (Fargate)",
    category: "AWS & Containers",
    difficulty: "Advanced",
    time: "30 min",
    summary: "Serverless container deployment: build Docker image, push to Amazon ECR, define ECS Task Definitions, and launch a Fargate Service behind an ALB.",
    tools: ["AWS ECR", "AWS ECS", "AWS Fargate", "Application Load Balancer"],
    architecture: `Docker Image -> Amazon ECR -> ECS Fargate Task (No EC2 to manage!) -> ALB`,
    steps: [
      {
        step: 1,
        title: "Push Docker Image to Amazon ECR",
        content: `
          <pre class="devops-terminal-content">
$ aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin &lt;ACCOUNT_ID&gt;.dkr.ecr.us-east-1.amazonaws.com
$ docker tag my-app:latest &lt;ACCOUNT_ID&gt;.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
$ docker push &lt;ACCOUNT_ID&gt;.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
          </pre>
        `
      }
    ],
    commonErrors: [
      {
        error: "Task failed to pull image from ECR: CannotPullContainerError",
        cause: "ECS Task Execution Role lacks the AmazonECSTaskExecutionRolePolicy permission.",
        fix: "Attach the `AmazonECSTaskExecutionRolePolicy` to your ECS execution IAM role."
      }
    ]
  },

  {
    id: "deploy-application-kubernetes",
    title: "12. Deploy an Application to Kubernetes Cluster",
    category: "Kubernetes",
    difficulty: "Advanced",
    time: "30 min",
    summary: "End-to-end Kubernetes production deployment: ConfigMaps, Secrets, Deployment with rolling updates, ClusterIP Service, and Ingress with TLS.",
    tools: ["Kubernetes", "kubectl", "Ingress Nginx", "Cert-Manager"],
    architecture: `Ingress Controller (SSL) -> Kubernetes Service -> Multiple Replicated Pods`,
    steps: [
      {
        step: 1,
        title: "Apply Kubernetes Manifests",
        content: `
          <pre class="devops-terminal-content">
$ kubectl create secret generic app-secrets --from-literal=DB_PASSWORD="secure_password"
$ kubectl apply -f configmap.yaml
$ kubectl apply -f deployment.yaml
$ kubectl apply -f service.yaml
$ kubectl apply -f ingress.yaml
$ kubectl rollout status deployment/my-app-deployment
          </pre>
        `
      }
    ],
    commonErrors: [
      {
        error: "CrashLoopBackOff status on Pod",
        cause: "Container started and crashed immediately due to invalid env vars or syntax errors.",
        fix: "Inspect the crash logs with `kubectl logs pod-name --previous`."
      }
    ]
  }
];

