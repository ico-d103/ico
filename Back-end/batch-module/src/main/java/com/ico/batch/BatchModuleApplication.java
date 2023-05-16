package com.ico.batch;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableBatchProcessing
@EnableJpaAuditing
@EnableMongoAuditing
@ComponentScan({"com.ico.core", "com.ico.batch"})
@EntityScan("com.ico.core")
@EnableJpaRepositories("com.ico.core")
@EnableMongoRepositories(basePackages = "com.ico.core.repository")
@SpringBootApplication
public class BatchModuleApplication {

    public static void main(String[] args) {
        System.setProperty("spring.config.name", "application,application-db,application-login");
        SpringApplication.run(BatchModuleApplication.class, args);
    }

}
