package com.shopeasy.service;

import java.util.List;

import com.shopeasy.Dto.ProductDTO;

public interface ProductService {

    ProductDTO addProduct(ProductDTO productDTO);

    List<ProductDTO> getAllProducts();

    ProductDTO getProductById(Long id);

    ProductDTO updateProduct(Long id, ProductDTO productDTO);

    void deleteProduct(Long id);

    List<ProductDTO> getProductsByCategory(Long categoryId);

    List<ProductDTO> searchProducts(String keyword);

}