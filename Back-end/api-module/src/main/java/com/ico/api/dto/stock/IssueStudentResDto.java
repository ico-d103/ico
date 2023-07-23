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
public class IssueStudentResDto {
    private String stock;

    private String content;

    private int account;

    private LocalTime tradingStart;

    private LocalTime tradingEnd;

    private StockMyResDto myStock;

    private List<IssueColDto> issue;

    @Builder
    public IssueStudentResDto(String stock, String content, int account, LocalTime tradingStart, LocalTime tradingEnd, StockMyResDto myStock, List<IssueColDto> issue) {
        this.stock = stock;
        this.content = content;
        this.account = account;
        this.tradingStart = tradingStart;
        this.tradingEnd = tradingEnd;
        this.myStock = myStock;
        this.issue = issue;
    }
}
