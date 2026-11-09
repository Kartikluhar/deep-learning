/**
 * MLForge SQL A-Z Glossary Database
 * Searchable glossary of essential database terms with plain English definitions,
 * code examples, related concepts, and topic links.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sql = window.MLForge.sql || {};
window.MLForge.sql.data = window.MLForge.sql.data || {};

MLForge.sql.data.glossary = [
  {
    term: "ACID",
    letter: "A",
    definition: "An acronym for Atomicity, Consistency, Isolation, and Durability — the four fundamental guarantees of reliable database transactions.",
    example: "Bank money transfers rely on ACID so funds are never lost midway if a server crashes.",
    related: ["Transaction", "Atomicity", "Isolation"],
    topicLink: "#sql/topic/transactions-acid"
  },
  {
    term: "Aggregate Function",
    letter: "A",
    definition: "A mathematical function that calculates a single summary result from multiple input row values (e.g. SUM, AVG, COUNT, MIN, MAX).",
    example: "SELECT AVG(salary) FROM employees;",
    related: ["GROUP BY", "HAVING"],
    topicLink: "#sql/topic/aggregate-functions"
  },
  {
    term: "Alias",
    letter: "A",
    definition: "A temporary custom name assigned to a table or column using the AS keyword to improve readability.",
    example: "SELECT first_name AS employee_name FROM employees e;",
    related: ["SELECT", "SQL Joins"],
    topicLink: "#sql/topic/filtering-sorting"
  },
  {
    term: "Atomicity",
    letter: "A",
    definition: "The 'All-or-Nothing' property of transactions guaranteeing that either every statement commits successfully or all changes are rolled back.",
    example: "Deducting from one account and adding to another either both succeed or both fail.",
    related: ["ACID", "ROLLBACK", "COMMIT"],
    topicLink: "#sql/topic/transactions-acid"
  },
  {
    term: "Candidate Key",
    letter: "C",
    definition: "A minimal set of columns that can uniquely identify any database record without redundant fields.",
    example: "Both 'id' and 'email' might be candidate keys; one is chosen as Primary Key.",
    related: ["Primary Key", "Super Key"],
    topicLink: "#sql/topic/database-fundamentals"
  },
  {
    term: "Cardinality",
    letter: "C",
    definition: "The number of unique values in a column relative to the total number of rows. High cardinality (e.g. user_id) is ideal for B-tree indexes.",
    example: "Gender has low cardinality (2-3 values); UUID has maximum cardinality.",
    related: ["Indexing", "B-Tree"],
    topicLink: "#sql/topic/indexing"
  },
  {
    term: "Common Table Expression (CTE)",
    letter: "C",
    definition: "A temporary named result set defined using the WITH clause that exists only during the execution of a single query.",
    example: "WITH high_earners AS (SELECT * FROM employees WHERE salary > 100k) SELECT * FROM high_earners;",
    related: ["Subquery", "Recursive CTE"],
    topicLink: "#sql/topic/ctes"
  },
  {
    term: "Correlated Subquery",
    letter: "C",
    definition: "An inner subquery that references columns from the outer query, causing it to be evaluated once for each row processed by the outer query.",
    example: "WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id)",
    related: ["Subqueries", "EXISTS"],
    topicLink: "#sql/topic/subqueries"
  },
  {
    term: "Deadlock",
    letter: "D",
    definition: "A concurrency freeze that occurs when two transactions each hold a lock that the other needs to proceed, causing both to wait indefinitely.",
    example: "Tx 1 holds Lock A and wants Lock B; Tx 2 holds Lock B and wants Lock A.",
    related: ["Transactions", "Locks", "ACID"],
    topicLink: "#sql/topic/transactions-acid"
  },
  {
    term: "DDL (Data Definition Language)",
    letter: "D",
    definition: "The subset of SQL commands used to create, modify, or destroy database structures (CREATE, ALTER, DROP, TRUNCATE).",
    example: "CREATE TABLE customers (id INT PRIMARY KEY);",
    related: ["DML", "DQL", "TCL"],
    topicLink: "#sql/topic/sql-commands"
  },
  {
    term: "DML (Data Manipulation Language)",
    letter: "D",
    definition: "The subset of SQL commands used to modify actual data rows inside tables (INSERT, UPDATE, DELETE).",
    example: "UPDATE employees SET salary = salary * 1.05;",
    related: ["DDL", "DQL"],
    topicLink: "#sql/topic/sql-commands"
  },
  {
    term: "Foreign Key",
    letter: "F",
    definition: "A column in one table that references the Primary Key of another table, mathematically enforcing referential integrity.",
    example: "employees.department_id REFERENCES departments(id)",
    related: ["Primary Key", "Referential Integrity"],
    topicLink: "#sql/topic/database-fundamentals"
  },
  {
    term: "Index",
    letter: "I",
    definition: "A balanced B+ tree data structure maintained on table columns to accelerate search and sort operations without scanning all rows.",
    example: "CREATE INDEX idx_emp_email ON employees(email);",
    related: ["Clustered Index", "Query Optimization"],
    topicLink: "#sql/topic/indexing"
  },
  {
    term: "JOIN",
    letter: "J",
    definition: "A relational operation used to combine rows from two or more tables based on a related column between them.",
    example: "SELECT * FROM orders JOIN customers ON orders.customer_id = customers.id;",
    related: ["INNER JOIN", "LEFT JOIN", "FULL OUTER JOIN"],
    topicLink: "#sql/topic/sql-joins"
  },
  {
    term: "Normalization",
    letter: "N",
    definition: "The formal process of designing database tables to eliminate data redundancy and prevent insertion, update, and deletion anomalies.",
    example: "Organizing schemas to satisfy 1NF, 2NF, 3NF, and BCNF.",
    related: ["1NF", "2NF", "3NF", "Denormalization"],
    topicLink: "#sql/topic/database-normalization"
  },
  {
    term: "NULL",
    letter: "N",
    definition: "A special marker in SQL indicating missing or unknown data. It is not equivalent to zero (0) or an empty string ('').",
    example: "WHERE manager_id IS NULL;",
    related: ["IS NULL", "COALESCE"],
    topicLink: "#sql/topic/filtering-sorting"
  },
  {
    term: "Primary Key",
    letter: "P",
    definition: "A column or set of columns that uniquely identifies each record in a table. Must be UNIQUE and NOT NULL.",
    example: "id INT PRIMARY KEY AUTO_INCREMENT",
    related: ["Candidate Key", "Foreign Key"],
    topicLink: "#sql/topic/database-fundamentals"
  },
  {
    term: "Referential Integrity",
    letter: "R",
    definition: "A database state where all foreign key references are valid, ensuring child records cannot point to non-existent parent records.",
    example: "You cannot assign an employee to department 99 if department 99 does not exist.",
    related: ["Foreign Key", "CASCADE"],
    topicLink: "#sql/topic/database-fundamentals"
  },
  {
    term: "Subquery",
    letter: "S",
    definition: "A nested query placed inside another SQL statement whose output is consumed by the outer query.",
    example: "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
    related: ["Correlated Subquery", "CTE"],
    topicLink: "#sql/topic/subqueries"
  },
  {
    term: "Transaction",
    letter: "T",
    definition: "A sequence of one or more SQL operations executed as a single indivisible unit of work under ACID guarantees.",
    example: "BEGIN TRANSACTION; UPDATE ...; COMMIT;",
    related: ["ACID", "COMMIT", "ROLLBACK"],
    topicLink: "#sql/topic/transactions-acid"
  },
  {
    term: "Trigger",
    letter: "T",
    definition: "A procedural database object automatically executed (fired) in response to specified INSERT, UPDATE, or DELETE events.",
    example: "Automatically recording historical salary changes in an audit log table.",
    related: ["Stored Procedures", "DML"],
    topicLink: "#sql/topic/functions-triggers"
  },
  {
    term: "View",
    letter: "V",
    definition: "A saved virtual table defined by a SELECT query that computes dynamically whenever accessed.",
    example: "CREATE VIEW active_staff AS SELECT * FROM employees WHERE is_active = TRUE;",
    related: ["Materialized View", "Table"],
    topicLink: "#sql/topic/views-materialized-views"
  },
  {
    term: "Window Function",
    letter: "W",
    definition: "A function that performs calculations across a set of table rows related to the current row without collapsing the rows into a single summary.",
    example: "ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC)",
    related: ["ROW_NUMBER", "RANK", "DENSE_RANK", "OVER"],
    topicLink: "#sql/topic/window-functions"
  }
];

