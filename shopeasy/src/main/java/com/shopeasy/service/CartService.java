package com.shopeasy.service;

import com.shopeasy.Dto.CartDTO;

public interface CartService {

    CartDTO addToCart(String email, Long productId, Integer quantity);

    CartDTO getCart(String email);

    CartDTO updateQuantity(String email, Long cartItemId, Integer quantity);

    void removeItem(String email, Long cartItemId);

    void clearCart(String email);

}