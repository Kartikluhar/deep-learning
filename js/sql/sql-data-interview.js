/**
 * MLForge SQL Interview Questions Database
 * Comprehensive bank of 35+ core and scenario-based interview questions
 * with elevator pitch answers, detailed technical explanations, SQL queries,
 * sample outputs, and follow-up interviewer questions.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sql = window.MLForge.sql || {};
window.MLForge.sql.data = window.MLForge.sql.data || {};

MLForge.sql.data.interview = [
  {
    id: "q-1",
    category: "Fundamentals",
    question: "What is SQL and how does it differ from a DBMS?",
    shortAnswer: "SQL is the standardized query language used to interact with databases. A DBMS is the actual software engine (e.g. PostgreSQL, MySQL) that stores data on disk, enforces constraints, and executes those SQL queries.",
    explanation: "Think of SQL as the language (like English) and DBMS as the person listening and performing the work. A DBMS manages physical disk storage, memory caching, query compilation, indexes, user security, and transaction concurrency.",
    codeExample: null,
    followUps: ["What is an RDBMS?", "Is SQL a declarative or procedural language?"]
  },
  {
    id: "q-2",
    category: "Keys & Constraints",
    question: "What is the difference between a Primary Key and a Unique Key?",
    shortAnswer: "A Primary Key uniquely identifies a record and CANNOT contain NULL values (only 1 PK per table). A Unique Key prevents duplicates but allows NULL values (multiple Unique keys allowed per table).",
    explanation: "A table can have only one Primary Key because it defines the fundamental identity and often the clustered storage order. Unique keys enforce uniqueness on alternate attributes like email or username while permitting NULLs.",
    codeExample: "CREATE TABLE users (\n  id INT PRIMARY KEY,\n  email VARCHAR(100) UNIQUE NOT NULL,\n  phone VARCHAR(20) UNIQUE\n);",
    followUps: ["How many NULLs does a UNIQUE constraint permit in PostgreSQL vs SQL Server?"]
  },
  {
    id: "q-3",
    category: "Commands & DDL",
    question: "What is the difference between DELETE, TRUNCATE, and DROP?",
    shortAnswer: "DELETE is a DML statement that removes rows one-by-one and can be rolled back. TRUNCATE is a DDL statement that deallocates all table data pages instantaneously. DROP completely deletes the data and the table definition.",
    explanation: "DELETE activates row-level triggers and logs every row deletion in the transaction log, making it slow for millions of rows. TRUNCATE resets auto-increment sequences and does not fire row triggers. DROP destroys the table entirely from the data dictionary.",
    codeExample: "-- DML (Logged row-by-row, slow):\nDELETE FROM employees WHERE id = 5;\n\n-- DDL (Blazing fast page reset):\nTRUNCATE TABLE temp_logs;\n\n-- DDL (Removes table completely):\nDROP TABLE old_archive;",
    followUps: ["Can TRUNCATE be rolled back inside a transaction in PostgreSQL?", "Do triggers fire during TRUNCATE?"]
  },
  {
    id: "q-4",
    category: "Queries & Filtering",
    question: "What is the difference between WHERE and HAVING?",
    shortAnswer: "WHERE filters individual rows BEFORE any grouping or aggregation takes place. HAVING filters aggregated group rows AFTER the GROUP BY operation.",
    explanation: "Because WHERE runs before groups are computed, it cannot evaluate aggregate functions (writing `WHERE AVG(salary) > 50k` will throw a syntax error). HAVING operates on the post-aggregation summary buckets.",
    codeExample: "SELECT department_id, AVG(salary) AS avg_sal\nFROM employees\nWHERE salary >= 50000          -- Filter individual employees first\nGROUP BY department_id\nHAVING AVG(salary) > 100000;   -- Filter aggregated department averages",
    followUps: ["Can you have a HAVING clause without a GROUP BY clause?", "What is the logical query processing order of SQL clauses?"]
  },
  {
    id: "q-5",
    category: "Joins",
    question: "Explain the differences between INNER, LEFT, RIGHT, and FULL OUTER joins.",
    shortAnswer: "INNER returns only matching rows from both tables. LEFT returns all left rows plus matching right rows (NULL if missing). RIGHT returns all right rows. FULL OUTER returns all rows from both tables, filling missing sides with NULL.",
    explanation: "Joins are relational algebra operations. If Table A has 5 rows and Table B has 0 matches, an INNER JOIN yields 0 rows, while a LEFT JOIN yields all 5 rows with NULL columns for Table B.",
    codeExample: "SELECT e.first_name, d.department_name\nFROM employees e\nLEFT JOIN departments d ON e.department_id = d.id;",
    followUps: ["Does MySQL natively support FULL OUTER JOIN?", "What is a CROSS JOIN?"]
  },
  {
    id: "q-6",
    category: "Set Operations",
    question: "What is the difference between UNION and UNION ALL?",
    shortAnswer: "UNION combines the results of two queries and removes duplicate rows (requiring an expensive distinct sort). UNION ALL combines results without removing duplicates and is substantially faster.",
    explanation: "Unless you explicitly need to filter out identical duplicate records across queries, always prefer UNION ALL in production code to avoid unnecessary sorting and memory pressure.",
    codeExample: "SELECT email FROM customers\nUNION ALL\nSELECT email FROM suppliers;",
    followUps: ["What are the column count and type requirements for set operations?"]
  },
  {
    id: "q-7",
    category: "Performance & Indexing",
    question: "What is an Index and what are the trade-offs of having too many indexes?",
    shortAnswer: "An index is a B+ tree data structure that speeds up SELECT search queries. The trade-off is that every index slows down INSERT, UPDATE, and DELETE operations because all indexes must be updated on disk.",
    explanation: "Indexes add disk storage overhead and write latency. A table with 10 secondary indexes will experience significant write amplification during bulk data ingestion.",
    codeExample: "CREATE INDEX idx_emp_dept ON employees(department_id);",
    followUps: ["What is a Covering Index?", "What is the Leftmost Prefix rule in Composite Indexes?"]
  },
  {
    id: "q-8",
    category: "Transactions",
    question: "Explain the ACID properties in database systems.",
    shortAnswer: "Atomicity (all operations succeed or all roll back), Consistency (all constraints and rules remain valid), Isolation (concurrent transactions do not interfere), and Durability (committed data survives crashes).",
    explanation: "ACID guarantees that financial transfers and mission-critical state updates remain resilient. Atomicity prevents half-completed transfers; Durability writes commits to WAL disk logs before sending success to the client.",
    codeExample: null,
    followUps: ["What are the four transaction isolation levels?", "What is a dirty read?"]
  },
  {
    id: "q-9",
    category: "Advanced SQL",
    question: "What are Window Functions and how do they differ from GROUP BY?",
    shortAnswer: "GROUP BY collapses multiple rows into a single summary row per group. Window functions perform calculations across a partition of rows while preserving every individual row in the output.",
    explanation: "With window functions, you can calculate running totals, moving averages, and ranks right alongside individual transaction IDs without collapsing or losing row details.",
    codeExample: "SELECT \n  first_name, \n  salary, \n  AVG(salary) OVER (PARTITION BY department_id) AS dept_avg\nFROM employees;",
    followUps: ["What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?"]
  },
  {
    id: "q-10",
    category: "Advanced SQL",
    question: "What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?",
    shortAnswer: "ROW_NUMBER assigns strictly sequential integers (1, 2, 3, 4). RANK assigns the same rank to ties and skips subsequent numbers (1, 2, 2, 4). DENSE_RANK assigns the same rank to ties without skipping numbers (1, 2, 2, 3).",
    explanation: "For finding the 'second highest salary', DENSE_RANK() is preferred because if two top employees share the same highest salary of $165k (tie rank 1), DENSE_RANK will label the next salary as rank 2, whereas RANK would skip to rank 3.",
    codeExample: "SELECT \n  salary,\n  ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn,\n  RANK() OVER (ORDER BY salary DESC) AS rnk,\n  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk\nFROM employees;",
    followUps: ["Which function should you use to find the N-th highest salary?"]
  },
  {
    id: "q-11",
    category: "Scenario-Based",
    question: "How do you find the second highest salary in a table?",
    shortAnswer: "Either by using a subquery with MAX() or by using the DENSE_RANK() window function inside a CTE.",
    explanation: "Using DENSE_RANK() inside a CTE is the most robust and extensible approach because changing `WHERE rnk = 2` to `WHERE rnk = N` solves the Nth highest salary problem instantly.",
    codeExample: "-- Method 1: Robust Window Function CTE\nWITH RankedSalaries AS (\n  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk\n  FROM employees\n)\nSELECT MAX(salary) AS second_highest_salary\nFROM RankedSalaries\nWHERE rnk = 2;\n\n-- Method 2: Scalar Subquery\nSELECT MAX(salary) AS second_highest_salary\nFROM employees\nWHERE salary < (SELECT MAX(salary) FROM employees);",
    followUps: ["How do you handle the case where all employees earn the exact same salary?"]
  },
  {
    id: "q-12",
    category: "Scenario-Based",
    question: "How do you find duplicate records in a table?",
    shortAnswer: "Use GROUP BY on the duplicate candidate columns and filter with HAVING COUNT(*) > 1.",
    explanation: "Grouping by the unique identifier fields aggregates identical occurrences together. HAVING COUNT(*) > 1 filters only records that occur more than once.",
    codeExample: "SELECT email, COUNT(*) AS occurrences\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;",
    followUps: ["How would you delete the duplicates while keeping only the record with the lowest ID?"]
  },
  {
    id: "q-13",
    category: "Scenario-Based",
    question: "How do you find employees who earn more than their direct managers?",
    shortAnswer: "Perform a Self-Join between the employees table (as employee `e`) and itself (as manager `m`) on `e.manager_id = m.id` and filter `e.salary > m.salary`.",
    explanation: "This is a standard LeetCode SQL problem (#181). By joining the table on the manager relationship, you can compare the two salary columns directly in the WHERE clause.",
    codeExample: "SELECT \n  e.first_name AS employee_name, \n  e.salary AS emp_salary,\n  m.first_name AS manager_name, \n  m.salary AS mgr_salary\nFROM employees e\nJOIN employees m ON e.manager_id = m.id\nWHERE e.salary > m.salary;",
    followUps: ["What kind of join should you use if you want to list employees who don't have a manager?"]
  },
  {
    id: "q-14",
    category: "Performance & Optimization",
    question: "How do you diagnose and optimize a slow-running SQL query?",
    shortAnswer: "Run EXPLAIN ANALYZE to inspect the execution plan, check for Sequential Scans on large tables, verify appropriate B-tree/composite indexes, avoid SELECT *, and eliminate N+1 subqueries.",
    explanation: "Query optimization begins with understanding the bottleneck: is it missing indexes, outdated table statistics, lock contention, or large temporary disk sorts? Adding covering indexes and rewriting correlated subqueries into joins often yields 100x speedups.",
    codeExample: "EXPLAIN ANALYZE\nSELECT * FROM orders WHERE customer_id = 42 AND status = 'Completed';",
    followUps: ["What is the difference between an Index Scan and an Index Only Scan?", "What is a Hash Join?"]
  },
  {
    id: "q-15",
    category: "Security",
    question: "What is SQL Injection and how do you guarantee prevention?",
    shortAnswer: "SQL Injection occurs when untrusted user text is concatenated into dynamic SQL queries, altering query logic. It is guaranteed prevented by using Parameterized Queries (Prepared Statements) and the Principle of Least Privilege.",
    explanation: "Parameterized queries ensure the database engine compiles the SQL query structure first, treating user input purely as literal parameters that cannot escape and execute malicious SQL code.",
    codeExample: "-- Safe Parameterized Execution (Node.js/pg):\nclient.query('SELECT * FROM users WHERE email = $1', [inputEmail]);",
    followUps: ["Can ORMs prevent SQL injection completely?", "What are Stored Procedures' role in security?"]
  }
];

