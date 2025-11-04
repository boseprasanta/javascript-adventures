/* ----------------------------------------------------------
QUESTION: 1
(Window + CTE)
Create a CTE `sales_with_rank` that ranks rows per region by
amount (highest first) using ROW_NUMBER(). Show the top 2
sales per region.
---------------------------------------------------------- */

WITH sales_with_rank AS (
  SELECT *,
         ROW_NUMBER() OVER (
           PARTITION BY region
           ORDER BY amount DESC
         ) AS region_rank
  FROM sales
  WHERE status = 'paid'
)
SELECT *
FROM sales_with_rank
WHERE region_rank IN (1, 2);

/* ----------------------------------------------------------
✅ EXPLANATION:
1️⃣ The CTE `sales_with_rank` temporarily stores each sale with
   its rank per region.

2️⃣ The window function:
       ROW_NUMBER() OVER (
         PARTITION BY region
         ORDER BY amount DESC
       )
   assigns unique ranks starting from 1 in each region group.

3️⃣ The main query filters for the top 2 ranked rows per region.

----------------------------------------------------------
⚠️ GOTCHAS:
- Using RANK() instead of ROW_NUMBER() will allow ties:
  if two sales have the same amount, they’ll both be rank 1.
  → You might get more than 2 rows per region!

- Using DENSE_RANK() avoids gaps (1,1,2,3), but still allows
  ties like RANK().

- Always filter *after* ranking (outside the CTE or subquery),
  never inside the window function definition.
---------------------------------------------------------- */


/*
📊 Example 3: Compare Different Frame Clauses
Frame Clause	Meaning	Example effect (for row 3)
ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW	All previous + current	Running total (100 + 200 + 300)
ROWS BETWEEN 1 PRECEDING AND CURRENT ROW	Current + 1 previous	200 + 300 = 500
ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING	Current + all after	300 + 400 + …
ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING	1 before, current, 1 after	Sliding 3-row window
*/