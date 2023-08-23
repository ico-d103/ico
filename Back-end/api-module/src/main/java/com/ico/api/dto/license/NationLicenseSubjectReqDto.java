package com.ico.api.dto.license;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * 나라 자격증 생성 및 업데이트에 사용하는 Dto
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class NationLicenseSubjectReqDto {

    @NotBlank(message = "800")
    private String subject;
}
