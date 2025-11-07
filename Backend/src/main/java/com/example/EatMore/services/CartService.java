package com.example.EatMore.services;

import com.example.EatMore.entity.Cart;
import com.example.EatMore.entity.Item;
import com.example.EatMore.repositories.CartRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

@Slf4j
@Service
public class CartService {
    @Autowired
    CartRepository cartRepository;
   public ResponseEntity<?>addItemIntoCart(String uId, Item item){
       try {
           Cart cart = cartRepository.findByUserId(uId);

           if (cart == null) {
               cart = new Cart();
               cart.setUserId(uId);

               item.setQuantity(1);
               List<Item> itemList = new LinkedList<>();
               itemList.add(item);
               cart.setTotal(item.getPrice());
               cart.setCartItems(itemList);
           } else {
               List<Item> items = cart.getCartItems();
               boolean itemExists = false;

               for (Item existingItem : items) {
                   if (existingItem.getId().equals(item.getId())) {
                       existingItem.setQuantity(existingItem.getQuantity() + 1);
                       itemExists = true;
                       break;
                   }
               }

               if (!itemExists) {
                   item.setQuantity(1);
                   items.add(item);
               }

               cart.setCartItems(items);
               cart.setTotal(cart.getTotal()+item.getPrice());
           }

           cartRepository.save(cart);
           return ResponseEntity.status(HttpStatus.CREATED).body(cart);

       } catch (Exception e) {
           log.error("Error while adding item to cart: " + e.getMessage());
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                   .body("Error while adding item to cart: " + e.getMessage());
       }
    }

    public ResponseEntity<?>removeItemFromCart(String uId, String iId){
        try {
            Cart cart = cartRepository.findByUserId(uId);
            if (cart == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart not found for user ID: " + uId);
            }
            List<Item> items = cart.getCartItems();
            if (items == null || items.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cart is empty");
            }
            boolean itemFound = false;
            for (Iterator<Item> iterator = items.iterator(); iterator.hasNext();) {
                Item item = iterator.next();
                if (item.getId().equals(iId)) {
                    itemFound = true;

                    if (item.getQuantity() > 1) {
                        item.setQuantity(item.getQuantity() - 1);
                    } else {
                        iterator.remove();
                    }
                    cart.setTotal(cart.getTotal()-item.getPrice());
                    break;
                }
            }

            if (!itemFound) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found in cart");
            }

            cart.setCartItems(items);

            cartRepository.save(cart);

            return ResponseEntity.ok("Item quantity updated or removed successfully ✅");

        } catch (Exception e) {
            log.error("Error while updating item quantity: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error while updating item quantity: " + e.getMessage());
        }
    }

    public ResponseEntity<?>removeItem(String uId, String iId){
        try {
            Cart cart = cartRepository.findByUserId(uId);
            if (cart == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart not found for user ID: " + uId);
            }
            List<Item> items = cart.getCartItems();
            if (items == null || items.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cart is empty");
            }
            Item i=null;
            for( Item item:items){
                if(item.getId().equals(iId)){
                    i=item;
                    break;
                }
            }

            items.removeIf(item -> item.getId().equals(iId));
            cart.setCartItems(items);
            cart.setTotal(cart.getTotal()-(i.getPrice()*i.getQuantity()));
            cartRepository.save(cart);

            return ResponseEntity.ok("Item quantity updated or removed successfully ✅");

        } catch (Exception e) {
            log.error("Error while updating item quantity: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error while updating item quantity: " + e.getMessage());
        }
    }

    public ResponseEntity<?> removeWholeCart(String uId) {
       try{
           Cart cart= cartRepository.findByUserId(uId);
           if(cart==null){
               return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart not found for user ID: " + uId);
           }
           cartRepository.delete(cart);
           return ResponseEntity.status(HttpStatus.OK).body("Cart deleted");
       } catch (Exception e) {
           log.error("Error while clear cart : " + uId);
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart not found for user ID: " + uId);
       }
    }

    public ResponseEntity<?>getCart(String uId){
           try{
               Cart cart=cartRepository.findByUserId(uId);
               if(cart==null){
                   return new ResponseEntity<>(HttpStatus.NOT_FOUND);
               }
               return ResponseEntity.ok(cart);
           } catch (Exception e) {
               log.error("Error while getting cart : " + uId);
               return new ResponseEntity<>(HttpStatus.NOT_FOUND);
           }
    }
}
