package com.ico.core.repository;

import com.ico.core.document.TreasuryHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * 국고 사용 내역 관련 Repository
 *
 * @author 서재건
 * @author 강교철
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

    /**
     * 국고 사용 내용 갯수 반환
     *
     * @param nationId
     * @return
     */
    Long countByNationId(Long nationId);

    /**
     * 나라 삭제 시에 사용
     * @param nationId
     * @return
     */
    List<TreasuryHistory> findAllByNationId(Long nationId);
}
