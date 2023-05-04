package com.ico.api.dto;

import com.ico.core.entity.Transaction;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * 학생 상세보기에서 transaction column 에 담을 거래내역 dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class TransactionColDto {

    private String from;

    private String to;

    private int amount;

    private Date date;

    private String title;

    @Builder
    public TransactionColDto(String from, String to, int amount, Date date, String title) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.date = date;
        this.title = title;
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
                .from(transaction.getFrom())
                .to(transaction.getTo())
                .amount(transaction.getFrom().equals(userId) ? -1 * transaction.getAmount() : transaction.getAmount())
                .date(transaction.getDate())
                .title(transaction.getTitle())
                .build();
    }
}
