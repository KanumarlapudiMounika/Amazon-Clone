package com.example.demo10.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demo10.filter.JwtAuthenticationFilter;
 
@Configuration
@EnableWebSecurity
public class SecurityConfig {
	 @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
	 @Autowired
	 private JwtAuthenticationFilter jwtAuthenticationFilter;
	    @Bean
	    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
	        return authenticationConfiguration.getAuthenticationManager();
	    }
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.cors().and()
        .csrf().disable()
        .authorizeHttpRequests()
            .requestMatchers("/api/auth/register","/api/auth/admin/**", "/api/auth/login","/api/auth/**","/api/admin/users","/api/admin/users/**").permitAll() 
            .requestMatchers("/admin/**","/api/auth/admin/login").hasRole("ADMIN")
            .requestMatchers("/api/products/**").permitAll()
            .requestMatchers("/Products/**").permitAll()
            .requestMatchers("api/cart/**").permitAll()
            .requestMatchers("/api/subcategory/**").permitAll()
           .requestMatchers("/api/auth/login").hasRole("USER") // Allow register & login
            .requestMatchers(HttpMethod.GET, "/api/profile/**").permitAll()  // Allow GET for profiles
            .requestMatchers(HttpMethod.PUT, "/api/profile/**").permitAll()  // Allow PUT for profiles
            .requestMatchers(HttpMethod.POST, "/api/profile/**").authenticated()  // Require auth for POST
            .requestMatchers(HttpMethod.GET, "/api/admin/users/**").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/admin/users/**").authenticated()  // Require auth for POST
            .requestMatchers(HttpMethod.POST, "/api/auth/admin/**").authenticated()
            .requestMatchers(HttpMethod.PUT, "/api/admin/users/**").permitAll()  // Allow PUT for profiles
            .requestMatchers(HttpMethod.DELETE, "/api/admin/users/**").permitAll()  // Allow PUT for profiles
            .requestMatchers(HttpMethod.GET,"/api/products/**").permitAll()
            .requestMatchers(HttpMethod.GET,"/Products/**").permitAll()
            .requestMatchers(HttpMethod.GET,"/api/subcategory/**").permitAll()
            .requestMatchers(HttpMethod.POST,"/api/cart/**").permitAll()
            .requestMatchers(HttpMethod.PUT,"/api/cart/**").permitAll()
            .requestMatchers(HttpMethod.DELETE,"/api/cart/**").permitAll()
            .anyRequest().authenticated()
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
       // .and()
      //  .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
 
return http.build();
}
	
	
 
   
}