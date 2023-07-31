package com.ico.api.dto.stock;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 투자 종목 상세보기 조회 시 해당 종목에 대한 학생 보유 현황
 *
 * @author 변윤경
 */

@Getter
@Setter
@NoArgsConstructor
public class StockIssueMyResDto {
    private double price;

    private int amount;

    @Builder
    public StockIssueMyResDto(double price, int amount) {
        this.price = price;
        this.amount = amount;
    }
}
