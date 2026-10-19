/**
 * MLForge Comprehensive Knowledge Catalog
 * Detailed technical explanations, algorithm guides, formulas, pros/cons, and implementations.
 */

window.MLForge = window.MLForge || {};
window.MLForge.data = window.MLForge.data || {};

MLForge.data.topics = [
  // --- Machine Learning Fundamentals ---
  {
    id: "supervised-vs-unsupervised",
    title: "Supervised vs Unsupervised Learning",
    section: "Machine Learning",
    category: "Fundamentals",
    summary: "The core paradigm division in machine learning based on the availability of target labels.",
    definition: "Supervised learning trains models on input-output pairs $(x_i, y_i)$ to learn a mapping function $f(x) \\approx y$. Unsupervised learning uncovers latent structures, distributions, or groupings from unlabeled inputs $x_i$ alone.",
    problemSolved: "Determining whether a task requires labeled ground-truth targets (e.g. classification/regression) or autonomous pattern discovery (e.g. clustering/dimensionality reduction).",
    howItWorks: [
      "1. Supervised: The algorithm produces predictions $\\hat{y} = f(x)$, evaluates the loss $L(y, \\hat{y})$, and updates parameters to minimize prediction error.",
      "2. Unsupervised: The algorithm optimizes an intrinsic objective, such as minimizing intra-cluster variance (K-Means) or maximizing preserved variance (PCA).",
      "3. Semi-supervised: Leverages a small set of labeled data with a large body of unlabeled data to improve representation learning.",
      "4. Self-supervised: Automatically generates pseudo-labels from input data (e.g., masking words in BERT or predicting next tokens in GPT)."
    ],
    formulas: [
      { name: "Supervised Empirical Risk", exp: "R(f) = (1/n) Σ L(yᵢ, f(xᵢ))" },
      { name: "K-Means Inertia", exp: "J = Σᵢ Σ_{x ∈ Cᵢ} ||x - μᵢ||²" }
    ],
    pros: ["Supervised yields directly actionable predictive outputs with quantifiable benchmark accuracy.", "Unsupervised avoids expensive human labeling and discovers unknown patterns."],
    cons: ["Supervised requires expensive high-quality labeling and is vulnerable to label noise.", "Unsupervised evaluation is subjective and lacks objective ground truth."],
    useCases: ["Supervised: Credit default prediction, tumor diagnosis, fraud detection.", "Unsupervised: Customer segmentation, anomaly detection, genomic sequence grouping."],
    codeSnippet: `# Scikit-Learn Supervised vs Unsupervised
from sklearn.linear_model import LogisticRegression
from sklearn.cluster import KMeans

# 1. Supervised
clf = LogisticRegression()
clf.fit(X_train, y_train) # Uses labels

# 2. Unsupervised
km = KMeans(n_clusters=3, random_state=42)
clusters = km.fit_predict(X_unlabeled) # No labels needed`
  },
  {
    id: "bias-variance-tradeoff",
    title: "Bias-Variance Tradeoff",
    section: "Machine Learning",
    category: "Fundamentals",
    summary: "The fundamental conflict in minimizing two sources of error that prevent supervised learning algorithms from generalizing beyond their training data.",
    definition: "The expected generalization error of a model decomposes into three components: Bias² (error from erroneous assumptions / underfitting), Variance (error from sensitivity to small fluctuations in training set / overfitting), and irreducible error $\\sigma^2$.",
    problemSolved: "Guiding model selection, architecture complexity, and regularization to achieve optimal test performance.",
    howItWorks: [
      "1. High Bias (Underfitting): Model is overly simplistic (e.g., linear model for non-linear data). Performs poorly on both training and test sets.",
      "2. High Variance (Overfitting): Model is excessively complex (e.g., unpruned deep decision tree). Memorizes noise in training data; training error is low, but test error spikes.",
      "3. The Tradeoff: Decreasing bias increases model flexibility, which unavoidably increases variance unless more data or regularization is introduced."
    ],
    formulas: [
      { name: "Error Decomposition", exp: "E[(y - ŷ)²] = Bias(ŷ)² + Var(ŷ) + σ²" },
      { name: "Bias Formulation", exp: "Bias(ŷ) = E[ŷ] - y" },
      { name: "Variance Formulation", exp: "Var(ŷ) = E[(ŷ - E[ŷ])²]" }
    ],
    pros: ["Provides a clear diagnostic framework to determine whether to add more features or apply regularization."],
    cons: ["Irreducible error cannot be overcome by model improvements alone (inherent noise in the data)."],
    useCases: ["Diagnosing learning curves, tuning L1/L2 penalties, determining tree pruning depth."],
    codeSnippet: `# Diagnosing Bias-Variance with learning_curve
from sklearn.model_selection import learning_curve
import numpy as np

train_sizes, train_scores, val_scores = learning_curve(
    estimator, X, y, cv=5, scoring='neg_mean_squared_error'
)
train_rmse = np.sqrt(-np.mean(train_scores, axis=1))
val_rmse = np.sqrt(-np.mean(val_scores, axis=1))
# If train_rmse is high and close to val_rmse -> High Bias
# If train_rmse is low but val_rmse is much higher -> High Variance`
  },
  {
    id: "data-leakage",
    title: "Data Leakage Prevention",
    section: "Machine Learning",
    category: "Fundamentals",
    summary: "How information from outside the training dataset inappropriately contaminates the model during training.",
    definition: "Data leakage happens when information about the target variable or evaluation test set is inadvertently introduced into the training pipeline, leading to overly optimistic cross-validation but disastrous failure in production.",
    problemSolved: "Preventing models from failing silently when deployed on genuine unseen incoming data.",
    howItWorks: [
      "1. Preprocessing Leakage: Fitting scalers, imputers, or encoders on the entire dataset BEFORE splitting into train/test sets.",
      "2. Temporal Leakage: Using future information to predict past events (violating chronological order in time-series).",
      "3. Target Leakage: Including features that are direct proxies or duplicates of the target variable created after the event of interest occurs."
    ],
    formulas: [
      { name: "Strict Pipeline Fit", exp: "scaler.fit(X_train); X_test_scaled = scaler.transform(X_test)" }
    ],
    pros: ["Ensures offline validation metrics accurately reflect real-world inference performance."],
    cons: ["Requires disciplined pipeline architecture (e.g. Scikit-learn Pipeline) and careful feature auditing."],
    useCases: ["Time-series forecasting, credit risk scoring, medical diagnosis pipelines."],
    codeSnippet: `# Correct Pipeline avoiding leakage
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score

# StandardScaler is fit ONLY on training folds inside cross-validation
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', Ridge())
])
scores = cross_val_score(pipeline, X_train, y_train, cv=5)`
  },

  // --- Algorithms ---
  {
    id: "logistic-regression",
    title: "Logistic Regression",
    section: "Machine Learning",
    category: "Algorithms",
    summary: "Linear classification algorithm modeling the log-odds of a binary event using the sigmoid function.",
    definition: "Logistic Regression computes a linear combination of input features and maps it to a calibrated probability between 0 and 1 via the standard logistic sigmoid function: $p = 1 / (1 + e^{-(w^T x + b)})$.",
    problemSolved: "Binary and multinomial classification where probabilistic interpretability of feature weights is critical.",
    howItWorks: [
      "1. Compute the linear log-odds (logit): $z = w_1 x_1 + w_2 x_2 + \\dots + b$.",
      "2. Pass logit through the sigmoid function: $\\hat{p} = \\sigma(z)$.",
      "3. Compute cross-entropy loss against ground truth label $y \\in \\{0, 1\\}$.",
      "4. Optimize weights using gradient descent or quasi-Newton methods (L-BFGS, Newton-CG).",
      "5. Classify positive if $\\hat{p} \\ge \\text{threshold}$ (typically 0.5)."
    ],
    formulas: [
      { name: "Hypothesis", exp: "P(Y=1|X) = 1 / (1 + e^-(w^T x + b))" },
      { name: "Log-Odds Ratio", exp: "ln[ p / (1 - p) ] = w^T x + b" },
      { name: "Binary Cross-Entropy Loss", exp: "J(w) = -(1/m) Σ [yᵢ ln(pᵢ) + (1-yᵢ) ln(1-pᵢ)]" }
    ],
    pros: ["Fast training and inference, low memory usage.", "Outputs well-calibrated probabilities, highly interpretable weights (odds ratios)."],
    cons: ["Assumes linear decision boundary between classes.", "Cannot learn non-linear feature interactions without manual polynomial expansion."],
    useCases: ["Spam filtering, clinical disease risk estimation, credit default probability."],
    codeSnippet: `# Scikit-Learn Logistic Regression
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

model = LogisticRegression(C=1.0, penalty='l2', solver='lbfgs', max_iter=1000)
model.fit(X_train, y_train)

probs = model.predict_proba(X_test)[:, 1] # Probability of class 1
preds = model.predict(X_test)
print(classification_report(y_test, preds))`
  },
  {
    id: "random-forest",
    title: "Random Forest Classifier & Regressor",
    section: "Machine Learning",
    category: "Algorithms",
    summary: "Ensemble learning method operating by constructing a multitude of decorrelated decision trees via bagging and feature subsampling.",
    definition: "Random Forest is a bagging ensemble that trains hundreds of decision trees on bootstrap subsets of the dataset while considering only a random subset of features at each split point, aggregating predictions via majority vote (classification) or mean (regression).",
    problemSolved: "Reducing the high variance of individual decision trees while preserving non-linear modeling power.",
    howItWorks: [
      "1. Bootstrapping: Draw $B$ random subsets of the training set with replacement.",
      "2. Random Feature Subspace: At each node split, randomly sample $m = \\sqrt{p}$ features (classification) or $p/3$ (regression).",
      "3. Tree Growth: Grow deep unpruned trees to maintain low bias across individual trees.",
      "4. Ensembling: Decorrelated trees have low mutual covariance; averaging them drastically reduces variance."
    ],
    formulas: [
      { name: "Variance of Bagged Estimator", exp: "Var(Ensemble) = ρ·σ² + [(1 - ρ)/B]·σ²" }
    ],
    pros: ["Robust against overfitting without manual hyperparameter tuning.", "Handles mixed data types and non-linear interactions automatically.", "Provides Out-Of-Bag (OOB) error estimation and feature importance."],
    cons: ["Black box compared to a single decision tree.", "Larger memory footprint and slower real-time inference than linear models."],
    useCases: ["Tabular data competitions, churn modeling, customer lifetime value prediction."],
    codeSnippet: `# Scikit-Learn Random Forest
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(
    n_estimators=100,
    max_features='sqrt',
    max_depth=15,
    oob_score=True,
    random_state=42
)
rf.fit(X_train, y_train)
print("OOB Accuracy Score:", rf.oob_score_)`
  },
  {
    id: "xgboost",
    title: "Gradient Boosting & XGBoost",
    section: "Machine Learning",
    category: "Algorithms",
    summary: "State-of-the-art sequential ensemble method that trains shallow decision trees on the pseudo-residuals of previous models.",
    definition: "Gradient Boosting trains trees sequentially where each successive tree $h_m(x)$ fits the negative gradient (pseudo-residual) of the loss function with respect to the current ensemble prediction: $F_m(x) = F_{m-1}(x) + \\eta h_m(x)$.",
    problemSolved: "Achieving highest predictive accuracy on structured tabular datasets.",
    howItWorks: [
      "1. Start with an initial constant prediction $F_0(x) = \\arg\\min_c \\sum L(y_i, c)$.",
      "2. For each boosting round $m = 1 \\dots M$:",
      "3. Compute negative gradients (residuals) $r_{im} = - [\\partial L(y_i, F(x_i)) / \\partial F(x_i)]$.",
      "4. Fit a regression tree $h_m(x)$ to predict residuals $r_{im}$.",
      "5. Update ensemble: $F_m(x) = F_{m-1}(x) + \\eta h_m(x)$, where $\\eta$ is the learning rate (shrinkage)."
    ],
    formulas: [
      { name: "Additive Ensemble", exp: "F_m(x) = F_{m-1}(x) + η · h_m(x)" },
      { name: "XGBoost Regularized Objective", exp: "Obj = Σ L(yᵢ, ŷᵢ) + Σ [γ T + (1/2) λ Σ wⱼ²]" }
    ],
    pros: ["Consistently top-ranked algorithm on tabular competitions (Kaggle).", "Built-in handling of missing values, regularized pruning, second-order Taylor expansion."],
    cons: ["Sensitive to noisy data and severe outliers.", "Requires tuning multiple hyperparameters (learning_rate, max_depth, subsample, colsample_bytree)."],
    useCases: ["Financial fraud detection, CTR prediction in ad tech, search ranking."],
    codeSnippet: `# Scikit-Learn HistGradientBoosting / XGBoost
from sklearn.ensemble import HistGradientBoostingClassifier

model = HistGradientBoostingClassifier(
    learning_rate=0.08,
    max_iter=200,
    max_leaf_nodes=31,
    random_state=42
)
model.fit(X_train, y_train)
acc = model.score(X_test, y_test)`
  },

  // --- Deep Learning Fundamentals ---
  {
    id: "backpropagation",
    title: "Backpropagation Algorithm",
    section: "Deep Learning",
    category: "Fundamentals",
    summary: "The mathematical backbone of deep learning that computes partial derivatives of the loss with respect to all network weights using the chain rule.",
    definition: "Backpropagation performs reverse-mode automatic differentiation over the network's computational graph. It computes forward activations, measures output error, and propagates gradients backward layer-by-layer to update weights.",
    problemSolved: "Efficiently computing gradients for millions of parameters in time linear with the number of weights $O(|W|)$.",
    howItWorks: [
      "1. Forward Pass: Compute intermediate activations $z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}$ and $a^{[l]} = g(z^{[l]})$ up to output loss $\\mathcal{L}$.",
      "2. Output Error: Compute error signal $\\delta^{[L]} = \\nabla_{a^{[L]}} \\mathcal{L} \\odot g'(z^{[L]})$.",
      "3. Backward Induction: Propagate error backward: $\\delta^{[l]} = (W^{[l+1]T} \\delta^{[l+1]}) \\odot g'(z^{[l]})$.",
      "4. Weight Gradients: Compute $\\frac{\\partial \\mathcal{L}}{\\partial W^{[l]}} = \\delta^{[l]} (a^{[l-1]})^T$ and $\\frac{\\partial \\mathcal{L}}{\\partial b^{[l]}} = \\delta^{[l]}$.",
      "5. Parameter Update: Apply optimizer step: $W \\leftarrow W - \\eta \\frac{\\partial \\mathcal{L}}{\\partial W}$."
    ],
    formulas: [
      { name: "Layer Error Signal", exp: "δ^[l] = ((W^[l+1])^T δ^[l+1]) ⊙ f'(z^[l])" },
      { name: "Weight Gradient", exp: "∂L/∂W^[l] = δ^[l] · (a^[l-1])^T" },
      { name: "Bias Gradient", exp: "∂L/∂b^[l] = δ^[l]" }
    ],
    pros: ["Computes exact analytical gradients efficiently in a single backward pass."],
    cons: ["Can suffer from vanishing or exploding gradients when depth increases without normalization or residual connections."],
    useCases: ["Training all feedforward, convolutional, recurrent, and transformer neural networks."],
    codeSnippet: `# PyTorch Automatic Backpropagation
import torch
import torch.nn as nn

model = nn.Sequential(nn.Linear(10, 32), nn.ReLU(), nn.Linear(32, 1))
criterion = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# Forward pass
output = model(x_input)
loss = criterion(output, target)

# Backward pass (Backprop)
optimizer.zero_grad() # Clear previous gradients
loss.backward()       # Reverse-mode autodiff
optimizer.step()      # Update weights`
  },
  {
    id: "adam-optimizer",
    title: "Adam Optimizer (Adaptive Moment Estimation)",
    section: "Deep Learning",
    category: "Optimizers",
    summary: "The most widely used optimization algorithm combining momentum and RMSprop with adaptive per-parameter learning rates.",
    definition: "Adam tracks exponentially decaying moving averages of both past gradients ($m_t$, first moment) and past squared gradients ($v_t$, second moment), applying bias corrections to ensure robust updates early in training.",
    problemSolved: "Overcoming gradient vanishing/explosion, ravines, and sparse gradient challenges with minimal learning rate tuning.",
    howItWorks: [
      "1. Update biased 1st moment: $m_t = \\beta_1 m_{t-1} + (1 - \\beta_1) g_t$.",
      "2. Update biased 2nd moment: $v_t = \\beta_2 v_{t-1} + (1 - \\beta_2) g_t^2$.",
      "3. Compute bias-corrected moments: $\\hat{m}_t = m_t / (1 - \\beta_1^t)$ and $\\hat{v}_t = v_t / (1 - \\beta_2^t)$.",
      "4. Update parameters: $\\theta_t = \\theta_{t-1} - \\eta \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\epsilon}$.",
      "Default hyperparameter values: $\\beta_1 = 0.9, \\beta_2 = 0.999, \\epsilon = 10^{-8}, \\eta = 0.001$."
    ],
    formulas: [
      { name: "1st Moment (Mean)", exp: "m_t = β₁·m_{t-1} + (1 - β₁)·g_t" },
      { name: "2nd Moment (Variance)", exp: "v_t = β₂·v_{t-1} + (1 - β₂)·g_t²" },
      { name: "Parameter Update", exp: "θ_t = θ_{t-1} - η · [m̂_t / (√(v̂_t) + ε)]" }
    ],
    pros: ["Computationally efficient with low memory requirements.", "Well-suited for problems with large datasets, non-stationary objectives, or noisy gradients."],
    cons: ["Can fail to converge in rare convex settings; AdamW fixes weight decay decoupling."],
    useCases: ["Standard optimizer for Vision Transformers, LLMs, GANs, and Deep RL."],
    codeSnippet: `# PyTorch Adam / AdamW
import torch.optim as optim

# AdamW decouples L2 weight decay from gradient updates
optimizer = optim.AdamW(
    model.parameters(),
    lr=3e-4,
    betas=(0.9, 0.999),
    eps=1e-8,
    weight_decay=0.01
)`
  },
  {
    id: "transformer-architecture",
    title: "Transformer Architecture & Self-Attention",
    section: "Deep Learning",
    category: "Architectures",
    summary: "The revolutionary sequence transduction architecture based entirely on multi-head self-attention mechanisms without recurrence.",
    definition: "Transformers process sequences in parallel using Scaled Dot-Product Attention: $\\text{Attention}(Q, K, V) = \\text{softmax}(QK^T / \\sqrt{d_k}) V$, capturing arbitrary token-to-token dependencies irrespective of distance.",
    problemSolved: "Eliminating the sequential processing bottleneck of RNNs and solving long-range dependency vanishing.",
    howItWorks: [
      "1. Token & Positional Encoding: Tokens are embedded and added to sinusoids or learned positional embeddings.",
      "2. Projections: Input vectors are linearly projected into Query ($Q$), Key ($K$), and Value ($V$) matrices.",
      "3. Scaled Dot-Product: Compute pairwise similarity $QK^T$, scale by $1/\\sqrt{d_k}$ to prevent softmax saturation, and apply softmax.",
      "4. Value Weighting: Multiply attention weights by $V$ to compute context-aware token representations.",
      "5. Multi-Head Attention: Run $h$ attention heads in parallel to attend to information from different representation subspaces.",
      "6. Feed-Forward Networks & Residual Connections: Add & Norm layers wrap around each block."
    ],
    formulas: [
      { name: "Scaled Dot-Product Attention", exp: "Attention(Q, K, V) = Softmax(Q·K^T / √d_k) · V" },
      { name: "Multi-Head Attention", exp: "MHA(Q,K,V) = Concat(head₁, ..., head_h) · W^O" }
    ],
    pros: ["Massively parallelizable training on modern GPUs/TPUs.", "Excels at capturing long-range contextual relationships."],
    cons: ["Self-attention complexity scales quadratically $O(N^2)$ with sequence length without flash attention or linear approximations."],
    useCases: ["Large Language Models (GPT-4, LLaMA, Claude), Vision Transformers (ViT), AlphaFold."],
    codeSnippet: `# PyTorch MultiheadAttention
import torch
import torch.nn as nn

mha = nn.MultiheadAttention(embed_dim=512, num_heads=8, batch_first=True)
query = key = value = torch.randn(32, 128, 512) # [batch, seq_len, dim]
attn_output, attn_weights = mha(query, key, value)
print("Output shape:", attn_output.shape) # [32, 128, 512]`
  },

  // --- Mathematics for AI/ML ---
  {
    id: "linear-algebra-matrices",
    title: "Linear Algebra: Matrices & Vector Norms",
    section: "Mathematics",
    category: "Linear Algebra",
    summary: "The mathematical language of multidimensional transformations, datasets, and neural network weight tensors.",
    definition: "Vectors represent points or directions in vector space; matrices represent linear mappings between spaces. Norms quantify the magnitude of vectors, forming the basis for loss metrics and regularization penalties.",
    problemSolved: "Representing high-dimensional data, network transformations, and measuring geometric distances.",
    howItWorks: [
      "1. Vector Dot Product: $u \\cdot v = \\sum u_i v_i = ||u|| ||v|| \\cos(\\theta)$. Reflects alignment.",
      "2. Matrix Multiplication: $(AB)_{ij} = \\sum_k A_{ik} B_{kj}$. Represents composition of linear mappings.",
      "3. L1 Norm (Manhattan): $||x||_1 = \\sum |x_i|$. Induces sparsity (L1 Lasso regularization).",
      "4. L2 Norm (Euclidean): $||x||_2 = \\sqrt{\\sum x_i^2}$. Prevents extreme parameter values (L2 Ridge / Weight Decay).",
      "5. Frobenius Norm: $||A||_F = \\sqrt{\\sum_{i,j} A_{ij}^2}$. Matrix equivalent of Euclidean length."
    ],
    formulas: [
      { name: "Dot Product", exp: "u · v = Σ uᵢ vᵢ" },
      { name: "L1 Norm", exp: "||x||₁ = Σ |xᵢ|" },
      { name: "L2 Norm", exp: "||x||₂ = √(Σ xᵢ²)" }
    ],
    pros: ["Allows vectorized operations executed at hardware speeds on Tensor Cores."],
    cons: ["Curse of dimensionality: high-dimensional vector spaces become exponentially sparse."],
    useCases: ["Embedding spaces, layer forward-pass matrix multiplication, distance computations."],
    codeSnippet: `# NumPy Linear Algebra & Norms
import numpy as np

u = np.array([3.0, 4.0])
v = np.array([1.0, 2.0])

dot = np.dot(u, v)                # 3*1 + 4*2 = 11
l1_norm = np.linalg.norm(u, ord=1) # 3 + 4 = 7.0
l2_norm = np.linalg.norm(u, ord=2) # sqrt(9+16) = 5.0`
  }
];
