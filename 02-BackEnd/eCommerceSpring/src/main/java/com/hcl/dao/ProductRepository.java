package com.hcl.dao;

import com.hcl.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200") //This is how Spring Boot connects to Front-End
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
