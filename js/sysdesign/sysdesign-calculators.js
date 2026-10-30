/**
 * MLForge System Design Calculators
 * High-precision calculators for Capacity Estimation, Cache Hit Ratio,
 * High Availability Downtime, and Little's Law Queueing.
 * Includes complete input validation, unit formatting (KB, MB, GB, TB, PB),
 * and zero/empty value safety.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sysdesign = window.MLForge.sysdesign || {};

MLForge.sysdesign.calculators = (function () {

  // Format bytes into human readable KB, MB, GB, TB, PB
  function formatBytes(bytes) {
    if (!bytes || bytes <= 0 || isNaN(bytes)) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const val = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
    return `${val} ${sizes[i] || 'PB'}`;
  }

  // Format large numbers with commas
  function formatNumber(num) {
    if (isNaN(num)) return '0';
    return Number(num).toLocaleString('en-US');
  }

  return {
    formatBytes,
    formatNumber,

    // =========================================================================
    // 1. Capacity Estimation Calculator
    // =========================================================================
    calculateCapacity(params = {}) {
      const dau = Math.max(0, parseFloat(params.dau) || 0);
      const reqsPerUser = Math.max(0, parseFloat(params.reqsPerUser) || 0);
      const peakMultiplier = Math.max(1, parseFloat(params.peakMultiplier) || 2.0);
      const payloadSizeKB = Math.max(0, parseFloat(params.payloadSizeKB) || 1.0);
      const storagePerUserMB = Math.max(0, parseFloat(params.storagePerUserMB) || 0.5);
      const retentionYears = Math.max(0.1, parseFloat(params.retentionYears) || 1.0);
      const replicationFactor = Math.max(1, parseInt(params.replicationFactor, 10) || 3);
      const avgLatencySec = Math.max(0.001, parseFloat(params.avgLatencySec) || 0.1); // 100ms default

      // Requests calculation
      const dailyRequests = dau * reqsPerUser;
      const avgRPS = Math.round(dailyRequests / 86400);
      const peakRPS = Math.round(avgRPS * peakMultiplier);

      // Storage calculation
      // Raw Storage = DAU * StoragePerUser * RetentionYears (or yearly user generation)
      const rawStorageBytes = dau * (storagePerUserMB * 1024 * 1024) * retentionYears;
      const replicatedStorageBytes = rawStorageBytes * replicationFactor;

      // Bandwidth calculation
      const avgBytesPerSec = avgRPS * (payloadSizeKB * 1024);
      const peakBytesPerSec = peakRPS * (payloadSizeKB * 1024);
      const avgBitsPerSec = avgBytesPerSec * 8;
      const peakBitsPerSec = peakBytesPerSec * 8;

      // Little's Law: L = Lambda * W
      const concurrentRequests = Math.round(avgRPS * avgLatencySec);
      const peakConcurrentRequests = Math.round(peakRPS * avgLatencySec);

      return {
        dailyRequests: formatNumber(dailyRequests),
        avgRPS: formatNumber(avgRPS),
        peakRPS: formatNumber(peakRPS),
        rawStorage: formatBytes(rawStorageBytes),
        rawStorageBytes,
        replicatedStorage: formatBytes(replicatedStorageBytes),
        replicatedStorageBytes,
        avgBandwidthBytes: `${formatBytes(avgBytesPerSec)}/s`,
        avgBandwidthBits: `${(avgBitsPerSec / 1000000).toFixed(2)} Mbps`,
        peakBandwidthBytes: `${formatBytes(peakBytesPerSec)}/s`,
        peakBandwidthBits: `${(peakBitsPerSec / 1000000).toFixed(2)} Mbps`,
        concurrentRequests: formatNumber(concurrentRequests),
        peakConcurrentRequests: formatNumber(peakConcurrentRequests)
      };
    },

    // =========================================================================
    // 2. Cache Hit Ratio Calculator
    // =========================================================================
    calculateCacheHitRatio(hits, misses, cacheLatencyMs = 2, dbLatencyMs = 50) {
      const h = Math.max(0, parseInt(hits, 10) || 0);
      const m = Math.max(0, parseInt(misses, 10) || 0);
      const cLat = Math.max(0.1, parseFloat(cacheLatencyMs) || 2);
      const dLat = Math.max(0.1, parseFloat(dbLatencyMs) || 50);

      const total = h + m;
      if (total === 0) {
        return {
          hitRatioPercent: '0.00',
          totalRequests: 0,
          effectiveLatencyMs: dLat.toFixed(2),
          latencySavedPercent: 0,
          recommendation: 'Enter positive hit and miss values to evaluate cache performance.'
        };
      }

      const ratio = (h / total) * 100;
      // Effective Latency = (Ratio * CacheLatency) + ((1 - Ratio) * DBLatency)
      const ratioFraction = h / total;
      const effectiveLatency = (ratioFraction * cLat) + ((1 - ratioFraction) * dLat);
      const savedPercent = Math.max(0, ((dLat - effectiveLatency) / dLat) * 100);

      let recommendation = '';
      if (ratio >= 90) {
        recommendation = 'Excellent! High cache efficiency. Over 90% of requests are served from memory, significantly shielding your database.';
      } else if (ratio >= 75) {
        recommendation = 'Good performance. Consider tuning TTLs, expanding cache memory, or reviewing cache keys to push hit ratio above 85%.';
      } else {
        recommendation = 'Sub-optimal cache ratio. High cache misses indicate hot key expiration, cache stampedes, or unpredictable non-repetitive read keys.';
      }

      return {
        hitRatioPercent: ratio.toFixed(2),
        totalRequests: formatNumber(total),
        effectiveLatencyMs: effectiveLatency.toFixed(2),
        latencySavedPercent: Math.round(savedPercent),
        recommendation
      };
    },

    // =========================================================================
    // 3. High Availability & Downtime Calculator
    // =========================================================================
    calculateDowntime(availabilityPercent) {
      let avail = parseFloat(availabilityPercent);
      if (isNaN(avail) || avail < 0) avail = 99.0;
      if (avail > 100) avail = 100.0;

      const failureRatio = (100 - avail) / 100;

      // Seconds in time frames
      const daySecs = 86400;
      const monthSecs = 30.4375 * 86400; // Average month in days
      const yearSecs = 365.25 * 86400;   // Leap year average

      function formatDuration(totalSeconds) {
        if (totalSeconds <= 0) return '0s';
        if (totalSeconds < 60) return `${totalSeconds.toFixed(1)}s`;
        const minutes = Math.floor(totalSeconds / 60);
        const remSecs = Math.round(totalSeconds % 60);
        if (minutes < 60) return `${minutes}m ${remSecs}s`;
        const hours = Math.floor(minutes / 60);
        const remMins = minutes % 60;
        if (hours < 24) return `${hours}h ${remMins}m`;
        const days = Math.floor(hours / 24);
        const remHours = hours % 24;
        return `${days}d ${remHours}h ${remMins}m`;
      }

      return {
        availability: avail.toFixed(avail >= 99.99 ? 4 : 2),
        downtimeDay: formatDuration(daySecs * failureRatio),
        downtimeMonth: formatDuration(monthSecs * failureRatio),
        downtimeYear: formatDuration(yearSecs * failureRatio),
        downtimeDaySeconds: (daySecs * failureRatio).toFixed(1),
        downtimeMonthSeconds: (monthSecs * failureRatio).toFixed(1),
        downtimeYearSeconds: (yearSecs * failureRatio).toFixed(1)
      };
    },

    // =========================================================================
    // 4. Little's Law Calculator
    // =========================================================================
    calculateLittlesLaw(arrivalRate, responseTimeSec) {
      const lambda = Math.max(0, parseFloat(arrivalRate) || 0);
      const w = Math.max(0, parseFloat(responseTimeSec) || 0);
      const l = lambda * w;

      return {
        concurrency: Math.round(l * 100) / 100,
        explanation: `With an arrival rate of $\\lambda = ${lambda}$ req/s and latency of $W = ${w}$ s, there are on average $L = ${l.toFixed(2)}$ concurrent requests in the system.`
      };
    }
  };
})();

