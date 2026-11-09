/**
 * MLForge Cloud & DevOps Interactive Architecture Diagrams Database
 * 15 Technical Visual Diagrams implemented in responsive, interactive SVG/HTML
 * with tooltips, clickable stages, and clean architectural component layouts.
 */

window.MLForge = window.MLForge || {};
window.MLForge.devops = window.MLForge.devops || {};
window.MLForge.devops.data = window.MLForge.devops.data || {};

MLForge.devops.data.diagrams = [
  {
    id: "diag-cloud-arch",
    title: "1. Cloud Computing Architecture (IaaS vs PaaS vs SaaS)",
    description: "Visual breakdown of responsibilities between client management and cloud provider management across all cloud service models.",
    render() {
      return `
        <div style="width: 100%; overflow-x: auto; padding: 1rem 0;">
          <svg viewBox="0 0 800 380" style="width: 100%; min-width: 650px; height: auto; font-family: var(--font-sans);">
            <!-- Headers -->
            <rect x="50" y="20" width="160" height="40" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
            <text x="130" y="45" fill="#f8fafc" font-size="14" font-weight="700" text-anchor="middle">On-Premises</text>

            <rect x="230" y="20" width="160" height="40" rx="8" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" stroke-width="1.5"/>
            <text x="310" y="45" fill="#818cf8" font-size="14" font-weight="700" text-anchor="middle">IaaS (EC2/GCE)</text>

            <rect x="410" y="20" width="160" height="40" rx="8" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" stroke-width="1.5"/>
            <text x="490" y="45" fill="#22d3ee" font-size="14" font-weight="700" text-anchor="middle">PaaS (Beanstalk)</text>

            <rect x="590" y="20" width="160" height="40" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="1.5"/>
            <text x="670" y="45" fill="#34d399" font-size="14" font-weight="700" text-anchor="middle">SaaS (Gmail)</text>

            <!-- Rows -->
            <!-- Applications -->
            <rect x="50" y="75" width="160" height="32" rx="4" fill="#3b82f6"/><text x="130" y="96" fill="#fff" font-size="12" text-anchor="middle">Applications (You)</text>
            <rect x="230" y="75" width="160" height="32" rx="4" fill="#3b82f6"/><text x="310" y="96" fill="#fff" font-size="12" text-anchor="middle">Applications (You)</text>
            <rect x="410" y="75" width="160" height="32" rx="4" fill="#3b82f6"/><text x="490" y="96" fill="#fff" font-size="12" text-anchor="middle">Applications (You)</text>
            <rect x="590" y="75" width="160" height="32" rx="4" fill="#334155"/><text x="670" y="96" fill="#94a3b8" font-size="12" text-anchor="middle">Applications (Provider)</text>

            <!-- Data -->
            <rect x="50" y="115" width="160" height="32" rx="4" fill="#3b82f6"/><text x="130" y="136" fill="#fff" font-size="12" text-anchor="middle">Data (You)</text>
            <rect x="230" y="115" width="160" height="32" rx="4" fill="#3b82f6"/><text x="310" y="136" fill="#fff" font-size="12" text-anchor="middle">Data (You)</text>
            <rect x="410" y="115" width="160" height="32" rx="4" fill="#3b82f6"/><text x="490" y="136" fill="#fff" font-size="12" text-anchor="middle">Data (You)</text>
            <rect x="590" y="115" width="160" height="32" rx="4" fill="#334155"/><text x="670" y="136" fill="#94a3b8" font-size="12" text-anchor="middle">Data (Provider)</text>

            <!-- Runtime -->
            <rect x="50" y="155" width="160" height="32" rx="4" fill="#3b82f6"/><text x="130" y="176" fill="#fff" font-size="12" text-anchor="middle">Runtime (You)</text>
            <rect x="230" y="155" width="160" height="32" rx="4" fill="#3b82f6"/><text x="310" y="176" fill="#fff" font-size="12" text-anchor="middle">Runtime (You)</text>
            <rect x="410" y="155" width="160" height="32" rx="4" fill="#334155"/><text x="490" y="176" fill="#94a3b8" font-size="12" text-anchor="middle">Runtime (Provider)</text>
            <rect x="590" y="155" width="160" height="32" rx="4" fill="#334155"/><text x="670" y="176" fill="#94a3b8" font-size="12" text-anchor="middle">Runtime (Provider)</text>

            <!-- Operating System -->
            <rect x="50" y="195" width="160" height="32" rx="4" fill="#3b82f6"/><text x="130" y="216" fill="#fff" font-size="12" text-anchor="middle">Operating System (You)</text>
            <rect x="230" y="195" width="160" height="32" rx="4" fill="#3b82f6"/><text x="310" y="216" fill="#fff" font-size="12" text-anchor="middle">Operating System (You)</text>
            <rect x="410" y="195" width="160" height="32" rx="4" fill="#334155"/><text x="490" y="216" fill="#94a3b8" font-size="12" text-anchor="middle">OS (Provider)</text>
            <rect x="590" y="195" width="160" height="32" rx="4" fill="#334155"/><text x="670" y="216" fill="#94a3b8" font-size="12" text-anchor="middle">OS (Provider)</text>

            <!-- Virtualization & Servers -->
            <rect x="50" y="235" width="160" height="32" rx="4" fill="#3b82f6"/><text x="130" y="256" fill="#fff" font-size="12" text-anchor="middle">Virtualization (You)</text>
            <rect x="230" y="235" width="160" height="32" rx="4" fill="#334155"/><text x="310" y="256" fill="#94a3b8" font-size="12" text-anchor="middle">Virtualization (AWS)</text>
            <rect x="410" y="235" width="160" height="32" rx="4" fill="#334155"/><text x="490" y="256" fill="#94a3b8" font-size="12" text-anchor="middle">Virtualization (AWS)</text>
            <rect x="590" y="235" width="160" height="32" rx="4" fill="#334155"/><text x="670" y="256" fill="#94a3b8" font-size="12" text-anchor="middle">Virtualization (Provider)</text>

            <!-- Physical Hardware, Power & Storage -->
            <rect x="50" y="275" width="160" height="32" rx="4" fill="#3b82f6"/><text x="130" y="296" fill="#fff" font-size="12" text-anchor="middle">Hardware & Cables (You)</text>
            <rect x="230" y="275" width="160" height="32" rx="4" fill="#334155"/><text x="310" y="296" fill="#94a3b8" font-size="12" text-anchor="middle">Hardware & Data Center (AWS)</text>
            <rect x="410" y="275" width="160" height="32" rx="4" fill="#334155"/><text x="490" y="296" fill="#94a3b8" font-size="12" text-anchor="middle">Hardware & Data Center (AWS)</text>
            <rect x="590" y="275" width="160" height="32" rx="4" fill="#334155"/><text x="670" y="296" fill="#94a3b8" font-size="12" text-anchor="middle">Hardware & Data Center (Provider)</text>

            <!-- Legend -->
            <rect x="240" y="335" width="16" height="16" rx="3" fill="#3b82f6"/>
            <text x="265" y="348" fill="#f8fafc" font-size="12">Managed by Customer (You)</text>

            <rect x="460" y="335" width="16" height="16" rx="3" fill="#334155"/>
            <text x="485" y="348" fill="#94a3b8" font-size="12">Managed by Cloud Provider</text>
          </svg>
        </div>
      `;
    }
  },

  {
    id: "diag-aws-vpc",
    title: "2. AWS Virtual Private Cloud (VPC) Network Architecture",
    description: "Production 2-tier AWS VPC network layout showing Internet Gateway, Public Subnet, NAT Gateway, Private Subnet, Route Tables, and Database instances.",
    render() {
      return `
        <div style="width: 100%; overflow-x: auto; padding: 1rem 0;">
          <svg viewBox="0 0 840 460" style="width: 100%; min-width: 700px; height: auto; font-family: var(--font-sans);">
            <!-- VPC Outer Box -->
            <rect x="40" y="20" width="760" height="420" rx="14" fill="#0b1329" stroke="#6366f1" stroke-width="2" stroke-dasharray="6,4"/>
            <text x="65" y="50" fill="#818cf8" font-size="14" font-weight="700">AWS Cloud — Custom VPC: 10.0.0.0/16 (us-east-1)</text>

            <!-- Internet Gateway -->
            <rect x="340" y="30" width="160" height="40" rx="8" fill="#ff9900" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="420" y="55" fill="#000" font-size="12" font-weight="800" text-anchor="middle">Internet Gateway (IGW)</text>

            <!-- Line from IGW to Public Subnet -->
            <line x1="420" y1="70" x2="420" y2="105" stroke="#f59e0b" stroke-width="2"/>

            <!-- PUBLIC SUBNET -->
            <rect x="70" y="105" width="700" height="135" rx="10" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1.5"/>
            <text x="90" y="130" fill="#34d399" font-size="13" font-weight="700">PUBLIC SUBNET (10.0.1.0/24) — Direct route to 0.0.0.0/0 via IGW</text>

            <!-- ALB in Public Subnet -->
            <rect x="110" y="150" width="260" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="240" y="180" fill="#38bdf8" font-size="13" font-weight="700" text-anchor="middle">Application Load Balancer</text>
            <text x="240" y="200" fill="#94a3b8" font-size="11" text-anchor="middle">Port 80 (HTTP) & 443 (HTTPS)</text>

            <!-- NAT Gateway in Public Subnet -->
            <rect x="470" y="150" width="260" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="600" y="180" fill="#f59e0b" font-size="13" font-weight="700" text-anchor="middle">Managed NAT Gateway</text>
            <text x="600" y="200" fill="#94a3b8" font-size="11" text-anchor="middle">Elastic IP: 54.210.15.22</text>

            <!-- Arrow from Public to Private -->
            <line x1="240" y1="220" x2="240" y2="280" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
            <line x1="600" y1="280" x2="600" y2="220" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4"/>

            <!-- PRIVATE SUBNET -->
            <rect x="70" y="280" width="700" height="140" rx="10" fill="rgba(244, 63, 94, 0.08)" stroke="#f43f5e" stroke-width="1.5"/>
            <text x="90" y="305" fill="#fb7185" font-size="13" font-weight="700">PRIVATE SUBNET (10.0.2.0/24) — No direct inbound Internet access!</text>

            <!-- EC2 App Server in Private -->
            <rect x="110" y="325" width="260" height="75" rx="8" fill="#1e293b" stroke="#818cf8" stroke-width="1.5"/>
            <text x="240" y="355" fill="#818cf8" font-size="13" font-weight="700" text-anchor="middle">EC2 Web/API Servers</text>
            <text x="240" y="375" fill="#94a3b8" font-size="11" text-anchor="middle">Private IP: 10.0.2.45 (Port 8000)</text>

            <!-- RDS Postgres in Private -->
            <rect x="470" y="325" width="260" height="75" rx="8" fill="#1e293b" stroke="#34d399" stroke-width="1.5"/>
            <text x="600" y="355" fill="#34d399" font-size="13" font-weight="700" text-anchor="middle">Amazon RDS PostgreSQL</text>
            <text x="600" y="375" fill="#94a3b8" font-size="11" text-anchor="middle">Port 5432 (Multi-AZ Replica)</text>
          </svg>
        </div>
      `;
    }
  },

  {
    id: "diag-docker-arch",
    title: "3. Docker Engine Internal Architecture",
    description: "Detailed architecture of the Docker Client (CLI), Docker Daemon (dockerd), Containerd runtime, Namespaces, cgroups, and Docker Hub registry.",
    render() {
      return `
        <div style="width: 100%; overflow-x: auto; padding: 1rem 0;">
          <svg viewBox="0 0 800 340" style="width: 100%; min-width: 650px; height: auto; font-family: var(--font-sans);">
            <!-- Client -->
            <rect x="40" y="40" width="180" height="260" rx="12" fill="#111827" stroke="#38bdf8" stroke-width="2"/>
            <text x="130" y="75" fill="#38bdf8" font-size="15" font-weight="800" text-anchor="middle">DOCKER CLIENT</text>
            <rect x="55" y="105" width="150" height="35" rx="6" fill="#1e293b"/><text x="130" y="127" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">docker build</text>
            <rect x="55" y="155" width="150" height="35" rx="6" fill="#1e293b"/><text x="130" y="177" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">docker run</text>
            <rect x="55" y="205" width="150" height="35" rx="6" fill="#1e293b"/><text x="130" y="227" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">docker pull</text>

            <!-- Arrows -->
            <line x1="220" y1="170" x2="270" y2="170" stroke="#38bdf8" stroke-width="2"/>
            <text x="245" y="160" fill="#94a3b8" font-size="10" text-anchor="middle">REST API</text>

            <!-- Daemon Host -->
            <rect x="270" y="40" width="300" height="260" rx="12" fill="#0d1424" stroke="#0db7ed" stroke-width="2"/>
            <text x="420" y="75" fill="#0db7ed" font-size="15" font-weight="800" text-anchor="middle">DOCKER DAEMON (dockerd)</text>

            <rect x="290" y="100" width="260" height="75" rx="8" fill="#1e293b" stroke="rgba(255,255,255,0.1)"/>
            <text x="420" y="125" fill="#f8fafc" font-size="12" font-weight="700" text-anchor="middle">Local Images Cache</text>
            <text x="420" y="148" fill="#94a3b8" font-size="11" text-anchor="middle">nginx:alpine • python:3.11 • postgres:15</text>

            <rect x="290" y="195" width="260" height="85" rx="8" fill="#1e293b" stroke="rgba(255,255,255,0.1)"/>
            <text x="420" y="220" fill="#10b981" font-size="12" font-weight="700" text-anchor="middle">Isolated Running Containers</text>
            <text x="420" y="242" fill="#94a3b8" font-size="11" text-anchor="middle">Namespaces (PID, NET, IPC, MNT)</text>
            <text x="420" y="262" fill="#94a3b8" font-size="11" text-anchor="middle">Control Groups (cgroups CPU/RAM limits)</text>

            <!-- Registry -->
            <line x1="570" y1="170" x2="620" y2="170" stroke="#0db7ed" stroke-width="2"/>
            <rect x="620" y="40" width="150" height="260" rx="12" fill="#111827" stroke="#ff9900" stroke-width="2"/>
            <text x="695" y="75" fill="#ff9900" font-size="14" font-weight="800" text-anchor="middle">REGISTRY</text>
            <text x="695" y="140" fill="#f8fafc" font-size="12" text-anchor="middle">Docker Hub</text>
            <text x="695" y="175" fill="#94a3b8" font-size="11" text-anchor="middle">Amazon ECR</text>
            <text x="695" y="210" fill="#94a3b8" font-size="11" text-anchor="middle">GitHub Packages</text>
          </svg>
        </div>
      `;
    }
  },

  {
    id: "diag-k8s-arch",
    title: "4. Kubernetes Cluster Architecture (Master & Worker Nodes)",
    description: "The complete Kubernetes control plane (API Server, etcd, Scheduler, Controller Manager) and Worker Node pods running Kubelet and Kube-proxy.",
    render() {
      return `
        <div style="width: 100%; overflow-x: auto; padding: 1rem 0;">
          <svg viewBox="0 0 820 400" style="width: 100%; min-width: 680px; height: auto; font-family: var(--font-sans);">
            <!-- Master Control Plane -->
            <rect x="30" y="20" width="760" height="150" rx="12" fill="#0f172a" stroke="#326ce5" stroke-width="2"/>
            <text x="55" y="48" fill="#326ce5" font-size="15" font-weight="800">KUBERNETES CONTROL PLANE (The Brain)</text>

            <rect x="60" y="65" width="160" height="80" rx="8" fill="#1e293b" stroke="#38bdf8"/>
            <text x="140" y="100" fill="#38bdf8" font-size="13" font-weight="700" text-anchor="middle">kube-apiserver</text>
            <text x="140" y="122" fill="#94a3b8" font-size="10" text-anchor="middle">Central REST Gateway</text>

            <rect x="250" y="65" width="140" height="80" rx="8" fill="#1e293b" stroke="#f59e0b"/>
            <text x="320" y="100" fill="#f59e0b" font-size="13" font-weight="700" text-anchor="middle">etcd</text>
            <text x="320" y="122" fill="#94a3b8" font-size="10" text-anchor="middle">Key-Value Database</text>

            <rect x="420" y="65" width="160" height="80" rx="8" fill="#1e293b" stroke="#10b981"/>
            <text x="500" y="100" fill="#10b981" font-size="13" font-weight="700" text-anchor="middle">kube-scheduler</text>
            <text x="500" y="122" fill="#94a3b8" font-size="10" text-anchor="middle">Assigns Pods to Nodes</text>

            <rect x="610" y="65" width="160" height="80" rx="8" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="690" y="100" fill="#a78bfa" font-size="12" font-weight="700" text-anchor="middle">controller-manager</text>
            <text x="690" y="122" fill="#94a3b8" font-size="10" text-anchor="middle">Self-Healing & Replicas</text>

            <!-- Downward Connectors -->
            <line x1="250" y1="170" x2="250" y2="210" stroke="#326ce5" stroke-width="2"/>
            <line x1="570" y1="170" x2="570" y2="210" stroke="#326ce5" stroke-width="2"/>

            <!-- Worker Node 1 -->
            <rect x="30" y="210" width="360" height="170" rx="12" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
            <text x="55" y="235" fill="#f8fafc" font-size="13" font-weight="700">WORKER NODE 1 (Linux Server)</text>
            <rect x="50" y="250" width="150" height="40" rx="6" fill="#1e293b"/><text x="125" y="275" fill="#38bdf8" font-size="12" text-anchor="middle">Kubelet (Agent)</text>
            <rect x="220" y="250" width="150" height="40" rx="6" fill="#1e293b"/><text x="295" y="275" fill="#f59e0b" font-size="12" text-anchor="middle">Kube-Proxy</text>
            <rect x="50" y="305" width="320" height="60" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981"/>
            <text x="210" y="340" fill="#34d399" font-size="12" font-weight="700" text-anchor="middle">Pod: App Container [nginx]</text>

            <!-- Worker Node 2 -->
            <rect x="430" y="210" width="360" height="170" rx="12" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
            <text x="455" y="235" fill="#f8fafc" font-size="13" font-weight="700">WORKER NODE 2 (Linux Server)</text>
            <rect x="450" y="250" width="150" height="40" rx="6" fill="#1e293b"/><text x="525" y="275" fill="#38bdf8" font-size="12" text-anchor="middle">Kubelet (Agent)</text>
            <rect x="620" y="250" width="150" height="40" rx="6" fill="#1e293b"/><text x="695" y="275" fill="#f59e0b" font-size="12" text-anchor="middle">Kube-Proxy</text>
            <rect x="450" y="305" width="320" height="60" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981"/>
            <text x="610" y="340" fill="#34d399" font-size="12" font-weight="700" text-anchor="middle">Pod: App Container [nginx]</text>
          </svg>
        </div>
      `;
    }
  },

  {
    id: "diag-cicd-pipeline",
    title: "5. Complete CI/CD Automated Pipeline Stages",
    description: "End-to-end continuous integration and deployment stages: Source Code, Unit Testing, Static Code Quality, Container Packaging, Staging Deploy, and Production Rollout.",
    render() {
      return `
        <div style="width: 100%; overflow-x: auto; padding: 1rem 0;">
          <svg viewBox="0 0 840 220" style="width: 100%; min-width: 700px; height: auto; font-family: var(--font-sans);">
            <!-- Stage 1: Commit -->
            <rect x="20" y="60" width="115" height="100" rx="10" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
            <text x="77" y="95" fill="#818cf8" font-size="12" font-weight="700" text-anchor="middle">1. SOURCE</text>
            <text x="77" y="120" fill="#f8fafc" font-size="11" text-anchor="middle">git push</text>
            <text x="77" y="140" fill="#94a3b8" font-size="10" text-anchor="middle">main branch</text>

            <line x1="135" y1="110" x2="160" y2="110" stroke="#6366f1" stroke-width="2"/>

            <!-- Stage 2: Test -->
            <rect x="160" y="60" width="115" height="100" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="217" y="95" fill="#38bdf8" font-size="12" font-weight="700" text-anchor="middle">2. TEST</text>
            <text x="217" y="120" fill="#f8fafc" font-size="11" text-anchor="middle">Pytest</text>
            <text x="217" y="140" fill="#94a3b8" font-size="10" text-anchor="middle">90% Coverage</text>

            <line x1="275" y1="110" x2="300" y2="110" stroke="#38bdf8" stroke-width="2"/>

            <!-- Stage 3: Security & Lint -->
            <rect x="300" y="60" width="115" height="100" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
            <text x="357" y="95" fill="#f59e0b" font-size="12" font-weight="700" text-anchor="middle">3. SECURITY</text>
            <text x="357" y="120" fill="#f8fafc" font-size="11" text-anchor="middle">Trivy & SAST</text>
            <text x="357" y="140" fill="#94a3b8" font-size="10" text-anchor="middle">0 Criticals</text>

            <line x1="415" y1="110" x2="440" y2="110" stroke="#f59e0b" stroke-width="2"/>

            <!-- Stage 4: Package -->
            <rect x="440" y="60" width="115" height="100" rx="10" fill="#1e293b" stroke="#0db7ed" stroke-width="2"/>
            <text x="497" y="95" fill="#0db7ed" font-size="12" font-weight="700" text-anchor="middle">4. PACKAGE</text>
            <text x="497" y="120" fill="#f8fafc" font-size="11" text-anchor="middle">Docker Build</text>
            <text x="497" y="140" fill="#94a3b8" font-size="10" text-anchor="middle">Push to ECR</text>

            <line x1="555" y1="110" x2="580" y2="110" stroke="#0db7ed" stroke-width="2"/>

            <!-- Stage 5: Deploy Staging -->
            <rect x="580" y="60" width="115" height="100" rx="10" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
            <text x="637" y="95" fill="#c084fc" font-size="12" font-weight="700" text-anchor="middle">5. STAGING</text>
            <text x="637" y="120" fill="#f8fafc" font-size="11" text-anchor="middle">Auto Deploy</text>
            <text x="637" y="140" fill="#94a3b8" font-size="10" text-anchor="middle">Integration Tests</text>

            <line x1="695" y1="110" x2="720" y2="110" stroke="#a855f7" stroke-width="2"/>

            <!-- Stage 6: Production -->
            <rect x="720" y="60" width="115" height="100" rx="10" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="2"/>
            <text x="777" y="95" fill="#34d399" font-size="12" font-weight="700" text-anchor="middle">6. PROD</text>
            <text x="777" y="120" fill="#f8fafc" font-size="11" text-anchor="middle">Rolling Update</text>
            <text x="777" y="140" fill="#94a3b8" font-size="10" text-anchor="middle">0 Downtime</text>
          </svg>
        </div>
      `;
    }
  },

  {
    id: "diag-nginx-reverse-proxy",
    title: "6. Nginx Reverse Proxy & Load Balancer Topology",
    description: "How Nginx terminates SSL/TLS, buffers client requests, serves static assets directly from disk, and load-balances across backend application servers.",
    render() {
      return `
        <div style="width: 100%; overflow-x: auto; padding: 1rem 0;">
          <svg viewBox="0 0 800 320" style="width: 100%; min-width: 650px; height: auto; font-family: var(--font-sans);">
            <!-- Internet Clients -->
            <rect x="40" y="110" width="130" height="90" rx="10" fill="#111827" stroke="#38bdf8" stroke-width="2"/>
            <text x="105" y="145" fill="#38bdf8" font-size="13" font-weight="700" text-anchor="middle">Internet Users</text>
            <text x="105" y="170" fill="#94a3b8" font-size="11" text-anchor="middle">HTTPS :443</text>

            <line x1="170" y1="155" x2="250" y2="155" stroke="#38bdf8" stroke-width="2"/>

            <!-- Nginx Reverse Proxy -->
            <rect x="250" y="50" width="240" height="210" rx="12" fill="#0f172a" stroke="#009639" stroke-width="2.5"/>
            <text x="370" y="85" fill="#009639" font-size="16" font-weight="800" text-anchor="middle">NGINX REVERSE PROXY</text>
            <text x="370" y="110" fill="#f8fafc" font-size="11" text-anchor="middle">1. SSL/TLS Termination</text>
            <text x="370" y="135" fill="#f8fafc" font-size="11" text-anchor="middle">2. Gzip Response Compression</text>
            <text x="370" y="160" fill="#f8fafc" font-size="11" text-anchor="middle">3. Rate Limiting (10 req/s)</text>
            <text x="370" y="185" fill="#f8fafc" font-size="11" text-anchor="middle">4. Static File Caching (/static/)</text>
            <text x="370" y="230" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">Least-Connections Load Balancing</text>

            <!-- Lines to backends -->
            <line x1="490" y1="110" x2="570" y2="85" stroke="#009639" stroke-width="2"/>
            <line x1="490" y1="155" x2="570" y2="155" stroke="#009639" stroke-width="2"/>
            <line x1="490" y1="200" x2="570" y2="225" stroke="#009639" stroke-width="2"/>

            <!-- Backend App Servers -->
            <rect x="570" y="55" width="190" height="55" rx="8" fill="#1e293b" stroke="#6366f1"/>
            <text x="665" y="88" fill="#818cf8" font-size="12" font-weight="700" text-anchor="middle">App Instance 1 (:8001)</text>

            <rect x="570" y="125" width="190" height="55" rx="8" fill="#1e293b" stroke="#6366f1"/>
            <text x="665" y="158" fill="#818cf8" font-size="12" font-weight="700" text-anchor="middle">App Instance 2 (:8002)</text>

            <rect x="570" y="195" width="190" height="55" rx="8" fill="#1e293b" stroke="#6366f1"/>
            <text x="665" y="228" fill="#818cf8" font-size="12" font-weight="700" text-anchor="middle">App Instance 3 (:8003)</text>
          </svg>
        </div>
      `;
    }
  },

  {
    id: "diag-terraform-flow",
    title: "7. Terraform Workflow (Code -> Plan -> Apply -> Cloud State)",
    description: "The declarative Terraform cycle: writing HCL, verifying execution plans, provisioning cloud resources, and persisting state locks in S3 + DynamoDB.",
    render() {
      return `
        <div style="width: 100%; overflow-x: auto; padding: 1rem 0;">
          <svg viewBox="0 0 820 280" style="width: 100%; min-width: 680px; height: auto; font-family: var(--font-sans);">
            <!-- Step 1: Write HCL -->
            <rect x="30" y="80" width="150" height="120" rx="10" fill="#1e293b" stroke="#844fba" stroke-width="2"/>
            <text x="105" y="115" fill="#a855f7" font-size="13" font-weight="800" text-anchor="middle">1. WRITE CODE</text>
            <text x="105" y="145" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">main.tf</text>
            <text x="105" y="170" fill="#94a3b8" font-size="10" text-anchor="middle">Declarative HCL</text>

            <line x1="180" y1="140" x2="230" y2="140" stroke="#844fba" stroke-width="2"/>

            <!-- Step 2: terraform plan -->
            <rect x="230" y="80" width="160" height="120" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="310" y="115" fill="#38bdf8" font-size="13" font-weight="800" text-anchor="middle">2. PLAN</text>
            <text x="310" y="145" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">terraform plan</text>
            <text x="310" y="170" fill="#94a3b8" font-size="10" text-anchor="middle">Compares Code vs Cloud</text>

            <line x1="390" y1="140" x2="440" y2="140" stroke="#38bdf8" stroke-width="2"/>

            <!-- Step 3: terraform apply -->
            <rect x="440" y="80" width="160" height="120" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
            <text x="520" y="115" fill="#34d399" font-size="13" font-weight="800" text-anchor="middle">3. APPLY</text>
            <text x="520" y="145" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">terraform apply</text>
            <text x="520" y="170" fill="#94a3b8" font-size="10" text-anchor="middle">Calls Cloud APIs</text>

            <line x1="600" y1="140" x2="650" y2="140" stroke="#10b981" stroke-width="2"/>

            <!-- Step 4: Remote State -->
            <rect x="650" y="80" width="140" height="120" rx="10" fill="#111827" stroke="#ff9900" stroke-width="2"/>
            <text x="720" y="115" fill="#ff9900" font-size="13" font-weight="800" text-anchor="middle">4. STATE</text>
            <text x="720" y="145" fill="#f8fafc" font-size="11" text-anchor="middle">Amazon S3</text>
            <text x="720" y="170" fill="#94a3b8" font-size="10" text-anchor="middle">+ DynamoDB Lock</text>
          </svg>
        </div>
      `;
    }
  },

  {
    id: "diag-devops-lifecycle",
    title: "8. The Complete Infinite DevOps Lifecycle Loop",
    description: "The continuous DevOps loop: Plan -> Code -> Build -> Test -> Release -> Deploy -> Operate -> Monitor -> Feedback loop.",
    render() {
      return `
        <div style="width: 100%; overflow-x: auto; padding: 1rem 0;">
          <svg viewBox="0 0 800 340" style="width: 100%; min-width: 650px; height: auto; font-family: var(--font-sans);">
            <!-- Dev Loop (Left) -->
            <ellipse cx="280" cy="170" rx="160" ry="100" fill="none" stroke="#6366f1" stroke-width="4" stroke-dasharray="8,6"/>
            <text x="180" y="90" fill="#818cf8" font-size="14" font-weight="800">1. PLAN</text>
            <text x="130" y="175" fill="#818cf8" font-size="14" font-weight="800">2. CODE</text>
            <text x="180" y="260" fill="#818cf8" font-size="14" font-weight="800">3. BUILD</text>
            <text x="290" y="275" fill="#818cf8" font-size="14" font-weight="800">4. TEST</text>

            <!-- Ops Loop (Right) -->
            <ellipse cx="520" cy="170" rx="160" ry="100" fill="none" stroke="#10b981" stroke-width="4" stroke-dasharray="8,6"/>
            <text x="490" y="65" fill="#34d399" font-size="14" font-weight="800">5. RELEASE</text>
            <text x="610" y="100" fill="#34d399" font-size="14" font-weight="800">6. DEPLOY</text>
            <text x="640" y="175" fill="#34d399" font-size="14" font-weight="800">7. OPERATE</text>
            <text x="590" y="260" fill="#34d399" font-size="14" font-weight="800">8. MONITOR</text>

            <!-- Center Intersection -->
            <circle cx="400" cy="170" r="38" fill="#111827" stroke="#fbbf24" stroke-width="2.5"/>
            <text x="400" y="175" fill="#fbbf24" font-size="12" font-weight="800" text-anchor="middle">DevOps</text>
          </svg>
        </div>
      `;
    }
  }
];

