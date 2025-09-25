package com.example.demo10.Service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo10.Entity.User;
import com.example.demo10.Repository.UserRepository;

@Service
public class CustomUserDetailsService {

    @Autowired
    private UserRepository userRepository;

    // Load user by email (simple lookup, no Spring Security UserDetails)
    public User loadUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    /*
    // If you had admin-specific lookup, you can implement similarly
    public Admin loadAdminByEmail(String email) {
        return adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
    }
    */
}

