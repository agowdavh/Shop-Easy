package com.shopeasy.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shopeasy.entity.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
	 Optional<Cart> findByUserEmail(String email);
}
