package com.shopeasy.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.shopeasy.Dto.AddressDTO;
import com.shopeasy.service.AddressService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/address")
@Validated
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping
    public AddressDTO addAddress(
            Authentication authentication,
            @Valid @RequestBody AddressDTO dto) {

        return addressService.addAddress(authentication.getName(), dto);
    }

    @GetMapping
    public List<AddressDTO> getAllAddresses(Authentication authentication) {

        return addressService.getAllAddresses(authentication.getName());
    }

    @GetMapping("/{id}")
    public AddressDTO getAddress(
            Authentication authentication,
            @PathVariable Long id) {

        return addressService.getAddressById(authentication.getName(), id);
    }

    @PutMapping("/{id}")
    public AddressDTO updateAddress(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody AddressDTO dto) {

        return addressService.updateAddress(authentication.getName(), id, dto);
    }

    @DeleteMapping("/{id}")
    public String deleteAddress(
            Authentication authentication,
            @PathVariable Long id) {

        addressService.deleteAddress(authentication.getName(), id);

        return "Address deleted successfully";
    }
}