package com.ico.api.dto.transaction;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 학생 입출금 내역 조회 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class TransactionResDto {

    private String title;

    private String amount;

    private String source;

    private String balance;

    @Builder
    public TransactionResDto(String title, String amount, String source, String balance) {
        this.title = title;
        this.amount = amount;
        this.source = source;
        this.balance = balance;
    }

}
