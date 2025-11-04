CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  info JSONB
);


INSERT INTO students (info) VALUES
('{"name": "Sara", "age": 22, "courses": ["Math", "CS"], "gpa": 3.9}'),
('{"name": "Leo", "age": 24, "courses": ["History", "Philosophy"], "gpa": 3.5}');


SELECT info->>'name' AS name
FROM students;


SELECT * from students;


INSERT INTO students (info) VALUES
  ('{"name":"Sara","gpa":3.9,"courses":["Math","CS"], "meta":{"year":3}}'),
  ('{"name":"Leo","gpa":3.5,"courses":["History","Philosophy"], "meta":{"year":4}}'),
  ('{"name":"Maya","gpa":3.8,"courses":["CS","Physics"], "meta":{"year":2}}'),
  ('{"name":"Alex","gpa":3.7,"courses":["Philosophy","Art"], "meta":{"year":1}}');


SELECT * from students where info->'courses' ?& array['CS'];

-- Drop if exists (safe to re-run)
DROP TABLE IF EXISTS sales;

-- Create a sales table with variety of columns for CTE practice
CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  region TEXT NOT NULL,
  product_category TEXT NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL,           -- 'paid', 'pending', 'refunded'
  sales_date DATE NOT NULL,
  rep_id INT                      -- sales rep id
);

-- Insert sample rows
INSERT INTO sales (region, product_category, amount, status, sales_date, rep_id) VALUES
('East',  'Gadgets',       100.00, 'paid',     '2025-10-01', 1),
('West',  'Gadgets',       150.00, 'paid',     '2025-10-02', 2),
('East',  'Gizmos',        200.00, 'paid',     '2025-10-03', 1),
('West',  'Gizmos',         50.00, 'pending',  '2025-10-04', 2),
('North', 'Gadgets',       300.00, 'paid',     '2025-09-30', 3),
('South', 'Accessories',    25.00, 'paid',     '2025-10-05', 4),
('East',  'Accessories',    75.00, 'refunded', '2025-10-06', 1),
('North', 'Gizmos',        120.00, 'paid',     '2025-10-07', 3),
('West',  'Accessories',    60.00, 'paid',     '2025-10-08', 2),
('East',  'Gadgets',       130.00, 'pending',  '2025-10-09', 1),
('South', 'Gadgets',       210.00, 'paid',     '2025-10-10', 4),
('East',  'Gizmos',        180.00, 'paid',     '2025-10-11', 1),
('North', 'Accessories',    40.00, 'pending',  '2025-10-12', 3),
('West',  'Gizmos',        220.00, 'paid',     '2025-10-13', 2),
('South', 'Gizmos',        110.00, 'paid',     '2025-10-14', 4),
('East',  'Gadgets',        90.00, 'paid',     '2025-10-15', 1),
('West',  'Accessories',    85.00, 'refunded', '2025-10-16', 2),
('North', 'Gadgets',       170.00, 'paid',     '2025-10-17', 3),
('South', 'Accessories',    55.00, 'paid',     '2025-10-18', 4),
('East',  'Accessories',    95.00, 'paid',     '2025-10-19', 1);


select * from sales;

WITH region_totals AS (
	SELECT region, sum(amount) as total_sales
	FROM sales
	WHERE status='paid'
	GROUP BY region
)

SELECT region, total_sales, 'Above average' as category
from region_totals
WHERE total_sales > (SELECT avg(total_sales) from region_totals)

UNION ALL

SELECT region, total_sales, 'Below or equal average' as category
from region_totals
WHERE total_sales <= (SELECT avg(total_sales) from region_totals);

WITH rep_sales AS (
	SELECT rep_id, SUM(amount) as total_paid, count(*) as paid_orders
	FROM sales
	WHERE status = 'paid'
	GROUP BY rep_id
)

SELECT rep_id, rep_sales.paid_orders as paid_orders,rep_sales.total_paid as total_paid
from sales
LEFT JOIN rep_sales ON sales.rep_id = rep_sales.rep_id;