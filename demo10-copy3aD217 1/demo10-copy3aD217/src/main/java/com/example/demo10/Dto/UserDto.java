package com.example.demo10.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
	private long Id;
	  public long getId() {
		return Id;
	}
	public void setId(long id) {
		Id = id;
	}
	private String email;
	    private String password;
	    private String name;
	    private String phone;
	    private String address;
	    private String role;
	    
	    private String profileImage;
		public String getProfileImage() {
			return profileImage;
		}
		public void setProfileImage(String profileImage) {
			this.profileImage = profileImage;
		}
		public String getRole() {
			return role;
		}
		public void setRole(String role) {
			this.role = role;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getPhone() {
			return phone;
		}
		public void setPhone(String phone) {
			this.phone = phone;
		}
		public String getAddress() {
			return address;
		}
		public void setAddress(String address) {
			this.address = address;
		}
		
	    
	    
}
