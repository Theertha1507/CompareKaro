package com.comparekaro.comparekaro;

import com.comparekaro.comparekaro.model.Product;
import com.comparekaro.comparekaro.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.util.Arrays;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            ObjectMapper mapper = new ObjectMapper();
            Product[] products = mapper.readValue(
                    new File("src/main/resources/products.json"),
                    Product[].class);
            productRepository.saveAll(Arrays.asList(products));
            System.out.println("Loaded " + products.length + " products!");
        }
    }
}