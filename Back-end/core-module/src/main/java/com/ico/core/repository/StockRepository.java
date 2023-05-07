package com.ico.core.repository;

import com.ico.core.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author 변윤경
 */
public interface StockRepository extends JpaRepository<Stock, Long> {
}
