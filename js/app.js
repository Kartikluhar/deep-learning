/**
 * MLForge Main Application Bootstrapper
 * Coordinates initialization across storage, UI, search, calculators, and routing.
 */

window.MLForge = window.MLForge || {};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize UI (theme, toasts, bookmarks badge)
  if (MLForge.ui) {
    MLForge.ui.init();
  }

  // 2. Initialize Omnisearch index and modal
  if (MLForge.search) {
    MLForge.search.init();
  }

  // 3. Initialize Hash Router & Page Renderer
  if (MLForge.router) {
    MLForge.router.init();
  }

  // 4. Bind Global Top-Bar & Sidebar Event Listeners
  const sidebarCollapseBtn = document.getElementById('sidebar-collapse-btn');
  if (sidebarCollapseBtn) {
    sidebarCollapseBtn.addEventListener('click', () => {
      MLForge.ui.toggleSidebar();
    });
  }

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      MLForge.ui.toggleMobileMenu();
    });
  }

  const sidebarOverlay = document.getElementById('sidebar-overlay');
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      MLForge.ui.closeMobileMenu();
    });
  }

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      MLForge.ui.toggleTheme();
    });
  }

  const bookmarkNavBtn = document.getElementById('bookmark-nav-btn');
  if (bookmarkNavBtn) {
    bookmarkNavBtn.addEventListener('click', () => {
      window.location.hash = '#bookmarks';
    });
  }

  // Quick keyboard shortcuts (e.g. G D -> dashboard, G C -> calculators)
  let lastKey = '';
  let lastKeyTime = 0;
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
    const now = Date.now();
    const key = e.key.toLowerCase();

    if (lastKey === 'g' && (now - lastKeyTime < 800)) {
      if (key === 'd') {
        window.location.hash = '#dashboard';
      } else if (key === 'c') {
        window.location.hash = '#calculators';
      } else if (key === 'p') {
        window.location.hash = '#playground/neuron';
      } else if (key === 't') {
        window.location.hash = '#topics';
      } else if (key === 'f') {
        window.location.hash = '#formulas';
      }
      lastKey = '';
    } else {
      lastKey = key;
      lastKeyTime = now;
    }
  });

  console.log("⚡ MLForge initialized successfully. Ready for machine learning computation.");
});
