package com.example.demo10.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.demo10.Entity.User;

import com.example.demo10.Repository.UserRepository;
import com.example.demo10.Dto.*;

@Service
public class UserProfileService {
	@Autowired
    private UserRepository profileRepository;
 
    @Autowired
    private UserRepository userRepository;
 
    public UserDto getProfile(String email) {
        Optional<User> profile = profileRepository.findByEmail(email);
        if (profile.isPresent()) {
            User user = profile.get();
            UserDto dto = new UserDto();
            dto.setName(user.getName());
            dto.setEmail(user.getEmail());
            dto.setPhone(user.getPhone());
            dto.setAddress(user.getAddress());
            return dto;
        }
       return null;
    }
 
    public void updateProfile(String email, UserDto profileDto) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            User profile = userRepository.findByEmail(email).orElse(new User());
          
            profile.setPhone(profileDto.getPhone());
            profile.setAddress(profileDto.getAddress());
            userRepository.save(profile);
        }
    }
  
    }
