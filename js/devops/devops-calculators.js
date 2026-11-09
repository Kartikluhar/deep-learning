/**
 * MLForge DevOps & Cloud Computing Interactive Calculators Engine
 * 10 High-Precision Calculators with correct mathematical formulas,
 * input validation, and step-by-step arithmetic explanations.
 * (Note: AWS pricing calculators provide benchmark estimates based on standard on-demand pricing tiers).
 */

window.MLForge = window.MLForge || {};
window.MLForge.devops = window.MLForge.devops || {};

MLForge.devops.calculators = (function () {
  
  // Format numbers with commas
  function formatNum(n) {
    if (isNaN(n)) return '0';
    return Number(n).toLocaleString('en-US');
  }

  // Format currency
  function formatUSD(val) {
    if (isNaN(val) || val < 0) return '$0.00';
    return `$${Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  return {
    // =========================================================================
    // 1. AWS Monthly Cost Estimation Calculator (EC2 + S3 + RDS + Bandwidth)
    // =========================================================================
    calculateAwsCost(params = {}) {
      const ec2Count = Math.max(0, parseInt(params.ec2Count, 10) || 1);
      const ec2RatePerHour = Math.max(0, parseFloat(params.ec2RatePerHour) || 0.0416); // e.g. t3.medium ~$0.0416/hr
      const s3StorageGB = Math.max(0, parseFloat(params.s3StorageGB) || 100);
      const s3RatePerGB = 0.023; // AWS Standard S3 tier ~$0.023/GB/mo
      const rdsMonthlyBase = Math.max(0, parseFloat(params.rdsMonthlyBase) || 30.0); // e.g. db.t3.micro/small
      const dataTransferGB = Math.max(0, parseFloat(params.dataTransferGB) || 200);
      const egressRatePerGB = 0.09; // First 10TB out ~$0.09/GB

      const hoursPerMonth = 730; // Standard AWS billing calculation average
      const ec2Total = ec2Count * ec2RatePerHour * hoursPerMonth;
      const s3Total = s3StorageGB * s3RatePerGB;
      const rdsTotal = rdsMonthlyBase;
      // AWS gives first 100GB of Internet egress free per month
      const billableEgressGB = Math.max(0, dataTransferGB - 100);
      const egressTotal = billableEgressGB * egressRatePerGB;

      const grandTotalMonthly = ec2Total + s3Total + rdsTotal + egressTotal;
      const grandTotalYearly = grandTotalMonthly * 12;

      return {
        ec2Total: formatUSD(ec2Total),
        s3Total: formatUSD(s3Total),
        rdsTotal: formatUSD(rdsTotal),
        egressTotal: formatUSD(egressTotal),
        grandTotalMonthly: formatUSD(grandTotalMonthly),
        grandTotalYearly: formatUSD(grandTotalYearly),
        breakdown: `${ec2Count} EC2 instance(s) @ ${formatUSD(ec2RatePerHour)}/hr × 730 hrs = ${formatUSD(ec2Total)} | S3: ${s3StorageGB} GB × $0.023 = ${formatUSD(s3Total)} | RDS: ${formatUSD(rdsTotal)} | Outbound Egress (${billableEgressGB} GB billable): ${formatUSD(egressTotal)}.`
      };
    },

    // =========================================================================
    // 2. Cloud Storage Cost Comparison (S3 Standard vs IA vs Glacier vs Deep Archive)
    // =========================================================================
    calculateStorageCost(gigabytes = 1000) {
      const gb = Math.max(0, parseFloat(gigabytes) || 0);
      // Approximate AWS S3 baseline rates per GB per month
      const rateStandard = 0.023;
      const rateIA = 0.0125;
      const rateGlacier = 0.0036;
      const rateDeepArchive = 0.00099;

      const costStandard = gb * rateStandard;
      const costIA = gb * rateIA;
      const costGlacier = gb * rateGlacier;
      const costDeepArchive = gb * rateDeepArchive;
      const savingsDeepArchive = costStandard > 0 ? ((costStandard - costDeepArchive) / costStandard * 100).toFixed(1) : 0;

      return {
        gb: formatNum(gb),
        costStandard: formatUSD(costStandard),
        costIA: formatUSD(costIA),
        costGlacier: formatUSD(costGlacier),
        costDeepArchive: formatUSD(costDeepArchive),
        savingsPercent: `${savingsDeepArchive}%`,
        breakdown: `Storing ${formatNum(gb)} GB on S3 Deep Archive saves ${savingsDeepArchive}% compared to S3 Standard ($${costDeepArchive.toFixed(2)}/mo vs $${costStandard.toFixed(2)}/mo).`
      };
    },

    // =========================================================================
    // 3. EC2 Monthly Cost Calculator (On-Demand vs Reserved vs Spot)
    // =========================================================================
    calculateEc2Monthly(instanceCount = 2, hourlyRate = 0.0832) {
      const count = Math.max(1, parseInt(instanceCount, 10) || 1);
      const rate = Math.max(0, parseFloat(hourlyRate) || 0.0832);
      const hours = 730;

      const onDemandMonthly = count * rate * hours;
      // Reserved instances save ~40% to ~60%
      const reserved1YrMonthly = onDemandMonthly * 0.60; // 40% discount
      const reserved3YrMonthly = onDemandMonthly * 0.40; // 60% discount
      // Spot instances save ~70%
      const spotMonthly = onDemandMonthly * 0.30; // 70% discount

      return {
        onDemandMonthly: formatUSD(onDemandMonthly),
        reserved1YrMonthly: formatUSD(reserved1YrMonthly),
        reserved3YrMonthly: formatUSD(reserved3YrMonthly),
        spotMonthly: formatUSD(spotMonthly),
        annualOnDemand: formatUSD(onDemandMonthly * 12),
        annualReserved1Yr: formatUSD(reserved1YrMonthly * 12),
        breakdown: `Switching ${count} instance(s) to a 1-Year Reserved Plan saves ${formatUSD(onDemandMonthly - reserved1YrMonthly)} each month (${formatUSD((onDemandMonthly - reserved1YrMonthly) * 12)} per year).`
      };
    },

    // =========================================================================
    // 4. Docker Host Resource Allocation Calculator
    // =========================================================================
    calculateDockerResources(containerCount = 10, cpuPerContainer = 0.25, ramPerContainerMB = 256) {
      const count = Math.max(1, parseInt(containerCount, 10) || 1);
      const cpu = Math.max(0.01, parseFloat(cpuPerContainer) || 0.25);
      const ramMB = Math.max(16, parseFloat(ramPerContainerMB) || 256);

      const totalRequiredCpuCores = count * cpu;
      const totalRequiredRamMB = count * ramMB;
      const totalRequiredRamGB = totalRequiredRamMB / 1024;

      // Recommended host provision with 25% safety overhead for Linux kernel and Docker daemon
      const recommendedCpuCores = Math.ceil(totalRequiredCpuCores * 1.25);
      const recommendedRamGB = Math.ceil(totalRequiredRamGB * 1.25);

      return {
        totalCpu: `${totalRequiredCpuCores.toFixed(2)} vCPUs`,
        totalRam: `${totalRequiredRamGB.toFixed(2)} GB (${formatNum(totalRequiredRamMB)} MB)`,
        recommendedCpu: `${recommendedCpuCores} vCPUs (with 25% host OS buffer)`,
        recommendedRam: `${recommendedRamGB} GB RAM (with 25% host OS buffer)`,
        breakdown: `${count} containers @ ${cpu} vCPU and ${ramMB} MB RAM require minimum ${totalRequiredCpuCores.toFixed(2)} cores & ${totalRequiredRamGB.toFixed(2)} GB RAM. Recommended host size: ${recommendedCpuCores} cores, ${recommendedRamGB} GB RAM.`
      };
    },

    // =========================================================================
    // 5. CIDR & Subnet Calculator (/16 to /30)
    // =========================================================================
    calculateSubnet(cidrPrefix = 24) {
      const prefix = Math.min(30, Math.max(16, parseInt(cidrPrefix, 10) || 24));
      const hostBits = 32 - prefix;
      const totalIps = Math.pow(2, hostBits);
      // Standard subnets reserve 2 IPs (Network + Broadcast). In AWS, 5 IPs are reserved!
      const usableStandardIps = Math.max(0, totalIps - 2);
      const usableAwsIps = Math.max(0, totalIps - 5);

      // Calculate subnet mask
      const maskBinary = '1'.repeat(prefix) + '0'.repeat(hostBits);
      const octets = [];
      for (let i = 0; i < 4; i++) {
        octets.push(parseInt(maskBinary.slice(i * 8, (i + 1) * 8), 2));
      }
      const subnetMask = octets.join('.');

      return {
        prefix: `/${prefix}`,
        subnetMask,
        totalIps: formatNum(totalIps),
        usableStandardIps: formatNum(usableStandardIps),
        usableAwsIps: formatNum(usableAwsIps),
        breakdown: `A /${prefix} network has ${hostBits} host bits, yielding ${formatNum(totalIps)} total IP addresses. In AWS VPCs, 5 addresses (.0, .1, .2, .3, and .255) are reserved by Amazon, leaving ${formatNum(usableAwsIps)} assignable IPs for EC2 instances.`
      };
    },

    // =========================================================================
    // 6. IP Address Class & Range Calculator
    // =========================================================================
    calculateIpInfo(ipString = "192.168.1.1") {
      const parts = String(ipString).trim().split('.');
      if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        return {
          valid: false,
          message: "Please enter a valid IPv4 address (e.g. 10.0.1.5 or 192.168.1.1)."
        };
      }

      const firstOctet = parseInt(parts[0], 10);
      const secondOctet = parseInt(parts[1], 10);
      let ipClass = 'Unknown';
      let type = 'Public Internet IP';
      let defaultMask = '255.255.255.0';

      if (firstOctet >= 1 && firstOctet <= 126) {
        ipClass = 'Class A (Huge Networks)';
        defaultMask = '255.0.0.0 (/8)';
      } else if (firstOctet >= 128 && firstOctet <= 191) {
        ipClass = 'Class B (Medium Networks)';
        defaultMask = '255.255.0.0 (/16)';
      } else if (firstOctet >= 192 && firstOctet <= 223) {
        ipClass = 'Class C (Small Networks)';
        defaultMask = '255.255.255.0 (/24)';
      } else if (firstOctet >= 224 && firstOctet <= 239) {
        ipClass = 'Class D (Multicast)';
      } else if (firstOctet >= 240 && firstOctet <= 255) {
        ipClass = 'Class E (Experimental)';
      }

      // Check RFC 1918 Private IP Ranges
      if (firstOctet === 10) {
        type = 'Private IP (RFC 1918 - Class A Range 10.0.0.0/8)';
      } else if (firstOctet === 172 && (secondOctet >= 16 && secondOctet <= 31)) {
        type = 'Private IP (RFC 1918 - Class B Range 172.16.0.0/12)';
      } else if (firstOctet === 192 && secondOctet === 168) {
        type = 'Private IP (RFC 1918 - Class C Range 192.168.0.0/16)';
      } else if (firstOctet === 127) {
        type = 'Loopback Localhost Address (127.0.0.1)';
      }

      const binary = parts.map(p => Number(p).toString(2).padStart(8, '0')).join('.');

      return {
        valid: true,
        ip: ipString,
        ipClass,
        type,
        defaultMask,
        binary,
        breakdown: `${ipString} is a ${type} within ${ipClass}. Default subnet mask: ${defaultMask}.`
      };
    },

    // =========================================================================
    // 7. High Availability & Downtime Calculator (The 9's of Availability)
    // =========================================================================
    calculateAvailabilityDowntime(percentage = 99.9) {
      const pct = Math.min(99.9999, Math.max(90, parseFloat(percentage) || 99.0));
      const downtimeRatio = (100 - pct) / 100;

      const secondsPerYear = 365.25 * 24 * 3600;
      const secondsPerMonth = (365.25 / 12) * 24 * 3600;
      const secondsPerWeek = 7 * 24 * 3600;
      const secondsPerDay = 24 * 3600;

      function fmtSeconds(s) {
        if (s < 60) return `${s.toFixed(1)} seconds`;
        const mins = s / 60;
        if (mins < 60) return `${mins.toFixed(1)} minutes`;
        const hrs = mins / 60;
        if (hrs < 24) return `${hrs.toFixed(1)} hours`;
        const days = hrs / 24;
        return `${days.toFixed(2)} days`;
      }

      return {
        availability: `${pct}%`,
        downtimePerYear: fmtSeconds(secondsPerYear * downtimeRatio),
        downtimePerMonth: fmtSeconds(secondsPerMonth * downtimeRatio),
        downtimePerWeek: fmtSeconds(secondsPerWeek * downtimeRatio),
        downtimePerDay: fmtSeconds(secondsPerDay * downtimeRatio),
        breakdown: `At ${pct}% availability, your application is legally permitted to experience a maximum of ${fmtSeconds(secondsPerYear * downtimeRatio)} of downtime per year before breaching its SLA.`
      };
    },

    // =========================================================================
    // 8. Uptime Percentage Calculator from Actual Downtime Minutes
    // =========================================================================
    calculateUptimePercentage(downtimeMinutes = 45, periodDays = 30) {
      const downMins = Math.max(0, parseFloat(downtimeMinutes) || 0);
      const days = Math.max(1, parseFloat(periodDays) || 30);
      const totalMinutesInPeriod = days * 24 * 60;

      const actualUptimeMinutes = Math.max(0, totalMinutesInPeriod - downMins);
      const uptimePercentage = ((actualUptimeMinutes / totalMinutesInPeriod) * 100).toFixed(4);

      return {
        totalMinutes: formatNum(totalMinutesInPeriod),
        downMinutes: downMins,
        uptimePercentage: `${uptimePercentage}%`,
        period: `${days} days`,
        breakdown: `${downMins} minutes of downtime out of ${formatNum(totalMinutesInPeriod)} total minutes over ${days} days results in an actual uptime of ${uptimePercentage}%.`
      };
    },

    // =========================================================================
    // 9. CI/CD Deployment Time Estimator
    // =========================================================================
    calculateDeploymentTime(params = {}) {
      const gitCheckoutSec = Math.max(1, parseInt(params.gitCheckoutSec, 10) || 5);
      const testSuiteSec = Math.max(0, parseInt(params.testSuiteSec, 10) || 45);
      const dockerBuildSec = Math.max(5, parseInt(params.dockerBuildSec, 10) || 60);
      const registryPushSec = Math.max(2, parseInt(params.registryPushSec, 10) || 20);
      const serverDeploySec = Math.max(5, parseInt(params.serverDeploySec, 10) || 15);
      const healthCheckSec = Math.max(2, parseInt(params.healthCheckSec, 10) || 10);

      const totalSec = gitCheckoutSec + testSuiteSec + dockerBuildSec + registryPushSec + serverDeploySec + healthCheckSec;
      const totalMin = (totalSec / 60).toFixed(1);

      return {
        totalSeconds: totalSec,
        totalMinutes: `${totalMin} min`,
        breakdown: `Pipeline stages: Checkout (${gitCheckoutSec}s) + Tests (${testSuiteSec}s) + Docker Build (${dockerBuildSec}s) + Registry Push (${registryPushSec}s) + Host Deploy (${serverDeploySec}s) + Health Check (${healthCheckSec}s) = ${totalSec} seconds (${totalMin} minutes).`
      };
    },

    // =========================================================================
    // 10. Data Transfer Out (Egress) Cost Calculator
    // =========================================================================
    calculateDataTransferCost(gigabytesOut = 500) {
      const gb = Math.max(0, parseFloat(gigabytesOut) || 0);
      // AWS provides first 100 GB / month free
      const freeTierGB = 100;
      const billableGB = Math.max(0, gb - freeTierGB);

      // Typical tiering: Next 9,900 GB @ $0.09/GB
      const costPerGB = 0.09;
      const totalCost = billableGB * costPerGB;

      return {
        totalGB: `${formatNum(gb)} GB`,
        freeGB: `${Math.min(gb, freeTierGB)} GB (AWS Free Tier)`,
        billableGB: `${formatNum(billableGB)} GB`,
        estimatedCost: formatUSD(totalCost),
        breakdown: `Transferring ${formatNum(gb)} GB to the public internet: first 100 GB is free. Remaining ${formatNum(billableGB)} GB × $0.09 = ${formatUSD(totalCost)} estimated monthly cost.`
      };
    }
  };
})();

