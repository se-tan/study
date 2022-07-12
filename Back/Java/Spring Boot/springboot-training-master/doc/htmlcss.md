## HTML/CSS
ここでは、Webページを表示するために用いられているHTMLとCSSについて説明する。

### HTMLとは
HTML(HyperText Markup Language)とは、Webページを作成するために開発されたマークアップ言語である。
次にHTMLファイルの構造について説明する。

### HTMLファイルの構成
HTMLは、``<``と``>``を用いてタグを表現し、開始タグ``<>``と終了タグ``</>``で囲むことでWebページ上で表示する文字列の文書構造・体裁を表現する。
たとえば、開始タグが``<html>``であると終了タグは``<\html>``となる。HTMLファイルの一例を以下に示す。

```html
<html>
  <head>
    <meta charset="utf-8" />
    <title>HTMLページのタイトル(ブラウザのタブに表示される内容)</title>
    <link rel="stylesheet" type="test/css" href="main.css" />
    <script type="text/javascript" src="main.js" />
  </head>
  <body>
    <div class="main ui container">
      <h1>タイトル</h1>
      <h2>サブタイトル</h2>
      <p>本文</p>
    </div>
  </body>
</html>
```

HTMLファイルは、ドキュメント全体が``html``タグで囲まれており、その中に``head``タグと``body``タグでそれぞれ囲まれている。
``head``タグは、ファイルのヘッダー情報を記載する箇所であり、ファイルの文字コードやタイトル、後述で説明するCSSスタイルシートなどを指定する。
``body``タグは、このファイルのドキュメント本文を記載する箇所であり、Webブラウザ上に表示したい文書や画像、動画といったコンテンツを記述する。
ここでは、タイトルとサブタイトル、本文を表示させる記述をしており、タグの種類を``<h1>``, ``<h2>``と変えることで文字サイズを変更している。

タグには様々な種類が存在するが、ここではその一部分を紹介する。

### 基本的なタグとその意味

#### テキスト関連
|タグ名|概要|使用例|
|:---:|:---|:---|
|``<h1>``|見出し|``<h1>見出し</h1>``|
|``<p>``|1段落を表す|``<p>パラグラフ</p>``|
|``<font>``|フォントの種類・大きさ・色を指定する|``<font size="3" color="red">フォントサイズ3、色は赤</font>``|
|``<b>``|テキストを太字にする|``<b>太字のテキスト</b>``|
|``<i>``|テキストを斜体にする|``<i>斜体のテキスト</i>``|
|``<u>``|テキストに下線を引く|``<u>下線付きテキスト</u>``|
|``<br>``|改行する|``<br>``|
|``<a>``|他のページへのリンクを貼る|``<a href="http://www.google.co.jp/">Googleへのリンク</a>``|
|``<link>``|スタイルシートを参照する|``<link rel="stylesheet" href="style.css" type="text/css">``|

#### リスト
|タグ名|概要|使用例|
|:---:|:---|:---|
|``<ol>``|順序付きリストを表す。|使用例は下記を参照。|
|``<ul>``|順序なしリストを表す。|使用例は下記を参照。|
|``<li>``|リスト項目を表す。|使用例は下記を参照。|

```html
<ol>
  <li>リスト1</li>
  <li>リスト2</li>
  <li>リスト3</li>
</ol>

<ul>
  <li>リスト1</li>
  <li>リスト2</li>
  <li>リスト3</li>
</ul>
```

#### 表・レイアウト
|タグ名|概要|使用例|
|:---:|:---|:---|
|``<table>``|表を作成する|使用例は下記を参照。|
|``<thead>``|表の見出し行を定義する|使用例は下記を参照。|
|``<tbody>``|表のデータ行を定義する|使用例は下記を参照。|
|``<th>``|表の見出し行を作成する|使用例は下記を参照。|
|``<tr>``|表のデータ行を作成する|使用例は下記を参照。|
|``<td>``|表の1セルを作成する|使用例は下記を参照。|

```html
<table>
  <thead>
    <th>A</th>
    <th>B</th>
  </thead>
  <tbody>
    <tr>
      <td>A1</td><td>B1</td>
    </tr>
    <tr>
      <td>A2</td><td>B2</td>
    </tr>
  </tbody>
</table>
```

#### 入力フォーム
|タグ名|概要|使用例|
|:---:|:---|:---|
|``<form>``|入力フォームを作成する|使用例は下記を参照。|
|``<label>``|入力フォームのラベルを定義する|使用例は下記を参照。|
|``<input type="submit">``|入力内容の送信ボタンを定義する|使用例は下記を参照。|
|``<input type="text">``|入力欄を定義する|使用例は下記を参照。|
|``<input type="radio">``|ラジオボタンを定義する|使用例は下記を参照。|
|``<select>``, ``<option>``|セレクトボックスを定義する。|使用例は下記を参照。|

