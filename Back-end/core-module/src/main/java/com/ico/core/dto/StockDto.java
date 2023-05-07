package com.ico.core.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

/**
 * @author 변윤경
 */
@Getter
@Setter
@NoArgsConstructor
public class StockDto {
    private String stock;

    private LocalTime tradingStart;

    private LocalTime tradingEnd;

    private int amount;

    private String content;

    @Builder
    public StockDto(String stock, LocalTime tradingStart, LocalTime tradingEnd, int amount, String content) {
        this.stock = stock;
        this.tradingStart = tradingStart;
        this.tradingEnd = tradingEnd;
        this.amount = amount;
        this.content = content;
    }
}
