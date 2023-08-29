package com.ico.api.dto.nation;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

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
    private String school;
    @NotNull(message = "19")
    @Range(min = 1, max = 7, message = "806")
    private Integer grade;
    @NotNull(message = "19")
    private Integer room;
    @NotBlank(message = "19")
    private String title;
    @NotBlank(message = "19")
    private String currency;

}
