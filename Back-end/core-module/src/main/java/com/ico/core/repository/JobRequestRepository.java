package com.ico.core.repository;

import com.ico.core.entity.JobRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author 강교철
 */
public interface JobRequestRepository extends MongoRepository<JobRequest, String> {
}
