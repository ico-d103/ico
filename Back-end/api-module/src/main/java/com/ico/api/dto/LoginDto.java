package com.ico.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 로그인시 입력할 것
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class LoginDto {

    private String identity;
    private String password;

}
