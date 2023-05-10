package com.ico.api.dto.bank;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
 * 예금 신청 dto
 *
 * @author 변윤경
 */
@Setter
@Getter
@NoArgsConstructor
public class DepositReqDto {
    @NotNull
    private Boolean longPeriod;

    @Min(value = 1, message = "723")
    private int amount;

    @Builder
    public DepositReqDto(Boolean longPeriod, int amount) {
        this.longPeriod = longPeriod;
        this.amount = amount;
    }
}
