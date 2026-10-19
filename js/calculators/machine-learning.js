/**
 * MLForge Machine Learning Calculators
 * Pure math implementations for metrics, Bayesian inference, scaling, distances, and entropy.
 */

window.MLForge = window.MLForge || {};
window.MLForge.calculators = window.MLForge.calculators || {};

MLForge.calculators.ml = {
  /**
   * 1. Regression Metrics (MAE, MSE, RMSE, R²)
   */
  calculateRegressionMetrics(yTrue, yPred) {
    if (!Array.isArray(yTrue) || !Array.isArray(yPred)) {
      throw new Error("Inputs must be arrays of numbers.");
    }
    if (yTrue.length !== yPred.length || yTrue.length === 0) {
      throw new Error("Actual and predicted arrays must be non-empty and equal in length.");
    }
    const n = yTrue.length;
    let sumAbs = 0;
    let sumSq = 0;
    let sumY = 0;

    for (let i = 0; i < n; i++) {
      const yt = Number(yTrue[i]);
      const yp = Number(yPred[i]);
      if (!Number.isFinite(yt) || !Number.isFinite(yp)) {
        throw new Error(`Invalid number at index ${i}: yTrue=${yTrue[i]}, yPred=${yPred[i]}`);
      }
      sumY += yt;
      const diff = yt - yp;
      sumAbs += Math.abs(diff);
      sumSq += diff * diff;
    }

    const meanY = sumY / n;
    let ssTotal = 0;
    for (let i = 0; i < n; i++) {
      const diffMean = Number(yTrue[i]) - meanY;
      ssTotal += diffMean * diffMean;
    }

    const mae = sumAbs / n;
    const mse = sumSq / n;
    const rmse = Math.sqrt(mse);
    let r2 = 0;
    if (ssTotal === 0) {
      r2 = sumSq === 0 ? 1.0 : 0.0;
    } else {
      r2 = 1 - (sumSq / ssTotal);
    }

    const steps = [
      { label: "Mean Absolute Error: \\(\\text{MAE} = \\frac{1}{n} \\sum |y_i - \\hat{y}_i|\\)", calc: `\\(\\frac{${sumAbs.toFixed(4)}}{${n}} =\\) <strong>${mae.toFixed(4)}</strong>` },
      { label: "Mean Squared Error: \\(\\text{MSE} = \\frac{1}{n} \\sum (y_i - \\hat{y}_i)^2\\)", calc: `\\(\\frac{${sumSq.toFixed(4)}}{${n}} =\\) <strong>${mse.toFixed(4)}</strong>` },
      { label: "Root Mean Squared Error: \\(\\text{RMSE} = \\sqrt{\\text{MSE}}\\)", calc: `\\(\\sqrt{${mse.toFixed(4)}} =\\) <strong>${rmse.toFixed(4)}</strong>` },
      {
        label: "R² Coefficient of Determination: \\(R^2 = 1 - \\frac{\\text{SS}_{\\text{res}}}{\\text{SS}_{\\text{tot}}}\\)",
        calc: ssTotal === 0
          ? "Target variance is zero (constant target)."
          : `\\(1 - \\frac{${sumSq.toFixed(4)}}{${ssTotal.toFixed(4)}} =\\) <strong>${r2.toFixed(4)}</strong> ${r2 < 0 ? '<span style="color:var(--color-accent-rose);">(Negative R² indicates model performs worse than horizontal mean line ȳ)</span>' : ''}`
      }
    ];

    return { mae, mse, rmse, r2, steps };
  },

  /**
   * 2. Classification Metrics from Confusion Matrix (TP, TN, FP, FN)
   */
  calculateClassificationMetrics(tp, tn, fp, fn) {
    tp = Math.max(0, Number(tp) || 0);
    tn = Math.max(0, Number(tn) || 0);
    fp = Math.max(0, Number(fp) || 0);
    fn = Math.max(0, Number(fn) || 0);

    const total = tp + tn + fp + fn;
    if (total === 0) {
      throw new Error("Total samples in confusion matrix cannot be zero.");
    }

    // Accuracy
    const accuracy = (tp + tn) / total;

    // Precision = TP / (TP + FP)
    const precision = (tp + fp) > 0 ? tp / (tp + fp) : 0;

    // Recall / Sensitivity = TP / (TP + FN)
    const recall = (tp + fn) > 0 ? tp / (tp + fn) : 0;

    // Specificity = TN / (TN + FP)
    const specificity = (tn + fp) > 0 ? tn / (tn + fp) : 0;

    // F1 Score = 2 * (P * R) / (P + R)
    const f1 = (precision + recall) > 0 ? (2 * precision * recall) / (precision + recall) : 0;

    // Balanced Accuracy = (Sensitivity + Specificity) / 2
    const balancedAcc = (recall + specificity) / 2;

    // False Positive Rate = FP / (FP + TN)
    const fpr = (fp + tn) > 0 ? fp / (fp + tn) : 0;

    // False Negative Rate = FN / (FN + TP)
    const fnr = (fn + tp) > 0 ? fn / (fn + tp) : 0;

    const steps = [
      { label: "Accuracy", calc: `(TP + TN) / Total = (${tp} + ${tn}) / ${total} = <strong>${(accuracy * 100).toFixed(2)}%</strong> (${accuracy.toFixed(4)})` },
      { label: "Precision", calc: `TP / (TP + FP) = ${tp} / (${tp} + ${fp}) = <strong>${(precision * 100).toFixed(2)}%</strong> (${precision.toFixed(4)})` },
      { label: "Recall (Sensitivity)", calc: `TP / (TP + FN) = ${tp} / (${tp} + ${fn}) = <strong>${(recall * 100).toFixed(2)}%</strong> (${recall.toFixed(4)})` },
      { label: "Specificity", calc: `TN / (TN + FP) = ${tn} / (${tn} + ${fp}) = <strong>${(specificity * 100).toFixed(2)}%</strong> (${specificity.toFixed(4)})` },
      { label: "F1-Score", calc: `2 × (Precision × Recall) / (P + R) = <strong>${f1.toFixed(4)}</strong>` },
      { label: "Balanced Accuracy", calc: `(Recall + Specificity) / 2 = <strong>${(balancedAcc * 100).toFixed(2)}%</strong>` },
      { label: "False Positive Rate (FPR)", calc: `FP / (FP + TN) = ${fp} / (${fp} + ${tn}) = <strong>${(fpr * 100).toFixed(2)}%</strong>` },
      { label: "False Negative Rate (FNR)", calc: `FN / (FN + TP) = ${fn} / (${fn} + ${tp}) = <strong>${(fnr * 100).toFixed(2)}%</strong>` }
    ];

    return {
      tp, tn, fp, fn, total,
      accuracy, precision, recall, specificity, f1, balancedAcc, fpr, fnr,
      steps
    };
  },

  /**
   * 3. Bayes' Theorem Calculator
   */
  calculateBayes(priorA, likelihoodBgivenA, evidenceB = null, likelihoodBgivenNotA = null) {
    let pA = Number(priorA);
    let pBgA = Number(likelihoodBgivenA);

    // Support percentage input conversion if > 1
    if (pA > 1) pA /= 100;
    if (pBgA > 1) pBgA /= 100;

    if (pA < 0 || pA > 1 || pBgA < 0 || pBgA > 1) {
      throw new Error("Probabilities must be in the range [0, 1] or [0, 100]%.");
    }

    let pB = 0;
    let pB_calc_formula = "";

    if (evidenceB !== null && evidenceB !== undefined && String(evidenceB).trim() !== "") {
      pB = Number(evidenceB);
      if (pB > 1) pB /= 100;
      if (pB <= 0 || pB > 1) throw new Error("Total Evidence P(B) must be strictly between 0 and 1.");
      pB_calc_formula = `Given P(B) = ${pB.toFixed(4)}`;
    } else if (likelihoodBgivenNotA !== null && likelihoodBgivenNotA !== undefined) {
      let pBgNotA = Number(likelihoodBgivenNotA);
      if (pBgNotA > 1) pBgNotA /= 100;
      const pNotA = 1 - pA;
      pB = (pBgA * pA) + (pBgNotA * pNotA);
      pB_calc_formula = `P(B) = P(B|A)P(A) + P(B|\\neg A)P(\\neg A) = (${pBgA.toFixed(4)} \\times ${pA.toFixed(4)}) + (${pBgNotA.toFixed(4)} \\times ${pNotA.toFixed(4)}) = <strong>${pB.toFixed(4)}</strong>`;
    } else {
      throw new Error("Must provide either Total Evidence P(B) or False Positive Rate P(B|¬A).");
    }

    const posterior = (pBgA * pA) / pB;
    const steps = [
      { label: "1. Marginal Evidence: \\(P(B)\\)", calc: pB_calc_formula },
      { label: "2. Posterior Probability: \\(P(A|B) = \\frac{P(B|A)P(A)}{P(B)}\\)", calc: `\\(\\frac{${pBgA.toFixed(4)} \\times ${pA.toFixed(4)}}{${pB.toFixed(4)}} =\\) <strong>${posterior.toFixed(4)}</strong> (<strong>${(posterior * 100).toFixed(2)}%</strong>)` }
    ];

    return { posterior, pB, steps };
  },

  /**
   * 4. Standardization (Z-Score)
   */
  calculateStandardization(valuesArr) {
    if (!Array.isArray(valuesArr) || valuesArr.length === 0) {
      throw new Error("Please provide a list of numbers.");
    }
    const nums = valuesArr.map(n => Number(n)).filter(n => Number.isFinite(n));
    if (nums.length === 0) throw new Error("No valid finite numbers found.");

    const n = nums.length;
    const mean = nums.reduce((a, b) => a + b, 0) / n;
    const variance = nums.reduce((acc, x) => acc + Math.pow(x - mean, 2), 0) / (n > 1 ? n - 1 : 1);
    const stdDev = Math.sqrt(variance);

    if (stdDev === 0) {
      throw new Error("Standard deviation is zero (all values in array are identical). Cannot divide by zero.");
    }

    const zScores = nums.map(x => (x - mean) / stdDev);
    const steps = [
      { label: "Mean (μ)", calc: `Sum = ${nums.reduce((a,b)=>a+b,0).toFixed(4)} ÷ ${n} = <strong>${mean.toFixed(4)}</strong>` },
      { label: "Sample Std Deviation (s)", calc: `√(Σ(x - μ)² / (n - 1)) = <strong>${stdDev.toFixed(4)}</strong>` },
      { label: "Z-Scores Sample Output", calc: zScores.map((z, i) => `x${i+1} (${nums[i]}) → <strong>${z.toFixed(4)}</strong>`).slice(0, 6).join(", ") + (zScores.length > 6 ? ` ... (+${zScores.length - 6} more)` : '') }
    ];

    return { mean, stdDev, zScores, steps };
  },

  /**
   * 5. Min-Max Normalization
   */
  calculateMinMax(valuesArr, minBound = 0, maxBound = 1) {
    if (!Array.isArray(valuesArr) || valuesArr.length === 0) {
      throw new Error("Please provide numbers to normalize.");
    }
    const nums = valuesArr.map(n => Number(n)).filter(n => Number.isFinite(n));
    if (nums.length === 0) throw new Error("No valid numbers found.");

    const minX = Math.min(...nums);
    const maxX = Math.max(...nums);
    const range = maxX - minX;

    if (range === 0) {
      throw new Error("All numbers are identical (min = max). Normalization range is 0.");
    }

    const targetRange = maxBound - minBound;
    const normalized = nums.map(x => minBound + ((x - minX) / range) * targetRange);

    const steps = [
      { label: "Range Bounds", calc: `Min: ${minX.toFixed(4)}, Max: ${maxX.toFixed(4)}, Target Range: [${minBound}, ${maxBound}]` },
      { label: "Formula", calc: `x' = ${minBound} + [(x - ${minX.toFixed(4)}) / ${range.toFixed(4)}] × ${targetRange}` },
      { label: "Normalized Sample Output", calc: normalized.map((v, i) => `x${i+1}: <strong>${v.toFixed(4)}</strong>`).slice(0, 6).join(", ") }
    ];

    return { minX, maxX, normalized, steps };
  },

  /**
   * 6. Linear Regression OLS from Points
   */
  calculateLinearRegression(points) {
    // points: Array of [x, y]
    if (!Array.isArray(points) || points.length < 2) {
      throw new Error("Linear regression requires at least 2 coordinate points.");
    }

    const n = points.length;
    let sumX = 0, sumY = 0;
    points.forEach(p => {
      sumX += Number(p[0]);
      sumY += Number(p[1]);
    });
    const meanX = sumX / n;
    const meanY = sumY / n;

    let num = 0;
    let den = 0;
    let ssTotalY = 0;

    points.forEach(p => {
      const x = Number(p[0]);
      const y = Number(p[1]);
      const dx = x - meanX;
      const dy = y - meanY;
      num += dx * dy;
      den += dx * dx;
      ssTotalY += dy * dy;
    });

    if (den === 0) {
      throw new Error("All X points have the exact same value. Cannot fit a vertical line.");
    }

    const slope = num / den;
    const intercept = meanY - slope * meanX;

    // R² and correlation
    let ssRes = 0;
    points.forEach(p => {
      const pred = slope * Number(p[0]) + intercept;
      const res = Number(p[1]) - pred;
      ssRes += res * res;
    });
    const r2 = ssTotalY > 0 ? 1 - (ssRes / ssTotalY) : 1;
    const r = Math.sign(slope) * Math.sqrt(Math.max(0, r2));

    const steps = [
      { label: "Means", calc: `x̄ = ${meanX.toFixed(4)}, ȳ = ${meanY.toFixed(4)}` },
      { label: "Slope (w / m)", calc: `Σ(x - x̄)(y - ȳ) / Σ(x - x̄)² = ${num.toFixed(4)} / ${den.toFixed(4)} = <strong>${slope.toFixed(4)}</strong>` },
      { label: "Intercept (b)", calc: `ȳ - m·x̄ = ${meanY.toFixed(4)} - (${slope.toFixed(4)} × ${meanX.toFixed(4)}) = <strong>${intercept.toFixed(4)}</strong>` },
      { label: "Regression Equation", calc: `<strong>ŷ = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}</strong> (R² = ${r2.toFixed(4)}, Pearson r = ${r.toFixed(4)})` }
    ];

    return { slope, intercept, r2, r, steps };
  },

  /**
   * 7. KNN Distance Calculator (Euclidean, Manhattan, Minkowski)
   */
  calculateVectorDistances(vecA, vecB, pValue = 3) {
    if (vecA.length !== vecB.length || vecA.length === 0) {
      throw new Error("Vectors must have equal non-zero dimension.");
    }
    const n = vecA.length;
    let sumSq = 0;
    let sumAbs = 0;
    let sumP = 0;
    const p = Math.max(1, Number(pValue) || 3);

    for (let i = 0; i < n; i++) {
      const a = Number(vecA[i]);
      const b = Number(vecB[i]);
      const diff = Math.abs(a - b);
      sumSq += diff * diff;
      sumAbs += diff;
      sumP += Math.pow(diff, p);
    }

    const euclidean = Math.sqrt(sumSq);
    const manhattan = sumAbs;
    const minkowski = Math.pow(sumP, 1 / p);

    const steps = [
      { label: "Euclidean Distance (L2)", calc: `√(Σ|aᵢ - bᵢ|²) = √(${sumSq.toFixed(4)}) = <strong>${euclidean.toFixed(4)}</strong>` },
      { label: "Manhattan Distance (L1)", calc: `Σ|aᵢ - bᵢ| = <strong>${manhattan.toFixed(4)}</strong>` },
      { label: `Minkowski Distance (p=${p})`, calc: `(Σ|aᵢ - bᵢ|^${p})^(1/${p}) = <strong>${minkowski.toFixed(4)}</strong>` }
    ];

    return { euclidean, manhattan, minkowski, steps };
  },

  /**
   * 8. Cosine Similarity Calculator
   */
  calculateCosineSimilarity(vecA, vecB) {
    if (vecA.length !== vecB.length || vecA.length === 0) {
      throw new Error("Both vectors must have equal non-zero dimensions.");
    }
    let dot = 0;
    let normASq = 0;
    let normBSq = 0;

    for (let i = 0; i < vecA.length; i++) {
      const a = Number(vecA[i]);
      const b = Number(vecB[i]);
      dot += a * b;
      normASq += a * a;
      normBSq += b * b;
    }

    const normA = Math.sqrt(normASq);
    const normB = Math.sqrt(normBSq);

    if (normA === 0 || normB === 0) {
      throw new Error("Cannot calculate cosine similarity for a zero vector (magnitude is 0).");
    }

    const similarity = dot / (normA * normB);
    const distance = 1 - similarity;

    const steps = [
      { label: "Vector Dot Product: \\(\\mathbf{A} \\cdot \\mathbf{B} = \\sum_{i=1}^n A_i B_i\\)", calc: `<strong>${dot.toFixed(4)}</strong>` },
      { label: "Euclidean Norms: \\(\\|\\mathbf{A}\\|, \\|\\mathbf{B}\\|\\)", calc: `\\(\\|\\mathbf{A}\\| = ${normA.toFixed(4)}, \\quad \\|\\mathbf{B}\\| = ${normB.toFixed(4)}\\)` },
      { label: "Cosine Similarity: \\(\\cos(\\theta) = \\frac{\\mathbf{A} \\cdot \\mathbf{B}}{\\|\\mathbf{A}\\| \\|\\mathbf{B}\\|}\\)", calc: `\\(\\frac{${dot.toFixed(4)}}{${normA.toFixed(4)} \\times ${normB.toFixed(4)}} =\\) <strong>${similarity.toFixed(4)}</strong>` },
      { label: "Cosine Distance: \\(1 - \\cos(\\theta)\\)", calc: `\\(1 - ${similarity.toFixed(4)} =\\) <strong>${distance.toFixed(4)}</strong>` }
    ];

    return { similarity, distance, steps };
  },

  /**
   * 9. Entropy and Information Gain Calculator
   */
  calculateEntropyAndGain(parentCounts, childSplits = []) {
    // parentCounts: [countClass1, countClass2, ...]
    const parentTotal = parentCounts.reduce((a, b) => a + Number(b), 0);
    if (parentTotal === 0) throw new Error("Total parent samples must be greater than zero.");

    function computeEntropy(counts) {
      const total = counts.reduce((a, b) => a + Number(b), 0);
      if (total === 0) return 0;
      let ent = 0;
      counts.forEach(c => {
        const count = Number(c);
        if (count > 0) {
          const p = count / total;
          ent -= p * Math.log2(p);
        }
      });
      return ent;
    }

    const parentEntropy = computeEntropy(parentCounts);
    let weightedChildEntropy = 0;
    const splitSteps = [];

    childSplits.forEach((split, idx) => {
      const countTotal = split.reduce((a, b) => a + Number(b), 0);
      const splitEnt = computeEntropy(split);
      const weight = countTotal / parentTotal;
      weightedChildEntropy += weight * splitEnt;
      splitSteps.push(`Branch ${idx+1} (${countTotal}/${parentTotal} samples): Entropy = ${splitEnt.toFixed(4)}`);
    });

    const infoGain = parentEntropy - weightedChildEntropy;

    const steps = [
      { label: "Parent Node Entropy H(S)", calc: `-${parentCounts.map(c => `(${c}/${parentTotal})log₂(${c}/${parentTotal})`).join(" - ")} = <strong>${parentEntropy.toFixed(4)} bits</strong>` }
    ];

    if (childSplits.length > 0) {
      steps.push({ label: "Child Branch Entropies", calc: splitSteps.join("<br>") });
      steps.push({ label: "Information Gain IG(S, A)", calc: `H(S) - Σ ( |Sᵥ| / |S| ) H(Sᵥ) = ${parentEntropy.toFixed(4)} - ${weightedChildEntropy.toFixed(4)} = <strong>${infoGain.toFixed(4)} bits</strong>` });
    }

    return { parentEntropy, infoGain, steps };
  },

  /**
   * 10. Class Imbalance Calculator
   */
  calculateClassImbalance(classCounts) {
    // classCounts: array of counts e.g. [100, 9900]
    const counts = classCounts.map(c => Number(c));
    const total = counts.reduce((a, b) => a + b, 0);
    if (total === 0) throw new Error("Total counts cannot be zero.");

    const minCount = Math.min(...counts);
    const maxCount = Math.max(...counts);
    const ratio = (maxCount / minCount);

    const percentages = counts.map(c => ((c / total) * 100));

    let recommendation = "";
    if (ratio >= 20) {
      recommendation = "Severe imbalance! Standard accuracy will be misleading. Recommended: SMOTE / ADASYN oversampling, Focal Loss, Class Weights, and optimizing PR-AUC instead of ROC-AUC.";
    } else if (ratio >= 5) {
      recommendation = "Moderate imbalance. Recommended: Stratified K-Fold CV, class-weighted loss (e.g. class_weight='balanced'), and evaluating F1-Score.";
    } else {
      recommendation = "Mild or balanced class distribution. Standard cross-validation and accuracy/cross-entropy are suitable.";
    }

    const steps = [
      { label: "Class Distribution", calc: counts.map((c, i) => `Class ${i+1}: <strong>${c.toLocaleString()}</strong> (${percentages[i].toFixed(2)}%)`).join(" | ") },
      { label: "Imbalance Ratio", calc: `<strong>1 : ${ratio.toFixed(1)}</strong>` },
      { label: "Engineering Recommendation", calc: recommendation }
    ];

    return { ratio, percentages, steps };
  }
};
