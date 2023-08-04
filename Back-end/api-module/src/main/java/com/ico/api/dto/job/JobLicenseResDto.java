package com.ico.api.dto.job;

import com.ico.core.entity.JobLicense;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 하나의 직업에 대한 자격증과 등급 정보
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class JobLicenseResDto {

    private Long id;
    private String subject;
    private int rating;

    @Builder
    public JobLicenseResDto(Long id, String subject, int rating) {
        this.id = id;
        this.subject = subject;
        this.rating = rating;
    }

    /**
     * JobLicense 데이터를 가지고 직업에 부여된 자격증 정보 보내주기
     * @param jobLicense
     * @param subject
     * @return
     */
    public JobLicenseResDto of(JobLicense jobLicense, String subject) {
        return JobLicenseResDto.builder()
                .id(jobLicense.getId())
                .subject(subject)
                .rating(jobLicense.getRating())
                .build();
    }
}
