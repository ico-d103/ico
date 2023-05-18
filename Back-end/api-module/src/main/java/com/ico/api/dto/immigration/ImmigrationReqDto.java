package com.ico.api.dto.immigration;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class ImmigrationReqDto {
    @NotBlank(message = "20")
    String code;

    // 학생의 반 번호
    @NotNull(message = "32")
    Integer number;
}
