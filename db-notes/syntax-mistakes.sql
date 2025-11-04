-- Question: 
-- (CTE ladder) Build two CTEs: paid_recent (all paid rows in the last 30 days from '2025-10-19')
-- and category_totals (sum per product_category from paid_recent). Select categories with total > 200.

-- Syntax
-- for multiple CTEs you don't need multiple WITH
-- just use , coma separation
-- Date syntax DATE '2025-10-19' - INTERVAL '30 days'


WITH paid_recent AS (
	SELECT * from sales
	where status = 'paid' AND sales_date > DATE '2025-10-19' - INTERVAL '30 days'
),

category_totals AS (
	SELECT product_category, sum(amount) as categroy_sum
	from paid_recent
	GROUP BY product_category
)

select product_category from category_totals
where categroy_sum > 200;

🧠 What Are Window Functions?

-- A window function performs a calculation across a set of table 
-- rows that are somehow related to the current row — without collapsing rows into groups (unlike GROUP BY).

-- They are often used for:
-- Ranking rows (RANK(), ROW_NUMBER())
-- Running totals and moving averages
-- Percentiles
-- Accessing previous or next rows’ values

-- VVI
-- no , before from <table_name>
-- ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW

-- Function	Ties	Next Rank
-- RANK()	Tied rows share the same rank	Skips the next number(s)
-- DENSE_RANK()	Tied rows share the same rank	No gaps — continues sequentially



--- ITS ROWS 