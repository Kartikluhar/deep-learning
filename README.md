# MLForge — AI & ML Developer Workspace & Learning Platform

MLForge is a modern, responsive developer workspace and learning platform for Machine Learning engineers, Deep Learning practitioners, data scientists, and students. Built with pure **HTML5, CSS3, and Vanilla JavaScript**, it provides instant client-side execution with **zero external backend dependencies, zero API keys, and zero telemetry**.

---

## 🚀 Key Features

### 1. AI/ML Calculators Directory (21+ Precision Tools)
Every calculator performs real-time mathematical operations with strict validation, zero division handling, and step-by-step formula breakdown:
- **Neuron Output Calculator**: Vector dot product $\sum w_i x_i + b$ and activation function evaluation.
- **Activation Function Evaluator**: Computes Sigmoid, ReLU, Tanh, Leaky ReLU, GELU, and numerically stable Softmax ($e^{z - \max(z)}$).
- **Loss Function Evaluator**: Computes sample-level residuals and final loss for MSE, MAE, Huber Loss, and Binary Cross-Entropy with probability clipping ($10^{-15}$).
- **Gradient Descent Step Calculator**: Parameter update $\theta_{new} = \theta_{old} - \eta \nabla J(\theta)$ with optional momentum velocity.
- **Backpropagation Step Calculator**: 2-layer perceptron analytical forward and backward chain-rule step.
- **Parameter Count Calculator**: Trainable weights and biases across Dense and Conv2D layer stacks.
- **CNN Tensor Shape Calculator**: Computes output spatial resolution $\lfloor(W - K + 2P)/S\rfloor + 1$.
- **Batch & Training Steps Planner**: Epoch steps, total optimizer steps, and drop_last remainder handling.
- **Train / Validation / Test Split Planner**: Partitions samples cleanly to 100% without rounding drift.
- **Confusion Matrix & Classification Metrics**: Accuracy, Precision, Recall, Specificity, F1-Score, Balanced Accuracy, FPR, and FNR.
- **Bayes' Theorem Calculator**: Posterior probability $P(A|B)$ with prior, likelihood, and false alarm rate.
- **Standardization (Z-Score)**: Mean, variance, sample standard deviation, and transformed $z$-scores.
- **Min-Max Normalization**: Scales features into customizable target ranges $[a, b]$.
- **Linear Regression OLS**: Slope, intercept, Pearson correlation $r$, and $R^2$ determination coefficient.
- **KNN Distance Calculator**: Euclidean ($L_2$), Manhattan ($L_1$), and Minkowski ($L_p$) metrics.
- **Cosine Similarity & Distance**: High-dimensional vector dot product and angle calculation.
- **Shannon Entropy & Information Gain**: Parent impurity $H(S)$ and decision tree branch split gain.
- **Class Imbalance Analyzer**: Imbalance ratio and engineering recommendations (SMOTE, Focal Loss).
- **GPU VRAM & Memory Estimator**: Model weight memory across FP32, FP16, INT8, INT4, plus Adam optimizer states (8 bytes/param) and activation context buffers.
- **Training Wall-Clock Time Estimator**: Throughput (samples/sec) and multi-GPU scaling duration.

---

### 2. Interactive Visual Learning Playgrounds
Built with responsive SVG and HTML5 Canvas to provide direct visual intuition:
1. **Neuron Playground**: Interactive single neuron with draggable sliders for inputs, synaptic weights, and bias. Features live signal firing and SVG glow.
2. **Activation Function Explorer**: 2D coordinate canvas grapher for Sigmoid, ReLU, Tanh, Leaky ReLU, GELU, and Swish, with interactive mouse scrubber and derivative curve $f'(x)$ overlay.
3. **Gradient Descent Playground**: Real-time parameter ball stepping down convex or non-convex loss landscapes with step, auto-run, and divergence alerts.
4. **CNN Convolution Visualizer**: Interactive 2D matrix displaying how a receptive field kernel slides over an input feature map to light up output tensor cells.
5. **Network Architecture Builder**: Add/remove Dense layers, adjust neuron counts, and inspect live SVG synaptic connections with total parameter counts.
6. **Overfitting vs Underfitting Explorer**: Polynomial curve fitting simulation demonstrating the bias-variance trade-off across varying model degrees and noise levels.

---

### 3. Comprehensive Knowledge & Theory Curriculum
Structured reference modules containing definitions, problems solved, step-by-step algorithms, mathematical formulas, advantages/limitations, and Python code:
- **Machine Learning Fundamentals**: Supervised vs Unsupervised, Bias-Variance Trade-off, Data Leakage Prevention, Feature Scaling, Cross-Validation.
- **Algorithms**: Logistic Regression, Random Forest, Gradient Boosting / XGBoost, Support Vector Machines, K-Means Clustering, PCA.
- **Deep Learning Fundamentals**: Backpropagation, Adam & AdamW Optimizers, Transformer Architecture & Multi-Head Self-Attention.
- **Mathematics for AI**: Vectors, Matrix multiplication, Norms ($L_1, L_2, L_\infty$), Calculus, and Probability.

---

### 4. Searchable Formula Catalog
Curated formula reference cards including:
- Name and mathematical expressions.
- Symbol definitions table.
- When to use and practical rules of thumb.
- Numerical worked examples.
- Common pitfalls and numerical stability tips.
- 1-click button to jump directly to the relevant interactive calculator.
- Formula copy and bookmarking support.

---

