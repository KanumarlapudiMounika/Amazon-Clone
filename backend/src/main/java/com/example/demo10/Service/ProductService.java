package com.example.demo10.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo10.Entity.Product;
import com.example.demo10.Entity.Subcategory;
import com.example.demo10.Repository.ProductRepository;
import com.example.demo10.Repository.SubcategoryRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private SubcategoryRepository subRepo;
	
	@Autowired
	public ProductService(ProductRepository productRepository) {
		this.productRepository=productRepository;
	}
public List<Product> getByCategoryAndSubcategory(String category,String subcategory){
	return productRepository.findByCategoryIgnoreCaseAndSubcategoryIgnoreCase(category, subcategory);
}
	public List<Product> getAllProducts(){
		return productRepository.findAll();
	}
	public List<Product> getProductsByCategory(String category){
		return productRepository.findByCategory(category);
	}
	public List<Product> filterByPrice(double min,double max){
		return productRepository.findByPriceBetween(min, max);
	}
	public List<Product> filterByRating(double rating){
		return productRepository.findByRatingGreaterThanEqual(rating);
	}
	
	public List<Product> filterByPriceAndSubcategory(double min, double max, String subcategory) {
	    return productRepository.findByPriceBetweenAndSubcategory(min, max, subcategory);
	}
	 
	public List<Product> filterByRatingAndSubcategory(double rating, String subcategory) {
	    return productRepository.findByRatingGreaterThanEqualAndSubcategory(rating, subcategory);
	}
	 
	public List<Product> getProductsBySubcategory(String subcategory) {
	    return productRepository.findBySubcategory(subcategory);
	}
	
	public List<Product> searchProducts(String keyword){
		return productRepository.findByNameContainingIgnoreCase(keyword);
	}
	public List<Product> getFilteredProducts(String subcategory, Double rating) {
	    if (subcategory != null && !subcategory.isEmpty() && rating != null) {
	        return productRepository.findBysubcategoryAndRating(subcategory, rating);
	    } else if (subcategory != null && !subcategory.isEmpty()) {
	        return productRepository.findByname(subcategory);
	    } else if (rating != null) {
	        return productRepository.findByRating(rating);
	    }else {
	    	return null;
	    }
	}
	 
	 
	public List<Product> getProductByName(String name) {
		return productRepository.findByNameIgnoreCase(name);
	}
	public List<Product> filterProducts(Double minPrice, Double maxPrice) {
	    if (minPrice != null && maxPrice != null ) {
	        return productRepository.findByPriceBetween(minPrice, maxPrice);
	    }   else {
	        return productRepository.findAll(); // no filters applied
	    }
	}
	public List<Product> findByRatingGreaterThanEqual(double rating) {
	    return productRepository.findByRatingGreaterThanEqual(rating);
	}
	
}
