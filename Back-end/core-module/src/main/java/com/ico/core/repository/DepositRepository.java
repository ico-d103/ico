package com.ico.core.repository;

import com.ico.core.entity.Deposit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * 예금 신청 내역 Repository
 *
 * @author 변윤경
 */
public interface DepositRepository extends JpaRepository<Deposit, Long> {

    Optional<Deposit> findByIdAndStudentId(Long id, Long studentId);

    List<Deposit> findAllByStudentId(Long studentId);

    // 예금 상품별 신청 학생 목록 조회
    List<Deposit> findAllByDepositProductId(Long depositProductId);
}
