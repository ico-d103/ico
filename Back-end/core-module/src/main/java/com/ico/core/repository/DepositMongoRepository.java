package com.ico.core.repository;

import com.ico.core.document.Deposit;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

/**
 * 예금 신청 내역 Repository
 *
 * @author 변윤경
 */
public interface DepositMongoRepository extends MongoRepository<Deposit, String> {
    Optional<Deposit> findByStudentId(Long studentId);
}
