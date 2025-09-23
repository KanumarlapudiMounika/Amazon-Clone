package com.example.demo10.Repository;

import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo10.Entity.User;



@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	 Optional<User> findByEmail(String email);
	 User findByName(String email);
	 List<User> findByCreatedAtBetween(LocalDateTime startDate,LocalDateTime endDate);
	 List<User> findByIsBlocked(boolean isBlocked);
}
