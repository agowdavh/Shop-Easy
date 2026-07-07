package com.shopeasy.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.shopeasy.Dto.ProductDTO;
import com.shopeasy.entity.Category;
import com.shopeasy.entity.Product;
import com.shopeasy.exception.CategoryNotFoundException;
import com.shopeasy.exception.ProductNotFoundException;
import com.shopeasy.repository.CategoryRepository;
import com.shopeasy.repository.ProductRepository;
import com.shopeasy.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ProductDTO addProduct(ProductDTO productDTO) {

        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        Product product = mapToEntity(productDTO);

        product.setCategory(category);

        Product savedProduct = productRepository.save(product);

        return mapToDTO(savedProduct);
    }

    @Override
    public List<ProductDTO> getAllProducts() {

        List<Product> products = productRepository.findAll();

        List<ProductDTO> productDTOList = new ArrayList<>();

        for (Product product : products) {

            productDTOList.add(mapToDTO(product));

        }

        return productDTOList;
    }

    @Override
    public ProductDTO getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        return mapToDTO(product);
    }

    @Override
    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        product.setProductName(productDTO.getProductName());
        product.setDescription(productDTO.getDescription());
        product.setBrand(productDTO.getBrand());
        product.setPrice(productDTO.getPrice());
        product.setDiscount(productDTO.getDiscount());
        product.setStock(productDTO.getStock());
        product.setImageUrl(productDTO.getImageUrl());
        product.setActive(productDTO.getActive());
        product.setCategory(category);

        Product updatedProduct = productRepository.save(product);

        return mapToDTO(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        productRepository.delete(product);

    }

    @Override
    public List<ProductDTO> getProductsByCategory(Long categoryId) {

        List<Product> products = productRepository.findByCategoryId(categoryId);

        List<ProductDTO> productDTOList = new ArrayList<>();

        for (Product product : products) {

            productDTOList.add(mapToDTO(product));

        }

        return productDTOList;
    }

    @Override
    public List<ProductDTO> searchProducts(String keyword) {

        List<Product> products = productRepository.findByProductNameContainingIgnoreCase(keyword);

        List<ProductDTO> productDTOList = new ArrayList<>();

        for (Product product : products) {

            productDTOList.add(mapToDTO(product));

        }

        return productDTOList;
    }

  

    private Product mapToEntity(ProductDTO dto) {

        Product product = new Product();

        product.setProductName(dto.getProductName());
        product.setDescription(dto.getDescription());
        product.setBrand(dto.getBrand());
        product.setPrice(dto.getPrice());
        product.setDiscount(dto.getDiscount());
        product.setStock(dto.getStock());
        product.setImageUrl(dto.getImageUrl());

        if (dto.getActive() != null) {
            product.setActive(dto.getActive());
        }

        return product;
    }

    private ProductDTO mapToDTO(Product product) {

        ProductDTO dto = new ProductDTO();

        dto.setId(product.getId());
        dto.setProductName(product.getProductName());
        dto.setDescription(product.getDescription());
        dto.setBrand(product.getBrand());
        dto.setPrice(product.getPrice());
        dto.setDiscount(product.getDiscount());
        dto.setStock(product.getStock());
        dto.setImageUrl(product.getImageUrl());
        dto.setActive(product.getActive());

        dto.setCategoryId(product.getCategory().getId());
        dto.setCategoryName(product.getCategory().getName());

        return dto;
    }

}