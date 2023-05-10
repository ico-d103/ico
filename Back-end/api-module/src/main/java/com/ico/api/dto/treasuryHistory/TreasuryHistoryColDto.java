package com.ico.api.dto.treasuryHistory;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 국고 사용 내역 조회 contents column dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class TreasuryHistoryColDto {

    private String title;

    private String amount;

    private String source;

    private String balance;

    @Builder
    public TreasuryHistoryColDto(String title, String amount, String source, String balance) {
        this.title = title;
        this.amount = amount;
        this.source = source;
        this.balance = balance;
    }
}
