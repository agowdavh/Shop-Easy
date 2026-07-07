package com.shopeasy.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.shopeasy.Dto.AddressDTO;
import com.shopeasy.entity.Address;
import com.shopeasy.entity.User;
import com.shopeasy.repository.AddressRepository;
import com.shopeasy.repository.UserRepository;
import com.shopeasy.service.AddressService;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressServiceImpl(AddressRepository addressRepository,
                              UserRepository userRepository) {

        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

   
    @Override
    public AddressDTO addAddress(String email, AddressDTO dto) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (Boolean.TRUE.equals(dto.getDefaultAddress())) {

            clearDefaultAddress(user);

        }

        Address address = mapToEntity(dto);

        address.setUser(user);

        Address savedAddress = addressRepository.save(address);

        return mapToDTO(savedAddress);

    }
    @Override
    public List<AddressDTO> getAllAddresses(String email) {

        List<Address> addresses = addressRepository.findByUserEmail(email);

        List<AddressDTO> dtoList = new ArrayList<>();

        for (Address address : addresses) {
            dtoList.add(mapToDTO(address));
        }

        return dtoList;
    }

    @Override
    public AddressDTO getAddressById(String email, Long id) {

        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Access Denied");
        }

        return mapToDTO(address);
    }

    @Override
    public AddressDTO updateAddress(String email, Long id, AddressDTO dto) {

        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getUser().getEmail().equals(email)) {

            throw new RuntimeException("Access Denied");

        }

        if (Boolean.TRUE.equals(dto.getDefaultAddress())) {

            clearDefaultAddress(address.getUser());

        }

        address.setFullName(dto.getFullName());
        address.setPhone(dto.getPhone());
        address.setHouseNo(dto.getHouseNo());
        address.setStreet(dto.getStreet());
        address.setLandmark(dto.getLandmark());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setPincode(dto.getPincode());
        address.setCountry(dto.getCountry());
        address.setDefaultAddress(dto.getDefaultAddress());

        Address updatedAddress = addressRepository.save(address);

        return mapToDTO(updatedAddress);

    }

    @Override
    public void deleteAddress(String email, Long id) {

        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Access Denied");
        }

        addressRepository.delete(address);
    }
    
    private void clearDefaultAddress(User user) {

        List<Address> addresses = addressRepository.findByUserEmail(user.getEmail());

        for (Address address : addresses) {

            address.setDefaultAddress(false);

        }

        addressRepository.saveAll(addresses);

    }

    private Address mapToEntity(AddressDTO dto) {

        Address address = new Address();

        address.setFullName(dto.getFullName());
        address.setPhone(dto.getPhone());
        address.setHouseNo(dto.getHouseNo());
        address.setStreet(dto.getStreet());
        address.setLandmark(dto.getLandmark());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setPincode(dto.getPincode());
        address.setCountry(dto.getCountry());
        address.setDefaultAddress(dto.getDefaultAddress());

        return address;
    }

    private AddressDTO mapToDTO(Address address) {

        AddressDTO dto = new AddressDTO();

        dto.setId(address.getId());
        dto.setFullName(address.getFullName());
        dto.setPhone(address.getPhone());
        dto.setHouseNo(address.getHouseNo());
        dto.setStreet(address.getStreet());
        dto.setLandmark(address.getLandmark());
        dto.setCity(address.getCity());
        dto.setState(address.getState());
        dto.setPincode(address.getPincode());
        dto.setCountry(address.getCountry());
        dto.setDefaultAddress(address.getDefaultAddress());

        return dto;
    }
}