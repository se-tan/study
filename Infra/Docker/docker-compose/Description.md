# Over-View

## ■ What is docker-compose ?

複数のコンテナから成るサービスを構築・実行する手順を自動的に行ない、管理を容易にする機能。

***dockerfile*** と呼ばれるファイルを用意してコマンドを実行することで、そのファイルから設定を読み込んで全てのコンテナサービスを起動できる。

***

## ■ How to Use

### **1. Dockerfile を用意する**

dockerfile は、Docker-Image を作成するための手順書にあたる。

<br> 

### **2. docker-compose.yml を作成する**

docker-compose.yml は、それぞれ独立したコンテナの起動定義を行なう。

<br>

### **3. `docker-compose up` コマンドを実行する**
