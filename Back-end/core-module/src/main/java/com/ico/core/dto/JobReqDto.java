package com.ico.core.dto;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * 직업 수정 시 입력값 받을 Dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JobReqDto {

    @NotNull(message = "410")
    @Size(max = 8)
    private String title;

    @NotNull(message = "411")
    private String detail;

    @NotNull(message = "412")
    private Integer total;

    @NotNull(message = "413")
    private Integer wage;

    @NotNull(message = "414")
    private String color;

    @NotNull(message = "426")
    private Integer creditRating;

    @NotNull(message = "430")
    private String image;

    @NotEmpty(message = "111")
    private List<Long> powers;

    @NotEmpty(message = "41")
    private List<Long> jobLicenseIds;

    @NotEmpty(message = "42")
    private List<Long> licenseIds;

    @NotEmpty(message = "43")
    private List<Integer> ratings;

    @Builder
    public JobReqDto(String title, String detail, Integer total, Integer wage, String color, Integer creditRating, String image, List<Long> powers, List<Long> jobLicenseId, List<Long> licenseId, List<Integer> rating) {
        this.title = title;
        this.detail = detail;
        this.total = total;
        this.wage = wage;
        this.color = color;
        this.creditRating = creditRating;
        this.image = image;
        this.powers = powers;
        this.jobLicenseIds = jobLicenseId;
        this.licenseIds = licenseId;
        this.ratings = rating;
    }
}
