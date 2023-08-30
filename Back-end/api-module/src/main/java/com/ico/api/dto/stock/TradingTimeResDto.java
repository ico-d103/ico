package com.ico.api.dto.stock;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

/**
 * 거래 가능 시간 보여주는 Dto
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class TradingTimeResDto {

    private LocalTime tradingStart;

    private LocalTime tradingEnd;

    @Builder
    public TradingTimeResDto(LocalTime tradingStart, LocalTime tradingEnd) {
        this.tradingStart = tradingStart;
        this.tradingEnd = tradingEnd;
    }
}
