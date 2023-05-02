package com.ico.batch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaAuditing
@ComponentScan({"com.ico.core", "com.ico.batch"})
@EntityScan("com.ico.core")
@EnableJpaRepositories("com.ico.core")
@SpringBootApplication
public class BatchModuleApplication {

    public static void main(String[] args) {
        SpringApplication.run(BatchModuleApplication.class, args);
    }

}
