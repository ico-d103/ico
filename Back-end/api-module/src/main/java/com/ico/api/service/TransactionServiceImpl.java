package com.ico.api.service;

import com.ico.core.entity.Transaction;
import com.ico.core.repository.TransactionMongoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * 거래 내역 관련 Service
 *
 * @author 변윤경
 */
@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService{

    private final TransactionMongoRepository transactionMongoRepository;


    /**
     * 상점 거래
     * 양방향으로 거래 기록
     *
     * @param from 구매자
     * @param to 판매자
     * @param amount 상품 금액
     * @param title 상품 이름
     */
    @Override
    public void addTransaction(Long to, Long from, int amount, String title) {
        Transaction transaction = Transaction.builder()
                .from(String.valueOf(from))
                .to(String.valueOf(to))
                .amount(Math.abs(amount))
                .date(LocalDateTime.now())
                .title(title + " 거래")
                .build();

        transactionMongoRepository.insert(transaction);
    }

    /**
     * 기관으로 출금
     *
     * @param to 기관(정부, 은행, 투자, 선생님)
     * @param from 학생
     * @param amount 거래 금액
     * @param title 거래 내용
     */
    @Override
    public void addTransactionWithdraw(String to, Long from, int amount, String title) {
        Transaction transaction = Transaction.builder()
                .from(String.valueOf(from))
                .to(to)
                .amount(Math.abs(amount))
                .date(LocalDateTime.now())
                .title(title)
                .build();

        transactionMongoRepository.insert(transaction);
    }

    /**
     * 기관에서 입금
     *
     * @param to 학생
     * @param from 기관(정부, 은행, 투자, 선생님)
     * @param amount 거래 금액
     * @param title 거래 내용
     */
    @Override
    public void addTransactionDeposit(Long to, String from, int amount, String title) {
        Transaction transaction = Transaction.builder()
                .from(from)
                .to(String.valueOf(to))
                .amount(Math.abs(amount))
                .date(LocalDateTime.now())
                .title(title)
                .build();

        transactionMongoRepository.insert(transaction);
    }
}
