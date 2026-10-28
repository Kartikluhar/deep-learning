/**
 * MLForge DSA View Router & Page Renderer
 * Manages all DSA routes: #dsa/dashboard, #dsa/topic/:id, #dsa/problem-bank,
 * #dsa/problem/:id, #dsa/visualizers, #dsa/complexity-cheat-sheet,
 * #dsa/interview-practice, #dsa/progress.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsa = window.MLForge.dsa || {};

MLForge.dsa.router = (function () {
  let contentArea = null;
  let currentProblemLang = 'python';

  function init() {
    contentArea = document.getElementById('content-area');
  }

  // Main Route Dispatcher for #dsa/*
  function handleRoute(params = []) {
    if (!contentArea) contentArea = document.getElementById('content-area');
    const subroute = params[0] || 'dashboard';
    const subparam = params[1] || null;

    updateDSASidebarActive(subroute, subparam);

    switch (subroute) {
      case 'dashboard':
        renderDashboard();
        break;
      case 'topic':
        renderTopic(subparam || 'programming-fundamentals');
        break;
      case 'problem-bank':
        renderProblemBank(subparam);
        break;
      case 'problem':
        renderProblemDetail(subparam || 'two-sum');
        break;
      case 'visualizers':
        renderVisualizers(subparam || 'sorting');
        break;
      case 'complexity-analysis':
        renderTopic('complexity-analysis');
        break;
      case 'programming-fundamentals':
        renderTopic('programming-fundamentals');
        break;
      case 'complexity-cheat-sheet':
        renderCheatSheet();
        break;
      case 'interview-practice':
        renderPatterns();
        break;
      case 'progress':
        renderProgress();
        break;
      default:
        // Check if subroute matches a known topic ID directly (e.g. #dsa/arrays)
        const allTopics = MLForge.dsa.data.topics || [];
        const matchedTopic = allTopics.find(t => t.id === subroute);
        if (matchedTopic) {
          renderTopic(matchedTopic.id);
        } else {
          renderDashboard();
        }
        break;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    MLForge.ui.updateContextPanel();

    if (window.MLForge && window.MLForge.math) {
      window.MLForge.math.render(contentArea);
    }
  }

  function updateDSASidebarActive(subroute, subparam) {
    document.querySelectorAll('.sidebar-sub-item, .nav-item').forEach(el => {
      el.classList.remove('active');
    });

    if (subroute === 'dashboard') {
      const el = document.getElementById('nav-dsa-dashboard');
      if (el) el.classList.add('active');
    } else if (subroute === 'problem-bank') {
      const el = document.getElementById('nav-dsa-problems');
      if (el) el.classList.add('active');
    } else if (subroute === 'visualizers') {
      const el = document.getElementById('nav-dsa-visualizers');
      if (el) el.classList.add('active');
    } else if (subroute === 'complexity-cheat-sheet') {
      const el = document.getElementById('nav-dsa-cheat-sheet');
      if (el) el.classList.add('active');
    } else if (subroute === 'interview-practice') {
      const el = document.getElementById('nav-dsa-patterns');
      if (el) el.classList.add('active');
    } else if (subroute === 'progress') {
      const el = document.getElementById('nav-dsa-progress');
      if (el) el.classList.add('active');
    }

    // Update active sub-item in sidebar accordion
    const targetTopic = subroute === 'topic' ? subparam : subroute;
    if (targetTopic) {
      const subItem = document.getElementById(`subnav-${targetTopic}`);
      if (subItem) subItem.classList.add('active');
    }
  }

  // =========================================================================
  // View 1: DSA Dashboard
  // =========================================================================
  function renderDashboard() {
    const allProblems = MLForge.dsa.data.problems || [];
    const allTopics = MLForge.dsa.data.topics || [];
    const stats = MLForge.dsa.storage.getStats(allProblems, allTopics);
    const recentProblems = MLForge.dsa.storage.getRecentProblems();

    // Group topics into the 14 Roadmap Stages
    const stages = [
      { num: 1, title: "Programming Fundamentals", topics: ["programming-fundamentals", "bit-manipulation"] },
      { num: 2, title: "Time and Space Complexity", topics: ["complexity-analysis"] },
      { num: 3, title: "Arrays and Strings", topics: ["arrays", "strings"] },
      { num: 4, title: "Searching and Sorting", topics: ["searching", "sorting"] },
      { num: 5, title: "Hashing and Common Patterns", topics: ["hashing", "two-pointers", "sliding-window", "prefix-sum"] },
      { num: 6, title: "Linked Lists, Stacks, and Queues", topics: ["linked-lists", "stacks", "queues-deques"] },
      { num: 7, title: "Recursion and Backtracking", topics: ["recursion", "backtracking"] },
      { num: 8, title: "Trees and Binary Search Trees", topics: ["trees", "binary-search-trees"] },
      { num: 9, title: "Heaps and Tries", topics: ["heaps-priority-queues", "tries"] },
      { num: 10, title: "Graphs", topics: ["graphs"] },
      { num: 11, title: "Greedy Algorithms", topics: ["greedy-algorithms"] },
      { num: 12, title: "Dynamic Programming", topics: ["dynamic-programming"] },
      { num: 13, title: "Advanced Data Structures", topics: ["disjoint-set-union", "segment-fenwick-trees", "advanced-data-structures"] },
      { num: 14, title: "Interview Practice & Patterns", topics: ["interview-practice"] }
    ];

    contentArea.innerHTML = `
      <!-- Welcome Hero Section -->
      <section class="dsa-hero">
        <div class="dsa-hero-glow"></div>
        <div class="dsa-hero-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
          MLForge DSA • Complete Learning & Interview Platform
        </div>
        <h1 class="dsa-hero-title">Master <span>Data Structures & Algorithms</span></h1>
        <p class="dsa-hero-desc">
          Learn data structures and algorithms from beginner to advanced in plain, simple English. Understand step-by-step logic, explore interactive visual animations, analyze complexities, and master interview patterns.
        </p>
        <div class="dsa-hero-actions">
          <a href="#dsa/topic/programming-fundamentals" class="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Continue Learning
          </a>
          <a href="#dsa/problem-bank" class="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Practice Problems
          </a>
          <a href="#dsa/visualizers" class="btn btn-ghost" style="border: 1px solid var(--border-subtle);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            Interactive Visualizers
          </a>
          <button class="btn btn-ghost" style="border: 1px solid var(--border-subtle);" onclick="MLForge.dsa.router.openRandomProblem()">
            🎲 Random Practice
          </button>
        </div>
      </section>

      <!-- Accurate Real-Time Progress Overview -->
      <section style="margin-bottom: 2rem;">
        <div class="section-header">
          <h2 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-accent-emerald);"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Real Progress Overview
          </h2>
          <a href="#dsa/progress" class="btn btn-sm btn-ghost">Detailed Progress →</a>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon emerald">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <div class="stat-value">${stats.solvedCount} / ${stats.totalProblems}</div>
              <div class="stat-label">Problems Solved (${stats.overallProgress}%)</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <div>
              <div class="stat-value">${stats.easySolved} <span style="font-size: 0.9rem; font-weight: normal; color: var(--text-muted);">/ ${stats.easyTotal}</span></div>
              <div class="stat-label" style="color: #10b981;">Easy Solved</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon cyan">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <div>
              <div class="stat-value">${stats.mediumSolved} <span style="font-size: 0.9rem; font-weight: normal; color: var(--text-muted);">/ ${stats.mediumTotal}</span></div>
              <div class="stat-label" style="color: #f59e0b;">Medium Solved</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon violet">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
            <div>
              <div class="stat-value">${stats.completedTopicsCount} / ${stats.totalTopics}</div>
              <div class="stat-label">Syllabus Topics Completed</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Access Shortcuts Bar -->
      <section style="margin-bottom: 2.5rem;">
        <div class="section-header">
          <h2 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-accent-cyan);"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Quick Access Shortcuts
          </h2>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 0.75rem;">
          <a href="#dsa/problem-bank?diff=Easy" class="card card-interactive" style="padding: 1rem; text-decoration: none;">
            <div style="font-weight: 700; color: #10b981; font-size: 0.95rem; margin-bottom: 0.25rem;">Practice Easy Problems</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Build foundation and muscle memory</div>
          </a>
          <a href="#dsa/problem-bank?diff=Medium" class="card card-interactive" style="padding: 1rem; text-decoration: none;">
            <div style="font-weight: 700; color: #f59e0b; font-size: 0.95rem; margin-bottom: 0.25rem;">Practice Medium Problems</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Standard tech interview questions</div>
          </a>
          <a href="#dsa/problem-bank?diff=Hard" class="card card-interactive" style="padding: 1rem; text-decoration: none;">
            <div style="font-weight: 700; color: #f43f5e; font-size: 0.95rem; margin-bottom: 0.25rem;">Practice Hard Problems</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Advanced structures and combinations</div>
          </a>
          <a href="#dsa/complexity-cheat-sheet" class="card card-interactive" style="padding: 1rem; text-decoration: none;">
            <div style="font-weight: 700; color: var(--color-accent-cyan); font-size: 0.95rem; margin-bottom: 0.25rem;">Complexity Cheat Sheet</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Searchable operations reference</div>
          </a>
          <a href="#dsa/interview-practice" class="card card-interactive" style="padding: 1rem; text-decoration: none;">
            <div style="font-weight: 700; color: var(--color-accent-violet); font-size: 0.95rem; margin-bottom: 0.25rem;">Pattern Guide</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Learn how to diagnose problems</div>
          </a>
          <a href="#dsa/visualizers" class="card card-interactive" style="padding: 1rem; text-decoration: none;">
            <div style="font-weight: 700; color: var(--color-primary); font-size: 0.95rem; margin-bottom: 0.25rem;">Interactive Visualizers</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Sorting, BST, BFS, DFS, DP table</div>
          </a>
        </div>
      </section>

      <!-- 14-Stage Learning Roadmap -->
      <section style="margin-bottom: 2.5rem;">
        <div class="section-header">
          <h2 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-accent-emerald);"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            14-Stage Learning Roadmap
          </h2>
          <span style="font-size: 0.85rem; color: var(--text-muted);">Click any topic to start reading</span>
        </div>

        <div class="roadmap-container">
          ${stages.map(stg => {
            const stageTopics = stg.topics.map(tid => {
              if (tid === 'interview-practice') return { id: 'interview-practice', title: 'Interview Patterns', isSpecial: true };
              return allTopics.find(t => t.id === tid);
            }).filter(Boolean);

            const completedCount = stageTopics.filter(t => !t.isSpecial && MLForge.dsa.storage.isTopicCompleted(t.id)).length;
            let statusClass = 'status-not-started';
            let statusText = 'Not Started';

            if (completedCount === stageTopics.length && stageTopics.length > 0) {
              statusClass = 'status-completed';
              statusText = 'Completed';
            } else if (completedCount > 0) {
              statusClass = 'status-in-progress';
              statusText = `${completedCount} / ${stageTopics.length} Done`;
            }

            return `
              <div class="roadmap-stage-card">
                <div class="roadmap-stage-header">
                  <div>
                    <span class="roadmap-stage-num">Stage ${stg.num}</span>
                    <h3 class="roadmap-stage-title">${stg.title}</h3>
                  </div>
                  <span class="roadmap-stage-status ${statusClass}">${statusText}</span>
                </div>
                <div class="roadmap-topic-chips">
                  ${stageTopics.map(t => {
                    const isCompleted = !t.isSpecial && MLForge.dsa.storage.isTopicCompleted(t.id);
                    const link = t.isSpecial ? '#dsa/interview-practice' : `#dsa/topic/${t.id}`;
                    return `
                      <a href="${link}" class="roadmap-topic-chip ${isCompleted ? 'completed' : ''}">
                        ${isCompleted ? '✓ ' : '• '} ${t.title}
                      </a>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- Recently Viewed / Quick Problems -->
      ${recentProblems.length > 0 ? `
        <section style="margin-bottom: 2rem;">
          <div class="section-header">
            <h2 class="section-title">Recently Practiced Problems</h2>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${recentProblems.slice(0, 5).map(p => `
              <a href="#dsa/problem/${p.id}" class="card card-interactive" style="padding: 0.85rem 1.25rem; display: flex; align-items: center; justify-content: space-between; text-decoration: none;">
                <span style="font-weight: 600; color: var(--text-main);">${p.title}</span>
                <span class="badge ${p.difficulty === 'Easy' ? 'badge-easy' : p.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}">${p.difficulty}</span>
              </a>
            `).join('')}
          </div>
        </section>
      ` : ''}
    `;
  }

  // =========================================================================
  // View 2: Topic Learning Page
  // =========================================================================
  function renderTopic(topicId) {
    const allTopics = MLForge.dsa.data.topics || [];
    const topic = allTopics.find(t => t.id === topicId) || allTopics[0];
    const isCompleted = MLForge.dsa.storage.isTopicCompleted(topic.id);
    const relatedProblems = (MLForge.dsa.data.problems || []).filter(p => (topic.relatedProblemIds || []).includes(p.id));

    // Find next / prev topics
    const currIdx = allTopics.findIndex(t => t.id === topic.id);
    const prevTopic = currIdx > 0 ? allTopics[currIdx - 1] : null;
    const nextTopic = currIdx < allTopics.length - 1 ? allTopics[currIdx + 1] : null;

    MLForge.dsa.storage.addRecentTopic(topic);

    contentArea.innerHTML = `
      <div class="problem-detail-header">
        <!-- Breadcrumb & Completion Toggle -->
        <div class="problem-detail-nav">
          <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">
            <a href="#dsa/dashboard" style="color: var(--color-accent-cyan); text-decoration: none;">DSA</a>
            <span>/</span>
            <span>Topics</span>
            <span>/</span>
            <span style="color: var(--text-main); font-weight: 600;">${topic.title}</span>
          </div>

          <button class="btn btn-sm ${isCompleted ? 'btn-primary' : 'btn-secondary'}" onclick="MLForge.dsa.router.toggleTopicCompleted('${topic.id}', this)">
            ${isCompleted ? '✓ Completed' : 'Mark as Completed'}
          </button>
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
          <span class="badge badge-emerald">Stage ${topic.stage}: ${topic.stageName}</span>
          <span class="badge badge-blue">${topic.category}</span>
        </div>

        <h1 class="topic-h1" style="font-size: 2.2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">${topic.title}</h1>
        <p style="font-size: 1.1rem; color: var(--text-secondary); line-height: 1.6; max-width: 820px;">${topic.summary}</p>
      </div>

      <!-- 1. Simple English Definition -->
      <div class="problem-section-card">
        <h3 class="problem-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-accent-cyan);"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          Simple Definition (Plain English)
        </h3>
        <p style="font-size: 1rem; color: var(--text-main); line-height: 1.7;">${topic.definition}</p>
      </div>

      <!-- 2. Real-Life Analogy -->
      <div class="problem-section-card" style="border-left: 3px solid var(--color-accent-amber); background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), transparent);">
        <h3 class="problem-section-title" style="color: var(--color-accent-amber);">
          💡 Daily Life Analogy
        </h3>
        <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${topic.realLifeAnalogy}</p>
      </div>

      <!-- 3. Why We Need It -->
      <div class="problem-section-card">
        <h3 class="problem-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-accent-emerald);"><polyline points="20 6 9 17 4 12"/></svg>
          Why Do We Need This?
        </h3>
        <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${topic.whyWeNeedIt}</p>
      </div>

      <!-- 4. Key Concepts & Mechanics -->
      <div class="problem-section-card">
        <h3 class="problem-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-accent-violet);"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/></svg>
          Key Concepts & Terminology
        </h3>
        <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.65rem; color: var(--text-main); font-size: 0.95rem; line-height: 1.6;">
          ${topic.keyConcepts.map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>

      <!-- 5. Step-by-Step How It Works -->
      <div class="problem-section-card">
        <h3 class="problem-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-primary);"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          Step-by-Step Algorithm Walkthrough
        </h3>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${topic.howItWorksSteps.map(step => `
            <div style="padding: 0.75rem 1rem; background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); font-size: 0.9rem; color: var(--text-main); line-height: 1.5;">
              ${step}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 6. Code Walkthrough with Multi-Language Switcher -->
      <div class="problem-section-card">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
          <h3 class="problem-section-title" style="margin-bottom: 0;">Code Implementation</h3>
          <div class="code-lang-tabs" style="border: none; padding: 0;">
            <button class="code-lang-btn ${currentProblemLang === 'python' ? 'active' : ''}" onclick="MLForge.dsa.router.setTopicLang('python')">Python</button>
            <button class="code-lang-btn ${currentProblemLang === 'cpp' ? 'active' : ''}" onclick="MLForge.dsa.router.setTopicLang('cpp')">C++</button>
            <button class="code-lang-btn ${currentProblemLang === 'java' ? 'active' : ''}" onclick="MLForge.dsa.router.setTopicLang('java')">Java</button>
            <button class="code-lang-btn ${currentProblemLang === 'javascript' ? 'active' : ''}" onclick="MLForge.dsa.router.setTopicLang('javascript')">JavaScript</button>
          </div>
        </div>

        <div class="code-container">
          <div class="code-header">
            <span class="code-lang" id="topic-code-lang-label">${currentProblemLang.toUpperCase()}</span>
            <button class="copy-btn" onclick="MLForge.dsa.router.copyTopicCode()">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span>Copy Code</span>
            </button>
          </div>
          <pre class="code-pre" id="topic-code-block">${topic.codeExample[currentProblemLang] || topic.codeExample.python}</pre>
        </div>
      </div>

      ${topic.id === 'complexity-analysis' ? `
        <!-- Interactive Big O Growth Comparison Tool -->
        <div class="problem-section-card" id="complexity-graph-section" style="border: 1px solid var(--color-primary); box-shadow: var(--shadow-glow);">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
            <div>
              <span class="badge badge-emerald" style="margin-bottom: 0.35rem;">Interactive Tool</span>
              <h3 class="problem-section-title" style="margin-bottom: 0;">Big O Growth Rate & Scale Explorer</h3>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">Adjust input size n to see why algorithms scale differently</div>
          </div>

          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
            Move the slider below to change the input size <strong>n</strong>. Watch how different complexity classes scale from 1 item to 64 items. Notice how O(2ⁿ) explodes exponentially into billions of operations while O(log n) barely increases!
          </p>

          <div class="complexity-slider-bar">
            <span style="font-weight: 700; font-size: 0.9rem; color: var(--text-main);">Input Size (n):</span>
            <input type="range" min="1" max="64" value="16" id="complexity-n-slider" class="range-input" oninput="MLForge.dsa.router.updateComplexityGraph(this.value)">
            <span class="range-val" id="complexity-n-readout" style="font-size: 1.1rem; min-width: 45px;">16</span>
          </div>

          <div style="margin: 1rem 0;">
            <svg class="complexity-svg-canvas" id="complexity-svg-canvas" viewBox="0 0 700 320"></svg>
          </div>

          <div class="stats-grid" id="complexity-ops-grid" style="grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 0.65rem; margin-top: 1rem;">
            <!-- Populated dynamically -->
          </div>

          <div style="margin-top: 1rem; padding: 0.85rem 1.15rem; background: var(--bg-input); border-radius: var(--radius-md); font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; border: 1px solid var(--border-subtle);">
            <strong style="color: var(--color-accent-amber);">Important Engineering Caveat:</strong> Big O describes asymptotic growth as n becomes very large. For very small inputs (e.g. n ≤ 4), an O(n²) algorithm like Insertion Sort can actually execute faster than an O(n log n) algorithm like Merge Sort because it has simpler instructions and lower constant-factor CPU overhead!
          </div>
        </div>
      ` : ''}

      <!-- 7. Time and Space Complexity Analysis Table -->
      <div class="problem-section-card">
        <h3 class="problem-section-title">Complexity Analysis</h3>
        <div class="problem-table-container">
          <table class="dsa-problem-table">
            <thead>
              <tr>
                <th>Operation</th>
                <th>Time Complexity</th>
                <th>Space Complexity</th>
                <th>Engineering Notes</th>
              </tr>
            </thead>
            <tbody>
              ${topic.complexityTable.map(row => `
                <tr>
                  <td style="font-weight: 600;">${row.operation}</td>
                  <td><span class="badge badge-cyan font-mono">${row.time}</span></td>
                  <td><span class="badge badge-blue font-mono">${row.space}</span></td>
                  <td style="color: var(--text-secondary); font-size: 0.825rem;">${row.note}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- 8. Common Pitfalls -->
      <div class="problem-section-card" style="border-left: 3px solid var(--color-accent-rose);">
        <h3 class="problem-section-title" style="color: var(--color-accent-rose);">
          ⚠️ Common Mistakes Beginners Make
        </h3>
        <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-secondary); font-size: 0.9rem;">
          ${topic.commonPitfalls.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>

      <!-- 9. Related Practice Problems -->
      <div class="problem-section-card">
        <h3 class="problem-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-accent-emerald);"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          Practice Problems for this Topic (${relatedProblems.length})
        </h3>
        ${relatedProblems.length > 0 ? `
          <div style="display: flex; flex-direction: column; gap: 0.65rem;">
            ${relatedProblems.map(p => `
              <a href="#dsa/problem/${p.id}" class="card card-interactive" style="padding: 0.85rem 1.25rem; display: flex; align-items: center; justify-content: space-between; text-decoration: none;">
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                  <span class="problem-status-icon ${MLForge.dsa.storage.isProblemSolved(p.id) ? 'solved' : ''}">✓</span>
                  <span style="font-weight: 600; color: var(--text-main);">${p.title}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="badge ${p.difficulty === 'Easy' ? 'badge-easy' : p.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}">${p.difficulty}</span>
                  <span class="badge badge-subtle" style="font-size: 0.65rem;">${p.pattern}</span>
                </div>
              </a>
            `).join('')}
          </div>
        ` : `
          <p style="color: var(--text-muted); font-size: 0.9rem;">No direct practice problems linked yet.</p>
        `}
      </div>

      <!-- Footer Navigation Buttons -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 2rem; flex-wrap: wrap; gap: 1rem;">
        ${prevTopic ? `
          <a href="#dsa/topic/${prevTopic.id}" class="btn btn-secondary">
            ← Previous: ${prevTopic.title}
          </a>
        ` : `<div></div>`}

        ${nextTopic ? `
          <a href="#dsa/topic/${nextTopic.id}" class="btn btn-primary">
            Next: ${nextTopic.title} →
          </a>
        ` : `<div></div>`}
      </div>
    `;

    if (topic.id === 'complexity-analysis') {
      setTimeout(() => updateComplexityGraph(16), 50);
    }
  }

  function updateComplexityGraph(nVal) {
    const n = Math.max(1, Number(nVal) || 16);
    const readout = document.getElementById('complexity-n-readout');
    const svg = document.getElementById('complexity-svg-canvas');
    const grid = document.getElementById('complexity-ops-grid');

    if (readout) readout.textContent = n;

    const o1 = 1;
    const oLog = Math.ceil(Math.log2(n));
    const oN = n;
    const oNLog = Math.ceil(n * Math.log2(n));
    const oN2 = n * n;
    const o2N = n <= 30 ? Math.pow(2, n) : '> 10^9 (Explosion)';

    if (grid) {
      grid.innerHTML = `
        <div class="stat-card" style="padding: 0.75rem;">
          <div>
            <div style="font-size: 0.7rem; color: #10b981; font-weight: 700;">O(1) Constant</div>
            <div style="font-size: 1.1rem; font-weight: 700; font-family: var(--font-mono); color: var(--text-main);">${o1} op</div>
          </div>
        </div>
        <div class="stat-card" style="padding: 0.75rem;">
          <div>
            <div style="font-size: 0.7rem; color: #06b6d4; font-weight: 700;">O(log n) Log</div>
            <div style="font-size: 1.1rem; font-weight: 700; font-family: var(--font-mono); color: var(--text-main);">${oLog} ops</div>
          </div>
        </div>
        <div class="stat-card" style="padding: 0.75rem;">
          <div>
            <div style="font-size: 0.7rem; color: #3b82f6; font-weight: 700;">O(n) Linear</div>
            <div style="font-size: 1.1rem; font-weight: 700; font-family: var(--font-mono); color: var(--text-main);">${oN} ops</div>
          </div>
        </div>
        <div class="stat-card" style="padding: 0.75rem;">
          <div>
            <div style="font-size: 0.7rem; color: #8b5cf6; font-weight: 700;">O(n log n)</div>
            <div style="font-size: 1.1rem; font-weight: 700; font-family: var(--font-mono); color: var(--text-main);">${oNLog} ops</div>
          </div>
        </div>
        <div class="stat-card" style="padding: 0.75rem;">
          <div>
            <div style="font-size: 0.7rem; color: #f59e0b; font-weight: 700;">O(n²) Quadratic</div>
            <div style="font-size: 1.1rem; font-weight: 700; font-family: var(--font-mono); color: var(--text-main);">${oN2.toLocaleString()} ops</div>
          </div>
        </div>
        <div class="stat-card" style="padding: 0.75rem;">
          <div>
            <div style="font-size: 0.7rem; color: #f43f5e; font-weight: 700;">O(2ⁿ) Exponential</div>
            <div style="font-size: 0.95rem; font-weight: 700; font-family: var(--font-mono); color: var(--text-main);">${typeof o2N === 'number' ? o2N.toLocaleString() + ' ops' : o2N}</div>
          </div>
        </div>
      `;
    }

    if (svg) {
      const w = 700, h = 320;
      const padL = 60, padB = 40, padT = 30, padR = 40;
      const plotW = w - padL - padR;
      const plotH = h - padT - padB;
      const maxY = 2500;

      function getPt(xVal, yVal) {
        const x = padL + (xVal / 64) * plotW;
        const clampedY = Math.min(maxY, yVal);
        const y = padT + plotH - (clampedY / maxY) * plotH;
        return { x, y };
      }

      function makePath(fn) {
        let d = '';
        for (let x = 1; x <= 64; x += 1) {
          const pt = getPt(x, fn(x));
          d += (x === 1 ? `M ${pt.x} ${pt.y}` : ` L ${pt.x} ${pt.y}`);
        }
        return d;
      }

      const pO1 = makePath(() => 10);
      const pOLog = makePath((x) => Math.log2(x) * 25);
      const pON = makePath((x) => x * 15);
      const pONLog = makePath((x) => x * Math.log2(x) * 8);
      const pON2 = makePath((x) => x * x);
      const pO2N = makePath((x) => Math.pow(2, Math.min(x, 15)));
      const currentMarker = getPt(n, 0);

      svg.innerHTML = `
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${h - padB}" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <line x1="${padL}" y1="${h - padB}" x2="${w - padR}" y2="${h - padB}" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>

        <text x="${padL - 10}" y="${padT + 10}" fill="#94a3b8" font-size="11" text-anchor="end">Operations</text>
        <text x="${w - padR}" y="${h - padB + 25}" fill="#94a3b8" font-size="11" text-anchor="end">Input Size n →</text>

        <line x1="${currentMarker.x}" y1="${padT}" x2="${currentMarker.x}" y2="${h - padB}" stroke="rgba(56, 189, 248, 0.5)" stroke-width="2" stroke-dasharray="4"/>
        <text x="${currentMarker.x}" y="${padT - 6}" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">n = ${n}</text>

        <path d="${pO1}" fill="none" stroke="#10b981" stroke-width="2.5"/>
        <path d="${pOLog}" fill="none" stroke="#06b6d4" stroke-width="2.5"/>
        <path d="${pON}" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
        <path d="${pONLog}" fill="none" stroke="#8b5cf6" stroke-width="2.5"/>
        <path d="${pON2}" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
        <path d="${pO2N}" fill="none" stroke="#f43f5e" stroke-width="3"/>

        <g transform="translate(80, 45)">
          <rect width="12" height="12" fill="#10b981" rx="2"/>
          <text x="18" y="10" fill="#f1f5f9" font-size="11">O(1)</text>

          <rect x="65" width="12" height="12" fill="#06b6d4" rx="2"/>
          <text x="83" y="10" fill="#f1f5f9" font-size="11">O(log n)</text>

          <rect x="145" width="12" height="12" fill="#3b82f6" rx="2"/>
          <text x="163" y="10" fill="#f1f5f9" font-size="11">O(n)</text>

          <rect x="205" width="12" height="12" fill="#8b5cf6" rx="2"/>
          <text x="223" y="10" fill="#f1f5f9" font-size="11">O(n log n)</text>

          <rect x="285" width="12" height="12" fill="#f59e0b" rx="2"/>
          <text x="303" y="10" fill="#f1f5f9" font-size="11">O(n²)</text>

          <rect x="345" width="12" height="12" fill="#f43f5e" rx="2"/>
          <text x="363" y="10" fill="#f1f5f9" font-size="11">O(2ⁿ)</text>
        </g>
      `;
    }
  }

  function setTopicLang(lang) {
    currentProblemLang = lang;
    const label = document.getElementById('topic-code-lang-label');
    const block = document.getElementById('topic-code-block');
    document.querySelectorAll('.code-lang-btn').forEach(btn => btn.classList.remove('active'));

    const activeBtn = Array.from(document.querySelectorAll('.code-lang-btn')).find(b => b.textContent.toLowerCase() === lang);
    if (activeBtn) activeBtn.classList.add('active');

    if (label) label.textContent = lang.toUpperCase();
    if (block) {
      // Find current active topic
      const hash = window.location.hash || '';
      const parts = hash.split('/');
      const tid = parts[2] || parts[1];
      const topic = (MLForge.dsa.data.topics || []).find(t => t.id === tid);
      if (topic && topic.codeExample) {
        block.textContent = topic.codeExample[lang] || topic.codeExample.python;
      }
    }
  }

  function copyTopicCode() {
    const block = document.getElementById('topic-code-block');
    if (block) {
      MLForge.ui.copyToClipboard(block.textContent, 'Code copied to clipboard!');
    }
  }

  function toggleTopicCompleted(topicId, btn) {
    const isNowCompleted = MLForge.dsa.storage.toggleTopicCompleted(topicId);
    if (btn) {
      if (isNowCompleted) {
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
        btn.textContent = '✓ Completed';
        MLForge.ui.showToast('Topic marked as completed!', 'success');
      } else {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
        btn.textContent = 'Mark as Completed';
        MLForge.ui.showToast('Topic progress reset', 'info');
      }
    }
  }

  // =========================================================================
  // View 3: Problem Bank
  // =========================================================================
  function renderProblemBank(filterQuery = '') {
    const allProblems = MLForge.dsa.data.problems || [];
    const allTopics = MLForge.dsa.data.topics || [];

    // Parse URL query if any (e.g. ?diff=Easy)
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const presetDiff = urlParams.get('diff') || 'all';

    contentArea.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; color: var(--text-main); margin-bottom: 0.5rem;">
          DSA Problem Bank
        </h1>
        <p style="color: var(--text-secondary); max-width: 820px;">
          Practice curated coding interview questions across Easy, Medium, and Hard difficulty levels. Each problem contains full dry runs, hints, approach explanations, and code in Python, C++, Java, and JavaScript.
        </p>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="problem-filter-bar">
        <div class="filter-controls-row">
          <div>
            <label class="form-label">Search Problem or Tag</label>
            <input type="text" id="pbank-search-input" class="form-input" placeholder="Search by title, tag, or pattern..." oninput="MLForge.dsa.router.filterProblemBank()">
          </div>

          <div>
            <label class="form-label">Topic</label>
            <select id="pbank-topic-select" class="form-select" onchange="MLForge.dsa.router.filterProblemBank()">
              <option value="all">All Topics (${allTopics.length})</option>
              ${allTopics.map(t => `<option value="${t.id}">${t.title}</option>`).join('')}
            </select>
          </div>

          <div>
            <label class="form-label">Difficulty</label>
            <select id="pbank-diff-select" class="form-select" onchange="MLForge.dsa.router.filterProblemBank()">
              <option value="all" ${presetDiff === 'all' ? 'selected' : ''}>All Difficulties</option>
              <option value="Easy" ${presetDiff === 'Easy' ? 'selected' : ''}>Easy</option>
              <option value="Medium" ${presetDiff === 'Medium' ? 'selected' : ''}>Medium</option>
              <option value="Hard" ${presetDiff === 'Hard' ? 'selected' : ''}>Hard</option>
            </select>
          </div>

          <div>
            <label class="form-label">Status</label>
            <select id="pbank-status-select" class="form-select" onchange="MLForge.dsa.router.filterProblemBank()">
              <option value="all">All Statuses</option>
              <option value="solved">Solved</option>
              <option value="attempted">Attempted</option>
              <option value="unsolved">Unsolved</option>
              <option value="bookmarked">Bookmarked</option>
            </select>
          </div>
        </div>

        <div class="filter-actions-row">
          <span id="pbank-results-count">${allProblems.length} problems available</span>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button class="btn btn-sm btn-ghost" onclick="MLForge.dsa.router.resetProblemFilters()">Reset Filters</button>
            <button class="btn btn-sm btn-primary" onclick="MLForge.dsa.router.openRandomProblem()">🎲 Random Problem</button>
          </div>
        </div>
      </div>

      <!-- Problem Table -->
      <div class="problem-table-container">
        <table class="dsa-problem-table">
          <thead>
            <tr>
              <th style="width: 44px;">Status</th>
              <th>Problem Title</th>
              <th>Difficulty</th>
              <th>Topic</th>
              <th>Pattern</th>
              <th style="width: 50px; text-align: center;">Save</th>
            </tr>
          </thead>
          <tbody id="pbank-table-body">
            <!-- Populated by filterProblemBank() -->
          </tbody>
        </table>
      </div>
    `;

    filterProblemBank();
  }

  function filterProblemBank() {
    const allProblems = MLForge.dsa.data.problems || [];
    const searchInput = document.getElementById('pbank-search-input');
    const topicSelect = document.getElementById('pbank-topic-select');
    const diffSelect = document.getElementById('pbank-diff-select');
    const statusSelect = document.getElementById('pbank-status-select');
    const tableBody = document.getElementById('pbank-table-body');
    const countLabel = document.getElementById('pbank-results-count');

    if (!tableBody) return;

    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const topicFilter = topicSelect ? topicSelect.value : 'all';
    const diffFilter = diffSelect ? diffSelect.value : 'all';
    const statusFilter = statusSelect ? statusSelect.value : 'all';

    const filtered = allProblems.filter(p => {
      // Search text match
      if (query) {
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesPattern = (p.pattern || '').toLowerCase().includes(query);
        const matchesTag = (p.tags || []).some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesPattern && !matchesTag) return false;
      }

      // Topic match
      if (topicFilter !== 'all') {
        if (p.topic !== topicFilter && p.subtopic !== topicFilter) return false;
      }

      // Difficulty match
      if (diffFilter !== 'all') {
        if (p.difficulty !== diffFilter) return false;
      }

      // Status match
      if (statusFilter !== 'all') {
        const isSolved = MLForge.dsa.storage.isProblemSolved(p.id);
        const isAttempted = MLForge.dsa.storage.isProblemAttempted(p.id);
        const isBookmarked = MLForge.dsa.storage.isProblemBookmarked(p.id);

        if (statusFilter === 'solved' && !isSolved) return false;
        if (statusFilter === 'attempted' && !isAttempted) return false;
        if (statusFilter === 'unsolved' && isSolved) return false;
        if (statusFilter === 'bookmarked' && !isBookmarked) return false;
      }

      return true;
    });

    if (countLabel) {
      countLabel.textContent = `Showing ${filtered.length} of ${allProblems.length} problems`;
    }

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 3rem; color: var(--text-muted);">
            <div style="font-size: 1.1rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.4rem;">No matching problems found</div>
            <div>Try clearing your search query or loosening your difficulty / topic filters.</div>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(p => {
      const isSolved = MLForge.dsa.storage.isProblemSolved(p.id);
      const isBookmarked = MLForge.dsa.storage.isProblemBookmarked(p.id);

      return `
        <tr>
          <td>
            <button class="problem-status-icon ${isSolved ? 'solved' : ''}" onclick="MLForge.dsa.router.toggleSolvedInline('${p.id}', this)" title="${isSolved ? 'Marked as Solved' : 'Click to mark as solved'}">
              ✓
            </button>
          </td>
          <td>
            <div class="problem-title-cell">
              <a href="#dsa/problem/${p.id}" class="problem-title-link">${p.title}</a>
            </div>
          </td>
          <td>
            <span class="badge ${p.difficulty === 'Easy' ? 'badge-easy' : p.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}">
              ${p.difficulty}
            </span>
          </td>
          <td>
            <span class="badge badge-subtle" style="font-size: 0.75rem;">${p.subtopic || p.topic}</span>
          </td>
          <td>
            <span style="font-size: 0.8rem; color: var(--text-secondary);">${p.pattern}</span>
          </td>
          <td style="text-align: center;">
            <button class="btn-icon-only" onclick="MLForge.dsa.router.toggleBookmarkInline('${p.id}', this)" title="Bookmark">
              ${isBookmarked ? '★' : '☆'}
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function resetProblemFilters() {
    const sInput = document.getElementById('pbank-search-input');
    const tSelect = document.getElementById('pbank-topic-select');
    const dSelect = document.getElementById('pbank-diff-select');
    const stSelect = document.getElementById('pbank-status-select');

    if (sInput) sInput.value = '';
    if (tSelect) tSelect.value = 'all';
    if (dSelect) dSelect.value = 'all';
    if (stSelect) stSelect.value = 'all';

    filterProblemBank();
  }

  function openRandomProblem() {
    const allProblems = MLForge.dsa.data.problems || [];
    if (allProblems.length === 0) return;
    const rand = allProblems[Math.floor(Math.random() * allProblems.length)];
    window.location.hash = `#dsa/problem/${rand.id}`;
  }

  function toggleSolvedInline(id, btn) {
    const isSolved = MLForge.dsa.storage.toggleProblemSolved(id);
    if (btn) {
      if (isSolved) {
        btn.classList.add('solved');
        MLForge.ui.showToast('Problem marked as solved!', 'success');
      } else {
        btn.classList.remove('solved');
        MLForge.ui.showToast('Problem marked as unsolved', 'info');
      }
    }
  }

  function toggleBookmarkInline(id, btn) {
    const isBookmarked = MLForge.dsa.storage.toggleProblemBookmark(id);
    if (btn) {
      btn.textContent = isBookmarked ? '★' : '☆';
      MLForge.ui.showToast(isBookmarked ? 'Problem bookmarked!' : 'Bookmark removed', 'info');
    }
  }

  // =========================================================================
  // View 4: Problem Detail Page (19-Section Rich Layout)
  // =========================================================================
  function renderProblemDetail(problemId) {
    const allProblems = MLForge.dsa.data.problems || [];
    const problem = allProblems.find(p => p.id === problemId) || allProblems[0];
    const isSolved = MLForge.dsa.storage.isProblemSolved(problem.id);
    const isAttempted = MLForge.dsa.storage.isProblemAttempted(problem.id);
    const isBookmarked = MLForge.dsa.storage.isProblemBookmarked(problem.id);

    MLForge.dsa.storage.addRecentProblem(problem);

    const relatedProblems = allProblems.filter(p => (problem.relatedProblemIds || []).includes(p.id));

    contentArea.innerHTML = `
      <div class="problem-detail-header">
        <!-- 1. Breadcrumbs & Meta -->
        <div class="problem-detail-nav">
          <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">
            <a href="#dsa/dashboard" style="color: var(--color-accent-cyan); text-decoration: none;">DSA</a>
            <span>/</span>
            <a href="#dsa/problem-bank" style="color: var(--color-accent-cyan); text-decoration: none;">Problem Bank</a>
            <span>/</span>
            <span style="color: var(--text-main); font-weight: 600;">${problem.title}</span>
          </div>

          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button class="btn btn-sm ${isBookmarked ? 'btn-primary' : 'btn-secondary'}" id="prob-detail-bm-btn" onclick="MLForge.dsa.router.toggleDetailBookmark('${problem.id}', this)">
              ${isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
            </button>
            <button class="btn btn-sm btn-ghost" onclick="MLForge.dsa.router.openRandomProblem()">Next Random →</button>
          </div>
        </div>

        <!-- 2. Problem Title -->
        <h1 class="problem-detail-title">${problem.title}</h1>

        <!-- 3. Difficulty, Topic, and Pattern Badges -->
        <div class="problem-meta-pills">
          <span class="badge ${problem.difficulty === 'Easy' ? 'badge-easy' : problem.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}" style="font-size: 0.8rem; padding: 0.25rem 0.65rem;">
            ${problem.difficulty}
          </span>
          <span class="badge badge-blue">${problem.topic}</span>
          <span class="badge badge-cyan">${problem.pattern}</span>
          ${(problem.tags || []).map(t => `<span class="badge badge-subtle">${t}</span>`).join('')}
        </div>

        <!-- Completion Controls -->
        <div class="problem-controls-bar">
          <button class="btn btn-sm ${isSolved ? 'btn-primary' : 'btn-secondary'}" id="prob-detail-solve-btn" onclick="MLForge.dsa.router.toggleDetailSolved('${problem.id}', this)">
            ${isSolved ? '✓ Marked as Solved' : 'Mark as Solved'}
          </button>
          <button class="btn btn-sm ${isAttempted ? 'btn-secondary' : 'btn-ghost'}" id="prob-detail-att-btn" onclick="MLForge.dsa.router.toggleDetailAttempted('${problem.id}', this)">
            ${isAttempted ? 'Marked as Attempted' : 'Mark as Attempted'}
          </button>
          <button class="btn btn-sm btn-ghost" onclick="MLForge.dsa.router.resetProblemProgress('${problem.id}')">
            Reset Status
          </button>
        </div>
      </div>

      <!-- 4. Problem Statement -->
      <div class="problem-section-card">
        <h3 class="problem-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-accent-cyan);"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          Problem Statement
        </h3>
        <p style="font-size: 1.05rem; color: var(--text-main); line-height: 1.7; white-space: pre-line;">${problem.statement}</p>
      </div>

      <!-- 5 & 6. Input & Output Descriptions -->
      <div class="problem-section-card" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
        <div>
          <span class="example-label">Input Specification</span>
          <div style="margin-top: 0.35rem; font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">${problem.inputDescription}</div>
        </div>
        <div>
          <span class="example-label">Output Specification</span>
          <div style="margin-top: 0.35rem; font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">${problem.outputDescription}</div>
        </div>
      </div>

      <!-- 7 & 8. Examples & Explanations -->
      <div class="problem-section-card">
        <h3 class="problem-section-title">Examples</h3>
        ${problem.examples.map((ex, i) => `
          <div class="example-box">
            <div style="font-weight: 700; font-size: 0.85rem; color: var(--text-main); margin-bottom: 0.5rem;">Example ${i + 1}:</div>
            <div class="example-row"><span class="example-label">Input: </span><span class="example-val">${ex.input}</span></div>
            <div class="example-row"><span class="example-label">Output: </span><span class="example-val">${ex.output}</span></div>
            <div style="margin-top: 0.4rem; color: var(--text-secondary); font-size: 0.85rem;"><span class="example-label">Explanation: </span>${ex.explanation}</div>
          </div>
        `).join('')}
      </div>

      <!-- 9. Constraints -->
      <div class="problem-section-card">
        <h3 class="problem-section-title">Constraints</h3>
        <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.35rem; font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-secondary);">
          ${problem.constraints.map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>

      <!-- 10. Approach (Explained in Simple English) -->
      <div class="problem-section-card" style="border-left: 3px solid var(--color-primary); background: linear-gradient(135deg, rgba(59, 130, 246, 0.04), transparent);">
        <h3 class="problem-section-title" style="color: var(--color-primary);">
          Intuition & Approach
        </h3>
        <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.7;">${problem.approach}</p>
      </div>

      <!-- 11. Step-by-Step Dry Run -->
      ${problem.dryRun ? `
        <div class="problem-section-card">
          <h3 class="problem-section-title">Step-by-Step Dry Run</h3>
          <div class="problem-table-container">
            <table class="dry-run-table">
              <thead>
                <tr>
                  ${problem.dryRun.headers.map(h => `<th>${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${problem.dryRun.rows.map(row => `
                  <tr>
                    ${row.map(cell => `<td>${cell}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      <!-- 12. Solution Code in Multiple Languages -->
      <div class="problem-section-card">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
          <h3 class="problem-section-title" style="margin-bottom: 0;">Verified Solution Code</h3>
          <div class="code-lang-tabs" style="border: none; padding: 0;">
            <button class="code-lang-btn ${currentProblemLang === 'python' ? 'active' : ''}" onclick="MLForge.dsa.router.setProblemLang('python')">Python</button>
            <button class="code-lang-btn ${currentProblemLang === 'cpp' ? 'active' : ''}" onclick="MLForge.dsa.router.setProblemLang('cpp')">C++</button>
            <button class="code-lang-btn ${currentProblemLang === 'java' ? 'active' : ''}" onclick="MLForge.dsa.router.setProblemLang('java')">Java</button>
            <button class="code-lang-btn ${currentProblemLang === 'javascript' ? 'active' : ''}" onclick="MLForge.dsa.router.setProblemLang('javascript')">JavaScript</button>
          </div>
        </div>

        <div class="code-container">
          <div class="code-header">
            <span class="code-lang" id="prob-code-lang-label">${currentProblemLang.toUpperCase()}</span>
            <button class="copy-btn" onclick="MLForge.dsa.router.copyProblemCode()">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span>Copy Code</span>
            </button>
          </div>
          <pre class="code-pre" id="prob-code-block">${problem.solutions[currentProblemLang] || problem.solutions.python}</pre>
        </div>
      </div>

      <!-- 13. Code Explanation -->
      <div class="problem-section-card">
        <h3 class="problem-section-title">Code Line-by-Line Breakdown</h3>
        <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; white-space: pre-line;">${problem.codeExplanation}</p>
      </div>

      <!-- 14 & 15. Time and Space Complexity -->
      <div class="problem-section-card">
        <h3 class="problem-section-title">Complexity Analysis</h3>
        <div class="complexity-box-grid">
          <div class="complexity-pill-card">
            <div class="complexity-pill-header">Time Complexity</div>
            <div class="complexity-pill-val">${problem.timeComplexity.split('—')[0]}</div>
            <div class="complexity-pill-desc">${problem.timeComplexity.split('—')[1] || ''}</div>
          </div>
          <div class="complexity-pill-card">
            <div class="complexity-pill-header">Space Complexity</div>
            <div class="complexity-pill-val">${problem.spaceComplexity.split('—')[0]}</div>
            <div class="complexity-pill-desc">${problem.spaceComplexity.split('—')[1] || ''}</div>
          </div>
        </div>
      </div>

      <!-- 16. Alternative Approach -->
      ${problem.alternativeApproach ? `
        <div class="problem-section-card">
          <h3 class="problem-section-title">Alternative Approach & Trade-offs</h3>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${problem.alternativeApproach}</p>
        </div>
      ` : ''}

      <!-- 17. Common Mistakes -->
      ${problem.commonMistakes && problem.commonMistakes.length > 0 ? `
        <div class="problem-section-card" style="border-left: 3px solid var(--color-accent-rose);">
          <h3 class="problem-section-title" style="color: var(--color-accent-rose);">
            ⚠️ Common Traps & Mistakes
          </h3>
          <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.9rem; color: var(--text-secondary);">
            ${problem.commonMistakes.map(m => `<li>${m}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- 18. Related Problems -->
      <div class="problem-section-card">
        <h3 class="problem-section-title">Related Practice Problems</h3>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${relatedProblems.map(rp => `
            <a href="#dsa/problem/${rp.id}" class="card card-interactive" style="padding: 0.75rem 1.25rem; display: flex; align-items: center; justify-content: space-between; text-decoration: none;">
              <span style="font-weight: 600; color: var(--text-main); font-size: 0.9rem;">${rp.title}</span>
              <span class="badge ${rp.difficulty === 'Easy' ? 'badge-easy' : rp.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}">${rp.difficulty}</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  function setProblemLang(lang) {
    currentProblemLang = lang;
    const label = document.getElementById('prob-code-lang-label');
    const block = document.getElementById('prob-code-block');
    document.querySelectorAll('.code-lang-btn').forEach(btn => btn.classList.remove('active'));

    const activeBtn = Array.from(document.querySelectorAll('.code-lang-btn')).find(b => b.textContent.toLowerCase() === lang);
    if (activeBtn) activeBtn.classList.add('active');

    if (label) label.textContent = lang.toUpperCase();
    if (block) {
      const hash = window.location.hash || '';
      const pid = hash.split('/')[2];
      const problem = (MLForge.dsa.data.problems || []).find(p => p.id === pid);
      if (problem && problem.solutions) {
        block.textContent = problem.solutions[lang] || problem.solutions.python;
      }
    }
  }

  function copyProblemCode() {
    const block = document.getElementById('prob-code-block');
    if (block) {
      MLForge.ui.copyToClipboard(block.textContent, 'Solution code copied to clipboard!');
    }
  }

  function toggleDetailSolved(id, btn) {
    const isSolved = MLForge.dsa.storage.toggleProblemSolved(id);
    if (btn) {
      if (isSolved) {
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
        btn.textContent = '✓ Marked as Solved';
        MLForge.ui.showToast('Problem marked as solved!', 'success');
      } else {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
        btn.textContent = 'Mark as Solved';
        MLForge.ui.showToast('Problem marked as unsolved', 'info');
      }
    }
  }

  function toggleDetailAttempted(id, btn) {
    const isAttempted = MLForge.dsa.storage.toggleProblemAttempted(id);
    if (btn) {
      btn.textContent = isAttempted ? 'Marked as Attempted' : 'Mark as Attempted';
      MLForge.ui.showToast(isAttempted ? 'Marked as attempted' : 'Attempted removed', 'info');
    }
  }

  function toggleDetailBookmark(id, btn) {
    const isBookmarked = MLForge.dsa.storage.toggleProblemBookmark(id);
    if (btn) {
      if (isBookmarked) {
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
        btn.textContent = '★ Bookmarked';
        MLForge.ui.showToast('Problem saved to bookmarks!', 'success');
      } else {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
        btn.textContent = '☆ Bookmark';
        MLForge.ui.showToast('Bookmark removed', 'info');
      }
    }
  }

  function resetProblemProgress(id) {
    if (MLForge.dsa.storage.isProblemSolved(id)) {
      MLForge.dsa.storage.toggleProblemSolved(id);
    }
    MLForge.dsa.storage.removeProblemAttempted(id);
    renderProblemDetail(id);
    MLForge.ui.showToast('Problem progress reset', 'info');
  }

  // =========================================================================
  // View 5: Complexity Cheat Sheet
  // =========================================================================
  function renderCheatSheet() {
    const cs = MLForge.dsa.data.cheatsheet || {};
    const dsList = cs.dataStructures || [];
    const sortList = cs.sortingAlgorithms || [];
    const graphList = cs.graphAlgorithms || [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; color: var(--text-main); margin-bottom: 0.5rem;">
          Time & Space Complexity Cheat Sheet
        </h1>
        <p style="color: var(--text-secondary); max-width: 820px;">
          Searchable reference table for operations, data structures, and algorithms. Includes best, average, and worst-case time complexities, auxiliary memory costs, and the specific assumptions behind each complexity.
        </p>
      </div>

      <!-- Quick Search Bar -->
      <div class="problem-filter-bar" style="margin-bottom: 1.5rem;">
        <input type="text" id="cs-search-input" class="form-input" placeholder="Search data structure or algorithm (e.g. hash table, quick sort, dijkstra)..." oninput="MLForge.dsa.router.filterCheatSheet()">
      </div>

      <!-- 1. Data Structure Operations -->
      <section style="margin-bottom: 2.5rem;">
        <div class="section-header">
          <h2 class="section-title">Common Data Structure Operations</h2>
        </div>
        <div class="problem-table-container">
          <table class="dsa-problem-table" id="cs-ds-table">
            <thead>
              <tr>
                <th>Data Structure</th>
                <th>Category</th>
                <th>Access</th>
                <th>Search</th>
                <th>Insertion</th>
                <th>Deletion</th>
                <th>Aux Space</th>
                <th>Assumptions & Behavior</th>
              </tr>
            </thead>
            <tbody>
              ${dsList.map(item => `
                <tr class="cs-row">
                  <td style="font-weight: 700; color: var(--text-main);">${item.name}</td>
                  <td><span class="badge badge-subtle">${item.category}</span></td>
                  <td><span class="badge badge-blue font-mono">${item.access}</span></td>
                  <td><span class="badge badge-cyan font-mono">${item.search}</span></td>
                  <td><span class="badge badge-emerald font-mono">${item.insertion}</span></td>
                  <td><span class="badge badge-amber font-mono">${item.deletion}</span></td>
                  <td><span class="badge badge-violet font-mono">${item.space}</span></td>
                  <td style="font-size: 0.8rem; color: var(--text-secondary); max-width: 280px;">${item.assumptions}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- 2. Sorting Algorithms Comparison Table -->
      <section style="margin-bottom: 2.5rem;">
        <div class="section-header">
          <h2 class="section-title">Sorting Algorithms Comparison</h2>
        </div>
        <div class="problem-table-container">
          <table class="dsa-problem-table" id="cs-sort-table">
            <thead>
              <tr>
                <th>Algorithm</th>
                <th>Best Case</th>
                <th>Average Case</th>
                <th>Worst Case</th>
                <th>Aux Space</th>
                <th>Stable?</th>
                <th>In-Place?</th>
                <th>Engineering Notes</th>
              </tr>
            </thead>
            <tbody>
              ${sortList.map(item => `
                <tr class="cs-row">
                  <td style="font-weight: 700; color: var(--text-main);">${item.name}</td>
                  <td><span class="badge badge-emerald font-mono">${item.best}</span></td>
                  <td><span class="badge badge-blue font-mono">${item.average}</span></td>
                  <td><span class="badge ${item.worst.includes('n²') ? 'badge-rose' : 'badge-cyan'} font-mono">${item.worst}</span></td>
                  <td><span class="badge badge-violet font-mono">${item.space}</span></td>
                  <td><span class="badge ${item.stable === 'Yes' ? 'badge-emerald' : 'badge-subtle'}">${item.stable}</span></td>
                  <td><span class="badge ${item.inPlace === 'Yes' ? 'badge-emerald' : 'badge-subtle'}">${item.inPlace}</span></td>
                  <td style="font-size: 0.8rem; color: var(--text-secondary);">${item.notes}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- 3. Graph Algorithms -->
      <section style="margin-bottom: 2.5rem;">
        <div class="section-header">
          <h2 class="section-title">Graph Algorithms</h2>
        </div>
        <div class="problem-table-container">
          <table class="dsa-problem-table" id="cs-graph-table">
            <thead>
              <tr>
                <th>Algorithm</th>
                <th>Time Complexity</th>
                <th>Space Complexity</th>
                <th>Primary Use Case</th>
              </tr>
            </thead>
            <tbody>
              ${graphList.map(item => `
                <tr class="cs-row">
                  <td style="font-weight: 700; color: var(--text-main);">${item.name}</td>
                  <td><span class="badge badge-cyan font-mono">${item.time}</span></td>
                  <td><span class="badge badge-violet font-mono">${item.space}</span></td>
                  <td style="font-size: 0.85rem; color: var(--text-secondary);">${item.useCase}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  function filterCheatSheet() {
    const input = document.getElementById('cs-search-input');
    const query = input ? input.value.toLowerCase().trim() : '';
    document.querySelectorAll('.cs-row').forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? '' : 'none';
    });
  }

  // =========================================================================
  // View 6: Pattern Recognition Guide
  // =========================================================================
  function renderPatterns() {
    const patterns = MLForge.dsa.data.patterns || [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; color: var(--text-main); margin-bottom: 0.5rem;">
          DSA Interview Pattern Recognition Guide
        </h1>
        <p style="color: var(--text-secondary); max-width: 820px;">
          Learn how to diagnose a coding problem within the first 60 seconds of reading it. Connect common problem descriptions and constraints to the right algorithmic techniques.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        ${patterns.map(pat => `
          <div class="problem-section-card" id="${pat.id}">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
              <div>
                <span class="badge badge-cyan" style="margin-bottom: 0.25rem;">${pat.category}</span>
                <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main);">${pat.name}</h2>
              </div>
            </div>

            <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6; margin-bottom: 1rem;">${pat.whatItMeans}</p>

            <!-- Clues Grid -->
            <div style="background: var(--bg-input); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1rem; border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent-amber); margin-bottom: 0.5rem;">
                🔍 Recognition Clues in Problem Statements:
              </div>
              <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.875rem; color: var(--text-secondary);">
                ${pat.clues.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div style="padding: 0.85rem; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: var(--radius-md);">
                <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #10b981; display: block; margin-bottom: 0.25rem;">Simple Intuition Example:</span>
                <span style="font-size: 0.85rem; color: var(--text-main); line-height: 1.5;">${pat.simpleExample}</span>
              </div>
              <div style="padding: 0.85rem; background: rgba(244, 63, 94, 0.05); border: 1px solid rgba(244, 63, 94, 0.2); border-radius: var(--radius-md);">
                <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #f43f5e; display: block; margin-bottom: 0.25rem;">When NOT to use this pattern:</span>
                <span style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">${pat.whenNotSuitable}</span>
              </div>
            </div>

            <div>
              <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 0.4rem;">Classic Problems Solved:</span>
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${pat.commonProblems.map(p => `<span class="badge badge-subtle" style="font-size: 0.8rem;">${p}</span>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // View 7: My Progress
  // =========================================================================
  function renderProgress() {
    const allProblems = MLForge.dsa.data.problems || [];
    const allTopics = MLForge.dsa.data.topics || [];
    const stats = MLForge.dsa.storage.getStats(allProblems, allTopics);
    const solvedIds = MLForge.dsa.storage.getSolved();
    const bookmarkedIds = MLForge.dsa.storage.getBookmarks();

    const solvedProblems = allProblems.filter(p => solvedIds.includes(p.id));
    const bookmarkedProblems = allProblems.filter(p => bookmarkedIds.includes(p.id));

    contentArea.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; color: var(--text-main); margin-bottom: 0.5rem;">
          My Learning Progress
        </h1>
        <p style="color: var(--text-secondary); max-width: 820px;">
          All your learning metrics are calculated and saved directly in your browser's LocalStorage. No registration, no telemetry, and 100% private.
        </p>
      </div>

      <!-- Stats Cards Grid -->
      <div class="stats-grid" style="margin-bottom: 2rem;">
        <div class="stat-card">
          <div class="stat-icon emerald">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div>
            <div class="stat-value">${stats.overallProgress}%</div>
            <div class="stat-label">Total Solved Progress</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <div>
            <div class="stat-value">${stats.easySolved} / ${stats.easyTotal}</div>
            <div class="stat-label" style="color: #10b981;">Easy Problems</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon cyan">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div>
            <div class="stat-value">${stats.mediumSolved} / ${stats.mediumTotal}</div>
            <div class="stat-label" style="color: #f59e0b;">Medium Problems</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon violet">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/></svg>
          </div>
          <div>
            <div class="stat-value">${stats.completedTopicsCount} / ${stats.totalTopics}</div>
            <div class="stat-label">Completed Topics</div>
          </div>
        </div>
      </div>

      <!-- Solved Problems List -->
      <section style="margin-bottom: 2rem;">
        <div class="section-header">
          <h2 class="section-title">Solved Problems (${solvedProblems.length})</h2>
        </div>
        ${solvedProblems.length > 0 ? `
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${solvedProblems.map(p => `
              <div class="card" style="padding: 0.85rem 1.25rem; display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 0.65rem;">
                  <span style="color: #10b981; font-weight: 700;">✓</span>
                  <a href="#dsa/problem/${p.id}" style="color: var(--text-main); font-weight: 600; text-decoration: none;">${p.title}</a>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="badge ${p.difficulty === 'Easy' ? 'badge-easy' : p.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}">${p.difficulty}</span>
                  <button class="btn btn-sm btn-ghost" onclick="MLForge.dsa.router.removeSolved('${p.id}')">Unsolve</button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <p style="color: var(--text-muted); font-size: 0.95rem;">You haven't marked any problems as solved yet. <a href="#dsa/problem-bank" style="color: var(--color-accent-cyan);">Start practicing now →</a></p>
        `}
      </section>

      <!-- Bookmarked Problems List -->
      <section style="margin-bottom: 2.5rem;">
        <div class="section-header">
          <h2 class="section-title">Saved Bookmarks (${bookmarkedProblems.length})</h2>
        </div>
        ${bookmarkedProblems.length > 0 ? `
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${bookmarkedProblems.map(p => `
              <div class="card" style="padding: 0.85rem 1.25rem; display: flex; align-items: center; justify-content: space-between;">
                <a href="#dsa/problem/${p.id}" style="color: var(--text-main); font-weight: 600; text-decoration: none;">★ ${p.title}</a>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="badge ${p.difficulty === 'Easy' ? 'badge-easy' : p.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}">${p.difficulty}</span>
                  <button class="btn btn-sm btn-ghost" onclick="MLForge.dsa.router.removeBookmark('${p.id}')">Remove</button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <p style="color: var(--text-muted); font-size: 0.95rem;">No bookmarked problems. Tap the star icon on any problem to save it here.</p>
        `}
      </section>

      <!-- Danger Zone / Reset Controls -->
      <section style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border-subtle);">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: #f43f5e; margin-bottom: 0.5rem;">Reset Learning Progress</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
          Permanently clear your solved problems, topic completions, and bookmarks. This action cannot be undone.
        </p>
        <button class="btn btn-sm btn-ghost" style="color: #f43f5e; border: 1px solid rgba(244, 63, 94, 0.4);" onclick="MLForge.dsa.router.confirmResetAll()">
          Reset All DSA Progress
        </button>
      </section>
    `;
  }

  function removeSolved(id) {
    MLForge.dsa.storage.toggleProblemSolved(id);
    renderProgress();
    MLForge.ui.showToast('Removed from solved list', 'info');
  }

  function removeBookmark(id) {
    MLForge.dsa.storage.toggleProblemBookmark(id);
    renderProgress();
    MLForge.ui.showToast('Bookmark removed', 'info');
  }

  function confirmResetAll() {
    if (confirm('Are you sure you want to reset all your DSA solved problems, completed topics, and bookmarks? This cannot be undone.')) {
      MLForge.dsa.storage.resetAllProgress();
      renderProgress();
      MLForge.ui.showToast('All DSA progress reset successfully', 'info');
    }
  }

  // =========================================================================
  // View 8: Visualizers Host
  // =========================================================================
  function renderVisualizers(tool) {
    MLForge.dsa.visualizers.render(contentArea, tool);
  }

  return {
    init,
    handleRoute,
    setTopicLang,
    copyTopicCode,
    toggleTopicCompleted,
    filterProblemBank,
    resetProblemFilters,
    openRandomProblem,
    toggleSolvedInline,
    toggleBookmarkInline,
    setProblemLang,
    copyProblemCode,
    toggleDetailSolved,
    toggleDetailAttempted,
    toggleDetailBookmark,
    resetProblemProgress,
    filterCheatSheet,
    removeSolved,
    removeBookmark,
    confirmResetAll,
    updateComplexityGraph
  };
})();
