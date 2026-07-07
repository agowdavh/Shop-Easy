package com.shopeasy.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopeasy.Dto.CartDTO;
import com.shopeasy.service.CartService;

import jakarta.validation.constraints.Min;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add/{productId}/{quantity}")
    public CartDTO addToCart(
            Authentication authentication,
            @PathVariable Long productId,
            @PathVariable @Min(1) Integer quantity) {

        String email = authentication.getName();

        return cartService.addToCart(email, productId, quantity);
    }

    @GetMapping
    public CartDTO getCart(Authentication authentication) {

        String email = authentication.getName();

        return cartService.getCart(email);
    }

    @PutMapping("/update/{cartItemId}/{quantity}")
    public CartDTO updateQuantity(
            Authentication authentication,
            @PathVariable Long cartItemId,
            @PathVariable @Min(1) Integer quantity) {

        String email = authentication.getName();

        return cartService.updateQuantity(email, cartItemId, quantity);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public String removeItem(
            Authentication authentication,
            @PathVariable Long cartItemId) {

        String email = authentication.getName();

        cartService.removeItem(email, cartItemId);

        return "Item removed from cart successfully";
    }

    @DeleteMapping("/clear")
    public String clearCart(Authentication authentication) {

        String email = authentication.getName();

        cartService.clearCart(email);

        return "Cart cleared successfully";
    }

}