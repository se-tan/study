# データベースを使う <!-- omit in toc -->

- [1. MySQL にテーブル作成し、レコードを挿入](#1-mysql-にテーブル作成しレコードを挿入)
- [2. エンティティクラスとなる「Customer.java」を作成](#2-エンティティクラスとなるcustomerjavaを作成)
  - [2.1. ポイント](#21-ポイント)
- [3. 「JpaRepository インターフェース」を継承した「CustomerRepository インターフェース」を作成する](#3-jparepository-インターフェースを継承したcustomerrepository-インターフェースを作成する)
  - [3.1. ポイント](#31-ポイント)
- [4. サービスクラスとなる「CustomerService.java」を作成](#4-サービスクラスとなるcustomerservicejavaを作成)
  - [4.1. ポイント](#41-ポイント)
- [5. コントロールクラスとなる「CustomerController.java」を作成](#5-コントロールクラスとなるcustomercontrollerjavaを作成)
  - [5.1. ポイント](#51-ポイント)
- [6. 画面表示の為の「list.html」を作成する](#6-画面表示の為のlisthtmlを作成する)
  - [6.1. ポイント](#61-ポイント)

## 1. MySQL にテーブル作成し、レコードを挿入

```sql
CREATE TABLE CUSTOMER (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(20) NOT NULL,
    EMAIL VARCHAR(100)
    )
;
```

```sql
INSERT INTO CUSTOMER (NAME, EMAIL) VALUES ('田中', 'tanaka@hoge.com');
INSERT INTO CUSTOMER (NAME, EMAIL) VALUES ('山田', 'yamada@hoge.jp');
INSERT INTO CUSTOMER (NAME, EMAIL) VALUES ('川崎', 'kawasaki@hoge.co.jp');
```

## 2. エンティティクラスとなる「Customer.java」を作成

```java
package com.example.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//ポイント1
@Entity
@Table(name = "customer")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    //ポイント2
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String name;
    private String email;
}
```

### 2.1. ポイント

1. 下記アノテーションを設定

   - @Entity
     ⇒ JPA のエンティティであることを示す

   - @Table(name = "customer")
     ⇒ エンティティに対応するテーブル名を指定

   - @Data
     ⇒ getter、setter メソッド等を生成

   - @AllArgsConstructor
     ⇒ 全ての引数を持つコンストラクタを生成

   - @NoArgsConstructor
     ⇒ 引数を持たないコンストラクタを生成
     ※ JPA の仕様でエンティティクラスには引数のないコンストラクタが必要な為>※JPA の仕様でエンティティクラスには引数のないコンストラクタが必要な為

2. 下記アノテーションを設定

   - @Id
     ⇒ エンティティの主キーを示す

   - @GeneratedValue(strategy = GenerationType.IDENTITY)
     ⇒ 主キーが自動採番されることを示す

   - @Column(nullable = false)
     ⇒ NotNull 制約を示す

## 3. 「JpaRepository インターフェース」を継承した「CustomerRepository インターフェース」を作成する

格納ディレクトリ：`src\main\java\com\example\repository`
※「repository」パッケージは新たに作成しておく

「**JpaRepository**」には CRUD 操作の為の基本的なメソッドが定義されている
※ CRUD：「Create」、「Read」、「Update」、「Delete」の頭文字

```java
package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.domain.Customer;

//ポイント1
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}
```

### 3.1. ポイント

1. JpaRepository を継承
   【構文】public interface 名前 extends JpaRepository <エンティティ , ID タイプ>
   例) `JpaRepository<Customer, Integer>`

## 4. サービスクラスとなる「CustomerService.java」を作成

格納ディレクトリ：src\main\java\com\example\service
※「service」パッケージは新たに作成しておく

```java
package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.domain.Customer;
import com.example.repository.CustomerRepository;

//ポイント1
@Service
@Transactional
public class CustomerService {
    //ポイント2
    @Autowired
    CustomerRepository customerRepository;

    //ポイント3
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }
}
```

### 4.1. ポイント

1. 下記アノテーションを設定

   - @Service
     ⇒ サービスクラスであることを示し、クラスの Bean を DI コンテナに登録する

   - @Transactional
     ⇒ DB のトランザクション制御

2. DI を行う為に「@Autowired」を付与する [詳細はここへ](DIを理解する.md)

3. 「JpaRepository インターフェース」を継承している為、customerRepository.findAll メソッドで「SELECT \* FROM CUSTMER」相当の処理を行う

## 5. コントロールクラスとなる「CustomerController.java」を作成

格納ディレクトリ：`src\main\java\com\example\web`
※「web」パッケージは新たに作成しておく

```java
package com.example.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.domain.Customer;
import com.example.service.CustomerService;

//ポイント1
@Controller
public class CustomerController {
    @Autowired
    CustomerService customerService;

    //ポイント2
    @GetMapping
    String list(Model model) {
        //ポイント3
        List<Customer> customers = customerService.findAll();
        model.addAttribute("customers", customers);
        return "list";
    }
}
```

### 5.1. ポイント

1. 「@Controller」を付与してコントロールクラスであることを示す

2. 「@GetMapping」を付与して HTTP リクエストの GET メソッドが呼ばれた時にそのメソッドで処理をする

3. 「customerService.findAll()メソッド」で DB のレコードを取得

4. addAttribute()メソッドで Model オブジェクトに追加

5. 「return "list";」で「list.html」に遷移

## 6. 画面表示の為の「list.html」を作成する

「CustomerController.java」を作成
格納ディレクトリ：src/main/resources/templates

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
  <head>
    <meta charset="UTF-8" />
    <title>顧客一覧</title>
  </head>
  <body>
    <table>
      <tr>
        <th>ID</th>
        <th>名前</th>
        <th>メールアドレス</th>
      </tr>
      <!-- ポイント1 -->
      <tr th:each="customer : ${customers}">
        <!-- ポイント2 -->
        <td th:text="${customer.id}"></td>
        <td th:text="${customer.name}"></td>
        <td th:text="${customer.email}"></td>
      </tr>
    </table>
  </body>
</html>
```

### 6.1. ポイント

1. 「th:each="変数名 : ${属性名}"」で拡張 For 構文相当の役割をする

   `<tr th:each="customer : ${customers}">`

2. 「th:text="${変数.プロパティ名}"」で DB のレコードを取得

   `<td th:text="${customer.id}"></td>`
   `<td th:text="${customer.name}"></td>`
