package com.example.demo10.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo10.Dto.UserDto;

import com.example.demo10.Service.UserProfileService;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins="*")
public class UserProfileController {
	@Autowired
    private UserProfileService profileService;
 
    @GetMapping("/{email}")
    public ResponseEntity<UserDto> getProfile(@PathVariable String email) {
        UserDto profile = profileService.getProfile(email);
        return ResponseEntity.ok(profile);
    }
 
    @PutMapping("/{email}")
    public ResponseEntity<String> updateProfile(@PathVariable String email, @RequestBody UserDto profileDto) {
        profileService.updateProfile(email, profileDto);
        return ResponseEntity.ok("Profile updated successfully");
    }
	
	
	
}
