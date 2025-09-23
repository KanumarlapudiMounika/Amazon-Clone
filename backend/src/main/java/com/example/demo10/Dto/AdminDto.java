package com.example.demo10.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminDto {
	private long Id;
	  public long getId() {
		return Id;
	}
	public void setId(long id) {
		Id = id;
	}
	private String Ademail;
	    private String Adpassword;
	    private String Adname;
	    private String Adphone;
	    private String Adaddress;
	    private String Adrole;
		public String getAdemail() {
			return Ademail;
		}
		public void setAdemail(String ademail) {
			Ademail = ademail;
		}
		public String getAdpassword() {
			return Adpassword;
		}
		public void setAdpassword(String adpassword) {
			Adpassword = adpassword;
		}
		public String getAdname() {
			return Adname;
		}
		public void setAdname(String adname) {
			Adname = adname;
		}
		public String getAdphone() {
			return Adphone;
		}
		public void setAdphone(String adphone) {
			Adphone = adphone;
		}
		public String getAdaddress() {
			return Adaddress;
		}
		public void setAdaddress(String adaddress) {
			Adaddress = adaddress;
		}
		public String getAdrole() {
			return Adrole;
		}
		public void setAdrole(String adrole) {
			Adrole = adrole;
		}
		
	    
	    
}
