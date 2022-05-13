package com.hcl.controller;

import com.hcl.dto.Purchase;
import com.hcl.dto.PurchaseResponse;
import com.hcl.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    //Instantiating the CheckoutService object to connect to Spring JPA Repository
    private CheckoutService checkoutService;

    public CheckoutController(){} //Must have this, or it throws an error
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse; //Via REST API, returns as JSON
    }


}
