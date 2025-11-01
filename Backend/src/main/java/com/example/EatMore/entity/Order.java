package com.example.EatMore.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "orders")
@Data
public class Order {
    @Id
    private String id;
    private String userId;
    private String userName;
    private double totalAmount;
    private String status;
    private String deliveryAddress;
    private String placedAt;
    private String number;
    private String houseNumber;
    private List<Item> items;
}

