package com.example.EatMore.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

   @Id
   private String id ;

   private String firstName;
   private String lastName;
   private String email;
   private String password;
   private String phoneNumber;
   private String userName;
   private String photo;
   private String createdAt;

}
