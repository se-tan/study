package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.Account;
import model.Login;

public class AccountDAO {

	private final String JDBC_URL = "jdbc:h2:C:/data/example";
	private final String DB_USER = "admin";
	private final String DB_PASS = "admin";

	public Account findByLogin(Login login) {
		Account account = null;

		try (Connection con = DriverManager.getConnection(JDBC_URL, DB_USER, DB_PASS)) {

			// SELECT文を準備
			String sql = "SELECT * FROM ACCOUNT WHERE USER_ID = ? AND PASS = ?";
			PreparedStatement pStmt = con.prepareStatement(sql);
			pStmt.setString(1, login.getUid());
			pStmt.setString(2, login.getPw());

			// SELECT文を実行
			ResultSet rs = pStmt.executeQuery();

			// 一致したユーザーが存在する場合
			if (rs.next()) {
				String uid = rs.getString("USER_ID");
				String pw = rs.getString("PASS");
				String mail = rs.getString("MAIL");
				String name = rs.getString("NAME");
				int age = rs.getInt("AGE");

				account = new Account(uid, pw, mail, name, age);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		// 見つかったユーザーかnullを返す
		return account;
	}
}
