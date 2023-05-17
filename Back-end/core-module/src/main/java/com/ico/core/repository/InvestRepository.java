package com.ico.core.repository;

import com.ico.core.entity.Invest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * @author 변윤경
 */
public interface InvestRepository extends JpaRepository<Invest, Long> {
    /**
     * 학생의 주식 매수 여부 확인
     * @param id 학생 IDX
     * @return 매수 내역
     */
    Optional<Invest> findByStudentId(Long id);

    /**
     * 나라의 학생 주식 매수 내역
     *
     * @param nationId
     * @return
     */
    List<Invest> findAllByNationId(Long nationId);
}
