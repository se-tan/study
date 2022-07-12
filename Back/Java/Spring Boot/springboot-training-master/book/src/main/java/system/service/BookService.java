package system.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import system.model.Book;
import system.repository.BookRepository;

/**
 * 書籍サービスクラス
 * @author yuta_kuroki
 *
 */
@Service
@Transactional
public class BookService {

    /**
     * 書籍リポジトリ(コンテナよりオブジェクトを取得)
     */
    @Autowired
    private BookRepository repo;

    /**
     * 指定した書籍IDに紐づく書籍データを1件(1行)取得する。
     * @param id 取得したい書籍ID
     * @return 書籍データ
     */
    public Book findById(long id) {
        Book book = new Book();
        // (8) リポジトリより、書籍IDを指定して書籍データを取得する。
        book = repo.findById(id);

        return book;
    }

    /**
     * 指定した書籍情報で新規登録(データを挿入)する。
     * @param book 登録したい書籍データ
     */
    public void saveBook(Book book) {
        // (9) リポジトリより、登録したい書籍データを渡して登録する。
    	repo.insert(book);
    }

    /**
     * 指定した書籍情報で更新する。
     * @param book 更新したい書籍データ
     */
    public void updateBook(Book book) {
        // (10) リポジトリより、更新したい書籍データを渡して更新する。
    	repo.update(book);

    }

    /**
     * 指定した書籍情報を削除する。
     * @param book 削除したい書籍データ
     */
    public void deleteBook(Book book) {
        // (11) リポジトリより、削除したい書籍データを渡して削除する。
    	repo.delete(book);

    }

    /**
     * 書籍情報を全件取得する。
     * @return 書籍リスト
     */
    public List<Book> findAllBooks() {
        // リポジトリより、書籍データを全件取得する。
        return repo.findAll();
    }

    /**
     * 指定した書籍タイトルで書籍情報を検索する。
     * @param titleSearch 書籍タイトル
     * @return 書籍リスト
     */
    public List<Book> findByTitle(String titleSearch) {
        List<Book> books = new ArrayList<Book>();
        // (12) リポジトリより、指定した書籍タイトルで書籍情報を検索する。
        books = repo.findByTitle(titleSearch);

        return books;
    }

}
