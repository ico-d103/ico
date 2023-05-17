package com.ico.core;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration(proxyBeanMethods = false)
public class MongoTestConfig {

    @Bean("testMongoTemplate")
    public MongoTemplate mongoTemplate() {
        MongoClient mongoClient = MongoClients.create("mongodb://127.0.0.1:27017");
        return new MongoTemplate(mongoClient, "S08P31D103");
    }
}
