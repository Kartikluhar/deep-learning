/**
 * MLForge SQL Curriculum Topics Database
 * Comprehensive guides in simple English covering all 27 core theoretical and practical
 * SQL topics with real-world examples, syntax, diagrams, common pitfalls, and interview Q&As.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sql = window.MLForge.sql || {};
window.MLForge.sql.data = window.MLForge.sql.data || {};

MLForge.sql.data.topics = [
  // 1. SQL Fundamentals
  {
    id: "sql-fundamentals",
    title: "SQL Fundamentals",
    category: "Fundamentals",
    categoryNumber: 1,
    readTime: "8 min",
    summary: "Learn what SQL is, why it powers almost every data-driven company, and how declarative query languages work.",
    content: `
      <h2>1. What is SQL?</h2>
      <p><strong>SQL</strong> stands for <strong>Structured Query Language</strong>. It is the international standard language used by computer programs and human engineers to create, store, read, update, and manage information stored inside <strong>Relational Database Management Systems (RDBMS)</strong>.</p>
      
      <p>Unlike procedural languages (like Python, Java, or C++) where you have to write explicit loops and algorithms explaining <em>how</em> to find a record, SQL is a <strong>declarative language</strong>: you tell the database <em>what data you want</em>, and the database engine automatically decides the fastest and most efficient way to fetch it for you.</p>

      <div class="sql-card-callout">
        <strong>Simple Everyday Analogy:</strong> When you walk into a restaurant and say <em>"Please bring me a pepperoni pizza"</em>, you are speaking declaratively. You do not need to walk into the kitchen, turn on the oven, knead the dough, and monitor the timer. You declare the outcome, and the kitchen chef executes the steps. SQL is your order ticket; the database engine is the expert chef.
      </div>

      <h2>2. Why Do We Use SQL?</h2>
      <ul>
        <li><strong>Universality:</strong> SQL has been the world standard since the 1970s (invented at IBM by Donald Chamberlin and Raymond Boyce). Modern tech giants like Google, Meta, Amazon, Netflix, and Apple run critical operations on relational databases.</li>
        <li><strong>ACID Reliability:</strong> Relational databases guarantee that financial transactions, ecommerce orders, and user logins never suffer from corrupted or half-saved data.</li>
        <li><strong>Scalability & Speed:</strong> Modern SQL engines can search through billions of rows in mere milliseconds using sophisticated B-tree indexing and query optimizers.</li>
        <li><strong>Cross-Disciplinary Power:</strong> SQL is required for backend developers, data analysts, data scientists, machine learning engineers, and system architects alike.</li>
      </ul>

      <h2>3. The Relational Model</h2>
      <p>In a relational database, data is organized into two-dimensional <strong>tables</strong> (relations). Each table has a fixed set of named <strong>columns</strong> (attributes) and any number of <strong>rows</strong> (records or tuples).</p>

      <div class="sql-table-wrapper" style="margin: 1.25rem 0;">
        <table class="sql-concept-table">
          <thead>
            <tr><th>Term</th><th>Relational Database Meaning</th><th>Spreadsheet Equivalent</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Database</strong></td><td>A structured container holding related tables, views, and schemas</td><td>An entire Excel Workbook (<code>.xlsx</code>)</td></tr>
            <tr><td><strong>Table</strong></td><td>A collection of rows and columns storing one entity (e.g. <code>employees</code>)</td><td>A single Sheet / Tab</td></tr>
            <tr><td><strong>Column (Field)</strong></td><td>A specific property with a fixed data type (e.g. <code>salary INT</code>)</td><td>A Column header (A, B, C...)</td></tr>
            <tr><td><strong>Row (Record)</strong></td><td>A single complete data item (e.g. Employee #1 Alice)</td><td>A horizontal row of numbers</td></tr>
          </tbody>
        </table>
      </div>

      <h2>4. Standard SQL Syntax & Case Sensitivity</h2>
      <p>SQL keywords (such as <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>) are case-insensitive. However, by professional industry convention:</p>
      <ul>
        <li>SQL keywords are written in <strong>UPPERCASE</strong> (<code>SELECT</code>, <code>FROM</code>).</li>
        <li>Table and column names are written in <strong>snake_case lowercase</strong> (<code>first_name</code>, <code>department_id</code>).</li>
        <li>Statements typically end with a semicolon (<code>;</code>).</li>
      </ul>

      <div class="sql-code-block">
<span class="sql-kw">SELECT</span> first_name, salary 
<span class="sql-kw">FROM</span> employees 
<span class="sql-kw">WHERE</span> salary &gt; 100000 
<span class="sql-kw">ORDER BY</span> salary <span class="sql-kw">DESC</span>;
      </div>

      <h2>5. Common Mistakes Beginners Make</h2>
      <ul>
        <li><strong>Thinking SQL is a programming language for writing apps:</strong> SQL is a query and data manipulation language, not an operating system runtime or general UI language.</li>
        <li><strong>Forgetting string quotes:</strong> In SQL, string literals and dates must be enclosed in single quotes: <code>WHERE city = 'Seattle'</code>, not <code>WHERE city = Seattle</code>.</li>
        <li><strong>Comparing NULL with <code>=</code>:</strong> <code>WHERE manager_id = NULL</code> will ALWAYS return empty rows. In SQL you must write <code>WHERE manager_id IS NULL</code>.</li>
      </ul>

      <h2>6. Frequently Asked Interview Questions</h2>
      <div class="sql-faq-box">
        <p><strong>Q1: What does declarative language mean in SQL?</strong></p>
        <p><em>Answer:</em> It means the user specifies what data they need, while the database query planner (cost-based optimizer) determines how to retrieve it using indexes and algorithms.</p>
        <p><strong>Q2: What is the difference between SQL and MySQL?</strong></p>
        <p><em>Answer:</em> SQL is the standardized language specification. MySQL is a specific open-source software product (RDBMS) that implements SQL.</p>
      </div>
    `
  },

  // 2. Database Fundamentals
  {
    id: "database-fundamentals",
    title: "Database Fundamentals",
    category: "Fundamentals",
    categoryNumber: 2,
    readTime: "10 min",
    summary: "Deep dive into DBMS vs RDBMS, tables, schemas, all primary and foreign keys, candidate keys, and referential integrity.",
    content: `
      <h2>1. What is Data, DBMS, and RDBMS?</h2>
      <ul>
        <li><strong>Data:</strong> Raw, unorganized facts, numbers, or text (e.g. <code>Alice</code>, <code>142000</code>, <code>2023-01-10</code>).</li>
        <li><strong>Database:</strong> An organized collection of structured data stored electronically on disk.</li>
        <li><strong>DBMS (Database Management System):</strong> Software that allows users to create, maintain, and query a database (e.g. file-based stores, simple key-value stores).</li>
        <li><strong>RDBMS (Relational DBMS):</strong> An advanced DBMS based on E.F. Codd's relational model where data is stored in interconnected tables linked by primary and foreign keys (e.g. PostgreSQL, MySQL, SQLite, Oracle).</li>
      </ul>

      <div class="sql-card-callout">
        <strong>DBMS vs. RDBMS Key Difference:</strong> While a plain DBMS may store data in flat files without enforcing relationships, an RDBMS enforces mathematical referential integrity, constraints, ACID properties, and relational algebra operations (Joins).
      </div>

      <h2>2. Understanding All Key Types</h2>
      <p>Keys are columns used to uniquely identify rows, prevent duplicates, and establish relationships between tables.</p>

      <div class="sql-table-wrapper" style="margin: 1.25rem 0;">
        <table class="sql-concept-table">
          <thead>
            <tr><th>Key Name</th><th>Definition</th><th>Real-World Example</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Super Key</strong></td><td>Any set of one or more columns that uniquely identifies a row in a table.</td><td><code>{id, email}</code> or <code>{id, first_name}</code></td></tr>
            <tr><td><strong>Candidate Key</strong></td><td>A minimal Super Key without any unnecessary columns.</td><td><code>id</code> alone or <code>email</code> alone</td></tr>
            <tr><td><strong>Primary Key (PK)</strong></td><td>The candidate key chosen by the database architect as the main identifier. Must be unique and CANNOT be NULL.</td><td><code>employees.id</code></td></tr>
            <tr><td><strong>Alternate Key</strong></td><td>Candidate keys that were not chosen as the Primary Key.</td><td><code>employees.email</code> (unique, but not PK)</td></tr>
            <tr><td><strong>Composite Key</strong></td><td>A primary key composed of two or more columns combined together.</td><td><code>enrollments(student_id, course_id)</code></td></tr>
            <tr><td><strong>Foreign Key (FK)</strong></td><td>A column in one table that points to the Primary Key of another table, enforcing referential integrity.</td><td><code>employees.department_id -> departments.id</code></td></tr>
            <tr><td><strong>Natural Key</strong></td><td>An existing real-world attribute that is naturally unique.</td><td>Social Security Number (SSN), ISBN</td></tr>
            <tr><td><strong>Surrogate Key</strong></td><td>An artificial, system-generated identifier with no business meaning.</td><td>Auto-incrementing integer (<code>1, 2, 3...</code>) or UUID</td></tr>
          </tbody>
        </table>
      </div>

      <h2>3. Sample Student Database Schema & ER Diagram</h2>
      <p>Consider a university management database (<code>college_db</code>) with relationships:</p>
      
      <div class="sql-diagram-card">
        <div class="sql-diagram-node">students (id [PK], first_name, last_name, gpa)</div>
        <div class="sql-diagram-link">│ (1) has many enrollments (N)</div>
        <div class="sql-diagram-node">enrollments (id [PK], student_id [FK], course_id [FK], grade)</div>
        <div class="sql-diagram-link">│ (N) belongs to one course (1)</div>
        <div class="sql-diagram-node">courses (id [PK], course_code, course_name, department_id [FK])</div>
        <div class="sql-diagram-link">│ (N) belongs to one department (1)</div>
        <div class="sql-diagram-node">departments (id [PK], department_name, budget)</div>
      </div>

      <h2>4. Referential Integrity</h2>
      <p>Referential integrity ensures that relationships between tables stay synchronized. If <code>employees.department_id = 1</code>, there MUST exist a row in <code>departments</code> with <code>id = 1</code>. If someone tries to delete Department 1, the database stops the deletion unless cascading rules (like <code>ON DELETE CASCADE</code>) are defined.</p>

      <h2>5. Frequently Asked Interview Questions</h2>
      <div class="sql-faq-box">
        <p><strong>Q1: Can a Primary Key contain NULL values?</strong></p>
        <p><em>Answer:</em> Absolutely not. A Primary Key enforces both uniqueness and non-nullability (<code>UNIQUE + NOT NULL</code>).</p>
        <p><strong>Q2: What is the difference between a Natural Key and a Surrogate Key?</strong></p>
        <p><em>Answer:</em> A natural key is derived from real-world business attributes (like passport number or email), while a surrogate key is purely database-generated (like an auto-increment integer or UUID). Surrogate keys protect schemas from real-world business changes.</p>
      </div>
    `
  },

  // 3. SQL Data Types
  {
    id: "sql-data-types",
    title: "SQL Data Types",
    category: "Data Definition",
    categoryNumber: 3,
    readTime: "9 min",
    summary: "Comprehensive guide to Numeric, String, Date/Time, JSON, and Boolean data types across MySQL and PostgreSQL.",
    content: `
      <h2>1. Why Proper Data Types Matter</h2>
      <p>Choosing the correct data type for each column guarantees:</p>
      <ul>
        <li><strong>Data Integrity:</strong> Prevents invalid text from being entered into numeric or date columns.</li>
        <li><strong>Storage Optimization:</strong> Using <code>TINYINT</code> (1 byte) instead of <code>BIGINT</code> (8 bytes) saves gigabytes of disk and RAM on large tables.</li>
        <li><strong>Indexing Performance:</strong> Smaller and fixed-width types fit more keys into CPU cache and B-tree index blocks.</li>
      </ul>

      <h2>2. Numeric Data Types</h2>
      <div class="sql-table-wrapper">
        <table class="sql-concept-table">
          <thead>
            <tr><th>Type</th><th>Bytes</th><th>Range / Precision</th><th>Best Used For</th></tr>
          </thead>
          <tbody>
            <tr><td><code>SMALLINT</code></td><td>2 bytes</td><td>-32,768 to 32,767</td><td>Age, months, status codes</td></tr>
            <tr><td><code>INT</code> / <code>INTEGER</code></td><td>4 bytes</td><td>-2.14 Billion to +2.14 Billion</td><td>Standard IDs, item counts</td></tr>
            <tr><td><code>BIGINT</code></td><td>8 bytes</td><td>-9 Quintillion to +9 Quintillion</td><td>High-traffic social media IDs, timestamps</td></tr>
            <tr><td><code>DECIMAL(p, s)</code></td><td>Variable</td><td>Exact precision (p=total digits, s=decimals)</td><td><strong>Financial money, prices, balances</strong></td></tr>
            <tr><td><code>FLOAT</code> / <code>REAL</code></td><td>4 bytes</td><td>Approximate floating point (7 digits)</td><td>Scientific readings, sensor measurements</td></tr>
            <tr><td><code>DOUBLE PRECISION</code></td><td>8 bytes</td><td>Approximate floating point (15 digits)</td><td>Scientific simulations, geospatial math</td></tr>
          </tbody>
        </table>
      </div>
      <div class="sql-card-callout" style="border-left-color: #ef4444;">
        <strong>Warning for Developers:</strong> NEVER use <code>FLOAT</code> or <code>DOUBLE</code> for financial currency calculations due to IEEE 754 floating-point rounding errors (e.g. 0.1 + 0.2 = 0.30000000000000004). Always use exact <code>DECIMAL</code> or <code>NUMERIC</code>.
      </div>

      <h2>3. String Data Types</h2>
      <ul>
        <li><strong><code>CHAR(n)</code> (Fixed Length):</strong> Always uses exactly <em>n</em> characters. If you store <code>'NY'</code> in <code>CHAR(10)</code>, it pads 8 spaces at the end. Best for fixed codes: country codes (<code>'US'</code>, <code>'IN'</code>), currency (<code>'USD'</code>).</li>
        <li><strong><code>VARCHAR(n)</code> (Variable Length):</strong> Stores only the actual characters plus 1-2 prefix length bytes. Best for names, titles, emails, addresses.</li>
        <li><strong><code>TEXT</code>:</strong> Stores unbounded long-form text (articles, user comments, system logs).</li>
      </ul>

      <h2>4. Date and Time Data Types</h2>
      <ul>
        <li><strong><code>DATE</code>:</strong> Stores calendar date only: <code>YYYY-MM-DD</code> (e.g. <code>2024-03-15</code>).</li>
        <li><strong><code>TIME</code>:</strong> Stores time of day only: <code>HH:MM:SS</code>.</li>
        <li><strong><code>DATETIME</code> / <code>TIMESTAMP</code>:</strong> Stores both date and time. In PostgreSQL, <code>TIMESTAMPTZ</code> stores UTC time and converts automatically to client timezone.</li>
      </ul>

      <h2>5. Advanced Modern Data Types: JSON, UUID, and Arrays</h2>
      <ul>
        <li><strong><code>JSON</code> vs <code>JSONB</code> (PostgreSQL):</strong> <code>JSON</code> stores exact text. <code>JSONB</code> stores parsed binary format, supporting GIN index queries for hyper-fast search inside nested payloads.</li>
        <li><strong><code>UUID</code>:</strong> 128-bit universally unique identifiers (e.g. <code>a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11</code>) ideal for distributed systems and client-side ID generation.</li>
        <li><strong><code>BOOLEAN</code>:</strong> Stores <code>TRUE</code>, <code>FALSE</code>, or <code>NULL</code> (unknown).</li>
      </ul>
    `
  },

  // 4. Database Creation and Management
  {
    id: "database-creation",
    title: "Database Creation & Management",
    category: "Data Definition",
    categoryNumber: 4,
    readTime: "9 min",
    summary: "Master creating databases, tables, alters, truncates, drops, auto-increments, and table schemas.",
    content: `
      <h2>1. Creating and Dropping Databases</h2>
      <p>A database instance contains multiple schemas and tables:</p>
      <div class="sql-code-block">
<span class="sql-kw">CREATE DATABASE</span> college_db;
<span class="sql-kw">USE</span> college_db; <span class="sql-comment">-- (MySQL specific switch)</span>
<span class="sql-kw">DROP DATABASE IF EXISTS</span> old_backup_db;
      </div>

      <h2>2. Creating Tables with Constraints</h2>
      <p>Here is the complete DDL to establish the foundational <code>departments</code> and <code>employees</code> tables:</p>
      <div class="sql-code-block">
<span class="sql-kw">CREATE TABLE</span> departments (
  id <span class="sql-kw">INT PRIMARY KEY AUTO_INCREMENT</span>,
  department_name <span class="sql-kw">VARCHAR</span>(100) <span class="sql-kw">NOT NULL UNIQUE</span>,
  location <span class="sql-kw">VARCHAR</span>(100) <span class="sql-kw">NOT NULL</span>,
  budget <span class="sql-kw">DECIMAL</span>(12, 2) <span class="sql-kw">DEFAULT</span> 0.00
);

<span class="sql-kw">CREATE TABLE</span> employees (
  id <span class="sql-kw">INT PRIMARY KEY AUTO_INCREMENT</span>,
  first_name <span class="sql-kw">VARCHAR</span>(50) <span class="sql-kw">NOT NULL</span>,
  last_name <span class="sql-kw">VARCHAR</span>(50) <span class="sql-kw">NOT NULL</span>,
  email <span class="sql-kw">VARCHAR</span>(100) <span class="sql-kw">NOT NULL UNIQUE</span>,
  department_id <span class="sql-kw">INT</span>,
  job_title <span class="sql-kw">VARCHAR</span>(80) <span class="sql-kw">NOT NULL</span>,
  hire_date <span class="sql-kw">DATE NOT NULL</span>,
  salary <span class="sql-kw">DECIMAL</span>(10, 2) <span class="sql-kw">CHECK</span> (salary &gt;= 0),
  manager_id <span class="sql-kw">INT</span>,
  <span class="sql-kw">CONSTRAINT</span> fk_dept <span class="sql-kw">FOREIGN KEY</span> (department_id) 
    <span class="sql-kw">REFERENCES</span> departments(id) <span class="sql-kw">ON DELETE SET NULL</span>
);
      </div>

      <h2>3. Modifying Existing Tables with ALTER TABLE</h2>
      <p>Real-world schemas evolve constantly. <code>ALTER TABLE</code> allows you to modify tables without deleting existing customer data:</p>
      <div class="sql-code-block">
<span class="sql-comment">-- 1. Add a new column</span>
<span class="sql-kw">ALTER TABLE</span> employees <span class="sql-kw">ADD COLUMN</span> phone_number <span class="sql-kw">VARCHAR</span>(20);

<span class="sql-comment">-- 2. Modify an existing column type</span>
<span class="sql-kw">ALTER TABLE</span> employees <span class="sql-kw">MODIFY COLUMN</span> job_title <span class="sql-kw">VARCHAR</span>(120);

<span class="sql-comment">-- 3. Drop a column</span>
<span class="sql-kw">ALTER TABLE</span> employees <span class="sql-kw">DROP COLUMN</span> phone_number;

<span class="sql-comment">-- 4. Rename a column</span>
<span class="sql-kw">ALTER TABLE</span> employees <span class="sql-kw">RENAME COLUMN</span> salary <span class="sql-kw">TO</span> base_salary;
      </div>

      <h2>4. Difference Between DROP, TRUNCATE, and DELETE</h2>
      <div class="sql-table-wrapper">
        <table class="sql-concept-table">
          <thead>
            <tr><th>Operation</th><th>Command Type</th><th>Rollback Possible?</th><th>Speed</th><th>Table Structure Left?</th></tr>
          </thead>
          <tbody>
            <tr><td><code>DELETE FROM t;</code></td><td>DML</td><td>Yes (logged row by row)</td><td>Slow</td><td>Yes (empty table remains)</td></tr>
            <tr><td><code>TRUNCATE TABLE t;</code></td><td>DDL</td><td>Engine dependent (resets pointers)</td><td>Ultra Fast</td><td>Yes (empty table remains)</td></tr>
            <tr><td><code>DROP TABLE t;</code></td><td>DDL</td><td>No (removes entire definition)</td><td>Instant</td><td>No (table is completely destroyed)</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 5. SQL Commands: DDL, DML, DQL, DCL, TCL
  {
    id: "sql-commands",
    title: "SQL Commands (DDL, DML, DQL, DCL, TCL)",
    category: "SQL Commands",
    categoryNumber: 5,
    readTime: "9 min",
    summary: "Master all 5 sub-languages of SQL: Data Definition, Manipulation, Query, Control, and Transaction Control.",
    content: `
      <h2>1. The 5 Families of SQL Commands</h2>
      <p>SQL is divided into five functional sub-languages:</p>

      <div class="sql-grid-2">
        <div class="sql-feature-card">
          <div class="sql-badge-cyan">1. DDL (Definition)</div>
          <p>Manages the database structure and schema blueprint.</p>
          <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>TRUNCATE</code>, <code>RENAME</code>
        </div>
        <div class="sql-feature-card">
          <div class="sql-badge-cyan">2. DML (Manipulation)</div>
          <p>Modifies the actual data stored inside table rows.</p>
          <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>
        </div>
        <div class="sql-feature-card">
          <div class="sql-badge-cyan">3. DQL (Query)</div>
          <p>Retrieves and searches data from one or more tables.</p>
          <code>SELECT</code>
        </div>
        <div class="sql-feature-card">
          <div class="sql-badge-cyan">4. DCL (Control)</div>
          <p>Manages user permissions, rights, and security policies.</p>
          <code>GRANT</code>, <code>REVOKE</code>
        </div>
      </div>

      <div class="sql-feature-card" style="margin-top: 1rem;">
        <div class="sql-badge-cyan">5. TCL (Transaction Control)</div>
        <p>Manages atomic database changes to maintain data integrity and consistency.</p>
        <code>COMMIT</code>, <code>ROLLBACK</code>, <code>SAVEPOINT</code>
      </div>

      <h2>2. Practical DML Operations</h2>
      <div class="sql-code-block">
<span class="sql-comment">-- INSERT: Adding new rows</span>
<span class="sql-kw">INSERT INTO</span> departments (department_name, location, budget)
<span class="sql-kw">VALUES</span> ('Artificial Intelligence', 'San Francisco', 1500000.00);

<span class="sql-comment">-- UPDATE: Changing existing rows</span>
<span class="sql-kw">UPDATE</span> employees 
<span class="sql-kw">SET</span> salary = salary * 1.10 
<span class="sql-kw">WHERE</span> department_id = 1;

<span class="sql-comment">-- DELETE: Removing specific rows</span>
<span class="sql-kw">DELETE FROM</span> employees 
<span class="sql-kw">WHERE</span> id = 12;
      </div>
      <div class="sql-card-callout" style="border-left-color: #ef4444;">
        <strong>Critical Safety Rule:</strong> Always write the <code>WHERE</code> clause before executing an <code>UPDATE</code> or <code>DELETE</code>. Executing <code>DELETE FROM employees;</code> without a <code>WHERE</code> clause will permanently wipe out every single employee in the company!
      </div>
    `
  },

  // 6. Filtering and Sorting
  {
    id: "filtering-sorting",
    title: "Filtering & Sorting",
    category: "Queries",
    categoryNumber: 6,
    readTime: "8 min",
    summary: "Write precise SELECT queries using WHERE, ORDER BY, LIMIT, OFFSET, BETWEEN, IN, LIKE, and NULL operators.",
    content: `
      <h2>1. The SELECT Statement</h2>
      <p>The foundation of every query. You specify the columns you wish to retrieve:</p>
      <div class="sql-code-block">
<span class="sql-kw">SELECT</span> first_name, last_name, salary 
<span class="sql-kw">FROM</span> employees;
      </div>

      <h2>2. Filtering Rows with WHERE</h2>
      <p>The <code>WHERE</code> clause tests conditions for every row and returns only those that evaluate to <code>TRUE</code>:</p>
      <div class="sql-code-block">
<span class="sql-comment">-- Comparison operators (=, !=, &gt;, &lt;, &gt;=, &lt;=)</span>
<span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> employees <span class="sql-kw">WHERE</span> salary &gt;= 100000;

<span class="sql-comment">-- Logical operators: AND, OR, NOT</span>
<span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> employees 
<span class="sql-kw">WHERE</span> department_id = 1 <span class="sql-kw">AND</span> salary &gt; 120000;

<span class="sql-comment">-- BETWEEN: Range test (inclusive)</span>
<span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> employees 
<span class="sql-kw">WHERE</span> salary <span class="sql-kw">BETWEEN</span> 80000 <span class="sql-kw">AND</span> 120000;

<span class="sql-comment">-- IN / NOT IN: Checking against a list</span>
<span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> employees 
<span class="sql-kw">WHERE</span> department_id <span class="sql-kw">IN</span> (1, 2, 4);

<span class="sql-comment">-- LIKE with wildcards (% for multiple characters, _ for single character)</span>
<span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> employees 
<span class="sql-kw">WHERE</span> email <span class="sql-kw">LIKE</span> '%@mlforge.io';
      </div>

      <h2>3. The Special Rule of NULL</h2>
      <p>In SQL, <code>NULL</code> represents <strong>unknown or missing data</strong>, not zero or empty text. Because unknown cannot be compared to anything, ordinary comparison operators fail:</p>
      <ul>
        <li><code>NULL = NULL</code> evaluates to <strong>UNKNOWN (false)</strong>!</li>
        <li>To find null values, you must use <code>IS NULL</code>:</li>
      </ul>
      <div class="sql-code-block">
<span class="sql-kw">SELECT</span> first_name, last_name 
<span class="sql-kw">FROM</span> employees 
<span class="sql-kw">WHERE</span> manager_id <span class="sql-kw">IS NULL</span>;
      </div>

      <h2>4. Sorting with ORDER BY</h2>
      <p>By default, relational databases do not guarantee row order. Use <code>ORDER BY</code> to sort:</p>
      <div class="sql-code-block">
<span class="sql-kw">SELECT</span> first_name, salary 
<span class="sql-kw">FROM</span> employees 
<span class="sql-kw">ORDER BY</span> salary <span class="sql-kw">DESC</span>, first_name <span class="sql-kw">ASC</span> 
<span class="sql-kw">LIMIT</span> 5 <span class="sql-kw">OFFSET</span> 0;
      </div>
    `
  },

  // 7. SQL Operators and Functions
  {
    id: "sql-functions",
    title: "SQL Functions & Operators",
    category: "Queries",
    categoryNumber: 7,
    readTime: "9 min",
    summary: "Explore string, numeric, date/time, NULL-handling (COALESCE), and conditional (CASE WHEN) scalar functions.",
    content: `
      <h2>1. String Functions</h2>
      <div class="sql-table-wrapper">
        <table class="sql-concept-table">
          <thead><tr><th>Function</th><th>Description</th><th>Example</th><th>Result</th></tr></thead>
          <tbody>
            <tr><td><code>UPPER(s)</code></td><td>Converts text to uppercase</td><td><code>UPPER('alice')</code></td><td><code>'ALICE'</code></td></tr>
            <tr><td><code>LOWER(s)</code></td><td>Converts text to lowercase</td><td><code>LOWER('SQL')</code></td><td><code>'sql'</code></td></tr>
            <tr><td><code>CONCAT(a, b...)</code></td><td>Concatenates strings together</td><td><code>CONCAT(first_name, ' ', last_name)</code></td><td><code>'Alice Smith'</code></td></tr>
            <tr><td><code>SUBSTRING(s, start, len)</code></td><td>Extracts a portion of text</td><td><code>SUBSTRING('MLForge', 1, 2)</code></td><td><code>'ML'</code></td></tr>
            <tr><td><code>TRIM(s)</code></td><td>Strips leading and trailing spaces</td><td><code>TRIM('  data  ')</code></td><td><code>'data'</code></td></tr>
            <tr><td><code>REPLACE(s, from, to)</code></td><td>Replaces matching substrings</td><td><code>REPLACE('2024-01-01', '-', '/')</code></td><td><code>'2024/01/01'</code></td></tr>
          </tbody>
        </table>
      </div>

      <h2>2. Numeric Math Functions</h2>
      <ul>
        <li><code>ROUND(value, decimals)</code>: Rounds to nearest decimal place: <code>ROUND(129.987, 2) -> 129.99</code>.</li>
        <li><code>CEIL(n)</code> / <code>FLOOR(n)</code>: Rounds up or down to nearest integer.</li>
        <li><code>ABS(n)</code>: Absolute value (turns negative to positive).</li>
        <li><code>MOD(a, b)</code>: Modulo / remainder after division.</li>
      </ul>

      <h2>3. NULL Handling with COALESCE()</h2>
      <p><code>COALESCE(val1, val2, val3...)</code> returns the first non-null expression from left to right. It is invaluable for handling optional fields without displaying ugly <code>NULL</code> on client screens:</p>
      <div class="sql-code-block">
<span class="sql-kw">SELECT</span> 
  first_name, 
  <span class="sql-kw">COALESCE</span>(manager_id, 0) <span class="sql-kw">AS</span> manager_id_clean
<span class="sql-kw">FROM</span> employees;
      </div>

      <h2>4. Conditional Logic with CASE WHEN</h2>
      <p>The SQL equivalent of an <code>if / else if / else</code> statement:</p>
      <div class="sql-code-block">
<span class="sql-kw">SELECT</span> 
  first_name, 
  salary,
  <span class="sql-kw">CASE</span>
    <span class="sql-kw">WHEN</span> salary &gt;= 140000 <span class="sql-kw">THEN</span> 'Executive Tier'
    <span class="sql-kw">WHEN</span> salary &gt;= 100000 <span class="sql-kw">THEN</span> 'Senior Tier'
    <span class="sql-kw">ELSE</span> 'Associate Tier'
  <span class="sql-kw">END AS</span> compensation_band
<span class="sql-kw">FROM</span> employees;
      </div>
    `
  },

  // 8. Aggregate Functions & GROUP BY
  {
    id: "aggregate-functions",
    title: "Aggregate Functions & GROUP BY",
    category: "Queries",
    categoryNumber: 8,
    readTime: "9 min",
    summary: "Calculate metrics using COUNT, SUM, AVG, MIN, MAX, GROUP BY, and master the exact difference between WHERE and HAVING.",
    content: `
      <h2>1. The 5 Core Aggregate Functions</h2>
      <p>Aggregate functions collapse multiple rows into a single summary value:</p>
      <ul>
        <li><code>COUNT(*)</code>: Counts total rows including rows with NULLs.</li>
        <li><code>COUNT(column)</code>: Counts non-null entries in that specific column.</li>
        <li><code>COUNT(DISTINCT column)</code>: Counts unique non-null values.</li>
        <li><code>SUM(column)</code>: Adds all numeric values together.</li>
        <li><code>AVG(column)</code>: Computes the arithmetic mean.</li>
        <li><code>MIN(column)</code> / <code>MAX(column)</code>: Finds minimum and maximum values.</li>
      </ul>

      <h2>2. GROUP BY Clause</h2>
      <p><code>GROUP BY</code> splits data into buckets by one or more columns, calculating aggregates separately for each bucket:</p>
      <div class="sql-code-block">
<span class="sql-kw">SELECT</span> 
  department_id, 
  <span class="sql-kw">COUNT</span>(*) <span class="sql-kw">AS</span> total_staff,
  <span class="sql-kw">AVG</span>(salary) <span class="sql-kw">AS</span> average_salary,
  <span class="sql-kw">MAX</span>(salary) <span class="sql-kw">AS</span> highest_salary
<span class="sql-kw">FROM</span> employees
<span class="sql-kw">GROUP BY</span> department_id;
      </div>

      <h2>3. The Crucial Difference Between WHERE and HAVING</h2>
      <div class="sql-table-wrapper">
        <table class="sql-concept-table">
          <thead><tr><th>Aspect</th><th>WHERE</th><th>HAVING</th></tr></thead>
          <tbody>
            <tr><td><strong>Processing Stage</strong></td><td>Filters individual rows <em>BEFORE</em> grouping occurs</td><td>Filters summary group rows <em>AFTER</em> aggregation</td></tr>
            <tr><td><strong>Can use aggregates?</strong></td><td>NO! <code>WHERE AVG(salary) > 50000</code> throws a syntax error</td><td>YES! <code>HAVING AVG(salary) > 50000</code> is valid</td></tr>
          </tbody>
        </table>
      </div>

      <div class="sql-code-block">
<span class="sql-comment">-- Logical Processing Order:</span>
<span class="sql-comment">-- 1. FROM employees</span>
<span class="sql-comment">-- 2. WHERE salary &gt;= 70000 (filters low-salary rows first)</span>
<span class="sql-comment">-- 3. GROUP BY department_id</span>
<span class="sql-comment">-- 4. HAVING COUNT(*) &gt;= 2 (filters out small departments)</span>
<span class="sql-comment">-- 5. SELECT department_id, AVG(salary)</span>
<span class="sql-kw">SELECT</span> department_id, <span class="sql-kw">AVG</span>(salary) <span class="sql-kw">AS</span> avg_sal
<span class="sql-kw">FROM</span> employees
<span class="sql-kw">WHERE</span> salary &gt;= 70000
<span class="sql-kw">GROUP BY</span> department_id
<span class="sql-kw">HAVING COUNT</span>(*) &gt;= 2;
      </div>
    `
  },

  // 9. SQL Joins
  {
    id: "sql-joins",
    title: "SQL Joins",
    category: "Joins & Relations",
    categoryNumber: 9,
    readTime: "12 min",
    summary: "Visual guide to INNER, LEFT, RIGHT, FULL OUTER, CROSS, and SELF Joins with sample table traces.",
    content: `
      <h2>1. Why Do We Need Joins?</h2>
      <p>In normalized relational databases, data is split across multiple tables to avoid duplication (e.g. employee details in <code>employees</code>, department budgets in <code>departments</code>). A <strong>JOIN</strong> allows you to reconstruct meaningful business records by matching keys across tables.</p>

      <h2>2. Visualizing Join Types</h2>
      
      <div class="sql-grid-2">
        <div class="sql-feature-card">
          <h4>1. INNER JOIN</h4>
          <p>Returns only rows that have matching values in <strong>BOTH</strong> tables.</p>
          <div class="sql-code-block">
<span class="sql-kw">SELECT</span> e.first_name, d.department_name
<span class="sql-kw">FROM</span> employees e
<span class="sql-kw">INNER JOIN</span> departments d 
  <span class="sql-kw">ON</span> e.department_id = d.id;
          </div>
        </div>

        <div class="sql-feature-card">
          <h4>2. LEFT JOIN (Left Outer)</h4>
          <p>Returns <strong>ALL</strong> rows from the left table, plus matched rows from the right table. Unmatched right columns become <code>NULL</code>.</p>
          <div class="sql-code-block">
<span class="sql-kw">SELECT</span> c.first_name, o.id <span class="sql-kw">AS</span> order_id
<span class="sql-kw">FROM</span> customers c
<span class="sql-kw">LEFT JOIN</span> orders o 
  <span class="sql-kw">ON</span> c.id = o.customer_id;
          </div>
        </div>

        <div class="sql-feature-card">
          <h4>3. RIGHT JOIN (Right Outer)</h4>
          <p>Returns <strong>ALL</strong> rows from the right table, plus matched rows from the left table.</p>
          <div class="sql-code-block">
<span class="sql-kw">SELECT</span> e.first_name, d.department_name
<span class="sql-kw">FROM</span> employees e
<span class="sql-kw">RIGHT JOIN</span> departments d 
  <span class="sql-kw">ON</span> e.department_id = d.id;
          </div>
        </div>

        <div class="sql-feature-card">
          <h4>4. FULL OUTER JOIN</h4>
          <p>Combines LEFT and RIGHT joins: returns all rows from both tables, filling with <code>NULL</code> whenever a match is missing.</p>
          <div class="sql-code-block">
<span class="sql-comment">-- Supported in PostgreSQL; simulated in MySQL via UNION:</span>
<span class="sql-kw">SELECT</span> e.first_name, d.department_name 
<span class="sql-kw">FROM</span> employees e <span class="sql-kw">LEFT JOIN</span> departments d <span class="sql-kw">ON</span> e.department_id = d.id
<span class="sql-kw">UNION</span>
<span class="sql-kw">SELECT</span> e.first_name, d.department_name 
<span class="sql-kw">FROM</span> employees e <span class="sql-kw">RIGHT JOIN</span> departments d <span class="sql-kw">ON</span> e.department_id = d.id;
          </div>
        </div>
      </div>

      <h2>3. The Self Join</h2>
      <p>A Self Join joins a table to <strong>itself</strong>. It is commonly used for hierarchical data, such as finding the manager of each employee:</p>
      <div class="sql-code-block">
<span class="sql-kw">SELECT</span> 
  e.first_name <span class="sql-kw">AS</span> employee_name,
  <span class="sql-kw">COALESCE</span>(m.first_name, 'No Manager (CEO)') <span class="sql-kw">AS</span> manager_name
<span class="sql-kw">FROM</span> employees e
<span class="sql-kw">LEFT JOIN</span> employees m 
  <span class="sql-kw">ON</span> e.manager_id = m.id;
      </div>
    `
  },

  // 10. Subqueries
  {
    id: "subqueries",
    title: "Subqueries & Derived Tables",
    category: "Queries",
    categoryNumber: 10,
    readTime: "10 min",
    summary: "Scalar, multiple-row, and correlated subqueries in SELECT, FROM, WHERE, with EXISTS and IN.",
    content: `
      <h2>1. What is a Subquery?</h2>
      <p>A <strong>subquery</strong> (or nested inner query) is a <code>SELECT</code> query placed inside another SQL statement. The inner query executes first and passes its result to the outer query.</p>

      <h2>2. Single-Row (Scalar) Subquery</h2>
      <p>Returns exactly one single value (1 row, 1 column). Perfect for dynamic threshold comparisons:</p>
      <div class="sql-code-block">
<span class="sql-comment">-- Find all employees who earn more than the company average:</span>
<span class="sql-kw">SELECT</span> first_name, salary 
<span class="sql-kw">FROM</span> employees 
<span class="sql-kw">WHERE</span> salary &gt; (
  <span class="sql-kw">SELECT AVG</span>(salary) <span class="sql-kw">FROM</span> employees
);
      </div>

      <h2>3. Multiple-Row Subqueries (IN, ANY, ALL)</h2>
      <p>Returns a column with multiple rows. Use with <code>IN</code>:</p>
      <div class="sql-code-block">
<span class="sql-comment">-- Find employees working in departments located in 'San Francisco':</span>
<span class="sql-kw">SELECT</span> first_name, last_name 
<span class="sql-kw">FROM</span> employees 
<span class="sql-kw">WHERE</span> department_id <span class="sql-kw">IN</span> (
  <span class="sql-kw">SELECT</span> id <span class="sql-kw">FROM</span> departments <span class="sql-kw">WHERE</span> location = 'San Francisco'
);
      </div>

      <h2>4. Correlated Subqueries & EXISTS</h2>
      <p>In a <strong>correlated subquery</strong>, the inner query references a column from the outer row. The inner query is evaluated once for every row processed by the outer query:</p>
      <div class="sql-code-block">
<span class="sql-comment">-- Find employees who earn more than their own department average:</span>
<span class="sql-kw">SELECT</span> e.first_name, e.salary, e.department_id 
<span class="sql-kw">FROM</span> employees e 
<span class="sql-kw">WHERE</span> e.salary &gt; (
  <span class="sql-kw">SELECT AVG</span>(sub.salary) 
  <span class="sql-kw">FROM</span> employees sub 
  <span class="sql-kw">WHERE</span> sub.department_id = e.department_id
);
      </div>
    `
  },

  // 11. Common Table Expressions (CTEs)
  {
    id: "ctes",
    title: "Common Table Expressions (CTEs)",
    category: "Advanced SQL",
    categoryNumber: 11,
    readTime: "10 min",
    summary: "Write clean, readable modular SQL using the WITH clause, multiple chained CTEs, and recursive CTEs.",
    content: `
      <h2>1. What is a CTE?</h2>
      <p>A <strong>Common Table Expression (CTE)</strong> is a temporary named result set defined using the <code>WITH</code> clause that exists only during the execution of a single query. CTEs make complex queries much cleaner, modular, and easier to debug than deeply nested subqueries.</p>

      <h2>2. Basic CTE Syntax & Usage</h2>
      <div class="sql-code-block">
<span class="sql-kw">WITH</span> high_earners <span class="sql-kw">AS</span> (
  <span class="sql-kw">SELECT</span> id, first_name, department_id, salary 
  <span class="sql-kw">FROM</span> employees 
  <span class="sql-kw">WHERE</span> salary &gt;= 120000
)
<span class="sql-kw">SELECT</span> h.first_name, h.salary, d.department_name 
<span class="sql-kw">FROM</span> high_earners h 
<span class="sql-kw">JOIN</span> departments d <span class="sql-kw">ON</span> h.department_id = d.id;
      </div>

      <h2>3. Chaining Multiple CTEs</h2>
      <p>You can define multiple CTEs separated by commas, referencing previous CTEs sequentially:</p>
      <div class="sql-code-block">
<span class="sql-kw">WITH</span> 
  dept_stats <span class="sql-kw">AS</span> (
    <span class="sql-kw">SELECT</span> department_id, <span class="sql-kw">AVG</span>(salary) <span class="sql-kw">AS</span> avg_dept_sal 
    <span class="sql-kw">FROM</span> employees 
    <span class="sql-kw">GROUP BY</span> department_id
  ),
  company_avg <span class="sql-kw">AS</span> (
    <span class="sql-kw">SELECT AVG</span>(salary) <span class="sql-kw">AS</span> total_avg 
    <span class="sql-kw">FROM</span> employees
  )
<span class="sql-kw">SELECT</span> d.department_name, ds.avg_dept_sal 
<span class="sql-kw">FROM</span> dept_stats ds 
<span class="sql-kw">JOIN</span> departments d <span class="sql-kw">ON</span> ds.department_id = d.id 
<span class="sql-kw">CROSS JOIN</span> company_avg ca 
<span class="sql-kw">WHERE</span> ds.avg_dept_sal &gt; ca.total_avg;
      </div>

      <h2>4. Recursive CTEs for Hierarchies</h2>
      <p>A <strong>Recursive CTE</strong> references itself. It is the premier SQL technique for traversing company organizational trees, threaded discussion comments, and file folder structures:</p>
      <div class="sql-code-block">
<span class="sql-kw">WITH RECURSIVE</span> OrgHierarchy <span class="sql-kw">AS</span> (
  <span class="sql-comment">-- Anchor member: Start with top-level executives (manager_id is NULL)</span>
  <span class="sql-kw">SELECT</span> id, first_name, manager_id, 1 <span class="sql-kw">AS</span> level
  <span class="sql-kw">FROM</span> employees
  <span class="sql-kw">WHERE</span> manager_id <span class="sql-kw">IS NULL</span>

  <span class="sql-kw">UNION ALL</span>

  <span class="sql-comment">-- Recursive member: Find employees who report to someone in OrgHierarchy</span>
  <span class="sql-kw">SELECT</span> e.id, e.first_name, e.manager_id, o.level + 1
  <span class="sql-kw">FROM</span> employees e
  <span class="sql-kw">JOIN</span> OrgHierarchy o <span class="sql-kw">ON</span> e.manager_id = o.id
)
<span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> OrgHierarchy <span class="sql-kw">ORDER BY</span> level, id;
      </div>
    `
  },

  // 12. Set Operations
  {
    id: "set-operations",
    title: "Set Operations (UNION, INTERSECT, EXCEPT)",
    category: "Queries",
    categoryNumber: 12,
    readTime: "7 min",
    summary: "Combine query results using UNION, UNION ALL, INTERSECT, and EXCEPT with mathematical clarity.",
    content: `
      <h2>1. Rules for Set Operations</h2>
      <p>To combine results from two <code>SELECT</code> queries using set operators:</p>
      <ol>
        <li>Both queries must return the <strong>exact same number of columns</strong>.</li>
        <li>The columns must have <strong>compatible data types</strong> in corresponding order.</li>
        <li>The column names of the final result are taken from the first <code>SELECT</code> query.</li>
      </ol>

      <h2>2. UNION vs. UNION ALL</h2>
      <div class="sql-table-wrapper">
        <table class="sql-concept-table">
          <thead><tr><th>Operator</th><th>Duplicate Handling</th><th>Performance</th></tr></thead>
          <tbody>
            <tr><td><code>UNION</code></td><td>Automatically removes duplicates (runs a distinct sort)</td><td>Slower (sorting overhead)</td></tr>
            <tr><td><code>UNION ALL</code></td><td>Keeps all duplicates exactly as produced</td><td><strong>Blazing fast</strong> (concatenation)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="sql-code-block">
<span class="sql-comment">-- Combine customers and employees into a unified contact directory</span>
<span class="sql-kw">SELECT</span> first_name, email, 'Customer' <span class="sql-kw">AS</span> role <span class="sql-kw">FROM</span> customers
<span class="sql-kw">UNION ALL</span>
<span class="sql-kw">SELECT</span> first_name, email, 'Staff' <span class="sql-kw">AS</span> role <span class="sql-kw">FROM</span> employees;
      </div>

      <h2>3. INTERSECT and EXCEPT</h2>
      <ul>
        <li><code>INTERSECT</code>: Returns only rows that appear in <strong>BOTH</strong> query results.</li>
        <li><code>EXCEPT</code> (or <code>MINUS</code> in Oracle): Returns rows from the first query that do <strong>NOT</strong> appear in the second query.</li>
      </ul>
    `
  },

  // 13. Window Functions
  {
    id: "window-functions",
    title: "Window Functions",
    category: "Advanced SQL",
    categoryNumber: 13,
    readTime: "12 min",
    summary: "Master OVER, PARTITION BY, ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, and running totals.",
    content: `
      <h2>1. What are Window Functions?</h2>
      <p>Unlike <code>GROUP BY</code> (which collapses rows into a single summary), a <strong>Window Function</strong> performs a calculation across a set of table rows that are related to the current row, <strong>without collapsing the rows</strong>. Every individual row retains its identity in the final output.</p>

      <h2>2. ROW_NUMBER() vs. RANK() vs. DENSE_RANK()</h2>
      <p>This is one of the most frequently asked SQL interview questions in tech:</p>

      <div class="sql-table-wrapper">
        <table class="sql-concept-table">
          <thead><tr><th>Employee</th><th>Salary</th><th>ROW_NUMBER()</th><th>RANK()</th><th>DENSE_RANK()</th></tr></thead>
          <tbody>
            <tr><td>Alice</td><td>165,000</td><td>1</td><td>1</td><td>1</td></tr>
            <tr><td>George</td><td>150,000</td><td>2</td><td>2</td><td>2</td></tr>
            <tr><td>Bob</td><td>142,000</td><td>3</td><td>3</td><td>3</td></tr>
            <tr><td>Ethan</td><td>142,000 (Tie)</td><td>4</td><td>3</td><td>3</td></tr>
            <tr><td>Julia</td><td>125,000</td><td>5</td><td><strong>5 (Skips 4!)</strong></td><td><strong>4 (No gaps!)</strong></td></tr>
          </tbody>
        </table>
      </div>

      <h2>3. Top N Records Per Department (Solving Classic LeetCode Problems)</h2>
      <p>Using a CTE paired with <code>DENSE_RANK()</code>:</p>
      <div class="sql-code-block">
<span class="sql-kw">WITH</span> RankedEmployees <span class="sql-kw">AS</span> (
  <span class="sql-kw">SELECT</span> 
    first_name, 
    department_id, 
    salary,
    <span class="sql-kw">DENSE_RANK</span>() <span class="sql-kw">OVER</span> (
      <span class="sql-kw">PARTITION BY</span> department_id 
      <span class="sql-kw">ORDER BY</span> salary <span class="sql-kw">DESC</span>
    ) <span class="sql-kw">AS</span> salary_rank
  <span class="sql-kw">FROM</span> employees
)
<span class="sql-kw">SELECT</span> * 
<span class="sql-kw">FROM</span> RankedEmployees 
<span class="sql-kw">WHERE</span> salary_rank &lt;= 2;
      </div>

      <h2>4. Running Totals & Moving Averages</h2>
      <div class="sql-code-block">
<span class="sql-kw">SELECT</span> 
  order_date, 
  total_amount,
  <span class="sql-kw">SUM</span>(total_amount) <span class="sql-kw">OVER</span> (
    <span class="sql-kw">ORDER BY</span> order_date 
    <span class="sql-kw">ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</span>
  ) <span class="sql-kw">AS</span> running_revenue
<span class="sql-kw">FROM</span> orders;
      </div>

      <h2>5. Looking Across Rows: LAG() and LEAD()</h2>
      <ul>
        <li><code>LAG(column, offset)</code>: Reads a value from the <em>previous</em> row. Great for day-over-day growth or month-over-month comparisons.</li>
        <li><code>LEAD(column, offset)</code>: Reads a value from the <em>next</em> row.</li>
      </ul>
      <div class="sql-code-block">
<span class="sql-kw">SELECT</span> 
  id, 
  order_date, 
  total_amount,
  <span class="sql-kw">LAG</span>(total_amount, 1) <span class="sql-kw">OVER</span> (<span class="sql-kw">ORDER BY</span> order_date) <span class="sql-kw">AS</span> previous_order_amount,
  total_amount - <span class="sql-kw">LAG</span>(total_amount, 1) <span class="sql-kw">OVER</span> (<span class="sql-kw">ORDER BY</span> order_date) <span class="sql-kw">AS</span> difference
<span class="sql-kw">FROM</span> orders;
      </div>
    `
  },

  // 14. Constraints and Keys
  {
    id: "constraints-keys",
    title: "Constraints & Referential Integrity",
    category: "Database Design",
    categoryNumber: 14,
    readTime: "8 min",
    summary: "PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT, and CASCADE options.",
    content: `
      <h2>1. Database Constraints Overview</h2>
      <p>Constraints are rules enforced by the database engine at the moment of insertion or update. If an operation violates any constraint, the transaction is rejected immediately.</p>
      <ul>
        <li><code>PRIMARY KEY</code>: Uniquely identifies each record. Cannot be NULL.</li>
        <li><code>FOREIGN KEY</code>: Enforces that the value must exist in another referenced table.</li>
        <li><code>UNIQUE</code>: Ensures no duplicate values exist in the column (allows one or more NULLs depending on DB).</li>
        <li><code>NOT NULL</code>: Disallows NULL entries.</li>
        <li><code>CHECK</code>: Enforces arbitrary validation logic (e.g. <code>CHECK (age >= 18)</code>).</li>
        <li><code>DEFAULT</code>: Provides a fallback value if omitted during insert.</li>
      </ul>

      <h2>2. Foreign Key Actions: ON DELETE and ON UPDATE</h2>
      <div class="sql-table-wrapper">
        <table class="sql-concept-table">
          <thead><tr><th>Action</th><th>Behavior When Parent Row is Deleted</th></tr></thead>
          <tbody>
            <tr><td><code>CASCADE</code></td><td>Automatically deletes all matching child rows. (e.g. Delete an Order -> all Order Items are deleted).</td></tr>
            <tr><td><code>SET NULL</code></td><td>Sets child foreign key to <code>NULL</code> (parent is gone, child remains).</td></tr>
            <tr><td><code>RESTRICT</code> / <code>NO ACTION</code></td><td><strong>Rejects</strong> the deletion if any child rows reference it. (Default safe behavior).</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 15. Database Relationships
  {
    id: "database-relationships",
    title: "Database Relationships",
    category: "Database Design",
    categoryNumber: 15,
    readTime: "8 min",
    summary: "One-to-One, One-to-Many, and Many-to-Many relationships with junction tables and ER modeling.",
    content: `
      <h2>1. The 3 Cardinal Relationships</h2>
      <div class="sql-grid-2">
        <div class="sql-feature-card">
          <h4>1. One-to-One (1:1)</h4>
          <p>A single record in Table A relates to exactly one record in Table B.</p>
          <p><em>Example:</em> <code>users</code> and <code>user_profiles</code> (or <code>drivers_license</code>).</p>
          <p><em>Implementation:</em> Foreign key with a <code>UNIQUE</code> constraint.</p>
        </div>

        <div class="sql-feature-card">
          <h4>2. One-to-Many (1:N)</h4>
          <p>A single record in Table A relates to multiple records in Table B.</p>
          <p><em>Example:</em> One <code>department</code> has many <code>employees</code>. One <code>customer</code> places many <code>orders</code>.</p>
          <p><em>Implementation:</em> Foreign key placed in the "Many" table.</p>
        </div>
      </div>

      <div class="sql-feature-card" style="margin-top: 1rem;">
        <h4>3. Many-to-Many (N:M)</h4>
        <p>Multiple records in Table A relate to multiple records in Table B.</p>
        <p><em>Example:</em> Students and Courses (A student takes many courses; a course has many students). Products and Orders.</p>
        <p><em>Implementation:</em> Requires a <strong>Junction Table</strong> (also called Bridge or Associative table) containing two foreign keys:</p>
        <div class="sql-code-block">
<span class="sql-kw">CREATE TABLE</span> enrollments (
  student_id <span class="sql-kw">INT REFERENCES</span> students(id),
  course_id <span class="sql-kw">INT REFERENCES</span> courses(id),
  enrollment_date <span class="sql-kw">DATE DEFAULT CURRENT_DATE</span>,
  <span class="sql-kw">PRIMARY KEY</span> (student_id, course_id)
);
        </div>
      </div>
    `
  },

  // 16. Database Normalization
  {
    id: "database-normalization",
    title: "Database Normalization (1NF to BCNF)",
    category: "Database Design",
    categoryNumber: 16,
    readTime: "11 min",
    summary: "Eliminate update, insertion, and deletion anomalies by progressing from unnormalized data to 1NF, 2NF, 3NF, and BCNF.",
    content: `
      <h2>1. Why Normalization is Essential</h2>
      <p><strong>Database Normalization</strong> is the systematic process of designing a relational schema to minimize data redundancy and prevent data anomalies:</p>
      <ul>
        <li><strong>Insertion Anomaly:</strong> Inability to record certain information without creating unrelated dummy records.</li>
        <li><strong>Update Anomaly:</strong> If an employee's department address changes, having to update hundreds of rows. If one row is missed, data becomes inconsistent.</li>
        <li><strong>Deletion Anomaly:</strong> Deleting a record accidentally wipes out other unrelated information (e.g. deleting the last student enrolled in a course deletes all existence of the course).</li>
      </ul>

      <h2>2. Normal Forms Step-by-Step</h2>

      <h3>First Normal Form (1NF)</h3>
      <p>Requirements:</p>
      <ul>
        <li>Each column contains only <strong>atomic (indivisible) values</strong> (no comma-separated lists like <code>'Java, SQL, Python'</code> in a single field).</li>
        <li>No repeating groups or arrays.</li>
        <li>Table has a defined Primary Key.</li>
      </ul>

      <h3>Second Normal Form (2NF)</h3>
      <p>Requirements:</p>
      <ul>
        <li>Must already satisfy 1NF.</li>
        <li>No <strong>Partial Dependency</strong>: Every non-key column must depend on the <em>entire</em> primary key, not just part of a composite key.</li>
      </ul>

      <h3>Third Normal Form (3NF)</h3>
      <p>Requirements:</p>
      <ul>
        <li>Must already satisfy 2NF.</li>
        <li>No <strong>Transitive Dependency</strong>: Non-key columns must not depend on other non-key columns (e.g. <code>zip_code -> state</code>). Non-key attributes must depend <em>"on the key, the whole key, and nothing but the key"</em>.</li>
      </ul>

      <h3>Boyce-Codd Normal Form (BCNF)</h3>
      <p>A stricter version of 3NF where every determinant must be a candidate key.</p>

      <h2>3. Normalization vs. Denormalization</h2>
      <p>While 3NF is standard for transactional OLTP systems (where fast, safe writes are paramount), analytics data warehouses (OLAP like Snowflake or BigQuery) often intentionally <strong>denormalize</strong> data into Star Schemas to avoid expensive multi-table joins during massive aggregation reporting.</p>
    `
  },

  // 17. Indexing
  {
    id: "indexing",
    title: "Database Indexing & B-Trees",
    category: "Performance",
    categoryNumber: 17,
    readTime: "11 min",
    summary: "Understand how B-trees, clustered, non-clustered, composite, and partial indexes transform slow table scans into lightning-fast lookups.",
    content: `
      <h2>1. What is an Index?</h2>
      <p>An index is a specialized data structure (most commonly a balanced <strong>B+ Tree</strong>) maintained alongside your table data. It functions exactly like the <strong>alphabetical index at the back of a textbook</strong>: instead of reading all 1,000 pages cover-to-cover (a Full Table Scan), you look up the keyword in the index and jump straight to the exact page number (Index Seek).</p>

      <h2>2. Clustered vs. Non-Clustered Indexes</h2>
      <div class="sql-table-wrapper">
        <table class="sql-concept-table">
          <thead><tr><th>Feature</th><th>Clustered Index</th><th>Non-Clustered Index (Secondary)</th></tr></thead>
          <tbody>
            <tr><td><strong>Physical Storage</strong></td><td>Dictates the actual physical sorting order of rows on disk.</td><td>Stored in a completely separate structure with pointers back to the rows.</td></tr>
            <tr><td><strong>Count per Table</strong></td><td><strong>Only 1</strong> per table (usually the Primary Key).</td><td>Multiple (e.g. 5-10 per table).</td></tr>
            <tr><td><strong>Leaf Nodes</strong></td><td>Contain the actual full row data.</td><td>Contain the indexed column value plus a pointer (row ID or PK).</td></tr>
          </tbody>
        </table>
      </div>

      <h2>3. The Trade-Offs of Indexing</h2>
      <div class="sql-card-callout" style="border-left-color: #f59e0b;">
        <strong>The Golden Rule of Indexing:</strong> Indexes make <code>SELECT</code> queries exponentially faster, but they make <code>INSERT</code>, <code>UPDATE</code>, and <code>DELETE</code> operations slower! Whenever a row is added or modified, every single index on that table must also be updated and re-balanced on disk. Never index columns indiscriminately.
      </div>

      <h2>4. Composite Indexes & Leftmost Prefix Rule</h2>
      <p>A composite index covers multiple columns: <code>CREATE INDEX idx_emp_dept_sal ON employees (department_id, salary);</code></p>
      <p>According to the <strong>Leftmost Prefix Rule</strong>:</p>
      <ul>
        <li><code>WHERE department_id = 1 AND salary > 100000</code> -> Uses index!</li>
        <li><code>WHERE department_id = 1</code> -> Uses index!</li>
        <li><code>WHERE salary > 100000</code> (without department_id) -> <strong>CANNOT USE THE INDEX!</strong></li>
      </ul>
    `
  },

  // 18. Views and Materialized Views
  {
    id: "views-materialized-views",
    title: "Views & Materialized Views",
    category: "Database Design",
    categoryNumber: 18,
    readTime: "8 min",
    summary: "Encapsulate complex logic with standard Views and pre-compute expensive aggregations with Materialized Views.",
    content: `
      <h2>1. What is a View?</h2>
      <p>A <strong>View</strong> is a saved virtual query. It does not store any physical data on disk; instead, whenever you query the view, the database runs the underlying SQL query behind the scenes.</p>
      
      <div class="sql-code-block">
<span class="sql-kw">CREATE VIEW</span> active_employee_directory <span class="sql-kw">AS</span>
<span class="sql-kw">SELECT</span> 
  e.first_name, 
  e.last_name, 
  e.email, 
  d.department_name, 
  e.job_title
<span class="sql-kw">FROM</span> employees e
<span class="sql-kw">JOIN</span> departments d <span class="sql-kw">ON</span> e.department_id = d.id;

<span class="sql-comment">-- Querying the view just like a real table:</span>
<span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> active_employee_directory <span class="sql-kw">WHERE</span> department_name = 'Engineering';
      </div>

      <h2>2. Standard View vs. Materialized View</h2>
      <div class="sql-table-wrapper">
        <table class="sql-concept-table">
          <thead><tr><th>Property</th><th>Standard View</th><th>Materialized View (PostgreSQL / Oracle)</th></tr></thead>
          <tbody>
            <tr><td><strong>Data Stored on Disk?</strong></td><td>No (runs live query on demand)</td><td><strong>Yes</strong> (pre-computes and caches results)</td></tr>
            <tr><td><strong>Query Speed</strong></td><td>Same as original query</td><td><strong>Blazing fast</strong> (reads from pre-computed disk cache)</td></tr>
            <tr><td><strong>Data Freshness</strong></td><td>Always 100% real-time</td><td>Stale until explicitly refreshed</td></tr>
            <tr><td><strong>Refresh Command</strong></td><td>N/A</td><td><code>REFRESH MATERIALIZED VIEW view_name;</code></td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 19. Transactions and ACID
  {
    id: "transactions-acid",
    title: "Transactions & ACID Properties",
    category: "Transactions",
    categoryNumber: 19,
    readTime: "11 min",
    summary: "Learn Atomicity, Consistency, Isolation, Durability, isolation levels, dirty reads, and deadlocks using bank transfers.",
    content: `
      <h2>1. What is a Transaction?</h2>
      <p>A <strong>transaction</strong> is a logical unit of work consisting of one or more SQL statements executed as an indivisible bundle. Either ALL statements execute successfully, or the entire transaction is rolled back as if nothing ever happened.</p>

      <h2>2. The Classic Bank Transfer Example</h2>
      <div class="sql-code-block">
<span class="sql-kw">BEGIN TRANSACTION</span>;

<span class="sql-comment">-- Step 1: Deduct $500 from Account A</span>
<span class="sql-kw">UPDATE</span> bank_accounts 
<span class="sql-kw">SET</span> balance = balance - 500.00 
<span class="sql-kw">WHERE</span> account_id = 101;

<span class="sql-comment">-- Step 2: Credit $500 to Account B</span>
<span class="sql-kw">UPDATE</span> bank_accounts 
<span class="sql-kw">SET</span> balance = balance + 500.00 
<span class="sql-kw">WHERE</span> account_id = 202;

<span class="sql-comment">-- If everything succeeded without errors:</span>
<span class="sql-kw">COMMIT</span>;

<span class="sql-comment">-- If the server crashed or Step 2 failed:</span>
<span class="sql-comment">-- ROLLBACK; (Money returns to Account A safely!)</span>
      </div>

      <h2>3. The ACID Properties</h2>
      <ul>
        <li><strong>Atomicity (All-or-Nothing):</strong> Either every statement succeeds or everything is completely undone. No partial state is ever allowed.</li>
        <li><strong>Consistency:</strong> Transactions take the database from one valid state to another valid state, obeying all constraints, foreign keys, and cascade rules.</li>
        <li><strong>Isolation:</strong> Concurrent transactions running at the same time do not interfere with each other or observe uncommitted intermediate changes.</li>
        <li><strong>Durability:</strong> Once a transaction commits, its changes are permanently recorded in write-ahead logs (WAL) on disk and survive server power failures.</li>
      </ul>

      <h2>4. The 4 Isolation Levels & Concurrency Phenomena</h2>
      <div class="sql-table-wrapper">
        <table class="sql-concept-table">
          <thead><tr><th>Isolation Level</th><th>Dirty Read</th><th>Non-Repeatable Read</th><th>Phantom Read</th></tr></thead>
          <tbody>
            <tr><td><strong>Read Uncommitted</strong></td><td>Allowed</td><td>Allowed</td><td>Allowed</td></tr>
            <tr><td><strong>Read Committed</strong> (Default in Postgres)</td><td>Prevented</td><td>Allowed</td><td>Allowed</td></tr>
            <tr><td><strong>Repeatable Read</strong> (Default in MySQL)</td><td>Prevented</td><td>Prevented</td><td>Allowed</td></tr>
            <tr><td><strong>Serializable</strong> (Highest safety)</td><td>Prevented</td><td>Prevented</td><td>Prevented</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 20. Stored Procedures
  {
    id: "stored-procedures",
    title: "Stored Procedures",
    category: "Programmability",
    categoryNumber: 20,
    readTime: "9 min",
    summary: "Write reusable compiled server-side database routines with input/output parameters, conditional branches, and loops.",
    content: `
      <h2>1. What is a Stored Procedure?</h2>
      <p>A <strong>Stored Procedure</strong> is a pre-compiled collection of SQL statements and procedural logic stored directly inside the database server. Applications can invoke the procedure by name instead of sending massive SQL strings over the network.</p>

      <h2>2. Benefits of Stored Procedures</h2>
      <ul>
        <li><strong>Network Efficiency:</strong> Instead of making 10 round trips between the application server and the database, one single <code>CALL</code> executes everything locally.</li>
        <li><strong>Security:</strong> You can grant users permission to execute the procedure without giving them direct read/write table access.</li>
        <li><strong>Code Reusability:</strong> Common business processes (like end-of-month billing or user account deactivation) are centralized in one tested place.</li>
      </ul>

      <h2>3. Syntax Example (MySQL vs. PostgreSQL)</h2>
      <div class="sql-code-block">
<span class="sql-comment">-- MySQL Syntax:</span>
<span class="sql-kw">DELIMITER</span> //
<span class="sql-kw">CREATE PROCEDURE</span> GiveDepartmentRaise(
  <span class="sql-kw">IN</span> p_dept_id <span class="sql-kw">INT</span>, 
  <span class="sql-kw">IN</span> p_percentage <span class="sql-kw">DECIMAL</span>(4,2)
)
<span class="sql-kw">BEGIN</span>
  <span class="sql-kw">UPDATE</span> employees 
  <span class="sql-kw">SET</span> salary = salary * (1 + p_percentage / 100)
  <span class="sql-kw">WHERE</span> department_id = p_dept_id;
<span class="sql-kw">END</span> //
<span class="sql-kw">DELIMITER</span> ;

<span class="sql-comment">-- Executing the procedure:</span>
<span class="sql-kw">CALL</span> GiveDepartmentRaise(1, 5.0);
      </div>
    `
  },

  // 21. Functions and Triggers
  {
    id: "functions-triggers",
    title: "Functions & Triggers",
    category: "Programmability",
    categoryNumber: 21,
    readTime: "9 min",
    summary: "User-Defined Functions (UDFs) vs Procedures, and automatic audit logging using BEFORE and AFTER Triggers.",
    content: `
      <h2>1. User-Defined Functions (UDFs)</h2>
      <p>A <strong>Function</strong> must always return a value (or table) and can be called directly inside a <code>SELECT</code> statement, whereas a Stored Procedure cannot:</p>
      <div class="sql-code-block">
<span class="sql-comment">-- PostgreSQL Function Example:</span>
<span class="sql-kw">CREATE FUNCTION</span> calculate_annual_bonus(salary <span class="sql-kw">NUMERIC</span>, score <span class="sql-kw">INT</span>)
<span class="sql-kw">RETURNS NUMERIC AS</span> $$
<span class="sql-kw">BEGIN</span>
  <span class="sql-kw">IF</span> score &gt;= 9 <span class="sql-kw">THEN</span>
    <span class="sql-kw">RETURN</span> salary * 0.15;
  <span class="sql-kw">ELSE</span>
    <span class="sql-kw">RETURN</span> salary * 0.05;
  <span class="sql-kw">END IF</span>;
<span class="sql-kw">END</span>;
$$ <span class="sql-kw">LANGUAGE</span> plpgsql;

<span class="sql-kw">SELECT</span> first_name, calculate_annual_bonus(salary, 9) <span class="sql-kw">FROM</span> employees;
      </div>

      <h2>2. Database Triggers</h2>
      <p>A <strong>Trigger</strong> is a special piece of database code that automatically executes (fires) whenever an <code>INSERT</code>, <code>UPDATE</code>, or <code>DELETE</code> occurs on a target table.</p>

      <div class="sql-code-block">
<span class="sql-comment">-- Automatic Audit Log Trigger Example:</span>
<span class="sql-kw">CREATE TRIGGER</span> trg_employee_salary_audit
<span class="sql-kw">AFTER UPDATE ON</span> employees
<span class="sql-kw">FOR EACH ROW</span>
<span class="sql-kw">BEGIN</span>
  <span class="sql-kw">IF</span> OLD.salary != NEW.salary <span class="sql-kw">THEN</span>
    <span class="sql-kw">INSERT INTO</span> salary_audit_log (employee_id, old_salary, new_salary, changed_at)
    <span class="sql-kw">VALUES</span> (OLD.id, OLD.salary, NEW.salary, <span class="sql-kw">NOW</span>());
  <span class="sql-kw">END IF</span>;
<span class="sql-kw">END</span>;
      </div>
    `
  },

  // 22. Advanced SQL
  {
    id: "advanced-sql",
    title: "Advanced SQL Techniques",
    category: "Advanced SQL",
    categoryNumber: 22,
    readTime: "10 min",
    summary: "Explore UPSERT (ON CONFLICT), JSON querying, LATERAL joins, and Table Partitioning.",
    content: `
      <h2>1. UPSERT (INSERT ON CONFLICT / ON DUPLICATE KEY)</h2>
      <p>In high-throughput systems, you frequently want to insert a row, or update it if it already exists:</p>
      <div class="sql-code-block">
<span class="sql-comment">-- PostgreSQL Syntax:</span>
<span class="sql-kw">INSERT INTO</span> product_views (product_id, view_count) 
<span class="sql-kw">VALUES</span> (42, 1)
<span class="sql-kw">ON CONFLICT</span> (product_id) 
<span class="sql-kw">DO UPDATE SET</span> view_count = product_views.view_count + 1;

<span class="sql-comment">-- MySQL Syntax:</span>
<span class="sql-kw">INSERT INTO</span> product_views (product_id, view_count) 
<span class="sql-kw">VALUES</span> (42, 1)
<span class="sql-kw">ON DUPLICATE KEY UPDATE</span> view_count = view_count + 1;
      </div>

      <h2>2. Querying JSON / JSONB Columns</h2>
      <p>Modern applications frequently store semi-structured event payloads in PostgreSQL JSONB columns:</p>
      <div class="sql-code-block">
<span class="sql-comment">-- Extract JSON attribute using -&gt;&gt; operator in PostgreSQL:</span>
<span class="sql-kw">SELECT</span> 
  id, 
  attributes-&gt;&gt;'color' <span class="sql-kw">AS</span> product_color,
  attributes-&gt;&gt;'wireless' <span class="sql-kw">AS</span> is_wireless
<span class="sql-kw">FROM</span> products
<span class="sql-kw">WHERE</span> attributes-&gt;&gt;'category' = 'Electronics';
      </div>

      <h2>3. Table Partitioning for Big Data</h2>
      <p>When a table reaches tens or hundreds of millions of rows, searching becomes slow. <strong>Partitioning</strong> splits one massive logical table into smaller physical tables by Range (e.g. partition by year), List, or Hash.</p>
    `
  },

  // 23. Query Optimization
  {
    id: "query-optimization",
    title: "Query Optimization & EXPLAIN",
    category: "Performance",
    categoryNumber: 23,
    readTime: "12 min",
    summary: "Diagnose slow queries using EXPLAIN ANALYZE, fix Seq Scans, eliminate N+1 queries, and implement Keyset Pagination.",
    content: `
      <h2>1. The Execution Plan & EXPLAIN ANALYZE</h2>
      <p>When you submit a query, the SQL optimizer plans how to fetch the rows. Running <code>EXPLAIN ANALYZE</code> reveals the actual execution statistics:</p>
      
      <div class="sql-code-block">
<span class="sql-kw">EXPLAIN ANALYZE</span>
<span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> employees <span class="sql-kw">WHERE</span> department_id = 1;
      </div>

      <div class="sql-table-wrapper">
        <table class="sql-concept-table">
          <thead><tr><th>Operation In Plan</th><th>What It Means</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td><code>Seq Scan</code> (Table Scan)</td><td>Scanned every row from beginning to end on disk.</td><td>Acceptable for tiny tables; terrible for millions of rows.</td></tr>
            <tr><td><code>Index Scan</code></td><td>Looked up keys in B-tree, then fetched rows from heap.</td><td>Fast and efficient.</td></tr>
            <tr><td><code>Index Only Scan</code></td><td>All needed columns were found inside the index itself!</td><td><strong>Best possible performance!</strong></td></tr>
          </tbody>
        </table>
      </div>

      <h2>2. High-Yield Optimization Techniques</h2>
      <ol>
        <li><strong>Stop using <code>SELECT *</code> in production:</strong> Fetching unnecessary large text columns wastes I/O and prevents Index Only Scans.</li>
        <li><strong>Avoid functions on indexed columns in WHERE:</strong> <code>WHERE YEAR(created_at) = 2024</code> invalidates the B-tree index! Write <code>WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'</code> instead.</li>
        <li><strong>Replace OFFSET Pagination with Keyset Pagination:</strong> <code>LIMIT 20 OFFSET 500000</code> forces the database to read and discard 500,000 rows. Use <code>WHERE id > last_seen_id ORDER BY id LIMIT 20</code>.</li>
        <li><strong>Fix the N+1 Query Problem:</strong> Instead of fetching 1 department and looping in Python to fire 100 queries for employees, fetch all with one single <code>JOIN</code> or <code>IN (...)</code> query.</li>
      </ol>
    `
  },

  // 24. Database Security
  {
    id: "database-security",
    title: "Database Security & SQL Injection",
    category: "Administration & Security",
    categoryNumber: 24,
    readTime: "9 min",
    summary: "Prevent SQL Injection attacks using Parameterized Queries, apply Least Privilege, and manage User Roles.",
    content: `
      <h2>1. What is SQL Injection (SQLi)?</h2>
      <p>SQL Injection occurs when untrusted user input is directly concatenated into a dynamic SQL query string without escaping or sanitization, allowing an attacker to manipulate the query logic:</p>

      <div class="sql-code-block">
<span class="sql-comment">-- VULNERABLE CODE (Never do this!):</span>
<span class="sql-comment">-- query = "SELECT * FROM users WHERE email = '" + userInput + "';"</span>
<span class="sql-comment">-- If attacker enters: admin@test.com' OR '1'='1</span>
<span class="sql-comment">-- The query becomes:</span>
<span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> users <span class="sql-kw">WHERE</span> email = 'admin@test.com' <span class="sql-kw">OR</span> '1'='1';
<span class="sql-comment">-- Attacker bypasses authentication completely!</span>
      </div>

      <h2>2. The Fix: Parameterized Queries (Prepared Statements)</h2>
      <p>With parameterized queries, user inputs are sent separately as pure data parameters, completely isolated from query parsing:</p>

      <div class="sql-code-block">
<span class="sql-comment">-- Safe Python (psycopg2 / SQLAlchemy) Parameterization:</span>
cursor.execute(
  <span class="sql-str">"SELECT * FROM users WHERE email = %s AND status = %s"</span>, 
  (user_email, <span class="sql-str">'active'</span>)
)

<span class="sql-comment">-- Safe Node.js (pg) Parameterization:</span>
await client.query(
  <span class="sql-str">'SELECT * FROM users WHERE email = $1'</span>, 
  [userEmail]
);
      </div>

      <h2>3. Principle of Least Privilege</h2>
      <p>Applications should never connect to databases using the <code>root</code> or <code>postgres</code> superuser account. Create dedicated application users with strictly limited privileges:</p>
      <div class="sql-code-block">
<span class="sql-kw">CREATE USER</span> app_backend <span class="sql-kw">WITH PASSWORD</span> 'SecurePassword123!';
<span class="sql-kw">GRANT SELECT, INSERT, UPDATE</span> <span class="sql-kw">ON</span> employees <span class="sql-kw">TO</span> app_backend;
<span class="sql-comment">-- Do not grant DROP, ALTER, or TRUNCATE permissions!</span>
      </div>
    `
  },

  // 25. Database Administration Basics
  {
    id: "database-admin-basics",
    title: "Database Administration Basics",
    category: "Administration & Security",
    categoryNumber: 25,
    readTime: "8 min",
    summary: "Backups, recovery, replication, connection pooling, and maintenance tasks (VACUUM and ANALYZE).",
    content: `
      <h2>1. Logical vs. Physical Backups</h2>
      <ul>
        <li><strong>Logical Backups (<code>mysqldump</code>, <code>pg_dump</code>):</strong> Exports database schemas and row data as plain SQL text scripts. Portable across versions and operating systems.</li>
        <li><strong>Physical Backups:</strong> Exact binary file-level copies of the database disk clusters. Much faster for multi-terabyte enterprise databases.</li>
      </ul>

      <h2>2. Connection Pooling</h2>
      <p>Opening and closing physical TCP connections to a database is expensive (TLS handshakes, memory allocation). Connection poolers (such as <strong>PgBouncer</strong> or HikariCP) maintain a pool of warm connections, allowing thousands of web requests to share a handful of active database connections.</p>

      <h2>3. Maintenance: VACUUM and ANALYZE in PostgreSQL</h2>
      <p>PostgreSQL uses <strong>MVCC (Multi-Version Concurrency Control)</strong>. When a row is updated or deleted, the old version remains on disk as a "dead tuple". <code>VACUUM</code> reclaims this dead space, while <code>ANALYZE</code> updates table statistics so the cost-based optimizer can pick the fastest query plans.</p>
    `
  },

  // 26. MySQL Deep Dive
  {
    id: "mysql-guide",
    title: "MySQL Deep Dive",
    category: "Database Technologies",
    categoryNumber: 26,
    readTime: "10 min",
    summary: "Architecture, InnoDB storage engine, MyISAM comparison, AUTO_INCREMENT, and MySQL-specific syntax.",
    content: `
      <h2>1. MySQL Architecture & Storage Engines</h2>
      <p>MySQL has a unique pluggable storage engine architecture. The two prominent engines are:</p>
      <div class="sql-table-wrapper">
        <table class="sql-concept-table">
          <thead><tr><th>Feature</th><th>InnoDB (Default & Recommended)</th><th>MyISAM (Legacy)</th></tr></thead>
          <tbody>
            <tr><td><strong>Transactions & ACID</strong></td><td><strong>Full ACID Support</strong></td><td>No transaction support</td></tr>
            <tr><td><strong>Locking Level</strong></td><td><strong>Row-level locking</strong> (high concurrency)</td><td>Table-level locking (bottleneck)</td></tr>
            <tr><td><strong>Foreign Keys</strong></td><td>Yes</td><td>No</td></tr>
            <tr><td><strong>Crash Recovery</strong></td><td>Automatic via Redo logs</td><td>Requires manual repair</td></tr>
          </tbody>
        </table>
      </div>

      <h2>2. Distinctive MySQL Syntax & Features</h2>
      <ul>
        <li><code>AUTO_INCREMENT</code> for primary key surrogate ID generation.</li>
        <li><code>LIMIT [offset], [count]</code> syntax.</li>
        <li><code>IFNULL(a, b)</code> and ternary-style <code>IF(condition, true_val, false_val)</code>.</li>
        <li><code>INSERT INTO ... ON DUPLICATE KEY UPDATE</code> for upserts.</li>
      </ul>
    `
  },

  // 27. PostgreSQL Deep Dive
  {
    id: "postgresql-guide",
    title: "PostgreSQL Deep Dive",
    category: "Database Technologies",
    categoryNumber: 27,
    readTime: "10 min",
    summary: "The world's most advanced open source database: MVCC, JSONB, GIN/GiST indexes, UUIDs, RETURNING clause, and schema namespaces.",
    content: `
      <h2>1. Why Developers Love PostgreSQL</h2>
      <p><strong>PostgreSQL</strong> (often called Postgres) is an advanced object-relational database renowned for strict standards compliance, extensibility, and sophisticated features:</p>
      <ul>
        <li><strong>Schema Namespaces:</strong> Multiple schemas (e.g. <code>public</code>, <code>analytics</code>, <code>tenant_1</code>) within a single database instance.</li>
        <li><strong>First-Class JSONB:</strong> Fast binary JSON storage with specialized containment operators (<code>@></code>, <code>?</code>, <code>->></code>) and GIN indexing.</li>
        <li><strong>RETURNING Clause:</strong> Returns generated columns instantly upon write:
          <div class="sql-code-block">
<span class="sql-kw">INSERT INTO</span> employees (first_name, last_name, salary) 
<span class="sql-kw">VALUES</span> ('Sophia', 'Martinez', 115000) 
<span class="sql-kw">RETURNING</span> id, hire_date;
          </div>
        </li>
        <li><strong>Index Diversity:</strong> B-Tree, Hash, GIN (for full-text & JSONB), GiST (for geospatial PostGIS), and BRIN (for massive time-series).</li>
      </ul>
    `
  }
];

