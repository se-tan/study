package model;

public class Account {

	private String uid;
	private String pw;
	private String mail;
	private String name;
	private int age;

	public Account(String uid, String pw, String mail, String name, int age) {
		this.uid = uid;
		this.pw = pw;
		this.mail = mail;
		this.name = name;
		this.age = age;
	}

	public String getUid() {
		return uid;
	}

	public String getPw() {
		return pw;
	}

	public String getMail() {
		return mail;
	}

	public String getName() {
		return name;
	}

	public int getAge() {
		return age;
	}

}
