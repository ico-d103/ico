package com.ico.api.dto.transaction;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 학생 입출금 내역 조회 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class TransactionResDto {

    // 시간 설정
    private LocalDateTime koreaDateTime;

    private String title;

    private String amount;

    private String source;

    private String balance;

    @Builder
    public TransactionResDto(String title, String amount, String source, String balance, LocalDateTime koreaDateTime) {
        this.koreaDateTime = koreaDateTime; // 시간 설정
        this.title = title;
        this.amount = amount;
        this.source = source;
        this.balance = balance;
    }

}
