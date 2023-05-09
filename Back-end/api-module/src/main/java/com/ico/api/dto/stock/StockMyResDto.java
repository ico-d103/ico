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
    private double price;

    private int amount;

    @Builder
    public StockMyResDto(double price, int amount) {
        this.price = price;
        this.amount = amount;
    }
}
