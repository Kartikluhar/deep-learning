/**
 * MLForge Career Roadmaps: Data Science & Data Engineering
 * 6 Complete, structured career roadmaps with skills, learning orders, tools,
 * recommended projects, milestones, and interview preparation guides.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsde = window.MLForge.dsde || {};
window.MLForge.dsde.data = window.MLForge.dsde.data || {};

MLForge.dsde.data.roadmaps = [
  {
    id: "roadmap-data-scientist",
    title: "Data Scientist Career Roadmap",
    track: "ds",
    badge: "Core Role",
    salaryRange: "$115,000 – $175,000 / year",
    overview: "Data Scientists combine statistical theory, programming, and business acumen to extract deep insights, test hypotheses, and build predictive machine learning models that guide strategic enterprise decisions.",
    milestones: [
      {
        phase: "Phase 1: Mathematics, Statistics & Programming Fundamentals",
        duration: "Months 1–2",
        description: "Master Python programming, linear algebra, calculus, descriptive statistics, and probability distributions.",
        skills: ["Python Core & OOP", "Linear Algebra (Vectors, Matrices, Dot Product)", "Descriptive & Inferential Stats", "Hypothesis Testing & P-values"],
        tools: ["Python 3.11+", "VS Code", "Jupyter Notebook", "NumPy", "SciPy"],
        projectGoal: "Build an interactive hypothesis testing & statistical calculator script analyzing real-world public survey data."
      },
      {
        phase: "Phase 2: Data Wrangling, Cleaning & Exploratory Analysis (EDA)",
        duration: "Months 3–4",
        description: "Learn to ingest messy real-world datasets, impute missing values, detect outliers with IQR, and build publication-grade charts.",
        skills: ["Pandas DataFrames", "Data Cleaning & Imputation", "Feature Engineering", "Univariate/Bivariate EDA", "Data Storytelling"],
        tools: ["Pandas", "Matplotlib", "Seaborn", "Plotly Express", "Requests"],
        projectGoal: "Perform an extensive Exploratory Data Analysis project on an e-commerce or streaming catalog dataset with 15+ actionable insights."
      },
      {
        phase: "Phase 3: Machine Learning Algorithms & Cross-Validation",
        duration: "Months 5–6",
        description: "Master classical supervised and unsupervised machine learning algorithms, evaluation metrics, and leak-free pipelines.",
        skills: ["Linear & Logistic Regression", "Decision Trees & Random Forests", "Gradient Boosting (XGBoost, LightGBM)", "K-Means & PCA", "Cross-Validation & Grid Search"],
        tools: ["Scikit-Learn", "XGBoost", "Joblib", "SHAP"],
        projectGoal: "End-to-End Customer Churn Predictor with leak-proof ColumnTransformer preprocessing and SHAP model explainability."
      },
      {
        phase: "Phase 4: Advanced Modeling, A/B Testing & Production Serving",
        duration: "Months 7–8",
        description: "Learn randomized experiment design, A/B testing statistical validation, time-series forecasting, and REST API deployment.",
        skills: ["A/B Testing & Sample Sizing", "Time-Series (ARIMA/Prophet)", "FastAPI Microservices", "Docker Containerization", "Model Monitoring & Drift"],
        tools: ["FastAPI", "Docker", "Statsmodels", "Prophet", "Streamlit"],
        projectGoal: "Deploy a production-grade Credit Risk / Fraud Detection REST API with interactive Streamlit demo app."
      }
    ],
    interviewPrep: [
      "Explain the Bias-Variance tradeoff and how regularization (L1 Lasso vs L2 Ridge) mitigates overfitting.",
      "How do you detect and prevent data leakage in a predictive modeling pipeline?",
      "Walk through the mathematical steps of an independent two-sample T-test.",
      "Explain how a Random Forest reduces variance compared to a single deep decision tree."
    ]
  },

  {
    id: "roadmap-data-analyst",
    title: "Data Analyst Career Roadmap",
    track: "ds",
    badge: "Fastest Entry",
    salaryRange: "$75,000 – $115,000 / year",
    overview: "Data Analysts translate complex operational data into clear visual dashboards, business reports, and actionable KPI presentations for executives and department heads.",
    milestones: [
      {
        phase: "Phase 1: Advanced SQL & Relational Databases",
        duration: "Months 1–2",
        description: "Master writing fast, complex SQL queries to extract, aggregate, and analyze data from relational database warehouses.",
        skills: ["SELECT, WHERE, GROUP BY, HAVING", "Joins (Inner, Left, Full, Cross)", "Window Functions (ROW_NUMBER, RANK, LAG/LEAD)", "Common Table Expressions (CTEs)"],
        tools: ["PostgreSQL", "MySQL", "DBeaver", "Google BigQuery"],
        projectGoal: "Perform 30-day cohort retention analysis and customer lifetime value queries on a live SQL database."
      },
      {
        phase: "Phase 2: Business Intelligence & Interactive Dashboarding",
        duration: "Months 3–4",
        description: "Transform raw SQL tables into dynamic, high-impact executive dashboards adhering to modern data storytelling principles.",
        skills: ["Data Modeling (Star Schema)", "DAX / Calculated Fields", "Interactive Filters & Drill-downs", "Executive KPI Design (5-second rule)"],
        tools: ["Power BI", "Tableau", "Excel (Power Query & XLOOKUP)"],
        projectGoal: "Design an interactive, 3-page Executive Sales & Revenue Dashboard with dynamic regional filters."
      },
      {
        phase: "Phase 3: Exploratory Python Analytics & Applied Statistics",
        duration: "Months 5–6",
        description: "Leverage Python to automate routine Excel workflows, clean messy spreadsheets, and calculate descriptive statistics.",
        skills: ["Python for Automation", "Pandas Data Wrangling", "Statistical Summary Metrics", "Automated Email Reporting"],
        tools: ["Python", "Pandas", "Seaborn", "Jupyter Notebook"],
        projectGoal: "Automated Weekly Business Performance audit script that ingests CSVs and emails PDF reports to managers."
      }
    ],
    interviewPrep: [
      "What is the difference between WHERE and HAVING in SQL?",
      "Explain the difference between ROW_NUMBER(), RANK(), and DENSE_RANK().",
      "How do you design a dashboard that avoids cognitive overload for C-level executives?",
      "How do you handle missing or duplicate values when calculating monthly active users (MAU)?"
    ]
  },

  {
    id: "roadmap-data-engineer",
    title: "Data Engineer Career Roadmap",
    track: "de",
    badge: "High Demand",
    salaryRange: "$125,000 – $190,000 / year",
    overview: "Data Engineers design, construct, and maintain scalable data pipelines, storage systems, and workflow orchestrators that deliver clean, timely data to the entire company.",
    milestones: [
      {
        phase: "Phase 1: Advanced SQL, Python & Database Internals",
        duration: "Months 1–2",
        description: "Master database mechanics, indexing, transactions, ACID properties, and Python data manipulation.",
        skills: ["Advanced SQL & B-Tree Indexing", "EXPLAIN ANALYZE Query Plans", "ACID & Transactions", "Python Pipeline Scripts", "Relational Schema Design"],
        tools: ["PostgreSQL", "Python 3.11+", "SQLAlchemy", "Docker", "Git"],
        projectGoal: "Build a production-grade CSV-to-PostgreSQL ETL pipeline with Pydantic schema validation and idempotent upsert logic."
      },
      {
        phase: "Phase 2: Workflow Orchestration & Data Warehousing",
        duration: "Months 3–4",
        description: "Orchestrate complex multi-step pipelines with Airflow and design dimensional data warehouses with dbt.",
        skills: ["Airflow DAGs & Operators", "Idempotent Pipeline Design", "Kimball Dimensional Modeling (Star Schema)", "dbt Transformations & Data Tests"],
        tools: ["Apache Airflow", "Snowflake / BigQuery", "dbt", "Docker Compose"],
        projectGoal: "Build an automated end-to-end Airflow pipeline that extracts API data nightly, loads into Snowflake, and runs dbt data models."
      },
      {
        phase: "Phase 3: Big Data Distributed Processing & Cloud Platforms",
        duration: "Months 5–6",
        description: "Scale beyond single-machine limits using Apache Spark and architect cloud data lakes on AWS or GCP.",
        skills: ["Distributed Computing Fundamentals", "PySpark Transformations & Actions", "Data Lake Architecture (Bronze/Silver/Gold)", "AWS S3, Glue & Athena"],
        tools: ["Apache Spark (PySpark)", "AWS S3", "AWS Glue", "Amazon Athena", "Parquet"],
        projectGoal: "Process a 40 GB clickstream dataset using PySpark on AWS EMR, converting raw JSON into partitioned Snappy-compressed Parquet."
      },
      {
        phase: "Phase 4: Real-Time Streaming & Data Engineering DevOps",
        duration: "Months 7–8",
        description: "Handle real-time low-latency event streams with Apache Kafka and deploy automated pipelines via CI/CD and Terraform.",
        skills: ["Event-Driven Streaming Architecture", "Kafka Producers, Consumers & Partitions", "Exactly-Once Processing Semantics", "Terraform Infrastructure as Code", "Data Observability & Lineage"],
        tools: ["Apache Kafka", "Terraform", "GitHub Actions", "Great Expectations", "OpenLineage"],
        projectGoal: "Architect a real-time fraud detection event streaming pipeline using Apache Kafka and Python consumers."
      }
    ],
    interviewPrep: [
      "How does Apache Kafka guarantee message ordering, and what are partition keys?",
      "Explain the difference between ETL and ELT, and why modern teams prefer ELT.",
      "How do you design an Airflow DAG to be 100% idempotent?",
      "Explain how B-Tree indexes work in PostgreSQL and why adding an index slows down write operations."
    ]
  },

  {
    id: "roadmap-analytics-engineer",
    title: "Analytics Engineer Career Roadmap",
    track: "de",
    badge: "Modern Stack",
    salaryRange: "$110,000 – $165,000 / year",
    overview: "Analytics Engineers sit between Data Engineers and Data Analysts. They apply software engineering best practices (Git, testing, CI/CD, modularity) to data transformation inside the warehouse using tools like dbt.",
    milestones: [
      {
        phase: "Phase 1: Advanced SQL & Data Warehousing",
        duration: "Months 1–2",
        description: "Deep dive into columnar analytical databases and dimensional modeling techniques.",
        skills: ["Complex Analytical SQL", "Dimensional Modeling (Facts & Dimensions)", "Star vs Snowflake Schemas", "Slowly Changing Dimensions (SCD Types 1, 2)"],
        tools: ["Snowflake", "BigQuery", "PostgreSQL", "Git / GitHub"],
        projectGoal: "Model an e-commerce transactional database into a clean Kimball star schema with fact and dimension tables."
      },
      {
        phase: "Phase 2: The dbt (Data Build Tool) Masterclass",
        duration: "Months 3–4",
        description: "Master modern data modeling with dbt: staging, intermediate, and marts layers, Jinja macros, and automated testing.",
        skills: ["dbt Models & Materializations", "Jinja Templating & Macros", "dbt Tests & Source Freshness", "Automated Lineage & Documentation"],
        tools: ["dbt Core / dbt Cloud", "YAML", "Git Feature Branching"],
        projectGoal: "Build a production dbt project transforming raw warehouse data into curated marts with automated test assertions."
      },
      {
        phase: "Phase 3: Semantic Layers, CI/CD & Data Governance",
        duration: "Months 5–6",
        description: "Ensure business metric consistency across BI tools using semantic layers and automated CI test runs on pull requests.",
        skills: ["Metrics & Semantic Layer Design", "GitHub Actions for dbt CI/CD", "Data Governance & Cataloging", "Reverse ETL to Salesforce/HubSpot"],
        tools: ["GitHub Actions", "Census / Hightouch", "Power BI / Looker"],
        projectGoal: "Implement a GitHub Actions workflow that creates a temporary staging warehouse schema and tests dbt models on every PR."
      }
    ],
    interviewPrep: [
      "What is the difference between an ephemeral, view, and table materialization in dbt?",
      "How do you implement Slowly Changing Dimension Type 2 (SCD2) using dbt snapshots?",
      "Why is version control (Git) critical for analytics code?",
      "How do you test for referential integrity across fact and dimension tables?"
    ]
  },

  {
    id: "roadmap-big-data-engineer",
    title: "Big Data Engineer Career Roadmap",
    track: "de",
    badge: "Massive Scale",
    salaryRange: "$135,000 – $210,000 / year",
    overview: "Big Data Engineers specialize in petabyte-scale distributed computing, cluster management, parallel algorithms, and high-throughput real-time stream processing engines.",
    milestones: [
      {
        phase: "Phase 1: Distributed Systems & Big Data Fundamentals",
        duration: "Months 1–2",
        description: "Master distributed computing concepts: CAP theorem, distributed storage, data partitioning, and the Hadoop ecosystem.",
        skills: ["Distributed Storage & Replication", "Hadoop HDFS Architecture", "YARN Resource Negotiation", "Linux Systems & Bash Scripting"],
        tools: ["Hadoop HDFS", "Linux Ubuntu", "Docker", "Python / Java"],
        projectGoal: "Deploy a multi-node Hadoop HDFS cluster locally in Docker and verify block replication mechanics."
      },
      {
        phase: "Phase 2: Apache Spark Deep Dive (PySpark & Scala)",
        duration: "Months 3–4",
        description: "Master in-memory distributed compute with Spark: Catalyst optimizer, Tungsten execution engine, partitioning, and shuffle tuning.",
        skills: ["Spark Architecture (Driver vs Executors)", "Transformations vs Actions & Lazy Evaluation", "Data Skew & Broadcast Joins", "Memory Tuning & Caching"],
        tools: ["Apache Spark", "PySpark", "Delta Lake", "Jupyter"],
        projectGoal: "Optimize a 100-million row PySpark query pipeline, resolving data skew bottlenecks and cutting shuffle write times by 65%."
      },
      {
        phase: "Phase 3: Distributed Streaming & Real-Time Engines",
        duration: "Months 5–6",
        description: "Build stateful real-time streaming architectures using Apache Kafka, Spark Structured Streaming, and Apache Flink.",
        skills: ["Event Streaming & Pub/Sub", "Kafka Cluster Administration", "Watermarking & Late Data Handling", "Flink Stateful Event Processing"],
        tools: ["Apache Kafka", "Spark Streaming", "Apache Flink", "AWS MSK"],
        projectGoal: "Build a real-time IoT anomaly detection engine consuming 10,000 events/second with sliding window aggregations."
      }
    ],
    interviewPrep: [
      "What is a Spark shuffle, why is it expensive, and how can you minimize it?",
      "How does Spark's Catalyst Optimizer optimize physical execution plans?",
      "What is the difference between narrow and wide transformations in Spark?",
      "Explain the purpose of watermarking in stream processing."
    ]
  },

  {
    id: "roadmap-cloud-data-engineer",
    title: "Cloud Data Engineer Career Roadmap",
    track: "de",
    badge: "Enterprise Standard",
    salaryRange: "$130,000 – $195,000 / year",
    overview: "Cloud Data Engineers architect, secure, and automate cost-effective cloud-native data platforms across AWS, Google Cloud (GCP), or Microsoft Azure using Infrastructure as Code.",
    milestones: [
      {
        phase: "Phase 1: Cloud Provider Core Services & Security",
        duration: "Months 1–2",
        description: "Master enterprise cloud infrastructure: IAM least-privilege roles, VPC networking, encryption at rest/in transit, and object storage.",
        skills: ["Cloud Architecture Fundamentals", "IAM Roles & Security Policies", "VPC, Subnets & Security Groups", "Object Storage Classes & Lifecycle Rules"],
        tools: ["AWS S3 / GCS", "AWS IAM", "AWS KMS", "AWS CLI"],
        projectGoal: "Architect a secure, multi-tier cloud data lake bucket with automated lifecycle transitions to Glacier."
      },
      {
        phase: "Phase 2: Managed Cloud Warehouses & Serverless Compute",
        duration: "Months 3–4",
        description: "Build scalable serverless pipelines with AWS Glue/Lambda or GCP Dataflow/BigQuery.",
        skills: ["Serverless Event-Driven ETL", "Cloud Data Warehousing (Snowflake / BigQuery / Redshift)", "Serverless Ad-Hoc SQL (Athena)", "Cloud Cost Optimization"],
        tools: ["AWS Glue", "AWS Lambda", "BigQuery / Snowflake", "Amazon Athena"],
        projectGoal: "Build an event-driven serverless pipeline: file uploaded to S3 triggers Lambda to crawl and query data via Athena."
      },
      {
        phase: "Phase 3: Infrastructure as Code (Terraform) & Production CI/CD",
        duration: "Months 5–6",
        description: "Automate 100% of cloud resources using Terraform and enforce reproducible CI/CD deployments via GitHub Actions.",
        skills: ["Terraform HCL Syntax & Modules", "State Management (tfstate in S3)", "GitHub Actions CI/CD for Cloud", "FinOps & Cloud Cost Governance"],
        tools: ["Terraform", "GitHub Actions", "Docker", "Trivy"],
        projectGoal: "Deploy an entire end-to-end cloud data lakehouse architecture with a single 'terraform apply' command."
      }
    ],
    interviewPrep: [
      "How do you design a secure, least-privilege IAM policy for an automated ETL pipeline?",
      "Compare Amazon Redshift vs Google BigQuery vs Snowflake: architectural differences and pricing models.",
      "How do you manage remote state and state locking in Terraform?",
      "Explain how S3 lifecycle rules save up to 80% on long-term enterprise storage costs."
    ]
  }
];
