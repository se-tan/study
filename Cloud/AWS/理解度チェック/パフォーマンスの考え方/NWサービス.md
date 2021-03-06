## Amazon CloudFront
CDN(Content Delivery Network)サービス。配信拠点は世界中にあり、ユーザーのアクセス地点から最も近い拠点からコンテンツが配信される。

1. 閲覧者がコンテンツにアクセスすると、閲覧者から最も近いエッジロケーションに接続される。該当コンテンツのデータがキャッシュされていればそのデータを返す
2. リージョン別エッジキャッシュにデータを取得しに行く。該当コンテンツがキャッシュされていればそのデータを返す
3. リージョン別エッジロケーションにキャッシュがなければ、CloudFrontにデータを取得しに行く
4. CloudFrontは、コンテンツの元データが格納されているオリジンサーバーからデータを取得して返す

### 1. CloudFrontで配信するコンテンツの保護
- HTTP接続
- 特定ユーザーや特定地域のユーザーだけがコンテンツを閲覧できるアクセス制限
- 通信中のデータを暗号化するためのフィールドレベル暗号化

>*フィールドレベル暗号化*  
機密度の高いデータのセキュリティを確保するため、CloudFrontに追加された機能。  
機密度が特に高い一部情報にユーザー自身が固有の暗号化鍵を設定し、その鍵を使用してデータを暗号化する。  
この暗号化鍵を使用すると、リスエストがオリジンサーバーに転送される前に、HTTPS通信においてデータがさらに暗号化される。

### 2. S3コンテンツへのアクセスを制限した通信
OAI(Origin Access Identity)という機能を使用することで、CloudFrontのみにS3バケットへのアクセスを許可し、コンテンツ取得を可能にし、  
ユーザーはCloudFrontのみアクセスを許可するといった構成にできる。

***
## Lambda@Edge
CloudFrontのエッジロケーション上でLambdaプログラムを実行するサービス。  
Lambda関数はユーザーに近いロケーションで実行されるため、通常のLambdaより高性能

***
## Amazon Route53
### レイテンシベースルーティング
レイテンシーが低いリージョンからリクエストを処理する機能。

***
## プレイスメントグループ
EC2インスタンスを論理的にグループ化したもの。

### 1. クラスタープレイスメントグループ
単一AZ内のEC2インスタンスを論理的にグループ化するが、**すべて同じラックに格納**される。  
***低レイテンシーかつ高スループットなNWが求められるAppの用途に適している***

### 2. パーティションプレイスメントグループ
EC2インスタンスのグループを「パーティション」単位のセグメントに分けたもの。  
パーティション単位でラックが分かれており、それぞれ独自にNWと電源を備えている。耐障害性に優れており、分散処理環境をデプロイできるようになっているので、  
EC2を利用したHadoopなどの大規模分散ワークロードが実現できる。

### 3. スプレッドプレイスメントグループ
EC2インスタンスがそれぞれ個別にNWと電源を備えたラックに配置される。

離れたAzにも配置可能な為、システム全体が障害影響を受けるリスクを軽減できる。