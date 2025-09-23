package com.example.demo10.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import com.example.demo10.Entity.User;

import com.example.demo10.Repository.UserRepository;

@Service

public class CustomUserDetailsService implements UserDetailsService
{

	     @Autowired
	    private UserRepository userRepository;
	    
	 
	   public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	        User user = userRepository.findByEmail(email)
	                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
	return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),
					Collections.singleton(new SimpleGrantedAuthority("ROLE_"+user.getRole())));
	    }
	  /*  
	    public UserDetails loadAdminByUsername(String email) throws UsernameNotFoundException {
	        Admin admin = adminRepository.findByEmail(email)
	                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
	return new org.springframework.security.core.userdetails.User(admin.getEmail(),admin.getPassword(),
					new ArrayList<>());
	    }*/
	     
	     
	   /*  @Override
	     public UserDetails loadUserByUsername(String username) {
	         System.out.println("Trying to authenticate: " + username);
	      
	         Optional<Admin> adminOpt = adminRepository.findByName(username);
	         if (adminOpt.isPresent()) {
	             System.out.println("Admin found!");
	             return new AdminUserDetails(adminOpt.get());
	         }
	         else {
	         Optional<User> userOpt = userRepository.findByName(username);
	         if (userOpt.isPresent()) {
	             System.out.println("User found!");
	             return new NormalUserDetails(userOpt.get());
	         }
	      
	         System.out.println("No user found!");
	         throw new UsernameNotFoundException("User not found");
	     }
	     }*/
	     
	   
}
