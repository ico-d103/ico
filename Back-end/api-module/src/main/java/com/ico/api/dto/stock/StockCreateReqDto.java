package com.ico.api.dto.stock;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * 투자 종목 등록 Req Dto
 *
 * @author 변윤경
 */
@Getter
@NoArgsConstructor
public class StockCreateReqDto {
    @NotBlank(message = "708")
    private String title;

    @NotBlank(message = "727")
    private String content;

    // 주식 시작 가격
    @NotNull(message = "711")
    @Min(0)
    private Double amount;

    // 내일의 첫 이슈 등록
    @NotBlank(message = "713")
    private String issue;

    @Builder
    public StockCreateReqDto(String title, String content, Double amount, String issue) {
        this.title = title;
        this.content = content;
        this.amount = amount;
        this.issue = issue;
    }
}
