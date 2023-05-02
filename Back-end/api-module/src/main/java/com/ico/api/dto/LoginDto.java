package com.ico.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 로그인시 입력할 것
 *
 * @author 강교철
 */
@Getter
@Setter
@NoArgsConstructor
public class LoginDto {

    private String identity;
    private String password;

}
