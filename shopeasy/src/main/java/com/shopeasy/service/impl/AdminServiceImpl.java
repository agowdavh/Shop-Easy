package com.shopeasy.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shopeasy.Dto.AdminDashboardDTO;
import com.shopeasy.Dto.OrderDTO;
import com.shopeasy.Dto.OrderItemDTO;
import com.shopeasy.Dto.UserProfileDTO;
import com.shopeasy.entity.Order;
import com.shopeasy.entity.OrderItem;
import com.shopeasy.entity.User;
import com.shopeasy.enums.OrderStatus;
import com.shopeasy.repository.CategoryRepository;
import com.shopeasy.repository.OrderRepository;
import com.shopeasy.repository.ProductRepository;
import com.shopeasy.repository.UserRepository;
import com.shopeasy.service.AdminService;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final OrderRepository orderRepository;

    public AdminServiceImpl(UserRepository userRepository,
                            ProductRepository productRepository,
                            CategoryRepository categoryRepository,
                            OrderRepository orderRepository) {

        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public AdminDashboardDTO getDashboard() {

        AdminDashboardDTO dto = new AdminDashboardDTO();

        dto.setTotalUsers(userRepository.count());
        dto.setTotalProducts(productRepository.count());
        dto.setTotalCategories(categoryRepository.count());
        dto.setTotalOrders(orderRepository.count());

        double revenue = 0;

        for (Order order : orderRepository.findAll()) {

            if (order.getOrderStatus() == OrderStatus.DELIVERED) {
                revenue += order.getTotalAmount();
            }
        }

        dto.setTotalRevenue(revenue);

        return dto;
    }

    @Override
    public List<OrderDTO> getAllOrders() {

        List<OrderDTO> dtoList = new ArrayList<>();

        for (Order order : orderRepository.findAll()) {

            dtoList.add(mapToOrderDTO(order));

        }

        return dtoList;
    }

    @Override
    public OrderDTO updateOrderStatus(Long orderId, OrderStatus status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setOrderStatus(status);

        return mapToOrderDTO(orderRepository.save(order));
    }

    @Override
    public List<UserProfileDTO> getAllUsers() {

        List<UserProfileDTO> dtoList = new ArrayList<>();

        for (User user : userRepository.findAll()) {

            UserProfileDTO dto = new UserProfileDTO();

            dto.setId(user.getId());
            dto.setFirstName(user.getFirstName());
            dto.setLastName(user.getLastName());
            dto.setEmail(user.getEmail());
            dto.setPhone(user.getPhone());
            dto.setRole(user.getRole().name());
            dto.setEnabled(user.getEnabled());
            dtoList.add(dto);
        }

        return dtoList;
    }

    @Override
    public void enableUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEnabled(true);

        userRepository.save(user);
    }

    @Override
    public void disableUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEnabled(false);

        userRepository.save(user);
    }

    private OrderDTO mapToOrderDTO(Order order) {

        OrderDTO dto = new OrderDTO();

        dto.setOrderId(order.getId());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setOrderStatus(order.getOrderStatus().name());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setPaymentStatus(order.getPaymentStatus().name());
        dto.setOrderDate(order.getOrderDate());
        
        List<OrderItemDTO> items = new ArrayList<>();

        for (OrderItem item : order.getOrderItems()) {

            OrderItemDTO itemDTO = new OrderItemDTO();

            itemDTO.setProductId(item.getProduct().getId());
            itemDTO.setProductName(item.getProduct().getProductName());
            itemDTO.setQuantity(item.getQuantity());
            itemDTO.setPrice(item.getPrice());
            itemDTO.setSubtotal(item.getSubtotal());

            items.add(itemDTO);
        }

        dto.setItems(items);

        return dto;
    }

}