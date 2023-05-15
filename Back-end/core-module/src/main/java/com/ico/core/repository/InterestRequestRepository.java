package com.ico.core.repository;

import com.ico.core.entity.InterestRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author 강교철
 */
public interface InterestRequestRepository extends MongoRepository<InterestRequest, String> {
}
