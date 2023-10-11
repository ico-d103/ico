package com.ico.core.repository;

import com.ico.core.entity.Saving;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * 예금 신청 내역 Repository
 *
 * @author 변윤경
 */
public interface SavingRepository extends JpaRepository<Saving, Long> {
    List<Saving> findAllBySavingProductId(Long savingProductId);

    Optional<Saving> findByIdAndStudentId(Long id, Long studentId);

    List<Saving> findAllByStudentId(Long studentId);

}
