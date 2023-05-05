package com.ico.api.dto;

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

    @NotNull(message = "19")
    Long nationId;
    @NotBlank(message = "19")
    String code;
}
