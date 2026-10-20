/**
 * MLForge Neural Network Architecture Builder
 * Interactive visual layer stack editor with live SVG network graphs and parameter math.
 */

window.MLForge = window.MLForge || {};
window.MLForge.viz = window.MLForge.viz || {};

MLForge.viz.archBuilder = {
  layers: [
    { type: 'input', units: 4, name: 'Input Layer' },
    { type: 'dense', units: 8, activation: 'relu', name: 'Hidden 1 (Dense)' },
    { type: 'dense', units: 6, activation: 'relu', name: 'Hidden 2 (Dense)' },
    { type: 'dense', units: 2, activation: 'softmax', name: 'Output Layer' }
  ],

  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="playground-container">
        <!-- Controls Column -->
        <div class="playground-controls">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.25rem;">Neural Network Architecture Builder</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Stack layers together, choose neurons per layer, and watch the network connections and weight count update live.</p>
          </div>

          <div style="display: flex; gap: 0.5rem;">
            <button id="ab-add-layer-btn" class="btn btn-primary btn-sm" style="flex: 1;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Hidden Layer
            </button>
            <button id="ab-reset-btn" class="btn btn-secondary btn-sm">Reset</button>
          </div>

          <div id="ab-layers-list" style="display: flex; flex-direction: column; gap: 0.65rem; max-height: 380px; overflow-y: auto;">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <!-- Viewport Column -->
        <div class="playground-viewport">
          <svg id="ab-svg-canvas" class="playground-canvas" viewBox="0 0 700 420" preserveAspectRatio="xMidYMid meet">
            <!-- Rendered dynamically -->
          </svg>

          <div class="playground-stats-bar">
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Total Layers</span>
              <div id="ab-total-layers" style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700; color: var(--text-main);">4</div>
            </div>
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Total Learnable Weights & Biases</span>
              <div id="ab-total-params" style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: #38bdf8;">106</div>
            </div>
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Network Status</span>
              <div class="badge badge-emerald">Ready to Train</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.update();
  },

  bindEvents() {
    const addBtn = document.getElementById('ab-add-layer-btn');
    const resetBtn = document.getElementById('ab-reset-btn');

    if (addBtn) {
      addBtn.addEventListener('click', () => {
        if (this.layers.length >= 6) {
          MLForge.ui.showToast("Maximum visual layer depth (6) reached.", "info");
          return;
        }
        // Insert before output layer
        const insertIdx = this.layers.length - 1;
        this.layers.splice(insertIdx, 0, {
          type: 'dense',
          units: 6,
          activation: 'relu',
          name: `Hidden ${insertIdx} (Dense)`
        });
        this.update();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.layers = [
          { type: 'input', units: 4, name: 'Input Layer' },
          { type: 'dense', units: 8, activation: 'relu', name: 'Hidden 1 (Dense)' },
          { type: 'dense', units: 6, activation: 'relu', name: 'Hidden 2 (Dense)' },
          { type: 'dense', units: 2, activation: 'softmax', name: 'Output Layer' }
        ];
        this.update();
      });
    }
  },

  update() {
    this.renderControls();
    this.renderSVG();
  },

  renderControls() {
    const list = document.getElementById('ab-layers-list');
    if (!list) return;

    let html = "";
    this.layers.forEach((layer, idx) => {
      const isInput = idx === 0;
      const isOutput = idx === this.layers.length - 1;

      html += `
        <div class="card" style="padding: 0.85rem; background: var(--bg-app); border: 1px solid var(--border-subtle);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="font-size: 0.825rem; font-weight: 700; color: ${isInput ? '#38bdf8' : isOutput ? '#10b981' : '#a855f7'};">
              ${isInput ? '🔵 ' : isOutput ? '🟢 ' : '🟣 '} ${layer.name}
            </span>
            ${(!isInput && !isOutput && this.layers.length > 3) ? `
              <button class="btn-icon-only remove-layer-btn" data-idx="${idx}" title="Remove layer" style="color: var(--color-accent-rose); width: 22px; height: 22px;">✕</button>
            ` : ''}
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 2px;">
                <span>Units (Neurons)</span> <span style="font-family: var(--font-mono); font-weight: 700; color: var(--text-main);">${layer.units}</span>
              </div>
              <input type="range" class="range-input layer-units-slider" data-idx="${idx}" min="1" max="12" value="${layer.units}">
            </div>
          </div>
        </div>
      `;
    });

    list.innerHTML = html;

    // Bind slider & remove handlers
    list.querySelectorAll('.layer-units-slider').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const idx = Number(e.target.dataset.idx);
        this.layers[idx].units = Number(e.target.value);
        this.update();
      });
    });

    list.querySelectorAll('.remove-layer-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = Number(e.target.dataset.idx);
        this.layers.splice(idx, 1);
        this.update();
      });
    });
  },

  renderSVG() {
    const svg = document.getElementById('ab-svg-canvas');
    if (!svg) return;

    const numLayers = this.layers.length;
    let totalParams = 0;

    // Calculate parameter math
    for (let l = 1; l < numLayers; l++) {
      const prevUnits = this.layers[l - 1].units;
      const currUnits = this.layers[l].units;
      const weights = prevUnits * currUnits;
      const biases = currUnits;
      totalParams += (weights + biases);
    }

    document.getElementById('ab-total-layers').textContent = numLayers;
    document.getElementById('ab-total-params').textContent = totalParams.toLocaleString();

    // Layout coordinates
    const width = 700;
    const height = 420;
    const marginX = 80;
    const layerSpacing = (width - 2 * marginX) / (numLayers - 1);

    const layerNodeCoords = [];

    this.layers.forEach((layer, lIdx) => {
      const lx = marginX + lIdx * layerSpacing;
      const nodeCount = layer.units;
      const coords = [];
      const nodeSpacing = Math.min(40, (height - 100) / (nodeCount + 1));
      const totalH = (nodeCount - 1) * nodeSpacing;
      const startY = (height - totalH) / 2;

      for (let n = 0; n < nodeCount; n++) {
        coords.push({ x: lx, y: startY + n * nodeSpacing });
      }
      layerNodeCoords.push(coords);
    });

    let svgHtml = "";

    // Draw Synaptic Lines between adjacent layers
    for (let l = 0; l < numLayers - 1; l++) {
      const fromNodes = layerNodeCoords[l];
      const toNodes = layerNodeCoords[l + 1];

      fromNodes.forEach(f => {
        toNodes.forEach(t => {
          svgHtml += `
            <line x1="${f.x}" y1="${f.y}" x2="${t.x}" y2="${t.y}"
                  stroke="rgba(255, 255, 255, 0.12)" stroke-width="1"/>
          `;
        });
      });
    }

    // Draw Neuron Nodes
    layerNodeCoords.forEach((nodes, lIdx) => {
      const isInput = lIdx === 0;
      const isOutput = lIdx === numLayers - 1;
      const color = isInput ? '#38bdf8' : isOutput ? '#10b981' : '#a855f7';

      nodes.forEach(coord => {
        svgHtml += `
          <g>
            <circle cx="${coord.x}" cy="${coord.y}" r="11" fill="#111827" stroke="${color}" stroke-width="2.5"/>
            <circle cx="${coord.x}" cy="${coord.y}" r="4" fill="${color}"/>
          </g>
        `;
      });

      // Layer Title header
      const headerX = nodes[0].x;
      svgHtml += `
        <text x="${headerX}" y="35" font-family="sans-serif" font-size="11" font-weight="700" fill="${color}" text-anchor="middle">
          L${lIdx + 1} (${nodes.length})
        </text>
      `;
    });

    svg.innerHTML = svgHtml;
  }
};
