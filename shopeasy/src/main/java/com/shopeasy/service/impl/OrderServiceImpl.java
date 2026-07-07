package com.shopeasy.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.shopeasy.Dto.OrderDTO;
import com.shopeasy.Dto.OrderItemDTO;
import com.shopeasy.Dto.PlaceOrderRequest;
import com.shopeasy.entity.Address;
import com.shopeasy.entity.Cart;
import com.shopeasy.entity.CartItem;
import com.shopeasy.entity.Order;
import com.shopeasy.entity.OrderItem;
import com.shopeasy.entity.Product;
import com.shopeasy.entity.User;
import com.shopeasy.enums.PaymentStatus;
import com.shopeasy.repository.AddressRepository;
import com.shopeasy.repository.CartItemRepository;
import com.shopeasy.repository.CartRepository;
import com.shopeasy.repository.OrderItemRepository;
import com.shopeasy.repository.OrderRepository;
import com.shopeasy.repository.ProductRepository;
import com.shopeasy.repository.UserRepository;
import com.shopeasy.service.OrderService;
import org.springframework.transaction.annotation.Transactional;
import com.shopeasy.enums.OrderStatus;
@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderServiceImpl(UserRepository userRepository,
                            AddressRepository addressRepository,
                            CartRepository cartRepository,
                            CartItemRepository cartItemRepository,
                            ProductRepository productRepository,
                            OrderRepository orderRepository,
                            OrderItemRepository orderItemRepository) {

        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }
    
    
   
    @Override
    public OrderDTO placeOrder(String email, PlaceOrderRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = addressRepository.findById(request.getAddressId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Invalid Address");
        }

        Cart cart = cartRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // Calculate total amount first
        double totalAmount = 0.0;

        for (CartItem cartItem : cart.getCartItems()) {

            Product product = cartItem.getProduct();

            if (product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException(product.getProductName() + " is out of stock");
            }

            totalAmount += cartItem.getSubtotal();
        }

        // Create Order
        Order order = new Order();

        order.setUser(user);
        order.setAddress(address);

        order.setPaymentMethod(request.getPaymentMethod());

        order.setOrderStatus(OrderStatus.PENDING);

        order.setPaymentStatus(PaymentStatus.PENDING);

        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);

        // Save Order Items
        for (CartItem cartItem : cart.getCartItems()) {

            Product product = cartItem.getProduct();

            product.setStock(product.getStock() - cartItem.getQuantity());

            productRepository.save(product);

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(savedOrder);

            orderItem.setProduct(product);

            orderItem.setQuantity(cartItem.getQuantity());

            orderItem.setPrice(cartItem.getPrice());

            orderItem.setSubtotal(cartItem.getSubtotal());

            orderItemRepository.save(orderItem);

            savedOrder.getOrderItems().add(orderItem);
        }

        // Clear cart
        cartItemRepository.deleteAll(cart.getCartItems());

        return mapToDTO(savedOrder);
    }
    
    @Override
    public OrderDTO cancelOrder(String email, Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Access Denied");
        }

        order.setOrderStatus(OrderStatus.CANCELLED);

        Order updatedOrder = orderRepository.save(order);

        return mapToDTO(updatedOrder);
    }
    
    @Override
    public OrderDTO getOrderById(String email, Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Access Denied");
        }

        return mapToDTO(order);
    }
    
    @Override
    public List<OrderDTO> getMyOrders(String email) {

        List<Order> orders = orderRepository.findByUserEmail(email);

        List<OrderDTO> dtoList = new ArrayList<>();

        for (Order order : orders) {
            dtoList.add(mapToDTO(order));
        }

        return dtoList;
    }
    
    private OrderDTO mapToDTO(Order order) {

        OrderDTO dto = new OrderDTO();

        dto.setOrderId(order.getId());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setOrderStatus(
                order.getOrderStatus() != null
                        ? order.getOrderStatus().name()
                        : null
        );
        dto.setPaymentStatus(
                order.getPaymentStatus() != null
                        ? order.getPaymentStatus().name()
                        : null
        );
        dto.setPaymentStatus(order.getPaymentStatus().name());
        dto.setOrderDate(order.getOrderDate());

        List<OrderItemDTO> itemDTOList = new ArrayList<>();

        for (OrderItem item : order.getOrderItems()) {

            OrderItemDTO itemDTO = new OrderItemDTO();

            itemDTO.setProductId(item.getProduct().getId());
            itemDTO.setProductName(item.getProduct().getProductName());
            itemDTO.setQuantity(item.getQuantity());
            itemDTO.setPrice(item.getPrice());
            itemDTO.setSubtotal(item.getSubtotal());

            itemDTOList.add(itemDTO);
        }

        dto.setItems(itemDTOList);

        return dto;
    }
    
    
}