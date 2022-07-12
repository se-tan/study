# SpringBoot <!-- omit in toc -->

- [1. Eclipse に既存 Gradle プロジェクトをインポートする](#1-eclipse-に既存-gradle-プロジェクトをインポートする)
  - [1.1. 操作方法](#11-操作方法)
- [2. アノテーション](#2-アノテーション)
  - [2.1. アノテーションの種類](#21-アノテーションの種類)
    - [2.1.1. Java で代表的なもの](#211-java-で代表的なもの)
    - [2.1.2. SpringBoot で代表的なもの](#212-springboot-で代表的なもの)
  - [2.2. アノテーションを使用するメリット](#22-アノテーションを使用するメリット)

## 他のページ項目 <!-- omit in toc -->

<ul class="index">
  <li><a href="docs/DIを理解する.md">DI を理解する</a></li>
  <li><a href="docs/DBを使用する.md">DB を使用する</a></li>
  <li><a href="docs/DB操作.md">DB操作</a></li>
</ul>

## 1. Eclipse に既存 Gradle プロジェクトをインポートする

### 1.1. 操作方法

1. 「ファイル」>「インポート」>「Gradle」をクリックする。
2. 「既存の Gradle プロジェクト」を選択する。
3. 「次へ」>「次へ」をクリックする。
4. 「プロジェクト・ルート・ディレクトリ」を参照する。
5. 「次へ」をクリックする。
6. 「完了」をクリックする。

## 2. アノテーション

Java ではコンピューターに対してソースコードだけでは命令しきれない情報を伝えるために使用します。

**わざとエラーを出力させたり、プログラムの動作を変更させたり**と、色々なことが可能です。

### 2.1. アノテーションの種類

- 特にデータを持たないアノテーション
- データを 1 つ持つ単一アノテーション
- データを複数持つフルアノテーション

#### 2.1.1. Java で代表的なもの

- <b>@Override</b>
  「必ずメソッドをオーバーライドしてください」と指定することが可能です。

- <b>@Deprecated</b>
  「このメソッドやクラスは非推奨です」というエラーを出すために使います。

- <b>@SuppressWarnings</b>
  コンパイラに警告を出させないようにするアノテーションです。

#### 2.1.2. SpringBoot で代表的なもの

- <b>@Controller</b>
  画面遷移用のコントローラーに付与します。

- <b>@RestController</b>
  Web アプリケーションにおいてリクエストを受け付ける「コントローラークラス」に付与します。

- <b>@RequestMapping("パス")</b>
  @Controller / @ RestController を付与したクラスがマッピングする URL の接頭辞を設定します。

  ```java
  @Controller
  @RequestMapping("sample")
  public class SampleController {
  ```

- <b>@GetMapping("パス")</b>
  HTTP リクエストの GET メソッドを受け付けるためのメソッドに付与します。

  ```java
  @Controller
  public class ExampleController {
    @GetMapping("hogehoge")
    String index() {
        return "example";
    }
  }
  ```

- <b>@PostMapping("パス")</b>
  HTTP リクエストの POST メソッドを受け付けるためのメソッドに付与します。

  ```java
    @Controller
    public class ExampleController {
        @PostMapping("fugafuga")
        String index() {
        return "example";
        }
    }
  ```

- <b>@Service</b>
  サービスクラスに付与します。

  ```java
  @Service
  public class ExampleService {
      public List<Customer> getCustomer() {
          return customerList;
      }
  }
  ```

- <b>@ComponentScan</b>
  そのクラスのパッケージ以下の@Component 等、特定のアノテーションが付与されたクラスの Bean を DI コンテナに登録します。

- <b>@Bean</b>
  DI コンテナに管理させたい「Bean」を生成するメソッドに付与します。
  ※ メソッド名が Bean 名になる
  ※ singleton として管理され、DI コンテナに 1 つのインスタンスのみ生成される

  ```java
  @Bean
  Animal animal() {
    return new Animal();
  }
  ```

- <b>@Data</b>
  コンパイル時に下記メソッドが生成される

  - setter()
  - getter()
  - toString()
  - equals()
  - hashCode()

  ※ Lombok のインストールが必要

- <b>@Autowired</b>
  特定のアノテーションを付与したクラスのインスタンスを使用できるようにします。
  Spring の肝となるアノテーションの 1 つ
  [詳細はこちらから](docs/DIを理解する.md)

- <b>@ModelAttribute</b>
  返り値は自動的に Model に追加されます。
  @RequestMapping でマッピングされたメソッドの前に実行されます。

  ```java
  @ModelAttribute("anotherForm")
  SampleForm sampleForm() {
    return new SampleForm();
  }
  ```

### 2.2. アノテーションを使用するメリット

- スペルミスをしたときにエラーを出せる
- メソッドやクラス名を間違えたときにエラーを出せる
- 他のプログラマーに「ここはこういう風に書いて」と指示を出せる
