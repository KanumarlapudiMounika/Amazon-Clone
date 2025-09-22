package com.example.demo10.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Webconfig implements WebMvcConfigurer {
	
	public void addResourceHandler(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/Products/**")
		.addResourceLocations("file:///C:Users/Kanumarlapudi.m/E-commerce-images/Products/");
		
	}
	 @Bean
	    public WebMvcConfigurer corsConfigurer() {
	        return new WebMvcConfigurer() {
	            @Override
	            public void addCorsMappings(CorsRegistry registry) {
	                registry.addMapping("/**")
	.allowedOrigins("https://think-frontend.azurewebsites.net")
	                        .allowedMethods("*")
	                        .allowedHeaders("*")
	                        .allowCredentials(true);
	            }
	        };
	    }
}
