package com.example.demo10.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo10.Entity.User;
import com.example.demo10.Repository.UserRepository;

@Service
public class AdminUserService {
	  @Autowired
	    private UserRepository userRepository;
	 
	    public List<User> getAllUsers() {
	        return userRepository.findAll();
	    }
	 
	    public void blockUser(Long id) {
	        User user = userRepository.findById(id).orElseThrow();
	        user.setBlocked(true);
	        userRepository.save(user);
	    }
	 
	    public void unblockUser(Long id) {
	        User user = userRepository.findById(id).orElseThrow();
	        user.setBlocked(false);
	        userRepository.save(user);
	    }
	 
	    public void deleteUser(Long id) {
	        userRepository.deleteById(id);
	    }
	 
	    public List<User> filterUsersByDate(LocalDateTime start, LocalDateTime end) {
	        return userRepository.findByCreatedAtBetween(start, end);
	    }
	 
	    public List<User> filterUsersByBlockedStatus(boolean isBlocked) {
	        return userRepository.findByIsBlocked(isBlocked);
	    }
}
