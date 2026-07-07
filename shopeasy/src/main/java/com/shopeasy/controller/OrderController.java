package com.shopeasy.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.shopeasy.Dto.OrderDTO;
import com.shopeasy.Dto.PlaceOrderRequest;
import com.shopeasy.service.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/orders")
@Validated
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/place")
    public OrderDTO placeOrder(
            Authentication authentication,
            @Valid @RequestBody PlaceOrderRequest request) {

        return orderService.placeOrder(authentication.getName(), request);
    }

    @GetMapping
    public List<OrderDTO> getMyOrders(Authentication authentication) {

        return orderService.getMyOrders(authentication.getName());
    }

    @GetMapping("/{id}")
    public OrderDTO getOrder(
            Authentication authentication,
            @PathVariable Long id) {

        return orderService.getOrderById(authentication.getName(), id);
    }

    @PutMapping("/{id}/cancel")
    public OrderDTO cancelOrder(
            Authentication authentication,
            @PathVariable Long id) {

        return orderService.cancelOrder(authentication.getName(), id);
    }
}