package com.example.EatMore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication (exclude = {SecurityAutoConfiguration.class})
public class EatMore {

	public static void main(String[] args) {

		SpringApplication.run(EatMore.class, args);
		System.out.println("Application Running....");
	}
}
