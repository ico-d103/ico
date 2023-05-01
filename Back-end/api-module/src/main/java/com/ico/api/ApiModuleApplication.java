package com.ico.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableJpaAuditing
@ComponentScan({"com.ico.core", "com.ico.api"})
@EntityScan("com.ico.core")
@EnableJpaRepositories("com.ico.core")
@EnableMongoRepositories(basePackages = "com.ico.core.repository")
@SpringBootApplication
public class ApiModuleApplication {

    public static void main(String[] args) {
        System.setProperty("spring.config.name", "application,application-db,application-login");
        SpringApplication.run(ApiModuleApplication.class, args);
    }

}
