package com.example.demo10.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo10.Dto.UserDto;
import com.example.demo10.Entity.User;
import com.example.demo10.Repository.UserRepository;
import com.example.demo10.Service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepo;

    // Register user
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.registerUser(userDto));
    }

    // Get user profile by email
    @GetMapping("/{email}")
    public ResponseEntity<?> getUserProfile(@PathVariable String email) {
        User user = userService.getUserProfile(email);
        return ResponseEntity.ok(user);
    }

    // Simple test API
    @PostMapping("/app")
    public String apptest() {
        return "I am working:";
    }

    // Admin/User login without Spring Security
    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestBody UserDto adminDto) {
        User user = userRepo.findByEmail(adminDto.getEmail())
                .orElse(null);

        if (user == null || !user.getPassword().equals(adminDto.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        // Return user info and role
        Map<String, Object> response = new HashMap<>();
        response.put("role", user.getRole());
        response.put("user", user);

        return ResponseEntity.ok(response);
    }
}

