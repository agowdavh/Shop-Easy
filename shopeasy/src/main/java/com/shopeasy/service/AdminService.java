package com.shopeasy.service;

import java.util.List;

import com.shopeasy.Dto.AdminDashboardDTO;
import com.shopeasy.Dto.OrderDTO;
import com.shopeasy.Dto.UserProfileDTO;
import com.shopeasy.enums.OrderStatus;

public interface AdminService {

    AdminDashboardDTO getDashboard();

    List<OrderDTO> getAllOrders();

    OrderDTO updateOrderStatus(Long orderId, OrderStatus status);

    List<UserProfileDTO> getAllUsers();

    void enableUser(Long userId);

    void disableUser(Long userId);

}