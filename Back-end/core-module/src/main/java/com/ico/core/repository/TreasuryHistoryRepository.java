package com.ico.core.repository;

import com.ico.core.entity.TreasuryHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * 국고 사용 내역 관련 Repository
 *
 * @author 서재건
 */
public interface TreasuryHistoryRepository extends MongoRepository<TreasuryHistory, String> {

    /**
     * 나라의 국고 사용 내역 조회
     *
     * @param nationId
     * @return
     */
    List<TreasuryHistory> findAllByNationIdOrderByIdDesc(Long nationId);

    /**
     * 교사용 국고 사용 내역 조회에서 사용
     *
     * @param nationId
     * @param pageable
     * @return
     */
    Page<TreasuryHistory> findAllByNationId(Long nationId, Pageable pageable);

}
