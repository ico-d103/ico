package com.ico.core.repository;

import com.ico.core.document.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 거래내역 관련 MongoRepository
 *
 * @author 변윤경
 * @author 서재건
 */
@Repository
public interface TransactionMongoRepository extends MongoRepository<Transaction, String> {

    /**
     * 학생의 거래내역 조회
     *
     * @param from
     * @param to
     * @return 거래 내역 목록
     */
    List<Transaction> findAllByFromOrToOrderByIdDesc(String from, String to);
}
