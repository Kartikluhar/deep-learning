/**
 * MLForge UI Helper & State Controller
 */

window.MLForge = window.MLForge || {};

MLForge.ui = (function () {
  let toastContainer = null;

  function init() {
    toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    // Apply saved theme
    const savedTheme = MLForge.storage.getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Update bookmark count
    updateBookmarkBadge();
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    MLForge.storage.setTheme(next);
    updateThemeIcon(next);
    showToast(`Switched to ${next} theme`, 'info', 2000);
  }

  function updateThemeIcon(theme) {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    if (theme === 'dark') {
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`;
      btn.setAttribute('title', 'Switch to light theme');
      btn.setAttribute('aria-label', 'Switch to light theme');
    } else {
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      btn.setAttribute('title', 'Switch to dark theme');
      btn.setAttribute('aria-label', 'Switch to dark theme');
    }
  }

  function showToast(message, type = 'info', duration = 3000) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    } else {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `${iconSvg} <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 200ms ease';
      setTimeout(() => toast.remove(), 200);
    }, duration);
  }

  function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
    if (!navigator.clipboard) {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showToast(successMessage, 'success');
      } catch (e) {
        showToast('Failed to copy', 'error');
      }
      document.body.removeChild(ta);
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage, 'success');
    }).catch(err => {
      console.error('Copy failed:', err);
      showToast('Could not copy to clipboard', 'error');
    });
  }

  function updateBookmarkBadge() {
    const countBadge = document.getElementById('bookmark-count-badge');
    if (!countBadge) return;
    const bookmarks = MLForge.storage.getBookmarks();
    countBadge.textContent = bookmarks.length;
    countBadge.style.display = bookmarks.length > 0 ? 'flex' : 'none';
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    sidebar.classList.toggle('collapsed');
  }

  function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!sidebar || !overlay) return;
    const isOpen = sidebar.classList.toggle('mobile-open');
    if (isOpen) {
      overlay.classList.add('active');
    } else {
      overlay.classList.remove('active');
    }
  }

  function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
  }

  function updateContextPanel(content) {
    const panel = document.getElementById('context-panel');
    if (!panel) return;
    if (!content) {
      const isDSA = (window.location.hash || '').startsWith('#dsa');
      const isGit = (window.location.hash || '').startsWith('#git');
      const isSysDesign = (window.location.hash || '').startsWith('#sysdesign');

      if (isSysDesign) {
        panel.innerHTML = `
          <div class="context-panel-header">
            <div class="context-panel-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              System Design Companion
            </div>
          </div>
          <div class="card" style="padding: 1rem;">
            <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: var(--color-sysdesign-amber); margin-bottom: 0.5rem;">System Design Shortcuts</div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.8rem;">
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary);">Omnisearch</span> <kbd style="background: var(--bg-badge); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.7rem;">Ctrl+K</kbd></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary);">SD Dashboard</span> <kbd style="background: var(--bg-badge); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.7rem;">G S</kbd></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary);">Diagram Playground</span> <kbd style="background: var(--bg-badge); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.7rem;">G P</kbd></div>
            </div>
          </div>
          <div class="card" style="padding: 1rem;">
            <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: #10b981; margin-bottom: 0.5rem;">Golden Architectural Rules</div>
            <ul style="font-size: 0.8rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.5rem; line-height: 1.4;">
              <li>• <strong>Estimate First:</strong> Always calculate Back-of-the-Envelope RPS and Storage before choosing components.</li>
              <li>• <strong>Design for Failure:</strong> Assume every network link, cache node, and disk will fail at 3 AM.</li>
              <li>• <strong>Measure Tail Latency:</strong> Monitor p99 and p99.9, never mean or average latency.</li>
              <li>• <strong>Cache Invalidation:</strong> In Cache-Aside, always update DB then DELETE the cache key.</li>
            </ul>
          </div>
          <div class="card" style="padding: 1rem;">
            <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: #0ea5e9; margin-bottom: 0.5rem;">Recent System Design Activity</div>
            <div id="panel-sysdesign-recent-list" style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.825rem;">
              <!-- Populated below -->
            </div>
          </div>
        `;

        const recentListEl = document.getElementById('panel-sysdesign-recent-list');
        if (recentListEl && window.MLForge.sysdesign && window.MLForge.sysdesign.storage) {
          const recentItems = MLForge.sysdesign.storage.getRecentTopics();
          if (!recentItems.length) {
            recentListEl.innerHTML = `<span style="color: var(--text-muted); font-size: 0.75rem;">No recent System Design lessons viewed yet.</span>`;
          } else {
            recentListEl.innerHTML = recentItems.slice(0, 4).map(r => `
              <a href="${r.link}" style="display: flex; align-items: center; justify-content: space-between; padding: 0.35rem 0.5rem; border-radius: 4px; background: var(--bg-badge); color: var(--text-main); text-decoration: none;">
                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 170px;">${r.title}</span>
                <span class="badge badge-sysdesign-amber" style="font-size: 0.6rem;">${r.type}</span>
              </a>
            `).join('');
          }
        }
        return;
      }

      if (isGit) {
        panel.innerHTML = `
          <div class="context-panel-header">
            <div class="context-panel-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><line x1="1.05" y1="12" x2="7" y2="12"/><line x1="17.01" y1="12" x2="22.96" y2="12"/></svg>
              Git Companion
            </div>
          </div>
          <div class="card" style="padding: 1rem;">
            <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent-violet); margin-bottom: 0.5rem;">Git Shortcuts</div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.8rem;">
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary);">Omnisearch</span> <kbd style="background: var(--bg-badge); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.7rem;">Ctrl+K</kbd></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary);">Git Dashboard</span> <kbd style="background: var(--bg-badge); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.7rem;">G G</kbd></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary);">Git Commands</span> <kbd style="background: var(--bg-badge); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.7rem;">G K</kbd></div>
            </div>
          </div>
          <div class="card" style="padding: 1rem;">
            <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent-emerald); margin-bottom: 0.5rem;">Golden Rules of Git</div>
            <ul style="font-size: 0.8rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.5rem; line-height: 1.4;">
              <li>• <strong>Pull before Push:</strong> Always update local main with <code>git pull --ff-only</code> before creating branches.</li>
              <li>• <strong>Never Push Secrets:</strong> Ensure <code>.env</code> and API keys are strictly in <code>.gitignore</code> before running <code>git add .</code>.</li>
              <li>• <strong>Never Rebase Shared History:</strong> Rebase only private local branches before opening a PR.</li>
            </ul>
          </div>
          <div class="card" style="padding: 1rem;">
            <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent-cyan); margin-bottom: 0.5rem;">Recent Git Activity</div>
            <div id="panel-git-recent-list" style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.825rem;">
              <!-- Populated below -->
            </div>
          </div>
        `;

        const recentListEl = document.getElementById('panel-git-recent-list');
        if (recentListEl && window.MLForge.git && window.MLForge.git.storage) {
          const recentItems = MLForge.git.storage.getRecent();
          if (!recentItems.length) {
            recentListEl.innerHTML = `<span style="color: var(--text-muted); font-size: 0.75rem;">No recent Git lessons viewed yet.</span>`;
          } else {
            recentListEl.innerHTML = recentItems.slice(0, 4).map(r => `
              <a href="${r.link}" style="display: flex; align-items: center; justify-content: space-between; padding: 0.35rem 0.5rem; border-radius: 4px; background: var(--bg-badge); color: var(--text-main); text-decoration: none;">
                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 170px;">${r.title}</span>
                <span class="badge git-badge-purple" style="font-size: 0.6rem;">${r.type}</span>
              </a>
            `).join('');
          }
        }
        return;
      }

      if (isDSA) {
        panel.innerHTML = `
          <div class="context-panel-header">
            <div class="context-panel-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              DSA Companion
            </div>
          </div>
          <div class="card" style="padding: 1rem;">
            <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent-emerald); margin-bottom: 0.5rem;">DSA Shortcuts</div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.8rem;">
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary);">Omnisearch</span> <kbd style="background: var(--bg-badge); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.7rem;">Ctrl+K</kbd></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary);">DSA Dashboard</span> <kbd style="background: var(--bg-badge); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.7rem;">G A</kbd></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary);">Problem Bank</span> <kbd style="background: var(--bg-badge); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.7rem;">G B</kbd></div>
            </div>
          </div>
          <div class="card" style="padding: 1rem;">
            <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent-cyan); margin-bottom: 0.5rem;">Interview Rules of Thumb</div>
            <ul style="font-size: 0.8rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.5rem; line-height: 1.4;">
              <li>• <strong>Constraints $N \le 10^5$:</strong> Target an $O(N)$ or $O(N \log N)$ algorithm. An $O(N^2)$ solution will time out.</li>
              <li>• <strong>Sorted Input:</strong> Think Binary Search or Two Pointers before allocating extra hash map memory.</li>
              <li>• <strong>Subarrays:</strong> Think Sliding Window (if values positive) or Prefix Sum + Hash Map (if negatives present).</li>
            </ul>
          </div>
          <div class="card" style="padding: 1rem;">
            <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent-violet); margin-bottom: 0.5rem;">Recent DSA Activity</div>
            <div id="panel-dsa-recent-list" style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.825rem;">
              <!-- Populated below -->
            </div>
          </div>
        `;

        const recentListEl = document.getElementById('panel-dsa-recent-list');
        if (recentListEl && window.MLForge.dsa && window.MLForge.dsa.storage) {
          const recentProbs = MLForge.dsa.storage.getRecentProblems();
          if (!recentProbs.length) {
            recentListEl.innerHTML = `<span style="color: var(--text-muted); font-size: 0.75rem;">No recent problems viewed yet.</span>`;
          } else {
            recentListEl.innerHTML = recentProbs.slice(0, 4).map(p => `
              <a href="#dsa/problem/${p.id}" style="display: flex; align-items: center; justify-content: space-between; padding: 0.35rem 0.5rem; border-radius: 4px; background: var(--bg-badge); color: var(--text-main); text-decoration: none;">
                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 170px;">${p.title}</span>
                <span class="badge ${p.difficulty === 'Easy' ? 'badge-easy' : p.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}" style="font-size: 0.6rem;">${p.difficulty}</span>
              </a>
            `).join('');
          }
        }
        return;
      }

      // Default shortcuts & tips
      panel.innerHTML = `
        <div class="context-panel-header">
          <div class="context-panel-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            Quick Workspace
          </div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent-cyan); margin-bottom: 0.5rem;">Global Shortcuts</div>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.8rem;">
            <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary);">Open Search</span> <kbd style="background: var(--bg-badge); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.7rem;">Ctrl+K</kbd></div>
            <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary);">Toggle Theme</span> <kbd style="background: var(--bg-badge); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.7rem;">T</kbd></div>
            <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary);">Go to Dashboard</span> <kbd style="background: var(--bg-badge); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.7rem;">G D</kbd></div>
            <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary);">Calculators</span> <kbd style="background: var(--bg-badge); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.7rem;">G C</kbd></div>
          </div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent-violet); margin-bottom: 0.5rem;">Quick Rules of Thumb</div>
          <ul style="font-size: 0.8rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.5rem; line-height: 1.4;">
            <li>• <strong>Feature Scaling:</strong> Always calculate min/max or mean on training data only so the model does not cheat on unseen test data.</li>
            <li>• <strong>Loss Functions:</strong> Use Cross-Entropy for categories (yes/no, classes) and MSE/MAE for predicting continuous numbers (prices, temperatures).</li>
            <li>• <strong>SGD Momentum:</strong> Setting momentum to 0.9 helps gradient descent roll smoothly over bumps and avoid getting stuck.</li>
          </ul>
        </div>
        <div class="card" style="padding: 1rem;">
          <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent-emerald); margin-bottom: 0.5rem;">Recently Used</div>
          <div id="panel-recent-list" style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.825rem;">
            <!-- Dynamically populated -->
          </div>
        </div>
      `;
      renderPanelRecentList();
    } else {
      panel.innerHTML = content;
    }

    if (window.MLForge && MLForge.math) {
      MLForge.math.render(panel);
    }
  }

  function renderPanelRecentList() {
    const listEl = document.getElementById('panel-recent-list');
    if (!listEl) return;
    const recent = MLForge.storage.getRecent();
    if (!recent.length) {
      listEl.innerHTML = `<span style="color: var(--text-muted); font-size: 0.75rem;">No tools used yet.</span>`;
      return;
    }
    listEl.innerHTML = recent.slice(0, 5).map(r => `
      <a href="${r.link}" style="display: flex; align-items: center; justify-content: space-between; padding: 0.35rem 0.5rem; border-radius: 4px; background: var(--bg-badge); color: var(--text-main); text-decoration: none;">
        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 190px;">${r.title}</span>
        <span class="badge badge-blue" style="font-size: 0.6rem;">${r.type}</span>
      </a>
    `).join('');
  }

  return {
    init,
    toggleTheme,
    showToast,
    copyToClipboard,
    updateBookmarkBadge,
    toggleSidebar,
    toggleMobileMenu,
    closeMobileMenu,
    updateContextPanel
  };
})();
