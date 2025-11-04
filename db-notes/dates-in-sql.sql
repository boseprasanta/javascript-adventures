SELECT *
FROM sales
WHERE status = 'paid'
  AND sales_date > NOW() - INTERVAL '7 days';


/*----------------------------------------------------------QUESTION: 2
(CTE + JOIN)
Create a CTE `rep_sales` that calculates total paid sales and number of paid orders per sales rep.
Then join it with the `sales` table to show all paid sales in the last 7 days,
including the rep's total sales and order count.
----------------------------------------------------------*/
JOIN rep_sales ON sales.rep_id = rep_sales.rep_id
WHERE sales.sales_date > DATE '2025-10-19' - INTERVAL '7 days'
  AND sales.status = 'paid';