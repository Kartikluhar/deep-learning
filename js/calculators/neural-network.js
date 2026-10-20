/**
 * MLForge Neural Network Calculators
 * Pure math implementations with strict input validation, step-by-step reporting, and numerical stability.
 */

window.MLForge = window.MLForge || {};
window.MLForge.calculators = window.MLForge.calculators || {};

MLForge.calculators.nn = {
  /**
   * 1. Neuron Output Calculator
   */
  calculateNeuronOutput(inputsArr, weightsArr, bias, activation) {
    if (!Array.isArray(inputsArr) || !Array.isArray(weightsArr)) {
      throw new Error("Inputs and weights must be arrays of numbers.");
    }
    if (inputsArr.length === 0 || weightsArr.length === 0) {
      throw new Error("Inputs and weights arrays cannot be empty.");
    }
    if (inputsArr.length !== weightsArr.length) {
      throw new Error(`Input dimension (${inputsArr.length}) does not match weight dimension (${weightsArr.length}).`);
    }

    const steps = [];
    let weightedSum = 0;
    const products = [];

    for (let i = 0; i < inputsArr.length; i++) {
      const xi = Number(inputsArr[i]);
      const wi = Number(weightsArr[i]);
      if (!Number.isFinite(xi) || !Number.isFinite(wi)) {
        throw new Error(`Invalid numeric input at index ${i}: x=${inputsArr[i]}, w=${weightsArr[i]}`);
      }
      const prod = xi * wi;
      products.push(`(x${i+1} × w${i+1}) = (${xi} × ${wi}) = ${prod.toFixed(4)}`);
      weightedSum += prod;
    }

    const b = Number(bias);
    if (!Number.isFinite(b)) {
      throw new Error("Bias must be a valid finite number.");
    }

    const linearCombination = weightedSum + b; // z

    steps.push({
      label: "Step 1: Multiply each input by its weight (Dot Product: \\(\\sum_{i=1}^n w_i x_i\\))",
      calc: products.join(" + ") + ` = <strong>${weightedSum.toFixed(4)}</strong>`
    });
    steps.push({
      label: "Step 2: Add the bias number (Offset: \\(z = \\sum w_i x_i + b\\))",
      calc: `${weightedSum.toFixed(4)} + ${b} = <strong>${linearCombination.toFixed(4)}</strong>`
    });

    // Activation
    let activated = 0;
    let actFormula = "";

    switch (activation.toLowerCase()) {
      case 'sigmoid':
        activated = 1 / (1 + Math.exp(-linearCombination));
        actFormula = `\\(\\sigma(z) = \\frac{1}{1 + e^{-z}} = \\frac{1}{1 + e^{-(${linearCombination.toFixed(4)})}} =\\) <strong>${activated.toFixed(4)}</strong>`;
        break;
      case 'tanh':
        activated = Math.tanh(linearCombination);
        actFormula = `\\(\\tanh(z) = \\tanh(${linearCombination.toFixed(4)}) =\\) <strong>${activated.toFixed(4)}</strong>`;
        break;
      case 'relu':
        activated = Math.max(0, linearCombination);
        actFormula = `\\(\\text{ReLU}(z) = \\max(0, ${linearCombination.toFixed(4)}) =\\) <strong>${activated.toFixed(4)}</strong>`;
        break;
      case 'leaky_relu':
        activated = linearCombination > 0 ? linearCombination : 0.01 * linearCombination;
        actFormula = `\\(\\text{LeakyReLU}(z) = \\max(0.01z, z) =\\) <strong>${activated.toFixed(4)}</strong>`;
        break;
      case 'linear':
      default:
        activated = linearCombination;
        actFormula = `\\(\\text{Linear}(z) =\\) <strong>${linearCombination.toFixed(4)}</strong>`;
        break;
    }

    steps.push({
      label: `Step 3: Pass total through activation function [${activation.toUpperCase()}]`,
      calc: actFormula
    });

    return {
      z: linearCombination,
      output: activated,
      steps: steps
    };
  },

  /**
   * 2. Activation Function Evaluation
   */
  evaluateActivation(valuesArr, functionName) {
    if (!Array.isArray(valuesArr) || valuesArr.length === 0) {
      throw new Error("Please provide at least one valid input number.");
    }
    const nums = valuesArr.map(v => {
      const n = Number(v);
      if (!Number.isFinite(n)) throw new Error(`Invalid number: "${v}"`);
      return n;
    });

    const fn = functionName.toLowerCase();
    const results = [];
    const steps = [];

    if (fn === 'softmax') {
      // Numerically stable softmax: subtract max(z)
      const maxVal = Math.max(...nums);
      const exps = nums.map(x => Math.exp(x - maxVal));
      const sumExps = exps.reduce((acc, v) => acc + v, 0);
      const softmaxVals = exps.map(e => e / sumExps);

      steps.push({
        label: "Step 1: Shift scores and calculate powers safely [e^(z - max)]",
        calc: `Highest score: max(z) = ${maxVal}. Sum of exponents = ${sumExps.toFixed(4)}. Each score turns into a clean probability that adds up to 100%.`
      });

      return {
        values: softmaxVals,
        formatted: softmaxVals.map((v, i) => `Class ${i+1}: ${(v * 100).toFixed(2)}% chance (${v.toFixed(4)})`),
        steps
      };
    }

    nums.forEach(x => {
      let y = 0;
      let derivative = 0;
      if (fn === 'sigmoid') {
        y = 1 / (1 + Math.exp(-x));
        derivative = y * (1 - y);
      } else if (fn === 'relu') {
        y = Math.max(0, x);
        derivative = x > 0 ? 1 : 0;
      } else if (fn === 'tanh') {
        y = Math.tanh(x);
        derivative = 1 - y * y;
      } else if (fn === 'leaky_relu') {
        y = x > 0 ? x : 0.01 * x;
        derivative = x > 0 ? 1 : 0.01;
      } else if (fn === 'gelu') {
        // Approximation: 0.5 * x * (1 + tanh(sqrt(2/pi) * (x + 0.044715 * x^3)))
        const k = Math.sqrt(2 / Math.PI);
        const inner = k * (x + 0.044715 * Math.pow(x, 3));
        y = 0.5 * x * (1 + Math.tanh(inner));
        derivative = (y / x) || 0.5; // illustrative approx
      } else if (fn === 'swish') {
        const sig = 1 / (1 + Math.exp(-x));
        y = x * sig;
        derivative = sig + x * sig * (1 - sig);
      }
      results.push({ x, y, derivative });
    });

    steps.push({
      label: `Results and Derivatives for ${functionName}`,
      calc: results.map(r => `Input x = ${r.x} → Output f(x) = ${r.y.toFixed(4)} | Slope f'(x) = ${r.derivative.toFixed(4)}`).join("<br>")
    });

    return {
      results,
      steps
    };
  },

  /**
   * 3. Loss Functions Calculator
   */
  calculateLoss(yTrueArr, yPredArr, lossType, huberDelta = 1.0) {
    if (yTrueArr.length !== yPredArr.length || yTrueArr.length === 0) {
      throw new Error("True values and predicted values must have the same non-zero length.");
    }
    const n = yTrueArr.length;
    const steps = [];
    let totalLoss = 0;
    const individualErrors = [];

    switch (lossType.toLowerCase()) {
      case 'mse': {
        for (let i = 0; i < n; i++) {
          const yt = Number(yTrueArr[i]);
          const yp = Number(yPredArr[i]);
          const diff = yt - yp;
          const sq = diff * diff;
          individualErrors.push(`\\((y_{${i+1}} - \\hat{y}_{${i+1}})^2 = (${yt} - ${yp})^2 = ${sq.toFixed(4)}\\)`);
          totalLoss += sq;
        }
        const mse = totalLoss / n;
        steps.push({
          label: "Step 1: Find the error for each example and square it",
          calc: individualErrors.join("<br>")
        });
        steps.push({
          label: "Step 2: Average the squared errors (Mean Squared Error)",
          calc: `\\(\\text{Total Sum} = ${totalLoss.toFixed(4)} \\implies \\text{MSE} = \\frac{${totalLoss.toFixed(4)}}{${n}} =\\) <strong>${mse.toFixed(4)}</strong>`
        });
        return { loss: mse, rmse: Math.sqrt(mse), steps };
      }
      case 'mae': {
        for (let i = 0; i < n; i++) {
          const yt = Number(yTrueArr[i]);
          const yp = Number(yPredArr[i]);
          const absDiff = Math.abs(yt - yp);
          individualErrors.push(`\\(|y_{${i+1}} - \\hat{y}_{${i+1}}| = |${yt} - ${yp}| = ${absDiff.toFixed(4)}\\)`);
          totalLoss += absDiff;
        }
        const mae = totalLoss / n;
        steps.push({ label: "Step 1: Find the absolute error (distance ignoring plus/minus signs)", calc: individualErrors.join("<br>") });
        steps.push({ label: "Step 2: Average the absolute errors (Mean Absolute Error)", calc: `\\(\\text{Total Sum} = ${totalLoss.toFixed(4)} \\implies \\text{MAE} = \\frac{${totalLoss.toFixed(4)}}{${n}} =\\) <strong>${mae.toFixed(4)}</strong>` });
        return { loss: mae, steps };
      }
      case 'huber': {
        const delta = Number(huberDelta) || 1.0;
        for (let i = 0; i < n; i++) {
          const yt = Number(yTrueArr[i]);
          const yp = Number(yPredArr[i]);
          const absDiff = Math.abs(yt - yp);
          let err = 0;
          if (absDiff <= delta) {
            err = 0.5 * absDiff * absDiff;
          } else {
            err = delta * (absDiff - 0.5 * delta);
          }
          individualErrors.push(`\\(|\\text{error}| = ${absDiff.toFixed(2)} \\implies L_\\delta = ${err.toFixed(4)}\\)`);
          totalLoss += err;
        }
        const huberLoss = totalLoss / n;
        steps.push({ label: `Step 1: Calculate Huber error for each sample (threshold \\(\\delta = ${delta}\\))`, calc: individualErrors.join("<br>") });
        steps.push({ label: "Step 2: Average the Huber errors (smooth blend of MSE and MAE)", calc: `\\(\\text{Total Sum} = ${totalLoss.toFixed(4)} \\implies L_\\delta = \\frac{${totalLoss.toFixed(4)}}{${n}} =\\) <strong>${huberLoss.toFixed(4)}</strong>` });
        return { loss: huberLoss, steps };
      }
      case 'bce': {
        const eps = 1e-15;
        for (let i = 0; i < n; i++) {
          const yt = Number(yTrueArr[i]);
          let yp = Number(yPredArr[i]);
          if (yt !== 0 && yt !== 1) {
            throw new Error(`Binary Cross-Entropy target y must be 0 or 1. Found: ${yt}`);
          }
          yp = Math.max(eps, Math.min(1 - eps, yp)); // Numerical clip
          const term = -(yt * Math.log(yp) + (1 - yt) * Math.log(1 - yp));
          individualErrors.push(`\\(\\text{Sample } ${i+1}: -[${yt}\\ln(${yp.toFixed(4)}) + ${1-yt}\\ln(${(1-yp).toFixed(4)})] = ${term.toFixed(4)}\\)`);
          totalLoss += term;
        }
        const bce = totalLoss / n;
        steps.push({ label: "Step 1: Calculate cross-entropy penalty for each sample", calc: individualErrors.join("<br>") });
        steps.push({ label: "Step 2: Average the loss across all samples (Binary Cross-Entropy)", calc: `\\(\\text{Total Sum} = ${totalLoss.toFixed(4)} \\implies \\mathcal{L}_{\\text{BCE}} = \\frac{${totalLoss.toFixed(4)}}{${n}} =\\) <strong>${bce.toFixed(4)}</strong>` });
        return { loss: bce, steps };
      }
      default:
        throw new Error(`Unsupported loss type: ${lossType}`);
    }
  },

  /**
   * 4. Gradient Descent Parameter Step
   */
  calculateGradientStep(currentParam, gradient, learningRate, momentum = 0, prevVelocity = 0) {
    const theta = Number(currentParam);
    const grad = Number(gradient);
    const lr = Number(learningRate);
    const gamma = Number(momentum) || 0;
    const vOld = Number(prevVelocity) || 0;

    if (!Number.isFinite(theta) || !Number.isFinite(grad) || !Number.isFinite(lr)) {
      throw new Error("All parameters, gradient, and learning rate must be finite numbers.");
    }
    if (lr <= 0) {
      throw new Error("Learning rate must be greater than 0.");
    }

    const steps = [];
    let newVelocity = 0;
    let newParam = 0;

    if (gamma > 0) {
      newVelocity = gamma * vOld + lr * grad;
      newParam = theta - newVelocity;
      steps.push({
        label: "Step 1: Calculate rolling momentum speed: \\(v_t = \\gamma v_{t-1} + \\eta \\nabla J(\\theta)\\)",
        calc: `(${gamma} \\times ${vOld.toFixed(4)}) + (${lr} \\times ${grad.toFixed(4)}) = <strong>${newVelocity.toFixed(4)}</strong>`
      });
      steps.push({
        label: "Step 2: Update parameter using momentum: \\(\\theta_{\\text{new}} = \\theta_{\\text{old}} - v_t\\)",
        calc: `${theta.toFixed(4)} - ${newVelocity.toFixed(4)} = <strong>${newParam.toFixed(4)}</strong>`
      });
    } else {
      const delta = lr * grad;
      newParam = theta - delta;
      steps.push({
        label: "Step 1: Calculate step distance (learning rate × slope): \\(\\Delta\\theta = \\eta \\nabla J(\\theta)\\)",
        calc: `${lr} \\times ${grad.toFixed(4)} = <strong>${delta.toFixed(4)}</strong>`
      });
      steps.push({
        label: "Step 2: Move downhill to update parameter: \\(\\theta_{\\text{new}} = \\theta_{\\text{old}} - \\Delta\\theta\\)",
        calc: `${theta.toFixed(4)} - ${delta.toFixed(4)} = <strong>${newParam.toFixed(4)}</strong>`
      });
    }

    return {
      newParam,
      velocity: newVelocity,
      delta: theta - newParam,
      steps
    };
  },

  /**
   * 5. Backpropagation Step on a 2-Layer Perceptron
   * Structure: 1 input (x) -> 1 hidden node (w1, b1, ReLU/Sigmoid) -> 1 output node (w2, b2, Linear) -> Target y
   */
  calculateBackpropagationStep(x, w1, b1, w2, b2, target, lr = 0.1, act = 'sigmoid') {
    x = Number(x); w1 = Number(w1); b1 = Number(b1);
    w2 = Number(w2); b2 = Number(b2); target = Number(target); lr = Number(lr);

    const steps = [];

    // --- Forward Pass ---
    const z1 = w1 * x + b1;
    let a1 = 0;
    let da1_dz1 = 0;
    if (act === 'sigmoid') {
      a1 = 1 / (1 + Math.exp(-z1));
      da1_dz1 = a1 * (1 - a1);
    } else {
      a1 = Math.max(0, z1);
      da1_dz1 = z1 > 0 ? 1 : 0;
    }
    const z2 = w2 * a1 + b2; // linear output
    const pred = z2;
    const loss = 0.5 * Math.pow(pred - target, 2);

    steps.push({
      label: "Step 1: Forward Pass (Calculate prediction ŷ and error loss)",
      calc: `z1 = (${w1}×${x}) + ${b1} = ${z1.toFixed(3)}<br>a1 = ${act}(${z1.toFixed(3)}) = ${a1.toFixed(3)}<br>Prediction ŷ = (${w2}×${a1.toFixed(3)}) + ${b2} = ${pred.toFixed(3)}<br>Error Loss = 0.5·(${pred.toFixed(3)} - ${target})² = ${loss.toFixed(4)}`
    });

    // --- Backward Pass (Chain Rule) ---
    // dL/dŷ = ŷ - y
    const dL_dpred = pred - target;
    // dL/dw2 = (dL/dpred) * a1
    const dL_dw2 = dL_dpred * a1;
    // dL/db2 = dL/dpred
    const dL_db2 = dL_dpred;

    // Propagate to hidden layer
    // dL/da1 = dL/dpred * w2
    const dL_da1 = dL_dpred * w2;
    // dL/dz1 = dL/da1 * f'(z1)
    const dL_dz1 = dL_da1 * da1_dz1;
    // dL/dw1 = dL/dz1 * x
    const dL_dw1 = dL_dz1 * x;
    // dL/db1 = dL/dz1
    const dL_db1 = dL_dz1;

    steps.push({
      label: "Step 2: Backward Pass (Find how each weight affected the error using Chain Rule)",
      calc: `Output error (ŷ - target) = ${dL_dpred.toFixed(4)}<br>Weight w2 slope = (output error) · a1 = ${dL_dw2.toFixed(4)}<br>Bias b2 slope = output error = ${dL_db2.toFixed(4)}<br>Weight w1 slope = (output error · w2 · activation slope) · x = ${dL_dw1.toFixed(4)}<br>Bias b1 slope = hidden error = ${dL_db1.toFixed(4)}`
    });

    // --- Weight Updates ---
    const new_w2 = w2 - lr * dL_dw2;
    const new_b2 = b2 - lr * dL_db2;
    const new_w1 = w1 - lr * dL_dw1;
    const new_b1 = b1 - lr * dL_db1;

    steps.push({
      label: `Step 3: Update Weights and Biases (Learning Rate η = ${lr})`,
      calc: `w2: ${w2.toFixed(3)} → <strong>${new_w2.toFixed(4)}</strong><br>b2: ${b2.toFixed(3)} → <strong>${new_b2.toFixed(4)}</strong><br>w1: ${w1.toFixed(3)} → <strong>${new_w1.toFixed(4)}</strong><br>b1: ${b1.toFixed(3)} → <strong>${new_b1.toFixed(4)}</strong>`
    });

    return {
      loss,
      pred,
      gradients: { dL_dw1, dL_db1, dL_dw2, dL_db2 },
      updatedParams: { w1: new_w1, b1: new_b1, w2: new_w2, b2: new_b2 },
      steps
    };
  },

  /**
   * 6. Parameter Count Calculator
   */
  calculateParameters(layers) {
    // layers: Array of { type: 'dense'|'conv2d', inFeatures/inChannels, outFeatures/outChannels, kernelSize, useBias }
    let totalTrainable = 0;
    const breakdown = [];

    layers.forEach((layer, idx) => {
      let weights = 0;
      let biases = 0;
      const useBias = layer.useBias !== false;

      if (layer.type === 'dense') {
        const inF = Number(layer.inFeatures);
        const outF = Number(layer.outFeatures);
        weights = inF * outF;
        biases = useBias ? outF : 0;
        const total = weights + biases;
        totalTrainable += total;
        breakdown.push({
          layer: `Layer ${idx+1}: Dense (${inF} → ${outF})`,
          weights,
          biases,
          total,
          formula: `${inF} × ${outF} + ${biases}`
        });
      } else if (layer.type === 'conv2d') {
        const inC = Number(layer.inChannels);
        const outC = Number(layer.outChannels);
        const k = Number(layer.kernelSize);
        weights = k * k * inC * outC;
        biases = useBias ? outC : 0;
        const total = weights + biases;
        totalTrainable += total;
        breakdown.push({
          layer: `Layer ${idx+1}: Conv2D (${k}x${k}, ${inC} → ${outC})`,
          weights,
          biases,
          total,
          formula: `(${k} × ${k} × ${inC} × ${outC}) + ${biases}`
        });
      }
    });

    return {
      totalTrainable,
      formattedTotal: totalTrainable >= 1e6 ? `${(totalTrainable / 1e6).toFixed(2)}M` : `${totalTrainable.toLocaleString()}`,
      breakdown
    };
  },

  /**
   * 7. Tensor Shape Calculator (Conv2D & Pooling)
   */
  calculateConvOutputShape(inH, inW, kernelSize, stride = 1, padding = 0, dilation = 1) {
    inH = Number(inH); inW = Number(inW);
    kernelSize = Number(kernelSize); stride = Number(stride);
    padding = Number(padding); dilation = Number(dilation);

    if (inH <= 0 || inW <= 0 || kernelSize <= 0 || stride <= 0) {
      throw new Error("Dimensions, kernel size, and stride must be positive integers.");
    }

    const effectiveKernel = dilation * (kernelSize - 1) + 1;
    const outH = Math.floor((inH - effectiveKernel + 2 * padding) / stride) + 1;
    const outW = Math.floor((inW - effectiveKernel + 2 * padding) / stride) + 1;

    if (outH <= 0 || outW <= 0) {
      throw new Error(`Kernel (${kernelSize}x${kernelSize}) with stride ${stride} is too large for input (${inH}x${inW}) with padding ${padding}.`);
    }

    const steps = [
      {
        label: "Step 1: Output size formula",
        calc: "\\[W_{\\text{out}} = \\left\\lfloor \\frac{W_{\\text{in}} - K_{\\text{eff}} + 2P}{S} \\right\\rfloor + 1\\]"
      },
      {
        label: "Step 2: Output height calculation: \\(H_{\\text{out}}\\)",
        calc: `\\(\\left\\lfloor \\frac{${inH} - ${effectiveKernel} + 2(${padding})}{${stride}} \\right\\rfloor + 1 =\\) <strong>${outH} pixels</strong>`
      },
      {
        label: "Step 3: Output width calculation: \\(W_{\\text{out}}\\)",
        calc: `\\(\\left\\lfloor \\frac{${inW} - ${effectiveKernel} + 2(${padding})}{${stride}} \\right\\rfloor + 1 =\\) <strong>${outW} pixels</strong>`
      }
    ];

    return {
      outHeight: outH,
      outWidth: outW,
      shapeStr: `${outH} × ${outW}`,
      steps
    };
  },

  /**
   * 8. Batch and Training Steps Calculator
   */
  calculateTrainingSteps(datasetSize, batchSize, epochs, dropLast = false) {
    datasetSize = Number(datasetSize);
    batchSize = Number(batchSize);
    epochs = Number(epochs);

    if (datasetSize <= 0 || batchSize <= 0 || epochs <= 0) {
      throw new Error("Dataset size, batch size, and epochs must be greater than zero.");
    }

    const fullBatches = Math.floor(datasetSize / batchSize);
    const remainder = datasetSize % batchSize;
    const stepsPerEpoch = dropLast ? fullBatches : Math.ceil(datasetSize / batchSize);
    const totalSteps = stepsPerEpoch * epochs;

    const steps = [
      {
        label: "Step 1: Full batches in one pass (Epoch)",
        calc: `⌊${datasetSize} / ${batchSize}⌋ = <strong>${fullBatches} full batches</strong>`
      },
      {
        label: "Step 2: Leftover data samples",
        calc: remainder > 0
          ? `${remainder} leftover samples (${dropLast ? 'Dropped via drop_last=True' : 'Kept as 1 smaller final batch'})`
          : "Clean divide (0 leftover samples)"
      },
      {
        label: "Step 3: Model weight updates per epoch",
        calc: `<strong>${stepsPerEpoch} steps / epoch</strong>`
      },
      {
        label: "Step 4: Total training steps across all epochs",
        calc: `${stepsPerEpoch} steps/epoch × ${epochs} epochs = <strong>${totalSteps.toLocaleString()} total steps</strong>`
      }
    ];

    return {
      stepsPerEpoch,
      totalSteps,
      fullBatches,
      remainder,
      steps
    };
  },

  /**
   * 9. Train / Val / Test Split Calculator
   */
  calculateDatasetSplit(totalSamples, trainPct, valPct, testPct) {
    totalSamples = Number(totalSamples);
    trainPct = Number(trainPct);
    valPct = Number(valPct);
    testPct = Number(testPct);

    const sumPct = Math.round((trainPct + valPct + testPct) * 10) / 10;
    if (Math.abs(sumPct - 100) > 0.01) {
      throw new Error(`Split percentages must add up to exactly 100%. Current sum: ${sumPct}%`);
    }

    let trainCount = Math.floor(totalSamples * (trainPct / 100));
    let valCount = Math.floor(totalSamples * (valPct / 100));
    let testCount = Math.floor(totalSamples * (testPct / 100));

    // Handle rounding remainder cleanly
    let remainder = totalSamples - (trainCount + valCount + testCount);
    trainCount += remainder; // allocate integer rounding residual to train set

    const steps = [
      { label: "Training Data (used to teach the model)", calc: `${trainPct}% of ${totalSamples.toLocaleString()} = <strong>${trainCount.toLocaleString()}</strong> samples` },
      { label: "Validation Data (used to tune settings and catch overfitting)", calc: `${valPct}% of ${totalSamples.toLocaleString()} = <strong>${valCount.toLocaleString()}</strong> samples` },
      { label: "Test Data (final exam with unseen examples)", calc: `${testPct}% of ${totalSamples.toLocaleString()} = <strong>${testCount.toLocaleString()}</strong> samples` }
    ];

    return {
      trainCount,
      valCount,
      testCount,
      total: totalSamples,
      steps
    };
  },

  /**
   * 10. Learning Rate Schedule Calculator
   */
  calculateLearningRateSchedule(initialLr, totalSteps, scheduleType, params = {}) {
    initialLr = Number(initialLr);
    totalSteps = Number(totalSteps);
    const schedule = [];

    for (let step = 0; step <= totalSteps; step += Math.max(1, Math.floor(totalSteps / 50))) {
      let lr = initialLr;
      if (scheduleType === 'step') {
        const stepSize = params.stepSize || Math.floor(totalSteps / 3);
        const gamma = params.gamma || 0.1;
        lr = initialLr * Math.pow(gamma, Math.floor(step / stepSize));
      } else if (scheduleType === 'cosine') {
        const minLr = params.minLr || 1e-6;
        lr = minLr + 0.5 * (initialLr - minLr) * (1 + Math.cos((Math.PI * step) / totalSteps));
      } else if (scheduleType === 'exponential') {
        const gamma = params.gamma || 0.95;
        lr = initialLr * Math.pow(gamma, step / (totalSteps / 10));
      }
      schedule.push({ step, lr });
    }

    return schedule;
  }
};
