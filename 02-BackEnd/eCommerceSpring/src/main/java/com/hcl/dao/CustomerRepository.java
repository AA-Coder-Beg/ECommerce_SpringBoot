package com.hcl.dao;

import com.hcl.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByEmail(String theEmail); //JPA Query Statement: Select * from Customer c where c.email = theEmail;
}
