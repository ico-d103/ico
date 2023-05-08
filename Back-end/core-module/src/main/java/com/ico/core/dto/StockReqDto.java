package com.ico.core.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.time.LocalTime;

/**
 * @author 변윤경
 */
@Getter
@Setter
@NoArgsConstructor
public class StockReqDto {
    @NotBlank(message = "708")
    private String stock;

    @NotBlank(message = "709")
    private LocalTime tradingStart;

    @NotBlank(message = "710")
    private LocalTime tradingEnd;

    @NotBlank(message = "711")
    @Min(value = 0, message = "712")
    private int amount;

    @NotBlank(message = "713")
    private String content;

    @Builder
    public StockReqDto(String stock, LocalTime tradingStart, LocalTime tradingEnd, int amount, String content) {
        this.stock = stock;
        this.tradingStart = tradingStart;
        this.tradingEnd = tradingEnd;
        this.amount = amount;
        this.content = content;
    }
}
