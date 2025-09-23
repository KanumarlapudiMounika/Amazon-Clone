package com.example.demo10.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo10.Entity.Order;
import com.example.demo10.Repository.OrderRepository;

@Service
public class OrderService {
	@Autowired
	private OrderRepository orderRepository;
	public Order saveOrder(Order order) {
		order.setCreatedAt(LocalDateTime.now());
		return orderRepository.save(order);
	}
	public List<Order> getOrdersByEmail(String email){
		return orderRepository.findByEmail(email);
	}

}
