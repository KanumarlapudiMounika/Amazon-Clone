package com.example.demo10.Controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo10.Dto.AdminDto;
import com.example.demo10.Entity.User;
import com.example.demo10.Service.AdminUserService;
import com.example.demo10.Service.UserService;
import com.example.demo10.filter.JwtUtil;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasAuthority('ADMIN')")
@CrossOrigin(origins="https://amazonfe.azurewebsites.net")


public class AdminUserController {
	 @Autowired
	    private AdminUserService adminUserService;
	 @Autowired
	 private UserService userService;
	 
	 @Autowired
	    private AuthenticationManager authenticationManager;
	 
	 @Autowired
	 private JwtUtil jwtUtil;
	 @GetMapping("/List")
	    public List<User> getAllUsers() {
	        return userService.getAllUsers();
	    }
	    @DeleteMapping("/{id}")
	    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
	        userService.deleteUserById(id);
	        return ResponseEntity.ok("User deleted successfully");
	    }
	    @PutMapping("/block/{id}")
	    public ResponseEntity<String> blockUser(@PathVariable Long id) {
	        userService.blockUser(id);
	        return ResponseEntity.ok("User blocked successfully");
	    }
	    @PutMapping("/unblock/{id}")
	    public ResponseEntity<Void> unblockUser(@PathVariable Long id) {
	        adminUserService.unblockUser(id);
	        return ResponseEntity.ok().build();
	    }
	    @GetMapping("/filter/date")
	    public ResponseEntity<List<User>> filterByDate(
	            @RequestParam String start,
	            @RequestParam String end) {
	        LocalDateTime s = LocalDateTime.parse(start);
	        LocalDateTime e = LocalDateTime.parse(end);
	        return ResponseEntity.ok(adminUserService.filterUsersByDate(s, e));
	    }
	    @GetMapping("/filter/status")
	    public ResponseEntity<List<User>> filterByBlocked(@RequestParam boolean status) {
	        return ResponseEntity.ok(adminUserService.filterUsersByBlockedStatus(status));
	    }	 
}
