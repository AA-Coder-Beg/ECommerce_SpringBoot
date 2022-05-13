package com.hcl.dto;

import lombok.Data;

@Data //Instantiates Getter / Setter methods only for finals
public class PurchaseResponse {
    private final String orderTrackingNumber; //Will throw error if not final

}
