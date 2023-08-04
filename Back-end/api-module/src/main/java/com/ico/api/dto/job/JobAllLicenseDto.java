package com.ico.api.dto.job;

import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 직업 조회 시 자격증과 등급도 함께 조회
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class JobAllLicenseDto {

    private String subject;
    private int rating ;
}
