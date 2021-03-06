# Solution

「最小限の手間で、すぐに使えるサービス」のことをソリューションという。

***

## ■ IoT

### - **IoT Central**

IoTアプリケーションを開発、管理、保守するためのSaaSを提供する。

登録したアプリケーションは、テレメトリー(計測データ)を受信し、IoTデバイスの管理を行うことができる。

また、IoTデバイス側からアプリケーションに接続し、あらかじめ作成しておいたプログラムを実行することも可能。

<br>

### - **Azure IoT Hub**

IoTアプリケーションと管理対象の数百万に及ぶIoTデバイス間の双方向通信のためのハブとして機能するPaaSに該当するサービス。

<br>

### - **Azure Sphere**

IoT機器のセキュリティ強化のためのソリューションで、制御用ハードウェア、LinuxOS、クラウドベースのセキュリティサービスで構成される。

***

## ■ ビッグデータと分析

### - **Azure HDInsight**

オープンソースのビッグデータ分析システムApache HadoopのMicrosoftによる実装。

保存データを一気に処理するバッチ処理タイプ。

<br>

### - **Azure Databricks**

オープンソースのビッグデータ分析システムApache SparkのMicrosoftによる実装。

メモリ上で操作することで高速なリアルタイム処理が可能。  
ただし、HDInsightと比較して、高価になりやすく、障害発生時の回復性も遅い。

***

## ■ 人工知能：AI

IoTから入手した大量のデータは、IoT Centralなどを通じてデータレイクストレージに保存され、HDInsightなどで解析し、現状の分析に利用されるのが一般的だが、AIサービスの活用により、より高度な分析を行なったり将来予測を導き出すことができる。

<br>

### - **Azure Machine Learning service**

機械開発モデルの開発、トレーニング、テスト、デプロイ、管理、追跡に使用できる機械学習アプリケーション開発環境。  
機械学習モデルの生成とチューニングを自動的に行なえる。

- ***Azure Machine Learningスタジオ***  
  Azure Machine Learningが提供するWebポータルサイト。  
  データとプログラムを簡単なマウス操作で結びつけることで、簡単に機械学習アプリケーションを構成できる。

これらで作成したモデルは、ローカルであっても、Azureにスケールアウトし、Dockerなどのコンテナに展開可能。

<br>

### - **Cognitive Services**

AIやデータサイエンスの詳細な知識がなくとも、AIアプリケーションを構築するための***APIを提供するサービス(PaaS)***。

- 視覚：画像認識
- 音声：音声認識
- 言語：自然言語処理や翻訳
- 検索：画像や文字の検索
- 決定：異常検出やアドバイス

<br>

### - **Azure Bot Service**

音声やテキストベースの対話プログラム(チャットボット)を構築するためのPaaS。

よくある使い方は、Cognitive Servicesでテキストや音声入力されたデータを処理し、内容をMachine Learningによって自動学習させる。

***

## ■ サーバーレスコンピューティング

### - **Azure App Service**

≒Amazon Elastic Beanstalk(Azure VMのPaaS版)

インフラストラクチャを管理することなく、任意のプログラミング言語でWebアプリケーション、モバイルバックエンド、およびRESTful APIを構築し、ホストできる。

自動スケールと高可用性が実現されるほか、WindowsとLinuxの両方がサポートされており、GitHub、Azure DevOps、または任意のGitリポジトリからの自動デプロイが可能になる。

***WebApps + Functions + Logic Apps***のような感じ。

VMのサイズと稼働時間で課金されるため、一般的にはIaaSに近いサービス。

<br>

### - **Azure Function**

プログラムを実行した分だけ課金されるサーバーレス関数アプリ(≒AWS Lambda)。

- 消費量プラン  
  登録した関数の純粋な**実行時間と回数で課金**

- App Serviceプラン  
  内部でApp Serviceが利用され、**稼働時間で課金**  
  常時起動している場合や、起動停止を繰り返す場合に適している

<br>

### - **Azure Logic Apps**

様々なアプリケーションやサービスを統合し、タスクやワークフローを自動化できるサービス(≒AWS Step Functions)。

アプリケーション間の接続サービスを提供するため、クラウドやオンプレミスで実行されるアプリケーションやシステムの統合に便利なうえ、実行時のみの従量課金なのでコスト最適化ができる。

<br>

### - **Azure Event Grid**

特定のAzureサービスのイベントを検知し、 Webhookで別のサービスに通知を行うアプリケーション。

**どんな処理が後に控えているかまでは見ないで別アプリケーションに転送するので、**  
**どんなメッセージを受け取ったか確認するService Busと連携させて、受信側がキューからデータを削除させるようにする。**

***

## ■ DevOps

ソフトウェアの開発担当と導入・運用担当が密接に協力する体制を構築し、ソフトウェアの配信から、継続的な更新を迅速に実現することを目的とした概念。

<br>

### - **Azure DevOps Services**

アプリケーション開発をサポートするツール群を提供する統合サービス。

アプリケーションの「継続的インテグレーション(CI)/継続的デリバリー(CD)」を実現して、  
配信(アプリケーションの展開)やパイプライン(ソースコードから最終成果物に至るまでの一連の流れ)の作成、ビルド(構築)、リリース(提供)が行える。

<br>

### - **Azure DevTest Labs**

開発者とテスト担当者が、Azure上にWindowsやLinuxVM、およびPaaSサービスを組み合わせてソフトウェアの環境を作成する仕組みで、作成された環境は作成者自身で管理可能。

WindowsやLinuxの開発とテストの架橋を自動的に展開できる。