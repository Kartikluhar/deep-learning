/**
 * MLForge SQL Application Bootstrapper & Omnisearch Integrator
 * Populates sidebar syllabus accordion, binds global search indexing,
 * and configures shortcuts for SQL learning.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sql = window.MLForge.sql || {};

MLForge.sql.app = (function () {

  function init() {
    initSidebarSyllabus();
    initOmnisearchIntegration();
    updateSidebarCounts();
  }

  function initSidebarSyllabus() {
    const subnavContainer = document.getElementById('sql-topics-subnav');
    const accordionBtn = document.getElementById('sql-topics-accordion-btn');

    if (accordionBtn) {
      accordionBtn.addEventListener('click', () => {
        accordionBtn.classList.toggle('expanded');
        if (subnavContainer) {
          subnavContainer.classList.toggle('expanded');
          subnavContainer.classList.toggle('open');
        }
      });
    }

    if (subnavContainer && MLForge.sql.data && MLForge.sql.data.topics) {
      const topics = MLForge.sql.data.topics;
      subnavContainer.innerHTML = topics.map(t => {
        const isDone = MLForge.sql.storage ? MLForge.sql.storage.isTopicCompleted(t.id) : false;
        return `
          <a href="#sql/topic/${t.id}" class="sidebar-sub-item sidebar-sql-sub-item" data-topic-id="${t.id}" id="sql-subnav-${t.id}">
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${t.title}</span>
            <span style="font-size: 0.65rem; color: ${isDone ? '#10b981' : 'var(--text-muted)'};">${isDone ? '✓' : t.readTime}</span>
          </a>
        `;
      }).join('');
    }
  }

  function updateSidebarCounts() {
    const probBadge = document.getElementById('sql-nav-prob-count');
    if (probBadge && MLForge.sql.data && MLForge.sql.data.problems) {
      const count = MLForge.sql.data.problems.length;
      probBadge.textContent = `${count}+`;
    }
  }

  function initOmnisearchIntegration() {
    if (!MLForge.search || !MLForge.sql.data) return;

    // Extend search aliases with SQL keywords
    const sqlAliases = {
      'sql': ['structured query language', 'database', 'rdbms', 'queries', 'postgres', 'mysql'],
      'rdbms': ['relational database', 'postgres', 'mysql', 'sqlite', 'database management'],
      'join': ['inner join', 'left join', 'right join', 'full join', 'cross join', 'self join'],
      'joins': ['inner join', 'left join', 'outer join', 'self join'],
      'cte': ['common table expression', 'with clause', 'recursive cte'],
      'window': ['window function', 'row_number', 'rank', 'dense_rank', 'over', 'partition by'],
      'acid': ['atomicity', 'consistency', 'isolation', 'durability', 'transactions'],
      'index': ['b-tree', 'clustered index', 'query optimization', 'index scan'],
      'subquery': ['correlated subquery', 'nested query', 'exists', 'scalar subquery'],
      'normalization': ['1nf', '2nf', '3nf', 'bcnf', 'database anomalies']
    };

    if (MLForge.search.ALIASES) {
      Object.assign(MLForge.search.ALIASES, sqlAliases);
    }

    const originalBuildIndex = MLForge.search.buildIndex;
    MLForge.search.buildIndex = function () {
      if (typeof originalBuildIndex === 'function') {
        originalBuildIndex.apply(this, arguments);
      }

      // 1. Index Core SQL Topics
      if (MLForge.sql.data.topics) {
        MLForge.sql.data.topics.forEach(t => {
          this.addItem({
            id: `sql-topic-${t.id}`,
            title: `SQL: ${t.title}`,
            desc: t.summary,
            category: 'SQL Topics',
            link: `#sql/topic/${t.id}`
          });
        });
      }

      // 2. Index Practice Problems
      if (MLForge.sql.data.problems) {
        MLForge.sql.data.problems.forEach(p => {
          this.addItem({
            id: `sql-prob-${p.id}`,
            title: `SQL Problem: ${p.title} (${p.difficulty})`,
            desc: p.statement.slice(0, 90),
            category: 'SQL Problems',
            link: `#sql/practice`
          });
        });
      }

      // 3. Index Interview Questions
      if (MLForge.sql.data.interview) {
        MLForge.sql.data.interview.forEach(q => {
          this.addItem({
            id: `sql-faq-${q.id}`,
            title: `Interview: ${q.question}`,
            desc: q.shortAnswer,
            category: 'SQL Interview Prep',
            link: `#sql/interview`
          });
        });
      }

      // 4. Index Cheatsheet Items
      if (MLForge.sql.data.cheatsheet) {
        MLForge.sql.data.cheatsheet.forEach(c => {
          this.addItem({
            id: `sql-cs-${c.id}`,
            title: `SQL Syntax: ${c.title}`,
            desc: `${c.syntax} — ${c.description}`,
            category: 'SQL Cheatsheet',
            link: `#sql/cheatsheet`
          });
        });
      }

      // 5. Index Glossary
      if (MLForge.sql.data.glossary) {
        MLForge.sql.data.glossary.forEach(g => {
          this.addItem({
            id: `sql-gloss-${g.term}`,
            title: `SQL Term: ${g.term}`,
            desc: g.definition,
            category: 'SQL Glossary',
            link: g.topicLink || `#sql/glossary`
          });
        });
      }

      // 6. Index SQL Tools
      this.addItem({ id: 'sql-tool-dashboard', title: 'SQL Mastery Dashboard', desc: 'Curriculum roadmap, progress tracking, and database foundations', category: 'SQL Tools', link: '#sql/dashboard' });
      this.addItem({ id: 'sql-tool-playground', title: 'Interactive SQL Playground', desc: 'Live in-memory relational SQL execution engine with sample schema inspector', category: 'SQL Tools', link: '#sql/playground' });
      this.addItem({ id: 'sql-tool-projects', title: 'Real-World Database Projects', desc: '18 end-to-end database schemas, ER diagrams, and business queries', category: 'SQL Tools', link: '#sql/projects' });
      this.addItem({ id: 'sql-tool-quizzes', title: 'Interactive SQL Quizzes', desc: 'Instant feedback quizzes covering joins, window functions, and indexing', category: 'SQL Tools', link: '#sql/quizzes' });
      this.addItem({ id: 'sql-tool-progress', title: 'My SQL Progress', desc: 'Personal record of completed topics, solved problems, and bookmarks', category: 'SQL Tools', link: '#sql/progress' });
    };
  }

  return {
    init,
    updateSidebarCounts
  };
})();

