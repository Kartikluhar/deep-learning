/**
 * MLForge Real-World SQL Projects Database
 * 18 Comprehensive Real-World Database Projects spanning Beginner, Intermediate,
 * and Advanced tiers with requirements, ER diagrams, schemas, sample queries,
 * indexing decisions, and optimization exercises.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sql = window.MLForge.sql || {};
window.MLForge.sql.data = window.MLForge.sql.data || {};

MLForge.sql.data.projects = [
  // BEGINNER PROJECTS
  {
    id: "proj-1",
    title: "1. Student Management Database",
    tier: "Beginner",
    category: "Education",
    summary: "Manage students, classes, attendance records, and report cards with primary and foreign key constraints.",
    requirements: [
      "Track student personal profiles, enrollments, and academic year.",
      "Record attendance for each subject on a daily basis.",
      "Compute semester GPA and grade rankings."
    ],
    erDiagram: `students (id [PK], student_name, grade_level, dob)
    │ (1:N)
attendance (id [PK], student_id [FK], class_date, status)
    │ (1:N)
grades (id [PK], student_id [FK], subject_name, score, semester)`,
    tablesSchema: `-- PostgreSQL / MySQL Schema
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  enrollment_date DATE NOT NULL
);

CREATE TABLE attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  class_date DATE NOT NULL,
  status ENUM('Present', 'Absent', 'Late') NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE grades (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  subject_name VARCHAR(60) NOT NULL,
  score DECIMAL(5,2) CHECK (score BETWEEN 0 AND 100),
  FOREIGN KEY (student_id) REFERENCES students(id)
);`,
    queries: [
      {
        name: "Calculate Average Student Grade & Status",
        sql: "SELECT \n  s.first_name, \n  s.last_name, \n  ROUND(AVG(g.score), 2) AS gpa,\n  COUNT(g.id) AS subjects_completed\nFROM students s\nJOIN grades g ON s.id = g.student_id\nGROUP BY s.id, s.first_name, s.last_name\nHAVING AVG(g.score) >= 75.0\nORDER BY gpa DESC;"
      }
    ],
    indexingNotes: "Add composite index on (student_id, class_date) to accelerate daily attendance lookups."
  },
  {
    id: "proj-2",
    title: "2. Library Management Database",
    tier: "Beginner",
    category: "Operations",
    summary: "Catalog books, authors, patrons, book loans, due dates, and calculate overdue fines.",
    requirements: [
      "Catalog books with ISBN, publication year, and available copy count.",
      "Track borrower checkout dates, return dates, and fine calculations."
    ],
    erDiagram: `authors (id [PK], author_name)
    │ (1:N)
books (id [PK], isbn, title, author_id [FK], copies_available)
    │ (1:N)
borrow_records (id [PK], book_id [FK], member_id [FK], borrow_date, return_date)`,
    tablesSchema: `CREATE TABLE books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  isbn VARCHAR(13) UNIQUE NOT NULL,
  title VARCHAR(150) NOT NULL,
  author_id INT NOT NULL,
  copies_available INT DEFAULT 1 CHECK (copies_available >= 0)
);

CREATE TABLE borrow_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  book_id INT NOT NULL,
  member_id INT NOT NULL,
  borrow_date DATE NOT NULL,
  due_date DATE NOT NULL,
  return_date DATE,
  FOREIGN KEY (book_id) REFERENCES books(id)
);`,
    queries: [
      {
        name: "Find Overdue Books and Calculate Fines ($0.50/day)",
        sql: "SELECT \n  b.title,\n  br.member_id,\n  br.due_date,\n  DATEDIFF(CURRENT_DATE, br.due_date) AS days_overdue,\n  DATEDIFF(CURRENT_DATE, br.due_date) * 0.50 AS fine_usd\nFROM borrow_records br\nJOIN books b ON br.book_id = b.id\nWHERE br.return_date IS NULL AND br.due_date < CURRENT_DATE;"
      }
    ],
    indexingNotes: "Index on `borrow_records (return_date, due_date)` to instantly find overdue rentals."
  },
  {
    id: "proj-3",
    title: "3. Employee Management Database",
    tier: "Beginner",
    category: "Human Resources",
    summary: "Corporate staff database supporting departments, job titles, manager self-joins, and salary audits.",
    requirements: [
      "Manage staff hierarchy with manager self-joins.",
      "Calculate department payroll totals and budget caps."
    ],
    erDiagram: `departments (id [PK], department_name, budget)
    │ (1:N)
employees (id [PK], first_name, last_name, department_id [FK], manager_id [FK], salary)`,
    tablesSchema: `CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(100) UNIQUE NOT NULL,
  budget DECIMAL(12,2) NOT NULL
);

CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  department_id INT NOT NULL,
  manager_id INT,
  salary DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);`,
    queries: [
      {
        name: "Department Headcount and Budget Utilization",
        sql: "SELECT \n  d.department_name,\n  d.budget,\n  COUNT(e.id) AS total_employees,\n  SUM(e.salary) AS total_payroll,\n  ROUND((SUM(e.salary) / d.budget) * 100, 1) AS budget_utilization_pct\nFROM departments d\nLEFT JOIN employees e ON d.id = e.department_id\nGROUP BY d.id, d.department_name, d.budget;"
      }
    ],
    indexingNotes: "Index on `employees (department_id)` and `employees (manager_id)`."
  },
  {
    id: "proj-4",
    title: "4. College Course Registration Database",
    tier: "Beginner",
    category: "Education",
    summary: "Course catalogs, prerequisites, professor assignments, student enrollments, and seat caps.",
    requirements: [
      "Enforce maximum student enrollment limits per course.",
      "Prevent double enrollment in the same course during one term."
    ],
    erDiagram: `courses (id [PK], course_code, course_name, max_seats)
    │ (1:N)
enrollments (id [PK], course_id [FK], student_id [FK], semester)`,
    tablesSchema: `CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_code VARCHAR(10) UNIQUE NOT NULL,
  course_name VARCHAR(100) NOT NULL,
  max_seats INT DEFAULT 30
);

CREATE TABLE enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  semester VARCHAR(20) NOT NULL,
  UNIQUE KEY unique_student_course (student_id, course_id, semester)
);`,
    queries: [
      {
        name: "Check Course Capacity and Available Seats",
        sql: "SELECT \n  c.course_code,\n  c.course_name,\n  c.max_seats,\n  COUNT(e.id) AS enrolled_students,\n  c.max_seats - COUNT(e.id) AS seats_remaining\nFROM courses c\nLEFT JOIN enrollments e ON c.id = e.course_id\nGROUP BY c.id, c.course_code, c.course_name, c.max_seats;"
      }
    ],
    indexingNotes: "Composite unique index `(student_id, course_id, semester)` enforces business constraints."
  },
  {
    id: "proj-5",
    title: "5. Hospital Management Database",
    tier: "Beginner",
    category: "Healthcare",
    summary: "Patients, doctors, appointments, medical diagnoses, room assignments, and medical billing.",
    requirements: [
      "Track patient medical records, primary doctors, and appointments.",
      "Monitor room availability and discharge timestamps."
    ],
    erDiagram: `patients (id [PK], patient_name, dob, blood_group)
    │ (1:N)
appointments (id [PK], patient_id [FK], doctor_id [FK], appointment_time, status)`,
    tablesSchema: `CREATE TABLE patients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  patient_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  blood_group VARCHAR(5)
);

CREATE TABLE appointments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT NOT NULL,
  doctor_id INT NOT NULL,
  appointment_date DATETIME NOT NULL,
  status VARCHAR(20) DEFAULT 'Scheduled',
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);`,
    queries: [
      {
        name: "Doctor Daily Appointment Schedule",
        sql: "SELECT \n  doctor_id,\n  DATE(appointment_date) AS appt_day,\n  COUNT(*) AS total_patients\nFROM appointments\nWHERE status != 'Cancelled'\nGROUP BY doctor_id, DATE(appointment_date)\nORDER BY appt_day DESC;"
      }
    ],
    indexingNotes: "Index on `appointments (appointment_date, doctor_id)` for quick calendar queries."
  },

  // INTERMEDIATE PROJECTS
  {
    id: "proj-6",
    title: "6. E-Commerce Order & Inventory Platform",
    tier: "Intermediate",
    category: "E-Commerce",
    summary: "High-scale online store with customers, product variations, order line items, discounts, and order statuses.",
    requirements: [
      "Support multi-item carts, stock deduction, and historical order pricing.",
      "Calculate customer lifetime value (LTV) and category sales."
    ],
    erDiagram: `customers (id [PK], email, name)
    │ (1:N)
orders (id [PK], customer_id [FK], order_date, status, total)
    │ (1:N)
order_items (id [PK], order_id [FK], product_id [FK], quantity, unit_price)
    │ (N:1)
products (id [PK], product_name, price, stock)`,
    tablesSchema: `CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(120) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'Pending'
);

CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);`,
    queries: [
      {
        name: "Customer Lifetime Value (LTV) and Order Count",
        sql: "SELECT \n  c.first_name, \n  c.last_name,\n  COUNT(DISTINCT o.id) AS total_orders,\n  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS lifetime_spend\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nJOIN order_items oi ON o.id = oi.order_id\nGROUP BY c.id, c.first_name, c.last_name\nORDER BY lifetime_spend DESC;"
      }
    ],
    indexingNotes: "Index on `order_items (order_id, product_id)` and `orders (customer_id, order_date)`."
  },
  {
    id: "proj-7",
    title: "7. Digital Banking & Ledger Database",
    tier: "Intermediate",
    category: "Fintech",
    summary: "Double-entry accounting ledger tracking customer bank accounts, debit/credit entries, and daily reconciliation.",
    requirements: [
      "Strict double-entry bookkeeping: every transaction has equal debit and credit entries.",
      "Row-level locking for atomic balance transfers."
    ],
    erDiagram: `accounts (id [PK], customer_id, balance, status)
    │ (1:N)
ledger_entries (id [PK], account_id [FK], amount, entry_type, created_at)`,
    tablesSchema: `CREATE TABLE accounts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  account_number VARCHAR(20) UNIQUE NOT NULL,
  balance DECIMAL(15,2) DEFAULT 0.00,
  currency VARCHAR(3) DEFAULT 'USD'
);

CREATE TABLE ledger_entries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  account_id INT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  entry_type ENUM('DEBIT', 'CREDIT') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES accounts(id)
);`,
    queries: [
      {
        name: "Audit Daily Ledger Reconciliation Against Stored Balance",
        sql: "SELECT \n  a.account_number,\n  a.balance AS cached_balance,\n  SUM(CASE WHEN le.entry_type = 'CREDIT' THEN le.amount ELSE -le.amount END) AS computed_balance,\n  (a.balance - SUM(CASE WHEN le.entry_type = 'CREDIT' THEN le.amount ELSE -le.amount END)) AS discrepancy\nFROM accounts a\nJOIN ledger_entries le ON a.id = le.account_id\nGROUP BY a.id, a.account_number, a.balance\nHAVING discrepancy != 0;"
      }
    ],
    indexingNotes: "Index on `ledger_entries (account_id, created_at)` for instant chronological ledger scans."
  },
  {
    id: "proj-8",
    title: "8. Warehouse Inventory & Supply Chain",
    tier: "Intermediate",
    category: "Logistics",
    summary: "Multi-warehouse stock replenishment, supplier purchase orders, and low-inventory restock triggers.",
    requirements: [
      "Track inventory distributed across multiple regional warehouses.",
      "Automatically identify items below their safety restock threshold."
    ],
    erDiagram: `warehouses (id [PK], location)
    │ (1:N)
inventory (warehouse_id [FK], product_id [FK], quantity_on_hand, reorder_point)`,
    tablesSchema: `CREATE TABLE warehouses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  city VARCHAR(50) NOT NULL
);

CREATE TABLE warehouse_stock (
  warehouse_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity_on_hand INT NOT NULL,
  reorder_level INT NOT NULL,
  PRIMARY KEY (warehouse_id, product_id)
);`,
    queries: [
      {
        name: "Low Stock Alert for Reordering",
        sql: "SELECT \n  w.name AS warehouse_name,\n  p.product_name,\n  ws.quantity_on_hand,\n  ws.reorder_level,\n  (ws.reorder_level - ws.quantity_on_hand) AS quantity_to_order\nFROM warehouse_stock ws\nJOIN warehouses w ON ws.warehouse_id = w.id\nJOIN products p ON ws.product_id = p.id\nWHERE ws.quantity_on_hand < ws.reorder_level;"
      }
    ],
    indexingNotes: "Composite primary key on `(warehouse_id, product_id)` creates a clustered B-tree index."
  },
  {
    id: "proj-9",
    title: "9. Hotel Room Booking Engine",
    tier: "Intermediate",
    category: "Hospitality",
    summary: "Hotel chains, room categories, seasonal pricing, check-in/check-out date ranges, and conflict detection.",
    requirements: [
      "Prevent double booking of rooms using date range overlap queries.",
      "Calculate seasonal rate adjustments."
    ],
    erDiagram: `hotels (id [PK], name, city)
    │ (1:N)
rooms (id [PK], hotel_id [FK], room_number, base_price)
    │ (1:N)
bookings (id [PK], room_id [FK], check_in, check_out, total_paid)`,
    tablesSchema: `CREATE TABLE rooms (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hotel_id INT NOT NULL,
  room_number VARCHAR(10) NOT NULL,
  price_per_night DECIMAL(8,2) NOT NULL
);

CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  room_id INT NOT NULL,
  guest_id INT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  CHECK (check_out > check_in)
);`,
    queries: [
      {
        name: "Find Available Rooms for Date Range (Conflict Prevention)",
        sql: "SELECT r.id, r.room_number, r.price_per_night\nFROM rooms r\nWHERE r.id NOT IN (\n  SELECT b.room_id \n  FROM bookings b\n  WHERE b.check_in < '2024-06-15' AND b.check_out > '2024-06-10'\n);"
      }
    ],
    indexingNotes: "Index on `bookings (room_id, check_in, check_out)` for fast range intersection checks."
  },
  {
    id: "proj-10",
    title: "10. Food Delivery Platform (DoorDash / UberEats)",
    tier: "Intermediate",
    category: "On-Demand Delivery",
    summary: "Restaurants, menu sections, modifier items, driver delivery assignments, and order tracking.",
    requirements: [
      "Track order delivery statuses (Placed, Cooking, PickedUp, Delivered).",
      "Calculate restaurant commission cuts and driver earnings."
    ],
    erDiagram: `restaurants (id [PK], name, commission_pct)
    │ (1:N)
orders (id [PK], restaurant_id [FK], driver_id [FK], subtotal, delivery_fee)`,
    tablesSchema: `CREATE TABLE restaurants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  commission_rate DECIMAL(4,2) DEFAULT 0.20
);

CREATE TABLE food_orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  driver_id INT,
  subtotal DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'Placed',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`,
    queries: [
      {
        name: "Restaurant Net Payout Report (Gross minus Commission)",
        sql: "SELECT \n  r.name,\n  COUNT(fo.id) AS total_orders,\n  SUM(fo.subtotal) AS gross_sales,\n  ROUND(SUM(fo.subtotal * (1 - r.commission_rate)), 2) AS net_restaurant_payout\nFROM food_orders fo\nJOIN restaurants r ON fo.restaurant_id = r.id\nWHERE fo.status = 'Delivered'\nGROUP BY r.id, r.name, r.commission_rate;"
      }
    ],
    indexingNotes: "Index on `food_orders (status, restaurant_id, created_at)`."
  },
  {
    id: "proj-11",
    title: "11. Movie Ticket Booking Database",
    tier: "Intermediate",
    category: "Entertainment",
    summary: "Cinema halls, showtimes, tiered seating layouts, dynamic ticket pricing, and seat reservation locks.",
    requirements: [
      "Reserve seats with optimistic locking to prevent race conditions during blockbuster ticket launches.",
      "Track screen occupancy percentage."
    ],
    erDiagram: `theatres (id [PK], name)
    │ (1:N)
screens (id [PK], theatre_id [FK], total_seats)
    │ (1:N)
showtimes (id [PK], movie_id, start_time)
    │ (1:N)
ticket_reservations (id [PK], showtime_id [FK], seat_number, status)`,
    tablesSchema: `CREATE TABLE showtimes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  movie_title VARCHAR(100) NOT NULL,
  screen_id INT NOT NULL,
  show_time DATETIME NOT NULL
);

CREATE TABLE ticket_reservations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  showtime_id INT NOT NULL,
  seat_number VARCHAR(6) NOT NULL,
  reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('Reserved', 'Paid') NOT NULL,
  UNIQUE KEY unique_seat_show (showtime_id, seat_number)
);`,
    queries: [
      {
        name: "Screen Occupancy Percentage per Showtime",
        sql: "SELECT \n  s.movie_title,\n  s.show_time,\n  COUNT(tr.id) AS booked_seats,\n  ROUND((COUNT(tr.id) / 150.0) * 100, 1) AS occupancy_pct\nFROM showtimes s\nLEFT JOIN ticket_reservations tr ON s.id = tr.showtime_id\nGROUP BY s.id, s.movie_title, s.show_time;"
      }
    ],
    indexingNotes: "Unique constraint on `(showtime_id, seat_number)` enforces real-world seat exclusivity."
  },
  {
    id: "proj-12",
    title: "12. Online Learning Platform (Coursera / Udemy)",
    tier: "Intermediate",
    category: "EdTech",
    summary: "Courses, module lessons, video watch durations, quiz submissions, and certificate graduation metrics.",
    requirements: [
      "Compute student course completion percentage dynamically.",
      "Issue certificates upon 100% video milestone completions."
    ],
    erDiagram: `courses (id [PK], title)
    │ (1:N)
lessons (id [PK], course_id [FK], duration_seconds)
    │ (1:N)
user_progress (user_id, lesson_id [FK], completed)`,
    tablesSchema: `CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(120) NOT NULL
);

CREATE TABLE lessons (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NOT NULL,
  title VARCHAR(120) NOT NULL
);

CREATE TABLE user_lesson_progress (
  user_id INT NOT NULL,
  lesson_id INT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (user_id, lesson_id)
);`,
    queries: [
      {
        name: "Calculate Student Course Completion Percentage",
        sql: "SELECT \n  c.title AS course_name,\n  ulp.user_id,\n  COUNT(l.id) AS total_lessons,\n  SUM(CASE WHEN ulp.completed = TRUE THEN 1 ELSE 0 END) AS completed_lessons,\n  ROUND((SUM(CASE WHEN ulp.completed = TRUE THEN 1 ELSE 0 END) / COUNT(l.id)) * 100, 1) AS completion_percentage\nFROM courses c\nJOIN lessons l ON c.id = l.course_id\nJOIN user_lesson_progress ulp ON l.id = ulp.lesson_id\nGROUP BY c.id, c.title, ulp.user_id;"
      }
    ],
    indexingNotes: "Index on `lessons (course_id)` and composite PK on `user_lesson_progress (user_id, lesson_id)`."
  },

  // ADVANCED PROJECTS
  {
    id: "proj-13",
    title: "13. Social Media Social Graph (Twitter / X)",
    tier: "Advanced",
    category: "Social Networks",
    summary: "Followers/following graph, timeline post feeds, hashtags, thread replies, and viral engagement ranking.",
    requirements: [
      "Model asymmetric follower/following bidirectional social graph.",
      "Query user feed incorporating posts from followed users ordered chronologically."
    ],
    erDiagram: `users (id [PK], username)
    │ (1:N)
follows (follower_id [FK], followee_id [FK])
    │ (1:N)
posts (id [PK], user_id [FK], content, created_at)`,
    tablesSchema: `CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(40) UNIQUE NOT NULL
);

CREATE TABLE follows (
  follower_id INT NOT NULL,
  followee_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (follower_id, followee_id)
);

CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    queries: [
      {
        name: "Generate Home Timeline Feed for User #1",
        sql: "SELECT \n  p.id AS post_id,\n  u.username AS author,\n  p.content,\n  p.created_at\nFROM posts p\nJOIN follows f ON p.user_id = f.followee_id\nJOIN users u ON p.user_id = u.id\nWHERE f.follower_id = 1\nORDER BY p.created_at DESC\nLIMIT 20;"
      }
    ],
    indexingNotes: "Composite index on `follows (follower_id, followee_id)` and `posts (user_id, created_at DESC)` for sub-millisecond timeline feed reads."
  },
  {
    id: "proj-14",
    title: "14. Ride-Sharing Geospatial Database (Uber / Lyft)",
    tier: "Advanced",
    category: "Geospatial & Mobility",
    summary: "Driver GPS coordinates, passenger ride requests, dynamic surge pricing algorithms, and driver payouts.",
    requirements: [
      "Calculate spatial proximity between driver locations and passenger pickup pins.",
      "Compute surge multiplier based on supply/demand ratio."
    ],
    erDiagram: `drivers (id [PK], name, current_lat, current_lng, is_available)
    │ (1:N)
rides (id [PK], passenger_id, driver_id [FK], pickup_lat, pickup_lng, fare_amount, status)`,
    tablesSchema: `CREATE TABLE drivers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  driver_name VARCHAR(80) NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL
);

CREATE TABLE rides (
  id INT PRIMARY KEY AUTO_INCREMENT,
  passenger_id INT NOT NULL,
  driver_id INT,
  fare DECIMAL(8,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'Requested',
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    queries: [
      {
        name: "Find Closest Available Drivers (Euclidean Distance Formula)",
        sql: "SELECT \n  id,\n  driver_name,\n  ROUND(SQRT(POW(latitude - 37.7749, 2) + POW(longitude - (-122.4194), 2)) * 111, 2) AS distance_km\nFROM drivers\nWHERE is_available = TRUE\nORDER BY distance_km ASC\nLIMIT 5;"
      }
    ],
    indexingNotes: "In production PostgreSQL, use PostGIS extension with GiST R-Tree index for spatial radius searches."
  },
  {
    id: "proj-15",
    title: "15. Payment Gateway & Transaction Reconciliation (Stripe)",
    tier: "Advanced",
    category: "Fintech",
    summary: "Idempotent payment authorizations, webhooks, multi-currency processing, and automated fee splits.",
    requirements: [
      "Enforce payment idempotency to prevent duplicate charges on customer retries.",
      "Reconcile daily card clearing batches against merchant payouts."
    ],
    erDiagram: `merchants (id [PK], company_name)
    │ (1:N)
charges (id [PK], idempotency_key, amount, currency, status, fee)`,
    tablesSchema: `CREATE TABLE charges (
  id INT PRIMARY KEY AUTO_INCREMENT,
  idempotency_key VARCHAR(64) UNIQUE NOT NULL,
  merchant_id INT NOT NULL,
  amount_cents BIGINT NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(20) NOT NULL,
  fee_cents BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    queries: [
      {
        name: "Daily Merchant Payout Batch Aggregator",
        sql: "SELECT \n  merchant_id,\n  DATE(created_at) AS charge_day,\n  COUNT(*) AS total_charges,\n  SUM(amount_cents) / 100.0 AS gross_volume_usd,\n  SUM(fee_cents) / 100.0 AS stripe_fees_usd,\n  (SUM(amount_cents) - SUM(fee_cents)) / 100.0 AS net_merchant_payout\nFROM charges\nWHERE status = 'Succeeded'\nGROUP BY merchant_id, DATE(created_at);"
      }
    ],
    indexingNotes: "Unique index on `idempotency_key` guarantees exactly-once transaction processing."
  },
  {
    id: "proj-16",
    title: "16. Global Logistics & Delivery Tracking (FedEx / DHL)",
    tier: "Advanced",
    category: "Logistics",
    summary: "Package tracking numbers, transit hub checkpoints, delivery route planning, and SLA transit time calculation.",
    requirements: [
      "Track package checkpoint events with chronologically chained scans.",
      "Identify shipments at risk of missing guaranteed SLA delivery dates."
    ],
    erDiagram: `shipments (id [PK], tracking_number, origin, destination, est_delivery)
    │ (1:N)
tracking_events (id [PK], shipment_id [FK], location, event_type, scanned_at)`,
    tablesSchema: `CREATE TABLE shipments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tracking_number VARCHAR(30) UNIQUE NOT NULL,
  promised_delivery_date DATETIME NOT NULL,
  current_status VARCHAR(30) NOT NULL
);

CREATE TABLE tracking_events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  shipment_id INT NOT NULL,
  hub_location VARCHAR(80) NOT NULL,
  status_update VARCHAR(80) NOT NULL,
  scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shipment_id) REFERENCES shipments(id)
);`,
    queries: [
      {
        name: "Find Latest Checkpoint Scan per Active Package",
        sql: "WITH RankedScans AS (\n  SELECT \n    s.tracking_number,\n    te.hub_location,\n    te.status_update,\n    te.scanned_at,\n    ROW_NUMBER() OVER (PARTITION BY s.id ORDER BY te.scanned_at DESC) AS scan_order\n  FROM shipments s\n  JOIN tracking_events te ON s.id = te.shipment_id\n  WHERE s.current_status != 'Delivered'\n)\nSELECT tracking_number, hub_location, status_update, scanned_at\nFROM RankedScans\nWHERE scan_order = 1;"
      }
    ],
    indexingNotes: "Composite index on `tracking_events (shipment_id, scanned_at DESC)`."
  },
  {
    id: "proj-17",
    title: "17. Multi-Tenant SaaS Isolation Engine",
    tier: "Advanced",
    category: "Enterprise Software",
    summary: "Single-database multi-tenancy with tenant_id isolation, Row-Level Security (RLS), and per-tenant usage quotas.",
    requirements: [
      "Enforce strict tenant data boundaries so Tenant A can never read Tenant B's data.",
      "Monitor tenant database storage and API quota consumption."
    ],
    erDiagram: `tenants (id [PK], company_name, plan_tier)
    │ (1:N)
tenant_documents (id [PK], tenant_id [FK], doc_title, file_size_kb)`,
    tablesSchema: `-- PostgreSQL Row Level Security (RLS) Pattern
CREATE TABLE tenants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company_name VARCHAR(100) NOT NULL,
  plan_tier VARCHAR(20) DEFAULT 'Standard'
);

CREATE TABLE tenant_documents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tenant_id INT NOT NULL,
  doc_title VARCHAR(150) NOT NULL,
  file_size_kb INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- In PostgreSQL:
-- ALTER TABLE tenant_documents ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY tenant_isolation_policy ON tenant_documents 
--   USING (tenant_id = current_setting('app.current_tenant_id')::INT);`,
    queries: [
      {
        name: "Tenant Storage Usage vs Plan Quotas",
        sql: "SELECT \n  t.company_name,\n  t.plan_tier,\n  COUNT(td.id) AS total_files,\n  ROUND(SUM(td.file_size_kb) / 1024.0, 2) AS storage_used_mb,\n  CASE\n    WHEN SUM(td.file_size_kb) > 1000000 THEN 'Exceeded Quota'\n    ELSE 'Within Limits'\n  END AS quota_status\nFROM tenants t\nLEFT JOIN tenant_documents td ON t.id = td.tenant_id\nGROUP BY t.id, t.company_name, t.plan_tier;"
      }
    ],
    indexingNotes: "Every single tenant table must have `tenant_id` as the leading column in composite indexes."
  },
  {
    id: "proj-18",
    title: "18. Analytics & BI Data Warehouse (Star Schema)",
    tier: "Advanced",
    category: "Data Warehousing",
    summary: "Dimensional modeling (Star Schema) with central fact_sales table and dim_date, dim_store, dim_product tables.",
    requirements: [
      "Design an enterprise Star Schema optimized for OLAP aggregations.",
      "Write multi-dimensional rollups across time, store locations, and product lines."
    ],
    erDiagram: `dim_store (store_key [PK], city, region)
    │
dim_date (date_key [PK], year, quarter, month) ── fact_sales (sales_amount, units_sold)
    │
dim_product (product_key [PK], category, brand)`,
    tablesSchema: `CREATE TABLE dim_date (
  date_key INT PRIMARY KEY,
  calendar_date DATE NOT NULL,
  year INT NOT NULL,
  quarter INT NOT NULL,
  month_name VARCHAR(15) NOT NULL
);

CREATE TABLE dim_product (
  product_key INT PRIMARY KEY AUTO_INCREMENT,
  sku VARCHAR(20) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL,
  brand VARCHAR(50) NOT NULL
);

CREATE TABLE fact_sales (
  order_id INT NOT NULL,
  date_key INT NOT NULL,
  product_key INT NOT NULL,
  store_key INT NOT NULL,
  units_sold INT NOT NULL,
  revenue_usd DECIMAL(12,2) NOT NULL,
  profit_usd DECIMAL(12,2) NOT NULL,
  FOREIGN KEY (date_key) REFERENCES dim_date(date_key),
  FOREIGN KEY (product_key) REFERENCES dim_product(product_key)
);`,
    queries: [
      {
        name: "Quarterly Revenue Rollup by Product Category",
        sql: "SELECT \n  d.year,\n  d.quarter,\n  p.category,\n  SUM(f.revenue_usd) AS total_revenue,\n  SUM(f.profit_usd) AS total_profit,\n  ROUND((SUM(f.profit_usd) / SUM(f.revenue_usd)) * 100, 1) AS profit_margin_pct\nFROM fact_sales f\nJOIN dim_date d ON f.date_key = d.date_key\nJOIN dim_product p ON f.product_key = p.product_key\nGROUP BY d.year, d.quarter, p.category\nORDER BY d.year, d.quarter, total_revenue DESC;"
      }
    ],
    indexingNotes: "In OLAP, use columnar storage (or ClickHouse/Snowflake) and bitmap indexes on foreign key dimensions."
  }
];

