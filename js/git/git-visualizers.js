/**
 * MLForge Git & GitHub Interactive Visualizers
 * Includes:
 * 1. Git Workflow Visualizer (4-Box Pipeline)
 * 2. Git Branch Visualizer (Interactive SVG DAG)
 * 3. Merge Conflict Simulator (Hands-on marker resolver)
 */

window.MLForge = window.MLForge || {};
window.MLForge.git = window.MLForge.git || {};

MLForge.git.visualizers = (function () {
  // --- 1. WORKFLOW PIPELINE STATE ---
  const workflowState = {
    working: ['app.py', 'style.css'],
    staging: [],
    local: ['README.md (v1)'],
    remote: ['README.md (v1)'],
    lastAction: 'Ready. Click a command button below to see how files move between zones.',
    activeStage: null
  };

  function renderWorkflowVisualizer(container) {
    if (!container) return;

    container.innerHTML = `
      <div class="git-visualizer-container">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.2rem;">Git 4-Stage Lifecycle Visualizer</h3>
            <p style="font-size: 0.8rem; color: var(--text-secondary);">Click command buttons below to observe how files and snapshots move across the four zones.</p>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-wf-reset">Reset Pipeline</button>
        </div>

        <div class="git-flow-boxes">
          <!-- 1. Working Directory -->
          <div class="git-flow-stage ${workflowState.activeStage === 'working' ? 'active' : ''}" id="flow-box-working">
            <div class="git-flow-stage-title">
              <span>Working Dir</span>
              <span class="badge badge-blue" style="font-size: 0.65rem;">Unstaged</span>
            </div>
            <div class="git-flow-stage-desc">Files you edit in VS Code</div>
            <div class="git-flow-files" id="flow-files-working">
              ${workflowState.working.map(f => `<div class="git-flow-file-item" style="color: #60a5fa;">📄 ${f}</div>`).join('') || '<span style="color: var(--text-muted); font-size: 0.75rem;">Clean working tree</span>'}
            </div>
          </div>

          <!-- 2. Staging Area -->
          <div class="git-flow-stage ${workflowState.activeStage === 'staging' ? 'active' : ''}" id="flow-box-staging">
            <div class="git-flow-stage-title">
              <span>Staging Area</span>
              <span class="badge badge-emerald" style="font-size: 0.65rem;">Index</span>
            </div>
            <div class="git-flow-stage-desc">Prepared for next commit</div>
            <div class="git-flow-files" id="flow-files-staging">
              ${workflowState.staging.map(f => `<div class="git-flow-file-item" style="color: #34d399;">📦 ${f}</div>`).join('') || '<span style="color: var(--text-muted); font-size: 0.75rem;">Nothing staged</span>'}
            </div>
          </div>

          <!-- 3. Local Repo -->
          <div class="git-flow-stage ${workflowState.activeStage === 'local' ? 'active' : ''}" id="flow-box-local">
            <div class="git-flow-stage-title">
              <span>Local Repo</span>
              <span class="badge badge-purple git-badge-purple" style="font-size: 0.65rem;">.git/</span>
            </div>
            <div class="git-flow-stage-desc">Permanent local commits</div>
            <div class="git-flow-files" id="flow-files-local">
              ${workflowState.local.map(f => `<div class="git-flow-file-item" style="color: #a78bfa;">💾 ${f}</div>`).join('')}
            </div>
          </div>

          <!-- 4. Remote Repo -->
          <div class="git-flow-stage ${workflowState.activeStage === 'remote' ? 'active' : ''}" id="flow-box-remote">
            <div class="git-flow-stage-title">
              <span>Remote Repo</span>
              <span class="badge badge-amber" style="font-size: 0.65rem;">GitHub</span>
            </div>
            <div class="git-flow-stage-desc">Shared cloud repository</div>
            <div class="git-flow-files" id="flow-files-remote">
              ${workflowState.remote.map(f => `<div class="git-flow-file-item" style="color: #fbbf24;">☁️ ${f}</div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Controls -->
        <div class="git-flow-actions-bar">
          <button class="btn btn-primary btn-sm" id="btn-wf-add" title="git add .">git add .</button>
          <button class="btn btn-secondary btn-sm" id="btn-wf-commit" title="git commit -m">git commit -m</button>
          <button class="btn btn-secondary btn-sm" id="btn-wf-push" title="git push origin main">git push</button>
          <button class="btn btn-secondary btn-sm" id="btn-wf-fetch" title="git fetch origin">git fetch</button>
          <button class="btn btn-secondary btn-sm" id="btn-wf-pull" title="git pull origin main">git pull</button>
          <button class="btn btn-secondary btn-sm" id="btn-wf-restore" title="git restore .">git restore .</button>
          <button class="btn btn-secondary btn-sm" id="btn-wf-unstage" title="git restore --staged .">git restore --staged</button>
        </div>

        <!-- Explanation message -->
        <div class="git-flow-explanation" id="wf-explanation-text">
          💡 ${workflowState.lastAction}
        </div>
      </div>
    `;

    bindWorkflowEvents(container);
  }

  function bindWorkflowEvents(container) {
    const btnReset = container.querySelector('#btn-wf-reset');
    if (btnReset) {
      btnReset.onclick = () => {
        workflowState.working = ['app.py', 'style.css'];
        workflowState.staging = [];
        workflowState.local = ['README.md (v1)'];
        workflowState.remote = ['README.md (v1)'];
        workflowState.activeStage = null;
        workflowState.lastAction = 'Reset pipeline to initial state.';
        renderWorkflowVisualizer(container);
      };
    }

    const btnAdd = container.querySelector('#btn-wf-add');
    if (btnAdd) {
      btnAdd.onclick = () => {
        if (!workflowState.working.length) {
          workflowState.lastAction = 'Working directory is clean. Nothing to stage!';
        } else {
          workflowState.staging = [...new Set([...workflowState.staging, ...workflowState.working])];
          workflowState.working = [];
          workflowState.activeStage = 'staging';
          workflowState.lastAction = 'git add .: Moved modified files into the Staging Area. They are now prepared for commit.';
        }
        renderWorkflowVisualizer(container);
      };
    }

    const btnCommit = container.querySelector('#btn-wf-commit');
    if (btnCommit) {
      btnCommit.onclick = () => {
        if (!workflowState.staging.length) {
          workflowState.lastAction = 'Cannot commit: Staging Area is empty! Run `git add` first.';
        } else {
          const snapshot = `Commit (${workflowState.staging.join(', ')})`;
          workflowState.local.push(snapshot);
          workflowState.staging = [];
          workflowState.activeStage = 'local';
          workflowState.lastAction = 'git commit -m: Created permanent local commit. It is saved safely in your local .git database.';
        }
        renderWorkflowVisualizer(container);
      };
    }

    const btnPush = container.querySelector('#btn-wf-push');
    if (btnPush) {
      btnPush.onclick = () => {
        workflowState.remote = [...workflowState.local];
        workflowState.activeStage = 'remote';
        workflowState.lastAction = 'git push: Uploaded all local commits to GitHub remote repository. Teammates can now see your changes!';
        renderWorkflowVisualizer(container);
      };
    }

    const btnFetch = container.querySelector('#btn-wf-fetch');
    if (btnFetch) {
      btnFetch.onclick = () => {
        workflowState.remote.push('Teammate Feature (C3)');
        workflowState.activeStage = 'remote';
        workflowState.lastAction = 'git fetch: Downloaded new commits from GitHub into your local tracking metadata without touching your working files.';
        renderWorkflowVisualizer(container);
      };
    }

    const btnPull = container.querySelector('#btn-wf-pull');
    if (btnPull) {
      btnPull.onclick = () => {
        workflowState.local = [...workflowState.remote];
        workflowState.working = [];
        workflowState.activeStage = 'local';
        workflowState.lastAction = 'git pull: Fetched and fast-forward merged latest GitHub commits directly into your local active branch.';
        renderWorkflowVisualizer(container);
      };
    }

    const btnRestore = container.querySelector('#btn-wf-restore');
    if (btnRestore) {
      btnRestore.onclick = () => {
        workflowState.working = [];
        workflowState.activeStage = 'working';
        workflowState.lastAction = 'git restore .: Discarded all uncommitted edits in working directory, reverting back to the last clean commit state.';
        renderWorkflowVisualizer(container);
      };
    }

    const btnUnstage = container.querySelector('#btn-wf-unstage');
    if (btnUnstage) {
      btnUnstage.onclick = () => {
        workflowState.working = [...workflowState.working, ...workflowState.staging];
        workflowState.staging = [];
        workflowState.activeStage = 'working';
        workflowState.lastAction = 'git restore --staged .: Removed files from staging area without losing your edits in the working directory.';
        renderWorkflowVisualizer(container);
      };
    }
  }


  // --- 2. BRANCH VISUALIZER (SVG DAG) ---
  const branchDagState = {
    commits: [
      { id: 'C1', x: 60, y: 140, branch: 'main', msg: 'Initial commit' },
      { id: 'C2', x: 160, y: 140, branch: 'main', msg: 'Setup routes' },
      { id: 'C3', x: 260, y: 140, branch: 'main', msg: 'Add auth logic' },
      { id: 'C4', x: 360, y: 80, branch: 'feature', msg: 'New UI card' },
      { id: 'C5', x: 460, y: 80, branch: 'feature', msg: 'Add theme toggle' }
    ],
    branches: {
      main: 'C3',
      feature: 'C5'
    },
    activeBranch: 'feature',
    explanation: 'Current branch is `feature` (pointing to commit C5). `main` is at C3.'
  };

  function renderBranchVisualizer(container) {
    if (!container) return;

    const commits = branchDagState.commits;
    const branches = branchDagState.branches;
    const active = branchDagState.activeBranch;

    container.innerHTML = `
      <div class="git-visualizer-container">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.2rem;">Interactive Git Branch DAG Visualizer</h3>
            <p style="font-size: 0.8rem; color: var(--text-secondary);">Visualize how commits form a Directed Acyclic Graph (DAG) and see how HEAD and branch pointers move.</p>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-dag-reset">Reset Graph</button>
        </div>

        <svg class="git-dag-canvas" id="dag-svg" viewBox="0 0 700 240">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.3)"/>
            </marker>
          </defs>

          <!-- Branch reference lines -->
          <line x1="30" y1="140" x2="650" y2="140" stroke="rgba(255,255,255,0.08)" stroke-width="2" stroke-dasharray="4"/>
          <line x1="260" y1="80" x2="650" y2="80" stroke="rgba(139, 92, 246, 0.15)" stroke-width="2" stroke-dasharray="4"/>

          <!-- Edges between commits -->
          <line x1="60" y1="140" x2="160" y2="140" stroke="var(--color-primary)" stroke-width="3"/>
          <line x1="160" y1="140" x2="260" y2="140" stroke="var(--color-primary)" stroke-width="3"/>
          <path d="M 260 140 Q 310 110 360 80" fill="none" stroke="var(--color-accent-violet)" stroke-width="3"/>
          <line x1="360" y1="80" x2="460" y2="80" stroke="var(--color-accent-violet)" stroke-width="3"/>

          ${commits.length > 5 ? `<line x1="460" y1="80" x2="560" y2="80" stroke="var(--color-accent-violet)" stroke-width="3"/>` : ''}

          <!-- Commit nodes -->
          ${commits.map(c => `
            <g>
              <circle cx="${c.x}" cy="${c.y}" r="16" fill="${c.branch === 'main' ? '#1e3a8a' : '#581c87'}" stroke="${c.branch === 'main' ? '#3b82f6' : '#a855f7'}" stroke-width="3" style="cursor: pointer; transition: all 0.3s;"/>
              <text x="${c.x}" y="${c.y + 4}" text-anchor="middle" fill="#fff" font-family="monospace" font-size="11" font-weight="bold">${c.id}</text>
              <text x="${c.x}" y="${c.y + 32}" text-anchor="middle" fill="var(--text-muted)" font-family="sans-serif" font-size="9">${c.msg}</text>
            </g>
          `).join('')}

          <!-- Branch Pointers -->
          <!-- main pointer -->
          <g transform="translate(${commits.find(c => c.id === branches.main).x - 25}, ${commits.find(c => c.id === branches.main).y - 40})">
            <rect width="50" height="20" rx="4" fill="#1e40af" stroke="#60a5fa" stroke-width="1.5"/>
            <text x="25" y="14" text-anchor="middle" fill="#fff" font-family="monospace" font-size="10" font-weight="bold">main</text>
            ${active === 'main' ? '<text x="25" y="-6" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="bold">HEAD →</text>' : ''}
          </g>

          <!-- feature pointer -->
          <g transform="translate(${commits.find(c => c.id === branches.feature).x - 30}, ${commits.find(c => c.id === branches.feature).y - 40})">
            <rect width="60" height="20" rx="4" fill="#6b21a8" stroke="#c084fc" stroke-width="1.5"/>
            <text x="30" y="14" text-anchor="middle" fill="#fff" font-family="monospace" font-size="10" font-weight="bold">feature</text>
            ${active === 'feature' ? '<text x="30" y="-6" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="bold">HEAD →</text>' : ''}
          </g>
        </svg>

        <div class="git-flow-actions-bar">
          <button class="btn btn-primary btn-sm" id="btn-dag-commit">New Commit on Active Branch</button>
          <button class="btn btn-secondary btn-sm" id="btn-dag-switch">Switch Branch (git switch)</button>
          <button class="btn btn-secondary btn-sm" id="btn-dag-merge">Merge feature into main</button>
        </div>

        <div class="git-flow-explanation" id="dag-explanation-text">
          💡 ${branchDagState.explanation}
        </div>
      </div>
    `;

    bindBranchDagEvents(container);
  }

  function bindBranchDagEvents(container) {
    const btnReset = container.querySelector('#btn-dag-reset');
    if (btnReset) {
      btnReset.onclick = () => {
        branchDagState.commits = [
          { id: 'C1', x: 60, y: 140, branch: 'main', msg: 'Initial commit' },
          { id: 'C2', x: 160, y: 140, branch: 'main', msg: 'Setup routes' },
          { id: 'C3', x: 260, y: 140, branch: 'main', msg: 'Add auth logic' },
          { id: 'C4', x: 360, y: 80, branch: 'feature', msg: 'New UI card' },
          { id: 'C5', x: 460, y: 80, branch: 'feature', msg: 'Add theme toggle' }
        ];
        branchDagState.branches = { main: 'C3', feature: 'C5' };
        branchDagState.activeBranch = 'feature';
        branchDagState.explanation = 'Reset branch graph to initial state.';
        renderBranchVisualizer(container);
      };
    }

    const btnCommit = container.querySelector('#btn-dag-commit');
    if (btnCommit) {
      btnCommit.onclick = () => {
        if (branchDagState.commits.length >= 6) {
          branchDagState.explanation = 'Max visual commits reached for this demo. Click Reset Graph to start over.';
        } else {
          const nextNum = branchDagState.commits.length + 1;
          const newId = `C${nextNum}`;
          const active = branchDagState.activeBranch;
          const y = active === 'main' ? 140 : 80;
          const x = 560;
          branchDagState.commits.push({
            id: newId,
            x: x,
            y: y,
            branch: active,
            msg: 'New feature change'
          });
          branchDagState.branches[active] = newId;
          branchDagState.explanation = `Committed ${newId} on branch \`${active}\`. Notice how the \`${active}\` pointer moved forward while the other branch stayed where it was.`;
        }
        renderBranchVisualizer(container);
      };
    }

    const btnSwitch = container.querySelector('#btn-dag-switch');
    if (btnSwitch) {
      btnSwitch.onclick = () => {
        branchDagState.activeBranch = branchDagState.activeBranch === 'main' ? 'feature' : 'main';
        branchDagState.explanation = `Switched branch to \`${branchDagState.activeBranch}\`. HEAD now points to ${branchDagState.branches[branchDagState.activeBranch]}.`;
        renderBranchVisualizer(container);
      };
    }

    const btnMerge = container.querySelector('#btn-dag-merge');
    if (btnMerge) {
      btnMerge.onclick = () => {
        branchDagState.activeBranch = 'main';
        branchDagState.branches.main = branchDagState.branches.feature;
        branchDagState.explanation = 'Merged `feature` into `main` (Fast-forward merge). The `main` pointer moved forward to match `feature`.';
        renderBranchVisualizer(container);
      };
    }
  }


  // --- 3. MERGE CONFLICT SIMULATOR ---
  const conflictSimState = {
    resolved: false,
    resolutionType: null,
    resolvedText: `<!DOCTYPE html>
<html>
<head>
  <title>MLForge Application</title>
</head>
<body>
  <h1>Welcome to MLForge - AI Developer Tools & Algorithms</h1>
</body>
</html>`
  };

  function renderConflictSimulator(container) {
    if (!container) return;

    container.innerHTML = `
      <div class="git-conflict-sim">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.2rem;">Merge Conflict Hands-on Simulator</h3>
            <p style="font-size: 0.8rem; color: var(--text-secondary);">Both you (on <code>main</code>) and a teammate (on <code>feature/hero-title</code>) modified the same header tag in <code>index.html</code>.</p>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-conflict-reset">Reset Conflict</button>
        </div>

        ${!conflictSimState.resolved ? `
          <div class="git-conflict-editor">
            <div style="padding: 0.5rem 0.85rem; background: #0c1220; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 0.75rem; color: var(--text-muted);">
              File: src/index.html — CONFLICT (content): Merge conflict in src/index.html
            </div>
            <div style="padding: 0.75rem 1rem; color: var(--text-secondary);">
              &lt;!DOCTYPE html&gt;<br>
              &lt;html&gt;<br>
              &lt;head&gt;&lt;title&gt;MLForge Application&lt;/title&gt;&lt;/head&gt;<br>
              &lt;body&gt;
            </div>

            <!-- Conflict Block -->
            <div class="git-conflict-marker git-conflict-current">
              <span>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (Current Change: main)</span>
              <span style="font-size: 0.7rem; opacity: 0.8;">Your local branch</span>
            </div>
            <div class="git-conflict-body" style="background: rgba(59, 130, 246, 0.08); color: #93c5fd;">
              &nbsp;&nbsp;&lt;h1&gt;Welcome to MLForge - AI Developer Tools&lt;/h1&gt;
            </div>

            <div class="git-conflict-marker git-conflict-divider">
              <span>======= (Divider)</span>
            </div>

            <div class="git-conflict-body" style="background: rgba(16, 185, 129, 0.08); color: #6ee7b7;">
              &nbsp;&nbsp;&lt;h1&gt;Welcome to MLForge - Master AI & Algorithms&lt;/h1&gt;
            </div>
            <div class="git-conflict-marker git-conflict-incoming">
              <span>&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/hero-title (Incoming Change)</span>
              <span style="font-size: 0.7rem; opacity: 0.8;">Teammate's PR</span>
            </div>

            <div style="padding: 0.75rem 1rem; color: var(--text-secondary);">
              &lt;/body&gt;<br>
              &lt;/html&gt;
            </div>
          </div>

          <div style="margin-bottom: 1rem;">
            <div style="font-size: 0.825rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">Choose How to Resolve the Conflict:</div>
            <div class="git-conflict-options">
              <button class="git-conflict-btn git-conflict-btn-current" id="btn-resolve-current">Accept Current (HEAD)</button>
              <button class="git-conflict-btn git-conflict-btn-incoming" id="btn-resolve-incoming">Accept Incoming (feature/hero-title)</button>
              <button class="git-conflict-btn git-conflict-btn-both" id="btn-resolve-both">Accept Both Combined</button>
            </div>
          </div>
        ` : `
          <div class="card" style="padding: 1.5rem; border-color: rgba(16, 185, 129, 0.35); background: rgba(16, 185, 129, 0.05); margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
              <span style="width: 28px; height: 28px; border-radius: 50%; background: #10b981; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold;">✓</span>
              <h4 style="font-size: 1rem; font-weight: 700; color: #34d399;">Conflict Resolved Successfully!</h4>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
              You removed all <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, and <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code> markers and chose: <strong>${conflictSimState.resolutionType}</strong>.
            </p>
            <div class="git-terminal">
              <div class="git-terminal-body">${escapeHtml(conflictSimState.resolvedText)}</div>
            </div>
            <div style="font-size: 0.825rem; color: var(--text-secondary); margin-top: 0.75rem;">
              Next steps in terminal: <code>git add src/index.html</code> followed by <code>git commit -m "Merge branch 'feature/hero-title'"</code>.
            </div>
          </div>
        `}
      </div>
    `;

    bindConflictEvents(container);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function bindConflictEvents(container) {
    const btnReset = container.querySelector('#btn-conflict-reset');
    if (btnReset) {
      btnReset.onclick = () => {
        conflictSimState.resolved = false;
        conflictSimState.resolutionType = null;
        renderConflictSimulator(container);
      };
    }

    const btnCurrent = container.querySelector('#btn-resolve-current');
    if (btnCurrent) {
      btnCurrent.onclick = () => {
        conflictSimState.resolved = true;
        conflictSimState.resolutionType = 'Accept Current Change (HEAD)';
        conflictSimState.resolvedText = `<!DOCTYPE html>\n<html>\n<head><title>MLForge Application</title></head>\n<body>\n  <h1>Welcome to MLForge - AI Developer Tools</h1>\n</body>\n</html>`;
        renderConflictSimulator(container);
      };
    }

    const btnIncoming = container.querySelector('#btn-resolve-incoming');
    if (btnIncoming) {
      btnIncoming.onclick = () => {
        conflictSimState.resolved = true;
        conflictSimState.resolutionType = 'Accept Incoming Change (feature/hero-title)';
        conflictSimState.resolvedText = `<!DOCTYPE html>\n<html>\n<head><title>MLForge Application</title></head>\n<body>\n  <h1>Welcome to MLForge - Master AI & Algorithms</h1>\n</body>\n</html>`;
        renderConflictSimulator(container);
      };
    }

    const btnBoth = container.querySelector('#btn-resolve-both');
    if (btnBoth) {
      btnBoth.onclick = () => {
        conflictSimState.resolved = true;
        conflictSimState.resolutionType = 'Accept Both Changes (Combined)';
        conflictSimState.resolvedText = `<!DOCTYPE html>\n<html>\n<head><title>MLForge Application</title></head>\n<body>\n  <h1>Welcome to MLForge - AI Developer Tools & Master Algorithms</h1>\n</body>\n</html>`;
        renderConflictSimulator(container);
      };
    }
  }

  return {
    renderWorkflowVisualizer,
    renderBranchVisualizer,
    renderConflictSimulator
  };
})();

