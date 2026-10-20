/**
 * MLForge Mathematics Calculators
 * Vector math, matrix operations, norms, descriptive statistics, and analytical derivatives.
 */

window.MLForge = window.MLForge || {};
window.MLForge.calculators = window.MLForge.calculators || {};

MLForge.calculators.math = {
  /**
   * 1. Vector Operations & Angle
   */
  calculateVectorOps(vecA, vecB) {
    if (vecA.length !== vecB.length || vecA.length === 0) {
      throw new Error("Both vectors must have the exact same non-zero dimension.");
    }
    const n = vecA.length;
    const add = [];
    const sub = [];
    let dot = 0;
    let normSqA = 0;
    let normSqB = 0;

    for (let i = 0; i < n; i++) {
      const a = Number(vecA[i]);
      const b = Number(vecB[i]);
      add.push(a + b);
      sub.push(a - b);
      dot += a * b;
      normSqA += a * a;
      normSqB += b * b;
    }

    const normA = Math.sqrt(normSqA);
    const normB = Math.sqrt(normSqB);
    let angleRad = 0;
    let angleDeg = 0;

    if (normA > 0 && normB > 0) {
      const cosTheta = Math.max(-1, Math.min(1, dot / (normA * normB)));
      angleRad = Math.acos(cosTheta);
      angleDeg = (angleRad * 180) / Math.PI;
    }

    const steps = [
      { label: "Step 1: Vector Addition (add matching elements together: \\(\\mathbf{a} + \\mathbf{b}\\))", calc: `[${add.map(v => v.toFixed(3)).join(", ")}]` },
      { label: "Step 2: Vector Subtraction (subtract matching elements: \\(\\mathbf{a} - \\mathbf{b}\\))", calc: `[${sub.map(v => v.toFixed(3)).join(", ")}]` },
      { label: "Step 3: Vector Dot Product (multiply matching pairs and sum them up: \\(\\mathbf{a} \\cdot \\mathbf{b}\\))", calc: `<strong>${dot.toFixed(4)}</strong>` },
      { label: "Step 4: Angle between vectors (directional separation: \\(\\theta\\))", calc: normA > 0 && normB > 0 ? `<strong>${angleDeg.toFixed(2)}^\\circ</strong> (${angleRad.toFixed(4)} radians)` : "Undefined for zero vector" }
    ];

    return { add, sub, dot, normA, normB, angleDeg, steps };
  },

  /**
   * 2. Matrix Multiplication
   */
  multiplyMatrices(matA, matB) {
    // matA: rowsA x colsA, matB: rowsB x colsB
    const rowsA = matA.length;
    const colsA = matA[0].length;
    const rowsB = matB.length;
    const colsB = matB[0].length;

    if (colsA !== rowsB) {
      throw new Error(`Dimension mismatch: Matrix A columns (${colsA}) must match Matrix B rows (${rowsB}).`);
    }

    const result = [];
    for (let i = 0; i < rowsA; i++) {
      result[i] = [];
      for (let j = 0; j < colsB; j++) {
        let sum = 0;
        for (let k = 0; k < colsA; k++) {
          sum += Number(matA[i][k]) * Number(matB[k][j]);
        }
        result[i][j] = sum;
      }
    }

    const steps = [
      { label: "Step 1: Dimension Check (Columns in A must equal Rows in B)", calc: `(${rowsA} × ${colsA}) × (${rowsB} × ${colsB}) → Output Shape: <strong>${rowsA} × ${colsB}</strong>` },
      { label: "Step 2: Result Matrix (each item is the dot product of a Row from A and a Column from B)", calc: result.map(row => `[ ${row.map(v => v.toFixed(3)).join(", ")} ]`).join("<br>") }
    ];

    return { result, steps };
  },

  /**
   * 3. Matrix Determinant (2x2 and 3x3)
   */
  calculateDeterminant(mat) {
    const n = mat.length;
    if (!mat.every(row => row.length === n)) {
      throw new Error("Determinant is only defined for square matrices (NxN).");
    }

    let det = 0;
    const steps = [];

    if (n === 2) {
      const a = Number(mat[0][0]), b = Number(mat[0][1]);
      const c = Number(mat[1][0]), d = Number(mat[1][1]);
      det = (a * d) - (b * c);
      steps.push({
        label: "2x2 Determinant: (ad - bc, area scaling factor)",
        calc: `(${a} × ${d}) - (${b} × ${c}) = <strong>${det.toFixed(4)}</strong>`
      });
    } else if (n === 3) {
      const a = Number(mat[0][0]), b = Number(mat[0][1]), c = Number(mat[0][2]);
      const d = Number(mat[1][0]), e = Number(mat[1][1]), f = Number(mat[1][2]);
      const g = Number(mat[2][0]), h = Number(mat[2][1]), i = Number(mat[2][2]);
      det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
      steps.push({
        label: "3x3 Determinant Expansion: volume scaling factor",
        calc: `${a}(${e}×${i} - ${f}×${h}) - ${b}(${d}×${i} - ${f}×${g}) + ${c}(${d}×${h} - ${e}×${g}) = <strong>${det.toFixed(4)}</strong>`
      });
    } else {
      throw new Error("Direct determinant calculator currently supports 2x2 and 3x3 matrices.");
    }

    return { det, steps };
  },

  /**
   * 4. Vector Norms (L1, L2, Linf)
   */
  calculateNorms(vec) {
    if (!Array.isArray(vec) || vec.length === 0) {
      throw new Error("Vector cannot be empty.");
    }
    const nums = vec.map(Number);
    let l1 = 0;
    let sumSq = 0;
    let lInf = 0;

    nums.forEach(x => {
      const absX = Math.abs(x);
      l1 += absX;
      sumSq += absX * absX;
      if (absX > lInf) lInf = absX;
    });

    const l2 = Math.sqrt(sumSq);
    const steps = [
      { label: "L1 Norm (Manhattan): sum of absolute values (shrinks weak weights to 0 in Lasso: \\(\\|\\mathbf{x}\\|_1\\))", calc: `<strong>${l1.toFixed(4)}</strong>` },
      { label: "L2 Norm (Euclidean): straight-line length (smoothly shrinks large weights in Ridge: \\(\\|\\mathbf{x}\\|_2\\))", calc: `<strong>${l2.toFixed(4)}</strong>` },
      { label: "L∞ Norm (Maximum): greatest single absolute element value (\\(\\|\\mathbf{x}\\|_\\infty\\))", calc: `<strong>${lInf.toFixed(4)}</strong>` }
    ];

    return { l1, l2, lInf, steps };
  },

  /**
   * 5. Descriptive Statistics
   */
  calculateStatistics(values) {
    if (!Array.isArray(values) || values.length === 0) {
      throw new Error("Please provide at least one number.");
    }
    const nums = values.map(Number).filter(Number.isFinite).sort((a, b) => a - b);
    const n = nums.length;
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / n;

    // Median
    let median = 0;
    if (n % 2 === 0) {
      median = (nums[n / 2 - 1] + nums[n / 2]) / 2;
    } else {
      median = nums[Math.floor(n / 2)];
    }

    // Variance & Std
    const sumSqDiff = nums.reduce((acc, x) => acc + Math.pow(x - mean, 2), 0);
    const popVariance = sumSqDiff / n;
    const sampleVariance = n > 1 ? sumSqDiff / (n - 1) : 0;
    const sampleStd = Math.sqrt(sampleVariance);

    // Mode
    const freq = {};
    let maxFreq = 0;
    nums.forEach(x => {
      freq[x] = (freq[x] || 0) + 1;
      if (freq[x] > maxFreq) maxFreq = freq[x];
    });
    const modes = Object.keys(freq).filter(k => freq[k] === maxFreq && maxFreq > 1).map(Number);

    const steps = [
      { label: "Average (Mean μ): balance point of all numbers", calc: `\\(\\frac{${sum.toFixed(3)}}{${n}} =\\) <strong>${mean.toFixed(4)}</strong>` },
      { label: "Median: middle number when sorted in order", calc: `<strong>${median.toFixed(4)}</strong>` },
      { label: "Sample Variance (s²): average squared distance from the average", calc: `<strong>${sampleVariance.toFixed(4)}</strong>` },
      { label: "Sample Standard Deviation (s): typical distance of values from the average", calc: `<strong>${sampleStd.toFixed(4)}</strong>` },
      { label: "Mode: most repeated number in the list", calc: modes.length > 0 ? `<strong>${modes.join(", ")}</strong> (appears ${maxFreq} times)` : "No unique repeated mode" }
    ];

    return { mean, median, sampleVariance, sampleStd, modes, steps };
  },

  /**
   * 6. Analytical Function & Derivative Evaluator
   */
  evaluateDerivative(functionType, xVal) {
    const x = Number(xVal);
    if (!Number.isFinite(x)) throw new Error("Input x must be a finite number.");

    let fx = 0;
    let dfx = 0;
    let formulaStr = "";
    let derivFormulaStr = "";

    switch (functionType) {
      case 'x^2':
        fx = x * x;
        dfx = 2 * x;
        formulaStr = "f(x) = x^2";
        derivFormulaStr = "f'(x) = 2x";
        break;
      case 'x^3':
        fx = Math.pow(x, 3);
        dfx = 3 * x * x;
        formulaStr = "f(x) = x^3";
        derivFormulaStr = "f'(x) = 3x^2";
        break;
      case 'exp':
        fx = Math.exp(x);
        dfx = Math.exp(x);
        formulaStr = "f(x) = e^x";
        derivFormulaStr = "f'(x) = e^x";
        break;
      case 'ln':
        if (x <= 0) throw new Error("Natural logarithm is only defined for x > 0.");
        fx = Math.log(x);
        dfx = 1 / x;
        formulaStr = "f(x) = \\ln(x)";
        derivFormulaStr = "f'(x) = \\frac{1}{x}";
        break;
      case 'sigmoid':
        fx = 1 / (1 + Math.exp(-x));
        dfx = fx * (1 - fx);
        formulaStr = "f(x) = \\sigma(x) = \\frac{1}{1 + e^{-x}}";
        derivFormulaStr = "f'(x) = \\sigma(x)(1 - \\sigma(x))";
        break;
      case 'tanh':
        fx = Math.tanh(x);
        dfx = 1 - fx * fx;
        formulaStr = "f(x) = \\tanh(x)";
        derivFormulaStr = "f'(x) = 1 - \\tanh^2(x)";
        break;
      case 'relu':
        fx = Math.max(0, x);
        dfx = x > 0 ? 1 : 0;
        formulaStr = "f(x) = \\max(0, x)";
        derivFormulaStr = "f'(x) = \\begin{cases} 1 & x > 0 \\\\ 0 & x \\le 0 \\end{cases}";
        break;
      default:
        throw new Error("Unsupported function type.");
    }

    const steps = [
      { label: "Original function value: \\(f(x)\\)", calc: `\\(${formulaStr}\\) \\(\\implies f(${x}) = \\) <strong>${fx.toFixed(5)}</strong>` },
      { label: "Instantaneous Slope / Derivative: \\(f'(x)\\)", calc: `\\(${derivFormulaStr}\\) \\(\\implies f'(${x}) = \\) <strong>${dfx.toFixed(5)}</strong>` }
    ];

    return { fx, dfx, steps };
  }
};
