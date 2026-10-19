/**
 * MLForge Formula Library Data
 * Rich mathematical catalog with symbol definitions, worked examples, pitfalls, and calculator links.
 */

window.MLForge = window.MLForge || {};
window.MLForge.data = window.MLForge.data || {};

MLForge.data.formulas = [
  {
    id: "linear-regression",
    name: "Linear Regression (Ordinary Least Squares)",
    category: "Machine Learning",
    tags: ["Regression", "Supervised", "OLS"],
    expression: "ŷ = wx + b",
    latex: "\\hat{y} = w x + b \\quad \\text{where } w = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum (x_i - \\bar{x})^2}",
    symbols: [
      { key: "ŷ", desc: "Predicted target value" },
      { key: "w", desc: "Weight (slope coefficient)" },
      { key: "x", desc: "Input feature scalar or vector" },
      { key: "b", desc: "Bias (y-intercept)" },
      { key: "\\bar{x}, \\bar{y}", desc: "Sample means of inputs and targets" }
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
      { key: "x_i", desc: "Input signals from previous layer" },
      { key: "w_i", desc: "Synaptic connection weights" },
      { key: "b", desc: "Neuron bias offset" },
      { key: "z", desc: "Linear combination (pre-activation)" },
      { key: "a", desc: "Activated output after non-linear function f" }
    ],
    whenToUse: "The fundamental computational atom of Artificial Neural Networks during the forward pass.",
    example: "Inputs [2, 3], weights [0.5, -1.0], bias 1.5. z = (2×0.5) + (3×-1.0) + 1.5 = 1 - 3 + 1.5 = -0.5. With ReLU, a = max(0, -0.5) = 0.",
    pitfalls: "Omitting the bias term restricts hyperplanes to pass strictly through the coordinate origin, limiting expressive power.",
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
      { key: "z", desc: "Real-valued input scalar" },
      { key: "e", desc: "Euler's constant (~2.71828)" },
      { key: "σ(z)", desc: "Squeezed output bounded in (0, 1)" }
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
      { key: "z", desc: "Pre-activation input" },
      { key: "ReLU(z)", desc: "Thresholded activation output" }
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
    latex: "\\text{Softmax}(z_i) = \\frac{e^{z_i - \\max(z)}}{\\sum_{j=1}^K e^{z_j - \\max(z)}}",
    symbols: [
      { key: "z_i", desc: "Logit (raw score) for class i" },
      { key: "K", desc: "Total number of mutually exclusive classes" },
      { key: "Softmax(z_i)", desc: "Probability of class i (summing to 1.0)" }
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
      { key: "n", desc: "Total number of samples" },
      { key: "y_i", desc: "Actual target ground truth" },
      { key: "ŷ_i", desc: "Model predicted output" }
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
      { key: "ε", desc: "Small epsilon (1e-15) to prevent log(0)" }
    ],
    whenToUse: "Training models with Sigmoid output for binary classification or multi-label classification.",
    example: "If y = 1 and p = 0.9: loss = -ln(0.9) ≈ 0.105. If y = 1 and p = 0.1: loss = -ln(0.1) ≈ 2.303 (severe penalty).",
    pitfalls: "Evaluating log(0) produces -Infinity. Predictions must be clipped to [eps, 1 - eps].",
    calculatorId: "loss-calc"
  },
  {
    id: "gradient-descent",
    name: "Gradient Descent Update Rule",
    category: "Optimization",
    tags: ["Calculus", "Optimization"],
    expression: "θ_new = θ_old − η · ∇J(θ)",
    latex: "\\theta_{t+1} = \\theta_t - \\eta \\nabla J(\\theta_t)",
    symbols: [
      { key: "θ_t", desc: "Model parameters at iteration t" },
      { key: "η", desc: "Learning rate step size (eta)" },
      { key: "∇J(θ)", desc: "Gradient vector of the loss function with respect to θ" }
    ],
    whenToUse: "Iterative parameter optimization across nearly all deep learning and machine learning algorithms.",
    example: "If current weight θ = 3.0, gradient = 4.0, and learning rate η = 0.1: θ_new = 3.0 - (0.1 × 4.0) = 2.6.",
    pitfalls: "Too high learning rate causes divergence / oscillation; too low causes agonizingly slow convergence.",
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
      { key: "TP", desc: "True Positives" },
      { key: "FP", desc: "False Positives" },
      { key: "FN", desc: "False Negatives" }
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
    latex: "P(A|B) = \\frac{P(B|A) P(A)}{P(B|A)P(A) + P(B|\\neg A)P(\\neg A)}",
    symbols: [
      { key: "P(A|B)", desc: "Posterior probability of hypothesis A given evidence B" },
      { key: "P(B|A)", desc: "Likelihood of evidence B assuming hypothesis A is true" },
      { key: "P(A)", desc: "Prior probability of hypothesis A before evidence" },
      { key: "P(B)", desc: "Total marginal probability of evidence B" }
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
      { key: "x", desc: "Original feature value" },
      { key: "μ", desc: "Mean of feature across the training population" },
      { key: "σ", desc: "Standard deviation of feature" },
      { key: "z", desc: "Transformed value (mean=0, std=1)" }
    ],
    whenToUse: "Distance-based algorithms (KNN, SVM, K-Means) and gradient descent algorithms sensitive to feature scales.",
    example: "If mean μ = 50 and std σ = 10, then value x = 65 standardizes to z = (65 - 50) / 10 = 1.5.",
    pitfalls: "Standardization parameters (mean and std) must be computed ONLY on training data to avoid data leakage.",
    calculatorId: "standardization-calc"
  },
  {
    id: "cosine-similarity",
    name: "Cosine Similarity",
    category: "Mathematics",
    tags: ["Linear Algebra", "NLP", "Embeddings"],
    expression: "cos(θ) = (A · B) / (||A|| · ||B||)",
    latex: "\\text{similarity}(A, B) = \\frac{\\sum_{i=1}^n A_i B_i}{\\sqrt{\\sum_{i=1}^n A_i^2} \\cdot \\sqrt{\\sum_{i=1}^n B_i^2}}",
    symbols: [
      { key: "A, B", desc: "Numeric vectors (e.g., text embeddings)" },
      { key: "A · B", desc: "Vector dot product" },
      { key: "||A||", desc: "Euclidean L2 norm of vector A" },
      { key: "cos(θ)", desc: "Similarity score in [-1, 1], with 1 meaning identical direction" }
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
      { key: "W_{in}", desc: "Input spatial dimension (width or height)" },
      { key: "K", desc: "Kernel / filter spatial dimension" },
      { key: "P", desc: "Padding added to each border" },
      { key: "S", desc: "Stride step size" },
      { key: "W_{out}", desc: "Output spatial dimension" }
    ],
    whenToUse: "Designing CNN architectures to calculate layer output shapes and prevent dimensionality mismatch bugs.",
    example: "Input 32x32, Kernel 3x3, Padding 1, Stride 1. Output = ⌊(32 - 3 + 2(1))/1⌋ + 1 = 32. Same spatial size!",
    pitfalls: "Non-integer division means the stride does not fit evenly unless the floor function is accounted for.",
    calculatorId: "tensor-shape-calc"
  },
  {
    id: "dense-parameter-count",
    name: "Dense (Linear) Layer Parameter Count",
    category: "Deep Learning",
    tags: ["Parameters", "Model Capacity"],
    expression: "Params = (N_in × N_out) + N_out",
    latex: "\\text{Params} = (N_{\\text{in}} \\times N_{\\text{out}}) + N_{\\text{out}}",
    symbols: [
      { key: "N_{in}", desc: "Number of input neurons/features" },
      { key: "N_{out}", desc: "Number of output neurons" },
      { key: "N_{out} (bias)", desc: "One bias parameter per output neuron" }
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
      { key: "C", desc: "Number of distinct classes" },
      { key: "p_i", desc: "Proportion of samples in class i" },
      { key: "H(S)", desc: "Impurity / uncertainty of set S (bits)" },
      { key: "IG(S, A)", desc: "Reduction in entropy achieved by splitting on feature A" }
    ],
    whenToUse: "Splitting criterion in Decision Trees (ID3, C4.5) to pick the most informative feature.",
    example: "Binary split with equal classes (p1 = 0.5, p2 = 0.5): H(S) = - (0.5 log₂ 0.5 + 0.5 log₂ 0.5) = 1.0 bit (maximum uncertainty).",
    pitfalls: "Information gain is biased towards features with many distinct values (e.g. ID numbers). Use Gain Ratio instead.",
    calculatorId: "entropy-calc"
  }
];
