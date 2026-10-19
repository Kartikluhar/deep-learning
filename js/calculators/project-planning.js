/**
 * MLForge Project Planning & Hardware Estimator Calculators
 * GPU VRAM estimation, training duration, and checkpoint sizing.
 */

window.MLForge = window.MLForge || {};
window.MLForge.calculators = window.MLForge.calculators || {};

MLForge.calculators.planning = {
  /**
   * 1. GPU VRAM & Memory Estimator
   */
  estimateVRAM(paramCountBillions, precision = 'fp16', mode = 'inference', batchSize = 1) {
    const params = Number(paramCountBillions) * 1e9; // e.g. 7 * 10^9
    batchSize = Math.max(1, Number(batchSize) || 1);

    if (params <= 0) {
      throw new Error("Parameter count must be greater than zero.");
    }

    let bytesPerParam = 2; // default fp16
    if (precision === 'fp32') bytesPerParam = 4;
    else if (precision === 'fp16' || precision === 'bf16') bytesPerParam = 2;
    else if (precision === 'int8') bytesPerParam = 1;
    else if (precision === 'int4') bytesPerParam = 0.5;

    // Weight memory
    const modelWeightBytes = params * bytesPerParam;
    const modelWeightGB = modelWeightBytes / (1024 ** 3);

    let gradientsGB = 0;
    let optimizerGB = 0;
    let activationsGB = 0;
    let totalVRAM_GB = 0;

    const steps = [
      {
        label: "Model Weights Footprint",
        calc: `${(params / 1e9).toFixed(1)}B parameters × ${bytesPerParam} bytes/param = <strong>${modelWeightGB.toFixed(2)} GB</strong>`
      }
    ];

    if (mode === 'training') {
      // Gradients (typically fp16 or fp32)
      const gradBytesPerParam = precision === 'fp32' ? 4 : 2;
      gradientsGB = (params * gradBytesPerParam) / (1024 ** 3);

      // Adam optimizer maintains 1st (mean) and 2nd (variance) moments in fp32 (8 bytes/param)
      optimizerGB = (params * 8) / (1024 ** 3);

      // Activation memory rule-of-thumb scaled by batch size
      activationsGB = (0.2 * modelWeightGB * Math.sqrt(batchSize));

      // 20% CUDA context & runtime buffer
      const subtotal = modelWeightGB + gradientsGB + optimizerGB + activationsGB;
      totalVRAM_GB = subtotal * 1.20;

      steps.push({
        label: "Gradients Memory",
        calc: `Gradients stored at ${gradBytesPerParam} bytes/param = <strong>${gradientsGB.toFixed(2)} GB</strong>`
      });
      steps.push({
        label: "Optimizer States (Adam / AdamW)",
        calc: `Adam tracks 1st and 2nd moments in fp32 (8 bytes/param) = <strong>${optimizerGB.toFixed(2)} GB</strong>`
      });
      steps.push({
        label: "Estimated Activations & Framework Overhead (+20%)",
        calc: `Activations (~${activationsGB.toFixed(2)} GB) + PyTorch CUDA runtime buffer (~${(totalVRAM_GB - subtotal).toFixed(2)} GB)`
      });
    } else {
      // Inference mode
      // KV cache and forward activation buffer ~25%
      const overhead = modelWeightGB * 0.25;
      totalVRAM_GB = modelWeightGB + overhead;

      steps.push({
        label: "Inference KV Cache & Activation Buffer (~25%)",
        calc: `Temporary activations and KV cache = <strong>${overhead.toFixed(2)} GB</strong>`
      });
    }

    const stepsOutput = [
      ...steps,
      {
        label: "Recommended Minimum GPU VRAM",
        calc: `<strong>${Math.ceil(totalVRAM_GB)} GB</strong> (Estimated actual usage: ${totalVRAM_GB.toFixed(2)} GB)`
      }
    ];

    return {
      modelWeightGB,
      gradientsGB,
      optimizerGB,
      totalVRAM_GB,
      recommendedGPU_VRAM: Math.ceil(totalVRAM_GB),
      steps: stepsOutput
    };
  },

  /**
   * 2. Training Time Estimator
   */
  estimateTrainingTime(datasetSize, batchSize, epochs, stepTimeMs, numGPUs = 1, gpuEfficiencyPct = 95) {
    datasetSize = Number(datasetSize);
    batchSize = Number(batchSize);
    epochs = Number(epochs);
    stepTimeMs = Number(stepTimeMs);
    numGPUs = Math.max(1, Number(numGPUs) || 1);
    const efficiency = (Number(gpuEfficiencyPct) || 95) / 100;

    if (datasetSize <= 0 || batchSize <= 0 || epochs <= 0 || stepTimeMs <= 0) {
      throw new Error("All inputs must be positive non-zero numbers.");
    }

    const stepsPerEpoch = Math.ceil(datasetSize / batchSize);
    const totalSteps = stepsPerEpoch * epochs;

    // Effective step time with multi-GPU scaling
    const effectiveStepTimeSeconds = (stepTimeMs / 1000) / (numGPUs * efficiency);
    const totalSeconds = totalSteps * effectiveStepTimeSeconds;

    const hours = totalSeconds / 3600;
    const days = hours / 24;
    const samplesPerSec = (datasetSize * epochs) / totalSeconds;

    const steps = [
      { label: "Total Steps", calc: `${stepsPerEpoch.toLocaleString()} steps/epoch × ${epochs} epochs = <strong>${totalSteps.toLocaleString()} steps</strong>` },
      { label: "Effective Step Duration", calc: `${(stepTimeMs / 1000).toFixed(3)}s / (${numGPUs} GPUs × ${(efficiency*100).toFixed(0)}% scaling) = <strong>${effectiveStepTimeSeconds.toFixed(4)}s / step</strong>` },
      { label: "Throughput", calc: `<strong>${samplesPerSec.toFixed(1)} samples / second</strong>` },
      { label: "Estimated Wall-Clock Time", calc: days >= 1 ? `<strong>${days.toFixed(2)} days</strong> (${hours.toFixed(1)} hours)` : `<strong>${hours.toFixed(2)} hours</strong> (${(totalSeconds / 60).toFixed(1)} minutes)` }
    ];

    return { totalSteps, totalSeconds, hours, days, samplesPerSec, steps };
  },

  /**
   * 3. Dataset Storage & Checkpoint Size
   */
  estimateStorage(numSamples, featuresOrPixels, bytesPerValue = 4) {
    numSamples = Number(numSamples);
    featuresOrPixels = Number(featuresOrPixels);
    bytesPerValue = Number(bytesPerValue) || 4;

    const rawBytes = numSamples * featuresOrPixels * bytesPerValue;
    const mb = rawBytes / (1024 ** 2);
    const gb = rawBytes / (1024 ** 3);

    const steps = [
      { label: "Raw Dataset Size", calc: `${numSamples.toLocaleString()} samples × ${featuresOrPixels.toLocaleString()} features × ${bytesPerValue} bytes = <strong>${gb >= 1 ? gb.toFixed(2) + ' GB' : mb.toFixed(2) + ' MB'}</strong>` }
    ];

    return { rawBytes, mb, gb, steps };
  }
};
