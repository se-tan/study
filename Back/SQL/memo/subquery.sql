SELECT
    pcm.name as 商品区分名,
    pm.name as 商品名,
    pm.price as 単価
FROM
    product_master as pm
    inner join product_category_master as pcm
    on pm.category_id = pcm.category_id
WHERE
    pm.category_id in (
        SELECT
            pcm2.category_id
        FROM
            product_category_master as pcm2
        WHERE
            pcm2.name in ('文具', '書籍')
    );
