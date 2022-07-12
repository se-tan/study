SELECT
    cm.customer_id as 顧客ID,
    cm.name as 氏名,
    pm.name as 商品名,
    pm.category_id as 区分
FROM
    customer_master as cm
    inner join sales_data as sd
    on cm.customer_id = sd.customer_id
    inner join sales_detail_data as sdd
    on sd.sales_id = sdd.sales_id
    inner join product_master as pm
    on sdd.product_id = pm.product_id
WHERE
    pm.category_id in (
        SELECT
            pcm.category_id
        FROM
            product_category_master as pcm
        WHERE
            pcm.name = '書籍'
    );