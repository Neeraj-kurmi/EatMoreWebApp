package com.example.EatMore.controllers;

import com.example.EatMore.entity.Order;
import com.example.EatMore.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping("/addOrder")
    public ResponseEntity<?> addOrder(@RequestBody Order order){
        return orderService.addOrder(order);
    }

    @GetMapping("/allOrders")
    public ResponseEntity<?>getOrders(){
        return orderService.getAllOrder();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getOrdersByUser(@PathVariable String userId){
        return orderService.getOrdersByUser(userId);
    }

    @PutMapping("/updateStatus/{orderId}")
    public ResponseEntity<?> updateStatus(@PathVariable String orderId, @RequestParam String status){
        return orderService.updateStatus(orderId,status);
    }

    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable String orderId) {
        return orderService.deleteOrder(orderId);
    }


}