### 5. Production Code Reference
Copyable, tested Python templates for:
- PyTorch training loops with Automatic Mixed Precision (`autocast`), gradient clipping, and learning rate scheduling.
- Scikit-Learn data leakage-free preprocessing pipelines with `ColumnTransformer`.
- FastAPI production model serving REST endpoint.
- Modular PyTorch CNN with Residual connections and Global Average Pooling.

---

### 6. Developer Experience & Persistence
- **Global Omnisearch (`Ctrl+K` / `Cmd+K`)**: Instant search across all tools, topics, formulas, and code with keyword aliases (e.g. "MSE", "BCE", "VRAM", "CNN", "SGD").
- **Dark & Light Themes**: Dark mode default (`#090d16`) with high-contrast light theme toggle (`T` shortcut).
- **LocalStorage Persistence**: Bookmarks and recently used calculators stay in your browser.
- **Fully Responsive**: Adapts seamlessly to wide desktop monitors, laptops, tablets, and mobile phones with collapsible sidebar and mobile drawer.

### 4. System Design Engineering Platform (Zero-to-Scale)
Complete curriculum and interactive developer workspace for distributed systems and technical interview preparation:
- **Core Topics Curriculum**: Comprehensive guides on Fundamentals, Networking, API Design, Database Design, Caching, Load Balancing, Scalability, Distributed Systems, Message Queues, Microservices, Storage & CDN, Reliability, Security, and Observability.
- **Real-World High-Level Design (HLD) Case Studies**: TinyURL, Rate Limiter, WhatsApp Real-Time Chat, YouTube/Netflix Video Streaming Platform, E-commerce, Uber, and more.
- **Low-Level Design (LLD) & OOP**: SOLID principles, UML diagrams, GoF Design Patterns, and runnable machine coding solutions (Parking Lot, Elevator Management, Splitwise).
- **Interactive Calculators**: Capacity Estimation (RPS, Storage, Bandwidth, Little's Law), Cache Hit Ratio, and High Availability Downtime calculator.
- **System Simulators**: Layer 7 Load Balancer simulator with failover and Message Queue simulator with Dead-Letter Queue (DLQ).
- **Architecture Diagram Playground**: Visual interactive canvas with drag-and-drop nodes, labeled arrow connectors, starter templates, and PNG/JSON export.
- **Interview Question Bank & Practice Quizzes**: Categorized interview prompts with scratchpads, revealable solutions, and instant-feedback quizzes.

---

## 📁 Project Structure

```
deepLearning/
├── index.html                     # Main application entry point & semantic layout
├── README.md                      # Documentation & architecture overview
├── css/
│   ├── variables.css              # Design tokens, color palette, dark/light themes
│   ├── reset.css                  # Modern CSS reset & custom scrollbars
│   ├── layout.css                 # Sidebar, header, grid layout, right context panel
│   ├── components.css             # Cards, buttons, inputs, tabs, search modal, toasts
│   ├── pages.css                  # Dashboard, calculators, playgrounds, and topics styling
│   └── responsive.css             # Mobile & tablet breakpoints
└── js/
    ├── app.js                     # Main bootstrapper & global keyboard shortcuts
    ├── router.js                  # Client-side hash routing & view renderers
    ├── search.js                  # Omnisearch index, alias expansion, modal controller
    ├── storage.js                 # LocalStorage manager for bookmarks, recents, theme
    ├── ui.js                      # UI helpers, toast notifications, theme toggler
    ├── data/
    │   ├── topics.js              # Knowledge curriculum data
    │   ├── formulas.js            # Formula library catalog
    │   └── code-examples.js       # Production code templates
    ├── calculators/
    │   ├── neural-network.js      # Neuron, Activation, Loss, Backprop, CNN shape, Batches
    │   ├── machine-learning.js    # Regression, Classification, Bayes, Norm, Distances, Entropy
    │   ├── mathematics.js         # Vectors, Matrices, Norms, Statistics, Derivatives
    │   └── project-planning.js    # VRAM estimator, Training duration, Storage
    └── visualizations/
        ├── neuron-playground.js    # Interactive SVG neuron playground
        ├── activation-functions.js# Canvas curve grapher with derivative overlay
        ├── gradient-descent.js    # Loss surface parameter descent animation
        ├── cnn-visualizer.js      # 2D matrix receptive field sliding visualizer
        ├── architecture-builder.js# Interactive deep learning layer stack builder
        └── fit-explorer.js        # Polynomial bias-variance explorer
```

---

## 💻 How to Run Locally

Because MLForge uses standard client-side JavaScript and CSS, you can run it using any local static file server or by opening `index.html` directly:

### Option 1: VS Code Live Server (Recommended)
1. Open the project folder in VS Code.
2. Right-click `index.html` and select **"Open with Live Server"**.

### Option 2: Python HTTP Server
Run from the project root directory:
```bash
# Python 3
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

### Option 3: Node.js (npx serve)
```bash
npx -y serve .
```

### Option 4: Direct Browser Open
Double-click `index.html` or open `file:///.../index.html` directly in Chrome, Firefox, Safari, or Edge.

---

## ⌨️ Global Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + K` or `Cmd + K` | Open Global Omnisearch |
| `T` | Toggle Dark / Light Theme |
| `G` then `D` | Go to Dashboard |
| `G` then `C` | Go to Calculators |
| `G` then `P` | Go to Visual Playgrounds |
| `G` then `T` | Go to Topics Curriculum |
| `G` then `F` | Go to Formula Library |
| `Esc` | Close search modal or drawer |
