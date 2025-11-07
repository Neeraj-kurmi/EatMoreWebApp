package com.example.EatMore.services;

import com.example.EatMore.dto.AuthResponse;
import com.example.EatMore.entity.User;
import com.example.EatMore.repositories.UserRepository;
import com.example.EatMore.utility.JWTutils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@Slf4j
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    AuthenticationManager authenticationManager;

    private final CloudinaryService cloudinaryService;

    public UserService( CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    private static final PasswordEncoder passwordEncoder =new BCryptPasswordEncoder();

    public ResponseEntity<?> saveUser(User user){
        try {
            if (user.getPhoto() != null && user.getPhoto().startsWith("data:image")) {
                String imageUrl = cloudinaryService.upload(user.getPhoto());
                user.setPhoto(imageUrl);
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            log.error("Error while register a new user : " );
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
            log.error("Error while updating user  profile: " );
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }


    public ResponseEntity<?> loginUser(@RequestBody Map<String ,String>loginCredentials){
        try{
            String email=loginCredentials.get("email");
            String password=loginCredentials.get("password");
            Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
            if (authentication.isAuthenticated()) {
                UserDetails userDetails=userDetailsService.loadUserByUsername(email);
                String token=JWTutils.generateToken(userDetails.getUsername());
                User user=userRepository.findByEmail(email);
                user.setPassword(null);
                AuthResponse authRespons=new AuthResponse(token,user);
                return ResponseEntity.ok(authRespons);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            log.error("Error while login  user : " );
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
