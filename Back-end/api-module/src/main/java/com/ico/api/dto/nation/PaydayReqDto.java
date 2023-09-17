package com.ico.api.dto.nation;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 월급일자 입력 ReqDto
 *
 * @author 변윤경
 */
@Getter
@NoArgsConstructor
public class PaydayReqDto {

    @NotNull(message = "431")
    private Byte date;

    @Builder
    public PaydayReqDto(Byte date) {
        this.date = date;
    }
}
