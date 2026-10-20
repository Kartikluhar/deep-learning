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
    'auc': ['roc', 'area under curve', 'classification metrics']
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

  return {
    init,
    open,
    close
  };
})();
