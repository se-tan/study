<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Welcome to mySNS!</title>
</head>
<body>
	<h1>つぶやき広場へようこそ！</h1>
	<form action="/mySNS/Login" method="post">
		ユーザー名：<input type="text" name="name"><br> 
		パスワード：<input type="password" name="pw"> 
		<input type="submit" value="ログイン">
	</form>
</body>
</html>