package com.ico.api.dto.stock;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * 투자 이슈 등록
 * @author 변윤경
 */
@Getter
@NoArgsConstructor
public class StockUploadReqDto {
    @NotNull(message = "711")
    private int amount;

    @NotBlank(message = "713")
    private String content;

    @NotNull(message =  "714")
    private double price;

    @Builder
    public StockUploadReqDto(int amount, String content, double price) {
        this.amount = amount;
        this.content = content;
        this.price = price;
    }
}
