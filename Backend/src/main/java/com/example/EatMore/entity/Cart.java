package com.example.EatMore.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "carts")
@Data
public class Cart {
    @Id
    String id;
    String userId;
    List<Item> cartItems;
    Long total;
}
