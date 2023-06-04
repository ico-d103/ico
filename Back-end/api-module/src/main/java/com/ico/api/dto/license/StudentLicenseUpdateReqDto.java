package com.ico.api.dto.license;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class StudentLicenseUpdateReqDto {
    @NotBlank(message = "800")
    String subject;
    @NotNull(message = "801")
    Integer rating;
}
