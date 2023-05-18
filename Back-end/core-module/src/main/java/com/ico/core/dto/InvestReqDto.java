package com.ico.core.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
 * 매수 시 입력 값
 * 최신 지수 가격, 매수 금액
 *
 * @author 변윤경
 */
@Getter
@Setter
@NoArgsConstructor
public class InvestReqDto {
    @NotNull(message = "714")
    private Double price;

    @NotNull(message = "715")
    @Min(value = 1, message = "716")
    private Integer amount;

    @Builder
    public InvestReqDto(Double price, Integer amount) {
        this.price = price;
        this.amount = amount;
    }
}
