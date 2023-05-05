package com.ico.api.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

/**
 * 로그인시 입력할 것
 *
 * @author 강교철
 */
@Getter
@Setter
@NoArgsConstructor
public class LoginDto {

    @NotBlank(message = "100")
    private String identity;
    @NotBlank(message = "104")
    private String password;

}
