package com.shopeasy.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class GlobalExceptionHandler {
	
	@ExceptionHandler(CategoryNotFoundException.class)
	public ResponseEntity handleCategoryNotFound(CategoryNotFoundException ex) {
			Map<String, Object> response = new LinkedHashMap<>();
			response.put("timestamp", LocalDateTime.now());
			response.put("status", HttpStatus.NOT_FOUND.value());
			response.put("message", ex.getMessage());
			return new ResponseEntity(response, HttpStatus.NOT_FOUND);
			
	}
	
	@ExceptionHandler(CategoryAlreadyExistsException.class)
	public ResponseEntity<Map<String, Object>> handleCategoryAlreadyExist(CategoryAlreadyExistsException ex) {
		Map<String, Object> response = new LinkedHashMap<>();
		response.put("timestamp", LocalDateTime.now());
		response.put("status", HttpStatus.CONFLICT.value());
		response.put("message", ex.getMessage());
		
		return new ResponseEntity<>(response,HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(ProductNotFoundException.class)
	public ResponseEntity<Map<String,Object>> handleProductNotFound(ProductNotFoundException ex){

	    Map<String,Object> response = new LinkedHashMap<>();

	    response.put("timestamp", LocalDateTime.now());
	    response.put("status", HttpStatus.NOT_FOUND.value());
	    response.put("message", ex.getMessage());

	    return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(ProductAlreadyExistsException.class)
	public ResponseEntity<Map<String,Object>> handleProductAlreadyExists(ProductAlreadyExistsException ex){

	    Map<String,Object> response = new LinkedHashMap<>();

	    response.put("timestamp", LocalDateTime.now());
	    response.put("status", HttpStatus.CONFLICT.value());
	    response.put("message", ex.getMessage());

	    return new ResponseEntity<>(response,HttpStatus.CONFLICT);
	}
	
	
	 // Resource not found / Runtime Exceptions
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(
            RuntimeException ex,
            HttpServletRequest request) {

        ErrorResponse error = new ErrorResponse();

        error.setTimestamp(LocalDateTime.now());
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setError(ex.getMessage());
        error.setPath(request.getRequestURI());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // Validation Errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {

            errors.put(fieldError.getField(),
                    fieldError.getDefaultMessage());

        }

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    // Any Other Exception
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(
            Exception ex,
            HttpServletRequest request) {

        ErrorResponse error = new ErrorResponse();

        error.setTimestamp(LocalDateTime.now());
        error.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        error.setError(ex.getMessage());
        error.setPath(request.getRequestURI());

        return new ResponseEntity<>(error,
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
	
}
