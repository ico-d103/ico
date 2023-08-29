package com.ico.api.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * 아이디 중복 체크 시 사용하는 Dto
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class DuplicatedIdentityReqDto {

    @NotBlank(message = "100")
    private String identity;
}
