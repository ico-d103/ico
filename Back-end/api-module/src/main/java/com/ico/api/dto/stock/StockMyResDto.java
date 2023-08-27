package com.ico.api.dto.stock;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 종목별 소유한 학생의 주식목록
 * @author 변윤경
 */

@Getter
@Setter
@NoArgsConstructor
public class StockMyResDto {
    private Long stockId;

    private String title;

    private double lastPrice;

    private List<StockMyColResDto> stocklist;

    @Builder
    public StockMyResDto(Long stockId, String title, double lastPrice, List<StockMyColResDto> stocklist) {
        this.stockId = stockId;
        this.title = title;
        this.lastPrice = lastPrice;
        this.stocklist = stocklist;
    }
}
