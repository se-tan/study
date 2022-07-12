## SpringBootアプリケーションのDocker Image化

本書籍管理システムのリリースをDockerへ行ってみましょう。  
SpringBoot2.3.0よりDockerでのビルドがサポートされました。  
Gradleの機能のbootBuildImageを利用することで、SpringBootの起動に特化したDocker Imageをベースに、  
アプリケーション向けのカスタムImageを作成出来ます。  

詳細の情報は「Spring Boot Gradle プラグインリファレンスガイド」の [5. OCI イメージのパッケージ化](https://spring.pleiades.io/spring-boot/docs/current/gradle-plugin/reference/htmlsingle/#build-image)に掲載されています。参考にしてみてください  


### イメージの作成
コマンドプロンプト等のコンソールを利用し、プロジェクトファイル(gradlew.batが存在する場所)で下記コマンドを実行します。  
`./gradlew.bat bootBuildImage`  

※プロジェクトのビルド(jarファイル作成)から、イメージの作成までを実行できます。  

Imageの作成が完了したら、docker imagesコマンドを実行し、下記イメージが作成されているか確認してください。  

```
docker images

REPOSITORY                 TAG              IMAGE ID       CREATED         SIZE
springboot-training-book   0.0.1-SNAPSHOT   d6f76b7df0f1   41 years ago    292MB
```

### コンテナの実行

上記で作成したImageを元に、Dockerコンテナを実行してみましょう。  
`docker run --name book -itd -p 8080:8080 springboot-training-book:0.0.1-SNAPSHOT /bin/bash`  

■実行結果

```
ad23e79fce50   springboot-training-book:0.0.1-SNAPSHOT   "/cnb/process/web /b…"   2 weeks ago      Up 2 weeks ago   0.0.0.0:8080->8080/tcp                         book
```

### 動作確認
ブラウザでhttp://{dockerのホストIP}:8080/app/top へアクセスし、書籍管理システムの画面が表示される事を確認してみましょう。  

以上で、SpringBootアプリケーションのDocker上でのリリースは完了です。  
