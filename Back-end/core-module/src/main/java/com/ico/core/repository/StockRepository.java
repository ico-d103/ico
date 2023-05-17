package com.ico.core.repository;

import com.ico.core.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author 변윤경
 * @author 강교철
 */
public interface StockRepository extends JpaRepository<Stock, Long> {
    /**
     * 주식 이슈 최신순 조회
     *
     * @param nationId 국가ID
     * @return 투자 이슈 최신순 목록
     */
    List<Stock> findAllByNationIdOrderByIdDesc(Long nationId);

    List<Stock> findAllByNationId(Long nationId);
}
