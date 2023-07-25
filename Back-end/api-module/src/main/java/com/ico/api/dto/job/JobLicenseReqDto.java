package com.ico.api.dto.job;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
 * 직업에 대한 자격증과 등급 생성, 수정 시 사용
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class JobLicenseReqDto {
    @NotNull(message = "41")
    private Long jobId;
    @NotNull(message = "42")
    private Long licenseId;
    @NotNull(message = "43")
    @Min(0)
    @Max(7)
    private Integer rating;
}
