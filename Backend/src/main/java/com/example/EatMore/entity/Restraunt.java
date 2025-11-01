package com.example.EatMore.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document (collection = "restraunts")
@Data
public class Restraunt {

    @Id
   String id;

  String name;
  String cuisine;
  String rating;
  String image;

  List<Item>Menu;
}
