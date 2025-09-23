package com.example.demo10.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo10.Entity.Subcategory;
@Repository
public interface SubcategoryRepository extends JpaRepository<Subcategory,Long> {
		public List<Subcategory> findByCategory(String category);
		
}
