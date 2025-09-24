package com.example.demo10.Controller;
import com.example.demo10.Dto.CartItemDto;
import com.example.demo10.Entity.*;
import com.example.demo10.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map; 
import com.example.demo10.Service.*;
@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "https://gentle-rock-0cd317e00.2.azurestaticapps.net")
public class CartController {
 
	@Autowired private cartService cartItemService;
	 
    @PostMapping("/add/{userId}")
    public ResponseEntity<CartItem> addToCart(@RequestBody CartItemDto dto, @PathVariable Long userId) {
        return ResponseEntity.ok(cartItemService.addToCart(dto, userId));
    }
 
    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> getUserCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartItemService.getCartItemsByUser(userId));
    }
 
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Long id) {
        cartItemService.removeCartItem(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/cart/update")
    public ResponseEntity<?> updateCartItem(@RequestBody CartItemDto cartItemDTO) {
        cartItemService.updateCartItem(cartItemDTO);
        return ResponseEntity.ok().build();
    }
}
