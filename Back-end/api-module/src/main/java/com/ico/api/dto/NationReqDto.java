package com.ico.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalTime;

/**
 * 나라 생성시 입력받을 DTO
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class NationReqDto {

    @NotBlank(message = "19")
    String school;
    @NotBlank(message = "19")
    int grade;
    @NotBlank(message = "19")
    int room;
    @NotBlank(message = "19")
    String title;
    @NotBlank(message = "19")
    String currency;
    @NotBlank(message = "19")
    LocalTime trading_start;
    @NotBlank(message = "19")
    LocalTime trading_end;

}
