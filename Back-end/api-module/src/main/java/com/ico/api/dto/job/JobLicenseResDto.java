package com.ico.api.dto.job;

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

    private String title;

    private int rating;

    @Builder
    public JobLicenseResDto(Long id, String subject, String title, int rating) {
        this.id = id;
        this.subject = subject;
        this.title = title;
        this.rating = rating;
    }
}
