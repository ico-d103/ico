package com.ico.api.dto.nation;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalTime;

/**
 * 거래 시간 수정 req dto
 *
 * @author 변윤경
 */
@Getter
@NoArgsConstructor
public class TradingTimeReqDto {
    @NotNull(message = "709")
    private LocalTime tradingStart;

    @NotNull(message = "710")
    private LocalTime tradingEnd;

    @Builder
    public TradingTimeReqDto(LocalTime tradingStart, LocalTime tradingEnd) {
        this.tradingStart = tradingStart;
        this.tradingEnd = tradingEnd;
    }
}
