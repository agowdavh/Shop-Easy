package com.shopeasy.service;

import java.util.List;

import com.shopeasy.Dto.AddressDTO;

public interface AddressService {

    AddressDTO addAddress(String email, AddressDTO dto);

    List<AddressDTO> getAllAddresses(String email);

    AddressDTO getAddressById(String email, Long id);

    AddressDTO updateAddress(String email, Long id, AddressDTO dto);

    void deleteAddress(String email, Long id);

}