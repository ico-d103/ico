package com.ico.api.dto.license;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
public class StudentLicenseUpdateReqDto {
    @NotBlank(message = "800")
    String subject;
    @NotBlank(message = "801")
    Integer rating;
}
