package com.shopeasy.service;

import com.shopeasy.Dto.UserProfileDTO;

public interface UserService {

    UserProfileDTO getMyProfile(String email);

    UserProfileDTO updateMyProfile(String email, UserProfileDTO userProfileDTO);

}