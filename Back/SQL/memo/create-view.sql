CREATE View book_products as
select
    pm.product_id,
    pcm.name as product_category_name,
    pm.name as product_master_name,
    pm.price
from
    product_master as pm
inner join product_category_master as pcm
on pm.category_id = pcm.category_id
where
    pcm.category_id = 3
;