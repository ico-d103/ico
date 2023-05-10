package com.ico.core.repository;

import com.ico.core.entity.Deposit;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DepositMongoRepository extends MongoRepository<Deposit, String> {
    Deposit findByStudentId(Long studentId);
}
