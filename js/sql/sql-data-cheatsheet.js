/**
 * MLForge SQL Cheatsheet Database
 * Searchable, categorized syntax cheatsheet with copy buttons,
 * explanations, and direct links to comprehensive lessons.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sql = window.MLForge.sql || {};
window.MLForge.sql.data = window.MLForge.sql.data || {};

MLForge.sql.data.cheatsheet = [
  // 1. Data Query (DQL)
  {
    id: "cs-select",
    category: "Queries (DQL)",
    title: "Basic SELECT Query",
    syntax: "SELECT col1, col2 FROM table_name WHERE condition ORDER BY col1 DESC LIMIT count;",
    example: "SELECT first_name, salary FROM employees WHERE salary > 90000 ORDER BY salary DESC LIMIT 5;",
    description: "Retrieves specific columns from a table filtered by conditions and sorted.",
    topicLink: "#sql/topic/filtering-sorting"
  },
  {
    id: "cs-distinct",
    category: "Queries (DQL)",
    title: "SELECT DISTINCT",
    syntax: "SELECT DISTINCT col1, col2 FROM table_name;",
    example: "SELECT DISTINCT department_id FROM employees;",
    description: "Removes duplicate rows from the final query result set.",
    topicLink: "#sql/topic/filtering-sorting"
  },
  {
    id: "cs-null",
    category: "Queries (DQL)",
    title: "IS NULL / IS NOT NULL",
    syntax: "SELECT * FROM table_name WHERE col_name IS NULL;",
    example: "SELECT * FROM employees WHERE manager_id IS NULL;",
    description: "Tests whether a column contains a missing (NULL) or non-null value.",
    topicLink: "#sql/topic/filtering-sorting"
  },

  // 2. Data Manipulation (DML)
  {
    id: "cs-insert",
    category: "Manipulation (DML)",
    title: "INSERT INTO",
    syntax: "INSERT INTO table_name (col1, col2) VALUES (val1, val2);",
    example: "INSERT INTO departments (department_name, location) VALUES ('AI Labs', 'Seattle');",
    description: "Inserts one or more new records into a table.",
    topicLink: "#sql/topic/sql-commands"
  },
  {
    id: "cs-update",
    category: "Manipulation (DML)",
    title: "UPDATE Table",
    syntax: "UPDATE table_name SET col1 = val1, col2 = val2 WHERE condition;",
    example: "UPDATE employees SET salary = salary * 1.05 WHERE department_id = 1;",
    description: "Modifies existing rows in a table. Always include a WHERE clause!",
    topicLink: "#sql/topic/sql-commands"
  },
  {
    id: "cs-delete",
    category: "Manipulation (DML)",
    title: "DELETE FROM",
    syntax: "DELETE FROM table_name WHERE condition;",
    example: "DELETE FROM employees WHERE id = 15;",
    description: "Deletes specific records matching a condition. Always verify WHERE clause!",
    topicLink: "#sql/topic/sql-commands"
  },

  // 3. Data Definition (DDL)
  {
    id: "cs-create-table",
    category: "Definition (DDL)",
    title: "CREATE TABLE",
    syntax: "CREATE TABLE table_name (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  col1 VARCHAR(50) NOT NULL UNIQUE,\n  col2 DECIMAL(10,2) DEFAULT 0.00\n);",
    example: "CREATE TABLE products (\n  id INT PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  price DECIMAL(8,2) CHECK (price >= 0)\n);",
    description: "Defines a new physical table with column types and constraints.",
    topicLink: "#sql/topic/database-creation"
  },
  {
    id: "cs-alter-table",
    category: "Definition (DDL)",
    title: "ALTER TABLE",
    syntax: "ALTER TABLE table_name ADD COLUMN new_col VARCHAR(100);",
    example: "ALTER TABLE employees ADD COLUMN phone VARCHAR(20);",
    description: "Adds, modifies, or drops columns in an existing table without destroying data.",
    topicLink: "#sql/topic/database-creation"
  },

  // 4. Joins
  {
    id: "cs-inner-join",
    category: "Joins",
    title: "INNER JOIN",
    syntax: "SELECT a.col, b.col FROM table_a a INNER JOIN table_b b ON a.id = b.a_id;",
    example: "SELECT e.first_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.id;",
    description: "Combines records from two tables where the join condition matches on both sides.",
    topicLink: "#sql/topic/sql-joins"
  },
  {
    id: "cs-left-join",
    category: "Joins",
    title: "LEFT JOIN (Outer)",
    syntax: "SELECT a.col, b.col FROM table_a a LEFT JOIN table_b b ON a.id = b.a_id;",
    example: "SELECT c.first_name, o.id FROM customers c LEFT JOIN orders o ON c.id = o.customer_id;",
    description: "Returns all rows from table A, plus matching rows from table B (NULL if unmatched).",
    topicLink: "#sql/topic/sql-joins"
  },

  // 5. Aggregations & Grouping
  {
    id: "cs-group-by",
    category: "Aggregations",
    title: "GROUP BY & HAVING",
    syntax: "SELECT col, COUNT(*), AVG(num_col) FROM table_name GROUP BY col HAVING AVG(num_col) > threshold;",
    example: "SELECT department_id, AVG(salary) FROM employees GROUP BY department_id HAVING AVG(salary) > 100000;",
    description: "Partitions rows into group buckets and computes summary statistics.",
    topicLink: "#sql/topic/aggregate-functions"
  },

  // 6. Common Table Expressions (CTEs)
  {
    id: "cs-cte",
    category: "Advanced SQL",
    title: "WITH CTE Clause",
    syntax: "WITH cte_name AS (\n  SELECT col1, col2 FROM table_name WHERE condition\n)\nSELECT * FROM cte_name;",
    example: "WITH high_earners AS (\n  SELECT * FROM employees WHERE salary > 120000\n)\nSELECT first_name, salary FROM high_earners;",
    description: "Creates a temporary modular named result set for clean query organization.",
    topicLink: "#sql/topic/ctes"
  },

  // 7. Window Functions
  {
    id: "cs-window-ranking",
    category: "Window Functions",
    title: "ROW_NUMBER & DENSE_RANK",
    syntax: "SELECT col, DENSE_RANK() OVER (PARTITION BY group_col ORDER BY sort_col DESC) AS rnk FROM table_name;",
    example: "SELECT first_name, salary, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank FROM employees;",
    description: "Ranks rows within groups without collapsing or grouping away individual records.",
    topicLink: "#sql/topic/window-functions"
  },
  {
    id: "cs-window-running-total",
    category: "Window Functions",
    title: "Running Cumulative Total",
    syntax: "SELECT date_col, amount, SUM(amount) OVER (ORDER BY date_col) AS running_total FROM table_name;",
    example: "SELECT order_date, total_amount, SUM(total_amount) OVER (ORDER BY order_date) AS cumulative_revenue FROM orders;",
    description: "Computes a cumulative sum across rows chronologically.",
    topicLink: "#sql/topic/window-functions"
  },

  // 8. Transactions
  {
    id: "cs-transactions",
    category: "Transactions",
    title: "BEGIN / COMMIT / ROLLBACK",
    syntax: "BEGIN TRANSACTION;\n  UPDATE accounts SET balance = balance - 100 WHERE id = 1;\n  UPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;",
    example: "BEGIN;\n  UPDATE inventory SET stock = stock - 1 WHERE product_id = 42;\nCOMMIT;",
    description: "Executes multiple DML statements as an all-or-nothing atomic unit.",
    topicLink: "#sql/topic/transactions-acid"
  },

  // 9. Indexing
  {
    id: "cs-index",
    category: "Performance",
    title: "CREATE INDEX",
    syntax: "CREATE INDEX idx_name ON table_name (col1, col2);",
    example: "CREATE INDEX idx_emp_dept_sal ON employees (department_id, salary);",
    description: "Creates a B-tree index structure to speed up search and join filters.",
    topicLink: "#sql/topic/indexing"
  }
];

