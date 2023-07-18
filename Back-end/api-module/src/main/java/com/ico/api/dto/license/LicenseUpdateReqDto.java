package com.ico.api.dto.license;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class LicenseUpdateReqDto {
    @NotNull(message = "800")
    Long nationLicenseId;
    @NotNull(message = "801")
    Boolean upDown;
}
