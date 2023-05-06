package com.ico.api.dto.transaction;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 학생 상세보기에서 transaction column 에 담을 거래내역 dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class TransactionColDto {

    private String title;

    private String amount;

    @Builder
    public TransactionColDto(String title, String amount) {
        this.title = title;
        this.amount = amount;
    }

}
