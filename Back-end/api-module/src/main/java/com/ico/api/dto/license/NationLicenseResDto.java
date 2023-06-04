package com.ico.api.dto.license;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class NationLicenseResDto {

    Long id;
    String subject;

    @Builder
    public NationLicenseResDto(Long id, String subject) {
        this.id = id;
        this.subject = subject;
    }
}
