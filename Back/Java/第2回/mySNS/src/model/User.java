package model;

import java.io.Serializable;

public class User implements Serializable {

	private String name;
	private String pw;

	public User(String name, String pw) {
		this.name = name;
		this.pw = pw;
	}

	public String getName() {
		return name;
	}

	public String getPw() {
		return pw;
	}
}
