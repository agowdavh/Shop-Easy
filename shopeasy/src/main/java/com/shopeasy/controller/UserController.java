package com.shopeasy.controller;

import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.shopeasy.Dto.UserProfileDTO;
import com.shopeasy.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
@Validated
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public UserProfileDTO getMyProfile(Authentication authentication) {

        String email = authentication.getName();

        return userService.getMyProfile(email);
    }

    @PutMapping("/profile")
    public UserProfileDTO updateMyProfile(
            Authentication authentication,
            @Valid @RequestBody UserProfileDTO dto) {

        String email = authentication.getName();

        return userService.updateMyProfile(email, dto);
    }
}