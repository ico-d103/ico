package com.ico.core.dto;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Map;

/**
 * 직업 수정 시 입력값 받을 Dto
 *
 * @author 서재건
 * @author 강교철
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
    private Integer salary;

    @NotNull(message = "414")
    private String color;

    private Integer creditRating;

    @NotNull(message = "430")
    private String image;

    private List<Long> empowered;

    private Map<Long, Integer> jobLicenseList;

    @Builder
    public JobReqDto(String title, String detail, Integer total, Integer salary, String color, Integer creditRating, String image, List<Long> empowered, Map<Long, Integer> jobLicenseList) {
        this.title = title;
        this.detail = detail;
        this.total = total;
        this.salary = salary;
        this.color = color;
        this.creditRating = creditRating;
        this.image = image;
        this.empowered = empowered;
        this.jobLicenseList = jobLicenseList;
    }
}
