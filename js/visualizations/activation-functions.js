/**
 * MLForge Activation Function Interactive Explorer
 * Interactive Canvas 2D graph with function curves, derivative overlays, and coordinate scrubbers.
 */

window.MLForge = window.MLForge || {};
window.MLForge.viz = window.MLForge.viz || {};

MLForge.viz.activation = {
  activeFn: 'sigmoid',
  showDerivative: true,
  currentX: 1.0,

  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="playground-container">
        <!-- Controls Column -->
        <div class="playground-controls">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.25rem;">Activation Functions Explorer</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Compare mathematical non-linearities and inspect their derivatives for gradient flow.</p>
          </div>

          <div class="form-group">
            <label class="form-label">Function</label>
            <select id="af-fn-select" class="form-select">
              <option value="sigmoid" selected>Sigmoid: σ(x) = 1 / (1 + e⁻ˣ)</option>
              <option value="relu">ReLU: max(0, x)</option>
              <option value="tanh">Tanh: (eˣ - e⁻ˣ) / (eˣ + e⁻ˣ)</option>
              <option value="leaky_relu">Leaky ReLU: max(0.01x, x)</option>
              <option value="gelu">GELU: Gaussian Error Linear Unit</option>
              <option value="swish">Swish / SiLU: x · σ(x)</option>
            </select>
          </div>

          <div class="form-group">
            <div class="form-label"><span>Input Probe Point (x)</span> <span id="af-x-val" class="range-val">1.0</span></div>
            <input type="range" id="af-x-slider" class="range-input" min="-5" max="5" step="0.1" value="1.0">
          </div>

          <div style="display: flex; align-items: center; gap: 0.5rem; margin: 0.5rem 0;">
            <input type="checkbox" id="af-show-deriv" checked style="accent-color: var(--color-primary); width: 16px; height: 16px;">
            <label for="af-show-deriv" style="font-size: 0.85rem; color: var(--text-secondary); cursor: pointer;">Show Derivative f'(x) Curve</label>
          </div>

          <div class="card" style="padding: 1rem; margin-top: 0.5rem; background: var(--bg-app);">
            <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">Function Properties</div>
            <div id="af-desc-box" style="font-size: 0.825rem; color: var(--text-secondary); line-height: 1.5;">
              <!-- Dynamic description -->
            </div>
          </div>
        </div>

        <!-- Viewport Column -->
        <div class="playground-viewport">
          <canvas id="activation-canvas" class="playground-canvas" width="700" height="420"></canvas>

          <div class="playground-stats-bar">
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Probe Point</span>
              <div id="af-point-readout" style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 700; color: var(--text-main);">x = 1.00</div>
            </div>
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Output f(x)</span>
              <div id="af-fx-readout" style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: #38bdf8;">0.7311</div>
            </div>
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Gradient f'(x)</span>
              <div id="af-dfx-readout" style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: #a855f7;">0.1966</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.update();
  },

  bindEvents() {
    const sel = document.getElementById('af-fn-select');
    const slider = document.getElementById('af-x-slider');
    const chk = document.getElementById('af-show-deriv');
    const canvas = document.getElementById('activation-canvas');

    if (sel) {
      sel.addEventListener('change', (e) => {
        this.activeFn = e.target.value;
        this.update();
      });
    }

    if (slider) {
      slider.addEventListener('input', (e) => {
        this.currentX = Number(e.target.value);
        document.getElementById('af-x-val').textContent = this.currentX.toFixed(1);
        this.update();
      });
    }

    if (chk) {
      chk.addEventListener('change', (e) => {
        this.showDerivative = e.target.checked;
        this.update();
      });
    }

    if (canvas) {
      // Hover scrubbing on canvas
      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const normX = (mouseX / rect.width) * 12 - 6; // range [-6, 6]
        this.currentX = Math.max(-5, Math.min(5, normX));
        if (slider) slider.value = this.currentX;
        document.getElementById('af-x-val').textContent = this.currentX.toFixed(1);
        this.update();
      });
    }
  },

  evaluate(fn, x) {
    let y = 0, dy = 0;
    if (fn === 'sigmoid') {
      y = 1 / (1 + Math.exp(-x));
      dy = y * (1 - y);
    } else if (fn === 'relu') {
      y = Math.max(0, x);
      dy = x > 0 ? 1 : 0;
    } else if (fn === 'tanh') {
      y = Math.tanh(x);
      dy = 1 - y * y;
    } else if (fn === 'leaky_relu') {
      y = x > 0 ? x : 0.05 * x;
      dy = x > 0 ? 1 : 0.05;
    } else if (fn === 'gelu') {
      const k = Math.sqrt(2 / Math.PI);
      const inner = k * (x + 0.044715 * Math.pow(x, 3));
      y = 0.5 * x * (1 + Math.tanh(inner));
      dy = (y / (x || 1e-5)); // approx
    } else if (fn === 'swish') {
      const sig = 1 / (1 + Math.exp(-x));
      y = x * sig;
      dy = sig + x * sig * (1 - sig);
    }
    return { y, dy };
  },

  update() {
    const fn = this.activeFn;
    const x = this.currentX;
    const { y, dy } = this.evaluate(fn, x);

    document.getElementById('af-point-readout').textContent = `x = ${x.toFixed(2)}`;
    document.getElementById('af-fx-readout').textContent = y.toFixed(4);
    document.getElementById('af-dfx-readout').textContent = dy.toFixed(4);

    const descBox = document.getElementById('af-desc-box');
    const descriptions = {
      sigmoid: "<strong>Range: (0, 1)</strong>. Used in binary classification output. Derivative peaks at 0.25; causes vanishing gradients when stacked deeply.",
      relu: "<strong>Range: [0, ∞)</strong>. Default for hidden layers. Gradient is 1 for x>0, solving vanishing gradients. Vulnerable to 'Dying ReLU' for negative inputs.",
      tanh: "<strong>Range: (-1, 1)</strong>. Zero-centered, which aids optimization dynamics. Vanishes gradients for |x| > 3.",
      leaky_relu: "<strong>Range: (-∞, ∞)</strong>. Introduces a small positive slope (α = 0.01) for negative inputs to prevent dead neurons.",
      gelu: "<strong>Range: (~ -0.17, ∞)</strong>. Smooth probabilistic gating activation used across modern Transformers (BERT, GPT-3, ViT).",
      swish: "<strong>Range: (~ -0.28, ∞)</strong>. Discovered via automated neural architecture search by Google. Smooth, non-monotonic curve."
    };
    if (descBox) descBox.innerHTML = descriptions[fn] || "";

    this.drawCanvas();
  },

  drawCanvas() {
    const canvas = document.getElementById('activation-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Coordinate system: X from -6 to +6, Y from -2.5 to +2.5
    const minX = -6, maxX = 6;
    const minY = -2.2, maxY = 2.2;

    const toPxX = (x) => ((x - minX) / (maxX - minX)) * w;
    const toPxY = (y) => h - ((y - minY) / (maxY - minY)) * h;

    // Grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.lineWidth = 1;

    for (let x = -5; x <= 5; x += 1) {
      const px = toPxX(x);
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, h);
      ctx.stroke();
    }

    for (let y = -2; y <= 2; y += 1) {
      const py = toPxY(y);
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(w, py);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1.5;
    // X Axis (y = 0)
    ctx.beginPath();
    ctx.moveTo(0, toPxY(0));
    ctx.lineTo(w, toPxY(0));
    ctx.stroke();

    // Y Axis (x = 0)
    ctx.beginPath();
    ctx.moveTo(toPxX(0), 0);
    ctx.lineTo(toPxX(0), h);
    ctx.stroke();

    // Draw Function Curve f(x)
    ctx.beginPath();
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 3;
    for (let px = 0; px <= w; px += 2) {
      const x = minX + (px / w) * (maxX - minX);
      const { y } = this.evaluate(this.activeFn, x);
      const py = toPxY(y);
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Draw Derivative Curve f'(x) if toggled
    if (this.showDerivative) {
      ctx.beginPath();
      ctx.strokeStyle = "#a855f7";
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 2;
      for (let px = 0; px <= w; px += 2) {
        const x = minX + (px / w) * (maxX - minX);
        const { dy } = this.evaluate(this.activeFn, x);
        const py = toPxY(dy);
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Probe Point Indicator
    const probeX = this.currentX;
    const { y: probeY, dy: probeDY } = this.evaluate(this.activeFn, probeX);
    const ppx = toPxX(probeX);
    const ppy = toPxY(probeY);

    // Vertical dashed probe line
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1;
    ctx.moveTo(ppx, 0);
    ctx.lineTo(ppx, h);
    ctx.stroke();
    ctx.setLineDash([]);

    // Circle at f(x)
    ctx.beginPath();
    ctx.arc(ppx, ppy, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#38bdf8";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Circle at f'(x)
    if (this.showDerivative) {
      const ppdy = toPxY(probeDY);
      ctx.beginPath();
      ctx.arc(ppx, ppdy, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#a855f7";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Legend in top-left
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#38bdf8";
    ctx.fillText("— f(x) Activation", 20, 25);
    if (this.showDerivative) {
      ctx.fillStyle = "#a855f7";
      ctx.fillText("- - f'(x) Derivative", 150, 25);
    }
  }
};
