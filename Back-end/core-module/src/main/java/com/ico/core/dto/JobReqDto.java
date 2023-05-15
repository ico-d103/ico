package com.ico.core.dto;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * 직업 수정 시 입력값 받을 Dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JobReqDto {

    @NotNull(message = "410")
    @Size(max = 8)
    private String title;

    @NotNull(message = "411")
    private String detail;

    @NotNull(message = "412")
    private Integer total;

    @NotNull(message = "413")
    private Integer wage;

    @NotNull(message = "414")
    private String color;

    @NotNull(message = "426")
    private Integer creditRating;

    @NotNull(message = "430")
    private String image;

    @Builder
    public JobReqDto(String title, String detail, Integer total, Integer wage, String color, Integer creditRating, String image) {
        this.title = title;
        this.detail = detail;
        this.total = total;
        this.wage = wage;
        this.color = color;
        this.creditRating = creditRating;
        this.image = image;
    }

}
