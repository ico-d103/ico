package com.ico.api.dto.license;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class StudentLicenseResDto {

    Long id;
    String subject;
    byte rating;

    @Builder
    public StudentLicenseResDto(Long id, String subject, byte rating) {
        this.id = id;
        this.subject = subject;
        this.rating = rating;
    }
}
