package com.ico.core.repository;

import com.ico.core.document.Saving;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

/**
 * 예금 신청 내역 Repository
 *
 * @author 변윤경
 */
public interface SavingMongoRepository extends MongoRepository<Saving, String> {
    List<Saving> findAllBySavingProductId(Long savingProductId);

    Optional<Saving> findByIdAndStudentId(Long studentId);

    List<Saving> findAllByStudentId(Long studentId);

}
