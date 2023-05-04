package com.ico.core.repository;

import com.ico.core.entity.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * 거래내역 관련 MongoRepository
 *
 * @author 변윤경
 */
@Repository
public interface TransactionMongoRepository extends MongoRepository<Transaction, String> {
}
