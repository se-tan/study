# Fundamental of Sass

## ■ What's Sass (Syntactically Awesome Style Sheets) ?

- CSS を拡張した言語で、効率よく CSS を作成できる。

- 「.scss」、または「.sass」という拡張子のファイルに記述する。(.scss が主流らしい)

- 「.scss」、または「.sass」をコンパイルすることで、css ファイルが作成される。

---

## ■ Comment

コメントは以下で記述する。

- 1 行コメント : `//`  
  CSS では 1 行コメントは使用できないため、コンパイルすると 1 行コメントは削除される。

- 複数行コメント : `/* ... */`  
  拡張機能でコンパイルのフォーマットを「compressed」に設定すると複数行コメントは削除される。「compressed」の場合でもコメントが削除されないようにするには、`/*! ... */`で記述する。

- コメントに日本語を含める場合、ファイルの先頭に`@charset` で utf-8 を指定する。

---

## ■ Nest

- 入れ子でスタイルを記述することができる

- `&`で親のセレクタに参照できる

```scss
@charset "utf-8"
.container {
  h1 {
    color: red;

    @media screen and (max-width: 800px) {
      font-size: 12px;
  }
  p {
    color: blue;
  }
  a {
    color: red;

    // コンパイル時に「a:hover」と解釈される。
    &:hover {
        // 下線を消す。
        text-decoration: none;
    }
  }
}
```

---

## ■ Variable

- 変数を用意し、必要に応じて格納したデータを使用することができる

- 変数名の先頭は`$`で始め、`:`で区切って値を記述する

- 変数名は英数字以外に、`_`や`-`が使用できる

- `_`や`-`は互換性があるため、`$default-color`は`$default_color`でも参照できる

```scss
$default-color: blue;
$warning_color: yellow;

body {
  color: $default-color;

  h1 {
    color: $warning_color;
  }
}
```

### **- Scope of variable**

変数には有効範囲があり、変数を記述する場所によって変わる。

- トップレベルで定義されたグローバル変数 : ファイルの中でどこでも有効である

- 波括弧の中で定義されたローカル変数 : 定義された{}の中で有効である。

ただし、`!global` フラグを付与するとその限りではない。

```scss
$default-color: blue;

body {
  color: $default-color;
}
.container {
  $warning_color: yellow;

  h1 {
    color: $warning_color;
  }
}
footer {
  // invalid ref.(error)
  color: $warning_color;
}
```

---

## ■ Type

- Number：数値 -> 整数、単位、浮動小数点など数が値になるもの。(px,em などの単位も含まれる)

- String：文字列 -> ""や''で囲まれたもの。

- Color：色（カラーコード） -> カラーネームや HEX , rgb() , rgba()など。

- Boolean：真偽値 -> true, false

- Null：空の値 -> Null の場合、プロパティを書き出さないよう仕組みとなっている。

- List：リスト（配列） -> 値をカンマやスペース、カッコで区切ったものです。入れ子にすることで多次元配列も作成可能。(ex. `$num :1, 2, 3;`)

- Map：マップ（連想配列） -> キーとバリューでペアとなった構造である。
  `$color: (color1: red, color2: blue, color3: green);`

データ型は type-of()で確認することができる。

---

## ■ Mixin

ミックスインを使うことで スタイルの再利用が可能になる。

- プロパティやセレクタをまとめてワンセットにしておいて、それらを読み込むことができる

- `@mixin`を用いて定義し、`@include`で定義したミックスインを呼び出す

- ミックスインもスコープを持ち、変数と同じ考え方となる

- ミックスインは引数を指定することも可能である

```scss
@mixin align-center($margin: 0px) {
  display: block;
  margin: $margin auto;
}
img {
  // default parameter: margin: 0px
  @include align-center;
}
.img2 {
  // margin: 10px
  @include align-center(10px);
}
```

`content`でルールセットやスタイルなどのコンテンツをミックスインに渡すことができる。

```scss
@mixin mq($width: 680px) {
  @media only screen and (max-width: $width) {
    @content;
  }
}
img {
  @include mq(340px) {
    margin: 0;
  }
}
```

---

## ■ Inheritance

`@extend`でセレクタ(定義したスタイル)を継承することができる。

プレースホルダーセレクタ `%`を用いることで、継承元のセレクタを CSS ファイルに生成させないようにできる。

```scss
%custom-btn {
  padding: 5px 10px;
  border-radius: 5px;
  color: #333;
  text-decoration: none;
}
.default-btn {
  @extend %custom-btn;
  background-color: #ccc;
}
.custom-btn-alert {
  @extend %custom-btn;
  background-color: #fcc;
}
```

`@media`の中でセレクタを継承するためには、`@media` の中で継承元のセレクタを定義する必要がある。

```scss
%font-size-normal {
  font-size: 24px;
}
@media screen and (min-width: 960px) {
  h1 {
    // error.
    @extend %font-size-normal;
  }
}
@media screen and (min-width: 960px) {
  %font-size-big {
    font-size: 48px;
  }

  h1 {
    @extend %font-size-big;
  }
}
```

---

## ■ 補完(インターポレーション)

補完を行うための構文として`#{}`がある。

変数に入った文字列は値として認識されてエラーが出てしまう。

プロパティの値にしか使用できないが、`#{}`と組み合わせることでセレクタやプロパティ名に使用可能。

```scss
$class-name: btn;
// container.btn
.container.#{$class-name} {
  color: red;
}

$attr: margin;
p {
  // margin-top
  #{$attr}-top: 10px;
}

$img-base-path: "./sample/images/";
.sample-image {
  background: url(#{$img-base-path}main.png) no-repeat;
}
```

---

## ■ Function

| Function-name  | Description              | Usage                        |
| -------------- | ------------------------ | ---------------------------- |
| ceil($number)  | 小数点以下を切り上げする | ceil(3.5px) -> 3px           |
| floor($number) | 小数点以下を切り捨てする | floor(3.5px) -> 4px          |
| round($number) | 小数点以下を四捨五入する | round(3.5px) -> 4px          |
| abs($number)   | 絶対値を返す             | abs(-1px) -> 1px             |
| min($number)   | 最小の数値を返す         | min(5px, 10px, 8px) -> 5px   |
| max($number)   | 最大の数値を返す         | max(1px, 20px, 55px) -> 55px |

### **- User-defined fuction**

```scss
@function half($value) {
  @return round($value / 2);
}

$pi: 3.14;
@function clac-area-of-circle($radius) {
  @return round(radius * radius * pi);
}
.container {
  width: half(1080px);
}
```

---

## ■ Importing files

CSS と同様@import で他の scss ファイルを読み込むことができる。

- 読み込むファイルが多いと、ファイル読み込みに時間がかかり、効率がよくない。

partial という分割した scss ファイルを 1 つの scss ファイルとしてまとめる機能がより効率的である。

- ファイル名の先頭に `_` を付けることで、コンパイルしても CSS ファイルを生成しない。

```scss
// Normal import
@import url("base.css");
@import url(base.css);
@import "base.css";

// Partial import
@import "_base1.scss";
@import "_base2";

// カンマ区切りで、まとめて読み込む
@import "_base1", "_base2";

// 異なるディレクトリの読み込み
@import "scss/base/_base";
@import "scss/base/sub/_sub-base";
```
