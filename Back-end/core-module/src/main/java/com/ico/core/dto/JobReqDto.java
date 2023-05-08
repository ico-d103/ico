package com.ico.core.dto;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 직업 수정 시 입력값 받을 Dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JobReqDto {

    @NotNull(message = "410")
    private String title;

    @NotNull(message = "411")
    private String detail;

    @NotNull(message = "412")
    private int total;

    @NotNull(message = "413")
    private int wage;

    @NotNull(message = "414")
    private String color;

    @Builder
    public JobReqDto(String title, String detail, int total, int wage, String color) {
        this.title = title;
        this.detail = detail;
        this.total = total;
        this.wage = wage;
        this.color = color;
    }

}
