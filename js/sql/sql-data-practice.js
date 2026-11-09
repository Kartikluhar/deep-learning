/**
 * MLForge SQL Practice Problems Database
 * Realistic practice problems across Beginner, Intermediate, and Advanced tiers
 * with real schemas, sample data inputs, expected output verification, hints,
 * solution queries, and step-by-step explanations.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sql = window.MLForge.sql || {};
window.MLForge.sql.data = window.MLForge.sql.data || {};

MLForge.sql.data.problems = [
  // BEGINNER PROBLEMS
  {
    id: "prob-1",
    title: "1. High Earners in Engineering",
    difficulty: "Easy",
    category: "Filtering & Sorting",
    tables: ["employees"],
    statement: "Write a SQL query to find the <code>first_name</code>, <code>last_name</code>, and <code>salary</code> of all employees in department 1 whose salary is greater than or equal to $100,000. Order the results by salary in descending order.",
    schemaDesc: "Table: <code>employees</code> (id, first_name, last_name, email, department_id, salary, hire_date)",
    starterQuery: "SELECT first_name, last_name, salary\nFROM employees\nWHERE department_id = 1 AND salary >= 100000\nORDER BY salary DESC;",
    solutionQuery: "SELECT first_name, last_name, salary\nFROM employees\nWHERE department_id = 1 AND salary >= 100000\nORDER BY salary DESC;",
    hints: [
      "Use WHERE to filter both department_id = 1 and salary >= 100000 using the AND operator.",
      "Use ORDER BY salary DESC to sort highest salaries first."
    ],
    explanation: "The query scans the employees table, checks both conditions in the WHERE clause, selects the 3 requested columns, and applies a descending sort on salary.",
    relatedTopic: "filtering-sorting"
  },
  {
    id: "prob-2",
    title: "2. Unique Customer Cities",
    difficulty: "Easy",
    category: "Basic Queries",
    tables: ["customers"],
    statement: "Write a SQL query to return a distinct list of all cities where customers are located, sorted alphabetically in ascending order.",
    schemaDesc: "Table: <code>customers</code> (id, first_name, last_name, email, city, country, created_at)",
    starterQuery: "SELECT DISTINCT city\nFROM customers\nORDER BY city ASC;",
    solutionQuery: "SELECT DISTINCT city\nFROM customers\nORDER BY city ASC;",
    hints: [
      "Use DISTINCT to eliminate duplicate city names.",
      "Add ORDER BY city ASC to sort alphabetically."
    ],
    explanation: "DISTINCT filters out duplicate city entries and ORDER BY city ASC presents the list cleanly from A to Z.",
    relatedTopic: "filtering-sorting"
  },
  {
    id: "prob-3",
    title: "3. Top 3 Highest Priced Products",
    difficulty: "Easy",
    category: "Sorting & Limits",
    tables: ["products"],
    statement: "Find the <code>product_name</code>, <code>category</code>, and <code>price</code> of the top 3 most expensive products in stock.",
    schemaDesc: "Table: <code>products</code> (id, product_name, category, price, stock_quantity)",
    starterQuery: "SELECT product_name, category, price\nFROM products\nORDER BY price DESC\nLIMIT 3;",
    solutionQuery: "SELECT product_name, category, price\nFROM products\nORDER BY price DESC\nLIMIT 3;",
    hints: [
      "Sort by price DESC to place highest prices at the top.",
      "Use LIMIT 3 to keep only the top 3 records."
    ],
    explanation: "ORDER BY price DESC sorts products from highest to lowest price, and LIMIT 3 truncates the result set to the top 3 items.",
    relatedTopic: "filtering-sorting"
  },
  {
    id: "prob-4",
    title: "4. Employees Without a Direct Manager",
    difficulty: "Easy",
    category: "NULL Handling",
    tables: ["employees"],
    statement: "Find the <code>first_name</code>, <code>last_name</code>, and <code>job_title</code> of all executive leaders who do not have a manager (their <code>manager_id</code> is NULL).",
    schemaDesc: "Table: <code>employees</code> (id, first_name, last_name, manager_id, job_title...)",
    starterQuery: "SELECT first_name, last_name, job_title\nFROM employees\nWHERE manager_id IS NULL;",
    solutionQuery: "SELECT first_name, last_name, job_title\nFROM employees\nWHERE manager_id IS NULL;",
    hints: [
      "Remember that in SQL, NULL cannot be checked using = NULL.",
      "Always use IS NULL to test for missing or empty foreign keys."
    ],
    explanation: "In SQL, NULL signifies an unknown value, so standard equality (=) returns false/unknown. The IS NULL operator specifically identifies rows where manager_id is unset.",
    relatedTopic: "filtering-sorting"
  },
  {
    id: "prob-5",
    title: "5. Total Department Headcount",
    difficulty: "Easy",
    category: "Aggregations",
    tables: ["employees"],
    statement: "Calculate the total number of employees working in each department. Return <code>department_id</code> and <code>employee_count</code>, ordered by department_id.",
    schemaDesc: "Table: <code>employees</code> (id, department_id, ...)",
    starterQuery: "SELECT department_id, COUNT(*) AS employee_count\nFROM employees\nGROUP BY department_id\nORDER BY department_id;",
    solutionQuery: "SELECT department_id, COUNT(*) AS employee_count\nFROM employees\nGROUP BY department_id\nORDER BY department_id;",
    hints: [
      "Use GROUP BY department_id to split rows into department buckets.",
      "Use COUNT(*) to count rows in each bucket."
    ],
    explanation: "GROUP BY partitions the table by department_id, and COUNT(*) aggregates the number of employees belonging to each department.",
    relatedTopic: "aggregate-functions"
  },

  // INTERMEDIATE PROBLEMS
  {
    id: "prob-6",
    title: "6. Department Average Salaries Above $100K",
    difficulty: "Medium",
    category: "GROUP BY & HAVING",
    tables: ["employees", "departments"],
    statement: "Find the department name and the average salary for all departments whose average salary is strictly greater than $100,000. Format the average salary rounded to 2 decimal places as <code>avg_salary</code>.",
    schemaDesc: "Tables: <code>departments</code> (id, department_name), <code>employees</code> (department_id, salary)",
    starterQuery: "SELECT d.department_name, ROUND(AVG(e.salary), 2) AS avg_salary\nFROM employees e\nJOIN departments d ON e.department_id = d.id\nGROUP BY d.department_name\nHAVING AVG(e.salary) > 100000\nORDER BY avg_salary DESC;",
    solutionQuery: "SELECT d.department_name, ROUND(AVG(e.salary), 2) AS avg_salary\nFROM employees e\nJOIN departments d ON e.department_id = d.id\nGROUP BY d.department_name\nHAVING AVG(e.salary) > 100000\nORDER BY avg_salary DESC;",
    hints: [
      "Join employees to departments using department_id = d.id.",
      "Use HAVING AVG(e.salary) > 100000 because WHERE cannot evaluate aggregate functions."
    ],
    explanation: "INNER JOIN links employees to their department names. GROUP BY d.department_name calculates the average salary per department, and HAVING filters out departments with an average below $100k.",
    relatedTopic: "aggregate-functions"
  },
  {
    id: "prob-7",
    title: "7. Customers Who Never Placed an Order",
    difficulty: "Medium",
    category: "Joins & NULLs",
    tables: ["customers", "orders"],
    statement: "Find the <code>first_name</code>, <code>last_name</code>, and <code>email</code> of all customers who have never placed any orders.",
    schemaDesc: "Tables: <code>customers</code> (id, first_name, last_name, email), <code>orders</code> (id, customer_id, ...)",
    starterQuery: "SELECT c.first_name, c.last_name, c.email\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nWHERE o.id IS NULL;",
    solutionQuery: "SELECT c.first_name, c.last_name, c.email\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nWHERE o.id IS NULL;",
    hints: [
      "Perform a LEFT JOIN from customers to orders.",
      "When a customer has no matching orders, the joined orders columns will be NULL. Filter with WHERE o.id IS NULL."
    ],
    explanation: "This is the classic anti-join pattern. A LEFT JOIN preserves every customer. For customers with zero orders, o.id evaluates to NULL.",
    relatedTopic: "sql-joins"
  },
  {
    id: "prob-8",
    title: "8. Employees Earning More Than Their Department Average",
    difficulty: "Medium",
    category: "Subqueries & Correlated Logic",
    tables: ["employees"],
    statement: "Find all employees who earn strictly more than the average salary of their own department. Return <code>first_name</code>, <code>department_id</code>, and <code>salary</code>.",
    schemaDesc: "Table: <code>employees</code> (id, first_name, department_id, salary)",
    starterQuery: "SELECT e.first_name, e.department_id, e.salary\nFROM employees e\nWHERE e.salary > (\n  SELECT AVG(sub.salary)\n  FROM employees sub\n  WHERE sub.department_id = e.department_id\n)\nORDER BY e.department_id, e.salary DESC;",
    solutionQuery: "SELECT e.first_name, e.department_id, e.salary\nFROM employees e\nWHERE e.salary > (\n  SELECT AVG(sub.salary)\n  FROM employees sub\n  WHERE sub.department_id = e.department_id\n)\nORDER BY e.department_id, e.salary DESC;",
    hints: [
      "Use a correlated subquery inside WHERE that calculates AVG(salary) matching sub.department_id = e.department_id.",
      "Alternatively, use a CTE or window function."
    ],
    explanation: "For each outer employee row, the correlated subquery dynamically calculates the specific department's average salary and verifies if the employee's salary exceeds it.",
    relatedTopic: "subqueries"
  },
  {
    id: "prob-9",
    title: "9. Employee and Manager Directory (Self Join)",
    difficulty: "Medium",
    category: "Self Joins",
    tables: ["employees"],
    statement: "Generate a list showing each employee's name (<code>employee_name</code>) alongside their manager's name (<code>manager_name</code>). If the employee has no manager, display <code>'Top Executive'</code>.",
    schemaDesc: "Table: <code>employees</code> (id, first_name, manager_id...)",
    starterQuery: "SELECT \n  e.first_name AS employee_name,\n  COALESCE(m.first_name, 'Top Executive') AS manager_name\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id\nORDER BY e.first_name;",
    solutionQuery: "SELECT \n  e.first_name AS employee_name,\n  COALESCE(m.first_name, 'Top Executive') AS manager_name\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id\nORDER BY e.first_name;",
    hints: [
      "Join the employees table with itself: alias one as 'e' and the other as 'm'.",
      "Use a LEFT JOIN so that employees with manager_id IS NULL are not excluded.",
      "Use COALESCE() to substitute NULL manager names."
    ],
    explanation: "A Self Join joins employees e with employees m on e.manager_id = m.id. COALESCE cleanly formats CEOs who don't have a manager.",
    relatedTopic: "sql-joins"
  },
  {
    id: "prob-10",
    title: "10. Student GPA Classification with CASE",
    difficulty: "Medium",
    category: "Conditional Logic",
    tables: ["students"],
    statement: "Classify each student's academic standing based on their GPA: <code>'Summa Cum Laude'</code> for GPA >= 3.8, <code>'Magna Cum Laude'</code> for GPA >= 3.5, and <code>'Honors'</code> for all others. Return <code>first_name</code>, <code>gpa</code>, and <code>honor_status</code>.",
    schemaDesc: "Table: <code>students</code> (id, first_name, last_name, gpa, major)",
    starterQuery: "SELECT \n  first_name, \n  gpa,\n  CASE\n    WHEN gpa >= 3.8 THEN 'Summa Cum Laude'\n    WHEN gpa >= 3.5 THEN 'Magna Cum Laude'\n    ELSE 'Honors'\n  END AS honor_status\nFROM students\nORDER BY gpa DESC;",
    solutionQuery: "SELECT \n  first_name, \n  gpa,\n  CASE\n    WHEN gpa >= 3.8 THEN 'Summa Cum Laude'\n    WHEN gpa >= 3.5 THEN 'Magna Cum Laude'\n    ELSE 'Honors'\n  END AS honor_status\nFROM students\nORDER BY gpa DESC;",
    hints: [
      "Use CASE WHEN ... THEN ... ELSE ... END syntax.",
      "Order checks from highest threshold to lowest."
    ],
    explanation: "The CASE expression evaluates conditions sequentially and assigns the corresponding academic tier for each student row.",
    relatedTopic: "sql-functions"
  },

  // ADVANCED PROBLEMS
  {
    id: "prob-11",
    title: "11. Second Highest Salary (LeetCode 176)",
    difficulty: "Hard",
    category: "Window Functions / Subqueries",
    tables: ["employees"],
    statement: "Find the second highest salary across the entire company. The query should return a single column <code>second_highest_salary</code>. Do not use hardcoded offsets that break on ties.",
    schemaDesc: "Table: <code>employees</code> (id, first_name, salary)",
    starterQuery: "SELECT MAX(salary) AS second_highest_salary\nFROM employees\nWHERE salary < (\n  SELECT MAX(salary) FROM employees\n);",
    solutionQuery: "SELECT MAX(salary) AS second_highest_salary\nFROM employees\nWHERE salary < (\n  SELECT MAX(salary) FROM employees\n);",
    hints: [
      "Find the maximum salary that is strictly less than the overall maximum salary.",
      "Alternatively, use DENSE_RANK() in a CTE and filter where rank = 2."
    ],
    explanation: "The subquery SELECT MAX(salary) returns the top salary ($165,000). The outer query then takes the MAX of all remaining salaries ($150,000), naturally resolving ties.",
    relatedTopic: "subqueries"
  },
  {
    id: "prob-12",
    title: "12. Top Earner in Each Department (Department Top Salary)",
    difficulty: "Hard",
    category: "Window Functions",
    tables: ["employees", "departments"],
    statement: "Find the employee(s) who earn the highest salary in their respective department. Return <code>department_name</code>, <code>employee_name</code>, and <code>salary</code>.",
    schemaDesc: "Tables: <code>employees</code>, <code>departments</code>",
    starterQuery: "WITH RankedStaff AS (\n  SELECT \n    d.department_name,\n    e.first_name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS sal_rank\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT department_name, employee_name, salary\nFROM RankedStaff\nWHERE sal_rank = 1\nORDER BY department_name;",
    solutionQuery: "WITH RankedStaff AS (\n  SELECT \n    d.department_name,\n    e.first_name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS sal_rank\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT department_name, employee_name, salary\nFROM RankedStaff\nWHERE sal_rank = 1\nORDER BY department_name;",
    hints: [
      "Use DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC).",
      "Filter the CTE where sal_rank = 1."
    ],
    explanation: "DENSE_RANK() partitions rows by department and ranks them by salary. Filtering for rank 1 extracts top earners, properly handling ties.",
    relatedTopic: "window-functions"
  },
  {
    id: "prob-13",
    title: "13. Cumulative Running Revenue by Date",
    difficulty: "Hard",
    category: "Window Functions",
    tables: ["orders"],
    statement: "Write a query to calculate the cumulative running total of revenue across orders sorted chronologically by <code>order_date</code>. Return <code>id</code>, <code>order_date</code>, <code>total_amount</code>, and <code>running_total</code>.",
    schemaDesc: "Table: <code>orders</code> (id, order_date, total_amount, status)",
    starterQuery: "SELECT \n  id,\n  order_date,\n  total_amount,\n  SUM(total_amount) OVER (ORDER BY order_date, id) AS running_total\nFROM orders\nORDER BY order_date, id;",
    solutionQuery: "SELECT \n  id,\n  order_date,\n  total_amount,\n  SUM(total_amount) OVER (ORDER BY order_date, id) AS running_total\nFROM orders\nORDER BY order_date, id;",
    hints: [
      "Use SUM(total_amount) OVER (ORDER BY order_date, id).",
      "By default, an ORDER BY inside OVER() creates an accumulative window frame."
    ],
    explanation: "SUM() as a window function with an ORDER BY clause accumulates the total amount row by row chronologically.",
    relatedTopic: "window-functions"
  },
  {
    id: "prob-14",
    title: "14. Month-over-Month Order Revenue Delta",
    difficulty: "Hard",
    category: "Window Functions (LAG)",
    tables: ["orders"],
    statement: "Using the <code>LAG()</code> window function, compare each order's <code>total_amount</code> with the immediately preceding order's amount. Return <code>id</code>, <code>order_date</code>, <code>current_amount</code>, <code>previous_amount</code>, and <code>delta</code>.",
    schemaDesc: "Table: <code>orders</code> (id, order_date, total_amount)",
    starterQuery: "SELECT \n  id,\n  order_date,\n  total_amount AS current_amount,\n  LAG(total_amount, 1) OVER (ORDER BY order_date, id) AS previous_amount,\n  total_amount - LAG(total_amount, 1) OVER (ORDER BY order_date, id) AS delta\nFROM orders\nORDER BY order_date, id;",
    solutionQuery: "SELECT \n  id,\n  order_date,\n  total_amount AS current_amount,\n  LAG(total_amount, 1) OVER (ORDER BY order_date, id) AS previous_amount,\n  total_amount - LAG(total_amount, 1) OVER (ORDER BY order_date, id) AS delta\nFROM orders\nORDER BY order_date, id;",
    hints: [
      "LAG(col, 1) OVER (ORDER BY ...) pulls values from the previous row.",
      "Calculate delta by subtracting previous_amount from current_amount."
    ],
    explanation: "LAG() accesses data from the preceding row without requiring a self-join, making sequence comparison efficient and readable.",
    relatedTopic: "window-functions"
  },
  {
    id: "prob-15",
    title: "15. Total Order Value Breakdown with Order Items",
    difficulty: "Hard",
    category: "Multi-Table Joins & Aggregation",
    tables: ["orders", "order_items", "products"],
    statement: "Calculate the total computed cost for each order by summing <code>(quantity * unit_price)</code> across all items. Return <code>order_id</code>, <code>item_count</code>, and <code>computed_total</code>. Filter for orders whose total computed value exceeds $200.",
    schemaDesc: "Tables: <code>orders</code>, <code>order_items</code>, <code>products</code>",
    starterQuery: "SELECT \n  order_id,\n  COUNT(*) AS item_count,\n  ROUND(SUM(quantity * unit_price), 2) AS computed_total\nFROM order_items\nGROUP BY order_id\nHAVING SUM(quantity * unit_price) > 200\nORDER BY computed_total DESC;",
    solutionQuery: "SELECT \n  order_id,\n  COUNT(*) AS item_count,\n  ROUND(SUM(quantity * unit_price), 2) AS computed_total\nFROM order_items\nGROUP BY order_id\nHAVING SUM(quantity * unit_price) > 200\nORDER BY computed_total DESC;",
    hints: [
      "Multiply quantity * unit_price inside the SUM() aggregate function.",
      "Use GROUP BY order_id to aggregate items per order.",
      "Filter using HAVING SUM(quantity * unit_price) > 200."
    ],
    explanation: "Groups line items by order_id, sums the item values, and filters out orders whose total is $200 or less.",
    relatedTopic: "aggregate-functions"
  }
];

