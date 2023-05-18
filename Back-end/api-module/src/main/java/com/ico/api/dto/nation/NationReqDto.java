package com.ico.api.dto.nation;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
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
    @NotNull(message = "19")
    int grade;
    @NotNull(message = "19")
    int room;
    @NotBlank(message = "19")
    String title;
    @NotBlank(message = "19")
    String currency;

}
