/**
 * MLForge CNN Kernel & Output Shape Interactive Visualizer
 * Real-time 2D matrix receptive field sliding animation, padding simulation, and output dimension mapping.
 */

window.MLForge = window.MLForge || {};
window.MLForge.viz = window.MLForge.viz || {};

MLForge.viz.cnn = {
  inDim: 5,
  kernelDim: 3,
  stride: 1,
  padding: 0,
  currentStepIndex: 0,

  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="playground-container">
        <!-- Controls Column -->
        <div class="playground-controls">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.25rem;">CNN Convolution Visualizer</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Watch how a small filter (kernel) slides step by step across an image grid to calculate the new output map.</p>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Input Size (W×H)</label>
              <select id="cnn-input-dim" class="form-select">
                <option value="5" selected>5 × 5</option>
                <option value="6">6 × 6</option>
                <option value="7">7 × 7</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Filter Kernel (K×K)</label>
              <select id="cnn-kernel-dim" class="form-select">
                <option value="2">2 × 2</option>
                <option value="3" selected>3 × 3</option>
              </select>
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Stride (Step Size S)</label>
              <select id="cnn-stride" class="form-select">
                <option value="1" selected>Stride = 1 (move 1 pixel)</option>
                <option value="2">Stride = 2 (move 2 pixels)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Padding (Border P)</label>
              <select id="cnn-padding" class="form-select">
                <option value="0" selected>P = 0 (No border - shrinks size)</option>
                <option value="1">P = 1 (Zero border - keeps size)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <div class="form-label"><span>Sliding Kernel Step</span> <span id="cnn-step-val" class="range-val">0</span></div>
            <input type="range" id="cnn-step-slider" class="range-input" min="0" max="8" step="1" value="0">
          </div>

          <div style="display: flex; gap: 0.5rem;">
            <button id="cnn-prev-btn" class="btn btn-secondary btn-sm" style="flex: 1;">◀ Prev Step</button>
            <button id="cnn-next-btn" class="btn btn-primary btn-sm" style="flex: 1;">Next Step ▶</button>
          </div>

          <div class="card" style="padding: 1rem; margin-top: 0.5rem; background: var(--bg-app);">
            <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent-cyan); margin-bottom: 0.5rem;">Output Grid Size Formula</div>
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-main);">
              Output Size = ⌊(Width - Kernel + 2×Padding) / Stride⌋ + 1
            </div>
            <div id="cnn-equation-eval" style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.35rem;">
              <!-- Equation evaluated dynamically -->
            </div>
          </div>
        </div>

        <!-- Viewport Column -->
        <div class="playground-viewport" style="align-items: center; justify-content: center;">
          <div class="cnn-matrices-wrapper">
            <!-- Input Feature Map -->
            <div style="text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">
                Input Image / Grid (<span id="cnn-in-label">5×5</span>)
              </div>
              <div id="cnn-input-grid" class="matrix-grid-view"></div>
            </div>

            <!-- Operator Arrow -->
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.35rem;">
              <span class="badge badge-violet" style="font-family: var(--font-mono);">* (Conv2D Filter)</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>

            <!-- Output Feature Map -->
            <div style="text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent-cyan); margin-bottom: 0.5rem;">
                Output Map (<span id="cnn-out-label">3×3</span>)
              </div>
              <div id="cnn-output-grid" class="matrix-grid-view"></div>
            </div>
          </div>

          <div class="playground-stats-bar" style="width: 100%;">
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Filter Position</span>
              <div id="cnn-pos-readout" style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 700; color: var(--text-main);">Row 0, Col 0</div>
            </div>
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Looking At Window</span>
              <div id="cnn-rf-readout" style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 800; color: #38bdf8;">[0..2, 0..2]</div>
            </div>
            <div>
              <span style="font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase;">Writing To Cell</span>
              <div id="cnn-cell-readout" style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 800; color: #10b981;">(0, 0)</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.update();
  },

  bindEvents() {
    const inDimSel = document.getElementById('cnn-input-dim');
    const kernelDimSel = document.getElementById('cnn-kernel-dim');
    const strideSel = document.getElementById('cnn-stride');
    const padSel = document.getElementById('cnn-padding');
    const slider = document.getElementById('cnn-step-slider');
    const prevBtn = document.getElementById('cnn-prev-btn');
    const nextBtn = document.getElementById('cnn-next-btn');

    const onChange = () => {
      this.inDim = Number(inDimSel.value);
      this.kernelDim = Number(kernelDimSel.value);
      this.stride = Number(strideSel.value);
      this.padding = Number(padSel.value);
      this.currentStepIndex = 0;
      this.update();
    };

    if (inDimSel) inDimSel.addEventListener('change', onChange);
    if (kernelDimSel) kernelDimSel.addEventListener('change', onChange);
    if (strideSel) strideSel.addEventListener('change', onChange);
    if (padSel) padSel.addEventListener('change', onChange);

    if (slider) {
      slider.addEventListener('input', (e) => {
        this.currentStepIndex = Number(e.target.value);
        this.update();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentStepIndex > 0) {
          this.currentStepIndex--;
          this.update();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const outDim = Math.floor((this.inDim - this.kernelDim + 2 * this.padding) / this.stride) + 1;
        const totalSteps = outDim * outDim;
        if (this.currentStepIndex < totalSteps - 1) {
          this.currentStepIndex++;
          this.update();
        }
      });
    }
  },

  update() {
    const W = this.inDim;
    const K = this.kernelDim;
    const S = this.stride;
    const P = this.padding;

    const outDim = Math.floor((W - K + 2 * P) / S) + 1;
    const totalSteps = outDim * outDim;

    // Update slider bounds
    const slider = document.getElementById('cnn-step-slider');
    if (slider) {
      slider.max = Math.max(0, totalSteps - 1);
      slider.value = this.currentStepIndex;
      document.getElementById('cnn-step-val').textContent = `${this.currentStepIndex + 1} / ${totalSteps}`;
    }

    // Equation display
    document.getElementById('cnn-equation-eval').textContent =
      `⌊(${W} - ${K} + 2×${P}) / ${S}⌋ + 1 = ⌊${W - K + 2*P} / ${S}⌋ + 1 = ${outDim} (Output: ${outDim}×${outDim})`;

    document.getElementById('cnn-in-label').textContent = `${W}×${W}${P > 0 ? ' (+pad ' + (W + 2*P) + 'x' + (W + 2*P) + ')' : ''}`;
    document.getElementById('cnn-out-label').textContent = `${outDim}×${outDim}`;

    // Compute active output row and col from current step index
    const outRow = Math.floor(this.currentStepIndex / outDim);
    const outCol = this.currentStepIndex % outDim;

    // Compute input active window (in coordinates including padding)
    const inStartRow = outRow * S;
    const inEndRow = inStartRow + K - 1;
    const inStartCol = outCol * S;
    const inEndCol = inStartCol + K - 1;

    document.getElementById('cnn-pos-readout').textContent = `Out Pos: (${outRow}, ${outCol})`;
    document.getElementById('cnn-rf-readout').textContent = `Rows [${inStartRow}..${inEndRow}], Cols [${inStartCol}..${inEndCol}]`;
    document.getElementById('cnn-cell-readout').textContent = `Cell ${this.currentStepIndex + 1} of ${totalSteps}`;

    // Render Input Matrix
    const paddedDim = W + 2 * P;
    const inGrid = document.getElementById('cnn-input-grid');
    inGrid.style.gridTemplateColumns = `repeat(${paddedDim}, var(--matrix-cell-size, 32px))`;
    inGrid.style.gridTemplateRows = `repeat(${paddedDim}, var(--matrix-cell-size, 32px))`;

    let inHtml = "";
    for (let r = 0; r < paddedDim; r++) {
      for (let c = 0; c < paddedDim; c++) {
        const isPaddingCell = (r < P || r >= paddedDim - P || c < P || c >= paddedDim - P);
        const isInKernel = (r >= inStartRow && r <= inEndRow && c >= inStartCol && c <= inEndCol);
        
        let cellClass = "matrix-cell";
        if (isInKernel) cellClass += " kernel-active";
        
        const cellVal = isPaddingCell ? "0" : `${(r * 3 + c * 2) % 9}`;
        inHtml += `<div class="${cellClass}" title="Pos: (${r}, ${c})">${cellVal}</div>`;
      }
    }
    inGrid.innerHTML = inHtml;

    // Render Output Matrix
    const outGrid = document.getElementById('cnn-output-grid');
    outGrid.style.gridTemplateColumns = `repeat(${outDim}, var(--matrix-cell-size, 32px))`;
    outGrid.style.gridTemplateRows = `repeat(${outDim}, var(--matrix-cell-size, 32px))`;

    let outHtml = "";
    for (let r = 0; r < outDim; r++) {
      for (let c = 0; c < outDim; c++) {
        const isActive = (r === outRow && c === outCol);
        let cellClass = "matrix-cell";
        if (isActive) cellClass += " output-active";
        outHtml += `<div class="${cellClass}">${isActive ? '★' : '·'}</div>`;
      }
    }
    outGrid.innerHTML = outHtml;
  }
};
