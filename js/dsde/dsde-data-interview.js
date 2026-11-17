/**
 * MLForge Data Science & Data Engineering Interview Question Bank
 * Curated technical and scenario questions across 15 core categories
 * spanning Beginner, Intermediate, and Advanced difficulty levels.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsde = window.MLForge.dsde || {};
window.MLForge.dsde.data = window.MLForge.dsde.data || {};

MLForge.dsde.data.interviewQuestions = [
  // =========================================================================
  // 1. PYTHON
  // =========================================================================
  {
    id: "py-q1",
    category: "Python",
    tier: "Beginner",
    question: "What is the difference between mutable and immutable data types in Python, and why does it matter in data science?",
    answer: "Mutable objects (like lists, dictionaries, and sets) can have their contents modified in place after creation without changing their memory address (id). Immutable objects (like integers, floats, strings, and tuples) cannot be altered; any change creates a completely new object in memory. In data science, passing a mutable DataFrame or list into a function can inadvertently mutate the original dataset unless a copy is explicitly created (.copy()), causing subtle data bugs."
  },
  {
    id: "py-q2",
    category: "Python",
    tier: "Intermediate",
    question: "What is a Python generator, and why is it essential when processing large datasets?",
    answer: "A generator is a special function that yields values one at a time using the 'yield' keyword instead of returning a complete list in memory all at once. Because generators evaluate lazily on-the-fly, they consume almost zero RAM ($O(1)$ memory complexity). This allows data engineers to stream and process 50 GB log files line-by-line on a laptop with only 8 GB of RAM without crashing with MemoryError."
  },
  {
    id: "py-q3",
    category: "Python",
    tier: "Advanced",
    question: "Explain the Python Global Interpreter Lock (GIL) and how to bypass it for CPU-bound data processing.",
    answer: "The GIL is a mutex lock in CPython that prevents multiple native OS threads from executing Python bytecodes simultaneously, ensuring memory safety in CPython's reference counting. For CPU-bound data operations (like matrix math or image processing), Python multithreading does not provide true multi-core parallelism. To bypass the GIL: 1) Use the 'multiprocessing' module or 'concurrent.futures.ProcessPoolExecutor' to spawn separate OS processes with independent GILs; 2) Offload operations to vectorized C/C++ libraries like NumPy, PyTorch, or Polars that release the GIL during execution; 3) Use PySpark or Dask for distributed clustering."
  },

  // =========================================================================
  // 2. STATISTICS
  // =========================================================================
  {
    id: "stat-q1",
    category: "Statistics",
    tier: "Beginner",
    question: "When should you use Median instead of Mean to describe the center of a distribution?",
    answer: "You should use the Median whenever the data is skewed or contains extreme outliers. The Mean adds up all numbers and divides by count, so a single billionaire in a room of 50 students skews the mean salary into millions of dollars. The Median simply picks the physical middle value of the sorted array, making it robust against extreme values. Real-world examples include household incomes, house sale prices, and website latency spikes."
  },
  {
    id: "stat-q2",
    category: "Statistics",
    tier: "Intermediate",
    question: "Explain the Central Limit Theorem (CLT) and why it is the backbone of A/B testing.",
    answer: "The Central Limit Theorem states that as sample size grows sufficiently large ($n \\ge 30$), the distribution of the sample mean approaches a Normal (Gaussian) distribution, regardless of the underlying population's shape (even if skewed, uniform, or bimodal). In A/B testing, user conversion counts or click behavior may be heavily skewed Bernoulli distributions, but CLT allows us to use standard Z-tests and normal confidence intervals to compare sample means between variant A and variant B."
  },
  {
    id: "stat-q3",
    category: "Statistics",
    tier: "Advanced",
    question: "What is the difference between Type I and Type II errors in hypothesis testing, and how does statistical power relate to them?",
    answer: "A Type I Error (False Positive, probability $\\alpha$, typically 0.05) occurs when you reject the null hypothesis when it is actually true (e.g. concluding a new drug cures disease when it doesn't). A Type II Error (False Negative, probability $\\beta$) occurs when you fail to reject the null hypothesis when it is actually false (missing a real breakthrough). Statistical Power is defined as $1 - \\beta$: the probability of correctly detecting a real effect when one exists. In industry A/B testing, power is standardly set to 80% (0.80) to size experiment cohorts adequately."
  },

  // =========================================================================
  // 3. NUMPY
  // =========================================================================
  {
    id: "np-q1",
    category: "NumPy",
    tier: "Beginner",
    question: "What is NumPy broadcasting and what are the two core compatibility rules?",
    answer: "Broadcasting describes how NumPy treats arrays with different shapes during arithmetic operations without making expensive unnecessary memory copies. The smaller array is conceptually 'broadcast' across the larger array. The rule: Two dimensions are compatible when: 1) they are equal, OR 2) one of them is 1. If neither condition is met, NumPy throws a ValueError."
  },
  {
    id: "np-q2",
    category: "NumPy",
    tier: "Intermediate",
    question: "What is the difference between a view and a copy in NumPy, and how can you check which one you have?",
    answer: "A 'view' is a new array object that looks at the exact same underlying memory buffer as the original array. Modifying elements in a view mutates the original array! Slicing operations (e.g. `a[1:4]`) produce views for speed. A 'copy' allocates a brand new, completely independent chunk of memory. Modifying a copy does not affect the original. You can check if an array owns its memory by inspecting `arr.base`; if `arr.base is None`, it is an original array or copy; if it returns another array, it is a view."
  },

  // =========================================================================
  // 4. PANDAS
  // =========================================================================
  {
    id: "pd-q1",
    category: "Pandas",
    tier: "Beginner",
    question: "What is the difference between loc and iloc in Pandas?",
    answer: "`loc` is label-based indexing: you select rows and columns using their string index names or boolean condition arrays (e.g. `df.loc[df['age'] > 25, ['name', 'salary']]`). The endpoint in label slicing is inclusive. `iloc` is integer-position based indexing: you select rows and columns by their numerical indices from 0 to N-1 (e.g. `df.iloc[0:5, 1:3]`). The endpoint in integer slicing is exclusive, matching standard Python slicing rules."
  },
  {
    id: "pd-q2",
    category: "Pandas",
    tier: "Intermediate",
    question: "What is the difference between merge, join, and concat in Pandas?",
    answer: "`pd.merge()` is the full-featured relational SQL-style join mechanism, joining DataFrames on common column keys or indices using 'inner', 'left', 'right', or 'outer' logic. `df.join()` is a convenience method that joins primarily on row indices. `pd.concat()` stitches together multiple DataFrames either vertically (stacking rows along axis=0) or horizontally (placing columns side-by-side along axis=1)."
  },

  // =========================================================================
  // 5. EDA & DATA CLEANING
  // =========================================================================
  {
    id: "eda-q1",
    category: "EDA & Cleaning",
    tier: "Intermediate",
    question: "Explain the IQR rule for outlier detection and how to handle detected outliers.",
    answer: "The IQR rule defines outliers as any data point falling below $Q_1 - 1.5 \\times \\text{IQR}$ or above $Q_3 + 1.5 \\times \\text{IQR}$, where $Q_1$ is the 25th percentile, $Q_3$ is the 75th percentile, and $\\text{IQR} = Q_3 - Q_1$. To handle them: 1) Trim/Drop: remove if due to measurement or data entry errors; 2) Cap/Winsorize: clip values to the upper and lower threshold boundaries; 3) Transform: apply log or Box-Cox transformation to reduce heavy right-skew; 4) Model Choice: use tree-based models (Random Forest) which are naturally immune to monotonic outlier scale."
  },

  // =========================================================================
  // 6. SQL FOR DATA SCIENCE
  // =========================================================================
  {
    id: "sql-q1",
    category: "SQL",
    tier: "Intermediate",
    question: "What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK() in SQL?",
    answer: "When ranking identical tie values (e.g. two employees tied with salary $100k): `ROW_NUMBER()` assigns strictly sequential unique numbers regardless of ties (1, 2, 3, 4). `RANK()` assigns the same rank to ties and skips subsequent numbers (1, 2, 2, 4). `DENSE_RANK()` assigns the same rank to ties but does NOT skip numbers (1, 2, 2, 3)."
  },
  {
    id: "sql-q2",
    category: "SQL",
    tier: "Advanced",
    question: "What is a Common Table Expression (CTE) and when is a Recursive CTE needed?",
    answer: "A CTE is a named temporary result set defined with the `WITH` keyword at the beginning of a SQL statement, dramatically improving query readability compared to deeply nested subqueries. A Recursive CTE references itself and is required when querying hierarchical or graph data structures of unknown depth, such as organizational management trees (manager to employee), file directory paths, or multi-hop flight itineraries."
  },

  // =========================================================================
  // 7. ETL & PIPELINES
  // =========================================================================
  {
    id: "etl-q1",
    category: "ETL & Pipelines",
    tier: "Intermediate",
    question: "What is Idempotency in data engineering and why is it essential for pipeline retries?",
    answer: "An idempotent pipeline guarantees that executing the job multiple times with the same input produces the exact same final state without creating duplicate records or corrupted data. This is critical because in cloud environments, network glitches and machine restarts cause pipelines to retry automatically. Making a pipeline idempotent is achieved via 'UPSERT' (INSERT ON CONFLICT DO UPDATE) or by deleting the destination partition before inserting."
  },

  // =========================================================================
  // 8. APACHE AIRFLOW
  // =========================================================================
  {
    id: "af-q1",
    category: "Airflow",
    tier: "Intermediate",
    question: "What is an Airflow DAG and what are the main components of the Airflow architecture?",
    answer: "A DAG (Directed Acyclic Graph) is a collection of all tasks you want to run, organized in a way that reflects their relationships and dependencies without any circular loops. The 4 main architectural components are: 1) Scheduler: monitors DAGs and triggers tasks whose dependencies are met; 2) Webserver: UI for inspecting runs, logs, and task states; 3) Metadata Database: relational DB (PostgreSQL) storing task state; 4) Executor & Workers: the compute engine executing task code."
  },

  // =========================================================================
  // 9. APACHE SPARK & BIG DATA
  // =========================================================================
  {
    id: "spark-q1",
    category: "Spark & Big Data",
    tier: "Advanced",
    question: "What is a Spark Shuffle, why is it expensive, and how can you minimize it?",
    answer: "A Spark Shuffle is the physical redistribution of data across cluster worker nodes across the network, triggered by wide transformations like `groupByKey`, `reduceByKey`, or `join`. It is the single most expensive operation in Spark because it requires serializing data to disk, transferring it over network switches, and sorting it on recipient nodes. To minimize: 1) Use Broadcast Joins (`broadcast(small_df)`) when joining with small lookup tables; 2) Use `reduceByKey` instead of `groupByKey` to aggregate on worker nodes before shuffling; 3) Repartition strategically."
  },

  // =========================================================================
  // 10. APACHE KAFKA & STREAMING
  // =========================================================================
  {
    id: "kafka-q1",
    category: "Kafka & Streaming",
    tier: "Advanced",
    question: "How does Apache Kafka achieve horizontal scalability while preserving message ordering?",
    answer: "Kafka scales horizontally by partitioning topics. A topic is split into multiple independent partitions distributed across different brokers in the cluster. Messages with the same Partition Key (e.g. `user_id`) are guaranteed to hash to the exact same partition. Kafka strictly guarantees FIFO message ordering *within a single partition*, but not across different partitions. Independent consumers in a Consumer Group read from distinct partitions in parallel."
  },

  // =========================================================================
  // 11. DATA WAREHOUSING & MODELING
  // =========================================================================
  {
    id: "dw-q1",
    category: "Data Warehousing",
    tier: "Intermediate",
    question: "Compare a Star Schema vs a Snowflake Schema in dimensional modeling.",
    answer: "In a Star Schema, a central Fact table connects directly to completely denormalized Dimension tables in 1-to-many relationships (looking like a star). Queries require few SQL JOINs and execute with peak speed on columnar warehouses, though dimensions store repeated text. In a Snowflake Schema, dimension tables are further normalized into sub-dimension tables (e.g. Dim_Customer references Dim_City which references Dim_State). Snowflake saves storage space but requires multi-table joins that slow down analytical queries."
  },
  {
    id: "dw-q2",
    category: "Data Warehousing",
    tier: "Advanced",
    question: "What is a Slowly Changing Dimension Type 2 (SCD2) and how is it implemented?",
    answer: "SCD Type 2 preserves the complete historical trajectory of dimension changes over time by creating a new record whenever an attribute changes, rather than overwriting existing records. It is implemented by adding columns: `effective_start_date`, `effective_end_date` (NULL or 9999-12-31 for current), and an `is_current` boolean flag. When an address changes, the old row's `effective_end_date` is updated to current timestamp and `is_current` set to FALSE, and a new row is inserted with `is_current = TRUE`."
  },

  // =========================================================================
  // 12. CLOUD DATA ENGINEERING
  // =========================================================================
  {
    id: "cloud-q1",
    category: "Cloud Data Engineering",
    tier: "Intermediate",
    question: "Why is Parquet format preferred over CSV or JSON for Cloud Data Warehouses and Data Lakes?",
    answer: "1) Columnar Storage: Queries selecting 3 columns out of 50 only scan and read those 3 columns from S3, reducing I/O and query cost by 90%; 2) Massive Compression: Similar data types in the same column compress tightly with Snappy or ZSTD (typically 75-85% size reduction); 3) Embedded Metadata: Stores min/max statistics per data page, allowing query engines (Athena, Redshift, Snowflake) to skip entire files without scanning them (predicate pushdown)."
  },

  // =========================================================================
  // 13. SYSTEM DESIGN SCENARIOS
  // =========================================================================
  {
    id: "sys-q1",
    category: "System Design for DE",
    tier: "Advanced",
    question: "Design an end-to-end telemetry analytics system handling 100,000 IoT sensor events per second with sub-second dashboard alerts and historical query support.",
    answer: "Architecture: 1) Ingestion: Edge IoT sensors push telemetry over MQTT/HTTP to an AWS Network Load Balancer feeding an Apache Kafka (or AWS Kinesis) cluster with 32 partitions; 2) Real-Time Path: Apache Flink (or Spark Streaming) consumes from Kafka, computes sliding 1-minute anomaly detection aggregations, and sinks alerts to Redis powering a live WebSockets dashboard; 3) Long-Term Storage Path: Kafka Connect (or Kinesis Firehose) batches raw events into 128 MB Snappy-compressed Parquet files written to S3 Bronze Lake; 4) Warehouse Path: AWS Glue hourly job cleans and compacts Bronze into an Apache Iceberg Silver table queried via Amazon Athena and Snowflake for historical BI."
  }
];
