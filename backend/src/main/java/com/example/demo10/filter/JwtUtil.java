package com.example.demo10.filter;



import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	@Value("${jwt.secret}")
	  private  String secretKey;
	    private static final long EXPIRATION_TIME = 1000 * 600 * 600; // 1 hour
	 
	    private Key getSigningKey() {
	       
	        return Keys.hmacShaKeyFor(secretKey.getBytes());
	    }
	    public String extractUsername(String token) {
	        return extractClaim(token, Claims::getSubject);
	    }
	    public Date extractExpiration(String token) {
	        return extractClaim(token, Claims::getExpiration);
	    }
	    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
	        Claims claims = Jwts.parserBuilder()
	                .setSigningKey(getSigningKey())
	                .build()
	                .parseClaimsJws(token)
	                .getBody();
	        return claimsResolver.apply(claims);
	    }
	    public boolean isTokenExpired(String token) {
	        return extractExpiration(token).before(new Date());
	    }
	    public boolean validateToken(String token, UserDetails userDetails) {
	        final String username = extractUsername(token);
	        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	    }
	    public String generateToken(UserDetails userDetails) {
	        Map<String, Object> claims = new HashMap<>();
	        
	        // Extract role from userDetails and add it to claims
	        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
	        String role = authorities.stream().findFirst().get().getAuthority(); // e.g., "ROLE_ADMIN"
	     
	        claims.put("role", role.replace("ROLE_", "")); // "ADMIN" or "USER"
	     
	        return createToken(claims, userDetails.getUsername());
	    }
	    private String createToken(Map<String, Object> claims, String subject) {
	        return Jwts.builder()
	                .setClaims(claims)
	                .setSubject(subject)
	                .setIssuedAt(new Date(System.currentTimeMillis()))
	                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hrs
	                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes())
	                .compact();
	    }
}
