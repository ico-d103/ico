package com.ico.core.repository;

import com.ico.core.entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 거래내역 관련 Repository
 *
 * @author 변윤경
 * @author 서재건
 */
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    /**
     * 학생의 거래내역 조회
     *
     * @param from
     * @param to
     * @return 거래 내역 목록
     */
    List<Transaction> findAllByFromUserOrToUserOrderByIdDesc(String from, String to);

    Page<Transaction> findAllByFromUserOrToUser(String from, String to, Pageable pageable);

    Long countByFromUserOrToUser(String from, String to);
}
