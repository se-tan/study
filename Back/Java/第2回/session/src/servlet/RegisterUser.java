package servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.RegisterUserLogic;
import model.User;

@WebServlet("/RegisterUser")
public class RegisterUser extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// フォワード先
		String forwardPath = null;

		// サーブレットクラスの動作を決定する「action」の値を
		// リクエストパラメータから取得
		String action = request.getParameter("action");

		if (action == null) {
			forwardPath = "/WEB-INF/jsp/registerForm.jsp";
		} else if (action.equals("done")) {
			HttpSession session = request.getSession();
			User registerUser = (User) session.getAttribute("registerUser");

			RegisterUserLogic logic = new RegisterUserLogic();
			logic.execute(registerUser);

			session.removeAttribute("registerUser");

			forwardPath = "/WEB-INF/jsp/registerDone.jsp";
		}

		// フォワード先
		RequestDispatcher dispatcher = request.getRequestDispatcher(forwardPath);
		dispatcher.forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		String uid = request.getParameter("uid");
		String pw = request.getParameter("pw");
		String name = request.getParameter("name");

		// 登録するユーザーの情報を設定
		User registerUser = new User(uid, pw, name);

		// セッションスコープに登録ユーザーを保存
		HttpSession session = request.getSession();
		session.setAttribute("registerUser", registerUser);

		// フォワード
		RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/jsp/registerConfirm.jsp");
		dispatcher.forward(request, response);
	}

}
