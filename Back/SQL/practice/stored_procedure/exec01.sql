DELIMITER //
CREATE Procedure insert_sales_data()
begin
    DECLARE done INT DEFAULT 1;
    declare s_order_id, s_customer_id bigint;
    declare s_order_date;
    declare s_order_price, s_tax_price bigint;

    declare cur CURSOR for 
        SELECT 
            order_id, customer_id, order_date, order_price, tax_price 
        FROM
            order_data
    
    DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET done = 0;

    opne cur;

    
    while done do
        fetch cur INTO s_order_id, s_customer_id, s_order_date, s_order_price, s_tax_price;
        if done then
            INSERT INTO 
                seles_data(order_id, customer_id, sales_date, sales_price, tax_price)
            VALUES
                (s_order_id, s_customer_id, s_order_date, s_order_price, s_tax_price);
        end if;
    end while;

    close cur;
end;
//

DELIMITER ;
