package com.example.EatMore;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


@Slf4j
@SpringBootApplication (exclude = {SecurityAutoConfiguration.class})
public class EatMore {

	public static void main(String[] args) {
         System.out.println("Starting EatMore application...");
    System.out.println("JWT_SECRET: " + System.getenv("JWT_SECRET"));
		SpringApplication.run(EatMore.class, args);
		log.info("Application Running....");
	}
}
