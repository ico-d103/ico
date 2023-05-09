package com.ico.core.dto;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * 국세 정보 수정 dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TaxReqDto {

    @NotBlank(message = "404")
    private String title;

    @NotNull(message = "405")
    private Integer amount;

    @NotNull(message = "406")
    @Min(value = 0, message = "406")
    @Max(value = 1, message = "406")
    private Integer type;
}
