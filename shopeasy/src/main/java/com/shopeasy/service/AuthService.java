package com.shopeasy.service;

import com.shopeasy.Dto.AuthResponse;
import com.shopeasy.Dto.LoginRequest;
import com.shopeasy.Dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest registerRequest);

    AuthResponse login(LoginRequest loginRequest);

}