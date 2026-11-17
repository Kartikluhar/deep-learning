/**
 * MLForge Data Science Curriculum Topics Database
 * Comprehensive, beginner-friendly lessons written in simple English with
 * daily life analogies, step-by-step explanations, line-by-line code breakdowns,
 * math formulas (KaTeX), common mistakes, interview Q&As, and practice tasks.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsde = window.MLForge.dsde || {};
window.MLForge.dsde.data = window.MLForge.dsde.data || {};

MLForge.dsde.data.dsTopics = [
  // =========================================================================
  // TOPIC 1: INTRODUCTION TO DATA SCIENCE
  // =========================================================================
  {
    id: "intro-data-science",
    track: "ds",
    title: "Introduction to Data Science & The Data Lifecycle",
    category: "Data Science Fundamentals",
    categoryNumber: 1,
    difficulty: "Beginner",
    readTime: "12 min",
    summary: "Understand what Data Science actually is, why it has transformed every modern industry, the 6-stage lifecycle, role comparisons (DS vs DA vs DE vs MLE), and data types.",
    content: `
      <h2>1. Simple Definition: What is Data Science?</h2>
      <p>Imagine you run a bustling coffee shop. Every single day, your cash register records hundreds of orders: what drink was ordered, at what exact hour, what the weather was outside, and how the customer paid. On their own, these records are just overwhelming rows of numbers and text.</p>
      <p><strong>Data Science</strong> is the art and science of turning raw, messy numbers into clear, actionable knowledge. It combines programming (Python), statistics and math, and business domain knowledge to discover hidden patterns, answer critical questions, and forecast future events.</p>

      <div class="dsde-card-analogy">
        <strong>Daily Life Analogy:</strong> Think of crude oil pulled from the ground. You cannot pour crude oil directly into your family car's engine; it is black sludge. It must be transported, refined, distilled into pure gasoline, and tested before it can power a vehicle. In the modern economy, <em>raw data is crude oil</em>, and <em>Data Science is the refinery</em> that turns raw data into high-octane business decisions.
      </div>

      <h2>2. Why is Data Science Important?</h2>
      <p>Organizations worldwide generate more than 2.5 quintillion bytes of data every day. Without data science, companies make blind guesses based on intuition or subjective opinions. With data science:</p>
      <ul>
        <li><strong>Evidence-Based Decision Making:</strong> Leaders base product choices on factual user behavior rather than guesswork.</li>
        <li><strong>Predictive Intelligence:</strong> Hospitals predict patient admission rates, banks detect fraudulent credit card swipes in 50 milliseconds, and airlines dynamically price flight seats.</li>
        <li><strong>Automation of Routine Judgments:</strong> Recommendation algorithms surface the exact movies or songs users want next.</li>
      </ul>

      <h2>3. The 6 Stages of the Data Science Lifecycle</h2>
      <div class="dsde-table-wrapper">
        <table class="dsde-concept-table">
          <thead>
            <tr>
              <th>Stage</th>
              <th>Goal</th>
              <th>Key Activities &amp; Tools</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Problem Framing</strong></td>
              <td>Understand the business objective</td>
              <td>Define KPIs, convert vague business goals into mathematical targets.</td>
            </tr>
            <tr>
              <td><strong>2. Data Acquisition</strong></td>
              <td>Collect necessary signals</td>
              <td>SQL queries, REST APIs, Web Scraping, CSV/Parquet file extraction.</td>
            </tr>
            <tr>
              <td><strong>3. Data Cleaning &amp; Prep</strong></td>
              <td>Fix dirty, incomplete records</td>
              <td>Handle nulls, remove duplicates, detect outliers, encode categories (Pandas).</td>
            </tr>
            <tr>
              <td><strong>4. Exploratory Data Analysis (EDA)</strong></td>
              <td>Understand relationships &amp; distributions</td>
              <td>Summary statistics, correlation heatmaps, histograms, scatter plots (Seaborn).</td>
            </tr>
            <tr>
              <td><strong>5. Statistical &amp; ML Modeling</strong></td>
              <td>Build predictive or descriptive models</td>
              <td>Linear/Logistic Regression, Random Forests, XGBoost, Cross-Validation.</td>
            </tr>
            <tr>
              <td><strong>6. Deployment &amp; Storytelling</strong></td>
              <td>Deliver insights to stakeholders</td>
              <td>FastAPI endpoints, Streamlit dashboards, executive presentations.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>4. Role Comparison: Who Does What?</h2>
      <div class="dsde-table-wrapper">
        <table class="dsde-concept-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Primary Focus</th>
              <th>Key Tools</th>
              <th>Typical Question Answered</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Data Analyst (DA)</strong></td>
              <td>Historical trends &amp; reporting</td>
              <td>SQL, Excel, Tableau, Power BI</td>
              <td><em>"What happened last month, and why did sales drop?"</em></td>
            </tr>
            <tr>
              <td><strong>Data Scientist (DS)</strong></td>
              <td>Experimentation, stats, prototyping</td>
              <td>Python, R, Pandas, Scikit-learn, Jupyter</td>
              <td><em>"Which customers are likely to cancel next month?"</em></td>
            </tr>
            <tr>
              <td><strong>Data Engineer (DE)</strong></td>
              <td>Pipelines, warehouses, reliability</td>
              <td>SQL, Airflow, Spark, Kafka, AWS, Docker</td>
              <td><em>"How do we move 10 TB of clickstream data reliably every hour?"</em></td>
            </tr>
            <tr>
              <td><strong>ML Engineer (MLE)</strong></td>
              <td>Productionizing ML models at scale</td>
              <td>PyTorch, Docker, Kubernetes, Triton, CI/CD</td>
              <td><em>"How do we serve 10,000 predictions per second with &lt;20ms latency?"</em></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>5. Structured vs Unstructured Data</h2>
      <ul>
        <li><strong>Structured Data:</strong> Highly organized in rows and columns with fixed schemas (e.g. relational SQL databases, spreadsheets). Easiest to query and analyze directly.</li>
        <li><strong>Semi-Structured Data:</strong> Contains tags or key-value markers but lacks rigid schema (e.g. JSON payloads, XML, NoSQL documents).</li>
        <li><strong>Unstructured Data:</strong> Has no predefined data model (e.g. audio recordings, video files, customer support phone calls, PDF documents, raw text). Accounts for ~80% of all data generated worldwide.</li>
      </ul>

      <h2>6. Types of Quantitative &amp; Qualitative Data</h2>
      <div class="dsde-table-wrapper">
        <table class="dsde-concept-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Subtype</th>
              <th>Definition</th>
              <th>Real-World Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Qualitative (Categorical)</strong></td>
              <td>Nominal</td>
              <td>Categories without natural mathematical order</td>
              <td>Blood type (A, B, AB, O), City of residence, Colors</td>
            </tr>
            <tr>
              <td><strong>Qualitative (Categorical)</strong></td>
              <td>Ordinal</td>
              <td>Categories with an innate rank or sequence</td>
              <td>Education level (High School &lt; BS &lt; MS &lt; PhD), Star ratings (1 to 5)</td>
            </tr>
            <tr>
              <td><strong>Quantitative (Numerical)</strong></td>
              <td>Discrete</td>
              <td>Countable integer values (cannot take fractions)</td>
              <td>Number of students in a classroom, number of website clicks</td>
            </tr>
            <tr>
              <td><strong>Quantitative (Numerical)</strong></td>
              <td>Continuous</td>
              <td>Measurable values that can take any value in a range</td>
              <td>Temperature (98.6°F), Height (178.4 cm), House price</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>7. Common Mistakes Beginners Make</h2>
      <div class="dsde-card-warning">
        <strong>Common Pitfall: Jumping straight into Complex Machine Learning!</strong><br>
        Beginners often think Data Science means immediately applying Deep Learning or Neural Networks to every problem. In industry, 80% of the value comes from high-quality data cleaning, smart feature engineering, and simple, interpretable statistical models (like logistic regression). Always master EDA and data prep before complex algorithms.
      </div>

      <h2>8. Interview Questions &amp; Answers</h2>
      <div class="dsde-qa-card">
        <div class="dsde-qa-question" onclick="this.parentElement.classList.toggle('open')">
          <span>Q1: What is the difference between Data Science and Business Intelligence (BI)?</span>
          <span>+</span>
        </div>
        <div class="dsde-qa-answer">
          <strong>Business Intelligence (BI)</strong> is backward-looking: it inspects historical and current data to track metrics, diagnose past failures, and display dashboards. <strong>Data Science</strong> is forward-looking and exploratory: it builds probabilistic models to forecast future events, discover unknown correlations, and automate decisions.
        </div>
      </div>
      <div class="dsde-qa-card">
        <div class="dsde-qa-question" onclick="this.parentElement.classList.toggle('open')">
          <span>Q2: What is the CRISP-DM methodology?</span>
          <span>+</span>
        </div>
        <div class="dsde-qa-answer">
          CRISP-DM stands for <em>Cross-Industry Standard Process for Data Mining</em>. It is an industry-standard 6-phase iterative workflow: Business Understanding → Data Understanding → Data Preparation → Modeling → Evaluation → Deployment.
        </div>
      </div>

      <h2>9. Practical Exercise</h2>
      <p>Look at your favorite mobile app (such as Spotify, YouTube, or Uber). Write down 3 examples of structured data they collect from your phone, and 2 examples of unstructured data. Then write a 1-sentence hypothesis of how their data science team uses that data to improve retention.</p>
    `
  },

  // =========================================================================
  // TOPIC 2: MATHEMATICS FOR DATA SCIENCE
  // =========================================================================
  {
    id: "mathematics-for-data-science",
    track: "ds",
    title: "Mathematics for Data Science: Linear Algebra, Calculus & Algebra",
    category: "Math & Statistics",
    categoryNumber: 2,
    difficulty: "Beginner",
    readTime: "15 min",
    summary: "Master the foundational mathematics powering machine learning: vectors, matrices, dot products, matrix multiplication, logarithms, derivatives, and gradients.",
    content: `
      <h2>1. Why Mathematics Matters in Data Science</h2>
      <p>To a computer, a dataset is not a spreadsheet with words; it is a <strong>Matrix of Numbers</strong>. An image is a 3D matrix of pixel brightness values, text is a sequence of high-dimensional vectors (embeddings), and model training is the process of finding the slope (derivative) of a loss function to minimize mistakes.</p>

      <h2>2. Linear Algebra: Vectors and Matrices</h2>
      <p>A <strong>Vector</strong> is an ordered list of numbers. In Data Science, one vector usually represents a single observation (e.g. one house with features: square footage, bedrooms, age):</p>
      <div class="math-block">\\[ \\mathbf{x} = \\begin{bmatrix} 1800 \\\\ 3 \\\\ 12 \\end{bmatrix} \\]</div>
      <p>A <strong>Matrix</strong> is a 2D rectangular grid of numbers. An entire dataset with $n$ samples and $p$ features is represented as an $n \\times p$ design matrix $\\mathbf{X}$:</p>
      <div class="math-block">\\[ \\mathbf{X} = \\begin{bmatrix} 1800 & 3 & 12 \\\\ 2400 & 4 & 5 \\\\ 950 & 2 & 25 \\end{bmatrix} \\]</div>

      <h2>3. The Dot Product (Inner Product)</h2>
      <p>The <strong>Dot Product</strong> multiplies matching elements of two vectors and sums them up into a single scalar number. It measures how much two vectors point in the same direction:</p>
      <div class="math-block">\\[ \\mathbf{a} \\cdot \\mathbf{b} = \\sum_{i=1}^{n} a_i b_i = a_1 b_1 + a_2 b_2 + \\dots + a_n b_n \\]</div>

      <div class="dsde-card-tip">
        <strong>Linear Model Formula:</strong> Every linear regression or single neural network layer is simply a dot product of a weight vector $\\mathbf{w}$ and feature vector $\\mathbf{x}$ plus bias $b$:
        \\[ \\hat{y} = \\mathbf{w}^T \\mathbf{x} + b = w_1 x_1 + w_2 x_2 + \\dots + w_n x_n + b \\]
      </div>

      <h2>4. Matrix Multiplication</h2>
      <p>To multiply matrix $\\mathbf{A}$ ($m \\times k$) by matrix $\\mathbf{B}$ ($k \\times n$), the number of columns in $\\mathbf{A}$ must equal the number of rows in $\\mathbf{B}$. The resulting matrix $\\mathbf{C}$ has shape $m \\times n$:</p>
      <div class="math-block">\\[ C_{ij} = \\sum_{r=1}^{k} A_{ir} B_{rj} \\]</div>

      <h2>5. Calculus: Derivatives and Gradient Descent</h2>
      <p>A <strong>Derivative</strong> measures the rate of change of a function. If you take a tiny step forward in $x$, how much does $y$ change?</p>
      <div class="math-block">\\[ \\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} \\]</div>
      <p>In Machine Learning, we have a <strong>Loss Function</strong> $J(\\mathbf{w})$ that tells us how wrong our model is. We calculate the partial derivatives with respect to each weight—this vector of partial derivatives is called the <strong>Gradient</strong> $\\nabla J$:</p>
      <div class="math-block">\\[ \\mathbf{w}_{\\text{new}} = \\mathbf{w}_{\\text{old}} - \\alpha \\nabla J(\\mathbf{w}) \\]</div>
      <p>where $\\alpha$ is the learning rate (step size).</p>

      <h2>6. Python Code Example: Matrix Math in Pure Python &amp; NumPy</h2>
      <pre class="dsde-code-pre">
import numpy as np

# Create two vectors
v1 = np.array([2, 4, 6])
v2 = np.array([1, 3, 5])

# Vector Dot Product: (2*1) + (4*3) + (6*5) = 2 + 12 + 30 = 44
dot_result = np.dot(v1, v2)
print("Dot Product:", dot_result)

# Matrix Multiplication
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
matrix_mult = np.matmul(A, B)
print("Matrix Multiplication:\\n", matrix_mult)
      </pre>
      <div class="dsde-output-pre">
Dot Product: 44
Matrix Multiplication:
 [[19 22]
 [43 50]]
      </div>

      <h2>7. Common Mistakes Beginners Make</h2>
      <div class="dsde-card-warning">
        <strong>Common Pitfall: Dimension Mismatch in Matrix Multiplication!</strong><br>
        Trying to compute <code>A @ B</code> when <code>A.shape[1] != B.shape[0]</code> results in a <code>ValueError: matmul: Input operand 1 has a mismatch in its core dimension</code>. Always check shapes with <code>A.shape</code> and <code>B.shape</code> and use transpose <code>B.T</code> when appropriate.
      </div>

      <h2>8. Interview Questions &amp; Answers</h2>
      <div class="dsde-qa-card">
        <div class="dsde-qa-question" onclick="this.parentElement.classList.toggle('open')">
          <span>Q1: What is the geometric interpretation of a zero dot product between two non-zero vectors?</span>
          <span>+</span>
        </div>
        <div class="dsde-qa-answer">
          When $\\mathbf{a} \\cdot \\mathbf{b} = 0$ for non-zero vectors, they are <strong>orthogonal (perpendicular)</strong> at a 90-degree angle. This means there is zero linear correlation between the two features.
        </div>
      </div>
      <div class="dsde-qa-card">
        <div class="dsde-qa-question" onclick="this.parentElement.classList.toggle('open')">
          <span>Q2: Why do we use Logarithms in Data Science loss functions?</span>
          <span>+</span>
        </div>
        <div class="dsde-qa-answer">
          1. <strong>Numerical Stability:</strong> Multiplying many small probabilities (e.g. $0.001 \\times 0.002$) causes floating-point arithmetic underflow. Converting to logs turns multiplication into addition: $\\log(a \\cdot b) = \\log a + \\log b$.<br>
          2. <strong>Penalizing Confident Mistakes:</b> In Log-Loss (Binary Cross-Entropy), if the true label is 1 and the model predicts 0.01, $-\\log(0.01) \\approx 4.6$, delivering a severe penalty.
        </div>
      </div>
    `
  },

  // =========================================================================
  // TOPIC 3: STATISTICS FOR DATA SCIENCE
  // =========================================================================
  {
    id: "statistics-for-data-science",
    track: "ds",
    title: "Statistics for Data Science: Descriptive, Distributions & Hypothesis Testing",
    category: "Math & Statistics",
    categoryNumber: 2,
    difficulty: "Beginner",
    readTime: "18 min",
    summary: "From Mean and Variance to Central Limit Theorem, P-Values, Confidence Intervals, Z-tests, T-tests, ANOVA, and A/B Testing.",
    content: `
      <h2>1. The Two Pillars of Statistics</h2>
      <ul>
        <li><strong>Descriptive Statistics:</strong> Summarizes and describes properties of an observed sample (Mean, Median, Standard Deviation, Quartiles).</li>
        <li><strong>Inferential Statistics:</strong> Uses sample data to draw conclusions and test hypotheses about an entire unobserved population (Hypothesis testing, Confidence intervals, P-values).</li>
      </ul>

      <h2>2. Measures of Central Tendency &amp; Spread</h2>
      <div class="dsde-table-wrapper">
        <table class="dsde-concept-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Formula</th>
              <th>When to Use / Sensitivity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Mean</strong> (Average)</td>
              <td>$\\bar{x} = \\frac{1}{n} \\sum x_i$</td>
              <td>Symmetric data without heavy outliers. Extremely sensitive to extreme values.</td>
            </tr>
            <tr>
              <td><strong>Median</strong> (Middle)</td>
              <td>Middle value of sorted array</td>
              <td>Skewed distributions (e.g. salaries, house prices). Robust to extreme outliers.</td>
            </tr>
            <tr>
              <td><strong>Variance</strong></td>
              <td>$s^2 = \\frac{1}{n-1} \\sum (x_i - \\bar{x})^2$</td>
              <td>Average squared dispersion from the mean. Expressed in squared units.</td>
            </tr>
            <tr>
              <td><strong>Standard Deviation</strong></td>
              <td>$s = \\sqrt{s^2}$</td>
              <td>Average distance from the mean. Expressed in same unit as the original data.</td>
            </tr>
            <tr>
              <td><strong>Interquartile Range (IQR)</strong></td>
              <td>$\\text{IQR} = Q_3 - Q_1$</td>
              <td>Spread of the middle 50% of the data. Foundation of box plots and outlier clipping.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>3. Probability Distributions</h2>
      <ul>
        <li><strong>Normal (Gaussian) Distribution:</strong> Bell-shaped, symmetric curve defined by mean $\\mu$ and standard deviation $\\sigma$. Governed by the <em>Empirical Rule (68-95-99.7)</em>:
          <ul>
            <li>68.2% of data falls within $\\mu \\pm 1\\sigma$</li>
            <li>95.4% of data falls within $\\mu \\pm 2\\sigma$</li>
            <li>99.7% of data falls within $\\mu \\pm 3\\sigma$</li>
          </ul>
        </li>
        <li><strong>Binomial Distribution:</strong> Models the number of successes in $n$ independent yes/no trials with constant probability $p$ (e.g. coin flips, email click-throughs).</li>
        <li><strong>Poisson Distribution:</strong> Models the count of events occurring within a fixed time interval or area (e.g. website visits per minute, hospital emergency room arrivals per hour).</li>
      </ul>

      <h2>4. Central Limit Theorem (CLT)</h2>
      <p>The <strong>Central Limit Theorem</strong> states that if you take sufficiently large random samples ($n \\ge 30$) from <em>any</em> population distribution (even heavily skewed or uniform distributions), the distribution of the sample means will approximate a <strong>Normal Distribution</strong>!</p>
      <div class="dsde-card-tip">
        <strong>Why CLT is Magic:</strong> It allows data scientists to compute confidence intervals and conduct hypothesis tests on real-world populations even when the underlying data is not normally distributed.
      </div>

      <h2>5. Hypothesis Testing &amp; P-Values</h2>
      <p>Hypothesis testing is a structured scientific method to test whether an observed effect is real or simply due to random luck:</p>
      <ol>
        <li><strong>Null Hypothesis ($H_0$):</strong> Status quo. There is <em>no difference</em> or no effect (e.g., New button color has no impact on signup rate).</li>
        <li><strong>Alternative Hypothesis ($H_1$):</strong> The claim we want to prove. There <em>is a significant difference</em>.</li>
        <li><strong>P-value:</strong> The probability of observing results as extreme as ours <em>assuming the Null Hypothesis is completely true</em>.</li>
        <li><strong>Significance Level ($\\alpha$):</strong> Threshold, conventionally 0.05 (5%). If $\\text{P-value} &lt; 0.05$, we <strong>reject $H_0$</strong> and declare the discovery statistically significant.</li>
      </ol>

      <h2>6. Python Code Example: T-Test for A/B Testing</h2>
      <pre class="dsde-code-pre">
import numpy as np
from scipy import stats

# Simulated checkout conversion time in seconds
group_A = np.array([45.2, 42.1, 48.0, 46.5, 43.8, 47.2, 44.9, 46.1]) # Control
group_B = np.array([39.1, 41.0, 38.5, 42.2, 40.1, 39.8, 41.5, 38.9]) # Treatment (New UI)

# Two-sample independent t-test
t_stat, p_val = stats.ttest_ind(group_A, group_B)

print(f"Group A Mean: {group_A.mean():.2f}s")
print(f"Group B Mean: {group_B.mean():.2f}s")
print(f"T-statistic: {t_stat:.4f}")
print(f"P-value: {p_val:.6f}")

if p_val &lt; 0.05:
    print("Decision: Reject H0! New UI significantly speeds up checkout.")
else:
    print("Decision: Fail to reject H0. Difference is not statistically significant.")
      </pre>
      <div class="dsde-output-pre">
Group A Mean: 45.48s
Group B Mean: 40.14s
T-statistic: 6.5492
P-value: 0.000012
Decision: Reject H0! New UI significantly speeds up checkout.
      </div>

      <h2>7. Common Mistakes Beginners Make</h2>
      <div class="dsde-card-warning">
        <strong>Common Pitfall: P-Hacking &amp; Confusing Correlation with Causation!</strong><br>
        1. <strong>Correlation $\\neq$ Causation:</strong> Ice cream sales and drowning rates both spike in summer; eating ice cream does not cause drowning. Both are driven by temperature (confounding variable).<br>
        2. <strong>P-Hacking:</strong> Slicing data repeatedly across 50 different filters until one subsegment hits $p &lt; 0.05$ purely by random chance.
      </div>
    `
  },

  // =========================================================================
  // TOPIC 4: PYTHON FOR DATA SCIENCE
  // =========================================================================
  {
    id: "python-for-data-science",
    track: "ds",
    title: "Python for Data Science: Fundamentals to Advanced",
    category: "Programming & Tools",
    categoryNumber: 3,
    difficulty: "Beginner",
    readTime: "15 min",
    summary: "Essential Python syntax, data structures (lists, dicts, sets), comprehensions, lambda functions, file I/O, error handling, and API requests for data science workflows.",
    content: `
      <h2>1. Why Python Dominates Data Science</h2>
      <p>Python is the undisputed lingua franca of data science and artificial intelligence because of its readable English-like syntax, immense open-source ecosystem (NumPy, Pandas, Scikit-learn, PyTorch), and rapid prototyping speed.</p>

      <h2>2. Core Data Structures for Data Manipulation</h2>
      <ul>
        <li><strong>Lists:</strong> Ordered, mutable sequences <code>[10, 20, 30]</code>. Ideal for sequential records.</li>
        <li><strong>Dictionaries:</strong> Key-value hash maps <code>{"name": "Alice", "score": 95}</code>. The foundation of JSON APIs and record representation.</li>
        <li><strong>Sets:</strong> Unordered collections of unique elements <code>{1, 2, 3}</code>. Ideal for deduplication and set membership tests in $O(1)$ time.</li>
        <li><strong>Tuples:</strong> Immutable sequences <code>(1920, 1080)</code>. Used for fixed coordinates and DataFrame shapes.</li>
      </ul>

      <h2>3. List Comprehensions &amp; Lambda Functions</h2>
      <p>Data scientists write concise, vectorized transformations using list comprehensions and anonymous lambda functions:</p>
      <pre class="dsde-code-pre">
# List comprehension: Filter even numbers and square them
raw_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squared_evens = [x**2 for x in raw_numbers if x % 2 == 0]
print("Squared Evens:", squared_evens)

# Lambda function with map: Add 10% tax to prices
prices = [100.0, 250.0, 49.99]
taxed = list(map(lambda p: round(p * 1.10, 2), prices))
print("Taxed Prices:", taxed)
      </pre>
      <div class="dsde-output-pre">
Squared Evens: [4, 16, 36, 64, 100]
Taxed Prices: [110.0, 275.0, 54.99]
      </div>

      <h2>4. Safe File Handling &amp; JSON Parsing</h2>
      <pre class="dsde-code-pre">
import json

# Writing structured dictionary to JSON file
data = {
    "project": "MLForge",
    "tracks": ["Data Science", "Data Engineering"],
    "metrics": {"accuracy": 0.942, "latency_ms": 12.5}
}

with open("model_metadata.json", "w") as f:
    json.dump(data, f, indent=2)

# Reading back JSON safely
with open("model_metadata.json", "r") as f:
    loaded_data = json.load(f)

print("Loaded Accuracy:", loaded_data["metrics"]["accuracy"])
      </pre>

      <h2>5. Best Practices for Production Python</h2>
      <ul>
        <li><strong>Always use Virtual Environments:</strong> Isolate packages using <code>python -m venv .venv</code>.</li>
        <li><strong>Leverage Type Hints:</strong> E.g. <code>def clean_text(text: str) -&gt; str:</code> makes code self-documenting.</li>
        <li><strong>Handle Exceptions Gracefully:</strong> Wrap API calls and file operations in <code>try ... except Exception as e:</code> blocks.</li>
      </ul>
    `
  },

  // =========================================================================
  // TOPIC 5: NUMPY MASTERCLASS
  // =========================================================================
  {
    id: "numpy-masterclass",
    track: "ds",
    title: "NumPy: High-Performance Numerical Computing",
    category: "Data Science Libraries",
    categoryNumber: 3,
    difficulty: "Beginner",
    readTime: "16 min",
    summary: "Master ndarrays, vectorization, broadcasting rules, indexing, slicing, reshaping, matrix operations, and random number generation.",
    content: `
      <h2>1. What is NumPy and Why is it 50x Faster than Python Lists?</h2>
      <p>Python lists store pointers to objects scattered across memory, causing significant CPU cache-miss overhead. A NumPy <code>ndarray</code> stores data as a <strong>contiguous block of raw memory</strong> with a single uniform data type (e.g. <code>float64</code>), executed via compiled C routines and SIMD CPU vector registers.</p>

      <h2>2. Array Creation &amp; Dimensionality</h2>
      <pre class="dsde-code-pre">
import numpy as np

# 1D Array (Vector)
a = np.array([1, 2, 3, 4, 5])

# 2D Array (Matrix of shape 3x3)
grid = np.zeros((3, 3), dtype=np.float32)

# Sequence generation &amp; linearly spaced numbers
seq = np.arange(0, 10, 2)         # [0, 2, 4, 6, 8]
coords = np.linspace(0, 1, 5)     # [0.0, 0.25, 0.5, 0.75, 1.0]

print("Array Shape:", grid.shape)
print("Data Type:", grid.dtype)
print("Linspace:", coords)
      </pre>

      <h2>3. Broadcasting: The Superpower of NumPy</h2>
      <p><strong>Broadcasting</strong> is NumPy's ability to perform arithmetic operations on arrays with different shapes without making unnecessary memory copies:</p>
      <div class="dsde-card-tip">
        <strong>The Broadcasting Rule:</strong> Two dimensions are compatible when:
        <ol>
          <li>They are equal, OR</li>
          <li>One of them is 1.</li>
        </ol>
      </div>
      <pre class="dsde-code-pre">
# Matrix of shape (3, 3)
matrix = np.array([
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
])

# Vector of shape (3,) broadcasted across all rows!
offset = np.array([1, 2, 3])

result = matrix + offset
print("Broadcasted Result:\\n", result)
      </pre>
      <div class="dsde-output-pre">
Broadcasted Result:
 [[11 22 33]
 [41 52 63]
 [71 82 93]]
      </div>

      <h2>4. Boolean Masking &amp; Filtering</h2>
      <pre class="dsde-code-pre">
scores = np.array([88, 42, 95, 61, 73, 34, 99])

# Boolean mask
passing_mask = scores &gt;= 60
print("Passing Mask:", passing_mask)

# Filter scores using mask
passing_scores = scores[passing_mask]
print("Passing Scores:", passing_scores)

# Vectorized conditional replacement (np.where)
status = np.where(scores &gt;= 60, "Pass", "Fail")
print("Status:", status)
      </pre>
    `
  },

  // =========================================================================
  // TOPIC 6: PANDAS MASTERCLASS
  // =========================================================================
  {
    id: "pandas-masterclass",
    track: "ds",
    title: "Pandas: Data Wrangling, Cleaning & Transformation",
    category: "Data Science Libraries",
    categoryNumber: 3,
    difficulty: "Beginner",
    readTime: "20 min",
    summary: "Master DataFrames, Series, CSV/Excel/JSON loading, indexing with loc/iloc, missing value imputation, GroupBy aggregations, merging, pivoting, and date-time operations.",
    content: `
      <h2>1. Introduction to Pandas</h2>
      <p><strong>Pandas</strong> is the premier data analysis library for Python. It provides fast, flexible, and expressive data structures designed to make working with structured (tabular) and time-series data intuitive and effortless.</p>

      <h2>2. Series vs DataFrame</h2>
      <ul>
        <li><strong>Series:</strong> A 1D labeled array capable of holding any data type (e.g. one column of a table).</li>
        <li><strong>DataFrame:</strong> A 2D labeled tabular data structure with columns of potentially different types (like an Excel sheet or SQL table).</li>
      </ul>

      <h2>3. Practical Data Wrangling Workflow</h2>
      <pre class="dsde-code-pre">
import pandas as pd
import numpy as np

# Create sample customer DataFrame
raw_data = {
    "customer_id": [101, 102, 103, 104, 105, 105],
    "city": ["New York", "London", "New York", np.nan, "Tokyo", "Tokyo"],
    "spend": [150.50, 230.00, np.nan, 85.20, 420.00, 420.00],
    "signup_date": ["2023-01-15", "2023-03-22", "2023-02-10", "2023-04-05", "2023-01-30", "2023-01-30"]
}

df = pd.DataFrame(raw_data)
print("--- Raw DataFrame ---")
print(df)

# Step 1: Remove duplicate rows
df = df.drop_duplicates()

# Step 2: Handle missing values
df["city"] = df["city"].fillna("Unknown")
df["spend"] = df["spend"].fillna(df["spend"].median())

# Step 3: Convert date strings to datetime objects
df["signup_date"] = pd.to_datetime(df["signup_date"])

# Step 4: Feature engineering: Add spending category
df["tier"] = df["spend"].apply(lambda x: "High" if x &gt;= 200 else "Standard")

print("\\n--- Cleaned DataFrame ---")
print(df)
      </pre>

      <h2>4. GroupBy &amp; Multi-Metric Aggregations</h2>
      <pre class="dsde-code-pre">
# Grouping by city and calculating multiple summary statistics
city_summary = df.groupby("city").agg(
    total_revenue=("spend", "sum"),
    average_spend=("spend", "mean"),
    customer_count=("customer_id", "count")
).reset_index()

print("\\n--- City Revenue Summary ---")
print(city_summary)
      </pre>

      <h2>5. Merging &amp; Joining Tables</h2>
      <p>Pandas supports relational database joins (<code>inner</code>, <code>left</code>, <code>right</code>, <code>outer</code>) using <code>pd.merge()</code>:</p>
      <pre class="dsde-code-pre">
orders = pd.DataFrame({
    "customer_id": [101, 102, 104],
    "product": ["Laptop", "Monitor", "Keyboard"]
})

merged_df = pd.merge(df, orders, on="customer_id", how="left")
print("\\n--- Merged Orders ---")
print(merged_df[["customer_id", "city", "spend", "product"]])
      </pre>
    `
  },

  // =========================================================================
  // TOPIC 7: DATA COLLECTION & ACQUISITION
  // =========================================================================
  {
    id: "data-collection-acquisition",
    track: "ds",
    title: "Data Collection & Acquisition: APIs, Web Scraping & Public Datasets",
    category: "Data Collection",
    categoryNumber: 4,
    difficulty: "Intermediate",
    readTime: "14 min",
    summary: "Discover primary vs secondary data collection, REST APIs with Python Requests, Web Scraping with BeautifulSoup and Selenium, database queries, and data collection ethics.",
    content: `
      <h2>1. How Data is Collected in the Real World</h2>
      <p>Data rarely arrives on your desk neatly packaged in a single CSV file. Data scientists gather information from diverse primary and secondary sources:</p>
      <ul>
        <li><strong>Primary Data:</strong> Data collected firsthand by your organization (e.g. app event logging, sensor readings, survey questionnaires).</li>
        <li><strong>Secondary Data:</strong> Data collected by external third parties (e.g. government censuses, public Kaggle datasets, partner REST APIs, scraped web pages).</li>
      </ul>

      <h2>2. Collecting Data from REST APIs</h2>
      <p>REST APIs return clean, structured JSON data via HTTP requests (<code>GET</code>, <code>POST</code>):</p>
      <pre class="dsde-code-pre">
import requests

# Querying a public REST API
url = "https://api.github.com/repos/pallets/flask"
response = requests.get(url, timeout=10)

if response.status_code == 200:
    data = response.json()
    print("Repository:", data.get("name"))
    print("Stars:", data.get("stargazers_count"))
    print("Forks:", data.get("forks_count"))
    print("Open Issues:", data.get("open_issues_count"))
else:
    print("API Error:", response.status_code)
      </pre>

      <h2>3. Web Scraping with BeautifulSoup</h2>
      <pre class="dsde-code-pre">
from bs4 import BeautifulSoup

html_doc = """
&lt;div class="product-catalog"&gt;
  &lt;div class="item"&gt;&lt;h3&gt;Wireless Mouse&lt;/h3&gt;&lt;span class="price"&gt;$29.99&lt;/span&gt;&lt;/div&gt;
  &lt;div class="item"&gt;&lt;h3&gt;Mechanical Keyboard&lt;/h3&gt;&lt;span class="price"&gt;$89.50&lt;/span&gt;&lt;/div&gt;
&lt;/div&gt;
"""

soup = BeautifulSoup(html_doc, "html.parser")
items = []

for item in soup.find_all("div", class_="item"):
    title = item.find("h3").text
    price = float(item.find("span", class_="price").text.replace("$", ""))
    items.append({"title": title, "price": price})

print("Scraped Items:", items)
      </pre>

      <h2>4. Data Scraping Ethics &amp; Legal Compliance</h2>
      <div class="dsde-card-warning">
        <strong>Scraping Golden Rules:</strong><br>
        1. Always check <code>robots.txt</code> (e.g. <code>example.com/robots.txt</code>) to see which paths are disallowed.<br>
        2. Never overload servers: add rate-limiting delays (<code>time.sleep(1)</code>).<br>
        3. Respect copyright and privacy regulations (GDPR, CCPA): never scrape personally identifiable information (PII) without explicit consent.
      </div>
    `
  },

  // =========================================================================
  // TOPIC 8: DATA CLEANING & PREPROCESSING
  // =========================================================================
  {
    id: "data-cleaning-preprocessing",
    track: "ds",
    title: "Data Cleaning, Outlier Detection & Feature Preprocessing",
    category: "Data Preparation",
    categoryNumber: 4,
    difficulty: "Intermediate",
    readTime: "18 min",
    summary: "Transform messy real-world data into clean features: missing value strategies, IQR outlier detection, One-Hot vs Label encoding, scaling, and preventing data leakage.",
    content: `
      <h2>1. Why Data Cleaning Consumes 80% of a Data Scientist's Time</h2>
      <p><em>"Garbage in, garbage out."</em> Even the most advanced neural network will learn flawed correlations if fed noisy, uncleaned, or leaky data. Proper cleaning ensures model validity and generalization.</p>

      <h2>2. Handling Missing Values</h2>
      <div class="dsde-table-wrapper">
        <table class="dsde-concept-table">
          <thead>
            <tr>
              <th>Strategy</th>
              <th>Best Used When</th>
              <th>Risks / Trade-offs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Drop Rows (dropna)</strong></td>
              <td>Missing completely at random, &lt;3% of rows</td>
              <td>Loss of training data and statistical power.</td>
            </tr>
            <tr>
              <td><strong>Mean / Median Imputation</strong></td>
              <td>Numerical features with random missingness</td>
              <td>Reduces variance; median preferred if outliers exist.</td>
            </tr>
            <tr>
              <td><strong>Mode Imputation</strong></td>
              <td>Categorical features with high frequency</td>
              <td>Can over-amplify dominant categories.</td>
            </tr>
            <tr>
              <td><strong>KNN / MICE Imputation</strong></td>
              <td>Complex datasets with correlated features</td>
              <td>Computationally expensive on large data.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>3. Outlier Detection with IQR (Interquartile Range)</h2>
      <p>Data points falling beyond 1.5 times the IQR from the first or third quartile are statistical outliers:</p>
      <div class="math-block">\\[ \\text{Lower Bound} = Q_1 - 1.5 \\times \\text{IQR}, \\quad \\text{Upper Bound} = Q_3 + 1.5 \\times \\text{IQR} \\]</div>
      <pre class="dsde-code-pre">
import numpy as np

data = np.array([12, 14, 15, 18, 19, 21, 22, 24, 25, 28, 95]) # 95 is a massive outlier

q1 = np.percentile(data, 25)
q3 = np.percentile(data, 75)
iqr = q3 - q1

lower = q1 - 1.5 * iqr
upper = q3 + 1.5 * iqr

clean_data = data[(data &gt;= lower) &amp; (data &lt;= upper)]
outliers = data[(data &lt; lower) | (data &gt; upper)]

print(f"IQR: {iqr}, Bounds: [{lower}, {upper}]")
print("Detected Outliers:", outliers)
print("Clean Data:", clean_data)
      </pre>

      <h2>4. Feature Scaling: Normalization vs Standardization</h2>
      <ul>
        <li><strong>Standardization (Z-score):</strong> Rescales data to mean 0 and standard deviation 1:
          \\[ z = \\frac{x - \\mu}{\\sigma} \\]
          Ideal for algorithms assuming normal distribution (Linear/Logistic Regression, PCA, SVM).
        </li>
        <li><strong>Min-Max Normalization:</strong> Scales data into fixed range $[0, 1]$:
          \\[ x_{\\text{norm}} = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}} \\]
          Ideal for algorithms sensitive to magnitudes without normal assumptions (KNN, Neural Networks).
        </li>
      </ul>

      <h2>5. Preventing Data Leakage</h2>
      <div class="dsde-card-warning">
        <strong>Critical Concept: Data Leakage!</strong><br>
        Never fit scalers or imputers on the entire dataset before splitting! Doing so leaks information from the test set into the training set, causing overly optimistic validation metrics that collapse in production. Always split into train/test <strong>first</strong>, call <code>scaler.fit(X_train)</code>, and then <code>scaler.transform(X_test)</code>.
      </div>
    `
  },

  // =========================================================================
  // TOPIC 9: EXPLORATORY DATA ANALYSIS (EDA)
  // =========================================================================
  {
    id: "exploratory-data-analysis",
    track: "ds",
    title: "Exploratory Data Analysis (EDA): Univariate, Bivariate & Multivariate",
    category: "Exploration & Visuals",
    categoryNumber: 5,
    difficulty: "Intermediate",
    readTime: "16 min",
    summary: "Systematic EDA framework: inspecting data shape and types, summary statistics, univariate distribution analysis, bivariate correlations, and multivariate interaction patterns.",
    content: `
      <h2>1. What is EDA and Why is it the Heart of Data Science?</h2>
      <p><strong>Exploratory Data Analysis (EDA)</strong> is an investigative approach pioneered by mathematician John Tukey. Before writing any machine learning models, you explore your data visually and quantitatively to detect errors, uncover anomalies, test hypotheses, and discover hidden relationships.</p>

      <h2>2. The 3 Levels of EDA</h2>
      <ol>
        <li><strong>Univariate Analysis:</strong> Inspecting one single variable at a time.
          <ul>
            <li>Numerical: Histograms, KDE plots, Box plots, skewness, kurtosis.</li>
            <li>Categorical: Frequency counts, bar charts, value_counts().</li>
          </ul>
        </li>
        <li><strong>Bivariate Analysis:</strong> Inspecting relationships between two variables.
          <ul>
            <li>Numerical vs Numerical: Scatter plots, Pearson correlation coefficients.</li>
            <li>Categorical vs Numerical: Grouped box plots, violin plots.</li>
            <li>Categorical vs Categorical: Cross-tabulations, chi-square tests.</li>
          </ul>
        </li>
        <li><strong>Multivariate Analysis:</strong> Inspecting interactions between 3 or more variables simultaneously (e.g. pairplots, correlation heatmaps, facet grids).</li>
      </ol>

      <h2>3. Complete Python EDA Script</h2>
      <pre class="dsde-code-pre">
import pandas as pd
import numpy as np

# Sample customer dataset
np.random.seed(42)
df = pd.DataFrame({
    "age": np.random.randint(20, 65, 100),
    "annual_income_k": np.random.normal(65, 15, 100).round(1),
    "spending_score": np.random.randint(1, 100, 100),
    "membership": np.random.choice(["Gold", "Silver", "Bronze"], 100)
})

# 1. Structural Inspection
print("--- Shape &amp; Types ---")
print(df.info())

# 2. Five-Number Summary
print("\\n--- Numerical Summary ---")
print(df.describe().T[["mean", "std", "min", "50%", "max"]])

# 3. Categorical Frequencies
print("\\n--- Membership Counts ---")
print(df["membership"].value_counts(normalize=True).round(3))

# 4. Correlation Matrix
print("\\n--- Correlation Matrix ---")
print(df[["age", "annual_income_k", "spending_score"]].corr().round(2))
      </pre>
    `
  },

  // =========================================================================
  // TOPIC 10: DATA VISUALIZATION & BUSINESS INTELLIGENCE
  // =========================================================================
  {
    id: "data-visualization-bi",
    track: "ds",
    title: "Data Visualization: Matplotlib, Seaborn, Plotly & BI Dashboards",
    category: "Exploration & Visuals",
    categoryNumber: 5,
    difficulty: "Beginner",
    readTime: "15 min",
    summary: "Craft impactful charts with Matplotlib, statistical graphics with Seaborn, interactive visualizers with Plotly, and business dashboards with Power BI / Tableau.",
    content: `
      <h2>1. Choosing the Right Chart for the Right Question</h2>
      <div class="dsde-table-wrapper">
        <table class="dsde-concept-table">
          <thead>
            <tr>
              <th>Analytical Goal</th>
              <th>Recommended Chart</th>
              <th>Python Tool</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Show change over time</td>
              <td>Line Chart</td>
              <td><code>plt.plot()</code> / <code>px.line()</code></td>
            </tr>
            <tr>
              <td>Compare categories</td>
              <td>Bar Chart</td>
              <td><code>sns.barplot()</code> / <code>px.bar()</code></td>
            </tr>
            <tr>
              <td>Inspect continuous distribution</td>
              <td>Histogram &amp; KDE</td>
              <td><code>sns.histplot(kde=True)</code></td>
            </tr>
            <tr>
              <td>Detect outliers and medians</td>
              <td>Box Plot / Violin Plot</td>
              <td><code>sns.boxplot()</code> / <code>sns.violinplot()</code></td>
            </tr>
            <tr>
              <td>Correlate two continuous variables</td>
              <td>Scatter Plot &amp; Regplot</td>
              <td><code>sns.scatterplot()</code> / <code>sns.regplot()</code></td>
            </tr>
            <tr>
              <td>Display feature correlation matrix</td>
              <td>Heatmap with Annotations</td>
              <td><code>sns.heatmap(annot=True)</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>2. Python Code: Publication-Ready Visualizations</h2>
      <pre class="dsde-code-pre">
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Set dark tech aesthetic matching MLForge
sns.set_theme(style="darkgrid")

x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(x, y1, label="Signal 1 (Sin)", color="#14b8a6", linewidth=2)
ax.plot(x, y2, label="Signal 2 (Cos)", color="#f97316", linewidth=2, linestyle="--")

ax.set_title("Dual Waveform Telemetry", fontsize=14, fontweight="bold")
ax.set_xlabel("Time (seconds)")
ax.set_ylabel("Amplitude")
ax.legend()
plt.tight_layout()
# In interactive notebooks: plt.show()
      </pre>

      <h2>3. Business Intelligence (BI): Power BI &amp; Tableau</h2>
      <p>While Python is ideal for custom models, enterprise stakeholders consume KPIs through BI platforms:</p>
      <ul>
        <li><strong>Power BI:</strong> Deep Microsoft ecosystem integration, DAX query formulas, rapid enterprise reporting.</li>
        <li><strong>Tableau:</strong> Drag-and-drop visual exploratory analytics, expressive dashboards, scalable server sharing.</li>
        <li><strong>Data Storytelling Rule:</strong> A dashboard should follow the <em>5-Second Rule</em>: an executive should understand the health of the business within 5 seconds of opening the page.</li>
      </ul>
    `
  },

  // =========================================================================
  // TOPIC 11: SQL FOR DATA SCIENCE
  // =========================================================================
  {
    id: "sql-for-data-science",
    track: "ds",
    title: "SQL for Data Science: Window Functions, CTEs & Aggregations",
    category: "SQL & Analytics",
    categoryNumber: 6,
    difficulty: "Intermediate",
    readTime: "15 min",
    summary: "Write production analytical SQL: window functions (ROW_NUMBER, RANK, LAG/LEAD), Common Table Expressions (CTEs), cohorts, and query optimization for data science.",
    content: `
      <h2>1. Why SQL is the Most Requested Data Science Skill</h2>
      <p>90% of business data lives inside relational data warehouses and SQL databases. Pulling raw dumps into Python is inefficient and slow; a skilled data scientist pushes heavy filtering, joining, and aggregation down to the database engine first.</p>

      <h2>2. Window Functions: Analytics without Collapsing Rows</h2>
      <p>Standard <code>GROUP BY</code> queries collapse rows. <strong>Window Functions</strong> perform calculations across a set of rows related to the current row while preserving every individual record:</p>
      <pre class="dsde-code-pre">
-- Calculate Running Total and 7-Day Moving Average of Sales
SELECT 
    order_date,
    amount,
    SUM(amount) OVER (ORDER BY order_date) AS running_total,
    AVG(amount) OVER (
        ORDER BY order_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7d
FROM daily_sales;
      </pre>

      <h2>3. Finding Top-N per Category with DENSE_RANK()</h2>
      <pre class="dsde-code-pre">
WITH RankedEmployees AS (
    SELECT 
        department,
        employee_name,
        salary,
        DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank_in_dept
    FROM employees
)
SELECT * 
FROM RankedEmployees
WHERE rank_in_dept &lt;= 3;
      </pre>

      <h2>4. Cohort Retention Analysis with LAG()</h2>
      <pre class="dsde-code-pre">
-- Measure days elapsed between consecutive user orders
SELECT 
    user_id,
    order_id,
    order_date,
    LAG(order_date, 1) OVER (PARTITION BY user_id ORDER BY order_date) as prev_order_date,
    order_date - LAG(order_date, 1) OVER (PARTITION BY user_id ORDER BY order_date) as days_since_last_order
FROM user_orders;
      </pre>
    `
  },

  // =========================================================================
  // TOPIC 12: ADVANCED DATA SCIENCE & MACHINE LEARNING
  // =========================================================================
  {
    id: "advanced-data-science",
    track: "ds",
    title: "Advanced Data Science: PCA, Time Series, A/B Testing & Causal Inference",
    category: "Advanced Data Science",
    categoryNumber: 7,
    difficulty: "Advanced",
    readTime: "20 min",
    summary: "Deep dive into Dimensionality Reduction (PCA), Time Series Forecasting (ARIMA, Seasonality), Bayesian Statistics, Causal Inference, and Recommendation Systems.",
    content: `
      <h2>1. Dimensionality Reduction: Principal Component Analysis (PCA)</h2>
      <p>When working with datasets with hundreds of features (curse of dimensionality), many features are redundant or correlated. <strong>PCA</strong> projects high-dimensional data onto orthogonal axes of maximal variance called <em>Principal Components</em>:</p>
      <pre class="dsde-code-pre">
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import numpy as np

# Sample high-dimensional dataset (100 samples, 10 features)
X = np.random.randn(100, 10)

# Always scale features before PCA!
X_scaled = StandardScaler().fit_transform(X)

pca = PCA(n_components=2)
X_reduced = pca.fit_transform(X_scaled)

print("Original Shape:", X.shape)
print("Reduced Shape:", X_reduced.shape)
print("Explained Variance Ratio:", pca.explained_variance_ratio_.round(3))
      </pre>

      <h2>2. Time Series Analysis &amp; Forecasting</h2>
      <p>Time series data has temporal dependency: observations at time $t$ depend on past observations. Key components:</p>
      <ul>
        <li><strong>Trend:</strong> Long-term upward or downward movement over years.</li>
        <li><strong>Seasonality:</strong> Repeating cycles at fixed calendar frequencies (e.g. retail surge every December).</li>
        <li><strong>Stationarity:</strong> A time series whose statistical properties (mean, variance) do not change over time. Most models (ARIMA) require stationarity achieved through differencing.</li>
      </ul>

      <h2>3. Causal Inference vs Predictive Correlation</h2>
      <div class="dsde-card-tip">
        <strong>The Fundamental Problem of Causal Inference:</strong> Machine learning answers <em>"What will happen?"</em>, while Causal Inference answers <em>"What would happen if we take action X?"</em> Techniques like Difference-in-Differences (DiD), Instrumental Variables, and Synthetic Controls allow data scientists to measure real causal business impact when randomized A/B tests are impossible.
      </div>
    `
  }
];
