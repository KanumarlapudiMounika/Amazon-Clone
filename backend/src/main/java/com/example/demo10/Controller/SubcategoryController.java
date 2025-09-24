package com.example.demo10.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo10.Entity.Subcategory;
import com.example.demo10.Service.SubcategoryService;

@RestController
@CrossOrigin("https://gentle-rock-0cd317e00.2.azurestaticapps.net")
@RequestMapping("api/subcategory")


public class SubcategoryController {
 
	@Autowired
	public SubcategoryService subCategoryService;
	
	@GetMapping("/{category}")
	public List<Subcategory> getAllCategories(@PathVariable String category){
		System.out.println(category);
		return subCategoryService.getAllCategories(category);
	}
}
