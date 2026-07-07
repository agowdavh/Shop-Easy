package com.shopeasy.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.shopeasy.Dto.CartDTO;
import com.shopeasy.Dto.CartItemDTO;
import com.shopeasy.entity.Cart;
import com.shopeasy.entity.CartItem;
import com.shopeasy.entity.Product;
import com.shopeasy.entity.User;
import com.shopeasy.repository.CartItemRepository;
import com.shopeasy.repository.CartRepository;
import com.shopeasy.repository.ProductRepository;
import com.shopeasy.repository.UserRepository;
import com.shopeasy.service.CartService;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartServiceImpl(CartRepository cartRepository,
                           CartItemRepository cartItemRepository,
                           ProductRepository productRepository,
                           UserRepository userRepository) {

        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public CartDTO addToCart(String email, Long productId, Integer quantity) {

        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than zero");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUserEmail(email).orElse(null);

        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart = cartRepository.save(cart);
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = cartItemRepository
                .findByCartIdAndProductId(cart.getId(), productId)
                .orElse(null);

        if (cartItem == null) {

            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setPrice(product.getPrice());
            cartItem.setQuantity(quantity);

        } else {

            cartItem.setQuantity(cartItem.getQuantity() + quantity);

        }

        if (cartItem.getQuantity() > product.getStock()) {
            throw new RuntimeException("Insufficient stock");
        }

        cartItem.setSubtotal(cartItem.getPrice() * cartItem.getQuantity());

        cartItemRepository.save(cartItem);

        return getCart(email);
    }

    @Override
    public CartDTO getCart(String email) {

        Cart cart = cartRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        return mapToDTO(cart);
    }

    @Override
    public CartDTO updateQuantity(String email, Long cartItemId, Integer quantity) {

        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than zero");
        }

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart Item not found"));

        if (quantity > cartItem.getProduct().getStock()) {
            throw new RuntimeException("Insufficient stock");
        }

        cartItem.setQuantity(quantity);
        cartItem.setSubtotal(cartItem.getPrice() * quantity);

        cartItemRepository.save(cartItem);

        return getCart(email);
    }

    @Override
    public void removeItem(String email, Long cartItemId) {

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart Item not found"));

        cartItemRepository.delete(cartItem);
    }

    @Override
    public void clearCart(String email) {

        Cart cart = cartRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cartItemRepository.deleteAll(cart.getCartItems());
    }

    private CartDTO mapToDTO(Cart cart) {

        CartDTO dto = new CartDTO();

        dto.setCartId(cart.getId());

        List<CartItemDTO> itemDTOList = new ArrayList<>();

        double totalAmount = 0.0;
        int totalItems = 0;

        for (CartItem item : cart.getCartItems()) {

            CartItemDTO itemDTO = new CartItemDTO();

            itemDTO.setId(item.getId());
            itemDTO.setProductId(item.getProduct().getId());
            itemDTO.setProductName(item.getProduct().getProductName());
            itemDTO.setImageUrl(item.getProduct().getImageUrl());
            itemDTO.setPrice(item.getPrice());
            itemDTO.setQuantity(item.getQuantity());
            itemDTO.setSubtotal(item.getSubtotal());

            itemDTOList.add(itemDTO);

            totalAmount += item.getSubtotal();
            totalItems += item.getQuantity();
        }

        dto.setItems(itemDTOList);
        dto.setTotalAmount(totalAmount);
        dto.setTotalItems(totalItems);

        return dto;
    }

}