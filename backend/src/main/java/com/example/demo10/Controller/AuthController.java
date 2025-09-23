package com.example.demo10.Controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo10.Dto.AdminDto;
import com.example.demo10.Dto.UserDto;

import com.example.demo10.Entity.User;
import com.example.demo10.Repository.UserRepository;
import com.example.demo10.Service.UserService;
import com.example.demo10.filter.*;

@CrossOrigin("https://amazonfe.azurewebsites.net")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	 @Autowired
	    private UserService userService;
	 @Autowired
	 private JwtUtil jwtUtil;
	 
	    @Autowired
	    private AuthenticationManager authenticationManager;
	    
	    @Autowired
	    private UserRepository userRepo;
	 
	    @Autowired
	    private UserDetailsService userDetailsService;
	   
	    public AuthController(AuthenticationManager authenticationManager) {
	        this.authenticationManager = authenticationManager;
	    }
	 
	    @PostMapping("/register")
	    public ResponseEntity<User> registerUser(@RequestBody UserDto userDto) {
	        return ResponseEntity.ok(userService.registerUser(userDto));
	    }
	    @GetMapping("/{email}")
	    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String token) {
	        String email = jwtUtil.extractUsername(token.replace("Bearer ", ""));
	        User user = userService.getUserProfile(email);
	        return ResponseEntity.ok(user);
	    }
	    
	    
	    
	    
	    
	    
	    
	  /*  @PostMapping("/admin/login")
	    public ResponseEntity<?> loginAdmin(@RequestBody UserDto adminDto) {
	        try {
	            // Authenticate the admin
	            Authentication authentication = authenticationManager.authenticate(
	                    new UsernamePasswordAuthenticationToken(adminDto.getEmail(), adminDto.getPassword())
	            );
	     
	            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
	     
	            // Now pass UserDetails (not just username)
	            String token = jwtUtil.generateToken(userDetails);
	     
	            // Extract role from userDetails
	            String role = userDetails.getAuthorities().stream()
	                    .findFirst()
	                    .get()
	                    .getAuthority()
	                    .replace("ROLE_", "");
	     
	            // Return token and role (optional but useful for frontend)
	            Map<String, String> response = new HashMap<>();
	            response.put("token", token);
	            response.put("role", role);
	     
	            return ResponseEntity.ok(response);
	     
	        } catch (BadCredentialsException e) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed: " + e.getMessage());
	        }
	    }*/
	    
	    @PostMapping("/admin/login")
	    public ResponseEntity<?> loginAdmin(@RequestBody UserDto adminDto) {
	        try {
	            // Authenticate the user
	            Authentication authentication = authenticationManager.authenticate(
	                    new UsernamePasswordAuthenticationToken(adminDto.getEmail(), adminDto.getPassword())
	            );
	     
	            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
	     
	            // Generate JWT token
	            String token = jwtUtil.generateToken(userDetails);
	     
	            // Fetch the actual user entity from the DB
	            User user = userRepo.findByEmail(adminDto.getEmail())
	                    .orElseThrow(() -> new RuntimeException("User not found"));
	     
	            // Extract role from userDetails
	            String role = userDetails.getAuthorities().stream()
	                    .findFirst()
	                    .get()
	                    .getAuthority()
	                    .replace("ROLE_", "");
	     
	            // Prepare response
	            Map<String, Object> response = new HashMap<>();
	            response.put("token", token);
	            response.put("role", role);
	            response.put("user", user);  // This is the important part
	     
	            return ResponseEntity.ok(response);
	     
	        } catch (BadCredentialsException e) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
	        }
	    }
}
