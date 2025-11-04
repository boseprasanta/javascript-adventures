/* 
🧠 Question 1:
You have a table named `sales`:

sale_date    | sale_amount
-------------|-------------
2025-01-01   | 100
2025-01-02   | 200
2025-01-03   | 150

👉 Write a query to calculate a running total of sales by sale_date.
*/

SELECT
  sale_date,
  sale_amount,
  SUM(sale_amount) OVER (
    ORDER BY sale_date
  ) AS running_total
FROM sales;


/* 
🧠 Question 2:
You have a table named `sales`:

sales_date   | amount
--------------|---------
2025-01-01    | 100
2025-01-01    | 200
2025-01-02    | 150

👉 Write a query to calculate the total sales for each date, along with the running total within each date (if multiple rows exist for the same date).
*/

SELECT
  sales_date,
  amount,
  SUM(amount) OVER (
    PARTITION BY sales_date
    ORDER BY sales_date ASC
  ) AS running_sales
FROM sales;

/* 
🧠 Question:
Using the `sales` table below, calculate a running average of `amount` 
up to the current row (use AVG() instead of SUM()).
*/

SELECT
  sales_date,
  amount,
  AVG(amount) OVER (
    ORDER BY sales_date
  ) AS running_avg
FROM sales;

/* 
🧠 Question:
Modify Q1 so that your running total resets every week.

You have a table `sales`:
id | region | product_category | amount | status | sales_date | rep_id

Write a query to calculate a running total of `amount` by `sales_date`,
but restart the total every week.
*/


-- ✅ Correct Answer
SELECT
  sales_date,
  EXTRACT(YEAR FROM sales_date)  AS sales_year,
  EXTRACT(WEEK  FROM sales_date) AS sales_week,
  amount,
  SUM(amount) OVER (
    PARTITION BY EXTRACT(YEAR FROM sales_date), EXTRACT(WEEK FROM sales_date)
    ORDER BY sales_date, id
  ) AS running_total
FROM sales;


-- 💡 Gotchas / Notes:
-- 1️⃣ Always include BOTH YEAR and WEEK in the PARTITION BY clause 
--     → prevents week numbers from different years being grouped together.
-- 2️⃣ Add a unique column (like `id`) to the ORDER BY for deterministic results 
--     → useful when multiple rows share the same `sales_date`.
-- 3️⃣ You can also use `date_trunc('week', sales_date)` for cleaner weekly grouping:
--        PARTITION BY date_trunc('week', sales_date)
-- 4️⃣ EXTRACT() accepts either syntax:
--        EXTRACT(WEEK FROM sales_date)
--     or  EXTRACT('week' FROM sales_date) — both work in PostgreSQL.
-- 5️⃣ Alias `running_total` instead of `running_sales` for clarity since SUM() is used.

------------------------------------------------------------
-- Q5. Add a salesperson column and calculate a running total
--     per salesperson within each region.
------------------------------------------------------------

-- A salesperson can work in multiple regions.
-- Each (region, salesperson) pair will have its own running total.

------------------------------------------------------------
-- 1️⃣  Setup: sample dataset
------------------------------------------------------------

DROP TABLE IF EXISTS sales;
CREATE TABLE sales (
  sale_id SERIAL PRIMARY KEY,
  region TEXT,
  salesperson TEXT,
  sale_date DATE,
  amount NUMERIC
);

INSERT INTO sales (region, salesperson, sale_date, amount) VALUES
('North', 'Alice', '2025-11-01', 100),
('North', 'Alice', '2025-11-01', 50),
('North', 'Alice', '2025-11-02', 200),
('North', 'Bob',   '2025-11-01', 80),
('North', 'Bob',   '2025-11-03', 120),
('South', 'Alice', '2025-11-01', 90),
('South', 'Alice', '2025-11-02', 110);

------------------------------------------------------------
-- 2️⃣  Running total per salesperson within each region
--     Using ROWS → true running total (row-by-row)
--     Using RANGE → same total for rows with same sale_date
------------------------------------------------------------

SELECT
  region,
  salesperson,
  sale_date,
  amount,
  SUM(amount) OVER (
    PARTITION BY region, salesperson
    ORDER BY sale_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total_rows,
  SUM(amount) OVER (
    PARTITION BY region, salesperson
    ORDER BY sale_date
    RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total_range
FROM sales
ORDER BY region, salesperson, sale_date, amount;

------------------------------------------------------------
-- 3️⃣  Expected Output (simplified view)
--  region | salesperson | sale_date  | amount | running_total_rows | running_total_range
-- --------+--------------+------------+--------+--------------------+---------------------
--  North  | Alice        | 2025-11-01 | 100    | 100                | 150
--  North  | Alice        | 2025-11-01 | 50     | 150                | 150
--  North  | Alice        | 2025-11-02 | 200    | 350                | 350
--  North  | Bob          | 2025-11-01 | 80     | 80                 | 80
--  North  | Bob          | 2025-11-03 | 120    | 200                | 200
--  South  | Alice        | 2025-11-01 | 90     | 90                 | 90
--  South  | Alice        | 2025-11-02 | 110    | 200                | 200
------------------------------------------------------------

-- ✅ Use ROWS for true row-by-row accumulation.
-- ✅ Use RANGE for value-based accumulation (e.g., per date).
-- ✅ Always include ORDER BY in the window clause.
-- ✅ "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW" 
--    defines the classic running total frame.



