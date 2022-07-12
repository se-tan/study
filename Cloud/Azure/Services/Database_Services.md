# Database services

## ■ Azure Cosmos DB

NoSQL型のDBで、世界中のリージョンに分散可能なサービス。MongoDBやCassandra、Gremlinとの互換機能がある。

指定した世界中のリージョンにDBを分散展開し、データはリージョン間で自動的に複製される。  
複製はリージョン間で双方向に行われ、どのリージョンが停止してもサービスは停止しない。

Cosmos DBは、読み書き両方の処理に対し、99.999%の可用性を実現する。

- ***マルチマスター***：複製されたDBに対しても書き込み可能
- ***シングルマスター***：書き込み可能なDBが1つしかないこと

***

## ■ Azure Datebase Services

PaaSとして提供されるマネージドデータベースで、PostgerSQLとMySQLがある。  
VMの保守が不要のため、管理コスト削減が可能。

また、組み込みの高可用性機能や、自動監視や脅威検出によるセキュリティ機能、パフォーマンス向上のための自動チューニング機能を利用できる。

***

## ■ Azure SQL Database

SQL Serverと互換性のあるRDS。パフォーマンス、信頼性に優れ、組み込みのセキュリティ保護機能が利用できる。

***

## ■ Azure SQL Managed Instance

SQL Databaseは、標準のSQL Serverと互換性の内部部分がある(CLR機能がないなど)。

>Tips：CLR(Common Language Runtime)  
.NET Framework上で、アプリケーションやサービスを動作させるための実行エンジン。  
コードの実行を管理し、アプリケーションに対してさまざまなサービスを提供する。Javaで言うところのJava仮想マシン(JVM)に相当する。

Managed Instaceは、内部的にはAzure上のVMだが、すべてAzureが管理してくれる。  
その代わり、SQL Databaseよりは高価になる。

***

## ■ Azure Synapse Analytics (旧称: Azure SQL Data Warehouse)

エンタープライズ向けのクラウドデータウェアハウスサービス。

大量のデータ(数PB)から目的のデータをクエリにより抽出できる。自動スケーリングによる高い弾力性がある。

ビッグデータを取り込み、超並列処理(Massively Parallel Processor:MPP)機能を使用して、高速な分析を実行する。

RDBの拡張機能として提供されており、T-SQL言語を拡張したPolyBaseT-SQLを使う。

***

## ■ Azure Marketplace

MicrosoftやAzureでサービスやソリューションを提供する独立系ソフトウェアベンダー(ISV)がエンドユーザーに提供するサービスを公開するためのサービス。

Microsoftが認定したアプリケーションやサービスの検索、試行、購入、プロビジョニングを行うことができる。