```html
<form>
  <label>名前</label>
  <input name="name" type="text" value="" />
  <br>
  <label>性別</label>
  <input name="sex" type="radio" value="1">男</input>
  <input name="sex" type="radio" value="2">女</input>
  <br>
  <label>続柄</label>
  <select>
    <option>父</option>
    <option>母</option>
    <option>子</option>
    <option>祖父</option>
    <option>祖母</option>
  </select>
</from>
```

#### ブロック
|タグ名|概要|使用例|
|:---:|:---|:---|
|``<div>``|複数のHTMLタグを1つのブロックとして表現するために利用する|使用例は下記を参照。|
|``<span>``|複数のHTMLタグを1つの要素としてまとめるために利用する|-|

```html
<div class="field">
  <label>名前</label>
  <input name="name" type="text" value="" />
</div>
```

#### コメント
|タグ名|概要|使用例|
|:---:|:---|:---|
|``<!-- -->``|Webページ上には表示しないコメントを記述する|使用例は下記を参照。|

```html
<!-- 以下は、名前入力欄 -->
<div class="field">
  <label>名前</label>
  <input name="name" type="text" value="" />
</div>
```

#### スクリプト
|タグ名|概要|使用例|
|:---:|:---|:---|
|``<script>``|JavaScriptを読み込ませるときに利用する。|使用例は下記を参照。|

#### スタイルシート
|タグ名|概要|使用例|
|:---:|:---|:---|
|``<style>``|CSSスタイルシートを読み込ませるときに利用する。|使用例は下記を参照。|

```html
<html>
  <head>
    <title>CSSテスト</title>
    <script src="./script.js" />
    <link rel="stylesheet" href="./stylesheet.css" >
  </head>
    <h1>タイトル</h1>
    <p class="title">CSSテスト</p>
  <body>
  </body>
</html>
```

### CSSとは
CSS(Cascading Style Sheet)とは、HTMLの表示・デザインを示すための記述である。

HTMLで文字の大きさや色、背景色など全てのデザインを指定していたが、デザインを凝ったものにするとHTMLが複雑化する、また限界があったため、デザインのみを指定できるCSSが登場した。

以下に簡単なCSSの例を示す。

**HTMLとCSSの例**

index.html
```html
<html>
  <head>
    <title>CSSテスト</title>
    <link rel="stylesheet" href="./stylesheet.css" >
  </head>
    <h1>タイトル</h1>
    <p class="title">CSSテスト</p>
  <body>
  </body>
</html>
```

stylesheet.css
```css
h1 {
    font-size: 24px;
    color: yellow;
}

.title {
    font-size: 14px;
    color: blue;
}
```

ここでは、``<link>``タグでCSSスタイルシートを指定している。CSSにおけるスタイルの適用には2種類あり、タグ名でデザインを指定する方法とタグ名に関わらずCSSクラスを設定してデザインを指定する方法がある。

タグ名でデザインを指定する方法について説明する。
stylesheet.cssの``h1``はタグ名を表しており、index.html内の``<h1>``タグには全てこのスタイルが適用される。ここでは、フォントサイズを24px, 色を黄色に指定している。タイトルという文字が24px, 黄色で表示されることになる。

続いて、CSSクラスを設定してデザインを指定する方法について説明する。
この方法は、stylesheet.cssに独自のCSSクラスを設定し、そのCSSクラスをindex.htmlで指定するという方法である。
例えば、stylesheet.cssの``title``クラスにて、フォントサイズを14px, 色を青色に指定している。この``title``クラスをindex.html内の``<p class="title">``タグに指定することで、CSSテストという文字が14px, 青色で表示されることになる。

タグ共通でデザインを指定することもできれば、同じデザインをCSSクラスで別々のタグに指定することもできる。

本課題では既存のCSSを利用するため、独自にCSSを記述することはないが、CSSクラスを指定してデザインを適用させる。次にSemantic UIで用いるCSSクラスについて説明する。

### Semantic UIにおけるCSSクラスの指定の仕方
ここでは、簡単にSemantic UIで用いるCSSクラスの意味を説明する。基本的にはCSSクラスの組み合わせで構成されている。本課題で利用されている主なCSSクラスは以下の通り。カッコ内に利用画面を記述。

- ``ui main cotainer``(全画面)
    - Web上に表示する部分を表す。
- ``ui form``(登録画面)
    - 入力フォームのデザインを適用することを表す。入力項目は、``ui field``で表す。

- ``ui primary button``(登録画面)
    - ボタンデザインを適用する。``primary``は色を表しており、他にも``secondary``や``positive``などがある。

- ``ui selectable striped table``(一覧画面)
    - テーブルデザインを適用する。
    - ``striped``を指定することで奇数行と偶数行で背景色を変える。
    - ``selectable``を指定することでマウスホバーで背景色が変わるように指定。

- ``ui fluid action left icon input``(一覧画面)
    - ``fluid``は流動的という意味を持ち、相対的に位置を指定できる。この場合は左側(``left``)にアイコン(``icon``)を表示するということを表す。

詳細については、[こちら](https://semantic-ui.com)を参照して欲しい。

