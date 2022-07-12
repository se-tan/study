package model;

import dao.AccountDAO;

public class LoginLogic {

	public boolean execute(Login login) {
		AccountDAO dao = new AccountDAO();
		Account account = dao.findByLogin(login);
		if (account == null) {
			System.out.println("ユーザーが見つかりませんでした");
			return false;
		}
		return account != null;
	}
}
