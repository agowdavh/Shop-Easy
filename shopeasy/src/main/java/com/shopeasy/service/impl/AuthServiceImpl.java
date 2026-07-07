package com.shopeasy.service.impl;



import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shopeasy.Dto.AuthResponse;
import com.shopeasy.Dto.LoginRequest;
import com.shopeasy.Dto.RegisterRequest;
import com.shopeasy.entity.User;
import com.shopeasy.enums.Role;
import com.shopeasy.repository.UserRepository;
import com.shopeasy.security.JwtService;
import com.shopeasy.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;

	public AuthServiceImpl(UserRepository userRepository,
			PasswordEncoder passwordEncoder,
			AuthenticationManager authenticationManager,
			JwtService jwtService) {

		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;
	}

	@Override
	public String register(RegisterRequest registerRequest) {
		if(userRepository.existsByEmail(registerRequest.getEmail())) {
			throw new RuntimeException("user already exist");
		}
		
		User user = new User();
		user.setFirstName(registerRequest.getFirstName());
		user.setLastName(registerRequest.getLastName());
		user.setEmail(registerRequest.getEmail());
		user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
		user.setPhone(registerRequest.getPhone());
		user.setRole(Role.ROLE_USER);
		user.setEnabled(true);
		userRepository.save(user);
		
		return "User Registred Successfully";
	}

	@Override
	public AuthResponse login(LoginRequest loginRequest) {
		 authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
		User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(()->new RuntimeException("User not found"));
		String token = jwtService.generateToken(user.getEmail());
		return new AuthResponse(token,user.getRole());
	}

}
