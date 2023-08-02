package com.ico.api.dto.license;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Map;

/**
 * 학생 자격증 등급 조정시에 받는 Dto
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class StudentLicenseReqDto {

    @NotNull(message = "40")
    private Map<Long, Integer> licenses;
}
