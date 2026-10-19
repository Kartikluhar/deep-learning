/**
 * MLForge Comprehensive Knowledge Catalog
 * Detailed technical explanations, algorithm guides, formulas, pros/cons, and implementations.
 * All formulas use clean LaTeX syntax configured for KaTeX inline and display rendering.
 */

window.MLForge = window.MLForge || {};
window.MLForge.data = window.MLForge.data || {};

MLForge.data.topics = [
  // =========================================================================
  // Section 1: Machine Learning Fundamentals & Algorithms
  // =========================================================================
  {
    id: "supervised-vs-unsupervised",
    title: "Supervised vs Unsupervised Learning",
    section: "Machine Learning",
    category: "Fundamentals",
    summary: "The core paradigm division in machine learning based on the availability of target labels.",
    definition: "Supervised learning trains models on input-output pairs $(x_i, y_i)$ to learn a mapping function $f(x) \\approx y$. Unsupervised learning uncovers latent structures, distributions, or groupings from unlabeled inputs $x_i$ alone.",
    problemSolved: "Determining whether a task requires labeled ground-truth targets (e.g. classification/regression) or autonomous pattern discovery (e.g. clustering/dimensionality reduction).",
    howItWorks: [
      "1. Supervised: The algorithm produces predictions $\\hat{y} = f(x)$, evaluates the loss $\\mathcal{L}(y, \\hat{y})$, and updates parameters to minimize prediction error.",
      "2. Unsupervised: The algorithm optimizes an intrinsic objective, such as minimizing intra-cluster variance (K-Means: $J = \\sum_{k=1}^K \\sum_{x \\in C_k} \\|x - \\mu_k\\|^2$) or maximizing preserved variance (PCA).",
      "3. Semi-supervised: Leverages a small set of labeled data with a large body of unlabeled data to improve representation learning.",
      "4. Self-supervised: Automatically generates pseudo-labels from input data (e.g., masking tokens in BERT or next-token autoregression in GPT)."
    ],
    formulas: [
      { name: "Supervised Empirical Risk Minimization", exp: "R(f) = \\frac{1}{n} \\sum_{i=1}^n \\mathcal{L}(y_i, f(x_i))" },
      { name: "K-Means Cluster Inertia Objective", exp: "J = \\sum_{k=1}^K \\sum_{x \\in C_k} \\|x - \\mu_k\\|^2" }
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
    definition: "The expected generalization error of a model decomposes into three components: $\\text{Bias}^2$ (error from erroneous assumptions / underfitting), $\\text{Variance}$ (error from sensitivity to small fluctuations in training set / overfitting), and irreducible noise variance $\\sigma^2$.",
    problemSolved: "Guiding model selection, architecture complexity, and regularization to achieve optimal test performance.",
    howItWorks: [
      "1. High Bias (Underfitting): Model is overly simplistic (e.g., linear model for non-linear data). Performs poorly on both training and test sets ($E[\\hat{y}] \\neq y$).",
      "2. High Variance (Overfitting): Model is excessively complex (e.g., unpruned deep decision tree). Memorizes noise in training data; training error is low, but test error spikes.",
      "3. The Tradeoff: Decreasing bias increases model flexibility, which unavoidably increases variance unless more data or regularization is introduced."
    ],
    formulas: [
      { name: "Expected Generalization Error Decomposition", exp: "\\mathbb{E}[(y - \\hat{y})^2] = \\text{Bias}(\\hat{y})^2 + \\text{Var}(\\hat{y}) + \\sigma^2" },
      { name: "Model Bias Formulation", exp: "\\text{Bias}(\\hat{y}) = \\mathbb{E}[\\hat{y}] - y" },
      { name: "Model Variance Formulation", exp: "\\text{Var}(\\hat{y}) = \\mathbb{E}\\left[\\left(\\hat{y} - \\mathbb{E}[\\hat{y}]\\right)^2\\right]" }
    ],
    pros: ["Provides a clear diagnostic framework to determine whether to add more features or apply regularization."],
    cons: ["Irreducible error $\\sigma^2$ cannot be overcome by model improvements alone (inherent noise in the data)."],
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
      { name: "Strict Preprocessing Transform", exp: "\\mu_{\\text{train}} = \\frac{1}{n_{\\text{tr}}} \\sum x_i, \\quad x_{\\text{scaled}} = \\frac{x - \\mu_{\\text{train}}}{\\sigma_{\\text{train}}}" }
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
  {
    id: "logistic-regression",
    title: "Logistic Regression",
    section: "Machine Learning",
    category: "Algorithms",
    summary: "Linear classification algorithm modeling the log-odds of a binary event using the sigmoid function.",
    definition: "Logistic Regression computes a linear combination of input features and maps it to a calibrated probability between 0 and 1 via the standard logistic sigmoid function: $p = \\frac{1}{1 + e^{-(\\mathbf{w}^T \\mathbf{x} + b)}}$.",
    problemSolved: "Binary and multinomial classification where probabilistic interpretability of feature weights is critical.",
    howItWorks: [
      "1. Compute the linear log-odds (logit): $z = \\mathbf{w}^T \\mathbf{x} + b = w_1 x_1 + w_2 x_2 + \\dots + b$.",
      "2. Pass logit through the sigmoid function: $\\hat{p} = \\sigma(z) = \\frac{1}{1 + e^{-z}}$.",
      "3. Compute binary cross-entropy loss against ground truth label $y \\in \\{0, 1\\}$.",
      "4. Optimize weights using gradient descent: $\\mathbf{w} \\leftarrow \\mathbf{w} - \\eta \\nabla J(\\mathbf{w})$.",
      "5. Classify positive if $\\hat{p} \\ge \\text{threshold}$ (typically 0.5)."
    ],
    formulas: [
      { name: "Hypothesis (Probability Mapping)", exp: "P(Y=1|\\mathbf{x}) = \\frac{1}{1 + e^{-(\\mathbf{w}^T \\mathbf{x} + b)}}" },
      { name: "Log-Odds (Logit Formulation)", exp: "\\ln\\left(\\frac{p}{1 - p}\\right) = \\mathbf{w}^T \\mathbf{x} + b" },
      { name: "Binary Cross-Entropy Loss (Log Loss)", exp: "J(\\mathbf{w}) = -\\frac{1}{m} \\sum_{i=1}^m \\left[ y_i \\ln(\\hat{p}_i) + (1 - y_i) \\ln(1 - \\hat{p}_i) \\right]" }
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
      "4. Ensembling: Decorrelated trees have low mutual covariance ($\\rho$); averaging them drastically reduces variance."
    ],
    formulas: [
      { name: "Variance of Bagged Ensemble Estimator", exp: "\\text{Var}(\\text{Ensemble}) = \\rho \\sigma^2 + \\frac{1 - \\rho}{B} \\sigma^2" }
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
      "3. Compute negative gradients (residuals) $r_{im} = -\\left[ \\frac{\\partial L(y_i, F(x_i))}{\\partial F(x_i)} \\right]$.",
      "4. Fit a regression tree $h_m(x)$ to predict residuals $r_{im}$.",
      "5. Update ensemble: $F_m(x) = F_{m-1}(x) + \\eta h_m(x)$, where $\\eta$ is the learning rate (shrinkage)."
    ],
    formulas: [
      { name: "Additive Ensemble Update", exp: "F_m(x) = F_{m-1}(x) + \\eta \\cdot h_m(x)" },
      { name: "XGBoost Regularized Objective", exp: "\\text{Obj} = \\sum_{i=1}^n L(y_i, \\hat{y}_i) + \\sum_{k=1}^K \\left[ \\gamma T_k + \\frac{1}{2} \\lambda \\sum_{j=1}^{T_k} w_j^2 \\right]" }
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

  // =========================================================================
  // Section 2: Deep Learning Architectures & Training
  // =========================================================================
  {
    id: "backpropagation",
    title: "Backpropagation Algorithm",
    section: "Deep Learning",
    category: "Fundamentals",
    summary: "The mathematical backbone of deep learning that computes partial derivatives of the loss with respect to all network weights using the chain rule.",
    definition: "Backpropagation performs reverse-mode automatic differentiation over the network's computational graph. It computes forward activations, measures output error, and propagates error signals backward layer-by-layer to calculate analytical parameter gradients in time $O(|W|)$.",
    problemSolved: "Efficiently computing exact analytical gradients for millions or billions of parameters in linear time.",
    howItWorks: [
      "1. Forward Pass: Compute pre-activations $z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}$ and activations $a^{[l]} = g(z^{[l]})$ across layers up to loss $\\mathcal{L}$.",
      "2. Output Error: Compute output error vector $\\delta^{[L]} = \\nabla_{a^{[L]}} \\mathcal{L} \\odot g'(z^{[L]})$.",
      "3. Backward Induction: Propagate error backward: $\\delta^{[l]} = \\left( (W^{[l+1]})^T \\delta^{[l+1]} \\right) \\odot g'(z^{[l]})$.",
      "4. Weight Gradients: Compute $\\frac{\\partial \\mathcal{L}}{\\partial W^{[l]}} = \\delta^{[l]} (a^{[l-1]})^T$ and bias gradient $\\frac{\\partial \\mathcal{L}}{\\partial b^{[l]}} = \\delta^{[l]}$.",
      "5. Parameter Update: Apply gradient step: $W^{[l]} \\leftarrow W^{[l]} - \\eta \\frac{\\partial \\mathcal{L}}{\\partial W^{[l]}}$."
    ],
    formulas: [
      { name: "Layer Error Signal Propagation", exp: "\\delta^{[l]} = \\left((W^{[l+1]})^T \\delta^{[l+1]}\\right) \\odot g'(z^{[l]})" },
      { name: "Weight Matrix Gradient", exp: "\\frac{\\partial \\mathcal{L}}{\\partial W^{[l]}} = \\delta^{[l]} (a^{[l-1]})^T" },
      { name: "Bias Vector Gradient", exp: "\\frac{\\partial \\mathcal{L}}{\\partial b^{[l]}} = \\delta^{[l]}" }
    ],
    pros: ["Computes exact analytical gradients efficiently in a single backward sweep."],
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
      "3. Compute bias-corrected moments: $\\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t}$ and $\\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t}$.",
      "4. Update parameters: $\\theta_t = \\theta_{t-1} - \\eta \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\epsilon}$.",
      "Standard hyperparameter values: $\\beta_1 = 0.9, \\beta_2 = 0.999, \\epsilon = 10^{-8}, \\eta = 0.001$."
    ],
    formulas: [
      { name: "1st Moment (Mean Gradient)", exp: "m_t = \\beta_1 m_{t-1} + (1 - \\beta_1) g_t" },
      { name: "2nd Moment (Uncentered Variance)", exp: "v_t = \\beta_2 v_{t-1} + (1 - \\beta_2) g_t^2" },
      { name: "Parameter Update Step", exp: "\\theta_t = \\theta_{t-1} - \\eta \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\epsilon}" }
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
    definition: "Transformers process sequences in parallel using Scaled Dot-Product Attention: $\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$, capturing arbitrary token-to-token dependencies irrespective of distance.",
    problemSolved: "Eliminating the sequential processing bottleneck of RNNs and solving long-range dependency vanishing.",
    howItWorks: [
      "1. Token & Positional Encoding: Tokens are embedded and added to sinusoidal or learned positional embeddings.",
      "2. Projections: Input vectors are linearly projected into Query ($Q$), Key ($K$), and Value ($V$) matrices.",
      "3. Scaled Dot-Product: Compute pairwise similarity $QK^T$, scale by $1/\\sqrt{d_k}$ to prevent softmax saturation, and apply softmax.",
      "4. Value Weighting: Multiply attention weights by $V$ to compute context-aware token representations.",
      "5. Multi-Head Attention: Run $h$ attention heads in parallel to attend to information from different representation subspaces.",
      "6. Feed-Forward Networks & Residual Connections: LayerNorm and residual connections wrap around each sub-block."
    ],
    formulas: [
      { name: "Scaled Dot-Product Attention", exp: "\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{Q K^T}{\\sqrt{d_k}} \\right) V" },
      { name: "Multi-Head Attention (MHA)", exp: "\\text{MHA}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h) W^O" }
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
  {
    id: "cnn-convolutional-networks",
    title: "Convolutional Neural Networks (CNN) & Receptive Fields",
    section: "Deep Learning",
    category: "Architectures",
    summary: "Spatial feature extraction architecture utilizing localized kernels, weight sharing, and subsampling pools.",
    definition: "CNNs exploit spatial locality and translation invariance in grid-like topologies (images, audio spectrograms) by convolving learnable filters across input tensors: $(I * K)(i, j) = \\sum_m \\sum_n I(i - m, j - n) K(m, n)$.",
    problemSolved: "Preventing the parameter explosion that occurs when applying dense fully connected layers to high-resolution images.",
    howItWorks: [
      "1. Convolution Operation: Slide a kernel of size $K \\times K$ across input feature map $W_{\\text{in}} \\times H_{\\text{in}}$ with stride $S$ and padding $P$.",
      "2. Output Spatial Dimension: Computed via $W_{\\text{out}} = \\lfloor \\frac{W_{\\text{in}} - K + 2P}{S} \\rfloor + 1$.",
      "3. Non-Linear Activation: Apply ReLU or GELU to induce non-linear feature gating.",
      "4. Spatial Pooling: Downsample feature maps using MaxPool or AvgPool to achieve translation invariance.",
      "5. Channel Depth Expansion: Increase channel dimensions from RGB ($C=3$) to rich semantic representations ($C=256, 512$)."
    ],
    formulas: [
      { name: "2D Discrete Convolution Operation", exp: "(I * K)(i, j) = \\sum_{m=-k}^k \\sum_{n=-k}^k I(i+m, j+n) K(m, n)" },
      { name: "Output Spatial Dimension", exp: "W_{\\text{out}} = \\left\\lfloor \\frac{W_{\\text{in}} - K + 2P}{S} \\right\\rfloor + 1" }
    ],
    pros: ["Translation equivariance and localized receptive fields.", "Dramatically fewer parameters than fully connected networks due to weight sharing."],
    cons: ["Lacks intrinsic rotation or scale invariance without augmentation or specialized pooling."],
    useCases: ["Computer vision, image segmentation, object detection (YOLO), medical scan classification."],
    codeSnippet: `# PyTorch Conv2D Layer Output Shape
import torch
import torch.nn as nn

conv = nn.Conv2d(in_channels=3, out_channels=64, kernel_size=3, stride=1, padding=1)
x = torch.randn(1, 3, 224, 224)
out = conv(x)
print("Output Shape:", out.shape) # [1, 64, 224, 224]`
  },
  {
    id: "rnn-lstm-networks",
    title: "Recurrent Networks (RNN) & LSTM Gating",
    section: "Deep Learning",
    category: "Architectures",
    summary: "Sequence processing architectures equipped with internal recurrence and adaptive memory gates.",
    definition: "Standard RNNs maintain a recurring hidden state $h_t = \\tanh(W x_t + U h_{t-1} + b)$. Long Short-Term Memory (LSTM) networks resolve the vanishing gradient dilemma by introducing a constant error carousel and specialized multiplicative gates.",
    problemSolved: "Overcoming vanishing and exploding gradients when backpropagating through long temporal horizons.",
    howItWorks: [
      "1. Forget Gate: Decide what past information to throw away: $f_t = \\sigma(W_f x_t + U_f h_{t-1} + b_f)$.",
      "2. Input Gate: Decide what new information to store: $i_t = \\sigma(W_i x_t + U_i h_{t-1} + b_i)$.",
      "3. Candidate Cell State: Generate candidate updates: $\\tilde{C}_t = \\tanh(W_c x_t + U_c h_{t-1} + b_c)$.",
      "4. Cell State Update: Combine past and candidate memories: $C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t$.",
      "5. Output Gate: Emit filtered hidden state: $o_t = \\sigma(W_o x_t + U_o h_{t-1} + b_o)$ and $h_t = o_t \\odot \\tanh(C_t)$."
    ],
    formulas: [
      { name: "LSTM Memory Gating Equations", exp: "\\begin{aligned} f_t &= \\sigma(W_f x_t + U_f h_{t-1} + b_f) \\\\ i_t &= \\sigma(W_i x_t + U_i h_{t-1} + b_i) \\\\ C_t &= f_t \\odot C_{t-1} + i_t \\odot \\tanh(W_c x_t + U_c h_{t-1} + b_c) \\\\ h_t &= \\sigma(W_o x_t + U_o h_{t-1} + b_o) \\odot \\tanh(C_t) \\end{aligned}" }
    ],
    pros: ["Capable of learning long-term temporal dependencies.", "Additive cell state gradient updates prevent exponential gradient decay."],
    cons: ["Sequential computation cannot be parallelized along the time axis during training."],
    useCases: ["Speech recognition, stock price time-series prediction, sequence modeling."],
    codeSnippet: `# PyTorch LSTM Sequence Model
import torch
import torch.nn as nn

lstm = nn.LSTM(input_size=10, hidden_size=64, num_layers=2, batch_first=True)
seq_input = torch.randn(32, 20, 10) # [batch, seq_len, features]
output, (hn, cn) = lstm(seq_input)
print("Hidden State Shape:", hn.shape) # [2, 32, 64]`
  },
  {
    id: "activation-loss-functions",
    title: "Activation Functions & Loss Calculus",
    section: "Deep Learning",
    category: "Fundamentals",
    summary: "Mathematical foundations of non-linear activations and task-specific loss optimization objectives.",
    definition: "Activation functions introduce non-linear mapping capacity so deep networks can approximate arbitrary continuous functions. Loss functions quantify the empirical discrepancy between model predictions $\\hat{y}$ and true ground truth targets $y$.",
    problemSolved: "Enabling multi-layer networks to learn non-linear boundaries and providing well-behaved gradients for descent.",
    howItWorks: [
      "1. Sigmoid: $\\sigma(z) = \\frac{1}{1 + e^{-z}}$, bounded in $(0, 1)$ with derivative $\\sigma'(z) = \\sigma(z)(1 - \\sigma(z))$.",
      "2. ReLU: $\\text{ReLU}(z) = \\max(0, z)$, solves gradient vanishing for $z > 0$ with derivative $\\frac{d}{dz}\\text{ReLU}(z) = 1$.",
      "3. Mean Squared Error: $\\text{MSE} = \\frac{1}{n} \\sum (y_i - \\hat{y}_i)^2$, quadratic penalty for regression.",
      "4. Cross-Entropy Loss: $\\mathcal{L} = -\\sum y_i \\ln(\\hat{p}_i)$, maximizes likelihood under the Bernoulli or Multinomial distribution.",
      "5. Huber Loss: Combines quadratic MSE for small residuals ($|e| \\le \\delta$) and linear MAE for large outliers."
    ],
    formulas: [
      { name: "Binary Cross-Entropy Loss", exp: "\\mathcal{L}_{\\text{BCE}} = -\\frac{1}{n} \\sum_{i=1}^n \\left[ y_i \\ln(\\hat{p}_i) + (1 - y_i) \\ln(1 - \\hat{p}_i) \\right]" },
      { name: "Huber Robust Regression Loss", exp: "L_\\delta(y, \\hat{y}) = \\begin{cases} \\frac{1}{2}(y - \\hat{y})^2 & \\text{for } |y - \\hat{y}| \\le \\delta \\\\ \\delta \\left( |y - \\hat{y}| - \\frac{1}{2}\\delta \\right) & \\text{otherwise} \\end{cases}" }
    ],
    pros: ["Gives clear probabilistic and geometric justification for model training."],
    cons: ["Incorrect pairings (e.g. MSE with Softmax) create flat gradient plateaus and slow convergence."],
    useCases: ["Classification, regression, metric learning, contrastive representation learning."],
    codeSnippet: `# PyTorch BCE and Huber Loss
import torch
import torch.nn as nn

bce = nn.BCELoss()
huber = nn.HuberLoss(delta=1.0)

pred = torch.tensor([0.9, 0.2, 0.8], requires_grad=True)
target = torch.tensor([1.0, 0.0, 1.0])
loss = bce(pred, target)
print("BCE Loss:", loss.item())`
  },

  // =========================================================================
  // Section 3: Mathematics for AI / ML
  // =========================================================================
  {
    id: "linear-algebra-matrices",
    title: "Linear Algebra: Matrices & Vector Norms",
    section: "Mathematics",
    category: "Linear Algebra",
    summary: "The mathematical language of multidimensional transformations, datasets, and neural network weight tensors.",
    definition: "Vectors represent points or directions in vector space; matrices represent linear mappings between spaces. Norms quantify the magnitude of vectors, forming the basis for loss metrics and regularization penalties.",
    problemSolved: "Representing high-dimensional data, network transformations, and measuring geometric distances.",
    howItWorks: [
      "1. Vector Dot Product: $\\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^n u_i v_i = \\|\\mathbf{u}\\| \\, \\|\\mathbf{v}\\| \\cos(\\theta)$. Measures alignment and projection.",
      "2. Matrix Multiplication: $(\\mathbf{AB})_{ij} = \\sum_{k=1}^m A_{ik} B_{kj}$. Represents sequential composition of linear spatial transformations.",
      "3. L1 Norm (Manhattan): $\\|\\mathbf{x}\\|_1 = \\sum_{i=1}^n |x_i|$. Induces sparsity in parameters (Lasso regularization).",
      "4. L2 Norm (Euclidean): $\\|\\mathbf{x}\\|_2 = \\sqrt{\\sum_{i=1}^n x_i^2}$. Penalizes extreme weights smoothly (Ridge / Weight Decay).",
      "5. Frobenius Matrix Norm: $\\|\\mathbf{A}\\|_F = \\sqrt{\\sum_{i=1}^m \\sum_{j=1}^n A_{ij}^2}$. Matrix equivalent of Euclidean geometric length."
    ],
    formulas: [
      { name: "Vector Dot Product (Inner Product)", exp: "\\mathbf{u}\\cdot\\mathbf{v} = \\sum_{i=1}^{n}u_i v_i = \\|\\mathbf{u}\\|\,\\|\\mathbf{v}\\|\\cos(\\theta)" },
      { name: "Matrix Multiplication", exp: "(\\mathbf{AB})_{ij} = \\sum_{k=1}^m A_{ik} B_{kj}" },
      { name: "L1 Vector Norm (Manhattan)", exp: "\\|\\mathbf{x}\\|_1 = \\sum_{i=1}^n |x_i|" },
      { name: "L2 Vector Norm (Euclidean Length)", exp: "\\|\\mathbf{x}\\|_2 = \\sqrt{\\sum_{i=1}^n x_i^2}" },
      { name: "Frobenius Matrix Norm", exp: "\\|\\mathbf{A}\\|_F = \\sqrt{\\sum_{i=1}^m \\sum_{j=1}^n A_{ij}^2}" }
    ],
    pros: ["Allows vectorized operations executed at hardware speeds on GPU Tensor Cores."],
    cons: ["Curse of dimensionality: high-dimensional vector spaces become exponentially sparse."],
    useCases: ["Embedding spaces, layer forward-pass matrix multiplication, distance computations."],
    codeSnippet: `# NumPy Linear Algebra & Norms
import numpy as np

u = np.array([3.0, 4.0])
v = np.array([1.0, 2.0])

dot = np.dot(u, v)                # 3*1 + 4*2 = 11
l1_norm = np.linalg.norm(u, ord=1) # 3 + 4 = 7.0
l2_norm = np.linalg.norm(u, ord=2) # sqrt(9+16) = 5.0`
  },
  {
    id: "multivariate-calculus-gradients",
    title: "Multivariate Calculus: Gradients & Jacobians",
    section: "Mathematics",
    category: "Calculus",
    summary: "The calculus of functions of several variables, directional derivatives, gradient vectors, and optimization landscapes.",
    definition: "The gradient vector $\\nabla f(\\mathbf{x}) = \\left[ \\frac{\\partial f}{\\partial x_1}, \\dots, \\frac{\\partial f}{\\partial x_n} \\right]^T$ points in the direction of steepest ascent. The Jacobian matrix $J$ collects all first-order partial derivatives of a vector-valued function.",
    problemSolved: "Guiding numerical optimization algorithms to iteratively descend complex high-dimensional loss surfaces.",
    howItWorks: [
      "1. Partial Derivative: Rate of change of $f$ with respect to one variable while holding all others constant: $\\frac{\\partial f}{\\partial x_i}$.",
      "2. Gradient Vector: Points toward steepest increase; gradient descent steps in opposite direction: $-\\eta \\nabla f(\\mathbf{x})$.",
      "3. Chain Rule: Derivative of composed functions: $\\frac{\\partial z}{\\partial x} = \\frac{\\partial z}{\\partial y} \\frac{\\partial y}{\\partial x}$.",
      "4. Jacobian Matrix: For $\\mathbf{f}: \\mathbb{R}^n \\to \\mathbb{R}^m$, $J_{ij} = \\frac{\\partial f_i}{\\partial x_j}$.",
      "5. Hessian Matrix: Matrix of second-order partial derivatives $H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}$ describing local curvature."
    ],
    formulas: [
      { name: "Gradient Vector Definition", exp: "\\nabla f(\\mathbf{x}) = \\left[ \\frac{\\partial f}{\\partial x_1}, \\frac{\\partial f}{\\partial x_2}, \\dots, \\frac{\\partial f}{\\partial x_n} \\right]^T" },
      { name: "Multivariate Chain Rule", exp: "\\frac{\\partial f}{\\partial t} = \\sum_{i=1}^n \\frac{\\partial f}{\\partial x_i} \\frac{\\partial x_i}{\\partial t} = \\nabla f(\\mathbf{x})^T \\frac{d\\mathbf{x}}{dt}" },
      { name: "Hessian Curvature Matrix", exp: "H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}" }
    ],
    pros: ["Provides local linear and quadratic approximations of arbitrary continuous functions."],
    cons: ["Computing the exact Hessian requires $O(n^2)$ memory and $O(n^3)$ inversion time."],
    useCases: ["Gradient descent, backpropagation, Newton-Raphson methods, sensitivity analysis."],
    codeSnippet: `# PyTorch Vector-Jacobian Product (VJP)
import torch

x = torch.tensor([2.0, 3.0], requires_grad=True)
y = x[0]**2 + 3*x[1]**3
y.backward()
print("Gradient Vector dy/dx:", x.grad) # [2*x0, 9*x1^2] = [4.0, 81.0]`
  },
  {
    id: "probability-distributions",
    title: "Probability, Entropy & Information Theory",
    section: "Mathematics",
    category: "Probability",
    summary: "Probabilistic modeling, uncertainty quantification, Bayes rule, and information-theoretic divergence metrics.",
    definition: "Probability provides the formal mathematical calculus for reasoning under uncertainty. Information theory measures information content in probability distributions via Shannon entropy $H(P)$ and relative entropy $D_{\\text{KL}}(P \\parallel Q)$.",
    problemSolved: "Modeling noisy real-world data, generative modeling, and measuring divergence between data and predictions.",
    howItWorks: [
      "1. Bayes Theorem: Inverts conditional probabilities: $P(A|B) = \\frac{P(B|A) P(A)}{P(B)}$.",
      "2. Normal (Gaussian) Distribution: $\\mathcal{N}(x; \\mu, \\sigma^2) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x - \\mu}{\\sigma}\\right)^2}$.",
      "3. Shannon Entropy: Measures expected surprise: $H(X) = -\\sum P(x) \\log_2 P(x)$.",
      "4. Cross-Entropy: Measures coding cost of $P$ using $Q$: $H(P, Q) = -\\sum P(x) \\log Q(x)$.",
      "5. KL Divergence: Excess bits when using $Q$ to encode $P$: $D_{\\text{KL}}(P \\parallel Q) = \\sum P(x) \\ln\\frac{P(x)}{Q(x)}$."
    ],
    formulas: [
      { name: "Univariate Gaussian Density Function", exp: "f(x; \\mu, \\sigma) = \\frac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\left( -\\frac{(x - \\mu)^2}{2\\sigma^2} \\right)" },
      { name: "Shannon Entropy (Information Content)", exp: "H(X) = -\\sum_{x \\in \\mathcal{X}} P(x) \\log_2 P(x)" },
      { name: "Kullback-Leibler (KL) Divergence", exp: "D_{\\text{KL}}(P \\parallel Q) = \\sum_{x} P(x) \\ln\\left( \\frac{P(x)}{Q(x)} \\right)" }
    ],
    pros: ["Foundation for Variational Autoencoders (VAEs), Maximum Likelihood Estimation, and Softmax classification."],
    cons: ["Empirical estimation of continuous KL divergence requires sample approximations or Monte Carlo integration."],
    useCases: ["VAEs, Diffusion Models, Naive Bayes classifiers, Reinforcement Learning policy optimization."],
    codeSnippet: `# Scipy Normal Distribution & Entropy
import numpy as np
from scipy.stats import norm, entropy

p = np.array([0.4, 0.6])
q = np.array([0.5, 0.5])
kl_div = entropy(p, q) # KL Divergence D_KL(P || Q)
print("KL Divergence:", kl_div)`
  }
];
