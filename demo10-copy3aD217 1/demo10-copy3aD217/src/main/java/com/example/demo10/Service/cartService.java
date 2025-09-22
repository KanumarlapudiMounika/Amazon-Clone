package com.example.demo10.Service;

import com.example.demo10.Dto.CartItemDto;
import com.example.demo10.Entity.*;
import com.example.demo10.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class cartService {
	 @Autowired private CartItemRepository cartItemRepo;
	    @Autowired private ProductRepository productRepo;
	    @Autowired private UserRepository userRepo;

	   
	    public CartItem addToCart(CartItemDto dto, Long userId) {
	        Product product = productRepo.findById(dto.getProductId())
	                          .orElseThrow(() -> new RuntimeException("Product not found"));
	        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
	 
	        CartItem item = new CartItem();
	        item.setProduct(product);
	        item.setQuantity(dto.getQuantity());
	        item.setUser(user);
	        return cartItemRepo.save(item);
	    }
	 
	   
	    public List<CartItem> getCartItemsByUser(Long userId) {
	        return cartItemRepo.findByUser_Id(userId);
	    }
	 
	 
	    public void removeCartItem(Long cartItemId) {
	        cartItemRepo.deleteById(cartItemId);
	    }
	    
	    public void updateCartItem(CartItemDto dto) {
	        CartItem item = cartItemRepo.findById(dto.getProductId())
	                            .orElseThrow(() -> new RuntimeException("Cart item not found"));
	        item.setQuantity(dto.getQuantity());
	        cartItemRepo.save(item);
	    }
}
