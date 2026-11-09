/**
 * MLForge Genuine Relational SQL Execution Engine
 * Provides an in-memory SQL execution environment, table relational storage,
 * expression evaluator, subquery handler, joins, grouping, window functions,
 * CTEs, and schema introspection.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sql = window.MLForge.sql || {};

MLForge.sql.engine = (function () {
  let dbTables = {};

  // Standard Initial Seed Data
  const INITIAL_SCHEMA = {
    departments: [
      { id: 1, department_name: 'Engineering', location: 'San Francisco', budget: 1200000 },
      { id: 2, department_name: 'Product', location: 'San Francisco', budget: 850000 },
      { id: 3, department_name: 'Sales', location: 'New York', budget: 950000 },
      { id: 4, department_name: 'Marketing', location: 'New York', budget: 600000 },
      { id: 5, department_name: 'Human Resources', location: 'Chicago', budget: 400000 }
    ],

    employees: [
      { id: 1, first_name: 'Alice', last_name: 'Smith', email: 'alice.smith@mlforge.io', department_id: 1, job_title: 'VP of Engineering', hire_date: '2019-03-15', salary: 165000, manager_id: null },
      { id: 2, first_name: 'Bob', last_name: 'Johnson', email: 'bob.johnson@mlforge.io', department_id: 1, job_title: 'Senior Staff Engineer', hire_date: '2020-01-10', salary: 142000, manager_id: 1 },
      { id: 3, first_name: 'Charlie', last_name: 'Brown', email: 'charlie.brown@mlforge.io', department_id: 1, job_title: 'Software Engineer II', hire_date: '2021-06-20', salary: 105000, manager_id: 2 },
      { id: 4, first_name: 'Diana', last_name: 'Prince', email: 'diana.prince@mlforge.io', department_id: 1, job_title: 'Junior Software Engineer', hire_date: '2022-09-01', salary: 82000, manager_id: 2 },
      { id: 5, first_name: 'Ethan', last_name: 'Hunt', email: 'ethan.hunt@mlforge.io', department_id: 2, job_title: 'Lead Product Manager', hire_date: '2019-11-05', salary: 135000, manager_id: null },
      { id: 6, first_name: 'Fiona', last_name: 'Gallagher', email: 'fiona.gallagher@mlforge.io', department_id: 2, job_title: 'Product Designer', hire_date: '2021-04-12', salary: 98000, manager_id: 5 },
      { id: 7, first_name: 'George', last_name: 'Clark', email: 'george.clark@mlforge.io', department_id: 3, job_title: 'Director of Sales', hire_date: '2018-08-14', salary: 150000, manager_id: null },
      { id: 8, first_name: 'Hannah', last_name: 'Abbott', email: 'hannah.abbott@mlforge.io', department_id: 3, job_title: 'Account Executive', hire_date: '2021-02-18', salary: 88000, manager_id: 7 },
      { id: 9, first_name: 'Ian', last_name: 'Malcolm', email: 'ian.malcolm@mlforge.io', department_id: 3, job_title: 'Sales Representative', hire_date: '2022-05-10', salary: 74000, manager_id: 7 },
      { id: 10, first_name: 'Julia', last_name: 'Roberts', email: 'julia.roberts@mlforge.io', department_id: 4, job_title: 'Marketing Director', hire_date: '2020-03-22', salary: 125000, manager_id: null },
      { id: 11, first_name: 'Kevin', last_name: 'Bacon', email: 'kevin.bacon@mlforge.io', department_id: 4, job_title: 'Growth Specialist', hire_date: '2022-08-15', salary: 89000, manager_id: 10 },
      { id: 12, first_name: 'Laura', last_name: 'Croft', email: 'laura.croft@mlforge.io', department_id: 5, job_title: 'HR Generalist', hire_date: '2021-10-01', salary: 76000, manager_id: null }
    ],

    salaries: [
      { id: 1, employee_id: 1, salary_amount: 145000, from_date: '2019-03-15', to_date: '2021-03-14' },
      { id: 2, employee_id: 1, salary_amount: 165000, from_date: '2021-03-15', to_date: '9999-01-01' },
      { id: 3, employee_id: 2, salary_amount: 125000, from_date: '2020-01-10', to_date: '2022-01-09' },
      { id: 4, employee_id: 2, salary_amount: 142000, from_date: '2022-01-10', to_date: '9999-01-01' },
      { id: 5, employee_id: 3, salary_amount: 95000, from_date: '2021-06-20', to_date: '2023-06-19' },
      { id: 6, employee_id: 3, salary_amount: 105000, from_date: '2023-06-20', to_date: '9999-01-01' },
      { id: 7, employee_id: 4, salary_amount: 82000, from_date: '2022-09-01', to_date: '9999-01-01' },
      { id: 8, employee_id: 5, salary_amount: 135000, from_date: '2019-11-05', to_date: '9999-01-01' }
    ],

    customers: [
      { id: 1, first_name: 'Liam', last_name: 'Neeson', email: 'liam@example.com', city: 'Seattle', country: 'USA', created_at: '2023-01-15' },
      { id: 2, first_name: 'Emma', last_name: 'Watson', email: 'emma@example.com', city: 'London', country: 'UK', created_at: '2023-02-20' },
      { id: 3, first_name: 'Noah', last_name: 'Centineo', email: 'noah@example.com', city: 'Austin', country: 'USA', created_at: '2023-03-05' },
      { id: 4, first_name: 'Olivia', last_name: 'Rodrigo', email: 'olivia@example.com', city: 'Los Angeles', country: 'USA', created_at: '2023-04-12' },
      { id: 5, first_name: 'Lucas', last_name: 'Moura', email: 'lucas@example.com', city: 'Sao Paulo', country: 'Brazil', created_at: '2023-05-18' },
      { id: 6, first_name: 'Sophia', last_name: 'Loren', email: 'sophia@example.com', city: 'Rome', country: 'Italy', created_at: '2023-06-25' },
      { id: 7, first_name: 'Mason', last_name: 'Mount', email: 'mason@example.com', city: 'Manchester', country: 'UK', created_at: '2023-07-30' },
      { id: 8, first_name: 'Isabella', last_name: 'Swan', email: 'bella@example.com', city: 'Forks', country: 'USA', created_at: '2023-08-04' },
      { id: 9, first_name: 'Ethan', last_name: 'Hawke', email: 'ethan.h@example.com', city: 'New York', country: 'USA', created_at: '2023-09-11' },
      { id: 10, first_name: 'Mia', last_name: 'Goth', email: 'mia@example.com', city: 'Toronto', country: 'Canada', created_at: '2023-10-02' }
    ],

    products: [
      { id: 1, product_name: 'Mechanical Keyboard RGB', category: 'Hardware', price: 129.99, stock_quantity: 45 },
      { id: 2, product_name: 'UltraWide Curved Monitor 34-inch', category: 'Hardware', price: 499.50, stock_quantity: 18 },
      { id: 3, product_name: 'Wireless Ergonomic Mouse', category: 'Hardware', price: 79.99, stock_quantity: 60 },
      { id: 4, product_name: 'Noise-Cancelling Headphones', category: 'Audio', price: 249.00, stock_quantity: 32 },
      { id: 5, product_name: 'USB-C Docking Station 12-in-1', category: 'Accessories', price: 89.95, stock_quantity: 80 },
      { id: 6, product_name: 'Studio Condenser Microphone', category: 'Audio', price: 149.00, stock_quantity: 25 },
      { id: 7, product_name: 'Aluminium Laptop Stand', category: 'Accessories', price: 39.99, stock_quantity: 110 },
      { id: 8, product_name: '4K Pro Webcam with HDR', category: 'Video', price: 189.99, stock_quantity: 40 },
      { id: 9, product_name: 'Desk Mat XL Leatherette', category: 'Accessories', price: 29.50, stock_quantity: 95 },
      { id: 10, product_name: 'Smart Desk Ambient Light Strip', category: 'Lighting', price: 45.00, stock_quantity: 70 }
    ],

    orders: [
      { id: 101, customer_id: 1, order_date: '2023-11-01', total_amount: 629.49, status: 'Completed' },
      { id: 102, customer_id: 2, order_date: '2023-11-03', total_amount: 129.99, status: 'Completed' },
      { id: 103, customer_id: 1, order_date: '2023-11-05', total_amount: 79.99, status: 'Completed' },
      { id: 104, customer_id: 3, order_date: '2023-11-08', total_amount: 579.49, status: 'Shipped' },
      { id: 105, customer_id: 4, order_date: '2023-11-10', total_amount: 249.00, status: 'Processing' },
      { id: 106, customer_id: 5, order_date: '2023-11-12', total_amount: 39.99, status: 'Cancelled' },
      { id: 107, customer_id: 2, order_date: '2023-11-15', total_amount: 269.94, status: 'Completed' },
      { id: 108, customer_id: 6, order_date: '2023-11-18', total_amount: 499.50, status: 'Shipped' },
      { id: 109, customer_id: 7, order_date: '2023-11-20', total_amount: 89.95, status: 'Completed' },
      { id: 110, customer_id: 8, order_date: '2023-11-22', total_amount: 149.00, status: 'Pending' }
    ],

    order_items: [
      { id: 1, order_id: 101, product_id: 1, quantity: 1, unit_price: 129.99 },
      { id: 2, order_id: 101, product_id: 2, quantity: 1, unit_price: 499.50 },
      { id: 3, order_id: 102, product_id: 1, quantity: 1, unit_price: 129.99 },
      { id: 4, order_id: 103, product_id: 3, quantity: 1, unit_price: 79.99 },
      { id: 5, order_id: 104, product_id: 2, quantity: 1, unit_price: 499.50 },
      { id: 6, order_id: 104, product_id: 3, quantity: 1, unit_price: 79.99 },
      { id: 7, order_id: 105, product_id: 4, quantity: 1, unit_price: 249.00 },
      { id: 8, order_id: 106, product_id: 7, quantity: 1, unit_price: 39.99 },
      { id: 9, order_id: 107, product_id: 5, quantity: 2, unit_price: 89.95 },
      { id: 10, order_id: 107, product_id: 7, quantity: 1, unit_price: 39.99 },
      { id: 11, order_id: 107, product_id: 9, quantity: 1, unit_price: 29.50 },
      { id: 12, order_id: 108, product_id: 2, quantity: 1, unit_price: 499.50 },
      { id: 13, order_id: 109, product_id: 5, quantity: 1, unit_price: 89.95 },
      { id: 14, order_id: 110, product_id: 6, quantity: 1, unit_price: 149.00 }
    ],

    students: [
      { id: 1, first_name: 'David', last_name: 'Miller', major: 'Computer Science', gpa: 3.85, enrollment_year: 2021 },
      { id: 2, first_name: 'Emily', last_name: 'Davis', major: 'Data Science', gpa: 3.92, enrollment_year: 2021 },
      { id: 3, first_name: 'James', last_name: 'Wilson', major: 'Electrical Engineering', gpa: 3.45, enrollment_year: 2022 },
      { id: 4, first_name: 'Grace', last_name: 'Taylor', major: 'Computer Science', gpa: 3.78, enrollment_year: 2022 },
      { id: 5, first_name: 'Daniel', last_name: 'Anderson', major: 'Mathematics', gpa: 3.65, enrollment_year: 2020 },
      { id: 6, first_name: 'Chloe', last_name: 'Thomas', major: 'Data Science', gpa: 3.88, enrollment_year: 2023 },
      { id: 7, first_name: 'Alexander', last_name: 'White', major: 'Computer Science', gpa: 3.20, enrollment_year: 2023 },
      { id: 8, first_name: 'Ava', last_name: 'Harris', major: 'Information Systems', gpa: 3.50, enrollment_year: 2022 }
    ],

    courses: [
      { id: 1, course_code: 'CS101', course_name: 'Introduction to Computer Science', credits: 4, department_id: 1 },
      { id: 2, course_code: 'CS201', course_name: 'Data Structures and Algorithms', credits: 4, department_id: 1 },
      { id: 3, course_code: 'DS301', course_name: 'Relational Databases and SQL', credits: 3, department_id: 2 },
      { id: 4, course_code: 'DS401', course_name: 'Machine Learning Fundamentals', credits: 4, department_id: 2 },
      { id: 5, course_code: 'MATH205', course_name: 'Linear Algebra and Probability', credits: 3, department_id: 1 }
    ],

    enrollments: [
      { id: 1, student_id: 1, course_id: 1, grade: 'A', semester: 'Fall 2021' },
      { id: 2, student_id: 1, course_id: 2, grade: 'A-', semester: 'Spring 2022' },
      { id: 3, student_id: 1, course_id: 3, grade: 'A', semester: 'Fall 2022' },
      { id: 4, student_id: 2, course_id: 1, grade: 'A', semester: 'Fall 2021' },
      { id: 5, student_id: 2, course_id: 3, grade: 'A', semester: 'Fall 2022' },
      { id: 6, student_id: 2, course_id: 4, grade: 'A', semester: 'Spring 2023' },
      { id: 7, student_id: 3, course_id: 1, grade: 'B+', semester: 'Fall 2022' },
      { id: 8, student_id: 3, course_id: 5, grade: 'B', semester: 'Spring 2023' },
      { id: 9, student_id: 4, course_id: 1, grade: 'A', semester: 'Fall 2022' },
      { id: 10, student_id: 4, course_id: 2, grade: 'A', semester: 'Spring 2023' },
      { id: 11, student_id: 5, course_id: 5, grade: 'A+', semester: 'Spring 2021' },
      { id: 12, student_id: 6, course_id: 1, grade: 'A-', semester: 'Fall 2023' },
      { id: 13, student_id: 7, course_id: 1, grade: 'B-', semester: 'Fall 2023' },
      { id: 14, student_id: 8, course_id: 3, grade: 'B+', semester: 'Fall 2022' }
    ]
  };

  function resetDatabase() {
    dbTables = JSON.parse(JSON.stringify(INITIAL_SCHEMA));
    return { success: true, tableCount: Object.keys(dbTables).length };
  }

  // Initialize once
  resetDatabase();

  function getTablesList() {
    return Object.keys(dbTables).map(tableName => {
      const rows = dbTables[tableName];
      const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
      return {
        name: tableName,
        rowCount: rows.length,
        columns: columns
      };
    });
  }

  function getTableSchema(tableName) {
    const table = dbTables[tableName];
    if (!table) return null;
    if (table.length === 0) return { name: tableName, columns: [] };
    const sample = table[0];
    const cols = Object.keys(sample).map(key => {
      const val = sample[key];
      let type = 'VARCHAR(255)';
      if (typeof val === 'number') {
        type = Number.isInteger(val) ? 'INT' : 'DECIMAL(10,2)';
      } else if (typeof val === 'boolean') {
        type = 'BOOLEAN';
      } else if (key.endsWith('_date') || key.endsWith('_at')) {
        type = 'DATE';
      }
      return {
        name: key,
        type: type,
        isPrimary: key === 'id',
        isNullable: val === null || key.endsWith('_id') && key !== 'id'
      };
    });
    return { name: tableName, columns: cols, rowCount: table.length };
  }

  // Helper: Evaluates a condition against a merged row object
  function evaluateCondition(condStr, row, ctes = {}) {
    let clean = condStr.trim();
    if (!clean) return true;

    // Handle subqueries inside WHERE: e.g. col > (SELECT AVG(salary) FROM employees)
    const subqueryMatch = clean.match(/(.*?)(=|!=|<>|>|<|>=|<=|\bIN\b|\bNOT IN\b)\s*\(\s*(SELECT\b)/i);
    if (subqueryMatch) {
      const leftExpr = subqueryMatch[1].trim();
      const op = subqueryMatch[2].toUpperCase().trim();
      const startParenIdx = clean.indexOf('(', subqueryMatch[1].length);
      let depth = 1;
      let endParenIdx = -1;
      for (let i = startParenIdx + 1; i < clean.length; i++) {
        if (clean[i] === '(') depth++;
        else if (clean[i] === ')') {
          depth--;
          if (depth === 0) {
            endParenIdx = i;
            break;
          }
        }
      }
      if (endParenIdx !== -1) {
        const subSql = clean.substring(startParenIdx + 1, endParenIdx).trim();
        try {
          const subResult = executeQuerySync(subSql, ctes);
          if (subResult.error) return false;
          const leftVal = evalExpression(leftExpr, row);

          if (op === 'IN' || op === 'NOT IN') {
            const list = subResult.rows.map(r => r[subResult.columns[0]]);
            const inList = list.some(item => String(item).toLowerCase() === String(leftVal).toLowerCase());
            return op === 'IN' ? inList : !inList;
          } else {
            const rightVal = subResult.rows.length > 0 ? subResult.rows[0][subResult.columns[0]] : null;
            return compareValues(leftVal, op, rightVal);
          }
        } catch (e) {
          return false;
        }
      }
    }

    // Handle EXISTS (SELECT ...)
    const existsMatch = clean.match(/^\s*(NOT\s+)?EXISTS\s*\(\s*(SELECT\b)/i);
    if (existsMatch) {
      const isNot = !!existsMatch[1];
      const startParenIdx = clean.indexOf('(');
      let depth = 1;
      let endParenIdx = -1;
      for (let i = startParenIdx + 1; i < clean.length; i++) {
        if (clean[i] === '(') depth++;
        else if (clean[i] === ')') {
          depth--;
          if (depth === 0) {
            endParenIdx = i;
            break;
          }
        }
      }
      if (endParenIdx !== -1) {
        const subSql = clean.substring(startParenIdx + 1, endParenIdx).trim();
        try {
          let correlatedSql = subSql;
          Object.keys(row).forEach(k => {
            const val = row[k];
            const regex = new RegExp(`\\b${k}\\b`, 'gi');
            const replacement = typeof val === 'string' ? `'${val}'` : (val === null ? 'NULL' : val);
            correlatedSql = correlatedSql.replace(regex, replacement);
          });
          const subRes = executeQuerySync(correlatedSql, ctes);
          const hasRows = subRes.rows && subRes.rows.length > 0;
          return isNot ? !hasRows : hasRows;
        } catch (e) {
          return false;
        }
      }
    }

    // Handle OR expressions
    if (/\s+OR\s+/i.test(clean)) {
      const parts = splitByTopLevelLogical(clean, 'OR');
      if (parts.length > 1) {
        return parts.some(p => evaluateCondition(p, row, ctes));
      }
    }

    // Handle AND expressions
    if (/\s+AND\s+/i.test(clean)) {
      const parts = splitByTopLevelLogical(clean, 'AND');
      if (parts.length > 1) {
        return parts.every(p => evaluateCondition(p, row, ctes));
      }
    }

    // Handle BETWEEN ... AND ...
    const betweenMatch = clean.match(/^([\w\.\(\)\s]+?)\s+(NOT\s+)?BETWEEN\s+([\w\.\'\-]+?)\s+AND\s+([\w\.\'\-]+)$/i);
    if (betweenMatch) {
      const val = evalExpression(betweenMatch[1].trim(), row);
      const isNot = !!betweenMatch[2];
      const low = parseLiteral(betweenMatch[3].trim());
      const high = parseLiteral(betweenMatch[4].trim());
      const inBetween = (val >= low && val <= high);
      return isNot ? !inBetween : inBetween;
    }

    // Handle IS NULL / IS NOT NULL
    const nullMatch = clean.match(/^([\w\.\(\)\s]+?)\s+IS\s+(NOT\s+)?NULL$/i);
    if (nullMatch) {
      const val = evalExpression(nullMatch[1].trim(), row);
      const isNot = !!nullMatch[2];
      const isNull = (val === null || val === undefined || val === '');
      return isNot ? !isNull : isNull;
    }

    // Handle IN (...) / NOT IN (...)
    const inMatch = clean.match(/^([\w\.\(\)\s]+?)\s+(NOT\s+)?IN\s*\(([\s\S]+?)\)$/i);
    if (inMatch) {
      const val = evalExpression(inMatch[1].trim(), row);
      const isNot = !!inMatch[2];
      const rawItems = inMatch[3].split(',').map(s => parseLiteral(s.trim()));
      const found = rawItems.some(item => item == val);
      return isNot ? !found : found;
    }

    // Handle LIKE / NOT LIKE
    const likeMatch = clean.match(/^([\w\.\(\)\s]+?)\s+(NOT\s+)?LIKE\s+['"]([\s\S]+?)['"]$/i);
    if (likeMatch) {
      const val = String(evalExpression(likeMatch[1].trim(), row) || '');
      const isNot = !!likeMatch[2];
      const pattern = likeMatch[3]
        .replace(/[.+^${}()|[\]\\]/g, '\\$&')
        .replace(/%/g, '.*')
        .replace(/_/g, '.');
      const regex = new RegExp(`^${pattern}$`, 'i');
      const matches = regex.test(val);
      return isNot ? !matches : matches;
    }

    // Handle standard binary operators: =, !=, <>, >=, <=, >, <
    const opMatch = clean.match(/^([\w\.\(\)\s\*\+\-\/]+?)\s*(=|!=|<>|>=|<=|>|<)\s*([\s\S]+)$/);
    if (opMatch) {
      const leftVal = evalExpression(opMatch[1].trim(), row);
      const op = opMatch[2];
      const rightVal = parseLiteral(opMatch[3].trim(), row);
      return compareValues(leftVal, op, rightVal);
    }

    return true;
  }

  function compareValues(left, op, right) {
    if (left === null || right === null) {
      if (op === '=' || op === '!=') return false;
    }
    const numLeft = Number(left);
    const numRight = Number(right);
    const isNum = !isNaN(numLeft) && !isNaN(numRight) && typeof left !== 'boolean';

    const a = isNum ? numLeft : String(left).toLowerCase();
    const b = isNum ? numRight : String(right).toLowerCase();

    switch (op) {
      case '=': return a === b;
      case '!=':
      case '<>': return a !== b;
      case '>': return a > b;
      case '<': return a < b;
      case '>=': return a >= b;
      case '<=': return a <= b;
      default: return false;
    }
  }

  function splitByTopLevelLogical(str, keyword) {
    const tokens = [];
    let current = '';
    let depth = 0;
    const words = str.split(/\s+/);

    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      depth += (w.match(/\(/g) || []).length;
      depth -= (w.match(/\)/g) || []).length;

      if (depth === 0 && w.toUpperCase() === keyword.toUpperCase()) {
        tokens.push(current.trim());
        current = '';
      } else {
        current += (current ? ' ' : '') + w;
      }
    }
    if (current.trim()) tokens.push(current.trim());
    return tokens;
  }

  function parseLiteral(str, row = null) {
    if (!str) return null;
    str = str.trim();
    if ((str.startsWith("'") && str.endsWith("'")) || (str.startsWith('"') && str.endsWith('"'))) {
      return str.slice(1, -1);
    }
    if (str.toUpperCase() === 'NULL') return null;
    if (str.toUpperCase() === 'TRUE') return true;
    if (str.toUpperCase() === 'FALSE') return false;
    if (!isNaN(Number(str))) return Number(str);
    if (row && (row[str] !== undefined || row[str.toLowerCase()] !== undefined)) {
      return evalExpression(str, row);
    }
    return str;
  }

  // Expression Evaluator: supports column references, table.column, arithmetic, and standard SQL functions
  function evalExpression(expr, row) {
    if (!expr) return null;
    let s = expr.trim();

    // Check direct match in row (e.g. "salary" or "e.salary")
    if (row[s] !== undefined) return row[s];
    if (row[s.toLowerCase()] !== undefined) return row[s.toLowerCase()];

    // Strip table prefix: e.g. "e.salary" -> "salary"
    if (s.includes('.')) {
      const colOnly = s.split('.').pop();
      if (row[colOnly] !== undefined) return row[colOnly];
    }

    // Literals
    if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
      return s.slice(1, -1);
    }
    if (!isNaN(Number(s))) return Number(s);
    if (s.toUpperCase() === 'NULL') return null;
    if (s.toUpperCase() === 'CURRENT_DATE') return new Date().toISOString().split('T')[0];
    if (s.toUpperCase() === 'CURRENT_TIME') return new Date().toTimeString().split(' ')[0];
    if (s.toUpperCase() === 'CURRENT_TIMESTAMP' || s.toUpperCase() === 'NOW()') return new Date().toISOString().replace('T', ' ').substring(0, 19);

    // Scalar subquery: (SELECT ...)
    if (s.startsWith('(') && s.endsWith(')')) {
      const inner = s.slice(1, -1).trim();
      if (/^SELECT\b/i.test(inner)) {
        const subRes = executeQuerySync(inner);
        if (subRes.rows && subRes.rows.length > 0) {
          return subRes.rows[0][subRes.columns[0]];
        }
        return null;
      }
    }

    // CASE WHEN ... THEN ... ELSE ... END
    const caseMatch = s.match(/CASE\s+([\s\S]+?)\s+END/i);
    if (caseMatch) {
      return evalCaseStatement(caseMatch[1], row);
    }

    // SQL String Functions
    // UPPER(col)
    const upperM = s.match(/^UPPER\(([\s\S]+)\)$/i);
    if (upperM) return String(evalExpression(upperM[1], row) || '').toUpperCase();

    // LOWER(col)
    const lowerM = s.match(/^LOWER\(([\s\S]+)\)$/i);
    if (lowerM) return String(evalExpression(lowerM[1], row) || '').toLowerCase();

    // LENGTH(col) / CHAR_LENGTH(col)
    const lenM = s.match(/^(?:LENGTH|CHAR_LENGTH)\(([\s\S]+)\)$/i);
    if (lenM) return String(evalExpression(lenM[1], row) || '').length;

    // CONCAT(a, b, ...)
    const concatM = s.match(/^CONCAT\(([\s\S]+)\)$/i);
    if (concatM) {
      const args = splitArguments(concatM[1]);
      return args.map(a => String(evalExpression(a, row) || '')).join('');
    }

    // CONCAT_WS(sep, a, b, ...)
    const concatWsM = s.match(/^CONCAT_WS\(([\s\S]+)\)$/i);
    if (concatWsM) {
      const args = splitArguments(concatWsM[1]);
      const sep = String(evalExpression(args[0], row) || '');
      return args.slice(1).map(a => evalExpression(a, row)).filter(v => v !== null).join(sep);
    }

    // SUBSTRING(col, start, len) or SUBSTR(col, start, len)
    const subStrM = s.match(/^(?:SUBSTRING|SUBSTR)\(([\s\S]+)\)$/i);
    if (subStrM) {
      const args = splitArguments(subStrM[1]);
      const val = String(evalExpression(args[0], row) || '');
      const start = Math.max(1, parseInt(evalExpression(args[1], row), 10) || 1) - 1;
      const len = args[2] ? parseInt(evalExpression(args[2], row), 10) : undefined;
      return len !== undefined ? val.substr(start, len) : val.substr(start);
    }

    // ROUND(num, dec)
    const roundM = s.match(/^ROUND\(([\s\S]+)\)$/i);
    if (roundM) {
      const args = splitArguments(roundM[1]);
      const val = Number(evalExpression(args[0], row));
      const dec = args[1] ? Number(evalExpression(args[1], row)) : 0;
      return isNaN(val) ? null : Number(val.toFixed(dec));
    }

    // COALESCE(a, b, c, ...)
    const coalesceM = s.match(/^COALESCE\(([\s\S]+)\)$/i);
    if (coalesceM) {
      const args = splitArguments(coalesceM[1]);
      for (const a of args) {
        const val = evalExpression(a, row);
        if (val !== null && val !== undefined && val !== '') return val;
      }
      return null;
    }

    // NULLIF(a, b)
    const nullifM = s.match(/^NULLIF\(([\s\S]+)\)$/i);
    if (nullifM) {
      const args = splitArguments(nullifM[1]);
      const a = evalExpression(args[0], row);
      const b = evalExpression(args[1], row);
      return a === b ? null : a;
    }

    // Arithmetic expressions: col * 1.1, salary - (SELECT ...), price * quantity
    const topArithMatch = s.match(/^([\s\S]+?)\s*([\+\-\*\/])\s*([\s\S]+)$/);
    if (topArithMatch) {
      const prefix = topArithMatch[1];
      const openCount = (prefix.match(/\(/g) || []).length;
      const closeCount = (prefix.match(/\)/g) || []).length;
      if (openCount === closeCount) {
        const left = Number(evalExpression(topArithMatch[1].trim(), row));
        const op = topArithMatch[2];
        const right = Number(evalExpression(topArithMatch[3].trim(), row));
        if (!isNaN(left) && !isNaN(right)) {
          switch (op) {
            case '+': return left + right;
            case '-': return left - right;
            case '*': return Math.round(left * right * 100) / 100;
            case '/': return right !== 0 ? Math.round((left / right) * 100) / 100 : null;
          }
        }
      }
    }

    return null;
  }

  function splitArguments(str) {
    const list = [];
    let current = '';
    let depth = 0;
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      else if (ch === ',' && depth === 0) {
        list.push(current.trim());
        current = '';
        continue;
      }
      current += ch;
    }
    if (current.trim()) list.push(current.trim());
    return list;
  }

  function evalCaseStatement(caseBody, row) {
    // Splits WHEN ... THEN ... ELSE ...
    const whenRegex = /WHEN\s+([\s\S]+?)\s+THEN\s+([\s\S]+?)(?=\s+WHEN|\s+ELSE|\s*$)/gi;
    let match;
    while ((match = whenRegex.exec(caseBody)) !== null) {
      const cond = match[1].trim();
      const res = match[2].trim();
      if (evaluateCondition(cond, row)) {
        return parseLiteral(res, row);
      }
    }
    const elseMatch = caseBody.match(/ELSE\s+([\s\S]+?)$/i);
    if (elseMatch) {
      return parseLiteral(elseMatch[1].trim(), row);
    }
    return null;
  }

  // Synchronous execution handler
  function executeQuerySync(sql, ctes = {}) {
    const startTime = performance.now();
    let query = sql.trim().replace(/;+$/, '').trim();

    if (!query) {
      return { error: 'Empty SQL query provided.', executionTime: 0, rows: [], columns: [] };
    }

    // 1. Handle CTEs: WITH cte_name AS (...)
    if (/^WITH\s+/i.test(query)) {
      const withMatch = query.match(/^WITH\s+([\w\d_]+)\s+AS\s*\(/i);
      if (withMatch) {
        const cteName = withMatch[1].toLowerCase();
        const startParenIdx = query.indexOf('(', withMatch[0].length - 1);
        let depth = 1;
        let endParenIdx = -1;
        for (let i = startParenIdx + 1; i < query.length; i++) {
          if (query[i] === '(') depth++;
          else if (query[i] === ')') {
            depth--;
            if (depth === 0) {
              endParenIdx = i;
              break;
            }
          }
        }
        if (endParenIdx !== -1) {
          const cteQuery = query.substring(startParenIdx + 1, endParenIdx).trim();
          const mainQuery = query.substring(endParenIdx + 1).trim();
          const cteResult = executeQuerySync(cteQuery, ctes);
          if (cteResult.error) return cteResult;
          ctes[cteName] = cteResult.rows;
          return executeQuerySync(mainQuery, ctes);
        }
      }
    }

    // 2. Handle Set Operations: UNION, UNION ALL, INTERSECT, EXCEPT
    const setOpRegex = /\s+(UNION\s+ALL|UNION|INTERSECT|EXCEPT)\s+(?=SELECT)/i;
    const setOpMatch = query.match(setOpRegex);
    if (setOpMatch) {
      const op = setOpMatch[1].toUpperCase().replace(/\s+/, ' ');
      const idx = query.indexOf(setOpMatch[0]);
      const leftSql = query.substring(0, idx).trim();
      const rightSql = query.substring(idx + setOpMatch[0].length).trim();

      const leftRes = executeQuerySync(leftSql, ctes);
      const rightRes = executeQuerySync(rightSql, ctes);
      if (leftRes.error) return leftRes;
      if (rightRes.error) return rightRes;

      let combinedRows = [];
      if (op === 'UNION ALL') {
        combinedRows = [...leftRes.rows, ...rightRes.rows];
      } else if (op === 'UNION') {
        const seen = new Set();
        [...leftRes.rows, ...rightRes.rows].forEach(r => {
          const key = JSON.stringify(r);
          if (!seen.has(key)) {
            seen.add(key);
            combinedRows.push(r);
          }
        });
      } else if (op === 'INTERSECT') {
        const rightSet = new Set(rightRes.rows.map(r => JSON.stringify(r)));
        combinedRows = leftRes.rows.filter(r => rightSet.has(JSON.stringify(r)));
      } else if (op === 'EXCEPT') {
        const rightSet = new Set(rightRes.rows.map(r => JSON.stringify(r)));
        combinedRows = leftRes.rows.filter(r => !rightSet.has(JSON.stringify(r)));
      }

      const elapsed = Math.round((performance.now() - startTime) * 10) / 10;
      return {
        columns: leftRes.columns,
        rows: combinedRows,
        rowCount: combinedRows.length,
        executionTime: Math.max(0.2, elapsed)
      };
    }

    // 3. Handle EXPLAIN / EXPLAIN ANALYZE
    if (/^EXPLAIN\b/i.test(query)) {
      const isAnalyze = /^EXPLAIN\s+ANALYZE\b/i.test(query);
      const targetQuery = query.replace(/^EXPLAIN(\s+ANALYZE)?\s+/i, '');
      const plan = generateExplainPlan(targetQuery, isAnalyze);
      const elapsed = Math.round((performance.now() - startTime) * 10) / 10;
      return {
        columns: ['QUERY PLAN', 'EST. COST', 'EST. ROWS', 'ACTUAL TIME (ms)'],
        rows: plan,
        rowCount: plan.length,
        executionTime: Math.max(0.3, elapsed)
      };
    }

    // 4. Handle DDL / DML
    // INSERT INTO table (cols) VALUES (...)
    if (/^INSERT\s+INTO\s+/i.test(query)) {
      return handleInsert(query, startTime);
    }
    // UPDATE table SET ... WHERE ...
    if (/^UPDATE\s+/i.test(query)) {
      return handleUpdate(query, startTime);
    }
    // DELETE FROM table WHERE ...
    if (/^DELETE\s+FROM\s+/i.test(query)) {
      return handleDelete(query, startTime);
    }
    // CREATE TABLE ...
    if (/^CREATE\s+TABLE\s+/i.test(query)) {
      return handleCreateTable(query, startTime);
    }
    // DROP TABLE ...
    if (/^DROP\s+TABLE\s+/i.test(query)) {
      return handleDropTable(query, startTime);
    }

    // 5. Handle SELECT queries
    if (/^SELECT\b/i.test(query)) {
      return handleSelect(query, startTime, ctes);
    }

    return {
      error: `Unsupported or invalid SQL statement: "${query.substring(0, 40)}..."`,
      executionTime: 0,
      rows: [],
      columns: []
    };
  }

  function findTopLevelKeyword(sql, keyword) {
    const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
    let match;
    while ((match = regex.exec(sql)) !== null) {
      const prefix = sql.substring(0, match.index);
      let openCount = 0;
      let inQuote = false;
      let quoteChar = '';
      for (let i = 0; i < prefix.length; i++) {
        const ch = prefix[i];
        if ((ch === "'" || ch === '"') && (i === 0 || prefix[i-1] !== '\\')) {
          if (!inQuote) { inQuote = true; quoteChar = ch; }
          else if (quoteChar === ch) { inQuote = false; }
        } else if (!inQuote) {
          if (ch === '(') openCount++;
          else if (ch === ')') openCount--;
        }
      }
      if (openCount === 0 && !inQuote) {
        return { index: match.index, length: match[0].length };
      }
    }
    return null;
  }

  function handleSelect(query, startTime, ctes) {
    try {
      // Parse main clauses using regex
      let isDistinct = false;
      let workingQuery = query.replace(/^SELECT\s+/i, '');
      if (/^DISTINCT\s+/i.test(workingQuery)) {
        isDistinct = true;
        workingQuery = workingQuery.replace(/^DISTINCT\s+/i, '');
      }

      // Check for top-level FROM clause
      let selectColsStr = workingQuery;
      let fromStr = '';
      const fromPos = findTopLevelKeyword(workingQuery, 'FROM');
      if (fromPos) {
        selectColsStr = workingQuery.substring(0, fromPos.index).trim();
        fromStr = workingQuery.substring(fromPos.index + fromPos.length).trim();
      }

      // If no FROM (e.g. SELECT 1 + 1, SELECT UPPER('hello'))
      if (!fromStr) {
        const dummyRow = {};
        const colDefs = parseSelectColumnList(selectColsStr);
        const resultRow = {};
        colDefs.forEach(col => {
          resultRow[col.alias] = evalExpression(col.expr, dummyRow);
        });
        const elapsed = Math.round((performance.now() - startTime) * 10) / 10;
        return {
          columns: colDefs.map(c => c.alias),
          rows: [resultRow],
          rowCount: 1,
          executionTime: Math.max(0.1, elapsed)
        };
      }

      // Extract top-level LIMIT and OFFSET
      let limit = null;
      let offset = 0;
      const limitPos = findTopLevelKeyword(fromStr, 'LIMIT');
      if (limitPos) {
        const limitPart = fromStr.substring(limitPos.index + limitPos.length).trim();
        const m = limitPart.match(/^(\d+)(?:\s+OFFSET\s+(\d+))?/i);
        if (m) {
          limit = parseInt(m[1], 10);
          if (m[2]) offset = parseInt(m[2], 10);
        }
        fromStr = fromStr.substring(0, limitPos.index).trim();
      }

      // Extract top-level ORDER BY
      let orderByStr = '';
      const orderPos = findTopLevelKeyword(fromStr, 'ORDER\\s+BY');
      if (orderPos) {
        orderByStr = fromStr.substring(orderPos.index + orderPos.length).trim();
        fromStr = fromStr.substring(0, orderPos.index).trim();
      }

      // Extract top-level HAVING
      let havingStr = '';
      const havingPos = findTopLevelKeyword(fromStr, 'HAVING');
      if (havingPos) {
        havingStr = fromStr.substring(havingPos.index + havingPos.length).trim();
        fromStr = fromStr.substring(0, havingPos.index).trim();
      }

      // Extract top-level GROUP BY
      let groupByStr = '';
      const groupPos = findTopLevelKeyword(fromStr, 'GROUP\\s+BY');
      if (groupPos) {
        groupByStr = fromStr.substring(groupPos.index + groupPos.length).trim();
        fromStr = fromStr.substring(0, groupPos.index).trim();
      }

      // Extract top-level WHERE
      let whereStr = '';
      const wherePos = findTopLevelKeyword(fromStr, 'WHERE');
      if (wherePos) {
        whereStr = fromStr.substring(wherePos.index + wherePos.length).trim();
        fromStr = fromStr.substring(0, wherePos.index).trim();
      }

      // Process FROM and JOINS to generate row set
      let sourceRows = processFromAndJoins(fromStr, ctes);

      // Apply WHERE filter
      if (whereStr) {
        sourceRows = sourceRows.filter(row => evaluateCondition(whereStr, row, ctes));
      }

      // Parse SELECT columns
      const colDefs = parseSelectColumnList(selectColsStr);

      // Check if aggregation is involved (COUNT, SUM, AVG, MIN, MAX or GROUP BY)
      const hasAgg = colDefs.some(c => isAggregateExpression(c.expr)) || !!groupByStr;

      let finalRows = [];

      if (hasAgg) {
        // Grouping & Aggregation
        const groups = {};
        sourceRows.forEach(row => {
          let groupKey = '__all__';
          if (groupByStr) {
            const groupCols = groupByStr.split(',').map(s => s.trim());
            groupKey = groupCols.map(c => String(evalExpression(c, row))).join('||');
          }
          if (!groups[groupKey]) groups[groupKey] = [];
          groups[groupKey].push(row);
        });

        // Compute aggregates per group
        Object.keys(groups).forEach(key => {
          const rowsInGroup = groups[key];
          const repRow = rowsInGroup[0] || {};
          const aggRow = {};

          colDefs.forEach(col => {
            if (isAggregateExpression(col.expr)) {
              const val = computeAggregate(col.expr, rowsInGroup);
              aggRow[col.alias] = val;
              aggRow[col.expr] = val;
              aggRow[col.expr.replace(/\s+/g, '')] = val;
            } else {
              aggRow[col.alias] = evalExpression(col.expr, repRow);
            }
          });

          // Check HAVING condition if present
          if (havingStr) {
            // If havingStr uses an aggregate not present in select, compute it
            const evalRow = Object.assign({}, repRow, aggRow);
            const havingAggMatches = havingStr.match(/\b(COUNT|SUM|AVG|MIN|MAX)\s*\([\s\S]*?\)/gi) || [];
            havingAggMatches.forEach(expr => {
              const cleaned = expr.trim();
              if (evalRow[cleaned] === undefined) {
                const val = computeAggregate(cleaned, rowsInGroup);
                evalRow[cleaned] = val;
                evalRow[cleaned.replace(/\s+/g, '')] = val;
              }
            });

            if (evaluateCondition(havingStr, evalRow, ctes)) {
              const projected = {};
              colDefs.forEach(col => { projected[col.alias] = aggRow[col.alias]; });
              finalRows.push(projected);
            }
          } else {
            const projected = {};
            colDefs.forEach(col => { projected[col.alias] = aggRow[col.alias]; });
            finalRows.push(projected);
          }
        });
      } else {
        // No aggregation: first compute Window Functions on sourceRows
        sourceRows = applyWindowFunctions(sourceRows, colDefs);

        // Then compute projected columns for each row
        finalRows = sourceRows.map(row => {
          const res = {};
          colDefs.forEach(col => {
            if (col.expr === '*') {
              Object.keys(row).forEach(k => {
                if (!k.includes('.')) res[k] = row[k];
              });
            } else if (row[col.alias] !== undefined) {
              res[col.alias] = row[col.alias];
            } else {
              res[col.alias] = evalExpression(col.expr, row);
            }
          });
          return res;
        });
      }

      // Apply DISTINCT
      if (isDistinct) {
        const uniqueSet = new Set();
        finalRows = finalRows.filter(r => {
          const key = JSON.stringify(r);
          if (uniqueSet.has(key)) return false;
          uniqueSet.add(key);
          return true;
        });
      }

      // Apply ORDER BY
      if (orderByStr) {
        finalRows = sortRows(finalRows, orderByStr);
      }

      // Apply LIMIT & OFFSET
      if (offset > 0) {
        finalRows = finalRows.slice(offset);
      }
      if (limit !== null && limit >= 0) {
        finalRows = finalRows.slice(0, limit);
      }

      // Determine output column names
      let outputCols = [];
      if (colDefs.length === 1 && colDefs[0].expr === '*') {
        outputCols = finalRows.length > 0 ? Object.keys(finalRows[0]) : [];
      } else {
        outputCols = colDefs.map(c => c.alias);
      }

      const elapsed = Math.round((performance.now() - startTime) * 10) / 10;
      return {
        columns: outputCols,
        rows: finalRows,
        rowCount: finalRows.length,
        executionTime: Math.max(0.1, elapsed)
      };

    } catch (err) {
      console.error('SQL Execution Error:', err);
      return {
        error: `SQL Execution Error: ${err.message}`,
        executionTime: 0,
        rows: [],
        columns: []
      };
    }
  }

  function parseSelectColumnList(str) {
    const cols = [];
    const rawTokens = splitArguments(str);

    rawTokens.forEach(t => {
      let raw = t.trim();
      // Look for "expr AS alias" or "expr alias"
      const asMatch = raw.match(/^([\s\S]+?)\s+AS\s+([\w\d_]+)$/i);
      if (asMatch) {
        cols.push({ expr: asMatch[1].trim(), alias: asMatch[2].trim() });
      } else {
        // Clean column name or function name for default alias
        let alias = raw;
        if (alias.includes('.')) alias = alias.split('.').pop();
        alias = alias.replace(/[\(\)\,\'\"]/g, '_').replace(/_+$/, '');
        cols.push({ expr: raw, alias: alias || 'col' });
      }
    });

    return cols;
  }

  function isAggregateExpression(expr) {
    if (/\bOVER\s*\(/i.test(expr)) return false;
    return /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(expr);
  }

  function computeAggregate(expr, rows) {
    const countAllM = expr.match(/COUNT\s*\(\s*\*\s*\)/i);
    if (countAllM) return rows.length;

    const countDistM = expr.match(/COUNT\s*\(\s*DISTINCT\s+([\w\.\_]+)\s*\)/i);
    if (countDistM) {
      const col = countDistM[1].trim();
      const set = new Set();
      rows.forEach(r => {
        const val = evalExpression(col, r);
        if (val !== null && val !== undefined) set.add(val);
      });
      return set.size;
    }

    const countColM = expr.match(/COUNT\s*\(\s*([\w\.\_]+)\s*\)/i);
    if (countColM) {
      const col = countColM[1].trim();
      return rows.filter(r => {
        const v = evalExpression(col, r);
        return v !== null && v !== undefined;
      }).length;
    }

    const sumM = expr.match(/SUM\s*\(\s*([\w\.\_\*\+\-\/\s]+)\s*\)/i);
    if (sumM) {
      const col = sumM[1].trim();
      let total = 0;
      rows.forEach(r => {
        const v = Number(evalExpression(col, r));
        if (!isNaN(v)) total += v;
      });
      return Math.round(total * 100) / 100;
    }

    const avgM = expr.match(/AVG\s*\(\s*([\w\.\_\*\+\-\/\s]+)\s*\)/i);
    if (avgM) {
      const col = avgM[1].trim();
      let total = 0;
      let count = 0;
      rows.forEach(r => {
        const v = Number(evalExpression(col, r));
        if (!isNaN(v)) {
          total += v;
          count++;
        }
      });
      return count > 0 ? Math.round((total / count) * 100) / 100 : null;
    }

    const minM = expr.match(/MIN\s*\(\s*([\w\.\_]+)\s*\)/i);
    if (minM) {
      const col = minM[1].trim();
      let min = null;
      rows.forEach(r => {
        const v = evalExpression(col, r);
        if (v !== null && (min === null || v < min)) min = v;
      });
      return min;
    }

    const maxM = expr.match(/MAX\s*\(\s*([\w\.\_]+)\s*\)/i);
    if (maxM) {
      const col = maxM[1].trim();
      let max = null;
      rows.forEach(r => {
        const v = evalExpression(col, r);
        if (v !== null && (max === null || v > max)) max = v;
      });
      return max;
    }

    return null;
  }

  // Window Functions calculation
  function applyWindowFunctions(rows, colDefs) {
    colDefs.forEach(col => {
      // e.g. ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC)
      const winMatch = col.expr.match(/^(ROW_NUMBER|RANK|DENSE_RANK|LAG|LEAD|FIRST_VALUE|LAST_VALUE|SUM|AVG|COUNT)\s*\(([\s\S]*?)\)\s+OVER\s*\(([\s\S]*?)\)$/i);
      if (winMatch) {
        const funcName = winMatch[1].toUpperCase();
        const funcArg = winMatch[2].trim();
        const overClause = winMatch[3].trim();

        // Extract PARTITION BY
        let partitionCols = [];
        const partMatch = overClause.match(/PARTITION\s+BY\s+([\w\.\,\s]+?)(?=\s+ORDER|\s*$)/i);
        if (partMatch) {
          partitionCols = partMatch[1].split(',').map(s => s.trim());
        }

        // Extract ORDER BY
        let orderClause = '';
        const ordMatch = overClause.match(/ORDER\s+BY\s+([\s\S]+?)$/i);
        if (ordMatch) {
          orderClause = ordMatch[1].trim();
        }

        // Group rows by partition key
        const partitions = {};
        rows.forEach((r, idx) => {
          r.__orig_idx__ = idx;
          const partKey = partitionCols.length > 0 ? partitionCols.map(c => evalExpression(c, r)).join('||') : '__global__';
          if (!partitions[partKey]) partitions[partKey] = [];
          partitions[partKey].push(r);
        });

        // Compute window function within each partition
        Object.keys(partitions).forEach(pKey => {
          let pRows = partitions[pKey];
          if (orderClause) {
            pRows = sortRows(pRows, orderClause);
          }

          let rank = 1;
          let denseRank = 1;
          let runningSum = 0;
          let runningCount = 0;

          pRows.forEach((row, i) => {
            if (funcName === 'ROW_NUMBER') {
              row[col.alias] = i + 1;
            } else if (funcName === 'RANK' || funcName === 'DENSE_RANK') {
              if (i > 0) {
                const prev = pRows[i - 1];
                const sortCol = orderClause.split(/\s+/)[0];
                const valPrev = evalExpression(sortCol, prev);
                const valCurr = evalExpression(sortCol, row);
                if (valCurr !== valPrev) {
                  rank = i + 1;
                  denseRank++;
                }
              }
              row[col.alias] = funcName === 'RANK' ? rank : denseRank;
            } else if (funcName === 'LAG') {
              const argTokens = splitArguments(funcArg);
              const offset = argTokens[1] ? parseInt(argTokens[1], 10) : 1;
              const prev = pRows[i - offset];
              row[col.alias] = prev ? evalExpression(argTokens[0], prev) : null;
            } else if (funcName === 'LEAD') {
              const argTokens = splitArguments(funcArg);
              const offset = argTokens[1] ? parseInt(argTokens[1], 10) : 1;
              const next = pRows[i + offset];
              row[col.alias] = next ? evalExpression(argTokens[0], next) : null;
            } else if (funcName === 'SUM') {
              const v = Number(evalExpression(funcArg, row)) || 0;
              runningSum += v;
              row[col.alias] = Math.round(runningSum * 100) / 100;
            } else if (funcName === 'COUNT') {
              runningCount++;
              row[col.alias] = runningCount;
            }
          });
        });

        // Cleanup temporary index
        rows.forEach(r => delete r.__orig_idx__);
      }
    });

    return rows;
  }

  // Handle FROM table and JOIN operations
  function processFromAndJoins(fromClause, ctes) {
    // Check if FROM is a subquery: FROM (SELECT ...) AS alias
    const subqueryFromMatch = fromClause.match(/^\s*\(\s*(SELECT[\s\S]+?)\s*\)\s*(?:AS\s+)?([\w\d_]+)/i);
    if (subqueryFromMatch) {
      const subSql = subqueryFromMatch[1].trim();
      const alias = subqueryFromMatch[2].trim();
      const subRes = executeQuerySync(subSql, ctes);
      if (subRes.error) throw new Error(subRes.error);
      return subRes.rows.map(r => {
        const prefixed = {};
        Object.keys(r).forEach(k => {
          prefixed[k] = r[k];
          prefixed[`${alias}.${k}`] = r[k];
        });
        return prefixed;
      });
    }

    // Parse base table and sequence of joins
    const joinRegex = /\s+(INNER|LEFT|RIGHT|FULL\s+OUTER|CROSS|SELF)?\s*JOIN\s+/gi;
    const parts = fromClause.split(joinRegex);

    const baseTableToken = parts[0].trim();
    let currentRows = loadTableRows(baseTableToken, ctes);

    if (parts.length > 1) {
      for (let i = 1; i < parts.length; i += 2) {
        const joinType = (parts[i] || 'INNER').toUpperCase().trim();
        const joinTarget = parts[i + 1].trim();

        // Separate table token and ON condition
        const onMatch = joinTarget.match(/^([\s\S]+?)\s+ON\s+([\s\S]+)$/i);
        if (!onMatch) {
          // Cross join
          const rightRows = loadTableRows(joinTarget, ctes);
          const cross = [];
          currentRows.forEach(left => {
            rightRows.forEach(right => {
              cross.push(Object.assign({}, left, right));
            });
          });
          currentRows = cross;
          continue;
        }

        const rightTableToken = onMatch[1].trim();
        const onCondition = onMatch[2].trim();
        const rightRows = loadTableRows(rightTableToken, ctes);

        currentRows = performJoin(currentRows, rightRows, onCondition, joinType, ctes);
      }
    }

    return currentRows;
  }

  function loadTableRows(token, ctes) {
    // e.g. "employees e" or "employees AS e" or "departments"
    const m = token.match(/^([\w\d_]+)(?:\s+(?:AS\s+)?([\w\d_]+))?$/i);
    if (!m) return [];
    const tblName = m[1].toLowerCase();
    const alias = m[2] ? m[2] : null;

    let rows = [];
    if (ctes[tblName]) {
      rows = JSON.parse(JSON.stringify(ctes[tblName]));
    } else if (dbTables[tblName]) {
      rows = JSON.parse(JSON.stringify(dbTables[tblName]));
    } else {
      throw new Error(`Table or CTE "${tblName}" does not exist in the database.`);
    }

    return rows.map(r => {
      const mapped = {};
      Object.keys(r).forEach(k => {
        mapped[k] = r[k];
        mapped[`${tblName}.${k}`] = r[k];
        if (alias) {
          mapped[`${alias}.${k}`] = r[k];
        }
      });
      return mapped;
    });
  }

  function performJoin(leftRows, rightRows, onCond, joinType, ctes) {
    const result = [];
    const matchedRightIndices = new Set();

    leftRows.forEach(left => {
      let matched = false;
      rightRows.forEach((right, rIdx) => {
        const merged = Object.assign({}, left, right);
        if (evaluateCondition(onCond, merged, ctes)) {
          matched = true;
          matchedRightIndices.add(rIdx);
          result.push(merged);
        }
      });

      if (!matched && (joinType.includes('LEFT') || joinType.includes('FULL'))) {
        const nullRight = {};
        if (rightRows.length > 0) {
          Object.keys(rightRows[0]).forEach(k => nullRight[k] = null);
        }
        result.push(Object.assign({}, left, nullRight));
      }
    });

    if (joinType.includes('RIGHT') || joinType.includes('FULL')) {
      rightRows.forEach((right, rIdx) => {
        if (!matchedRightIndices.has(rIdx)) {
          const nullLeft = {};
          if (leftRows.length > 0) {
            Object.keys(leftRows[0]).forEach(k => nullLeft[k] = null);
          }
          result.push(Object.assign({}, nullLeft, right));
        }
      });
    }

    return result;
  }

  function sortRows(rows, orderByStr) {
    const orders = orderByStr.split(',').map(s => {
      const parts = s.trim().split(/\s+/);
      return {
        col: parts[0],
        desc: parts[1] && parts[1].toUpperCase() === 'DESC'
      };
    });

    return [...rows].sort((a, b) => {
      for (const ord of orders) {
        const valA = evalExpression(ord.col, a);
        const valB = evalExpression(ord.col, b);

        if (valA === valB) continue;
        if (valA === null) return ord.desc ? 1 : -1;
        if (valB === null) return ord.desc ? -1 : 1;

        if (typeof valA === 'number' && typeof valB === 'number') {
          return ord.desc ? valB - valA : valA - valB;
        } else {
          const cmp = String(valA).localeCompare(String(valB));
          return ord.desc ? -cmp : cmp;
        }
      }
      return 0;
    });
  }

  // DML Operations
  function handleInsert(query, startTime) {
    const match = query.match(/^INSERT\s+INTO\s+([\w\d_]+)\s*\(([\s\S]+?)\)\s+VALUES\s*\(([\s\S]+?)\)$/i);
    if (!match) {
      return { error: 'Syntax error in INSERT INTO statement. Format: INSERT INTO table (col1, col2) VALUES (val1, val2);', executionTime: 0 };
    }

    const tableName = match[1].toLowerCase();
    const cols = match[2].split(',').map(s => s.trim());
    const vals = splitArguments(match[3]).map(s => parseLiteral(s.trim()));

    if (!dbTables[tableName]) {
      return { error: `Table "${tableName}" does not exist.`, executionTime: 0 };
    }

    const newRow = {};
    cols.forEach((col, idx) => {
      newRow[col] = vals[idx] !== undefined ? vals[idx] : null;
    });

    if (newRow.id === undefined) {
      const maxId = dbTables[tableName].reduce((max, r) => Math.max(max, r.id || 0), 0);
      newRow.id = maxId + 1;
    }

    dbTables[tableName].push(newRow);
    const elapsed = Math.round((performance.now() - startTime) * 10) / 10;
    return {
      message: `Query OK, 1 row affected (inserted id: ${newRow.id})`,
      rowCount: 1,
      executionTime: Math.max(0.1, elapsed),
      columns: ['status', 'inserted_id'],
      rows: [{ status: 'SUCCESS', inserted_id: newRow.id }]
    };
  }

  function handleUpdate(query, startTime) {
    const match = query.match(/^UPDATE\s+([\w\d_]+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (!match) {
      return { error: 'Syntax error in UPDATE statement. Format: UPDATE table SET col = val WHERE condition;', executionTime: 0 };
    }

    const tableName = match[1].toLowerCase();
    const setClause = match[2].trim();
    const whereClause = match[3] ? match[3].trim() : null;

    if (!dbTables[tableName]) {
      return { error: `Table "${tableName}" does not exist.`, executionTime: 0 };
    }

    const setPairs = setClause.split(',').map(s => {
      const pair = s.split('=');
      return { col: pair[0].trim(), val: parseLiteral(pair[1].trim()) };
    });

    let affected = 0;
    dbTables[tableName].forEach(row => {
      if (!whereClause || evaluateCondition(whereClause, row)) {
        setPairs.forEach(p => {
          row[p.col] = p.val;
        });
        affected++;
      }
    });

    const elapsed = Math.round((performance.now() - startTime) * 10) / 10;
    return {
      message: `Query OK, ${affected} rows updated`,
      rowCount: affected,
      executionTime: Math.max(0.1, elapsed),
      columns: ['status', 'rows_affected'],
      rows: [{ status: 'SUCCESS', rows_affected: affected }]
    };
  }

  function handleDelete(query, startTime) {
    const match = query.match(/^DELETE\s+FROM\s+([\w\d_]+)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (!match) {
      return { error: 'Syntax error in DELETE statement. Format: DELETE FROM table WHERE condition;', executionTime: 0 };
    }

    const tableName = match[1].toLowerCase();
    const whereClause = match[2] ? match[2].trim() : null;

    if (!dbTables[tableName]) {
      return { error: `Table "${tableName}" does not exist.`, executionTime: 0 };
    }

    const initialLen = dbTables[tableName].length;
    if (whereClause) {
      dbTables[tableName] = dbTables[tableName].filter(row => !evaluateCondition(whereClause, row));
    } else {
      dbTables[tableName] = [];
    }
    const affected = initialLen - dbTables[tableName].length;

    const elapsed = Math.round((performance.now() - startTime) * 10) / 10;
    return {
      message: `Query OK, ${affected} rows deleted`,
      rowCount: affected,
      executionTime: Math.max(0.1, elapsed),
      columns: ['status', 'rows_deleted'],
      rows: [{ status: 'SUCCESS', rows_deleted: affected }]
    };
  }

  function handleCreateTable(query, startTime) {
    const match = query.match(/^CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([\w\d_]+)\s*\(([\s\S]+)\)$/i);
    if (!match) {
      return { error: 'Syntax error in CREATE TABLE statement.', executionTime: 0 };
    }
    const tableName = match[1].toLowerCase();
    if (dbTables[tableName]) {
      return { error: `Table "${tableName}" already exists.`, executionTime: 0 };
    }
    dbTables[tableName] = [];
    const elapsed = Math.round((performance.now() - startTime) * 10) / 10;
    return {
      message: `Table "${tableName}" created successfully.`,
      executionTime: Math.max(0.1, elapsed),
      columns: ['status'],
      rows: [{ status: `TABLE ${tableName} CREATED` }]
    };
  }

  function handleDropTable(query, startTime) {
    const match = query.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?([\w\d_]+)$/i);
    if (!match) {
      return { error: 'Syntax error in DROP TABLE statement.', executionTime: 0 };
    }
    const tableName = match[1].toLowerCase();
    if (!dbTables[tableName]) {
      return { error: `Table "${tableName}" does not exist.`, executionTime: 0 };
    }
    delete dbTables[tableName];
    const elapsed = Math.round((performance.now() - startTime) * 10) / 10;
    return {
      message: `Table "${tableName}" dropped successfully.`,
      executionTime: Math.max(0.1, elapsed),
      columns: ['status'],
      rows: [{ status: `TABLE ${tableName} DROPPED` }]
    };
  }

  function generateExplainPlan(query, isAnalyze) {
    const plan = [];
    const hasJoin = /\bJOIN\b/i.test(query);
    const hasGroup = /\bGROUP\s+BY\b/i.test(query);
    const hasOrder = /\bORDER\s+BY\b/i.test(query);
    const hasWhere = /\bWHERE\b/i.test(query);

    if (hasOrder) {
      plan.push({
        'QUERY PLAN': 'Sort (Sort Key: Expression, Method: quicksort)',
        'EST. COST': '18.45..19.20',
        'EST. ROWS': 12,
        'ACTUAL TIME (ms)': isAnalyze ? '0.042' : 'N/A'
      });
    }

    if (hasGroup) {
      plan.push({
        'QUERY PLAN': 'HashAggregate (Key: group columns)',
        'EST. COST': '14.20..16.10',
        'EST. ROWS': 5,
        'ACTUAL TIME (ms)': isAnalyze ? '0.035' : 'N/A'
      });
    }

    if (hasJoin) {
      plan.push({
        'QUERY PLAN': 'Hash Join (Hash Cond: left.id = right.foreign_id)',
        'EST. COST': '10.50..14.00',
        'EST. ROWS': 12,
        'ACTUAL TIME (ms)': isAnalyze ? '0.051' : 'N/A'
      });
    }

    if (hasWhere) {
      plan.push({
        'QUERY PLAN': 'Bitmap Heap Scan on main_table (Filter: predicate applied)',
        'EST. COST': '4.15..8.25',
        'EST. ROWS': 8,
        'ACTUAL TIME (ms)': isAnalyze ? '0.028' : 'N/A'
      });
    } else {
      plan.push({
        'QUERY PLAN': 'Seq Scan on main_table (Cost: 0.00..1.12 rows=12 width=64)',
        'EST. COST': '0.00..1.12',
        'EST. ROWS': 12,
        'ACTUAL TIME (ms)': isAnalyze ? '0.015' : 'N/A'
      });
    }

    return plan;
  }

  return {
    execute(sql) {
      return executeQuerySync(sql);
    },
    resetDatabase,
    getTablesList,
    getTableSchema
  };
})();
