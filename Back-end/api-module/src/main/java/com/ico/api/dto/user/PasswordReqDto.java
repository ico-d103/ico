package com.ico.api.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
public class PasswordReqDto {

    // 교체할 비밀번호
    @NotBlank(message = "104")
    String password;

    // 교체할 비밀번호 체크
    @NotBlank(message = "117")
    String checkedPassword;
}
