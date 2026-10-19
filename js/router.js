/**
 * MLForge Client-Side View Router & Dynamic Page Renderer
 * Comprehensive implementation of all workspace views.
 */

window.MLForge = window.MLForge || {};

MLForge.router = (function () {
  let contentArea = null;

  function init() {
    contentArea = document.getElementById('content-area');
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  function handleRoute() {
    const hash = window.location.hash || '#dashboard';
    const parts = hash.slice(1).split('/');
    const route = parts[0] || 'dashboard';
    const param = parts[1] || null;

    updateSidebarActiveState(route, param);
    MLForge.ui.closeMobileMenu();

    switch (route) {
      case 'dashboard':
        renderDashboard();
        break;
      case 'calculators':
        renderCalculators(param);
        break;
      case 'playground':
        renderPlaygrounds(param);
        break;
      case 'topics':
        renderTopics(param);
        break;
      case 'formulas':
        renderFormulas(param);
        break;
      case 'code':
        renderCodeExamples(param);
        break;
      case 'bookmarks':
        renderBookmarks();
        break;
      default:
        renderDashboard();
        break;
    }

    if (!param) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    MLForge.ui.updateContextPanel();
  }

  function updateSidebarActiveState(route, param) {
    document.querySelectorAll('.nav-item').forEach(item => {
      const href = item.getAttribute('href') || '';
      if (href.startsWith(`#${route}`)) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Sync mobile bottom navigation bar active state
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      const r = link.getAttribute('data-route');
      if (r === route) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // View 1: Dashboard
  // =========================================================================
  function renderDashboard() {
    contentArea.innerHTML = `
      <!-- Hero Banner -->
      <section class="dashboard-hero">
        <div class="hero-glow-blob"></div>
        <div class="hero-content">
          <div class="hero-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
            MLForge Workspace • Client-Side Native
          </div>
          <h1 class="hero-title">The High-Performance Workspace for <span>AI & ML Engineers</span></h1>
          <p class="hero-subtitle">
            Rigorous mathematical calculators, interactive visual learning playgrounds, production code references, and complete theoretical guides—designed for machine learning practitioners, deep learning learners, and data scientists.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary" onclick="MLForge.search.open()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Quick Search (Ctrl+K)
            </button>
            <a href="#playground/neuron" class="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Explore Visual Playgrounds
            </a>
            <a href="#calculators" class="btn btn-ghost" style="border: 1px solid var(--border-subtle);">
              Browse 20+ Calculators
            </a>
          </div>
        </div>
      </section>

      <!-- Stats Grid -->
      <section class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
          </div>
          <div>
            <div class="stat-value">21+</div>
            <div class="stat-label">AI / ML Calculators</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon cyan">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </div>
          <div>
            <div class="stat-value">6</div>
            <div class="stat-label">Interactive Playgrounds</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon violet">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div>
            <div class="stat-value">15+</div>
            <div class="stat-label">Formula Catalog</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon emerald">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <div>
            <div class="stat-value">100%</div>
            <div class="stat-label">Client-Side Zero-API</div>
          </div>
        </div>
      </section>

      <!-- Live Interactive Dashboard Concept Preview -->
      <section class="mini-concept-box">
        <div class="mini-concept-header">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700;">Live Interactive Concept: Single Neuron Firing</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Adjust the signal input slider and observe real-time mathematical excitation.</p>
          </div>
          <a href="#playground/neuron" class="btn btn-sm btn-secondary">Open Full Playground ↗</a>
        </div>
        <div class="mini-concept-body">
          <div>
            <div class="form-group">
              <div class="form-label"><span>Input Signal (x)</span> <span id="dash-mini-x-val" class="range-val">1.5</span></div>
              <input type="range" id="dash-mini-x" class="range-input" min="-4" max="4" step="0.2" value="1.5">
            </div>
            <div style="font-size: 0.825rem; color: var(--text-secondary); line-height: 1.5;">
              Formula: <code style="color: var(--color-accent-cyan);">z = 1.2x - 0.4</code><br>
              Sigmoid: <code id="dash-mini-output" style="color: #10b981; font-weight: 700;">σ(z) = 0.8022</code>
            </div>
          </div>
          <svg id="dash-mini-svg" viewBox="0 0 320 120" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: 120px; background: var(--bg-app); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);"></svg>
        </div>
      </section>

      <!-- Quick Access Featured Calculators -->
      <section style="margin-bottom: 2.5rem;">
        <div class="section-header">
          <h2 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-primary);"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/></svg>
            Popular AI/ML Calculators
          </h2>
          <a href="#calculators" class="btn btn-sm btn-ghost">View All Calculators →</a>
        </div>

        <div class="dashboard-tools-grid">
          <a href="#calculators/neuron-calc" class="card card-interactive">
            <div class="card-header">
              <span class="badge badge-cyan">Neural Network</span>
              <button class="btn-icon-only bookmark-toggle-btn" data-id="neuron-calc" data-type="calculator" data-title="Neuron Output Calculator" onclick="event.preventDefault(); MLForge.router.toggleBookmark(this);">
                ${MLForge.storage.isBookmarked('neuron-calc') ? '★' : '☆'}
              </button>
            </div>
            <h3 class="card-title">Neuron Output Calculator</h3>
            <p class="card-subtitle">Compute weighted sum z = Σ(wᵢxᵢ) + b and evaluate Sigmoid, ReLU, Tanh, or Leaky ReLU with step breakdown.</p>
          </a>

          <a href="#calculators/classification-metrics-calc" class="card card-interactive">
            <div class="card-header">
              <span class="badge badge-blue">Machine Learning</span>
              <button class="btn-icon-only bookmark-toggle-btn" data-id="classification-metrics-calc" data-type="calculator" data-title="Classification & Confusion Matrix" onclick="event.preventDefault(); MLForge.router.toggleBookmark(this);">
                ${MLForge.storage.isBookmarked('classification-metrics-calc') ? '★' : '☆'}
              </button>
            </div>
            <h3 class="card-title">Confusion Matrix & Metrics</h3>
            <p class="card-subtitle">Enter TP, TN, FP, FN to calculate Precision, Recall, Specificity, F1-Score, Balanced Accuracy, and FPR.</p>
          </a>

          <a href="#calculators/tensor-shape-calc" class="card card-interactive">
            <div class="card-header">
              <span class="badge badge-violet">Deep Learning</span>
              <button class="btn-icon-only bookmark-toggle-btn" data-id="tensor-shape-calc" data-type="calculator" data-title="Tensor Shape Calculator" onclick="event.preventDefault(); MLForge.router.toggleBookmark(this);">
                ${MLForge.storage.isBookmarked('tensor-shape-calc') ? '★' : '☆'}
              </button>
            </div>
            <h3 class="card-title">CNN Output Shape Calculator</h3>
            <p class="card-subtitle">Calculate Conv2D and MaxPool output dimensions from input size, kernel, stride, and padding.</p>
          </a>

          <a href="#calculators/vram-estimator-calc" class="card card-interactive">
            <div class="card-header">
              <span class="badge badge-amber">Hardware & VRAM</span>
              <button class="btn-icon-only bookmark-toggle-btn" data-id="vram-estimator-calc" data-type="calculator" data-title="GPU VRAM & Memory Estimator" onclick="event.preventDefault(); MLForge.router.toggleBookmark(this);">
                ${MLForge.storage.isBookmarked('vram-estimator-calc') ? '★' : '☆'}
              </button>
            </div>
            <h3 class="card-title">GPU VRAM & Memory Estimator</h3>
            <p class="card-subtitle">Estimate exact GPU VRAM needed for training and inference across FP32, FP16, INT8, and INT4 quantizations.</p>
          </a>

          <a href="#calculators/loss-calc" class="card card-interactive">
            <div class="card-header">
              <span class="badge badge-rose">Loss Functions</span>
              <button class="btn-icon-only bookmark-toggle-btn" data-id="loss-calc" data-type="calculator" data-title="Loss Function Calculator" onclick="event.preventDefault(); MLForge.router.toggleBookmark(this);">
                ${MLForge.storage.isBookmarked('loss-calc') ? '★' : '☆'}
              </button>
            </div>
            <h3 class="card-title">Loss Function Calculator</h3>
            <p class="card-subtitle">Calculate MSE, MAE, Huber, and Binary Cross-Entropy losses with sample-level residuals and penalties.</p>
          </a>

          <a href="#calculators/gradient-descent-calc" class="card card-interactive">
            <div class="card-header">
              <span class="badge badge-emerald">Optimization</span>
              <button class="btn-icon-only bookmark-toggle-btn" data-id="gradient-descent-calc" data-type="calculator" data-title="Gradient Descent Calculator" onclick="event.preventDefault(); MLForge.router.toggleBookmark(this);">
                ${MLForge.storage.isBookmarked('gradient-descent-calc') ? '★' : '☆'}
              </button>
            </div>
            <h3 class="card-title">Gradient Descent Step Calculator</h3>
            <p class="card-subtitle">Compute updated weights θ_new = θ_old - η∇J with optional momentum velocity tracking.</p>
          </a>
        </div>
      </section>

      <!-- Featured Topics & Formulas Section -->
      <section class="dashboard-dual-columns">
        <div>
          <div class="section-header">
            <h2 class="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-accent-violet);"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/></svg>
              Core Knowledge Modules
            </h2>
            <a href="#topics" class="btn btn-sm btn-ghost">All Topics →</a>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${(MLForge.data.topics || []).slice(0, 4).map(t => `
              <a href="#topics/${t.id}" class="card card-interactive" style="padding: 1rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem;">
                  <span style="font-weight: 600; font-size: 0.95rem; color: var(--text-main);">${t.title}</span>
                  <span class="badge badge-blue" style="font-size: 0.65rem;">${t.section}</span>
                </div>
                <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">${t.summary}</p>
              </a>
            `).join('')}
          </div>
        </div>

        <div>
          <div class="section-header">
            <h2 class="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-accent-cyan);"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              Quick Formula Reference
            </h2>
            <a href="#formulas" class="btn btn-sm btn-ghost">Formula Library →</a>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${(MLForge.data.formulas || []).slice(0, 4).map(f => `
              <div class="card" style="padding: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                  <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-main);">${f.name}</span>
                  <a href="#calculators/${f.calculatorId}" class="btn btn-sm btn-ghost" style="padding: 2px 6px; font-size: 0.7rem; color: var(--color-accent-cyan);">Calc ↗</a>
                </div>
                <div class="math-block" style="padding: 0.45rem 0.75rem; font-size: 0.9rem; margin: 0.35rem 0;">${f.expression}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${f.whenToUse.slice(0, 80)}...</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    initDashboardMiniWidget();
  }

  function initDashboardMiniWidget() {
    const slider = document.getElementById('dash-mini-x');
    const valReadout = document.getElementById('dash-mini-x-val');
    const outReadout = document.getElementById('dash-mini-output');
    const svg = document.getElementById('dash-mini-svg');

    if (!slider || !svg) return;

    function updateMini() {
      const x = Number(slider.value);
      valReadout.textContent = x.toFixed(1);
      const z = 1.2 * x - 0.4;
      const a = 1 / (1 + Math.exp(-z));
      outReadout.textContent = `σ(${z.toFixed(2)}) = ${a.toFixed(4)}`;

      const color = a > 0.5 ? '#10b981' : '#38bdf8';
      svg.innerHTML = `
        <line x1="40" y1="60" x2="160" y2="60" stroke="#38bdf8" stroke-width="${Math.max(2, Math.abs(x)*2.5)}" stroke-linecap="round"/>
        <line x1="160" y1="60" x2="280" y2="60" stroke="${color}" stroke-width="${Math.max(2, a*8)}" stroke-linecap="round"/>
        <circle cx="40" cy="60" r="18" fill="#111827" stroke="#38bdf8" stroke-width="2"/>
        <text x="40" y="64" font-family="monospace" font-size="11" fill="#fff" text-anchor="middle">${x.toFixed(1)}</text>
        <circle cx="160" cy="60" r="32" fill="#111827" stroke="${color}" stroke-width="2.5"/>
        <text x="160" y="58" font-family="sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">z = ${z.toFixed(1)}</text>
        <text x="160" y="72" font-family="monospace" font-size="11" fill="#f1f5f9" font-weight="700" text-anchor="middle">σ(z)</text>
        <circle cx="280" cy="60" r="22" fill="#111827" stroke="${color}" stroke-width="2"/>
        <text x="280" y="65" font-family="monospace" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">${a.toFixed(2)}</text>
      `;
    }

    slider.addEventListener('input', updateMini);
    updateMini();
  }

  // =========================================================================
  // View 2: Calculators
  // =========================================================================
  function renderCalculators(activeId) {
    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.5rem;">AI/ML Calculators Directory</h1>
        <p style="color: var(--text-secondary); max-width: 780px;">
          Interactive mathematical calculation engines for machine learning and deep learning. Every calculator performs true mathematical calculations with live validation, formula reference, and step-by-step breakdown.
        </p>
      </div>

      <!-- Category Filter Tabs -->
      <div class="calc-nav-tabs">
        <button class="calc-nav-btn active" data-filter="all">All Calculators</button>
        <button class="calc-nav-btn" data-filter="nn">Neural Networks</button>
        <button class="calc-nav-btn" data-filter="ml">Machine Learning</button>
        <button class="calc-nav-btn" data-filter="math">Mathematics</button>
        <button class="calc-nav-btn" data-filter="planning">Project Planning & GPU</button>
      </div>

      <div id="calculators-container" style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- 1. Neuron Output Calculator -->
        <div class="calculator-wrapper" id="neuron-calc" data-cat="nn">
          <div class="calc-header-meta">
            <div>
              <span class="badge badge-cyan" style="margin-bottom: 0.4rem;">Neural Network</span>
              <h2 style="font-size: 1.35rem; font-weight: 700;">Neuron Output & Activation Calculator</h2>
            </div>
            <button class="btn-icon-only" onclick="MLForge.router.toggleBookmark(this)" data-id="neuron-calc" data-type="calculator" data-title="Neuron Output Calculator">
              ${MLForge.storage.isBookmarked('neuron-calc') ? '★' : '☆'}
            </button>
          </div>
          <div class="calc-formula-ref">
            Formula: <code>z = Σ(wᵢ · xᵢ) + b</code> &nbsp;|&nbsp; Output: <code>a = f(z)</code>
          </div>
          <div class="form-grid-3">
            <div class="form-group">
              <label class="form-label">Inputs Vector (comma separated)</label>
              <input type="text" id="c-neuron-inputs" class="form-input font-mono" value="2.0, -1.0, 3.5">
            </div>
            <div class="form-group">
              <label class="form-label">Weights Vector (comma separated)</label>
              <input type="text" id="c-neuron-weights" class="form-input font-mono" value="0.5, 2.0, -0.4">
            </div>
            <div class="form-group">
              <label class="form-label">Bias Offset (b)</label>
              <input type="number" id="c-neuron-bias" class="form-input font-mono" value="1.2" step="0.1">
            </div>
          </div>
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Activation Function f(z)</label>
              <select id="c-neuron-act" class="form-select">
                <option value="sigmoid" selected>Sigmoid: σ(z) = 1 / (1 + e⁻ᶻ)</option>
                <option value="relu">ReLU: max(0, z)</option>
                <option value="tanh">Tanh: tanh(z)</option>
                <option value="leaky_relu">Leaky ReLU: max(0.01z, z)</option>
                <option value="linear">Linear (None): z</option>
              </select>
            </div>
            <div style="display: flex; align-items: flex-end; margin-bottom: 1rem;">
              <button id="c-neuron-btn" class="btn btn-primary" style="width: 100%;">Calculate Output</button>
            </div>
          </div>
          <div id="c-neuron-result"></div>
        </div>

        <!-- 2. Classification Metrics & Confusion Matrix -->
        <div class="calculator-wrapper" id="classification-metrics-calc" data-cat="ml">
          <div class="calc-header-meta">
            <div>
              <span class="badge badge-blue" style="margin-bottom: 0.4rem;">Machine Learning</span>
              <h2 style="font-size: 1.35rem; font-weight: 700;">Confusion Matrix & Classification Metrics</h2>
            </div>
            <button class="btn-icon-only" onclick="MLForge.router.toggleBookmark(this)" data-id="classification-metrics-calc" data-type="calculator" data-title="Classification Metrics">
              ${MLForge.storage.isBookmarked('classification-metrics-calc') ? '★' : '☆'}
            </button>
          </div>
          <div class="calc-formula-ref">
            Precision = TP / (TP + FP) &nbsp;|&nbsp; Recall = TP / (TP + FN) &nbsp;|&nbsp; F1 = 2PR / (P + R)
          </div>
          <div class="form-grid-4">
            <div class="form-group">
              <label class="form-label">True Positives (TP)</label>
              <input type="number" id="c-cm-tp" class="form-input font-mono" value="85" min="0">
            </div>
            <div class="form-group">
              <label class="form-label">False Positives (FP)</label>
              <input type="number" id="c-cm-fp" class="form-input font-mono" value="15" min="0">
            </div>
            <div class="form-group">
              <label class="form-label">False Negatives (FN)</label>
              <input type="number" id="c-cm-fn" class="form-input font-mono" value="10" min="0">
            </div>
            <div class="form-group">
              <label class="form-label">True Negatives (TN)</label>
              <input type="number" id="c-cm-tn" class="form-input font-mono" value="90" min="0">
            </div>
          </div>
          <button id="c-cm-btn" class="btn btn-primary" style="margin-bottom: 1rem;">Evaluate Metrics</button>
          <div id="c-cm-result"></div>
        </div>

        <!-- 3. CNN Tensor Shape Calculator -->
        <div class="calculator-wrapper" id="tensor-shape-calc" data-cat="nn">
          <div class="calc-header-meta">
            <div>
              <span class="badge badge-violet" style="margin-bottom: 0.4rem;">Deep Learning</span>
              <h2 style="font-size: 1.35rem; font-weight: 700;">CNN 2D Convolution / Pooling Output Shape</h2>
            </div>
            <button class="btn-icon-only" onclick="MLForge.router.toggleBookmark(this)" data-id="tensor-shape-calc" data-type="calculator" data-title="Tensor Shape Calculator">
              ${MLForge.storage.isBookmarked('tensor-shape-calc') ? '★' : '☆'}
            </button>
          </div>
          <div class="calc-formula-ref">
            Formula: <code>O = ⌊(Input - Kernel + 2×Padding) / Stride⌋ + 1</code>
          </div>
          <div class="form-grid-4">
            <div class="form-group">
              <label class="form-label">Input Height (H)</label>
              <input type="number" id="c-ts-h" class="form-input font-mono" value="224" min="1">
            </div>
            <div class="form-group">
              <label class="form-label">Input Width (W)</label>
              <input type="number" id="c-ts-w" class="form-input font-mono" value="224" min="1">
            </div>
            <div class="form-group">
              <label class="form-label">Kernel Size (K)</label>
              <input type="number" id="c-ts-k" class="form-input font-mono" value="7" min="1">
            </div>
            <div class="form-group">
              <label class="form-label">Stride (S)</label>
              <input type="number" id="c-ts-s" class="form-input font-mono" value="2" min="1">
            </div>
          </div>
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Padding (P in pixels)</label>
              <input type="number" id="c-ts-p" class="form-input font-mono" value="3" min="0">
            </div>
            <div style="display: flex; align-items: flex-end; margin-bottom: 1rem;">
              <button id="c-ts-btn" class="btn btn-primary" style="width: 100%;">Compute Output Dimensions</button>
            </div>
          </div>
          <div id="c-ts-result"></div>
        </div>

        <!-- 4. Loss Function Calculator -->
        <div class="calculator-wrapper" id="loss-calc" data-cat="nn">
          <div class="calc-header-meta">
            <div>
              <span class="badge badge-rose" style="margin-bottom: 0.4rem;">Loss Functions</span>
              <h2 style="font-size: 1.35rem; font-weight: 700;">Loss Function Evaluator (MSE, MAE, Huber, BCE)</h2>
            </div>
            <button class="btn-icon-only" onclick="MLForge.router.toggleBookmark(this)" data-id="loss-calc" data-type="calculator" data-title="Loss Function Calculator">
              ${MLForge.storage.isBookmarked('loss-calc') ? '★' : '☆'}
            </button>
          </div>
          <div class="calc-formula-ref">
            MSE = (1/n)Σ(y - ŷ)² &nbsp;|&nbsp; BCE = -(1/n)Σ[y·ln(p) + (1-y)·ln(1-p)]
          </div>
          <div class="form-grid-3">
            <div class="form-group">
              <label class="form-label">True Values y (comma separated)</label>
              <input type="text" id="c-loss-true" class="form-input font-mono" value="1.0, 0.0, 1.0, 1.0">
            </div>
            <div class="form-group">
              <label class="form-label">Predicted Values ŷ (or probabilities)</label>
              <input type="text" id="c-loss-pred" class="form-input font-mono" value="0.9, 0.1, 0.8, 0.4">
            </div>
            <div class="form-group">
              <label class="form-label">Loss Function</label>
              <select id="c-loss-type" class="form-select">
                <option value="bce" selected>Binary Cross-Entropy (BCE)</option>
                <option value="mse">Mean Squared Error (MSE)</option>
                <option value="mae">Mean Absolute Error (MAE)</option>
                <option value="huber">Huber Loss (Robust Regression)</option>
              </select>
            </div>
          </div>
          <button id="c-loss-btn" class="btn btn-primary" style="margin-bottom: 1rem;">Compute Loss</button>
          <div id="c-loss-result"></div>
        </div>

        <!-- 5. GPU VRAM & Memory Estimator -->
        <div class="calculator-wrapper" id="vram-estimator-calc" data-cat="planning">
          <div class="calc-header-meta">
            <div>
              <span class="badge badge-amber" style="margin-bottom: 0.4rem;">Project Planning & Hardware</span>
              <h2 style="font-size: 1.35rem; font-weight: 700;">GPU VRAM & Memory Footprint Estimator</h2>
            </div>
            <button class="btn-icon-only" onclick="MLForge.router.toggleBookmark(this)" data-id="vram-estimator-calc" data-type="calculator" data-title="GPU VRAM Estimator">
              ${MLForge.storage.isBookmarked('vram-estimator-calc') ? '★' : '☆'}
            </button>
          </div>
          <div class="calc-formula-ref">
            Parameters × Precision Bytes + Gradients + Optimizer Moments (Adam = 8B) + Context Buffer
          </div>
          <div class="form-grid-4">
            <div class="form-group">
              <label class="form-label">Parameter Count (Billions)</label>
              <input type="number" id="c-vram-params" class="form-input font-mono" value="7.0" step="0.5" min="0.1">
            </div>
            <div class="form-group">
              <label class="form-label">Precision</label>
              <select id="c-vram-prec" class="form-select">
                <option value="fp16" selected>FP16 / BF16 (2 bytes)</option>
                <option value="fp32">FP32 Full (4 bytes)</option>
                <option value="int8">INT8 Quantized (1 byte)</option>
                <option value="int4">INT4 Quantized (0.5 byte)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Mode</label>
              <select id="c-vram-mode" class="form-select">
                <option value="inference" selected>Inference / Serving</option>
                <option value="training">Training (Adam + Gradients)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Batch Size</label>
              <input type="number" id="c-vram-batch" class="form-input font-mono" value="1" min="1">
            </div>
          </div>
          <button id="c-vram-btn" class="btn btn-primary" style="margin-bottom: 1rem;">Estimate VRAM</button>
          <div id="c-vram-result"></div>
        </div>

        <!-- 6. Gradient Descent Calculator -->
        <div class="calculator-wrapper" id="gradient-descent-calc" data-cat="nn">
          <div class="calc-header-meta">
            <div>
              <span class="badge badge-emerald" style="margin-bottom: 0.4rem;">Optimization</span>
              <h2 style="font-size: 1.35rem; font-weight: 700;">Gradient Descent Step & Momentum Calculator</h2>
            </div>
            <button class="btn-icon-only" onclick="MLForge.router.toggleBookmark(this)" data-id="gradient-descent-calc" data-type="calculator" data-title="Gradient Descent Calculator">
              ${MLForge.storage.isBookmarked('gradient-descent-calc') ? '★' : '☆'}
            </button>
          </div>
          <div class="calc-formula-ref">
            Formula: <code>θ_new = θ_old - η · ∇J(θ)</code> &nbsp;|&nbsp; Momentum: <code>v_t = γ·v_{t-1} + η·∇J</code>
          </div>
          <div class="form-grid-4">
            <div class="form-group">
              <label class="form-label">Current Weight (θ)</label>
              <input type="number" id="c-gd-param" class="form-input font-mono" value="2.5" step="0.1">
            </div>
            <div class="form-group">
              <label class="form-label">Gradient (∇J)</label>
              <input type="number" id="c-gd-grad" class="form-input font-mono" value="1.8" step="0.1">
            </div>
            <div class="form-group">
              <label class="form-label">Learning Rate (η)</label>
              <input type="number" id="c-gd-lr" class="form-input font-mono" value="0.1" step="0.01">
            </div>
            <div class="form-group">
              <label class="form-label">Momentum (γ)</label>
              <input type="number" id="c-gd-mom" class="form-input font-mono" value="0.9" step="0.05">
            </div>
          </div>
          <button id="c-gd-btn" class="btn btn-primary" style="margin-bottom: 1rem;">Compute Step</button>
          <div id="c-gd-result"></div>
        </div>

        <!-- 7. Bayes' Theorem Calculator -->
        <div class="calculator-wrapper" id="bayes-calc" data-cat="math">
          <div class="calc-header-meta">
            <div>
              <span class="badge badge-cyan" style="margin-bottom: 0.4rem;">Probability & Math</span>
              <h2 style="font-size: 1.35rem; font-weight: 700;">Bayes' Theorem Posterior Probability Calculator</h2>
            </div>
            <button class="btn-icon-only" onclick="MLForge.router.toggleBookmark(this)" data-id="bayes-calc" data-type="calculator" data-title="Bayes Theorem Calculator">
              ${MLForge.storage.isBookmarked('bayes-calc') ? '★' : '☆'}
            </button>
          </div>
          <div class="calc-formula-ref">
            Formula: <code>P(A|B) = [P(B|A) · P(A)] / P(B)</code>
          </div>
          <div class="form-grid-3">
            <div class="form-group">
              <label class="form-label">Prior P(A) (or %)</label>
              <input type="number" id="c-bayes-prior" class="form-input font-mono" value="0.01" step="0.001">
              <span class="input-hint">e.g. 0.01 or 1% disease prevalence</span>
            </div>
            <div class="form-group">
              <label class="form-label">Likelihood P(B|A) (Sensitivity)</label>
              <input type="number" id="c-bayes-sens" class="form-input font-mono" value="0.95" step="0.01">
              <span class="input-hint">e.g. 0.95 true positive rate</span>
            </div>
            <div class="form-group">
              <label class="form-label">False Alarm P(B|¬A)</label>
              <input type="number" id="c-bayes-fp" class="form-input font-mono" value="0.05" step="0.01">
              <span class="input-hint">e.g. 0.05 false positive rate</span>
            </div>
          </div>
          <button id="c-bayes-btn" class="btn btn-primary" style="margin-bottom: 1rem;">Calculate Posterior P(A|B)</button>
          <div id="c-bayes-result"></div>
        </div>

        <!-- 8. Train / Val / Test Split Calculator -->
        <div class="calculator-wrapper" id="dataset-split-calc" data-cat="planning">
          <div class="calc-header-meta">
            <div>
              <span class="badge badge-amber" style="margin-bottom: 0.4rem;">Project Planning</span>
              <h2 style="font-size: 1.35rem; font-weight: 700;">Train / Validation / Test Split Planner</h2>
            </div>
            <button class="btn-icon-only" onclick="MLForge.router.toggleBookmark(this)" data-id="dataset-split-calc" data-type="calculator" data-title="Dataset Split Planner">
              ${MLForge.storage.isBookmarked('dataset-split-calc') ? '★' : '☆'}
            </button>
          </div>
          <div class="calc-formula-ref">
            Ensures percentages sum to 100% and calculates exact sample integer partitions without rounding drift.
          </div>
          <div class="form-grid-4">
            <div class="form-group">
              <label class="form-label">Total Dataset Samples</label>
              <input type="number" id="c-split-total" class="form-input font-mono" value="50000" min="1">
            </div>
            <div class="form-group">
              <label class="form-label">Train %</label>
              <input type="number" id="c-split-train" class="form-input font-mono" value="70" min="1" max="98">
            </div>
            <div class="form-group">
              <label class="form-label">Validation %</label>
              <input type="number" id="c-split-val" class="form-input font-mono" value="15" min="1" max="98">
            </div>
            <div class="form-group">
              <label class="form-label">Test %</label>
              <input type="number" id="c-split-test" class="form-input font-mono" value="15" min="1" max="98">
            </div>
          </div>
          <button id="c-split-btn" class="btn btn-primary" style="margin-bottom: 1rem;">Compute Split Partitions</button>
          <div id="c-split-result"></div>
        </div>

        <!-- 9. Cosine Similarity Calculator -->
        <div class="calculator-wrapper" id="cosine-calc" data-cat="math">
          <div class="calc-header-meta">
            <div>
              <span class="badge badge-violet" style="margin-bottom: 0.4rem;">Mathematics & NLP</span>
              <h2 style="font-size: 1.35rem; font-weight: 700;">Cosine Similarity & Distance Calculator</h2>
            </div>
            <button class="btn-icon-only" onclick="MLForge.router.toggleBookmark(this)" data-id="cosine-calc" data-type="calculator" data-title="Cosine Similarity Calculator">
              ${MLForge.storage.isBookmarked('cosine-calc') ? '★' : '☆'}
            </button>
          </div>
          <div class="calc-formula-ref">
            Formula: <code>cos(θ) = (A · B) / (||A|| · ||B||)</code>
          </div>
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Vector A (comma separated)</label>
              <input type="text" id="c-cos-a" class="form-input font-mono" value="1.0, 2.0, 3.0, 0.5">
            </div>
            <div class="form-group">
              <label class="form-label">Vector B (comma separated)</label>
              <input type="text" id="c-cos-b" class="form-input font-mono" value="2.0, 4.0, 6.0, 1.0">
            </div>
          </div>
          <button id="c-cos-btn" class="btn btn-primary" style="margin-bottom: 1rem;">Compute Similarity</button>
          <div id="c-cos-result"></div>
        </div>
      </div>
    `;

    bindCalculatorActions();
    bindCalculatorFilters();

    // If activeId specified, scroll to it smoothly
    if (activeId) {
      setTimeout(() => {
        const target = document.getElementById(activeId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          target.style.boxShadow = "0 0 20px var(--color-primary-glow)";
          setTimeout(() => target.style.boxShadow = "", 2000);
        }
      }, 100);
    }
  }

  function bindCalculatorFilters() {
    const filterBtns = document.querySelectorAll('.calc-nav-btn');
    const calcWrappers = document.querySelectorAll('.calculator-wrapper');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        calcWrappers.forEach(cw => {
          const cat = cw.getAttribute('data-cat');
          if (filter === 'all' || cat === filter) {
            cw.style.display = 'block';
          } else {
            cw.style.display = 'none';
          }
        });
      });
    });
  }

  function bindCalculatorActions() {
    // 1. Neuron Output
    const nBtn = document.getElementById('c-neuron-btn');
    if (nBtn) {
      const calcNeuron = () => {
        try {
          const inVals = document.getElementById('c-neuron-inputs').value.split(',').map(s => s.trim());
          const wVals = document.getElementById('c-neuron-weights').value.split(',').map(s => s.trim());
          const bias = document.getElementById('c-neuron-bias').value;
          const act = document.getElementById('c-neuron-act').value;

          const res = MLForge.calculators.nn.calculateNeuronOutput(inVals, wVals, bias, act);
          renderCalcResult('c-neuron-result', res.output.toFixed(4), "Activated Output a = f(z)", res.steps);
          MLForge.storage.addRecent({ id: 'neuron-calc', title: 'Neuron Output Calculator', type: 'calculator', link: '#calculators/neuron-calc' });
        } catch (e) {
          renderCalcError('c-neuron-result', e.message);
        }
      };
      nBtn.addEventListener('click', calcNeuron);
      calcNeuron(); // run once on load
    }

    // 2. Classification Metrics
    const cmBtn = document.getElementById('c-cm-btn');
    if (cmBtn) {
      const calcCM = () => {
        try {
          const tp = document.getElementById('c-cm-tp').value;
          const fp = document.getElementById('c-cm-fp').value;
          const fn = document.getElementById('c-cm-fn').value;
          const tn = document.getElementById('c-cm-tn').value;

          const res = MLForge.calculators.ml.calculateClassificationMetrics(tp, tn, fp, fn);
          renderCalcResult('c-cm-result', res.f1.toFixed(4), "F1-Score (Harmonic Mean)", res.steps);
          MLForge.storage.addRecent({ id: 'classification-metrics-calc', title: 'Classification Metrics', type: 'calculator', link: '#calculators/classification-metrics-calc' });
        } catch (e) {
          renderCalcError('c-cm-result', e.message);
        }
      };
      cmBtn.addEventListener('click', calcCM);
      calcCM();
    }

    // 3. Tensor Shape
    const tsBtn = document.getElementById('c-ts-btn');
    if (tsBtn) {
      const calcTS = () => {
        try {
          const h = document.getElementById('c-ts-h').value;
          const w = document.getElementById('c-ts-w').value;
          const k = document.getElementById('c-ts-k').value;
          const s = document.getElementById('c-ts-s').value;
          const p = document.getElementById('c-ts-p').value;

          const res = MLForge.calculators.nn.calculateConvOutputShape(h, w, k, s, p);
          renderCalcResult('c-ts-result', res.shapeStr, "Output Spatial Resolution (H_out × W_out)", res.steps);
          MLForge.storage.addRecent({ id: 'tensor-shape-calc', title: 'Tensor Shape Calculator', type: 'calculator', link: '#calculators/tensor-shape-calc' });
        } catch (e) {
          renderCalcError('c-ts-result', e.message);
        }
      };
      tsBtn.addEventListener('click', calcTS);
      calcTS();
    }

    // 4. Loss Function
    const lossBtn = document.getElementById('c-loss-btn');
    if (lossBtn) {
      const calcLoss = () => {
        try {
          const yt = document.getElementById('c-loss-true').value.split(',').map(s => s.trim());
          const yp = document.getElementById('c-loss-pred').value.split(',').map(s => s.trim());
          const type = document.getElementById('c-loss-type').value;

          const res = MLForge.calculators.nn.calculateLoss(yt, yp, type);
          renderCalcResult('c-loss-result', res.loss.toFixed(4), `Computed ${type.toUpperCase()} Loss`, res.steps);
          MLForge.storage.addRecent({ id: 'loss-calc', title: 'Loss Function Calculator', type: 'calculator', link: '#calculators/loss-calc' });
        } catch (e) {
          renderCalcError('c-loss-result', e.message);
        }
      };
      lossBtn.addEventListener('click', calcLoss);
      calcLoss();
    }

    // 5. GPU VRAM
    const vramBtn = document.getElementById('c-vram-btn');
    if (vramBtn) {
      const calcVRAM = () => {
        try {
          const p = document.getElementById('c-vram-params').value;
          const prec = document.getElementById('c-vram-prec').value;
          const mode = document.getElementById('c-vram-mode').value;
          const b = document.getElementById('c-vram-batch').value;

          const res = MLForge.calculators.planning.estimateVRAM(p, prec, mode, b);
          renderCalcResult('c-vram-result', `${res.recommendedGPU_VRAM} GB`, "Recommended Minimum GPU VRAM", res.steps);
          MLForge.storage.addRecent({ id: 'vram-estimator-calc', title: 'GPU VRAM Estimator', type: 'calculator', link: '#calculators/vram-estimator-calc' });
        } catch (e) {
          renderCalcError('c-vram-result', e.message);
        }
      };
      vramBtn.addEventListener('click', calcVRAM);
      calcVRAM();
    }

    // 6. Gradient Descent
    const gdBtn = document.getElementById('c-gd-btn');
    if (gdBtn) {
      const calcGD = () => {
        try {
          const p = document.getElementById('c-gd-param').value;
          const g = document.getElementById('c-gd-grad').value;
          const lr = document.getElementById('c-gd-lr').value;
          const mom = document.getElementById('c-gd-mom').value;

          const res = MLForge.calculators.nn.calculateGradientStep(p, g, lr, mom);
          renderCalcResult('c-gd-result', res.newParam.toFixed(4), "Updated Parameter θ_new", res.steps);
          MLForge.storage.addRecent({ id: 'gradient-descent-calc', title: 'Gradient Descent Step', type: 'calculator', link: '#calculators/gradient-descent-calc' });
        } catch (e) {
          renderCalcError('c-gd-result', e.message);
        }
      };
      gdBtn.addEventListener('click', calcGD);
      calcGD();
    }

    // 7. Bayes
    const bayesBtn = document.getElementById('c-bayes-btn');
    if (bayesBtn) {
      const calcBayes = () => {
        try {
          const prior = document.getElementById('c-bayes-prior').value;
          const sens = document.getElementById('c-bayes-sens').value;
          const fp = document.getElementById('c-bayes-fp').value;

          const res = MLForge.calculators.ml.calculateBayes(prior, sens, null, fp);
          renderCalcResult('c-bayes-result', `${(res.posterior * 100).toFixed(2)}%`, `Posterior Probability P(A|B) (${res.posterior.toFixed(4)})`, res.steps);
          MLForge.storage.addRecent({ id: 'bayes-calc', title: 'Bayes Theorem Calculator', type: 'calculator', link: '#calculators/bayes-calc' });
        } catch (e) {
          renderCalcError('c-bayes-result', e.message);
        }
      };
      bayesBtn.addEventListener('click', calcBayes);
      calcBayes();
    }

    // 8. Split
    const splitBtn = document.getElementById('c-split-btn');
    if (splitBtn) {
      const calcSplit = () => {
        try {
          const tot = document.getElementById('c-split-total').value;
          const tr = document.getElementById('c-split-train').value;
          const val = document.getElementById('c-split-val').value;
          const te = document.getElementById('c-split-test').value;

          const res = MLForge.calculators.nn.calculateDatasetSplit(tot, tr, val, te);
          renderCalcResult('c-split-result', `${res.trainCount.toLocaleString()} Train`, "Partition Distribution", res.steps);
          MLForge.storage.addRecent({ id: 'dataset-split-calc', title: 'Dataset Split Planner', type: 'calculator', link: '#calculators/dataset-split-calc' });
        } catch (e) {
          renderCalcError('c-split-result', e.message);
        }
      };
      splitBtn.addEventListener('click', calcSplit);
      calcSplit();
    }

    // 9. Cosine
    const cosBtn = document.getElementById('c-cos-btn');
    if (cosBtn) {
      const calcCos = () => {
        try {
          const va = document.getElementById('c-cos-a').value.split(',').map(s => s.trim());
          const vb = document.getElementById('c-cos-b').value.split(',').map(s => s.trim());

          const res = MLForge.calculators.ml.calculateCosineSimilarity(va, vb);
          renderCalcResult('c-cos-result', res.similarity.toFixed(4), "Cosine Similarity Score", res.steps);
          MLForge.storage.addRecent({ id: 'cosine-calc', title: 'Cosine Similarity', type: 'calculator', link: '#calculators/cosine-calc' });
        } catch (e) {
          renderCalcError('c-cos-result', e.message);
        }
      };
      cosBtn.addEventListener('click', calcCos);
      calcCos();
    }
  }

  function renderCalcResult(targetId, primaryVal, label, steps = []) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = `
      <div class="calc-result-box">
        <div class="calc-result-header">
          <div>
            <div style="font-size: 0.775rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); font-weight: 600;">${label}</div>
            <div class="calc-primary-val">${primaryVal}</div>
          </div>
          <button class="btn btn-sm btn-secondary" onclick="MLForge.ui.copyToClipboard('${primaryVal}', 'Result copied!')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            Copy Value
          </button>
        </div>
        ${steps.length > 0 ? `
          <div class="calc-steps">
            <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">Step-by-step Math:</div>
            ${steps.map(s => `
              <div class="step-row">
                <div class="step-label">${s.label}</div>
                <div class="step-calc">${s.calc}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderCalcError(targetId, errMsg) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = `
      <div style="padding: 1rem; border-radius: var(--radius-md); background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.3); color: var(--color-accent-rose); font-size: 0.85rem; margin-top: 1rem;">
        ⚠️ <strong>Calculation Error:</strong> ${errMsg}
      </div>
    `;
  }

  // =========================================================================
  // View 3: Visual Playgrounds
  // =========================================================================
  function renderPlaygrounds(activeId = 'neuron') {
    const validTabs = ['neuron', 'activation', 'gradient-descent', 'cnn', 'architecture', 'fit'];
    let tab = activeId;
    if (!validTabs.includes(tab)) tab = 'neuron';

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.5rem;">Interactive Visual Learning Playgrounds</h1>
        <p style="color: var(--text-secondary); max-width: 780px;">
          Build deep intuition by interacting directly with mathematical concepts. Drag sliders, alter loss curves, manipulate neural topologies, and observe live updates without page reloads.
        </p>
      </div>

      <!-- Playground Tab Bar -->
      <div class="tab-bar">
        <button class="tab-btn ${tab === 'neuron' ? 'active' : ''}" onclick="window.location.hash='#playground/neuron'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
          Neuron Playground
        </button>
        <button class="tab-btn ${tab === 'activation' ? 'active' : ''}" onclick="window.location.hash='#playground/activation'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18c6 0 6-12 12-12s6 12 6 12"/></svg>
          Activation Explorer
        </button>
        <button class="tab-btn ${tab === 'gradient-descent' ? 'active' : ''}" onclick="window.location.hash='#playground/gradient-descent'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          Gradient Descent
        </button>
        <button class="tab-btn ${tab === 'cnn' ? 'active' : ''}" onclick="window.location.hash='#playground/cnn'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>
          CNN Convolution Visualizer
        </button>
        <button class="tab-btn ${tab === 'architecture' ? 'active' : ''}" onclick="window.location.hash='#playground/architecture'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          Architecture Builder
        </button>
        <button class="tab-btn ${tab === 'fit' ? 'active' : ''}" onclick="window.location.hash='#playground/fit'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/></svg>
          Overfitting vs Underfitting
        </button>
      </div>

      <div id="playground-mount-point"></div>
    `;

    setTimeout(() => {
      if (tab === 'neuron') {
        MLForge.viz.neuron.render('playground-mount-point');
        MLForge.storage.addRecent({ id: 'pg-neuron', title: 'Neuron Playground', type: 'playground', link: '#playground/neuron' });
      } else if (tab === 'activation') {
        MLForge.viz.activation.render('playground-mount-point');
        MLForge.storage.addRecent({ id: 'pg-activation', title: 'Activation Explorer', type: 'playground', link: '#playground/activation' });
      } else if (tab === 'gradient-descent') {
        MLForge.viz.gradientDescent.render('playground-mount-point');
        MLForge.storage.addRecent({ id: 'pg-gd', title: 'Gradient Descent Playground', type: 'playground', link: '#playground/gradient-descent' });
      } else if (tab === 'cnn') {
        MLForge.viz.cnn.render('playground-mount-point');
        MLForge.storage.addRecent({ id: 'pg-cnn', title: 'CNN Visualizer', type: 'playground', link: '#playground/cnn' });
      } else if (tab === 'architecture') {
        MLForge.viz.archBuilder.render('playground-mount-point');
        MLForge.storage.addRecent({ id: 'pg-arch', title: 'Architecture Builder', type: 'playground', link: '#playground/architecture' });
      } else if (tab === 'fit') {
        MLForge.viz.fitExplorer.render('playground-mount-point');
        MLForge.storage.addRecent({ id: 'pg-fit', title: 'Fit Explorer', type: 'playground', link: '#playground/fit' });
      }
    }, 50);
  }

  // =========================================================================
  // View 4: Topics
  // =========================================================================
  function renderTopics(activeId) {
    const topics = MLForge.data.topics || [];
    let currentTopic = topics.find(t => t.id === activeId) || topics[0];

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.5rem;">Knowledge & Theory Reference</h1>
        <p style="color: var(--text-secondary); max-width: 780px;">
          Engineered explanations of Machine Learning, Deep Learning, and Mathematical foundations with explicit definitions, step-by-step algorithms, pros/cons, and implementations.
        </p>
      </div>

      <div class="topic-browser">
        <!-- Sidebar Navigation -->
        <div class="topic-list-nav">
          <div style="font-size: 0.725rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); padding: 0.25rem 0.5rem 0.5rem;">Catalog Topics</div>
          ${topics.map(t => `
            <a href="#topics/${t.id}" class="topic-nav-link ${t.id === currentTopic.id ? 'active' : ''}">
              <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${t.title}</span>
              <span class="badge ${t.section === 'Deep Learning' ? 'badge-violet' : t.section === 'Mathematics' ? 'badge-amber' : 'badge-blue'}" style="font-size: 0.6rem;">${t.category}</span>
            </a>
          `).join('')}
        </div>

        <!-- Topic Reader Article -->
        <article class="topic-article">
          <div class="topic-article-header">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <span class="badge badge-cyan">${currentTopic.section} • ${currentTopic.category}</span>
              <button class="btn btn-sm btn-secondary" onclick="MLForge.router.toggleBookmark(this)" data-id="${currentTopic.id}" data-type="topic" data-title="${currentTopic.title}">
                ${MLForge.storage.isBookmarked(currentTopic.id) ? '★ Bookmarked' : '☆ Bookmark Topic'}
              </button>
            </div>
            <h1 class="topic-h1">${currentTopic.title}</h1>
            <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6;">${currentTopic.summary}</p>
          </div>

          <section>
            <h2 class="topic-section-title">Definition & Essence</h2>
            <p class="topic-paragraph">${currentTopic.definition}</p>
          </section>

          <section>
            <h2 class="topic-section-title">What Problem It Solves</h2>
            <p class="topic-paragraph">${currentTopic.problemSolved}</p>
          </section>

          <section>
            <h2 class="topic-section-title">How It Works Step-by-Step</h2>
            <div style="display: flex; flex-direction: column; gap: 0.6rem; margin: 1rem 0;">
              ${(currentTopic.howItWorks || []).map(step => `
                <div style="padding: 0.75rem 1rem; border-radius: var(--radius-md); background: var(--bg-app); border: 1px solid var(--border-subtle); font-size: 0.9rem; line-height: 1.5;">
                  ${step}
                </div>
              `).join('')}
            </div>
          </section>

          ${currentTopic.formulas && currentTopic.formulas.length > 0 ? `
            <section>
              <h2 class="topic-section-title">Core Mathematical Formulas</h2>
              ${currentTopic.formulas.map(f => `
                <div style="margin-bottom: 0.75rem;">
                  <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">${f.name}</span>
                  <div class="math-block">${f.exp}</div>
                </div>
              `).join('')}
            </section>
          ` : ''}

          <div class="pro-con-grid">
            <div class="pro-box">
              <div class="box-title">Advantages</div>
              <ul style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; color: var(--text-secondary);">
                ${(currentTopic.pros || []).map(p => `<li>• ${p}</li>`).join('')}
              </ul>
            </div>
            <div class="con-box">
              <div class="box-title">Limitations & Watch-outs</div>
              <ul style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; color: var(--text-secondary);">
                ${(currentTopic.cons || []).map(c => `<li>• ${c}</li>`).join('')}
              </ul>
            </div>
          </div>

          ${currentTopic.codeSnippet ? `
            <section>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1.5rem;">
                <h2 class="topic-section-title" style="margin: 0;">Python Implementation Example</h2>
                <button class="btn btn-sm btn-ghost" onclick="MLForge.ui.copyToClipboard(document.getElementById('topic-code-block').innerText, 'Code copied!')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  Copy Python Snippet
                </button>
              </div>
              <div class="code-container">
                <div class="code-header">
                  <span class="code-lang">Python</span>
                  <span>Reference Execution</span>
                </div>
                <pre class="code-pre" id="topic-code-block"><code>${currentTopic.codeSnippet}</code></pre>
              </div>
            </section>
          ` : ''}
        </article>
      </div>
    `;

    MLForge.storage.addRecent({ id: currentTopic.id, title: currentTopic.title, type: 'topic', link: `#topics/${currentTopic.id}` });
  }

  // =========================================================================
  // View 5: Formulas Library
  // =========================================================================
  function renderFormulas(activeId) {
    const formulas = MLForge.data.formulas || [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.5rem;">Searchable Formula Library</h1>
        <p style="color: var(--text-secondary); max-width: 780px;">
          Comprehensive mathematical formulas spanning Machine Learning, Deep Learning, Statistics, and Linear Algebra. Each entry includes symbol definitions, usage rules, worked examples, common mistakes, and direct links to calculation tools.
        </p>
      </div>

      <div class="formula-cards-grid">
        ${formulas.map(f => `
          <div class="card" id="formula-${f.id}">
            <div class="formula-card-top">
              <span class="badge ${f.category === 'Deep Learning' ? 'badge-violet' : f.category === 'Machine Learning' ? 'badge-cyan' : 'badge-amber'}">${f.category}</span>
              <div style="display: flex; gap: 0.35rem;">
                <button class="btn-icon-only" onclick="MLForge.ui.copyToClipboard('${f.expression}', 'Formula copied!')" title="Copy Formula">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                </button>
                <button class="btn-icon-only" onclick="MLForge.router.toggleBookmark(this)" data-id="${f.id}" data-type="formula" data-title="${f.name}" title="Bookmark Formula">
                  ${MLForge.storage.isBookmarked(f.id) ? '★' : '☆'}
                </button>
              </div>
            </div>

            <h3 class="formula-name">${f.name}</h3>
            <div class="math-block">${f.expression}</div>

            <div style="margin-bottom: 0.75rem;">
              <span style="font-size: 0.725rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">Symbols:</span>
              <div class="symbol-def-list">
                ${f.symbols.map(s => `
                  <div class="symbol-item">
                    <span class="symbol-key">${s.key}</span>
                    <span class="symbol-desc">${s.desc}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 0.5rem;">
              <strong>When to use:</strong> ${f.whenToUse}
            </div>

            <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 0.5rem;">
              <strong>Numerical example:</strong> ${f.example}
            </div>

            <div style="font-size: 0.775rem; color: var(--color-accent-rose); line-height: 1.4; margin-bottom: 1rem;">
              <strong>Common pitfall:</strong> ${f.pitfalls}
            </div>

            <a href="#calculators/${f.calculatorId}" class="btn btn-sm btn-primary" style="width: 100%;">
              Open Calculator ↗
            </a>
          </div>
        `).join('')}
      </div>
    `;

    if (activeId) {
      setTimeout(() => {
        const el = document.getElementById(`formula-${activeId}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  // =========================================================================
  // View 6: Code Examples
  // =========================================================================
  function renderCodeExamples(activeId) {
    const codes = MLForge.data.codeExamples || [];

    contentArea.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.5rem;">Developer Code & Implementation Reference</h1>
        <p style="color: var(--text-secondary); max-width: 780px;">
          Production-tested Python templates for PyTorch, Scikit-Learn pipelines, FastAPI model serving, and data preprocessing. Click to copy directly into your repository.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 2rem;">
        ${codes.map(c => `
          <div class="card" id="code-${c.id}">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 0.75rem;">
              <div>
                <span class="badge ${c.category === 'PyTorch' ? 'badge-rose' : c.category === 'Deployment' ? 'badge-emerald' : 'badge-cyan'}" style="margin-bottom: 0.35rem;">${c.category}</span>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main);">${c.title}</h3>
              </div>
              <button class="btn btn-sm btn-secondary" onclick="MLForge.ui.copyToClipboard(document.getElementById('code-pre-${c.id}').innerText, 'Code copied!')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Copy Code
              </button>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem; line-height: 1.5;">${c.description}</p>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem;">
              Requirements: <code style="color: var(--color-accent-cyan);">${c.requirements}</code>
            </div>

            <div class="code-container">
              <div class="code-header">
                <span class="code-lang">${c.language}</span>
                <span>Production Reference</span>
              </div>
              <pre class="code-pre" id="code-pre-${c.id}"><code>${c.code}</code></pre>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    if (activeId) {
      setTimeout(() => {
        const el = document.getElementById(`code-${activeId}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  // =========================================================================
  // View 7: Bookmarks
  // =========================================================================
  function renderBookmarks() {
    const bookmarks = MLForge.storage.getBookmarks();

    contentArea.innerHTML = `
      <div class="bookmarks-header">
        <div>
          <h1 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.5rem;">Saved Bookmarks & Favorites</h1>
          <p style="color: var(--text-secondary); max-width: 650px;">
            Your bookmarked calculators, formulas, and topics are preserved securely in your browser's LocalStorage.
          </p>
        </div>
        ${bookmarks.length > 0 ? `
          <button class="btn btn-secondary btn-sm" onclick="MLForge.storage.clearBookmarks(); MLForge.ui.updateBookmarkBadge(); MLForge.router.init(); MLForge.ui.showToast('All bookmarks cleared', 'info');">
            Clear All Bookmarks
          </button>
        ` : ''}
      </div>

      ${bookmarks.length === 0 ? `
        <div class="card" style="padding: 4rem 2rem; text-align: center;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--text-muted); margin: 0 auto 1rem;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem;">No Bookmarks Saved Yet</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); max-width: 420px; margin: 0 auto 1.5rem;">
            Click the star icon (☆) on any calculator, formula, or topic to pin it here for instantaneous access.
          </p>
          <a href="#calculators" class="btn btn-primary">Browse Calculators</a>
        </div>
      ` : `
        <div class="bookmarks-grid">
          ${bookmarks.map(b => `
            <div class="card">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                <span class="badge ${b.type === 'calculator' ? 'badge-cyan' : b.type === 'formula' ? 'badge-amber' : 'badge-violet'}">${b.type}</span>
                <button class="btn-icon-only" title="Remove bookmark" onclick="MLForge.storage.removeBookmark('${b.id}', '${b.type}'); MLForge.ui.updateBookmarkBadge(); MLForge.router.init();">✕</button>
              </div>
              <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem;">${b.title}</h3>
              <a href="${b.link}" class="btn btn-sm btn-secondary" style="width: 100%;">Open Tool ↗</a>
            </div>
          `).join('')}
        </div>
      `}
    `;
  }

  return {
    init,
    toggleBookmark(btn) {
      const id = btn.getAttribute('data-id');
      const type = btn.getAttribute('data-type') || 'calculator';
      const title = btn.getAttribute('data-title') || id;
      const link = `#${type === 'formula' ? 'formulas' : type === 'topic' ? 'topics' : 'calculators'}/${id}`;

      const isAdded = MLForge.storage.toggleBookmark({ id, type, title, link });
      btn.textContent = isAdded ? '★' : '☆';
      MLForge.ui.updateBookmarkBadge();
      MLForge.ui.showToast(isAdded ? `Saved "${title}" to bookmarks` : `Removed from bookmarks`, isAdded ? 'success' : 'info');
    }
  };
})();
