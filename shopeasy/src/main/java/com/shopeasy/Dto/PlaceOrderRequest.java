package com.shopeasy.Dto;

import jakarta.validation.constraints.NotNull;

public class PlaceOrderRequest {

    @NotNull
    private Long addressId;

    @NotNull
    private String paymentMethod;

    public PlaceOrderRequest() {
    }

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

}