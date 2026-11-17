/**
 * MLForge Data Science & Data Engineering View Router & Dynamic Page Renderer
 * Coordinates all views: dashboard, DS path, DE path, topic detail, calculators,
 * tools reference, projects library, career roadmaps, interview prep, quizzes, and progress.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsde = window.MLForge.dsde || {};

MLForge.dsde.router = (function () {
  let contentArea = null;

  function init() {
    contentArea = document.getElementById('content-area');
  }

  function getAllTopics() {
    const ds = (MLForge.dsde.data && MLForge.dsde.data.dsTopics) ? MLForge.dsde.data.dsTopics : [];
    const de = (MLForge.dsde.data && MLForge.dsde.data.deTopics) ? MLForge.dsde.data.deTopics : [];
    return [...ds, ...de];
  }

  function handleRoute(subparts = []) {
    if (!contentArea) contentArea = document.getElementById('content-area');
    const subroute = subparts[0] || 'dashboard';
    const param = subparts[1] || null;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateDsdeSidebarActive(subroute, param);

    // Direct topic shortcut check (e.g. #dsde/intro-data-science)
    const allTopics = getAllTopics();
    const directMatch = allTopics.find(t => t.id === subroute);
    if (directMatch) {
      renderTopic(directMatch.id);
      finalizeView();
      return;
    }

    switch (subroute) {
      case 'dashboard':
        renderDashboard();
        break;
      case 'ds-path':
        renderDsPath();
        break;
      case 'de-path':
        renderDePath();
        break;
      case 'topic':
        renderTopic(param || 'intro-data-science');
        break;
      case 'calculators':
        renderCalculators(param);
        break;
      case 'tools':
        renderTools(param);
        break;
      case 'projects':
        renderProjects(param);
        break;
      case 'roadmaps':
        renderRoadmaps(param);
        break;
      case 'interview':
        renderInterview(param);
        break;
      case 'practice':
        renderPractice(param);
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

  function updateDsdeSidebarActive(subroute, param) {
    document.querySelectorAll('.sidebar-dsde-sub-item, .nav-item').forEach(el => {
      el.classList.remove('active');
    });

    const routeMap = {
      'dashboard': 'nav-dsde-dashboard',
      'ds-path': 'nav-dsde-ds-path',
      'de-path': 'nav-dsde-de-path',
      'calculators': 'nav-dsde-calculators',
      'tools': 'nav-dsde-tools',
      'projects': 'nav-dsde-projects',
      'roadmaps': 'nav-dsde-roadmaps',
      'interview': 'nav-dsde-interview',
      'practice': 'nav-dsde-practice',
      'progress': 'nav-dsde-progress'
    };

    const targetId = routeMap[subroute];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) el.classList.add('active');
    }

    // Subnav item highlight
    if (subroute === 'topic' && param) {
      const subItem = document.getElementById(`dsde-subnav-${param}`);
      if (subItem) subItem.classList.add('active');
    }
  }

  // =========================================================================
  // VIEW 1: DASHBOARD / LANDING PAGE
  // =========================================================================
  function renderDashboard() {
    const dsTopics = (MLForge.dsde.data && MLForge.dsde.data.dsTopics) ? MLForge.dsde.data.dsTopics : [];
    const deTopics = (MLForge.dsde.data && MLForge.dsde.data.deTopics) ? MLForge.dsde.data.deTopics : [];
    const completedCount = MLForge.dsde.storage ? MLForge.dsde.storage.getCompletedTopics().length : 0;
    const totalTopics = dsTopics.length + deTopics.length;

    contentArea.innerHTML = `
      <!-- Hero Banner -->
      <section class="dsde-hero">
        <div class="dsde-hero-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          Complete Professional Curriculum
        </div>
        <h1 class="dsde-hero-title">
          Master <span class="grad-ds">Data Science</span> &amp; <span class="grad-de">Data Engineering</span>
        </h1>
        <p class="dsde-hero-desc">
          Two complete, industry-standard learning tracks from mathematical foundations to production architectures. Learn Python, statistics, SQL, data cleaning, Spark, Airflow, Kafka, and cloud data warehouses with working interactive calculators and real-world projects.
        </p>
        <div class="dsde-hero-actions">
          <a href="#dsde/ds-path" class="btn btn-primary" style="background: var(--color-dsde-primary); border: none;">
            Explore Data Science Track →
          </a>
          <a href="#dsde/de-path" class="btn btn-secondary" style="border-color: var(--color-dsde-orange); color: var(--color-dsde-orange);">
            Explore Data Engineering Track →
          </a>
          <a href="#dsde/calculators" class="btn btn-ghost" style="border: 1px solid var(--border-subtle);">
            Interactive Tools (22+)
          </a>
        </div>
      </section>

      <!-- Stats Grid -->
      <section class="dsde-stats-grid">
        <div class="dsde-stat-card">
          <div class="dsde-stat-icon teal">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div>
            <div class="dsde-stat-val">${totalTopics}</div>
            <div class="dsde-stat-lbl">In-Depth Topics</div>
          </div>
        </div>

        <div class="dsde-stat-card">
          <div class="dsde-stat-icon orange">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/></svg>
          </div>
          <div>
            <div class="dsde-stat-val">22</div>
            <div class="dsde-stat-lbl">Interactive Tools</div>
          </div>
        </div>

        <div class="dsde-stat-card">
          <div class="dsde-stat-icon cyan">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div>
            <div class="dsde-stat-val">33</div>
            <div class="dsde-stat-lbl">Real-World Projects</div>
          </div>
        </div>

        <div class="dsde-stat-card">
          <div class="dsde-stat-icon purple">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div>
            <div class="dsde-stat-val">6</div>
            <div class="dsde-stat-lbl">Career Roadmaps</div>
          </div>
        </div>
      </section>

      <!-- Two Main Learning Paths Selection -->
      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.4rem; font-weight: 700; color: var(--text-main); margin-bottom: 1.25rem;">
          Choose Your Learning Path
        </h2>
        <div class="dsde-paths-grid">
          <!-- Path 1: Data Science -->
          <div class="dsde-path-card path-ds">
            <div class="dsde-path-header">
              <span class="badge" style="background: var(--color-dsde-teal-light); color: var(--color-dsde-teal); font-weight: 700;">TRACK 1</span>
              <span style="font-size: 0.8rem; color: var(--text-muted);">${dsTopics.length} Comprehensive Lessons</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
              <div class="dsde-path-icon icon-ds">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <h3 class="dsde-path-title" style="margin: 0;">Data Science Path</h3>
            </div>
            <p class="dsde-path-summary">
              Turn raw observations into predictive intelligence. Master linear algebra, descriptive and inferential statistics, NumPy, Pandas, data cleaning, exploratory analysis (EDA), visualization (Matplotlib, Seaborn, Plotly), and advanced ML algorithms.
            </p>
            <div class="dsde-path-modules-list">
              <div class="dsde-path-module-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Math &amp; Statistics (Z-tests, T-tests, ANOVA, A/B Testing)</span>
              </div>
              <div class="dsde-path-module-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Python, NumPy &amp; Pandas Data Wrangling</span>
              </div>
              <div class="dsde-path-module-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Data Cleaning, Outlier Detection &amp; Feature Scaling</span>
              </div>
              <div class="dsde-path-module-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>EDA, Data Visualization &amp; BI Dashboards</span>
              </div>
            </div>
            <a href="#dsde/ds-path" class="btn btn-primary" style="background: var(--color-dsde-teal); border: none; width: 100%; justify-content: center;">
              Start Data Science Track →
            </a>
          </div>

          <!-- Path 2: Data Engineering -->
          <div class="dsde-path-card path-de">
            <div class="dsde-path-header">
              <span class="badge" style="background: var(--color-dsde-orange-light); color: var(--color-dsde-orange); font-weight: 700;">TRACK 2</span>
              <span style="font-size: 0.8rem; color: var(--text-muted);">${deTopics.length} Production Lessons</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
              <div class="dsde-path-icon icon-de">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              </div>
              <h3 class="dsde-path-title" style="margin: 0;">Data Engineering Path</h3>
            </div>
            <p class="dsde-path-summary">
              Build resilient, high-throughput pipelines that move and transform terabytes of data. Master advanced SQL, NoSQL, batch and streaming pipelines, Apache Airflow orchestration, PySpark big data, Apache Kafka, and Cloud Data Warehouses.
            </p>
            <div class="dsde-path-modules-list">
              <div class="dsde-path-module-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Advanced SQL, Database Indexing &amp; ACID Transactions</span>
              </div>
              <div class="dsde-path-module-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>ETL vs ELT, Change Data Capture (CDC) &amp; Idempotency</span>
              </div>
              <div class="dsde-path-module-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Apache Airflow Orchestration &amp; PySpark Big Data</span>
              </div>
              <div class="dsde-path-module-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Real-Time Streaming with Kafka &amp; Cloud Lakehouses</span>
              </div>
            </div>
            <a href="#dsde/de-path" class="btn btn-secondary" style="border-color: var(--color-dsde-orange); color: var(--color-dsde-orange); width: 100%; justify-content: center;">
              Start Data Engineering Track →
            </a>
          </div>
        </div>
      </section>

      <!-- Featured Topics -->
      <section style="margin-bottom: 2.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin: 0;">Featured Curriculum Topics</h2>
          <a href="#dsde/ds-path" class="btn btn-sm btn-ghost">View All Lessons →</a>
        </div>
        <div class="dsde-topics-grid">
          ${[...dsTopics.slice(0, 3), ...deTopics.slice(0, 3)].map(t => renderTopicCard(t)).join('')}
        </div>
      </section>
    `;
  }

  function renderTopicCard(topic) {
    const isDone = MLForge.dsde.storage ? MLForge.dsde.storage.isTopicCompleted(topic.id) : false;
    const isDs = topic.track === 'ds';
    return `
      <a href="#dsde/topic/${topic.id}" class="dsde-topic-card" style="border-top: 3px solid ${isDs ? 'var(--color-dsde-teal)' : 'var(--color-dsde-orange)'};">
        <div class="dsde-topic-card-header">
          <span class="badge" style="background: ${isDs ? 'var(--color-dsde-teal-light)' : 'var(--color-dsde-orange-light)'}; color: ${isDs ? 'var(--color-dsde-teal)' : 'var(--color-dsde-orange)'}; font-size: 0.65rem;">
            ${topic.category}
          </span>
          <span style="font-size: 0.725rem; color: ${isDone ? '#10b981' : 'var(--text-muted)'}; font-weight: 600;">
            ${isDone ? '✓ Completed' : topic.readTime}
          </span>
        </div>
        <h3 class="dsde-topic-card-title">${topic.title}</h3>
        <p class="dsde-topic-card-summary">${topic.summary}</p>
        <div class="dsde-topic-card-footer">
          <span class="badge badge-gray" style="font-size: 0.65rem;">${topic.difficulty}</span>
          <span style="color: ${isDs ? 'var(--color-dsde-teal)' : 'var(--color-dsde-orange)'}; font-weight: 600;">Read Lesson →</span>
        </div>
      </a>
    `;
  }

  // =========================================================================
  // VIEW 2: DATA SCIENCE PATH VIEW
  // =========================================================================
  function renderDsPath() {
    const topics = (MLForge.dsde.data && MLForge.dsde.data.dsTopics) ? MLForge.dsde.data.dsTopics : [];
    const completed = topics.filter(t => MLForge.dsde.storage.isTopicCompleted(t.id)).length;
    const pct = Math.round((completed / Math.max(1, topics.length)) * 100);

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <a href="#dsde/dashboard" style="color: var(--text-muted); text-decoration: none; font-size: 0.85rem;">DS &amp; DE</a>
          <span style="color: var(--text-muted);">/</span>
          <span style="color: var(--color-dsde-teal); font-size: 0.85rem; font-weight: 600;">Data Science Path</span>
        </div>
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          Data Science Learning Curriculum
        </h1>
        <p style="color: var(--text-secondary); max-width: 820px; line-height: 1.5;">
          A complete roadmap covering exploratory data analysis, statistics, Python libraries, data cleaning, and machine learning modeling.
        </p>

        <!-- Progress Tracker Bar -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--radius-md); padding: 1rem; margin-top: 1.25rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.825rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.5rem;">
            <span>Path Completion</span>
            <span style="color: var(--color-dsde-teal);">${completed} of ${topics.length} Lessons Completed (${pct}%)</span>
          </div>
          <div style="height: 8px; background: var(--bg-app); border-radius: 9999px; overflow: hidden;">
            <div style="width: ${pct}%; height: 100%; background: linear-gradient(90deg, #14b8a6, #38bdf8); transition: width 0.3s ease;"></div>
          </div>
        </div>
      </div>

      <!-- Topics Grid -->
      <div class="dsde-topics-grid">
        ${topics.map(t => renderTopicCard(t)).join('')}
      </div>
    `;
  }

  // =========================================================================
  // VIEW 3: DATA ENGINEERING PATH VIEW
  // =========================================================================
  function renderDePath() {
    const topics = (MLForge.dsde.data && MLForge.dsde.data.deTopics) ? MLForge.dsde.data.deTopics : [];
    const completed = topics.filter(t => MLForge.dsde.storage.isTopicCompleted(t.id)).length;
    const pct = Math.round((completed / Math.max(1, topics.length)) * 100);

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <a href="#dsde/dashboard" style="color: var(--text-muted); text-decoration: none; font-size: 0.85rem;">DS &amp; DE</a>
          <span style="color: var(--text-muted);">/</span>
          <span style="color: var(--color-dsde-orange); font-size: 0.85rem; font-weight: 600;">Data Engineering Path</span>
        </div>
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          Data Engineering Learning Curriculum
        </h1>
        <p style="color: var(--text-secondary); max-width: 820px; line-height: 1.5;">
          Master production data infrastructure: relational databases, distributed compute (Spark), streaming (Kafka), orchestration (Airflow), and cloud data warehouses.
        </p>

        <!-- Progress Tracker Bar -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--radius-md); padding: 1rem; margin-top: 1.25rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.825rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.5rem;">
            <span>Path Completion</span>
            <span style="color: var(--color-dsde-orange);">${completed} of ${topics.length} Lessons Completed (${pct}%)</span>
          </div>
          <div style="height: 8px; background: var(--bg-app); border-radius: 9999px; overflow: hidden;">
            <div style="width: ${pct}%; height: 100%; background: linear-gradient(90deg, #f97316, #fbbf24); transition: width 0.3s ease;"></div>
          </div>
        </div>
      </div>

      <!-- Topics Grid -->
      <div class="dsde-topics-grid">
        ${topics.map(t => renderTopicCard(t)).join('')}
      </div>
    `;
  }

  // =========================================================================
  // VIEW 4: TOPIC DETAIL VIEW
  // =========================================================================
  function renderTopic(topicId) {
    const allTopics = getAllTopics();
    const topic = allTopics.find(t => t.id === topicId) || allTopics[0];
    if (!topic) return;

    if (MLForge.dsde.storage) MLForge.dsde.storage.setLastTopic(topic.id);

    const isCompleted = MLForge.dsde.storage ? MLForge.dsde.storage.isTopicCompleted(topic.id) : false;
    const isBookmarked = MLForge.dsde.storage ? MLForge.dsde.storage.isBookmarked(topic.id) : false;
    const isDs = topic.track === 'ds';

    // Find Previous and Next Topics
    const currentIndex = allTopics.findIndex(t => t.id === topic.id);
    const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
    const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

    contentArea.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem;">
            <a href="#dsde/dashboard" style="color: var(--text-muted); text-decoration: none;">DS &amp; DE</a>
            <span style="color: var(--text-muted);">/</span>
            <a href="${isDs ? '#dsde/ds-path' : '#dsde/de-path'}" style="color: ${isDs ? 'var(--color-dsde-teal)' : 'var(--color-dsde-orange)'}; text-decoration: none; font-weight: 600;">
              ${isDs ? 'Data Science' : 'Data Engineering'}
            </a>
            <span style="color: var(--text-muted);">/</span>
            <span style="color: var(--text-main); font-weight: 600;">${topic.category}</span>
          </div>

          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button class="btn btn-sm btn-secondary" id="btn-toggle-bookmark">
              ${isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
            </button>
            <button class="btn btn-sm ${isCompleted ? 'btn-secondary' : 'btn-primary'}" id="btn-toggle-complete" style="${!isCompleted ? 'background: ' + (isDs ? 'var(--color-dsde-teal)' : 'var(--color-dsde-orange)') + '; border: none;' : ''}">
              ${isCompleted ? '✓ Completed' : 'Mark as Complete'}
            </button>
          </div>
        </div>

        <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; line-height: 1.25;">
          ${topic.title}
        </h1>

        <div style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.825rem; color: var(--text-secondary); margin-bottom: 1.5rem; flex-wrap: wrap;">
          <span class="badge" style="background: ${isDs ? 'var(--color-dsde-teal-light)' : 'var(--color-dsde-orange-light)'}; color: ${isDs ? 'var(--color-dsde-teal)' : 'var(--color-dsde-orange)'}; font-weight: 700;">
            ${topic.difficulty}
          </span>
          <span>•</span>
          <span>⏱ ${topic.readTime} read time</span>
          <span>•</span>
          <span>Track: ${isDs ? 'Data Science' : 'Data Engineering'}</span>
        </div>
      </div>

      <!-- Main Topic Article Content -->
      <article class="dsde-topic-content">
        ${topic.content}
      </article>

      <!-- Topic Pagination Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-card); flex-wrap: wrap;">
        ${prevTopic ? `
          <a href="#dsde/topic/${prevTopic.id}" class="btn btn-secondary">
            ← Previous: ${prevTopic.title.slice(0, 30)}...
          </a>
        ` : `<div></div>`}

        ${nextTopic ? `
          <a href="#dsde/topic/${nextTopic.id}" class="btn btn-primary" style="background: ${isDs ? 'var(--color-dsde-teal)' : 'var(--color-dsde-orange)'}; border: none;">
            Next: ${nextTopic.title.slice(0, 30)}... →
          </a>
        ` : `<div></div>`}
      </div>
    `;

    // Bind complete button
    const btnComplete = document.getElementById('btn-toggle-complete');
    if (btnComplete) {
      btnComplete.addEventListener('click', () => {
        const done = MLForge.dsde.storage.toggleTopicCompleted(topic.id);
        if (MLForge.ui) MLForge.ui.showToast(done ? "Topic marked as completed!" : "Topic unmarked", "success");
        renderTopic(topic.id);
        if (MLForge.dsde.app) MLForge.dsde.app.updateSidebarCounts();
      });
    }

    // Bind bookmark button
    const btnBookmark = document.getElementById('btn-toggle-bookmark');
    if (btnBookmark) {
      btnBookmark.addEventListener('click', () => {
        const added = MLForge.dsde.storage.toggleBookmark(topic);
        if (MLForge.ui) MLForge.ui.showToast(added ? "Topic added to bookmarks!" : "Topic removed from bookmarks", "info");
        renderTopic(topic.id);
      });
    }
  }

  // =========================================================================
  // VIEW 5: INTERACTIVE CALCULATORS & PLAYGROUND VIEW
  // =========================================================================
  function renderCalculators(activeCalcId) {
    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          Interactive Calculators &amp; Engineering Tools
        </h1>
        <p style="color: var(--text-secondary); max-width: 820px; line-height: 1.5;">
          14 precision Data Science statistical calculators and 8 Data Engineering interactive simulators. Perform step-by-step arithmetic, test schemas, simulate pipelines, and validate queries with zero backend lag.
        </p>

        <!-- Category Tabs -->
        <div class="dsde-nav-tabs" style="margin-top: 1.5rem;">
          <button class="dsde-nav-btn active" data-filter="all">All Tools (22)</button>
          <button class="dsde-nav-btn" data-filter="stats">Data Science Calculators (14)</button>
          <button class="dsde-nav-btn" data-filter="de-tools">Data Engineering Tools (8)</button>
        </div>
      </div>

      <!-- Calculators Grid -->
      <div class="dsde-calc-grid" id="calculators-grid">
        <!-- 1. Mean Calculator -->
        <div class="dsde-calc-card" data-cat="stats" id="calc-mean">
          <div class="dsde-calc-header">
            <span class="badge" style="background: var(--color-dsde-teal-light); color: var(--color-dsde-teal); font-size: 0.65rem;">Descriptive Stats</span>
            <h3 class="dsde-calc-title">Mean (Average) Calculator</h3>
            <p class="dsde-calc-desc">Computes arithmetic mean: sum divided by count of values.</p>
          </div>
          <div class="dsde-calc-body">
            <div class="dsde-form-group">
              <label class="dsde-form-label">Numbers (comma or space separated):</label>
              <input type="text" class="dsde-input" id="input-mean" value="12, 18, 24, 30, 42">
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="dsde-btn-calc" id="btn-calc-mean">Calculate Mean</button>
              <button class="dsde-btn-reset" id="btn-reset-mean">Reset</button>
            </div>
            <div class="dsde-calc-result-box" id="res-mean" style="display: none;"></div>
          </div>
        </div>

        <!-- 2. Median Calculator -->
        <div class="dsde-calc-card" data-cat="stats" id="calc-median">
          <div class="dsde-calc-header">
            <span class="badge" style="background: var(--color-dsde-teal-light); color: var(--color-dsde-teal); font-size: 0.65rem;">Central Tendency</span>
            <h3 class="dsde-calc-title">Median Calculator</h3>
            <p class="dsde-calc-desc">Finds the physical middle value robust to extreme outliers.</p>
          </div>
          <div class="dsde-calc-body">
            <div class="dsde-form-group">
              <label class="dsde-form-label">Numbers:</label>
              <input type="text" class="dsde-input" id="input-median" value="15, 20, 25, 40, 1000">
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="dsde-btn-calc" id="btn-calc-median">Calculate Median</button>
              <button class="dsde-btn-reset" id="btn-reset-median">Reset</button>
            </div>
            <div class="dsde-calc-result-box" id="res-median" style="display: none;"></div>
          </div>
        </div>

        <!-- 3. Standard Deviation & Variance -->
        <div class="dsde-calc-card" data-cat="stats" id="calc-stddev">
          <div class="dsde-calc-header">
            <span class="badge" style="background: var(--color-dsde-teal-light); color: var(--color-dsde-teal); font-size: 0.65rem;">Dispersion</span>
            <h3 class="dsde-calc-title">Standard Deviation &amp; Variance</h3>
            <p class="dsde-calc-desc">Measures data spread and average distance from the mean.</p>
          </div>
          <div class="dsde-calc-body">
            <div class="dsde-form-group">
              <label class="dsde-form-label">Numbers:</label>
              <input type="text" class="dsde-input" id="input-stddev" value="10, 12, 14, 15, 18, 20">
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="dsde-btn-calc" id="btn-calc-stddev">Calculate Spread</button>
              <button class="dsde-btn-reset" id="btn-reset-stddev">Reset</button>
            </div>
            <div class="dsde-calc-result-box" id="res-stddev" style="display: none;"></div>
          </div>
        </div>

        <!-- 4. Pearson Correlation Calculator -->
        <div class="dsde-calc-card" data-cat="stats" id="calc-correlation">
          <div class="dsde-calc-header">
            <span class="badge" style="background: var(--color-dsde-teal-light); color: var(--color-dsde-teal); font-size: 0.65rem;">Bivariate</span>
            <h3 class="dsde-calc-title">Pearson Correlation (r)</h3>
            <p class="dsde-calc-desc">Calculates linear relationship strength between two variables.</p>
          </div>
          <div class="dsde-calc-body">
            <div class="dsde-form-group">
              <label class="dsde-form-label">Variable X:</label>
              <input type="text" class="dsde-input" id="input-corr-x" value="1, 2, 3, 4, 5">
            </div>
            <div class="dsde-form-group">
              <label class="dsde-form-label">Variable Y:</label>
              <input type="text" class="dsde-input" id="input-corr-y" value="2, 4, 5, 8, 10">
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="dsde-btn-calc" id="btn-calc-corr">Calculate Correlation</button>
              <button class="dsde-btn-reset" id="btn-reset-corr">Reset</button>
            </div>
            <div class="dsde-calc-result-box" id="res-corr" style="display: none;"></div>
          </div>
        </div>

        <!-- 5. Z-Score Calculator -->
        <div class="dsde-calc-card" data-cat="stats" id="calc-zscore">
          <div class="dsde-calc-header">
            <span class="badge" style="background: var(--color-dsde-teal-light); color: var(--color-dsde-teal); font-size: 0.65rem;">Standardization</span>
            <h3 class="dsde-calc-title">Z-Score &amp; Outlier Tester</h3>
            <p class="dsde-calc-desc">Number of standard deviations a point lies from the mean.</p>
          </div>
          <div class="dsde-calc-body">
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem;">
              <div class="dsde-form-group">
                <label class="dsde-form-label">Value (x):</label>
                <input type="number" class="dsde-input" id="input-z-x" value="88">
              </div>
              <div class="dsde-form-group">
                <label class="dsde-form-label">Mean (μ):</label>
                <input type="number" class="dsde-input" id="input-z-mean" value="70">
              </div>
              <div class="dsde-form-group">
                <label class="dsde-form-label">StdDev (σ):</label>
                <input type="number" class="dsde-input" id="input-z-std" value="6">
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="dsde-btn-calc" id="btn-calc-z">Calculate Z-Score</button>
              <button class="dsde-btn-reset" id="btn-reset-z">Reset</button>
            </div>
            <div class="dsde-calc-result-box" id="res-z" style="display: none;"></div>
          </div>
        </div>

        <!-- 6. Normal Distribution Calculator -->
        <div class="dsde-calc-card" data-cat="stats" id="calc-norm">
          <div class="dsde-calc-header">
            <span class="badge" style="background: var(--color-dsde-teal-light); color: var(--color-dsde-teal); font-size: 0.65rem;">Probability</span>
            <h3 class="dsde-calc-title">Normal Distribution (CDF)</h3>
            <p class="dsde-calc-desc">Calculates cumulative probability under the Gaussian curve.</p>
          </div>
          <div class="dsde-calc-body">
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem;">
              <div class="dsde-form-group">
                <label class="dsde-form-label">Cutoff (x):</label>
                <input type="number" class="dsde-input" id="input-norm-x" value="1.96">
              </div>
              <div class="dsde-form-group">
                <label class="dsde-form-label">Mean (μ):</label>
                <input type="number" class="dsde-input" id="input-norm-mean" value="0">
              </div>
              <div class="dsde-form-group">
                <label class="dsde-form-label">StdDev (σ):</label>
                <input type="number" class="dsde-input" id="input-norm-std" value="1">
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="dsde-btn-calc" id="btn-calc-norm">Compute Probability</button>
              <button class="dsde-btn-reset" id="btn-reset-norm">Reset</button>
            </div>
            <div class="dsde-calc-result-box" id="res-norm" style="display: none;"></div>
          </div>
        </div>

        <!-- 7. IQR Outlier Bounds Calculator -->
        <div class="dsde-calc-card" data-cat="stats" id="calc-iqr">
          <div class="dsde-calc-header">
            <span class="badge" style="background: var(--color-dsde-teal-light); color: var(--color-dsde-teal); font-size: 0.65rem;">Data Cleaning</span>
            <h3 class="dsde-calc-title">IQR &amp; Outlier Bounds</h3>
            <p class="dsde-calc-desc">Calculates Q1, Q3, IQR, and detects outliers.</p>
          </div>
          <div class="dsde-calc-body">
            <div class="dsde-form-group">
              <label class="dsde-form-label">Dataset:</label>
              <input type="text" class="dsde-input" id="input-iqr" value="12, 14, 15, 18, 19, 21, 22, 24, 25, 28, 95">
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="dsde-btn-calc" id="btn-calc-iqr">Detect Outliers</button>
              <button class="dsde-btn-reset" id="btn-reset-iqr">Reset</button>
            </div>
            <div class="dsde-calc-result-box" id="res-iqr" style="display: none;"></div>
          </div>
        </div>

        <!-- 8. Confidence Interval Calculator -->
        <div class="dsde-calc-card" data-cat="stats" id="calc-ci">
          <div class="dsde-calc-header">
            <span class="badge" style="background: var(--color-dsde-teal-light); color: var(--color-dsde-teal); font-size: 0.65rem;">Inference</span>
            <h3 class="dsde-calc-title">Confidence Interval (CI)</h3>
            <p class="dsde-calc-desc">Estimates population parameter interval from sample metrics.</p>
          </div>
          <div class="dsde-calc-body">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
              <div class="dsde-form-group">
                <label class="dsde-form-label">Sample Mean:</label>
                <input type="number" class="dsde-input" id="input-ci-mean" value="105.4">
              </div>
              <div class="dsde-form-group">
                <label class="dsde-form-label">Sample StdDev:</label>
                <input type="number" class="dsde-input" id="input-ci-std" value="12.2">
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
              <div class="dsde-form-group">
                <label class="dsde-form-label">Sample Size (n):</label>
                <input type="number" class="dsde-input" id="input-ci-n" value="64">
              </div>
              <div class="dsde-form-group">
                <label class="dsde-form-label">Confidence Level:</label>
                <select class="dsde-input" id="input-ci-level">
                  <option value="90">90% (Z = 1.645)</option>
                  <option value="95" selected>95% (Z = 1.960)</option>
                  <option value="99">99% (Z = 2.576)</option>
                </select>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="dsde-btn-calc" id="btn-calc-ci">Compute Interval</button>
              <button class="dsde-btn-reset" id="btn-reset-ci">Reset</button>
            </div>
            <div class="dsde-calc-result-box" id="res-ci" style="display: none;"></div>
          </div>
        </div>

        <!-- 9. A/B Testing Sample Size Calculator -->
        <div class="dsde-calc-card" data-cat="stats" id="calc-sample-size">
          <div class="dsde-calc-header">
            <span class="badge" style="background: var(--color-dsde-teal-light); color: var(--color-dsde-teal); font-size: 0.65rem;">Experimentation</span>
            <h3 class="dsde-calc-title">A/B Test Sample Size Planner</h3>
            <p class="dsde-calc-desc">Calculates required users per variant to detect conversion lift.</p>
          </div>
          <div class="dsde-calc-body">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
              <div class="dsde-form-group">
                <label class="dsde-form-label">Baseline Rate (%):</label>
                <input type="number" class="dsde-input" id="input-ss-base" value="5.0" step="0.1">
              </div>
              <div class="dsde-form-group">
                <label class="dsde-form-label">Minimum Lift (% rel):</label>
                <input type="number" class="dsde-input" id="input-ss-mde" value="10.0" step="1">
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="dsde-btn-calc" id="btn-calc-ss">Calculate Sample Size</button>
              <button class="dsde-btn-reset" id="btn-reset-ss">Reset</button>
            </div>
            <div class="dsde-calc-result-box" id="res-ss" style="display: none;"></div>
          </div>
        </div>

        <!-- DE TOOL 1: Data Size Converter -->
        <div class="dsde-calc-card" data-cat="de-tools" id="calc-datasize">
          <div class="dsde-calc-header">
            <span class="badge" style="background: var(--color-dsde-orange-light); color: var(--color-dsde-orange); font-size: 0.65rem;">Big Data Tool</span>
            <h3 class="dsde-calc-title">Data Size &amp; Transfer Estimator</h3>
            <p class="dsde-calc-desc">Converts Bytes to PB and calculates network transfer time.</p>
          </div>
          <div class="dsde-calc-body">
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 0.5rem;">
              <div class="dsde-form-group">
                <label class="dsde-form-label">Size Value:</label>
                <input type="number" class="dsde-input" id="input-size-val" value="500">
              </div>
              <div class="dsde-form-group">
                <label class="dsde-form-label">Unit:</label>
                <select class="dsde-input" id="input-size-unit">
                  <option value="MB">MB</option>
                  <option value="GB" selected>GB</option>
                  <option value="TB">TB</option>
                  <option value="PB">PB</option>
                </select>
              </div>
            </div>
            <div class="dsde-form-group">
              <label class="dsde-form-label">Network Bandwidth (Mbps):</label>
              <input type="number" class="dsde-input" id="input-size-bw" value="100">
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="dsde-btn-calc" id="btn-calc-size" style="background: var(--color-dsde-orange);">Convert &amp; Estimate</button>
              <button class="dsde-btn-reset" id="btn-reset-size">Reset</button>
            </div>
            <div class="dsde-calc-result-box" id="res-size" style="display: none;"></div>
          </div>
        </div>

        <!-- DE TOOL 2: JSON Validator & Formatter -->
        <div class="dsde-calc-card" data-cat="de-tools" id="calc-json">
          <div class="dsde-calc-header">
            <span class="badge" style="background: var(--color-dsde-orange-light); color: var(--color-dsde-orange); font-size: 0.65rem;">ETL Preprocessing</span>
            <h3 class="dsde-calc-title">JSON Validator &amp; Formatter</h3>
            <p class="dsde-calc-desc">Validates syntax, formats, minifies, and inspects key counts.</p>
          </div>
          <div class="dsde-calc-body">
            <div class="dsde-form-group">
              <label class="dsde-form-label">Paste Raw JSON:</label>
              <textarea class="dsde-input" id="input-json" rows="4" style="font-family: var(--font-mono); font-size: 0.8rem;">{"event_id": 9921, "customer": "Alice", "tags": ["mobile", "loyalty"], "amount": 149.99}</textarea>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="dsde-btn-calc" id="btn-calc-json" style="background: var(--color-dsde-orange);">Validate &amp; Format</button>
              <button class="dsde-btn-reset" id="btn-reset-json">Reset</button>
            </div>
            <div class="dsde-calc-result-box" id="res-json" style="display: none;"></div>
          </div>
        </div>

        <!-- DE TOOL 3: CSV Schema & Null Analyzer -->
        <div class="dsde-calc-card" data-cat="de-tools" id="calc-csv">
          <div class="dsde-calc-header">
            <span class="badge" style="background: var(--color-dsde-orange-light); color: var(--color-dsde-orange); font-size: 0.65rem;">Data Profiler</span>
            <h3 class="dsde-calc-title">CSV Previewer &amp; Schema Analyzer</h3>
            <p class="dsde-calc-desc">Infers SQL data types and counts missing values per column.</p>
          </div>
          <div class="dsde-calc-body">
            <div class="dsde-form-group">
              <label class="dsde-form-label">Paste CSV Content:</label>
              <textarea class="dsde-input" id="input-csv" rows="4" style="font-family: var(--font-mono); font-size: 0.8rem;">id,name,age,salary,city
1,Alice,29,85000,New York
2,Bob,34,92000,London
3,Charlie,,115000,Tokyo
4,Diana,42,,San Francisco</textarea>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="dsde-btn-calc" id="btn-calc-csv" style="background: var(--color-dsde-orange);">Analyze Schema</button>
              <button class="dsde-btn-reset" id="btn-reset-csv">Reset</button>
            </div>
            <div class="dsde-calc-result-box" id="res-csv" style="display: none;"></div>
          </div>
        </div>
      </div>

      <!-- DE INTERACTIVE SIMULATORS -->
      <!-- Simulator 1: Data Pipeline Visualizer -->
      <section class="dsde-simulator-card" data-cat="de-tools">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <div>
            <span class="badge" style="background: var(--color-dsde-orange-light); color: var(--color-dsde-orange); font-size: 0.7rem; font-weight: 700;">INTERACTIVE SIMULATOR</span>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin-top: 0.25rem;">
              End-to-End Data Pipeline Visualizer
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
              Click 'Run Pipeline' to see how records flow sequentially through Ingestion, Validation, Cleansing, Transformation, and Warehouse Loading.
            </p>
          </div>
          <button class="btn btn-primary" id="btn-run-pipeline" style="background: linear-gradient(135deg, #f97316 0%, #14b8a6 100%); border: none;">
            ▶ Run Pipeline Simulation
          </button>
        </div>

        <!-- 5 Pipeline Stages -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;" id="pipeline-stages-container">
          <div class="dsde-pipeline-stage" id="pipe-stage-1">
            <div style="font-size: 0.75rem; color: var(--text-muted);">Stage 1</div>
            <strong style="font-size: 0.9rem; color: var(--text-main);">Raw Ingestion</strong>
            <div class="pipe-status" style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--text-muted);">Idle</div>
          </div>
          <div class="dsde-pipeline-stage" id="pipe-stage-2">
            <div style="font-size: 0.75rem; color: var(--text-muted);">Stage 2</div>
            <strong style="font-size: 0.9rem; color: var(--text-main);">Schema Check</strong>
            <div class="pipe-status" style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--text-muted);">Idle</div>
          </div>
          <div class="dsde-pipeline-stage" id="pipe-stage-3">
            <div style="font-size: 0.75rem; color: var(--text-muted);">Stage 3</div>
            <strong style="font-size: 0.9rem; color: var(--text-main);">Deduplication</strong>
            <div class="pipe-status" style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--text-muted);">Idle</div>
          </div>
          <div class="dsde-pipeline-stage" id="pipe-stage-4">
            <div style="font-size: 0.75rem; color: var(--text-muted);">Stage 4</div>
            <strong style="font-size: 0.9rem; color: var(--text-main);">Enrichment</strong>
            <div class="pipe-status" style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--text-muted);">Idle</div>
          </div>
          <div class="dsde-pipeline-stage" id="pipe-stage-5">
            <div style="font-size: 0.75rem; color: var(--text-muted);">Stage 5</div>
            <strong style="font-size: 0.9rem; color: var(--text-main);">Warehouse Load</strong>
            <div class="pipe-status" style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--text-muted);">Idle</div>
          </div>
        </div>

        <!-- Terminal Logs -->
        <div style="background: var(--bg-code); border: 1px solid var(--border-card); border-radius: var(--radius-md); padding: 1rem; font-family: var(--font-mono); font-size: 0.8rem; color: #38bdf8; height: 130px; overflow-y: auto;" id="pipe-console-logs">
          [System Ready] Click 'Run Pipeline Simulation' to start batch processing.
        </div>
      </section>

      <!-- Simulator 2: Star vs Snowflake Schema Interactive Visualizer -->
      <section class="dsde-simulator-card" data-cat="de-tools">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
          <div>
            <span class="badge" style="background: var(--color-dsde-teal-light); color: var(--color-dsde-teal); font-size: 0.7rem; font-weight: 700;">SCHEMA ARCHITECTURE</span>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin-top: 0.25rem;">
              Data Warehouse Schema Visualizer
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
              Toggle between Star Schema and Snowflake Schema to inspect join complexity and normalization differences.
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-sm btn-primary" id="btn-schema-star" style="background: var(--color-dsde-teal); border: none;">Star Schema</button>
            <button class="btn btn-sm btn-secondary" id="btn-schema-snow">Snowflake Schema</button>
          </div>
        </div>

        <div id="schema-diagram-box" style="background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.5rem; text-align: center; font-family: var(--font-mono); font-size: 0.85rem; color: #38bdf8; overflow-x: auto;">
          <!-- Dynamically populated schema text -->
        </div>
      </section>
    `;

    bindCalculatorEvents();
    bindSimulatorEvents();
    bindCategoryTabs();
  }

  function bindCategoryTabs() {
    const btns = document.querySelectorAll('.dsde-nav-btn');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        btns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        const filter = b.getAttribute('data-filter');
        document.querySelectorAll('.dsde-calc-card, .dsde-simulator-card').forEach(card => {
          const cat = card.getAttribute('data-cat');
          if (filter === 'all' || cat === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  function bindCalculatorEvents() {
    // 1. Mean
    const btnMean = document.getElementById('btn-calc-mean');
    if (btnMean) {
      btnMean.addEventListener('click', () => {
        const input = document.getElementById('input-mean').value;
        const res = MLForge.dsde.calculators.calcMean(input);
        const box = document.getElementById('res-mean');
        box.style.display = 'block';
        if (res.error) {
          box.innerHTML = `<span style="color: #f43f5e;">${res.error}</span>`;
        } else {
          box.innerHTML = `
            <div style="font-size: 0.85rem; color: var(--text-muted);">Result:</div>
            <div style="font-size: 1.4rem; font-weight: 800; color: #10b981; margin: 0.25rem 0;">Mean (x̄) = ${res.result}</div>
            <div class="dsde-calc-steps">${res.steps.map(s => `<div>• ${s}</div>`).join('')}</div>
          `;
        }
      });
      document.getElementById('btn-reset-mean').addEventListener('click', () => {
        document.getElementById('input-mean').value = '';
        document.getElementById('res-mean').style.display = 'none';
      });
    }

    // 2. Median
    const btnMedian = document.getElementById('btn-calc-median');
    if (btnMedian) {
      btnMedian.addEventListener('click', () => {
        const input = document.getElementById('input-median').value;
        const res = MLForge.dsde.calculators.calcMedian(input);
        const box = document.getElementById('res-median');
        box.style.display = 'block';
        if (res.error) {
          box.innerHTML = `<span style="color: #f43f5e;">${res.error}</span>`;
        } else {
          box.innerHTML = `
            <div style="font-size: 0.85rem; color: var(--text-muted);">Result:</div>
            <div style="font-size: 1.4rem; font-weight: 800; color: #10b981; margin: 0.25rem 0;">Median = ${res.result}</div>
            <div class="dsde-calc-steps">${res.steps.map(s => `<div>• ${s}</div>`).join('')}</div>
          `;
        }
      });
      document.getElementById('btn-reset-median').addEventListener('click', () => {
        document.getElementById('input-median').value = '';
        document.getElementById('res-median').style.display = 'none';
      });
    }

    // 3. StdDev
    const btnStd = document.getElementById('btn-calc-stddev');
    if (btnStd) {
      btnStd.addEventListener('click', () => {
        const input = document.getElementById('input-stddev').value;
        const res = MLForge.dsde.calculators.calcStdDev(input, true);
        const box = document.getElementById('res-stddev');
        box.style.display = 'block';
        if (res.error) {
          box.innerHTML = `<span style="color: #f43f5e;">${res.error}</span>`;
        } else {
          box.innerHTML = `
            <div style="font-size: 0.85rem; color: var(--text-muted);">Result:</div>
            <div style="font-size: 1.4rem; font-weight: 800; color: #10b981; margin: 0.25rem 0;">Sample Std Dev (s) = ${res.result}</div>
            <div style="font-size: 0.95rem; color: var(--text-secondary);">Variance (s²) = ${res.variance}</div>
            <div class="dsde-calc-steps">${res.steps.map(s => `<div>• ${s}</div>`).join('')}</div>
          `;
        }
      });
      document.getElementById('btn-reset-stddev').addEventListener('click', () => {
        document.getElementById('input-stddev').value = '';
        document.getElementById('res-stddev').style.display = 'none';
      });
    }

    // 4. Correlation
    const btnCorr = document.getElementById('btn-calc-corr');
    if (btnCorr) {
      btnCorr.addEventListener('click', () => {
        const x = document.getElementById('input-corr-x').value;
        const y = document.getElementById('input-corr-y').value;
        const res = MLForge.dsde.calculators.calcCorrelation(x, y);
        const box = document.getElementById('res-corr');
        box.style.display = 'block';
        if (res.error) {
          box.innerHTML = `<span style="color: #f43f5e;">${res.error}</span>`;
        } else {
          box.innerHTML = `
            <div style="font-size: 0.85rem; color: var(--text-muted);">Result:</div>
            <div style="font-size: 1.4rem; font-weight: 800; color: #10b981; margin: 0.25rem 0;">Pearson r = ${res.result}</div>
            <div style="font-size: 0.85rem; color: var(--color-dsde-teal); font-weight: 600;">${res.interpretation}</div>
            <div class="dsde-calc-steps">${res.steps.map(s => `<div>• ${s}</div>`).join('')}</div>
          `;
        }
      });
      document.getElementById('btn-reset-corr').addEventListener('click', () => {
        document.getElementById('input-corr-x').value = '';
        document.getElementById('input-corr-y').value = '';
        document.getElementById('res-corr').style.display = 'none';
      });
    }

    // 5. Z-Score
    const btnZ = document.getElementById('btn-calc-z');
    if (btnZ) {
      btnZ.addEventListener('click', () => {
        const x = document.getElementById('input-z-x').value;
        const m = document.getElementById('input-z-mean').value;
        const s = document.getElementById('input-z-std').value;
        const res = MLForge.dsde.calculators.calcZScore(x, m, s);
        const box = document.getElementById('res-z');
        box.style.display = 'block';
        if (res.error) {
          box.innerHTML = `<span style="color: #f43f5e;">${res.error}</span>`;
        } else {
          box.innerHTML = `
            <div style="font-size: 0.85rem; color: var(--text-muted);">Result:</div>
            <div style="font-size: 1.4rem; font-weight: 800; color: #10b981; margin: 0.25rem 0;">Z = ${res.result}</div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">${res.position}</div>
            <div class="dsde-calc-steps">${res.steps.map(st => `<div>• ${st}</div>`).join('')}</div>
          `;
        }
      });
    }

    // 6. Normal Distribution
    const btnNorm = document.getElementById('btn-calc-norm');
    if (btnNorm) {
      btnNorm.addEventListener('click', () => {
        const x = document.getElementById('input-norm-x').value;
        const m = document.getElementById('input-norm-mean').value;
        const s = document.getElementById('input-norm-std').value;
        const res = MLForge.dsde.calculators.calcNormalDist(x, m, s);
        const box = document.getElementById('res-norm');
        box.style.display = 'block';
        if (res.error) {
          box.innerHTML = `<span style="color: #f43f5e;">${res.error}</span>`;
        } else {
          box.innerHTML = `
            <div style="font-size: 0.85rem; color: var(--text-muted);">Probability of value &le; ${x}:</div>
            <div style="font-size: 1.4rem; font-weight: 800; color: #10b981; margin: 0.25rem 0;">${res.pCumulative}</div>
            <div class="dsde-calc-steps">${res.steps.map(st => `<div>• ${st}</div>`).join('')}</div>
          `;
        }
      });
    }

    // 7. IQR
    const btnIqr = document.getElementById('btn-calc-iqr');
    if (btnIqr) {
      btnIqr.addEventListener('click', () => {
        const input = document.getElementById('input-iqr').value;
        const res = MLForge.dsde.calculators.calcIQR(input);
        const box = document.getElementById('res-iqr');
        box.style.display = 'block';
        if (res.error) {
          box.innerHTML = `<span style="color: #f43f5e;">${res.error}</span>`;
        } else {
          box.innerHTML = `
            <div style="font-size: 0.85rem; color: var(--text-muted);">IQR:</div>
            <div style="font-size: 1.4rem; font-weight: 800; color: #10b981; margin: 0.25rem 0;">IQR = ${res.result}</div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">Bounds: [${res.lowerBound}, ${res.upperBound}] | Outliers: <strong>${res.outliers}</strong></div>
            <div class="dsde-calc-steps">${res.steps.map(st => `<div>• ${st}</div>`).join('')}</div>
          `;
        }
      });
    }

    // 8. CI
    const btnCi = document.getElementById('btn-calc-ci');
    if (btnCi) {
      btnCi.addEventListener('click', () => {
        const m = document.getElementById('input-ci-mean').value;
        const s = document.getElementById('input-ci-std').value;
        const n = document.getElementById('input-ci-n').value;
        const lvl = document.getElementById('input-ci-level').value;
        const res = MLForge.dsde.calculators.calcConfidenceInterval(m, s, n, lvl);
        const box = document.getElementById('res-ci');
        box.style.display = 'block';
        if (res.error) {
          box.innerHTML = `<span style="color: #f43f5e;">${res.error}</span>`;
        } else {
          box.innerHTML = `
            <div style="font-size: 0.85rem; color: var(--text-muted);">${lvl}% Confidence Interval:</div>
            <div style="font-size: 1.4rem; font-weight: 800; color: #10b981; margin: 0.25rem 0;">${res.interval}</div>
            <div class="dsde-calc-steps">${res.steps.map(st => `<div>• ${st}</div>`).join('')}</div>
          `;
        }
      });
    }

    // 9. Sample Size
    const btnSs = document.getElementById('btn-calc-ss');
    if (btnSs) {
      btnSs.addEventListener('click', () => {
        const b = document.getElementById('input-ss-base').value;
        const m = document.getElementById('input-ss-mde').value;
        const res = MLForge.dsde.calculators.calcSampleSize(b, m);
        const box = document.getElementById('res-ss');
        box.style.display = 'block';
        if (res.error) {
          box.innerHTML = `<span style="color: #f43f5e;">${res.error}</span>`;
        } else {
          box.innerHTML = `
            <div style="font-size: 0.85rem; color: var(--text-muted);">Required Sample Size:</div>
            <div style="font-size: 1.4rem; font-weight: 800; color: #10b981; margin: 0.25rem 0;">${res.samplePerVariant} users / variant</div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">Total experiment cohort: ${res.totalSample} users</div>
            <div class="dsde-calc-steps">${res.steps.map(st => `<div>• ${st}</div>`).join('')}</div>
          `;
        }
      });
    }

    // DE Tool 1: Size
    const btnSize = document.getElementById('btn-calc-size');
    if (btnSize) {
      btnSize.addEventListener('click', () => {
        const val = document.getElementById('input-size-val').value;
        const unit = document.getElementById('input-size-unit').value;
        const bw = document.getElementById('input-size-bw').value;
        const res = MLForge.dsde.calculators.convertDataSize(val, unit, bw);
        const box = document.getElementById('res-size');
        box.style.display = 'block';
        if (res.error) {
          box.innerHTML = `<span style="color: #f43f5e;">${res.error}</span>`;
        } else {
          box.innerHTML = `
            <div style="font-size: 0.85rem; color: var(--text-muted);">Estimated Transfer Duration @ ${res.bandwidth}:</div>
            <div style="font-size: 1.4rem; font-weight: 800; color: var(--color-dsde-orange); margin: 0.25rem 0;">${res.transferTime}</div>
            <div class="dsde-calc-steps">
              <div>• Bytes: ${res.bytes}</div>
              <div>• Megabytes: ${res.mb}</div>
              <div>• Gigabytes: ${res.gb}</div>
              <div>• Terabytes: ${res.tb}</div>
            </div>
          `;
        }
      });
    }

    // DE Tool 2: JSON
    const btnJson = document.getElementById('btn-calc-json');
    if (btnJson) {
      btnJson.addEventListener('click', () => {
        const raw = document.getElementById('input-json').value;
        const res = MLForge.dsde.calculators.validateJson(raw);
        const box = document.getElementById('res-json');
        box.style.display = 'block';
        if (!res.valid) {
          box.innerHTML = `<span style="color: #f43f5e; font-weight: 700;">Invalid JSON Syntax:</span> <div style="font-size: 0.8rem; margin-top: 0.25rem;">${res.error}</div>`;
        } else {
          box.innerHTML = `
            <div style="color: #10b981; font-weight: 700;">✓ Valid ${res.type} (${res.itemCount} items, ${res.byteSize})</div>
            <textarea class="dsde-input" rows="4" style="margin-top: 0.5rem; font-family: var(--font-mono); font-size: 0.775rem;">${res.formatted}</textarea>
          `;
        }
      });
    }

    // DE Tool 3: CSV
    const btnCsv = document.getElementById('btn-calc-csv');
    if (btnCsv) {
      btnCsv.addEventListener('click', () => {
        const raw = document.getElementById('input-csv').value;
        const res = MLForge.dsde.calculators.analyzeCsv(raw);
        const box = document.getElementById('res-csv');
        box.style.display = 'block';
        if (res.error) {
          box.innerHTML = `<span style="color: #f43f5e;">${res.error}</span>`;
        } else {
          box.innerHTML = `
            <div style="font-weight: 700; color: #10b981; margin-bottom: 0.5rem;">Detected ${res.rowCount} rows × ${res.colCount} columns:</div>
            <div class="dsde-table-wrapper" style="margin: 0.5rem 0;">
              <table class="dsde-concept-table">
                <thead>
                  <tr><th>Column</th><th>Inferred Type</th><th>Missing Count</th><th>Null %</th></tr>
                </thead>
                <tbody>
                  ${res.schema.map(s => `<tr><td><code>${s.column}</code></td><td><span class="badge badge-blue">${s.type}</span></td><td>${s.nullCount}</td><td>${s.nullPct}</td></tr>`).join('')}
                </tbody>
              </table>
            </div>
          `;
        }
      });
    }
  }

  function bindSimulatorEvents() {
    // Pipeline visualizer run button
    const btnPipe = document.getElementById('btn-run-pipeline');
    const logs = document.getElementById('pipe-console-logs');
    if (btnPipe && logs) {
      btnPipe.addEventListener('click', () => {
        btnPipe.disabled = true;
        logs.innerHTML = "[Pipeline Init] Ingestion triggered for batch #4092...\n";

        const stages = [
          { id: 'pipe-stage-1', label: 'Raw Ingestion', log: '[Stage 1: Ingestion] Reading 50,000 JSON records from external payment webhook.' },
          { id: 'pipe-stage-2', label: 'Schema Check', log: '[Stage 2: Validation] Pydantic schema validation: 49,998 valid records, 2 malformed rows sent to DLQ.' },
          { id: 'pipe-stage-3', label: 'Deduplication', log: '[Stage 3: Deduplication] Deduplicating by transaction_id: 14 duplicated payloads discarded.' },
          { id: 'pipe-stage-4', label: 'Enrichment', log: '[Stage 4: Transformation] Joining with Dim_Customer: currency normalized to USD, geocoded.' },
          { id: 'pipe-stage-5', label: 'Warehouse Load', log: '[Stage 5: Loading] Bulk upserting 49,984 records into Snowflake Gold Sales Mart.' }
        ];

        let step = 0;
        function executeStep() {
          if (step > 0) {
            const prev = document.getElementById(stages[step - 1].id);
            if (prev) {
              prev.classList.remove('active');
              prev.classList.add('done');
              prev.querySelector('.pipe-status').textContent = '✓ Done';
              prev.querySelector('.pipe-status').style.color = '#10b981';
            }
          }

          if (step < stages.length) {
            const curr = document.getElementById(stages[step].id);
            if (curr) {
              curr.classList.add('active');
              curr.querySelector('.pipe-status').textContent = 'Running...';
              curr.querySelector('.pipe-status').style.color = 'var(--color-dsde-teal)';
            }
            logs.innerHTML += `${stages[step].log}\n`;
            logs.scrollTop = logs.scrollHeight;
            step++;
            setTimeout(executeStep, 800);
          } else {
            logs.innerHTML += "[Pipeline Success] Batch #4092 completed in 4.02 seconds. Status: SUCCESS.\n";
            logs.scrollTop = logs.scrollHeight;
            btnPipe.disabled = false;
          }
        }
        executeStep();
      });
    }

    // Schema Visualizer Switcher
    const btnStar = document.getElementById('btn-schema-star');
    const btnSnow = document.getElementById('btn-schema-snow');
    const schemaBox = document.getElementById('schema-diagram-box');

    function renderStarSchema() {
      if (!schemaBox) return;
      schemaBox.innerHTML = `
        <div style="font-weight: 700; color: #14b8a6; margin-bottom: 0.75rem;">★ STAR SCHEMA (Denormalized - Recommended for OLAP)</div>
        <pre style="text-align: left; display: inline-block; margin: 0; color: #38bdf8;">
                       +-----------------------+
                       |     dim_customer      |
                       +-----------------------+
                       | * customer_key (PK)   |
                       |   customer_name       |
                       |   city, state, country|
                       +-----------------------+
                                  |
                                  | 1:N
                                  v
+-----------------------+      +-----------------------+      +-----------------------+
|       dim_date        | ===> |      fact_sales       | &lt;=== |      dim_product      |
+-----------------------+ 1:N  +-----------------------+ 1:N  +-----------------------+
| * date_key (PK)       |      | # sales_id (PK)       |      | * product_key (PK)    |
|   full_date           |      | * customer_key (FK)   |      |   product_name        |
|   month, year, quarter|      | * date_key (FK)       |      |   category, brand     |
+-----------------------+      | * product_key (FK)    |      |   unit_price          |
                               |   quantity            |      +-----------------------+
                               |   total_amount        |
                               +-----------------------+
        </pre>
      `;
    }

    function renderSnowflakeSchema() {
      if (!schemaBox) return;
      schemaBox.innerHTML = `
        <div style="font-weight: 700; color: #f97316; margin-bottom: 0.75rem;">❄ SNOWFLAKE SCHEMA (Normalized Dimensions)</div>
        <pre style="text-align: left; display: inline-block; margin: 0; color: #fbbf24;">
   +-------------------+      +-----------------------+
   |     dim_city      | ===> |     dim_customer      |
   +-------------------+ 1:N  +-----------------------+
   | * city_id (PK)    |      | * customer_key (PK)   |
   |   city_name       |      |   customer_name       |
   |   state_id (FK)   |      |   city_id (FK)        |
   +-------------------+      +-----------------------+
             |                            |
             v                            v
   +-------------------+      +-----------------------+      +-----------------------+
   |     dim_state     |      |      fact_sales       | ===> |      dim_product      |
   +-------------------+      +-----------------------+ 1:N  +-----------------------+
   | * state_id (PK)   |      | # sales_id (PK)       |      | * product_key (PK)    |
   |   state_name      |      | * customer_key (FK)   |      |   product_name        |
   +-------------------+      |   quantity, total_amt |      |   category_id (FK)    |
                              +-----------------------+      +-----------------------+
                                                                         |
                                                                         v
                                                             +-----------------------+
                                                             |     dim_category      |
                                                             +-----------------------+
                                                             | * category_id (PK)    |
                                                             |   category_name       |
                                                             +-----------------------+
        </pre>
      `;
    }

    if (btnStar && btnSnow) {
      renderStarSchema();
      btnStar.addEventListener('click', () => {
        btnStar.classList.add('btn-primary');
        btnStar.classList.remove('btn-secondary');
        btnSnow.classList.add('btn-secondary');
        btnSnow.classList.remove('btn-primary');
        renderStarSchema();
      });
      btnSnow.addEventListener('click', () => {
        btnSnow.classList.add('btn-primary');
        btnSnow.classList.remove('btn-secondary');
        btnStar.classList.add('btn-secondary');
        btnStar.classList.remove('btn-primary');
        renderSnowflakeSchema();
      });
    }
  }

  // =========================================================================
  // VIEW 6: DATA SCIENCE TOOLS REFERENCE
  // =========================================================================
  function renderTools(activeToolId) {
    const tools = (MLForge.dsde.data && MLForge.dsde.data.tools) ? MLForge.dsde.data.tools : [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          Data Science Tools &amp; Libraries Directory
        </h1>
        <p style="color: var(--text-secondary); max-width: 820px; line-height: 1.5;">
          Complete technical reference for the 15 foundational tools in the Python data science stack. Includes explanations, installations, basic code snippets, and official documentation links.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
        ${tools.map(tool => `
          <div class="card" id="tool-${tool.id}" style="padding: 1.5rem; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
              <div>
                <span class="badge" style="background: rgba(255,255,255,0.06); color: ${tool.iconColor}; font-weight: 700; font-size: 0.7rem;">
                  ${tool.category}
                </span>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-top: 0.35rem;">
                  ${tool.name}
                </h3>
              </div>
              <span class="badge badge-gray" style="font-size: 0.65rem;">${tool.badge}</span>
            </div>

            <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem; flex: 1;">
              ${tool.whatIsIt}
            </p>

            <div style="margin-bottom: 1rem;">
              <strong style="font-size: 0.8rem; color: var(--text-main); text-transform: uppercase; letter-spacing: 0.05em;">Key Capabilities:</strong>
              <ul style="margin: 0.4rem 0 0.75rem 1.2rem; font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">
                ${tool.keyFeatures.map(f => `<li>${f}</li>`).join('')}
              </ul>
            </div>

            <div style="background: var(--bg-code); border: 1px solid var(--border-card); border-radius: var(--radius-sm); padding: 0.65rem 0.85rem; font-family: var(--font-mono); font-size: 0.775rem; color: #10b981; margin-bottom: 1rem;">
              $ ${tool.install}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
              <span style="font-size: 0.75rem; color: var(--text-muted);">Verified Python 3.10+</span>
              <a href="${tool.docLink}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-ghost" style="color: var(--color-dsde-teal);">
                Official Docs ↗
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // VIEW 7: PROJECTS LIBRARY
  // =========================================================================
  function renderProjects(activeTier) {
    const allProjects = (MLForge.dsde.data && MLForge.dsde.data.projects) ? MLForge.dsde.data.projects : [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          Real-World Data Science &amp; Engineering Projects
        </h1>
        <p style="color: var(--text-secondary); max-width: 820px; line-height: 1.5;">
          Production-grade project blueprints across Beginner, Intermediate, and Advanced tiers. Every project includes problem statement, architecture diagrams, folder structure, code, testing, and deployment guides.
        </p>

        <!-- Filter tabs -->
        <div class="dsde-nav-tabs" style="margin-top: 1.5rem;" id="project-filter-tabs">
          <button class="dsde-nav-btn active" data-filter="all">All Projects (33)</button>
          <button class="dsde-nav-btn" data-filter="ds">Data Science (18)</button>
          <button class="dsde-nav-btn" data-filter="de">Data Engineering (15)</button>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.5rem;" id="projects-container">
        ${allProjects.map(proj => {
          const isDone = MLForge.dsde.storage ? MLForge.dsde.storage.isProjectCompleted(proj.id) : false;
          const isDs = proj.track === 'ds';
          return `
            <div class="card dsde-project-card" data-track="${proj.track}" data-tier="${proj.tier}" id="proj-${proj.id}" style="padding: 1.75rem; border-left: 4px solid ${isDs ? 'var(--color-dsde-teal)' : 'var(--color-dsde-orange)'};">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                    <span class="badge" style="background: ${isDs ? 'var(--color-dsde-teal-light)' : 'var(--color-dsde-orange-light)'}; color: ${isDs ? 'var(--color-dsde-teal)' : 'var(--color-dsde-orange)'}; font-size: 0.65rem; font-weight: 700;">
                      ${proj.track.toUpperCase()} • ${proj.tier}
                    </span>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${proj.category}</span>
                  </div>
                  <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--text-main); margin: 0;">${proj.title}</h3>
                </div>
                <button class="btn btn-sm ${isDone ? 'btn-secondary' : 'btn-ghost'}" onclick="MLForge.dsde.router.toggleProject('${proj.id}')" style="font-size: 0.775rem;">
                  ${isDone ? '✓ Completed' : 'Mark as Built'}
                </button>
              </div>

              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem;">
                <strong>Problem Statement:</strong> ${proj.problemStatement}
              </p>

              <!-- Tech Stack Badges -->
              <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem;">
                ${proj.techStack.map(t => `<span class="badge badge-gray" style="font-size: 0.7rem;">${t}</span>`).join('')}
              </div>

              <!-- Collapsible Architecture & Implementation -->
              <details style="background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.85rem 1.25rem;">
                <summary style="font-size: 0.85rem; font-weight: 600; color: var(--color-dsde-teal); cursor: pointer; user-select: none;">
                  View Architecture, Code &amp; Implementation Details
                </summary>
                <div style="margin-top: 1rem; font-size: 0.85rem; line-height: 1.6; color: var(--text-secondary);">
                  <div style="margin-bottom: 1rem;">
                    <strong style="color: var(--text-main);">Architecture Flow:</strong>
                    <pre class="dsde-code-pre" style="color: #38bdf8; font-size: 0.775rem; padding: 0.65rem 0.85rem;">${proj.architecture}</pre>
                  </div>
                  <div style="margin-bottom: 1rem;">
                    <strong style="color: var(--text-main);">Folder Structure:</strong>
                    <pre class="dsde-code-pre" style="color: #a7f3d0; font-size: 0.775rem; padding: 0.65rem 0.85rem;">${proj.folderStructure}</pre>
                  </div>
                  <div style="margin-bottom: 1rem;">
                    <strong style="color: var(--text-main);">Production Code Snippet:</strong>
                    <pre class="dsde-code-pre" style="font-size: 0.8rem;">${proj.codeSnippet}</pre>
                  </div>
                  <div style="margin-bottom: 0.75rem;">
                    <strong style="color: var(--text-main);">Expected Output:</strong> ${proj.expectedOutput}
                  </div>
                  <div style="margin-bottom: 0.75rem;">
                    <strong style="color: var(--text-main);">Testing:</strong> ${proj.testing}
                  </div>
                  <div>
                    <strong style="color: var(--text-main);">Deployment &amp; Cloud:</strong> ${proj.deployment}
                  </div>
                </div>
              </details>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Bind project filters
    const btns = document.querySelectorAll('#project-filter-tabs .dsde-nav-btn');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        btns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        const filter = b.getAttribute('data-filter');
        document.querySelectorAll('.dsde-project-card').forEach(card => {
          const track = card.getAttribute('data-track');
          if (filter === 'all' || track === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  function toggleProject(projId) {
    if (!MLForge.dsde.storage) return;
    const completed = MLForge.dsde.storage.toggleProjectCompleted(projId);
    if (MLForge.ui) MLForge.ui.showToast(completed ? "Project marked as completed!" : "Project unmarked", "success");
    renderProjects();
  }

  // =========================================================================
  // VIEW 8: CAREER ROADMAPS
  // =========================================================================
  function renderRoadmaps(activeRoadmapId) {
    const roadmaps = (MLForge.dsde.data && MLForge.dsde.data.roadmaps) ? MLForge.dsde.data.roadmaps : [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          Data Career Roadmaps
        </h1>
        <p style="color: var(--text-secondary); max-width: 820px; line-height: 1.5;">
          Step-by-step career progressions from zero to job-ready across 6 high-demand technical specializations.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 2.5rem;">
        ${roadmaps.map(rm => `
          <div class="card" id="${rm.id}" style="padding: 2rem; border-top: 4px solid ${rm.track === 'ds' ? 'var(--color-dsde-teal)' : 'var(--color-dsde-orange)'};">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
              <div>
                <span class="badge" style="background: ${rm.track === 'ds' ? 'var(--color-dsde-teal-light)' : 'var(--color-dsde-orange-light)'}; color: ${rm.track === 'ds' ? 'var(--color-dsde-teal)' : 'var(--color-dsde-orange)'}; font-weight: 700;">
                  ${rm.badge}
                </span>
                <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-main); margin-top: 0.35rem;">${rm.title}</h2>
              </div>
              <span class="badge badge-emerald" style="font-size: 0.8rem; font-weight: 700;">${rm.salaryRange}</span>
            </div>

            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
              ${rm.overview}
            </p>

            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem;">
              Learning Phases &amp; Milestones
            </h3>

            <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
              ${rm.milestones.map((m, idx) => `
                <div class="dsde-roadmap-step">
                  <div class="dsde-roadmap-marker">${idx + 1}</div>
                  ${idx < rm.milestones.length - 1 ? '<div class="dsde-roadmap-line"></div>' : ''}
                  <div class="dsde-roadmap-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                      <strong style="color: var(--text-main); font-size: 0.95rem;">${m.phase}</strong>
                      <span class="badge badge-gray" style="font-size: 0.65rem;">${m.duration}</span>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${m.description}</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.5rem;">
                      ${m.skills.map(s => `<span class="badge badge-blue" style="font-size: 0.65rem;">${s}</span>`).join('')}
                    </div>
                    <div style="font-size: 0.8rem; color: var(--color-dsde-teal);">
                      🎯 <strong>Milestone Project:</strong> ${m.projectGoal}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <div style="background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
              <strong style="color: var(--text-main); font-size: 0.9rem;">Target Interview Questions:</strong>
              <ul style="margin: 0.5rem 0 0 1.2rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                ${rm.interviewPrep.map(q => `<li>${q}</li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // VIEW 9: INTERVIEW PREPARATION
  // =========================================================================
  function renderInterview(activeCategory) {
    const questions = (MLForge.dsde.data && MLForge.dsde.data.interviewQuestions) ? MLForge.dsde.data.interviewQuestions : [];
    const categories = Array.from(new Set(questions.map(q => q.category)));

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          Data Science &amp; Data Engineering Interview Question Bank
        </h1>
        <p style="color: var(--text-secondary); max-width: 820px; line-height: 1.5;">
          High-frequency interview questions asked by top tech firms (FAANG, Fortune 500, and AI startups). Click any question to reveal the comprehensive, simple English answer.
        </p>

        <!-- Category Filter Pills -->
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 1.25rem;" id="interview-cat-filters">
          <button class="btn btn-sm btn-primary active-cat" data-cat="all" style="font-size: 0.775rem;">All Topics (${questions.length})</button>
          ${categories.map(c => `
            <button class="btn btn-sm btn-ghost" data-cat="${c}" style="font-size: 0.775rem;">${c}</button>
          `).join('')}
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.75rem;" id="interview-list-container">
        ${questions.map(q => `
          <div class="dsde-qa-card" data-cat="${q.category}">
            <div class="dsde-qa-question" onclick="this.parentElement.classList.toggle('open')">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span class="badge badge-gray" style="font-size: 0.65rem;">${q.tier}</span>
                <span class="badge badge-blue" style="font-size: 0.65rem;">${q.category}</span>
                <span>${q.question}</span>
              </div>
              <span style="font-weight: 700; font-size: 1.1rem; color: var(--color-dsde-teal);">+</span>
            </div>
            <div class="dsde-qa-answer">
              ${q.answer}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Bind category filter buttons
    const btns = document.querySelectorAll('#interview-cat-filters button');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        btns.forEach(x => { x.classList.remove('btn-primary'); x.classList.add('btn-ghost'); });
        b.classList.add('btn-primary');
        b.classList.remove('btn-ghost');
        const cat = b.getAttribute('data-cat');
        document.querySelectorAll('#interview-list-container .dsde-qa-card').forEach(card => {
          if (cat === 'all' || card.getAttribute('data-cat') === cat) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // =========================================================================
  // VIEW 10: PRACTICE QUIZZES & LAB
  // =========================================================================
  function renderPractice(activeTier) {
    const quizzes = (MLForge.dsde.data && MLForge.dsde.data.quizzes) ? MLForge.dsde.data.quizzes : [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          Interactive Practice Lab &amp; Quizzes
        </h1>
        <p style="color: var(--text-secondary); max-width: 820px; line-height: 1.5;">
          Test your mastery across Beginner, Intermediate, and Advanced challenges. Select your answers for immediate validation and in-depth explanations.
        </p>

        <!-- Tier Navigation Tabs -->
        <div class="dsde-nav-tabs" style="margin-top: 1.5rem;" id="quiz-tier-tabs">
          <button class="dsde-nav-btn active" data-tier="all">All Quizzes (${quizzes.length})</button>
          <button class="dsde-nav-btn" data-tier="Beginner">Beginner</button>
          <button class="dsde-nav-btn" data-tier="Intermediate">Intermediate</button>
          <button class="dsde-nav-btn" data-tier="Advanced">Advanced</button>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.5rem;" id="quiz-cards-container">
        ${quizzes.map((q, idx) => `
          <div class="card quiz-challenge-card" data-tier="${q.tier}" id="quiz-card-${q.id}" style="padding: 1.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="badge ${q.tier === 'Beginner' ? 'badge-emerald' : q.tier === 'Intermediate' ? 'badge-amber' : 'badge-rose'}" style="font-size: 0.65rem;">
                  ${q.tier}
                </span>
                <span class="badge badge-gray" style="font-size: 0.65rem;">${q.category}</span>
              </div>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Question ${idx + 1} of ${quizzes.length}</span>
            </div>

            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem; line-height: 1.4;">
              ${q.question}
            </h3>

            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.25rem;">
              ${q.options.map((opt, optIdx) => `
                <button class="btn btn-secondary quiz-opt-btn" data-quiz="${q.id}" data-opt="${optIdx}" style="justify-content: flex-start; text-align: left; padding: 0.75rem 1rem; font-size: 0.875rem; font-weight: normal; line-height: 1.4;">
                  <span style="font-weight: 700; margin-right: 0.5rem; color: var(--text-muted);">${String.fromCharCode(65 + optIdx)}.</span>
                  ${opt}
                </button>
              `).join('')}
            </div>

            <div class="quiz-feedback-box" id="feedback-${q.id}" style="display: none; padding: 1rem; border-radius: var(--radius-md); font-size: 0.85rem; line-height: 1.5;"></div>
          </div>
        `).join('')}
      </div>
    `;

    // Bind option selection
    quizzes.forEach(q => {
      const btns = document.querySelectorAll(`[data-quiz="${q.id}"]`);
      const feedback = document.getElementById(`feedback-${q.id}`);
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          const selected = parseInt(btn.getAttribute('data-opt'));
          btns.forEach(b => {
            b.disabled = true;
            b.style.opacity = '0.6';
          });
          feedback.style.display = 'block';

          if (selected === q.correctIndex) {
            btn.style.opacity = '1';
            btn.style.borderColor = '#10b981';
            btn.style.background = 'rgba(16, 185, 129, 0.15)';
            feedback.style.background = 'rgba(16, 185, 129, 0.1)';
            feedback.style.border = '1px solid #10b981';
            feedback.style.color = '#10b981';
            feedback.innerHTML = `<strong>✓ Correct!</strong> ${q.explanation}`;
          } else {
            btn.style.opacity = '1';
            btn.style.borderColor = '#f43f5e';
            btn.style.background = 'rgba(244, 63, 94, 0.15)';
            // Highlight correct one
            const correctBtn = document.querySelector(`[data-quiz="${q.id}"][data-opt="${q.correctIndex}"]`);
            if (correctBtn) {
              correctBtn.style.opacity = '1';
              correctBtn.style.borderColor = '#10b981';
              correctBtn.style.background = 'rgba(16, 185, 129, 0.15)';
            }
            feedback.style.background = 'rgba(244, 63, 94, 0.1)';
            feedback.style.border = '1px solid #f43f5e';
            feedback.style.color = '#f1f5f9';
            feedback.innerHTML = `<strong style="color: #f43f5e;">✗ Incorrect.</strong> ${q.explanation}`;
          }
        });
      });
    });

    // Tier filtering
    const tierBtns = document.querySelectorAll('#quiz-tier-tabs .dsde-nav-btn');
    tierBtns.forEach(b => {
      b.addEventListener('click', () => {
        tierBtns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        const tier = b.getAttribute('data-tier');
        document.querySelectorAll('.quiz-challenge-card').forEach(card => {
          if (tier === 'all' || card.getAttribute('data-tier') === tier) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // =========================================================================
  // VIEW 11: PROGRESS DASHBOARD
  // =========================================================================
  function renderProgress() {
    const dsTopics = (MLForge.dsde.data && MLForge.dsde.data.dsTopics) ? MLForge.dsde.data.dsTopics : [];
    const deTopics = (MLForge.dsde.data && MLForge.dsde.data.deTopics) ? MLForge.dsde.data.deTopics : [];
    const completedTopics = MLForge.dsde.storage ? MLForge.dsde.storage.getCompletedTopics() : [];
    const completedProjects = MLForge.dsde.storage ? MLForge.dsde.storage.getCompletedProjects() : [];
    const bookmarks = MLForge.dsde.storage ? MLForge.dsde.storage.getBookmarks() : [];

    const totalTopics = dsTopics.length + deTopics.length;
    const pct = Math.round((completedTopics.length / Math.max(1, totalTopics)) * 100);

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          My Learning Journey &amp; Progress
        </h1>
        <p style="color: var(--text-secondary); max-width: 820px; line-height: 1.5;">
          Track your course completion, saved bookmarks, and completed hands-on projects. Persisted 100% locally in your browser.
        </p>
      </div>

      <!-- Overall Stats Card -->
      <div class="card" style="padding: 1.75rem; margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin: 0;">Total Progress</h2>
          <span style="font-size: 1.35rem; font-weight: 800; color: var(--color-dsde-teal);">${pct}% Completed</span>
        </div>
        <div style="height: 12px; background: var(--bg-app); border-radius: 9999px; overflow: hidden; margin-bottom: 1.5rem;">
          <div style="width: ${pct}%; height: 100%; background: linear-gradient(90deg, #14b8a6, #f97316); transition: width 0.3s ease;"></div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
          <div style="background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--text-main);">${completedTopics.length} / ${totalTopics}</div>
            <div style="font-size: 0.775rem; color: var(--text-muted);">Topics Completed</div>
          </div>
          <div style="background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--text-main);">${completedProjects.length} / 33</div>
            <div style="font-size: 0.775rem; color: var(--text-muted);">Projects Built</div>
          </div>
          <div style="background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--text-main);">${bookmarks.length}</div>
            <div style="font-size: 0.775rem; color: var(--text-muted);">Saved Bookmarks</div>
          </div>
        </div>
      </div>

      <!-- Bookmarks List -->
      <section class="card" style="padding: 1.75rem; margin-bottom: 2rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem;">
          Saved Bookmarks (${bookmarks.length})
        </h3>
        ${bookmarks.length === 0 ? `
          <p style="font-size: 0.85rem; color: var(--text-muted);">No bookmarks saved yet. Click the 'Bookmark' button on any lesson to save it for quick review.</p>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${bookmarks.map(b => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">${b.title}</strong>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">${b.category}</div>
                </div>
                <a href="${b.link}" class="btn btn-sm btn-ghost" style="color: var(--color-dsde-teal);">Open Lesson →</a>
              </div>
            `).join('')}
          </div>
        `}
      </section>

      <!-- Danger Zone -->
      <div style="display: flex; justify-content: flex-end;">
        <button class="btn btn-sm btn-secondary" id="btn-reset-progress" style="color: #f43f5e; border-color: rgba(244, 63, 94, 0.3);">
          Reset All Progress Data
        </button>
      </div>
    `;

    const btnReset = document.getElementById('btn-reset-progress');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm("Are you sure you want to reset all completed topics, bookmarks, and quiz scores?")) {
          MLForge.dsde.storage.resetAllProgress();
          if (MLForge.ui) MLForge.ui.showToast("All progress data has been reset.", "info");
          renderProgress();
          if (MLForge.dsde.app) MLForge.dsde.app.updateSidebarCounts();
        }
      });
    }
  }

  return {
    init,
    handleRoute,
    toggleProject
  };
})();
