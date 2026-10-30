/**
 * MLForge Interactive System Design Simulators
 * 1. Load Balancer Simulator (Round Robin, Weighted RR, Least Connections, IP Hash, Failover)
 * 2. Message Queue & Event Stream Simulator (Producers, Topic/Queue, Consumers, Retries, DLQ)
 */

window.MLForge = window.MLForge || {};
window.MLForge.sysdesign = window.MLForge.sysdesign || {};

MLForge.sysdesign.simulators = (function () {

  // =========================================================================
  // 1. LOAD BALANCER SIMULATOR
  // =========================================================================
  const lbState = {
    algorithm: 'round-robin',
    servers: [
      { id: 1, name: 'Server A (us-east-1a)', weight: 1, isOnline: true, activeConnections: 0, totalHandled: 0 },
      { id: 2, name: 'Server B (us-east-1b)', weight: 2, isOnline: true, activeConnections: 0, totalHandled: 0 },
      { id: 3, name: 'Server C (us-east-1c)', weight: 1, isOnline: true, activeConnections: 0, totalHandled: 0 },
      { id: 4, name: 'Server D (us-east-1d)', weight: 3, isOnline: true, activeConnections: 0, totalHandled: 0 }
    ],
    currentIndex: 0,
    weightedIndex: 0,
    weightedCurrentWeight: 0,
    logs: []
  };

  function getOnlineServers() {
    return lbState.servers.filter(s => s.isOnline);
  }

  function pickServer(clientIP = null) {
    const online = getOnlineServers();
    if (online.length === 0) return null;

    if (lbState.algorithm === 'round-robin') {
      const server = online[lbState.currentIndex % online.length];
      lbState.currentIndex = (lbState.currentIndex + 1) % online.length;
      return server;
    }

    if (lbState.algorithm === 'least-connections') {
      // Find server with minimum active connections
      let minServer = online[0];
      for (const s of online) {
        if (s.activeConnections < minServer.activeConnections) {
          minServer = s;
        }
      }
      return minServer;
    }

    if (lbState.algorithm === 'weighted-rr') {
      // Pick based on weight ratios
      const totalWeight = online.reduce((acc, s) => acc + s.weight, 0);
      let rand = Math.floor(Math.random() * totalWeight);
      for (const s of online) {
        if (rand < s.weight) return s;
        rand -= s.weight;
      }
      return online[0];
    }

    if (lbState.algorithm === 'ip-hash') {
      const ip = clientIP || `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
      let hash = 0;
      for (let i = 0; i < ip.length; i++) {
        hash = (hash << 5) - hash + ip.charCodeAt(i);
        hash |= 0;
      }
      const idx = Math.abs(hash) % online.length;
      return online[idx];
    }

    return online[0];
  }

  function sendRequest(clientIP = null) {
    const target = pickServer(clientIP);
    const logTime = new Date().toLocaleTimeString();

    if (!target) {
      lbState.logs.unshift(`[${logTime}] HTTP 503 Service Unavailable: All backend servers are OFFLINE!`);
      if (lbState.logs.length > 30) lbState.logs.pop();
      return { success: false, server: null, message: 'All servers offline (HTTP 503)' };
    }

    target.activeConnections++;
    target.totalHandled++;
    lbState.logs.unshift(`[${logTime}] Routed request to ${target.name} via ${lbState.algorithm.toUpperCase()}`);
    if (lbState.logs.length > 30) lbState.logs.pop();

    // Simulate completion after delay
    setTimeout(() => {
      if (target.activeConnections > 0) target.activeConnections--;
      renderLBSimulator();
    }, 1200);

    return { success: true, server: target };
  }

  function toggleServerStatus(serverId) {
    const s = lbState.servers.find(srv => srv.id === serverId);
    if (s) {
      s.isOnline = !s.isOnline;
      if (!s.isOnline) s.activeConnections = 0;
      lbState.logs.unshift(`[${new Date().toLocaleTimeString()}] ${s.name} marked ${s.isOnline ? 'ONLINE' : 'DOWN (Failed health check)'}`);
      renderLBSimulator();
    }
  }

  function addServer() {
    const nextId = lbState.servers.length + 1;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const char = alphabet[(nextId - 1) % alphabet.length];
    lbState.servers.push({
      id: nextId,
      name: `Server ${char} (us-east-1${char.toLowerCase()})`,
      weight: Math.floor(Math.random() * 3) + 1,
      isOnline: true,
      activeConnections: 0,
      totalHandled: 0
    });
    lbState.logs.unshift(`[${new Date().toLocaleTimeString()}] Provisioned new backend Server ${char}`);
    renderLBSimulator();
  }

  function resetLB() {
    lbState.servers.forEach(s => {
      s.isOnline = true;
      s.activeConnections = 0;
      s.totalHandled = 0;
    });
    lbState.logs = [`[${new Date().toLocaleTimeString()}] Simulator reset.`];
    renderLBSimulator();
  }

  function renderLBSimulator() {
    const container = document.getElementById('lb-simulator-mount');
    if (!container) return;

    container.innerHTML = `
      <div class="simulator-toolbar">
        <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
          <label style="font-size: 0.825rem; font-weight: 600; color: var(--text-secondary);">Algorithm:</label>
          <select id="lb-algo-select" class="calc-input" style="padding: 0.4rem 0.75rem; width: auto;" onchange="MLForge.sysdesign.simulators.setLBAlgo(this.value)">
            <option value="round-robin" ${lbState.algorithm === 'round-robin' ? 'selected' : ''}>Round Robin</option>
            <option value="weighted-rr" ${lbState.algorithm === 'weighted-rr' ? 'selected' : ''}>Weighted Round Robin</option>
            <option value="least-connections" ${lbState.algorithm === 'least-connections' ? 'selected' : ''}>Least Connections</option>
            <option value="ip-hash" ${lbState.algorithm === 'ip-hash' ? 'selected' : ''}>IP Hash</option>
          </select>
          <button class="btn btn-primary" onclick="MLForge.sysdesign.simulators.triggerLBRequest(1)">
            Send 1 Request
          </button>
          <button class="btn btn-secondary" onclick="MLForge.sysdesign.simulators.triggerLBRequest(10)">
            Send Burst (10 Requests)
          </button>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.45rem 0.8rem;" onclick="MLForge.sysdesign.simulators.addLBServer()">
            + Add Server
          </button>
          <button class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.45rem 0.8rem;" onclick="MLForge.sysdesign.simulators.resetLB()">
            Reset Stats
          </button>
        </div>
      </div>

      <!-- Servers Grid -->
      <div class="sim-servers-grid">
        ${lbState.servers.map(s => `
          <div class="sim-server-card ${s.isOnline ? 'active' : 'offline'}" id="sim-server-card-${s.id}">
            <div class="sim-server-header">
              <span class="sim-server-name">${s.name}</span>
              <span class="sim-server-status ${s.isOnline ? '' : 'offline'}" title="${s.isOnline ? 'Healthy (Passing pings)' : 'Down'}"></span>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; justify-content: space-between;">
              <span>Weight: <strong>${s.weight}x</strong></span>
              <span>Active Conns: <strong>${s.activeConnections}</strong></span>
            </div>
            <div style="display: flex; align-items: baseline; justify-content: space-between; margin-top: 0.25rem;">
              <span style="font-size: 0.75rem; color: var(--text-secondary);">Handled:</span>
              <span class="sim-server-count">${s.totalHandled}</span>
            </div>
            <button class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.35rem 0.5rem; margin-top: 0.5rem; width: 100%; border-color: ${s.isOnline ? 'rgba(244,63,94,0.3)' : 'rgba(16,185,129,0.3)'};" onclick="MLForge.sysdesign.simulators.toggleLBServer(${s.id})">
              ${s.isOnline ? 'Mark Server Down' : 'Bring Server Online'}
            </button>
          </div>
        `).join('')}
      </div>

      <!-- Live Traffic Log -->
      <div style="margin-top: 1rem;">
        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.4rem; letter-spacing: 0.05em;">
          Live Traffic Routing Log
        </div>
        <div class="sim-traffic-log" id="sim-lb-log">
          ${lbState.logs.length ? lbState.logs.map(l => `<div>${l}</div>`).join('') : '<div>Click "Send 1 Request" to start simulated traffic...</div>'}
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 2. MESSAGE QUEUE & EVENT STREAM SIMULATOR
  // =========================================================================
  const mqState = {
    queue: [
      { id: 'msg_101', payload: 'Order #4102 Placed', attempts: 0 },
      { id: 'msg_102', payload: 'User #88 Signup Welcome', attempts: 0 },
      { id: 'msg_103', payload: 'Payment #99 Verified', attempts: 0 }
    ],
    dlq: [],
    processedCount: 0,
    consumers: [
      { id: 1, name: 'Worker Alpha', isFailing: false, isBusy: false },
      { id: 2, name: 'Worker Beta', isFailing: false, isBusy: false }
    ],
    nextMsgId: 104
  };

  function publishMessage(payloadText = null) {
    const payload = payloadText || `Task #${mqState.nextMsgId} - Process Payment`;
    const msg = { id: `msg_${mqState.nextMsgId++}`, payload, attempts: 0 };
    mqState.queue.push(msg);
    renderMQSimulator();
  }

  function processNextMessage() {
    if (mqState.queue.length === 0) return;
    const availableWorker = mqState.consumers.find(c => !c.isBusy);
    if (!availableWorker) {
      alert('All consumers are currently busy processing. Please wait or add another worker.');
      return;
    }

    const msg = mqState.queue.shift();
    availableWorker.isBusy = true;
    renderMQSimulator();

    setTimeout(() => {
      availableWorker.isBusy = false;
      if (availableWorker.isFailing) {
        // Consumer simulated failure
        msg.attempts++;
        if (msg.attempts >= 3) {
          // Exceeded max retries -> Move to DLQ
          mqState.dlq.push({ ...msg, failedReason: `Failed 3 times on ${availableWorker.name} (Max Retries Exceeded)` });
        } else {
          // Re-queue with exponential retry
          mqState.queue.push(msg);
        }
      } else {
        // Success
        mqState.processedCount++;
      }
      renderMQSimulator();
    }, 900);
  }

  function addConsumer() {
    const nextId = mqState.consumers.length + 1;
    const names = ['Gamma', 'Delta', 'Epsilon', 'Zeta'];
    mqState.consumers.push({
      id: nextId,
      name: `Worker ${names[(nextId - 3) % names.length] || nextId}`,
      isFailing: false,
      isBusy: false
    });
    renderMQSimulator();
  }

  function toggleConsumerFailure(consumerId) {
    const c = mqState.consumers.find(w => w.id === consumerId);
    if (c) {
      c.isFailing = !c.isFailing;
      renderMQSimulator();
    }
  }

  function redriveDLQ() {
    while (mqState.dlq.length > 0) {
      const msg = mqState.dlq.shift();
      msg.attempts = 0;
      delete msg.failedReason;
      mqState.queue.push(msg);
    }
    renderMQSimulator();
  }

  function renderMQSimulator() {
    const container = document.getElementById('mq-simulator-mount');
    if (!container) return;

    container.innerHTML = `
      <div class="mq-sim-grid">
        <!-- 1. Producer Box -->
        <div class="mq-box">
          <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main); display: flex; align-items: center; justify-content: space-between;">
            <span>Producers</span>
            <span class="badge badge-sysdesign-amber" style="font-size: 0.65rem;">Active</span>
          </div>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">
            Produce asynchronous messages into the topic queue.
          </p>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
            <input type="text" id="mq-custom-msg" class="calc-input" placeholder="e.g. Charge Card $49" style="font-size: 0.8rem; padding: 0.45rem;">
            <button class="btn btn-primary" style="font-size: 0.8rem; padding: 0.5rem;" onclick="MLForge.sysdesign.simulators.publishCustomMQ()">
              + Publish Message
            </button>
            <button class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.4rem;" onclick="MLForge.sysdesign.simulators.publishBatchMQ(5)">
              Send Burst (5 Messages)
            </button>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: auto;">
            Total Successfully Processed: <strong style="color: #10b981;">${mqState.processedCount}</strong>
          </div>
        </div>

        <!-- 2. Message Broker Queue Track -->
        <div class="mq-box">
          <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main); display: flex; align-items: center; justify-content: space-between;">
            <span>Queue / Topic Buffer: <code>orders.events</code></span>
            <span class="badge badge-secondary" style="font-size: 0.7rem;">${mqState.queue.length} in buffer</span>
          </div>

          <div class="mq-queue-track">
            ${mqState.queue.length === 0 ? '<div style="color: var(--text-muted); font-size: 0.8rem; text-align: center; margin: auto;">Queue is empty. Publish a message to begin.</div>' : ''}
            ${mqState.queue.map(m => `
              <div class="mq-message-pill">
                <span><strong>[${m.id}]</strong> ${m.payload}</span>
                ${m.attempts > 0 ? `<span class="badge" style="background: rgba(244,63,94,0.15); color: #f43f5e; font-size: 0.65rem;">Retry #${m.attempts}</span>` : ''}
              </div>
            `).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
            <button class="btn btn-primary" style="font-size: 0.8rem; padding: 0.45rem 0.85rem;" onclick="MLForge.sysdesign.simulators.processMQ()">
              ⚡ Process 1 Message
            </button>
            <button class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.4rem 0.6rem;" onclick="MLForge.sysdesign.simulators.processAllMQ()">
              Process All
            </button>
          </div>

          <!-- Dead-Letter Queue -->
          <div style="margin-top: 1rem; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <span style="font-size: 0.75rem; font-weight: 700; color: #f43f5e; text-transform: uppercase;">
                Dead-Letter Queue (DLQ): ${mqState.dlq.length}
              </span>
              ${mqState.dlq.length > 0 ? `<button class="btn btn-secondary" style="font-size: 0.65rem; padding: 2px 6px;" onclick="MLForge.sysdesign.simulators.redriveDLQ()">Re-Drive DLQ</button>` : ''}
            </div>
            <div class="mq-dlq-box">
              ${mqState.dlq.length === 0 ? '<span style="font-size: 0.75rem; color: var(--text-muted);">No poison messages isolated yet.</span>' : ''}
              ${mqState.dlq.map(d => `
                <div style="font-size: 0.75rem; color: #f43f5e; margin-bottom: 0.35rem; font-family: var(--font-mono);">
                  <strong>${d.id}:</strong> ${d.payload} <br>
                  <span style="color: var(--text-muted); font-size: 0.68rem;">${d.failedReason}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 3. Consumer Workers Box -->
        <div class="mq-box">
          <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main); display: flex; align-items: center; justify-content: space-between;">
            <span>Consumer Fleet</span>
            <button class="btn btn-secondary" style="font-size: 0.7rem; padding: 2px 6px;" onclick="MLForge.sysdesign.simulators.addConsumer()">
              + Worker
            </button>
          </div>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">
            Workers pull and process messages. Toggle "Simulate Crash" to observe retries and DLQ isolation.
          </p>
          <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.5rem;">
            ${mqState.consumers.map(c => `
              <div style="background: var(--bg-card); border: 1px solid ${c.isFailing ? 'rgba(244,63,94,0.4)' : 'var(--border-subtle)'}; border-radius: var(--radius-sm); padding: 0.65rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                  <span style="font-weight: 600; font-size: 0.825rem; color: var(--text-main);">${c.name}</span>
                  <span class="badge ${c.isBusy ? 'badge-sysdesign-amber' : 'badge-emerald'}" style="font-size: 0.6rem;">
                    ${c.isBusy ? 'Processing...' : 'Idle'}
                  </span>
                </div>
                <button class="btn btn-secondary" style="font-size: 0.7rem; width: 100%; padding: 0.25rem; color: ${c.isFailing ? '#f43f5e' : 'var(--text-secondary)'};" onclick="MLForge.sysdesign.simulators.toggleConsumerFailure(${c.id})">
                  ${c.isFailing ? '⚠️ Failing (Poison Mode)' : 'Healthy Worker'}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  return {
    renderLBSimulator,
    triggerLBRequest(count = 1) {
      for (let i = 0; i < count; i++) {
        setTimeout(() => sendRequest(), i * 150);
      }
      renderLBSimulator();
    },
    setLBAlgo(algo) {
      lbState.algorithm = algo;
      lbState.logs.unshift(`[${new Date().toLocaleTimeString()}] Switched algorithm to ${algo.toUpperCase()}`);
      renderLBSimulator();
    },
    toggleLBServer(id) {
      toggleServerStatus(id);
    },
    addLBServer() {
      addServer();
    },
    resetLB() {
      resetLB();
    },

    // Message Queue
    renderMQSimulator,
    publishCustomMQ() {
      const input = document.getElementById('mq-custom-msg');
      const val = input ? input.value.trim() : '';
      publishMessage(val || null);
      if (input) input.value = '';
    },
    publishBatchMQ(count = 5) {
      for (let i = 0; i < count; i++) publishMessage();
    },
    processMQ() {
      processNextMessage();
    },
    processAllMQ() {
      let interval = setInterval(() => {
        if (mqState.queue.length === 0) {
          clearInterval(interval);
        } else {
          processNextMessage();
        }
      }, 500);
    },
    addConsumer() {
      addConsumer();
    },
    toggleConsumerFailure(id) {
      toggleConsumerFailure(id);
    },
    redriveDLQ() {
      redriveDLQ();
    }
  };
})();

