package com.ico.api.dto.coolsms;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

/**
 * 인증하기 위해 phoneNum과 code 받는 dto
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class PhoneNumAndCodeReqDto {
    @NotBlank(message = "107")
    @Pattern(regexp = "^[0-9]{11}$", message = "114")
    private String phoneNum;

    @NotNull(message = "20")
    private String code;
}
