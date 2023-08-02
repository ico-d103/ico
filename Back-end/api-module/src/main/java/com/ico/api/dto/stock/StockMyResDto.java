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
public class StockMyResDto {
    private long stockId;

    private String title;

    private double price;

    private int amount;

    private double rate;

    @Builder
    public StockMyResDto(long stockId, String title, double price, int amount, double rate) {
        this.stockId = stockId;
        this.title = title;
        this.price = price;
        this.amount = amount;
        this.rate = rate;
    }
}
