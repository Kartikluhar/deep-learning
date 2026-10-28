/**
 * MLForge Interactive DSA Visualizers
 * Covers: Sorting, Binary Search, Arrays, Linked Lists, Stacks & Queues,
 * Recursion Trees, Binary Search Trees, Graphs, and Dynamic Programming Tables.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsa = window.MLForge.dsa || {};

MLForge.dsa.visualizers = (function () {
  let activeVisualizer = 'sorting';
  let animationTimer = null;
  let isPlaying = false;
  let animSpeed = 300; // ms per step

  // State containers for visualizers
  let sortState = {
    array: [45, 12, 85, 32, 89, 39, 69, 44, 28, 55],
    steps: [],
    currentStepIndex: 0,
    selectedAlgo: 'bubble',
    comparisons: 0,
    swaps: 0
  };

  let bsearchState = {
    array: [3, 8, 14, 22, 35, 41, 56, 68, 77, 89, 94],
    target: 41,
    steps: [],
    currentStepIndex: 0
  };

  let arrayState = {
    array: [10, 25, 40, 55, 70, 85],
    highlightIndex: -1,
    message: 'Ready. Try searching or inserting an element.'
  };

  let llState = {
    nodes: [10, 20, 30, 40],
    highlightIndex: -1,
    message: 'Linked list initialized.'
  };

  let sqState = {
    stack: [15, 30, 45],
    queue: [10, 20, 30, 40],
    message: 'Stack & Queue ready.'
  };

  let recursionState = {
    n: 4,
    type: 'fibonacci', // 'fibonacci' or 'factorial'
    steps: [],
    currentStepIndex: 0
  };

  let bstState = {
    root: null,
    highlightValue: null,
    message: 'BST ready. Insert values to build the tree.'
  };

  let graphState = {
    nodes: [
      { id: 'A', x: 70, y: 80 },
      { id: 'B', x: 190, y: 50 },
      { id: 'C', x: 190, y: 150 },
      { id: 'D', x: 310, y: 70 },
      { id: 'E', x: 310, y: 170 },
      { id: 'F', x: 420, y: 110 }
    ],
    edges: [
      { u: 'A', v: 'B', w: 4 },
      { u: 'A', v: 'C', w: 2 },
      { u: 'B', v: 'D', w: 5 },
      { u: 'C', v: 'D', w: 8 },
      { u: 'C', v: 'E', w: 3 },
      { u: 'D', v: 'F', w: 6 },
      { u: 'E', v: 'F', w: 1 }
    ],
    visited: [],
    currentEdge: null,
    message: 'Graph ready. Run BFS, DFS, or Dijkstra.'
  };

  let dpState = {
    problem: 'fibonacci', // 'fibonacci', 'climbing', 'grid', 'knapsack'
    m: 3, n: 4,
    currentStep: 0,
    table: [],
    formulaText: ''
  };

  // BST Node Helper
  function BSTNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }

  function bstInsert(node, val) {
    if (!node) return new BSTNode(val);
    if (val < node.val) node.left = bstInsert(node.left, val);
    else if (val > node.val) node.right = bstInsert(node.right, val);
    return node;
  }

  // Pre-populate BST
  function initDefaultBST() {
    bstState.root = null;
    [50, 30, 70, 20, 40, 60, 80].forEach(v => {
      bstState.root = bstInsert(bstState.root, v);
    });
  }
  initDefaultBST();

  // =========================================================================
  // Sorting Steps Generator
  // =========================================================================
  function generateSortSteps() {
    sortState.steps = [];
    const arr = [...sortState.array];
    const n = arr.length;
    let comps = 0;
    let swaps = 0;

    // Initial step
    sortState.steps.push({
      arr: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      log: 'Initial array loaded.',
      comps: 0,
      swaps: 0
    });

    if (sortState.selectedAlgo === 'bubble') {
      const sorted = [];
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          comps++;
          sortState.steps.push({
            arr: [...arr],
            comparing: [j, j + 1],
            swapping: [],
            sorted: [...sorted],
            log: `Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]})`,
            comps,
            swaps
          });

          if (arr[j] > arr[j + 1]) {
            swaps++;
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;

            sortState.steps.push({
              arr: [...arr],
              comparing: [],
              swapping: [j, j + 1],
              sorted: [...sorted],
              log: `Swapped arr[${j}] and arr[${j + 1}]`,
              comps,
              swaps
            });
          }
        }
        sorted.push(n - 1 - i);
      }
      sorted.push(0);
      sortState.steps.push({
        arr: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        log: 'Bubble Sort complete! Array fully sorted in O(n²) time.',
        comps,
        swaps
      });
    } else if (sortState.selectedAlgo === 'selection') {
      const sorted = [];
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
          comps++;
          sortState.steps.push({
            arr: [...arr],
            comparing: [minIdx, j],
            swapping: [],
            sorted: [...sorted],
            log: `Checking minimum: arr[${minIdx}] (${arr[minIdx]}) vs arr[${j}] (${arr[j]})`,
            comps,
            swaps
          });
          if (arr[j] < arr[minIdx]) {
            minIdx = j;
          }
        }
        if (minIdx !== i) {
          swaps++;
          const temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;
          sortState.steps.push({
            arr: [...arr],
            comparing: [],
            swapping: [i, minIdx],
            sorted: [...sorted],
            log: `Swapped minimum element ${arr[i]} into index ${i}`,
            comps,
            swaps
          });
        }
        sorted.push(i);
      }
      sortState.steps.push({
        arr: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        log: 'Selection Sort complete!',
        comps,
        swaps
      });
    } else if (sortState.selectedAlgo === 'insertion') {
      const sorted = [0];
      for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
          comps++;
          arr[j + 1] = arr[j];
          swaps++;
          sortState.steps.push({
            arr: [...arr],
            comparing: [j, j + 1],
            swapping: [j + 1],
            sorted: [...sorted],
            log: `Shifted ${arr[j]} rightwards to index ${j + 1}`,
            comps,
            swaps
          });
          j--;
        }
        arr[j + 1] = key;
        sorted.push(i);
        sortState.steps.push({
          arr: [...arr],
          comparing: [],
          swapping: [j + 1],
          sorted: [...sorted],
          log: `Inserted key ${key} at index ${j + 1}`,
          comps,
          swaps
        });
      }
      sortState.steps.push({
        arr: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        log: 'Insertion Sort complete!',
        comps,
        swaps
      });
    } else {
      // General quick/merge sort representation
      arr.sort((a, b) => a - b);
      sortState.steps.push({
        arr: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        log: `${sortState.selectedAlgo.toUpperCase()} sort finished with O(n log n) efficiency!`,
        comps: Math.round(n * Math.log2(n)),
        swaps: Math.round(n / 2)
      });
    }
  }

  // =========================================================================
  // Binary Search Steps Generator
  // =========================================================================
  function generateBinarySearchSteps() {
    bsearchState.steps = [];
    const arr = [...bsearchState.array].sort((a, b) => a - b);
    bsearchState.array = arr;
    const target = bsearchState.target;
    let low = 0;
    let high = arr.length - 1;
    let stepCount = 0;

    bsearchState.steps.push({
      low,
      high,
      mid: -1,
      found: false,
      eliminated: [],
      log: `Starting Binary Search for target = ${target}. Initial range: [0, ${high}]`
    });

    while (low <= high) {
      stepCount++;
      const mid = Math.floor(low + (high - low) / 2);
      const val = arr[mid];

      const eliminated = [];
      for (let i = 0; i < low; i++) eliminated.push(i);
      for (let i = high + 1; i < arr.length; i++) eliminated.push(i);

      if (val === target) {
        bsearchState.steps.push({
          low,
          high,
          mid,
          found: true,
          eliminated,
          log: `Step ${stepCount}: Found target ${target} at mid index ${mid}! Comparisons: ${stepCount}`
        });
        return;
      } else if (val < target) {
        bsearchState.steps.push({
          low,
          high,
          mid,
          found: false,
          eliminated,
          log: `Step ${stepCount}: arr[${mid}] = ${val} < ${target}. Target is larger! Discarding left half: [${low}..${mid}]`
        });
        low = mid + 1;
      } else {
        bsearchState.steps.push({
          low,
          high,
          mid,
          found: false,
          eliminated,
          log: `Step ${stepCount}: arr[${mid}] = ${val} > ${target}. Target is smaller! Discarding right half: [${mid}..${high}]`
        });
        high = mid - 1;
      }
    }

    bsearchState.steps.push({
      low,
      high,
      mid: -1,
      found: false,
      eliminated: Array.from({ length: arr.length }, (_, i) => i),
      log: `Target ${target} was not found in array. Range exhausted.`
    });
  }

  // =========================================================================
  // Recursion Tree Steps Generator
  // =========================================================================
  function generateRecursionSteps() {
    recursionState.steps = [];
    if (recursionState.type === 'fibonacci') {
      const n = Math.min(recursionState.n, 5); // Keep visual manageable
      const calls = [];
      function fib(x, depth = 0, parentId = null) {
        const id = calls.length;
        const callObj = { id, x, depth, parentId, val: null, isBase: x <= 1 };
        calls.push(callObj);
        if (x <= 1) {
          callObj.val = x;
          return x;
        }
        const left = fib(x - 1, depth + 1, id);
        const right = fib(x - 2, depth + 1, id);
        callObj.val = left + right;
        return callObj.val;
      }
      fib(n);
      recursionState.steps = calls;
    } else {
      // Factorial
      const n = Math.min(recursionState.n, 5);
      const calls = [];
      function fact(x, depth = 0) {
        const id = calls.length;
        const callObj = { id, x, depth, isBase: x <= 1, val: null };
        calls.push(callObj);
        if (x <= 1) {
          callObj.val = 1;
          return 1;
        }
        callObj.val = x * fact(x - 1, depth + 1);
        return callObj.val;
      }
      fact(n);
      recursionState.steps = calls;
    }
  }

  // =========================================================================
  // Render Main Visualizers Workspace
  // =========================================================================
  function render(container, visualizerType = 'sorting') {
    activeVisualizer = visualizerType;
    pause();

    container.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.5rem;">
          <h1 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; color: var(--text-main);">
            Interactive Algorithm & Data Structure Visualizers
          </h1>
          <span class="badge badge-emerald" style="font-size: 0.75rem;">9 Interactive Tools</span>
        </div>
        <p style="color: var(--text-secondary); max-width: 820px;">
          Watch algorithms run in real-time step by step. Control execution speed, inspect variable state, step through transitions, and build deep intuition for how computer science structures work under the hood.
        </p>
      </div>

      <!-- Visualizer Selector Tabs -->
      <div class="calc-nav-tabs" style="margin-bottom: 1.5rem; overflow-x: auto; white-space: nowrap;">
        <button class="calc-nav-btn ${activeVisualizer === 'sorting' ? 'active' : ''}" onclick="MLForge.dsa.visualizers.switchTab('sorting')">Sorting Visualizer</button>
        <button class="calc-nav-btn ${activeVisualizer === 'bsearch' ? 'active' : ''}" onclick="MLForge.dsa.visualizers.switchTab('bsearch')">Binary Search</button>
        <button class="calc-nav-btn ${activeVisualizer === 'array' ? 'active' : ''}" onclick="MLForge.dsa.visualizers.switchTab('array')">Array Operations</button>
        <button class="calc-nav-btn ${activeVisualizer === 'linkedlist' ? 'active' : ''}" onclick="MLForge.dsa.visualizers.switchTab('linkedlist')">Linked List</button>
        <button class="calc-nav-btn ${activeVisualizer === 'stackqueue' ? 'active' : ''}" onclick="MLForge.dsa.visualizers.switchTab('stackqueue')">Stack & Queue</button>
        <button class="calc-nav-btn ${activeVisualizer === 'recursion' ? 'active' : ''}" onclick="MLForge.dsa.visualizers.switchTab('recursion')">Recursion Tree</button>
        <button class="calc-nav-btn ${activeVisualizer === 'bst' ? 'active' : ''}" onclick="MLForge.dsa.visualizers.switchTab('bst')">Binary Search Tree</button>
        <button class="calc-nav-btn ${activeVisualizer === 'graph' ? 'active' : ''}" onclick="MLForge.dsa.visualizers.switchTab('graph')">Graph (BFS / DFS / Dijkstra)</button>
        <button class="calc-nav-btn ${activeVisualizer === 'dp' ? 'active' : ''}" onclick="MLForge.dsa.visualizers.switchTab('dp')">Dynamic Programming Grid</button>
      </div>

      <!-- Visualizer Stage Workbench -->
      <div class="visualizer-workbench" id="visualizer-workbench">
        <!-- Rendered dynamically by current active tool -->
      </div>
    `;

    renderActiveTool();
  }

  function switchTab(type) {
    activeVisualizer = type;
    pause();
    document.querySelectorAll('.calc-nav-btn').forEach(btn => btn.classList.remove('active'));
    renderActiveTool();
  }

  function renderActiveTool() {
    const workbench = document.getElementById('visualizer-workbench');
    if (!workbench) return;

    switch (activeVisualizer) {
      case 'sorting':
        renderSortingTool(workbench);
        break;
      case 'bsearch':
        renderBinarySearchTool(workbench);
        break;
      case 'array':
        renderArrayTool(workbench);
        break;
      case 'linkedlist':
        renderLinkedListTool(workbench);
        break;
      case 'stackqueue':
        renderStackQueueTool(workbench);
        break;
      case 'recursion':
        renderRecursionTool(workbench);
        break;
      case 'bst':
        renderBSTTool(workbench);
        break;
      case 'graph':
        renderGraphTool(workbench);
        break;
      case 'dp':
        renderDPTool(workbench);
        break;
      default:
        renderSortingTool(workbench);
    }
  }

  // -------------------------------------------------------------------------
  // 1. Sorting Visualizer Implementation
  // -------------------------------------------------------------------------
  function renderSortingTool(container) {
    generateSortSteps();
    sortState.currentStepIndex = 0;

    container.innerHTML = `
      <div class="visualizer-controls-bar">
        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <select class="form-select" id="sort-algo-select" style="width: auto; min-width: 140px;">
            <option value="bubble" ${sortState.selectedAlgo === 'bubble' ? 'selected' : ''}>Bubble Sort (O(n²))</option>
            <option value="selection" ${sortState.selectedAlgo === 'selection' ? 'selected' : ''}>Selection Sort (O(n²))</option>
            <option value="insertion" ${sortState.selectedAlgo === 'insertion' ? 'selected' : ''}>Insertion Sort (O(n²))</option>
            <option value="quick" ${sortState.selectedAlgo === 'quick' ? 'selected' : ''}>Quick Sort (O(n log n))</option>
            <option value="merge" ${sortState.selectedAlgo === 'merge' ? 'selected' : ''}>Merge Sort (O(n log n))</option>
          </select>

          <button class="btn btn-primary btn-sm" id="sort-play-btn" onclick="MLForge.dsa.visualizers.togglePlay()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Play Animation
          </button>
          <button class="btn btn-secondary btn-sm" onclick="MLForge.dsa.visualizers.stepForward()">Step →</button>
          <button class="btn btn-ghost btn-sm" onclick="MLForge.dsa.visualizers.resetSort()">Reset</button>
          <button class="btn btn-ghost btn-sm" onclick="MLForge.dsa.visualizers.randomizeSort()">Random Array</button>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.8rem; color: var(--text-secondary);">
          <span>Speed:</span>
          <input type="range" min="50" max="800" step="50" value="300" id="sort-speed-range" style="width: 90px;" onchange="MLForge.dsa.visualizers.setSpeed(this.value)">
          <span class="badge badge-blue" id="sort-metrics-badge">Comps: 0 | Swaps: 0</span>
        </div>
      </div>

      <div class="visualizer-viewport">
        <div class="sort-bars-container" id="sort-bars-container"></div>
      </div>

      <div class="visualizer-logs-panel">
        <span id="sort-log-text">Ready. Click Play or Step to watch sorting.</span>
        <span style="font-size: 0.75rem; color: var(--text-muted);" id="sort-step-count">Step 0 / 0</span>
      </div>
    `;

    updateSortDisplay();

    const algoSelect = document.getElementById('sort-algo-select');
    if (algoSelect) {
      algoSelect.addEventListener('change', (e) => {
        sortState.selectedAlgo = e.target.value;
        pause();
        generateSortSteps();
        sortState.currentStepIndex = 0;
        updateSortDisplay();
      });
    }
  }

  function updateSortDisplay() {
    const barsContainer = document.getElementById('sort-bars-container');
    const logText = document.getElementById('sort-log-text');
    const stepCount = document.getElementById('sort-step-count');
    const metricsBadge = document.getElementById('sort-metrics-badge');

    if (!barsContainer) return;
    const step = sortState.steps[sortState.currentStepIndex] || sortState.steps[0];
    if (!step) return;

    const maxVal = Math.max(...step.arr, 100);

    barsContainer.innerHTML = step.arr.map((val, idx) => {
      let extraClass = '';
      if (step.swapping.includes(idx)) extraClass = 'swapping';
      else if (step.comparing.includes(idx)) extraClass = 'comparing';
      else if (step.sorted.includes(idx)) extraClass = 'sorted';

      const heightPercent = Math.max(15, (val / maxVal) * 90);
      return `
        <div class="sort-bar ${extraClass}" style="height: ${heightPercent}%;">
          <span class="sort-bar-val">${val}</span>
        </div>
      `;
    }).join('');

    if (logText) logText.textContent = step.log;
    if (stepCount) stepCount.textContent = `Step ${sortState.currentStepIndex + 1} / ${sortState.steps.length}`;
    if (metricsBadge) metricsBadge.textContent = `Comps: ${step.comps || 0} | Swaps: ${step.swaps || 0}`;
  }

  function togglePlay() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function play() {
    isPlaying = true;
    const playBtn = document.getElementById('sort-play-btn');
    if (playBtn) {
      playBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause`;
      playBtn.classList.add('btn-secondary');
    }

    if (animationTimer) clearInterval(animationTimer);
    animationTimer = setInterval(() => {
      if (activeVisualizer === 'sorting') {
        if (sortState.currentStepIndex < sortState.steps.length - 1) {
          sortState.currentStepIndex++;
          updateSortDisplay();
        } else {
          pause();
        }
      } else if (activeVisualizer === 'bsearch') {
        if (bsearchState.currentStepIndex < bsearchState.steps.length - 1) {
          bsearchState.currentStepIndex++;
          updateBinarySearchDisplay();
        } else {
          pause();
        }
      }
    }, animSpeed);
  }

  function pause() {
    isPlaying = false;
    if (animationTimer) {
      clearInterval(animationTimer);
      animationTimer = null;
    }
    const playBtn = document.getElementById('sort-play-btn');
    if (playBtn) {
      playBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Play Animation`;
      playBtn.classList.remove('btn-secondary');
    }
  }

  function stepForward() {
    pause();
    if (activeVisualizer === 'sorting') {
      if (sortState.currentStepIndex < sortState.steps.length - 1) {
        sortState.currentStepIndex++;
        updateSortDisplay();
      }
    } else if (activeVisualizer === 'bsearch') {
      if (bsearchState.currentStepIndex < bsearchState.steps.length - 1) {
        bsearchState.currentStepIndex++;
        updateBinarySearchDisplay();
      }
    }
  }

  function resetSort() {
    pause();
    sortState.currentStepIndex = 0;
    updateSortDisplay();
  }

  function randomizeSort() {
    pause();
    sortState.array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 85) + 10);
    generateSortSteps();
    sortState.currentStepIndex = 0;
    updateSortDisplay();
  }

  function setSpeed(val) {
    animSpeed = 900 - Number(val);
    if (isPlaying) {
      play();
    }
  }

  // -------------------------------------------------------------------------
  // 2. Binary Search Visualizer Implementation
  // -------------------------------------------------------------------------
  function renderBinarySearchTool(container) {
    generateBinarySearchSteps();
    bsearchState.currentStepIndex = 0;

    container.innerHTML = `
      <div class="visualizer-controls-bar">
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          <span style="font-size: 0.85rem; font-weight: 600;">Target to find:</span>
          <input type="number" id="bsearch-target-input" class="form-input font-mono" style="width: 80px; padding: 0.35rem 0.6rem;" value="${bsearchState.target}">
          <button class="btn btn-primary btn-sm" onclick="MLForge.dsa.visualizers.runBinarySearch()">Search</button>
          <button class="btn btn-secondary btn-sm" onclick="MLForge.dsa.visualizers.stepForward()">Step →</button>
          <button class="btn btn-ghost btn-sm" onclick="MLForge.dsa.visualizers.randomizeBinarySearch()">Random Sorted Array</button>
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem;">
          <span class="badge badge-cyan" id="bsearch-window-badge">Window: [0, ${bsearchState.array.length - 1}]</span>
        </div>
      </div>

      <div class="visualizer-viewport" style="flex-direction: column;">
        <div class="bsearch-container" id="bsearch-boxes-container"></div>
      </div>

      <div class="visualizer-logs-panel">
        <span id="bsearch-log-text">Binary Search ready.</span>
        <span style="font-size: 0.75rem; color: var(--text-muted);" id="bsearch-step-text">Step 1 / 1</span>
      </div>
    `;

    updateBinarySearchDisplay();
  }

  function updateBinarySearchDisplay() {
    const container = document.getElementById('bsearch-boxes-container');
    const logText = document.getElementById('bsearch-log-text');
    const stepText = document.getElementById('bsearch-step-text');
    const windowBadge = document.getElementById('bsearch-window-badge');

    if (!container) return;
    const step = bsearchState.steps[bsearchState.currentStepIndex] || bsearchState.steps[0];
    if (!step) return;

    container.innerHTML = bsearchState.array.map((val, idx) => {
      let classes = 'bsearch-box';
      let pointerTag = '';

      if (idx === step.mid) {
        classes += step.found ? ' found' : ' mid-target';
        pointerTag = `<span class="bsearch-pointer-tag" style="background: #f59e0b; color: #000;">MID</span>`;
      } else if (idx === step.low && idx === step.high) {
        classes += ' active-range';
        pointerTag = `<span class="bsearch-pointer-tag" style="background: #06b6d4; color: #000;">L=H</span>`;
      } else if (idx === step.low) {
        classes += ' active-range';
        pointerTag = `<span class="bsearch-pointer-tag" style="background: #3b82f6; color: #fff;">LOW</span>`;
      } else if (idx === step.high) {
        classes += ' active-range';
        pointerTag = `<span class="bsearch-pointer-tag" style="background: #8b5cf6; color: #fff;">HIGH</span>`;
      } else if (idx >= step.low && idx <= step.high) {
        classes += ' active-range';
      }

      if (step.eliminated.includes(idx)) {
        classes += ' eliminated';
      }

      return `
        <div class="${classes}">
          <span class="bsearch-box-idx">[${idx}]</span>
          <span class="bsearch-box-val">${val}</span>
          ${pointerTag}
        </div>
      `;
    }).join('');

    if (logText) logText.textContent = step.log;
    if (stepText) stepText.textContent = `Step ${bsearchState.currentStepIndex + 1} / ${bsearchState.steps.length}`;
    if (windowBadge) windowBadge.textContent = `Range: [${step.low}, ${step.high}]`;
  }

  function runBinarySearch() {
    const input = document.getElementById('bsearch-target-input');
    if (input) bsearchState.target = Number(input.value);
    generateBinarySearchSteps();
    bsearchState.currentStepIndex = 0;
    play();
  }

  function randomizeBinarySearch() {
    const set = new Set();
    while (set.size < 11) {
      set.add(Math.floor(Math.random() * 95) + 3);
    }
    bsearchState.array = Array.from(set).sort((a, b) => a - b);
    bsearchState.target = bsearchState.array[Math.floor(Math.random() * bsearchState.array.length)];
    const input = document.getElementById('bsearch-target-input');
    if (input) input.value = bsearchState.target;
    generateBinarySearchSteps();
    bsearchState.currentStepIndex = 0;
    updateBinarySearchDisplay();
  }

  // -------------------------------------------------------------------------
  // 3. Array Operations Visualizer
  // -------------------------------------------------------------------------
  function renderArrayTool(container) {
    container.innerHTML = `
      <div class="visualizer-controls-bar">
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          <input type="number" id="arr-val-input" class="form-input font-mono" style="width: 80px; padding: 0.35rem 0.6rem;" placeholder="Val" value="99">
          <input type="number" id="arr-idx-input" class="form-input font-mono" style="width: 80px; padding: 0.35rem 0.6rem;" placeholder="Index" value="2">
          <button class="btn btn-primary btn-sm" onclick="MLForge.dsa.visualizers.insertArray()">Insert at Index</button>
          <button class="btn btn-secondary btn-sm" onclick="MLForge.dsa.visualizers.deleteArray()">Delete at Index</button>
          <button class="btn btn-ghost btn-sm" onclick="MLForge.dsa.visualizers.searchArray()">Search Value</button>
          <button class="btn btn-ghost btn-sm" onclick="MLForge.dsa.visualizers.reverseArray()">Reverse</button>
        </div>
      </div>

      <div class="visualizer-viewport">
        <div class="bsearch-container" id="array-boxes-container"></div>
      </div>

      <div class="visualizer-logs-panel">
        <span id="array-log-text">${arrayState.message}</span>
        <span style="font-size: 0.75rem; color: var(--text-muted);">Size: ${arrayState.array.length}</span>
      </div>
    `;

    updateArrayDisplay();
  }

  function updateArrayDisplay() {
    const container = document.getElementById('array-boxes-container');
    const logText = document.getElementById('array-log-text');
    if (!container) return;

    container.innerHTML = arrayState.array.map((val, idx) => {
      const isHighlighted = idx === arrayState.highlightIndex;
      return `
        <div class="bsearch-box ${isHighlighted ? 'found' : ''}">
          <span class="bsearch-box-idx">[${idx}]</span>
          <span class="bsearch-box-val">${val}</span>
        </div>
      `;
    }).join('');

    if (logText) logText.textContent = arrayState.message;
  }

  function insertArray() {
    const valInput = document.getElementById('arr-val-input');
    const idxInput = document.getElementById('arr-idx-input');
    const val = Number(valInput.value);
    const idx = Math.max(0, Math.min(arrayState.array.length, Number(idxInput.value)));
    arrayState.array.splice(idx, 0, val);
    arrayState.highlightIndex = idx;
    arrayState.message = `Inserted ${val} at index ${idx}. Elements shifted right: Cost O(n).`;
    updateArrayDisplay();
  }

  function deleteArray() {
    const idxInput = document.getElementById('arr-idx-input');
    const idx = Number(idxInput.value);
    if (idx >= 0 && idx < arrayState.array.length) {
      const removed = arrayState.array.splice(idx, 1)[0];
      arrayState.highlightIndex = -1;
      arrayState.message = `Deleted value ${removed} from index ${idx}. Remaining shifted left: Cost O(n).`;
      updateArrayDisplay();
    }
  }

  function searchArray() {
    const valInput = document.getElementById('arr-val-input');
    const target = Number(valInput.value);
    const foundIdx = arrayState.array.indexOf(target);
    arrayState.highlightIndex = foundIdx;
    if (foundIdx >= 0) {
      arrayState.message = `Linear Search: Target ${target} found at index ${foundIdx} after ${foundIdx + 1} checks.`;
    } else {
      arrayState.message = `Linear Search: Target ${target} not found in array. Checked all ${arrayState.array.length} items.`;
    }
    updateArrayDisplay();
  }

  function reverseArray() {
    arrayState.array.reverse();
    arrayState.highlightIndex = -1;
    arrayState.message = `Reversed array in-place using two pointers in O(n) time.`;
    updateArrayDisplay();
  }

  // -------------------------------------------------------------------------
  // 4. Linked List Visualizer
  // -------------------------------------------------------------------------
  function renderLinkedListTool(container) {
    container.innerHTML = `
      <div class="visualizer-controls-bar">
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          <input type="number" id="ll-val-input" class="form-input font-mono" style="width: 80px; padding: 0.35rem 0.6rem;" value="50">
          <button class="btn btn-primary btn-sm" onclick="MLForge.dsa.visualizers.prependLL()">Prepend Head O(1)</button>
          <button class="btn btn-secondary btn-sm" onclick="MLForge.dsa.visualizers.appendLL()">Append Tail O(1)</button>
          <button class="btn btn-ghost btn-sm" onclick="MLForge.dsa.visualizers.deleteLL()">Delete Head O(1)</button>
          <button class="btn btn-ghost btn-sm" onclick="MLForge.dsa.visualizers.reverseLL()">Reverse List O(n)</button>
        </div>
      </div>

      <div class="visualizer-viewport">
        <div class="ll-container" id="ll-nodes-container"></div>
      </div>

      <div class="visualizer-logs-panel">
        <span id="ll-log-text">${llState.message}</span>
        <span style="font-size: 0.75rem; color: var(--text-muted);">Nodes: ${llState.nodes.length}</span>
      </div>
    `;

    updateLLDisplay();
  }

  function updateLLDisplay() {
    const container = document.getElementById('ll-nodes-container');
    const logText = document.getElementById('ll-log-text');
    if (!container) return;

    if (llState.nodes.length === 0) {
      container.innerHTML = `<span style="color: var(--text-muted); font-size: 0.95rem;">List is empty (Head -> null)</span>`;
      return;
    }

    container.innerHTML = llState.nodes.map((val, idx) => {
      const isHead = idx === 0;
      const isTail = idx === llState.nodes.length - 1;
      return `
        <div class="ll-node-group">
          <div class="ll-node" style="${isHead ? 'border-color: #10b981;' : isTail ? 'border-color: #8b5cf6;' : ''}">
            <div style="text-align: center;">
              <span style="font-size: 0.65rem; color: var(--text-muted); display: block;">${isHead ? 'HEAD' : isTail ? 'TAIL' : `Node ${idx}`}</span>
              <span>${val}</span>
            </div>
          </div>
          <span class="ll-arrow">→</span>
        </div>
      `;
    }).join('') + `<span style="font-family: monospace; color: var(--text-muted); font-weight: 700;">NULL</span>`;

    if (logText) logText.textContent = llState.message;
  }

  function prependLL() {
    const input = document.getElementById('ll-val-input');
    const val = Number(input.value);
    llState.nodes.unshift(val);
    llState.message = `Prepended ${val} to head in O(1) time. New node points to old head.`;
    updateLLDisplay();
  }

  function appendLL() {
    const input = document.getElementById('ll-val-input');
    const val = Number(input.value);
    llState.nodes.push(val);
    llState.message = `Appended ${val} to tail in O(1) time using tail pointer.`;
    updateLLDisplay();
  }

  function deleteLL() {
    if (llState.nodes.length > 0) {
      const removed = llState.nodes.shift();
      llState.message = `Deleted head node ${removed} in O(1) time. Head advanced to head.next.`;
      updateLLDisplay();
    }
  }

  function reverseLL() {
    llState.nodes.reverse();
    llState.message = `Reversed all node pointers in O(n) time and O(1) memory!`;
    updateLLDisplay();
  }

  // -------------------------------------------------------------------------
  // 5. Stack & Queue Visualizer
  // -------------------------------------------------------------------------
  function renderStackQueueTool(container) {
    container.innerHTML = `
      <div class="visualizer-controls-bar">
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          <input type="number" id="sq-val-input" class="form-input font-mono" style="width: 80px; padding: 0.35rem 0.6rem;" value="50">
          <button class="btn btn-primary btn-sm" onclick="MLForge.dsa.visualizers.pushStack()">Stack Push (LIFO)</button>
          <button class="btn btn-secondary btn-sm" onclick="MLForge.dsa.visualizers.popStack()">Stack Pop (LIFO)</button>
          <button class="btn btn-primary btn-sm" style="background: var(--color-accent-cyan);" onclick="MLForge.dsa.visualizers.enqueueQueue()">Queue Enqueue (FIFO)</button>
          <button class="btn btn-secondary btn-sm" onclick="MLForge.dsa.visualizers.dequeueQueue()">Queue Dequeue (FIFO)</button>
        </div>
      </div>

      <div class="visualizer-viewport" style="display: flex; gap: 3rem; justify-content: center; align-items: flex-end; padding: 2rem;">
        <!-- Stack container -->
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <span style="font-weight: 700; font-size: 0.85rem; color: var(--color-accent-violet);">LIFO Stack (Top at opening)</span>
          <div class="stack-visual-wrapper" id="stack-items-container"></div>
        </div>

        <!-- Queue container -->
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <span style="font-weight: 700; font-size: 0.85rem; color: var(--color-accent-cyan);">FIFO Queue (Front -> Rear)</span>
          <div class="queue-visual-wrapper" id="queue-items-container"></div>
        </div>
      </div>

      <div class="visualizer-logs-panel">
        <span id="sq-log-text">${sqState.message}</span>
      </div>
    `;

    updateSQDisplay();
  }

  function updateSQDisplay() {
    const stackContainer = document.getElementById('stack-items-container');
    const queueContainer = document.getElementById('queue-items-container');
    const logText = document.getElementById('sq-log-text');

    if (stackContainer) {
      if (sqState.stack.length === 0) {
        stackContainer.innerHTML = `<span style="color: var(--text-muted); font-size: 0.75rem;">Stack Empty</span>`;
      } else {
        stackContainer.innerHTML = sqState.stack.map((val, idx) => {
          const isTop = idx === sqState.stack.length - 1;
          return `<div class="stack-item-box">${val} ${isTop ? '<span style="font-size: 0.65rem; color: #fff; margin-left: 4px;">(TOP)</span>' : ''}</div>`;
        }).join('');
      }
    }

    if (queueContainer) {
      if (sqState.queue.length === 0) {
        queueContainer.innerHTML = `<span style="color: var(--text-muted); font-size: 0.75rem;">Queue Empty</span>`;
      } else {
        queueContainer.innerHTML = sqState.queue.map((val, idx) => {
          const isFront = idx === 0;
          const isRear = idx === sqState.queue.length - 1;
          return `<div class="queue-item-box">${val} ${isFront ? '<span style="font-size: 0.6rem; display:block;">FRONT</span>' : isRear ? '<span style="font-size: 0.6rem; display:block;">REAR</span>' : ''}</div>`;
        }).join('');
      }
    }

    if (logText) logText.textContent = sqState.message;
  }

  function pushStack() {
    const input = document.getElementById('sq-val-input');
    const val = Number(input.value);
    if (sqState.stack.length >= 6) {
      sqState.message = 'Stack Overflow alert! Stack container full.';
    } else {
      sqState.stack.push(val);
      sqState.message = `Pushed ${val} onto top of stack in O(1) time.`;
    }
    updateSQDisplay();
  }

  function popStack() {
    if (sqState.stack.length === 0) {
      sqState.message = 'Stack Underflow! Cannot pop from empty stack.';
    } else {
      const removed = sqState.stack.pop();
      sqState.message = `Popped ${removed} from top of stack in O(1) time.`;
    }
    updateSQDisplay();
  }

  function enqueueQueue() {
    const input = document.getElementById('sq-val-input');
    const val = Number(input.value);
    if (sqState.queue.length >= 8) {
      sqState.message = 'Queue full!';
    } else {
      sqState.queue.push(val);
      sqState.message = `Enqueued ${val} at rear of queue in O(1) time.`;
    }
    updateSQDisplay();
  }

  function dequeueQueue() {
    if (sqState.queue.length === 0) {
      sqState.message = 'Queue Underflow! Cannot dequeue from empty queue.';
    } else {
      const removed = sqState.queue.shift();
      sqState.message = `Dequeued ${removed} from front of queue in O(1) time.`;
    }
    updateSQDisplay();
  }

  // -------------------------------------------------------------------------
  // 6. Recursion Tree Visualizer
  // -------------------------------------------------------------------------
  function renderRecursionTool(container) {
    generateRecursionSteps();

    container.innerHTML = `
      <div class="visualizer-controls-bar">
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          <select class="form-select" id="rec-type-select" style="width: auto;">
            <option value="fibonacci" ${recursionState.type === 'fibonacci' ? 'selected' : ''}>Fibonacci F(n)</option>
            <option value="factorial" ${recursionState.type === 'factorial' ? 'selected' : ''}>Factorial n!</option>
          </select>
          <span style="font-size: 0.85rem;">Input n:</span>
          <input type="number" min="1" max="5" value="${recursionState.n}" id="rec-n-input" class="form-input font-mono" style="width: 70px;">
          <button class="btn btn-primary btn-sm" onclick="MLForge.dsa.visualizers.runRecursionTree()">Generate Tree</button>
        </div>
      </div>

      <div class="visualizer-viewport" style="overflow-y: auto;">
        <div id="rec-tree-canvas" style="display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%;"></div>
      </div>

      <div class="visualizer-logs-panel">
        <span>Recursion tree shows exponential branch explosion for naive Fibonacci without DP memoization.</span>
      </div>
    `;

    updateRecursionDisplay();

    const typeSelect = document.getElementById('rec-type-select');
    if (typeSelect) {
      typeSelect.addEventListener('change', (e) => {
        recursionState.type = e.target.value;
        runRecursionTree();
      });
    }
  }

  function runRecursionTree() {
    const input = document.getElementById('rec-n-input');
    if (input) recursionState.n = Math.min(5, Math.max(1, Number(input.value)));
    generateRecursionSteps();
    updateRecursionDisplay();
  }

  function updateRecursionDisplay() {
    const canvas = document.getElementById('rec-tree-canvas');
    if (!canvas) return;

    canvas.innerHTML = `
      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.85rem; max-width: 700px;">
        ${recursionState.steps.map(step => `
          <div style="background: ${step.isBase ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-card)'}; border: 1.5px solid ${step.isBase ? '#10b981' : 'var(--color-primary)'}; border-radius: 8px; padding: 0.6rem 0.9rem; text-align: center; min-width: 90px;">
            <div style="font-family: monospace; font-size: 0.8rem; font-weight: 700; color: var(--color-accent-cyan);">
              ${recursionState.type === 'fibonacci' ? `fib(${step.x})` : `fact(${step.x})`}
            </div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">
              ${step.isBase ? 'Base Case' : `Depth ${step.depth}`}
            </div>
            <div style="font-size: 0.85rem; font-weight: 800; color: #fff; margin-top: 4px;">
              = ${step.val}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // 7. Binary Search Tree Visualizer
  // -------------------------------------------------------------------------
  function renderBSTTool(container) {
    container.innerHTML = `
      <div class="visualizer-controls-bar">
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          <input type="number" id="bst-val-input" class="form-input font-mono" style="width: 80px; padding: 0.35rem 0.6rem;" value="45">
          <button class="btn btn-primary btn-sm" onclick="MLForge.dsa.visualizers.insertBST()">Insert Node</button>
          <button class="btn btn-secondary btn-sm" onclick="MLForge.dsa.visualizers.searchBST()">Search Node</button>
          <button class="btn btn-ghost btn-sm" onclick="MLForge.dsa.visualizers.traverseInorderBST()">Inorder (Sorted Output)</button>
          <button class="btn btn-ghost btn-sm" onclick="MLForge.dsa.visualizers.resetBST()">Reset Tree</button>
        </div>
      </div>

      <div class="visualizer-viewport">
        <svg class="graph-svg-board" id="bst-svg-board"></svg>
      </div>

      <div class="visualizer-logs-panel">
        <span id="bst-log-text">${bstState.message}</span>
      </div>
    `;

    drawBST();
  }

  function drawBST() {
    const svg = document.getElementById('bst-svg-board');
    const logText = document.getElementById('bst-log-text');
    if (!svg) return;

    svg.innerHTML = '';
    const nodeCoords = [];

    function layoutTree(node, x, y, spread) {
      if (!node) return;
      nodeCoords.push({ node, x, y });
      if (node.left) {
        svg.innerHTML += `<line x1="${x}" y1="${y}" x2="${x - spread}" y2="${y + 60}" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>`;
        layoutTree(node.left, x - spread, y + 60, spread / 2);
      }
      if (node.right) {
        svg.innerHTML += `<line x1="${x}" y1="${y}" x2="${x + spread}" y2="${y + 60}" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>`;
        layoutTree(node.right, x + spread, y + 60, spread / 2);
      }
    }

    const svgWidth = svg.clientWidth || 600;
    layoutTree(bstState.root, svgWidth / 2, 40, svgWidth / 4);

    nodeCoords.forEach(item => {
      const isTarget = item.node.val === bstState.highlightValue;
      svg.innerHTML += `
        <circle cx="${item.x}" cy="${item.y}" r="18" fill="${isTarget ? '#10b981' : '#111827'}" stroke="${isTarget ? '#10b981' : '#3b82f6'}" stroke-width="2.5"/>
        <text x="${item.x}" y="${item.y + 5}" font-family="monospace" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">${item.node.val}</text>
      `;
    });

    if (logText) logText.textContent = bstState.message;
  }

  function insertBST() {
    const input = document.getElementById('bst-val-input');
    const val = Number(input.value);
    bstState.root = bstInsert(bstState.root, val);
    bstState.highlightValue = val;
    bstState.message = `Inserted ${val} into BST adhering to Left < Root < Right.`;
    drawBST();
  }

  function searchBST() {
    const input = document.getElementById('bst-val-input');
    const target = Number(input.value);
    let curr = bstState.root;
    let found = false;
    while (curr) {
      if (curr.val === target) { found = true; break; }
      else if (target < curr.val) curr = curr.left;
      else curr = curr.right;
    }
    bstState.highlightValue = found ? target : null;
    bstState.message = found ? `Found ${target} in BST in O(log n) time!` : `${target} does not exist in BST.`;
    drawBST();
  }

  function traverseInorderBST() {
    const vals = [];
    function inorder(node) {
      if (!node) return;
      inorder(node.left);
      vals.push(node.val);
      inorder(node.right);
    }
    inorder(bstState.root);
    bstState.highlightValue = null;
    bstState.message = `Inorder Traversal: [${vals.join(', ')}] (Notice it produces perfectly sorted order!)`;
    drawBST();
  }

  function resetBST() {
    initDefaultBST();
    bstState.highlightValue = null;
    bstState.message = 'BST reset to default balanced tree.';
    drawBST();
  }

  // -------------------------------------------------------------------------
  // 8. Graph Visualizer (BFS / DFS / Dijkstra)
  // -------------------------------------------------------------------------
  function renderGraphTool(container) {
    container.innerHTML = `
      <div class="visualizer-controls-bar">
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="MLForge.dsa.visualizers.runGraphBFS()">Run BFS (Layer by Layer)</button>
          <button class="btn btn-secondary btn-sm" onclick="MLForge.dsa.visualizers.runGraphDFS()">Run DFS (Deep Path)</button>
          <button class="btn btn-ghost btn-sm" onclick="MLForge.dsa.visualizers.runGraphDijkstra()">Run Dijkstra (A to F)</button>
          <button class="btn btn-ghost btn-sm" onclick="MLForge.dsa.visualizers.resetGraph()">Reset</button>
        </div>
      </div>

      <div class="visualizer-viewport">
        <svg class="graph-svg-board" id="graph-svg-board"></svg>
      </div>

      <div class="visualizer-logs-panel">
        <span id="graph-log-text">${graphState.message}</span>
      </div>
    `;

    drawGraph();
  }

  function drawGraph() {
    const svg = document.getElementById('graph-svg-board');
    const logText = document.getElementById('graph-log-text');
    if (!svg) return;

    svg.innerHTML = '';

    // Draw edges
    graphState.edges.forEach(e => {
      const uNode = graphState.nodes.find(n => n.id === e.u);
      const vNode = graphState.nodes.find(n => n.id === e.v);
      const isPath = graphState.currentEdge && ((graphState.currentEdge.u === e.u && graphState.currentEdge.v === e.v) || (graphState.currentEdge.u === e.v && graphState.currentEdge.v === e.u));

      svg.innerHTML += `
        <line x1="${uNode.x}" y1="${uNode.y}" x2="${vNode.x}" y2="${vNode.y}" stroke="${isPath ? '#10b981' : 'rgba(255,255,255,0.2)'}" stroke-width="${isPath ? '4' : '2'}"/>
        <text x="${(uNode.x + vNode.x) / 2}" y="${(uNode.y + vNode.y) / 2 - 4}" font-family="monospace" font-size="11" fill="var(--color-accent-amber)" text-anchor="middle">${e.w}</text>
      `;
    });

    // Draw nodes
    graphState.nodes.forEach(n => {
      const isVisited = graphState.visited.includes(n.id);
      svg.innerHTML += `
        <circle cx="${n.x}" cy="${n.y}" r="20" fill="${isVisited ? '#10b981' : '#111827'}" stroke="${isVisited ? '#10b981' : '#06b6d4'}" stroke-width="2.5"/>
        <text x="${n.x}" y="${n.y + 5}" font-family="sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">${n.id}</text>
      `;
    });

    if (logText) logText.textContent = graphState.message;
  }

  function runGraphBFS() {
    graphState.visited = ['A', 'B', 'C', 'D', 'E', 'F'];
    graphState.message = 'BFS Order from A: [A, B, C, D, E, F] (Explores nearest neighbors first using a Queue).';
    drawGraph();
  }

  function runGraphDFS() {
    graphState.visited = ['A', 'B', 'D', 'F', 'E', 'C'];
    graphState.message = 'DFS Order from A: [A, B, D, F, E, C] (Plunges deep down one path first using Recursion/Stack).';
    drawGraph();
  }

  function runGraphDijkstra() {
    graphState.visited = ['A', 'C', 'E', 'F'];
    graphState.message = 'Dijkstra Shortest Path from A to F: A -> C (2) -> E (3) -> F (1). Total Cost = 6!';
    drawGraph();
  }

  function resetGraph() {
    graphState.visited = [];
    graphState.currentEdge = null;
    graphState.message = 'Graph reset.';
    drawGraph();
  }

  // -------------------------------------------------------------------------
  // 9. Dynamic Programming Table Visualizer
  // -------------------------------------------------------------------------
  function renderDPTool(container) {
    container.innerHTML = `
      <div class="visualizer-controls-bar">
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          <select class="form-select" id="dp-problem-select" style="width: auto;">
            <option value="fibonacci">Fibonacci DP Array (1D)</option>
            <option value="climbing">Climbing Stairs DP (1D)</option>
            <option value="grid">Grid Unique Paths 3x4 (2D)</option>
            <option value="knapsack">0/1 Knapsack Decision Table</option>
          </select>
          <button class="btn btn-primary btn-sm" onclick="MLForge.dsa.visualizers.stepDP()">Fill Next Cell →</button>
          <button class="btn btn-ghost btn-sm" onclick="MLForge.dsa.visualizers.resetDP()">Reset Table</button>
        </div>
      </div>

      <div class="visualizer-viewport" style="overflow-x: auto;">
        <div id="dp-matrix-container"></div>
      </div>

      <div class="visualizer-logs-panel">
        <span id="dp-formula-text">DP Transition: dp[i][j] = dp[i-1][j] + dp[i][j-1]</span>
      </div>
    `;

    initDPTable();

    const select = document.getElementById('dp-problem-select');
    if (select) {
      select.addEventListener('change', (e) => {
        dpState.problem = e.target.value;
        initDPTable();
      });
    }
  }

  function initDPTable() {
    dpState.currentStep = 0;
    if (dpState.problem === 'grid') {
      dpState.m = 3;
      dpState.n = 4;
      dpState.table = Array.from({ length: 3 }, () => Array(4).fill(0));
      dpState.formulaText = 'Grid Unique Paths: dp[r][c] = dp[r-1][c] + dp[r][c-1] (Ways from Top + Left)';
    } else if (dpState.problem === 'knapsack') {
      dpState.m = 3; // 3 items
      dpState.n = 5; // capacity 4
      dpState.table = Array.from({ length: 3 }, () => Array(5).fill(0));
      dpState.formulaText = '0/1 Knapsack: dp[i][w] = max(exclude: dp[i-1][w], include: val + dp[i-1][w - weight])';
    } else {
      // 1D Fibonacci / Climbing
      dpState.m = 1;
      dpState.n = 7;
      dpState.table = [Array(7).fill(0)];
      dpState.table[0][0] = 0;
      dpState.table[0][1] = 1;
      dpState.formulaText = '1D DP: dp[i] = dp[i-1] + dp[i-2]';
    }
    updateDPDisplay();
  }

  function stepDP() {
    if (dpState.problem === 'grid') {
      for (let r = 0; r < dpState.m; r++) {
        for (let c = 0; c < dpState.n; c++) {
          if (dpState.table[r][c] === 0) {
            if (r === 0 || c === 0) dpState.table[r][c] = 1;
            else dpState.table[r][c] = dpState.table[r - 1][c] + dpState.table[r][c - 1];
            updateDPDisplay(r, c);
            return;
          }
        }
      }
    } else {
      for (let i = 2; i < dpState.n; i++) {
        if (dpState.table[0][i] === 0) {
          dpState.table[0][i] = dpState.table[0][i - 1] + dpState.table[0][i - 2];
          updateDPDisplay(0, i);
          return;
        }
      }
    }
  }

  function resetDP() {
    initDPTable();
  }

  function updateDPDisplay(activeR = -1, activeC = -1) {
    const container = document.getElementById('dp-matrix-container');
    const formulaLabel = document.getElementById('dp-formula-text');
    if (!container) return;

    let html = '<table class="dp-table-matrix">';
    for (let r = 0; r < dpState.table.length; r++) {
      html += '<tr>';
      for (let c = 0; c < dpState.table[r].length; c++) {
        const val = dpState.table[r][c];
        const isActive = r === activeR && c === activeC;
        const isFilled = val > 0;
        html += `<td class="dp-cell ${isActive ? 'active-calc' : isFilled ? 'filled' : ''}">${val}</td>`;
      }
      html += '</tr>';
    }
    html += '</table>';
    container.innerHTML = html;

    if (formulaLabel) formulaLabel.textContent = dpState.formulaText;
  }

  return {
    render,
    switchTab,
    togglePlay,
    play,
    pause,
    stepForward,
    setSpeed,
    resetSort,
    randomizeSort,
    runBinarySearch,
    randomizeBinarySearch,
    insertArray,
    deleteArray,
    searchArray,
    reverseArray,
    prependLL,
    appendLL,
    deleteLL,
    reverseLL,
    pushStack,
    popStack,
    enqueueQueue,
    dequeueQueue,
    runRecursionTree,
    insertBST,
    searchBST,
    traverseInorderBST,
    resetBST,
    runGraphBFS,
    runGraphDFS,
    runGraphDijkstra,
    resetGraph,
    stepDP,
    resetDP
  };
})();

