package com.example.spring_boot_react_sample;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "com.example")
@SpringBootApplication
public class SpringBootReactSampleApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootReactSampleApplication.class, args);
		System.out.println("### 스프링부트 구동 완료");
	}
	
	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return args -> {

			System.out.println("### 스프링부트 러너");
			System.out.println("### 스프링 부트 애플리케이션 구동시 시작되는 프로그램을 살펴보자");

			String[] beanNames = ctx.getBeanDefinitionNames();
			for (String beanName : beanNames) {
				System.out.println("###beanName:[" + beanName + "]");
			}
			
			//propertyService.propertyPrint();
			//log.info("##ApplicationYAMLReader : {}" ,  );
		};
	}
}