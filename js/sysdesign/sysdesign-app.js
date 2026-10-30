/**
 * MLForge System Design Application Bootstrapper & Omnisearch Integrator
 * Populates sidebar syllabus accordion, binds global search indexing,
 * and configures keyboard shortcuts for fast developer navigation.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sysdesign = window.MLForge.sysdesign || {};

MLForge.sysdesign.app = (function () {

  function init() {
    initSidebarSyllabus();
    initOmnisearchIntegration();
    bindKeyboardShortcuts();
  }

  function initSidebarSyllabus() {
    const subnavContainer = document.getElementById('sysdesign-topics-subnav');
    const accordionBtn = document.getElementById('sysdesign-topics-accordion-btn');

    if (accordionBtn) {
      accordionBtn.addEventListener('click', () => {
        accordionBtn.classList.toggle('expanded');
        if (subnavContainer) {
          subnavContainer.classList.toggle('expanded');
        }
      });
    }

    if (subnavContainer && MLForge.sysdesign.data && MLForge.sysdesign.data.topics) {
      const topics = MLForge.sysdesign.data.topics;
      subnavContainer.innerHTML = topics.map(t => `
        <a href="#sysdesign/topic/${t.id}" class="sidebar-sub-item" id="sysdesign-subnav-${t.id}">
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${t.title}</span>
          <span style="font-size: 0.65rem; color: var(--text-muted);">${t.difficulty}</span>
        </a>
      `).join('');
    }
  }

  function initOmnisearchIntegration() {
    if (!MLForge.search || !MLForge.sysdesign.data) return;

    const originalBuildIndex = MLForge.search.buildIndex;
    MLForge.search.buildIndex = function () {
      if (typeof originalBuildIndex === 'function') {
        originalBuildIndex.apply(this, arguments);
      }

      // 1. Index Core Topics
      if (MLForge.sysdesign.data.topics) {
        MLForge.sysdesign.data.topics.forEach(t => {
          this.addItem({
            id: `sd-topic-${t.id}`,
            title: `System Design: ${t.title}`,
            desc: t.summary || t.definition.slice(0, 100),
            category: 'System Design Topics',
            link: `#sysdesign/topic/${t.id}`
          });
        });
      }

      // 2. Index Real-World Case Studies
      if (MLForge.sysdesign.data.caseStudies) {
        MLForge.sysdesign.data.caseStudies.forEach(cs => {
          this.addItem({
            id: `sd-case-${cs.id}`,
            title: `Architecture: ${cs.title} (${cs.tier})`,
            desc: cs.summary,
            category: 'System Design Case Studies',
            link: `#sysdesign/case-study/${cs.id}`
          });
        });
      }

      // 3. Index Architectural Patterns
      if (MLForge.sysdesign.data.patterns) {
        MLForge.sysdesign.data.patterns.forEach(p => {
          this.addItem({
            id: `sd-pat-${p.id}`,
            title: `Pattern: ${p.name}`,
            desc: p.problem.slice(0, 90),
            category: 'System Design Patterns',
            link: `#sysdesign/patterns`
          });
        });
      }

      // 4. Index Glossary
      if (MLForge.sysdesign.data.glossary) {
        MLForge.sysdesign.data.glossary.forEach(g => {
          this.addItem({
            id: `sd-gloss-${g.term}`,
            title: `Definition: ${g.term}`,
            desc: g.definition.slice(0, 100),
            category: 'System Design Glossary',
            link: g.topicLink || `#sysdesign/glossary`
          });
        });
      }

      // 5. Index Interactive Tools
      this.addItem({ id: 'sd-tool-dashboard', title: 'System Design Dashboard', desc: 'System Design learning dashboard and stats', category: 'System Design Tools', link: '#sysdesign/dashboard' });
      this.addItem({ id: 'sd-tool-playground', title: 'Architecture Diagram Playground', desc: 'Visually construct, connect, and export system designs', category: 'System Design Tools', link: '#sysdesign/playground' });
      this.addItem({ id: 'sd-tool-calculators', title: 'Capacity Estimation Calculator', desc: 'Estimate RPS, Peak Multiplier, Storage, and Bandwidth', category: 'System Design Tools', link: '#sysdesign/calculators' });
      this.addItem({ id: 'sd-tool-simulators', title: 'System Simulators (Load Balancer & Message Queue)', desc: 'Interactive L4/L7 load balancing and dead-letter queue simulators', category: 'System Design Tools', link: '#sysdesign/simulators' });
      this.addItem({ id: 'sd-tool-interview', title: 'System Design Interview Questions', desc: 'Practice question bank with step-by-step solutions', category: 'System Design Tools', link: '#sysdesign/interview' });
      this.addItem({ id: 'sd-tool-lld', title: 'Low-Level Design (LLD) & SOLID', desc: 'OOP design patterns and runnable case studies', category: 'System Design Tools', link: '#sysdesign/lld' });
      this.addItem({ id: 'sd-tool-roadmap', title: 'System Design Learning Roadmap', desc: '15-step structured curriculum from fundamentals to scale', category: 'System Design Tools', link: '#sysdesign/roadmap' });
    };

    // Trigger rebuild to index new content
    MLForge.search.buildIndex();
  }

  function bindKeyboardShortcuts() {
    let lastKey = '';
    let lastKeyTime = 0;

    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
      const now = Date.now();
      const key = e.key.toLowerCase();

      // Two-key chord (e.g. G S -> System Design Dashboard)
      if (lastKey === 'g' && (now - lastKeyTime < 800)) {
        if (key === 's') {
          e.preventDefault();
          window.location.hash = '#sysdesign/dashboard';
        } else if (key === 'p') {
          e.preventDefault();
          window.location.hash = '#sysdesign/playground';
        }
      }

      lastKey = key;
      lastKeyTime = now;
    });
  }

  return {
    init
  };
})();

