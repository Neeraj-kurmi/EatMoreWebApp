package com.example.EatMore.services;

import com.example.EatMore.entity.Order;
import com.example.EatMore.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;
   public ResponseEntity<?> addOrder(Order order){
       try {
           order.setStatus("Pending");
           Order savedOrder = orderRepository.save(order);
           return ResponseEntity.ok(savedOrder);

       } catch (Exception e) {
           return ResponseEntity.internalServerError().body("Error placing order: " + e.getMessage());
       }
   }

   public ResponseEntity<?> getAllOrder(){
       try {
           List<Order> orders = orderRepository.findAll();
           return ResponseEntity.ok(orders);
       } catch (Exception e) {
           return ResponseEntity.internalServerError().body("Error fetching user orders");
       }
   }

    public ResponseEntity<?> getOrdersByUser(String userId) {
        try {
            List<Order> orders = orderRepository.findByUserId(userId);

            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error fetching user orders");
        }
    }

    public ResponseEntity<?> updateStatus( String orderId,String status) {
        try {
            Order order = orderRepository.findById(orderId).orElse(null);
            if (order == null) return ResponseEntity.badRequest().body("Order not found");

            order.setStatus(status);
            orderRepository.save(order);

            return ResponseEntity.ok("Order status updated to: " + status);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error updating order");
        }
    }

    public ResponseEntity<?> deleteOrder( String orderId) {
        try {
            orderRepository.deleteById(orderId);
            return ResponseEntity.ok("Order deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error deleting order");
        }
    }

}
