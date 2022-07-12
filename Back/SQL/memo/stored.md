# ■ ストアドプロシージャ
DBシステムに一連の処理をプロシージャとして保存し、何時でも利用可能にする仕組み。

## メリット
- 問い合わせるSQLの数を減らせる
- 構文解析を実施するための処理時間を短縮できる

# ■ 構文
```sql
CREATE PROCEDURE [関数名]()
BEGIN
    [処理内容]
END;
```

### 例：
```sql
delimiter //
CREATE PROCEDURE select_sales_data()
BEGIN
    SELECT * FROM sales_data;
END;
//
delimiter ;
```

>delimiter  
区切り文字のことで、初期設定では「;」となっている。
「;」が入力後改行したタイミングでSQLが実行される。