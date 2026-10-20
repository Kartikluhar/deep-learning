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
      { label: "Step 1: Mean Absolute Error (average distance without minus signs: \\(\\text{MAE}\\))", calc: `\\(\\frac{${sumAbs.toFixed(4)}}{${n}} =\\) <strong>${mae.toFixed(4)}</strong>` },
      { label: "Step 2: Mean Squared Error (squares errors to penalize big mistakes: \\(\\text{MSE}\\))", calc: `\\(\\frac{${sumSq.toFixed(4)}}{${n}} =\\) <strong>${mse.toFixed(4)}</strong>` },
      { label: "Step 3: Root Mean Squared Error (square root back in original data units: \\(\\text{RMSE}\\))", calc: `\\(\\sqrt{${mse.toFixed(4)}} =\\) <strong>${rmse.toFixed(4)}</strong>` },
      {
        label: "Step 4: R² Score (percentage of total variation explained by the model: \\(R^2\\))",
        calc: ssTotal === 0
          ? "Target variation is zero (all actual values are identical)."
          : `\\(1 - \\frac{${sumSq.toFixed(4)}}{${ssTotal.toFixed(4)}} =\\) <strong>${r2.toFixed(4)}</strong> ${r2 < 0 ? '<span style="color:var(--color-accent-rose);">(Negative R² means the model predicts worse than simply guessing the average!)</span>' : ''}`
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
      { label: "Accuracy (overall percentage of correct predictions)", calc: `(TP + TN) / Total = (${tp} + ${tn}) / ${total} = <strong>${(accuracy * 100).toFixed(2)}%</strong> (${accuracy.toFixed(4)})` },
      { label: "Precision (when model predicts positive, how often is it right?)", calc: `TP / (TP + FP) = ${tp} / (${tp} + ${fp}) = <strong>${(precision * 100).toFixed(2)}%</strong> (${precision.toFixed(4)})` },
      { label: "Recall / Sensitivity (of all real positives, how many did it find?)", calc: `TP / (TP + FN) = ${tp} / (${tp} + ${fn}) = <strong>${(recall * 100).toFixed(2)}%</strong> (${recall.toFixed(4)})` },
      { label: "Specificity (of all real negatives, how many did it identify correctly?)", calc: `TN / (TN + FP) = ${tn} / (${tn} + ${fp}) = <strong>${(specificity * 100).toFixed(2)}%</strong> (${specificity.toFixed(4)})` },
      { label: "F1-Score (fair balance between Precision and Recall)", calc: `2 × (Precision × Recall) / (P + R) = <strong>${f1.toFixed(4)}</strong>` },
      { label: "Balanced Accuracy (average of recall and specificity)", calc: `(Recall + Specificity) / 2 = <strong>${(balancedAcc * 100).toFixed(2)}%</strong>` },
      { label: "False Positive Rate (false alarms among actual negatives)", calc: `FP / (FP + TN) = ${fp} / (${fp} + ${tn}) = <strong>${(fpr * 100).toFixed(2)}%</strong>` },
      { label: "False Negative Rate (missed cases among actual positives)", calc: `FN / (FN + TP) = ${fn} / (${fn} + ${tp}) = <strong>${(fnr * 100).toFixed(2)}%</strong>` }
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
      { label: "Step 1: Total Evidence (overall chance of seeing symptom or test B: \\(P(B)\\))", calc: pB_calc_formula },
      { label: "Step 2: Updated Probability (chance that A is true now that we saw B: \\(P(A|B)\\))", calc: `\\(\\frac{${pBgA.toFixed(4)} \\times ${pA.toFixed(4)}}{${pB.toFixed(4)}} =\\) <strong>${posterior.toFixed(4)}</strong> (<strong>${(posterior * 100).toFixed(2)}%</strong>)` }
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
      { label: "Step 1: Calculate the Average (Mean μ)", calc: `Sum = ${nums.reduce((a,b)=>a+b,0).toFixed(4)} ÷ ${n} = <strong>${mean.toFixed(4)}</strong>` },
      { label: "Step 2: Calculate Spread Distance (Standard Deviation s)", calc: `√(Σ(x - μ)² / (n - 1)) = <strong>${stdDev.toFixed(4)}</strong>` },
      { label: "Step 3: Standardized Z-Scores (number of standard deviations away from the mean)", calc: zScores.map((z, i) => `x${i+1} (${nums[i]}) → <strong>${z.toFixed(4)}</strong>`).slice(0, 6).join(", ") + (zScores.length > 6 ? ` ... (+${zScores.length - 6} more)` : '') }
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
      { label: "Step 1: Find Smallest and Largest Values", calc: `Lowest = ${minX.toFixed(4)}, Highest = ${maxX.toFixed(4)}, New Target Range = [${minBound}, ${maxBound}]` },
      { label: "Step 2: Rescaling Formula", calc: `x' = ${minBound} + [(x - ${minX.toFixed(4)}) / ${range.toFixed(4)}] × ${targetRange}` },
      { label: "Step 3: Scaled Values", calc: normalized.map((v, i) => `x${i+1}: <strong>${v.toFixed(4)}</strong>`).slice(0, 6).join(", ") }
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
      { label: "Step 1: Calculate Averages (x̄, ȳ)", calc: `Average X = ${meanX.toFixed(4)}, Average Y = ${meanY.toFixed(4)}` },
      { label: "Step 2: Calculate Slope (how much Y increases when X goes up by 1)", calc: `Σ(x - x̄)(y - ȳ) / Σ(x - x̄)² = ${num.toFixed(4)} / ${den.toFixed(4)} = <strong>${slope.toFixed(4)}</strong>` },
      { label: "Step 3: Calculate Starting Intercept (value of Y when X is 0)", calc: `ȳ - m·x̄ = ${meanY.toFixed(4)} - (${slope.toFixed(4)} × ${meanX.toFixed(4)}) = <strong>${intercept.toFixed(4)}</strong>` },
      { label: "Step 4: Final Best-Fit Line Formula", calc: `<strong>ŷ = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}</strong> (R² = ${r2.toFixed(4)}, Pearson correlation r = ${r.toFixed(4)})` }
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
      { label: "Euclidean Distance (Straight Line distance: L2)", calc: `√(Σ|aᵢ - bᵢ|²) = √(${sumSq.toFixed(4)}) = <strong>${euclidean.toFixed(4)}</strong>` },
      { label: "Manhattan Distance (Grid / City-block distance: L1)", calc: `Σ|aᵢ - bᵢ| = <strong>${manhattan.toFixed(4)}</strong>` },
      { label: `Minkowski Distance (Generalized distance formula with p=${p})`, calc: `(Σ|aᵢ - bᵢ|^${p})^(1/${p}) = <strong>${minkowski.toFixed(4)}</strong>` }
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
      { label: "Step 1: Multiply matching elements (Dot Product: \\(\\mathbf{A} \\cdot \\mathbf{B}\\))", calc: `<strong>${dot.toFixed(4)}</strong>` },
      { label: "Step 2: Find total length (Norm) of each vector", calc: `Length A = ${normA.toFixed(4)}, Length B = ${normB.toFixed(4)}` },
      { label: "Step 3: Direction Similarity (1.0 = identical direction, 0.0 = completely unrelated)", calc: `\\(\\frac{${dot.toFixed(4)}}{${normA.toFixed(4)} \\times ${normB.toFixed(4)}} =\\) <strong>${similarity.toFixed(4)}</strong>` },
      { label: "Step 4: Cosine Distance (1 minus similarity)", calc: `\\(1 - ${similarity.toFixed(4)} =\\) <strong>${distance.toFixed(4)}</strong>` }
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
      splitSteps.push(`Branch ${idx+1} (${countTotal}/${parentTotal} items): Disorder (Entropy) = ${splitEnt.toFixed(4)}`);
    });

    const infoGain = parentEntropy - weightedChildEntropy;

    const steps = [
      { label: "Step 1: Starting Disorder (Parent Entropy)", calc: `-${parentCounts.map(c => `(${c}/${parentTotal})log₂(${c}/${parentTotal})`).join(" - ")} = <strong>${parentEntropy.toFixed(4)} bits</strong>` }
    ];

    if (childSplits.length > 0) {
      steps.push({ label: "Step 2: Disorder in each branch after splitting", calc: splitSteps.join("<br>") });
      steps.push({ label: "Step 3: Information Gain (how much disorder was removed by this question)", calc: `Starting Entropy (${parentEntropy.toFixed(4)}) - Split Entropy (${weightedChildEntropy.toFixed(4)}) = <strong>${infoGain.toFixed(4)} bits</strong>` });
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
      recommendation = "Severe imbalance! Standard accuracy will be misleading (guessing the majority class always gets a high score). Recommendation: Create synthetic minority examples with SMOTE, use Class Weights, and measure Precision-Recall rather than basic accuracy.";
    } else if (ratio >= 5) {
      recommendation = "Moderate imbalance. Recommendation: Use Stratified K-Fold cross-validation so every test fold has the same ratio, set class_weight='balanced', and focus on F1-Score.";
    } else {
      recommendation = "Balanced or mild ratio. Standard cross-validation and standard accuracy or cross-entropy work well here.";
    }

    const steps = [
      { label: "Class Breakdown", calc: counts.map((c, i) => `Class ${i+1}: <strong>${c.toLocaleString()}</strong> (${percentages[i].toFixed(2)}%)`).join(" | ") },
      { label: "Imbalance Ratio", calc: `<strong>1 : ${ratio.toFixed(1)}</strong>` },
      { label: "Practical Advice for Developers", calc: recommendation }
    ];

    return { ratio, percentages, steps };
  }
};
