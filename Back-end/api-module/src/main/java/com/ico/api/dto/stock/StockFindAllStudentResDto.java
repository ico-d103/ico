package com.ico.api.dto.stock;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 학생의 투자 종목 조회 ResDto
 *
 * @author 변윤경
 */
@Getter
@Setter
@NoArgsConstructor
public class StockFindAllStudentResDto {
    List<StockMyResDto> myStocks;

    List<StockListColDto> stockList;

    @Builder
    public StockFindAllStudentResDto(List<StockMyResDto> myStocks, List<StockListColDto> stockList) {
        this.myStocks = myStocks;
        this.stockList = stockList;
    }
}
