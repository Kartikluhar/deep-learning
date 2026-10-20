/**
 * MLForge Gradient Descent Interactive Playground
 * Interactive 2D loss curve with live optimization stepping, momentum, and divergence alerts.
 */

window.MLForge = window.MLForge || {};
window.MLForge.viz = window.MLForge.viz || {};

MLForge.viz.gradientDescent = {
  landscape: 'quadratic', // 'quadratic' | 'double_well'
  lr: 0.15,
  currentX: 2.5,
  initialX: 2.5,
  history: [],
  animTimer: null,
  isDiverged: false,

  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="playground-container">
        <!-- Controls Column -->
        <div class="playground-controls">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.25rem;">Gradient Descent Optimizer</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Watch the model take steps downhill to reduce its error. Adjust the step size (learning rate) to see smooth learning or wild bouncing.</p>
          </div>

          <div class="form-group">
            <label class="form-label">Error Valley Shape (Loss Landscape)</label>
            <select id="gd-fn-select" class="form-select">
              <option value="quadratic" selected>Smooth Bowl (Convex: single lowest point)</option>
              <option value="double_well">Two Valleys (Non-convex: local vs global minimum)</option>
            </select>
          </div>

          <div class="form-group">
            <div class="form-label"><span>Learning Rate / Step Size (η)</span> <span id="gd-lr-val" class="range-val">0.15</span></div>
            <input type="range" id="gd-lr-slider" class="range-input" min="0.01" max="1.3" step="0.02" value="0.15">
            <span class="input-hint">Setting η &gt; 1.0 makes steps so large that the model overshoots and error explodes.</span>
          </div>

          <div class="form-group">
            <div class="form-label"><span>Starting Position θ₀</span> <span id="gd-x0-val" class="range-val">2.5</span></div>
            <input type="range" id="gd-x0-slider" class="range-input" min="-3" max="3" step="0.1" value="2.5">
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
            <button id="gd-step-btn" class="btn btn-secondary btn-sm" style="flex: 1;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg> Take 1 Step
            </button>
            <button id="gd-auto-btn" class="btn btn-primary btn-sm" style="flex: 1;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Auto Run
            </button>
            <button id="gd-reset-btn" class="btn btn-ghost btn-sm" style="width: 100%; border: 1px solid var(--border-subtle);">
              Reset Position
            </button>
          </div>

          <div id="gd-alert-box" style="display: none; padding: 0.75rem; border-radius: var(--radius-md); background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.3); color: var(--color-accent-rose); font-size: 0.8rem; line-height: 1.4;">
            ⚠️ <strong>Model Jumped Too Far! (Divergence)</strong> The learning rate is too large. Each step overshot the bottom of the valley, causing the error to explode into huge numbers. Lower η and click reset.
          </div>
        </div>

        <!-- Viewport Column -->
        <div class="playground-viewport">
          <canvas id="gd-canvas" class="playground-canvas" width="700" height="420"></canvas>

          <div class="playground-stats-bar">
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Iteration</span>
              <div id="gd-iter-readout" style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700; color: var(--text-main);">0</div>
            </div>
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Current θ</span>
              <div id="gd-theta-readout" style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: #38bdf8;">2.5000</div>
            </div>
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Loss J(θ)</span>
              <div id="gd-loss-readout" style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: #f59e0b;">3.1250</div>
            </div>
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Gradient ∇J</span>
              <div id="gd-grad-readout" style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: #a855f7;">2.5000</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.reset();
  },

  bindEvents() {
    const fnSel = document.getElementById('gd-fn-select');
    const lrSlider = document.getElementById('gd-lr-slider');
    const x0Slider = document.getElementById('gd-x0-slider');
    const stepBtn = document.getElementById('gd-step-btn');
    const autoBtn = document.getElementById('gd-auto-btn');
    const resetBtn = document.getElementById('gd-reset-btn');

    if (fnSel) {
      fnSel.addEventListener('change', (e) => {
        this.landscape = e.target.value;
        this.reset();
      });
    }

    if (lrSlider) {
      lrSlider.addEventListener('input', (e) => {
        this.lr = Number(e.target.value);
        document.getElementById('gd-lr-val').textContent = this.lr.toFixed(2);
      });
    }

    if (x0Slider) {
      x0Slider.addEventListener('input', (e) => {
        this.initialX = Number(e.target.value);
        document.getElementById('gd-x0-val').textContent = this.initialX.toFixed(1);
        this.reset();
      });
    }

    if (stepBtn) {
      stepBtn.addEventListener('click', () => this.step());
    }

    if (autoBtn) {
      autoBtn.addEventListener('click', () => this.toggleAuto(autoBtn));
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.reset());
    }
  },

  loss(x) {
    if (this.landscape === 'quadratic') {
      return 0.5 * x * x;
    } else {
      // 0.2 x^4 - 0.8 x^2 + 0.1 x + 1.2
      return 0.2 * Math.pow(x, 4) - 0.8 * Math.pow(x, 2) + 0.1 * x + 1.2;
    }
  },

  grad(x) {
    if (this.landscape === 'quadratic') {
      return x;
    } else {
      // derivative: 0.8 x^3 - 1.6 x + 0.1
      return 0.8 * Math.pow(x, 3) - 1.6 * x + 0.1;
    }
  },

  reset() {
    if (this.animTimer) {
      clearInterval(this.animTimer);
      this.animTimer = null;
    }
    const autoBtn = document.getElementById('gd-auto-btn');
    if (autoBtn) {
      autoBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Auto Run`;
    }
    this.currentX = this.initialX;
    this.history = [{ x: this.currentX, y: this.loss(this.currentX) }];
    this.isDiverged = false;
    const alertBox = document.getElementById('gd-alert-box');
    if (alertBox) alertBox.style.display = 'none';

    this.updateReadouts();
    this.drawCanvas();
  },

  step() {
    if (this.isDiverged) return;
    const currentG = this.grad(this.currentX);
    const newX = this.currentX - this.lr * currentG;

    if (Math.abs(newX) > 15 || !Number.isFinite(newX)) {
      this.isDiverged = true;
      if (this.animTimer) {
        clearInterval(this.animTimer);
        this.animTimer = null;
      }
      const alertBox = document.getElementById('gd-alert-box');
      if (alertBox) alertBox.style.display = 'block';
      return;
    }

    this.currentX = newX;
    this.history.push({ x: this.currentX, y: this.loss(this.currentX) });
    this.updateReadouts();
    this.drawCanvas();
  },

  toggleAuto(btn) {
    if (this.animTimer) {
      clearInterval(this.animTimer);
      this.animTimer = null;
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Auto Run`;
    } else {
      if (this.isDiverged) this.reset();
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause`;
      this.animTimer = setInterval(() => {
        if (this.history.length > 50 || this.isDiverged || Math.abs(this.grad(this.currentX)) < 1e-4) {
          clearInterval(this.animTimer);
          this.animTimer = null;
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Auto Run`;
        } else {
          this.step();
        }
      }, 150);
    }
  },

  updateReadouts() {
    const x = this.currentX;
    const l = this.loss(x);
    const g = this.grad(x);
    document.getElementById('gd-iter-readout').textContent = this.history.length - 1;
    document.getElementById('gd-theta-readout').textContent = x.toFixed(4);
    document.getElementById('gd-loss-readout').textContent = l.toFixed(4);
    document.getElementById('gd-grad-readout').textContent = g.toFixed(4);
  },

  drawCanvas() {
    const canvas = document.getElementById('gd-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const minX = -3.5, maxX = 3.5;
    const minY = -0.5, maxY = 5.0;

    const toPxX = (x) => ((x - minX) / (maxX - minX)) * w;
    const toPxY = (y) => h - ((y - minY) / (maxY - minY)) * h;

    // Draw Grid & Axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.lineWidth = 1;
    for (let x = -3; x <= 3; x += 1) {
      ctx.beginPath();
      ctx.moveTo(toPxX(x), 0);
      ctx.lineTo(toPxX(x), h);
      ctx.stroke();
    }

    // X Axis
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.beginPath();
    ctx.moveTo(0, toPxY(0));
    ctx.lineTo(w, toPxY(0));
    ctx.stroke();

    // Draw Loss Function Curve
    ctx.beginPath();
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 3;
    for (let px = 0; px <= w; px += 2) {
      const x = minX + (px / w) * (maxX - minX);
      const y = this.loss(x);
      const py = toPxY(y);
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Draw Historical Steps Trail
    if (this.history.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1.5;
      for (let i = 0; i < this.history.length; i++) {
        const pt = this.history[i];
        const px = toPxX(pt.x);
        const py = toPxY(pt.y);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw past dots
      this.history.forEach((pt, i) => {
        if (i < this.history.length - 1) {
          ctx.beginPath();
          ctx.arc(toPxX(pt.x), toPxY(pt.y), 3.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(245, 158, 11, 0.7)";
          ctx.fill();
        }
      });
    }

    // Draw Current Parameter Ball
    const currX = this.currentX;
    const currY = this.loss(currX);
    const px = toPxX(currX);
    const py = toPxY(currY);

    // Tangent arrow representing negative gradient
    const g = this.grad(currX);
    const tangentLength = Math.max(-50, Math.min(50, -g * 25));
    ctx.beginPath();
    ctx.strokeStyle = "#a855f7";
    ctx.lineWidth = 2.5;
    ctx.moveTo(px, py);
    ctx.lineTo(px + tangentLength, py - (g * tangentLength * 0.2));
    ctx.stroke();

    // The Ball
    ctx.beginPath();
    ctx.arc(px, py, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#10b981";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
};
