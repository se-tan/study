# docker-compose.ymlの書き方

docker-compose.ymlでは以下3つを定義する。

## 1. サービス
全体を構成する1つひとつのコンテナのこと。サービス=コンテナでほぼ問題なし。

## 2. ネットワーク
サービスが参加するネットワークを定義する。

## 3. ボリューム
サービスが利用するボリュームを定義する。
***
これらの設定をインテンドしたブロック単位で記述する。

```yml
version: "3"

services:
  wordpress-db:
    image: mysql:5.7
    networks:
      - wordpressnet
    volumes:
      - wordpress_db_volume:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: myrootpassword
      MYSQL_DATABASE: wordpressdb
      MYSQL_USER: wordpressuser
      MYSQL_PASSWORD: wordpresspass
  
  wordpress-app:
    depends_on:
      - wordpress-db
    image: wordpress
    networks:
      - wordpressnet
    ports:
      - 8080:80
    restart: always
    environment:
      WORDPRESS_DB_HOST: wordpress-db
      WORDPRESS_DB_NAME: wordpressdb
      WORDPRESS_DB_USER: wordpressuser
      WORDPRESS_DB_PASSWORD: wordpresspass

networks:
  wordpressnet:

volumes:
  wordpress_db_volume:
```

*column YMAL形式について*  
* 設定の書き方：「設定値:値」のようにコロン区切りで記述する。  
* 文字列の指定：「'」か「"」で囲む  
* 複数値の書き方：「- 設定値」のようにハイフン区切りで記述する。
* コメントアウト：「#」で行末までがコメントになる。　　
***
## バージョン番号(version)
書式のバージョン番号を記述する。docker-compose.ymlのverによって書き方が異なるため。

## サービス(services)
サービス、すなわちコンテナごとの定義を記述する。
* depends_on：起動順序を定義する
* image：どのイメージから起動するのか
* networks：どのネットワークに接続するのか
* volumes：どのボリュームをどのディレクトリにマウントするのか
* restart：起動失敗時の再起動設定(再起動時は徐々に待ち時間が長くなる)
* environment(環境変数)