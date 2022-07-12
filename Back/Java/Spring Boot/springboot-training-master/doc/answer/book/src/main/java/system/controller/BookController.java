package system.controller;

import java.io.Serializable;
import java.util.*;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import system.model.Book;
import system.service.BookService;

/**
 * 書籍コントローラ
 * @author yuta_kuroki
 *
 */
@Controller
@RequestMapping("/")
public class BookController {

    /**
     * 書籍サービス(コンテナよりサービスオブジェクトを取得)
     */
    @Autowired
    BookService service;

    /**
     * 一覧画面にアクセスしたとき
     * @param search タイトル検索用のキーワード
     * @param model 画面に表示するためのビューモデル
     * @return 画面
     */
    @GetMapping({ "/", "/list" })
    public String listBooks(TitleSearch search, ModelMap model) {
        // サービスより、書籍を全件取得する。
        List<Book> books = service.findAllBooks();
        // サービスから取得した書籍リストを画面に設定する。
        model.addAttribute("books", books);
        // 一覧画面を返却する。
        return "list";
    }

    /**
     * 新規登録画面にアクセスした時
     * @param model 画面に表示するためのビューモデル
     * @return 画面
     */
    @GetMapping("/new")
    public String newBook(ModelMap model) {
        // 書籍モデルを生成する。
        Book book = new Book();
        // 画面に書籍モデルを設定する。
        model.addAttribute("book", book);
        // 登録画面を返却する。
        return "register";
    }

    /**
     * 新規登録画面にて登録ボタンを押下した時
     * @param book 画面に入力された書籍データ
     * @param result 入力検証を行った結果
     * @param model 画面に表示するためのビューモデル
     * @return 画面
     */
    @PostMapping("/new")
    public String saveBook(@Valid Book book, BindingResult result, ModelMap model) {
        // 入力検証にてエラーがある場合は、登録画面を返す。
        if (result.hasErrors()) {
            return "register";
        }

        // (1) サービスの書籍登録を呼び出し、データベースに書籍を登録する。
        service.saveBook(book);

        // トップ画面に遷移(リダイレクト)する。
        return "redirect:/list";
    }

    /**
     * 詳細画面にアクセスした時
     * @param model 画面に表示するためのビューモデル
     * @param id 画面に表示する書籍ID
     * @return 画面
     */
    @GetMapping("/detail-{id}-book")
    public String detailBook(ModelMap model, @PathVariable int id) {
        Book book = new Book();
        // (2) サービスより、画面から取得した書籍IDで書籍データを取得する。
        book = service.findById(id);

        // 画面に取得した書籍データを設定する。
        model.addAttribute("book", book);
        // 詳細画面を返す。
        return "detail";
    }

    /**
     * 編集画面にアクセスした時
     * @param model 画面に表示するためのビューモデル
     * @param id 画面に表示する書籍ID
     * @return 画面
     */
    @GetMapping("/edit-{id}-book")
    public String editBook(ModelMap model, @PathVariable int id) {
        Book book = new Book();
        // (3) サービスより、画面から取得した書籍IDで書籍データを取得する。
        book = service.findById(id);

        // 画面に取得した書籍データを設定する。
        model.addAttribute("book", book);
        // 編集画面を返す。
        return "edit";
    }

    /**
     * 編集画面にて編集ボタンを押下した時
     * @param book 画面に入力された書籍データ
     * @param result 入力検証を行った結果
     * @param model 画面に表示するためのビューモデル
     * @param id 画面に表示する書籍ID
     * @return 画面
     */
    @PostMapping("/edit-{id}-book")
    public String updateBook(@Valid Book book, BindingResult result, ModelMap model, @PathVariable int id) {
        // 入力検証にてエラーがある場合は、編集画面を返す。
        if (result.hasErrors()) {
            return "edit";
        }

        // (4) サービスより、入力された内容で書籍データを更新する。
        service.updateBook(book);

        // トップ画面に遷移(リダイレクト)する。
        return "redirect:/list";
    }

    /**
     * 書籍情報を削除する
     * @param id 削除対象の書籍ID(画面から取得)
     * @return 画面
     */
    @GetMapping("/delete-{id}-book")
    public String deleteBook(@PathVariable int id) {
        // (5) サービスより、画面から取得した書籍IDで書籍データを取得する。
        Book book = new Book();
        book = service.findById(id);

        // (6) 取得した書籍データをサービスより削除する。
        service.deleteBook(book);

        // トップ画面に遷移(リダイレクト)する。
        return "redirect:/list";
    }

    /**
     * 書籍のタイトルを用いて書籍情報を検索する
     * @param search タイトル検索用のキーワード(画面から取得)
     * @param model 画面に表示するためのビューモデル
     * @return 画面
     */
    @GetMapping("/search")
    public String searchBook(TitleSearch search, ModelMap model) {
        List<Book> books = new ArrayList<Book>();
        // (7) サービスより、画面から取得したキーワードでタイトルを検索する。
        books = service.findByTitle(search.getBookTitle());

        // 取得した書籍一覧を画面に設定する。
        model.addAttribute("books", books);
        // トップ画面を返す。
        return "list";
    }

    public static class TitleSearch implements Serializable {
        private static final long serialVersionUID = 1L;
        private String bookTitle;

        public TitleSearch() {
        }

        public String getBookTitle() {
            return bookTitle;
        }

        public void setBookTitle(String bookTitle) {
            this.bookTitle = bookTitle;
        }
    }

}
