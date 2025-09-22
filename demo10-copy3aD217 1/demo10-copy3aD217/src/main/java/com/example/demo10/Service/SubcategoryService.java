package com.example.demo10.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo10.Entity.Subcategory;
import com.example.demo10.Repository.SubcategoryRepository;
@Service
public class SubcategoryService {
		
	@Autowired
	public SubcategoryRepository subCategoryRepo;
	public List<Subcategory> getAllCategories(String category){
		return subCategoryRepo.findByCategory(category);
	}
}
