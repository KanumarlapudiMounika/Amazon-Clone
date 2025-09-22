package com.example.demo10.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo10.Entity.User;
import com.example.demo10.Repository.UserRepository;
import com.example.demo10.Dto.*;


@Service
public class UserService {
	@Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public User registerUser(UserDto userDto) {
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setName(userDto.getName());
        user.setPhone(userDto.getPhone());
        user.setAddress(userDto.getAddress());
        user.setRole(userDto.getRole());
        user.setProfileImage(userDto.getProfileImage());
        return userRepository.save(user);
    }
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public User getUserProfile(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
 
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
    public void blockUser(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setBlocked(true);  // assuming you have a `blocked` field in User entity
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }
}
