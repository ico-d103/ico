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
     * 학생의 매수 여부 확인
     * @param id
     * @param studentId
     * @return
     */
    Optional<Invest> findByIdAndStudentId(Long id, Long studentId);

    /**
     * 학생의 해당 종목 주식 매수 목록
     * @param studentId
     * @param stockId
     * @return
     */
    List<Invest> findAllByStudentIdAndStockId(Long studentId, Long stockId);

    /**
     * 학생이 구매한 주식종류 조회
     * @param id
     * @return
     */
    List<Invest> findAllByStudentId(Long id);

    /**
     * 나라의 학생 주식 매수 내역
     *
     * @param nationId
     * @return
     */
    List<Invest> findAllByNationId(Long nationId);
}
