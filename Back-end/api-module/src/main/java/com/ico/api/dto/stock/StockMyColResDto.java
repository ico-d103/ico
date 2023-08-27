package com.ico.api.dto.stock;

import com.ico.core.entity.Invest;
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
public class StockMyColResDto {
    private long investId;

    private double price;

    private int amount;

    private double rate;

    @Builder
    public StockMyColResDto(long investId, double price, int amount, double rate) {
        this.investId = investId;
        this.price = price;
        this.amount = amount;
        this.rate = rate;
    }

    public StockMyColResDto of(Invest invest, double rate) {
        return StockMyColResDto.builder()
                .investId(invest.getId())
                .price(invest.getPrice())
                .amount(invest.getAmount())
                .rate(rate)
                .build();
    }


}
