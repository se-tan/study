# Description

## ■ What's Webpack ?

webpack とはウェブコンテンツを構成するファイルをまとめてしまうツール。

一番多い使い方は、複数の JavaScript を 1 つにまとめること。複数の JavaScript をまとめるのは、いろんな利点がある。

### **- 転送の最適化**

HTTP/1.1 接続ではブラウザとウェブサーバーの同時接続数が限られるため、複数のファイルの転送に時間がかかる。

複数の JS ファイルを 1 つにまとめてしまうことが一般的な解決案として知られている。

### **- モジュールが使用できる**

複数の JS ファイルを 1 つにまとめるだけなら他のツールでもできるが、  
webpack の場合は標準仕様の ES Modules が使えたり、node_modules のモジュールを結合できるといったメリットがある。

標準の ES Modules を使うと変数の競合やグローバル汚染を防げるので開発時の安全性が高まる。

さらには、コードの可読性が上がり、開発作業の分担やテストがしやすくなり、再利用性や保守性があがる。

### **- JS だけでなく CSS や画像もバンドルできる**

### **- 包括的な開発環境が整う**

JS ファイルの圧縮やソースマップに対応していたり、ローカルサーバーの起動まで包括的な制作環境としての機能がある。

タスクランナーの Gulp や npm scripts だけでは、ツールの組み合わせが無限。

設定ファイルが煩雑化しがちだが、webpack であれば、ツールを揃えられます。

---

## ■ JS ファイルをまとめる手順

### **- 今の時代はモジュール方式で JavaScript を書くのが当たり前**

1 つの JavaScript ファイルに長い処理を書くと、可読性が低下する。これを解決するには複数ファイルへ分割すること。

機能ごとに分割された JavaScript ファイルのことを一般的に「モジュール」と呼ぶ。

---

## ■ Customize package.json

[package.json](https://xonor-gitlab.xon.jp:10443/yuki_ueno/myProject/blob/master/Web_techs/Webpack/package.json)

`npx webpack`コマンドでビルドするのもシンプルだが、実際は`npm scripts`を使う方が便利。

`npm scripts`とはコマンドのショートカット（エイリアス）を貼るための機能。package.json ファイルの scripts には、webpack のビルドコマンドを追加する。

---

## ■ Customize webpack.config.js

webpack.config.js ファイルを用意することで、webpack の挙動を調整できる。

よく使用する設定として、エントリーポイントを指定する `entry` と、  
出力フォルダーをカスタマイズする `output` がある。
