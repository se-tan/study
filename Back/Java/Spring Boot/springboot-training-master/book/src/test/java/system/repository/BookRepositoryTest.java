package system.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import javax.persistence.EntityManager;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import system.model.Book;

@SpringBootTest
@Transactional
public class BookRepositoryTest {

    @Autowired
    private BookRepository repo;
    private EntityManager em;

    Book book;

    @BeforeEach
    public final void setup() {
        em = repo.em();
        book = new Book("Java Servlet 入門", "技術出版", "3500", "123-123-123-1");
        em.persist(book);
        em.persist(new Book("Java Servlet 入門2", "技術出版", "3500", "123-123-123-2"));
        em.persist(new Book("JavaScript 入門", "技術出版", "2500", "123-123-123-3"));
        flushAndClear();
    }

    @Test
    void 書籍をIDで一件検索する() {
        // 正常系 対象あり
        Book test = repo.findById(book.getId());
        assertAll(
                () -> assertEquals("Java Servlet 入門", test.getTitle()),
                () -> assertEquals("技術出版", test.getPublisher()),
                () -> assertEquals("3500", test.getPrice()),
                () -> assertEquals("123-123-123-1", test.getIsbn()));

        // 異常系 対象なし
        assertThrows(Exception.class, () -> repo.findById(9999L));
    }

    @Test
    void 書籍を全件検索する() {
        // 正常系
        List<Book> test = repo.findAll();
        assertEquals(3, test.size());
    }

    @Test
    void 書籍をタイトルで検索する() {
        // 正常系
        List<Book> test = repo.findByTitle("Ser");
        assertEquals(2, test.size());
    }

    @Test
    void 書籍データを挿入する() {
        // 事前検証
        List<Book> current = repo.findAll();
        assertEquals(3, current.size());

        // 登録検証
        Book r = new Book("テストタイトル", "テスト出版", "100", "111-111-111-1");
        repo.insert(r);

        // 事後検証
        current = repo.findAll();
        assertEquals(4, current.size());

        Book actual = current.get(3);
        assertAll(
                () -> assertEquals("テストタイトル", actual.getTitle()),
                () -> assertEquals("テスト出版", actual.getPublisher()),
                () -> assertEquals("100", actual.getPrice()),
                () -> assertEquals("111-111-111-1", actual.getIsbn()));
    }

    @Test
    void 書籍データを更新する() {
        // 事前検証
        Book current = repo.findById(book.getId());
        assertAll(
                () -> assertEquals("Java Servlet 入門", current.getTitle()),
                () -> assertEquals("技術出版", current.getPublisher()),
                () -> assertEquals("3500", current.getPrice()),
                () -> assertEquals("123-123-123-1", current.getIsbn()));

        // 登録検証
        current.setTitle("テストタイトル");
        current.setPublisher("テスト出版");
        current.setPrice("1000");
        current.setIsbn("111-111-111-1");
        repo.update(current);

        // 事後検証
        Book actual = repo.findById(current.getId());
        assertAll(
                () -> assertEquals("テストタイトル", actual.getTitle()),
                () -> assertEquals("テスト出版", actual.getPublisher()),
                () -> assertEquals("1000", actual.getPrice()),
                () -> assertEquals("111-111-111-1", actual.getIsbn()));

    }

    @Test
    void 書籍データを削除する() {
        // 事前検証
        List<Book> current = repo.findAll();
        assertEquals(3, current.size());

        Book d = repo.findById(book.getId());
        assertNotNull(d);

        // 削除検証
        repo.delete(d);

        // 事後検証
        current = repo.findAll();
        assertEquals(2, current.size());

        assertThrows(Exception.class,
                () -> repo.findById(book.getId()));
    }

    public void flushAndClear() {
        repo.em().flush();
        repo.em().clear();
    }

}
