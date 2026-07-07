package com.shopeasy.service;

import java.util.List;

import com.shopeasy.Dto.OrderDTO;
import com.shopeasy.Dto.PlaceOrderRequest;

public interface OrderService {

    OrderDTO placeOrder(String email, PlaceOrderRequest request);

    List<OrderDTO> getMyOrders(String email);

    OrderDTO getOrderById(String email, Long orderId);

    OrderDTO cancelOrder(String email, Long orderId);

}