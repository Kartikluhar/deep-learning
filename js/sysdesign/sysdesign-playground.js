/**
 * MLForge Architecture Diagram Playground
 * Interactive visual canvas for building, connecting, and exporting system architectures.
 * Features drag-and-drop node placement, SVG arrow connectors with labels,
 * pre-built templates, image/JSON export, and LocalStorage persistence.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sysdesign = window.MLForge.sysdesign || {};

MLForge.sysdesign.playground = (function () {
  let nodes = [];
  let connections = [];
  let nextNodeId = 1;
  let connectSourceNode = null;
  let isDragging = false;
  let dragNode = null;
  let dragOffset = { x: 0, y: 0 };
  let canvasEl = null;
  let svgEl = null;

  const COMPONENT_TYPES = [
    { type: 'client', label: 'Web / Mobile Client', icon: 'smartphone', color: '#0ea5e9' },
    { type: 'cdn', label: 'Cloudflare / Edge CDN', icon: 'globe', color: '#06b6d4' },
    { type: 'load-balancer', label: 'Load Balancer (Nginx/ALB)', icon: 'git-merge', color: '#f59e0b' },
    { type: 'api-gateway', label: 'API Gateway (Kong/BFF)', icon: 'shield', color: '#8b5cf6' },
    { type: 'app-server', label: 'Application Server', icon: 'server', color: '#10b981' },
    { type: 'microservice', label: 'Microservice Pod', icon: 'box', color: '#10b981' },
    { type: 'sql-db', label: 'SQL Database (Postgres)', icon: 'database', color: '#3b82f6' },
    { type: 'nosql-db', label: 'NoSQL DB (Cassandra/Mongo)', icon: 'layers', color: '#ec4899' },
    { type: 'cache', label: 'Redis / In-Memory Cache', icon: 'zap', color: '#f97316' },
    { type: 'message-queue', label: 'Message Queue (Kafka)', icon: 'mail', color: '#f59e0b' },
    { type: 'object-storage', label: 'Object Storage (S3)', icon: 'hard-drive', color: '#0ea5e9' },
    { type: 'search-engine', label: 'Elasticsearch / OpenSearch', icon: 'search', color: '#14b8a6' },
    { type: 'monitoring', label: 'Prometheus / Grafana', icon: 'activity', color: '#a855f7' }
  ];

  // Pre-built Starter Templates
  const STARTER_TEMPLATES = {
    'three-tier': {
      name: 'Three-Tier Web Application',
      nodes: [
        { id: 1, type: 'client', label: 'User Browser', x: 50, y: 150 },
        { id: 2, type: 'cdn', label: 'Cloudflare Edge CDN', x: 260, y: 150 },
        { id: 3, type: 'load-balancer', label: 'Nginx Load Balancer', x: 480, y: 150 },
        { id: 4, type: 'app-server', label: 'App Server (Node.js)', x: 720, y: 100 },
        { id: 5, type: 'cache', label: 'Redis Cache', x: 720, y: 240 },
        { id: 6, type: 'sql-db', label: 'PostgreSQL Primary DB', x: 960, y: 150 }
      ],
      connections: [
        { from: 1, to: 2, label: 'HTTPS / TLS 1.3' },
        { from: 2, to: 3, label: 'Origin Request' },
        { from: 3, to: 4, label: 'Reverse Proxy' },
        { from: 4, to: 5, label: 'Cache-Aside Read' },
        { from: 4, to: 6, label: 'SQL Read/Write' }
      ]
    },
    'url-shortener': {
      name: 'URL Shortener Architecture',
      nodes: [
        { id: 1, type: 'client', label: 'Mobile / Web Client', x: 50, y: 160 },
        { id: 2, type: 'load-balancer', label: 'AWS ALB', x: 280, y: 160 },
        { id: 3, type: 'app-server', label: 'URL Shortener Service', x: 520, y: 160 },
        { id: 4, type: 'cache', label: 'Redis Cluster (Hot Links)', x: 780, y: 80 },
        { id: 5, type: 'nosql-db', label: 'DynamoDB / Cassandra', x: 780, y: 240 },
        { id: 6, type: 'message-queue', label: 'Kafka Click Analytics', x: 520, y: 320 }
      ],
      connections: [
        { from: 1, to: 2, label: 'GET /{shortCode}' },
        { from: 2, to: 3, label: 'Route HTTP' },
        { from: 3, to: 4, label: '1. Check Cache (<1ms)' },
        { from: 3, to: 5, label: '2. DB Query on Miss' },
        { from: 3, to: 6, label: 'Async Log Click' }
      ]
    },
    'chat-system': {
      name: 'Real-Time Chat System',
      nodes: [
        { id: 1, type: 'client', label: 'Sender User A', x: 50, y: 120 },
        { id: 2, type: 'load-balancer', label: 'AWS NLB (TCP)', x: 270, y: 180 },
        { id: 3, type: 'app-server', label: 'WebSocket Gateway #1', x: 500, y: 100 },
        { id: 4, type: 'app-server', label: 'WebSocket Gateway #2', x: 500, y: 260 },
        { id: 5, type: 'cache', label: 'Redis Pub/Sub & Sessions', x: 750, y: 180 },
        { id: 6, type: 'nosql-db', label: 'Cassandra Chat History', x: 970, y: 180 },
        { id: 7, type: 'client', label: 'Recipient User B', x: 50, y: 280 }
      ],
      connections: [
        { from: 1, to: 2, label: 'WebSocket Connect' },
        { from: 7, to: 2, label: 'WebSocket Connect' },
        { from: 2, to: 3, label: 'TCP Handshake' },
        { from: 2, to: 4, label: 'TCP Handshake' },
        { from: 3, to: 5, label: 'Publish to Redis' },
        { from: 5, to: 4, label: 'Fanout Message' },
        { from: 3, to: 6, label: 'Async Save Message' }
      ]
    },
    'microservices': {
      name: 'Event-Driven Microservices',
      nodes: [
        { id: 1, type: 'client', label: 'React / Mobile Apps', x: 50, y: 180 },
        { id: 2, type: 'api-gateway', label: 'API Gateway (Kong)', x: 260, y: 180 },
        { id: 3, type: 'microservice', label: 'Order Service', x: 500, y: 80 },
        { id: 4, type: 'microservice', label: 'Payment Service', x: 500, y: 260 },
        { id: 5, type: 'message-queue', label: 'Apache Kafka Event Bus', x: 740, y: 180 },
        { id: 6, type: 'microservice', label: 'Notification Service', x: 970, y: 120 },
        { id: 7, type: 'microservice', label: 'Inventory Service', x: 970, y: 260 }
      ],
      connections: [
        { from: 1, to: 2, label: 'HTTPS JSON' },
        { from: 2, to: 3, label: 'POST /orders' },
        { from: 2, to: 4, label: 'POST /payments' },
        { from: 3, to: 5, label: 'OrderCreated Event' },
        { from: 5, to: 6, label: 'Send Email Receipt' },
        { from: 5, to: 7, label: 'Reserve Stock' }
      ]
    }
  };

  function initPlayground() {
    canvasEl = document.getElementById('playground-canvas');
    svgEl = document.getElementById('playground-svg');
    if (!canvasEl || !svgEl) return;

    // Load initial starter template
    loadTemplate('three-tier');

    // Canvas click outside clears selection
    canvasEl.addEventListener('click', (e) => {
      if (e.target === canvasEl || e.target === svgEl) {
        deselectAll();
      }
    });

    // Window mousemove & mouseup for dragging
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  function renderNodes() {
    if (!canvasEl) return;

    // Remove existing DOM node elements
    canvasEl.querySelectorAll('.canvas-node').forEach(el => el.remove());

    const emptyState = document.getElementById('playground-empty');
    if (emptyState) {
      emptyState.style.display = nodes.length === 0 ? 'block' : 'none';
    }

    nodes.forEach(node => {
      const nodeEl = document.createElement('div');
      nodeEl.className = `canvas-node ${connectSourceNode === node ? 'selected' : ''}`;
      nodeEl.id = `node-${node.id}`;
      nodeEl.style.left = `${node.x}px`;
      nodeEl.style.top = `${node.y}px`;

      const comp = COMPONENT_TYPES.find(c => c.type === node.type) || COMPONENT_TYPES[0];

      nodeEl.innerHTML = `
        <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 4px; background: ${comp.color}20; color: ${comp.color}; flex-shrink: 0;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <rect x="2" y="2" width="20" height="20" rx="3"/>
          </svg>
        </span>
        <span class="canvas-node-title" contenteditable="true" spellcheck="false" onblur="MLForge.sysdesign.playground.updateNodeLabel(${node.id}, this.innerText)">${node.label}</span>
        <button class="canvas-node-del" title="Connect to another node" onclick="event.stopPropagation(); MLForge.sysdesign.playground.startConnect(${node.id})">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
        <button class="canvas-node-del" title="Delete node" onclick="event.stopPropagation(); MLForge.sysdesign.playground.deleteNode(${node.id})">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      `;

      // Drag start
      nodeEl.addEventListener('mousedown', (e) => {
        if (e.target.closest('.canvas-node-del') || e.target.isContentEditable) return;
        isDragging = true;
        dragNode = node;
        const rect = nodeEl.getBoundingClientRect();
        dragOffset.x = e.clientX - rect.left;
        dragOffset.y = e.clientY - rect.top;
      });

      // Target selection for connector
      nodeEl.addEventListener('click', (e) => {
        if (connectSourceNode && connectSourceNode !== node) {
          completeConnect(connectSourceNode, node);
        }
      });

      canvasEl.appendChild(nodeEl);
    });

    renderConnections();
  }

  function renderConnections() {
    if (!svgEl) return;
    svgEl.innerHTML = `
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#f59e0b" />
        </marker>
      </defs>
    `;

    connections.forEach((conn, index) => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);
      if (!fromNode || !toNode) return;

      // Calculate approximate centers
      const x1 = fromNode.x + 100;
      const y1 = fromNode.y + 24;
      const x2 = toNode.x + 10;
      const y2 = toNode.y + 24;

      // Draw SVG Line
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const dx = (x2 - x1) * 0.5;
      const d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
      path.setAttribute('d', d);
      path.setAttribute('stroke', '#f59e0b');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      path.setAttribute('marker-end', 'url(#arrow)');
      svgEl.appendChild(path);

      // Label background & text
      if (conn.label) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 - 8;

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', midX);
        text.setAttribute('y', midY);
        text.setAttribute('fill', '#94a3b8');
        text.setAttribute('font-size', '10');
        text.setAttribute('font-family', 'var(--font-mono)');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = conn.label;
        svgEl.appendChild(text);
      }
    });
  }

  function handleMouseMove(e) {
    if (!isDragging || !dragNode || !canvasEl) return;
    const canvasRect = canvasEl.getBoundingClientRect();
    const newX = Math.max(10, Math.min(canvasRect.width - 180, e.clientX - canvasRect.left - dragOffset.x));
    const newY = Math.max(10, Math.min(canvasRect.height - 70, e.clientY - canvasRect.top - dragOffset.y));

    dragNode.x = Math.round(newX);
    dragNode.y = Math.round(newY);

    const el = document.getElementById(`node-${dragNode.id}`);
    if (el) {
      el.style.left = `${dragNode.x}px`;
      el.style.top = `${dragNode.y}px`;
    }
    renderConnections();
  }

  function handleMouseUp() {
    isDragging = false;
    dragNode = null;
  }

  function addComponent(type) {
    const comp = COMPONENT_TYPES.find(c => c.type === type) || COMPONENT_TYPES[0];
    const newId = ++nextNodeId;
    const newNode = {
      id: newId,
      type: comp.type,
      label: comp.label,
      x: 80 + (nodes.length * 25) % 400,
      y: 80 + (nodes.length * 25) % 300
    };
    nodes.push(newNode);
    renderNodes();
  }

  function startConnect(nodeId) {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    connectSourceNode = node;
    MLForge.ui.showToast(`Selected "${node.label}". Now click destination node to connect arrow.`, 'info', 3000);
    renderNodes();
  }

  function completeConnect(fromNode, toNode) {
    const label = prompt(`Label for connection from "${fromNode.label}" to "${toNode.label}" (optional):`, 'HTTP Request') || '';
    connections.push({ from: fromNode.id, to: toNode.id, label });
    connectSourceNode = null;
    renderNodes();
    MLForge.ui.showToast('Connection created!', 'success', 2000);
  }

  function deselectAll() {
    connectSourceNode = null;
    renderNodes();
  }

  function deleteNode(nodeId) {
    nodes = nodes.filter(n => n.id !== nodeId);
    connections = connections.filter(c => c.from !== nodeId && c.to !== nodeId);
    renderNodes();
  }

  function updateNodeLabel(nodeId, newLabel) {
    const n = nodes.find(node => node.id === nodeId);
    if (n && newLabel.trim()) {
      n.label = newLabel.trim();
    }
  }

  function clearWorkspace() {
    if (confirm('Are you sure you want to clear the diagram workspace? All unsaved nodes will be removed.')) {
      nodes = [];
      connections = [];
      nextNodeId = 1;
      connectSourceNode = null;
      renderNodes();
      MLForge.ui.showToast('Workspace cleared', 'info', 2000);
    }
  }

  function loadTemplate(templateKey) {
    const t = STARTER_TEMPLATES[templateKey];
    if (!t) return;
    nodes = JSON.parse(JSON.stringify(t.nodes));
    connections = JSON.parse(JSON.stringify(t.connections));
    nextNodeId = Math.max(...nodes.map(n => n.id), 0) + 1;
    connectSourceNode = null;
    renderNodes();
    MLForge.ui.showToast(`Loaded "${t.name}" template`, 'success', 2000);
  }

  function exportJSON() {
    const exportData = {
      title: 'MLForge Architecture Diagram',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      nodes,
      connections
    };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', jsonStr);
    dlAnchor.setAttribute('download', 'mlforge-architecture.json');
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    MLForge.ui.showToast('Exported diagram as JSON file', 'success', 2500);
  }

  function exportPNG() {
    if (!canvasEl) return;
    // Client-side HTML Canvas snapshot rendering
    const canvas = document.createElement('canvas');
    const width = canvasEl.offsetWidth || 1000;
    const height = canvasEl.offsetHeight || 600;
    canvas.width = width * 2; // High-DPI 2x
    canvas.height = height * 2;
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);

    // Dark background
    ctx.fillStyle = '#080d18';
    ctx.fillRect(0, 0, width, height);

    // Title banner
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('MLForge System Architecture Diagram', 20, 30);

    ctx.fillStyle = '#64748b';
    ctx.font = '11px monospace';
    ctx.fillText(`Exported on ${new Date().toLocaleDateString()}`, 20, 48);

    // Draw connections
    connections.forEach(conn => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);
      if (!fromNode || !toNode) return;

      const x1 = fromNode.x + 85;
      const y1 = fromNode.y + 20;
      const x2 = toNode.x + 85;
      const y2 = toNode.y + 20;

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      if (conn.label) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.fillText(conn.label, (x1 + x2) / 2, (y1 + y2) / 2 - 5);
      }
    });

    // Draw node cards
    nodes.forEach(node => {
      ctx.fillStyle = '#111827';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;

      // Rounded rect
      const x = node.x, y = node.y, w = 170, h = 40, r = 6;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f1f5f9';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(node.label, x + 15, y + 24);
    });

    // Download PNG
    const dataUrl = canvas.toDataURL('image/png');
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataUrl);
    dlAnchor.setAttribute('download', 'mlforge-architecture.png');
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    MLForge.ui.showToast('Downloaded diagram PNG image', 'success', 2500);
  }

  function saveToBrowser() {
    const name = prompt('Name for this diagram:', `My Architecture ${new Date().toLocaleTimeString()}`);
    if (!name) return;
    MLForge.sysdesign.storage.saveDiagram(name, { nodes, connections });
    MLForge.ui.showToast(`Saved "${name}" to browser storage`, 'success', 2500);
  }

  return {
    init: initPlayground,
    addComponent,
    startConnect,
    deleteNode,
    updateNodeLabel,
    clearWorkspace,
    loadTemplate,
    exportJSON,
    exportPNG,
    saveToBrowser
  };
})();

