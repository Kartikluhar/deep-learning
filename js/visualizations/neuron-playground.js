/**
 * MLForge Interactive Neuron Playground
 * Interactive SVG/Canvas single neuron with real-time weights, inputs, bias, and activations.
 */

window.MLForge = window.MLForge || {};
window.MLForge.viz = window.MLForge.viz || {};

MLForge.viz.neuron = {
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="playground-container">
        <!-- Controls Column -->
        <div class="playground-controls">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.25rem;">Neuron Hyperparameters</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Adjust inputs, synaptic weights, and bias to observe how the neuron fires.</p>
          </div>

          <div class="form-group">
            <label class="form-label">Activation Function</label>
            <select id="np-act-select" class="form-select">
              <option value="sigmoid" selected>Sigmoid: σ(z) = 1 / (1 + e⁻ᶻ)</option>
              <option value="relu">ReLU: max(0, z)</option>
              <option value="tanh">Tanh: tanh(z)</option>
              <option value="leaky_relu">Leaky ReLU: max(0.01z, z)</option>
              <option value="linear">Linear: Identity</option>
            </select>
          </div>

          <!-- Inputs -->
          <div style="font-size: 0.825rem; font-weight: 600; color: var(--color-accent-cyan); margin-top: 0.5rem;">Input Signals (x)</div>
          <div class="form-group">
            <div class="form-label"><span>Input x₁</span> <span id="np-x1-val" class="range-val">1.0</span></div>
            <input type="range" id="np-x1" class="range-input" min="-3" max="3" step="0.1" value="1.0">
          </div>
          <div class="form-group">
            <div class="form-label"><span>Input x₂</span> <span id="np-x2-val" class="range-val">-0.5</span></div>
            <input type="range" id="np-x2" class="range-input" min="-3" max="3" step="0.1" value="-0.5">
          </div>
          <div class="form-group">
            <div class="form-label"><span>Input x₃</span> <span id="np-x3-val" class="range-val">2.0</span></div>
            <input type="range" id="np-x3" class="range-input" min="-3" max="3" step="0.1" value="2.0">
          </div>

          <!-- Weights -->
          <div style="font-size: 0.825rem; font-weight: 600; color: var(--color-accent-violet); margin-top: 0.5rem;">Synaptic Weights (w)</div>
          <div class="form-group">
            <div class="form-label"><span>Weight w₁</span> <span id="np-w1-val" class="range-val">0.8</span></div>
            <input type="range" id="np-w1" class="range-input" min="-3" max="3" step="0.1" value="0.8">
          </div>
          <div class="form-group">
            <div class="form-label"><span>Weight w₂</span> <span id="np-w2-val" class="range-val">-1.2</span></div>
            <input type="range" id="np-w2" class="range-input" min="-3" max="3" step="0.1" value="-1.2">
          </div>
          <div class="form-group">
            <div class="form-label"><span>Weight w₃</span> <span id="np-w3-val" class="range-val">0.5</span></div>
            <input type="range" id="np-w3" class="range-input" min="-3" max="3" step="0.1" value="0.5">
          </div>

          <!-- Bias -->
          <div style="font-size: 0.825rem; font-weight: 600; color: var(--color-accent-amber); margin-top: 0.5rem;">Neuron Bias Offset (b)</div>
          <div class="form-group">
            <div class="form-label"><span>Bias b</span> <span id="np-b-val" class="range-val">-0.2</span></div>
            <input type="range" id="np-b" class="range-input" min="-3" max="3" step="0.1" value="-0.2">
          </div>
        </div>

        <!-- Viewport Column -->
        <div class="playground-viewport">
          <svg id="neuron-svg" class="playground-canvas" viewBox="0 0 700 420" preserveAspectRatio="xMidYMid meet">
            <!-- Dynamic SVG elements rendered via update() -->
          </svg>

          <div class="playground-stats-bar">
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Summation (z = Σwᵢxᵢ + b)</span>
              <div id="np-sum-readout" style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700; color: var(--text-main);">0.000</div>
            </div>
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Activated Output a = f(z)</span>
              <div id="np-act-readout" style="font-family: var(--font-mono); font-size: 1.4rem; font-weight: 800; color: var(--color-accent-cyan);">0.000</div>
            </div>
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Neuron Excitation</span>
              <div id="np-status-readout" class="badge badge-cyan" style="font-size: 0.8rem; margin-top: 2px;">Active</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.update();
  },

  bindEvents() {
    const inputs = ['np-x1', 'np-x2', 'np-x3', 'np-w1', 'np-w2', 'np-w3', 'np-b'];
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          document.getElementById(`${id}-val`).textContent = Number(el.value).toFixed(1);
          this.update();
        });
      }
    });

    const actSel = document.getElementById('np-act-select');
    if (actSel) {
      actSel.addEventListener('change', () => this.update());
    }
  },

  update() {
    const x1 = Number(document.getElementById('np-x1').value);
    const x2 = Number(document.getElementById('np-x2').value);
    const x3 = Number(document.getElementById('np-x3').value);

    const w1 = Number(document.getElementById('np-w1').value);
    const w2 = Number(document.getElementById('np-w2').value);
    const w3 = Number(document.getElementById('np-w3').value);

    const b = Number(document.getElementById('np-b').value);
    const act = document.getElementById('np-act-select').value;

    const calcResult = MLForge.calculators.nn.calculateNeuronOutput([x1, x2, x3], [w1, w2, w3], b, act);
    const z = calcResult.z;
    const a = calcResult.output;

    document.getElementById('np-sum-readout').textContent = z.toFixed(4);
    document.getElementById('np-act-readout').textContent = a.toFixed(4);

    const statusEl = document.getElementById('np-status-readout');
    if (a > 0.6) {
      statusEl.className = "badge badge-emerald";
      statusEl.textContent = "Strong Fire";
    } else if (a > 0.05) {
      statusEl.className = "badge badge-cyan";
      statusEl.textContent = "Firing";
    } else {
      statusEl.className = "badge badge-rose";
      statusEl.textContent = "Inhibited (Quiet)";
    }

    this.drawSVG({ x1, x2, x3, w1, w2, w3, b, z, a, act });
  },

  drawSVG(data) {
    const svg = document.getElementById('neuron-svg');
    if (!svg) return;

    const inputCoords = [
      { x: 100, y: 90, val: data.x1, w: data.w1, label: 'x₁' },
      { x: 100, y: 210, val: data.x2, w: data.w2, label: 'x₂' },
      { x: 100, y: 330, val: data.x3, w: data.w3, label: 'x₃' }
    ];

    const somaCoord = { x: 380, y: 210 };
    const outputCoord = { x: 620, y: 210 };

    // Node glow based on output
    const glowIntensity = Math.min(1, Math.max(0.1, (data.a + 1) / 2));
    const somaColor = data.a > 0.5 ? '#10b981' : data.a > 0 ? '#38bdf8' : '#64748b';

    let svgHtml = `
      <defs>
        <radialGradient id="neuronGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${somaColor}" stop-opacity="${glowIntensity}"/>
          <stop offset="100%" stop-color="${somaColor}" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Glow blob behind soma -->
      <circle cx="${somaCoord.x}" cy="${somaCoord.y}" r="90" fill="url(#neuronGlow)"/>
    `;

    // Synaptic connections (Inputs -> Soma)
    inputCoords.forEach(inp => {
      const isPositive = inp.w >= 0;
      const strokeColor = isPositive ? '#38bdf8' : '#f43f5e';
      const strokeWidth = Math.max(1.5, Math.min(8, Math.abs(inp.w) * 2.5));
      const midX = (inp.x + somaCoord.x) / 2;
      const midY = (inp.y + somaCoord.y) / 2;

      svgHtml += `
        <!-- Synapse Line -->
        <line x1="${inp.x}" y1="${inp.y}" x2="${somaCoord.x}" y2="${somaCoord.y}" 
              stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="0.8" stroke-linecap="round"/>
        <!-- Weight Tag Pill -->
        <rect x="${midX - 28}" y="${midY - 12}" width="56" height="24" rx="12" fill="#111827" stroke="${strokeColor}" stroke-width="1"/>
        <text x="${midX}" y="${midY + 4}" font-family="monospace" font-size="11" fill="#f1f5f9" text-anchor="middle" font-weight="600">w=${inp.w.toFixed(1)}</text>
      `;
    });

    // Output Axon (Soma -> Output Node)
    const axonWidth = Math.max(2, Math.min(10, Math.abs(data.a) * 5));
    svgHtml += `
      <line x1="${somaCoord.x}" y1="${somaCoord.y}" x2="${outputCoord.x}" y2="${outputCoord.y}" 
            stroke="${somaColor}" stroke-width="${axonWidth}" stroke-linecap="round"/>
    `;

    // Input Nodes
    inputCoords.forEach(inp => {
      svgHtml += `
        <g>
          <circle cx="${inp.x}" cy="${inp.y}" r="28" fill="#111827" stroke="#38bdf8" stroke-width="2"/>
          <text x="${inp.x}" y="${inp.y - 4}" font-family="sans-serif" font-size="12" font-weight="700" fill="#94a3b8" text-anchor="middle">${inp.label}</text>
          <text x="${inp.x}" y="${inp.y + 12}" font-family="monospace" font-size="12" font-weight="700" fill="#f1f5f9" text-anchor="middle">${inp.val.toFixed(1)}</text>
        </g>
      `;
    });

    // Soma Body (Center Neuron)
    svgHtml += `
      <g>
        <circle cx="${somaCoord.x}" cy="${somaCoord.y}" r="55" fill="#111827" stroke="${somaColor}" stroke-width="3"/>
        <text x="${somaCoord.x}" y="${somaCoord.y - 20}" font-family="sans-serif" font-size="12" font-weight="700" fill="#94a3b8" text-anchor="middle">Σ wᵢxᵢ + b</text>
        <text x="${somaCoord.x}" y="${somaCoord.y + 2}" font-family="monospace" font-size="15" font-weight="700" fill="#38bdf8" text-anchor="middle">z = ${data.z.toFixed(2)}</text>
        <text x="${somaCoord.x}" y="${somaCoord.y + 22}" font-family="sans-serif" font-size="10" fill="#f59e0b" text-anchor="middle">b = ${data.b.toFixed(1)}</text>
        <text x="${somaCoord.x}" y="${somaCoord.y + 36}" font-family="sans-serif" font-size="10" fill="#a855f7" text-anchor="middle">f = ${data.act.toUpperCase()}</text>
      </g>
    `;

    // Output Terminal Node
    svgHtml += `
      <g>
        <circle cx="${outputCoord.x}" cy="${outputCoord.y}" r="34" fill="#111827" stroke="${somaColor}" stroke-width="2.5"/>
        <text x="${outputCoord.x}" y="${outputCoord.y - 6}" font-family="sans-serif" font-size="11" font-weight="700" fill="#94a3b8" text-anchor="middle">Output a</text>
        <text x="${outputCoord.x}" y="${outputCoord.y + 14}" font-family="monospace" font-size="13" font-weight="800" fill="#f1f5f9" text-anchor="middle">${data.a.toFixed(3)}</text>
      </g>
    `;

    svg.innerHTML = svgHtml;
  }
};
