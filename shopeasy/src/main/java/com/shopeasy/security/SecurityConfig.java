package com.shopeasy.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
@Configuration
public class SecurityConfig {
	
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	
	public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
		this.jwtAuthenticationFilter=jwtAuthenticationFilter;
	}
	
	  @Bean
	    public OpenAPI shopEasyAPI() {

	        return new OpenAPI()
	                .info(new Info()
	                        .title("ShopEasy REST API")
	                        .description("E-Commerce Backend APIs built with Spring Boot")
	                        .version("1.0.0")
	                        .contact(new Contact()
	                                .name("Adarsha Gowda")
	                                .email("adarsha@example.com")));
	    }

	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {

	    CorsConfiguration configuration = new CorsConfiguration();

	    configuration.setAllowedOrigins(List.of("http://localhost:3000"));
	    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	    configuration.setAllowedHeaders(List.of("*"));
	    configuration.setAllowCredentials(true);

	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", configuration);

	    return source;
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authenticationManger(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
	
	 @Bean
	    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

	        http

	                .csrf(csrf -> csrf.disable())

	                .cors(Customizer.withDefaults())

	                .sessionManagement(session -> session
	                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

	                .authorizeHttpRequests(auth -> auth

	                        .requestMatchers("/api/auth/**").permitAll()

	                        .requestMatchers("/api/products/**").permitAll()

	                        .requestMatchers("/api/categories/**").permitAll()
	                        
	                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
	                        .requestMatchers(
	                                "/v3/api-docs/**",
	                                "/swagger-ui/**",
	                                "/swagger-ui.html")
	                        .permitAll()
	                        .requestMatchers("/error").permitAll()

	                        .anyRequest().authenticated())

	                .addFilterBefore(jwtAuthenticationFilter,
	                        UsernamePasswordAuthenticationFilter.class);

	        return http.build();

	    }

}
