/**
 * MLForge Formula Library Data
 * Rich mathematical catalog with symbol definitions, worked examples, pitfalls, and calculator links.
 * All LaTeX formulas are validated for precision KaTeX rendering across inline and display modes.
 */

window.MLForge = window.MLForge || {};
window.MLForge.data = window.MLForge.data || {};

MLForge.data.formulas = [
  {
    id: "vector-dot-product",
    name: "Vector Dot Product & Euclidean Norm",
    category: "Mathematics",
    tags: ["Linear Algebra", "Geometry", "Vectors"],
    expression: "u · v = Σ uᵢ vᵢ = ||u|| ||v|| cos(θ)",
    latex: "\\mathbf{u}\\cdot\\mathbf{v} = \\sum_{i=1}^{n}u_i v_i = \\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|\\cos(\\theta)",
    symbols: [
      { key: "\\mathbf{u}, \\mathbf{v}", desc: "Real-valued coordinate vectors in n-dimensional Euclidean space" },
      { key: "u_i, v_i", desc: "Component scalars at dimension index i" },
      { key: "\\|\\mathbf{u}\\|", desc: "Euclidean L2 norm (magnitude) of vector u: \\(\\sqrt{\\sum u_i^2}\\)" },
      { key: "\\cos(\\theta)", desc: "Cosine of angle between vector directions" },
      { key: "\\theta", desc: "Subtended angular separation between the vectors" }
    ],
    whenToUse: "Fundamental operation for vector projections, measuring directional similarity, computing artificial neuron activations, and attention matrices in Transformers.",
    example: "For u = [1, 2] and v = [3, 4]: u · v = (1×3) + (2×4) = 3 + 8 = 11. ||u|| = √5 ≈ 2.236, ||v|| = 5.0. cos(θ) = 11 / (5√5) ≈ 0.9839 (nearly aligned).",
    pitfalls: "Vectors must have identical dimensional length. If vectors are orthogonal (perpendicular), their dot product is strictly zero.",
    calculatorId: "cosine-calc"
  },
  {
    id: "linear-regression",
    name: "Linear Regression (Ordinary Least Squares)",
    category: "Machine Learning",
    tags: ["Regression", "Supervised", "OLS"],
    expression: "ŷ = wx + b",
    latex: "\\hat{y} = w x + b \\quad \\text{where } w = \\frac{\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum_{i=1}^n (x_i - \\bar{x})^2}",
    symbols: [
      { key: "\\hat{y}", desc: "Predicted target value" },
      { key: "w", desc: "Weight (slope coefficient)" },
      { key: "x", desc: "Input feature scalar or vector" },
      { key: "b", desc: "Bias (y-intercept offset)" },
      { key: "\\bar{x}, \\bar{y}", desc: "Sample arithmetic means of inputs and targets" }
    ],
    whenToUse: "Modeling linear relationships between one or more continuous input variables and a continuous numeric target.",
    example: "If x = 4, w = 2.5, and b = 1.0, then ŷ = (2.5 × 4) + 1.0 = 11.0.",
    pitfalls: "Extremely sensitive to outliers; assumes homoscedasticity (constant variance of errors) and independent observations.",
    calculatorId: "linear-regression-calc"
  },
  {
    id: "neuron-output",
    name: "Neuron Weighted Sum & Activation",
    category: "Deep Learning",
    tags: ["Neural Networks", "Forward Pass"],
    expression: "z = Σ(wᵢ · xᵢ) + b ,  a = σ(z)",
    latex: "z = \\sum_{i=1}^n w_i x_i + b, \\quad a = f(z)",
    symbols: [
      { key: "x_i", desc: "Input signals incoming from the previous layer" },
      { key: "w_i", desc: "Synaptic connection weights" },
      { key: "b", desc: "Neuron bias offset parameter" },
      { key: "z", desc: "Linear combination (pre-activation potential)" },
      { key: "a", desc: "Activated output after applying non-linear function f" }
    ],
    whenToUse: "The fundamental computational atom of Artificial Neural Networks during the forward inference pass.",
    example: "Inputs [2, 3], weights [0.5, -1.0], bias 1.5. z = (2×0.5) + (3×-1.0) + 1.5 = 1 - 3 + 1.5 = -0.5. With ReLU, a = max(0, -0.5) = 0.",
    pitfalls: "Omitting the bias term restricts hyperplanes to pass strictly through the coordinate origin, severely limiting expressive power.",
    calculatorId: "neuron-calc"
  },
  {
    id: "sigmoid",
    name: "Sigmoid (Logistic) Function",
    category: "Deep Learning",
    tags: ["Activation", "Binary Classification"],
    expression: "σ(z) = 1 / (1 + e⁻ᶻ)",
    latex: "\\sigma(z) = \\frac{1}{1 + e^{-z}}, \\quad \\sigma'(z) = \\sigma(z)(1 - \\sigma(z))",
    symbols: [
      { key: "z", desc: "Real-valued input logit scalar" },
      { key: "e", desc: "Euler's constant base (~2.71828)" },
      { key: "\\sigma(z)", desc: "Activated output bounded strictly in (0, 1)" },
      { key: "\\sigma'(z)", desc: "Analytical derivative with respect to z" }
    ],
    whenToUse: "Output layer of binary classification tasks to produce a calibrated Bernoulli probability.",
    example: "For z = 0, σ(0) = 1 / (1 + e⁰) = 1 / 2 = 0.5. For z = 2, σ(2) ≈ 0.8808.",
    pitfalls: "Suffers from vanishing gradients in deep networks because σ'(z) maxes out at 0.25 and approaches 0 for |z| > 4.",
    calculatorId: "activation-calc"
  },
  {
    id: "relu",
    name: "Rectified Linear Unit (ReLU)",
    category: "Deep Learning",
    tags: ["Activation", "Hidden Layers"],
    expression: "ReLU(z) = max(0, z)",
    latex: "\\text{ReLU}(z) = \\max(0, z), \\quad \\frac{d}{dz}\\text{ReLU}(z) = \\begin{cases} 1 & z > 0 \\\\ 0 & z \\le 0 \\end{cases}",
    symbols: [
      { key: "z", desc: "Pre-activation input scalar" },
      { key: "\\text{ReLU}(z)", desc: "Thresholded activation output" }
    ],
    whenToUse: "Default activation function for hidden layers in modern deep feedforward and convolutional neural networks.",
    example: "For z = 3.5, ReLU(3.5) = 3.5. For z = -4.2, ReLU(-4.2) = 0.",
    pitfalls: "'Dying ReLU' problem when large negative gradients push weights such that a neuron permanently outputs 0 for all training inputs.",
    calculatorId: "activation-calc"
  },
  {
    id: "softmax",
    name: "Softmax Probability Distribution",
    category: "Deep Learning",
    tags: ["Activation", "Multiclass Classification"],
    expression: "Softmax(zᵢ) = eᶻⁱ / Σⱼ eᶻʲ",
    latex: "\\text{Softmax}(z_i) = \\frac{e^{z_i - \\max(\\mathbf{z})}}{\\sum_{j=1}^K e^{z_j - \\max(\\mathbf{z})}}",
    symbols: [
      { key: "z_i", desc: "Logit (raw score) for class i" },
      { key: "K", desc: "Total number of mutually exclusive classes" },
      { key: "\\max(\\mathbf{z})", desc: "Maximum logit subtracted for numerical overflow stability" },
      { key: "\\text{Softmax}(z_i)", desc: "Probability of class i (summing across K to exactly 1.0)" }
    ],
    whenToUse: "Final layer in multiclass classification and attention matrix normalization in Transformers.",
    example: "Logits [1, 2, 3]. Exponentials: e¹≈2.718, e²≈7.389, e³≈20.086. Sum = 30.193. Probabilities: [0.090, 0.245, 0.665].",
    pitfalls: "Direct exponentiation of large logits causes numerical overflow. Always subtract max(z) before exponentiating.",
    calculatorId: "activation-calc"
  },
  {
    id: "mse",
    name: "Mean Squared Error (MSE)",
    category: "Machine Learning",
    tags: ["Loss Function", "Regression"],
    expression: "MSE = (1/n) Σ(yᵢ − ŷᵢ)²",
    latex: "\\text{MSE} = \\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2",
    symbols: [
      { key: "n", desc: "Total number of evaluation samples" },
      { key: "y_i", desc: "Actual target ground-truth value" },
      { key: "\\hat{y}_i", desc: "Model predicted output value" }
    ],
    whenToUse: "Default loss function for regression tasks when large errors should be heavily penalized.",
    example: "Actuals [3, -0.5, 2, 7], predictions [2.5, 0.0, 2, 8]. Residuals: [0.5, -0.5, 0, -1]. Squared: [0.25, 0.25, 0, 1.0]. MSE = 1.5 / 4 = 0.375.",
    pitfalls: "Heavily influenced by extreme outliers due to quadratic squaring; units are squared relative to the target.",
    calculatorId: "loss-calc"
  },
  {
    id: "binary-cross-entropy",
    name: "Binary Cross-Entropy Loss (Log Loss)",
    category: "Deep Learning",
    tags: ["Loss Function", "Classification"],
    expression: "BCE = −(1/n) Σ [yᵢ log(pᵢ) + (1 − yᵢ) log(1 − pᵢ)]",
    latex: "\\mathcal{L}_{\\text{BCE}} = -\\frac{1}{n} \\sum_{i=1}^n \\left[ y_i \\ln(p_i + \\epsilon) + (1 - y_i) \\ln(1 - p_i + \\epsilon) \\right]",
    symbols: [
      { key: "y_i", desc: "Binary true label (0 or 1)" },
      { key: "p_i", desc: "Predicted probability P(Y=1|X)" },
      { key: "\\epsilon", desc: "Small epsilon (e.g. 1e-15) to prevent catastrophic log(0)" }
    ],
    whenToUse: "Training models with Sigmoid output for binary classification or multi-label classification.",
    example: "If y = 1 and p = 0.9: loss = -ln(0.9) ≈ 0.105. If y = 1 and p = 0.1: loss = -ln(0.1) ≈ 2.303 (severe penalty).",
    pitfalls: "Evaluating log(0) produces -Infinity. Predictions must be clipped to [eps, 1 - eps].",
    calculatorId: "loss-calc"
  },
  {
    id: "categorical-cross-entropy",
    name: "Categorical Cross-Entropy Loss",
    category: "Deep Learning",
    tags: ["Loss Function", "Multiclass Classification"],
    expression: "CCE = - (1/n) Σ_i Σ_c y_{ic} log(p_{ic})",
    latex: "\\mathcal{L}_{\\text{CCE}} = -\\frac{1}{n} \\sum_{i=1}^n \\sum_{c=1}^C y_{ic} \\ln(p_{ic} + \\epsilon)",
    symbols: [
      { key: "n", desc: "Batch size (number of observations)" },
      { key: "C", desc: "Total number of mutually exclusive classes" },
      { key: "y_{ic}", desc: "Binary ground-truth indicator (1 if class c is correct label for sample i, 0 otherwise)" },
      { key: "p_{ic}", desc: "Model predicted probability for sample i belonging to class c (softmax output)" }
    ],
    whenToUse: "Standard loss objective for multi-class classification neural networks (e.g. ImageNet, token classification).",
    example: "For true class index 2 with predicted probabilities [0.1, 0.7, 0.2]: Loss = -ln(0.7) ≈ 0.3567. If predicted probability was 0.05: Loss = -ln(0.05) ≈ 2.996.",
    pitfalls: "Evaluating ln(0) leads to -Infinity; logits should be stabilized with log-softmax or numerical clipping.",
    calculatorId: "loss-calc"
  },
  {
    id: "gradient-descent",
    name: "Gradient Descent Parameter Update Rule",
    category: "Optimization",
    tags: ["Calculus", "Optimization"],
    expression: "θ_new = θ_old − η · ∇J(θ)",
    latex: "\\theta_{t+1} = \\theta_t - \\eta \\nabla J(\\theta_t)",
    symbols: [
      { key: "\\theta_t", desc: "Model parameters (weights & biases) at iteration step t" },
      { key: "\\eta", desc: "Learning rate step size hyperparameter (eta)" },
      { key: "\\nabla J(\\theta_t)", desc: "Gradient vector of the loss function J with respect to parameter vector \\(\\theta\\)" }
    ],
    whenToUse: "Iterative parameter optimization across nearly all deep learning and machine learning algorithms.",
    example: "If current weight θ = 3.0, gradient = 4.0, and learning rate η = 0.1: θ_new = 3.0 - (0.1 × 4.0) = 2.6.",
    pitfalls: "Too high learning rate causes divergence / oscillation; too low causes agonizingly slow convergence.",
    calculatorId: "gradient-descent-calc"
  },
  {
    id: "adam-optimizer",
    name: "Adam Optimizer (Adaptive Moment Estimation)",
    category: "Optimization",
    tags: ["Calculus", "Optimization", "Adaptive LR"],
    expression: "θ_t = θ_{t-1} - η · m̂_t / (√(v̂_t) + ε)",
    latex: "\\begin{aligned} m_t &= \\beta_1 m_{t-1} + (1 - \\beta_1) g_t, \\quad v_t = \\beta_2 v_{t-1} + (1 - \\beta_2) g_t^2 \\\\[4pt] \\hat{m}_t &= \\frac{m_t}{1 - \\beta_1^t}, \\quad \\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t} \\\\[4pt] \\theta_t &= \\theta_{t-1} - \\eta \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\epsilon} \\end{aligned}",
    symbols: [
      { key: "g_t", desc: "Gradient of loss function at step t: \\(\\nabla J(\\theta)\\)" },
      { key: "m_t, v_t", desc: "Exponentially decaying 1st (mean) and 2nd (uncentered variance) moment vectors" },
      { key: "\\hat{m}_t, \\hat{v}_t", desc: "Bias-corrected moments correcting initialization towards zero" },
      { key: "\\beta_1, \\beta_2", desc: "Decay rates for moments (typically 0.9 and 0.999)" },
      { key: "\\eta", desc: "Step size learning rate" },
      { key: "\\epsilon", desc: "Small smoothing constant (typically 1e-8) preventing division by zero" }
    ],
    whenToUse: "General-purpose optimizer for deep neural networks, especially when gradients are noisy, non-stationary, or sparse.",
    example: "When variance v_t is large (frequently changing gradient), the effective step size is damped; when small, step size is amplified.",
    pitfalls: "Weight decay in original Adam is coupled to gradient updates; use AdamW for proper L2 weight decay regularization.",
    calculatorId: "gradient-descent-calc"
  },
  {
    id: "f1-score",
    name: "F1-Score (Harmonic Mean)",
    category: "Machine Learning",
    tags: ["Metrics", "Classification"],
    expression: "F1 = 2 × (Precision × Recall) / (Precision + Recall)",
    latex: "F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2 \\text{TP}}{2 \\text{TP} + \\text{FP} + \\text{FN}}",
    symbols: [
      { key: "\\text{TP}", desc: "True Positives (correctly identified positive class)" },
      { key: "\\text{FP}", desc: "False Positives (Type I error)" },
      { key: "\\text{FN}", desc: "False Negatives (Type II error)" }
    ],
    whenToUse: "Evaluating classification models on imbalanced datasets where accuracy gives a misleadingly optimistic score.",
    example: "Precision = 0.8, Recall = 0.6. F1 = 2 × (0.8 × 0.6) / (0.8 + 0.6) = 0.96 / 1.4 ≈ 0.6857.",
    pitfalls: "Treats precision and recall with equal weight. For medical diagnosis where FN is lethal, use F2 or direct recall.",
    calculatorId: "classification-metrics-calc"
  },
  {
    id: "bayes-theorem",
    name: "Bayes' Theorem",
    category: "Mathematics",
    tags: ["Probability", "Statistics", "Inference"],
    expression: "P(A|B) = [P(B|A) · P(A)] / P(B)",
    latex: "P(A|B) = \\frac{P(B|A) P(A)}{P(B)} = \\frac{P(B|A) P(A)}{P(B|A)P(A) + P(B|\\neg A)P(\\neg A)}",
    symbols: [
      { key: "P(A|B)", desc: "Posterior probability of hypothesis A given observation of evidence B" },
      { key: "P(B|A)", desc: "Likelihood of evidence B given that hypothesis A holds true" },
      { key: "P(A)", desc: "Prior probability of hypothesis A before observing evidence" },
      { key: "P(B)", desc: "Total marginal probability of evidence B across all states" }
    ],
    whenToUse: "Probabilistic inference, Naive Bayes classifiers, updating belief states with new evidence.",
    example: "Disease prevalence P(D) = 0.01. Test sensitivity P(+|D) = 0.95. False alarm P(+|not D) = 0.05. P(D|+) = (0.95 × 0.01) / [(0.95×0.01) + (0.05×0.99)] = 0.0095 / 0.059 ≈ 16.1%.",
    pitfalls: "Base rate fallacy: ignoring the prior P(A) leads people to drastically overestimate posterior probability.",
    calculatorId: "bayes-calc"
  },
  {
    id: "standardization-zscore",
    name: "Z-Score Standardization",
    category: "Machine Learning",
    tags: ["Preprocessing", "Feature Scaling"],
    expression: "z = (x − μ) / σ",
    latex: "z = \\frac{x - \\mu}{\\sigma}",
    symbols: [
      { key: "x", desc: "Original continuous feature value" },
      { key: "\\mu", desc: "Mean of the feature distribution across training population" },
      { key: "\\sigma", desc: "Standard deviation of the feature" },
      { key: "z", desc: "Standardized transformed score (zero mean, unit variance)" }
    ],
    whenToUse: "Distance-based algorithms (KNN, SVM, K-Means) and gradient descent algorithms sensitive to feature scales.",
    example: "If mean μ = 50 and std σ = 10, then value x = 65 standardizes to z = (65 - 50) / 10 = 1.5.",
    pitfalls: "Standardization parameters (mean and std) must be computed ONLY on training data to avoid data leakage.",
    calculatorId: "standardization-calc"
  },
  {
    id: "cosine-similarity",
    name: "Cosine Similarity & Angular Metric",
    category: "Mathematics",
    tags: ["Linear Algebra", "NLP", "Embeddings"],
    expression: "cos(θ) = (A · B) / (||A|| · ||B||)",
    latex: "\\text{similarity}(\\mathbf{A}, \\mathbf{B}) = \\frac{\\mathbf{A} \\cdot \\mathbf{B}}{\\|\\mathbf{A}\\|\\,\\|\\mathbf{B}\\|} = \\frac{\\sum_{i=1}^n A_i B_i}{\\sqrt{\\sum_{i=1}^n A_i^2} \\cdot \\sqrt{\\sum_{i=1}^n B_i^2}}",
    symbols: [
      { key: "\\mathbf{A}, \\mathbf{B}", desc: "Real-valued dense feature vectors (e.g. text/image embeddings)" },
      { key: "\\mathbf{A} \\cdot \\mathbf{B}", desc: "Inner dot product summation" },
      { key: "\\|\\mathbf{A}\\|", desc: "Euclidean L2 length norm of vector A" },
      { key: "\\cos(\\theta)", desc: "Similarity score bounded in [-1, 1], with 1.0 indicating parallel alignment" }
    ],
    whenToUse: "Measuring semantic similarity between high-dimensional vector embeddings in NLP, search, and RAG pipelines.",
    example: "A = [1, 2], B = [2, 4]. Dot product = 2 + 8 = 10. ||A|| = √5, ||B|| = √20. Cosine = 10 / (√100) = 1.0 (parallel).",
    pitfalls: "Measures orientation, NOT magnitude. Two vectors pointing the same way have similarity 1.0 regardless of length.",
    calculatorId: "cosine-calc"
  },
  {
    id: "conv-output-shape",
    name: "CNN 2D Convolution Output Dimension",
    category: "Deep Learning",
    tags: ["CNN", "Tensor Shapes"],
    expression: "O = ⌊(W − K + 2P) / S⌋ + 1",
    latex: "W_{\\text{out}} = \\left\\lfloor \\frac{W_{\\text{in}} - K + 2P}{S} \\right\\rfloor + 1",
    symbols: [
      { key: "W_{\\text{in}}", desc: "Input spatial dimension (width or height in pixels)" },
      { key: "K", desc: "Kernel / filter spatial dimension" },
      { key: "P", desc: "Zero-padding added to each border" },
      { key: "S", desc: "Stride step size across the receptive field" },
      { key: "W_{\\text{out}}", desc: "Output spatial dimension" }
    ],
    whenToUse: "Designing CNN architectures to calculate layer output shapes and prevent dimensionality mismatch bugs.",
    example: "Input 32x32, Kernel 3x3, Padding 1, Stride 1. Output = ⌊(32 - 3 + 2(1))/1⌋ + 1 = 32. Same spatial size!",
    pitfalls: "Non-integer division means the stride does not fit evenly unless the floor function is accounted for.",
    calculatorId: "tensor-shape-calc"
  },
  {
    id: "transformer-attention",
    name: "Transformer Scaled Dot-Product Attention",
    category: "Deep Learning",
    tags: ["Transformers", "Attention", "LLM"],
    expression: "Attention(Q, K, V) = softmax(QK^T / √d_k) · V",
    latex: "\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{Q K^T}{\\sqrt{d_k}} \\right) V",
    symbols: [
      { key: "Q", desc: "Query matrix representing active sequence tokens \\([N \\times d_k]\\)" },
      { key: "K", desc: "Key matrix for associative retrieval \\([M \\times d_k]\\)" },
      { key: "V", desc: "Value matrix containing context representations \\([M \\times d_v]\\)" },
      { key: "d_k", desc: "Key projection dimensionality (scaling divisor)" },
      { key: "\\sqrt{d_k}", desc: "Prevents inner dot products from pushing softmax into saturation" }
    ],
    whenToUse: "Core attention mechanism in Transformer decoders, encoders, LLMs (GPT, LLaMA, Claude), and Vision Transformers (ViT).",
    example: "For d_k = 64, √d_k = 8. Dividing raw logits by 8 keeps exponential values stable and prevents vanishing gradients.",
    pitfalls: "Standard attention exhibits quadratic O(N²) computational and memory complexity with respect to sequence length N.",
    calculatorId: "cosine-calc"
  },
  {
    id: "lstm-gates",
    name: "Long Short-Term Memory (LSTM) Cell Equations",
    category: "Deep Learning",
    tags: ["RNN", "Sequence Models", "Gating"],
    expression: "f_t = σ(W_f x_t + U_f h_{t-1} + b_f)",
    latex: "\\begin{aligned} f_t &= \\sigma(W_f x_t + U_f h_{t-1} + b_f) \\\\ i_t &= \\sigma(W_i x_t + U_i h_{t-1} + b_i) \\\\ \\tilde{C}_t &= \\tanh(W_c x_t + U_c h_{t-1} + b_c) \\\\ C_t &= f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t \\\\ o_t &= \\sigma(W_o x_t + U_o h_{t-1} + b_o) \\\\ h_t &= o_t \\odot \\tanh(C_t) \\end{aligned}",
    symbols: [
      { key: "f_t", desc: "Forget gate activation (controls what history to discard)" },
      { key: "i_t", desc: "Input gate activation (controls which candidate updates to store)" },
      { key: "\\tilde{C}_t", desc: "Candidate cell state generated from current input" },
      { key: "C_t", desc: "Internal cell state memory (constant error carousel)" },
      { key: "o_t", desc: "Output gate controlling memory emission" },
      { key: "h_t", desc: "Hidden state vector passed to next timestep" },
      { key: "\\odot", desc: "Hadamard (element-wise) vector product" }
    ],
    whenToUse: "Processing sequential data, time series, NLP token sequences, and speech audio where vanishing gradients hinder standard RNNs.",
    example: "If forget gate f_t ≈ 0, the cell completely flushes past memory C_{t-1}; if f_t ≈ 1, memory passes through unattenuated.",
    pitfalls: "Sequential dependency across timesteps prevents parallelization during training, unlike Transformer architectures.",
    calculatorId: "neuron-calc"
  },
  {
    id: "dense-parameter-count",
    name: "Dense (Linear) Layer Parameter Count",
    category: "Deep Learning",
    tags: ["Parameters", "Model Capacity"],
    expression: "Params = (N_in × N_out) + N_out",
    latex: "\\text{Params} = (N_{\\text{in}} \\times N_{\\text{out}}) + N_{\\text{out}}",
    symbols: [
      { key: "N_{\\text{in}}", desc: "Number of input neurons or incoming feature dimension" },
      { key: "N_{\\text{out}}", desc: "Number of output projection neurons" },
      { key: "N_{\\text{out}} \\text{ (bias)}", desc: "One trainable bias scalar per output neuron" }
    ],
    whenToUse: "Estimating model size, parameter capacity, and VRAM footprint for fully connected layers.",
    example: "Input 512, output 256. Weights: 512 × 256 = 131,072. Biases: 256. Total parameters = 131,328.",
    pitfalls: "If `bias=False` is set in the layer, the + N_out term is omitted.",
    calculatorId: "param-count-calc"
  },
  {
    id: "shannon-entropy",
    name: "Shannon Entropy & Information Gain",
    category: "Machine Learning",
    tags: ["Decision Trees", "Information Theory"],
    expression: "H(S) = − Σ pᵢ · log₂(pᵢ)",
    latex: "H(S) = -\\sum_{i=1}^C p_i \\log_2(p_i), \\quad IG(S, A) = H(S) - \\sum_{v \\in \\text{Values}(A)} \\frac{|S_v|}{|S|} H(S_v)",
    symbols: [
      { key: "C", desc: "Number of distinct outcome classes" },
      { key: "p_i", desc: "Proportion of training samples in class i" },
      { key: "H(S)", desc: "Impurity / uncertainty of sample partition S (measured in bits)" },
      { key: "IG(S, A)", desc: "Reduction in entropy achieved by partitioning on attribute A" }
    ],
    whenToUse: "Splitting criterion in Decision Trees (ID3, C4.5) to pick the most informative feature.",
    example: "Binary split with equal classes (p1 = 0.5, p2 = 0.5): H(S) = - (0.5 log₂ 0.5 + 0.5 log₂ 0.5) = 1.0 bit (maximum uncertainty).",
    pitfalls: "Information gain is biased towards features with many distinct values (e.g. ID numbers). Use Gain Ratio instead.",
    calculatorId: "entropy-calc"
  },
  {
    id: "huber-loss",
    name: "Huber Loss (Smooth L1 / Robust Regression)",
    category: "Machine Learning",
    tags: ["Loss Function", "Regression", "Robust"],
    expression: "L_δ(a) = 0.5 a² if |a| ≤ δ else δ(|a| - 0.5 δ)",
    latex: "L_\\delta(y, \\hat{y}) = \\begin{cases} \\frac{1}{2}(y - \\hat{y})^2 & \\text{for } |y - \\hat{y}| \\le \\delta \\\\[6pt] \\delta \\left( |y - \\hat{y}| - \\frac{1}{2}\\delta \\right) & \\text{otherwise} \\end{cases}",
    symbols: [
      { key: "y, \\hat{y}", desc: "Ground-truth target and model prediction" },
      { key: "|y - \\hat{y}|", desc: "Absolute residual error" },
      { key: "\\delta", desc: "Threshold parameter transitioning between quadratic MSE and linear MAE" }
    ],
    whenToUse: "Regression problems where dataset has significant outliers and MSE causes severe gradient disruption.",
    example: "For δ = 1.0: an error of 0.4 yields 0.5×(0.16) = 0.08 (quadratic). An outlier error of 5.0 yields 1.0×(5.0 - 0.5) = 4.5 (linear, not 12.5).",
    pitfalls: "Requires selecting or tuning the threshold parameter δ according to the scale of the target variable.",
    calculatorId: "loss-calc"
  },
  {
    id: "kl-divergence",
    name: "Kullback-Leibler (KL) Divergence",
    category: "Mathematics",
    tags: ["Information Theory", "Probability", "VAE"],
    expression: "D_KL(P || Q) = Σ P(x) log(P(x) / Q(x))",
    latex: "D_{\\text{KL}}(P \\parallel Q) = \\sum_{x \\in \\mathcal{X}} P(x) \\ln\\left( \\frac{P(x)}{Q(x)} \\right)",
    symbols: [
      { key: "P(x)", desc: "True reference probability distribution" },
      { key: "Q(x)", desc: "Approximating model probability distribution" },
      { key: "D_{\\text{KL}}(P \\parallel Q)", desc: "Relative entropy / information lost when Q is used to approximate P" }
    ],
    whenToUse: "Variational Autoencoders (VAEs), policy optimization in Reinforcement Learning (PPO), and knowledge distillation.",
    example: "If P = Q everywhere, D_KL(P || Q) = 0. Always non-negative: D_KL(P || Q) ≥ 0 (Gibbs' inequality).",
    pitfalls: "Asymmetric: D_KL(P || Q) ≠ D_KL(Q || P). It is not a true mathematical distance metric.",
    calculatorId: "entropy-calc"
  }
];
