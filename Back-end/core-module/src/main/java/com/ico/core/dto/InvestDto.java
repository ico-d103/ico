package com.ico.core.dto;

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
public class InvestDto {
    private int price;

    private int amount;

    @Builder
    public InvestDto(int price, int amount) {
        this.price = price;
        this.amount = amount;
    }
}
