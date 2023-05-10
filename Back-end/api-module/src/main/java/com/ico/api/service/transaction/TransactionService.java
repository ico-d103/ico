package com.ico.api.service.transaction;

import com.ico.api.dto.transaction.TransactionResDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 거래 내역 관련 Service
 *
 * @author 변윤경
 */
public interface TransactionService {
    /**
     * 양방향으로 거래 내역 추가
     * from, to 바꿔서 한번 더 저장
     *
     * @param from 구매자
     * @param to 판매자
     * @param amount 상품 금액
     * @param title 상품 이름
     */
    void addTransaction(Long to, Long from, int amount, String title);

    /**
     * 기관 또는 선생님과의 거래 : 출금
     * 기관과 선생님에는 양방향으로 거래 기록이 남을 필요 없음
     *
     * @param to 기관(정부, 은행, 투자, 선생님)
     * @param from 학생
     * @param amount 거래 금액
     * @param title 거래 내용
     */
    void addTransactionWithdraw(String to, Long from, int amount, String title);

    /**
     * 기관 또는 선생님과의 거래 : 입금
     * 기관과 선생님에는 양방향으로 거래 기록이 남을 필요 없음
     *
     * @param to 학생
     * @param from 기관(정부, 은행, 투자, 선생님)
     * @param amount 거래 금액
     * @param title 거래 내용
     */
    void addTransactionDeposit(Long to, String from, int amount, String title);

    /**
     * 학생의 입출금 내역 조회
     *
     * @return 날짜별 입출금 내역
     */
    Map<String, List<TransactionResDto>> findTransaction(HttpServletRequest request);

}
