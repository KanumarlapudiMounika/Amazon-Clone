package com.example.demo10.Repository;

import java.util.List;
import com.example.demo10.Entity.*;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface ProductRepository extends JpaRepository<Product,Long>{
		List<Product> findByCategory(String category);
		List<Product> findByPriceBetween(double min,double max);
		List<Product> findByRatingGreaterThanEqual(double rating);
		List<Product> findByNameContainingIgnoreCase(String name);
		List<Product> findByNameIgnoreCase(String name);
		List<Product> findByPriceBetweenAndSubcategory(double minPrice, double maxPrice, String subcategory);
		List<Product> findByRatingGreaterThanEqualAndSubcategory(double rating, String subcategory);
		List<Product> findBySubcategory(String subcategory);
		List<Product> findByCategoryAndSubcategoryAndNameNot(String category,String subcategory,String excludeName);
		List<Product> findByCategoryIgnoreCaseAndSubcategoryIgnoreCase(String category,String subcategory);
		List<Product> findByPriceBetweenAndRatingGreaterThanEqual(double minPrice, double maxPrice, double rating);
		public List<Product> findByRating(double rating);
		
	
		List<Product> findBysubcategoryAndRating(String subcategory, double rating);
		List<Product> findByname(String subcategory);
	
		 
		 
}

