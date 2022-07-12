<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>MyShop</title>
</head>
<body>
	<form action="/myShop/LoginServlet" method="post">
		ユーザーID：<input type="text" name="uid"><br> 
		パスワード：<input type="password" name="pw"><br> 
		<input type="submit" value="ログイン">
	</form>
</body>
</html>