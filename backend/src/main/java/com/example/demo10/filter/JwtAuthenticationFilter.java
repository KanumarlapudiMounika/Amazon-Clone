package com.example.demo10.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	 @Autowired
	    private JwtUtil jwtService; // Or JwtUtil, if that’s your class name
	 
	    @Autowired
	    private UserDetailsService userDetailsService;
	 
	    @Override
	    protected void doFilterInternal(HttpServletRequest request,
	                                    HttpServletResponse response,
	                                    FilterChain filterChain) throws ServletException, IOException {
	 
	        final String authHeader = request.getHeader("Authorization");
	        String username = null;
	        String jwt = null;
	 
	        if (authHeader != null && authHeader.startsWith("Bearer ")) {
	            jwt = authHeader.substring(7); // Remove "Bearer " prefix
	            username = jwtService.extractUsername(jwt); // Extract from "sub" claim
	        }
	 
	        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
	 
	            if (jwtService.validateToken(jwt, userDetails)) {
	                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
	                        userDetails,
	                        null,
	                        userDetails.getAuthorities()
	                );
	                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	                SecurityContextHolder.getContext().setAuthentication(authToken);
	            }
	        }
	 
	        filterChain.doFilter(request, response);
	    }
}
