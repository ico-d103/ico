package com.ico.api.dto.license;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 나라의 자격증과 올릴지 내릴지를 받는 dto
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class LicenseUpdateReqDto {
    @NotNull(message = "800")
    Long nationLicenseId;
    @NotNull(message = "801")
    Boolean upDown;
}
