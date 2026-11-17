/**
 * MLForge Real-World Projects Library: Data Science & Data Engineering
 * 18 Data Science Projects + 15 Data Engineering Projects across
 * Beginner, Intermediate, and Advanced tiers with complete guides.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsde = window.MLForge.dsde || {};
window.MLForge.dsde.data = window.MLForge.dsde.data || {};

MLForge.dsde.data.projects = [
  // =========================================================================
  // DATA SCIENCE: BEGINNER PROJECTS
  // =========================================================================
  {
    id: "ds-proj-student-perf",
    track: "ds",
    tier: "Beginner",
    title: "Student Academic Performance Analysis & Predictor",
    category: "Exploratory Analysis",
    summary: "Analyze student demographic, socio-economic, and study habit data to identify key factors driving exam scores using Pandas and Seaborn.",
    techStack: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-Learn"],
    problemStatement: "School administrators lack data-driven visibility into why certain student cohorts score lower in mathematics and reading, hindering early intervention.",
    objectives: [
      "Clean and preprocess multi-feature student record dataset",
      "Perform bivariate analysis between study hours, parental education, and test scores",
      "Build a simple baseline Linear Regression model predicting final math score"
    ],
    architecture: `[CSV Student Records] ===> [Pandas Cleaning] ===> [Seaborn EDA Charts] ===> [OLS Linear Regression] ===> [Intervention Insights Report]`,
    folderStructure: `student_performance/
├── data/
│   └── students.csv
├── notebooks/
│   └── 01_eda_and_modeling.ipynb
├── src/
│   ├── clean.py
│   └── evaluate.py
├── requirements.txt
└── README.md`,
    codeSnippet: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Load dataset
df = pd.read_csv("data/students.csv")

# Clean & Engineer Features
df["total_score"] = df["math_score"] + df["reading_score"] + df["writing_score"]
df["passed"] = df["total_score"] >= 180

# Correlation Heatmap
sns.heatmap(df[["math_score", "reading_score", "writing_score", "total_score"]].corr(), annot=True)
plt.title("Score Correlation Matrix")

# Train baseline linear model
X = df[["reading_score", "writing_score"]]
y = df["math_score"]
model = LinearRegression().fit(X, y)
print(f"R² Score: {model.score(X, y):.3f}")`,
    expectedOutput: "R² Score: 0.674 | Finding: Reading and writing scores correlate strongly (r=0.95), while parental education level significantly boosts math passing probability by 22%.",
    testing: "Verify zero NaN values post-cleaning with assert df.isna().sum().sum() == 0. Check test set RMSE against naive mean baseline.",
    deployment: "Export statistical summary tables to executive PDF reports or deploy an interactive Streamlit grade calculator.",
    improvements: "Incorporate attendance logs and quiz timestamps for granular time-series tracking."
  },
  {
    id: "ds-proj-netflix",
    track: "ds",
    tier: "Beginner",
    title: "Netflix Movies & TV Shows Content Strategy EDA",
    category: "Exploratory Analysis",
    summary: "Analyze Netflix's catalog of over 8,800 movies and TV shows to uncover international content growth, director trends, and runtime patterns.",
    techStack: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    problemStatement: "Streaming production executives need to understand competitor catalog distribution, genre popularity by country, and the shift from movies to episodic TV.",
    objectives: [
      "Parse and unnest multiple categorical genres and country lists",
      "Visualize release year distribution and time-to-platform delay",
      "Identify the top 10 countries producing content for Netflix"
    ],
    architecture: `[Netflix Catalog CSV] ===> [String Parsing & Unnesting] ===> [Datetime Conversion] ===> [Bar & Choropleth Visuals]`,
    folderStructure: `netflix_analysis/
├── data/
│   └── netflix_titles.csv
├── charts/
├── netflix_eda.py
└── README.md`,
    codeSnippet: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("data/netflix_titles.csv")

# Handle missing ratings and countries
df["country"] = df["country"].fillna("Unknown")
df["date_added"] = pd.to_datetime(df["date_added"].str.strip())
df["year_added"] = df["date_added"].dt.year

# Plot Content Type breakdown over years
yearly = df.groupby(["year_added", "type"]).size().unstack().fillna(0)
yearly.plot(kind="bar", stacked=True, color=["#e50914", "#221f1f"])
plt.title("Netflix Catalog Growth by Type")
plt.xlabel("Year Added")
plt.ylabel("Number of Titles")`,
    expectedOutput: "Reveals that Netflix dramatically shifted catalog investment toward TV Shows starting in 2018, with international titles accounting for over 58% of new additions.",
    testing: "Unit test datetime parser on edge-case dates with trailing spaces.",
    deployment: "Interactive Tableau dashboard embedded in executive wiki.",
    improvements: "Join with IMDb or Rotten Tomatoes API datasets to correlate catalog growth with audience review scores."
  },
  {
    id: "ds-proj-sales",
    track: "ds",
    tier: "Beginner",
    title: "Supermarket Sales & Revenue Performance Analytics",
    category: "Business Analytics",
    summary: "Analyze transactional sales across product lines, customer loyalty types, and payment methods to optimize supermarket inventory margins.",
    techStack: ["Python", "Pandas", "Plotly", "Seaborn"],
    problemStatement: "Store managers experience inventory stockouts on high-margin goods while holding excess stock of slow-moving items.",
    objectives: ["Calculate gross margins per product line", "Analyze customer ratings per branch", "Identify peak purchasing hours"],
    architecture: `[POS Sales Logs] ===> [Data Aggregation] ===> [Profit Margin Analysis] ===> [Interactive Plotly Visuals]`,
    folderStructure: `sales_analytics/
├── data/sales.csv
├── analysis.py
└── dashboard.html`,
    codeSnippet: `import pandas as pd

df = pd.read_csv("data/sales.csv")
df["profit"] = df["total"] - df["cogs"]
df["margin_pct"] = (df["profit"] / df["total"]) * 100

summary = df.groupby("product_line").agg(
    total_revenue=("total", "sum"),
    total_profit=("profit", "sum"),
    avg_rating=("rating", "mean")
).reset_index().sort_values("total_profit", ascending=False)
print(summary)`,
    expectedOutput: "Food & Beverages generates highest revenue ($56k), but Fashion Accessories yields the highest gross margin percentage (32.4%).",
    testing: "Verify monetary math: profit == total - cogs for all rows.",
    deployment: "Schedule automated weekly email summary via Python smtplib.",
    improvements: "Implement market basket analysis (Apriori algorithm) to discover co-purchased item pairs."
  },
  {
    id: "ds-proj-covid",
    track: "ds",
    tier: "Beginner",
    title: "COVID-19 Global Pandemic Trend Analysis & Tracking",
    category: "Epidemiological EDA",
    summary: "Process time-series infection, recovery, and mortality rates across nations to compare public health response efficacy.",
    techStack: ["Python", "Pandas", "Matplotlib", "Plotly Express"],
    problemStatement: "Epidemiological datasets have missing dates, delayed reporting, and differing test definitions across countries.",
    objectives: ["Compute 7-day rolling averages to smooth weekend reporting lags", "Calculate case fatality rates (CFR)"],
    architecture: `[Johns Hopkins CSSE Data] ===> [Rolling Window Smoothing] ===> [Global Choropleth Map]`,
    folderStructure: `covid_tracker/\n├── fetch_data.py\n├── analyze.py\n└── README.md`,
    codeSnippet: `import pandas as pd

df = pd.read_csv("https://raw.githubusercontent.com/datasets/covid-19/master/data/countries-aggregated.csv")
df["Date"] = pd.to_datetime(df["Date"])

# Calculate 7-day rolling average of new confirmed cases
df["Daily_New"] = df.groupby("Country")["Confirmed"].diff().fillna(0)
df["Rolling_7D"] = df.groupby("Country")["Daily_New"].transform(lambda x: x.rolling(7).mean())`,
    expectedOutput: "Smooth epidemiological curve removing single-day reporting spikes.",
    testing: "Assert non-negative cumulative confirmed cases.",
    deployment: "Host live auto-refreshing GitHub Pages static site.",
    improvements: "Add vaccination rate correlations."
  },
  {
    id: "ds-proj-ipl",
    track: "ds",
    tier: "Beginner",
    title: "IPL Cricket Tournament Match & Player Performance Analytics",
    category: "Sports Analytics",
    summary: "Ball-by-ball analysis of Indian Premier League tournament data: batting strike rates, death overs economy, and toss impact.",
    techStack: ["Python", "Pandas", "Seaborn"],
    problemStatement: "Franchise scouts need objective data-driven metrics to value players ahead of seasonal auctions.",
    objectives: ["Calculate strike rate in powerplay vs death overs", "Evaluate win probability after winning toss"],
    architecture: `[Ball-by-Ball Deliveries CSV] ===> [Aggregations & Strike Rates] ===> [Player Radar Charts]`,
    folderStructure: `ipl_analytics/\n├── data/\n└── ipl_eda.py`,
    codeSnippet: `import pandas as pd

df = pd.read_csv("data/deliveries.csv")
# Death overs (16 to 20)
death_overs = df[df["over"] >= 16]

bowler_stats = death_overs.groupby("bowler").agg(
    balls=("ball", "count"),
    runs=("total_runs", "sum"),
    wickets=("is_wicket", "sum")
)
bowler_stats = bowler_stats[bowler_stats["balls"] >= 120]
bowler_stats["economy"] = (bowler_stats["runs"] / (bowler_stats["balls"] / 6)).round(2)
print(bowler_stats.sort_values("economy").head(5))`,
    expectedOutput: "Top death-over bowlers with economy under 7.5 runs per over.",
    testing: "Verify ball count consistency (legal balls vs extras).",
    deployment: "Jupyter Book publication.",
    improvements: "Build player match-up simulation matrix."
  },
  {
    id: "ds-proj-youtube",
    track: "ds",
    tier: "Beginner",
    title: "Trending YouTube Videos Engagement & Sentiment Analysis",
    category: "Social Media Analytics",
    summary: "Analyze YouTube trending video datasets: title lengths, view-to-like ratios, tag counts, and publish timing.",
    techStack: ["Python", "Pandas", "TextBlob", "Seaborn"],
    problemStatement: "Content creators struggle to optimize video packaging (titles, publishing hours) for algorithmic reach.",
    objectives: ["Analyze title sentiment vs views", "Identify peak trending publish hours"],
    architecture: `[YouTube API / Kaggle CSV] ===> [Title NLP Sentiment] ===> [Engagement Correlation]`,
    folderStructure: `youtube_analysis/\n├── data/\n└── youtube_study.py`,
    codeSnippet: `import pandas as pd
from textblob import TextBlob

df = pd.read_csv("data/youtube_trending.csv")
df["title_sentiment"] = df["title"].apply(lambda t: TextBlob(str(t)).sentiment.polarity)
df["like_ratio"] = df["likes"] / (df["views"] + 1)

print(df.groupby(pd.cut(df["title_sentiment"], bins=3))["views"].median())`,
    expectedOutput: "Positive sentiment titles generate 18% higher median first-day views than neutral titles.",
    testing: "Validate view counts are strictly positive.",
    deployment: "Streamlit creator dashboard.",
    improvements: "Add thumbnail color palette and brightness analysis."
  },

  // =========================================================================
  // DATA SCIENCE: INTERMEDIATE PROJECTS
  // =========================================================================
  {
    id: "ds-proj-customer-seg",
    track: "ds",
    tier: "Intermediate",
    title: "Customer Segmentation with RFM Analysis & K-Means Clustering",
    category: "Machine Learning & Clustering",
    summary: "Segment e-commerce customers by Recency, Frequency, and Monetary (RFM) metrics using K-Means clustering and Elbow method.",
    techStack: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "Seaborn"],
    problemStatement: "Marketing treats all 50,000 customers with identical promotional email blasts, wasting ad spend and causing unsubscribe churn.",
    objectives: ["Calculate RFM scores per customer", "Determine optimal clusters using Elbow curve and Silhouette score", "Interpret cluster personas"],
    architecture: `[Transaction Logs] ===> [RFM Engineering] ===> [StandardScaler] ===> [K-Means (k=4)] ===> [Segment Marketing Playbook]`,
    folderStructure: `customer_segmentation/\n├── rfm.py\n├── cluster.py\n└── README.md`,
    codeSnippet: `import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# Sample RFM DataFrame
rfm = pd.DataFrame({
    "recency_days": [5, 120, 2, 350, 15],
    "frequency": [18, 2, 25, 1, 9],
    "monetary": [2400.0, 150.0, 3900.0, 45.0, 850.0]
})

scaler = StandardScaler()
rfm_scaled = scaler.fit_transform(rfm)

# Fit K-Means
kmeans = KMeans(n_clusters=3, random_state=42).fit(rfm_scaled)
rfm["cluster"] = kmeans.labels_
print("Cluster Profiles:\\n", rfm.groupby("cluster").mean().round(1))`,
    expectedOutput: "Cluster 0: Champions (High spend, low recency); Cluster 1: At-Risk (High historical spend, high recency); Cluster 2: Occasional low-ticket buyers.",
    testing: "Check Silhouette score > 0.50 across candidate cluster counts.",
    deployment: "Push segmented user IDs into HubSpot/Klaviyo marketing CRM via REST API.",
    improvements: "Experiment with DBSCAN for non-spherical customer clusters."
  },
  {
    id: "ds-proj-ab-testing",
    track: "ds",
    tier: "Intermediate",
    title: "E-Commerce Checkout A/B Testing Statistical Analysis",
    category: "Inference & Experimentation",
    summary: "Design, evaluate, and statistically validate a 2-week randomized controlled A/B experiment on e-commerce checkout conversion rate.",
    techStack: ["Python", "SciPy", "Statsmodels", "Pandas", "Matplotlib"],
    problemStatement: "Product managers redesigned the checkout button from blue to green and saw a 1.2% lift, but do not know if the result is statistical noise.",
    objectives: ["Conduct Chi-Square test for independence", "Calculate Two-Proportion Z-Test and 95% Confidence Intervals", "Check Sample Ratio Mismatch (SRM)"],
    architecture: `[Variant A / B Experiment Events] ===> [SRM Check] ===> [Two-Sample Proportion Z-Test] ===> [Confidence Interval Bounds]`,
    folderStructure: `ab_testing/\n├── experiment_data.csv\n├── ab_analysis.py\n└── experiment_report.md`,
    codeSnippet: `from statsmodels.stats.proportion import proportions_ztest, confint_proportions_2indep

# Control: 1,420 conversions out of 25,000 visitors (5.68%)
# Treatment: 1,610 conversions out of 25,000 visitors (6.44%)
count = [1420, 1610]
nobs = [25000, 25000]

z_stat, p_val = proportions_ztest(count, nobs)
ci_low, ci_high = confint_proportions_2indep(count[1], nobs[1], count[0], nobs[0], compare="diff")

print(f"Z-Score: {z_stat:.4f} | P-value: {p_val:.6f}")
print(f"Absolute Conversion Lift: +{(1610/25000 - 1420/25000)*100:.2f}%")
print(f"95% Confidence Interval for Difference: [{ci_low*100:.2f}%, {ci_high*100:.2f}%]")`,
    expectedOutput: "P-value: 0.00032 (< 0.05). Statistically significant lift: +0.76% (95% CI: [+0.35%, +1.17%]). Safe to roll out to 100% of traffic.",
    testing: "Verify Sample Ratio Mismatch (SRM) via Chi-Square goodness-of-fit test before analyzing conversions.",
    deployment: "Automate automated experiment dashboard in Streamlit.",
    improvements: "Implement sequential testing to allow early stopping without inflating Type I error."
  },
  {
    id: "ds-proj-stock-market",
    track: "ds",
    tier: "Intermediate",
    title: "Stock Market Volatility, Moving Averages & Risk Analytics",
    category: "Financial Analytics",
    summary: "Ingest multi-year financial equity data, compute moving averages (SMA/EMA), Value at Risk (VaR), and Sharpe ratio portfolio metrics.",
    techStack: ["Python", "yfinance", "Pandas", "NumPy", "Matplotlib"],
    problemStatement: "Investors need quantitative metrics to balance portfolio return against annualized downside volatility.",
    objectives: ["Calculate 50-day and 200-day Golden Cross signals", "Calculate Daily Log Returns and Annualized Sharpe Ratio"],
    architecture: `[Yahoo Finance API] ===> [Log Return Calculation] ===> [Rolling Volatility & VaR] ===> [Risk-Return Scatter Plot]`,
    folderStructure: `stock_analytics/\n├── portfolio.py\n└── charts/`,
    codeSnippet: `import numpy as np
import pandas as pd

# Calculate historical Sharpe ratio
returns = pd.Series([0.012, -0.008, 0.015, 0.003, -0.002, 0.021])
risk_free_daily = 0.04 / 252 # 4% annual risk-free rate

excess_returns = returns - risk_free_daily
sharpe_ratio = np.sqrt(252) * (excess_returns.mean() / excess_returns.std())
print(f"Annualized Sharpe Ratio: {sharpe_ratio:.2f}")`,
    expectedOutput: "Annualized Sharpe Ratio > 1.0 indicates good risk-adjusted excess returns.",
    testing: "Verify absence of forward-looking bias (lagging indicators).",
    deployment: "Daily cron script alerting on Golden Cross formations.",
    improvements: "Implement Monte Carlo portfolio optimization (Efficient Frontier)."
  },
  {
    id: "ds-proj-ecom-customer",
    track: "ds",
    tier: "Intermediate",
    title: "E-Commerce Customer Lifetime Value (CLV) Modeling",
    category: "Predictive Analytics",
    summary: "Predict future customer monetary value using historical transaction cadence and BG/NBD statistical models.",
    techStack: ["Python", "Lifetimes", "Pandas", "Scikit-Learn"],
    problemStatement: "Customer Acquisition Cost (CAC) exceeds short-term first-order margin; marketing needs to identify high CLV personas.",
    objectives: ["Calculate customer repeat purchase probability", "Predict 12-month expected CLV"],
    architecture: `[Transaction History] ===> [Recency & Frequency Matrix] ===> [BG/NBD Model] ===> [Expected CLV Ranking]`,
    folderStructure: `clv_modeling/\n├── clv.py\n└── README.md`,
    codeSnippet: `# CLV calculation concept with Gamma-Gamma submodel
print("CLV Modeling: Identifying top 10% customers generating 65% of lifetime margin.")`,
    expectedOutput: "Enables bidding 3x higher CAC for high-probability repeat buyers.",
    testing: "Cross-validate predicted purchases against holdout 6-month period.",
    deployment: "Weekly batch score table written to PostgreSQL.",
    improvements: "Combine transactional CLV with demographic survey attributes."
  },
  {
    id: "ds-proj-eda-dashboard",
    track: "ds",
    tier: "Intermediate",
    title: "Automated Exploratory Data Analysis & Profiling Dashboard",
    category: "Tooling & Automation",
    summary: "Build an automated web application that accepts any user-uploaded CSV and generates complete missing value, correlation, and distribution reports.",
    techStack: ["Python", "Streamlit", "Pandas", "Seaborn", "Plotly"],
    problemStatement: "Data analysts spend the first 3 hours of every project writing boilerplate descriptive code for new datasets.",
    objectives: ["Upload CSV via browser", "Render automated 5-number summary", "Export interactive HTML report"],
    architecture: `[Browser Upload] ===> [Pandas Profiler Engine] ===> [Interactive Streamlit UI]`,
    folderStructure: `eda_dashboard/\n├── app.py\n└── requirements.txt`,
    codeSnippet: `import streamlit as st
import pandas as pd

st.title("Instant EDA Profiler")
uploaded = st.file_uploader("Upload CSV", type=["csv"])
if uploaded:
    df = pd.read_csv(uploaded)
    st.write("Dimensions:", df.shape)
    st.write(df.describe())`,
    expectedOutput: "Instant interactive profiling web tool.",
    testing: "Test with 100MB CSV and datasets containing 100% null columns.",
    deployment: "Streamlit Cloud.",
    improvements: "Add automated outlier highlighting and column type inference."
  },
  {
    id: "ds-proj-hr-analytics",
    track: "ds",
    tier: "Intermediate",
    title: "HR Employee Attrition & Retention Diagnostics Dashboard",
    category: "Diagnostic Analytics",
    summary: "Identify organizational drivers causing employee resignation: salary compression, overtime hours, and promotion delays.",
    techStack: ["Python", "Pandas", "Scikit-Learn", "Seaborn"],
    problemStatement: "High employee turnover costs $1.5M annually in recruitment and lost institutional knowledge.",
    objectives: ["Analyze attrition rate by department", "Feature importance ranking via Logistic Regression"],
    architecture: `[HR Employee DB] ===> [Attrition Categorization] ===> [Odds Ratio Analysis]`,
    folderStructure: `hr_analytics/\n├── hr_analysis.py\n└── README.md`,
    codeSnippet: `print("HR Analytics: Overtime hours and time-since-last-promotion emerge as top attrition drivers.")`,
    expectedOutput: "Employees working >15 hrs overtime have 3.2x higher odds of resigning within 12 months.",
    testing: "Validate class balance metrics.",
    deployment: "Internal HR Tableau portal.",
    improvements: "Build survival analysis curves (Kaplan-Meier estimator)."
  },

  // =========================================================================
  // DATA SCIENCE: ADVANCED PROJECTS
  // =========================================================================
  {
    id: "ds-proj-end-to-end",
    track: "ds",
    tier: "Advanced",
    title: "End-to-End ML Pipeline: From Raw Data to Production FastAPI Serving",
    category: "Full Stack Machine Learning",
    summary: "Architect a complete production machine learning system: feature engineering, leak-free pipeline, hyperparameter optimization, and low-latency REST API.",
    techStack: ["Python", "Scikit-Learn", "FastAPI", "Uvicorn", "Docker", "Joblib"],
    problemStatement: "90% of machine learning models built in Jupyter notebooks fail to reach production due to undocumented dependencies and mismatched preprocessing.",
    objectives: ["Build leak-free ColumnTransformer pipeline", "Serve sub-20ms prediction endpoint with FastAPI", "Containerize in Docker"],
    architecture: `[Raw Client JSON] ===> [FastAPI REST API] ===> [Pre-loaded Pipeline.pkl] ===> [Scikit-learn Predict] ===> [JSON Response]`,
    folderStructure: `production_ml_service/
├── app/
│   ├── main.py
│   ├── schemas.py
│   └── model.pkl
├── training/
│   └── train_pipeline.py
├── tests/
│   └── test_api.py
├── Dockerfile
└── requirements.txt`,
    codeSnippet: `from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI(title="Production Credit Risk Scorer")
pipeline = joblib.load("app/model.pkl")

class LoanApplication(BaseModel):
    annual_income: float
    credit_score: int
    debt_to_income_ratio: float
    loan_amount: float

@app.post("/predict")
def predict_default(app: LoanApplication):
    df = pd.DataFrame([app.dict()])
    prob = pipeline.predict_proba(df)[0][1]
    return {"default_probability": round(float(prob), 4), "approved": prob < 0.25}`,
    expectedOutput: "Production REST endpoint returning sub-15ms predictions with Pydantic validation.",
    testing: "Unit test with pytest and TestClient for malformed inputs (negative income, invalid score).",
    deployment: "Docker container deployed on AWS ECS or GCP Cloud Run with health checks.",
    improvements: "Add Prometheus metric instrumentation tracking model prediction latency and drift."
  },
  {
    id: "ds-proj-time-series",
    track: "ds",
    tier: "Advanced",
    title: "Retail Demand Forecasting with ARIMA & Prophet",
    category: "Time Series & Forecasting",
    summary: "Forecast future SKU inventory demand across 50 retail store locations incorporating holiday seasonality and promotional lift.",
    techStack: ["Python", "Prophet", "Statsmodels", "Pandas", "Matplotlib"],
    problemStatement: "Supply chain miscalculates holiday peak demand, leading to $2M in missed sales and $800k in emergency logistics airfare.",
    objectives: ["Decompose time series into Trend, Seasonality, and Residuals", "Train Facebook Prophet model with holiday regressors", "Calculate WAPE and MAPE forecast error"],
    architecture: `[Historical Daily Sales] ===> [Stationarity Tests] ===> [Prophet / SARIMAX] ===> [90-Day Forecast Intervals]`,
    folderStructure: `demand_forecasting/\n├── forecast.py\n└── README.md`,
    codeSnippet: `from prophet import Prophet
import pandas as pd

df = pd.DataFrame({
    "ds": pd.date_range("2022-01-01", periods=730),
    "y": [100 + i*0.2 + (i%7)*15 for i in range(730)]
})

model = Prophet(yearly_seasonality=True, weekly_seasonality=True)
model.fit(df)

future = model.make_future_dataframe(periods=90)
forecast = model.predict(future)
print(forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].tail())`,
    expectedOutput: "Forecast with 95% uncertainty interval bands achieving <8.5% WAPE error.",
    testing: "Backtesting via temporal cross-validation (rolling forecast origin).",
    deployment: "Batch forecast tables exported to ERP supply chain database nightly.",
    improvements: "Integrate weather forecast features and localized sporting event dates."
  },
  {
    id: "ds-proj-recsys",
    track: "ds",
    tier: "Advanced",
    title: "Hybrid Movie Recommendation System (Collaborative + Content-Based)",
    category: "Recommender Systems",
    summary: "Build an industrial recommendation engine combining Matrix Factorization (SVD) with cosine similarity over genre metadata embeddings.",
    techStack: ["Python", "Surprise", "Scikit-Learn", "Pandas", "NumPy"],
    problemStatement: "Cold-start users have zero rating history (collaborative filtering fails), while content-only systems create narrow echo-chambers.",
    objectives: ["Implement Singular Value Decomposition (SVD) for user-item matrix", "Build TF-IDF cosine similarity content model", "Blend scores into hybrid ranker"],
    architecture: `[User Ratings + Metadata] ===> [SVD Latent Factors + TF-IDF] ===> [Hybrid Weighted Ranker] ===> [Top-10 Recommendations]`,
    folderStructure: `recsys/\n├── hybrid_engine.py\n└── README.md`,
    codeSnippet: `print("Hybrid Recommender: Blending collaborative filtering SVD score (weight 0.6) with TF-IDF content similarity (weight 0.4).")`,
    expectedOutput: "High diversity Top-10 recommendations achieving Precision@10 of 0.38.",
    testing: "Evaluate Mean Average Precision (MAP@K) and Normalized Discounted Cumulative Gain (NDCG@K).",
    deployment: "FastAPI endpoint with Redis vector caching for sub-5ms lookups.",
    improvements: "Upgrade to two-tower neural network retrieval (Word2Vec / Sentence-BERT)."
  },
  {
    id: "ds-proj-churn",
    track: "ds",
    tier: "Advanced",
    title: "Telecom Customer Churn Prediction & Explainability (SHAP)",
    category: "Explainable Machine Learning",
    summary: "Train an XGBoost classifier predicting customer subscription churn, using SHAP (SHapley Additive exPlanations) to explain individual predictions to customer success teams.",
    techStack: ["Python", "XGBoost", "SHAP", "Scikit-Learn", "Pandas"],
    problemStatement: "Black-box ML models tell agents that a customer is churning, but cannot tell the agent WHY (e.g. recent fiber outage vs billing dispute).",
    objectives: ["Train tuned XGBoost model with PR-AUC metric", "Compute SHAP force plots explaining individual churn risks"],
    architecture: `[Customer Account DB] ===> [XGBoost Model] ===> [SHAP Explainer Kernel] ===> [Agent Dashboard with Top-3 Risk Drivers]`,
    folderStructure: `churn_explainability/\n├── model.py\n├── explain.py\n└── README.md`,
    codeSnippet: `import xgboost as xgb
import shap

# Train XGBoost
# X_train, y_train ...
# explainer = shap.TreeExplainer(model)
# shap_values = explainer.shap_values(X_test)
print("SHAP Explainability: Fiber optic contract type and lack of tech support contribute 42% of total churn probability.")`,
    expectedOutput: "Explainable churn scoring enabling tailored customer retention discounts.",
    testing: "Check calibration curve (Brier score) to ensure predicted probabilities match real frequencies.",
    deployment: "Salesforce CRM integration showing churn probability and top 3 risk factors.",
    improvements: "Uplift modeling: identify customers whose churn risk actually decreases upon receiving a coupon."
  },
  {
    id: "ds-proj-realtime-dashboard",
    track: "ds",
    tier: "Advanced",
    title: "Real-Time Telemetry Analytics Dashboard with Streamlit & WebSockets",
    category: "Real-Time Analytics",
    summary: "Stream live IoT or financial market tick data into an animated real-time browser dashboard with dynamic anomaly detection thresholds.",
    techStack: ["Python", "Streamlit", "Plotly", "WebSockets", "Pandas"],
    problemStatement: "Operations teams cannot wait 15 minutes for batch reports when critical hardware sensors overheat.",
    objectives: ["Consume live data stream", "Maintain rolling in-memory buffer", "Alert on Z-score anomaly breach"],
    architecture: `[Live Event Generator] ===> [In-Memory Buffer] ===> [Real-Time Anomaly Check] ===> [Streamlit Auto-Rerun UI]`,
    folderStructure: `realtime_dashboard/\n├── app.py\n└── generator.py`,
    codeSnippet: `print("Real-Time Streamlit: 500ms reactive updates displaying live sensor telemetry and automated alert triggers.")`,
    expectedOutput: "Live animated chart updating without full browser refresh.",
    testing: "Simulate memory leak over 48 hours of continuous data streaming.",
    deployment: "Deployed inside internal NOC monitoring center.",
    improvements: "Add automatic SMS alerting via Twilio."
  },
  {
    id: "ds-proj-bi-platform",
    track: "ds",
    tier: "Advanced",
    title: "Enterprise Business Intelligence & Executive KPI System",
    category: "Executive Reporting",
    summary: "Architect a comprehensive multi-departmental BI semantic layer tracking MRR, Customer Acquisition Cost, Churn, and Net Promoter Score.",
    techStack: ["SQL", "dbt", "Power BI", "Tableau", "PostgreSQL"],
    problemStatement: "Finance, Sales, and Marketing report conflicting revenue numbers due to disparate SQL calculation logic.",
    objectives: ["Build single source of truth semantic layer in dbt", "Create interactive executive dashboard with drill-downs"],
    architecture: `[Data Warehouse] ===> [dbt Semantic Models] ===> [Power BI Data Model] ===> [Executive Mobile View]`,
    folderStructure: `bi_platform/\n├── models/\n└── dashboards/`,
    codeSnippet: `print("Enterprise BI: Single source of truth semantic layer eliminating conflicting revenue metrics.")`,
    expectedOutput: "Automated executive dashboard updating daily at 6:00 AM.",
    testing: "Automated dbt data tests validating revenue sums equal raw accounting ledgers.",
    deployment: "Power BI Premium workspace with row-level security (RLS).",
    improvements: "Implement automated Slack digests with natural language KPI summaries."
  },

  // =========================================================================
  // DATA ENGINEERING: BEGINNER PROJECTS
  // =========================================================================
  {
    id: "de-proj-csv-postgres",
    track: "de",
    tier: "Beginner",
    title: "Automated CSV to PostgreSQL Production ETL Pipeline",
    category: "Batch ETL",
    summary: "Build an automated, resilient Python ETL pipeline that ingests messy CSV dumps, validates schemas with Pydantic, and bulk loads into PostgreSQL with upsert logic.",
    techStack: ["Python", "PostgreSQL", "SQLAlchemy", "Psycopg2", "Pydantic", "Pandas"],
    problemStatement: "Manual daily CSV imports result in silent failures, duplicate records, truncated strings, and missing primary key constraints.",
    objectives: ["Read and chunk large CSV files", "Validate records against strict Pydantic schemas", "Perform high-speed bulk upsert using ON CONFLICT DO UPDATE"],
    architecture: `[Raw CSV Files] ===> [Python Extraction & Chunking] ===> [Pydantic Schema Validation] ===> [PostgreSQL COPY / Upsert]`,
    folderStructure: `csv_to_postgres/
├── config/
│   └── database.ini
├── src/
│   ├── extract.py
│   ├── validate.py
│   └── load.py
├── tests/
│   └── test_pipeline.py
├── run_etl.py
└── requirements.txt`,
    codeSnippet: `import pandas as pd
from sqlalchemy import create_engine, text

engine = create_engine("postgresql://postgres:secret@localhost:5432/analytics")

# Idempotent load with staging table
def load_csv(file_path):
    df = pd.read_csv(file_path)
    df.to_sql("stg_orders", engine, if_exists="replace", index=False)
    
    upsert_sql = """
    INSERT INTO core_orders (order_id, customer_id, amount, order_date)
    SELECT order_id, customer_id, amount, order_date::date FROM stg_orders
    ON CONFLICT (order_id) DO UPDATE 
    SET amount = EXCLUDED.amount, order_date = EXCLUDED.order_date;
    """
    with engine.begin() as conn:
        conn.execute(text(upsert_sql))
    print("ETL complete! Records safely upserted.")`,
    expectedOutput: "Clean table with zero duplicates even after rerunning pipeline multiple times.",
    testing: "Unit test validation error handling when CSV contains negative amounts or malformed dates.",
    deployment: "Package as a CLI script executable via cron or Airflow BashOperator.",
    improvements: "Add dead-letter queue (DLQ) CSV output for malformed rows rejected by Pydantic."
  },
  {
    id: "de-proj-api-database",
    track: "de",
    tier: "Beginner",
    title: "REST API to Relational Database Ingestion Pipeline",
    category: "Data Ingestion",
    summary: "Ingest paginated third-party REST API endpoints (e.g. OpenWeather or Stripe) with rate limiting, exponential backoff retries, and relational loading.",
    techStack: ["Python", "Requests", "PostgreSQL", "Tenacity", "SQLAlchemy"],
    problemStatement: "APIs enforce strict rate limits (e.g. 60 req/min) and intermittently return 502/504 gateway errors, crashing naive loops.",
    objectives: ["Handle cursor/page-based pagination", "Implement exponential backoff retry decorator", "Store raw JSON response into PostgreSQL JSONB column"],
    architecture: `[Third-Party REST API] ===> [Python Requests + Retry] ===> [JSON Normalization] ===> [PostgreSQL JSONB + Structured Tables]`,
    folderStructure: `api_ingestion/\n├── ingest.py\n└── README.md`,
    codeSnippet: `import requests
import time

def fetch_paginated_api(base_url, max_pages=5):
    all_records = []
    page = 1
    while page <= max_pages:
        res = requests.get(f"{base_url}?page={page}", timeout=10)
        if res.status_code == 200:
            data = res.json()
            if not data: break
            all_records.extend(data)
            page += 1
            time.sleep(1) # Respect rate limits!
        elif res.status_code == 429:
            time.sleep(10) # Backoff
        else:
            break
    return all_records`,
    expectedOutput: "Flawless ingestion of 1,000+ API records without encountering 429 rate limit blocks.",
    testing: "Mock API responses with responses library simulating 500 errors and pagination boundaries.",
    deployment: "Run on AWS Lambda or scheduled container.",
    improvements: "Store stateful high-water mark timestamp to only fetch newly created records (incremental sync)."
  },
  {
    id: "de-proj-cleaning-pipeline",
    track: "de",
    tier: "Beginner",
    title: "Automated Data Quality & Schema Cleaning Pipeline",
    category: "Data Wrangling",
    summary: "Build an automated file-watcher pipeline that detects incoming raw CSV/Excel drops, enforces schema types, strips whitespace, and logs data profiling stats.",
    techStack: ["Python", "Pandas", "Watchdog", "Logging"],
    problemStatement: "Business partners drop manual Excel sheets with inconsistent casing, unexpected header names, and corrupted date formats.",
    objectives: ["Watch folder for new files", "Normalize column headers to snake_case", "Log profiling metrics"],
    architecture: `[Incoming Folder] ===> [Watchdog Trigger] ===> [Schema Sanitizer] ===> [Processed Storage + Audit Log]`,
    folderStructure: `auto_cleaning/\n├── watcher.py\n├── rules.py\n└── README.md`,
    codeSnippet: `print("Automated Data Cleaner: Normalizing column names to lower_snake_case and converting date formats.")`,
    expectedOutput: "Auto-cleaned standardized datasets moved to /processed folder with execution audit logs.",
    testing: "Test with Excel files containing merged cells and missing headers.",
    deployment: "Run as persistent systemd Linux service.",
    improvements: "Send instant Slack alert when schema validation rejects a malformed file."
  },
  {
    id: "de-proj-excel-database",
    track: "de",
    tier: "Beginner",
    title: "Multi-Sheet Financial Excel Workbook Ingestion Engine",
    category: "Batch ETL",
    summary: "Parse complex multi-tab enterprise Excel models with merged header cells and formula calculations into normalized relational database schemas.",
    techStack: ["Python", "OpenPyXL", "Pandas", "SQLite", "SQLAlchemy"],
    problemStatement: "Finance departments rely on 15-tab Excel workbooks where manual copy-pasting into databases takes 8 hours every month-end.",
    objectives: ["Programmatically iterate workbook sheets", "Extract un-evaluated values vs formulas", "Load into normalized SQL star schema"],
    architecture: `[Financial Excel .xlsx] ===> [OpenPyXL Parser] ===> [Relational Normalization] ===> [SQL Database]`,
    folderStructure: `excel_ingestion/\n├── parse_workbook.py\n└── README.md`,
    codeSnippet: `print("Excel Engine: Parsing 12 monthly sheets into single continuous relational time series.")`,
    expectedOutput: "Converts 12-tab Excel sheet into clean unified SQL table in under 4 seconds.",
    testing: "Verify zero formula errors (#REF!, #DIV/0!) pass into SQL tables.",
    deployment: "CLI tool for finance analysts.",
    improvements: "Support password-encrypted Excel files."
  },

  // =========================================================================
  // DATA ENGINEERING: INTERMEDIATE PROJECTS
  // =========================================================================
  {
    id: "de-proj-airflow-pipeline",
    track: "de",
    tier: "Intermediate",
    title: "Production E-Commerce ETL Pipeline with Apache Airflow",
    category: "Workflow Orchestration",
    summary: "Build an enterprise-grade Airflow DAG that orchestrates daily database backups, API ingestion, dbt SQL transformations, and Slack failure alerts.",
    techStack: ["Apache Airflow", "Docker Compose", "PostgreSQL", "Python", "Slack Webhooks"],
    problemStatement: "Multi-step data pipelines fail silently at night; when one step fails, dependent steps execute anyway with corrupted data.",
    objectives: ["Deploy Airflow via Docker Compose", "Define DAG with task dependencies (>>)", "Configure Slack webhook alerting on task failure"],
    architecture: `[Airflow Scheduler] ===> [Extract Task] ===> [Validate Task] ===> [Transform Task] ===> [Slack Alert on Error]`,
    folderStructure: `airflow_production/
├── dags/
│   └── ecommerce_daily_dag.py
├── plugins/
│   └── slack_alert.py
├── docker-compose.yaml
└── README.md`,
    codeSnippet: `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    "owner": "data_ops",
    "retries": 2,
    "retry_delay": timedelta(minutes=3),
}

with DAG("ecommerce_etl_master", default_args=default_args, schedule_interval="@daily", start_date=datetime(2024, 1, 1), catchup=False) as dag:
    # DAG task definitions
    pass`,
    expectedOutput: "Airflow Web UI showing green checkmarks across all scheduled pipeline stages with automated retry recovery.",
    testing: "Test DAG integrity with pytest: assert len(dag.validation_errors) == 0 and assert len(dag.tasks) == 4.",
    deployment: "AWS MWAA (Managed Workflows for Apache Airflow) or Kubernetes with CeleryExecutor.",
    improvements: "Add SLA Miss callbacks alerting if DAG takes longer than 45 minutes to execute."
  },
  {
    id: "de-proj-webscrape-dw",
    track: "de",
    tier: "Intermediate",
    title: "Competitor Price Scraping to Cloud Data Warehouse Pipeline",
    category: "End-to-End Pipeline",
    summary: "Scrape daily competitor e-commerce prices with Scrapy, validate data quality with Great Expectations, and load into Snowflake/BigQuery for pricing intelligence.",
    techStack: ["Python", "Scrapy", "Great Expectations", "Snowflake", "dbt"],
    problemStatement: "Retail merchandising teams manually browse competitor sites to adjust prices, reacting days after competitors launch flash sales.",
    objectives: ["Build resilient Scrapy spider with user-agent rotation", "Validate schema with Great Expectations", "Incremental load to warehouse"],
    architecture: `[Competitor Websites] ===> [Scrapy Spider] ===> [S3 Raw Bucket] ===> [Snowflake COPY INTO] ===> [dbt Price Model]`,
    folderStructure: `price_scraper_dw/\n├── spiders/\n├── dbt_models/\n└── README.md`,
    codeSnippet: `print("Price Intelligence Pipeline: Scraping 5,000 daily competitor SKUs and updating Snowflake price history table.")`,
    expectedOutput: "Automated daily pricing dashboard alerting when competitors drop prices >10%.",
    testing: "Test proxy rotation under simulated 403 Forbidden responses.",
    deployment: "Scheduled via Airflow DAG running on ECS Fargate task.",
    improvements: "Implement computer vision similarity matching on product images."
  },
  {
    id: "de-proj-s3-datalake",
    track: "de",
    tier: "Intermediate",
    title: "AWS S3 Medallion Data Lake & Athena Serverless Analytics",
    category: "Cloud Data Lake",
    summary: "Architect a cost-effective cloud data lake on AWS S3 with Bronze (raw JSON), Silver (Parquet), and Gold (aggregates) zones queried via Amazon Athena.",
    techStack: ["AWS S3", "AWS Glue", "Amazon Athena", "Python", "PyArrow", "Parquet"],
    problemStatement: "Storing raw uncompressed JSON in S3 leads to slow Athena queries and massive query scan bills ($5 per TB scanned).",
    objectives: ["Partition data by year/month/day", "Convert row JSON to columnar Snappy-compressed Parquet", "Register partitions with AWS Glue Catalog"],
    architecture: `[Source Streams] ===> [S3 Bronze (JSON)] ===> [Glue PySpark Job] ===> [S3 Silver (Parquet)] ===> [Amazon Athena SQL]`,
    folderStructure: `s3_datalake/\n├── terraform/\n├── glue_job.py\n└── README.md`,
    codeSnippet: `import pyarrow as pa
import pyarrow.parquet as pq
import pandas as pd

df = pd.DataFrame({"user_id": [1, 2], "event": ["click", "view"], "year": [2024, 2024]})
table = pa.Table.from_pandas(df)
pq.write_to_dataset(table, root_path="s3://mlforge-datalake/silver/", partition_cols=["year"], compression="snappy")`,
    expectedOutput: "Reduces S3 storage size by 84% and speeds up Athena analytical queries by 12x while cutting query cost from $15/day to $0.80/day.",
    testing: "Verify Athena partition pruning works by checking Data Scanned in query execution metrics.",
    deployment: "Deploy infrastructure via Terraform (S3 buckets, Glue crawler, Athena workgroups).",
    improvements: "Add AWS Lake Formation fine-grained column-level access controls."
  },
  {
    id: "de-proj-pyspark-batch",
    track: "de",
    tier: "Intermediate",
    title: "Big Data Processing Pipeline with Apache PySpark",
    category: "Distributed Compute",
    summary: "Process 50 million ride-share telemetry records using PySpark: calculate trip durations, distance metrics, surge pricing analytics, and driver earnings.",
    techStack: ["Apache Spark", "PySpark", "Python", "HDFS / S3", "Docker"],
    problemStatement: "Single-node Python Pandas crashes with Out Of Memory (OOM) errors when attempting to load 40 GB monthly ride logs.",
    objectives: ["Initialize distributed SparkSession", "Optimize partition count to avoid data skew", "Write partitioned Parquet outputs"],
    architecture: `[40 GB Raw Parquet] ===> [PySpark Cluster] ===> [Distributed Joins & Aggregations] ===> [Summary Parquet Zone]`,
    folderStructure: `pyspark_pipeline/\n├── src/process_rides.py\n├── run_spark.sh\n└── README.md`,
    codeSnippet: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col, avg

spark = SparkSession.builder.appName("RideShareAnalytics").getOrCreate()
df = spark.read.parquet("data/rides_2024.parquet")

# Repartition to avoid skew
df_partitioned = df.repartition(16, "city")
summary = df_partitioned.groupBy("city").agg(avg("fare_amount").alias("avg_fare"))
summary.write.mode("overwrite").parquet("output/city_fare_summary")`,
    expectedOutput: "Processes 50M records in 42 seconds across a 4-node Spark cluster with zero OOM errors.",
    testing: "Inspect Spark Web UI for shuffle read/write bottlenecks and spilled memory.",
    deployment: "Submit job via spark-submit on AWS EMR or Dataproc cluster.",
    improvements: "Implement broadcast joins for small dimension lookup tables."
  },
  {
    id: "de-proj-postgres-to-dw",
    track: "de",
    tier: "Intermediate",
    title: "PostgreSQL to Snowflake Incremental ELT with dbt",
    category: "Modern Data Stack",
    summary: "Extract incremental changes from production PostgreSQL, load into Snowflake data warehouse, and build tested, modular SQL models using dbt.",
    techStack: ["PostgreSQL", "Snowflake", "dbt (data build tool)", "Airbyte / Python", "SQL"],
    problemStatement: "Re-copying entire transactional database tables every night takes 4 hours and blocks daytime database write operations.",
    objectives: ["Set up incremental loading based on updated_at timestamp", "Build staging, intermediate, and marts models in dbt", "Execute dbt test assertions"],
    architecture: `[Production Postgres] ===> [Airbyte Incremental Sync] ===> [Snowflake RAW schema] ===> [dbt Models (Staging -> Marts)]`,
    folderStructure: `dbt_project/
├── models/
│   ├── staging/
│   └── marts/
├── tests/
├── dbt_project.yml
└── profiles.yml`,
    codeSnippet: `{{ config(materialized='incremental', unique_key='order_id') }}

SELECT * FROM {{ source('raw_postgres', 'orders') }}
{% if is_incremental() %}
  WHERE updated_at > (SELECT MAX(updated_at) FROM {{ this }})
{% endif %}`,
    expectedOutput: "Nightly incremental pipeline executes in 3 minutes instead of 4 hours.",
    testing: "Run dbt test to enforce unique, not_null, and relationships constraints.",
    deployment: "dbt Cloud or Airflow Cosmos operator.",
    improvements: "Migrate to Change Data Capture (CDC) via Debezium."
  },

  // =========================================================================
  // DATA ENGINEERING: ADVANCED PROJECTS
  // =========================================================================
  {
    id: "de-proj-kafka-realtime",
    track: "de",
    tier: "Advanced",
    title: "Real-Time Event Streaming Pipeline with Apache Kafka & Python",
    category: "Streaming Systems",
    summary: "Architect a resilient real-time streaming pipeline: simulated financial transactions, multi-broker Kafka cluster, schema validation, and low-latency fraud detection consumer.",
    techStack: ["Apache Kafka", "Docker Compose", "Python", "Kafka-Python", "PostgreSQL"],
    problemStatement: "Credit card fraud must be caught within 200 milliseconds of transaction swipe, impossible with hourly batch ETL.",
    objectives: ["Spin up 3-broker Kafka cluster + ZooKeeper in Docker", "Implement idempotent producer with transactional writes", "Build real-time consumer tracking sliding window transaction volume"],
    architecture: `[Payment Gateway] ===> [Kafka Producer (p=3)] ===> [Kafka Broker Cluster] ===> [Fraud Detection Consumer] ===> [Redis Alert Flag + DB Sink]`,
    folderStructure: `kafka_streaming_pipeline/
├── docker-compose.yml
├── producer/
│   └── transaction_producer.py
├── consumer/
│   └── fraud_detector.py
├── config/
└── README.md`,
    codeSnippet: `from kafka import KafkaConsumer, KafkaProducer
import json

# Real-time consumer evaluating velocity rule (>3 swipes in 60s)
consumer = KafkaConsumer(
    "card-swipes",
    bootstrap_servers=["localhost:9092"],
    group_id="fraud-velocity-engine",
    value_deserializer=lambda m: json.loads(m.decode("utf-8")),
    auto_offset_reset="latest"
)

user_windows = {}
for msg in consumer:
    event = msg.value
    uid = event["user_id"]
    now = event["timestamp"]
    # Check sliding window
    window = [t for t in user_windows.get(uid, []) if now - t <= 60]
    window.append(now)
    user_windows[uid] = window
    if len(window) >= 3:
        print(f"FRAUD VELOCITY ALERT: User {uid} made {len(window)} transactions in 60s!")`,
    expectedOutput: "Detects and flags high-velocity fraudulent transactions in <85 milliseconds.",
    testing: "Simulate consumer broker kill and verify consumer group rebalancing and zero duplicate message commits.",
    deployment: "AWS MSK (Amazon Managed Streaming for Apache Kafka) or Confluent Cloud.",
    improvements: "Upgrade to Kafka Streams or Apache Flink for stateful exactly-once sliding window joins."
  },
  {
    id: "de-proj-airflow-postgres-lake",
    track: "de",
    tier: "Advanced",
    title: "End-to-End Enterprise Data Platform: Airflow, Postgres & Data Lake",
    category: "Enterprise Architecture",
    summary: "Comprehensive multi-tier enterprise pipeline orchestrating raw data extraction, bronze-to-gold lakehouse transformations, data quality testing, and metadata tracking.",
    techStack: ["Apache Airflow", "PostgreSQL", "Amazon S3", "Apache Iceberg", "Docker", "Great Expectations"],
    problemStatement: "Disconnected point-to-point scripts create untraceable data pipelines with zero central lineage or compliance auditing.",
    objectives: ["Unify batch extraction and warehouse loading under single Airflow DAG", "Automate data quality gatekeepers that halt downstream pipeline if tests fail"],
    architecture: `[Operational DB] ===> [Airflow Orchestrator] ===> [S3 Bronze] ===> [Great Expectations Quality Gate] ===> [S3 Silver/Gold (Iceberg)] ===> [Analytics DB]`,
    folderStructure: `enterprise_platform/\n├── dags/\n├── sql/\n├── tests/\n└── docker-compose.yml`,
    codeSnippet: `print("Enterprise Platform: Airflow DAG orchestrating end-to-end extraction, quality verification, and gold layer publishing.")`,
    expectedOutput: "Self-healing enterprise data platform with automated alerting and verifiable data lineage.",
    testing: "Automated end-to-end integration tests running in ephemeral Docker environment.",
    deployment: "Kubernetes via Helm charts with GitOps CI/CD.",
    improvements: "Implement OpenLineage metadata emission to Marquez UI."
  },
  {
    id: "de-proj-aws-lakehouse",
    track: "de",
    tier: "Advanced",
    title: "AWS Cloud Data Lakehouse with Apache Iceberg & Redshift",
    category: "Cloud Lakehouse",
    summary: "Build an open-format Cloud Data Lakehouse on AWS S3 using Apache Iceberg, AWS Glue Data Catalog, and Amazon Redshift Spectrum.",
    techStack: ["AWS S3", "Apache Iceberg", "AWS Glue", "Amazon Redshift", "Terraform", "Python"],
    problemStatement: "Organizations need ACID transactions, GDPR deletions, and time-travel rollbacks on cheap S3 object storage without paying proprietary warehouse lock-in fees.",
    objectives: ["Create Apache Iceberg tables on S3", "Perform ACID INSERT, UPDATE, and DELETE operations directly on Parquet files", "Query snapshots historically using Iceberg time travel"],
    architecture: `[Ingestion Engine] ===> [S3 Iceberg Table (Parquet + Metadata JSON)] ===> [Glue Data Catalog] ===> [Redshift Spectrum & Athena]`,
    folderStructure: `aws_lakehouse/\n├── terraform/\n├── iceberg_ops.py\n└── README.md`,
    codeSnippet: `print("AWS Iceberg Lakehouse: Performing ACID row-level DELETE on S3 Parquet dataset without rewriting partition files.")`,
    expectedOutput: "Full ACID table semantics on open S3 storage with snapshot time-travel capability.",
    testing: "Execute Concurrent Write Conflict tests to confirm optimistic concurrency control (OCC).",
    deployment: "Terraform automated infrastructure deployment.",
    improvements: "Enable automated Iceberg table compaction (bin-packing) and snapshot expiration maintenance jobs."
  },
  {
    id: "de-proj-bigdata-spark",
    track: "de",
    tier: "Advanced",
    title: "Petabyte-Scale Distributed Clickstream Processing with PySpark",
    category: "Big Data Processing",
    summary: "Ingest and process 1 Billion raw website clickstream JSON events using PySpark on AWS EMR: sessionization, bot traffic filtering, and funnel attribution.",
    techStack: ["Apache Spark", "PySpark", "AWS EMR", "Amazon S3", "Python"],
    problemStatement: "Raw web clickstream JSON files arrive at 200 GB/day with nested structures and 25% robotic bot traffic inflating analytics.",
    objectives: ["Filter robotic user-agents using regex heuristics", "Perform 30-minute user sessionization window calculations", "Optimize Spark shuffle partitions and memory storage fractions"],
    architecture: `[1B Raw JSON Clicks] ===> [AWS EMR Cluster (16 Nodes)] ===> [PySpark Sessionizer] ===> [Optimized Columnar Parquet Mart]`,
    folderStructure: `spark_clickstream/\n├── sessionize.py\n├── submit_emr.sh\n└── README.md`,
    codeSnippet: `print("Petabyte Spark: Sessionizing 1 billion click events into distinct 30-minute user browsing sessions.")`,
    expectedOutput: "Processes 1 Billion records in 18 minutes on AWS EMR cluster.",
    testing: "Verify zero data loss across stage shuffles using record count reconciliation assertions.",
    deployment: "EMR Serverless or Databricks job workflow.",
    improvements: "Implement adaptive query execution (AQE) for dynamic partition coalescing."
  },
  {
    id: "de-proj-realtime-spark-kafka",
    track: "de",
    tier: "Advanced",
    title: "Real-Time Analytics Pipeline with Apache Kafka & Spark Streaming",
    category: "Stream Processing",
    summary: "End-to-end real-time stream processing architecture: ingest continuous sensor streams via Kafka, aggregate 5-minute tumbling windows in Spark Structured Streaming, and sink to MongoDB.",
    techStack: ["Apache Kafka", "Apache Spark Structured Streaming", "MongoDB", "Docker", "Python"],
    problemStatement: "Industrial factory machinery failures cost $50,000/hr; predictive sensor temperature spikes must be caught within seconds of occurrence.",
    objectives: ["Stream events from Kafka into Spark Structured Streaming", "Compute 5-minute watermarked tumbling aggregations", "Maintain exactly-once write guarantees via checkpointing"],
    architecture: `[IoT Sensor Fleet] ===> [Kafka Topic] ===> [Spark Structured Streaming] ===> [5-Min Window Watermark] ===> [MongoDB Real-Time Sinks]`,
    folderStructure: `kafka_spark_streaming/\n├── streaming_job.py\n├── docker-compose.yml\n└── README.md`,
    codeSnippet: `from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col, window

spark = SparkSession.builder.appName("KafkaSparkIoT").getOrCreate()
raw_stream = spark.readStream.format("kafka").option("kafka.bootstrap.servers", "localhost:9092").option("subscribe", "iot-sensors").load()

# Watermarked window aggregation
# query = parsed.withWatermark("timestamp", "10 minutes").groupBy(window("timestamp", "5 minutes"), "device_id").avg("temp")
print("Kafka + Spark Streaming: Processing sliding window sensor aggregations with 10-minute late-data watermark.")`,
    expectedOutput: "Continuous sub-second streaming metrics written to MongoDB with stateful failure recovery from checkpoints.",
    testing: "Inject delayed out-of-order records to verify watermark dropping logic.",
    deployment: "Kubernetes Spark Operator.",
    improvements: "Integrate PyTorch streaming model inference for real-time anomaly prediction."
  },
  {
    id: "de-proj-cloud-platform",
    track: "de",
    tier: "Advanced",
    title: "Complete Enterprise Cloud Data Engineering Platform (IaC)",
    category: "Cloud Platform Architecture",
    summary: "Full-scale enterprise production cloud data platform deployed via Terraform: multi-VPC networking, Snowflake warehouse, Airflow orchestration, and automated CI/CD pipelines.",
    techStack: ["Terraform", "AWS", "Snowflake", "GitHub Actions", "Docker", "dbt", "Airflow"],
    problemStatement: "Organizations face months of manual setup and security drift across disconnected AWS, Snowflake, and Airflow configurations.",
    objectives: ["Automate 100% of infrastructure via Infrastructure as Code (Terraform)", "Set up GitHub Actions CI/CD with automated plan/apply testing", "Enforce least-privilege IAM roles and encrypted storage"],
    architecture: `[GitHub Push] ===> [GitHub Actions CI/CD] ===> [Terraform Apply] ===> [AWS S3 + Glue + Snowflake + MWAA Airflow]`,
    folderStructure: `cloud_data_platform/
├── terraform/
│   ├── main.tf
│   ├── s3.tf
│   ├── snowflake.tf
│   └── iam.tf
├── .github/workflows/
│   └── deploy_infra.yml
└── README.md`,
    codeSnippet: `print("Enterprise Platform IaC: 1-click provisioning of entire production cloud data architecture in 12 minutes.")`,
    expectedOutput: "Completely reproducible, audited cloud data infrastructure deployed in 12 minutes.",
    testing: "Terraform validate, tflint, and tfsec security vulnerability scans in CI.",
    deployment: "Automated GitOps deployment via GitHub Actions with production approval gates.",
    improvements: "Implement automated FinOps cost anomaly alerts and budget kill-switches."
  }
];
