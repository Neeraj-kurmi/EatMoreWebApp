package com.example.EatMore.controllers;

import com.example.EatMore.entity.User;
import com.example.EatMore.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
//@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/")
    public String getAllUsers(){
        return "tested OK";
    }

    @PostMapping("/addUser")
    public ResponseEntity<?> addNewUser(@RequestBody User u){

        return userService.saveUser(u);
    }

    @PutMapping("updateUser/{userId}")
    public ResponseEntity<?> updateUser(@RequestBody User user,@PathVariable String userId){
        return userService.updater(user,userId);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String ,String> loginCredentials){
        return userService.loginUser(loginCredentials);
    }

}
