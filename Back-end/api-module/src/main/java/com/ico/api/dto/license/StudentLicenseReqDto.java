package com.ico.api.dto.license;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Map;

@Getter
@NoArgsConstructor
public class StudentLicenseReqDto {

    @NotNull(message = "40")
    private Map<Long, Integer> licenses;
}
