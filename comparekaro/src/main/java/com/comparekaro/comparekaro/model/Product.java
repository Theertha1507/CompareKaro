package com.comparekaro.comparekaro.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "products")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private String brand;
    private Double zeptoMrp;
    private Double zeptoPrice;
    private Double zeptoDiscount;
    private Double blinkitMrp;
    private Double blinkitPrice;
    private Double blinkitDiscount;
    private String cheaperStore;
    private Double savings;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Double getZeptoMrp() {
        return zeptoMrp;
    }

    public void setZeptoMrp(Double zeptoMrp) {
        this.zeptoMrp = zeptoMrp;
    }

    public Double getZeptoPrice() {
        return zeptoPrice;
    }

    public void setZeptoPrice(Double zeptoPrice) {
        this.zeptoPrice = zeptoPrice;
    }

    public Double getZeptoDiscount() {
        return zeptoDiscount;
    }

    public void setZeptoDiscount(Double zeptoDiscount) {
        this.zeptoDiscount = zeptoDiscount;
    }

    public Double getBlinkitMrp() {
        return blinkitMrp;
    }

    public void setBlinkitMrp(Double blinkitMrp) {
        this.blinkitMrp = blinkitMrp;
    }

    public Double getBlinkitPrice() {
        return blinkitPrice;
    }

    public void setBlinkitPrice(Double blinkitPrice) {
        this.blinkitPrice = blinkitPrice;
    }

    public Double getBlinkitDiscount() {
        return blinkitDiscount;
    }

    public void setBlinkitDiscount(Double blinkitDiscount) {
        this.blinkitDiscount = blinkitDiscount;
    }

    public String getCheaperStore() {
        return cheaperStore;
    }

    public void setCheaperStore(String cheaperStore) {
        this.cheaperStore = cheaperStore;
    }

    public Double getSavings() {
        return savings;
    }

    public void setSavings(Double savings) {
        this.savings = savings;
    }
}