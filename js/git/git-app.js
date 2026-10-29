/**
 * MLForge Git & GitHub Application Bootstrapper & Omnisearch Integrator
 * Binds sidebar accordion, populates syllabus topic links, and indexes all Git content into Omnisearch.
 */

window.MLForge = window.MLForge || {};
window.MLForge.git = window.MLForge.git || {};

MLForge.git.app = (function () {
  function init() {
    initSidebarSyllabus();
    initOmnisearchIntegration();
    bindKeyboardShortcuts();
  }

  function initSidebarSyllabus() {
    const subnavContainer = document.getElementById('git-topics-subnav');
    const accordionBtn = document.getElementById('git-topics-accordion-btn');

    if (accordionBtn) {
      accordionBtn.addEventListener('click', () => {
        accordionBtn.classList.toggle('expanded');
        if (subnavContainer) {
          subnavContainer.classList.toggle('expanded');
        }
      });
    }

    if (subnavContainer && MLForge.git.data && MLForge.git.data.topics) {
      const topics = MLForge.git.data.topics;
      subnavContainer.innerHTML = topics.map(t => `
        <a href="#git/topic/${t.id}" class="sidebar-sub-item" id="git-subnav-${t.id}">
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${t.title}</span>
          <span style="font-size: 0.65rem; color: var(--text-muted);">${t.stage}</span>
        </a>
      `).join('');
    }
  }

  function initOmnisearchIntegration() {
    if (!MLForge.search || !MLForge.git.data) return;

    const originalBuildIndex = MLForge.search.buildIndex;
    MLForge.search.buildIndex = function () {
      if (typeof originalBuildIndex === 'function') {
        originalBuildIndex.apply(this, arguments);
      }

      // 1. Index Git Topics
      if (MLForge.git.data.topics) {
        MLForge.git.data.topics.forEach(t => {
          this.addItem({
            id: `git-topic-${t.id}`,
            title: `Git: ${t.title}`,
            desc: t.summary || t.title,
            category: 'Git & GitHub',
            link: `#git/topic/${t.id}`
          });
        });
      }

      // 2. Index Git Commands
      if (MLForge.git.data.commands) {
        MLForge.git.data.commands.forEach(c => {
          this.addItem({
            id: `git-cmd-${c.id}`,
            title: `Git Command: ${c.name}`,
            desc: `${c.syntax} — ${c.simpleMeaning}`,
            category: 'Git Commands',
            link: `#git/commands`
          });
        });
      }

      // 3. Index Git Tools
      const gitTools = [
        { id: 'git-tool-dashboard', title: 'Git & GitHub Dashboard', desc: 'Master Git & GitHub workflow guides, branch diagrams, and learning path', category: 'Git Tools', link: '#git/dashboard' },
        { id: 'git-tool-visualizers', title: 'Git Visualizers & Simulators', desc: '4-Box Lifecycle, Branch DAG graph, and Merge Conflict Simulator', category: 'Git Tools', link: '#git/visualizers' },
        { id: 'git-tool-lab', title: 'Git Practice Lab', desc: 'Interactive developer scenario challenges and quiz', category: 'Git Tools', link: '#git/practice-lab' },
        { id: 'git-tool-cheatsheet', title: 'Git Cheat Sheet', desc: 'Fast searchable command reference table', category: 'Git Tools', link: '#git/cheat-sheet' },
        { id: 'git-tool-progress', title: 'My Git Progress', desc: 'Track completed lessons and bookmarked commands', category: 'Git Tools', link: '#git/progress' }
      ];

      gitTools.forEach(tool => this.addItem(tool));
    };

    if (MLForge.search.rebuildIndex) {
      MLForge.search.rebuildIndex();
    }
  }

  function bindKeyboardShortcuts() {
    let lastKey = '';
    let lastKeyTime = 0;
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
      const now = Date.now();
      const key = e.key.toLowerCase();

      if (lastKey === 'g' && (now - lastKeyTime < 800)) {
        if (key === 'g') {
          window.location.hash = '#git/dashboard';
        } else if (key === 'k') {
          window.location.hash = '#git/commands';
        }
        lastKey = '';
      } else {
        lastKey = key;
        lastKeyTime = now;
      }
    });
  }

  return {
    init
  };
})();

