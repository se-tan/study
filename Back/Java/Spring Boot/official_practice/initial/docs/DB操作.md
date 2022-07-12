# データベース操作(登録・更新・削除・検索)のメソッド <!-- omit in toc -->

- [1. 「登録」・「更新」・「削除」・「1 件検索」メソッドの作成](#1-登録更新削除1-件検索メソッドの作成)
  - [1.1. ポイント](#11-ポイント)
- [2. 自作の DB 操作メソッド作成](#2-自作の-db-操作メソッド作成)
  - [2.1. CustomerRepository.java](#21-customerrepositoryjava)
  - [2.2. ポイント](#22-ポイント)
  - [2.3. CustomerService.java](#23-customerservicejava)
  - [ポイント](#ポイント)

## 1. 「登録」・「更新」・「削除」・「1 件検索」メソッドの作成

[「DB を使用する」を先に読んでください](DBを使用する.md)

```java
package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.domain.Customer;
import com.example.repository.CustomerRepository;

@Service
@Transactional
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    //ポイント①
    public void insert(Customer customer) {
        customerRepository.save(customer);
    }

    //ポイント②
    public void update(Customer customer) {
        customerRepository.save(customer);
    }

    //ポイント③
    public void delete(Integer id) {
        customerRepository.deleteById(id);
    }

    //ポイント④
    public Optional<Customer> selectById(Integer id) {
        return customerRepository.findById(id);
    }
}
```

### 1.1. ポイント

1. customerRepository.save()メソッドを使って登録処理を行う insert()メソッド

2. customerRepository.save()メソッドを使って更新処理を行う update()メソッド

3. customerRepository.deleteById(Integer id)メソッドを使って削除処理を行う delete()メソッド

4. customerRepository.findById(Integer id)メソッドを使って 1 件取得する selectById()メソッド

※ 処理の詳細はコントローラークラスに記述する

## 2. 自作の DB 操作メソッド作成

これまでは「JpaRepository インターフェース」の継承によって使用できる DB 操作メソッドを紹介してきました。

しかし実際にアプリケーションを作成していると自由に DB 操作をする必要が往々にしてあります。

そんな時は「リポジトリインターフェース」内で「@Query」を使用して JPQL（SQL のようなもの）を記述しましょう。

例として全件検索メソッド（ID 昇順）を作成してみます。

### 2.1. CustomerRepository.java

```java
package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.domain.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer>{
    //ポイント①
    @Query("SELECT u FROM Customer ORDER BY u.id")
    List<Customer> findAllOrderById();
}
```

### 2.2. ポイント

1. 「@Query("JPQL 文")」の構文で記述する
   ※ ORDER BY 句の ID は<span class="red">プロパティ名の為、今回の場合は小文字の「id」となることに注意</span>

2. サービスクラスの記述を変更

### 2.3. CustomerService.java

```java
package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.domain.Customer;
import com.example.repository.CustomerRepository;

@Service
@Transactional
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    //ポイント①
    public List<Customer> findAll() {
        return customerRepository.findAllOrderById();
    }

    public void insert(Customer customer) {
        customerRepository.save(customer);
    }

    public void update(Customer customer) {
        customerRepository.save(customer);
    }

    public void delete(Integer id) {
        customerRepository.deleteById(id);
    }

    public Optional<Customer> selectById(Integer id) {
        return customerRepository.findById(id);
    }
}
```

### ポイント

1. 「customerRepository.findAll()メソッド」を「customerRepository.findAllOrderById()メソッド」に変更
   リポジトリインターフェースに登録した全件取得（ID 昇順）メソッドに変える
