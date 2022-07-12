start transaction;
UPDATE
  trade_master
SET
  name = 'シマムラ商事',
  update_date = NOW()
WHERE
  trade_id = 2;
UPDATE
  trade_master
SET
  mail_number = '910-0124',
  prefect = '福井県',
  city = '福井市',
  update_date = NOW()
WHERE
  trade_id = 4;
COMMIT;