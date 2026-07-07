package com.shopeasy.service.impl;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import com.shopeasy.Dto.CategoryDTO;
import com.shopeasy.entity.Category;
import com.shopeasy.exception.CategoryAlreadyExistsException;
import com.shopeasy.exception.CategoryNotFoundException;
import com.shopeasy.repository.CategoryRepository;
import com.shopeasy.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

	
	private final CategoryRepository categoryRepository;
	
	public CategoryServiceImpl(CategoryRepository categoryRepository) {
		this.categoryRepository=categoryRepository;
	}
	
	
	
	
	@Override
	public CategoryDTO addCategory(CategoryDTO categoryDTO) {

	    if (categoryRepository.existsByName(categoryDTO.getName())) {
	        throw new CategoryAlreadyExistsException("Category already exists");
	    }

	    Category category = mapToEntity(categoryDTO);
	    Category savedCategory = categoryRepository.save(category);

	    CategoryDTO response = mapToDTO(savedCategory);

	    return response;
	}

	@Override
	public List<CategoryDTO> getAllCategories() {
		List<Category> categories = categoryRepository.findAll();
		List<CategoryDTO> categoryDtoList = new ArrayList<>();
		for(Category category:categories) {
			CategoryDTO categoryDTO = mapToDTO(category);
			categoryDtoList.add(categoryDTO);
		}
		
		return categoryDtoList;
	}

	@Override
	public CategoryDTO getCategoryById(Long id) {
		Category category = categoryRepository.findById(id).orElseThrow(()->new CategoryNotFoundException("Category not found"));
		return mapToDTO(category);
	}

	@Override
	public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
		Category category = categoryRepository.findById(id).orElseThrow(()->new CategoryNotFoundException("Category not found"));
		category.setName(categoryDTO.getName());
		category.setImageUrl(categoryDTO.getImageUrl());
		category.setDescription(categoryDTO.getDescription());
		category.setActive(categoryDTO.getActive());
		Category save = categoryRepository.save(category);
		
		return mapToDTO(save);
	}

	@Override
	public void deleteCategory(Long id) {
		 Category category = categoryRepository.findById(id)
		            .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

		    categoryRepository.delete(category);
		
	}


	private Category mapToEntity(CategoryDTO dto) {

	    Category category = new Category();

	    category.setName(dto.getName());
	    category.setDescription(dto.getDescription());
	    category.setImageUrl(dto.getImageUrl());
	    category.setActive(dto.getActive());

	    return category;
	}

	
	private  CategoryDTO mapToDTO(Category category) {
		CategoryDTO categoryDTO = new CategoryDTO();
		categoryDTO.setId(category.getId());
		categoryDTO.setName(category.getName());
		categoryDTO.setDescription(category.getDescription());
		categoryDTO.setImageUrl(category.getImageUrl());
		categoryDTO.setActive(category.getActive());
		return categoryDTO;
	}

}
