package com.ico.api.dto.coolsms;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

/**
 * 휴대폰 번호 받는 Dto
 */
@Getter
@NoArgsConstructor
public class PhoneNumReqDto {

    @NotBlank(message = "107")
    @Pattern(regexp = "^[0-9]{11}$", message = "114")
    private String phoneNum;
}
