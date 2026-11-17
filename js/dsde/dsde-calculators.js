/**
 * MLForge Data Science & Data Engineering Interactive Calculators & Tools
 * 14 Real-time Data Science Calculators + 8 Data Engineering Interactive Tools
 * Strict mathematical validation, formulas, step-by-step calculation logs, and interactive controls.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsde = window.MLForge.dsde || {};

MLForge.dsde.calculators = (function () {

  // Helper: parse comma or space separated numbers
  function parseNumbers(inputStr) {
    if (!inputStr || typeof inputStr !== 'string') return [];
    return inputStr
      .split(/[\s,]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(Number)
      .filter(n => !isNaN(n));
  }

  return {
    // =========================================================================
    // 1. DATA SCIENCE CALCULATORS
    // =========================================================================

    // 1. Mean Calculator
    calcMean(inputStr) {
      const arr = parseNumbers(inputStr);
      if (arr.length === 0) return { error: "Please enter at least one valid number." };
      const sum = arr.reduce((a, b) => a + b, 0);
      const mean = sum / arr.length;
      return {
        result: mean.toFixed(4),
        count: arr.length,
        sum: sum.toFixed(4),
        formula: "\\bar{x} = \\frac{1}{n} \\sum_{i=1}^{n} x_i",
        steps: [
          `Count of numbers (n): ${arr.length}`,
          `Sum of all numbers (Σx): ${arr.join(' + ')} = ${sum.toFixed(4)}`,
          `Mean: ${sum.toFixed(4)} / ${arr.length} = ${mean.toFixed(4)}`
        ]
      };
    },

    // 2. Median Calculator
    calcMedian(inputStr) {
      const arr = parseNumbers(inputStr);
      if (arr.length === 0) return { error: "Please enter at least one valid number." };
      const sorted = [...arr].sort((a, b) => a - b);
      const n = sorted.length;
      let median;
      let stepExplanation;
      if (n % 2 !== 0) {
        const midIdx = Math.floor(n / 2);
        median = sorted[midIdx];
        stepExplanation = `Odd count (n=${n}). The middle element at index ${midIdx + 1} is ${median}.`;
      } else {
        const mid1 = sorted[n / 2 - 1];
        const mid2 = sorted[n / 2];
        median = (mid1 + mid2) / 2;
        stepExplanation = `Even count (n=${n}). Average of the two middle elements (${mid1} + ${mid2}) / 2 = ${median}.`;
      }
      return {
        result: median.toFixed(4),
        count: n,
        sortedList: sorted.join(', '),
        formula: "n \\text{ odd: } x_{(n+1)/2}, \\quad n \\text{ even: } \\frac{x_{n/2} + x_{n/2+1}}{2}",
        steps: [
          `Sorted numbers: [${sorted.join(', ')}]`,
          stepExplanation
        ]
      };
    },

    // 3. Mode Calculator
    calcMode(inputStr) {
      const arr = parseNumbers(inputStr);
      if (arr.length === 0) return { error: "Please enter at least one valid number." };
      const counts = {};
      let maxCount = 0;
      arr.forEach(n => {
        counts[n] = (counts[n] || 0) + 1;
        if (counts[n] > maxCount) maxCount = counts[n];
      });

      if (maxCount === 1 && arr.length > 1) {
        return {
          result: "No unique mode (all values appear once)",
          formula: "\\text{Mode} = \\text{Most frequently occurring value(s)}",
          steps: ["Every value in the dataset appears exactly 1 time. The distribution is uniform."]
        };
      }

      const modes = Object.keys(counts).filter(k => counts[k] === maxCount).map(Number);
      return {
        result: modes.join(', '),
        frequency: maxCount,
        formula: "\\text{Mode} = \\text{Value(s) with highest frequency } (f_{\\max})",
        steps: [
          `Frequencies calculated: ${Object.entries(counts).map(([k, v]) => `${k}: ${v}x`).join(', ')}`,
          `Highest frequency: ${maxCount} occurrence(s)`,
          `Mode value(s): ${modes.join(', ')}`
        ]
      };
    },

    // 4. Variance Calculator (Sample & Population)
    calcVariance(inputStr, isSample = true) {
      const arr = parseNumbers(inputStr);
      if (arr.length < 2 && isSample) return { error: "Sample variance requires at least 2 numbers." };
      if (arr.length === 0) return { error: "Please enter valid numbers." };
      const n = arr.length;
      const mean = arr.reduce((a, b) => a + b, 0) / n;
      const squaredDiffs = arr.map(x => Math.pow(x - mean, 2));
      const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);
      const denominator = isSample ? (n - 1) : n;
      const variance = sumSquaredDiffs / denominator;

      return {
        result: variance.toFixed(4),
        type: isSample ? "Sample Variance (s²)" : "Population Variance (σ²)",
        mean: mean.toFixed(4),
        formula: isSample ? "s^2 = \\frac{1}{n-1} \\sum (x_i - \\bar{x})^2" : "\\sigma^2 = \\frac{1}{N} \\sum (x_i - \\mu)^2",
        steps: [
          `Mean: ${mean.toFixed(4)}`,
          `Squared deviations from mean: [${squaredDiffs.map(d => d.toFixed(2)).join(', ')}]`,
          `Sum of squared deviations: ${sumSquaredDiffs.toFixed(4)}`,
          `Divided by denominator (${denominator}): ${sumSquaredDiffs.toFixed(4)} / ${denominator} = ${variance.toFixed(4)}`
        ]
      };
    },

    // 5. Standard Deviation Calculator
    calcStdDev(inputStr, isSample = true) {
      const vResult = this.calcVariance(inputStr, isSample);
      if (vResult.error) return vResult;
      const variance = parseFloat(vResult.result);
      const stdDev = Math.sqrt(variance);
      return {
        result: stdDev.toFixed(4),
        variance: variance.toFixed(4),
        type: isSample ? "Sample Std Dev (s)" : "Population Std Dev (σ)",
        formula: isSample ? "s = \\sqrt{s^2}" : "\\sigma = \\sqrt{\\sigma^2}",
        steps: [
          ...vResult.steps,
          `Standard Deviation: √(${variance.toFixed(4)}) = ${stdDev.toFixed(4)}`
        ]
      };
    },

    // 6. Correlation Calculator (Pearson r)
    calcCorrelation(xStr, yStr) {
      const x = parseNumbers(xStr);
      const y = parseNumbers(yStr);
      if (x.length !== y.length || x.length < 2) {
        return { error: "Both X and Y must have equal counts of at least 2 numbers." };
      }
      const n = x.length;
      const meanX = x.reduce((a, b) => a + b, 0) / n;
      const meanY = y.reduce((a, b) => a + b, 0) / n;

      let numerator = 0;
      let denomX = 0;
      let denomY = 0;

      for (let i = 0; i < n; i++) {
        const dx = x[i] - meanX;
        const dy = y[i] - meanY;
        numerator += dx * dy;
        denomX += dx * dx;
        denomY += dy * dy;
      }

      if (denomX === 0 || denomY === 0) {
        return { error: "Variance of X or Y is zero. Correlation is undefined." };
      }

      const r = numerator / Math.sqrt(denomX * denomY);
      let interpretation = "";
      if (Math.abs(r) > 0.8) interpretation = "Strong " + (r > 0 ? "positive" : "negative") + " linear relationship.";
      else if (Math.abs(r) > 0.5) interpretation = "Moderate " + (r > 0 ? "positive" : "negative") + " linear relationship.";
      else if (Math.abs(r) > 0.2) interpretation = "Weak " + (r > 0 ? "positive" : "negative") + " linear relationship.";
      else interpretation = "Negligible or zero linear relationship.";

      return {
        result: r.toFixed(4),
        rSquared: (r * r).toFixed(4),
        interpretation,
        formula: "r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum(x_i - \\bar{x})^2 \\sum(y_i - \\bar{y})^2}}",
        steps: [
          `Mean X = ${meanX.toFixed(2)}, Mean Y = ${meanY.toFixed(2)}`,
          `Covariance Numerator: ${numerator.toFixed(4)}`,
          `Denominator: √(${denomX.toFixed(2)} × ${denomY.toFixed(2)}) = ${Math.sqrt(denomX * denomY).toFixed(4)}`,
          `Pearson r: ${r.toFixed(4)} (R² = ${(r * r).toFixed(4)})`,
          `Interpretation: ${interpretation}`
        ]
      };
    },

    // 7. Covariance Calculator
    calcCovariance(xStr, yStr, isSample = true) {
      const x = parseNumbers(xStr);
      const y = parseNumbers(yStr);
      if (x.length !== y.length || x.length < 2) {
        return { error: "X and Y must have equal lengths (minimum 2 values)." };
      }
      const n = x.length;
      const meanX = x.reduce((a, b) => a + b, 0) / n;
      const meanY = y.reduce((a, b) => a + b, 0) / n;
      let sumCross = 0;
      for (let i = 0; i < n; i++) {
        sumCross += (x[i] - meanX) * (y[i] - meanY);
      }
      const denom = isSample ? (n - 1) : n;
      const cov = sumCross / denom;

      return {
        result: cov.toFixed(4),
        formula: isSample ? "s_{xy} = \\frac{1}{n-1} \\sum (x_i - \\bar{x})(y_i - \\bar{y})" : "\\sigma_{xy} = \\frac{1}{N} \\sum (x_i - \\mu_x)(y_i - \\mu_y)",
        steps: [
          `Mean X: ${meanX.toFixed(2)}, Mean Y: ${meanY.toFixed(2)}`,
          `Sum of cross-products: ${sumCross.toFixed(4)}`,
          `Covariance: ${sumCross.toFixed(4)} / ${denom} = ${cov.toFixed(4)}`
        ]
      };
    },

    // 8. Probability (Combinations & Permutations)
    calcProbability(n, r) {
      n = parseInt(n);
      r = parseInt(r);
      if (isNaN(n) || isNaN(r) || n < 0 || r < 0 || r > n) {
        return { error: "Please enter valid integers where n >= r >= 0." };
      }

      function fact(num) {
        let res = 1;
        for (let i = 2; i <= num; i++) res *= i;
        return res;
      }

      const permutations = fact(n) / fact(n - r);
      const combinations = fact(n) / (fact(r) * fact(n - r));

      return {
        combinations: combinations.toLocaleString(),
        permutations: permutations.toLocaleString(),
        formula: "C(n, r) = \\frac{n!}{r!(n-r)!}, \\quad P(n, r) = \\frac{n!}{(n-r)!}",
        steps: [
          `n! (${n}!): ${fact(n)}`,
          `r! (${r}!): ${fact(r)}`,
          `(n - r)! (${n - r}!): ${fact(n - r)}`,
          `Combinations (order does not matter): ${combinations}`,
          `Permutations (order matters): ${permutations}`
        ]
      };
    },

    // 9. Z-Score Calculator
    calcZScore(x, mean, stdDev) {
      x = parseFloat(x);
      mean = parseFloat(mean);
      stdDev = parseFloat(stdDev);
      if (isNaN(x) || isNaN(mean) || isNaN(stdDev) || stdDev <= 0) {
        return { error: "Please provide valid values with Standard Deviation > 0." };
      }
      const z = (x - mean) / stdDev;
      let position = "";
      if (Math.abs(z) > 3) position = "Extreme outlier (> 3 standard deviations from mean)";
      else if (Math.abs(z) > 2) position = "Mild outlier (> 2 standard deviations)";
      else position = "Normal range within 2 standard deviations";

      return {
        result: z.toFixed(4),
        position,
        formula: "z = \\frac{x - \\mu}{\\sigma}",
        steps: [
          `Raw value (x): ${x}`,
          `Difference from mean (x - μ): ${x} - ${mean} = ${(x - mean).toFixed(4)}`,
          `Divided by σ (${stdDev}): ${(x - mean).toFixed(4)} / ${stdDev} = ${z.toFixed(4)}`,
          `Evaluation: ${position}`
        ]
      };
    },

    // 10. Normal Distribution Calculator (CDF Approximation)
    calcNormalDist(x, mean = 0, stdDev = 1) {
      x = parseFloat(x);
      mean = parseFloat(mean);
      stdDev = parseFloat(stdDev);
      if (isNaN(x) || isNaN(mean) || isNaN(stdDev) || stdDev <= 0) {
        return { error: "Please enter valid numeric values with Standard Deviation > 0." };
      }
      const z = (x - mean) / stdDev;

      // Error function approximation (Abramowitz and Stegun)
      function cdf(zScore) {
        const t = 1.0 / (1.0 + 0.2316419 * Math.abs(zScore));
        const d = 0.3989422804014327 * Math.exp(-zScore * zScore / 2);
        const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
        return zScore > 0 ? 1.0 - p : p;
      }

      const pLeft = cdf(z);
      const pRight = 1 - pLeft;

      return {
        zScore: z.toFixed(4),
        pCumulative: (pLeft * 100).toFixed(2) + "%",
        pRight: (pRight * 100).toFixed(2) + "%",
        formula: "P(X \\le x) = \\Phi\\left(\\frac{x - \\mu}{\\sigma}\\right)",
        steps: [
          `Calculated Z-score: (${x} - ${mean}) / ${stdDev} = ${z.toFixed(4)}`,
          `Probability of value <= ${x}: ${(pLeft * 100).toFixed(2)}%`,
          `Probability of value > ${x}: ${(pRight * 100).toFixed(2)}%`
        ]
      };
    },

    // 11. Percentile Calculator
    calcPercentile(inputStr, p) {
      const arr = parseNumbers(inputStr);
      p = parseFloat(p);
      if (arr.length === 0 || isNaN(p) || p < 0 || p > 100) {
        return { error: "Please enter valid numbers and a percentile between 0 and 100." };
      }
      const sorted = [...arr].sort((a, b) => a - b);
      const index = (p / 100) * (sorted.length - 1);
      const lower = Math.floor(index);
      const upper = Math.ceil(index);
      const weight = index - lower;
      const value = sorted[lower] * (1 - weight) + sorted[upper] * weight;

      return {
        result: value.toFixed(4),
        percentile: p,
        sortedList: sorted.join(', '),
        formula: "\\text{Rank} = \\frac{P}{100} \\times (N - 1)",
        steps: [
          `Sorted list: [${sorted.join(', ')}]`,
          `Interpolated Rank Index: (${p}/100) × (${sorted.length} - 1) = ${index.toFixed(2)}`,
          `${p}th Percentile value: ${value.toFixed(4)}`
        ]
      };
    },

    // 12. IQR Calculator
    calcIQR(inputStr) {
      const arr = parseNumbers(inputStr);
      if (arr.length < 4) return { error: "Please enter at least 4 numbers to compute quartiles." };
      const q1Res = this.calcPercentile(inputStr, 25);
      const q3Res = this.calcPercentile(inputStr, 75);
      const q1 = parseFloat(q1Res.result);
      const q3 = parseFloat(q3Res.result);
      const iqr = q3 - q1;
      const lowerBound = q1 - 1.5 * iqr;
      const upperBound = q3 + 1.5 * iqr;

      const outliers = arr.filter(v => v < lowerBound || v > upperBound);

      return {
        result: iqr.toFixed(4),
        q1: q1.toFixed(4),
        q3: q3.toFixed(4),
        lowerBound: lowerBound.toFixed(4),
        upperBound: upperBound.toFixed(4),
        outliers: outliers.length > 0 ? outliers.join(', ') : "None detected",
        formula: "\\text{IQR} = Q_3 - Q_1, \\quad \\text{Bounds} = [Q_1 - 1.5\\text{IQR}, \\; Q_3 + 1.5\\text{IQR}]",
        steps: [
          `Q1 (25th percentile): ${q1.toFixed(4)}`,
          `Q3 (75th percentile): ${q3.toFixed(4)}`,
          `IQR: ${q3.toFixed(4)} - ${q1.toFixed(4)} = ${iqr.toFixed(4)}`,
          `Lower Outlier Bound: ${lowerBound.toFixed(4)}`,
          `Upper Outlier Bound: ${upperBound.toFixed(4)}`,
          `Outliers in dataset: ${outliers.length > 0 ? outliers.join(', ') : "None"}`
        ]
      };
    },

    // 13. Confidence Interval Calculator
    calcConfidenceInterval(mean, stdDev, n, confidenceLevel = 95) {
      mean = parseFloat(mean);
      stdDev = parseFloat(stdDev);
      n = parseInt(n);
      confidenceLevel = parseFloat(confidenceLevel);

      if (isNaN(mean) || isNaN(stdDev) || isNaN(n) || n < 2 || stdDev <= 0) {
        return { error: "Please provide valid numbers with n >= 2 and stdDev > 0." };
      }

      // Critical Z values
      const zLookup = { 90: 1.645, 95: 1.960, 99: 2.576 };
      const z = zLookup[confidenceLevel] || 1.960;
      const se = stdDev / Math.sqrt(n);
      const marginOfError = z * se;
      const lower = mean - marginOfError;
      const upper = mean + marginOfError;

      return {
        marginOfError: marginOfError.toFixed(4),
        interval: `[${lower.toFixed(4)}, ${upper.toFixed(4)}]`,
        formula: "\\text{CI} = \\bar{x} \\pm z^* \\times \\frac{s}{\\sqrt{n}}",
        steps: [
          `Standard Error (SE = s / √n): ${stdDev} / √${n} = ${se.toFixed(4)}`,
          `Critical Z* for ${confidenceLevel}% confidence: ${z}`,
          `Margin of Error (ME = Z* × SE): ${marginOfError.toFixed(4)}`,
          `${confidenceLevel}% Confidence Interval: [${lower.toFixed(4)}, ${upper.toFixed(4)}]`
        ]
      };
    },

    // 14. Sample Size Calculator (for A/B testing)
    calcSampleSize(baselineRate, mdePct, power = 80, alpha = 5) {
      baselineRate = parseFloat(baselineRate) / 100; // e.g. 5% = 0.05
      mdePct = parseFloat(mdePct) / 100;             // e.g. 10% relative lift = 0.10
      if (isNaN(baselineRate) || isNaN(mdePct) || baselineRate <= 0 || baselineRate >= 1 || mdePct <= 0) {
        return { error: "Please enter a baseline conversion between 0.1% and 99%, and MDE > 0%." };
      }

      const p1 = baselineRate;
      const p2 = baselineRate * (1 + mdePct);
      const pAvg = (p1 + p2) / 2;

      // Z scores for alpha=0.05 (1.96) and power=0.80 (0.84)
      const zAlpha = 1.96;
      const zBeta = 0.84;

      const num = Math.pow(zAlpha * Math.sqrt(2 * pAvg * (1 - pAvg)) + zBeta * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2)), 2);
      const den = Math.pow(p2 - p1, 2);
      const nPerVariant = Math.ceil(num / den);

      return {
        samplePerVariant: nPerVariant.toLocaleString(),
        totalSample: (nPerVariant * 2).toLocaleString(),
        p1: (p1 * 100).toFixed(2) + "%",
        p2: (p2 * 100).toFixed(2) + "%",
        formula: "n = \\frac{\\left(z_{\\alpha/2}\\sqrt{2\\bar{p}(1-\\bar{p})} + z_\\beta\\sqrt{p_1(1-p_1)+p_2(1-p_2)}\\right)^2}{(p_2 - p_1)^2}",
        steps: [
          `Baseline rate (p1): ${(p1 * 100).toFixed(2)}%`,
          `Target rate with lift (p2): ${(p2 * 100).toFixed(2)}%`,
          `Absolute Difference (Δ): ${((p2 - p1) * 100).toFixed(3)}%`,
          `Required Sample Size: ${nPerVariant.toLocaleString()} users per variant (${(nPerVariant * 2).toLocaleString()} total)`
        ]
      };
    },

    // =========================================================================
    // 2. DATA ENGINEERING INTERACTIVE TOOLS
    // =========================================================================

    // DE Tool 1: Data Size Converter & Network Transfer Estimator
    convertDataSize(val, unit, bandwidthMbps = 100) {
      val = parseFloat(val);
      bandwidthMbps = parseFloat(bandwidthMbps) || 100;
      if (isNaN(val) || val < 0) return { error: "Please enter a valid non-negative number." };

      const multipliers = {
        'B': 1,
        'KB': 1024,
        'MB': Math.pow(1024, 2),
        'GB': Math.pow(1024, 3),
        'TB': Math.pow(1024, 4),
        'PB': Math.pow(1024, 5)
      };

      const bytes = val * (multipliers[unit] || 1);
      const kb = bytes / 1024;
      const mb = bytes / Math.pow(1024, 2);
      const gb = bytes / Math.pow(1024, 3);
      const tb = bytes / Math.pow(1024, 4);
      const pb = bytes / Math.pow(1024, 5);

      // Transfer time calculation: bits / (bits per sec)
      const totalBits = bytes * 8;
      const bitsPerSec = bandwidthMbps * 1000000;
      const seconds = totalBits / bitsPerSec;

      let timeFormatted = "";
      if (seconds < 60) timeFormatted = `${seconds.toFixed(1)} seconds`;
      else if (seconds < 3600) timeFormatted = `${(seconds / 60).toFixed(1)} minutes`;
      else if (seconds < 86400) timeFormatted = `${(seconds / 3600).toFixed(1)} hours`;
      else timeFormatted = `${(seconds / 86400).toFixed(1)} days`;

      return {
        bytes: bytes.toLocaleString() + " B",
        kb: kb.toFixed(2) + " KB",
        mb: mb.toFixed(2) + " MB",
        gb: gb.toFixed(4) + " GB",
        tb: tb.toFixed(6) + " TB",
        pb: pb.toFixed(8) + " PB",
        transferTime: timeFormatted,
        bandwidth: `${bandwidthMbps} Mbps`
      };
    },

    // DE Tool 2: JSON Validator & Formatter
    validateJson(rawStr) {
      if (!rawStr || !rawStr.trim()) return { error: "Empty JSON string." };
      try {
        const parsed = JSON.parse(rawStr);
        const formatted = JSON.stringify(parsed, null, 2);
        const minified = JSON.stringify(parsed);
        const isArray = Array.isArray(parsed);
        const keyCount = isArray ? parsed.length : Object.keys(parsed).length;
        const byteSize = new Blob([formatted]).size;

        return {
          valid: true,
          formatted,
          minified,
          type: isArray ? "JSON Array" : "JSON Object",
          itemCount: keyCount,
          byteSize: byteSize + " bytes"
        };
      } catch (err) {
        return {
          valid: false,
          error: err.message
        };
      }
    },

    // DE Tool 3: CSV Previewer & Schema Analyzer
    analyzeCsv(rawCsv) {
      if (!rawCsv || !rawCsv.trim()) return { error: "Empty CSV string." };
      const lines = rawCsv.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
      if (lines.length === 0) return { error: "No lines detected in CSV." };

      const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
      const rows = lines.slice(1).map(line => {
        return line.split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
      });

      // Analyze types per column
      const schema = headers.map((colName, colIdx) => {
        let isInt = true;
        let isFloat = true;
        let nullCount = 0;

        rows.forEach(r => {
          const val = r[colIdx];
          if (val === undefined || val === "" || val.toLowerCase() === "null" || val.toLowerCase() === "nan") {
            nullCount++;
          } else {
            if (isNaN(Number(val))) {
              isInt = false;
              isFloat = false;
            } else if (!Number.isInteger(Number(val))) {
              isInt = false;
            }
          }
        });

        let detectedType = "STRING";
        if (rows.length > 0 && nullCount < rows.length) {
          if (isInt) detectedType = "INTEGER";
          else if (isFloat) detectedType = "FLOAT";
        }

        return {
          column: colName,
          type: detectedType,
          nullCount,
          nullPct: ((nullCount / Math.max(1, rows.length)) * 100).toFixed(1) + "%"
        };
      });

      return {
        headers,
        rowCount: rows.length,
        colCount: headers.length,
        sampleRows: rows.slice(0, 5),
        schema
      };
    }
  };
})();
