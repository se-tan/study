package model;

import java.io.Serializable;

public class User implements Serializable {

	private String uid;
	private String pw;
	private String name;

	public User(String uid, String pw, String name) {
		this.uid = uid;
		this.pw = pw;
		this.name = name;
	}

	public String getUid() {
		return uid;
	}

	public String getPw() {
		return pw;
	}

	public String getName() {
		return name;
	}

}
