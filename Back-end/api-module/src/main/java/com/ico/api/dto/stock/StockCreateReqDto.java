package com.ico.api.dto.stock;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * 투자 종목 등록 Req Dto
 *
 * @author 변윤경
 */
@Getter
@NoArgsConstructor
public class StockCreateReqDto {
    @NotBlank(message = "")
    private String title;

    @NotBlank(message = "")
    private String content;

    // 주식 시작 가격
    private double amount;

    // 내일의 첫 이슈 등록
    @NotBlank(message = "")
    private String issue;

    @Builder
    public StockCreateReqDto(String title, String content, double amount, String issue) {
        this.title = title;
        this.content = content;
        this.amount = amount;
        this.issue = issue;
    }
}
