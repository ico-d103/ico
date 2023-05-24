package com.ico.batch.service;

import com.ico.core.entity.Nation;
import com.ico.core.document.Transaction;
import com.ico.core.document.TreasuryHistory;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.TransactionMongoRepository;
import com.ico.core.repository.TreasuryHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * 월급 입금에 필요한 Service
 *
 * @author 변윤경
 */
@Slf4j
@RequiredArgsConstructor
@Component
public class DepositSalaryService {
    private final TransactionMongoRepository transactionMongoRepository;
    private final NationRepository nationRepository;
    private final TreasuryHistoryRepository treasuryHistoryRepository;

    // 학생들의 월급에서 모아진 내역을 저장하는 Map
    public static Map<Long, Map<String, Integer>> nationTax = new HashMap<>();

    // 나라의 총 세금 Map에 학생들마다 거두는 세금을 더해주는 함수
    public static void addTax(HashMap<Long, Map<String, Integer>> map, Long id, Integer amount, String title) {
        // 나라가 있다면
        if (map.containsKey(id)) {
            // 나라가 있고, 세금 항목이 기록되어 있다면
            if (map.get(id).containsKey(title)) {
                int value = map.get(id).get(title);
                map.get(id).put(title, value + amount);
            }
            // 나라의 세금 항목 추가
            else {
                map.get(id).put(title, amount);
            }
        }
        // 새로운 나라 등록
        else {
            Map<String, Integer> tmp = new HashMap<>();
            tmp.put(title, amount);
            map.put(id, tmp);
        }
    }

    // 거래내역에 월급 입금 기록
    public void addTransactionDeposit(Long to, int amount) {
        Transaction transaction = Transaction.builder()
                .from("은행")
                .to(String.valueOf(to))
                .amount(Math.abs(amount))
                .date(LocalDateTime.now())
                .title("월급")
                .build();

        transactionMongoRepository.insert(transaction);
    }

    // 거래내역에 세금 출금 기록
    public void addTransactionWithdraw(Long from, int amount, String title) {
        Transaction transaction = Transaction.builder()
                .from(String.valueOf(from))
                .to("정부")
                .amount(amount)
                .date(LocalDateTime.now())
                .title(title)
                .build();

        transactionMongoRepository.insert(transaction);
    }

    // 국고 내역에 세금 입금 기록
    public void addTreasuryHistory(Long nationId, String title, Integer amount) {
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        // 국고 잔고 변경
        nation.setTreasury(nation.getTreasury() + amount);
        nationRepository.save(nation);

        // 내역 기록
        TreasuryHistory treasuryHistory = TreasuryHistory.builder()
                .nationId(nationId)
                .title(title)
                .source("세금")
                .amount(amount)
                .build();
        treasuryHistoryRepository.insert(treasuryHistory);
    }

}
