/**
 * MLForge Global Omnisearch System
 * Real-time indexing, alias expansion, category grouping, and keyboard navigation.
 */

window.MLForge = window.MLForge || {};

MLForge.search = (function () {
  let searchIndex = [];
  let modalBackdrop = null;
  let searchInput = null;
  let resultsList = null;
  let selectedIndex = 0;
  let currentResults = [];

  const ALIASES = {
    'mse': ['mean squared error', 'loss', 'regression metric'],
    'mae': ['mean absolute error', 'l1 loss'],
    'bce': ['binary cross-entropy', 'log loss', 'sigmoid loss'],
    'cce': ['categorical cross-entropy', 'softmax loss'],
    'sgd': ['stochastic gradient descent', 'optimizer', 'momentum'],
    'cnn': ['convolutional neural network', 'conv2d', 'feature map', 'kernel'],
    'rnn': ['recurrent neural network', 'lstm', 'gru'],
    'vit': ['vision transformer', 'patch projection'],
    'rag': ['retrieval-augmented generation', 'vector search', 'embeddings'],
    'llm': ['large language models', 'transformers', 'gpt', 'attention'],
    'svm': ['support vector machines', 'hyperplane', 'margin'],
    'pca': ['principal component analysis', 'eigenvalues', 'dimensionality reduction'],
    'knn': ['k-nearest neighbors', 'euclidean distance', 'metric'],
    'vram': ['gpu memory', 'hardware estimator', 'model footprint', 'fp16', 'int8'],
    'relu': ['rectified linear unit', 'activation function', 'dying relu'],
    'ols': ['ordinary least squares', 'linear regression'],
    'auc': ['roc', 'area under curve', 'classification metrics'],
    'dsa': ['data structures', 'algorithms', 'binary search', 'linked list', 'trees', 'dynamic programming'],
    'dp': ['dynamic programming', 'memoization', 'tabulation', 'knapsack', 'climbing stairs'],
    'bfs': ['breadth first search', 'queue', 'level order'],
    'dfs': ['depth first search', 'recursion', 'backtracking'],
    'bst': ['binary search tree', 'validate bst', 'inorder'],
    'lru': ['least recently used', 'cache', 'doubly linked list'],
    'git': ['version control', 'github', 'commit', 'branch', 'merge', 'pull request', 'repository'],
    'pr': ['pull request', 'code review', 'github', 'merge'],
    'rebase': ['rebase', 'squash', 'interactive rebase', 'linear history'],
    'stash': ['shelve', 'temporary save', 'clean working directory'],
    'sysdesign': ['system design', 'hld', 'lld', 'architecture', 'scalability', 'distributed systems'],
    'hld': ['high level design', 'architecture', 'case study', 'system design', 'scalability'],
    'lld': ['low level design', 'solid', 'oop', 'parking lot', 'elevator', 'design patterns'],
    'cap': ['cap theorem', 'consistency', 'availability', 'partition tolerance'],
    'cache': ['caching', 'redis', 'cache aside', 'memcached', 'cdn', 'lru', 'hit ratio'],
    'kafka': ['message queue', 'event streaming', 'pub sub', 'dead letter queue', 'rabbitmq'],
    'sharding': ['database sharding', 'partitioning', 'horizontal scaling', 'consistent hashing'],
    'loadbalancer': ['load balancing', 'reverse proxy', 'nginx', 'round robin', 'least connections']
  };

  function buildIndex() {
    searchIndex = [];

    // 1. Calculators
    const calcList = [
      { id: 'neuron-calc', title: 'Neuron Output Calculator', desc: 'Calculate how a single neuron multiplies inputs by weights and adds bias', category: 'Calculators', link: '#calculators/neuron-calc' },
      { id: 'activation-calc', title: 'Activation Function Calculator', desc: 'Test activation formulas (ReLU, Sigmoid, Tanh, GELU) and see their slopes', category: 'Calculators', link: '#calculators/activation-calc' },
      { id: 'loss-calc', title: 'Loss Function Calculator', desc: 'Calculate prediction error using MSE, MAE, Huber, or Binary Cross-Entropy', category: 'Calculators', link: '#calculators/loss-calc' },
      { id: 'gradient-descent-calc', title: 'Gradient Descent Step Calculator', desc: 'Calculate how weights step downhill to minimize model error', category: 'Calculators', link: '#calculators/gradient-descent-calc' },
      { id: 'backprop-calc', title: 'Backpropagation Step Calculator', desc: 'Step-by-step math for sending errors backward through neural network layers', category: 'Calculators', link: '#calculators/backprop-calc' },
      { id: 'param-count-calc', title: 'Parameter Count Calculator', desc: 'Count total learnable weights and biases in Dense and Convolutional layers', category: 'Calculators', link: '#calculators/param-count-calc' },
      { id: 'tensor-shape-calc', title: 'Tensor Shape Calculator', desc: 'Calculate output height and width after Conv2D or pooling', category: 'Calculators', link: '#calculators/tensor-shape-calc' },
      { id: 'batch-steps-calc', title: 'Batch & Training Steps Calculator', desc: 'Find out how many batches make up an epoch and total optimization steps', category: 'Calculators', link: '#calculators/batch-steps-calc' },
      { id: 'dataset-split-calc', title: 'Train / Val / Test Split Calculator', desc: 'Divide dataset into exact sample sizes for training, validation, and testing', category: 'Calculators', link: '#calculators/dataset-split-calc' },
      { id: 'regression-metrics-calc', title: 'Regression Metrics Calculator', desc: 'Measure regression error using MAE, MSE, RMSE, and R² score', category: 'Calculators', link: '#calculators/regression-metrics-calc' },
      { id: 'classification-metrics-calc', title: 'Classification & Confusion Matrix', desc: 'Calculate Accuracy, Precision, Recall, Specificity, and F1-Score from confusion matrix', category: 'Calculators', link: '#calculators/classification-metrics-calc' },
      { id: 'bayes-calc', title: "Bayes' Theorem Calculator", desc: 'Update the probability of a hypothesis after observing new evidence', category: 'Calculators', link: '#calculators/bayes-calc' },
      { id: 'standardization-calc', title: 'Standardization (Z-Score) Calculator', desc: 'Convert data to Z-Scores with mean 0 and standard deviation 1', category: 'Calculators', link: '#calculators/standardization-calc' },
      { id: 'minmax-calc', title: 'Min-Max Normalization Calculator', desc: 'Compress data into a neat range like 0 to 1', category: 'Calculators', link: '#calculators/minmax-calc' },
      { id: 'linear-regression-calc', title: 'Linear Regression OLS Calculator', desc: 'Find the slope and intercept of the best-fit line through data points', category: 'Calculators', link: '#calculators/linear-regression-calc' },
      { id: 'knn-distance-calc', title: 'KNN Distance Calculator', desc: 'Calculate straight-line (Euclidean) and street-grid (Manhattan) distance between vectors', category: 'Calculators', link: '#calculators/knn-distance-calc' },
      { id: 'cosine-calc', title: 'Cosine Similarity Calculator', desc: 'Measure the angle and directional similarity between two embedding vectors', category: 'Calculators', link: '#calculators/cosine-calc' },
      { id: 'entropy-calc', title: 'Entropy & Information Gain Calculator', desc: 'Calculate disorder (Entropy) and Information Gain for decision trees', category: 'Calculators', link: '#calculators/entropy-calc' },
      { id: 'class-imbalance-calc', title: 'Class Imbalance Ratio Calculator', desc: 'Check class imbalance ratio and get practical advice on how to handle it', category: 'Calculators', link: '#calculators/class-imbalance-calc' },
      { id: 'vram-estimator-calc', title: 'GPU VRAM & Memory Estimator', desc: 'Estimate GPU video memory needed for model weights, optimizer, and training', category: 'Calculators', link: '#calculators/vram-estimator-calc' },
      { id: 'training-time-calc', title: 'Training Duration Estimator', desc: 'Estimate how many hours or days training will take from step duration', category: 'Calculators', link: '#calculators/training-time-calc' }
    ];
    searchIndex.push(...calcList);

    // 2. Playgrounds
    const playList = [
      { id: 'pg-neuron', title: 'Neuron Playground', desc: 'Interactive neuron showing inputs, weights, bias, and output firing in real time', category: 'Playgrounds', link: '#playground/neuron' },
      { id: 'pg-activation', title: 'Activation Function Explorer', desc: 'Interactive graphs showing activation curves and their slopes (derivatives)', category: 'Playgrounds', link: '#playground/activation' },
      { id: 'pg-gd', title: 'Gradient Descent Playground', desc: 'Watch an optimizer ball roll downhill and see what happens if step size is too big', category: 'Playgrounds', link: '#playground/gradient-descent' },
      { id: 'pg-cnn', title: 'CNN Convolution Visualizer', desc: 'Watch a 2D filter slide across an image grid step by step', category: 'Playgrounds', link: '#playground/cnn' },
      { id: 'pg-arch', title: 'Architecture Builder', desc: 'Stack neural network layers and watch connection lines and parameter counts update', category: 'Playgrounds', link: '#playground/architecture' },
      { id: 'pg-fit', title: 'Overfitting vs Underfitting Explorer', desc: 'See the difference between underfitting (too simple) and overfitting (memorizing noise)', category: 'Playgrounds', link: '#playground/fit' }
    ];
    searchIndex.push(...playList);

    // 3. Topics
    if (MLForge.data.topics) {
      MLForge.data.topics.forEach(t => {
        searchIndex.push({
          id: t.id,
          title: t.title,
          desc: t.summary || t.definition.slice(0, 100),
          category: t.section || 'Topics',
          link: `#topics/${t.id}`
        });
      });
    }

    // 4. Formulas
    if (MLForge.data.formulas) {
      MLForge.data.formulas.forEach(f => {
        searchIndex.push({
          id: f.id,
          title: f.name,
          desc: `${f.expression} - ${f.whenToUse.slice(0, 80)}`,
          category: 'Formulas',
          link: `#formulas/${f.id}`
        });
      });
    }

    // 5. Code Examples
    if (MLForge.data.codeExamples) {
      MLForge.data.codeExamples.forEach(c => {
        searchIndex.push({
          id: c.id,
          title: c.title,
          desc: c.description.slice(0, 90),
          category: 'Code Examples',
          link: `#code/${c.id}`
        });
      });
    }

    // 6. Math Verification Test Suite
    searchIndex.push({
      id: 'math-verification',
      title: 'Math Formula Verification & KaTeX Test Suite',
      desc: 'Interactive test suite verifying fractions, summations, Greek letters, gradients, matrices, and piecewise equations.',
      category: 'Reference',
      link: '#math-verification'
    });

    // 7. DSA Platform: Topics, Problems, and Tools
    if (window.MLForge && window.MLForge.dsa && window.MLForge.dsa.data) {
      if (MLForge.dsa.data.topics) {
        MLForge.dsa.data.topics.forEach(t => {
          searchIndex.push({
            id: `dsa-topic-${t.id}`,
            title: `DSA: ${t.title}`,
            desc: t.summary || t.definition.slice(0, 100),
            category: 'DSA Topics',
            link: `#dsa/topic/${t.id}`
          });
        });
      }

      if (MLForge.dsa.data.problems) {
        MLForge.dsa.data.problems.forEach(p => {
          searchIndex.push({
            id: `dsa-prob-${p.id}`,
            title: `Problem: ${p.title} (${p.difficulty})`,
            desc: `${p.pattern} • ${p.statement.slice(0, 85)}...`,
            category: 'DSA Problems',
            link: `#dsa/problem/${p.id}`
          });
        });
      }

      searchIndex.push(
        { id: 'dsa-tool-dashboard', title: 'DSA Dashboard', desc: 'Master Data Structures & Algorithms learning hub and roadmap', category: 'DSA Tools', link: '#dsa/dashboard' },
        { id: 'dsa-tool-cheatsheet', title: 'Complexity Cheat Sheet', desc: 'Time and space complexity reference for all data structures and algorithms', category: 'DSA Tools', link: '#dsa/complexity-cheat-sheet' },
        { id: 'dsa-tool-patterns', title: 'DSA Interview Patterns Guide', desc: 'Diagnose problems using 15+ patterns: Two Pointers, Sliding Window, DP, etc.', category: 'DSA Tools', link: '#dsa/interview-practice' },
        { id: 'dsa-tool-visualizers', title: 'Interactive Algorithm Visualizers', desc: 'Sorting, Binary Search, BST, BFS/DFS graph, and DP table visual animations', category: 'DSA Tools', link: '#dsa/visualizers' },
        { id: 'dsa-tool-progress', title: 'My DSA Progress', desc: 'Track solved problems, completed syllabus topics, and bookmarks', category: 'DSA Tools', link: '#dsa/progress' }
      );
    }

    // 8. Git & GitHub Learning Platform: Topics, Commands, and Tools
    if (window.MLForge && window.MLForge.git && window.MLForge.git.data) {
      if (MLForge.git.data.topics) {
        MLForge.git.data.topics.forEach(t => {
          searchIndex.push({
            id: `git-topic-${t.id}`,
            title: `Git: ${t.title}`,
            desc: t.summary || t.title,
            category: 'Git & GitHub',
            link: `#git/topic/${t.id}`
          });
        });
      }

      if (MLForge.git.data.commands) {
        MLForge.git.data.commands.forEach(c => {
          searchIndex.push({
            id: `git-cmd-${c.id}`,
            title: `Git Command: ${c.name}`,
            desc: `${c.syntax} — ${c.simpleMeaning}`,
            category: 'Git Commands',
            link: `#git/commands`
          });
        });
      }

      searchIndex.push(
        { id: 'git-tool-dashboard', title: 'Git & GitHub Dashboard', desc: 'Master Git & GitHub workflow guides, branch diagrams, and learning path', category: 'Git Tools', link: '#git/dashboard' },
        { id: 'git-tool-visualizers', title: 'Git Visualizers & Simulators', desc: '4-Box Lifecycle, Branch DAG graph, and Merge Conflict Simulator', category: 'Git Tools', link: '#git/visualizers' },
        { id: 'git-tool-lab', title: 'Git Practice Lab', desc: 'Interactive developer scenario challenges and quiz', category: 'Git Tools', link: '#git/practice-lab' },
        { id: 'git-tool-cheatsheet', title: 'Git Cheat Sheet', desc: 'Fast searchable command reference table', category: 'Git Tools', link: '#git/cheat-sheet' },
        { id: 'git-tool-progress', title: 'My Git Progress', desc: 'Track completed lessons and bookmarked commands', category: 'Git Tools', link: '#git/progress' }
      );
    }

    // 9. System Design Platform: Topics, Case Studies, Patterns, Tools
    if (window.MLForge && window.MLForge.sysdesign && window.MLForge.sysdesign.data) {
      if (MLForge.sysdesign.data.topics) {
        MLForge.sysdesign.data.topics.forEach(t => {
          searchIndex.push({
            id: `sd-topic-${t.id}`,
            title: `System Design: ${t.title}`,
            desc: t.summary || t.definition.slice(0, 100),
            category: 'System Design Topics',
            link: `#sysdesign/topic/${t.id}`
          });
        });
      }

      if (MLForge.sysdesign.data.caseStudies) {
        MLForge.sysdesign.data.caseStudies.forEach(cs => {
          searchIndex.push({
            id: `sd-case-${cs.id}`,
            title: `Architecture: ${cs.title} (${cs.tier})`,
            desc: cs.summary,
            category: 'System Design Case Studies',
            link: `#sysdesign/case-study/${cs.id}`
          });
        });
      }

      if (MLForge.sysdesign.data.patterns) {
        MLForge.sysdesign.data.patterns.forEach(p => {
          searchIndex.push({
            id: `sd-pat-${p.id}`,
            title: `Pattern: ${p.name}`,
            desc: p.problem.slice(0, 90),
            category: 'System Design Patterns',
            link: `#sysdesign/patterns`
          });
        });
      }

      if (MLForge.sysdesign.data.glossary) {
        MLForge.sysdesign.data.glossary.forEach(g => {
          searchIndex.push({
            id: `sd-gloss-${g.term}`,
            title: `Definition: ${g.term}`,
            desc: g.definition.slice(0, 90),
            category: 'System Design Glossary',
            link: g.topicLink || `#sysdesign/glossary`
          });
        });
      }

      searchIndex.push(
        { id: 'sd-tool-dashboard', title: 'System Design Dashboard', desc: 'System Design learning dashboard and stats', category: 'System Design Tools', link: '#sysdesign/dashboard' },
        { id: 'sd-tool-playground', title: 'Architecture Diagram Playground', desc: 'Visually construct, connect, and export system designs', category: 'System Design Tools', link: '#sysdesign/playground' },
        { id: 'sd-tool-calculators', title: 'Capacity Estimation Calculator', desc: 'Estimate RPS, Peak Multiplier, Storage, and Bandwidth', category: 'System Design Tools', link: '#sysdesign/calculators' },
        { id: 'sd-tool-simulators', title: 'System Simulators (Load Balancer & Message Queue)', desc: 'Interactive L4/L7 load balancing and dead-letter queue simulators', category: 'System Design Tools', link: '#sysdesign/simulators' },
        { id: 'sd-tool-interview', title: 'System Design Interview Questions', desc: 'Practice question bank with step-by-step solutions', category: 'System Design Tools', link: '#sysdesign/interview' },
        { id: 'sd-tool-lld', title: 'Low-Level Design (LLD) & SOLID', desc: 'OOP design patterns and runnable case studies', category: 'System Design Tools', link: '#sysdesign/lld' },
        { id: 'sd-tool-roadmap', title: 'System Design Learning Roadmap', desc: '15-step structured curriculum from fundamentals to scale', category: 'System Design Tools', link: '#sysdesign/roadmap' }
      );
    }
  }

  function init() {
    buildIndex();
    createModalDOM();
    bindShortcuts();
  }

  function createModalDOM() {
    modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop';
    modalBackdrop.id = 'search-modal-backdrop';

    modalBackdrop.innerHTML = `
      <div class="search-modal" role="dialog" aria-modal="true" aria-label="Global Search">
        <div class="search-input-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--text-muted);"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="global-search-input" class="search-input-field" placeholder="Search topics, calculators, formulas, algorithms (e.g. MSE, Backprop, VRAM)..." autocomplete="off" spellcheck="false">
          <button id="search-modal-close-btn" class="btn-icon-only" style="color: var(--text-muted);">✕</button>
        </div>

        <div class="search-results-list" id="search-results-list">
          <!-- Dynamically populated results -->
        </div>

        <div class="search-footer">
          <div style="display: flex; gap: 1rem;">
            <span><kbd style="background: var(--bg-badge); padding: 1px 4px; border-radius: 3px;">↑</kbd> <kbd style="background: var(--bg-badge); padding: 1px 4px; border-radius: 3px;">↓</kbd> Navigate</span>
            <span><kbd style="background: var(--bg-badge); padding: 1px 4px; border-radius: 3px;">Enter</kbd> Select</span>
            <span><kbd style="background: var(--bg-badge); padding: 1px 4px; border-radius: 3px;">Esc</kbd> Close</span>
          </div>
          <div>MLForge Search</div>
        </div>
      </div>
    `;

    document.body.appendChild(modalBackdrop);

    searchInput = document.getElementById('global-search-input');
    resultsList = document.getElementById('search-results-list');

    // Close on backdrop click
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) close();
    });

    document.getElementById('search-modal-close-btn').addEventListener('click', close);

    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });

    searchInput.addEventListener('keydown', handleKeyNavigation);
  }

  function bindShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        open();
      }
      // Escape
      if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
        close();
      }
      // Global shortcut 'T' for theme if not focusing an input
      if (e.key.toLowerCase() === 't' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        MLForge.ui.toggleTheme();
      }
    });

    const triggerBtn = document.getElementById('search-trigger-btn');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', open);
    }
  }

  function open() {
    modalBackdrop.classList.add('active');
    searchInput.value = '';
    selectedIndex = 0;
    performSearch('');
    setTimeout(() => searchInput.focus(), 50);
  }

  function close() {
    modalBackdrop.classList.remove('active');
  }

  function performSearch(query) {
    const raw = query.trim().toLowerCase();
    selectedIndex = 0;

    if (!raw) {
      // Show default top picks
      currentResults = searchIndex.slice(0, 10);
    } else {
      // Expand aliases
      let searchTerms = [raw];
      for (const [alias, expansions] of Object.entries(ALIASES)) {
        if (raw === alias || raw.includes(alias)) {
          searchTerms.push(...expansions);
        }
      }

      currentResults = searchIndex.filter(item => {
        const title = item.title.toLowerCase();
        const desc = (item.desc || '').toLowerCase();
        const cat = item.category.toLowerCase();

        return searchTerms.some(term => {
          return title.includes(term) || desc.includes(term) || cat.includes(term);
        });
      }).slice(0, 15);
    }

    renderResults();
  }

  function renderResults() {
    if (currentResults.length === 0) {
      resultsList.innerHTML = `
        <div style="padding: 2.5rem; text-align: center; color: var(--text-muted);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 0.75rem;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.25rem;">No matching tools or topics found</div>
          <div style="font-size: 0.8rem;">Try searching for "Gradient", "MSE", "Transformer", "VRAM", or "Accuracy".</div>
        </div>
      `;
      return;
    }

    let html = "";
    currentResults.forEach((item, idx) => {
      const isSelected = idx === selectedIndex;
      const catClass = getCategoryBadgeClass(item.category);

      html += `
        <div class="search-result-item ${isSelected ? 'selected' : ''}" data-idx="${idx}" data-link="${item.link}">
          <div class="search-result-info">
            <div class="search-result-title">${item.title}</div>
            <div class="search-result-desc">${item.desc}</div>
          </div>
          <span class="badge ${catClass}">${item.category}</span>
        </div>
      `;
    });

    resultsList.innerHTML = html;

    if (window.MLForge && MLForge.math) {
      MLForge.math.render(resultsList);
    }

    // Click handler on items
    resultsList.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('click', () => {
        const link = el.getAttribute('data-link');
        selectResult(link);
      });
    });
  }

  function getCategoryBadgeClass(cat) {
    if (cat === 'Calculators') return 'badge-cyan';
    if (cat === 'Playgrounds') return 'badge-violet';
    if (cat === 'Formulas') return 'badge-amber';
    if (cat === 'Code Examples') return 'badge-emerald';
    if (cat && cat.startsWith('System Design')) return 'badge-sysdesign-amber';
    return 'badge-blue';
  }

  function handleKeyNavigation(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedIndex < currentResults.length - 1) {
        selectedIndex++;
        renderResults();
        ensureVisible();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedIndex > 0) {
        selectedIndex--;
        renderResults();
        ensureVisible();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentResults[selectedIndex]) {
        selectResult(currentResults[selectedIndex].link);
      }
    }
  }

  function ensureVisible() {
    const selectedEl = resultsList.children[selectedIndex];
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }

  function selectResult(link) {
    close();
    if (link) {
      window.location.hash = link;
    }
  }

  function addItem(item) {
    if (item && item.id) {
      searchIndex.push(item);
    }
  }

  return {
    init,
    open,
    close,
    addItem,
    buildIndex
  };
})();
