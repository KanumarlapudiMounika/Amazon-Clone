package com.example.demo10.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo10.Entity.Order;
@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
		List<Order> findByEmail(String email);
}
