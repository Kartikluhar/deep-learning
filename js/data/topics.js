/**
 * MLForge Comprehensive Knowledge Catalog
 * Explained in clear, simple English for beginners and developers.
 * All formulas use clean LaTeX syntax configured for KaTeX rendering.
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
    summary: "The two main ways machine learning models learn: with teacher answers or by finding patterns alone.",
    definition: "Supervised learning teaches a computer using examples that already have correct answers (labels). Unsupervised learning gives the computer raw data without answers so it must find patterns, groups, or hidden structure by itself.",
    whyWeNeedIt: "In real life, sometimes we have labeled data (like emails marked as spam or not spam) and want predictions. Other times, we have millions of customer visits with no labels and want to discover customer groups. Knowing which method to use tells us how to build our model.",
    realLifeExample: "Supervised learning is like studying with flashcards that have questions on the front and answers on the back. Unsupervised learning is like walking into a grocery store in a foreign country and grouping items on shelves by their shapes and colors without knowing their names.",
    howItWorks: [
      "1. Supervised: We give the model pairs of inputs and correct answers $(x, y)$. The model makes a guess $\\hat{y}$, checks how far off it was, and tweaks its internal numbers to make better guesses next time.",
      "2. Unsupervised: We give the model only inputs $x$ with no answers. The algorithm measures how similar items are to each other (for example, distance in space) and clusters similar items together.",
      "3. Semi-supervised: When labeling is expensive, we use a tiny handful of labeled examples together with a large pile of unlabeled data.",
      "4. Self-supervised: The computer creates its own practice test from raw text or images (for example, hiding the next word in a sentence and trying to guess it, like ChatGPT does)."
    ],
    formulas: [
      {
        name: "Supervised Average Error (Empirical Risk)",
        exp: "R(f) = \\frac{1}{n} \\sum_{i=1}^n \\mathcal{L}(y_i, f(x_i))",
        explanation: "This formula calculates the average mistake across all practice examples.",
        symbols: [
          { key: "n", desc: "The total number of examples we are testing." },
          { key: "y_i", desc: "The real, correct answer for example number i." },
          { key: "f(x_i)", desc: "The answer predicted by our model for input x_i." },
          { key: "\\mathcal{L}", desc: "The loss function, which measures how big each mistake is." }
        ]
      },
      {
        name: "K-Means Clustering Error (Inertia)",
        exp: "J = \\sum_{k=1}^K \\sum_{x \\in C_k} \\|x - \\mu_k\\|^2",
        explanation: "This formula measures how tight the clusters are. We want every point to be as close to its group center as possible.",
        symbols: [
          { key: "K", desc: "The total number of groups (clusters)." },
          { key: "x", desc: "A single data point." },
          { key: "\\mu_k", desc: "The center point (mean) of group k." },
          { key: "\\|x - \\mu_k\\|^2", desc: "The squared distance from the point to its group center." }
        ]
      }
    ],
    numericalExample: {
      title: "Simple Clustering Distance Check",
      steps: [
        "Suppose we have a customer with spending score 10.",
        "Cluster Center A is at 8, and Cluster Center B is at 20.",
        "Distance to Center A: |10 − 8| = 2.",
        "Distance to Center B: |10 − 20| = 10.",
        "Result: 2 is smaller than 10, so the customer is placed in Group A."
      ]
    },
    whenToUse: [
      "Use Supervised when: You want to predict a specific outcome, such as house prices, loan defaults, or disease diagnosis.",
      "Use Unsupervised when: You want to discover customer segments, detect strange fraud anomalies, or compress data dimensions."
    ],
    comparison: {
      title: "Supervised vs Unsupervised Learning",
      headers: ["Feature", "Supervised Learning", "Unsupervised Learning"],
      rows: [
        ["Training Data", "Input data with correct answers (labeled)", "Input data only, no answers (unlabeled)"],
        ["Main Goal", "Predict a target answer for new data", "Find hidden patterns and groupings"],
        ["Common Tasks", "Classification (Spam/Not Spam) & Regression (Price)", "Clustering (Customer Groups) & Dimensionality Reduction"],
        ["Feedback", "Direct feedback on right vs wrong answers", "No direct feedback; checks internal similarity"],
        ["Data Cost", "High (requires human labeling time)", "Low (uses raw data directly)"]
      ]
    },
    technicalDetails: "In supervised learning, models optimize parameter weights by following the gradient of empirical loss functions using backpropagation. In contrast, unsupervised clustering (like K-Means) relies on expectation-maximization, alternating between assigning points to Voronoi cells and recomputing centroids until convergence.",
    pros: [
      "Supervised gives clear, measurable accuracy numbers you can test directly.",
      "Unsupervised saves money because you don't need humans to label millions of examples."
    ],
    cons: [
      "Supervised breaks down if labels have human mistakes or biases.",
      "Unsupervised results can be subjective; it is harder to prove which grouping is 'correct'."
    ],
    useCases: [
      "Supervised: Credit card fraud alerts, medical image diagnosis, house price estimates.",
      "Unsupervised: Recommender systems, customer shopping personas, genomic data clustering."
    ],
    codeSnippet: `# 1. Supervised Learning: uses features (X) and answers (y)
from sklearn.linear_model import LogisticRegression
from sklearn.cluster import KMeans

# Train with answers
classifier = LogisticRegression()
classifier.fit(X_train, y_train)

# 2. Unsupervised Learning: uses features (X) only
cluster_model = KMeans(n_clusters=3, random_state=42)
groups = cluster_model.fit_predict(X_unlabeled)`,
    codeExplanation: "In the first part, we pass both X_train (the questions) and y_train (the answers). In the second part, we pass only X_unlabeled. The KMeans algorithm divides the data into 3 groups automatically without ever seeing labels."
  },

  {
    id: "bias-variance-tradeoff",
    title: "Bias-Variance Tradeoff",
    section: "Machine Learning",
    category: "Fundamentals",
    summary: "The balance between a model being too simple (underfitting) or too complex (overfitting).",
    definition: "The Bias-Variance Tradeoff is the challenge of making a model complex enough to learn the real pattern, but simple enough that it does not memorize random noise. Total error comes from three things: bias, variance, and irreducible random noise.",
    whyWeNeedIt: "If your model is too simple, it makes big mistakes everywhere. If your model is too complex, it gets 100% on practice questions but fails completely on the real test. Understanding this tradeoff tells you when to add more data, simplify your model, or add regularization.",
    realLifeExample: "Imagine preparing for an exam. A student who only skims the chapter (High Bias) misses key facts and fails both the practice test and the real exam. A student who memorizes every practice question word-for-word (High Variance) gets 100% on the practice test, but fails the real exam because the questions are worded differently. The ideal student understands the core rules so they pass any exam.",
    howItWorks: [
      "1. High Bias (Underfitting): The model makes strong assumptions that are wrong (like drawing a straight line through a curved pattern). It gets high errors on both training data and new test data.",
      "2. High Variance (Overfitting): The model has too much freedom (like a 15-degree polynomial). It twists and turns to hit every single noisy dot in training, but misses new dots completely.",
      "3. The Balance: As you increase model complexity, bias goes down, but variance goes up. The sweet spot is right in the middle where total test error is at its lowest."
    ],
    formulas: [
      {
        name: "Expected Prediction Error Breakdown",
        exp: "\\mathbb{E}[(y - \\hat{y})^2] = \\text{Bias}(\\hat{y})^2 + \\text{Variance}(\\hat{y}) + \\sigma^2",
        explanation: "This formula proves that total error equals bias squared plus variance plus irreducible random noise.",
        symbols: [
          { key: "y", desc: "The true answer in the real world." },
          { key: "\\hat{y}", desc: "The answer predicted by our model." },
          { key: "\\text{Bias}(\\hat{y})", desc: "How far the average prediction is from the true answer (underfitting error)." },
          { key: "\\text{Variance}(\\hat{y})", desc: "How much predictions jump around if trained on different data slices (overfitting error)." },
          { key: "\\sigma^2", desc: "Irreducible random noise that no model can ever predict." }
        ]
      }
    ],
    numericalExample: {
      title: "Error Decomposition Calculation",
      steps: [
        "Suppose a simple linear model has Bias = 2.0 and Variance = 0.5, with natural data noise σ² = 0.2.",
        "Step 1: Square the bias: 2.0² = 4.0.",
        "Step 2: Add variance: 4.0 + 0.5 = 4.5.",
        "Step 3: Add noise: 4.5 + 0.2 = 4.7 total error.",
        "Now suppose we make the model slightly more flexible: Bias drops to 0.8, Variance rises slightly to 0.9.",
        "New Total Error = (0.8² = 0.64) + 0.9 + 0.2 = 1.74. The balanced model performs much better!"
      ]
    },
    whenToUse: [
      "Use when: Your model performs well on training data but poorly on validation data (indicates high variance).",
      "Use when: Your model has low accuracy on both training and test data (indicates high bias)."
    ],
    comparison: {
      title: "Underfitting vs Overfitting",
      headers: ["Feature", "Underfitting (High Bias)", "Overfitting (High Variance)"],
      rows: [
        ["Problem", "Model is too simple to learn the pattern", "Model memorizes training data and noise"],
        ["Train Error", "High (performs poorly)", "Near zero (performs unrealistically well)"],
        ["Test Error", "High (similar to train error)", "Very high (huge gap between train and test)"],
        ["Solution", "Use a bigger model, add more features", "Get more data, use dropout, prune trees, use L1/L2"]
      ]
    },
    technicalDetails: "Formally, bias measures the difference between the expected value of our estimator and the ground truth: $E[\\hat{y}] - y$. Variance measures the sensitivity of the estimator to changes in the training set: $E[(\\hat{y} - E[\\hat{y}])^2]$. Regularization methods penalize parameter weights to artificially constrain variance at the expense of a tiny increase in bias.",
    pros: [
      "Gives you a clear checklist to fix poor model performance without guessing."
    ],
    cons: [
      "Natural noise (sigma squared) can never be removed; no model can be 100% perfect on noisy real data."
    ],
    useCases: [
      "Deciding decision tree depth, choosing L1/L2 regularization strength, tuning neural network layer sizes."
    ],
    codeSnippet: `# Diagnosing Bias vs Variance with learning curves
from sklearn.model_selection import learning_curve
import numpy as np

train_sizes, train_scores, val_scores = learning_curve(
    model, X, y, cv=5, scoring='neg_mean_squared_error'
)
train_rmse = np.sqrt(-np.mean(train_scores, axis=1))
val_rmse = np.sqrt(-np.mean(val_scores, axis=1))

# Rule of thumb:
# Both train_rmse and val_rmse are high -> High Bias (Underfitting)
# train_rmse is low, but val_rmse is much higher -> High Variance (Overfitting)`,
    codeExplanation: "This code trains the model on increasing amounts of data. If the gap between training score and validation score stays large, the model has high variance. If both scores stay poor, the model has high bias."
  },

  {
    id: "data-leakage",
    title: "Data Leakage Prevention",
    section: "Machine Learning",
    category: "Fundamentals",
    summary: "When secret information from the future or test set sneaks into training, causing fake good scores.",
    definition: "Data leakage happens when information from outside the training dataset accidentally enters the model during training. The model looks amazingly accurate during practice, but fails completely when used in production on real incoming data.",
    whyWeNeedIt: "Data leakage is one of the most dangerous bugs in machine learning. It gives developers false confidence. A model might show 99% accuracy in testing, but when deployed for real customers, it drops to 50% because the leaked secret is no longer available.",
    realLifeExample: "Imagine a student taking an open-book practice test where the teacher accidentally left the answer key on the last page. The student scores 100%. But on exam day, there is no answer key, and the student fails.",
    howItWorks: [
      "1. Preprocessing Leakage: Calculating the average (mean) or scaling factors on the whole dataset before splitting into train and test sets.",
      "2. Target Leakage: Including a feature that was created after the event happened (for example, including 'hospital discharge date' to predict if a patient will get sick).",
      "3. Time Leakage: In time-series data, using future data points to predict past events (violating the timeline).",
      "4. The Fix: Always split your raw data first. Fit your scalers and encoders only on training data, then apply them to test data."
    ],
    formulas: [
      {
        name: "Safe Training Scaler Transform",
        exp: "\\mu_{\\text{train}} = \\frac{1}{n_{\\text{train}}} \\sum x_i, \\quad x_{\\text{scaled}} = \\frac{x - \\mu_{\\text{train}}}{\\sigma_{\\text{train}}}",
        explanation: "Calculate the average (mean) and spread (standard deviation) using ONLY training data.",
        symbols: [
          { key: "\\mu_{\\text{train}}", desc: "The average value of the feature, calculated only from training examples." },
          { key: "\\sigma_{\\text{train}}", desc: "The standard deviation, calculated only from training examples." },
          { key: "x", desc: "The value we want to scale." }
        ]
      }
    ],
    numericalExample: {
      title: "Why Scaling Before Splitting Leaks Data",
      steps: [
        "Suppose Training values are [10, 20] and Test value is [90].",
        "Wrong way (Leakage): Mean of all three numbers = (10 + 20 + 90) / 3 = 40. The training data now knows about the extreme test value 90!",
        "Right way: Mean of training data ONLY = (10 + 20) / 2 = 15.",
        "Scale training numbers using 15. The test set remains completely unseen until evaluation."
      ]
    },
    whenToUse: [
      "Every machine learning project: Whenever you clean data, scale numbers, fill in missing values, or split time-series."
    ],
    comparison: {
      title: "Data Leakage vs Safe Preprocessing",
      headers: ["Action", "Leaked Pipeline (Dangerous)", "Safe Pipeline (Correct)"],
      rows: [
        ["When to Scale", "Fit scaler on all data, then split", "Split first, fit scaler ONLY on train set"],
        ["Time Series", "Random shuffle across all dates", "Split chronologically (train on past, test on future)"],
        ["Feature Choice", "Includes columns created after the event", "Includes only columns available at prediction time"],
        ["Real-World Result", "Crashes or fails in production", "Performs reliably in production"]
      ]
    },
    technicalDetails: "Data leakage artificially reduces empirical risk on validation sets by allowing test set distribution statistics to inform training weights. In Scikit-Learn, wrapping feature transformers and estimators inside a Pipeline object guarantees that transforms are fit strictly on training folds during cross-validation.",
    pros: [
      "Prevents costly surprises and failures when models go live in real business applications."
    ],
    cons: [
      "Requires disciplined pipeline design and careful auditing of raw features."
    ],
    useCases: [
      "Medical diagnosis pipelines, loan approval systems, stock market time-series forecasting."
    ],
    codeSnippet: `# Safe Pipeline: completely avoids data leakage
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

# 1. Split raw data FIRST
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. Pipeline fits scaler ONLY on X_train during training
safe_model = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', LogisticRegression())
])
safe_model.fit(X_train, y_train)
test_accuracy = safe_model.score(X_test, y_test)`,
    codeExplanation: "By putting StandardScaler inside a Pipeline, Scikit-Learn guarantees that the average and standard deviation are calculated strictly from X_train. The test set is never seen during training."
  },

  {
    id: "logistic-regression",
    title: "Logistic Regression",
    section: "Machine Learning",
    category: "Algorithms",
    summary: "A simple, fast algorithm used to predict yes/no answers and probability scores.",
    definition: "Logistic Regression is a classification algorithm used to predict binary outcomes (like Yes/No, 1/0, True/False). It calculates a score from input features and converts that score into a probability between 0 and 1 using the Sigmoid curve.",
    whyWeNeedIt: "Standard linear regression can predict numbers like -50 or +200, which make no sense when you need a probability between 0% and 100%. Logistic regression squashes predictions into a valid probability so you can make clear decisions.",
    realLifeExample: "A bank wants to decide whether to approve a credit card. It checks income, age, and past debt. Logistic regression combines these clues and gives a score like 0.85 (meaning an 85% chance the customer will repay on time). If the score is 0.50 or higher, the bank approves the card.",
    howItWorks: [
      "1. Calculate weighted sum: Multiply each input by a weight and add a bias number: $z = w_1 x_1 + w_2 x_2 + b$.",
      "2. Squash the score: Pass $z$ through the Sigmoid function to get a probability $p$ between 0 and 1.",
      "3. Compare with actual answer: Measure the mistake using Binary Cross-Entropy loss.",
      "4. Update weights: Use gradient descent to adjust weights so mistakes become smaller.",
      "5. Apply decision cutoff: If probability is 0.50 or higher, predict Class 1 (Yes); otherwise predict Class 0 (No)."
    ],
    formulas: [
      {
        name: "Prediction Formula (Sigmoid Mapping)",
        exp: "p = \\frac{1}{1 + e^{-z}} \\quad \\text{where } z = \\mathbf{w}^T \\mathbf{x} + b",
        explanation: "This turns any number z (positive or negative) into a smooth percentage between 0 and 1.",
        symbols: [
          { key: "z", desc: "The linear combination score: weights multiplied by inputs, plus bias." },
          { key: "e", desc: "Euler's constant number, approximately 2.718." },
          { key: "p", desc: "The resulting probability, strictly between 0 and 1." }
        ]
      },
      {
        name: "Binary Cross-Entropy Loss",
        exp: "\\text{Loss} = -\\left[ y \\ln(p) + (1 - y) \\ln(1 - p) \\right]",
        explanation: "Penalizes the model heavily if it makes a confident prediction that turns out to be wrong.",
        symbols: [
          { key: "y", desc: "The true answer (1 for Yes, 0 for No)." },
          { key: "p", desc: "The probability predicted by the model." },
          { key: "\\ln", desc: "The natural logarithm function." }
        ]
      }
    ],
    numericalExample: {
      title: "Step-by-Step Probability Calculation",
      steps: [
        "Suppose we have one feature x = 2, with weight w = 1.5 and bias b = -1.0.",
        "Step 1: Calculate z: z = (1.5 × 2) + (-1.0) = 3.0 - 1.0 = 2.0.",
        "Step 2: Calculate e^(-z): e^(-2.0) ≈ 0.1353.",
        "Step 3: Calculate Sigmoid: p = 1 / (1 + 0.1353) = 1 / 1.1353 ≈ 0.8808.",
        "Result: The model predicts an 88.08% probability of Yes. Since 88.08% ≥ 50%, the final prediction is Class 1."
      ]
    },
    whenToUse: [
      "Use when: You need to predict a binary answer (Spam vs Not Spam, Buy vs Won't Buy).",
      "Use when: You need to explain to stakeholders exactly how each feature influences the outcome."
    ],
    comparison: {
      title: "Linear Regression vs Logistic Regression",
      headers: ["Feature", "Linear Regression", "Logistic Regression"],
      rows: [
        ["Output", "Continuous number (e.g. house price $350,000)", "Probability between 0 and 1 (e.g. 85% chance of rain)"],
        ["Target Variable", "Numeric (unbounded)", "Categorical (binary: 0 or 1)"],
        ["Shape", "Straight line", "S-shaped curved line (Sigmoid)"],
        ["Loss Function", "Mean Squared Error (MSE)", "Binary Cross-Entropy (Log Loss)"]
      ]
    },
    technicalDetails: "The log-odds (logit) formulation is linear: $\\ln(p / (1 - p)) = \\mathbf{w}^T \\mathbf{x} + b$. The coefficients represent the change in log-odds for a one-unit change in the predictor. Exponentiating a weight $e^{w_i}$ yields the odds ratio, which makes logistic regression a cornerstone of statistical modeling in medicine and economics.",
    pros: [
      "Very fast to train and run.",
      "Does not overfit easily on small datasets.",
      "Outputs transparent probabilities rather than just hard labels."
    ],
    cons: [
      "Can only draw straight boundary lines between classes.",
      "Cannot capture complex interactions between features without manual feature engineering."
    ],
    useCases: [
      "Email spam filtering, customer churn prediction, medical disease risk screening."
    ],
    codeSnippet: `# Logistic Regression in Scikit-Learn
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X_train, y_train)

# Predict probability of Yes
probabilities = model.predict_proba(X_test)[:, 1]

# Predict hard label (0 or 1)
predictions = model.predict(X_test)
print("First prediction probability:", probabilities[0])`,
    codeExplanation: "model.fit learns the weights from training data. model.predict_proba gives the exact confidence percentage (like 0.88), while model.predict gives the final decision (0 or 1)."
  },

  {
    id: "random-forest",
    title: "Random Forest Classifier & Regressor",
    section: "Machine Learning",
    category: "Algorithms",
    summary: "Combines many decision trees together to make accurate and stable predictions.",
    definition: "Random Forest is a machine learning algorithm that builds a large group (a 'forest') of decision trees. Each tree makes its own prediction, and the forest combines them by taking a majority vote (for classification) or an average (for regression).",
    whyWeNeedIt: "A single decision tree is like one person making a decision: it can easily be misled by quirks in the data (high variance). A Random Forest is like asking a committee of 100 people. Even if a few make mistakes, the group decision is very reliable.",
    realLifeExample: "Suppose you want to pick a movie to watch. If you ask one friend, they might recommend a weird movie they love. If you ask 50 different friends and pick the movie recommended most often, you are much more likely to enjoy it. That is a Random Forest.",
    howItWorks: [
      "1. Create random subsets: The algorithm creates many random samples of the data with replacement (called Bootstrapping).",
      "2. Randomize features: At each branch of each tree, it only considers a random subset of features (like choosing from 3 random clues instead of all 20). This keeps trees from copying each other.",
      "3. Grow trees: Each tree is grown deep without pruning.",
      "4. Vote: For a new example, every tree casts a vote. The option with the most votes wins."
    ],
    formulas: [
      {
        name: "Variance Reduction in an Ensemble",
        exp: "\\text{Variance}(\\text{Forest}) = \\rho \\sigma^2 + \\frac{1 - \\rho}{B} \\sigma^2",
        explanation: "Shows that as you add more trees (B) and make trees different from each other (low correlation ρ), the total variance drops close to zero.",
        symbols: [
          { key: "B", desc: "The total number of trees in the forest (e.g. 100)." },
          { key: "\\rho", desc: "The correlation between different trees (how similar they are)." },
          { key: "\\sigma^2", desc: "The variance of a single decision tree." }
        ]
      }
    ],
    numericalExample: {
      title: "Majority Voting Example",
      steps: [
        "Suppose we have a forest with 5 trees predicting whether a customer will buy a product.",
        "Tree 1 votes: Yes",
        "Tree 2 votes: Yes",
        "Tree 3 votes: No",
        "Tree 4 votes: Yes",
        "Tree 5 votes: Yes",
        "Tally: 4 votes for Yes, 1 vote for No.",
        "Final Forest Prediction: Yes (with 80% confidence)."
      ]
    },
    whenToUse: [
      "Use when: You have tabular data (spreadsheets, SQL tables) with mixed numbers and categories.",
      "Use when: You want high accuracy right out of the box without tuning many knobs."
    ],
    comparison: {
      title: "Single Decision Tree vs Random Forest",
      headers: ["Feature", "Single Decision Tree", "Random Forest"],
      rows: [
        ["Accuracy", "Moderate, often overfits easily", "High, resists overfitting"],
        ["Stability", "Low (small data changes change the whole tree)", "High (averaging stabilizes predictions)"],
        ["Interpretability", "Very easy to read as a flowchart", "Harder to visualize (a collection of 100+ trees)"],
        ["Training Speed", "Extremely fast", "Slower (trains many trees)"]
      ]
    },
    technicalDetails: "Random Forest employs Bagging (Bootstrap Aggregating) combined with random subspace feature projection ($m = \\sqrt{p}$ for classification and $p/3$ for regression). It also calculates Out-of-Bag (OOB) error for free, as each tree leaves out roughly 36.8% of the data during bootstrap sampling.",
    pros: [
      "Hard to overfit; works well with default settings.",
      "Handles missing values and non-linear relationships naturally.",
      "Tells you which features are most important."
    ],
    cons: [
      "Larger file size and uses more memory than a single tree.",
      "Slower prediction speed when you have hundreds of deep trees."
    ],
    useCases: [
      "Customer churn prediction, medical diagnosis, loan approval, e-commerce product rankings."
    ],
    codeSnippet: `# Random Forest in Scikit-Learn
from sklearn.ensemble import RandomForestClassifier

# Create forest of 100 trees
forest = RandomForestClassifier(n_estimators=100, random_state=42)
forest.fit(X_train, y_train)

# Check accuracy score
accuracy = forest.score(X_test, y_test)
print(f"Accuracy: {accuracy * 100:.1f}%")`,
    codeExplanation: "n_estimators=100 tells the model to build 100 individual decision trees. When we call fit, it trains all 100 trees on random subsets of the data."
  },

  {
    id: "xgboost",
    title: "Gradient Boosting & XGBoost",
    section: "Machine Learning",
    category: "Algorithms",
    summary: "Builds trees one after another, where each new tree fixes the mistakes made by earlier trees.",
    definition: "Gradient Boosting is a powerful machine learning technique that trains trees in a team, step by step. Instead of training independent trees in parallel, each new tree focuses specifically on the errors (residuals) left behind by previous trees.",
    whyWeNeedIt: "While Random Forest trains trees independently, Gradient Boosting trains them sequentially to fix specific weaknesses. It is currently the most popular and winning algorithm for structured tabular data on platforms like Kaggle.",
    realLifeExample: "Imagine practicing free throws in basketball. First, you throw and miss 10 inches to the left. On your second throw, you adjust 10 inches to the right. On your third throw, you adjust for a tiny 2-inch error. Each attempt corrects the leftover mistake of the previous attempt.",
    howItWorks: [
      "1. Make a baseline guess: Start with a simple guess for all examples (like the average target value).",
      "2. Calculate leftovers (residuals): Find the error for each row: Error = True Answer − Current Prediction.",
      "3. Train a small tree on the error: Build a shallow tree to predict those leftover errors.",
      "4. Add to the team with a learning rate: Add the new tree's advice, scaled down by a small step size (e.g., 0.10) to avoid overreacting.",
      "5. Repeat: Continue for 100 or 500 rounds until errors become very small."
    ],
    formulas: [
      {
        name: "Gradient Boosting Update Step",
        exp: "F_m(x) = F_{m-1}(x) + \\eta \\cdot h_m(x)",
        explanation: "The updated prediction equals the old prediction plus a small fraction of the new tree's correction.",
        symbols: [
          { key: "F_{m-1}(x)", desc: "The combined prediction from all previous trees." },
          { key: "h_m(x)", desc: "The new tree trained to predict the leftover errors." },
          { key: "\\eta", desc: "The learning rate (shrinkage factor, usually 0.05 to 0.10) controlling how big each step is." },
          { key: "F_m(x)", desc: "The new, improved total prediction." }
        ]
      }
    ],
    numericalExample: {
      title: "Step-by-Step Residual Correction",
      steps: [
        "Suppose a house actually sells for $300,000.",
        "Round 0 (Baseline): Initial guess = $200,000. Leftover error = $300,000 − $200,000 = $100,000.",
        "Round 1: Tree 1 predicts the leftover error is $90,000. Learning rate η = 0.1.",
        "Update: New guess = $200,000 + (0.1 × $90,000) = $200,000 + $9,000 = $209,000.",
        "New leftover error = $300,000 − $209,000 = $91,000.",
        "Tree 2 will now train to predict this smaller $91,000 error."
      ]
    },
    whenToUse: [
      "Use when: You want top predictive accuracy on tabular spreadsheet data.",
      "Use when: You have competition datasets or business datasets with complex non-linear patterns."
    ],
    comparison: {
      title: "Random Forest vs Gradient Boosting (XGBoost)",
      headers: ["Feature", "Random Forest", "Gradient Boosting (XGBoost)"],
      rows: [
        ["How Trees are Built", "In parallel, independently of each other", "Sequentially, each tree fixes previous errors"],
        ["Tree Depth", "Deep unpruned trees", "Shallow trees (depth 3 to 6)"],
        ["Risk of Overfitting", "Low", "Higher if learning rate is too large or too many trees"],
        ["Tuning Needed", "Minimal", "Requires tuning learning rate, tree depth, and subsample"]
      ]
    },
    technicalDetails: "XGBoost (Extreme Gradient Boosting) improves upon standard gradient boosting by utilizing a second-order Taylor expansion of the loss function (using both first-order gradients $g_i$ and second-order Hessians $h_i$). It also incorporates built-in L1/L2 tree complexity regularization and cache-aware block structure for lightning-fast training.",
    pros: [
      "State-of-the-art accuracy on tabular datasets.",
      "Handles missing values automatically.",
      "Very fast thanks to hardware-optimized parallelization in libraries like XGBoost and LightGBM."
    ],
    cons: [
      "Easier to overfit than Random Forest if hyperparameters are not tuned.",
      "Sensitive to noisy labels and extreme outliers."
    ],
    useCases: [
      "Kaggle competitions, ad click-through rate (CTR) prediction, credit risk scoring, fraud detection."
    ],
    codeSnippet: `# Using HistGradientBoosting (Scikit-Learn's fast XGBoost equivalent)
from sklearn.ensemble import HistGradientBoostingClassifier

model = HistGradientBoostingClassifier(
    learning_rate=0.08,
    max_iter=150,
    random_state=42
)
model.fit(X_train, y_train)
print(f"Test Score: {model.score(X_test, y_test) * 100:.1f}%")`,
    codeExplanation: "max_iter=150 means the algorithm builds 150 trees in a sequence. learning_rate=0.08 scales each tree's contribution so the model learns steadily without overshooting."
  },

  // =========================================================================
  // Section 2: Deep Learning Architectures & Training
  // =========================================================================
  {
    id: "backpropagation",
    title: "Backpropagation Algorithm",
    section: "Deep Learning",
    category: "Fundamentals",
    summary: "The engine of deep learning: calculates how much each weight contributed to a mistake so it can be fixed.",
    definition: "Backpropagation (short for 'backward propagation of errors') is the algorithm used to train neural networks. It calculates how much each weight and bias in the network contributed to the final prediction error, using calculus (the chain rule) working backwards from the output layer to the input layer.",
    whyWeNeedIt: "A deep neural network can have millions or billions of weights. Without backpropagation, adjusting them would require random guessing, which would take millions of years. Backpropagation finds the exact math shortcut to update every weight in a single pass.",
    realLifeExample: "Imagine a factory assembly line with 5 workers producing a toy car. At the end, an inspector finds that the wheels are loose. The inspector tells worker 5, who tells worker 4, who tells worker 3, all the way back to worker 1. Each worker learns exactly what small adjustment their tool needs so the next toy car is assembled properly.",
    howItWorks: [
      "1. Forward Pass: The network receives input data, passes it through each layer, and produces an output prediction.",
      "2. Calculate Error: The loss function measures the gap between the network's prediction and the true answer.",
      "3. Backward Pass (Chain Rule): Starting at the output layer, the algorithm calculates the partial derivative (gradient) of the error with respect to each weight.",
      "4. Weight Update: An optimizer (like Gradient Descent or Adam) nudges each weight in the direction that lowers the error.",
      "5. Repeat: This cycle is repeated millions of times over batches of examples."
    ],
    formulas: [
      {
        name: "Chain Rule for a Single Weight",
        exp: "\\frac{\\partial \\text{Loss}}{\\partial w} = \\frac{\\partial \\text{Loss}}{\\partial \\hat{y}} \\cdot \\frac{\\partial \\hat{y}}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w}",
        explanation: "To find how a weight inside the network affects the final loss, multiply the rates of change step by step backwards.",
        symbols: [
          { key: "\\frac{\\partial \\text{Loss}}{\\partial w}", desc: "The gradient: how much the total error changes when this weight changes." },
          { key: "\\frac{\\partial \\text{Loss}}{\\partial \\hat{y}}", desc: "How much the error changes when the network output changes." },
          { key: "\\frac{\\partial \\hat{y}}{\\partial z}", desc: "The slope of the activation function at pre-activation score z." },
          { key: "\\frac{\\partial z}{\\partial w}", desc: "The input value x that was multiplied by this weight." }
        ]
      }
    ],
    numericalExample: {
      title: "Step-by-Step Chain Rule Calculation",
      steps: [
        "Suppose input x = 2.0, weight w = 1.5, bias b = 0. Pre-activation z = 2.0 × 1.5 = 3.0.",
        "Suppose the slope of the activation function at z is 0.2.",
        "Suppose the error slope (how much loss changes with output) is 4.0.",
        "Step 1: Rate of change of z with respect to w is input x = 2.0.",
        "Step 2: Multiply backwards: Gradient = 4.0 × 0.2 × 2.0 = 1.6.",
        "Step 3: Update weight with learning rate 0.1: New Weight = 1.5 − (0.1 × 1.6) = 1.5 − 0.16 = 1.34."
      ]
    },
    whenToUse: [
      "Universal: Used automatically whenever any neural network (ANN, CNN, RNN, Transformer) is trained."
    ],
    comparison: {
      title: "Forward Pass vs Backward Pass",
      headers: ["Stage", "Forward Pass", "Backward Pass (Backpropagation)"],
      rows: [
        ["Direction", "From inputs to output layer", "From output layer back to inputs"],
        ["What is Computed", "Neuron activations and final loss", "Gradients (slopes) of the loss for every weight"],
        ["Formula Used", "z = Wx + b and a = f(z)", "Chain rule: dLoss/dW = (dLoss/da) × (da/dz) × (dz/dW)"],
        ["Purpose", "Make a prediction and evaluate loss", "Tell the optimizer how to adjust weights"]
      ]
    },
    technicalDetails: "Backpropagation is reverse-mode automatic differentiation on a directed acyclic computational graph. Its time complexity is linear $O(|E|)$ with respect to the number of edges (weights) in the graph, making it far superior to forward-mode differentiation which would require $O(|V| \\cdot |E|)$ time.",
    pros: [
      "Computes exact mathematical gradients for millions of parameters in a single efficient sweep."
    ],
    cons: [
      "In very deep networks without modern tricks (like ResNets or LayerNorm), gradients can shrink to zero (vanishing gradient) or blow up to infinity (exploding gradient)."
    ],
    useCases: [
      "Training every deep learning model from small image classifiers to massive GPT language models."
    ],
    codeSnippet: `# PyTorch Automatic Backpropagation
import torch
import torch.nn as nn

# Define simple model and loss
model = nn.Linear(in_features=2, out_features=1)
criterion = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.1)

# 1. Forward pass
pred = model(torch.tensor([2.0, 3.0]))
loss = criterion(pred, torch.tensor([5.0]))

# 2. Backward pass (Backprop)
optimizer.zero_grad()  # Reset old gradients
loss.backward()        # Automatically computes all gradients!
optimizer.step()       # Updates weights using the gradients`,
    codeExplanation: "loss.backward() runs the backpropagation algorithm automatically. It calculates the slope of the error for every weight in the model. Then optimizer.step() nudges each weight in the right direction."
  },

  {
    id: "adam-optimizer",
    title: "Adam Optimizer (Adaptive Moment Estimation)",
    section: "Deep Learning",
    category: "Optimizers",
    summary: "The most popular optimizer in modern deep learning: adjusts step sizes automatically for each parameter.",
    definition: "Adam is an optimization algorithm used to update neural network weights during training. It combines two smart ideas: Momentum (smoothing the direction by remembering past steps) and RMSprop (giving each weight its own customized learning rate based on how fast it is changing).",
    whyWeNeedIt: "Standard Gradient Descent uses one fixed step size for all weights. But some weights need big steps to cross flat plateaus, while others need tiny steps to avoid falling off steep cliffs. Adam figures out the perfect step size for every individual weight automatically.",
    realLifeExample: "Imagine rolling a heavy ball down a bumpy hill. When it rolls in a steady direction, it builds momentum and moves faster across small dips. But if it encounters sharp left-and-right bumps, it slows down its sideways shaking. Adam acts like this heavy, smart ball.",
    howItWorks: [
      "1. Track direction (1st Moment): Keep a moving average of recent gradients. This gives the model momentum.",
      "2. Track speed (2nd Moment): Keep a moving average of squared gradients. This measures how wild or calm each weight is.",
      "3. Correct early bias: Adjust the averages so the model does not start sluggishly in the first few steps.",
      "4. Update parameters: Divide the step by the square root of recent gradient variance. Weights with tiny gradients get boosted; weights with huge gradients get dampened."
    ],
    formulas: [
      {
        name: "Adam Update Rule",
        exp: "\\theta_{t} = \\theta_{t-1} - \\eta \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\epsilon}",
        explanation: "Nudge the weight θ using the momentum direction m̂ divided by the square root of recent variation v̂.",
        symbols: [
          { key: "\\theta_t", desc: "The updated weight at step t." },
          { key: "\\eta", desc: "The learning rate (standard default is 0.001)." },
          { key: "\\hat{m}_t", desc: "The smoothed gradient direction (first moment / momentum)." },
          { key: "\\hat{v}_t", desc: "The smoothed gradient magnitude (second moment / variance)." },
          { key: "\\epsilon", desc: "A tiny number (like 0.00000001) to make sure we never divide by zero." }
        ]
      }
    ],
    numericalExample: {
      title: "How Adam Smooths Updates",
      steps: [
        "Suppose a weight has a smoothed direction m̂ = 0.5, and a smoothed variance v̂ = 0.04.",
        "Step 1: Take the square root of variance: √0.04 = 0.2.",
        "Step 2: Divide direction by spread: 0.5 / 0.2 = 2.5.",
        "Step 3: Multiply by learning rate η = 0.001: Step size = 0.001 × 2.5 = 0.0025.",
        "The step size automatically adapted based on how steady the gradients were!"
      ]
    },
    whenToUse: [
      "Default choice: Best starting optimizer for almost any deep learning task (LLMs, CNNs, Transformers)."
    ],
    comparison: {
      title: "SGD vs Adam",
      headers: ["Feature", "Standard SGD", "Adam Optimizer"],
      rows: [
        ["Learning Rate", "One global learning rate for all weights", "Separate adaptive learning rate for every weight"],
        ["Momentum", "None by default (can oscillate wildly)", "Built-in direction smoothing (1st moment)"],
        ["Speed to Converge", "Often requires careful manual tuning", "Fast convergence with default settings"],
        ["Best Used For", "Simple models or fine-tuned computer vision", "Modern deep networks, Transformers, LLMs"]
      ]
    },
    technicalDetails: "Adam uses hyperparameter defaults: $\\beta_1 = 0.9$ (momentum decay) and $\\beta_2 = 0.999$ (second-moment decay). The bias corrections $\\hat{m}_t = m_t / (1 - \\beta_1^t)$ and $\\hat{v}_t = v_t / (1 - \\beta_2^t)$ prevent the moments from being artificially biased toward zero during the earliest iterations.",
    pros: [
      "Works exceptionally well out of the box with the default learning rate (0.001 or 3e-4).",
      "Handles sparse gradients and noisy data efficiently."
    ],
    cons: [
      "Uses slightly more GPU memory because it must store two extra states (m and v) for every weight."
    ],
    useCases: [
      "Training Large Language Models (LLaMA, GPT), Vision Transformers, image generators, recommender systems."
    ],
    codeSnippet: `# Using AdamW in PyTorch
import torch.optim as optim

# AdamW is the modern version of Adam with clean weight decay
optimizer = optim.AdamW(
    model.parameters(),
    lr=0.001,
    betas=(0.9, 0.999),
    eps=1e-8,
    weight_decay=0.01
)`,
    codeExplanation: "AdamW is Adam with improved weight decay (L2 regularization). It prevents weights from growing too large while keeping all the adaptive learning rate benefits."
  },

  {
    id: "transformer-architecture",
    title: "Transformer Architecture & Self-Attention",
    section: "Deep Learning",
    category: "Architectures",
    summary: "The revolutionary neural network architecture behind modern AI like ChatGPT and Claude.",
    definition: "A Transformer is a neural network architecture designed to process sequences (like sentences or code) by looking at all words at the same time. It uses Self-Attention to connect words that belong together, no matter how far apart they are in the sentence.",
    whyWeNeedIt: "Older sequence models (like RNNs) read text one word at a time from left to right. This was slow and caused the computer to forget words from earlier paragraphs. Transformers read the entire text at once in parallel on GPUs and remember connections over long distances.",
    realLifeExample: "Consider the sentence: 'The animal didn't cross the street because it was too tired.' What does the word 'it' refer to? As humans, we know 'it' refers to the animal, not the street. Self-Attention calculates mathematical connection scores between 'it' and every other word, linking 'it' directly to 'animal'.",
    howItWorks: [
      "1. Tokenize and Embed: Break text into pieces (tokens) and convert each token into a list of numbers (embeddings).",
      "2. Add Position Info: Add positional numbers so the model knows the order of words.",
      "3. Create Query, Key, and Value: For each word, create three vectors: Query (what I am looking for), Key (what I offer), and Value (my actual content).",
      "4. Calculate Attention Scores: Multiply Query by Key to find how relevant words are to each other.",
      "5. Combine Values: Use the attention scores to blend the Value vectors together.",
      "6. Feed-Forward Layers: Pass the blended representations through standard neural network layers with residual connections."
    ],
    formulas: [
      {
        name: "Scaled Dot-Product Attention",
        exp: "\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{Q K^T}{\\sqrt{d_k}} \\right) V",
        explanation: "Calculate how much attention each word should pay to every other word, scale to keep numbers stable, and weight the values.",
        symbols: [
          { key: "Q", desc: "The Query matrix: the question each word asks." },
          { key: "K", desc: "The Key matrix: the tag or label each word holds." },
          { key: "V", desc: "The Value matrix: the actual information content of each word." },
          { key: "d_k", desc: "The dimension size of the keys (used as a scaling divisor to prevent numbers from blowing up)." },
          { key: "\\text{softmax}", desc: "Turns the raw dot products into percentage weights that add up to 1.0." }
        ]
      }
    ],
    numericalExample: {
      title: "Simple Attention Score Step",
      steps: [
        "Suppose Query Q has values [1.0, 2.0] and Key K has values [2.0, 1.0].",
        "Step 1: Dot product = (1.0 × 2.0) + (2.0 × 1.0) = 2.0 + 2.0 = 4.0.",
        "Step 2: Key dimension d_k = 4, so √d_k = 2.0.",
        "Step 3: Scale the score: 4.0 / 2.0 = 2.0.",
        "Step 4: Pass through softmax with other words to get final attention percentage."
      ]
    },
    whenToUse: [
      "Use when: Building modern natural language processing systems (chatbots, translation, summarization).",
      "Use when: Building Vision Transformers (ViT) or multimodal audio/video AI."
    ],
    comparison: {
      title: "RNN vs Transformer",
      headers: ["Feature", "Recurrent Neural Network (RNN)", "Transformer"],
      rows: [
        ["Processing Style", "One word at a time, sequentially", "All words at the same time, in parallel"],
        ["GPU Training", "Slow (cannot parallelize time steps)", "Extremely fast on modern GPUs"],
        ["Long Text Memory", "Poor (forgets early words quickly)", "Strong (connects words across thousands of tokens)"],
        ["Modern Use", "Mostly replaced by Transformers", "The foundation of all modern Large Language Models"]
      ]
    },
    technicalDetails: "Standard scaled dot-product attention scales with quadratic time and memory complexity $O(N^2)$ where $N$ is sequence length. Modern LLM frameworks utilize FlashAttention to optimize memory bandwidth by computing attention blocks directly in fast GPU SRAM without materializing the full $N \\times N$ intermediate attention matrix in High Bandwidth Memory (HBM).",
    pros: [
      "Massively parallelizable on modern GPU clusters.",
      "Captures complex relationships across long documents with high fidelity."
    ],
    cons: [
      "High memory usage for extremely long sequences due to quadratic attention cost.",
      "Requires massive amounts of training data and compute power to train from scratch."
    ],
    useCases: [
      "ChatGPT, Claude, Google Gemini, code generation (GitHub Copilot), translation, Vision Transformers."
    ],
    codeSnippet: `# PyTorch Multi-Head Self-Attention
import torch
import torch.nn as nn

# Create attention layer with 512 dimensions and 8 heads
attention_layer = nn.MultiheadAttention(embed_dim=512, num_heads=8, batch_first=True)

# Fake sequence input: [batch_size=16, sequence_length=50, embedding_dim=512]
tokens = torch.randn(16, 50, 512)

# Self-attention: Query, Key, and Value all come from tokens
output, weights = attention_layer(tokens, tokens, tokens)
print("Output shape:", output.shape) # [16, 50, 512]`,
    codeExplanation: "In self-attention, the Query, Key, and Value all come from the same input tokens. The layer allows every token in the 50-word sequence to interact with and borrow context from all 50 words."
  },

  {
    id: "cnn-convolutional-networks",
    title: "Convolutional Neural Networks (CNN)",
    section: "Deep Learning",
    category: "Architectures",
    summary: "The primary neural network architecture for understanding images, vision, and spatial patterns.",
    definition: "A Convolutional Neural Network (CNN) is a type of neural network designed to process grid data like images. Instead of connecting every pixel to every neuron, it slides small filters (kernels) across the image to detect edges, shapes, textures, and objects.",
    whyWeNeedIt: "If you connect a high-resolution 1000x1000 color image to a regular dense neural network, the first layer alone would need 3 billion weights! The computer would run out of memory instantly. CNNs solve this by reusing small 3x3 filters across the entire image.",
    realLifeExample: "Imagine looking at a picture through a small cardboard square with a hole in the middle. You slide the square across the picture row by row. At first you spot simple things like horizontal edges and dark spots. As you go deeper, you combine those edges into an eye, a nose, and finally a complete human face.",
    howItWorks: [
      "1. Convolution: Slide small filters (like 3x3 pixels) across the image to create feature maps (highlighting edges and corners).",
      "2. Activation (ReLU): Turn negative numbers to 0 so the network learns non-linear features.",
      "3. Pooling: Shrink the image (usually taking the maximum value in each 2x2 patch) to reduce size and make the model insensitive to small shifts.",
      "4. Repeat: Stack multiple Conv + ReLU + Pool layers to learn deeper concepts (lines -> textures -> parts -> objects).",
      "5. Final Classification: Flatten the final feature maps and connect to a small dense layer to output the final answer (e.g. Dog, Cat, Car)."
    ],
    formulas: [
      {
        name: "CNN Output Spatial Size",
        exp: "W_{\\text{out}} = \\left\\lfloor \\frac{W_{\\text{in}} - K + 2P}{S} \\right\\rfloor + 1",
        explanation: "Calculate how wide or tall the output image will be after sliding the filter.",
        symbols: [
          { key: "W_{\\text{in}}", desc: "The input image width or height in pixels." },
          { key: "K", desc: "The filter (kernel) size (usually 3 or 5)." },
          { key: "P", desc: "Padding: how many rows of zeros are added around the border." },
          { key: "S", desc: "Stride: how many pixels the filter moves at each step (usually 1 or 2)." },
          { key: "W_{\\text{out}}", desc: "The resulting output image dimension in pixels." }
        ]
      }
    ],
    numericalExample: {
      title: "Output Size Calculation",
      steps: [
        "Suppose we have an input image of size 28 × 28 pixels.",
        "Kernel size K = 3, Padding P = 1, Stride S = 1.",
        "Step 1: Calculate numerator: W_in − K + 2P = 28 − 3 + (2 × 1) = 28 − 3 + 2 = 27.",
        "Step 2: Divide by stride: 27 / 1 = 27.",
        "Step 3: Add 1: 27 + 1 = 28.",
        "Result: The output size is 28 × 28 (identical size because padding preserved borders)."
      ]
    },
    whenToUse: [
      "Use when: Working with images, video frames, medical X-rays, or audio spectrograms.",
      "Use when: Input data has spatial structure where nearby values are related."
    ],
    comparison: {
      title: "Dense (Fully Connected) Layer vs Conv2D Layer",
      headers: ["Feature", "Dense Layer", "Convolutional Layer (Conv2D)"],
      rows: [
        ["Connection Pattern", "Every input connects to every output neuron", "Each neuron connects only to a small local patch (e.g. 3x3)"],
        ["Weight Replay", "Each weight is used once per input", "The same filter weights are reused across the entire image"],
        ["Parameter Count", "Massive (millions of weights for images)", "Very small (e.g. a 3x3 filter has only 9 weights)"],
        ["Spatial Awareness", "Destroys 2D layout (requires flattening)", "Preserves 2D height, width, and color channels"]
      ]
    },
    technicalDetails: "CNNs rely on two core mathematical properties: Translation Equivariance (if an object moves in the image, its feature representation moves by the exact same amount) and Locality (pixels close together are semantically related). Weight sharing drastically reduces parameter count, acting as a powerful spatial regularizer.",
    pros: [
      "Dramatically fewer parameters than standard fully connected networks.",
      "Recognizes patterns anywhere in the image, even if shifted or moved slightly."
    ],
    cons: [
      "Does not automatically understand rotation or extreme perspective changes without data augmentation."
    ],
    useCases: [
      "Facial recognition, self-driving cars, medical scan tumor detection, satellite imagery analysis."
    ],
    codeSnippet: `# Building a Conv2D layer in PyTorch
import torch
import torch.nn as nn

# Takes 3-channel RGB image, outputs 32 feature maps using 3x3 filters
conv = nn.Conv2d(in_channels=3, out_channels=32, kernel_size=3, padding=1)
pool = nn.MaxPool2d(kernel_size=2, stride=2)

# Input: 1 image, 3 color channels, 64x64 pixels
image = torch.randn(1, 3, 64, 64)
features = conv(image)     # Shape becomes [1, 32, 64, 64]
shrunk = pool(features)    # Shape becomes [1, 32, 32, 32]
print("After pooling:", shrunk.shape)`,
    codeExplanation: "The Conv2d layer extracts 32 distinct patterns using 3x3 filters. Then MaxPool2d halves the spatial width and height from 64 to 32 by picking the strongest response in every 2x2 block."
  },

  {
    id: "rnn-lstm-networks",
    title: "Recurrent Networks (RNN) & LSTM",
    section: "Deep Learning",
    category: "Architectures",
    summary: "Networks with an internal memory loop to handle sequential data and time series.",
    definition: "A Recurrent Neural Network (RNN) is a neural network designed for sequential data (like words in a sentence or stock prices over time). It has an internal memory loop that remembers what it saw in previous steps. An LSTM (Long Short-Term Memory) is an advanced RNN that uses gates to avoid forgetting information over long periods.",
    whyWeNeedIt: "Standard neural networks assume each input is completely independent. But in a sentence, the meaning of word #10 depends heavily on word #1. RNNs and LSTMs pass memory forward from one word to the next.",
    realLifeExample: "Imagine reading a mystery novel. As you read chapter 10, you hold clues from chapter 1 in your mind. An ordinary RNN is like having a weak short-term memory that forgets chapter 1 by the time you reach chapter 3. An LSTM has a deliberate notebook (memory cell) where it writes down key clues to keep for later chapters.",
    howItWorks: [
      "1. Forget Gate: Looks at the new input and past memory, and decides what old information is safe to throw away.",
      "2. Input Gate: Decides what new facts from the current step are important enough to save.",
      "3. Update Memory Cell: Combines the kept old memory with the new facts.",
      "4. Output Gate: Emits the current answer and passes the updated hidden memory to the next time step."
    ],
    formulas: [
      {
        name: "LSTM Cell State Memory Update",
        exp: "C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t",
        explanation: "The new memory equals (what we decided to keep from the past) plus (what we decided to save from the new input).",
        symbols: [
          { key: "C_t", desc: "The new internal memory cell state at time step t." },
          { key: "f_t", desc: "The forget gate percentage (values between 0 = forget all, 1 = keep all)." },
          { key: "C_{t-1}", desc: "The previous memory cell state from time step t-1." },
          { key: "i_t", desc: "The input gate percentage deciding how much new information to store." },
          { key: "\\tilde{C}_t", desc: "The candidate new memory created from current input." },
          { key: "\\odot", desc: "Element-by-element vector multiplication." }
        ]
      }
    ],
    numericalExample: {
      title: "How the Forget Gate Clears Memory",
      steps: [
        "Suppose previous memory C_{t-1} = 10.0.",
        "The forget gate sees a new sentence starting and calculates f_t = 0.05 (meaning forget 95%).",
        "The input gate calculates i_t = 0.90 with new information value 4.0.",
        "Step 1: Retained past memory = 0.05 × 10.0 = 0.5.",
        "Step 2: Added new memory = 0.90 × 4.0 = 3.6.",
        "Step 3: New memory C_t = 0.5 + 3.6 = 4.1."
      ]
    },
    whenToUse: [
      "Use when: Analyzing time-series sensor data, weather forecasting, heart rate monitoring, or speech signals.",
      "Use when: Sequence length is moderate and low-latency streaming inference is required."
    ],
    comparison: {
      title: "Standard RNN vs LSTM vs GRU",
      headers: ["Model", "Memory Mechanism", "Vanishing Gradient", "Speed & Complexity"],
      rows: [
        ["Standard RNN", "Single tanh layer; easily forgets older steps", "Severe (struggles beyond 10 steps)", "Fastest, lowest memory"],
        ["LSTM", "3 gates (Forget, Input, Output) + separate cell state", "Solved (constant error carousel)", "Most parameters, slightly slower"],
        ["GRU", "2 gates (Reset, Update); merges cell & hidden state", "Solved", "Faster than LSTM, fewer parameters"]
      ]
    },
    technicalDetails: "Standard RNNs compute hidden state $h_t = \\tanh(W x_t + U h_{t-1} + b)$. During backpropagation through time (BPTT), repeated matrix multiplication of $U$ across $T$ steps causes gradient values to scale exponentially by $\\|U\\|^T$. If the largest eigenvalue of $U$ is less than 1, gradients vanish; if greater than 1, they explode. LSTMs solve this by establishing an additive highway for the cell state $C_t$.",
    pros: [
      "Maintains long-term memory across sequential steps.",
      "Can handle sequences of varying length naturally."
    ],
    cons: [
      "Must be trained step-by-step in chronological order; cannot be fully parallelized like Transformers."
    ],
    useCases: [
      "Stock market time-series forecasting, audio speech recognition, ECG heart monitor anomaly detection."
    ],
    codeSnippet: `# Using an LSTM in PyTorch
import torch
import torch.nn as nn

# Input has 10 features, hidden memory has 32 units
lstm = nn.LSTM(input_size=10, hidden_size=32, batch_first=True)

# 1 sequence with 15 time steps, each having 10 numbers
sequence = torch.randn(1, 15, 10)
output, (h_n, c_n) = lstm(sequence)

print("Output shape:", output.shape) # [1, 15, 32]
print("Final hidden state:", h_n.shape) # [1, 1, 32]`,
    codeExplanation: "The LSTM processes each of the 15 time steps in order. h_n holds the final memory summary after reading all 15 steps."
  },

  {
    id: "activation-loss-functions",
    title: "Activation Functions & Loss Functions",
    section: "Deep Learning",
    category: "Fundamentals",
    summary: "The two pillars of network learning: adding non-linear power and measuring mistakes.",
    definition: "An Activation Function decides what number a neuron should send forward. It adds non-linearity so the network can learn curved, complex patterns. A Loss Function evaluates the network's answers by measuring the distance between predictions and true answers.",
    whyWeNeedIt: "Without activation functions, stacking 100 neural network layers would just equal one single linear equation ($y = mx + b$). The network would never learn curved boundaries. Without a loss function, the network would never know if its guesses were good or bad.",
    realLifeExample: "The activation function is like a dimmer switch on a light bulb: depending on the electrical signal, it decides whether to stay off (0) or shine brightly (positive number). The loss function is like a teacher grading your test paper: it gives you a score showing how many points off your answers were.",
    howItWorks: [
      "1. Neurons compute a linear score: $z = \\sum w_i x_i + b$.",
      "2. Activation function filters the score: ReLU keeps positive values and drops negatives to 0: $\\text{ReLU}(z) = \\max(0, z)$.",
      "3. Output layer produces predictions: Sigmoid produces a probability for 2 classes; Softmax produces probabilities for 3 or more classes.",
      "4. Loss function calculates penalty: Mean Squared Error (MSE) for predicting prices; Cross-Entropy for predicting categories.",
      "5. Gradients flow back: The optimizer uses the loss score to update all weights."
    ],
    formulas: [
      {
        name: "ReLU Activation Function",
        exp: "\\text{ReLU}(z) = \\max(0, z)",
        explanation: "If z is negative, change it to 0. If z is positive, keep it exactly as it is.",
        symbols: [
          { key: "z", desc: "The pre-activation number calculated by the neuron." }
        ]
      },
      {
        name: "Mean Squared Error (MSE Loss)",
        exp: "\\text{MSE} = \\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2",
        explanation: "Find the error for each example, square it, and take the average.",
        symbols: [
          { key: "y_i", desc: "The real, correct answer." },
          { key: "\\hat{y}_i", desc: "The answer predicted by our model." },
          { key: "n", desc: "Total number of examples evaluated." }
        ]
      }
    ],
    numericalExample: {
      title: "Step-by-Step MSE Loss Calculation",
      steps: [
        "Suppose the correct answers are 3 and 5, but the model predicts 2 and 7.",
        "Step 1: Find the error for each item: (3 − 2) = 1, and (5 − 7) = -2.",
        "Step 2: Square each error: 1² = 1, and (-2)² = 4.",
        "Step 3: Average the squared errors: (1 + 4) / 2 = 5 / 2 = 2.5.",
        "Result: The Mean Squared Error is 2.5."
      ]
    },
    whenToUse: [
      "Hidden Layers: Always use ReLU (or Leaky ReLU / GELU) as your default activation.",
      "Binary Classification Output: Use Sigmoid activation paired with Binary Cross-Entropy loss.",
      "Multi-Class Classification Output: Use Softmax activation paired with Categorical Cross-Entropy loss.",
      "Numeric Regression Output: Use Linear activation paired with Mean Squared Error (MSE) or Huber loss."
    ],
    comparison: {
      title: "Sigmoid vs ReLU vs Softmax",
      headers: ["Activation Function", "Output Range", "Where to Use", "Main Advantage"],
      rows: [
        ["Sigmoid", "Between 0 and 1", "Binary classification output layer", "Outputs clean percentages"],
        ["ReLU", "From 0 to infinity", "Hidden layers in deep networks", "Fast to compute, prevents vanishing gradient"],
        ["Softmax", "Probabilities summing to 1.0", "Multi-class classification output layer", "Lets multiple classes compete cleanly"]
      ]
    },
    technicalDetails: "The Universal Approximation Theorem states that a feedforward network with a single hidden layer and non-linear activation functions can approximate any continuous function on compact subsets of $\\mathbb{R}^n$. Pairing Cross-Entropy loss with Softmax/Sigmoid cancels out the saturating exponential terms in the derivative, preventing gradient plateaus during optimization.",
    pros: [
      "Simple, standard pairings (ReLU in hidden layers, Cross-Entropy on output) guarantee healthy gradient flow."
    ],
    cons: [
      "Mismatched combinations (like using MSE with Softmax) create flat gradient plateaus and painfully slow learning."
    ],
    useCases: [
      "Every single neural network built in PyTorch, TensorFlow, or Keras."
    ],
    codeSnippet: `# Common Activations and Losses in PyTorch
import torch.nn as nn

# 1. Hidden Layer Activation
relu = nn.ReLU()

# 2. Regression Loss
mse_loss = nn.MSELoss()

# 3. Binary Classification Loss (combines Sigmoid + BCE cleanly)
bce_with_logits = nn.BCEWithLogitsLoss()

# 4. Multi-class Classification Loss (combines Softmax + Cross-Entropy)
cross_entropy = nn.CrossEntropyLoss()`,
    codeExplanation: "In PyTorch, BCEWithLogitsLoss and CrossEntropyLoss combine the final activation and loss calculation into one step. This prevents numerical errors like dividing by zero or taking the log of zero."
  },

  // =========================================================================
  // Section 3: Mathematics for AI / ML
  // =========================================================================
  {
    id: "linear-algebra-matrices",
    title: "Linear Algebra: Matrices & Vectors",
    section: "Mathematics",
    category: "Linear Algebra",
    summary: "The math language used to store datasets, calculate embeddings, and run neural networks on GPUs.",
    definition: "Linear Algebra is the branch of mathematics that deals with vectors (lists of numbers) and matrices (tables or grids of numbers). In machine learning, every piece of data—whether an image, a sentence, or a spreadsheet row—is represented as a vector or matrix.",
    whyWeNeedIt: "Instead of writing loops to multiply millions of numbers one by one in Python, linear algebra lets us multiply whole matrices at once. Modern graphics cards (GPUs) are designed specifically to perform matrix multiplications billions of times per second.",
    realLifeExample: "Think of a spreadsheet. Each row is a customer, and each column is a feature (age, income, credit score). That entire spreadsheet is a Matrix. When a neural network evaluates 1,000 customers at once, it simply multiplies the customer matrix by its weight matrix in a split second.",
    howItWorks: [
      "1. Vector: A 1D list of numbers representing one item or direction: $\\mathbf{x} = [x_1, x_2, x_3]$.",
      "2. Matrix: A 2D grid of numbers representing multiple items or a transformation: $\\mathbf{A}_{m \\times n}$.",
      "3. Dot Product: Multiply matching items in two vectors and add them up to measure how much they point in the same direction.",
      "4. Matrix Multiplication: Combine rows of Matrix A with columns of Matrix B to calculate all layer outputs in parallel.",
      "5. Vector Norm (Length): Measure how big a vector is (L1 norm adds absolute values; L2 norm calculates straight-line distance)."
    ],
    formulas: [
      {
        name: "Vector Dot Product",
        exp: "\\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^n u_i v_i = u_1 v_1 + u_2 v_2 + \\dots + u_n v_n",
        explanation: "Multiply matching pairs of numbers and add the results together.",
        symbols: [
          { key: "\\mathbf{u}, \\mathbf{v}", desc: "Two vectors of the exact same length." },
          { key: "u_i, v_i", desc: "The numbers at position i inside each vector." }
        ]
      },
      {
        name: "L1 Norm vs L2 Norm (Vector Length)",
        exp: "\\|\\mathbf{x}\\|_1 = \\sum |x_i|, \\quad \\|\\mathbf{x}\\|_2 = \\sqrt{\\sum x_i^2}",
        explanation: "L1 adds up the absolute numbers (city block distance). L2 squares them, adds them, and takes the square root (straight line distance).",
        symbols: [
          { key: "\\|\\mathbf{x}\\|_1", desc: "L1 Norm (Manhattan length), used in Lasso regularization." },
          { key: "\\|\\mathbf{x}\\|_2", desc: "L2 Norm (Euclidean length), used in Ridge regularization and weight decay." }
        ]
      }
    ],
    numericalExample: {
      title: "Dot Product and Length Calculation",
      steps: [
        "Suppose vector u = [3, 4] and vector v = [1, 2].",
        "Step 1: Dot Product = (3 × 1) + (4 × 2) = 3 + 8 = 11.",
        "Step 2: L1 Norm of u = |3| + |4| = 7.",
        "Step 3: L2 Norm of u = √(3² + 4²) = √(9 + 16) = √25 = 5.0."
      ]
    },
    whenToUse: [
      "Every day in AI: Used for token embeddings, attention layers, calculating distances, and batch processing."
    ],
    comparison: {
      title: "L1 Norm vs L2 Norm (Lasso vs Ridge)",
      headers: ["Property", "L1 Norm (Manhattan)", "L2 Norm (Euclidean)"],
      rows: [
        ["Formula", "Sum of absolute values: Σ |x_i|", "Square root of squared sum: √(Σ x_i²)"],
        ["Regularization Name", "L1 Regularization (Lasso)", "L2 Regularization (Ridge / Weight Decay)"],
        ["Effect on Weights", "Forces unimportant weights to become exactly 0 (feature selection)", "Shrinks all weights to small numbers, but rarely exact 0"],
        ["Geometric Shape", "Diamond with sharp corners", "Smooth circle or sphere"]
      ]
    },
    technicalDetails: "Matrix multiplication $C = AB$ has computational complexity $O(n^3)$ with naive algorithms and $O(n^{2.807})$ using Strassen's algorithm. GPU Tensor Cores execute fused multiply-accumulate (FMA) instructions at hardware level, multiplying 16x16 matrix tiles in a single clock cycle.",
    pros: [
      "Enables clean, vectorized code without slow Python for-loops.",
      "Runs at blazing speeds on modern GPU hardware."
    ],
    cons: [
      "Matrix dimensions must align: multiplying $(m \\times k)$ by $(k \\times n)$ requires matching inner dimension $k$."
    ],
    useCases: [
      "Vector search (embeddings in RAG systems), image transformations, neural network weight matrices."
    ],
    codeSnippet: `# Vector & Matrix math using NumPy
import numpy as np

# Create two vectors
u = np.array([3.0, 4.0])
v = np.array([1.0, 2.0])

# 1. Dot product
dot = np.dot(u, v)                # 3*1 + 4*2 = 11.0

# 2. L1 and L2 Norms
l1_length = np.linalg.norm(u, ord=1) # 3 + 4 = 7.0
l2_length = np.linalg.norm(u, ord=2) # sqrt(9 + 16) = 5.0
print(f"Dot: {dot}, L1: {l1_length}, L2: {l2_length}")`,
    codeExplanation: "np.dot calculates the sum of pairwise products. np.linalg.norm with ord=1 gives the L1 Manhattan distance, and ord=2 gives the straight-line L2 Euclidean distance."
  },

  {
    id: "multivariate-calculus-gradients",
    title: "Multivariate Calculus: Gradients",
    section: "Mathematics",
    category: "Calculus",
    summary: "Calculates the direction of steepest climb so we can step the opposite way to reduce errors.",
    definition: "Calculus is the mathematical study of continuous change. In machine learning, a Derivative measures how fast an error changes when a single weight changes. A Gradient is simply a list (vector) of all those derivatives put together for all weights.",
    whyWeNeedIt: "A neural network needs to reduce its error. If you stand on a foggy mountain and want to reach the lowest valley, you feel the slope beneath your feet and step downhill. The gradient tells the computer exactly which direction is 'downhill' so it can make fewer mistakes.",
    realLifeExample: "Imagine adjusting the hot and cold knobs on a shower. If the water is too cold, you turn the hot knob slightly right. You don't guess blindly; you feel the current temperature and make a small targeted adjustment. Calculus calculates that exact adjustment.",
    howItWorks: [
      "1. Partial Derivative: Freeze all other weights in the model and test how changing just one weight changes the error.",
      "2. Assemble the Gradient Vector: Collect the partial derivatives for all weights into a single vector $\\nabla J$.",
      "3. Steepest Ascent: The gradient vector points uphill in the direction of greatest error increase.",
      "4. Step Downhill: Multiply the gradient by a small learning rate $\\eta$ and subtract it from the current weights to move downhill.",
      "5. Repeat: Take thousands of small steps until the model reaches the bottom of the error hill."
    ],
    formulas: [
      {
        name: "Gradient Vector Definition",
        exp: "\\nabla J(\\mathbf{w}) = \\left[ \\frac{\\partial J}{\\partial w_1}, \\frac{\\partial J}{\\partial w_2}, \\dots, \\frac{\\partial J}{\\partial w_n} \\right]^T",
        explanation: "The gradient is a list containing the slope of the loss function with respect to every weight.",
        symbols: [
          { key: "\\nabla J", desc: "The gradient vector (read as 'nabla J' or 'gradient of J')." },
          { key: "\\frac{\\partial J}{\\partial w_i}", desc: "The partial derivative: how fast loss J changes when weight w_i changes." }
        ]
      },
      {
        name: "Gradient Descent Update Step",
        exp: "\\mathbf{w}_{\\text{new}} = \\mathbf{w}_{\\text{old}} - \\eta \\nabla J(\\mathbf{w})",
        explanation: "Update the weights by taking a small step in the opposite direction of the gradient.",
        symbols: [
          { key: "\\mathbf{w}_{\\text{old}}", desc: "The current weight values." },
          { key: "\\mathbf{w}_{\\text{new}}", desc: "The updated weight values after taking the step." },
          { key: "\\eta", desc: "The learning rate (step size multiplier, like 0.01)." }
        ]
      }
    ],
    numericalExample: {
      title: "Gradient Step Calculation",
      steps: [
        "Suppose current weight w = 4.0, and the slope (gradient) at this point is 3.0.",
        "Learning rate η = 0.1.",
        "Step 1: Calculate step amount: η × gradient = 0.1 × 3.0 = 0.3.",
        "Step 2: Subtract step from old weight: 4.0 − 0.3 = 3.7.",
        "Result: The updated weight is 3.7. Because the slope was positive (+3.0), we moved left to reduce error."
      ]
    },
    whenToUse: [
      "Continuous optimization: Powers all gradient descent updates across deep learning and logistic regression."
    ],
    comparison: {
      title: "Derivative vs Partial Derivative vs Gradient",
      headers: ["Term", "Input Variables", "What It Measures"],
      rows: [
        ["Derivative (dy/dx)", "Single variable: f(x)", "The slope of a 1D curve at a specific point"],
        ["Partial Derivative (∂f/∂x)", "Multiple variables: f(x, y, z)", "The slope along one variable axis while holding all other variables constant"],
        ["Gradient (∇f)", "Multiple variables: f(x1, x2, ... xn)", "A complete vector of all partial derivatives; points toward steepest climb"]
      ]
    },
    technicalDetails: "The gradient points in the direction of the greatest directional derivative. Higher-order curvature is captured by the Hessian matrix $H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}$. While second-order optimization (Newton-Raphson) converges in fewer steps by incorporating curvature, inverting the $n \\times n$ Hessian has $O(n^3)$ cost, which is computationally prohibitive for million-parameter neural networks.",
    pros: [
      "Gives an exact direction to improve model performance mathematically without guessing."
    ],
    cons: [
      "Can get stuck in local minima or saddle points if the learning rate is chosen poorly."
    ],
    useCases: [
      "Training neural networks, fine-tuning LLMs, fitting linear regression, optimizing support vector machines."
    ],
    codeSnippet: `# Computing gradients automatically with PyTorch
import torch

# Define parameter with gradient tracking enabled
w = torch.tensor([4.0], requires_grad=True)

# Define loss function: J = w^2 (derivative is 2*w)
loss = w ** 2

# Compute gradient
loss.backward()

print("Calculated Gradient dLoss/dw:", w.grad.item()) # Expected: 2 * 4.0 = 8.0`,
    codeExplanation: "requires_grad=True tells PyTorch to build a computation graph. Calling loss.backward() automatically calculates the exact mathematical derivative (gradient)."
  },

  {
    id: "probability-distributions",
    title: "Probability, Statistics & Bayes' Rule",
    section: "Mathematics",
    category: "Probability",
    summary: "How to handle uncertainty, measure information surprise, and update beliefs with new clues.",
    definition: "Probability is the mathematical study of chance and uncertainty. Machine learning models rarely make 100% certain claims; instead, they output probabilities (like 'there is an 87% chance this scan shows a fracture'). Bayes' Rule is a formula that updates our belief whenever we get new evidence.",
    whyWeNeedIt: "The real world is full of noise, incomplete data, and randomness. Probability gives developers a principled way to make smart decisions when they don't have perfect information.",
    realLifeExample: "Imagine testing for a rare medical condition that affects 1 in 1,000 people. A medical test is 99% accurate. If you test positive, what is the probability you actually have the condition? Surprisingly, it is only around 9%! Why? Because the condition is so rare, false alarms from the healthy crowd outnumber real cases. Bayes' Rule solves this puzzle.",
    howItWorks: [
      "1. Prior Probability P(A): What you believe before seeing any new evidence.",
      "2. Likelihood P(B|A): How likely the evidence is if your hypothesis is true.",
      "3. Marginal Evidence P(B): The total probability of seeing this evidence across all possibilities.",
      "4. Posterior Probability P(A|B): Your updated belief after taking the new evidence into account.",
      "5. Shannon Entropy: Measures how uncertain or unpredictable a distribution is (in bits)."
    ],
    formulas: [
      {
        name: "Bayes' Theorem",
        exp: "P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}",
        explanation: "Updated Belief = (Likelihood of clue × Prior belief) divided by (Total chance of the clue).",
        symbols: [
          { key: "P(A|B)", desc: "Posterior: probability that A is true given that clue B was observed." },
          { key: "P(B|A)", desc: "Likelihood: probability of observing clue B if A is true." },
          { key: "P(A)", desc: "Prior: baseline probability of A before seeing clue B." },
          { key: "P(B)", desc: "Evidence: total probability of clue B occurring under all conditions." }
        ]
      },
      {
        name: "Shannon Entropy (Measure of Uncertainty)",
        exp: "H(X) = -\\sum_{i=1}^n P(x_i) \\log_2 P(x_i)",
        explanation: "Calculates the average surprise or uncertainty in bits. A fair coin flip has high entropy (1 bit); a double-headed coin has 0 entropy.",
        symbols: [
          { key: "H(X)", desc: "Entropy in bits (higher number means more randomness/uncertainty)." },
          { key: "P(x_i)", desc: "The probability of outcome i." }
        ]
      }
    ],
    numericalExample: {
      title: "Bayes' Rule Medical Test Calculation",
      steps: [
        "Suppose disease rate P(Disease) = 0.01 (1%). Healthy rate = 0.99 (99%).",
        "Test sensitivity (true positive rate) = 0.95. False alarm rate = 0.05.",
        "Step 1: Calculate true positive chance: 0.95 × 0.01 = 0.0095.",
        "Step 2: Calculate false alarm chance: 0.05 × 0.99 = 0.0495.",
        "Step 3: Total positive tests P(Test+): 0.0095 + 0.0495 = 0.059.",
        "Step 4: Real chance you are sick: 0.0095 / 0.059 ≈ 0.161 (16.1%)."
      ]
    },
    whenToUse: [
      "Use when: Building spam filters (Naive Bayes), estimating prediction confidence, or picking features in decision trees (Information Gain)."
    ],
    comparison: {
      title: "Prior vs Likelihood vs Posterior",
      headers: ["Term", "Symbol", "Meaning in Simple English"],
      rows: [
        ["Prior Probability", "P(A)", "What you believed before getting new information"],
        ["Likelihood", "P(B|A)", "How likely the evidence is if your hypothesis is correct"],
        ["Posterior Probability", "P(A|B)", "Your new, updated belief after considering the evidence"]
      ]
    },
    technicalDetails: "Information entropy $H(P)$ reaches its maximum $\\log_2(K)$ for a discrete uniform distribution over $K$ states. Kullback-Leibler (KL) divergence $D_{\\text{KL}}(P \\parallel Q) = \\sum P(x) \\ln(P(x)/Q(x))$ quantifies the relative entropy or information lost when approximating true distribution $P$ with model distribution $Q$. It forms the foundation of Variational Autoencoders (VAEs) and policy optimization.",
    pros: [
      "Protects models from overconfidence when data is noisy or rare."
    ],
    cons: [
      "Calculating the exact denominator P(B) in continuous multi-dimensional spaces can be computationally intractable, requiring Markov Chain Monte Carlo (MCMC) approximations."
    ],
    useCases: [
      "A/B testing analysis, Naive Bayes spam classifiers, Variational Autoencoders (VAEs), Reinforcement Learning."
    ],
    codeSnippet: `# Calculating Bayes Posterior and Entropy with SciPy
import numpy as np
from scipy.stats import entropy

# Calculate Shannon Entropy of a fair coin (50/50)
fair_coin = np.array([0.5, 0.5])
h = entropy(fair_coin, base=2)
print("Fair coin entropy (bits):", h) # Exactly 1.0 bit

# Calculate Entropy of a biased coin (90/10)
biased_coin = np.array([0.9, 0.1])
h_biased = entropy(biased_coin, base=2)
print("Biased coin entropy (bits):", h_biased) # ~0.47 bits (less surprise)`,
    codeExplanation: "A 50/50 fair coin flip has maximum uncertainty (1 bit). A 90/10 biased coin is much more predictable, so its entropy drops to 0.47 bits."
  },

  // =========================================================================
  // Section 4: Supplementary Key Topics & Concept Comparisons
  // =========================================================================
  {
    id: "regularization-dropout-batchnorm",
    title: "Regularization: L1, L2, Dropout & BatchNorm",
    section: "Deep Learning",
    category: "Training & Optimization",
    summary: "Techniques to prevent overfitting and help deep networks train smoothly.",
    definition: "Regularization is any technique used to stop a machine learning model from overfitting. Common techniques include L1/L2 penalties (which discourage huge weights), Dropout (which randomly deactivates neurons during training), and Batch Normalization (which standardizes layer inputs).",
    whyWeNeedIt: "Deep neural networks have millions of weights and can easily memorize practice data like a parrot. Regularization forces the network to learn genuine, robust patterns that work on brand-new data.",
    realLifeExample: "Dropout is like a sports team practicing with one random player sitting on the bench every 10 minutes. Because no single star player can be relied on at all times, every player is forced to become competent, making the whole team much stronger.",
    howItWorks: [
      "1. L1 Regularization (Lasso): Adds a penalty equal to the absolute value of weights. Pushes useless weights to exactly zero.",
      "2. L2 Regularization (Ridge / Weight Decay): Adds a penalty equal to the squared value of weights. Keeps all weights small and gentle.",
      "3. Dropout: During each training step, randomly turn off a percentage (like 20% to 50%) of neurons. Turn them all back on during evaluation.",
      "4. Batch Normalization: Rescales the outputs of each layer to have a mean of 0 and variance of 1 across the mini-batch, stopping internal layer shifts."
    ],
    formulas: [
      {
        name: "L2 Regularized Loss (Weight Decay)",
        exp: "\\text{Loss}_{\\text{total}} = \\text{Loss}_{\\text{data}} + \\frac{\\lambda}{2} \\sum_{j} w_j^2",
        explanation: "The model is penalized for both prediction errors and having large weights.",
        symbols: [
          { key: "\\text{Loss}_{\\text{data}}", desc: "The normal prediction error (e.g. MSE or Cross-Entropy)." },
          { key: "\\lambda", desc: "The regularization strength hyperparameter (controls how heavily large weights are penalized)." },
          { key: "w_j", desc: "Each individual weight in the network." }
        ]
      }
    ],
    numericalExample: {
      title: "L2 Penalty Calculation",
      steps: [
        "Suppose model prediction error is 1.20.",
        "The model has two weights: w1 = 3.0 and w2 = 4.0. Regularization strength λ = 0.01.",
        "Step 1: Calculate sum of squared weights: 3.0² + 4.0² = 9 + 16 = 25.",
        "Step 2: Multiply by λ / 2: (0.01 / 2) × 25 = 0.005 × 25 = 0.125.",
        "Step 3: Total loss = 1.20 + 0.125 = 1.325.",
        "The optimizer will now try to lower both the prediction error and the weight sizes."
      ]
    },
    whenToUse: [
      "Use when: Your model performs much better on training data than on validation data (clear sign of overfitting).",
      "Use Dropout: Inside dense hidden layers of deep neural networks.",
      "Use BatchNorm: Between convolutional and dense layers to speed up training."
    ],
    comparison: {
      title: "L1 Regularization vs L2 Regularization",
      headers: ["Feature", "L1 Regularization (Lasso)", "L2 Regularization (Ridge / Weight Decay)"],
      rows: [
        ["Penalty Math", "Adds absolute values: λ Σ |w|", "Adds squared values: (λ/2) Σ w²"],
        ["Sparsity", "Produces sparse weights (many weights become exactly 0)", "Shrinks all weights smoothly, rarely exact 0"],
        ["Feature Selection", "Acts as an automatic feature selector", "Keeps all features, but limits their power"],
        ["Best When", "You have many irrelevant or redundant features", "You have many small, equally important features"]
      ]
    },
    technicalDetails: "Batch Normalization computes mini-batch statistics $\\mu_B = \\frac{1}{m}\\sum x_i$ and $\\sigma_B^2 = \\frac{1}{m}\\sum (x_i - \\mu_B)^2$, normalizing inputs to $\\hat{x}_i = (x_i - \\mu_B)/\\sqrt{\\sigma_B^2 + \\epsilon}$, followed by learnable scale and shift parameters $\\gamma \\hat{x}_i + \\beta$. During inference, running exponential averages replace batch statistics.",
    pros: [
      "Dramatically reduces overfitting and improves real-world test accuracy.",
      "BatchNorm enables higher learning rates and faster training convergence."
    ],
    cons: [
      "Requires turning off Dropout and switching BatchNorm to evaluation mode (`model.eval()`) during testing."
    ],
    useCases: [
      "Modern computer vision models (ResNet), tabular neural networks, fine-tuning large language models."
    ],
    codeSnippet: `# Dropout and BatchNorm in PyTorch
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(100, 64),
    nn.BatchNorm1d(64),   # Standardizes neuron inputs
    nn.ReLU(),
    nn.Dropout(p=0.3),    # Randomly turns off 30% of neurons during training
    nn.Linear(64, 1)
)`,
    codeExplanation: "nn.BatchNorm1d standardizes the 64 numbers flowing through the layer so the network trains smoothly. nn.Dropout(0.3) randomly turns off 30% of neurons during training to stop them from memorizing noise."
  },

  {
    id: "model-evaluation-metrics",
    title: "Model Evaluation Metrics: Precision, Recall & F1",
    section: "Machine Learning",
    category: "Evaluation",
    summary: "How to properly measure model performance beyond misleading raw accuracy.",
    definition: "Evaluation Metrics are mathematical scores used to judge how well a machine learning model is performing. While accuracy simply counts total right answers, metrics like Precision, Recall, and F1-Score give a complete, truthful picture—especially when one class is very rare.",
    whyWeNeedIt: "Suppose 99% of emails are normal and only 1% are dangerous phishing attacks. A lazy model that guesses 'Normal' 100% of the time gets 99% accuracy, but it misses every single attack! Precision and Recall expose these sneaky flaws.",
    realLifeExample: "Think of airport security checking luggage for dangerous items. Recall measures: 'Out of all real dangerous bags, how many did the scanner catch?' Precision measures: 'When the alarm rang, how often was it a real danger instead of someone's shampoo bottle?'",
    howItWorks: [
      "1. Build a Confusion Matrix: Count True Positives (TP), True Negatives (TN), False Positives (FP), and False Negatives (FN).",
      "2. Calculate Precision: $\\text{Precision} = \\frac{\\text{TP}}{\\text{TP} + \\text{FP}}$ (Accuracy of positive alarms).",
      "3. Calculate Recall: $\\text{Recall} = \\frac{\\text{TP}}{\\text{TP} + \\text{FN}}$ (Coverage of actual positive cases).",
      "4. Calculate F1-Score: Harmonic average that balances both Precision and Recall into one clean score.",
      "5. For numeric predictions: Use MAE, MSE, and R-squared."
    ],
    formulas: [
      {
        name: "F1-Score (Harmonic Mean)",
        exp: "F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}",
        explanation: "Combines Precision and Recall. If either score is terrible, the F1-Score drops sharply.",
        symbols: [
          { key: "\\text{Precision}", desc: "TP / (TP + FP): When the model predicts positive, how often is it right?" },
          { key: "\\text{Recall}", desc: "TP / (TP + FN): Out of all real positive items, how many did the model find?" }
        ]
      }
    ],
    numericalExample: {
      title: "Precision, Recall, and F1 Calculation",
      steps: [
        "Suppose a disease test results in: TP = 80, FP = 20, FN = 10, TN = 890.",
        "Step 1: Precision = 80 / (80 + 20) = 80 / 100 = 0.80 (80%).",
        "Step 2: Recall = 80 / (80 + 10) = 80 / 90 ≈ 0.889 (88.9%).",
        "Step 3: F1-Score = 2 × (0.80 × 0.889) / (0.80 + 0.889) = 1.422 / 1.689 ≈ 0.842.",
        "Result: Balanced F1-Score is 84.2%."
      ]
    },
    whenToUse: [
      "High-Stakes Classification: Fraud detection, disease diagnosis, spam detection, search engine ranking."
    ],
    comparison: {
      title: "Precision vs Recall",
      headers: ["Metric", "Question It Answers", "When to Prioritize It", "Bad Outcome If Low"],
      rows: [
        ["Precision", "When the model says Yes, how often is it right?", "Spam filter, video recommendations", "Annoying false alarms (e.g. good email sent to spam)"],
        ["Recall", "Out of all actual Yes cases, how many did it catch?", "Cancer detection, bank fraud, security alerts", "Deadly misses (e.g. sick patient sent home untreated)"],
        ["Accuracy", "Out of all predictions, how many were right?", "Only when classes are roughly 50/50 balanced", "Misleadingly high score on imbalanced data"]
      ]
    },
    technicalDetails: "The Receiver Operating Characteristic (ROC) curve plots True Positive Rate (Recall) against False Positive Rate ($FP / (FP + TN)$) across all classification thresholds. The Area Under the Curve (ROC-AUC) provides an aggregate measure of performance across all possible classification thresholds. An AUC of 0.5 is random guessing; 1.0 is perfect discrimination.",
    pros: [
      "Exposes models that cheat on imbalanced data.",
      "Allows developers to adjust decision thresholds to match business priorities (e.g. prioritize recall over precision)."
    ],
    cons: [
      "Precision and recall naturally pull against each other: increasing recall almost always reduces precision."
    ],
    useCases: [
      "Cancer screening, credit card fraud alerts, content moderation, search engine retrieval."
    ],
    codeSnippet: `# Classification Report in Scikit-Learn
from sklearn.metrics import classification_report, confusion_matrix

# Compare ground truth with predictions
matrix = confusion_matrix(y_true, y_pred)
report = classification_report(y_true, y_pred, target_names=['Normal', 'Fraud'])
print(report)`,
    codeExplanation: "classification_report automatically calculates Precision, Recall, F1-Score, and Support (count) for each category, revealing if the model is failing on rare classes."
  },

  {
    id: "feature-engineering-preprocessing",
    title: "Feature Engineering & Data Preprocessing",
    section: "Machine Learning",
    category: "Data Preparation",
    summary: "Transforming raw, messy real-world data into clean numbers that models can learn from.",
    definition: "Data Preprocessing is the process of cleaning raw data, filling in missing values, and scaling numbers. Feature Engineering is the creative art of combining or transforming existing data columns into new clues that make it easier for a machine learning model to learn.",
    whyWeNeedIt: "Machine learning algorithms can only understand numbers, not text, dates, or missing entries. Furthermore, if one feature is measured in thousands (like income: $75,000) and another in single digits (like age: 25), distance-based models will think income is 3,000 times more important simply because the numbers are bigger.",
    realLifeExample: "Suppose you want to predict house prices. The raw data gives you 'Date Built: 1980'. A model might struggle with raw years. But if you engineer a new column: 'House Age = Current Year − 1980 = 46 years', the model immediately grasps how old the house is.",
    howItWorks: [
      "1. Handle Missing Data: Fill missing numbers with the median, or add an indicator column.",
      "2. Encode Categories: Convert text labels into numbers using One-Hot Encoding (for unordered categories) or Ordinal Encoding (for ranked categories).",
      "3. Scale Numbers: Use Standardization (Z-score) or Min-Max normalization so all features share a similar range.",
      "4. Engineer New Clues: Combine related features (like dividing total rent by number of bedrooms to get rent per room)."
    ],
    formulas: [
      {
        name: "Standardization (Z-Score) vs Min-Max Normalization",
        exp: "z = \\frac{x - \\mu}{\\sigma}, \\quad x_{\\text{norm}} = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}",
        explanation: "Standardization centers data around 0 with spread 1. Min-Max squashes numbers strictly into [0, 1].",
        symbols: [
          { key: "\\mu", desc: "The mean (average) value of the feature." },
          { key: "\\sigma", desc: "The standard deviation (spread) of the feature." },
          { key: "x_{\\min}, x_{\\max}", desc: "The minimum and maximum values in the dataset." }
        ]
      }
    ],
    numericalExample: {
      title: "Min-Max Scaling Step",
      steps: [
        "Suppose customer ages range from minimum 20 to maximum 60.",
        "We want to scale age x = 30 into a [0, 1] range.",
        "Step 1: Subtract minimum: 30 − 20 = 10.",
        "Step 2: Calculate range: 60 − 20 = 40.",
        "Step 3: Divide: 10 / 40 = 0.25.",
        "Result: Age 30 becomes 0.25."
      ]
    },
    whenToUse: [
      "Always: Essential first step before feeding data into any machine learning or deep learning model."
    ],
    comparison: {
      title: "Standardization vs Normalization",
      headers: ["Feature", "Standardization (Z-Score)", "Normalization (Min-Max)"],
      rows: [
        ["Output Range", "Unbounded (mean = 0, standard deviation = 1)", "Strictly bounded between [0, 1]"],
        ["Outlier Sensitivity", "Handles outliers well (preserves distribution shape)", "Very sensitive to extreme outliers (compresses normal points)"],
        ["Best Used For", "Linear Regression, Logistic Regression, PCA, Neural Networks", "Image pixels (0 to 255 -> 0 to 1), KNN, algorithms needing bounded inputs"]
      ]
    },
    technicalDetails: "Distance-based algorithms (KNN, SVM, K-Means) compute Euclidean distances $\\sqrt{\\sum (x_i - y_i)^2}$. If unscaled, coordinates with larger variances dominate distance calculations by several orders of magnitude. Furthermore, in gradient descent, unbalanced feature scales distort loss contours into eccentric ellipses, causing zig-zagging oscillations that dramatically slow down optimization.",
    pros: [
      "Often provides bigger accuracy jumps than switching to a more complicated algorithm."
    ],
    cons: [
      "Must be fit strictly on training splits to prevent data leakage."
    ],
    useCases: [
      "All structured tabular data, customer databases, loan applications, e-commerce records."
    ],
    codeSnippet: `# Preprocessing with Scikit-Learn ColumnTransformer
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), ['age', 'income']),
    ('cat', OneHotEncoder(drop='first'), ['city', 'gender'])
])

# Fit on training data only
X_train_processed = preprocessor.fit_transform(X_train)`,
    codeExplanation: "ColumnTransformer applies StandardScaler to numerical columns and OneHotEncoder to text category columns all at once in a clean, leak-free pipeline."
  }
];
