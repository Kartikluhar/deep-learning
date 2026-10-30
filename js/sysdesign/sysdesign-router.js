/**
 * MLForge System Design View Router & Page Renderer
 * Manages rendering of dashboard, topic syllabus, HLD case studies, LLD case studies,
 * design patterns, calculators, simulators, playground, interview bank, quizzes,
 * glossary, learning roadmap, and user progress.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sysdesign = window.MLForge.sysdesign || {};

MLForge.sysdesign.router = (function () {
  let contentArea = null;

  function init() {
    contentArea = document.getElementById('content-area');
  }

  function handleRoute(subparts = []) {
    if (!contentArea) contentArea = document.getElementById('content-area');
    const subroute = subparts[0] || 'dashboard';
    const param = subparts[1] || null;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateSysdesignSidebarActive(subroute, param);

    switch (subroute) {
      case 'dashboard':
        renderDashboard();
        break;
      case 'topic':
        renderTopic(param || 'intro-to-system-design');
        break;
      case 'case-studies':
        renderCaseStudies(param);
        break;
      case 'case-study':
        renderCaseStudyDetail(param || 'url-shortener');
        break;
      case 'lld':
        renderLLD(param);
        break;
      case 'patterns':
        renderPatterns(param);
        break;
      case 'calculators':
        renderCalculators();
        break;
      case 'simulators':
        renderSimulators();
        break;
      case 'playground':
        renderPlayground();
        break;
      case 'interview':
        renderInterview(param);
        break;
      case 'quizzes':
        renderQuizzes(param);
        break;
      case 'roadmap':
        renderRoadmap();
        break;
      case 'glossary':
        renderGlossary();
        break;
      case 'progress':
        renderProgress();
        break;
      default:
        // Direct topic shortcut check (e.g. #sysdesign/cap-theorem)
        const topics = MLForge.sysdesign.data.topics || [];
        const match = topics.find(t => t.id === subroute);
        if (match) {
          renderTopic(match.id);
        } else {
          renderDashboard();
        }
        break;
    }

    MLForge.ui.updateContextPanel();

    if (window.MLForge && window.MLForge.math) {
      window.MLForge.math.render(contentArea);
    }
  }

  function updateSysdesignSidebarActive(subroute, param) {
    document.querySelectorAll('.sidebar-sub-item, .nav-item').forEach(el => {
      el.classList.remove('active');
    });

    const routeMap = {
      'dashboard': 'nav-sysdesign-dashboard',
      'playground': 'nav-sysdesign-playground',
      'case-studies': 'nav-sysdesign-cases',
      'case-study': 'nav-sysdesign-cases',
      'lld': 'nav-sysdesign-lld',
      'patterns': 'nav-sysdesign-patterns',
      'calculators': 'nav-sysdesign-calculators',
      'simulators': 'nav-sysdesign-simulators',
      'interview': 'nav-sysdesign-interview',
      'quizzes': 'nav-sysdesign-quizzes',
      'roadmap': 'nav-sysdesign-roadmap',
      'glossary': 'nav-sysdesign-glossary',
      'progress': 'nav-sysdesign-progress'
    };

    const targetId = routeMap[subroute];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) el.classList.add('active');
    }

    if (subroute === 'topic' && param) {
      const subItem = document.getElementById(`sysdesign-subnav-${param}`);
      if (subItem) subItem.classList.add('active');
    }
  }

  // =========================================================================
  // 1. DASHBOARD VIEW
  // =========================================================================
  function renderDashboard() {
    const stats = MLForge.sysdesign.storage.getStats();
    const caseStudies = MLForge.sysdesign.data.caseStudies || [];
    const lastOpened = stats.lastOpened;

    contentArea.innerHTML = `
      <!-- Hero Banner -->
      <section class="sysdesign-hero">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
          <span class="badge badge-sysdesign-amber" style="font-size: 0.75rem; font-weight: 700;">PRO CURRICULUM</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Zero-to-Advanced System Design</span>
        </div>
        <h1 class="sysdesign-hero-title">System <span>Design</span></h1>
        <p class="sysdesign-hero-subtitle">
          Learn how to design scalable, reliable, and efficient software systems, from the basics to real-world architectures.
        </p>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <a href="#sysdesign/topic/intro-to-system-design" class="btn btn-primary">
            Start Learning (Step 1)
          </a>
          <a href="#sysdesign/playground" class="btn btn-secondary">
            Architecture Playground
          </a>
          <a href="#sysdesign/simulators" class="btn btn-secondary">
            System Simulators
          </a>
        </div>
      </section>

      <!-- Learning Statistics Grid -->
      <div class="sysdesign-stats-grid">
        <div class="sysdesign-stat-card">
          <span class="sysdesign-stat-label">Total Topics</span>
          <span class="sysdesign-stat-value">${stats.totalTopics}</span>
          <span class="sysdesign-stat-meta">Core Curriculum</span>
        </div>
        <div class="sysdesign-stat-card">
          <span class="sysdesign-stat-label">Completed Topics</span>
          <span class="sysdesign-stat-value" style="color: #10b981;">${stats.completedTopics}</span>
          <span class="sysdesign-stat-meta">Finished Lessons</span>
        </div>
        <div class="sysdesign-stat-card">
          <span class="sysdesign-stat-label">In Progress</span>
          <span class="sysdesign-stat-value" style="color: #f59e0b;">${stats.inProgress}</span>
          <span class="sysdesign-stat-meta">Active Questions</span>
        </div>
        <div class="sysdesign-stat-card">
          <span class="sysdesign-stat-label">Bookmarked</span>
          <span class="sysdesign-stat-value" style="color: #0ea5e9;">${stats.bookmarked}</span>
          <span class="sysdesign-stat-meta">Saved for Revision</span>
        </div>
        <div class="sysdesign-stat-card">
          <span class="sysdesign-stat-label">Practice Questions</span>
          <span class="sysdesign-stat-value" style="color: #8b5cf6;">${stats.completedQuestions} / ${stats.totalQuestions}</span>
          <span class="sysdesign-stat-meta">Solved Interviews</span>
        </div>
        <div class="sysdesign-stat-card">
          <span class="sysdesign-stat-label">Overall Progress</span>
          <span class="sysdesign-stat-value" style="color: #f97316;">${stats.progressPercent}%</span>
          <div style="width: 100%; height: 5px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden; margin-top: 0.25rem;">
            <div style="width: ${stats.progressPercent}%; height: 100%; background: linear-gradient(90deg, #f59e0b, #f97316);"></div>
          </div>
        </div>
      </div>

      <!-- Continue Learning Banner -->
      ${lastOpened ? `
        <div class="sysdesign-continue-banner">
          <div>
            <div style="font-size: 0.725rem; font-weight: 700; color: var(--color-sysdesign-amber); text-transform: uppercase;">Pick Up Where You Left Off</div>
            <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-top: 0.15rem;">${lastOpened.title}</div>
          </div>
          <a href="${lastOpened.link}" class="btn btn-primary" style="font-size: 0.825rem; padding: 0.5rem 1rem;">
            Continue Learning &rarr;
          </a>
        </div>
      ` : ''}

      <!-- Quick Tools Shortcuts -->
      <div style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem;">
          Quick Architecture Tools
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1rem;">
          <a href="#sysdesign/calculators" class="card" style="padding: 1.25rem; text-decoration: none; color: inherit; transition: transform var(--transition-fast);">
            <div style="font-weight: 700; color: var(--color-sysdesign-amber); font-size: 0.95rem; margin-bottom: 0.35rem;">Capacity Calculator</div>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">Estimate RPS, Peak Traffic, Storage, and Bandwidth.</p>
          </a>
          <a href="#sysdesign/playground" class="card" style="padding: 1.25rem; text-decoration: none; color: inherit; transition: transform var(--transition-fast);">
            <div style="font-weight: 700; color: #0ea5e9; font-size: 0.95rem; margin-bottom: 0.35rem;">Diagram Playground</div>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">Visually build, connect, and export architecture diagrams.</p>
          </a>
          <a href="#sysdesign/simulators" class="card" style="padding: 1.25rem; text-decoration: none; color: inherit; transition: transform var(--transition-fast);">
            <div style="font-weight: 700; color: #10b981; font-size: 0.95rem; margin-bottom: 0.35rem;">Load Balancer Sim</div>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">Test Round Robin, Least Conns, and failover live.</p>
          </a>
          <a href="#sysdesign/glossary" class="card" style="padding: 1.25rem; text-decoration: none; color: inherit; transition: transform var(--transition-fast);">
            <div style="font-weight: 700; color: #8b5cf6; font-size: 0.95rem; margin-bottom: 0.35rem;">System Design Glossary</div>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">Quick search of 50+ definitions and revision sheets.</p>
          </a>
        </div>
      </div>

      <!-- Featured Real-World Case Studies -->
      <div style="margin-bottom: 2.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin: 0;">
            Featured Real-World Architectures
          </h2>
          <a href="#sysdesign/case-studies" style="font-size: 0.825rem; color: var(--color-sysdesign-amber); text-decoration: none;">
            View All Case Studies &rarr;
          </a>
        </div>

        <div class="sysdesign-cards-grid">
          ${caseStudies.map(cs => `
            <a href="#sysdesign/case-study/${cs.id}" class="sysdesign-card">
              <div>
                <div class="sysdesign-card-top">
                  <span class="badge ${cs.tier === 'Beginner' ? 'badge-beginner' : cs.tier === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced'}" style="font-size: 0.65rem;">
                    ${cs.tier}
                  </span>
                  <span style="font-size: 0.725rem; color: var(--text-muted);">${cs.readTime}</span>
                </div>
                <h3 class="sysdesign-card-title">${cs.title}</h3>
                <p class="sysdesign-card-desc">${cs.summary}</p>
              </div>
              <div class="sysdesign-card-tags">
                <span class="badge badge-secondary" style="font-size: 0.65rem;">Architecture</span>
                <span class="badge badge-secondary" style="font-size: 0.65rem;">Capacity Estimates</span>
                <span class="badge badge-secondary" style="font-size: 0.65rem;">API & Schemas</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 2. TOPIC DETAIL VIEW
  // =========================================================================
  function renderTopic(topicId) {
    const topics = MLForge.sysdesign.data.topics || [];
    const topic = topics.find(t => t.id === topicId) || topics[0];
    if (!topic) return;

    // Record as recent
    MLForge.sysdesign.storage.addRecentTopic({
      id: topic.id,
      title: topic.title,
      link: `#sysdesign/topic/${topic.id}`,
      type: 'Topic'
    });

    const isCompleted = MLForge.sysdesign.storage.isTopicCompleted(topic.id);
    const isBookmarked = MLForge.sysdesign.storage.isBookmarked(topic.id);

    // Find previous and next topics for navigation
    const currIndex = topics.findIndex(t => t.id === topic.id);
    const prevTopic = currIndex > 0 ? topics[currIndex - 1] : null;
    const nextTopic = currIndex < topics.length - 1 ? topics[currIndex + 1] : null;

    contentArea.innerHTML = `
      <!-- Header -->
      <div class="topic-reader-header">
        <div class="topic-reader-meta">
          <a href="#sysdesign/dashboard" style="color: var(--text-muted); text-decoration: none; font-size: 0.8rem;">System Design</a>
          <span style="color: var(--text-muted);">&bull;</span>
          <span style="font-size: 0.8rem; color: var(--color-sysdesign-amber); font-weight: 600;">${topic.categoryTitle}</span>
          <span style="color: var(--text-muted);">&bull;</span>
          <span class="badge ${topic.difficulty === 'Beginner' ? 'badge-beginner' : topic.difficulty === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced'}" style="font-size: 0.65rem;">
            ${topic.difficulty}
          </span>
          <span style="font-size: 0.775rem; color: var(--text-muted);">${topic.timeToRead} read</span>
        </div>

        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
          <h1 class="topic-reader-title">${topic.title}</h1>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.45rem 0.8rem;" onclick="MLForge.sysdesign.router.toggleBookmark('${topic.id}', '${topic.title}')">
              ${isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
            </button>
            <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}" style="font-size: 0.8rem; padding: 0.45rem 0.8rem;" onclick="MLForge.sysdesign.router.toggleCompleted('${topic.id}')">
              ${isCompleted ? '✓ Completed' : 'Mark Completed'}
            </button>
          </div>
        </div>
        <p class="topic-reader-summary">${topic.summary}</p>
      </div>

      <!-- 1. What is it? -->
      <section class="topic-section-block">
        <h2 class="topic-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          1. What is it?
        </h2>
        <p style="font-size: 1rem; line-height: 1.7; color: var(--text-main); margin: 0;">${topic.definition}</p>
      </section>

      <!-- 2. Why do we need it? -->
      <section class="topic-section-block">
        <h2 class="topic-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          2. Why do we need it & Problems it solves
        </h2>
        <p style="font-size: 0.95rem; line-height: 1.65; color: var(--text-secondary); margin: 0;">${topic.whyItMatters}</p>
      </section>

      <!-- 3. Real-World Analogy -->
      <section class="topic-section-block">
        <h2 class="topic-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          3. Daily Life Example & Analogy
        </h2>
        <div class="analogy-box">
          ${topic.analogy}
        </div>
      </section>

      <!-- 4. How does it work? -->
      <section class="topic-section-block">
        <h2 class="topic-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          4. How Does It Work (Step-by-Step)
        </h2>
        <ul style="padding-left: 1.25rem; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">
          ${topic.howItWorks.map(step => `<li>${step}</li>`).join('')}
        </ul>
      </section>

      <!-- 5. Architecture Diagram -->
      <section class="topic-section-block">
        <h2 class="topic-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
          5. Component Flow Diagram
        </h2>
        <pre class="diagram-container"><code>${topic.diagram}</code></pre>
        <div class="diagram-caption">Figure: Data Flow and Component Interactions for ${topic.title}</div>
      </section>

      <!-- 6 & 7. Advantages and Disadvantages -->
      <section class="topic-section-block">
        <h2 class="topic-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
          6. Trade-Offs: Advantages vs Disadvantages
        </h2>
        <div class="pros-cons-grid">
          <div class="pros-card">
            <div class="pros-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Advantages & Benefits
            </div>
            <ul class="pros-cons-list">
              ${topic.advantages.map(adv => `<li>&bull; ${adv}</li>`).join('')}
            </ul>
          </div>
          <div class="cons-card">
            <div class="cons-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Disadvantages & Limitations
            </div>
            <ul class="pros-cons-list">
              ${topic.disadvantages.map(dis => `<li>&bull; ${dis}</li>`).join('')}
            </ul>
          </div>
        </div>
      </section>

      <!-- 8 & 9. When to Use & When to Avoid -->
      <section class="topic-section-block">
        <h2 class="topic-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
          7. Practical Guidance: When to Use & When to Avoid
        </h2>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="background: rgba(16, 185, 129, 0.08); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid #10b981;">
            <strong style="color: #10b981;">When to Use:</strong> <span style="font-size: 0.9rem; color: var(--text-main);">${topic.whenToUse}</span>
          </div>
          <div style="background: rgba(244, 63, 94, 0.08); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid #f43f5e;">
            <strong style="color: #f43f5e;">When to Avoid:</strong> <span style="font-size: 0.9rem; color: var(--text-main);">${topic.whenToAvoid}</span>
          </div>
        </div>
      </section>

      <!-- 10. Interview Questions -->
      <section class="topic-section-block">
        <h2 class="topic-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          8. Real Interview Questions
        </h2>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${topic.interviewQuestions.map((q, idx) => `
            <div style="background: #090e1a; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.1rem;">
              <div style="font-weight: 700; font-size: 0.95rem; color: var(--color-sysdesign-amber); margin-bottom: 0.5rem;">
                Q: ${q.q}
              </div>
              <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                <strong>Answer:</strong> ${q.a}
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Related Topics & Prev/Next Navigation -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle); flex-wrap: wrap; gap: 1rem;">
        ${prevTopic ? `
          <a href="#sysdesign/topic/${prevTopic.id}" class="btn btn-secondary" style="font-size: 0.85rem;">
            &larr; Previous: ${prevTopic.title}
          </a>
        ` : '<div></div>'}

        ${nextTopic ? `
          <a href="#sysdesign/topic/${nextTopic.id}" class="btn btn-primary" style="font-size: 0.85rem;">
            Next: ${nextTopic.title} &rarr;
          </a>
        ` : '<div></div>'}
      </div>
    `;
  }

  // =========================================================================
  // 3. CASE STUDIES DIRECTORY
  // =========================================================================
  function renderCaseStudies(filterTier = null) {
    const caseStudies = MLForge.sysdesign.data.caseStudies || [];
    const filtered = filterTier ? caseStudies.filter(c => c.tier.toLowerCase() === filterTier.toLowerCase()) : caseStudies;

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          Real-World System Design Case Studies
        </h1>
        <p style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
          End-to-end architectures of industry-standard systems from URL shorteners to Netflix and WhatsApp.
        </p>

        <!-- Filter Pills -->
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#sysdesign/case-studies" class="btn ${!filterTier ? 'btn-primary' : 'btn-secondary'}" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">All (${caseStudies.length})</a>
          <a href="#sysdesign/case-studies/beginner" class="btn ${filterTier === 'beginner' ? 'btn-primary' : 'btn-secondary'}" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">Beginner</a>
          <a href="#sysdesign/case-studies/intermediate" class="btn ${filterTier === 'intermediate' ? 'btn-primary' : 'btn-secondary'}" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">Intermediate</a>
          <a href="#sysdesign/case-studies/advanced" class="btn ${filterTier === 'advanced' ? 'btn-primary' : 'btn-secondary'}" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">Advanced</a>
        </div>
      </div>

      <div class="sysdesign-cards-grid">
        ${filtered.map(cs => `
          <a href="#sysdesign/case-study/${cs.id}" class="sysdesign-card">
            <div>
              <div class="sysdesign-card-top">
                <span class="badge ${cs.tier === 'Beginner' ? 'badge-beginner' : cs.tier === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced'}" style="font-size: 0.65rem;">
                  ${cs.tier}
                </span>
                <span style="font-size: 0.725rem; color: var(--text-muted);">${cs.readTime}</span>
              </div>
              <h3 class="sysdesign-card-title">${cs.title}</h3>
              <p class="sysdesign-card-desc">${cs.summary}</p>
            </div>
            <div class="sysdesign-card-tags">
              <span class="badge badge-secondary" style="font-size: 0.65rem;">Requirements</span>
              <span class="badge badge-secondary" style="font-size: 0.65rem;">Capacity Estimates</span>
              <span class="badge badge-secondary" style="font-size: 0.65rem;">APIs</span>
            </div>
          </a>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // 4. CASE STUDY DETAIL VIEW
  // =========================================================================
  function renderCaseStudyDetail(caseStudyId) {
    const caseStudies = MLForge.sysdesign.data.caseStudies || [];
    const cs = caseStudies.find(c => c.id === caseStudyId) || caseStudies[0];
    if (!cs) return;

    // Record as recent
    MLForge.sysdesign.storage.addRecentTopic({
      id: cs.id,
      title: cs.title,
      link: `#sysdesign/case-study/${cs.id}`,
      type: 'Case Study'
    });

    contentArea.innerHTML = `
      <div class="topic-reader-header">
        <div class="topic-reader-meta">
          <a href="#sysdesign/case-studies" style="color: var(--text-muted); text-decoration: none; font-size: 0.8rem;">Case Studies</a>
          <span style="color: var(--text-muted);">&bull;</span>
          <span class="badge ${cs.tier === 'Beginner' ? 'badge-beginner' : cs.tier === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced'}" style="font-size: 0.65rem;">
            ${cs.tier}
          </span>
          <span style="font-size: 0.775rem; color: var(--text-muted);">${cs.readTime} read</span>
        </div>
        <h1 class="topic-reader-title">${cs.title}</h1>
        <p class="topic-reader-summary">${cs.problemStatement}</p>
      </div>

      <!-- Functional & Non-Functional Requirements -->
      <section class="topic-section-block">
        <h2 class="topic-section-title">1. System Requirements</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
          <div>
            <h3 style="font-size: 0.95rem; font-weight: 700; color: var(--color-sysdesign-amber); margin-bottom: 0.5rem;">Functional Requirements</h3>
            <ul style="padding-left: 1.25rem; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
              ${cs.functionalReqs.map(r => `<li>${r}</li>`).join('')}
            </ul>
          </div>
          <div>
            <h3 style="font-size: 0.95rem; font-weight: 700; color: #0ea5e9; margin-bottom: 0.5rem;">Non-Functional Requirements</h3>
            <ul style="padding-left: 1.25rem; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
              ${cs.nonFunctionalReqs.map(r => `<li>${r}</li>`).join('')}
            </ul>
          </div>
        </div>
      </section>

      <!-- Back-of-the-Envelope Capacity Estimations -->
      <section class="topic-section-block">
        <h2 class="topic-section-title">2. Back-of-the-Envelope Capacity Estimations</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          ${Object.entries(cs.capacityEstimations).map(([key, val]) => `
            <div style="background: #090e1a; padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.725rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">${key.replace(/([A-Z])/g, ' $1')}</div>
              <div style="font-size: 1.1rem; font-weight: 800; color: var(--color-sysdesign-amber); font-family: var(--font-mono); margin-top: 0.25rem;">${val}</div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- API Design -->
      <section class="topic-section-block">
        <h2 class="topic-section-title">3. API Design & Endpoint Contracts</h2>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${cs.apiDesign.map(api => `
            <div style="background: #090e1a; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
              <div style="font-family: var(--font-mono); font-size: 0.95rem; font-weight: 700; color: var(--color-sysdesign-amber); margin-bottom: 0.35rem;">
                ${api.endpoint}
              </div>
              <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${api.desc}</div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.75rem;">
                <div>
                  <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">Request</div>
                  <pre class="diagram-container" style="margin: 0; padding: 0.75rem; font-size: 0.775rem;"><code>${api.request}</code></pre>
                </div>
                <div>
                  <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">Response</div>
                  <pre class="diagram-container" style="margin: 0; padding: 0.75rem; font-size: 0.775rem; color: #10b981;"><code>${api.response}</code></pre>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Database Data Model -->
      <section class="topic-section-block">
        <h2 class="topic-section-title">4. Data Model & Database Schemas</h2>
        <pre class="diagram-container"><code>${cs.dataModel}</code></pre>
      </section>

      <!-- High-Level Architecture Diagram -->
      <section class="topic-section-block">
        <h2 class="topic-section-title">5. High-Level Architecture Diagram</h2>
        <pre class="diagram-container"><code>${cs.architecture}</code></pre>
      </section>

      <!-- Request Flow Deep Dive -->
      <section class="topic-section-block">
        <h2 class="topic-section-title">6. Request Execution Lifecycle</h2>
        <ul style="padding-left: 1.25rem; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">
          ${cs.requestFlow.map(flow => `<li>${flow}</li>`).join('')}
        </ul>
      </section>

      <!-- Scaling & Bottleneck Mitigations -->
      <section class="topic-section-block">
        <h2 class="topic-section-title">7. Scaling Bottlenecks & Failure Mitigations</h2>
        <ul style="padding-left: 1.25rem; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">
          ${cs.scalingAndBottlenecks.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </section>

      <!-- Interview Follow-Ups -->
      <section class="topic-section-block">
        <h2 class="topic-section-title">8. Interview Follow-Up Questions</h2>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${cs.interviewFollowUps.map(fu => `
            <div style="background: #090e1a; padding: 1.1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="font-weight: 700; color: var(--color-sysdesign-amber); font-size: 0.95rem; margin-bottom: 0.35rem;">Q: ${fu.q}</div>
              <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;"><strong>Answer:</strong> ${fu.a}</div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // =========================================================================
  // 5. LOW-LEVEL DESIGN (LLD) VIEW
  // =========================================================================
  function renderLLD() {
    const solids = MLForge.sysdesign.data.solidPrinciples || [];
    const lldCases = MLForge.sysdesign.data.lldCaseStudies || [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          Low-Level Design (LLD) & Object-Oriented Design
        </h1>
        <p style="font-size: 1rem; color: var(--text-secondary);">
          Master class diagrams, SOLID design principles, GoF design patterns, and complete code implementations.
        </p>
      </div>

      <!-- SOLID Principles Section -->
      <div style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem;">
          The SOLID Principles of Object-Oriented Design
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
          ${solids.map(s => `
            <div class="card" style="padding: 1.25rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <span class="sysdesign-step-indicator" style="width: 28px; height: 28px; font-size: 0.8rem;">${s.letter}</span>
                <span style="font-weight: 700; font-size: 0.95rem; color: var(--text-main);">${s.name}</span>
              </div>
              <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.75rem;">
                ${s.explanation}
              </div>
              <div style="background: rgba(244,63,94,0.06); border-left: 3px solid #f43f5e; padding: 0.4rem 0.6rem; font-size: 0.75rem; font-family: var(--font-mono); color: #f43f5e; margin-bottom: 0.35rem;">
                Violation: ${s.badExample}
              </div>
              <div style="background: rgba(16,185,129,0.06); border-left: 3px solid #10b981; padding: 0.4rem 0.6rem; font-size: 0.75rem; font-family: var(--font-mono); color: #10b981;">
                Solution: ${s.goodExample}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- LLD Case Studies -->
      <div>
        <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem;">
          Runnable LLD Machine Coding Case Studies
        </h2>
        <div style="display: flex; flex-direction: column; gap: 1.75rem;">
          ${lldCases.map(c => `
            <div class="card" style="padding: 1.75rem;" id="lld-case-${c.id}">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                <div>
                  <span class="badge badge-sysdesign-amber" style="font-size: 0.65rem; margin-bottom: 0.25rem;">${c.category}</span>
                  <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin: 0;">${c.title}</h3>
                </div>
                <span class="badge badge-intermediate" style="font-size: 0.65rem;">${c.difficulty}</span>
              </div>

              <!-- Requirements -->
              <div style="margin-bottom: 1rem;">
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Requirements:</div>
                <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0.25rem 0 0 0;">
                  ${c.requirements.map(r => `<li>${r}</li>`).join('')}
                </ul>
              </div>

              <!-- Class Diagram -->
              <div style="margin-bottom: 1rem;">
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">Class Diagram / Entities:</div>
                <pre class="diagram-container" style="margin: 0; padding: 0.75rem; font-size: 0.8rem;"><code>${c.classDiagram}</code></pre>
              </div>

              <!-- Python Code Implementation -->
              <div style="margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                  <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Production Python Implementation:</span>
                  <button class="btn btn-secondary" style="font-size: 0.7rem; padding: 2px 8px;" onclick="MLForge.ui.copyToClipboard(document.getElementById('code-${c.id}').innerText)">
                    Copy Code
                  </button>
                </div>
                <pre class="diagram-container" style="max-height: 320px; margin: 0; padding: 1rem; color: #f1f5f9; font-size: 0.8rem;"><code id="code-${c.id}">${c.pythonCode}</code></pre>
              </div>

              <!-- Edge Cases -->
              <div style="background: rgba(245, 158, 11, 0.05); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-sysdesign-amber);">
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-sysdesign-amber); text-transform: uppercase; margin-bottom: 0.25rem;">Interview Edge Cases:</div>
                <ul style="padding-left: 1.25rem; margin: 0; font-size: 0.825rem; color: var(--text-secondary); line-height: 1.45;">
                  ${c.edgeCases.map(ec => `<li>${ec}</li>`).join('')}
                </ul>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 6. PATTERNS CATALOG VIEW
  // =========================================================================
  function renderPatterns() {
    const patterns = MLForge.sysdesign.data.patterns || [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          System Design Patterns Catalog
        </h1>
        <p style="font-size: 1rem; color: var(--text-secondary);">
          Proven architectural patterns solving reliability, caching, data synchronization, and traffic challenges.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        ${patterns.map(p => `
          <div class="card" style="padding: 1.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin: 0;">${p.name}</h2>
              <span class="badge badge-sysdesign-amber" style="font-size: 0.65rem;">${p.category}</span>
            </div>

            <div style="margin-bottom: 1rem;">
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">The Problem:</div>
              <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0; line-height: 1.5;">${p.problem}</p>
            </div>

            <pre class="diagram-container" style="margin: 0.75rem 0;"><code>${p.diagram}</code></pre>

            <div style="margin-bottom: 1rem;">
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">Execution Workflow:</div>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; line-height: 1.5; white-space: pre-line;">${p.workflow}</p>
            </div>

            <div class="pros-cons-grid">
              <div class="pros-card">
                <div class="pros-title">Advantages</div>
                <ul class="pros-cons-list">
                  ${p.advantages.map(a => `<li>&bull; ${a}</li>`).join('')}
                </ul>
              </div>
              <div class="cons-card">
                <div class="cons-title">Disadvantages</div>
                <ul class="pros-cons-list">
                  ${p.disadvantages.map(d => `<li>&bull; ${d}</li>`).join('')}
                </ul>
              </div>
            </div>

            <div style="background: #090e1a; padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); margin-top: 1rem;">
              <div style="font-weight: 700; color: var(--color-sysdesign-amber); font-size: 0.85rem; margin-bottom: 0.25rem;">Interview Question:</div>
              <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">${p.interviewQuestion}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // 7. INTERACTIVE CALCULATORS VIEW
  // =========================================================================
  function renderCalculators() {
    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          System Design Calculators
        </h1>
        <p style="font-size: 1rem; color: var(--text-secondary);">
          Perform precision back-of-the-envelope capacity estimations, cache hit ratio analyses, and availability calculations.
        </p>
      </div>

      <!-- 1. Capacity Estimation Calculator -->
      <div class="calc-card-container">
        <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">
          Capacity Estimation & Back-of-the-Envelope Calculator
        </h2>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
          Calculate daily request volume, average and peak requests per second (RPS), storage growth, network bandwidth, and Little's Law concurrency.
        </p>

        <div class="calc-input-grid">
          <div class="calc-field-group">
            <label class="calc-field-label">Daily Active Users (DAU):</label>
            <input type="number" id="cap-dau" class="calc-input" value="10000000" min="0" oninput="MLForge.sysdesign.router.recalcCapacity()">
          </div>
          <div class="calc-field-group">
            <label class="calc-field-label">Avg Requests / User / Day:</label>
            <input type="number" id="cap-reqs-user" class="calc-input" value="20" min="0" oninput="MLForge.sysdesign.router.recalcCapacity()">
          </div>
          <div class="calc-field-group">
            <label class="calc-field-label">Peak Traffic Multiplier:</label>
            <input type="number" id="cap-peak-mult" class="calc-input" value="2.5" min="1" step="0.5" oninput="MLForge.sysdesign.router.recalcCapacity()">
          </div>
          <div class="calc-field-group">
            <label class="calc-field-label">Payload Size per Request (KB):</label>
            <input type="number" id="cap-payload-kb" class="calc-input" value="2" min="0.1" step="0.5" oninput="MLForge.sysdesign.router.recalcCapacity()">
          </div>
          <div class="calc-field-group">
            <label class="calc-field-label">Storage per User (MB/year):</label>
            <input type="number" id="cap-storage-user" class="calc-input" value="1" min="0" oninput="MLForge.sysdesign.router.recalcCapacity()">
          </div>
          <div class="calc-field-group">
            <label class="calc-field-label">Data Retention (Years):</label>
            <input type="number" id="cap-retention-years" class="calc-input" value="5" min="1" oninput="MLForge.sysdesign.router.recalcCapacity()">
          </div>
          <div class="calc-field-group">
            <label class="calc-field-label">Replication Factor:</label>
            <input type="number" id="cap-replication" class="calc-input" value="3" min="1" oninput="MLForge.sysdesign.router.recalcCapacity()">
          </div>
          <div class="calc-field-group">
            <label class="calc-field-label">Avg Latency (seconds for Little's Law):</label>
            <input type="number" id="cap-latency" class="calc-input" value="0.1" min="0.01" step="0.05" oninput="MLForge.sysdesign.router.recalcCapacity()">
          </div>
        </div>

        <div class="calc-results-panel" id="cap-results-mount">
          <!-- Dynamically populated -->
        </div>
      </div>

      <!-- 2. Cache Hit Ratio Calculator -->
      <div class="calc-card-container">
        <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">
          Cache Hit Ratio & Latency Optimizer
        </h2>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
          Formula: $\\text{Hit Ratio} = \\frac{\\text{Cache Hits}}{\\text{Cache Hits} + \\text{Cache Misses}} \\times 100$
        </p>

        <div class="calc-input-grid">
          <div class="calc-field-group">
            <label class="calc-field-label">Cache Hits:</label>
            <input type="number" id="cache-hits" class="calc-input" value="95000" min="0" oninput="MLForge.sysdesign.router.recalcCache()">
          </div>
          <div class="calc-field-group">
            <label class="calc-field-label">Cache Misses:</label>
            <input type="number" id="cache-misses" class="calc-input" value="5000" min="0" oninput="MLForge.sysdesign.router.recalcCache()">
          </div>
          <div class="calc-field-group">
            <label class="calc-field-label">Cache Latency (ms):</label>
            <input type="number" id="cache-lat-ms" class="calc-input" value="2" min="0.1" oninput="MLForge.sysdesign.router.recalcCache()">
          </div>
          <div class="calc-field-group">
            <label class="calc-field-label">Database Latency (ms):</label>
            <input type="number" id="db-lat-ms" class="calc-input" value="50" min="1" oninput="MLForge.sysdesign.router.recalcCache()">
          </div>
        </div>

        <div class="calc-results-panel" id="cache-results-mount">
          <!-- Dynamically populated -->
        </div>
      </div>

      <!-- 3. High Availability Downtime Calculator -->
      <div class="calc-card-container">
        <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">
          High Availability (Nine Nines) Downtime Calculator
        </h2>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
          Calculate maximum allowable downtime budget per day, month, and year across SLA commitments.
        </p>

        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
          <button class="btn btn-secondary" onclick="document.getElementById('avail-input').value = 99.0; MLForge.sysdesign.router.recalcDowntime();">99% (Two Nines)</button>
          <button class="btn btn-secondary" onclick="document.getElementById('avail-input').value = 99.9; MLForge.sysdesign.router.recalcDowntime();">99.9% (Three Nines)</button>
          <button class="btn btn-secondary" onclick="document.getElementById('avail-input').value = 99.95; MLForge.sysdesign.router.recalcDowntime();">99.95%</button>
          <button class="btn btn-secondary" onclick="document.getElementById('avail-input').value = 99.99; MLForge.sysdesign.router.recalcDowntime();">99.99% (Four Nines)</button>
          <button class="btn btn-secondary" onclick="document.getElementById('avail-input').value = 99.999; MLForge.sysdesign.router.recalcDowntime();">99.999% (Five Nines)</button>
        </div>

        <div class="calc-field-group" style="max-width: 300px; margin-bottom: 1.25rem;">
          <label class="calc-field-label">Custom Availability (%):</label>
          <input type="number" id="avail-input" class="calc-input" value="99.99" min="50" max="100" step="0.001" oninput="MLForge.sysdesign.router.recalcDowntime()">
        </div>

        <div class="calc-results-panel" id="downtime-results-mount">
          <!-- Dynamically populated -->
        </div>
      </div>
    `;

    recalcCapacity();
    recalcCache();
    recalcDowntime();
  }

  function recalcCapacity() {
    const dau = document.getElementById('cap-dau')?.value || 10000000;
    const reqsPerUser = document.getElementById('cap-reqs-user')?.value || 20;
    const peakMultiplier = document.getElementById('cap-peak-mult')?.value || 2.5;
    const payloadSizeKB = document.getElementById('cap-payload-kb')?.value || 2;
    const storagePerUserMB = document.getElementById('cap-storage-user')?.value || 1;
    const retentionYears = document.getElementById('cap-retention-years')?.value || 5;
    const replicationFactor = document.getElementById('cap-replication')?.value || 3;
    const avgLatencySec = document.getElementById('cap-latency')?.value || 0.1;

    const res = MLForge.sysdesign.calculators.calculateCapacity({
      dau, reqsPerUser, peakMultiplier, payloadSizeKB, storagePerUserMB, retentionYears, replicationFactor, avgLatencySec
    });

    const mount = document.getElementById('cap-results-mount');
    if (!mount) return;

    mount.innerHTML = `
      <div class="calc-result-item">
        <span class="calc-result-label">Daily Request Volume</span>
        <span class="calc-result-value">${res.dailyRequests}</span>
        <span class="calc-result-note">Total requests/day</span>
      </div>
      <div class="calc-result-item">
        <span class="calc-result-label">Average RPS</span>
        <span class="calc-result-value">${res.avgRPS} req/s</span>
        <span class="calc-result-note">Requests/sec averaged over 24h</span>
      </div>
      <div class="calc-result-item">
        <span class="calc-result-label">Peak RPS</span>
        <span class="calc-result-value" style="color: #f97316;">${res.peakRPS} req/s</span>
        <span class="calc-result-note">At ${peakMultiplier}x peak multiplier</span>
      </div>
      <div class="calc-result-item">
        <span class="calc-result-label">Raw Storage</span>
        <span class="calc-result-value">${res.rawStorage}</span>
        <span class="calc-result-note">Uncompressed 5-year data</span>
      </div>
      <div class="calc-result-item">
        <span class="calc-result-label">Replicated Storage</span>
        <span class="calc-result-value" style="color: #ec4899;">${res.replicatedStorage}</span>
        <span class="calc-result-note">At ${replicationFactor}x replication factor</span>
      </div>
      <div class="calc-result-item">
        <span class="calc-result-label">Bandwidth Ingress</span>
        <span class="calc-result-value">${res.avgBandwidthBytes}</span>
        <span class="calc-result-note">${res.avgBandwidthBits}</span>
      </div>
      <div class="calc-result-item">
        <span class="calc-result-label">Little's Law Concurrency</span>
        <span class="calc-result-value" style="color: #0ea5e9;">${res.concurrentRequests}</span>
        <span class="calc-result-note">Active concurrent requests at ${avgLatencySec}s latency</span>
      </div>
    `;
  }

  function recalcCache() {
    const hits = document.getElementById('cache-hits')?.value || 95000;
    const misses = document.getElementById('cache-misses')?.value || 5000;
    const cLat = document.getElementById('cache-lat-ms')?.value || 2;
    const dLat = document.getElementById('db-lat-ms')?.value || 50;

    const res = MLForge.sysdesign.calculators.calculateCacheHitRatio(hits, misses, cLat, dLat);
    const mount = document.getElementById('cache-results-mount');
    if (!mount) return;

    mount.innerHTML = `
      <div class="calc-result-item">
        <span class="calc-result-label">Cache Hit Ratio</span>
        <span class="calc-result-value" style="color: #10b981;">${res.hitRatioPercent}%</span>
        <span class="calc-result-note">${res.totalRequests} total requests analyzed</span>
      </div>
      <div class="calc-result-item">
        <span class="calc-result-label">Effective Query Latency</span>
        <span class="calc-result-value">${res.effectiveLatencyMs} ms</span>
        <span class="calc-result-note">Down from ${dLat}ms baseline</span>
      </div>
      <div class="calc-result-item">
        <span class="calc-result-label">Latency Reduction</span>
        <span class="calc-result-value" style="color: #0ea5e9;">${res.latencySavedPercent}%</span>
        <span class="calc-result-note">Reduction in database load</span>
      </div>
      <div style="grid-column: 1 / -1; margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-secondary); background: #050811; padding: 0.75rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-sysdesign-amber);">
        <strong>Recommendation:</strong> ${res.recommendation}
      </div>
    `;
  }

  function recalcDowntime() {
    const avail = document.getElementById('avail-input')?.value || 99.99;
    const res = MLForge.sysdesign.calculators.calculateDowntime(avail);
    const mount = document.getElementById('downtime-results-mount');
    if (!mount) return;

    mount.innerHTML = `
      <div class="calc-result-item">
        <span class="calc-result-label">Availability SLA</span>
        <span class="calc-result-value">${res.availability}%</span>
        <span class="calc-result-note">Uptime Guarantee</span>
      </div>
      <div class="calc-result-item">
        <span class="calc-result-label">Downtime per Day</span>
        <span class="calc-result-value" style="color: #f59e0b;">${res.downtimeDay}</span>
        <span class="calc-result-note">${res.downtimeDaySeconds} seconds</span>
      </div>
      <div class="calc-result-item">
        <span class="calc-result-label">Downtime per Month</span>
        <span class="calc-result-value" style="color: #f97316;">${res.downtimeMonth}</span>
        <span class="calc-result-note">${res.downtimeMonthSeconds} seconds</span>
      </div>
      <div class="calc-result-item">
        <span class="calc-result-label">Downtime per Year</span>
        <span class="calc-result-value" style="color: #f43f5e;">${res.downtimeYear}</span>
        <span class="calc-result-note">${res.downtimeYearSeconds} seconds</span>
      </div>
    `;
  }

  // =========================================================================
  // 8. SIMULATORS VIEW
  // =========================================================================
  function renderSimulators() {
    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          Interactive System Simulators
        </h1>
        <p style="font-size: 1rem; color: var(--text-secondary);">
          Experiment directly with load balancing algorithms, server failure routing, and message queue consumer crash recovery.
        </p>
      </div>

      <!-- 1. Load Balancer Simulator -->
      <div class="simulator-container">
        <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.4rem;">
          1. Layer 7 Load Balancer & Health Check Simulator
        </h2>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
          Select an algorithm, fire simulated traffic, and toggle servers offline to observe dynamic redistribution and failover.
        </p>
        <div id="lb-simulator-mount"></div>
      </div>

      <!-- 2. Message Queue Simulator -->
      <div class="simulator-container">
        <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.4rem;">
          2. Message Queue & Dead-Letter Queue (DLQ) Simulator
        </h2>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
          Publish messages to a queue, process them with worker consumers, simulate consumer crashes, and watch retried poison messages divert to the DLQ.
        </p>
        <div id="mq-simulator-mount"></div>
      </div>
    `;

    MLForge.sysdesign.simulators.renderLBSimulator();
    MLForge.sysdesign.simulators.renderMQSimulator();
  }

  // =========================================================================
  // 9. ARCHITECTURE DIAGRAM PLAYGROUND VIEW
  // =========================================================================
  function renderPlayground() {
    contentArea.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
          Architecture Diagram Playground
        </h1>
        <p style="font-size: 0.95rem; color: var(--text-secondary);">
          Visually build, connect, and export system architectures. Drag components, draw labeled arrows, and load starter templates.
        </p>
      </div>

      <div class="playground-wrapper">
        <!-- Toolbar -->
        <div class="playground-toolbar">
          <div class="playground-toolbar-group">
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary);">Template:</span>
            <select class="calc-input" style="padding: 0.35rem 0.65rem; font-size: 0.8rem; width: auto;" onchange="MLForge.sysdesign.playground.loadTemplate(this.value)">
              <option value="three-tier">Three-Tier Web App</option>
              <option value="url-shortener">URL Shortener</option>
              <option value="chat-system">Real-Time Chat App</option>
              <option value="microservices">Event-Driven Microservices</option>
            </select>
          </div>

          <div class="playground-toolbar-group">
            <button class="btn btn-secondary" style="font-size: 0.775rem; padding: 0.35rem 0.7rem;" onclick="MLForge.sysdesign.playground.clearWorkspace()">
              Clear
            </button>
            <button class="btn btn-secondary" style="font-size: 0.775rem; padding: 0.35rem 0.7rem;" onclick="MLForge.sysdesign.playground.saveToBrowser()">
              Save Diagram
            </button>
            <button class="btn btn-secondary" style="font-size: 0.775rem; padding: 0.35rem 0.7rem;" onclick="MLForge.sysdesign.playground.exportJSON()">
              Export JSON
            </button>
            <button class="btn btn-primary" style="font-size: 0.775rem; padding: 0.35rem 0.8rem;" onclick="MLForge.sysdesign.playground.exportPNG()">
              Export PNG Image
            </button>
          </div>
        </div>

        <!-- Canvas & Palette Grid -->
        <div class="playground-layout">
          <!-- Palette -->
          <div class="playground-palette">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
              Component Palette
            </div>
            <button class="palette-item-btn" onclick="MLForge.sysdesign.playground.addComponent('client')">Client (Web/Mobile)</button>
            <button class="palette-item-btn" onclick="MLForge.sysdesign.playground.addComponent('cdn')">Cloudflare / Edge CDN</button>
            <button class="palette-item-btn" onclick="MLForge.sysdesign.playground.addComponent('load-balancer')">Load Balancer (ALB)</button>
            <button class="palette-item-btn" onclick="MLForge.sysdesign.playground.addComponent('api-gateway')">API Gateway (Kong)</button>
            <button class="palette-item-btn" onclick="MLForge.sysdesign.playground.addComponent('app-server')">Application Server</button>
            <button class="palette-item-btn" onclick="MLForge.sysdesign.playground.addComponent('microservice')">Microservice Pod</button>
            <button class="palette-item-btn" onclick="MLForge.sysdesign.playground.addComponent('sql-db')">PostgreSQL Primary DB</button>
            <button class="palette-item-btn" onclick="MLForge.sysdesign.playground.addComponent('nosql-db')">NoSQL DB (Cassandra)</button>
            <button class="palette-item-btn" onclick="MLForge.sysdesign.playground.addComponent('cache')">Redis Cache</button>
            <button class="palette-item-btn" onclick="MLForge.sysdesign.playground.addComponent('message-queue')">Message Queue (Kafka)</button>
            <button class="palette-item-btn" onclick="MLForge.sysdesign.playground.addComponent('object-storage')">Object Storage (S3)</button>
            <button class="palette-item-btn" onclick="MLForge.sysdesign.playground.addComponent('search-engine')">Elasticsearch</button>
            <button class="palette-item-btn" onclick="MLForge.sysdesign.playground.addComponent('monitoring')">Prometheus / Grafana</button>
          </div>

          <!-- Board Canvas -->
          <div class="playground-canvas-container" id="playground-canvas">
            <svg class="playground-svg-overlay" id="playground-svg"></svg>
            <div class="playground-empty-state" id="playground-empty" style="display: none;">
              <p>Click items in the palette on the left to add architecture components.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    MLForge.sysdesign.playground.init();
  }

  // =========================================================================
  // 10. INTERVIEW PREP VIEW
  // =========================================================================
  function renderInterview(filterDiff = null) {
    const questions = MLForge.sysdesign.data.interviewQuestions || [];
    const filtered = filterDiff ? questions.filter(q => q.difficulty.toLowerCase() === filterDiff.toLowerCase()) : questions;

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          System Design Interview Preparation
        </h1>
        <p style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
          Practice real-world interview prompts. Use the private scratchpad to outline your thoughts before revealing step-by-step solutions.
        </p>

        <!-- Difficulty Filters -->
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#sysdesign/interview" class="btn ${!filterDiff ? 'btn-primary' : 'btn-secondary'}" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">All (${questions.length})</a>
          <a href="#sysdesign/interview/beginner" class="btn ${filterDiff === 'beginner' ? 'btn-primary' : 'btn-secondary'}" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">Beginner</a>
          <a href="#sysdesign/interview/intermediate" class="btn ${filterDiff === 'intermediate' ? 'btn-primary' : 'btn-secondary'}" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">Intermediate</a>
          <a href="#sysdesign/interview/advanced" class="btn ${filterDiff === 'advanced' ? 'btn-primary' : 'btn-secondary'}" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">Advanced</a>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        ${filtered.map(q => {
          const status = MLForge.sysdesign.storage.getInterviewStatus(q.id);
          const savedNote = MLForge.sysdesign.storage.getInterviewNotes(q.id);

          return `
            <div class="interview-q-card" id="q-card-${q.id}">
              <div class="interview-q-header">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
                    <span class="badge ${q.difficulty === 'Beginner' ? 'badge-beginner' : q.difficulty === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced'}" style="font-size: 0.65rem;">
                      ${q.difficulty}
                    </span>
                    <span class="badge badge-secondary" style="font-size: 0.65rem;">${q.category}</span>
                  </div>
                  <h2 class="interview-q-title">${q.title}</h2>
                </div>

                <!-- Status Selector -->
                <select class="calc-input" style="font-size: 0.775rem; padding: 0.35rem 0.6rem; width: auto;" onchange="MLForge.sysdesign.storage.setInterviewStatus('${q.id}', this.value); MLForge.ui.showToast('Updated question status', 'success', 1500);">
                  <option value="not_started" ${status === 'not_started' ? 'selected' : ''}>Not Started</option>
                  <option value="practicing" ${status === 'practicing' ? 'selected' : ''}>Practicing</option>
                  <option value="completed" ${status === 'completed' ? 'selected' : ''}>Completed</option>
                  <option value="revision" ${status === 'revision' ? 'selected' : ''}>Needs Revision</option>
                </select>
              </div>

              <!-- Hints -->
              <div style="background: rgba(245, 158, 11, 0.05); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-sysdesign-amber); margin-bottom: 0.75rem;">
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-sysdesign-amber); text-transform: uppercase; margin-bottom: 0.25rem;">Interview Hints & Probing Questions:</div>
                <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
                  ${q.hints.map(h => `<li>${h}</li>`).join('')}
                </ul>
              </div>

              <!-- Practice Scratchpad -->
              <div>
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
                  Your Practice Scratchpad (Notes remain private in browser):
                </label>
                <textarea class="interview-q-scratchpad" placeholder="Type your capacity numbers, database schema thoughts, or architecture blueprint..." oninput="MLForge.sysdesign.storage.setInterviewNotes('${q.id}', this.value)">${savedNote}</textarea>
              </div>

              <div style="margin-top: 0.75rem; display: flex; justify-content: flex-end;">
                <button class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.4rem 0.85rem;" onclick="MLForge.sysdesign.router.toggleSolution('${q.id}')">
                  Reveal Complete Solution &rarr;
                </button>
              </div>

              <!-- Solution Box -->
              <div class="interview-solution-box" id="sol-box-${q.id}">
                <h3 style="font-size: 1rem; font-weight: 700; color: var(--color-sysdesign-amber); margin-bottom: 0.5rem;">
                  Step-by-Step Expected Design
                </h3>
                <ol style="padding-left: 1.25rem; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 0.75rem;">
                  ${q.structuredApproach.map(step => `<li>${step}</li>`).join('')}
                </ol>

                <div style="margin-bottom: 0.75rem;">
                  <span style="font-weight: 700; color: var(--text-main); font-size: 0.85rem;">Architecture Blueprint:</span>
                  <div style="font-family: var(--font-mono); font-size: 0.8rem; color: #38bdf8; background: #050811; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); margin-top: 0.25rem;">
                    ${q.expectedArchitecture}
                  </div>
                </div>

                <div style="margin-bottom: 0.75rem; font-size: 0.85rem; color: var(--text-secondary);">
                  <strong style="color: var(--text-main);">Key Trade-Off:</strong> ${q.tradeOffs}
                </div>

                <div style="font-size: 0.85rem; color: #f43f5e;">
                  <strong>Common Mistakes:</strong>
                  <ul style="padding-left: 1.25rem; margin: 0.25rem 0 0 0; color: var(--text-secondary);">
                    ${q.commonMistakes.map(cm => `<li>${cm}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // =========================================================================
  // 11. PRACTICE QUIZZES VIEW
  // =========================================================================
  function renderQuizzes() {
    const quizzes = MLForge.sysdesign.data.quizzes || [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          Interactive System Design Practice Quizzes
        </h1>
        <p style="font-size: 1rem; color: var(--text-secondary);">
          Test your conceptual understanding of distributed systems, caching, databases, and capacity calculations with instant feedback.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.75rem;">
        ${quizzes.map((qz, idx) => `
          <div class="card" style="padding: 1.75rem;" id="quiz-card-${qz.id}">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span class="badge badge-sysdesign-amber" style="font-size: 0.65rem;">Question ${idx + 1} of ${quizzes.length} &bull; ${qz.categoryTitle}</span>
              <span class="badge ${qz.difficulty === 'Beginner' ? 'badge-beginner' : qz.difficulty === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced'}" style="font-size: 0.65rem;">${qz.difficulty}</span>
            </div>

            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-bottom: 1.25rem; line-height: 1.4;">
              ${qz.question}
            </h3>

            <div style="display: flex; flex-direction: column; gap: 0.6rem;">
              ${qz.options.map((opt, optIdx) => `
                <button class="quiz-option-btn" id="qz-opt-${qz.id}-${optIdx}" onclick="MLForge.sysdesign.router.submitQuizAnswer('${qz.id}', ${optIdx}, ${qz.correctIndex})">
                  <span>${opt}</span>
                  <span class="opt-status-icon"></span>
                </button>
              `).join('')}
            </div>

            <div id="quiz-exp-${qz.id}" style="display: none; background: #090e1a; border-radius: var(--radius-sm); padding: 1rem; margin-top: 1rem; border-left: 3px solid #10b981; font-size: 0.85rem; line-height: 1.5; color: var(--text-secondary);">
              <strong style="color: #10b981;">Explanation:</strong> ${qz.explanation}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // 12. LEARNING ROADMAP VIEW
  // =========================================================================
  function renderRoadmap() {
    const roadmapSteps = [
      { step: 1, title: 'System Design Fundamentals', topics: 'Client-server, Latency vs Throughput, Horizontal vs Vertical scaling, CAP theorem, ACID properties', link: '#sysdesign/topic/intro-to-system-design' },
      { step: 2, title: 'Networking Fundamentals', topics: 'DNS, TCP vs UDP, HTTP/1.1 vs HTTP/2 vs HTTP/3, WebSockets, Server-Sent Events, Reverse Proxies', link: '#sysdesign/topic/how-the-internet-works' },
      { step: 3, title: 'API Design & Protocols', topics: 'REST best practices, JSON, Pagination, Rate limiting, Idempotency, gRPC, Protocol Buffers, GraphQL', link: '#sysdesign/topic/api-design-rest' },
      { step: 4, title: 'Database Design & Scaling', topics: 'SQL vs NoSQL, B+ Tree Indexing, Sharding, Read Replicas, Normalization vs Denormalization', link: '#sysdesign/topic/sql-vs-nosql' },
      { step: 5, title: 'Caching & Data Storage', topics: 'Cache-Aside, Write-Through, Write-Behind, Eviction (LRU, LFU), Redis in-memory storage, Stampedes', link: '#sysdesign/topic/caching-strategies' },
      { step: 6, title: 'Load Balancing & Reverse Proxies', topics: 'Layer 4 vs Layer 7, Round Robin, Least Connections, IP Hash, Health checks, Session persistence', link: '#sysdesign/topic/load-balancing-algorithms' },
      { step: 7, title: 'Scalability & Capacity Estimation', topics: 'Back-of-the-envelope estimations, RPS, Peak multipliers, Little\'s Law queuing, Storage growth', link: '#sysdesign/calculators' },
      { step: 8, title: 'Distributed Systems Core', topics: 'Consensus (Raft, Paxos), Consistent Hashing, Distributed Locks, Quorum reads/writes, Split-brain', link: '#sysdesign/topic/distributed-consensus' },
      { step: 9, title: 'Message Queues & Event Streaming', topics: 'Publish-Subscribe, Kafka vs RabbitMQ, Dead-Letter Queues, Poison messages, Backpressure', link: '#sysdesign/topic/message-queues-kafka' },
      { step: 10, title: 'System Architecture Styles', topics: 'Monoliths, Modular Monoliths, Microservices, Database-per-service, Saga pattern, BFF', link: '#sysdesign/topic/microservices-architecture' },
      { step: 11, title: 'Reliability & Fault Tolerance', topics: 'Circuit Breakers, Bulkheads, Exponential Backoff with Jitter, RTO/RPO, High Availability (99.99%)', link: '#sysdesign/topic/reliability-patterns' },
      { step: 12, title: 'Low-Level Design (LLD) & OOP', topics: 'SOLID principles, UML diagrams, 12 GoF Design Patterns, Machine coding case studies (Parking Lot, Elevator)', link: '#sysdesign/lld' },
      { step: 13, title: 'High-Level Design (HLD) Mastery', topics: 'The 16-Step HLD Interview Framework, Bottleneck identification, Trade-off articulation', link: '#sysdesign/case-studies' },
      { step: 14, title: 'Real-World Case Studies', topics: 'TinyURL, Rate Limiter, WhatsApp, Netflix Video Streaming, E-commerce, Uber', link: '#sysdesign/case-studies' },
      { step: 15, title: 'Interview Preparation & Mock Practice', topics: 'Question banks, structured answering framework, practice scratchpad, self-assessment', link: '#sysdesign/interview' }
    ];

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          System Design Learning Roadmap
        </h1>
        <p style="font-size: 1rem; color: var(--text-secondary);">
          An ordered, structured curriculum guiding you from zero knowledge to staff-level architectural competence.
        </p>
      </div>

      <div class="sysdesign-roadmap-container">
        ${roadmapSteps.map(s => `
          <div class="sysdesign-roadmap-step">
            <div class="sysdesign-step-indicator">${s.step}</div>
            <a href="${s.link}" class="sysdesign-step-card">
              <div style="font-weight: 700; font-size: 1.05rem; color: var(--text-main); margin-bottom: 0.25rem;">
                ${s.title}
              </div>
              <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                ${s.topics}
              </div>
            </a>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // 13. GLOSSARY & QUICK REVISION VIEW
  // =========================================================================
  function renderGlossary() {
    const glossary = MLForge.sysdesign.data.glossary || [];
    const revisionSheets = MLForge.sysdesign.data.quickRevisionSheets || [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          System Design Glossary & Revision Sheets
        </h1>
        <p style="font-size: 1rem; color: var(--text-secondary);">
          Searchable reference dictionary of distributed systems terminology and high-yield cheat sheets.
        </p>

        <!-- Search Bar -->
        <input type="text" id="glossary-search" class="calc-input" placeholder="Search terminology (e.g. CAP, Latency, Sharding, Idempotency)..." style="max-width: 500px; margin-top: 0.5rem;" oninput="MLForge.sysdesign.router.filterGlossary(this.value)">
      </div>

      <!-- Quick Revision Sheets -->
      <div style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem;">
          High-Yield Revision Cheat Sheets
        </h2>
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          ${revisionSheets.map(rs => `
            <div class="card" style="padding: 1.5rem;">
              <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-sysdesign-amber); margin-bottom: 0.75rem;">${rs.title}</h3>
              <div class="sysdesign-table-wrapper">
                ${parseMarkdownTable(rs.content)}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Glossary Terms Grid -->
      <div>
        <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem;">
          System Design Terms (${glossary.length})
        </h2>
        <div class="glossary-grid" id="glossary-grid-mount">
          ${glossary.map(g => `
            <div class="glossary-card" data-term="${g.term.toLowerCase()} ${g.definition.toLowerCase()}">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span class="glossary-term">${g.term}</span>
                <span class="badge badge-secondary" style="font-size: 0.65rem;">${g.category}</span>
              </div>
              <p class="glossary-def">${g.definition}</p>
              <div class="glossary-example">
                <strong>Example:</strong> ${g.example}
              </div>
              <div style="margin-top: auto; padding-top: 0.5rem;">
                <a href="${g.topicLink}" style="font-size: 0.75rem; color: var(--color-sysdesign-amber); text-decoration: none;">
                  Read deep-dive topic &rarr;
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Quick helper to render simple markdown tables in cheat sheets
  function parseMarkdownTable(md) {
    const lines = md.trim().split('\n').filter(l => l.trim() && !l.includes('---'));
    if (!lines.length) return '';
    const headers = lines[0].split('|').map(s => s.trim()).filter(Boolean);
    const rows = lines.slice(1).map(l => l.split('|').map(s => s.trim()).filter(Boolean));

    return `
      <table class="sysdesign-table">
        <thead>
          <tr>${headers.map(h => `<th>${h.replace(/\*\*/g, '')}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${rows.map(r => `<tr>${r.map(c => `<td>${c.replace(/\*\*/g, '<strong>').replace(/\*\*/g, '</strong>')}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    `;
  }

  // =========================================================================
  // 14. MY PROGRESS VIEW
  // =========================================================================
  function renderProgress() {
    const stats = MLForge.sysdesign.storage.getStats();
    const completedList = MLForge.sysdesign.storage.getCompletedTopics();
    const bookmarks = MLForge.sysdesign.storage.getBookmarks();
    const topics = MLForge.sysdesign.data.topics || [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          My System Design Learning Progress
        </h1>
        <p style="font-size: 1rem; color: var(--text-secondary);">
          Review completed topics, bookmarked revision cards, and interview question mastery.
        </p>
      </div>

      <!-- Progress Stats Summary -->
      <div class="sysdesign-stats-grid">
        <div class="sysdesign-stat-card">
          <span class="sysdesign-stat-label">Progress</span>
          <span class="sysdesign-stat-value" style="color: #10b981;">${stats.progressPercent}%</span>
          <span class="sysdesign-stat-meta">Overall completion</span>
        </div>
        <div class="sysdesign-stat-card">
          <span class="sysdesign-stat-label">Completed Topics</span>
          <span class="sysdesign-stat-value">${stats.completedTopics} / ${stats.totalTopics}</span>
          <span class="sysdesign-stat-meta">Curriculum Lessons</span>
        </div>
        <div class="sysdesign-stat-card">
          <span class="sysdesign-stat-label">Bookmarked Concepts</span>
          <span class="sysdesign-stat-value" style="color: #0ea5e9;">${stats.bookmarked}</span>
          <span class="sysdesign-stat-meta">Saved for quick access</span>
        </div>
        <div class="sysdesign-stat-card">
          <span class="sysdesign-stat-label">Completed Questions</span>
          <span class="sysdesign-stat-value" style="color: #8b5cf6;">${stats.completedQuestions}</span>
          <span class="sysdesign-stat-meta">Interview bank items</span>
        </div>
      </div>

      <!-- Bookmarks Section -->
      <div style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem;">
          Saved Bookmarks (${bookmarks.length})
        </h2>
        ${bookmarks.length === 0 ? `
          <div class="card" style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
            No topics bookmarked yet. Click the "Bookmark" button while reading any lesson or pattern.
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
            ${bookmarks.map(b => `
              <div class="card" style="padding: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <span class="badge badge-sysdesign-amber" style="font-size: 0.65rem; margin-bottom: 0.25rem;">${b.category}</span>
                  <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main);">${b.title}</div>
                </div>
                <a href="${b.link}" class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.35rem 0.65rem;">
                  Open
                </a>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <!-- Reset Progress Button with Confirmation -->
      <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
        <button class="btn btn-secondary" style="color: #f43f5e; border-color: rgba(244,63,94,0.3);" onclick="MLForge.sysdesign.router.confirmResetProgress()">
          Reset System Design Progress
        </button>
      </div>
    `;
  }

  // User Actions Helpers
  function toggleCompleted(topicId) {
    const isNow = MLForge.sysdesign.storage.toggleTopicCompleted(topicId);
    MLForge.ui.showToast(isNow ? 'Topic marked as completed!' : 'Removed from completed topics', 'success', 2000);
    renderTopic(topicId);
  }

  function toggleBookmark(topicId, title) {
    const item = {
      id: topicId,
      title: title,
      type: 'System Design',
      link: `#sysdesign/topic/${topicId}`,
      category: 'System Design'
    };
    const isAdded = MLForge.sysdesign.storage.toggleBookmark(item);
    MLForge.ui.showToast(isAdded ? 'Saved to bookmarks!' : 'Removed from bookmarks', 'info', 2000);
    renderTopic(topicId);
  }

  function toggleSolution(questionId) {
    const box = document.getElementById(`sol-box-${questionId}`);
    if (box) {
      box.classList.toggle('visible');
    }
  }

  function submitQuizAnswer(quizId, selectedOptIndex, correctIndex) {
    const optBtn = document.getElementById(`qz-opt-${quizId}-${selectedOptIndex}`);
    const correctBtn = document.getElementById(`qz-opt-${quizId}-${correctIndex}`);
    const expBox = document.getElementById(`quiz-exp-${quizId}`);

    // Disable all options for this question
    document.querySelectorAll(`[id^="qz-opt-${quizId}-"]`).forEach(b => b.disabled = true);

    if (selectedOptIndex === correctIndex) {
      if (optBtn) optBtn.classList.add('correct');
      MLForge.ui.showToast('Correct! Great architectural intuition.', 'success', 2000);
    } else {
      if (optBtn) optBtn.classList.add('incorrect');
      if (correctBtn) correctBtn.classList.add('correct');
      MLForge.ui.showToast('Incorrect. Review the detailed explanation below.', 'error', 2500);
    }

    if (expBox) expBox.style.display = 'block';
  }

  function filterGlossary(query) {
    const q = query.trim().toLowerCase();
    const cards = document.querySelectorAll('.glossary-card');
    cards.forEach(card => {
      const text = card.getAttribute('data-term') || '';
      card.style.display = text.includes(q) ? 'flex' : 'none';
    });
  }

  function confirmResetProgress() {
    if (confirm('Are you sure you want to reset all your System Design progress, completed topics, and scratchpad notes? This cannot be undone.')) {
      MLForge.sysdesign.storage.resetAllProgress();
      MLForge.ui.showToast('System Design progress has been reset', 'info', 2500);
      renderProgress();
    }
  }

  return {
    init,
    handleRoute,
    toggleCompleted,
    toggleBookmark,
    toggleSolution,
    submitQuizAnswer,
    filterGlossary,
    confirmResetProgress,
    recalcCapacity,
    recalcCache,
    recalcDowntime
  };
})();

