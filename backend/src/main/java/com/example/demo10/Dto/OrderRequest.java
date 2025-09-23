package com.example.demo10.Dto;

public class OrderRequest {
private String orderId;
private String payerId;
private String email;
private int amount;
public String getOrderId() {
	return orderId;
}
public void setOrderId(String orderId) {
	this.orderId = orderId;
}
public String getPayerId() {
	return payerId;
}
public void setPayerId(String payerId) {
	this.payerId = payerId;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
public int getAmount() {
	return amount;
}
public void setAmount(int amount) {
	this.amount = amount;
}
}
