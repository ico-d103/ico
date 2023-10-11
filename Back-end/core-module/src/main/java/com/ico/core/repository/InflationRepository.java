package com.ico.core.repository;

import com.ico.core.entity.Inflation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * 분기별 거래 현황 Repository
 *
 * @author 서재건
 */
public interface InflationRepository extends JpaRepository<Inflation, Long> {

    List<Inflation> findAllByNationIdOrderByIdDesc(Long nationId);

}
