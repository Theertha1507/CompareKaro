package com.comparekaro.comparekaro.controller;

import com.comparekaro.comparekaro.model.Product;
import com.comparekaro.comparekaro.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/search")
    public List<Product> searchByName(@RequestParam String name) {
        return productService.searchByName(name);
    }

    @GetMapping("/category/{category}")
    public List<Product> searchByCategory(@PathVariable String category) {
        return productService.searchByCategory(category);
    }
}