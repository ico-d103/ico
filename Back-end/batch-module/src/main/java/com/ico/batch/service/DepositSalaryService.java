package com.ico.batch.service;

import com.ico.core.entity.Transaction;
import com.ico.core.repository.TransactionMongoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Component
public class DepositSalaryService {

    private final TransactionMongoRepository transactionMongoRepository;

    public static Map<Long, Integer> nationTaxs = new HashMap<>();

    public void addTransactionDeposit(Long to, int amount){
        Transaction transaction = Transaction.builder()
                .from("은행")
                .to(String.valueOf(to))
                .amount(Math.abs(amount))
                .date(LocalDateTime.now())
                .title("월급")
                .build();

        transactionMongoRepository.insert(transaction);
    }

    public void addTransactionWithdraw(Long from, int amount, String title){
        Transaction transaction = Transaction.builder()
                .from(String.valueOf(from))
                .to("정부")
                .amount(amount)
                .date(LocalDateTime.now())
                .title(title)
                .build();

        transactionMongoRepository.insert(transaction);
    }
}
