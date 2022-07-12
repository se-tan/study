start transaction;

CREATE Table trade_master(
    trade_id BIGINT not NULL AUTO_INCREMENT COMMENT '取引先ID',
    name VARCHAR(256) COMMENT '取引先名',
    mail_number VARCHAR(8) COMMENT '郵便番号',
    prefect VARCHAR(10) COMMENT '都道府県',
    city VARCHAR(10) COMMENT '市区町村',
    address VARCHAR(10) COMMENT '番地',
    update_date TIMESTAMP COMMENT '更新日時',
    PRIMARY KEY(trade_id)
) COMMENT '取引先マスタ' ;

INSERT INTO trade_master(
    name, mail_number, prefect, city, address, update_date
) VALUES 
    ('東海出版', '234-4567', '東京都', '港区赤坂', '1-1-1', '2018/04/05 10:32:02'),
    ('フジタ商業', '680-0041', '鳥取県', '鳥取市', '47', '2018/05/23 17:23:12'),
    ('横山物流', '386-0032', '長野県', '上田市', '39-10', '2017/11/16 22:34:24'),
    ('アーバンライフ物産', '332-0075', '栃木県', '鹿沼市', '9-5', '2016/12/12 18:22:17')
;
COMMIT;