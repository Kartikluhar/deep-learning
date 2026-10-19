/**
 * MLForge Overfitting vs Underfitting Explorer
 * Interactive polynomial curve fitting simulation demonstrating the bias-variance tradeoff.
 */

window.MLForge = window.MLForge || {};
window.MLForge.viz = window.MLForge.viz || {};

MLForge.viz.fitExplorer = {
  degree: 3,
  noise: 0.25,
  points: [],

  initPoints() {
    this.points = [];
    // Fixed deterministic pseudo-random seed for stable demonstration
    const N = 16;
    for (let i = 0; i < N; i++) {
      const x = -2.8 + (5.6 * (i / (N - 1)));
      const trueY = Math.sin(1.2 * x);
      // Pseudo random noise
      const pseudoNoise = (Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
      const nVal = (pseudoNoise - 0.5) * 2 * this.noise;
      this.points.push({ x, y: trueY + nVal, trueY });
    }
  },

  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (this.points.length === 0) this.initPoints();

    container.innerHTML = `
      <div class="playground-container">
        <!-- Controls Column -->
        <div class="playground-controls">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.25rem;">Overfitting vs Underfitting Explorer</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Adjust model capacity to see when a model fails to capture the trend (bias) or memorizes noise (variance).</p>
          </div>

          <div class="form-group">
            <div class="form-label"><span>Model Complexity (Degree)</span> <span id="fit-degree-val" class="range-val">3</span></div>
            <input type="range" id="fit-degree-slider" class="range-input" min="1" max="9" step="1" value="3">
            <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-muted); margin-top: 4px;">
              <span>1 (Linear)</span>
              <span>3 (Optimal)</span>
              <span>9 (High Poly)</span>
            </div>
          </div>

          <div class="form-group">
            <div class="form-label"><span>Dataset Noise Level</span> <span id="fit-noise-val" class="range-val">0.25</span></div>
            <input type="range" id="fit-noise-slider" class="range-input" min="0.05" max="0.6" step="0.05" value="0.25">
          </div>

          <button id="fit-resample-btn" class="btn btn-secondary btn-sm" style="width: 100%;">
            Resample New Noisy Points
          </button>

          <div class="card" style="padding: 1rem; margin-top: 0.5rem; background: var(--bg-app);">
            <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">Diagnostic State</div>
            <div id="fit-diagnosis-badge" class="badge badge-emerald" style="font-size: 0.85rem; margin-bottom: 0.5rem;">Optimal Balance</div>
            <div id="fit-diagnosis-desc" style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
              <!-- Dynamic explanation -->
            </div>
          </div>
        </div>

        <!-- Viewport Column -->
        <div class="playground-viewport">
          <canvas id="fit-canvas" class="playground-canvas" width="700" height="420"></canvas>

          <div class="playground-stats-bar">
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Polynomial Degree</span>
              <div id="fit-degree-readout" style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700; color: var(--text-main);">Degree 3</div>
            </div>
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Train Error (MSE)</span>
              <div id="fit-train-mse" style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: #10b981;">0.041</div>
            </div>
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Generalization Gap</span>
              <div id="fit-gap-readout" style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: #38bdf8;">Low (Healthy)</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.update();
  },

  bindEvents() {
    const degSlider = document.getElementById('fit-degree-slider');
    const noiseSlider = document.getElementById('fit-noise-slider');
    const resampleBtn = document.getElementById('fit-resample-btn');

    if (degSlider) {
      degSlider.addEventListener('input', (e) => {
        this.degree = Number(e.target.value);
        document.getElementById('fit-degree-val').textContent = this.degree;
        this.update();
      });
    }

    if (noiseSlider) {
      noiseSlider.addEventListener('input', (e) => {
        this.noise = Number(e.target.value);
        document.getElementById('fit-noise-val').textContent = this.noise.toFixed(2);
        this.initPoints();
        this.update();
      });
    }

    if (resampleBtn) {
      resampleBtn.addEventListener('click', () => {
        this.initPoints();
        this.update();
      });
    }
  },

  // Simple polynomial least squares regression solver
  fitPolynomial(points, deg) {
    const m = deg + 1;
    const X = [];
    const Y = [];

    // Normal equations: (A^T A) C = A^T Y
    // Matrix size m x m
    const ATA = Array.from({ length: m }, () => Array(m).fill(0));
    const ATY = Array(m).fill(0);

    points.forEach(p => {
      const powers = [];
      for (let j = 0; j < m; j++) powers.push(Math.pow(p.x, j));

      for (let r = 0; r < m; r++) {
        for (let c = 0; c < m; c++) {
          ATA[r][c] += powers[r] * powers[c];
        }
        ATY[r] += powers[r] * p.y;
      }
    });

    // Gaussian elimination with partial pivoting
    for (let i = 0; i < m; i++) {
      let maxEl = Math.abs(ATA[i][i]);
      let maxRow = i;
      for (let k = i + 1; k < m; k++) {
        if (Math.abs(ATA[k][i]) > maxEl) {
          maxEl = Math.abs(ATA[k][i]);
          maxRow = k;
        }
      }
      // Swap rows
      for (let k = i; k < m; k++) {
        const tmp = ATA[maxRow][k];
        ATA[maxRow][k] = ATA[i][k];
        ATA[i][k] = tmp;
      }
      const tmpY = ATY[maxRow];
      ATY[maxRow] = ATY[i];
      ATY[i] = tmpY;

      // Make diagonal 1 and eliminate below
      const pivot = ATA[i][i] || 1e-9;
      for (let k = i + 1; k < m; k++) {
        const factor = ATA[k][i] / pivot;
        for (let j = i; j < m; j++) {
          ATA[k][j] -= factor * ATA[i][j];
        }
        ATY[k] -= factor * ATY[i];
      }
    }

    // Back substitution
    const coeffs = Array(m).fill(0);
    for (let i = m - 1; i >= 0; i--) {
      let sum = ATY[i];
      for (let j = i + 1; j < m; j++) {
        sum -= ATA[i][j] * coeffs[j];
      }
      coeffs[i] = sum / (ATA[i][i] || 1e-9);
    }

    return coeffs;
  },

  predict(coeffs, x) {
    let y = 0;
    for (let i = 0; i < coeffs.length; i++) {
      y += coeffs[i] * Math.pow(x, i);
    }
    return y;
  },

  update() {
    const deg = this.degree;
    const coeffs = this.fitPolynomial(this.points, deg);

    // Compute Train MSE
    let trainLoss = 0;
    this.points.forEach(p => {
      const pred = this.predict(coeffs, p.x);
      trainLoss += Math.pow(p.y - pred, 2);
    });
    trainLoss /= this.points.length;

    document.getElementById('fit-degree-readout').textContent = `Degree ${deg}`;
    document.getElementById('fit-train-mse').textContent = trainLoss.toFixed(4);

    const badge = document.getElementById('fit-diagnosis-badge');
    const desc = document.getElementById('fit-diagnosis-desc');
    const gapEl = document.getElementById('fit-gap-readout');

    if (deg === 1) {
      badge.className = "badge badge-rose";
      badge.textContent = "Underfitting (High Bias)";
      desc.textContent = "The straight line model is too rigid to capture the natural curvature. It has high training error and misses the underlying pattern.";
      gapEl.textContent = "High Underfit Error";
      gapEl.style.color = "var(--color-accent-rose)";
    } else if (deg >= 7) {
      badge.className = "badge badge-amber";
      badge.textContent = "Overfitting (High Variance)";
      desc.textContent = "The model has too many degrees of freedom. It twists wildly between points to memorize the noise, causing catastrophic errors on unseen test inputs.";
      gapEl.textContent = "Severe Overfit Gap";
      gapEl.style.color = "var(--color-accent-amber)";
    } else {
      badge.className = "badge badge-emerald";
      badge.textContent = "Optimal Balance";
      desc.textContent = "The polynomial smoothly captures the true generative curve while filtering out point-level noise. Best generalization expected.";
      gapEl.textContent = "Optimal (Healthy)";
      gapEl.style.color = "#10b981";
    }

    this.drawCanvas(coeffs);
  },

  drawCanvas(coeffs) {
    const canvas = document.getElementById('fit-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const minX = -3.2, maxX = 3.2;
    const minY = -2.2, maxY = 2.2;

    const toPxX = (x) => ((x - minX) / (maxX - minX)) * w;
    const toPxY = (y) => h - ((y - minY) / (maxY - minY)) * h;

    // Grid & Axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.lineWidth = 1;
    for (let x = -3; x <= 3; x += 1) {
      ctx.beginPath();
      ctx.moveTo(toPxX(x), 0);
      ctx.lineTo(toPxX(x), h);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.beginPath();
    ctx.moveTo(0, toPxY(0));
    ctx.lineTo(w, toPxY(0));
    ctx.stroke();

    // 1. Draw Ground Truth function (dashed cyan)
    ctx.beginPath();
    ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 2;
    for (let px = 0; px <= w; px += 2) {
      const x = minX + (px / w) * (maxX - minX);
      const trueY = Math.sin(1.2 * x);
      const py = toPxY(trueY);
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Draw Fitted Model Curve (solid blue or violet)
    ctx.beginPath();
    ctx.strokeStyle = this.degree >= 7 ? "#f59e0b" : this.degree === 1 ? "#f43f5e" : "#38bdf8";
    ctx.lineWidth = 3;
    for (let px = 0; px <= w; px += 2) {
      const x = minX + (px / w) * (maxX - minX);
      const predY = this.predict(coeffs, x);
      // clamp visualization within bounds
      const clampedY = Math.max(-10, Math.min(10, predY));
      const py = toPxY(clampedY);
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 3. Draw Training Data Points
    this.points.forEach(p => {
      const px = toPxX(p.x);
      const py = toPxY(p.y);
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Legend
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#38bdf8";
    ctx.fillText(`— Fitted Model (Degree ${this.degree})`, 20, 25);
    ctx.fillStyle = "rgba(6, 182, 212, 0.7)";
    ctx.fillText("- - True Ground Truth", 210, 25);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("● Training Samples", 380, 25);
  }
};
