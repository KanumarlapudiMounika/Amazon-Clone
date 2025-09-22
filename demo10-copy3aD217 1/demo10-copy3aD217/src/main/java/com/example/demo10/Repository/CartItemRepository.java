package com.example.demo10.Repository;
import com.example.demo10.Entity.*;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
 
public interface CartItemRepository extends JpaRepository<CartItem,Long>{
	
	  List<CartItem> findByUser_Id(Long userId);
}