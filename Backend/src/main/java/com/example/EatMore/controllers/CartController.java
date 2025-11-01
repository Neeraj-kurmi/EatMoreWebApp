package com.example.EatMore.controllers;

import com.example.EatMore.entity.Item;
import com.example.EatMore.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CartController {
    @Autowired
    CartService cartService;

    @PostMapping("/addCartItem/{uId}")
    ResponseEntity<?> addToCart(@PathVariable String uId, @RequestBody Item item){
        return cartService.addItemIntoCart(uId,item);
    }

    @DeleteMapping("/removeCartItem/{uId}/{iId}")
    ResponseEntity<?>removeItemFromCart(@PathVariable String uId,@PathVariable String iId){
        return cartService.removeItemFromCart(uId,iId);
    }

    @DeleteMapping("/removeWholeCartItem/{uId}/{iId}")
    ResponseEntity<?> removeItem(@PathVariable String uId, @PathVariable String iId){
        return cartService.removeItem(uId,iId);
    }

    @DeleteMapping("/removeCart/{uId}")
    ResponseEntity<?>removeWholeCart(@PathVariable String uId){
        return cartService.removeWholeCart(uId);
    }

    @GetMapping("/getCartItem/{uId}")
    ResponseEntity<?>getCart(@PathVariable String uId){
         return cartService.getCart(uId);
    }
}
