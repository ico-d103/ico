package com.ico.api.dto.stock;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author 변윤경
 */
@Getter
@Setter
@NoArgsConstructor
public class StockColDto {
    private String date;

    private int amount;

    private String content;

    @Builder
    public StockColDto(String date, int amount, String content) {
        this.date = date;
        this.amount = amount;
        this.content = content;
    }
}
