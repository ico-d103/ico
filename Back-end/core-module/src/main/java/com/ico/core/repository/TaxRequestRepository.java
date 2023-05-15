package com.ico.core.repository;

import com.ico.core.entity.TaxRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaxRequestRepository extends MongoRepository<TaxRequest, String> {
}
