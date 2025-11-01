package com.example.EatMore.entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
public class Item {

    @Id
    private String id = new ObjectId().toString();

    String name;
    Long price;
    String image;
    int quantity;
}
