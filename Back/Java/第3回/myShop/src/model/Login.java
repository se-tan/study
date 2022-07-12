package model;

public class Login {
	
	private String uid;
	private String pw;
	
	public Login(String uid, String pw) {
		this.uid = uid;
		this.pw = pw;
	}

	public String getUid() {
		return uid;
	}

	public String getPw() {
		return pw;
	}
	
	
}
