# 2つのコンテナが通信するWordPress
### 1. Dockerネットワークの作成
```docker
C:\Users\yuki_ueno>docker network create wordpressnet
```

### 2. ボリュームの作成
```docker
C:\Users\yuki_ueno>docker volume create wordpress_db_volume
```

### 3. MySQLコンテナを起動
```docker
C:\Users\yuki_ueno>docker run --name wordpress-db -dit -v wordpress_db_volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=myrootpassword -e MYSQL_DATABASE=wordpressdb -e MYSQL_USER=wordpressuser -e MYSQL_PASSWORD=wordpresspass --net wordpressnet mysql:5.7
```

### 4. Wordpressコンテナを起動
```docker
C:\Users\yuki_ueno>docker run --name wordpress-app -dit -p 8080:80 -e WORDPRESS_DB_HOST=wordpress-db -e WORDPRESS_DB_NAME=wordpressdb -e WORDPRESS_DB_USER=wordpressuser -e WORDPRESS_DB_PASSWORD=wordpresspass --net wordpressnet wordpress
```

### 5. 動作確認と初期設定
http:localhost:8080/　でWordpressを開いて、言語を日本語に設定する。
* * *

# Docker Compose
## 1. Docker Composeの仕組み
あらかじめコンテナの起動方法やボリューム、ネットワークの構成などを描いた定義ファイルを用意しておき、  
その定義ファイルを読み込ませることで、まとめて実行できる方法。

## 2. Docker Composeが解決するもの
docker-compose.ymlという設定ファイルに集約できる。  
* 長い引数からの解放  
* 複数コンテナの連動(起動順序も指定可)
* まとめての停止・破棄
* コンテナ起動時の初期化やファイルコピー

## 3. Docker Composeの使い方
1-1. 作業用ディレクトリの作成  
1-2. docker-compose.ymlを作る  

## 4. docker-composeの操作
```docker
$ docker-compose [option] [command] [arguments]
```

```docker
C:\Users\yuki_ueno\myProject\Docker\第3回\wordpress>docker-compose up -d
Creating network "wordpress_wordpressnet" with the default driver
Creating volume "wordpress_wordpress_db_volume" with default driver
Creating wordpress_wordpress-db_1 ... done
Creating wordpress_wordpress-app_1 ... done
```

## 5. 起動の確認   
```docker
          Name                         Command               State          Ports
-----------------------------------------------------------------------------------------
wordpress_wordpress-app_1   docker-entrypoint.sh apach ...   Up      0.0.0.0:8080->80/tcp
wordpress_wordpress-db_1    docker-entrypoint.sh mysqld      Up      3306/tcp, 33060/tcp
``` 

docker-composeコマンドで起動した場合は、命名規則が異なる。  
```
作業ディレクトリ名_コンテナ名_1
```

## 6. コンテナの停止と破棄
```docker
C:\Users\yuki_ueno\myProject\Docker\第3回\wordpress>docker-compose down
Stopping wordpress_wordpress-app_1 ... done
Stopping wordpress_wordpress-db_1  ... done
Removing wordpress_wordpress-app_1 ... done
Removing wordpress_wordpress-db_1  ... done
Removing network wordpress_wordpressnet
```

## 7. 停止・破棄の注意点
起動時と停止時でdocker-compose.ymlファイルが異なる場合がある。