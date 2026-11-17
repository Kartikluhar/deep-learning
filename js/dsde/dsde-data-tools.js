/**
 * MLForge Data Science Tools & Libraries Reference Database
 * Comprehensive guides for 15 essential data science tools with:
 * what it is, why used, where used, key features, install command, basic code example, and official doc links.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsde = window.MLForge.dsde || {};
window.MLForge.dsde.data = window.MLForge.dsde.data || {};

MLForge.dsde.data.tools = [
  {
    id: "jupyter",
    name: "Jupyter Notebook",
    category: "Development Environment",
    badge: "Interactive Notebook",
    iconColor: "#f37626",
    summary: "The open-source web application for creating and sharing documents containing live code, equations, visualizations, and narrative text.",
    whatIsIt: "Jupyter Notebook is an interactive web-based computational environment that combines code execution, rich text, mathematics, plots, and rich media into a single reproducible notebook document (.ipynb).",
    whyUsed: "Allows data scientists to run code cell-by-cell, view immediate visual and tabular outputs, and document thoughts and mathematical proofs alongside code.",
    whereUsed: "Used across all data science exploration, academic research, prototyping, and machine learning experimentation.",
    keyFeatures: [
      "Interactive cell-by-cell execution with persistent in-memory variables",
      "Rich markdown, LaTeX formula support, and inline charting",
      "Interactive widgets and progress bars",
      "Export to HTML, PDF, Markdown, and Python scripts"
    ],
    install: "pip install notebook",
    codeExample: `# Starting Jupyter in terminal:
# $ jupyter notebook

# Inside a notebook cell:
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
plt.plot(x, np.sin(x))
plt.title("Live Notebook Plot")
plt.show()`,
    docLink: "https://jupyter.org/documentation"
  },
  {
    id: "google-colab",
    name: "Google Colab",
    category: "Cloud Environment",
    badge: "Cloud GPU/TPU",
    iconColor: "#f9ab00",
    summary: "Hosted Jupyter notebook service that requires zero setup and provides free access to computing resources including GPUs and TPUs.",
    whatIsIt: "Google Colaboratory (Colab) is a cloud-hosted Jupyter environment provided by Google. It runs entirely in the browser with pre-installed machine learning libraries.",
    whyUsed: "Eliminates local setup friction and provides free access to powerful hardware accelerators (NVIDIA T4/A100 GPUs and Google TPUs) for deep learning training.",
    whereUsed: "Deep learning experimentation, university coursework, collaborative research, and hardware-intensive model training.",
    keyFeatures: [
      "Zero local installation required — runs in any modern browser",
      "Free access to cloud GPUs (T4) and TPUs",
      "Seamless integration with Google Drive and GitHub",
      "Real-time Google Docs-style collaboration and commenting"
    ],
    install: "No installation needed. Visit https://colab.research.google.com",
    codeExample: `# Verify GPU availability in Colab:
import torch
print("GPU Available:", torch.cuda.is_available())
if torch.cuda.is_available():
    print("Device Name:", torch.cuda.get_device_name(0))`,
    docLink: "https://colab.research.google.com"
  },
  {
    id: "vscode",
    name: "Visual Studio Code (VS Code)",
    category: "Development Environment",
    badge: "Code Editor",
    iconColor: "#007acc",
    summary: "The world's most popular code editor, supercharged with Python, Jupyter Notebook, and Git extensions for production data science.",
    whatIsIt: "VS Code is a lightweight, extensible source-code editor developed by Microsoft, supporting native Jupyter notebooks, debugging, linting, and remote server SSH connections.",
    whyUsed: "Bridges the gap between exploratory notebook prototyping and writing modular, production-ready Python packages, scripts, and unit tests.",
    whereUsed: "Production data science engineering, writing ETL pipelines, building APIs, and production software development.",
    keyFeatures: [
      "Native interactive Jupyter notebook editor inside the IDE",
      "IntelliSense intelligent code completions, linting, and type checking",
      "Built-in Git GUI and diff viewer",
      "Remote development via SSH and Docker Dev Containers"
    ],
    install: "Download from https://code.visualstudio.com, then install the 'Python' and 'Jupyter' extensions.",
    codeExample: `# Run Python script with interactive debugger:
def calculate_metrics(y_true, y_pred):
    accuracy = sum(t == p for t, p in zip(y_true, y_pred)) / len(y_true)
    return {"accuracy": round(accuracy, 4)}

if __name__ == "__main__":
    print(calculate_metrics([1, 0, 1, 1], [1, 0, 0, 1]))`,
    docLink: "https://code.visualstudio.com/docs/python/data-science-tutorial"
  },
  {
    id: "numpy",
    name: "NumPy",
    category: "Numerical Computing",
    badge: "Arrays & Math",
    iconColor: "#4dabcf",
    summary: "The fundamental package for scientific computing with Python, providing high-performance multidimensional arrays and math routines.",
    whatIsIt: "NumPy (Numerical Python) provides the N-dimensional array object (ndarray), sophisticated broadcasting functions, and compiled C routines for linear algebra, Fourier transform, and random numbers.",
    whyUsed: "50x to 100x faster than pure Python loops due to contiguous memory allocation and vectorized SIMD CPU operations.",
    whereUsed: "Core dependency underneath Pandas, SciPy, Scikit-learn, TensorFlow, and PyTorch.",
    keyFeatures: [
      "Homogeneous N-dimensional array (ndarray) data structure",
      "Element-wise vectorization and broadcasting",
      "Extensive linear algebra, matrix decomposition, and FFT functions",
      "C/C++ API for seamless hardware interop"
    ],
    install: "pip install numpy",
    codeExample: `import numpy as np

# Fast matrix multiplication
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
result = np.dot(A, B)
print("Dot Product:\\n", result)`,
    docLink: "https://numpy.org/doc/stable/"
  },
  {
    id: "pandas",
    name: "Pandas",
    category: "Data Wrangling",
    badge: "Tabular Data",
    iconColor: "#150458",
    summary: "Fast, powerful, flexible and easy to use open-source data analysis and manipulation tool built on top of the Python programming language.",
    whatIsIt: "Pandas provides Series and DataFrames designed for practical tabular and time-series data analysis with labeled axes and SQL-like grouping/merging.",
    whyUsed: "Turns hours of manual data cleaning and CSV parsing into a few expressive lines of code.",
    whereUsed: "Used across every industry for data ingestion, cleaning, feature engineering, and statistical aggregation.",
    keyFeatures: [
      "DataFrame object for data manipulation with integrated indexing",
      "Tools for reading and writing data between in-memory data structures and different formats (CSV, Excel, SQL, Parquet)",
      "High performance GroupBy engine for aggregation and transformations",
      "Intelligent data alignment and integrated handling of missing data"
    ],
    install: "pip install pandas",
    codeExample: `import pandas as pd

# Load CSV and perform immediate analysis
df = pd.DataFrame({
    "department": ["Eng", "Sales", "Eng", "Sales"],
    "salary": [110000, 85000, 125000, 92000]
})

print(df.groupby("department")["salary"].mean())`,
    docLink: "https://pandas.pydata.org/docs/"
  },
  {
    id: "matplotlib",
    name: "Matplotlib",
    category: "Visualization",
    badge: "Plotting Library",
    iconColor: "#11557c",
    summary: "Comprehensive library for creating static, animated, and interactive visualizations in Python.",
    whatIsIt: "Matplotlib is a low-level plotting library providing full granular control over every visual element of a figure: axes, ticks, spines, labels, legends, and colors.",
    whyUsed: "The standard plotting workhorse of Python, capable of generating publication-quality figures in vector formats (PDF, SVG, PNG).",
    whereUsed: "Academic papers, reports, exploratory analysis, and custom visual diagnostics.",
    keyFeatures: [
      "Complete object-oriented figure and axes control",
      "Extensive chart types: line, scatter, bar, histogram, boxplot, contour, quiver",
      "Full LaTeX mathematical typography support in titles and labels",
      "Export to SVG, EPS, PDF, and high-resolution PNG"
    ],
    install: "pip install matplotlib",
    codeExample: `import matplotlib.pyplot as plt

plt.figure(figsize=(6, 3))
plt.plot([1, 2, 3, 4], [10, 20, 25, 30], marker="o", color="#0d9488")
plt.title("Quarterly Growth")
plt.xlabel("Quarter")
plt.ylabel("Revenue ($k)")
plt.grid(True)
plt.savefig("growth.png")`,
    docLink: "https://matplotlib.org/stable/contents.html"
  },
  {
    id: "seaborn",
    name: "Seaborn",
    category: "Visualization",
    badge: "Statistical Charts",
    iconColor: "#4c72b0",
    summary: "Python data visualization library based on matplotlib providing a high-level interface for drawing attractive and informative statistical graphics.",
    whatIsIt: "Seaborn wraps Matplotlib with beautiful modern default themes, color palettes, and high-level statistical plotting functions tightly integrated with Pandas DataFrames.",
    whyUsed: "Creates complex statistical visualizers (violin plots, correlation heatmaps, pairplots) in a single line of code.",
    whereUsed: "Exploratory Data Analysis (EDA) and executive presentations.",
    keyFeatures: [
      "Direct integration with Pandas DataFrame columns",
      "Automatic calculation and display of confidence intervals and regression lines",
      "Built-in aesthetic dark and light color themes",
      "Multivariate matrix plots (pairplot, clustermap, heatmap)"
    ],
    install: "pip install seaborn",
    codeExample: `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")
sns.boxplot(data=tips, x="day", y="total_bill", hue="sex", palette="Set2")
plt.title("Bill Distribution by Day & Sex")
plt.show()`,
    docLink: "https://seaborn.pydata.org/"
  },
  {
    id: "plotly",
    name: "Plotly",
    category: "Visualization",
    badge: "Interactive Charts",
    iconColor: "#3f4f75",
    summary: "Interactive, open-source graphing library that generates browser-based charts with hover tooltips, zooming, panning, and 3D rendering.",
    whatIsIt: "Plotly Express and Plotly.py render interactive D3.js and WebGL visualizations directly in Jupyter notebooks or standalone HTML files.",
    whyUsed: "Allows users and stakeholders to zoom in on specific data clusters, hover over points to inspect metadata, and rotate 3D scatter plots.",
    whereUsed: "Interactive dashboards, exploratory tools, geospatial map analytics, and web applications.",
    keyFeatures: [
      "Rich browser interactivity: zoom, pan, hover tooltips, click events",
      "High-level Plotly Express API (px.scatter, px.choropleth)",
      "3D surface and scatter plots with WebGL hardware acceleration",
      "Exports self-contained standalone HTML interactive files"
    ],
    install: "pip install plotly",
    codeExample: `import plotly.express as px

df = px.data.iris()
fig = px.scatter(df, x="sepal_width", y="sepal_length", color="species",
                 size="petal_length", hover_data=["petal_width"])
fig.write_html("interactive_iris.html")`,
    docLink: "https://plotly.com/python/"
  },
  {
    id: "scipy",
    name: "SciPy",
    category: "Scientific Computing",
    badge: "Stats & Optimization",
    iconColor: "#0054a6",
    summary: "Open-source software for mathematics, science, and engineering providing algorithms for optimization, integration, and statistical distributions.",
    whatIsIt: "SciPy builds on NumPy, offering specialized modules for statistical tests (scipy.stats), function minimization (scipy.optimize), and numerical integration (scipy.integrate).",
    whyUsed: "The standard library for conducting rigorous hypothesis tests (T-test, Chi-square, ANOVA) and fitting non-linear mathematical equations.",
    whereUsed: "Statistical research, physics simulations, financial quantitative modeling, and A/B test evaluation.",
    keyFeatures: [
      "Over 100 continuous and discrete probability distributions",
      "Comprehensive hypothesis testing suite (ttest_ind, chisquare, f_oneway)",
      "Unconstrained and constrained mathematical optimization solvers",
      "Signal processing and spatial distance calculations"
    ],
    install: "pip install scipy",
    codeExample: `from scipy import stats

# Calculate two-sample t-test
group1 = [25, 30, 28, 35, 27]
group2 = [40, 42, 38, 45, 39]
t_stat, p_val = stats.ttest_ind(group1, group2)
print(f"P-value: {p_val:.5f} (Statistically Significant: {p_val < 0.05})")`,
    docLink: "https://docs.scipy.org/doc/scipy/"
  },
  {
    id: "statsmodels",
    name: "Statsmodels",
    category: "Statistical Modeling",
    badge: "Econometrics",
    iconColor: "#4c5b61",
    summary: "Python module that provides classes and functions for the estimation of many different statistical models, as well as for conducting statistical tests.",
    whatIsIt: "Statsmodels focuses on statistical inference, providing detailed statistical summary tables (p-values, standard errors, confidence intervals, AIC/BIC) for linear regression, GLM, and ARIMA time series.",
    whyUsed: "Unlike Scikit-learn (which focuses purely on predictive accuracy), Statsmodels provides rigorous statistical interpretability.",
    whereUsed: "Econometrics, medical clinical trials, financial risk forecasting, and time-series analysis.",
    keyFeatures: [
      "Ordinary Least Squares (OLS) with R-style formula interface (statsmodels.formula.api)",
      "Comprehensive diagnostic summaries with t-stats, F-statistic, R², and p-values",
      "Time series analysis (ARIMA, SARIMAX, seasonal decomposition)",
      "Generalized Linear Models (Poisson, Binomial, Gamma)"
    ],
    install: "pip install statsmodels",
    codeExample: `import statsmodels.formula.api as smf
import pandas as pd

df = pd.DataFrame({"sales": [10, 20, 25, 30, 42], "ads": [1, 2, 3, 4, 5]})
model = smf.ols("sales ~ ads", data=df).fit()
print(model.summary())`,
    docLink: "https://www.statsmodels.org/stable/"
  },
  {
    id: "scikit-learn",
    name: "Scikit-Learn",
    category: "Machine Learning",
    badge: "ML Algorithms",
    iconColor: "#f7931e",
    summary: "Simple and efficient tools for predictive data analysis, accessible to everybody and reusable in various contexts.",
    whatIsIt: "Scikit-learn is Python's premier classical machine learning library, offering a uniform API (fit, predict, transform) across classification, regression, clustering, and preprocessing.",
    whyUsed: "Extremely robust, well-tested implementations of Random Forests, SVMs, Logistic Regression, PCA, and Cross-Validation with leak-proof pipelines.",
    whereUsed: "Industry production machine learning systems, credit scoring, fraud detection, and predictive modeling.",
    keyFeatures: [
      "Consistent Estimator and Transformer API design across all models",
      "Data preprocessing, imputation, and feature scaling with ColumnTransformer",
      "Model evaluation metrics (ROC-AUC, F1-score, Confusion Matrix)",
      "Hyperparameter tuning via GridSearchCV and RandomizedSearchCV"
    ],
    install: "pip install scikit-learn",
    codeExample: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_iris

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)
print("Accuracy:", clf.score(X_test, y_test))`,
    docLink: "https://scikit-learn.org/stable/"
  },
  {
    id: "beautifulsoup",
    name: "BeautifulSoup",
    category: "Data Acquisition",
    badge: "HTML Parser",
    iconColor: "#59666c",
    summary: "Python library for pulling data out of HTML and XML files, providing idiomatic ways of navigating, searching, and modifying parse trees.",
    whatIsIt: "BeautifulSoup parses messy real-world web HTML into a searchable DOM tree, allowing developers to extract tags, text, tables, and attributes effortlessly.",
    whyUsed: "The fastest, simplest way to extract data from static websites without complex browser drivers.",
    whereUsed: "Price monitoring, academic research scraping, news article aggregation, and public dataset building.",
    keyFeatures: [
      "Robust parsing even with malformed or broken HTML syntax",
      "Intuitive navigation by tag, class, id, or CSS selector (select, find_all)",
      "Automatic encoding conversion to Unicode",
      "Integrates with fast C parsers like lxml"
    ],
    install: "pip install beautifulsoup4",
    codeExample: `from bs4 import BeautifulSoup

html = "<div><h2 class='title'>Product A</h2><p class='price'>$49.99</p></div>"
soup = BeautifulSoup(html, "html.parser")
title = soup.find("h2", class_="title").text
price = soup.find("p", class_="price").text
print(f"Item: {title} | Price: {price}")`,
    docLink: "https://www.crummy.com/software/BeautifulSoup/bs4/doc/"
  },
  {
    id: "requests",
    name: "Requests",
    category: "Data Acquisition",
    badge: "HTTP Client",
    iconColor: "#2a70bb",
    summary: "An elegant and simple HTTP library for Python, built for human beings to interact with REST APIs seamlessly.",
    whatIsIt: "Requests is the standard HTTP library for Python, allowing you to send organic, clean HTTP/1.1 requests without manual query string encoding or socket management.",
    whyUsed: "Powers virtually all API data collection scripts in data science workflows.",
    whereUsed: "Ingesting JSON from external APIs, downloading CSV/Parquet files from URLs, and triggering webhooks.",
    keyFeatures: [
      "Simple intuitive API: requests.get(), requests.post()",
      "Automatic JSON decoding via response.json()",
      "Session management with persistent cookies and connection pooling",
      "Timeouts, SSL verification, and basic/token authentication"
    ],
    install: "pip install requests",
    codeExample: `import requests

res = requests.get("https://api.github.com", timeout=5)
if res.status_code == 200:
    print("GitHub API Online! Available endpoints:", len(res.json()))`,
    docLink: "https://requests.readthedocs.io/"
  },
  {
    id: "streamlit",
    name: "Streamlit",
    category: "App & Deployment",
    badge: "Data Apps",
    iconColor: "#ff4b4b",
    summary: "Turns data scripts into shareable web apps in minutes, all in pure Python with zero HTML/CSS/JavaScript required.",
    whatIsIt: "Streamlit is an open-source Python framework that allows data scientists to build interactive dashboards and machine learning demo web apps using only Python.",
    whyUsed: "Enables data scientists to build working interactive web tools for stakeholders in an afternoon without hiring frontend engineers.",
    whereUsed: "Internal business dashboards, machine learning model prototypes, and executive reporting.",
    keyFeatures: [
      "Pure Python UI components (st.slider, st.selectbox, st.dataframe, st.pyplot)",
      "Automatic re-run execution model based on widget state changes",
      "Built-in caching decorator (@st.cache_data) for fast load times",
      "One-click deployment to Streamlit Community Cloud"
    ],
    install: "pip install streamlit",
    codeExample: `# Save as app.py and run: streamlit run app.py
import streamlit as st
import pandas as pd
import numpy as np

st.title("My Data Science App")
num_points = st.slider("Select sample size", 10, 500, 100)
data = pd.DataFrame(np.random.randn(num_points, 2), columns=["x", "y"])
st.scatter_chart(data)`,
    docLink: "https://docs.streamlit.io/"
  },
  {
    id: "gradio",
    name: "Gradio",
    category: "App & Deployment",
    badge: "ML Demos",
    iconColor: "#f39c12",
    summary: "The fastest way to demo your machine learning model with a friendly web interface so that anyone can use it, anywhere.",
    whatIsIt: "Gradio generates interactive web UIs for Python functions, with built-in input components for images, audio, video, text, and dataframes.",
    whyUsed: "The industry standard platform for showcasing Hugging Face transformers, computer vision models, and LLM chat interfaces.",
    whereUsed: "Hugging Face Spaces, AI model demos, client demonstrations, and live QA testing.",
    keyFeatures: [
      "Wrap any Python function into a web UI with gr.Interface()",
      "Rich multimodal inputs: microphone, webcam, image upload, audio",
      "Generates shareable public 72-hour tunnels with share=True",
      "Native chatbot interface component (gr.Chatbot)"
    ],
    install: "pip install gradio",
    codeExample: `import gradio as gr

def predict_sentiment(text):
    sentiment = "Positive" if "great" in text.lower() else "Neutral/Negative"
    return {"sentiment": sentiment, "length": len(text)}

demo = gr.Interface(fn=predict_sentiment, inputs="text", outputs="json")
# demo.launch()`,
    docLink: "https://www.gradio.app/docs/"
  }
];
