/**
 * MLForge SQL View Router & Dynamic Page Renderer
 * Manages rendering of dashboard, topic syllabus, interactive playground,
 * practice problems, interview prep, real-world projects, quizzes,
 * cheatsheet, glossary, and user progress.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sql = window.MLForge.sql || {};

MLForge.sql.router = (function () {
  let contentArea = null;

  function init() {
    contentArea = document.getElementById('content-area');
  }

  function handleRoute(subparts = []) {
    if (!contentArea) contentArea = document.getElementById('content-area');
    const subroute = subparts[0] || 'dashboard';
    const param = subparts[1] || null;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateSqlSidebarActive(subroute, param);

    // Direct topic shortcut check (e.g. #sql/sql-joins)
    const topics = MLForge.sql.data.topics || [];
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
        renderTopic(param || 'sql-fundamentals');
        break;
      case 'playground':
        renderPlayground();
        break;
      case 'practice':
        renderPractice(param);
        break;
      case 'interview':
        renderInterview(param);
        break;
      case 'projects':
        renderProjects(param);
        break;
      case 'quizzes':
        renderQuizzes(param);
        break;
      case 'cheatsheet':
        renderCheatsheet();
        break;
      case 'glossary':
        renderGlossary();
        break;
      case 'mysql':
        renderTopic('mysql-guide');
        break;
      case 'postgresql':
        renderTopic('postgresql-guide');
        break;
      case 'optimization':
        renderTopic('query-optimization');
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

  function updateSqlSidebarActive(subroute, param) {
    document.querySelectorAll('.sidebar-sub-item, .nav-item').forEach(el => {
      el.classList.remove('active');
    });

    const routeMap = {
      'dashboard': 'nav-sql-dashboard',
      'playground': 'nav-sql-playground',
      'practice': 'nav-sql-practice',
      'interview': 'nav-sql-interview',
      'projects': 'nav-sql-projects',
      'quizzes': 'nav-sql-quizzes',
      'cheatsheet': 'nav-sql-cheatsheet',
      'glossary': 'nav-sql-glossary',
      'mysql': 'nav-sql-mysql',
      'postgresql': 'nav-sql-postgresql',
      'optimization': 'nav-sql-optimization',
      'progress': 'nav-sql-progress'
    };

    const targetId = routeMap[subroute];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) el.classList.add('active');
    }

    // Highlight sub-nav topic item if viewing a topic
    if (subroute === 'topic' || (MLForge.sql.data.topics || []).some(t => t.id === subroute)) {
      const topicId = param || subroute;
      const subItem = document.querySelector(`.sidebar-sql-sub-item[data-topic-id="${topicId}"]`);
      if (subItem) subItem.classList.add('active');
    }
  }

  // --- 1. DASHBOARD VIEW ---
  function renderDashboard() {
    const topics = MLForge.sql.data.topics || [];
    const problems = MLForge.sql.data.problems || [];
    const stats = MLForge.sql.storage.getStats(topics.length, problems.length);
    const lastTopic = stats.lastTopic || topics[0];

    contentArea.innerHTML = `
      <!-- Hero Section -->
      <section class="sql-hero">
        <div class="sql-hero-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          Master Database Engineering
        </div>
        <h1 class="sql-hero-title">SQL Mastery</h1>
        <p class="sql-hero-desc">
          Learn SQL from the basics to advanced database development. Write queries, solve real-world problems, and prepare for technical interviews.
        </p>
        <div class="sql-hero-actions">
          <a href="#sql/topic/${lastTopic.id}" class="btn btn-primary" style="background: var(--color-sql-primary); color: white;">
            <span>Continue Learning: ${lastTopic.title}</span>
          </a>
          <a href="#sql/playground" class="btn btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>SQL Playground</span>
          </a>
          <a href="#sql/practice" class="btn btn-secondary">Practice Problems</a>
          <a href="#sql/interview" class="btn btn-secondary">Interview Prep</a>
          <a href="#sql/cheatsheet" class="btn btn-secondary">Cheatsheet</a>
        </div>
      </section>

      <!-- Real LocalStorage Progress Stats Grid -->
      <section class="sql-stats-grid">
        <div class="sql-stat-card">
          <div class="sql-stat-val" style="color: var(--color-sql-primary);">${stats.completedTopicsCount} / ${stats.totalTopics}</div>
          <div class="sql-stat-label">Topics Completed</div>
          <div class="sql-progress-bar-wrap">
            <div class="sql-progress-bar-fill" style="width: ${stats.progressPercent}%;"></div>
          </div>
        </div>

        <div class="sql-stat-card">
          <div class="sql-stat-val" style="color: #10b981;">${stats.solvedProblemsCount} / ${stats.totalProblems}</div>
          <div class="sql-stat-label">Practice Solved</div>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;">${stats.totalProblems - stats.solvedProblemsCount} remaining</span>
        </div>

        <div class="sql-stat-card">
          <div class="sql-stat-val" style="color: #f59e0b;">${stats.bookmarksCount}</div>
          <div class="sql-stat-label">Saved Bookmarks</div>
          <a href="#sql/progress" style="font-size: 0.75rem; color: var(--color-sql-primary); margin-top: 0.5rem;">View bookmarks &rarr;</a>
        </div>

        <div class="sql-stat-card">
          <div class="sql-stat-val" style="color: #8b5cf6;">${stats.progressPercent}%</div>
          <div class="sql-stat-label">Mastery Progress</div>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;">Full-stack Curriculum</span>
        </div>
      </section>

      <!-- Learning Roadmap -->
      <section style="margin-bottom: 2rem;">
        <div class="section-header" style="margin-bottom: 1.25rem;">
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main);">Curriculum Roadmap</h2>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Step-by-step path from absolute beginner to senior database engineer.</p>
        </div>

        <div class="sql-roadmap-grid">
          ${renderRoadmapCards(topics)}
        </div>
      </section>
    `;
  }

  function renderRoadmapCards(topics) {
    const roadmapSteps = [
      { step: "Stage 1", title: "Database & SQL Basics", topicId: "sql-fundamentals", desc: "Declarative languages, RDBMS architecture, tables, and rows." },
      { step: "Stage 2", title: "Keys & Integrity", topicId: "database-fundamentals", desc: "Primary, Foreign, Candidate, Surrogate keys, and constraints." },
      { step: "Stage 3", title: "Data Types & Schema", topicId: "sql-data-types", desc: "Exact numeric types, strings, timestamps, and JSON." },
      { step: "Stage 4", title: "CRUD & Table Management", topicId: "database-creation", desc: "CREATE TABLE, ALTER, DROP, and college_db schema." },
      { step: "Stage 5", title: "Filtering & Sorting", topicId: "filtering-sorting", desc: "WHERE, ORDER BY, LIMIT, BETWEEN, IN, and NULL handling." },
      { step: "Stage 6", title: "Functions & Calculations", topicId: "sql-functions", desc: "String manipulation, dates, COALESCE, and CASE WHEN." },
      { step: "Stage 7", title: "Aggregations & Grouping", topicId: "aggregate-functions", desc: "COUNT, SUM, AVG, GROUP BY, and WHERE vs HAVING." },
      { step: "Stage 8", title: "SQL Joins", topicId: "sql-joins", desc: "INNER, LEFT, RIGHT, FULL OUTER, CROSS, and Self-Joins." },
      { step: "Stage 9", title: "Subqueries & Correlated Logic", topicId: "subqueries", desc: "Scalar subqueries, EXISTS, IN, and derived tables." },
      { step: "Stage 10", title: "Common Table Expressions (CTEs)", topicId: "ctes", desc: "WITH clause, modular queries, and Recursive CTEs." },
      { step: "Stage 11", title: "Window Functions", topicId: "window-functions", desc: "ROW_NUMBER, DENSE_RANK, LAG, LEAD, and running totals." },
      { step: "Stage 12", title: "Database Normalization", topicId: "database-normalization", desc: "Eliminating anomalies: 1NF, 2NF, 3NF, and BCNF." },
      { step: "Stage 13", title: "Indexing & B-Trees", topicId: "indexing", desc: "Clustered indexes, composite order, and query plans." },
      { step: "Stage 14", title: "Transactions & ACID", topicId: "transactions-acid", desc: "Atomicity, isolation levels, dirty reads, and deadlocks." },
      { step: "Stage 15", title: "Query Optimization", topicId: "query-optimization", desc: "EXPLAIN ANALYZE, eliminating N+1 queries, and keyset pagination." }
    ];

    return roadmapSteps.map(s => {
      const isCompleted = MLForge.sql.storage.isTopicCompleted(s.topicId);
      return `
        <a href="#sql/topic/${s.topicId}" class="sql-roadmap-card">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="sql-roadmap-step">${s.step}</span>
              ${isCompleted ? '<span class="badge badge-emerald" style="font-size: 0.65rem;">✓ Completed</span>' : ''}
            </div>
            <h3 class="sql-roadmap-title">${s.title}</h3>
            <p class="sql-roadmap-desc">${s.desc}</p>
          </div>
          <div style="display: flex; align-items: center; gap: 0.35rem; color: var(--color-sql-primary); font-size: 0.8rem; font-weight: 600;">
            <span>Start Lesson</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </a>
      `;
    }).join('');
  }

  // --- 2. TOPIC LESSON VIEW ---
  function renderTopic(topicId) {
    const topics = MLForge.sql.data.topics || [];
    const topic = topics.find(t => t.id === topicId) || topics[0];

    // Save as last opened topic
    MLForge.sql.storage.setLastTopic(topic);

    const isCompleted = MLForge.sql.storage.isTopicCompleted(topic.id);
    const isBookmarked = MLForge.sql.storage.isBookmarked(topic.id);

    // Find Previous and Next topics
    const currIdx = topics.findIndex(t => t.id === topic.id);
    const prevTopic = currIdx > 0 ? topics[currIdx - 1] : null;
    const nextTopic = currIdx < topics.length - 1 ? topics[currIdx + 1] : null;

    contentArea.innerHTML = `
      <div class="sql-topic-view">
        <!-- Breadcrumbs -->
        <nav class="sql-breadcrumb" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.4rem;">
          <a href="#sql/dashboard" style="color: var(--text-muted);">SQL Mastery</a>
          <span>/</span>
          <span style="color: var(--color-sql-primary);">${topic.category}</span>
          <span>/</span>
          <span style="color: var(--text-main); font-weight: 500;">${topic.title}</span>
        </nav>

        <!-- Topic Header -->
        <div class="sql-topic-header">
          <div class="sql-topic-meta">
            <span class="sql-badge-cyan">${topic.category}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">⏱ ${topic.readTime}</span>
            <button class="btn btn-secondary btn-sm" id="sql-topic-bookmark-btn" style="padding: 0.25rem 0.65rem;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>${isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
            <button class="btn btn-secondary btn-sm" id="sql-topic-complete-btn" style="padding: 0.25rem 0.65rem; ${isCompleted ? 'border-color: #10b981; color: #10b981;' : ''}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <span>${isCompleted ? 'Completed ✓' : 'Mark Completed'}</span>
            </button>
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">${topic.title}</h1>
          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6;">${topic.summary}</p>
        </div>

        <!-- Topic Content Body -->
        <div class="sql-topic-body">
          ${topic.content}
        </div>

        <!-- Bottom Navigation: Prev / Next -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle); flex-wrap: wrap; gap: 1rem;">
          ${prevTopic ? `
            <a href="#sql/topic/${prevTopic.id}" class="btn btn-secondary" style="display: flex; align-items: center; gap: 0.5rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
              <div style="text-align: left;">
                <div style="font-size: 0.7rem; color: var(--text-muted);">Previous Lesson</div>
                <div style="font-weight: 600;">${prevTopic.title}</div>
              </div>
            </a>
          ` : '<div></div>'}

          ${nextTopic ? `
            <a href="#sql/topic/${nextTopic.id}" class="btn btn-primary" style="background: var(--color-sql-primary); color: white; display: flex; align-items: center; gap: 0.5rem;">
              <div style="text-align: right;">
                <div style="font-size: 0.7rem; color: rgba(255, 255, 255, 0.8);">Next Lesson</div>
                <div style="font-weight: 600;">${nextTopic.title}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
          ` : `
            <a href="#sql/playground" class="btn btn-primary" style="background: var(--color-sql-primary); color: white;">Go to SQL Playground &rarr;</a>
          `}
        </div>
      </div>
    `;

    // Bind completion toggle
    const compBtn = document.getElementById('sql-topic-complete-btn');
    if (compBtn) {
      compBtn.addEventListener('click', () => {
        const completed = MLForge.sql.storage.toggleTopicCompleted(topic.id);
        if (completed) {
          MLForge.ui.showToast(`Topic marked as completed!`, 'success');
        } else {
          MLForge.ui.showToast('Topic marked as incomplete.', 'info');
        }
        renderTopic(topic.id);
        if (MLForge.sql.app && MLForge.sql.app.updateSidebarCounts) {
          MLForge.sql.app.updateSidebarCounts();
        }
      });
    }

    // Bind bookmark toggle
    const bkmkBtn = document.getElementById('sql-topic-bookmark-btn');
    if (bkmkBtn) {
      bkmkBtn.addEventListener('click', () => {
        const added = MLForge.sql.storage.toggleBookmark({
          id: topic.id,
          title: topic.title,
          category: topic.category,
          link: `#sql/topic/${topic.id}`
        });
        MLForge.ui.showToast(added ? 'Bookmark saved!' : 'Bookmark removed.', 'info');
        renderTopic(topic.id);
      });
    }
  }

  // --- 3. PLAYGROUND VIEW ---
  function renderPlayground() {
    MLForge.sql.playground.render('content-area');
  }

  // --- 4. PRACTICE PROBLEMS VIEW ---
  function renderPractice(filterDiff) {
    const problems = MLForge.sql.data.problems || [];
    const activeFilter = filterDiff || 'all';

    const filtered = activeFilter === 'all' 
      ? problems 
      : problems.filter(p => p.difficulty.toLowerCase() === activeFilter.toLowerCase());

    contentArea.innerHTML = `
      <div style="max-width: 960px; margin: 0 auto;">
        <div class="section-header" style="margin-bottom: 1.5rem;">
          <div class="sql-badge-cyan" style="margin-bottom: 0.5rem;">SQL Problem Bank</div>
          <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main);">Practical SQL Exercises</h1>
          <p style="color: var(--text-secondary); line-height: 1.6;">
            Solve real-world query problems against the in-memory database. Write your SQL, run the test, and compare your output with expected results.
          </p>
        </div>

        <!-- Filter Pills -->
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
          <button class="btn btn-secondary btn-sm sql-prob-filter-btn ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">All (${problems.length})</button>
          <button class="btn btn-secondary btn-sm sql-prob-filter-btn ${activeFilter === 'easy' ? 'active' : ''}" data-filter="easy">Easy</button>
          <button class="btn btn-secondary btn-sm sql-prob-filter-btn ${activeFilter === 'medium' ? 'active' : ''}" data-filter="medium">Medium</button>
          <button class="btn btn-secondary btn-sm sql-prob-filter-btn ${activeFilter === 'hard' ? 'active' : ''}" data-filter="hard">Hard</button>
        </div>

        <!-- Problems List -->
        <div class="sql-problems-list">
          ${filtered.map(p => renderProblemCard(p)).join('')}
        </div>
      </div>
    `;

    bindPracticeEvents();
  }

  function renderProblemCard(p) {
    const isSolved = MLForge.sql.storage.isProblemSolved(p.id);
    const diffClass = p.difficulty === 'Easy' ? 'sql-diff-badge-easy' : (p.difficulty === 'Medium' ? 'sql-diff-badge-med' : 'sql-diff-badge-hard');

    return `
      <div class="sql-practice-card" id="practice-${p.id}">
        <div class="sql-practice-card-header">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main);">${p.title}</h3>
            <span class="sql-badge-cyan ${diffClass}" style="font-size: 0.7rem;">${p.difficulty}</span>
          </div>
          ${isSolved ? '<span class="badge badge-emerald" style="font-size: 0.7rem;">✓ Solved</span>' : ''}
        </div>

        <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 0.75rem;">${p.statement}</p>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">${p.schemaDesc}</div>

        <!-- Interactive SQL Submission Area -->
        <div style="border: 1px solid var(--border-card); border-radius: var(--radius-sm); margin-bottom: 0.75rem; background: var(--bg-code);">
          <textarea class="sql-practice-input" id="input-${p.id}" style="width: 100%; height: 90px; background: transparent; border: none; padding: 0.75rem; color: #38bdf8; font-family: var(--font-mono); font-size: 0.825rem; outline: none; resize: vertical;" spellcheck="false">${p.starterQuery}</textarea>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-primary btn-sm sql-prob-run-btn" data-id="${p.id}" style="background: var(--color-sql-primary); color: white;">
              Run Query &amp; Check
            </button>
            <button class="btn btn-secondary btn-sm sql-prob-hint-btn" data-id="${p.id}">
              💡 Hints (${p.hints.length})
            </button>
            <button class="btn btn-secondary btn-sm sql-prob-sol-btn" data-id="${p.id}">
              Solution
            </button>
          </div>
          <span class="sql-prob-status" id="status-${p.id}" style="font-size: 0.8rem; font-weight: 600;"></span>
        </div>

        <!-- Hidden Hint and Solution Boxes -->
        <div class="sql-prob-hint-box" id="hint-box-${p.id}" style="display: none; background: rgba(14, 165, 233, 0.05); border: 1px solid var(--color-sql-border); border-radius: var(--radius-sm); padding: 0.75rem; margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-secondary);">
          <strong>Hints:</strong>
          <ul style="margin: 0.35rem 0 0 1rem; padding: 0;">
            ${p.hints.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>

        <div class="sql-prob-sol-box" id="sol-box-${p.id}" style="display: none; background: var(--bg-input); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.75rem; margin-top: 0.5rem;">
          <div style="font-size: 0.8rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.35rem;">Official Solution Query:</div>
          <pre class="sql-code-block" style="margin: 0; font-size: 0.8rem;">${p.solutionQuery}</pre>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem;">${p.explanation}</p>
        </div>

        <!-- Problem Output Preview -->
        <div class="sql-prob-output-area" id="output-${p.id}" style="display: none; margin-top: 0.75rem;"></div>
      </div>
    `;
  }

  function bindPracticeEvents() {
    // Filter buttons
    document.querySelectorAll('.sql-prob-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        renderPractice(btn.dataset.filter);
      });
    });

    // Run query & check
    document.querySelectorAll('.sql-prob-run-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = btn.dataset.id;
        const problem = (MLForge.sql.data.problems || []).find(p => p.id === pId);
        if (!problem) return;

        const inputEl = document.getElementById(`input-${pId}`);
        const statusEl = document.getElementById(`status-${pId}`);
        const outputArea = document.getElementById(`output-${pId}`);
        if (!inputEl) return;

        const userSql = inputEl.value.trim();
        const userResult = MLForge.sql.engine.execute(userSql);
        const expectedResult = MLForge.sql.engine.execute(problem.solutionQuery);

        outputArea.style.display = 'block';

        if (userResult.error) {
          statusEl.innerHTML = `<span style="color: var(--color-accent-rose);">❌ Syntax Error</span>`;
          outputArea.innerHTML = `<div class="sql-error-box">${userResult.error}</div>`;
          return;
        }

        // Compare results
        const isMatch = compareQueryResults(userResult, expectedResult);
        if (isMatch) {
          statusEl.innerHTML = `<span style="color: var(--color-accent-emerald);">✓ Accepted! All test cases passed.</span>`;
          MLForge.sql.storage.markProblemSolved(pId);
          MLForge.ui.showToast(`Problem solved: ${problem.title}`, 'success');
        } else {
          statusEl.innerHTML = `<span style="color: var(--color-accent-amber);">⚠️ Output mismatch. Review the expected columns or rows.</span>`;
        }

        // Render actual user rows
        outputArea.innerHTML = `
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.35rem;">Query Output (${userResult.rowCount} rows returned in ${userResult.executionTime}ms):</div>
          <div class="sql-table-wrapper" style="max-height: 200px;">
            <table class="sql-result-table">
              <thead><tr>${userResult.columns.map(c => `<th>${c}</th>`).join('')}</tr></thead>
              <tbody>
                ${userResult.rows.map(r => `<tr>${userResult.columns.map(c => `<td>${r[c] !== null ? r[c] : 'NULL'}</td>`).join('')}</tr>`).join('')}
              </tbody>
            </table>
          </div>
        `;
      });
    });

    // Hints toggle
    document.querySelectorAll('.sql-prob-hint-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const box = document.getElementById(`hint-box-${btn.dataset.id}`);
        if (box) box.style.display = box.style.display === 'none' ? 'block' : 'none';
      });
    });

    // Solution toggle
    document.querySelectorAll('.sql-prob-sol-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const box = document.getElementById(`sol-box-${btn.dataset.id}`);
        if (box) box.style.display = box.style.display === 'none' ? 'block' : 'none';
      });
    });
  }

  function compareQueryResults(resA, resB) {
    if (!resA.rows || !resB.rows) return false;
    if (resA.rows.length !== resB.rows.length) return false;
    if (resA.columns.length !== resB.columns.length) return false;

    // Compare first row values loosely
    for (let i = 0; i < resA.rows.length; i++) {
      const rowA = resA.rows[i];
      const rowB = resB.rows[i];
      const cols = resB.columns;
      for (const col of cols) {
        if (rowA[col] === undefined && rowA[col.toLowerCase()] === undefined) {
          // Check by positional index value
          const valA = Object.values(rowA)[cols.indexOf(col)];
          const valB = rowB[col];
          if (String(valA) !== String(valB)) return false;
        } else {
          const valA = rowA[col] !== undefined ? rowA[col] : rowA[col.toLowerCase()];
          const valB = rowB[col];
          if (String(valA) !== String(valB)) return false;
        }
      }
    }
    return true;
  }

  // --- 5. INTERVIEW QUESTIONS VIEW ---
  function renderInterview(filterCat) {
    const list = MLForge.sql.data.interview || [];
    const activeCat = filterCat || 'all';

    const filtered = activeCat === 'all'
      ? list
      : list.filter(q => q.category.toLowerCase().includes(activeCat.toLowerCase()));

    const categories = Array.from(new Set(list.map(q => q.category)));

    contentArea.innerHTML = `
      <div style="max-width: 960px; margin: 0 auto;">
        <div class="section-header" style="margin-bottom: 1.5rem;">
          <div class="sql-badge-cyan" style="margin-bottom: 0.5rem;">Interview Mastery</div>
          <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main);">SQL Technical Interview Questions</h1>
          <p style="color: var(--text-secondary); line-height: 1.6;">
            High-yield SQL questions frequently asked by FAANG, Fortune 500, and top tech companies with succinct elevator pitch answers, technical depth, and follow-ups.
          </p>
        </div>

        <!-- Category Filters -->
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
          <button class="btn btn-secondary btn-sm sql-faq-filter-btn ${activeCat === 'all' ? 'active' : ''}" data-cat="all">All (${list.length})</button>
          ${categories.map(c => `
            <button class="btn btn-secondary btn-sm sql-faq-filter-btn ${activeCat === c.toLowerCase() ? 'active' : ''}" data-cat="${c.toLowerCase()}">${c}</button>
          `).join('')}
        </div>

        <!-- Questions Accordion List -->
        <div class="sql-interview-list">
          ${filtered.map((item, idx) => `
            <div class="sql-stat-card" style="margin-bottom: 1rem; padding: 1.25rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 0.5rem;">
                <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin: 0;">${idx + 1}. ${item.question}</h3>
                <span class="sql-badge-cyan" style="font-size: 0.7rem; white-space: nowrap;">${item.category}</span>
              </div>

              <!-- Short Answer -->
              <div style="background: rgba(14, 165, 233, 0.08); border-left: 3px solid var(--color-sql-primary); padding: 0.75rem 1rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; margin: 0.75rem 0; font-size: 0.9rem; color: var(--text-main); line-height: 1.6;">
                <strong>Quick Answer:</strong> ${item.shortAnswer}
              </div>

              <!-- Toggle Deep Dive -->
              <button class="btn btn-secondary btn-sm sql-faq-toggle-btn" data-target="deep-${item.id}" style="width: fit-content; margin-top: 0.5rem;">
                <span>Show Detailed Explanation &amp; Code</span>
              </button>

              <div class="sql-faq-deep" id="deep-${item.id}" style="display: none; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
                <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${item.explanation}</p>
                ${item.codeExample ? `<pre class="sql-code-block" style="font-size: 0.8rem; margin: 0.75rem 0;">${item.codeExample}</pre>` : ''}
                ${item.followUps && item.followUps.length > 0 ? `
                  <div style="margin-top: 0.75rem; font-size: 0.8rem; color: var(--text-muted);">
                    <strong>Common Interviewer Follow-ups:</strong>
                    <ul style="margin: 0.25rem 0 0 1rem; padding: 0;">
                      ${item.followUps.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Bind event listeners
    document.querySelectorAll('.sql-faq-filter-btn').forEach(b => {
      b.addEventListener('click', () => renderInterview(b.dataset.cat));
    });

    document.querySelectorAll('.sql-faq-toggle-btn').forEach(b => {
      b.addEventListener('click', () => {
        const target = document.getElementById(b.dataset.target);
        if (target) {
          const isOpen = target.style.display !== 'none';
          target.style.display = isOpen ? 'none' : 'block';
          b.querySelector('span').textContent = isOpen ? 'Show Detailed Explanation & Code' : 'Hide Explanation';
        }
      });
    });
  }

  // --- 6. REAL-WORLD PROJECTS VIEW ---
  function renderProjects(filterTier) {
    const projects = MLForge.sql.data.projects || [];
    const activeTier = filterTier || 'all';

    const filtered = activeTier === 'all'
      ? projects
      : projects.filter(p => p.tier.toLowerCase() === activeTier.toLowerCase());

    contentArea.innerHTML = `
      <div style="max-width: 960px; margin: 0 auto;">
        <div class="section-header" style="margin-bottom: 1.5rem;">
          <div class="sql-badge-cyan" style="margin-bottom: 0.5rem;">Portfolio &amp; Production Design</div>
          <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main);">18 Real-World Database Projects</h1>
          <p style="color: var(--text-secondary); line-height: 1.6;">
            End-to-end relational schemas, ER diagrams, constraints, indexing strategies, and business reporting queries across Beginner, Intermediate, and Advanced tiers.
          </p>
        </div>

        <!-- Tier Filters -->
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
          <button class="btn btn-secondary btn-sm sql-proj-filter-btn ${activeTier === 'all' ? 'active' : ''}" data-tier="all">All (${projects.length})</button>
          <button class="btn btn-secondary btn-sm sql-proj-filter-btn ${activeTier === 'beginner' ? 'active' : ''}" data-tier="beginner">Beginner (1-5)</button>
          <button class="btn btn-secondary btn-sm sql-proj-filter-btn ${activeTier === 'intermediate' ? 'active' : ''}" data-tier="intermediate">Intermediate (6-12)</button>
          <button class="btn btn-secondary btn-sm sql-proj-filter-btn ${activeTier === 'advanced' ? 'active' : ''}" data-tier="advanced">Advanced (13-18)</button>
        </div>

        <div class="sql-projects-grid" style="display: flex; flex-direction: column; gap: 1.5rem;">
          ${filtered.map(p => `
            <div class="sql-practice-card">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <div>
                  <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem;">${p.title}</h3>
                  <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <span class="sql-badge-cyan" style="font-size: 0.7rem;">${p.category}</span>
                    <span class="badge ${p.tier === 'Beginner' ? 'sql-diff-badge-easy' : (p.tier === 'Intermediate' ? 'sql-diff-badge-med' : 'sql-diff-badge-hard')}" style="font-size: 0.7rem;">${p.tier}</span>
                  </div>
                </div>
              </div>

              <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin: 0.75rem 0;">${p.summary}</p>

              <!-- ER Diagram Block -->
              <div style="background: var(--bg-input); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.75rem 1rem; margin-bottom: 1rem;">
                <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--color-sql-primary); margin-bottom: 0.35rem;">ER Relationships:</div>
                <pre style="margin: 0; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-main); white-space: pre-wrap;">${p.erDiagram}</pre>
              </div>

              <!-- DDL Schema Accordion -->
              <button class="btn btn-secondary btn-sm sql-proj-toggle-btn" data-target="schema-${p.id}">
                <span>View DDL Schema &amp; Queries</span>
              </button>

              <div id="schema-${p.id}" style="display: none; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
                <div style="font-size: 0.8rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.25rem;">DDL Table Definitions:</div>
                <pre class="sql-code-block" style="font-size: 0.8rem;">${p.tablesSchema}</pre>

                ${p.queries && p.queries.length > 0 ? `
                  <div style="margin-top: 1rem;">
                    <div style="font-size: 0.8rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.25rem;">Key Business Query: ${p.queries[0].name}</div>
                    <pre class="sql-code-block" style="font-size: 0.8rem;">${p.queries[0].sql}</pre>
                  </div>
                ` : ''}

                <div style="margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                  <strong>Indexing &amp; Architecture Notes:</strong> ${p.indexingNotes}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.querySelectorAll('.sql-proj-filter-btn').forEach(b => {
      b.addEventListener('click', () => renderProjects(b.dataset.tier));
    });

    document.querySelectorAll('.sql-proj-toggle-btn').forEach(b => {
      b.addEventListener('click', () => {
        const target = document.getElementById(b.dataset.target);
        if (target) {
          const isOpen = target.style.display !== 'none';
          target.style.display = isOpen ? 'none' : 'block';
          b.querySelector('span').textContent = isOpen ? 'View DDL Schema & Queries' : 'Hide Details';
        }
      });
    });
  }

  // --- 7. QUIZZES VIEW ---
  function renderQuizzes() {
    const quizzes = MLForge.sql.data.quizzes || [];

    contentArea.innerHTML = `
      <div style="max-width: 960px; margin: 0 auto;">
        <div class="section-header" style="margin-bottom: 1.5rem;">
          <div class="sql-badge-cyan" style="margin-bottom: 0.5rem;">Knowledge Verification</div>
          <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main);">Interactive SQL Quizzes</h1>
          <p style="color: var(--text-secondary); line-height: 1.6;">
            Test your knowledge with multiple choice and code prediction questions. Receive instant scoring and explanations.
          </p>
        </div>

        <div class="sql-quiz-container">
          ${quizzes.map(quiz => `
            <div class="sql-practice-card" style="margin-bottom: 2rem;">
              <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem;">${quiz.title}</h2>
              <div class="sql-quiz-questions">
                ${quiz.questions.map((q, qIdx) => `
                  <div class="sql-quiz-question-card" id="q-card-${q.id}" style="padding: 1rem 0; border-bottom: 1px solid var(--border-subtle);">
                    <div style="font-weight: 600; font-size: 0.95rem; color: var(--text-main); margin-bottom: 0.75rem; white-space: pre-line;">${qIdx + 1}. ${q.question}</div>
                    
                    <div class="sql-quiz-options" style="display: flex; flex-direction: column; gap: 0.5rem;">
                      ${q.options.map((opt, optIdx) => `
                        <button class="btn btn-secondary sql-quiz-opt-btn" data-qid="${q.id}" data-opt="${optIdx}" style="text-align: left; justify-content: flex-start; font-size: 0.85rem; padding: 0.65rem 1rem;">
                          ${opt}
                        </button>
                      `).join('')}
                    </div>

                    <div class="sql-quiz-feedback" id="feedback-${q.id}" style="display: none; margin-top: 0.75rem; padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.85rem;"></div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    bindQuizEvents();
  }

  function bindQuizEvents() {
    const allQuestions = [];
    (MLForge.sql.data.quizzes || []).forEach(q => allQuestions.push(...q.questions));

    document.querySelectorAll('.sql-quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.dataset.qid;
        const chosenIdx = parseInt(btn.dataset.opt, 10);
        const qObj = allQuestions.find(q => q.id === qId);
        if (!qObj) return;

        const card = document.getElementById(`q-card-${qId}`);
        const feedback = document.getElementById(`feedback-${qId}`);
        if (!card || !feedback) return;

        // Disable all option buttons for this question
        card.querySelectorAll('.sql-quiz-opt-btn').forEach(b => {
          b.disabled = true;
          const bIdx = parseInt(b.dataset.opt, 10);
          if (bIdx === qObj.answer) {
            b.style.borderColor = '#10b981';
            b.style.background = 'rgba(16, 185, 129, 0.15)';
            b.style.color = '#10b981';
          } else if (bIdx === chosenIdx) {
            b.style.borderColor = '#f43f5e';
            b.style.background = 'rgba(244, 63, 94, 0.15)';
            b.style.color = '#f43f5e';
          }
        });

        feedback.style.display = 'block';
        if (chosenIdx === qObj.answer) {
          feedback.style.background = 'rgba(16, 185, 129, 0.1)';
          feedback.style.border = '1px solid rgba(16, 185, 129, 0.3)';
          feedback.innerHTML = `<span style="color: #10b981; font-weight: 600;">✓ Correct!</span> <p style="margin-top: 0.25rem; color: var(--text-secondary);">${qObj.explanation}</p>`;
        } else {
          feedback.style.background = 'rgba(244, 63, 94, 0.1)';
          feedback.style.border = '1px solid rgba(244, 63, 94, 0.3)';
          feedback.innerHTML = `<span style="color: #f43f5e; font-weight: 600;">❌ Incorrect.</span> <p style="margin-top: 0.25rem; color: var(--text-secondary);">${qObj.explanation}</p>`;
        }
      });
    });
  }

  // --- 8. CHEATSHEET VIEW ---
  function renderCheatsheet() {
    const list = MLForge.sql.data.cheatsheet || [];

    contentArea.innerHTML = `
      <div style="max-width: 960px; margin: 0 auto;">
        <div class="section-header" style="margin-bottom: 1.5rem;">
          <div class="sql-badge-cyan" style="margin-bottom: 0.5rem;">Quick Reference</div>
          <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main);">SQL Syntax Cheatsheet</h1>
          <p style="color: var(--text-secondary); line-height: 1.6;">
            Searchable quick reference for daily database querying, schema definition, window functions, and transaction syntax.
          </p>
        </div>

        <!-- Search Input -->
        <div style="margin-bottom: 1.5rem;">
          <input type="text" id="sql-cheatsheet-search" class="sql-pg-textarea" style="height: 44px; padding: 0.5rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-card); background: var(--bg-card); color: var(--text-main);" placeholder="🔍 Search commands (e.g. JOIN, CTE, GROUP BY, INDEX)..." />
        </div>

        <div class="sql-cheatsheet-grid" id="sql-cheatsheet-grid" style="display: flex; flex-direction: column; gap: 1rem;">
          ${renderCheatsheetItems(list)}
        </div>
      </div>
    `;

    const searchInput = document.getElementById('sql-cheatsheet-search');
    const grid = document.getElementById('sql-cheatsheet-grid');
    if (searchInput && grid) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const matches = list.filter(item => 
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.syntax.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        );
        grid.innerHTML = renderCheatsheetItems(matches);
        bindCheatsheetCopy();
      });
    }

    bindCheatsheetCopy();
  }

  function renderCheatsheetItems(items) {
    if (items.length === 0) {
      return '<div class="sql-empty-state"><p>No syntax rules matched your search.</p></div>';
    }

    return items.map(item => `
      <div class="sql-stat-card" style="padding: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.2rem;">${item.title}</h3>
            <span class="sql-badge-cyan" style="font-size: 0.7rem;">${item.category}</span>
          </div>
          <button class="btn btn-secondary btn-sm sql-cs-copy-btn" data-syntax="${encodeURIComponent(item.syntax)}">
            Copy Syntax
          </button>
        </div>

        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">${item.description}</p>
        <pre class="sql-code-block" style="font-size: 0.825rem; margin: 0.5rem 0;">${item.syntax}</pre>
        ${item.example ? `<pre class="sql-code-block" style="font-size: 0.8rem; margin: 0.35rem 0; opacity: 0.85;">${item.example}</pre>` : ''}
        
        <div style="margin-top: 0.5rem; text-align: right;">
          <a href="${item.topicLink}" style="font-size: 0.8rem; color: var(--color-sql-primary);">Read full lesson &rarr;</a>
        </div>
      </div>
    `).join('');
  }

  function bindCheatsheetCopy() {
    document.querySelectorAll('.sql-cs-copy-btn').forEach(b => {
      b.addEventListener('click', () => {
        const syntax = decodeURIComponent(b.dataset.syntax);
        navigator.clipboard.writeText(syntax).then(() => {
          MLForge.ui.showToast('Syntax copied to clipboard!', 'info');
        });
      });
    });
  }

  // --- 9. GLOSSARY VIEW ---
  function renderGlossary() {
    const glossary = MLForge.sql.data.glossary || [];

    contentArea.innerHTML = `
      <div style="max-width: 960px; margin: 0 auto;">
        <div class="section-header" style="margin-bottom: 1.5rem;">
          <div class="sql-badge-cyan" style="margin-bottom: 0.5rem;">Vocabulary &amp; Concepts</div>
          <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main);">SQL &amp; Database Glossary</h1>
          <p style="color: var(--text-secondary); line-height: 1.6;">
            A-to-Z directory of relational database terminology, definitions, and cross-references.
          </p>
        </div>

        <!-- Search Bar -->
        <div style="margin-bottom: 1.5rem;">
          <input type="text" id="sql-glossary-search" class="sql-pg-textarea" style="height: 44px; padding: 0.5rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-card); background: var(--bg-card); color: var(--text-main);" placeholder="🔍 Search database terms (e.g. ACID, Normalization, Deadlock, BCNF)..." />
        </div>

        <div class="sql-glossary-list" id="sql-glossary-list" style="display: flex; flex-direction: column; gap: 1rem;">
          ${renderGlossaryItems(glossary)}
        </div>
      </div>
    `;

    const searchInput = document.getElementById('sql-glossary-search');
    const listEl = document.getElementById('sql-glossary-list');
    if (searchInput && listEl) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        const matches = glossary.filter(g => 
          g.term.toLowerCase().includes(q) || 
          g.definition.toLowerCase().includes(q)
        );
        listEl.innerHTML = renderGlossaryItems(matches);
      });
    }
  }

  function renderGlossaryItems(items) {
    if (items.length === 0) {
      return '<div class="sql-empty-state"><p>No glossary terms matched your search.</p></div>';
    }

    return items.map(g => `
      <div class="sql-stat-card" style="padding: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-sql-primary);">${g.term}</h3>
          <span class="badge" style="background: var(--bg-input); font-weight: 700;">${g.letter}</span>
        </div>
        <p style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 0.75rem;">${g.definition}</p>
        <div style="background: var(--bg-input); border-radius: var(--radius-sm); padding: 0.5rem 0.75rem; font-size: 0.825rem; color: var(--text-muted); font-family: var(--font-mono); margin-bottom: 0.5rem;">
          ${g.example}
        </div>
        ${g.topicLink ? `<div style="text-align: right;"><a href="${g.topicLink}" style="font-size: 0.8rem; color: var(--color-sql-primary);">Read topic lesson &rarr;</a></div>` : ''}
      </div>
    `).join('');
  }

  // --- 10. USER PROGRESS VIEW ---
  function renderProgress() {
    const topics = MLForge.sql.data.topics || [];
    const problems = MLForge.sql.data.problems || [];
    const stats = MLForge.sql.storage.getStats(topics.length, problems.length);
    const bookmarks = MLForge.sql.storage.getBookmarks();
    const completedIds = MLForge.sql.storage.getCompletedTopics();

    contentArea.innerHTML = `
      <div style="max-width: 960px; margin: 0 auto;">
        <div class="section-header" style="margin-bottom: 1.5rem;">
          <div class="sql-badge-cyan" style="margin-bottom: 0.5rem;">Personal Records</div>
          <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main);">My SQL Progress</h1>
          <p style="color: var(--text-secondary); line-height: 1.6;">
            Track completed curriculum modules, solved practice challenges, and bookmarked study guides.
          </p>
        </div>

        <section class="sql-stats-grid">
          <div class="sql-stat-card">
            <div class="sql-stat-val" style="color: var(--color-sql-primary);">${stats.completedTopicsCount} / ${stats.totalTopics}</div>
            <div class="sql-stat-label">Topics Completed</div>
            <div class="sql-progress-bar-wrap">
              <div class="sql-progress-bar-fill" style="width: ${stats.progressPercent}%;"></div>
            </div>
          </div>

          <div class="sql-stat-card">
            <div class="sql-stat-val" style="color: #10b981;">${stats.solvedProblemsCount} / ${stats.totalProblems}</div>
            <div class="sql-stat-label">Practice Solved</div>
          </div>

          <div class="sql-stat-card">
            <div class="sql-stat-val" style="color: #f59e0b;">${stats.bookmarksCount}</div>
            <div class="sql-stat-label">Bookmarked Topics</div>
          </div>
        </section>

        <!-- Bookmarked Topics Section -->
        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem;">Saved Bookmarks (${bookmarks.length})</h2>
          ${bookmarks.length === 0 ? `
            <div class="sql-empty-state" style="padding: 2rem 1rem;">
              <p>No saved bookmarks. Click the Bookmark button while studying any topic.</p>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              ${bookmarks.map(b => `
                <div class="sql-stat-card" style="padding: 0.75rem 1rem; display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
                  <a href="${b.link}" style="font-weight: 600; color: var(--text-main); text-decoration: none;">${b.title}</a>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">${b.date}</span>
                </div>
              `).join('')}
            </div>
          `}
        </section>

        <!-- Danger Zone: Reset Progress -->
        <section style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem;">Reset SQL Progress</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted);">Permanently clear completed topics, solved problems, and bookmarked links stored in local storage.</p>
            </div>
            <button class="btn btn-secondary" id="sql-reset-progress-btn" style="border-color: rgba(244, 63, 94, 0.4); color: var(--color-accent-rose);">
              Reset All Progress
            </button>
          </div>
        </section>
      </div>
    `;

    const resetBtn = document.getElementById('sql-reset-progress-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to completely reset all your SQL progress and bookmarks? This cannot be undone.')) {
          MLForge.sql.storage.resetAllProgress();
          MLForge.ui.showToast('SQL learning progress has been reset.', 'info');
          renderProgress();
          if (MLForge.sql.app && MLForge.sql.app.updateSidebarCounts) {
            MLForge.sql.app.updateSidebarCounts();
          }
        }
      });
    }
  }

  return {
    init,
    handleRoute
  };
})();

