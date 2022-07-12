# ■ ウィンドウ関数(OLAP関数)
Online Analystical Processingの略で、DBを使用してリアルタイムにデータ分析を行う処理のこと。

例として、市場分析/財務諸表作成・計画作成など

## -- 構文  
```sql
<ウィンドウ関数> OVER ([PARTITION BY <列リスト>]
                            ORDER BY <ソート用列リスト>)
```

## -- ウィンドウ関数として使える関数
- 集約関数(SUM, AVG, COUNT, MAX, MIN)をウィンドウ関数として使用する
- RANK, DENSE_RANK, ROW_NUMBERなどの***ウィンドウ専用関数***


# ■ 使用方法
## -- PARTITION BY
順位をつける対象の範囲を設定する。都道府県別、カテゴリー別など

## -- ORDER BY
どのカラムを、どんな順序で順位をつけるかを決める。