package com.ico.core.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * 선생님 상품 등록 dto
 *
 * @author 변윤경
 */
@Getter
@Setter
@NoArgsConstructor
public class TeacherProductReqDto {
    @NotBlank(message = "605")
    private String title;

    @Min(value = 1, message = "607")
    private int amount;

    @NotBlank(message = "609")
    private String detail;

    @Min(value = 1, message = "611")
    private byte count;

    @NotNull(message = "612")
    private Boolean rental;
}
