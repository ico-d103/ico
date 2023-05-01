package com.ico.core.repository;

import com.ico.core.entity.MongoDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MongoDBRepository extends MongoRepository<MongoDocument, String> {
}
