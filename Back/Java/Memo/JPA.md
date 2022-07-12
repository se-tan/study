# JPA

## 1. What's JPA ?

Java Persistence API の略。オブジェクトをそのままの形で永続的に保管したり、取り出したりするための API。

簡単な Java 言語のメソッドだけで操作できるので、従来のように、JDBC や SQL を使う必要がない。

---

## 2. Usage of JPA

`@Entity` というアノテーションは、オブジェクトと RDB を結びつけ、`@Id` は主キーのフィールドに付ける。

```java
@Entity
public class Product {
  @Id
  private String number;
  private String name;
  private int price;
  private LocalDate date;
  private boolean stock;
}
```

```java
Product p1 = new Product("A100", "XenPad", 36760, LocalDate.parse("2022-01-17"), true);
DatabaseManager<Product> dbm = new DatabaseManager<>(Product.class);
dbm.persist(p1);
```
