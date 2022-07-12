# ボリュームとMySQLコンテナの作成
## ボリュームを作成する
1. 作成
```docker
docker volume create --name [volume_name]
```
2. 確認
```docker
docker volume ls
```
```docker
C:\Users\yuki_ueno>docker volume create MySQLvolume
MySQLvolume

C:\Users\yuki_ueno>docker volume ls
DRIVER              VOLUME NAME
local               MySQLvolume
```

*column  
docker volume ls の結果として表示される「DRIVER」は、ボリュームを構成するドライバ。  
既定は「local」であり、Dockerホスト上のディスク上に作成される。*  

## ボリュームマウントしたコンテナを作成する
1. MySQL 5.7のコンテナを起動
    ```docker
    C:\Users\yuki_ueno>docker run --name db01 -dit -v MySQLvolume:/var/lib/mysql -e MYSQL_ROOT_PASSWARD=mypassword mysql:5.7
    ae7cfab5658c897f159678cbbb82c4ee640b6e57edf6e8f40545a6032f56ff76
    ```
    eオプションでrootユーザーのパスワードを設定

2. コンテナ作成を確認後、コンテナ内に入る
    ```docker
    C:\Users\yuki_ueno>docker ps
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                 NAMES
    a2c12e16ae08        mysql:5.7           "docker-entrypoint.s…"   3 seconds ago       Up 2 seconds        3306/tcp, 33060/tcp   db01

    C:\Users\yuki_ueno>docker exec -it db01 /bin/bash
    root@a2c12e16ae08:/#
    ```

# DBに書きこんだ内容が破棄されないことを確認する
 1. mysqlコマンドの実行
    ```docker
    root@a2c12e16ae08:/# mysql -p
    Enter password:
    Welcome to the MySQL monitor.  Commands end with ; or \g.
    Your MySQL connection id is 2
    Server version: 5.7.35 MySQL Community Server (GPL)

    Copyright (c) 2000, 2021, Oracle and/or its affiliates.

    Oracle is a registered trademark of Oracle Corporation and/or its
    affiliates. Other names may be trademarks of their respective
    owners.

    Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

    mysql>
    ```
    パスワードを入力するとmsgが出力され、プロンプトが「mysql >」になる。  
    →MySQLの操作ができるようになる

 2. DBを作成する  
    ```sql 
    mysql> CREATE DATABASE exampleDB;
    Query OK, 1 row affected (0.00 sec)
    ```

 3. テーブルの作成  
    ```sql 
    mysql> use exampleDB
    Database changed
    mysql> CREATE TABLE exampleTABLE(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY(id));
    Query OK, 0 rows affected (0.02 sec)
    ```

 4. データの挿入
    ```sql
    mysql> INSERT INTO exampleTABLE (name) VALUES ('user01');
    Query OK, 1 row affected (0.06 sec)

    mysql> INSERT INTO exampleTABLE (name) VALUES ('user02');
    Query OK, 1 row affected (0.05 sec)
    ```

 5. データの確認
    ```sql
    mysql> SELECT * FROM exampleTABLE;
    +----+--------+
    | id | name   |
    +----+--------+
    |  1 | user01 |
    |  2 | user02 |
    +----+--------+
    2 rows in set (0.00 sec)
    ```

 6. mysqlコマンドを終了してコンテナから出る
    ```sql
    mysql> \q
    Bye
    ```  
    ```docker
    root@a2c12e16ae08:/# exit
    exit

    C:\Users\yuki_ueno>
    ```

 7. コンテナ破棄後、マウントせずに新規作成して確認
    ```docker 
    C:\Users\yuki_ueno>docker stop db01
    db01
    C:\Users\yuki_ueno>docker rm db01
    db01

    C:\Users\yuki_ueno>docker ps -a
    CONTAINER ID        IMAGE                   COMMAND             CREATED             STATUS                      PORTS               NAMES

    C:\Users\yuki_ueno>docker run -dit --name db01 -e MYSQL_ROOT_PASSWORD=mypassword mysql:5.7
    9a412f1df8a073bd1f54d85f3a8ce31e2bcf207245db9b17b4dc993c15deec1b

    C:\Users\yuki_ueno>docker exec -it db01 /bin/bash
    ```
    ```sql
    root@9a412f1df8a0:/# mysql -p
    Enter password:
    Welcome to the MySQL monitor.  Commands end with ; or \g.
    Your MySQL connection id is 2
    Server version: 5.7.35 MySQL Community Server (GPL)

    Copyright (c) 2000, 2021, Oracle and/or its affiliates.

    Oracle is a registered trademark of Oracle Corporation and/or its
    affiliates. Other names may be trademarks of their respective
    owners.

    Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

    mysql> use exampledb
    ERROR 1049 (42000): Unknown database 'exampledb'
    ```

    そのようなDBはないというエラーになる。  

8. コンテナを破棄して**マウントした**新しいコンテナを作り確認する  

# mountオプションを使ったマウントの設定

```docker
--mount type=マウントの種類,src=マウント元,dst=マウント先
```

## --mountのほうが推奨される
* バインドマウントかボリュームマウントか分かりにくい  
    -vオプションではマウント元が「/」から始まるときはバインドマウント  
    そうでないときはボリュームマウントとなり、間違えやすい。

* ボリュームが存在しないときに新規作成される  
    docker volume createで先にボリュームを作っていないと、-vオプションで指定したとき、新規に作成される。  
    →タイプミスをした場合、致命的な問題につながる可能性がある。  

*column tmpfsマウント*  
    
```
    --tmpfs マウント先 
    
    --mount type=tmpfs,dst=マウント先
```
*ディスクではなくメモリーを特定のマウント先に指定するもの。  
メモリーディスクを利用することで読み書きを高速化する目的で使用する。(そのためマウント元の指定がない)  
tmpfsはメモリーのため揮発性=コンテナ破棄で破棄される。*