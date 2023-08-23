package com.ico.api.dto.coolsms;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * 휴대폰 번호 받는 Dto
 */
@Getter
@NoArgsConstructor
public class PhoneNumReqDto {

    @NotBlank(message = "107")
    private String phoneNum;
}
