/**
 * MLForge Cloud & DevOps Application Bootstrapper & Omnisearch Integrator
 * Populates sidebar syllabus accordion, registers global search keywords and aliases,
 * and maintains active learning stats.
 */

window.MLForge = window.MLForge || {};
window.MLForge.devops = window.MLForge.devops || {};

MLForge.devops.app = (function () {

  function init() {
    initSidebarSyllabus();
    initOmnisearchIntegration();
    updateSidebarCounts();
  }

  function initSidebarSyllabus() {
    const subnavContainer = document.getElementById('devops-topics-subnav');
    const accordionBtn = document.getElementById('devops-topics-accordion-btn');

    if (accordionBtn) {
      accordionBtn.addEventListener('click', () => {
        accordionBtn.classList.toggle('expanded');
        if (subnavContainer) {
          subnavContainer.classList.toggle('expanded');
          subnavContainer.classList.toggle('open');
        }
      });
    }

    if (subnavContainer && MLForge.devops.data && MLForge.devops.data.topics) {
      const topics = MLForge.devops.data.topics;
      subnavContainer.innerHTML = topics.map(t => {
        const isDone = MLForge.devops.storage ? MLForge.devops.storage.isTopicCompleted(t.id) : false;
        return `
          <a href="#devops/topic/${t.id}" class="sidebar-sub-item sidebar-devops-sub-item" data-topic-id="${t.id}" id="devops-subnav-${t.id}">
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${t.title}</span>
            <span style="font-size: 0.65rem; color: ${isDone ? '#10b981' : 'var(--text-muted)'};">${isDone ? '✓' : t.readTime}</span>
          </a>
        `;
      }).join('');
    }
  }

  function updateSidebarCounts() {
    // Refresh checkmarks on subnav
    if (MLForge.devops.data && MLForge.devops.data.topics) {
      MLForge.devops.data.topics.forEach(t => {
        const el = document.getElementById(`devops-subnav-${t.id}`);
        if (el) {
          const isDone = MLForge.devops.storage.isTopicCompleted(t.id);
          const timeSpan = el.querySelector('span:last-child');
          if (timeSpan) {
            timeSpan.textContent = isDone ? '✓' : t.readTime;
            timeSpan.style.color = isDone ? '#10b981' : 'var(--text-muted)';
          }
        }
      });
    }
  }

  function initOmnisearchIntegration() {
    if (!MLForge.search || !MLForge.devops.data) return;

    // Extend search aliases with Cloud & DevOps keywords
    const devopsAliases = {
      'cloud': ['cloud computing', 'aws', 'iaas', 'paas', 'saas', 'serverless', 'datacenter'],
      'aws': ['amazon web services', 'ec2', 's3', 'lambda', 'rds', 'vpc', 'iam', 'cloudfront'],
      'ec2': ['elastic compute cloud', 'virtual machine', 'ami', 'instances', 'aws compute'],
      's3': ['simple storage service', 'bucket', 'object storage', 'glacier', 'aws storage'],
      'lambda': ['serverless', 'faas', 'function as a service', 'event driven', 'aws compute'],
      'vpc': ['virtual private cloud', 'subnets', 'nat gateway', 'internet gateway', 'cidr'],
      'docker': ['container', 'dockerfile', 'docker compose', 'docker daemon', 'images'],
      'containers': ['docker', 'kubernetes', 'cgroups', 'namespaces', 'containerization'],
      'k8s': ['kubernetes', 'pods', 'deployments', 'services', 'kubectl', 'helm', 'ingress'],
      'kubernetes': ['k8s', 'orchestration', 'control plane', 'worker nodes', 'etcd'],
      'kubectl': ['kubernetes cli', 'kubectl get', 'kubectl apply', 'k8s commands'],
      'linux': ['ubuntu', 'bash', 'terminal', 'commands', 'chmod', 'chown', 'systemd'],
      'bash': ['shell scripting', 'pipes', 'redirection', 'cron', 'linux automation'],
      'cicd': ['continuous integration', 'continuous delivery', 'continuous deployment', 'pipelines'],
      'jenkins': ['jenkinsfile', 'declarative pipeline', 'groovy', 'ci cd automation'],
      'github actions': ['workflows', 'actions', 'ci cd', 'yaml', 'matrix builds'],
      'nginx': ['reverse proxy', 'web server', 'load balancer', 'ssl', 'proxy_pass'],
      'terraform': ['iac', 'infrastructure as code', 'hcl', 'terraform plan', 'terraform apply'],
      'iac': ['infrastructure as code', 'terraform', 'cloudformation', 'ansible'],
      'monitoring': ['observability', 'prometheus', 'grafana', 'metrics', 'logs', 'traces', 'alerts'],
      'prometheus': ['metrics', 'promql', 'time series', 'scraping', 'alertmanager'],
      'grafana': ['dashboards', 'visualization', 'observability', 'prometheus alerts'],
      'devsecops': ['shift left', 'security in cicd', 'trivy', 'sast', 'dast', 'vulnerabilities']
    };

    if (MLForge.search.ALIASES) {
      Object.assign(MLForge.search.ALIASES, devopsAliases);
    }

    const originalBuildIndex = MLForge.search.buildIndex;
    MLForge.search.buildIndex = function () {
      if (typeof originalBuildIndex === 'function') {
        originalBuildIndex.apply(this, arguments);
      }

      // 1. Index DevOps Topics
      if (MLForge.devops.data.topics) {
        MLForge.devops.data.topics.forEach(t => {
          this.addItem({
            id: `devops-topic-${t.id}`,
            title: `Cloud & DevOps: ${t.title} (${t.difficulty})`,
            desc: t.summary,
            category: 'DevOps Curriculum',
            link: `#devops/topic/${t.id}`
          });
        });
      }

      // 2. Index Deployment Tutorials
      if (MLForge.devops.data.tutorials) {
        MLForge.devops.data.tutorials.forEach(tut => {
          this.addItem({
            id: `devops-tut-${tut.id}`,
            title: `Deployment: ${tut.title}`,
            desc: tut.summary,
            category: 'DevOps Tutorials',
            link: `#devops/tutorials`
          });
        });
      }

      // 3. Index Practical Projects
      if (MLForge.devops.data.projects) {
        MLForge.devops.data.projects.forEach(p => {
          this.addItem({
            id: `devops-proj-${p.id}`,
            title: `Project: ${p.title} (${p.tier})`,
            desc: p.description,
            category: 'DevOps Projects',
            link: `#devops/projects`
          });
        });
      }

      // 4. Index Calculators
      const calcItems = [
        { id: 'devops-calc-aws', title: 'AWS Monthly Cost Calculator', desc: 'Forecast spend across EC2, S3, RDS, and network data egress', category: 'DevOps Calculators', link: '#devops/calculators' },
        { id: 'devops-calc-storage', title: 'Cloud Storage Tier Cost Calculator', desc: 'Compare S3 Standard vs IA vs Glacier vs Deep Archive', category: 'DevOps Calculators', link: '#devops/calculators' },
        { id: 'devops-calc-ec2', title: 'EC2 Monthly Cost & Savings Calculator', desc: 'Calculate On-Demand vs 1-Yr Reserved vs Spot savings', category: 'DevOps Calculators', link: '#devops/calculators' },
        { id: 'devops-calc-docker', title: 'Docker Host Resource Calculator', desc: 'Calculate CPU and RAM allocation across containers', category: 'DevOps Calculators', link: '#devops/calculators' },
        { id: 'devops-calc-cidr', title: 'CIDR & Subnet Calculator', desc: 'Calculate subnet masks, total IPs, and AWS VPC assignable addresses', category: 'DevOps Calculators', link: '#devops/calculators' },
        { id: 'devops-calc-avail', title: 'High Availability & Downtime Calculator', desc: 'Calculate downtime for 99.9% vs 99.99% SLAs per year and month', category: 'DevOps Calculators', link: '#devops/calculators' }
      ];
      calcItems.forEach(item => this.addItem(item));

      // 5. Index Architecture Diagrams
      if (MLForge.devops.data.diagrams) {
        MLForge.devops.data.diagrams.forEach(d => {
          this.addItem({
            id: `devops-diag-${d.id}`,
            title: `Architecture Diagram: ${d.title}`,
            desc: d.description,
            category: 'DevOps Diagrams',
            link: `#devops/diagrams`
          });
        });
      }

      // 6. Tools shortcuts
      this.addItem({
        id: 'devops-tool-dashboard',
        title: 'Cloud & DevOps Dashboard',
        desc: 'Master Cloud Computing, AWS, Docker, Kubernetes, Linux, and CI/CD',
        category: 'DevOps Tools',
        link: '#devops/dashboard'
      });
      this.addItem({
        id: 'devops-tool-interview',
        title: 'DevOps Interview Questions & MCQs',
        desc: '50+ categorized technical interview questions and scenario troubleshooting tests',
        category: 'DevOps Tools',
        link: '#devops/interview'
      });
      this.addItem({
        id: 'devops-tool-cheatsheets',
        title: 'DevOps Command Cheat Sheets',
        desc: 'Searchable cheat sheets for Linux, Docker, Kubernetes, AWS CLI, Nginx, Terraform',
        category: 'DevOps Tools',
        link: '#devops/cheatsheets'
      });
    };

    // Rebuild index if search is already initialized
    if (typeof MLForge.search.buildIndex === 'function') {
      MLForge.search.buildIndex();
    }
  }

  return {
    init,
    updateSidebarCounts
  };
})();

