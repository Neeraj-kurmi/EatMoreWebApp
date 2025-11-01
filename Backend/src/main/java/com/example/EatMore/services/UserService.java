package com.example.EatMore.services;

import com.example.EatMore.entity.User;
import com.example.EatMore.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    private final CloudinaryService cloudinaryService;

    public UserService( CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }


    public ResponseEntity<?> saveUser(User user){
        try {
            if (user.getPhoto() != null && user.getPhoto().startsWith("data:image")) {
                String imageUrl = cloudinaryService.upload(user.getPhoto());
                user.setPhoto(imageUrl);
            }
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    public ResponseEntity<?> updater(User updatedUser, String id) {
        try {
            User existingUser = userRepository.findById(id).orElse(null);
            if (existingUser == null) {
                return ResponseEntity.badRequest().body("User not found");
            }

            if (updatedUser.getPhoto() != null && updatedUser.getPhoto().startsWith("data:image")) {
                String imageUrl = cloudinaryService.upload(updatedUser.getPhoto());
                existingUser.setPhoto(imageUrl);
            }
            if (updatedUser.getFirstName() != null) existingUser.setFirstName(updatedUser.getFirstName());
            if (updatedUser.getLastName() != null) existingUser.setLastName(updatedUser.getLastName());
            if (updatedUser.getEmail() != null) existingUser.setEmail(updatedUser.getEmail());
            if (updatedUser.getPassword() != null) existingUser.setPassword(updatedUser.getPassword());
            if (updatedUser.getUserName() != null) existingUser.setUserName(updatedUser.getUserName());
            if (updatedUser.getPhoneNumber() != null) existingUser.setPhoneNumber(updatedUser.getPhoneNumber());

            User savedUser = userRepository.save(existingUser);

            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }


    public ResponseEntity<?> loginUser(@RequestBody Map<String ,String>loginCredentials){
        User usr;
        try{
            String email=loginCredentials.get("email");
            String password=loginCredentials.get("password");
            if(email==null || password ==null){
                return null;
            }
            User user=userRepository.findByEmail(email);
            if(!(user.getPassword().equals(password))){
                return null;
            }
            usr=user;
            usr.setPassword(null);
        } catch (Exception e) {
            return null;
        }
        return ResponseEntity.ok(usr);
    }
}
