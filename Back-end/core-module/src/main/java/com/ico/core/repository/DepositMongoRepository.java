package com.ico.core.repository;

import com.ico.core.entity.Deposit;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * 예금 신청 내역 Repository
 *
 * @author 변윤경
 */
public interface DepositMongoRepository extends MongoRepository<Deposit, String> {
    Deposit findByStudentId(Long studentId);
}
