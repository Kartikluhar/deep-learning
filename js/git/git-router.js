/**
 * MLForge Git & GitHub View Router & Dynamic Page Renderer
 * Manages rendering of dashboard, commands library, topic syllabus, interactive visualizers,
 * practice lab, cheat sheet, and user progress.
 */

window.MLForge = window.MLForge || {};
window.MLForge.git = window.MLForge.git || {};

MLForge.git.router = (function () {
  let contentArea = null;

  function init() {
    contentArea = document.getElementById('content-area');
  }

  function handleRoute(subparts) {
    if (!contentArea) {
      contentArea = document.getElementById('content-area');
    }
    const subroute = subparts[0] || 'dashboard';
    const param = subparts[1] || null;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Topic direct shortcuts: e.g. #git/fundamentals -> topic fundamentals
    const knownTopics = [
      'fundamentals', 'installation', 'configuration', 'create-repo',
      'upload-new', 'push-existing', 'cloning', 'working-with-code',
      'branches', 'merging-rebasing', 'merge-conflicts', 'collaboration',
      'pull-requests', 'team-workflows', 'issues-projects', 'undoing-mistakes',
      'advanced', 'github-actions', 'releases-tags', 'ssh-auth',
      'troubleshooting', 'company-workflows'
    ];

    if (knownTopics.includes(subroute)) {
      renderTopic(subroute);
      return;
    }

    switch (subroute) {
      case 'dashboard':
        renderDashboard();
        break;
      case 'commands':
        renderCommands(param);
        break;
      case 'command':
        renderCommandDetail(param);
        break;
      case 'topic':
        renderTopic(param);
        break;
      case 'visualizers':
        renderVisualizers();
        break;
      case 'practice-lab':
        renderPracticeLab();
        break;
      case 'cheat-sheet':
        renderCheatSheet();
        break;
      case 'progress':
        renderProgress();
        break;
      default:
        renderDashboard();
        break;
    }

    MLForge.ui.updateContextPanel();
  }

  // --- 1. DASHBOARD VIEW ---
  function renderDashboard() {
    const stats = MLForge.git.storage.getStats();
    const topics = MLForge.git.data.topics || [];

    contentArea.innerHTML = `
      <!-- Hero Section -->
      <section class="git-hero">
        <div class="git-hero-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="4"/><line x1="1.05" y1="12" x2="7" y2="12"/><line x1="17.01" y1="12" x2="22.96" y2="12"/></svg>
          Professional Version Control
        </div>
        <h1 class="git-hero-title">Master Git &amp; GitHub</h1>
        <p class="git-hero-desc">
          Learn how to save your code, track changes, work with branches, collaborate with developers, resolve merge conflicts, and manage enterprise software projects like a professional software engineer.
        </p>
        <div class="git-hero-actions">
          <a href="#git/fundamentals" class="btn btn-primary">Start Learning</a>
          <a href="#git/commands" class="btn btn-secondary">View Git Commands</a>
          <a href="#git/create-repo" class="btn btn-secondary">Upload a Project</a>
          <a href="#git/company-workflows" class="btn btn-secondary">Company Workflows</a>
          <a href="#git/practice-lab" class="btn btn-secondary" style="border-color: rgba(139, 92, 246, 0.4); color: var(--color-accent-violet);">Practice Lab</a>
        </div>
      </section>

      <!-- Real LocalStorage Progress Stats Grid -->
      <section class="git-stats-grid">
        <div class="git-stat-card">
          <div class="git-stat-icon-wrapper" style="background: rgba(139, 92, 246, 0.12); color: var(--color-accent-violet);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div>
            <div class="git-stat-value">${stats.completedCount} / ${stats.totalTopics}</div>
            <div class="git-stat-label">Lessons Completed</div>
          </div>
        </div>

        <div class="git-stat-card">
          <div class="git-stat-icon-wrapper" style="background: rgba(59, 130, 246, 0.12); color: var(--color-primary);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
          </div>
          <div>
            <div class="git-stat-value">${stats.totalCommands}</div>
            <div class="git-stat-label">Commands Available</div>
          </div>
        </div>

        <div class="git-stat-card">
          <div class="git-stat-icon-wrapper" style="background: rgba(16, 185, 129, 0.12); color: var(--color-accent-emerald);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div>
            <div class="git-stat-value">${stats.practiceSolved}</div>
            <div class="git-stat-label">Lab Challenges Solved</div>
          </div>
        </div>

        <div class="git-stat-card">
          <div class="git-stat-icon-wrapper" style="background: rgba(245, 158, 11, 0.12); color: var(--color-accent-amber);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div>
            <div class="git-stat-value">${stats.bookmarkedCount}</div>
            <div class="git-stat-label">Bookmarked Commands</div>
          </div>
        </div>
      </section>

      <!-- Quick Access Action Cards -->
      <div style="margin-bottom: 1.25rem;">
        <h2 style="font-size: 1.3rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem;">Quick Access Guides</h2>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Direct shortcuts to the most common Git operations and daily routines.</p>
      </div>

      <section class="git-quick-grid">
        <a href="#git/create-repo" class="git-quick-card">
          <div class="git-quick-header">
            <div class="git-quick-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></div>
            <span class="badge badge-purple git-badge-purple">Guide</span>
          </div>
          <div class="git-quick-title">Create a New Repo</div>
          <div class="git-quick-desc">Start tracking a folder locally and connect it to a new GitHub repository.</div>
        </a>

        <a href="#git/push-existing" class="git-quick-card">
          <div class="git-quick-header">
            <div class="git-quick-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div>
            <span class="badge badge-purple git-badge-purple">Guide</span>
          </div>
          <div class="git-quick-title">Push Existing Code</div>
          <div class="git-quick-desc">Safely push pre-existing projects and manage old or new remote URLs.</div>
        </a>

        <a href="#git/cloning" class="git-quick-card">
          <div class="git-quick-header">
            <div class="git-quick-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></div>
            <span class="badge badge-blue">Workflow</span>
          </div>
          <div class="git-quick-title">Clone a Repository</div>
          <div class="git-quick-desc">Download existing repositories and configure project dependencies properly.</div>
        </a>

        <a href="#git/branches" class="git-quick-card">
          <div class="git-quick-header">
            <div class="git-quick-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg></div>
            <span class="badge badge-emerald">Branches</span>
          </div>
          <div class="git-quick-title">Create a Branch</div>
          <div class="git-quick-desc">Learn how to create, switch, and delete branches using modern git switch.</div>
        </a>

        <a href="#git/merging-rebasing" class="git-quick-card">
          <div class="git-quick-header">
            <div class="git-quick-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg></div>
            <span class="badge badge-cyan">Merge</span>
          </div>
          <div class="git-quick-title">Merge a Branch</div>
          <div class="git-quick-desc">Understand fast-forward, 3-way merge commits, and rebasing.</div>
        </a>

        <a href="#git/merge-conflicts" class="git-quick-card">
          <div class="git-quick-header">
            <div class="git-quick-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 22 22 22 12 2"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
            <span class="badge badge-amber">Simulator</span>
          </div>
          <div class="git-quick-title">Resolve a Conflict</div>
          <div class="git-quick-desc">Read conflict markers (&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD) and resolve them step-by-step.</div>
        </a>

        <a href="#git/pull-requests" class="git-quick-card">
          <div class="git-quick-header">
            <div class="git-quick-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg></div>
            <span class="badge badge-purple git-badge-purple">GitHub</span>
          </div>
          <div class="git-quick-title">Create a Pull Request</div>
          <div class="git-quick-desc">Learn the 17-step professional PR lifecycle, code reviews, and approvals.</div>
        </a>

        <a href="#git/undoing-mistakes" class="git-quick-card">
          <div class="git-quick-header">
            <div class="git-quick-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg></div>
            <span class="badge badge-rose">Safety</span>
          </div>
          <div class="git-quick-title">Undo a Mistake</div>
          <div class="git-quick-desc">Safe remedies for uncommitted files, wrong branches, or bad commits.</div>
        </a>
      </section>

      <!-- Embedded Interactive Workflow Visualizer -->
      <section id="dashboard-wf-visualizer-mount" style="margin-bottom: 2.5rem;"></section>

      <!-- Learning Path Roadmap -->
      <div style="margin-bottom: 1.25rem;">
        <h2 style="font-size: 1.3rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem;">Git &amp; GitHub Learning Roadmap</h2>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Structured 24-stage progression from absolute beginner to software company readiness.</p>
      </div>

      <section class="git-roadmap">
        ${topics.map((t, idx) => {
          const isDone = MLForge.git.storage.isTopicCompleted(t.id);
          return `
            <div class="git-roadmap-stage">
              <div class="git-roadmap-left">
                <div class="git-stage-number">${idx + 1}</div>
                <div>
                  <div class="git-stage-title">
                    <a href="#git/topic/${t.id}" style="color: inherit; text-decoration: none;">${t.title}</a>
                  </div>
                  <div class="git-stage-desc">${t.summary}</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0;">
                <span class="badge ${isDone ? 'badge-emerald' : 'badge-blue'}" style="font-size: 0.7rem;">
                  ${isDone ? '✓ Completed' : 'Not Completed'}
                </span>
                <a href="#git/topic/${t.id}" class="btn btn-secondary btn-sm">Open Lesson</a>
              </div>
            </div>
          `;
        }).join('')}
      </section>
    `;

    // Mount visualizer
    const mount = document.getElementById('dashboard-wf-visualizer-mount');
    if (mount && MLForge.git.visualizers) {
      MLForge.git.visualizers.renderWorkflowVisualizer(mount);
    }
  }


  // --- 2. COMMANDS LIBRARY VIEW ---
  function renderCommands(selectedCategory) {
    const commands = MLForge.git.data.commands || [];
    const categories = ['All', 'Repository', 'Staging & Committing', 'Branching', 'Remotes', 'Undoing Changes', 'Stashing', 'Merging & Rebasing', 'Tags & Releases', 'Advanced Inspection'];
    let activeCat = selectedCategory || 'All';

    contentArea.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.8rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">Git Commands Reference Library</h1>
        <p style="font-size: 0.95rem; color: var(--text-secondary);">Searchable, comprehensive guide for all core Git commands with realistic terminal outputs and warnings.</p>
      </div>

      <!-- Filter Bar -->
      <div class="card" style="padding: 1rem; margin-bottom: 1.5rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; justify-content: space-between;">
          <input type="text" id="git-cmd-search" class="input" placeholder="Search commands, syntax, or keywords (e.g. branch, commit, rebase)..." style="flex: 1; min-width: 260px;">
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;" id="git-cat-filters">
            ${categories.map(cat => `
              <button class="btn btn-sm ${cat === activeCat ? 'btn-primary' : 'btn-secondary'} filter-cat-btn" data-cat="${cat}">${cat}</button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Commands Container -->
      <div id="git-commands-list"></div>
    `;

    function updateList() {
      const searchVal = (document.getElementById('git-cmd-search')?.value || '').toLowerCase();
      const listContainer = document.getElementById('git-commands-list');
      if (!listContainer) return;

      const filtered = commands.filter(c => {
        const matchesCat = activeCat === 'All' || c.category === activeCat;
        const matchesQuery = c.name.toLowerCase().includes(searchVal) ||
                             c.syntax.toLowerCase().includes(searchVal) ||
                             c.simpleMeaning.toLowerCase().includes(searchVal) ||
                             c.category.toLowerCase().includes(searchVal);
        return matchesCat && matchesQuery;
      });

      if (!filtered.length) {
        listContainer.innerHTML = `<div class="card" style="padding: 2rem; text-align: center; color: var(--text-muted);">No commands matched your query.</div>`;
        return;
      }

      listContainer.innerHTML = filtered.map(c => {
        const isBookmarked = MLForge.git.storage.isCommandBookmarked(c.id);
        return `
          <div class="git-cmd-card" id="cmd-${c.id}">
            <div class="git-cmd-top">
              <div>
                <span class="git-cmd-name">${c.name}</span>
                <span class="badge badge-blue" style="font-size: 0.65rem; margin-left: 0.5rem;">${c.category}</span>
                <div class="git-cmd-meaning">${c.simpleMeaning}</div>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-sm btn-secondary btn-bookmark-cmd" data-id="${c.id}" title="Bookmark Command">
                  ${isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
                </button>
                <button class="btn btn-sm btn-primary btn-copy-cmd" data-cmd="${c.syntax}" title="Copy Syntax">
                  Copy Syntax
                </button>
              </div>
            </div>

            <div class="git-cmd-syntax-box">
              <code>${c.syntax}</code>
            </div>

            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.65rem;">
              <strong>When to use:</strong> ${c.whenToUse}
            </div>

            <div class="git-terminal">
              <div class="git-terminal-header">
                <div class="git-terminal-dots"><span class="git-terminal-dot red"></span><span class="git-terminal-dot yellow"></span><span class="git-terminal-dot green"></span></div>
                <div class="git-terminal-title">Realistic Terminal Output</div>
              </div>
              <div class="git-terminal-body"><span class="git-prompt">$</span>${c.example}\n${c.exampleOutput}</div>
            </div>

            <div style="font-size: 0.85rem; color: var(--text-secondary); margin: 0.65rem 0;">
              <strong>What it means:</strong> ${c.whatItMeans}
            </div>

            ${c.warnings ? `<div class="git-warning-box">⚠️ <strong>Warning:</strong> ${c.warnings}</div>` : ''}

            <div style="font-size: 0.825rem; color: var(--text-muted); margin-top: 0.65rem;">
              <strong>Common mistake:</strong> ${c.commonMistakes.join(' ')}
            </div>

            <div style="display: flex; gap: 0.4rem; align-items: center; margin-top: 0.75rem; font-size: 0.775rem;">
              <span style="color: var(--text-muted);">Related:</span>
              ${c.relatedCommands.map(rc => `<span class="badge badge-purple git-badge-purple">${rc}</span>`).join(' ')}
            </div>
          </div>
        `;
      }).join('');

      // Bind copy and bookmark buttons
      listContainer.querySelectorAll('.btn-copy-cmd').forEach(btn => {
        btn.onclick = () => {
          const cmd = btn.getAttribute('data-cmd');
          navigator.clipboard.writeText(cmd).then(() => {
            MLForge.ui.showToast(`Copied syntax: ${cmd}`);
          });
        };
      });

      listContainer.querySelectorAll('.btn-bookmark-cmd').forEach(btn => {
        btn.onclick = () => {
          const id = btn.getAttribute('data-id');
          const isNowBookmarked = MLForge.git.storage.toggleCommandBookmark(id);
          btn.textContent = isNowBookmarked ? '★ Bookmarked' : '☆ Bookmark';
          MLForge.ui.showToast(isNowBookmarked ? 'Command bookmarked!' : 'Bookmark removed.');
        };
      });
    }

    updateList();

    // Event listeners
    const searchInput = document.getElementById('git-cmd-search');
    if (searchInput) searchInput.oninput = updateList;

    document.querySelectorAll('.filter-cat-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.filter-cat-btn').forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-secondary');
        });
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
        activeCat = btn.getAttribute('data-cat');
        updateList();
      };
    });
  }


  // --- 3. TOPIC VIEW ---
  function renderTopic(topicId) {
    const topics = MLForge.git.data.topics || [];
    const topic = topics.find(t => t.id === topicId) || topics[0];
    const isCompleted = MLForge.git.storage.isTopicCompleted(topic.id);

    MLForge.git.storage.addRecent({
      title: topic.title,
      type: 'Git Lesson',
      link: `#git/topic/${topic.id}`
    });

    contentArea.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
            <a href="#git/dashboard" style="color: var(--text-muted); text-decoration: none; font-size: 0.85rem;">Git &amp; GitHub</a>
            <span style="color: var(--text-muted); font-size: 0.85rem;">/</span>
            <span style="color: var(--color-accent-violet); font-size: 0.85rem; font-weight: 600;">${topic.stage}</span>
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); line-height: 1.2;">${topic.title}</h1>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}" id="btn-toggle-topic-done">
            ${isCompleted ? '✓ Mark as Incomplete' : '✓ Mark as Completed'}
          </button>
        </div>
      </div>

      <div class="card" style="padding: 2rem; line-height: 1.7; font-size: 0.95rem; margin-bottom: 2rem;">
        ${topic.content}
      </div>

      <!-- If this is the merge-conflicts topic, mount interactive simulator -->
      ${topic.id === 'merge-conflicts' ? `
        <div id="topic-conflict-mount" style="margin-bottom: 2rem;"></div>
      ` : ''}

      <!-- If this is create-repo or upload-new, mount .gitignore templates -->
      ${(topic.id === 'create-repo' || topic.id === 'upload-new') ? `
        <div style="margin-top: 2rem; margin-bottom: 2rem;">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">Production .gitignore Templates</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">Click below to inspect and copy pre-built rules for your exact project technology:</p>
          <div class="card" style="padding: 1.25rem;">
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;" id="gi-template-btns">
              ${(MLForge.git.data.gitignoreTemplates || []).map((t, idx) => `
                <button class="btn btn-sm ${idx === 0 ? 'btn-primary' : 'btn-secondary'} gi-btn" data-id="${t.id}">${t.name}</button>
              `).join('')}
            </div>
            <div id="gi-template-display"></div>
          </div>
        </div>
      ` : ''}

      <!-- Navigation buttons -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
        <a href="#git/dashboard" class="btn btn-secondary">← Back to Dashboard</a>
        <a href="#git/commands" class="btn btn-primary">Browse Git Commands →</a>
      </div>
    `;

    // Completion button
    const btnToggle = document.getElementById('btn-toggle-topic-done');
    if (btnToggle) {
      btnToggle.onclick = () => {
        const done = MLForge.git.storage.toggleTopicCompleted(topic.id);
        btnToggle.textContent = done ? '✓ Mark as Incomplete' : '✓ Mark as Completed';
        btnToggle.className = done ? 'btn btn-secondary' : 'btn btn-primary';
        MLForge.ui.showToast(done ? 'Lesson marked as completed!' : 'Lesson marked as incomplete.');
      };
    }

    // Mount conflict simulator if on merge-conflicts
    if (topic.id === 'merge-conflicts') {
      const mount = document.getElementById('topic-conflict-mount');
      if (mount && MLForge.git.visualizers) {
        MLForge.git.visualizers.renderConflictSimulator(mount);
      }
    }

    // Mount gitignore templates if present
    const giDisplay = document.getElementById('gi-template-display');
    const templates = MLForge.git.data.gitignoreTemplates || [];
    if (giDisplay && templates.length) {
      function showTemplate(tmpl) {
        giDisplay.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-size: 0.825rem; color: var(--text-secondary);">${tmpl.description}</span>
            <button class="btn btn-sm btn-secondary" id="btn-copy-gi">Copy .gitignore</button>
          </div>
          <div class="git-terminal"><div class="git-terminal-body">${tmpl.content}</div></div>
        `;
        const copyBtn = document.getElementById('btn-copy-gi');
        if (copyBtn) {
          copyBtn.onclick = () => {
            navigator.clipboard.writeText(tmpl.content).then(() => {
              MLForge.ui.showToast('Copied .gitignore rules!');
            });
          };
        }
      }
      showTemplate(templates[0]);

      document.querySelectorAll('.gi-btn').forEach(btn => {
        btn.onclick = () => {
          document.querySelectorAll('.gi-btn').forEach(b => {
            b.classList.remove('btn-primary');
            b.classList.add('btn-secondary');
          });
          btn.classList.remove('btn-secondary');
          btn.classList.add('btn-primary');
          const found = templates.find(t => t.id === btn.getAttribute('data-id'));
          if (found) showTemplate(found);
        };
      });
    }
  }


  // --- 4. VISUALIZERS VIEW ---
  function renderVisualizers() {
    contentArea.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.8rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">Interactive Git Visual Learning Tools</h1>
        <p style="font-size: 0.95rem; color: var(--text-secondary);">Interactive visualizers demonstrating file lifecycle transitions, DAG branch pointers, and hands-on conflict resolutions.</p>
      </div>

      <!-- Visualizer 1: 4-Box Pipeline -->
      <div id="vis-mount-pipeline" style="margin-bottom: 2.5rem;"></div>

      <!-- Visualizer 2: Branch DAG -->
      <div id="vis-mount-branch" style="margin-bottom: 2.5rem;"></div>

      <!-- Visualizer 3: Merge Conflict Simulator -->
      <div id="vis-mount-conflict" style="margin-bottom: 2.5rem;"></div>
    `;

    if (MLForge.git.visualizers) {
      MLForge.git.visualizers.renderWorkflowVisualizer(document.getElementById('vis-mount-pipeline'));
      MLForge.git.visualizers.renderBranchVisualizer(document.getElementById('vis-mount-branch'));
      MLForge.git.visualizers.renderConflictSimulator(document.getElementById('vis-mount-conflict'));
    }
  }


  // --- 5. PRACTICE LAB VIEW ---
  function renderPracticeLab() {
    const questions = MLForge.git.data.practiceQuestions || [];
    let activeFilter = 'All';

    contentArea.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.8rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">Git &amp; GitHub Practice Lab</h1>
        <p style="font-size: 0.95rem; color: var(--text-secondary);">Real-world engineering scenarios testing developer instincts across Easy, Medium, and Hard difficulty levels.</p>
      </div>

      <!-- Filter pills -->
      <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem;" id="practice-difficulty-filters">
        <button class="btn btn-sm btn-primary filter-diff-btn" data-diff="All">All Challenges (${questions.length})</button>
        <button class="btn btn-sm btn-secondary filter-diff-btn" data-diff="Easy">Easy</button>
        <button class="btn btn-sm btn-secondary filter-diff-btn" data-diff="Medium">Medium</button>
        <button class="btn btn-sm btn-secondary filter-diff-btn" data-diff="Hard">Hard</button>
      </div>

      <div id="practice-questions-mount"></div>
    `;

    function updateQuestions() {
      const mount = document.getElementById('practice-questions-mount');
      if (!mount) return;

      const filtered = questions.filter(q => activeFilter === 'All' || q.difficulty === activeFilter);
      const results = MLForge.git.storage.getPracticeResults();

      mount.innerHTML = filtered.map((q, idx) => {
        const solved = results[q.id]?.correct;
        return `
          <div class="git-quiz-card" id="card-${q.id}">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
              <span class="badge ${q.difficulty === 'Easy' ? 'badge-emerald' : q.difficulty === 'Medium' ? 'badge-amber' : 'badge-rose'}">
                ${q.difficulty}
              </span>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${q.category}</span>
            </div>

            <div class="git-quiz-question">${idx + 1}. ${q.question}</div>

            <div class="git-quiz-options">
              ${q.options.map((opt, optIdx) => `
                <button class="git-quiz-opt" data-qid="${q.id}" data-optidx="${optIdx}">
                  ${opt}
                </button>
              `).join('')}
            </div>

            <div class="git-quiz-feedback ${solved ? 'show success' : ''}" id="feedback-${q.id}">
              ${solved ? `✓ Correct! ${q.explanation}` : ''}
            </div>
          </div>
        `;
      }).join('');

      // Bind option clicks
      mount.querySelectorAll('.git-quiz-opt').forEach(btn => {
        btn.onclick = () => {
          const qid = btn.getAttribute('data-qid');
          const optIdx = parseInt(btn.getAttribute('data-optidx'), 10);
          const q = questions.find(item => item.id === qid);
          if (!q) return;

          const card = document.getElementById(`card-${qid}`);
          const feedback = document.getElementById(`feedback-${qid}`);
          const allBtns = card.querySelectorAll('.git-quiz-opt');

          allBtns.forEach(b => b.classList.remove('correct', 'incorrect'));

          if (optIdx === q.correctIndex) {
            btn.classList.add('correct');
            feedback.className = 'git-quiz-feedback show success';
            feedback.innerHTML = `✓ <strong>Correct!</strong> ${q.explanation}`;
            MLForge.git.storage.recordPracticeResult(qid, true);
            MLForge.ui.showToast('Correct answer! Challenge solved.');
          } else {
            btn.classList.add('incorrect');
            allBtns[q.correctIndex].classList.add('correct');
            feedback.className = 'git-quiz-feedback show error';
            feedback.innerHTML = `✗ <strong>Incorrect.</strong> ${q.explanation}`;
            MLForge.git.storage.recordPracticeResult(qid, false);
          }
        };
      });
    }

    updateQuestions();

    document.querySelectorAll('.filter-diff-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.filter-diff-btn').forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-secondary');
        });
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
        activeFilter = btn.getAttribute('data-diff');
        updateQuestions();
      };
    });
  }


  // --- 6. CHEAT SHEET VIEW ---
  function renderCheatSheet() {
    const commands = MLForge.git.data.commands || [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.8rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">Git &amp; GitHub Cheat Sheet</h1>
        <p style="font-size: 0.95rem; color: var(--text-secondary);">High-density, fast reference table for daily software engineering workflows.</p>
      </div>

      <div class="card" style="padding: 1.5rem; overflow-x: auto;">
        <table class="table" style="width: 100%; font-size: 0.85rem; border-collapse: collapse;">
          <thead>
            <tr style="text-align: left; border-bottom: 1px solid var(--border-card); background: var(--bg-table-header);">
              <th style="padding: 0.75rem 1rem;">Command</th>
              <th style="padding: 0.75rem 1rem;">Category</th>
              <th style="padding: 0.75rem 1rem;">Syntax</th>
              <th style="padding: 0.75rem 1rem;">Purpose / Simple Meaning</th>
            </tr>
          </thead>
          <tbody>
            ${commands.map(c => `
              <tr style="border-bottom: 1px solid var(--border-subtle);">
                <td style="padding: 0.75rem 1rem; font-weight: 700; font-family: var(--font-mono); color: var(--color-accent-violet); white-space: nowrap;">
                  <a href="#git/commands" style="color: inherit; text-decoration: none;">${c.name}</a>
                </td>
                <td style="padding: 0.75rem 1rem;">
                  <span class="badge badge-blue" style="font-size: 0.65rem;">${c.category}</span>
                </td>
                <td style="padding: 0.75rem 1rem; font-family: var(--font-mono); color: #38bdf8; font-size: 0.8rem; white-space: nowrap;">
                  ${c.syntax}
                </td>
                <td style="padding: 0.75rem 1rem; color: var(--text-secondary); line-height: 1.4;">
                  ${c.simpleMeaning}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }


  // --- 7. PROGRESS & BOOKMARKS VIEW ---
  function renderProgress() {
    const stats = MLForge.git.storage.getStats();
    const completedTopics = MLForge.git.storage.getCompletedTopics();
    const bookmarkedCmds = MLForge.git.storage.getBookmarkedCommands();
    const allTopics = MLForge.git.data.topics || [];
    const allCmds = MLForge.git.data.commands || [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.8rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">My Git Learning Progress</h1>
        <p style="font-size: 0.95rem; color: var(--text-secondary);">Your saved lesson completions, challenge records, and bookmarked commands (stored locally in browser).</p>
      </div>

      <!-- Stats overview -->
      <section class="git-stats-grid" style="margin-bottom: 2rem;">
        <div class="git-stat-card">
          <div>
            <div class="git-stat-value">${stats.progressPct}%</div>
            <div class="git-stat-label">Total Completion</div>
          </div>
        </div>
        <div class="git-stat-card">
          <div>
            <div class="git-stat-value">${stats.completedCount} / ${stats.totalTopics}</div>
            <div class="git-stat-label">Lessons Completed</div>
          </div>
        </div>
        <div class="git-stat-card">
          <div>
            <div class="git-stat-value">${stats.practiceSolved}</div>
            <div class="git-stat-label">Challenges Solved</div>
          </div>
        </div>
        <div class="git-stat-card">
          <div>
            <div class="git-stat-value">${stats.bookmarkedCount}</div>
            <div class="git-stat-label">Bookmarked Commands</div>
          </div>
        </div>
      </section>

      <!-- Bookmarked Commands List -->
      <div class="card" style="padding: 1.5rem; margin-bottom: 2rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem;">Bookmarked Commands</h3>
        ${!bookmarkedCmds.length ? `
          <p style="font-size: 0.85rem; color: var(--text-muted);">You have no bookmarked commands yet. Visit the <a href="#git/commands" style="color: var(--color-accent-violet);">Commands Library</a> to star commands for quick reference.</p>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${bookmarkedCmds.map(id => {
              const cmd = allCmds.find(c => c.id === id);
              if (!cmd) return '';
              return `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 1rem; background: var(--bg-badge); border-radius: 6px;">
                  <div>
                    <span style="font-family: var(--font-mono); font-weight: 700; color: var(--color-accent-violet);">${cmd.name}</span>
                    <span style="font-size: 0.8rem; color: var(--text-secondary); margin-left: 0.5rem;">${cmd.simpleMeaning}</span>
                  </div>
                  <div style="display: flex; gap: 0.5rem;">
                    <a href="#git/commands" class="btn btn-sm btn-secondary">View in Library</a>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>

      <!-- Reset Progress Controls -->
      <div class="card" style="padding: 1.5rem; border-color: rgba(244, 63, 94, 0.3); background: rgba(244, 63, 94, 0.04);">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-accent-rose); margin-bottom: 0.5rem;">Reset Learning Progress</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">Clear all completed lesson records, practice quiz scores, and bookmarked commands from this browser.</p>
        <button class="btn btn-sm" id="btn-reset-git-progress" style="background: var(--color-accent-rose); color: #fff; border: none;">Reset All Git Progress</button>
      </div>
    `;

    const btnReset = document.getElementById('btn-reset-git-progress');
    if (btnReset) {
      btnReset.onclick = () => {
        if (confirm('Are you sure you want to reset all Git & GitHub learning progress?')) {
          MLForge.git.storage.clearProgress();
          MLForge.ui.showToast('Git learning progress reset cleanly.');
          renderProgress();
        }
      };
    }
  }

  return {
    init,
    handleRoute
  };
})();
