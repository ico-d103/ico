package com.ico.api.dto.transaction;

import com.ico.core.entity.Transaction;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

/**
 * 학생 상세보기에서 transaction column 에 담을 거래내역 dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class TransactionColDto {

    private String title;

    private int amount;

    private String date;

    @Builder
    public TransactionColDto(String title, int amount, String date) {
        this.title = title;
        this.amount = amount;
        this.date = date;
    }

    /**
     * 학생 상세보기 transaction column 에서 사용할 양식으로 변환
     *
     * @param transaction
     * @param userId 회원 Id equals from 이면 지출 그렇지 않으면 수입
     * @return
     */
    public TransactionColDto of(Transaction transaction, String userId) {
        return TransactionColDto.builder()
                .title(transaction.getTitle())
                .amount(transaction.getFrom().equals(userId) ? -1 * transaction.getAmount() : transaction.getAmount())
                .date(transaction.getDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                .build();
    }
}
