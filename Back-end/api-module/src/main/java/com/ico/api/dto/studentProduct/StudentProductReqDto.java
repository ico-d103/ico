package com.ico.api.dto.studentProduct;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

/**
 * 학생들의 판매제안서 등록 dto
 *
 * @author 변윤경
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
public class StudentProductReqDto {
    @NotBlank(message = "605")
    String title;

    @Min(value = 1, message = "607")
    int amount;

    @NotBlank(message = "609")
    String detail;

    @Min(value = 1, message = "611")
    byte count;
}
