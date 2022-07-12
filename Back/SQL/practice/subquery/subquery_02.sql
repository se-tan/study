SELECT
    cm.name as 顧客名
FROM
    sales_data as sd
    INNER JOIN sales_detail_data as sdd
        ON sd.sales_id = sdd.sales_id
    INNER JOIN customer_master as cm
        ON sd.customer_id = cm.customer_id
    INNER JOIN product_master as pm
        ON sdd.product_id = pm.product_id
WHERE
    pm.name = 'ラック'
    AND sd.customer_id in (
        SELECT
            cm2.customer_id
        FROM
            sales_data as sd2
            INNER JOIN sales_detail_data as sdd2
                ON sd2.sales_id = sdd2.sales_id
            INNER JOIN customer_master as cm2
                ON sd2.customer_id = cm2.customer_id
            INNER JOIN product_master as pm2
                ON sdd2.product_id = pm2.product_id
        WHERE
            pm2.name = '糊'
    );