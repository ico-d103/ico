package com.ico.api.dto.job;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import java.util.List;

/**
 * 직업에 부여된 자격증 삭제 시 받는 Dto
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class JobLicenseDelReqDto {

    @NotEmpty(message = "42")
    private List<Long> jobLicenseIds;
}
