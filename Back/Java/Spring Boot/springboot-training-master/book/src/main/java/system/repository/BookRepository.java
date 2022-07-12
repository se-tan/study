package system.repository;

import java.util.List;

import javax.persistence.*;

import org.springframework.stereotype.Repository;

import system.model.Book;

@Repository
public class BookRepository {

	/**
	 * 1件検索用SQL(ID指定)
	 */
	private static final String FIND_BY_ID_SQL = "SELECT * FROM Book WHERE id = ?1"; // (12)

	/**
	 * 全件検索用SQL
	 */
	private static final String FIND_ALL_SQL = "SELECT * from Book";

	/**
	 * データ挿入用SQL
	 */
	private static final String INSERT_SQL = "INSERT INTO Book(title, publisher, price, isbn) VALUES(?1, ?2, ?3, ?4)"; // (13)

	/**
	 * データ更新用SQL
	 */
	private static final String UPDATE_SQL = "UPDATE Book SET title=?2, publisher=?3, price=?4, isbn=?5 WHERE id=?1"; // (14)

	/**
	 * データ削除用SQL
	 */
	private static final String DELETE_SQL = "DELETE FROM Book WHERE id=?1"; // (15)

	/**
	 * タイトル検索用SQL
	 */
	private static final String FIND_TITLE_SQL = "SELECT * FROM Book WHERE title LIKE ?1"; // (16)

	@PersistenceContext(unitName = "entityManagerFactory")
	private EntityManager entityManager;

	public EntityManager em() {
		return entityManager;
	}

	/**
	 * 書籍をIDで一件検索する
	 * 
	 * @param id 書籍ID
	 * @return 書籍オブジェクト
	 */
	public Book findById(long id) {
		// SQLを定義
		Query query = entityManager.createNativeQuery(FIND_BY_ID_SQL, Book.class);
		// (17) 書籍IDをパラメータとして設定する。
		query.setParameter(1, id);

		// SQLを実行し、書籍データを1件取得する。
		return (Book) query.getSingleResult();
	}

	/**
	 * 書籍データを挿入する
	 * 
	 * @param book 挿入する書籍オブジェクト
	 */
	public void insert(Book book) {
		// SQLを定義
		Query query = entityManager.createNativeQuery(INSERT_SQL, Book.class);
		// (18) 各書籍項目をパラメータに設定する。
		query.setParameter(1, book.getTitle());
		query.setParameter(2, book.getPublisher());
		query.setParameter(3, book.getPrice());
		query.setParameter(4, book.getIsbn());

		// SQLを実行する。
		query.executeUpdate();
	}

	/**
	 * 書籍データを更新する
	 * 
	 * @param book 更新する書籍オブジェクト
	 */
	public void update(Book book) {
		// SQLを定義
		Query query = entityManager.createNativeQuery(UPDATE_SQL, Book.class);
		// (19) 各書籍項目をパラメータに設定する。
		query.setParameter(1, book.getId());
		query.setParameter(2, book.getTitle());
		query.setParameter(3, book.getPublisher());
		query.setParameter(4, book.getPrice());
		query.setParameter(5, book.getIsbn());

		// SQLを実行する。
		query.executeUpdate();
	}

	/**
	 * 書籍データを削除する
	 * 
	 * @param book 削除する書籍オブジェクト
	 */
	public void delete(Book book) {
		// SQLを定義
		Query query = entityManager.createNativeQuery(DELETE_SQL, Book.class);
		// (20) 書籍IDをパラメータとして設定する。
		query.setParameter(1, book.getId());

		// SQLを実行する。
		query.executeUpdate();
	}

	/**
	 * 書籍を全件検索する
	 * 
	 * @return 書籍リストオブジェクト
	 */
	@SuppressWarnings("unchecked")
	public List<Book> findAll() {
		// SQLを定義
		Query query = entityManager.createNativeQuery(FIND_ALL_SQL, Book.class);
		// 書籍データを複数件取得する。
		return query.getResultList();
	}

	/**
	 * 書籍をタイトルで検索する
	 * 
	 * @param titleKeyword 検索したいタイトル
	 * @return 検索結果
	 */
	@SuppressWarnings("unchecked")
	public List<Book> findByTitle(String titleSearch) {
		// SQLを定義
		Query query = entityManager.createNativeQuery(FIND_TITLE_SQL, Book.class);
		// (21) 書籍タイトルをパラメータとして設定する。
		query.setParameter(1, "%" + titleSearch + "%");

		// 書籍データを複数件取得する。
		return query.getResultList();
	}

}
