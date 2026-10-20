/**
 * MLForge Formula Library Data
 * Mathematical formulas explained in very simple, clear English for beginners and developers.
 * All LaTeX formulas are validated for precision KaTeX rendering.
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
      { key: "\\mathbf{u}, \\mathbf{v}", desc: "Two lists (vectors) of numbers of the same length." },
      { key: "u_i, v_i", desc: "The numbers at position i in each list." },
      { key: "\\|\\mathbf{u}\\|", desc: "The straight-line length of vector u: \\(\\sqrt{\\sum u_i^2}\\)." },
      { key: "\\cos(\\theta)", desc: "The cosine of the angle between the two directions. 1 means same direction; 0 means perpendicular (90 degrees)." },
      { key: "\\theta", desc: "The angle between the two vector arrows." }
    ],
    whenToUse: "Used to measure how much two lists of numbers align or point in the same direction. It is the core operation inside every artificial neuron and every Transformer attention calculation.",
    example: "Suppose u = [1, 2] and v = [3, 4]. Step 1: Multiply pairs: (1 × 3) = 3 and (2 × 4) = 8. Step 2: Add them up: 3 + 8 = 11. The dot product is 11.",
    pitfalls: "Both lists must have the exact same number of items. If two vectors are perpendicular (at a 90-degree right angle), their dot product is always zero.",
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
      { key: "\\hat{y}", desc: "The target number predicted by the model (e.g. predicted house price)." },
      { key: "w", desc: "The weight or slope: how much the prediction changes when input x increases by 1." },
      { key: "x", desc: "The input feature (e.g. house size in square feet)." },
      { key: "b", desc: "The bias (intercept): the baseline prediction when input x is 0." },
      { key: "\\bar{x}, \\bar{y}", desc: "The average (mean) value of all inputs and all correct targets." }
    ],
    whenToUse: "Used to predict a continuous number (like house prices, sales, or temperatures) from one or more input features.",
    example: "Suppose slope w = 2.5, bias b = 1.0, and input x = 4. Calculation: ŷ = (2.5 × 4) + 1.0 = 10.0 + 1.0 = 11.0. The predicted answer is 11.0.",
    pitfalls: "Extreme outliers can pull the straight line far away from the real data. It also assumes the relationship is a straight line, which is not true for curved trends.",
    calculatorId: "linear-regression-calc"
  },
  {
    id: "neuron-output",
    name: "Neuron Weighted Sum & Activation",
    category: "Deep Learning",
    tags: ["Neural Networks", "Forward Pass"],
    expression: "z = Σ(wᵢ · xᵢ) + b ,  a = f(z)",
    latex: "z = \\sum_{i=1}^n w_i x_i + b, \\quad a = f(z)",
    symbols: [
      { key: "x_i", desc: "Incoming input signals from the data or previous layer." },
      { key: "w_i", desc: "Weights: importance factors showing how much each input matters." },
      { key: "b", desc: "Bias: a number added to shift the total sum up or down." },
      { key: "z", desc: "The weighted sum (pre-activation score) before filtering." },
      { key: "a", desc: "The final activated output after applying the activation function f." }
    ],
    whenToUse: "The basic building block calculation in every layer of an artificial neural network during the forward pass.",
    example: "Inputs are [2, 3], weights are [0.5, -1.0], and bias is 1.5. Step 1: Multiply inputs by weights: (2 × 0.5) + (3 × -1.0) = 1.0 − 3.0 = -2.0. Step 2: Add bias: -2.0 + 1.5 = -0.5. Step 3: Apply ReLU: max(0, -0.5) = 0. The output is 0.",
    pitfalls: "If you leave out the bias term b, the model's decision line is forced to pass directly through zero (0, 0), which makes it much harder to fit real data.",
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
      { key: "z", desc: "The input number calculated by the neuron (can be any positive or negative number)." },
      { key: "e", desc: "Euler's constant number, approximately 2.718." },
      { key: "\\sigma(z)", desc: "The squashed output number, always smoothly between 0 and 1." },
      { key: "\\sigma'(z)", desc: "The slope (derivative) of the curve, showing how fast the output changes." }
    ],
    whenToUse: "Used in the final output layer of a binary (yes/no) classification model to turn numbers into clean probabilities between 0% and 100%.",
    example: "For input z = 0: σ(0) = 1 / (1 + e⁰) = 1 / (1 + 1) = 1 / 2 = 0.5 (50% probability). For z = 2: e^(-2) ≈ 0.135, so σ(2) = 1 / (1 + 0.135) ≈ 0.88 (88% probability).",
    pitfalls: "When input z is very large (e.g. +10) or very small (e.g. -10), the curve becomes almost completely flat. Its slope drops near 0, which causes learning to freeze (the vanishing gradient problem).",
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
      { key: "z", desc: "The input number coming into the activation function." },
      { key: "\\text{ReLU}(z)", desc: "The output: 0 if input is negative; keeps the exact input number if positive." }
    ],
    whenToUse: "The standard, default activation function for hidden layers in almost all modern neural networks.",
    example: "If z = 3.5, ReLU(3.5) = 3.5. If z = -4.2, ReLU(-4.2) = 0.",
    pitfalls: "'Dying ReLU': If a neuron gets stuck outputting negative numbers for all training data, its gradient stays at 0 forever, meaning it can never learn or recover.",
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
      { key: "z_i", desc: "The raw score (logit) calculated for class i." },
      { key: "K", desc: "The total number of classes (e.g. 3 classes: Cat, Dog, Bird)." },
      { key: "\\max(\\mathbf{z})", desc: "The biggest score, subtracted first so numbers don't explode into computer infinity (numerical stability)." },
      { key: "\\text{Softmax}(z_i)", desc: "The probability of class i. All probabilities sum up to exactly 1.0 (100%)." }
    ],
    whenToUse: "Used in the final layer of multi-class classification models where the model must pick between 3 or more distinct categories.",
    example: "Raw scores are Cat: 1.0, Dog: 2.0, Bird: 0.0. Exponentials: e¹≈2.72, e²≈7.39, e⁰=1.00. Total sum = 2.72 + 7.39 + 1.00 = 11.11. Probabilities: Cat = 2.72/11.11 ≈ 24.5%, Dog = 7.39/11.11 ≈ 66.5%, Bird = 1.00/11.11 ≈ 9.0%.",
    pitfalls: "Calculating e^(large number) like e^(500) will crash computers with overflow errors. Always subtract the maximum score first before taking exponentials.",
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
      { key: "n", desc: "The total number of examples." },
      { key: "y_i", desc: "The real, correct answer." },
      { key: "\\hat{y}_i", desc: "The answer predicted by our model." }
    ],
    whenToUse: "The standard loss function for regression models predicting continuous numbers (like prices, weight, or distance).",
    example: "Suppose real targets are [3, 5] and predictions are [2, 7]. Step 1: Errors: (3 − 2) = 1, and (5 − 7) = -2. Step 2: Squared errors: 1² = 1, and (-2)² = 4. Step 3: Average: (1 + 4) / 2 = 2.5. The Mean Squared Error is 2.5.",
    pitfalls: "Squaring errors penalizes big mistakes very harshly. If your dataset contains extreme outliers, MSE can pull the model away from regular points. Use Huber loss or MAE if you have noisy outliers.",
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
      { key: "y_i", desc: "The real true label (1 for Yes, 0 for No)." },
      { key: "p_i", desc: "The probability predicted by the model (e.g. 0.90)." },
      { key: "\\epsilon", desc: "A tiny safety number (e.g. 1e-15) added so we never calculate ln(0), which is undefined." }
    ],
    whenToUse: "The standard loss function for training models with a Sigmoid output on binary (yes/no) classification tasks.",
    example: "If the true answer is Yes (y = 1) and the model predicts 90% confidence (p = 0.9): Loss = −ln(0.9) ≈ 0.105 (small penalty). But if model predicts only 10% (p = 0.1): Loss = −ln(0.1) ≈ 2.303 (very large penalty).",
    pitfalls: "If a prediction reaches exactly 0.0 or 1.0, the natural logarithm ln(0) equals negative infinity and crashes the math. Predictions must always be clipped slightly inside [0.00001, 0.99999].",
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
      { key: "n", desc: "The number of items in the training batch." },
      { key: "C", desc: "The total number of classes (categories)." },
      { key: "y_{ic}", desc: "1 if category c is the correct answer for example i, and 0 for all other categories." },
      { key: "p_{ic}", desc: "The probability the model gave to category c." }
    ],
    whenToUse: "Used to train neural networks that classify images or text into 3 or more categories (paired with Softmax output).",
    example: "For a photo of a Dog (class index 2), the model predicts [Cat: 0.1, Dog: 0.7, Bird: 0.2]. Loss = −ln(0.7) ≈ 0.357. If the model had given the Dog only 0.05 confidence, the loss would shoot up to −ln(0.05) ≈ 2.996.",
    pitfalls: "Always combine Softmax and Cross-Entropy into a single function (like PyTorch nn.CrossEntropyLoss) to keep the math numerically stable.",
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
      { key: "\\theta_t", desc: "The current weight or parameter before updating." },
      { key: "\\theta_{t+1}", desc: "The new updated weight after taking a step." },
      { key: "\\eta", desc: "The learning rate: controls how big each step is (e.g. 0.01)." },
      { key: "\\nabla J(\\theta_t)", desc: "The gradient: tells us the direction and slope of the error." }
    ],
    whenToUse: "Used in every training iteration to nudge model weights toward lower mistakes.",
    example: "Current weight θ = 3.0, learning rate η = 0.1, and gradient = 4.0. Step size = 0.1 × 4.0 = 0.4. New weight = 3.0 − 0.4 = 2.6.",
    pitfalls: "If the learning rate η is too high, the updates jump back and forth wildly and miss the minimum. If it is too low, training takes forever.",
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
      { key: "g_t", desc: "The current error slope (gradient) at this step." },
      { key: "m_t", desc: "The smoothed gradient direction (first moment / momentum)." },
      { key: "v_t", desc: "The smoothed gradient variance (second moment / how wild gradients are)." },
      { key: "\\hat{m}_t, \\hat{v}_t", desc: "Corrected averages so early steps do not start sluggishly." },
      { key: "\\eta", desc: "The base step size (learning rate, default 0.001)." },
      { key: "\\epsilon", desc: "A tiny safety number (e.g. 1e-8) to avoid dividing by zero." }
    ],
    whenToUse: "The default optimizer for deep learning. Works well on almost any network without needing manual tuning.",
    example: "If a weight's gradients are fluctuating wildly, variance v_t becomes large, which automatically shrinks the step size to keep the model safe. If gradients are steady, step size increases.",
    pitfalls: "Use AdamW rather than original Adam when using weight decay regularization, so regularization is applied cleanly.",
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
      { key: "\\text{TP}", desc: "True Positives: items that were actually positive and correctly caught." },
      { key: "\\text{FP}", desc: "False Positives: false alarms (predicted positive, but actually negative)." },
      { key: "\\text{FN}", desc: "False Negatives: missed items (predicted negative, but actually positive)." }
    ],
    whenToUse: "Used to evaluate classification models on imbalanced data where standard accuracy gives a misleading high score.",
    example: "Suppose Precision is 0.80 and Recall is 0.60. Step 1: Multiply them: 0.80 × 0.60 = 0.48. Step 2: Multiply by 2: 2 × 0.48 = 0.96. Step 3: Add them: 0.80 + 0.60 = 1.40. Step 4: Divide: 0.96 / 1.40 ≈ 0.6857. The balanced F1-Score is 68.57%.",
    pitfalls: "F1 gives equal weight to Precision and Recall. In medical tests where missing a disease is dangerous, use Recall or F2-score instead.",
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
      { key: "P(A|B)", desc: "Posterior probability: what we believe about A after seeing clue B." },
      { key: "P(B|A)", desc: "Likelihood: how likely clue B is if A is true." },
      { key: "P(A)", desc: "Prior probability: what we believed about A before seeing clue B." },
      { key: "P(B)", desc: "Total probability of seeing clue B across all possible situations." }
    ],
    whenToUse: "Used to update probabilities whenever you get new evidence. Powers Naive Bayes spam classifiers and medical risk models.",
    example: "Disease rate P(D) = 0.01 (1%). Test accuracy P(+|D) = 0.95. False alarm P(+|healthy) = 0.05. Positive test chance: (0.95 × 0.01) + (0.05 × 0.99) = 0.059. Real chance you have the disease: (0.95 × 0.01) / 0.059 = 0.0095 / 0.059 ≈ 16.1%.",
    pitfalls: "Base rate fallacy: ignoring the prior rate P(A). People mistakenly assume a 95% accurate test means a 95% chance they are sick, forgetting how rare the disease is.",
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
      { key: "x", desc: "The original feature number (e.g. salary = $65,000)." },
      { key: "\\mu", desc: "The average (mean) value across all training examples." },
      { key: "\\sigma", desc: "The standard deviation (spread) across training examples." },
      { key: "z", desc: "The standardized number (where average is 0 and typical spread is 1)." }
    ],
    whenToUse: "Used before feeding data into models that depend on distance (like KNN, SVM, K-Means) or gradient descent (like Neural Networks).",
    example: "Suppose customer age average μ = 50 and standard deviation σ = 10. A person aged x = 65 standardizes to z = (65 − 50) / 10 = 15 / 10 = 1.5. This means their age is 1.5 standard deviations above average.",
    pitfalls: "Calculate μ and σ ONLY using training data! If you calculate them using the whole dataset before splitting, you cause data leakage.",
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
      { key: "\\mathbf{A}, \\mathbf{B}", desc: "Two embedding vectors representing pieces of text or images." },
      { key: "\\mathbf{A} \\cdot \\mathbf{B}", desc: "The dot product of the two vectors." },
      { key: "\\|\\mathbf{A}\\|", desc: "The length (magnitude) of vector A." },
      { key: "\\cos(\\theta)", desc: "Similarity score from -1 to +1. 1.0 means exact same direction; 0 means unrelated." }
    ],
    whenToUse: "Used to compare text embeddings in search engines, AI chatbots (RAG pipelines), and recommender systems.",
    example: "Vector A = [1, 2] and Vector B = [2, 4]. Dot product = (1×2) + (2×4) = 2 + 8 = 10. Length ||A|| = √5 ≈ 2.236. Length ||B|| = √20 ≈ 4.472. Similarity = 10 / (2.236 × 4.472) = 10 / 10 = 1.0 (pointing in the exact same direction).",
    pitfalls: "Cosine similarity measures direction, NOT length. Two articles that say the exact same thing—one short and one long—will have a similarity score near 1.0.",
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
      { key: "W_{\\text{in}}", desc: "The width or height of the input image in pixels." },
      { key: "K", desc: "The filter (kernel) size (e.g. 3 for a 3x3 filter)." },
      { key: "P", desc: "The padding: how many extra zero-pixel borders are added." },
      { key: "S", desc: "The stride: how many pixels the filter jumps forward each step." },
      { key: "W_{\\text{out}}", desc: "The width or height of the resulting output image." }
    ],
    whenToUse: "Used when designing CNN architectures to calculate layer sizes and prevent shape mismatch errors.",
    example: "Input image is 32 × 32, filter size K = 3, padding P = 1, stride S = 1. Calculation: ⌊(32 − 3 + 2(1)) / 1⌋ + 1 = ⌊(31) / 1⌋ + 1 = 31 + 1 = 32. Output is 32 × 32 (size is perfectly preserved).",
    pitfalls: "If the stride does not divide evenly, the floor function ⌊...⌋ drops leftover edge pixels. Check layer shapes carefully.",
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
      { key: "Q", desc: "The Query matrix: the question each word asks." },
      { key: "K", desc: "The Key matrix: the label each word holds." },
      { key: "V", desc: "The Value matrix: the actual information content of each word." },
      { key: "d_k", desc: "The dimension size of the keys (used as a divisor to prevent huge numbers)." },
      { key: "\\text{softmax}", desc: "Converts scores into attention percentages that sum to 100%." }
    ],
    whenToUse: "The core calculation inside all modern Transformer language models (GPT, Claude, Gemini, LLaMA).",
    example: "If key dimension d_k = 64, then √d_k = 8. Dividing raw attention scores by 8 keeps numbers small so the softmax function doesn't saturate or freeze gradients.",
    pitfalls: "Standard self-attention has quadratic cost $O(N^2)$: doubling the length of the text quadruples memory usage.",
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
      { key: "f_t", desc: "Forget gate: percentage of old memory to keep (0 = erase, 1 = keep all)." },
      { key: "i_t", desc: "Input gate: percentage of new information to write into memory." },
      { key: "C_t", desc: "The cell memory state: the notebook holding long-term facts." },
      { key: "h_t", desc: "The hidden state: the output passed to the next word or time step." },
      { key: "\\odot", desc: "Multiply matching pairs of numbers element by element." }
    ],
    whenToUse: "Used for sequential time-series, sensor signals, and audio where past events need to be remembered over multiple steps.",
    example: "If forget gate f_t is 0.0, the memory cell completely erases past facts and starts fresh with new input.",
    pitfalls: "Because each step depends on the previous step, LSTMs cannot process all words at once in parallel like Transformers do.",
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
      { key: "N_{\\text{in}}", desc: "The number of input neurons entering the layer." },
      { key: "N_{\\text{out}}", desc: "The number of output neurons produced by the layer." },
      { key: "N_{\\text{out}} \\text{ (bias)}", desc: "One trainable bias number for each output neuron." }
    ],
    whenToUse: "Used to count how many weights a neural network has and check if it will fit inside GPU VRAM memory.",
    example: "A layer has 512 inputs and 256 outputs. Step 1: Weights = 512 × 256 = 131,072. Step 2: Biases = 256. Step 3: Total = 131,072 + 256 = 131,328 trainable parameters.",
    pitfalls: "If a layer sets `bias=False`, you don't add the extra N_out bias numbers.",
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
      { key: "C", desc: "The number of possible outcomes (e.g. 2 for Heads/Tails)." },
      { key: "p_i", desc: "The probability of outcome i." },
      { key: "H(S)", desc: "The entropy: how messy, uncertain, or random the group is (in bits)." },
      { key: "IG(S, A)", desc: "Information Gain: how much cleaner and more organized the group becomes after splitting on feature A." }
    ],
    whenToUse: "Used inside Decision Trees to decide which question or feature splits the data best.",
    example: "A group with 50% Yes and 50% No has maximum messiness: H(S) = 1.0 bit. A group with 100% Yes has zero messiness: H(S) = 0.0 bits.",
    pitfalls: "Information Gain can be tricked by columns with unique values (like customer ID numbers). Use Gain Ratio or Gini Impurity instead.",
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
      { key: "y, \\hat{y}", desc: "The real target and the model's prediction." },
      { key: "|y - \\hat{y}|", desc: "The absolute error (distance between guess and real answer)." },
      { key: "\\delta", desc: "The threshold cutoff (delta, usually 1.0) separating small errors from big outlier errors." }
    ],
    whenToUse: "Used in regression when your data contains wild outliers that break normal Mean Squared Error (MSE).",
    example: "For threshold δ = 1.0: a small error of 0.4 uses squared math: 0.5 × 0.4² = 0.08. A huge outlier error of 5.0 uses gentle linear math: 1.0 × (5.0 − 0.5) = 4.5 (instead of 12.5 with MSE).",
    pitfalls: "You must choose a reasonable delta value that matches the scale of your target numbers.",
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
      { key: "P(x)", desc: "The real, target probability distribution." },
      { key: "Q(x)", desc: "The model's predicted probability distribution." },
      { key: "D_{\\text{KL}}(P \\parallel Q)", desc: "A score showing how much distribution Q differs from target P. 0 means they are identical." }
    ],
    whenToUse: "Used in Variational Autoencoders (VAEs), model distillation (teaching a small model to copy a big model), and Reinforcement Learning (PPO).",
    example: "If model distribution Q matches target distribution P exactly at every point, the KL divergence is exactly 0. As Q drifts away from P, the score increases.",
    pitfalls: "KL Divergence is not a true distance because it is asymmetric: D_KL(P || Q) does NOT equal D_KL(Q || P). The order matters!",
    calculatorId: "entropy-calc"
  }
];
