package com.example.demo10.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo10.Entity.Product;
import com.example.demo10.Entity.Subcategory;
import com.example.demo10.Repository.ProductRepository;
import com.example.demo10.Service.ProductService;


@CrossOrigin("https://amazonfe.azurewebsites.net")
@RequestMapping("/api/products")
@RestController
public class ProductController {
	@Autowired
	private ProductService productService;
	@Autowired
	private ProductRepository productRepository;
	@GetMapping("/search")
	public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword){
		List<Product> results=productService.searchProducts(keyword);
		return ResponseEntity.ok(results);
	}
	
	@GetMapping("/list")
	public List<Product> getAllProducts(){
		return productService.getAllProducts();
	}
	@GetMapping("/category/{category}")
	public List<Product> getByCategory(@PathVariable String category){
		return productService.getProductsByCategory(category);
	}
	@GetMapping("/{category}/{subcategory}")
	public ResponseEntity<List<Product>> getByCategoryAndSubcategory(@PathVariable String category,@PathVariable String subcategory){
		List<Product> products=productService.getByCategoryAndSubcategory(category, subcategory);
		return ResponseEntity.ok(products);
	}
	@GetMapping("/filter")
	public List<Product> filterByPriceAndRatingAndSubcategory(
	        @RequestParam(required = false) Double minPrice,
	        @RequestParam(required = false) Double maxPrice,
	        @RequestParam(required = false) Double rating,
	        @RequestParam(required = false) String subcategory) {
	 
	    if (minPrice != null && maxPrice != null && subcategory != null) {
	        return productService.filterByPriceAndSubcategory(minPrice, maxPrice, subcategory);
	    } else if (rating != null && subcategory != null) {
	        return productService.filterByRatingAndSubcategory(rating, subcategory);
	    } else if (subcategory != null) {
	        return productService.getProductsBySubcategory(subcategory); // fallback
	    } else {
	        return productService.getAllProducts(); // fallback
	    }
	}
	
	/*@GetMapping("/rating")
	public List<Product> getFilteredProducts(
	        @RequestParam(required = false) String subcategory,
	        @RequestParam(required = false) Double rating) {
	    return productService.getFilteredProducts(subcategory, rating);
	}
	*/
	/*@GetMapping("/filter")
	public List<Product> filterProducts(Double minPrice, Double maxPrice) {
	    if (minPrice != null && maxPrice != null ) {
	        return productRepository.findByPriceBetween(minPrice, maxPrice);
	    } else if (minPrice != null || maxPrice != null) {
	        // handle partial price range if needed
	    }
	 
	    return productRepository.findAll();
	}
	 */
	
	
	@GetMapping("/rating")
	public List<Product> getProductsByRating(@RequestParam(required = false) Double rating) {
	    if (rating != null) {
	        return productService.findByRatingGreaterThanEqual(rating);
	    } else {
	        return productService.getAllProducts();
	    }
	}
	@GetMapping("/name/{name}")
	public ResponseEntity<List<Product>> getProductByName(@PathVariable String name){
		List<Product> product = productService.getProductByName(name);
		return ResponseEntity.ok(product);
	}

	@GetMapping("/related")
	public List<Product> getRelatedProducts(@RequestParam String category,@RequestParam String subcategory,@RequestParam String excludeName){
		return productRepository.findByCategoryAndSubcategoryAndNameNot(category,subcategory,excludeName);
	}
}
