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
public class IssueTeacherResDto {
    private String stock;

    private LocalTime tradingStart;

    private LocalTime tradingEnd;

    private List<IssueColDto> issue;

    @Builder
    public IssueTeacherResDto(String stock, LocalTime tradingStart, LocalTime tradingEnd, List<IssueColDto> issue) {
        this.stock = stock;
        this.tradingStart = tradingStart;
        this.tradingEnd = tradingEnd;
        this.issue = issue;
    }
}
