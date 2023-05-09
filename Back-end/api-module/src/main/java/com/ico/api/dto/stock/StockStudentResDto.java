package com.ico.api.dto.stock;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.List;

/**
 * @author 변윤경
 */
@Getter
@Setter
@NoArgsConstructor
public class StockStudentResDto {
    private String stock;

    private LocalTime tradingStart;

    private LocalTime tradingEnd;

    private MyStockResDto myStock;

    private List<StockColDto> issue;

    @Builder
    public StockStudentResDto(String stock, LocalTime tradingStart, LocalTime tradingEnd, MyStockResDto myStock, List<StockColDto> issue) {
        this.stock = stock;
        this.tradingStart = tradingStart;
        this.tradingEnd = tradingEnd;
        this.myStock = myStock;
        this.issue = issue;
    }
}
