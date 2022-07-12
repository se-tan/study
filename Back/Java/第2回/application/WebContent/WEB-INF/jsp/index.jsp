<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="model.SiteEV"%>
<%
SiteEV siteEV = (SiteEV) application.getAttribute("siteEV");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>MyPage</title>
</head>
<body>
	<h1>Welcome to Mypage!</h1>
	<p>
		<a href="/application/Index?action=like">いいね！</a>：
		<%=siteEV.getLike()%>人 
		
		<a href="/application/Index?action=dislike">どうでもいいね</a>：
		<%=siteEV.getDislike()%>人
	</p>
</body>
</html>