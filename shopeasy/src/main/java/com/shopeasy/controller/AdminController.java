package com.shopeasy.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopeasy.Dto.AdminDashboardDTO;
import com.shopeasy.Dto.OrderDTO;
import com.shopeasy.Dto.UpdateOrderStatusRequest;
import com.shopeasy.Dto.UserProfileDTO;
import com.shopeasy.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/dashboard")
    public AdminDashboardDTO getDashboard() {

        return adminService.getDashboard();
    }

    @GetMapping("/orders")
    public List<OrderDTO> getAllOrders() {

        return adminService.getAllOrders();
    }

    @PutMapping("/orders/{orderId}")
    public OrderDTO updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody UpdateOrderStatusRequest request) {

        return adminService.updateOrderStatus(orderId, request.getStatus());
    }

    @GetMapping("/users")
    public List<UserProfileDTO> getAllUsers() {

        return adminService.getAllUsers();
    }

    @PutMapping("/users/{userId}/enable")
    public String enableUser(@PathVariable Long userId) {

        adminService.enableUser(userId);

        return "User Enabled Successfully";
    }

    @PutMapping("/users/{userId}/disable")
    public String disableUser(@PathVariable Long userId) {

        adminService.disableUser(userId);

        return "User Disabled Successfully";
    }

}