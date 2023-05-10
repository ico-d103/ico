package com.ico.core.dto;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * 국세 정보 req dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TaxReqDto {

    @NotBlank(message = "404")
    private String title;

    @NotBlank(message = "27")
    private String detail;

    @NotNull(message = "405")
    private Integer amount;

    @NotNull(message = "406")
    @Range(min = 0, max = 1, message = "406")
    private Integer type;
}
