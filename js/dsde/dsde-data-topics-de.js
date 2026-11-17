/**
 * MLForge Data Engineering Curriculum Topics Database
 * Comprehensive, production-grade lessons covering pipelines, databases,
 * distributed computing (Spark), real-time streaming (Kafka), orchestration (Airflow),
 * data warehousing, lakehouses, cloud data architectures, and DevOps.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsde = window.MLForge.dsde || {};
window.MLForge.dsde.data = window.MLForge.dsde.data || {};

MLForge.dsde.data.deTopics = [
  // =========================================================================
  // TOPIC 13: INTRODUCTION TO DATA ENGINEERING
  // =========================================================================
  {
    id: "intro-data-engineering",
    track: "de",
    title: "Introduction to Data Engineering & The Modern Data Stack",
    category: "Data Engineering Fundamentals",
    categoryNumber: 8,
    difficulty: "Beginner",
    readTime: "14 min",
    summary: "Discover the vital discipline of Data Engineering: moving data reliably from raw sources to analytical destinations, the 5 stages of the DE lifecycle, OLTP vs OLAP, and ETL vs ELT.",
    content: `
      <h2>1. Simple Definition: What is Data Engineering?</h2>
      <p>Imagine building a state-of-the-art modern kitchen with world-class celebrity chefs (Data Scientists and ML Engineers). If there is no plumbing running fresh water to the sinks, no electricity powering the stoves, and the delivery trucks carrying raw ingredients are late and rotten, the chefs cannot cook a single dish.</p>
      <p><strong>Data Engineering</strong> is the foundational plumbing, electricity, and supply chain of the AI ecosystem. Data Engineers design, build, test, and maintain resilient data pipelines, storage systems, and distributed platforms that deliver clean, fresh, reliable data to analysts and machine learning models 24/7/365.</p>

      <div class="dsde-card-analogy">
        <strong>Daily Life Analogy:</strong> A Data Scientist is like a race car driver tuning the engine for top speed. A Data Engineer is the civil engineer who paves the smooth asphalt highway, constructs the bridges, sets up the high-speed fuel supply lines, and clears traffic jams so the car can race at 200 mph without crashing.
      </div>

      <h2>2. The 5 Stages of the Data Engineering Lifecycle</h2>
      <ol>
        <li><strong>Generation:</strong> Source applications, web servers, microservices, mobile apps, IoT sensors, and third-party SaaS tools produce raw events.</li>
        <li><strong>Storage:</strong> Selecting the optimal storage engine: transactional databases, object stores (S3), distributed file systems (HDFS), and data lakes.</li>
        <li><strong>Ingestion:</strong> Moving data into the storage ecosystem via batch (scheduled hourly/nightly) or real-time streaming (Kafka, Kinesis).</li>
        <li><strong>Transformation:</strong> Cleansing, deduplicating, validating, joining, and structuring raw data into business-ready analytical models (dbt, Spark, SQL).</li>
        <li><strong>Serving:</strong> Powering downstream consumers: BI dashboards, analytical queries, feature stores, and real-time ML inference APIs.</li>
      </ol>

      <h2>3. OLTP vs OLAP: Two Different Worlds of Databases</h2>
      <div class="dsde-table-wrapper">
        <table class="dsde-concept-table">
          <thead>
            <tr>
              <th>Characteristic</th>
              <th>OLTP (Online Transaction Processing)</th>
              <th>OLAP (Online Analytical Processing)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Primary Purpose</strong></td>
              <td>Day-to-day application operations</td>
              <td>Complex analytical reporting &amp; business intelligence</td>
            </tr>
            <tr>
              <td><strong>Data Structure</strong></td>
              <td>Normalized (3NF) to prevent write anomalies</td>
              <td>Denormalized (Star/Snowflake Schema) for read speed</td>
            </tr>
            <tr>
              <td><strong>Storage Format</strong></td>
              <td>Row-oriented (PostgreSQL, MySQL)</td>
              <td>Columnar-oriented (Snowflake, BigQuery, Redshift, ClickHouse)</td>
            </tr>
            <tr>
              <td><strong>Query Type</strong></td>
              <td>Fast lookups &amp; updates on single records</td>
              <td>Aggregations over millions of rows (SUM, AVG, COUNT)</td>
            </tr>
            <tr>
              <td><strong>Latency Target</strong></td>
              <td>Milliseconds (&lt;10ms)</td>
              <td>Seconds to minutes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>4. End-to-End Data Movement Architecture</h2>
      <div class="dsde-diagram-container">
        <pre class="dsde-code-pre" style="color: #38bdf8;">
+------------------+      +-------------------+      +--------------------+      +--------------------+
|   RAW SOURCES    |      |     INGESTION     |      |  STORAGE / LAKE    |      |   TRANSFORMATION   |
+------------------+ ===&gt; +-------------------+ ===&gt; +--------------------+ ===&gt; +--------------------+
| Microservices DB |      | Kafka / PubSub    |      | Amazon S3 (Bronze) |      | Apache Spark / dbt |
| Mobile App Events|      | Fivetran / Airbyte|      | Parquet / Iceberg  |      | Python Pandas ETL  |
| Third-party APIs |      | AWS Kinesis       |      | Delta Lake         |      | SQL Warehousing    |
+------------------+      +-------------------+      +--------------------+      +--------------------+
                                                                                            ||
                                                                                            \\/
                                                                                 +--------------------+
                                                                                 | SERVING &amp; VALUE    |
                                                                                 +--------------------+
                                                                                 | BI (Power BI/Tab)  |
                                                                                 | ML Feature Store   |
                                                                                 | Reverse ETL to CRM |
                                                                                 +--------------------+
        </pre>
      </div>
    `
  },

  // =========================================================================
  // TOPIC 14: ADVANCED SQL & DATABASE ENGINEERING
  // =========================================================================
  {
    id: "advanced-sql-database-engineering",
    track: "de",
    title: "Advanced SQL & Database Engineering: Indexing, ACID & Sharding",
    category: "Databases & Storage",
    categoryNumber: 8,
    difficulty: "Intermediate",
    readTime: "18 min",
    summary: "Production database internals: B-Tree indexes, EXPLAIN ANALYZE query planning, ACID transactions, Normalization vs Denormalization, Partitioning, and Connection Pooling in PostgreSQL.",
    content: `
      <h2>1. How Relational Databases Work Under the Hood</h2>
      <p>A relational database management system (RDBMS) like <strong>PostgreSQL</strong> or <strong>MySQL</strong> provides ACID-compliant durability. When a query arrives, the SQL parser checks syntax, the query planner evaluates table statistics and cost heuristics, and the execution engine retrieves data pages from the buffer cache or disk.</p>

      <h2>2. Database Indexing: Why Queries Go from 10 Seconds to 2 Milliseconds</h2>
      <p>Without an index, the database must perform a <strong>Sequential Scan (Seq Scan)</strong>, reading every single disk block in the table ($O(N)$). A <strong>B-Tree Index</strong> organizes keys in a balanced tree ($O(\\log N)$):</p>
      <pre class="dsde-code-pre">
-- Creating a compound B-Tree index on customer_id and created_at
CREATE INDEX idx_orders_cust_date ON orders (customer_id, created_at DESC);

-- Inspecting execution plan with EXPLAIN ANALYZE
EXPLAIN ANALYZE 
SELECT * FROM orders 
WHERE customer_id = 45902 
ORDER BY created_at DESC 
LIMIT 10;
      </pre>

      <h2>3. Transactions and ACID Guarantees</h2>
      <ul>
        <li><strong>Atomicity:</strong> All statements in a transaction succeed together or are rolled back completely. No half-finished transactions.</li>
        <li><strong>Consistency:</strong> The database transitions from one valid state to another, strictly enforcing all schema constraints, primary keys, and foreign keys.</li>
        <li><strong>Isolation:</strong> Concurrent transactions execute without stepping on each other (Read Committed, Repeatable Read, Serializable).</li>
        <li><strong>Durability:</strong> Once a transaction is committed, its changes survive power loss or system crashes (enforced by the Write-Ahead Log / WAL).</li>
      </ul>

      <h2>4. Table Partitioning: Taming Terabyte-Scale Tables</h2>
      <p>When a table grows past tens of millions of rows, partitioning divides it into smaller physical sub-tables while maintaining a single logical table interface:</p>
      <pre class="dsde-code-pre">
-- PostgreSQL Range Partitioning by Year
CREATE TABLE telemetry_events (
    event_id BIGSERIAL,
    event_time TIMESTAMP NOT NULL,
    device_id INT,
    payload JSONB
) PARTITION BY RANGE (event_time);

-- Creating physical partition for Year 2024
CREATE TABLE telemetry_2024 PARTITION OF telemetry_events
    FOR VALUES FROM ('2024-01-01 00:00:00') TO ('2025-01-01 00:00:00');
      </pre>
    `
  },

  // =========================================================================
  // TOPIC 15: NOSQL DATABASES & DISTRIBUTED STORAGE
  // =========================================================================
  {
    id: "nosql-databases",
    track: "de",
    title: "NoSQL Databases: MongoDB, Redis, Cassandra & CAP Theorem",
    category: "Databases & Storage",
    categoryNumber: 8,
    difficulty: "Intermediate",
    readTime: "16 min",
    summary: "When relational SQL fails to scale: Key-Value (Redis), Document (MongoDB), Column-Family (Cassandra), Search (Elasticsearch), CAP theorem tradeoffs, and eventual consistency.",
    content: `
      <h2>1. The Four Types of NoSQL Systems</h2>
      <div class="dsde-table-wrapper">
        <table class="dsde-concept-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Leading Examples</th>
              <th>Data Model</th>
              <th>Best Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Key-Value</strong></td>
              <td>Redis, AWS DynamoDB</td>
              <td>Hash Map (Key $\\to$ Value)</td>
              <td>Caching, session state, rate limiters (sub-millisecond latency)</td>
            </tr>
            <tr>
              <td><strong>Document</strong></td>
              <td>MongoDB, Couchbase</td>
              <td>Hierarchical JSON / BSON</td>
              <td>User profiles, e-commerce product catalogs with varying schemas</td>
            </tr>
            <tr>
              <td><strong>Wide-Column</strong></td>
              <td>Apache Cassandra, ScyllaDB, HBase</td>
              <td>Sparse 2D multidimensional map</td>
              <td>Time-series telemetry, write-heavy IoT event logging across clusters</td>
            </tr>
            <tr>
              <td><strong>Search Engine</strong></td>
              <td>Elasticsearch, OpenSearch</td>
              <td>Inverted Index</td>
              <td>Full-text search, log aggregation, log analytics (ELK stack)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>2. The CAP Theorem (Brewer's Theorem)</h2>
      <p>In any distributed data store, you can only guarantee <strong>at most two</strong> of the following three guarantees simultaneously:</p>
      <ul>
        <li><strong>Consistency (C):</strong> Every read receives the most recent write or an error.</li>
        <li><strong>Availability (A):</strong> Every non-failing node returns a non-error response, but without guarantee it contains the latest write.</li>
        <li><strong>Partition Tolerance (P):</strong> The system continues to operate despite network messages being dropped or delayed between nodes.</li>
      </ul>
      <div class="dsde-card-tip">
        <strong>The Real Choice:</strong> Because physical network cables can always be cut (partitions are inevitable in distributed systems), the real-world engineering choice is between <strong>CP (Consistency + Partition Tolerance)</strong> (like MongoDB, HBase) and <strong>AP (Availability + Partition Tolerance)</strong> (like Cassandra, DynamoDB with Eventual Consistency).
      </div>
    `
  },

  // =========================================================================
  // TOPIC 16: DATA PIPELINES & ETL / ELT
  // =========================================================================
  {
    id: "data-pipelines-etl-elt",
    track: "de",
    title: "Data Pipelines & ETL vs ELT: Architecture & Resilience",
    category: "Pipelines & Orchestration",
    categoryNumber: 9,
    difficulty: "Intermediate",
    readTime: "18 min",
    summary: "Architecting batch and streaming data pipelines: Extract, Transform, Load vs Extract, Load, Transform, Incremental loading, Change Data Capture (CDC), and Idempotency.",
    content: `
      <h2>1. What is a Data Pipeline?</h2>
      <p>A <strong>Data Pipeline</strong> is an automated series of sequential steps that extracts data from raw sources, transforms it into clean formats, and loads it into a destination data store for consumption.</p>

      <h2>2. ETL vs ELT: The Architectural Paradigm Shift</h2>
      <div class="dsde-table-wrapper">
        <table class="dsde-concept-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>ETL (Extract - Transform - Load)</th>
              <th>ELT (Extract - Load - Transform)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>When Invented</strong></td>
              <td>1970s - 2000s (On-premise hardware)</td>
              <td>2010s - Present (Cloud Data Warehouses)</td>
            </tr>
            <tr>
              <td><strong>Where Compute Occurs</strong></td>
              <td>Separate compute server (Informatica, Python)</td>
              <td>Inside the target warehouse (Snowflake, BigQuery)</td>
            </tr>
            <tr>
              <td><strong>Raw Data Preservation</strong></td>
              <td>Discarded during transformation</td>
              <td>100% of raw data stored permanently in warehouse</td>
            </tr>
            <tr>
              <td><strong>Flexibility</strong></td>
              <td>Rigid: adding new fields requires rebuilding pipeline</td>
              <td>High: analysts transform raw tables on-demand with SQL (dbt)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>3. Idempotency: The #1 Rule of Production Pipelines</h2>
      <div class="dsde-card-warning">
        <strong>Golden Engineering Rule: Idempotency!</strong><br>
        An operation is <strong>idempotent</strong> if running it once or running it 100 times produces the <em>exact same outcome</em> without creating duplicate records or corrupted state.<br>
        <strong>Bad Pipeline:</strong> <code>INSERT INTO orders SELECT ...</code> (Retrying after a network failure inserts duplicate rows!).<br>
        <strong>Idempotent Pipeline:</strong> <code>INSERT INTO orders ... ON CONFLICT (order_id) DO UPDATE ...</code> or deleting the target partition before re-inserting: <code>DELETE FROM daily_orders WHERE date = '2024-03-01'; INSERT INTO ...</code>
      </div>

      <h2>4. Change Data Capture (CDC)</h2>
      <p>Instead of running massive slow batch queries that scan entire tables every night (<code>SELECT * FROM users WHERE updated_at &gt; ...</code>), <strong>Change Data Capture (CDC)</strong> reads the database's internal transaction log (Postgres WAL, MySQL binlog) directly. Tools like Debezium stream every <code>INSERT</code>, <code>UPDATE</code>, and <code>DELETE</code> into Kafka with near-zero overhead on the production database!</p>
    `
  },

  // =========================================================================
  // TOPIC 17: APACHE AIRFLOW
  // =========================================================================
  {
    id: "apache-airflow",
    track: "de",
    title: "Apache Airflow: Workflow Orchestration, DAGs & Scheduling",
    category: "Pipelines & Orchestration",
    categoryNumber: 9,
    difficulty: "Intermediate",
    readTime: "18 min",
    summary: "Master enterprise orchestration: Airflow architecture (Scheduler, Webserver, Workers, Metadata DB), authoring Python DAGs, Operators, Sensors, XComs, and automated retries.",
    content: `
      <h2>1. What is Apache Airflow and Why is Cron Not Enough?</h2>
      <p>Simple cron jobs (<code>0 2 * * * python script.py</code>) work for one small server. But in an enterprise with 50 interdependent pipelines, cron fails completely: it cannot handle task dependencies (Task B should only run if Task A succeeded), automatic retries with exponential backoff, visual failure alerts, or distributed worker pools. <strong>Apache Airflow</strong> solves all of this by defining workflows as <strong>Code in Python</strong>.</p>

      <h2>2. Airflow Architecture Components</h2>
      <ul>
        <li><strong>Scheduler:</strong> Heart of Airflow. Continuously monitors all DAG files, resolves dependencies, and schedules ready tasks.</li>
        <li><strong>Webserver:</strong> User interface to inspect DAGs, trigger manual runs, view task duration graphs, and inspect live log streams.</li>
        <li><strong>Metadata Database:</strong> Relational database (PostgreSQL/MySQL) storing the state of all DAGs, task runs, variables, and user credentials.</li>
        <li><strong>Workers &amp; Executor:</strong> The actual compute engines running the tasks (Sequential, Local, Celery, or KubernetesExecutor).</li>
      </ul>

      <h2>3. Complete Production Airflow DAG Example</h2>
      <pre class="dsde-code-pre">
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator

# Default arguments applied to all tasks in the DAG
default_args = {
    "owner": "data_engineering",
    "depends_on_past": False,
    "email_on_failure": True,
    "email": ["alerts@mlforge.ai"],
    "retries": 3,
    "retry_delay": timedelta(minutes=5),
}

def extract_api_data(**context):
    print("Extracting records from payment gateway API...")
    return 15420 # Pushed automatically to XCom

def transform_records(**context):
    ti = context["ti"]
    record_count = ti.xcom_pull(task_ids="extract_task")
    print(f"Transforming and validating {record_count} transactions...")

# Define the DAG
with DAG(
    dag_id="daily_ecommerce_etl",
    default_args=default_args,
    description="Daily ETL pipeline aggregating sales data",
    schedule_interval="0 3 * * *", # Daily at 3:00 AM UTC
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=["sales", "production"],
) as dag:

    start_task = BashOperator(
        task_id="start_pipeline",
        bash_command="echo 'ETL Pipeline Started at $(date)'"
    )

    extract = PythonOperator(
        task_id="extract_task",
        python_callable=extract_api_data
    )

    transform = PythonOperator(
        task_id="transform_task",
        python_callable=transform_records
    )

    # Set dependency chain using bitshift operators
    start_task &gt;&gt; extract &gt;&gt; transform
      </pre>
    `
  },

  // =========================================================================
  // TOPIC 18: BIG DATA & APACHE SPARK
  // =========================================================================
  {
    id: "big-data-apache-spark",
    track: "de",
    title: "Big Data Engineering & Apache Spark (PySpark)",
    category: "Distributed Big Data",
    categoryNumber: 10,
    difficulty: "Advanced",
    readTime: "20 min",
    summary: "Scale past single-machine RAM limits: The 5 Vs of Big Data, Hadoop vs Spark, Spark architecture (Driver & Executors), PySpark DataFrames, Transformations vs Actions, and Caching.",
    content: `
      <h2>1. The 5 Vs of Big Data</h2>
      <ul>
        <li><strong>Volume:</strong> Terabytes to petabytes of data that cannot fit on a single computer's hard drive or RAM.</li>
        <li><strong>Velocity:</strong> High-speed arrival rate (e.g. millions of ad impressions or IoT pings per second).</li>
        <li><strong>Variety:</strong> Diverse formats: relational tables, JSON, audio, clickstream logs, satellite imagery.</li>
        <li><strong>Veracity:</strong> Trustworthiness, data quality, and inconsistency management.</li>
        <li><strong>Value:</strong> Turning massive raw volumes into profitable insights.</li>
      </ul>

      <h2>2. Why Apache Spark Replaced Hadoop MapReduce</h2>
      <p>Hadoop MapReduce persisted all intermediate computation state to slow spinning disk drives after each map/reduce step. <strong>Apache Spark</strong> keeps data in <strong>RAM (In-Memory Processing)</strong> across cluster worker nodes, executing workloads <strong>10 to 100 times faster</strong>!</p>

      <h2>3. Transformations vs Actions &amp; Lazy Evaluation</h2>
      <ul>
        <li><strong>Lazy Evaluation:</strong> Spark does not execute code when you define a transformation (like <code>df.filter()</code> or <code>df.select()</code>). It builds a <strong>Directed Acyclic Graph (DAG)</strong> of logical execution plan steps.</li>
        <li><strong>Transformations:</strong> Return a new DataFrame (e.g. <code>filter</code>, <code>select</code>, <code>groupBy</code>, <code>join</code>). Nothing runs yet!</li>
        <li><strong>Actions:</strong> Trigger actual distributed execution and return a result to the driver or write to storage (e.g. <code>count()</code>, <code>collect()</code>, <code>show()</code>, <code>write.parquet()</code>).</li>
      </ul>

      <h2>4. PySpark Code Example: Distributed Log Processing</h2>
      <pre class="dsde-code-pre">
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, count, avg

# Initialize distributed Spark session
spark = SparkSession.builder \\
    .appName("MLForge-LogAnalyzer") \\
    .master("local[*]") \\
    .getOrCreate()

# Read 10 million server logs lazily from Parquet files
df = spark.read.parquet("s3://mlforge-logs/year=2024/month=03/")

# Transformations: Filter 500 server errors and aggregate by endpoint
error_summary = df.filter(col("status_code") &gt;= 500) \\
    .groupBy("endpoint") \\
    .agg(
        count("*").alias("total_errors"),
        avg("response_time_ms").alias("avg_latency")
    ) \\
    .orderBy(col("total_errors").desc())

# Action: Trigger distributed execution and show top 10 error endpoints
error_summary.show(10, truncate=False)
      </pre>
    `
  },

  // =========================================================================
  // TOPIC 19: STREAMING DATA & APACHE KAFKA
  // =========================================================================
  {
    id: "streaming-data-apache-kafka",
    track: "de",
    title: "Streaming Data Engineering & Apache Kafka",
    category: "Distributed Big Data",
    categoryNumber: 10,
    difficulty: "Advanced",
    readTime: "20 min",
    summary: "Real-time event streaming: Batch vs Stream, Kafka architecture (Producers, Topics, Partitions, Brokers, Consumer Groups, Offsets), Kafka Connect, and Delivery Guarantees.",
    content: `
      <h2>1. Batch Processing vs Stream Processing</h2>
      <p>In traditional <strong>Batch Processing</strong>, you wait for data to accumulate over an hour or a day before running a job (high latency, high throughput). In <strong>Stream Processing</strong>, you process every single event within milliseconds as it occurs (low latency, continuous).</p>

      <h2>2. Apache Kafka Architecture: The Distributed Commit Log</h2>
      <p>Kafka is an open-source distributed event store and stream processing platform designed to handle trillions of events a day:</p>
      <ul>
        <li><strong>Producer:</strong> Client applications that publish (write) events to Kafka topics.</li>
        <li><strong>Broker:</strong> Kafka server nodes in a cluster that persist messages to disk and serve consumer reads.</li>
        <li><strong>Topic:</strong> A categorized feed or stream name to which records are published (e.g. <code>user-clicks</code>, <code>payments</code>).</li>
        <li><strong>Partition:</strong> Topics are split into multiple partitions distributed across brokers for horizontal scale. <em>Order is strictly guaranteed only within a single partition!</em></li>
        <li><strong>Consumer &amp; Consumer Group:</strong> Applications that read from topics. A consumer group allows multiple worker instances to divide partitions among themselves for parallel consumption.</li>
        <li><strong>Offset:</strong> A sequential integer assigned to each message in a partition, tracking exactly how far each consumer has read.</li>
      </ul>

      <h2>3. Python Code: Kafka Producer and Consumer</h2>
      <pre class="dsde-code-pre">
# Producer: Sending payment events to Kafka
import json
from kafka import KafkaProducer

producer = KafkaProducer(
    bootstrap_servers=["localhost:9092"],
    value_serializer=lambda v: json.dumps(v).encode("utf-8")
)

event = {"transaction_id": "tx_9921", "amount": 149.99, "currency": "USD"}
producer.send("payment-events", value=event)
producer.flush()
print("Event published successfully!")

# Consumer: Real-time fraud detection listener
from kafka import KafkaConsumer

consumer = KafkaConsumer(
    "payment-events",
    bootstrap_servers=["localhost:9092"],
    auto_offset_reset="earliest",
    group_id="fraud-detection-service",
    value_deserializer=lambda m: json.loads(m.decode("utf-8"))
)

for msg in consumer:
    payment = msg.value
    if payment["amount"] &gt; 5000:
        print(f"FLAGGED HIGH RISK TRANSACTION: {payment}")
      </pre>

      <h2>4. Delivery Guarantees: Exactly-Once Processing (EOS)</h2>
      <ul>
        <li><strong>At-Most-Once:</strong> Messages may be lost, but never duplicated (offsets committed before processing).</li>
        <li><strong>At-Least-Once:</strong> Messages are guaranteed never to be lost, but may be delivered more than once if workers crash before committing offsets.</li>
        <li><strong>Exactly-Once:</strong> Every message is processed exactly once by using transactional producer APIs and idempotent consumer sinks.</li>
      </ul>
    `
  },

  // =========================================================================
  // TOPIC 20: DATA WAREHOUSING & DATA MODELING
  // =========================================================================
  {
    id: "data-warehousing-modeling",
    track: "de",
    title: "Data Warehousing & Dimensional Modeling: Star vs Snowflake Schema",
    category: "Warehousing & Lakes",
    categoryNumber: 11,
    difficulty: "Intermediate",
    readTime: "18 min",
    summary: "Architect enterprise data warehouses: Kimball dimensional modeling, Fact tables, Dimension tables, Star vs Snowflake schemas, and Slowly Changing Dimensions (SCD Types 1, 2, 3).",
    content: `
      <h2>1. What is a Data Warehouse?</h2>
      <p>A <strong>Data Warehouse</strong> is a centralized repository that stores consolidated historical data from multiple operational systems, structured specifically for fast analytical reporting, aggregations, and business intelligence.</p>

      <h2>2. Dimensional Modeling: Facts vs Dimensions</h2>
      <ul>
        <li><strong>Fact Tables:</strong> Store measurable quantitative business metrics and foreign keys (e.g. <code>fact_sales</code>: order_id, date_key, customer_key, product_key, quantity, revenue, discount). Narrow, with millions or billions of rows.</li>
        <li><strong>Dimension Tables:</strong> Store descriptive attributes giving context to facts (e.g. <code>dim_customer</code>: customer_id, full_name, city, state, tier). Wide, with fewer rows.</li>
      </ul>

      <h2>3. Star Schema vs Snowflake Schema</h2>
      <div class="dsde-table-wrapper">
        <table class="dsde-concept-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Star Schema</th>
              <th>Snowflake Schema</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Structure</strong></td>
              <td>Fact table at center, directly connected to 1-level denormalized dimensions.</td>
              <td>Dimension tables are further normalized into sub-dimension tables.</td>
            </tr>
            <tr>
              <td><strong>Query Complexity</strong></td>
              <td>Simple: requires fewer SQL <code>JOIN</code> operations.</td>
              <td>Complex: requires multi-table joins across normalized hierarchies.</td>
            </tr>
            <tr>
              <td><strong>Query Performance</strong></td>
              <td>Blazing fast on modern columnar warehouses.</td>
              <td>Slightly slower due to join overhead.</td>
            </tr>
            <tr>
              <td><strong>Storage Redundancy</strong></td>
              <td>Higher (repeated descriptive strings like city names).</td>
              <td>Lowest (minimized data redundancy).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>4. Slowly Changing Dimensions (SCD)</h2>
      <p>What happens when a customer moves from Chicago to Los Angeles?</p>
      <ul>
        <li><strong>SCD Type 1 (Overwrite):</strong> Simply overwrite the city with "Los Angeles". Historical sales will now incorrectly appear as if they occurred in LA. History is lost.</li>
        <li><strong>SCD Type 2 (Add New Row - Industry Standard):</strong> Keep the old row with <code>is_active = FALSE, end_date = '2024-02-15'</code> and insert a new row with <code>is_active = TRUE, start_date = '2024-02-15'</code>. Full historical accuracy preserved!</li>
        <li><strong>SCD Type 3 (Add New Column):</strong> Keep columns <code>current_city</code> and <code>previous_city</code>. Tracks only the immediate previous state.</li>
      </ul>
    `
  },

  // =========================================================================
  // TOPIC 21: CLOUD DATA ENGINEERING (AWS, GCP, AZURE)
  // =========================================================================
  {
    id: "cloud-data-engineering",
    track: "de",
    title: "Cloud Data Engineering: AWS, Google Cloud & Microsoft Azure",
    category: "Cloud Architectures",
    categoryNumber: 11,
    difficulty: "Advanced",
    readTime: "18 min",
    summary: "Complete reference mapping of the Big 3 cloud providers for data engineering: storage, ingestion, warehousing, serverless compute, and managed Spark orchestration.",
    content: `
      <h2>1. The Cloud Data Engineering Mapping Matrix</h2>
      <div class="dsde-table-wrapper">
        <table class="dsde-concept-table">
          <thead>
            <tr>
              <th>Functional Category</th>
              <th>Amazon Web Services (AWS)</th>
              <th>Google Cloud (GCP)</th>
              <th>Microsoft Azure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Object Storage / Data Lake</strong></td>
              <td>Amazon S3</td>
              <td>Google Cloud Storage (GCS)</td>
              <td>Azure Data Lake Storage Gen2</td>
            </tr>
            <tr>
              <td><strong>Cloud Data Warehouse</strong></td>
              <td>Amazon Redshift</td>
              <td>Google BigQuery</td>
              <td>Azure Synapse Analytics</td>
            </tr>
            <tr>
              <td><strong>Managed Spark &amp; Hadoop</strong></td>
              <td>Amazon EMR</td>
              <td>Google Dataproc</td>
              <td>Azure HDInsight / Databricks</td>
            </tr>
            <tr>
              <td><strong>Serverless ETL / Catalog</strong></td>
              <td>AWS Glue</td>
              <td>Dataform / Dataplex</td>
              <td>Azure Data Factory (ADF)</td>
            </tr>
            <tr>
              <td><strong>Real-Time Event Streaming</strong></td>
              <td>Amazon Kinesis / MSK</td>
              <td>Google Cloud Pub/Sub</td>
              <td>Azure Event Hubs</td>
            </tr>
            <tr>
              <td><strong>Interactive SQL on S3/Lake</strong></td>
              <td>Amazon Athena (Trino)</td>
              <td>BigQuery Omni</td>
              <td>Synapse Serverless SQL</td>
            </tr>
            <tr>
              <td><strong>Managed Airflow Orchestration</strong></td>
              <td>Amazon MWAA</td>
              <td>Cloud Composer</td>
              <td>Azure Data Factory Managed Airflow</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>2. When to Use Which Cloud Service in AWS</h2>
      <ul>
        <li><strong>Amazon S3:</strong> Foundational data lake storage. Store raw JSON/CSV, intermediate Parquet, and archived backups with 99.999999999% (11 9s) durability.</li>
        <li><strong>AWS Glue:</strong> Serverless Spark ETL jobs and automatic schema crawlers that register tables into the AWS Glue Data Catalog.</li>
        <li><strong>Amazon Athena:</strong> Serverless ad-hoc SQL engine to query multi-gigabyte S3 Parquet files without spinning up any database servers. Pay \$5 per TB of data scanned.</li>
        <li><strong>Amazon Redshift:</strong> Dedicated petabyte-scale cloud data warehouse with columnar storage, massive parallel processing (MPP), and concurrency scaling.</li>
      </ul>
    `
  },

  // =========================================================================
  // TOPIC 22: DATA LAKES & LAKEHOUSE TECHNOLOGIES
  // =========================================================================
  {
    id: "data-lake-lakehouse",
    track: "de",
    title: "Data Lakes & Lakehouse Technologies: Iceberg, Delta Lake & Medallion",
    category: "Warehousing & Lakes",
    categoryNumber: 11,
    difficulty: "Advanced",
    readTime: "16 min",
    summary: "The convergence of data lakes and warehouses: Medallion Architecture (Bronze, Silver, Gold), Apache Iceberg, Delta Lake, Apache Hudi, schema evolution, and ACID transactions.",
    content: `
      <h2>1. The Problem with Traditional Data Lakes</h2>
      <p>In the early 2010s, companies dumped millions of raw files into Amazon S3 or HDFS, creating <strong>Data Swamps</strong>. Traditional data lakes suffered from severe flaws: no ACID transactions, dirty partial writes if jobs crashed halfway, and no ability to update or delete single records (vital for GDPR compliance).</p>

      <h2>2. What is a Data Lakehouse?</h2>
      <p>A <strong>Data Lakehouse</strong> combines the low cost, open formats, and immense scale of a Cloud Data Lake (object storage with Parquet files) with the ACID transactions, schema enforcement, data versioning, and blazing fast SQL performance of a traditional Data Warehouse.</p>

      <h2>3. The Medallion Architecture</h2>
      <div class="dsde-table-wrapper">
        <table class="dsde-concept-table">
          <thead>
            <tr>
              <th>Zone / Tier</th>
              <th>Description &amp; Processing State</th>
              <th>Primary Consumers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Bronze (Raw)</strong></td>
              <td>Raw, unmodified source data dumped as-is (JSON, CSV, CDC streams). Complete historical record.</td>
              <td>Data Engineers, audit systems</td>
            </tr>
            <tr>
              <td><strong>Silver (Cleansed)</strong></td>
              <td>Deduplicated, schema-validated, cleaned, and joined into columnar Parquet format.</td>
              <td>Data Scientists, ad-hoc analytics</td>
            </tr>
            <tr>
              <td><strong>Gold (Curated)</strong></td>
              <td>Aggregated business-level star/snowflake schemas and KPI tables ready for consumption.</td>
              <td>BI Dashboards, Executives, ML models</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>4. Open Table Formats: Apache Iceberg vs Delta Lake</h2>
      <p>Open table formats bring database metadata layers to Parquet files:</p>
      <ul>
        <li><strong>ACID Transactions:</strong> Atomic commits ensure reads never see partial writes.</li>
        <li><strong>Time Travel / Rollback:</strong> Query data exactly as it existed at any historical timestamp (<code>SELECT * FROM sales TIMESTAMP AS OF '2024-01-01'</code>).</li>
        <li><strong>Schema Evolution:</strong> Add, rename, or drop columns without rewriting the underlying petabyte Parquet files.</li>
      </ul>
    `
  },

  // =========================================================================
  // TOPIC 23: DATA QUALITY, TESTING & OBSERVABILITY
  // =========================================================================
  {
    id: "data-quality-testing-monitoring",
    track: "de",
    title: "Data Quality, Great Expectations & Pipeline Observability",
    category: "Reliability & DevOps",
    categoryNumber: 12,
    difficulty: "Intermediate",
    readTime: "15 min",
    summary: "Ensure reliable data pipelines: The 6 dimensions of data quality, automated validation with Great Expectations, pipeline unit tests with Pytest, and end-to-end data lineage.",
    content: `
      <h2>1. The 6 Core Dimensions of Data Quality</h2>
      <div class="dsde-table-wrapper">
        <table class="dsde-concept-table">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Definition</th>
              <th>Real-World Failure Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Accuracy</strong></td>
              <td>Does data match the real-world truth?</td>
              <td>Customer age recorded as 240 years old.</td>
            </tr>
            <tr>
              <td><strong>2. Completeness</strong></td>
              <td>Are required attributes present?</td>
              <td>35% of orders missing credit card currency codes.</td>
            </tr>
            <tr>
              <td><strong>3. Consistency</strong></td>
              <td>Do records agree across systems?</td>
              <td>User shown as "Active" in CRM but "Canceled" in billing DB.</td>
            </tr>
            <tr>
              <td><strong>4. Validity</strong></td>
              <td>Does data conform to specified schemas?</td>
              <td>Email address missing "@" symbol or phone number has letters.</td>
            </tr>
            <tr>
              <td><strong>5. Freshness / Timeliness</strong></td>
              <td>Is data available when needed?</td>
              <td>Daily executive report still displaying data from 3 days ago.</td>
            </tr>
            <tr>
              <td><strong>6. Uniqueness</strong></td>
              <td>Are there unintended duplicate records?</td>
              <td>Payment ID charged twice in analytical revenue table.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>2. Automated Validation with Great Expectations</h2>
      <pre class="dsde-code-pre">
# Defining declarative data assertions
import great_expectations as ge
import pandas as pd

df = ge.from_pandas(pd.DataFrame({
    "order_id": [101, 102, 103],
    "amount": [45.0, 120.5, -10.0], # Negative amount is invalid!
    "status": ["COMPLETED", "PENDING", "UNKNOWN"]
}))

# Assert non-null unique order_ids
df.expect_column_values_to_be_unique("order_id")
df.expect_column_values_to_not_be_null("order_id")

# Assert financial amount is strictly positive
validation_result = df.expect_column_values_to_be_between("amount", min_value=0.01)

print("Amount Validation Success:", validation_result["success"])
      </pre>

      <h2>3. Data Observability &amp; Lineage</h2>
      <p>Modern data teams track the 5 pillars of data observability: <strong>Freshness, Volume, Distribution, Schema, and Lineage</strong>. Data Lineage graphs (via OpenLineage or dbt docs) map every transformation step from source database tables down to executive Tableau dashboards, letting engineers immediately identify downstream blast radius when an upstream table breaks.</p>
    `
  }
];
