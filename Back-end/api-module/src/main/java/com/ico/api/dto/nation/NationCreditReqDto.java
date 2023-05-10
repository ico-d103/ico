package com.ico.api.dto.nation;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
 * 신용점수 등락폭 수정 req dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class NationCreditReqDto {

    @NotNull(message = "407")
    @Min(value = 0, message = "407")
    private Integer creditUp;

    @NotNull(message = "408")
    @Min(value = 0, message = "408")
    private Integer creditDown;
}
