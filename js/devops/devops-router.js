/**
 * MLForge Cloud Computing & DevOps View Router & Dynamic Page Renderer
 * Coordinates all views: dashboard, topics, architecture diagrams,
 * deployment tutorials, practical projects, calculators, interview prep,
 * command cheatsheets, and user progress.
 */

window.MLForge = window.MLForge || {};
window.MLForge.devops = window.MLForge.devops || {};

MLForge.devops.router = (function () {
  let contentArea = null;

  function init() {
    contentArea = document.getElementById('content-area');
  }

  function handleRoute(subparts = []) {
    if (!contentArea) contentArea = document.getElementById('content-area');
    const subroute = subparts[0] || 'dashboard';
    const param = subparts[1] || null;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateDevopsSidebarActive(subroute, param);

    // Direct topic shortcut check (e.g. #devops/cloud-fundamentals)
    const topics = (MLForge.devops.data && MLForge.devops.data.topics) ? MLForge.devops.data.topics : [];
    const directMatch = topics.find(t => t.id === subroute);
    if (directMatch) {
      renderTopic(directMatch.id);
      finalizeView();
      return;
    }

    switch (subroute) {
      case 'dashboard':
        renderDashboard();
        break;
      case 'topic':
        renderTopic(param || 'cloud-fundamentals');
        break;
      case 'diagrams':
        renderDiagrams(param);
        break;
      case 'tutorials':
        renderTutorials(param);
        break;
      case 'projects':
        renderProjects(param);
        break;
      case 'calculators':
        renderCalculators(param);
        break;
      case 'interview':
        renderInterview(param);
        break;
      case 'cheatsheets':
        renderCheatsheets();
        break;
      case 'progress':
        renderProgress();
        break;
      default:
        renderDashboard();
        break;
    }

    finalizeView();
  }

  function finalizeView() {
    MLForge.ui.updateContextPanel();
    if (window.MLForge && window.MLForge.math && contentArea) {
      window.MLForge.math.render(contentArea);
    }
  }

  function updateDevopsSidebarActive(subroute, param) {
    document.querySelectorAll('.sidebar-sub-item, .nav-item').forEach(el => {
      el.classList.remove('active');
    });

    const routeMap = {
      'dashboard': 'nav-devops-dashboard',
      'diagrams': 'nav-devops-diagrams',
      'tutorials': 'nav-devops-tutorials',
      'projects': 'nav-devops-projects',
      'calculators': 'nav-devops-calculators',
      'interview': 'nav-devops-interview',
      'cheatsheets': 'nav-devops-cheatsheets',
      'progress': 'nav-devops-progress'
    };

    const targetId = routeMap[subroute];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) el.classList.add('active');
    }

    if (subroute === 'topic' || (MLForge.devops.data && MLForge.devops.data.topics && MLForge.devops.data.topics.some(t => t.id === subroute))) {
      const topicId = param || subroute;
      const subItem = document.querySelector(`.sidebar-devops-sub-item[data-topic-id="${topicId}"]`);
      if (subItem) subItem.classList.add('active');
    }
  }

  // =========================================================================
  // VIEW 1: DASHBOARD
  // =========================================================================
  function renderDashboard() {
    const topics = (MLForge.devops.data && MLForge.devops.data.topics) ? MLForge.devops.data.topics : [];
    const projects = (MLForge.devops.data && MLForge.devops.data.projects) ? MLForge.devops.data.projects : [];
    const stats = MLForge.devops.storage.getStats(topics.length, projects.length);
    const lastTopic = stats.lastTopic || topics[0];

    contentArea.innerHTML = `
      <!-- Hero Banner -->
      <section class="devops-hero">
        <div class="devops-hero-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          Industry Cloud & DevOps Platform
        </div>
        <h1 class="devops-hero-title">Cloud Computing & <span>DevOps</span></h1>
        <p class="devops-hero-desc">
          Master cloud computing, infrastructure automation, Docker containers, Kubernetes clusters, and CI/CD pipelines from absolute scratch in simple, beginner-friendly English.
        </p>
        <div class="devops-hero-actions">
          <a href="#devops/topic/${lastTopic.id}" class="btn btn-primary" style="background: var(--color-devops-primary); color: white;">
            <span>Continue Learning: ${lastTopic.title}</span>
          </a>
          <a href="#devops/diagrams" class="btn btn-secondary">Architecture Diagrams (15)</a>
          <a href="#devops/tutorials" class="btn btn-secondary">Deployment Tutorials (12)</a>
          <a href="#devops/projects" class="btn btn-secondary">Practical Projects (21)</a>
          <a href="#devops/calculators" class="btn btn-secondary">Cloud Calculators (10)</a>
          <a href="#devops/interview" class="btn btn-secondary">Interview Prep</a>
          <a href="#devops/cheatsheets" class="btn btn-secondary">Cheat Sheets</a>
        </div>
      </section>

      <!-- Stats Grid -->
      <section class="devops-stats-grid">
        <div class="devops-stat-card">
          <div class="devops-stat-val" style="color: var(--color-devops-primary);">${stats.completedTopicsCount} / ${stats.totalTopics}</div>
          <div class="devops-stat-label">Topics Completed</div>
          <div class="devops-progress-bar-wrap">
            <div class="devops-progress-bar-fill" style="width: ${stats.progressPercent}%;"></div>
          </div>
        </div>

        <div class="devops-stat-card">
          <div class="devops-stat-val" style="color: #10b981;">${stats.completedProjectsCount} / ${stats.totalProjects}</div>
          <div class="devops-stat-label">Projects Built</div>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;">${stats.totalProjects - stats.completedProjectsCount} remaining</span>
        </div>

        <div class="devops-stat-card">
          <div class="devops-stat-val" style="color: #f59e0b;">${stats.bookmarksCount}</div>
          <div class="devops-stat-label">Saved Bookmarks</div>
          <a href="#devops/progress" style="font-size: 0.75rem; color: var(--color-devops-primary); margin-top: 0.5rem;">View saved topics &rarr;</a>
        </div>

        <div class="devops-stat-card">
          <div class="devops-stat-val" style="color: #38bdf8;">${stats.progressPercent}%</div>
          <div class="devops-stat-label">DevOps Mastery</div>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;">Beginner to Advanced Path</span>
        </div>
      </section>

      <!-- Search & Filters -->
      <section style="margin-bottom: 2rem;">
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; align-items: center; justify-content: space-between;">
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main);">Curriculum Topics (${topics.length})</h2>
          <div style="position: relative; max-width: 320px; width: 100%;">
            <input type="text" id="devops-topic-search-input" placeholder="Search Docker, AWS, K8s, Linux..." style="width: 100%; padding: 0.55rem 0.85rem 0.55rem 2.25rem; background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--radius-md); color: var(--text-main); font-size: 0.85rem; outline: none;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
        </div>

        <!-- Filter tabs -->
        <div class="devops-filter-tabs" id="devops-category-filter-tabs">
          <button class="devops-filter-btn active" data-cat="all">All Topics</button>
          <button class="devops-filter-btn" data-cat="Cloud Fundamentals">Cloud Fundamentals</button>
          <button class="devops-filter-btn" data-cat="AWS Services">AWS</button>
          <button class="devops-filter-btn" data-cat="Docker & Containers">Docker</button>
          <button class="devops-filter-btn" data-cat="Kubernetes">Kubernetes</button>
          <button class="devops-filter-btn" data-cat="Linux & Scripting">Linux</button>
          <button class="devops-filter-btn" data-cat="CI/CD & Automation">CI/CD</button>
          <button class="devops-filter-btn" data-cat="Infrastructure as Code">Terraform</button>
          <button class="devops-filter-btn" data-cat="Monitoring & Observability">Monitoring</button>
        </div>

        <!-- Topic Cards Grid -->
        <div class="devops-roadmap-grid" id="devops-topics-grid">
          ${renderTopicCards(topics)}
        </div>
      </section>
    `;

    bindDashboardEvents();
  }

  function renderTopicCards(topicsList) {
    return topicsList.map(t => {
      const isCompleted = MLForge.devops.storage.isTopicCompleted(t.id);
      const isBookmarked = MLForge.devops.storage.isBookmarked(t.id);
      const diffClass = t.difficulty === 'Beginner' ? 'devops-badge-diff-beginner' : (t.difficulty === 'Intermediate' ? 'devops-badge-diff-intermediate' : 'devops-badge-diff-advanced');

      return `
        <div class="devops-roadmap-card" data-topic-id="${t.id}" data-category="${t.category}">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span class="${diffClass}">${t.difficulty}</span>
              <div style="display: flex; align-items: center; gap: 0.4rem;">
                <span style="font-size: 0.75rem; color: var(--text-muted);">⏱ ${t.readTime}</span>
                <button class="btn-icon-only devops-card-bkmk" data-id="${t.id}" data-title="${t.title}" data-category="${t.category}" style="font-size: 0.85rem; padding: 2px;">
                  ${isBookmarked ? '★' : '☆'}
                </button>
              </div>
            </div>
            <a href="#devops/topic/${t.id}" style="text-decoration: none;">
              <h3 class="devops-roadmap-title">${t.title}</h3>
              <p class="devops-roadmap-desc">${t.summary}</p>
            </a>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle);">
            <span class="devops-badge-primary" style="font-size: 0.7rem;">${t.category}</span>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              ${isCompleted ? '<span style="font-size: 0.75rem; color: #10b981; font-weight: 700;">Completed ✓</span>' : ''}
              <a href="#devops/topic/${t.id}" style="color: var(--color-devops-primary); font-size: 0.8rem; font-weight: 600; text-decoration: none;">Start &rarr;</a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function bindDashboardEvents() {
    // Topic search input
    const searchInput = document.getElementById('devops-topic-search-input');
    const topicsGrid = document.getElementById('devops-topics-grid');

    if (searchInput && topicsGrid) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const cards = topicsGrid.querySelectorAll('.devops-roadmap-card');
        cards.forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(query) ? 'flex' : 'none';
        });
      });
    }

    // Category filter pills
    const tabs = document.querySelectorAll('#devops-category-filter-tabs .devops-filter-btn');
    if (tabs.length && topicsGrid) {
      tabs.forEach(btn => {
        btn.addEventListener('click', () => {
          tabs.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const cat = btn.getAttribute('data-cat');
          const cards = topicsGrid.querySelectorAll('.devops-roadmap-card');
          cards.forEach(card => {
            if (cat === 'all') {
              card.style.display = 'flex';
            } else {
              const cardCat = card.getAttribute('data-category');
              card.style.display = (cardCat && cardCat.includes(cat)) ? 'flex' : 'none';
            }
          });
        });
      });
    }

    // Bookmark clicks on cards
    document.querySelectorAll('.devops-card-bkmk').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const title = btn.getAttribute('data-title');
        const category = btn.getAttribute('data-category');
        const added = MLForge.devops.storage.toggleBookmark({ id, title, category });
        btn.textContent = added ? '★' : '☆';
        MLForge.ui.showToast(added ? 'Saved to bookmarks!' : 'Bookmark removed.', 'info');
      });
    });
  }

  // =========================================================================
  // VIEW 2: TOPIC LESSON VIEW
  // =========================================================================
  function renderTopic(topicId) {
    const topics = (MLForge.devops.data && MLForge.devops.data.topics) ? MLForge.devops.data.topics : [];
    const topic = topics.find(t => t.id === topicId) || topics[0];

    MLForge.devops.storage.setLastTopic(topic);

    const isCompleted = MLForge.devops.storage.isTopicCompleted(topic.id);
    const isBookmarked = MLForge.devops.storage.isBookmarked(topic.id);

    const currIdx = topics.findIndex(t => t.id === topic.id);
    const prevTopic = currIdx > 0 ? topics[currIdx - 1] : null;
    const nextTopic = currIdx < topics.length - 1 ? topics[currIdx + 1] : null;

    const diffClass = topic.difficulty === 'Beginner' ? 'devops-badge-diff-beginner' : (topic.difficulty === 'Intermediate' ? 'devops-badge-diff-intermediate' : 'devops-badge-diff-advanced');

    contentArea.innerHTML = `
      <div class="devops-topic-view">
        <!-- Breadcrumbs -->
        <nav class="devops-breadcrumb" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.4rem;">
          <a href="#devops/dashboard" style="color: var(--text-muted); text-decoration: none;">Cloud &amp; DevOps</a>
          <span>/</span>
          <span style="color: var(--color-devops-primary);">${topic.category}</span>
          <span>/</span>
          <span style="color: var(--text-main); font-weight: 500;">${topic.title}</span>
        </nav>

        <!-- Topic Header -->
        <div class="devops-topic-header">
          <div class="devops-topic-meta">
            <span class="devops-badge-primary">${topic.category}</span>
            <span class="${diffClass}">${topic.difficulty}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">⏱ ${topic.readTime}</span>
            
            <button class="btn btn-secondary btn-sm" id="devops-topic-bookmark-btn" style="padding: 0.25rem 0.65rem;">
              <span>${isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}</span>
            </button>
            <button class="btn btn-secondary btn-sm" id="devops-topic-complete-btn" style="padding: 0.25rem 0.65rem; ${isCompleted ? 'border-color: #10b981; color: #10b981;' : ''}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <span>${isCompleted ? 'Completed ✓' : 'Mark Completed'}</span>
            </button>
          </div>
          <h1 style="font-size: 2.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; letter-spacing: -0.02em;">${topic.title}</h1>
          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6;">${topic.summary}</p>
        </div>

        <!-- Topic Content Body -->
        <div class="devops-topic-body">
          ${topic.content}
        </div>

        <!-- Bottom Navigation: Prev / Next -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle); flex-wrap: wrap; gap: 1rem;">
          ${prevTopic ? `
            <a href="#devops/topic/${prevTopic.id}" class="btn btn-secondary" style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
              <div style="text-align: left;">
                <div style="font-size: 0.7rem; color: var(--text-muted);">Previous Lesson</div>
                <div style="font-weight: 600;">${prevTopic.title}</div>
              </div>
            </a>
          ` : '<div></div>'}

          ${nextTopic ? `
            <a href="#devops/topic/${nextTopic.id}" class="btn btn-primary" style="background: var(--color-devops-primary); color: white; display: flex; align-items: center; gap: 0.5rem; text-decoration: none;">
              <div style="text-align: right;">
                <div style="font-size: 0.7rem; color: rgba(255, 255, 255, 0.8);">Next Lesson</div>
                <div style="font-weight: 600;">${nextTopic.title}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
          ` : `
            <a href="#devops/projects" class="btn btn-primary" style="background: var(--color-devops-primary); color: white; text-decoration: none;">Hands-on Projects &rarr;</a>
          `}
        </div>
      </div>
    `;

    // Completion button
    const compBtn = document.getElementById('devops-topic-complete-btn');
    if (compBtn) {
      compBtn.addEventListener('click', () => {
        const completed = MLForge.devops.storage.toggleTopicCompleted(topic.id);
        MLForge.ui.showToast(completed ? 'Topic marked completed!' : 'Marked incomplete.', 'info');
        renderTopic(topic.id);
        if (MLForge.devops.app) MLForge.devops.app.updateSidebarCounts();
      });
    }

    // Bookmark button
    const bkmkBtn = document.getElementById('devops-topic-bookmark-btn');
    if (bkmkBtn) {
      bkmkBtn.addEventListener('click', () => {
        const added = MLForge.devops.storage.toggleBookmark(topic);
        MLForge.ui.showToast(added ? 'Saved to bookmarks!' : 'Bookmark removed.', 'info');
        renderTopic(topic.id);
      });
    }
  }

  // =========================================================================
  // VIEW 3: ARCHITECTURE DIAGRAMS (15 Visual Diagrams)
  // =========================================================================
  function renderDiagrams(activeId) {
    const diagrams = (MLForge.devops.data && MLForge.devops.data.diagrams) ? MLForge.devops.data.diagrams : [];
    
    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <div class="devops-hero-badge">Visual Architecture Laboratory</div>
        <h1 style="font-size: 2.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">Cloud & DevOps Architecture Diagrams</h1>
        <p style="color: var(--text-secondary); max-width: 800px;">
          Explore interactive, technical architecture diagrams explaining how modern distributed cloud systems, containers, networks, and automated CI/CD pipelines connect.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 2.5rem;">
        ${diagrams.map(d => `
          <div class="devops-calc-card" id="${d.id}">
            <div class="devops-diagram-title" style="font-size: 1.2rem; color: var(--text-main);">
              ${d.title}
            </div>
            <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1.25rem;">${d.description}</p>
            <div class="devops-diagram-container" style="background: var(--bg-app); border: 1px solid var(--border-card);">
              ${d.render()}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // VIEW 4: DEPLOYMENT TUTORIALS (12 Tutorials)
  // =========================================================================
  function renderTutorials(activeId) {
    const tutorials = (MLForge.devops.data && MLForge.devops.data.tutorials) ? MLForge.devops.data.tutorials : [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <div class="devops-hero-badge">Production Deployment Blueprints</div>
        <h1 style="font-size: 2.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">Real-World Deployment Tutorials</h1>
        <p style="color: var(--text-secondary); max-width: 800px;">
          Complete step-by-step production tutorials for deploying Django, FastAPI, React, Docker, Kubernetes, and automated CI/CD pipelines without fake credentials or hardcoded secrets.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 2.5rem;">
        ${tutorials.map(tut => `
          <div class="devops-calc-card" id="${tut.id}">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
              <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main);">${tut.title}</h2>
              <div style="display: flex; gap: 0.5rem;">
                <span class="devops-badge-primary">${tut.category}</span>
                <span style="font-size: 0.8rem; color: var(--text-muted);">⏱ ${tut.time}</span>
              </div>
            </div>
            <p style="font-size: 0.925rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.6;">${tut.summary}</p>
            
            <div class="devops-card-callout" style="margin: 0.75rem 0 1.25rem 0;">
              <strong>Architecture Flow:</strong> <code>${tut.architecture}</code><br>
              <strong>Tools Required:</strong> ${tut.tools.map(t => `<span class="devops-badge-primary" style="margin-right: 4px; font-size: 0.75rem;">${t}</span>`).join('')}
            </div>

            <!-- Steps -->
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              ${tut.steps.map(s => `
                <div style="background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem 1.25rem;">
                  <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">Step ${s.step}: ${s.title}</h3>
                  <div style="font-size: 0.9rem; line-height: 1.6;">${s.content}</div>
                </div>
              `).join('')}
            </div>

            <!-- Common Errors -->
            ${tut.commonErrors && tut.commonErrors.length ? `
              <div style="margin-top: 1.5rem;">
                <h4 style="font-size: 0.95rem; font-weight: 700; color: #fb7185; margin-bottom: 0.75rem;">⚠️ Common Troubleshooting & Solutions:</h4>
                ${tut.commonErrors.map(err => `
                  <div class="devops-card-warning" style="margin: 0.5rem 0;">
                    <strong>Error:</strong> <code>${err.error}</code><br>
                    <strong>Cause:</strong> ${err.cause}<br>
                    <strong>Solution:</strong> ${err.fix}
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // VIEW 5: PRACTICAL PROJECTS (21 Projects)
  // =========================================================================
  function renderProjects(activeId) {
    const projects = (MLForge.devops.data && MLForge.devops.data.projects) ? MLForge.devops.data.projects : [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <div class="devops-hero-badge">Portfolio & Resume Builders</div>
        <h1 style="font-size: 2.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">Hands-on Cloud & DevOps Projects (21)</h1>
        <p style="color: var(--text-secondary); max-width: 800px;">
          Build real-world industry projects with full architecture blueprints, folder structures, configuration files, commands, testing procedures, and ready-to-use resume bullet points.
        </p>
      </div>

      <div class="devops-filter-tabs" id="devops-project-tier-tabs">
        <button class="devops-filter-btn active" data-tier="all">All Projects (21)</button>
        <button class="devops-filter-btn" data-tier="Beginner">Beginner Projects (5)</button>
        <button class="devops-filter-btn" data-tier="Intermediate">Intermediate Projects (8)</button>
        <button class="devops-filter-btn" data-tier="Advanced">Advanced Projects (8)</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 2rem;" id="devops-projects-container">
        ${projects.map(p => {
          const isDone = MLForge.devops.storage.isProjectCompleted(p.id);
          const diffClass = p.tier === 'Beginner' ? 'devops-badge-diff-beginner' : (p.tier === 'Intermediate' ? 'devops-badge-diff-intermediate' : 'devops-badge-diff-advanced');

          return `
            <div class="devops-calc-card" data-tier="${p.tier}" id="${p.id}">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
                    <span class="${diffClass}">${p.tier}</span>
                    <span class="devops-badge-primary">${p.category}</span>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">⏱ ${p.time}</span>
                  </div>
                  <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main);">${p.title}</h2>
                </div>
                <button class="btn btn-secondary btn-sm devops-proj-toggle-btn" data-id="${p.id}" style="${isDone ? 'border-color: #10b981; color: #10b981;' : ''}">
                  ${isDone ? 'Completed ✓' : 'Mark Project Built'}
                </button>
              </div>

              <p style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">${p.description}</p>

              <div class="devops-card-callout" style="margin: 0.75rem 0;">
                <strong>Architecture:</strong> <code>${p.architecture}</code><br>
                <strong>Technologies:</strong> ${p.tech.map(t => `<span class="devops-badge-primary" style="margin-right: 4px; font-size: 0.75rem;">${t}</span>`).join('')}
              </div>

              <div style="margin: 1rem 0;">
                <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.4rem;">Project Objectives:</h4>
                <ul style="padding-left: 1.25rem; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
                  ${p.objectives.map(o => `<li>${o}</li>`).join('')}
                </ul>
              </div>

              <!-- Folder Structure -->
              <div style="margin: 1rem 0;">
                <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.4rem;">Folder Structure:</h4>
                <pre class="devops-terminal-content" style="background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); font-size: 0.8rem;">${p.folderStructure.trim()}</pre>
              </div>

              <!-- Complete Configuration Files -->
              ${p.configs && p.configs.length ? `
                <div style="margin: 1.25rem 0;">
                  <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.4rem;">Complete Configuration Files:</h4>
                  ${p.configs.map(c => `
                    <div class="devops-code-block">
                      <div class="devops-code-header">
                        <span>${c.filename}</span>
                        <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(\`${c.code.replace(/`/g, '\\`')}\`)">Copy</button>
                      </div>
                      <pre class="devops-code-pre">${c.code}</pre>
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              <!-- Commands -->
              <div style="margin: 1rem 0;">
                <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.4rem;">Commands to Run:</h4>
                <div class="devops-terminal-block">
                  <div class="devops-terminal-header">
                    <span style="font-size: 0.75rem; color: #94a3b8;">bash - Execution Commands</span>
                    <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard(\`${p.commands.join('\\n')}\`)">Copy</button>
                  </div>
                  <pre class="devops-terminal-content">${p.commands.join('\n')}</pre>
                </div>
              </div>

              <!-- Verification & Testing -->
              <div class="devops-card-tip" style="margin: 1rem 0;">
                <strong>Expected Output:</strong> ${p.expectedOutput}<br>
                <strong>Testing & Verification:</strong> ${p.testing}
              </div>

              <!-- Resume Description -->
              <div style="background: rgba(99, 102, 241, 0.08); border-left: 4px solid var(--color-devops-primary); padding: 0.85rem 1.25rem; border-radius: 0 var(--radius-md) var(--radius-md) 0; margin-top: 1rem;">
                <strong style="color: var(--color-devops-primary); font-size: 0.85rem; text-transform: uppercase;">Resume Description Bullet Point:</strong>
                <p style="font-size: 0.875rem; color: var(--text-main); margin-top: 0.25rem; margin-bottom: 0; line-height: 1.5; font-style: italic;">
                  "${p.resumeBullet}"
                </p>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Tier filtering
    const tierBtns = document.querySelectorAll('#devops-project-tier-tabs .devops-filter-btn');
    const container = document.getElementById('devops-projects-container');
    if (tierBtns.length && container) {
      tierBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          tierBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const tier = btn.getAttribute('data-tier');
          const cards = container.querySelectorAll('.devops-calc-card');
          cards.forEach(card => {
            if (tier === 'all') {
              card.style.display = 'block';
            } else {
              card.style.display = card.getAttribute('data-tier') === tier ? 'block' : 'none';
            }
          });
        });
      });
    }

    // Project completion toggle
    document.querySelectorAll('.devops-proj-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const done = MLForge.devops.storage.toggleProjectCompleted(id);
        btn.textContent = done ? 'Completed ✓' : 'Mark Project Built';
        btn.style.borderColor = done ? '#10b981' : '';
        btn.style.color = done ? '#10b981' : '';
        MLForge.ui.showToast(done ? 'Project marked as built!' : 'Project marked incomplete.', 'info');
      });
    });
  }

  // =========================================================================
  // VIEW 6: DEVOPS CALCULATORS (10 Interactive Tools)
  // =========================================================================
  function renderCalculators(activeId) {
    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <div class="devops-hero-badge">Interactive Engineering Calculators</div>
        <h1 style="font-size: 2.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">DevOps & Cloud Calculators (10)</h1>
        <p style="color: var(--text-secondary); max-width: 800px;">
          High-precision mathematical calculators for AWS cloud cost forecasting, S3 storage tiers, Docker host resources, CIDR subnets, high availability SLAs, and deployment speeds.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- 1. AWS Cost Estimation Calculator -->
        <div class="devops-calc-card" id="calc-aws-cost">
          <div class="devops-calc-header">
            <div>
              <span class="devops-badge-primary">Cost Forecasting</span>
              <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-top: 0.25rem;">1. AWS Monthly Cost Estimation Calculator</h2>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Estimate full monthly spend across EC2 compute, S3 storage, RDS database, and public data transfer egress.</p>
            </div>
          </div>
          <div class="devops-calc-grid">
            <div class="form-group">
              <label class="form-label">EC2 Instances Count</label>
              <input type="number" id="c-aws-ec2-count" class="form-input" value="2" min="1" max="100">
            </div>
            <div class="form-group">
              <label class="form-label">EC2 Rate ($/hr) (e.g. t3.medium $0.0416)</label>
              <input type="number" id="c-aws-ec2-rate" class="form-input" value="0.0416" step="0.005">
            </div>
            <div class="form-group">
              <label class="form-label">S3 Storage (GB)</label>
              <input type="number" id="c-aws-s3-gb" class="form-input" value="150" min="0">
            </div>
            <div class="form-group">
              <label class="form-label">RDS Monthly Base ($)</label>
              <input type="number" id="c-aws-rds-base" class="form-input" value="30.00" min="0">
            </div>
            <div class="form-group">
              <label class="form-label">Outbound Internet Data Transfer (GB)</label>
              <input type="number" id="c-aws-egress-gb" class="form-input" value="250" min="0">
            </div>
          </div>
          <div class="devops-calc-output-box">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
              <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">ESTIMATED MONTHLY CLOUD SPEND:</span>
              <span class="devops-calc-output-val" id="c-aws-out-monthly">$98.54</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
              <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">ESTIMATED ANNUAL CLOUD SPEND:</span>
              <span style="font-size: 1.25rem; font-weight: 700; color: var(--text-main);" id="c-aws-out-yearly">$1,182.48</span>
            </div>
            <div class="devops-calc-breakdown" id="c-aws-breakdown"></div>
            <span style="font-size: 0.725rem; color: var(--text-muted);">* Note: Benchmark estimate based on standard AWS US-East pricing tiers.</span>
          </div>
        </div>

        <!-- 2. Cloud Storage Cost Calculator -->
        <div class="devops-calc-card" id="calc-storage-cost">
          <div class="devops-calc-header">
            <div>
              <span class="devops-badge-primary">Storage Tiers</span>
              <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-top: 0.25rem;">2. Cloud Storage Cost Calculator (S3 Tiers)</h2>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Compare monthly spend across Standard, Infrequent Access (IA), Glacier, and Deep Archive.</p>
            </div>
          </div>
          <div class="devops-calc-grid">
            <div class="form-group">
              <label class="form-label">Storage Volume (Gigabytes)</label>
              <input type="number" id="c-storage-gb" class="form-input" value="2500" min="1">
            </div>
          </div>
          <div class="devops-calc-output-box">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; text-align: center;">
              <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm);">
                <div style="font-size: 0.75rem; color: var(--text-muted);">S3 Standard</div>
                <div style="font-size: 1.2rem; font-weight: 700; color: #38bdf8;" id="c-storage-standard">$57.50</div>
              </div>
              <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm);">
                <div style="font-size: 0.75rem; color: var(--text-muted);">Standard-IA</div>
                <div style="font-size: 1.2rem; font-weight: 700; color: #818cf8;" id="c-storage-ia">$31.25</div>
              </div>
              <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm);">
                <div style="font-size: 0.75rem; color: var(--text-muted);">Glacier Flexible</div>
                <div style="font-size: 1.2rem; font-weight: 700; color: #f59e0b;" id="c-storage-glacier">$9.00</div>
              </div>
              <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm);">
                <div style="font-size: 0.75rem; color: var(--text-muted);">Glacier Deep Archive</div>
                <div style="font-size: 1.2rem; font-weight: 700; color: #10b981;" id="c-storage-deep">$2.48</div>
              </div>
            </div>
            <div class="devops-calc-breakdown" id="c-storage-breakdown"></div>
          </div>
        </div>

        <!-- 3. EC2 Monthly Cost Calculator (On-Demand vs Reserved) -->
        <div class="devops-calc-card" id="calc-ec2-monthly">
          <div class="devops-calc-header">
            <div>
              <span class="devops-badge-primary">Compute Savings</span>
              <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-top: 0.25rem;">3. EC2 Monthly Cost Calculator (On-Demand vs Reserved vs Spot)</h2>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Calculate savings when committing to 1-Year Reserved Instances (40% off) or Spot Instances (70% off).</p>
            </div>
          </div>
          <div class="devops-calc-grid">
            <div class="form-group">
              <label class="form-label">Instance Count</label>
              <input type="number" id="c-ec2-count" class="form-input" value="3" min="1">
            </div>
            <div class="form-group">
              <label class="form-label">On-Demand Hourly Rate ($)</label>
              <input type="number" id="c-ec2-hourly" class="form-input" value="0.0832" step="0.01">
            </div>
          </div>
          <div class="devops-calc-output-box">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted);">ON-DEMAND MONTHLY:</span>
                <div style="font-size: 1.4rem; font-weight: 700; color: #fb7185;" id="c-ec2-ondemand">$182.21</div>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted);">1-YR RESERVED (-40%):</span>
                <div style="font-size: 1.4rem; font-weight: 700; color: #34d399;" id="c-ec2-reserved">$109.33</div>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted);">SPOT INSTANCES (-70%):</span>
                <div style="font-size: 1.4rem; font-weight: 700; color: #38bdf8;" id="c-ec2-spot">$54.66</div>
              </div>
            </div>
            <div class="devops-calc-breakdown" id="c-ec2-breakdown"></div>
          </div>
        </div>

        <!-- 4. Docker Resource Calculator -->
        <div class="devops-calc-card" id="calc-docker-resources">
          <div class="devops-calc-header">
            <div>
              <span class="devops-badge-primary">Container Planning</span>
              <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-top: 0.25rem;">4. Docker Host Resource Allocation Calculator</h2>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Calculate required CPU and RAM when packing microservices onto a host server.</p>
            </div>
          </div>
          <div class="devops-calc-grid">
            <div class="form-group">
              <label class="form-label">Total Containers</label>
              <input type="number" id="c-doc-count" class="form-input" value="12" min="1">
            </div>
            <div class="form-group">
              <label class="form-label">CPU Cores Per Container</label>
              <input type="number" id="c-doc-cpu" class="form-input" value="0.25" step="0.05">
            </div>
            <div class="form-group">
              <label class="form-label">RAM Per Container (MB)</label>
              <input type="number" id="c-doc-ram" class="form-input" value="256" min="32">
            </div>
          </div>
          <div class="devops-calc-output-box">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
              <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">RECOMMENDED HOST SPECS:</span>
              <span class="devops-calc-output-val" id="c-doc-rec-host">4 vCPUs / 4 GB RAM</span>
            </div>
            <div class="devops-calc-breakdown" id="c-doc-breakdown"></div>
          </div>
        </div>

        <!-- 5. CIDR / Subnet Calculator -->
        <div class="devops-calc-card" id="calc-subnet">
          <div class="devops-calc-header">
            <div>
              <span class="devops-badge-primary">VPC Networking</span>
              <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-top: 0.25rem;">5. CIDR & Subnet Calculator (/16 to /28)</h2>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Calculate subnet masks, total addresses, standard usable IPs, and AWS VPC usable IPs.</p>
            </div>
          </div>
          <div class="devops-calc-grid">
            <div class="form-group">
              <label class="form-label">CIDR Prefix (e.g. 24 for /24)</label>
              <input type="number" id="c-cidr-prefix" class="form-input" value="24" min="16" max="30">
            </div>
          </div>
          <div class="devops-calc-output-box">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem;">
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted);">SUBNET MASK:</span>
                <div style="font-size: 1.25rem; font-weight: 700; color: #38bdf8;" id="c-cidr-mask">255.255.255.0</div>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted);">TOTAL IP ADDRESSES:</span>
                <div style="font-size: 1.25rem; font-weight: 700; color: #f8fafc;" id="c-cidr-total">256</div>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted);">AWS USABLE IPS (-5):</span>
                <div style="font-size: 1.25rem; font-weight: 700; color: #34d399;" id="c-cidr-aws">251</div>
              </div>
            </div>
            <div class="devops-calc-breakdown" id="c-cidr-breakdown"></div>
          </div>
        </div>

        <!-- 6. IP Address Class & Range Calculator -->
        <div class="devops-calc-card" id="calc-ip">
          <div class="devops-calc-header">
            <div>
              <span class="devops-badge-primary">IP Networking</span>
              <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-top: 0.25rem;">6. IP Address Class & Range Calculator</h2>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Determine IP classes (A, B, C), RFC 1918 private vs public IP ranges, and 32-bit binary notation.</p>
            </div>
          </div>
          <div class="devops-calc-grid">
            <div class="form-group">
              <label class="form-label">IPv4 Address (e.g. 10.0.1.25 or 192.168.1.1)</label>
              <input type="text" id="c-ip-input" class="form-input font-mono" value="10.0.1.5">
            </div>
          </div>
          <div class="devops-calc-output-box">
            <div id="c-ip-result" style="display: flex; flex-direction: column; gap: 0.5rem;"></div>
          </div>
        </div>

        <!-- 7. High Availability & Downtime Calculator -->
        <div class="devops-calc-card" id="calc-availability">
          <div class="devops-calc-header">
            <div>
              <span class="devops-badge-primary">SLA & Reliability</span>
              <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-top: 0.25rem;">7. Availability & Downtime Calculator (The 9's)</h2>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Calculate allowed downtime per year, month, week, and day for 99.9% (Three 9s) or 99.99% (Four 9s).</p>
            </div>
          </div>
          <div class="devops-calc-grid">
            <div class="form-group">
              <label class="form-label">Availability Target (%)</label>
              <select id="c-avail-select" class="form-input">
                <option value="99.0">99.0% (Two 9s)</option>
                <option value="99.5">99.5%</option>
                <option value="99.9" selected>99.9% (Three 9s - Standard Cloud SLA)</option>
                <option value="99.95">99.95%</option>
                <option value="99.99">99.99% (Four 9s - High Availability)</option>
                <option value="99.999">99.999% (Five 9s - Mission Critical Telecom)</option>
              </select>
            </div>
          </div>
          <div class="devops-calc-output-box">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem;">
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted);">DOWNTIME / YEAR:</span>
                <div style="font-size: 1.25rem; font-weight: 700; color: #fb7185;" id="c-avail-year">8.77 hours</div>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted);">DOWNTIME / MONTH:</span>
                <div style="font-size: 1.25rem; font-weight: 700; color: #f59e0b;" id="c-avail-month">43.83 minutes</div>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted);">DOWNTIME / DAY:</span>
                <div style="font-size: 1.25rem; font-weight: 700; color: #38bdf8;" id="c-avail-day">1.44 minutes</div>
              </div>
            </div>
            <div class="devops-calc-breakdown" id="c-avail-breakdown"></div>
          </div>
        </div>

        <!-- 8. Uptime Percentage Calculator -->
        <div class="devops-calc-card" id="calc-uptime">
          <div class="devops-calc-header">
            <div>
              <span class="devops-badge-primary">SRE Performance</span>
              <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-top: 0.25rem;">8. Uptime Percentage Calculator</h2>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Input actual measured downtime in minutes to determine whether your service breached its monthly SLA.</p>
            </div>
          </div>
          <div class="devops-calc-grid">
            <div class="form-group">
              <label class="form-label">Total Outage Minutes</label>
              <input type="number" id="c-uptime-down" class="form-input" value="35" min="0">
            </div>
            <div class="form-group">
              <label class="form-label">Measurement Period (Days)</label>
              <input type="number" id="c-uptime-days" class="form-input" value="30" min="1">
            </div>
          </div>
          <div class="devops-calc-output-box">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
              <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">ACTUAL OBSERVED UPTIME:</span>
              <span class="devops-calc-output-val" id="c-uptime-pct">99.9190%</span>
            </div>
            <div class="devops-calc-breakdown" id="c-uptime-breakdown"></div>
          </div>
        </div>

        <!-- 9. CI/CD Deployment Time Estimator -->
        <div class="devops-calc-card" id="calc-deploy-time">
          <div class="devops-calc-header">
            <div>
              <span class="devops-badge-primary">Pipeline Optimization</span>
              <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-top: 0.25rem;">9. CI/CD Deployment Time Estimator</h2>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Calculate total commit-to-production lead time based on testing, Docker packaging, and server deployment steps.</p>
            </div>
          </div>
          <div class="devops-calc-grid">
            <div class="form-group">
              <label class="form-label">Test Suite (Seconds)</label>
              <input type="number" id="c-time-test" class="form-input" value="45" min="0">
            </div>
            <div class="form-group">
              <label class="form-label">Docker Build (Seconds)</label>
              <input type="number" id="c-time-build" class="form-input" value="65" min="1">
            </div>
            <div class="form-group">
              <label class="form-label">Registry Push (Seconds)</label>
              <input type="number" id="c-time-push" class="form-input" value="25" min="1">
            </div>
            <div class="form-group">
              <label class="form-label">Host Deploy & Healthcheck (Seconds)</label>
              <input type="number" id="c-time-deploy" class="form-input" value="25" min="1">
            </div>
          </div>
          <div class="devops-calc-output-box">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
              <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">TOTAL PIPELINE RUNTIME:</span>
              <span class="devops-calc-output-val" id="c-time-total">2.8 min (165s)</span>
            </div>
            <div class="devops-calc-breakdown" id="c-time-breakdown"></div>
          </div>
        </div>

        <!-- 10. Data Transfer Out Cost Calculator -->
        <div class="devops-calc-card" id="calc-egress">
          <div class="devops-calc-header">
            <div>
              <span class="devops-badge-primary">Bandwidth & Egress</span>
              <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-top: 0.25rem;">10. Public Data Transfer Out (Egress) Cost Calculator</h2>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Calculate billable outbound public bandwidth costs after accounting for the AWS 100 GB Free Tier allowance.</p>
            </div>
          </div>
          <div class="devops-calc-grid">
            <div class="form-group">
              <label class="form-label">Monthly Outbound Internet Traffic (GB)</label>
              <input type="number" id="c-egress-input" class="form-input" value="650" min="0">
            </div>
          </div>
          <div class="devops-calc-output-box">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
              <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">ESTIMATED EGRESS COST:</span>
              <span class="devops-calc-output-val" id="c-egress-out">$49.50</span>
            </div>
            <div class="devops-calc-breakdown" id="c-egress-breakdown"></div>
          </div>
        </div>
      </div>
    `;

    bindCalculators();
  }

  function bindCalculators() {
    // 1. AWS Cost
    function updateAws() {
      const res = MLForge.devops.calculators.calculateAwsCost({
        ec2Count: document.getElementById('c-aws-ec2-count').value,
        ec2RatePerHour: document.getElementById('c-aws-ec2-rate').value,
        s3StorageGB: document.getElementById('c-aws-s3-gb').value,
        rdsMonthlyBase: document.getElementById('c-aws-rds-base').value,
        dataTransferGB: document.getElementById('c-aws-egress-gb').value
      });
      document.getElementById('c-aws-out-monthly').textContent = res.grandTotalMonthly;
      document.getElementById('c-aws-out-yearly').textContent = res.grandTotalYearly;
      document.getElementById('c-aws-breakdown').textContent = res.breakdown;
    }
    ['c-aws-ec2-count', 'c-aws-ec2-rate', 'c-aws-s3-gb', 'c-aws-rds-base', 'c-aws-egress-gb'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', updateAws);
    });
    updateAws();

    // 2. Storage Cost
    function updateStorage() {
      const res = MLForge.devops.calculators.calculateStorageCost(document.getElementById('c-storage-gb').value);
      document.getElementById('c-storage-standard').textContent = res.costStandard;
      document.getElementById('c-storage-ia').textContent = res.costIA;
      document.getElementById('c-storage-glacier').textContent = res.costGlacier;
      document.getElementById('c-storage-deep').textContent = res.costDeepArchive;
      document.getElementById('c-storage-breakdown').textContent = res.breakdown;
    }
    const storeInput = document.getElementById('c-storage-gb');
    if (storeInput) storeInput.addEventListener('input', updateStorage);
    updateStorage();

    // 3. EC2 Monthly
    function updateEc2() {
      const res = MLForge.devops.calculators.calculateEc2Monthly(
        document.getElementById('c-ec2-count').value,
        document.getElementById('c-ec2-hourly').value
      );
      document.getElementById('c-ec2-ondemand').textContent = res.onDemandMonthly;
      document.getElementById('c-ec2-reserved').textContent = res.reserved1YrMonthly;
      document.getElementById('c-ec2-spot').textContent = res.spotMonthly;
      document.getElementById('c-ec2-breakdown').textContent = res.breakdown;
    }
    ['c-ec2-count', 'c-ec2-hourly'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', updateEc2);
    });
    updateEc2();

    // 4. Docker Resources
    function updateDocker() {
      const res = MLForge.devops.calculators.calculateDockerResources(
        document.getElementById('c-doc-count').value,
        document.getElementById('c-doc-cpu').value,
        document.getElementById('c-doc-ram').value
      );
      document.getElementById('c-doc-rec-host').textContent = `${res.recommendedCpu} / ${res.recommendedRam}`;
      document.getElementById('c-doc-breakdown').textContent = res.breakdown;
    }
    ['c-doc-count', 'c-doc-cpu', 'c-doc-ram'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', updateDocker);
    });
    updateDocker();

    // 5. Subnet
    function updateSubnet() {
      const res = MLForge.devops.calculators.calculateSubnet(document.getElementById('c-cidr-prefix').value);
      document.getElementById('c-cidr-mask').textContent = res.subnetMask;
      document.getElementById('c-cidr-total').textContent = res.totalIps;
      document.getElementById('c-cidr-aws').textContent = res.usableAwsIps;
      document.getElementById('c-cidr-breakdown').textContent = res.breakdown;
    }
    const cidrInput = document.getElementById('c-cidr-prefix');
    if (cidrInput) cidrInput.addEventListener('input', updateSubnet);
    updateSubnet();

    // 6. IP Info
    function updateIp() {
      const res = MLForge.devops.calculators.calculateIpInfo(document.getElementById('c-ip-input').value);
      const out = document.getElementById('c-ip-result');
      if (!res.valid) {
        out.innerHTML = `<span style="color: #fb7185;">${res.message}</span>`;
      } else {
        out.innerHTML = `
          <div style="font-weight: 700; color: #34d399;">${res.type} (${res.ipClass})</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">Default Subnet Mask: <code>${res.defaultMask}</code></div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); font-family: var(--font-mono);">32-bit Binary: ${res.binary}</div>
        `;
      }
    }
    const ipInput = document.getElementById('c-ip-input');
    if (ipInput) ipInput.addEventListener('input', updateIp);
    updateIp();

    // 7. Availability
    function updateAvail() {
      const res = MLForge.devops.calculators.calculateAvailabilityDowntime(document.getElementById('c-avail-select').value);
      document.getElementById('c-avail-year').textContent = res.downtimePerYear;
      document.getElementById('c-avail-month').textContent = res.downtimePerMonth;
      document.getElementById('c-avail-day').textContent = res.downtimePerDay;
      document.getElementById('c-avail-breakdown').textContent = res.breakdown;
    }
    const availSel = document.getElementById('c-avail-select');
    if (availSel) availSel.addEventListener('change', updateAvail);
    updateAvail();

    // 8. Uptime
    function updateUptime() {
      const res = MLForge.devops.calculators.calculateUptimePercentage(
        document.getElementById('c-uptime-down').value,
        document.getElementById('c-uptime-days').value
      );
      document.getElementById('c-uptime-pct').textContent = res.uptimePercentage;
      document.getElementById('c-uptime-breakdown').textContent = res.breakdown;
    }
    ['c-uptime-down', 'c-uptime-days'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', updateUptime);
    });
    updateUptime();

    // 9. Deploy Time
    function updateDeployTime() {
      const res = MLForge.devops.calculators.calculateDeploymentTime({
        testSuiteSec: document.getElementById('c-time-test').value,
        dockerBuildSec: document.getElementById('c-time-build').value,
        registryPushSec: document.getElementById('c-time-push').value,
        serverDeploySec: document.getElementById('c-time-deploy').value
      });
      document.getElementById('c-time-total').textContent = `${res.totalMinutes} (${res.totalSeconds}s)`;
      document.getElementById('c-time-breakdown').textContent = res.breakdown;
    }
    ['c-time-test', 'c-time-build', 'c-time-push', 'c-time-deploy'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', updateDeployTime);
    });
    updateDeployTime();

    // 10. Egress
    function updateEgress() {
      const res = MLForge.devops.calculators.calculateDataTransferCost(document.getElementById('c-egress-input').value);
      document.getElementById('c-egress-out').textContent = res.estimatedCost;
      document.getElementById('c-egress-breakdown').textContent = res.breakdown;
    }
    const egressInput = document.getElementById('c-egress-input');
    if (egressInput) egressInput.addEventListener('input', updateEgress);
    updateEgress();
  }

  // =========================================================================
  // VIEW 7: INTERVIEW PREPARATION & MCQS
  // =========================================================================
  function renderInterview(activeId) {
    const data = MLForge.devops.data.interview || { questions: [], mcqs: [] };

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <div class="devops-hero-badge">Technical Interview Preparation</div>
        <h1 style="font-size: 2.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">Cloud & DevOps Interview Questions & MCQs</h1>
        <p style="color: var(--text-secondary); max-width: 800px;">
          Ace technical interviews with short answers, detailed explanations, common candidate pitfalls to avoid, real production troubleshooting scenarios, and interactive multiple-choice tests.
        </p>
      </div>

      <!-- Multiple Choice Interactive Quiz Section -->
      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem;">Interactive Practice Quiz</h2>
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          ${data.mcqs.map((mcq, idx) => `
            <div class="devops-calc-card" id="quiz-${mcq.id}" style="padding: 1.25rem;">
              <div style="font-weight: 700; color: var(--text-main); margin-bottom: 0.85rem;">
                Question ${idx + 1}: ${mcq.question}
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;" class="mcq-options-wrap" data-answer="${mcq.answer}">
                ${mcq.options.map((opt, optIdx) => `
                  <button class="btn btn-secondary mcq-opt-btn" data-opt-idx="${optIdx}" style="text-align: left; justify-content: flex-start; padding: 0.6rem 1rem; font-size: 0.875rem;">
                    <span style="font-weight: 700; margin-right: 0.5rem;">${['A', 'B', 'C', 'D'][optIdx]}.</span> ${opt}
                  </button>
                `).join('')}
              </div>
              <div class="mcq-feedback" style="display: none; margin-top: 1rem; padding: 0.75rem 1rem; border-radius: var(--radius-sm); font-size: 0.85rem; line-height: 1.5;"></div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Categorized Q&A Accordion -->
      <section>
        <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem;">Categorized Technical Q&As (${data.questions.length})</h2>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${data.questions.map(q => `
            <div class="devops-qa-card">
              <div class="devops-qa-question" onclick="this.parentElement.classList.toggle('open')">
                <div style="display: flex; align-items: center; gap: 0.65rem;">
                  <span class="devops-badge-primary" style="font-size: 0.7rem;">${q.category}</span>
                  <span>${q.question}</span>
                </div>
                <span style="font-size: 1.25rem; font-weight: 700;">+</span>
              </div>
              <div class="devops-qa-answer">
                <div style="margin-bottom: 0.85rem;">
                  <strong style="color: var(--color-devops-primary);">Short Answer:</strong>
                  <p style="margin-top: 0.25rem; margin-bottom: 0; color: var(--text-main); font-weight: 500;">${q.shortAnswer}</p>
                </div>
                <div style="margin-bottom: 0.85rem;">
                  <strong style="color: var(--text-main);">Detailed Explanation:</strong>
                  <p style="margin-top: 0.25rem; margin-bottom: 0;">${q.detailed}</p>
                </div>
                ${q.scenario ? `
                  <div class="devops-card-tip" style="margin: 0.75rem 0;">
                    <strong>Real Company Scenario:</strong> ${q.scenario}
                  </div>
                ` : ''}
                ${q.trap ? `
                  <div class="devops-card-warning" style="margin: 0.75rem 0;">
                    <strong>Common Candidate Mistake / Trap:</strong> ${q.trap}
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;

    // Bind MCQs click handlers
    document.querySelectorAll('.mcq-options-wrap').forEach(wrap => {
      const correctIdx = parseInt(wrap.getAttribute('data-answer'), 10);
      const card = wrap.closest('.devops-calc-card');
      const feedback = card.querySelector('.mcq-feedback');
      const mcqId = card.id;

      wrap.querySelectorAll('.mcq-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const selectedIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
          wrap.querySelectorAll('.mcq-opt-btn').forEach(b => {
            b.disabled = true;
            b.style.pointerEvents = 'none';
          });

          feedback.style.display = 'block';
          if (selectedIdx === correctIdx) {
            btn.style.background = 'rgba(16, 185, 129, 0.25)';
            btn.style.borderColor = '#10b981';
            feedback.style.background = 'rgba(16, 185, 129, 0.1)';
            feedback.style.borderLeft = '4px solid #10b981';
            feedback.innerHTML = `<strong style="color: #34d399;">Correct! ✓</strong> Well done.`;
            MLForge.devops.storage.saveQuizScore(mcqId, 1, 1);
          } else {
            btn.style.background = 'rgba(244, 63, 94, 0.25)';
            btn.style.borderColor = '#f43f5e';
            const correctBtn = wrap.querySelector(`[data-opt-idx="${correctIdx}"]`);
            if (correctBtn) {
              correctBtn.style.background = 'rgba(16, 185, 129, 0.25)';
              correctBtn.style.borderColor = '#10b981';
            }
            feedback.style.background = 'rgba(244, 63, 94, 0.1)';
            feedback.style.borderLeft = '4px solid #f43f5e';
            feedback.innerHTML = `<strong style="color: #fb7185;">Incorrect.</strong> The correct answer is option <strong>${['A', 'B', 'C', 'D'][correctIdx]}</strong>.`;
            MLForge.devops.storage.saveQuizScore(mcqId, 0, 1);
          }
        });
      });
    });
  }

  // =========================================================================
  // VIEW 8: CHEATSHEETS (11 Searchable Categories)
  // =========================================================================
  function renderCheatsheets() {
    const sheets = (MLForge.devops.data && MLForge.devops.data.cheatsheets) ? MLForge.devops.data.cheatsheets : [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <div class="devops-hero-badge">Rapid Command Reference</div>
        <h1 style="font-size: 2.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">Command Cheat Sheets (11 Categories)</h1>
        <p style="color: var(--text-secondary); max-width: 800px;">
          Searchable cheat sheets with syntax, real examples, explanations, and instant one-click copy buttons.
        </p>
      </div>

      <input type="text" id="devops-cheat-search" class="devops-cheatsheet-search" placeholder="Type command name (e.g. docker run, kubectl, chmod, ssh, aws s3, grep)...">

      <div style="display: flex; flex-direction: column; gap: 2rem;" id="devops-cheat-container">
        ${sheets.map(cat => `
          <div class="devops-cheat-cat-section" data-cat-name="${cat.category}">
            <h2 style="font-size: 1.3rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.85rem; display: flex; align-items: center; gap: 0.5rem;">
              <span class="devops-badge-primary">${cat.category}</span>
              <span>Commands (${cat.commands.length})</span>
            </h2>
            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
              ${cat.commands.map(cmd => `
                <div class="devops-cmd-card">
                  <div class="devops-cmd-top">
                    <span class="devops-cmd-syntax">${cmd.syntax}</span>
                    <button class="devops-copy-btn" onclick="MLForge.ui.copyToClipboard('${cmd.example.replace(/'/g, "\\'")}')">Copy Example</button>
                  </div>
                  <div style="font-size: 0.875rem; color: var(--text-secondary);">${cmd.desc}</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">
                    <strong>Example:</strong> <code>${cmd.example}</code>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Live search filter
    const searchInput = document.getElementById('devops-cheat-search');
    const container = document.getElementById('devops-cheat-container');
    if (searchInput && container) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const cards = container.querySelectorAll('.devops-cmd-card');
        cards.forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(query) ? 'flex' : 'none';
        });
      });
    }
  }

  // =========================================================================
  // VIEW 9: USER PROGRESS
  // =========================================================================
  function renderProgress() {
    const topics = (MLForge.devops.data && MLForge.devops.data.topics) ? MLForge.devops.data.topics : [];
    const projects = (MLForge.devops.data && MLForge.devops.data.projects) ? MLForge.devops.data.projects : [];
    const stats = MLForge.devops.storage.getStats(topics.length, projects.length);
    const bookmarks = MLForge.devops.storage.getBookmarks();
    const completedTopics = MLForge.devops.storage.getCompletedTopics();

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <div class="devops-hero-badge">Learning Journey Tracker</div>
        <h1 style="font-size: 2.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">My DevOps Progress</h1>
        <p style="color: var(--text-secondary); max-width: 800px;">
          Review your completed lessons, built projects, saved bookmarks, and quiz performance. All data is saved automatically in your browser's LocalStorage.
        </p>
      </div>

      <!-- Stats Grid -->
      <section class="devops-stats-grid">
        <div class="devops-stat-card">
          <div class="devops-stat-val" style="color: var(--color-devops-primary);">${stats.completedTopicsCount} / ${stats.totalTopics}</div>
          <div class="devops-stat-label">Topics Finished</div>
          <div class="devops-progress-bar-wrap">
            <div class="devops-progress-bar-fill" style="width: ${stats.progressPercent}%;"></div>
          </div>
        </div>

        <div class="devops-stat-card">
          <div class="devops-stat-val" style="color: #10b981;">${stats.completedProjectsCount} / ${stats.totalProjects}</div>
          <div class="devops-stat-label">Projects Completed</div>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;">${stats.totalProjects - stats.completedProjectsCount} remaining</span>
        </div>

        <div class="devops-stat-card">
          <div class="devops-stat-val" style="color: #f59e0b;">${bookmarks.length}</div>
          <div class="devops-stat-label">Bookmarked Topics</div>
        </div>

        <div class="devops-stat-card">
          <div class="devops-stat-val" style="color: #38bdf8;">${stats.progressPercent}%</div>
          <div class="devops-stat-label">Mastery Score</div>
        </div>
      </section>

      <!-- Bookmarked Items -->
      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem;">Saved Bookmarks (${bookmarks.length})</h2>
        ${bookmarks.length ? `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
            ${bookmarks.map(b => `
              <div class="devops-stat-card" style="justify-content: space-between;">
                <div>
                  <span class="devops-badge-primary" style="font-size: 0.7rem; margin-bottom: 0.4rem; display: inline-block;">${b.category}</span>
                  <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem;">${b.title}</h3>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle);">
                  <a href="${b.link}" style="color: var(--color-devops-primary); font-size: 0.8rem; font-weight: 600; text-decoration: none;">Study Lesson &rarr;</a>
                  <button class="btn-icon-only remove-bkmk-btn" data-id="${b.id}" style="color: #fb7185;" title="Remove Bookmark">✕</button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="devops-card-callout">You have not bookmarked any topics yet. Click the bookmark icon on any topic page to save it for revision!</div>
        `}
      </section>

      <!-- Completed Lessons Checklist -->
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem;">Completed Curriculum Checklist</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 0.75rem;">
          ${topics.map(t => {
            const done = completedTopics.includes(t.id);
            return `
              <div style="background: var(--bg-card); border: 1px solid ${done ? '#10b981' : 'var(--border-subtle)'}; border-radius: var(--radius-sm); padding: 0.75rem 1rem; display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.85rem; color: ${done ? 'var(--text-main)' : 'var(--text-muted)'}; font-weight: ${done ? '600' : '400'};">${t.title}</span>
                <span style="color: ${done ? '#10b981' : 'var(--text-muted)'}; font-weight: 700;">${done ? '✓' : '○'}</span>
              </div>
            `;
          }).join('')}
        </div>
      </section>
    `;

    document.querySelectorAll('.remove-bkmk-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        MLForge.devops.storage.toggleBookmark({ id });
        renderProgress();
      });
    });
  }

  return {
    init,
    handleRoute
  };
})();

