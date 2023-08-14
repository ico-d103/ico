package com.ico.core.repository;

import com.ico.core.document.Deposit;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

/**
 * 예금 신청 내역 Repository
 *
 * @author 변윤경
 */
public interface DepositMongoRepository extends MongoRepository<Deposit, String> {
    Optional<Deposit> findByStudentId(Long studentId);

    Optional<Deposit> findByIdAndStudentId(String id, Long studentId);

    List<Deposit> findAllByStudentId(Long studentId);

    // 예금 상품별 신청 학생 목록 조회
    List<Deposit> findAllByDepositId(Long depositId);
}
