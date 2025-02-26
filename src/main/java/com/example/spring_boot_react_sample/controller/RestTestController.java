package com.example.spring_boot_react_sample.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestTestController {
	
	@GetMapping("/test")
	private String test() {
		return "TEST####";
	}
}
