package com.ico.core.repository;

import com.ico.core.document.Inflation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * 분기별 거래 현황 Repository
 *
 * @author 서재건
 */
public interface InflationRepository extends MongoRepository<Inflation, String> {

    List<Inflation> findAllByNationIdOrderByIdDesc(Long nationId);

}
