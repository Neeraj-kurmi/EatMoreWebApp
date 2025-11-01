package com.example.EatMore.repositories;

import com.example.EatMore.entity.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends MongoRepository<Cart,String> {
    Cart findByUserId(String userId);
}
