package system.model;

import javax.persistence.*;

import system.anotation.*;

@Entity
public class Book {

    /** ID ： Hibernateによる自動採番 */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /** 書籍タイトル */
    @Title
    private String title;

    /** 出版社名 */
    @Publisher
    private String publisher;

    /** 価格 */
    @Price
    private String price;

    /** ISBN */
    @ISBN
    private String isbn;

    /** デフォルトコンストラクタ */
    public Book() {
    }

    /** コンストラクタ */
    public Book(String title, String publisher, String price, String isbn) {
        this.title = title;
        this.publisher = publisher;
        this.price = price;
        this.isbn = isbn;
    }

    /** IDの取得 */
    public long getId() {
        return id;
    }

    /** IDの設定 */
    public void setId(long id) {
        this.id = id;
    }

    /** タイトルの取得 */
    public String getTitle() {
        return title;
    }

    /** タイトルの設定 */
    public void setTitle(String title) {
        this.title = title;
    }

    /** 出版社名の取得 */
    public String getPublisher() {
        return publisher;
    }

    /** 出版社名の設定 */
    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    /** 価格の取得 */
    public String getPrice() {
        return price;
    }

    /** 価格の設定 */
    public void setPrice(String price) {
        this.price = price;
    }

    /** ISBNの取得 */
    public String getIsbn() {
        return isbn;
    }

    /** ISBNの設定 */
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
}
