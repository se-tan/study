<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ユーザー登録</title>
</head>
<body>
	<form action="/session/RegisterUser" method="post">
		ログインID：<input type="text" name="uid"><br> 
		パスワード：<input type="password" name="pw"><br> 
		名前：<input type="text" name="name"> 
		<input type="submit" value="確認">
	</form>
</body>
</html>