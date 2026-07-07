package com.shopeasy.Dto;

import jakarta.validation.constraints.*;

public class ProductDTO {

    private Long id;

    @NotBlank
    private String productName;

    private String description;

    @NotBlank
    private String brand;

    @NotNull
    private Double price;

    private Integer discount;

    @NotNull
    private Integer stock;

    private String imageUrl;

    private Boolean active;

    @NotNull
    private Long categoryId;

    private String categoryName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getDiscount() {
		return discount;
	}

	public void setDiscount(Integer discount) {
		this.discount = discount;
	}

	public Integer getStock() {
		return stock;
	}

	public void setStock(Integer stock) {
		this.stock = stock;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	@Override
	public String toString() {
		return "ProductDTO [id=" + id + ", productName=" + productName + ", description=" + description + ", brand="
				+ brand + ", price=" + price + ", discount=" + discount + ", stock=" + stock + ", imageUrl=" + imageUrl
				+ ", active=" + active + ", categoryId=" + categoryId + ", categoryName=" + categoryName + "]";
	}

    
}