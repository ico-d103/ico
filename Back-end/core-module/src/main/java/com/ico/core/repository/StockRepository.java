package com.ico.core.repository;

import com.ico.core.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * @author 변윤경
 */
public interface StockRepository extends JpaRepository<Stock, Long> {
    List<Stock> findAllByNationId(Long nationId);

    /**
     * 해당 교사의 국가에 속하는 주식 종목 찾기
     * @param stockId
     * @param nationId
     * @return
     */
    Optional<Stock> findByIdAndNationId(Long stockId, Long nationId);
}
