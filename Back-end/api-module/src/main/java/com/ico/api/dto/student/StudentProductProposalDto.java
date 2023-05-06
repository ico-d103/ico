package com.ico.api.dto.student;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * 학생들의 판매제안서 등록 dto
 *
 * @author 변윤경
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
public class StudentProductProposalDto {
    String identity;
    Long nationId;
    @NotBlank(message = "605")
    String title;
    @NotNull(message = "606")
    @Min(value = 1, message = "607")
    int amount;
    @NotNull(message = "608")
    String image;
    @NotBlank(message = "609")
    String detail;
    @NotNull(message = "610")
    @Min(value = 1, message = "611")
    byte count;
}
