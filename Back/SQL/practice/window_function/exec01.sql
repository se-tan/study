SELECT
  mail_number,
  prefect,
  COUNT(*) OVER (partition by prefect) as 'count'
FROM
  customer_master
ORDER BY
  mail_number
;