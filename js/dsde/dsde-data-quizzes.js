/**
 * MLForge Practice Questions, MCQs & Engineering Challenges Database
 * Interactive quizzes spanning Beginner, Intermediate, and Advanced tiers
 * across Data Science and Data Engineering domains with instant explanations.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsde = window.MLForge.dsde || {};
window.MLForge.dsde.data = window.MLForge.dsde.data || {};

MLForge.dsde.data.quizzes = [
  // =========================================================================
  // BEGINNER TIER
  // =========================================================================
  {
    id: "quiz-ds-b1",
    tier: "Beginner",
    track: "ds",
    category: "Statistics Fundamentals",
    question: "If a company has 10 employees where 9 earn $50,000 and the CEO earns $2,000,000, which metric best represents the typical employee's income?",
    options: [
      "The Mean ($245,000)",
      "The Median ($50,000)",
      "The Standard Deviation ($617,000)",
      "The Range ($1,950,000)"
    ],
    correctIndex: 1,
    explanation: "Because the CEO's $2,000,000 salary is an extreme outlier, it pulls the Mean up to $245,000 (which none of the 9 typical employees make). The Median ($50,000) reflects the true central income of typical staff."
  },
  {
    id: "quiz-ds-b2",
    tier: "Beginner",
    track: "ds",
    category: "Python & Pandas",
    question: "In Pandas, what does df.dropna(subset=['email']) do?",
    options: [
      "Deletes the 'email' column from the DataFrame",
      "Fills all missing values in the 'email' column with blank text",
      "Drops only the rows where the 'email' column has a NaN or null value",
      "Drops all rows where ANY column in the entire DataFrame has a NaN value"
    ],
    correctIndex: 2,
    explanation: "The `subset=['email']` parameter restricts the drop operation: rows with nulls in other columns are kept, but rows missing an email are dropped."
  },
  {
    id: "quiz-de-b1",
    tier: "Beginner",
    track: "de",
    category: "Databases & SQL",
    question: "Which of the following is an example of an OLTP workload?",
    options: [
      "A nightly query scanning 50 million rows to calculate quarterly regional profits",
      "An e-commerce user clicking 'Place Order' and inserting 1 row into an orders table",
      "Training a linear regression model on 5 years of historical financial records",
      "Generating a monthly business intelligence sales dashboard in Tableau"
    ],
    correctIndex: 1,
    explanation: "OLTP (Online Transaction Processing) systems handle fast, real-time, day-to-day application transactions with low latency reads/writes on single records."
  },
  {
    id: "quiz-de-b2",
    tier: "Beginner",
    track: "de",
    category: "Data Pipelines",
    question: "What makes an ETL/ELT pipeline operation 'idempotent'?",
    options: [
      "It executes faster than 100 milliseconds",
      "Running it multiple times with the same input yields the exact same final result without duplicates",
      "It requires zero Python code and runs entirely in SQL",
      "It automatically scales down to zero servers when traffic is low"
    ],
    correctIndex: 1,
    explanation: "Idempotency means that executing a job once or rerunning it 10 times results in the exact same database state, preventing duplicate records during automated retries."
  },

  // =========================================================================
  // INTERMEDIATE TIER
  // =========================================================================
  {
    id: "quiz-ds-i1",
    tier: "Intermediate",
    track: "ds",
    category: "A/B Testing & Statistics",
    question: "In an A/B test with significance level alpha = 0.05, your test results return a P-value of 0.018. What is the correct statistical conclusion?",
    options: [
      "Fail to reject the null hypothesis; the test is inconclusive",
      "Reject the null hypothesis; the observed lift is statistically significant (p < 0.05)",
      "There is an 18% chance that the treatment is effective",
      "The new design will increase revenue by exactly 1.8%"
    ],
    correctIndex: 1,
    explanation: "Since the P-value (0.018) is strictly less than alpha (0.05), we reject the null hypothesis and conclude that the observed conversion lift is statistically significant."
  },
  {
    id: "quiz-ds-i2",
    tier: "Intermediate",
    track: "ds",
    category: "Machine Learning Prep",
    question: "Why should you never fit a StandardScaler on the entire dataset before doing train_test_split?",
    options: [
      "StandardScaler only works on arrays of length under 1,000",
      "It causes Data Leakage: information (mean and standard deviation) from the test set leaks into the training set",
      "The test set will automatically become 100% zeroes",
      "Scikit-learn raises a syntax error if fit() is called before train_test_split"
    ],
    correctIndex: 1,
    explanation: "Fitting a scaler or imputer before splitting leaks information from the test set into training, producing artificially optimistic metrics that degrade in production."
  },
  {
    id: "quiz-de-i1",
    tier: "Intermediate",
    track: "de",
    category: "Data Warehousing",
    question: "In a Kimball Star Schema, how do Fact tables typically differ from Dimension tables?",
    options: [
      "Fact tables store text strings; Dimension tables store numeric floats",
      "Fact tables store quantitative measurements and foreign keys (tall and narrow); Dimension tables store descriptive context attributes (short and wide)",
      "Fact tables are completely normalized in 3NF; Dimension tables have zero primary keys",
      "Fact tables are only stored in memory; Dimension tables are stored on disk"
    ],
    correctIndex: 1,
    explanation: "Fact tables contain numeric facts (amounts, counts, durations) and foreign keys, often containing millions of rows. Dimension tables provide context (customer name, city, category)."
  },
  {
    id: "quiz-de-i2",
    tier: "Intermediate",
    track: "de",
    category: "Apache Airflow",
    question: "In Apache Airflow, what operator syntax is used to define that Task A must succeed before Task B runs?",
    options: [
      "task_a >> task_b",
      "task_a.then(task_b)",
      "task_b << task_a (also equivalent) or task_a >> task_b",
      "Both A and C are correct"
    ],
    correctIndex: 3,
    explanation: "Airflow overloads Python's bitshift operators: `task_a >> task_b` sets task_b downstream of task_a. `task_b << task_a` sets task_a upstream of task_b."
  },

  // =========================================================================
  // ADVANCED TIER
  // =========================================================================
  {
    id: "quiz-ds-a1",
    tier: "Advanced",
    track: "ds",
    category: "Dimensionality Reduction",
    question: "In Principal Component Analysis (PCA), which of the following is true about the Principal Components?",
    options: [
      "They are non-linear polynomial combinations of features",
      "They are mutually orthogonal (uncorrelated) linear combinations that maximize variance",
      "They preserve the exact original categorical labels of the training dataset",
      "The first principal component always captures 100% of the total dataset variance"
    ],
    correctIndex: 1,
    explanation: "PCA constructs orthogonal (90-degree perpendicular, uncorrelated) linear axes, where PC1 points in the direction of maximum variance, PC2 in the second highest orthogonal variance, and so on."
  },
  {
    id: "quiz-de-a1",
    tier: "Advanced",
    track: "de",
    category: "Apache Kafka",
    question: "If a Kafka topic has 4 partitions and a consumer group has 6 active consumer instances, how many consumers will actively receive messages?",
    options: [
      "All 6 consumers will receive identical copies of every message",
      "Only 4 consumers will be assigned partitions; 2 consumers will sit idle on standby",
      "Messages will be split into 6 sub-partitions automatically",
      "Kafka will crash due to consumer group overflow"
    ],
    correctIndex: 1,
    explanation: "In Kafka, a single partition can only be consumed by at most one consumer instance within the same consumer group. With 4 partitions and 6 consumers, 4 consumers get 1 partition each, and 2 remain idle as automatic failover backups."
  },
  {
    id: "quiz-de-a2",
    tier: "Advanced",
    track: "de",
    category: "Distributed Compute (Spark)",
    question: "Which of the following PySpark operations is a WIDE transformation that triggers a distributed shuffle?",
    options: [
      "df.select('user_id', 'amount')",
      "df.filter(col('amount') > 100)",
      "df.groupBy('country').sum('amount')",
      "df.withColumn('double_amt', col('amount') * 2)"
    ],
    correctIndex: 2,
    explanation: "groupBy triggers a wide transformation because records with the same country key residing on different worker nodes must be shuffled across the network to a common executor node."
  }
];
