/* =========================================================
   🧩 POSTGRESQL UPDATE & DELETE — SUMMARY NOTES
   ========================================================= */

/* ---------------------------------------------------------
   🔹 UPDATE QUERY
   --------------------------------------------------------- */

/*
Syntax Skeleton:
*/
UPDATE target_table [AS alias]
SET column1 = expression1,
    column2 = expression2,
    ...
[FROM other_table1 [AS alias1], other_table2 [AS alias2], ...]
[WHERE condition]
[RETURNING columns];

/*
Key Points:
- UPDATE target_table → defines which table’s rows will be modified.
- SET → specifies new values for one or more columns.
- FROM → optional; allows joining with other tables to fetch update values.
- WHERE → optional; filters which rows are updated.
- RETURNING → optional; returns affected rows (PostgreSQL-only feature).
*/

/*
Example:
*/
UPDATE employees e
SET salary = s.new_salary
FROM salary_updates s
WHERE e.id = s.emp_id
RETURNING e.id, e.salary;

/*
Notes:
- You can’t use window functions directly in SET; use a CTE or subquery instead.
- UPDATE supports FROM natively (standard SQL allows it).
*/


/* ---------------------------------------------------------
   🔹 DELETE QUERY
   --------------------------------------------------------- */

/*
Syntax Skeleton:
*/
DELETE FROM target_table [AS alias]
[USING other_table1 [AS alias1], other_table2 [AS alias2], ...]
[WHERE condition]
[RETURNING columns];

/*
Key Points:
- DELETE FROM target_table → defines which table to delete rows from.
- USING → optional; allows referencing other tables for filtering.
- WHERE → optional; determines which rows to remove.
- RETURNING → optional; returns deleted rows (PostgreSQL-only).
*/

/*
Example:
*/
DELETE FROM employees e
USING terminated_list t
WHERE e.id = t.emp_id
RETURNING e.id;

/*
Notes:
- Standard SQL DELETE doesn’t have a FROM clause,
  so PostgreSQL adds USING to allow joins.
- DELETE removes rows; it doesn’t modify columns.
*/


/* ---------------------------------------------------------
   ⚖️ UPDATE vs DELETE — COMPARISON
   --------------------------------------------------------- */

/*
| Feature               | UPDATE                       | DELETE                        |
|------------------------|------------------------------|--------------------------------|
| Action                | Modifies data                | Removes data                   |
| Target specified by    | UPDATE table                 | DELETE FROM table              |
| Join helper tables     | FROM                         | USING                          |
| Filtering              | WHERE                        | WHERE                          |
| Returns affected rows  | RETURNING                    | RETURNING                      |
| SQL-standard join support | ✅ Yes                    | ❌ No (Postgres adds USING)    |
*/


/* ---------------------------------------------------------
   🧠 PRO TIPS
   --------------------------------------------------------- */

/*
- Always include a WHERE clause unless you intend to modify/delete all rows.
- Use RETURNING * to quickly inspect affected rows during testing.
- Combine with CTEs for complex logic (e.g., window functions, computed ranks).
- UPDATE + FROM is powerful for syncing data between tables.

Example using a CTE for window functions:
*/
WITH ranked AS (
  SELECT
    id,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
  FROM employees
)
UPDATE employees e
SET rank_in_dept = r.rnk
FROM ranked r
WHERE e.id = r.id;

/*
This pattern allows using window functions indirectly during updates.
*/

/* =========================================================
   END OF NOTES
   ========================================================= */
