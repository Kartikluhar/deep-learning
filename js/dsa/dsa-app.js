/**
 * MLForge DSA Application Bootstrapper & Omnisearch Integrator
 * Binds sidebar accordion, populates syllabus topic links, and indexes all DSA content into Omnisearch.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsa = window.MLForge.dsa || {};

MLForge.dsa.app = (function () {
  function init() {
    initSidebarSyllabus();
    initOmnisearchIntegration();
    updateProblemCountBadge();
  }

  function initSidebarSyllabus() {
    const subnavContainer = document.getElementById('dsa-topics-subnav');
    const accordionBtn = document.getElementById('dsa-topics-accordion-btn');

    if (accordionBtn) {
      accordionBtn.addEventListener('click', () => {
        accordionBtn.classList.toggle('expanded');
        if (subnavContainer) {
          subnavContainer.classList.toggle('expanded');
        }
      });
    }

    if (subnavContainer && MLForge.dsa.data && MLForge.dsa.data.topics) {
      const topics = MLForge.dsa.data.topics;
      subnavContainer.innerHTML = topics.map(t => `
        <a href="#dsa/topic/${t.id}" class="sidebar-sub-item" id="subnav-${t.id}">
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${t.title}</span>
          <span style="font-size: 0.65rem; color: var(--text-muted);">${t.stage}</span>
        </a>
      `).join('');
    }
  }

  function updateProblemCountBadge() {
    const countBadge = document.getElementById('dsa-nav-prob-count');
    if (countBadge && MLForge.dsa.data && MLForge.dsa.data.problems) {
      countBadge.textContent = `${MLForge.dsa.data.problems.length}+`;
    }
  }

  function initOmnisearchIntegration() {
    if (!MLForge.search || !MLForge.dsa.data) return;

    // Inject DSA items into global Omnisearch
    const originalBuildIndex = MLForge.search.buildIndex;
    MLForge.search.buildIndex = function () {
      if (typeof originalBuildIndex === 'function') {
        originalBuildIndex.apply(this, arguments);
      }

      // 1. Add DSA Topics
      if (MLForge.dsa.data.topics) {
        MLForge.dsa.data.topics.forEach(t => {
          this.addItem({
            id: `dsa-topic-${t.id}`,
            title: `DSA: ${t.title}`,
            desc: t.summary || t.definition.slice(0, 100),
            category: 'DSA Topics',
            link: `#dsa/topic/${t.id}`
          });
        });
      }

      // 2. Add DSA Problems
      if (MLForge.dsa.data.problems) {
        MLForge.dsa.data.problems.forEach(p => {
          this.addItem({
            id: `dsa-prob-${p.id}`,
            title: `Problem: ${p.title} (${p.difficulty})`,
            desc: `${p.pattern} - ${p.statement.slice(0, 90)}...`,
            category: 'DSA Problems',
            link: `#dsa/problem/${p.id}`
          });
        });
      }

      // 3. Add DSA Tools
      const dsaTools = [
        { id: 'dsa-tool-dashboard', title: 'DSA Dashboard', desc: 'Master Data Structures & Algorithms learning hub and roadmap', category: 'DSA Tools', link: '#dsa/dashboard' },
        { id: 'dsa-tool-cheatsheet', title: 'Complexity Cheat Sheet', desc: 'Time and space complexity reference for all data structures and algorithms', category: 'DSA Tools', link: '#dsa/complexity-cheat-sheet' },
        { id: 'dsa-tool-patterns', title: 'DSA Interview Patterns Guide', desc: 'Diagnose problems using 15+ patterns: Two Pointers, Sliding Window, DP, etc.', category: 'DSA Tools', link: '#dsa/interview-practice' },
        { id: 'dsa-tool-visualizers', title: 'Interactive Algorithm Visualizers', desc: 'Sorting, Binary Search, BST, BFS/DFS graph, and DP table visual animations', category: 'DSA Tools', link: '#dsa/visualizers' },
        { id: 'dsa-tool-progress', title: 'My DSA Progress', desc: 'Track solved problems, completed syllabus topics, and bookmarks', category: 'DSA Tools', link: '#dsa/progress' }
      ];

      dsaTools.forEach(tool => this.addItem(tool));
    };

    // Helper on MLForge.search if addItem doesn't exist
    if (!MLForge.search.addItem) {
      MLForge.search.addItem = function (item) {
        // Will be picked up when search index builds or re-indexes
      };
    }
  }

  return {
    init,
    updateProblemCountBadge
  };
})();

