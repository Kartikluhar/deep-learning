/**
 * MLForge SQL Quizzes Database
 * Interactive multiple choice, true/false, predict output, and query bug quizzes
 * with instant scoring, hints, explanations, and topic categorization.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sql = window.MLForge.sql || {};
window.MLForge.sql.data = window.MLForge.sql.data || {};

MLForge.sql.data.quizzes = [
  {
    id: "quiz-1",
    title: "SQL Fundamentals & Basics",
    category: "Fundamentals",
    questions: [
      {
        id: "q1-1",
        question: "Which of the following statements about Primary Keys is FALSE?",
        type: "mcq",
        options: [
          "A table can have only one Primary Key.",
          "A Primary Key column can contain multiple NULL values.",
          "A Primary Key uniquely identifies each row in a table.",
          "A Primary Key can consist of more than one column (Composite Primary Key)."
        ],
        answer: 1,
        explanation: "Primary Keys CANNOT contain NULL values under any circumstances. Non-nullability (NOT NULL) is strictly enforced."
      },
      {
        id: "q1-2",
        question: "What is the expected result of evaluating `NULL = NULL` in standard SQL?",
        type: "mcq",
        options: [
          "TRUE",
          "FALSE",
          "UNKNOWN (treated as false in WHERE)",
          "Throws a syntax error"
        ],
        answer: 2,
        explanation: "In SQL three-valued logic, NULL represents an unknown value. You cannot compare two unknowns for equality. To check for NULL, you must write `IS NULL`."
      },
      {
        id: "q1-3",
        question: "Which command is classified as a DDL (Data Definition Language) statement?",
        type: "mcq",
        options: [
          "UPDATE",
          "DELETE",
          "TRUNCATE",
          "INSERT"
        ],
        answer: 2,
        explanation: "TRUNCATE is a DDL command because it directly resets table storage pointers and drops pages at the metadata level, unlike DELETE which is DML."
      },
      {
        id: "q1-4",
        question: "True or False: SQL keywords such as SELECT and FROM are strictly case-sensitive in PostgreSQL and MySQL.",
        type: "true_false",
        options: ["True", "False"],
        answer: 1,
        explanation: "False! SQL keywords are case-insensitive. Writing `select`, `Select`, or `SELECT` executes identically."
      }
    ]
  },
  {
    id: "quiz-2",
    title: "Joins & Relationships",
    category: "Joins",
    questions: [
      {
        id: "q2-1",
        question: "What happens if a customer has zero orders when performing an INNER JOIN between `customers` and `orders`?",
        type: "mcq",
        options: [
          "The customer is included with order columns filled with NULL.",
          "The customer is completely excluded from the result set.",
          "The database throws a foreign key violation error.",
          "The customer is placed at the very end of the result set."
        ],
        answer: 1,
        explanation: "INNER JOIN requires matches on both sides of the condition. If a customer has no orders, they are excluded. To include them with NULLs, use a LEFT JOIN."
      },
      {
        id: "q2-2",
        question: "Which join type returns ALL rows from Table A and ALL rows from Table B, filling missing matches with NULL?",
        type: "mcq",
        options: [
          "CROSS JOIN",
          "FULL OUTER JOIN",
          "SELF JOIN",
          "NATURAL JOIN"
        ],
        answer: 1,
        explanation: "FULL OUTER JOIN preserves all rows from both tables, filling with NULL wherever the join condition fails."
      },
      {
        id: "q2-3",
        question: "In a Many-to-Many relationship between `students` and `courses`, how should the database be structured?",
        type: "mcq",
        options: [
          "Put a comma-separated list of course IDs inside the student table.",
          "Create a separate Junction (Bridge) table containing both student_id and course_id as foreign keys.",
          "Put the student_id foreign key inside the courses table.",
          "Use a full outer join view."
        ],
        answer: 1,
        explanation: "A Junction table (associative entity) with foreign keys to both tables is the standard, normalized way to implement Many-to-Many relationships."
      }
    ]
  },
  {
    id: "quiz-3",
    title: "Aggregations & Grouping",
    category: "Aggregations",
    questions: [
      {
        id: "q3-1",
        question: "Why does the following query fail with an error?\n\nSELECT department_id, AVG(salary)\nFROM employees\nWHERE AVG(salary) > 50000\nGROUP BY department_id;",
        type: "mcq",
        options: [
          "You cannot use AVG() with department_id.",
          "WHERE cannot evaluate aggregate functions; you must use HAVING instead.",
          "GROUP BY must come before WHERE.",
          "You cannot compute averages on salary."
        ],
        answer: 1,
        explanation: "The WHERE clause filters individual rows before grouping takes place. To filter based on aggregated metrics like AVG(salary), you must use the HAVING clause."
      },
      {
        id: "q3-2",
        question: "What is the difference between COUNT(*) and COUNT(column_name)?",
        type: "mcq",
        options: [
          "COUNT(*) counts only non-null values; COUNT(col) counts all rows.",
          "COUNT(*) counts all rows including rows with NULLs; COUNT(col) counts only non-null values in that column.",
          "They are 100% identical in every scenario.",
          "COUNT(*) only works on Primary Keys."
        ],
        answer: 1,
        explanation: "COUNT(*) counts total physical rows regardless of content. COUNT(col) ignores rows where that specific column contains NULL."
      }
    ]
  },
  {
    id: "quiz-4",
    title: "Window Functions & Advanced SQL",
    category: "Advanced SQL",
    questions: [
      {
        id: "q4-1",
        question: "If salaries are: 100k, 90k, 90k, 80k. What will DENSE_RANK() output for the 80k salary?",
        type: "mcq",
        options: [
          "Rank 3",
          "Rank 4",
          "Rank 2",
          "Rank 1"
        ],
        answer: 0,
        explanation: "DENSE_RANK assigns: 100k -> 1, 90k -> 2, 90k -> 2 (tie), and 80k -> 3 (no gaps). Regular RANK would have output 4."
      },
      {
        id: "q4-2",
        question: "Which window function allows you to read a value from the previous row without performing a self-join?",
        type: "mcq",
        options: [
          "LEAD()",
          "LAG()",
          "FIRST_VALUE()",
          "NTILE()"
        ],
        answer: 1,
        explanation: "LAG(column, offset) looks backward to previous rows, making month-over-month and day-over-day delta comparisons effortless."
      }
    ]
  }
];

