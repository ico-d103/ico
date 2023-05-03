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
public class JobDto {

    @NotNull(message = "410")
    private String title;

    @NotNull(message = "411")
    private String detail;

    @NotNull(message = "412")
    private int total;

    @NotNull(message = "413")
    private int wage;

    // TODO: 색깔 어떤 식으로 줄지 프론트와 상의 필요
    @NotNull(message = "414")
    private String color;

    @Builder
    public JobDto(String title, String detail, int total, int wage, String color) {
        this.title = title;
        this.detail = detail;
        this.total = total;
        this.wage = wage;
        this.color = color;
    }

}
