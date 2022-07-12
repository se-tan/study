CREATE View sales_by_customer as
select 
    od.customer_id as 顧客ID,
    cm.name as 顧客名,
    sum(pm.price * odd.amount) as 受注累積金額,
    round(sum(pm.price * odd.amount) * 8 /108) as 消費税額
from
    order_data as od
    inner join order_detail_data as odd
    on od.order_id = odd.order_id
    inner join product_master as pm
    on odd.product_id = pm.product_id
    inner join customer_master as cm
    on od.customer_id = cm.customer_id
group by od.customer_id
;