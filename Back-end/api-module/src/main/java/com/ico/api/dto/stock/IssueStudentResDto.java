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

    private List<StockMyColResDto> myStocks;

    private List<IssueColDto> issue;

    @Builder
    public IssueStudentResDto(String stock, String content, int account, List<StockMyColResDto> myStocks, List<IssueColDto> issue) {
        this.stock = stock;
        this.content = content;
        this.account = account;
        this.myStocks = myStocks;
        this.issue = issue;
    }
}
