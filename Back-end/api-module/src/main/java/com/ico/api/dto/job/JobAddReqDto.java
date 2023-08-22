package com.ico.api.dto.job;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Map;

/**
 * 직업 추가 req dto
 * 자격증, 권한, 신용등급은 사용하지 않는 교사가 있기 때문에 유효성 검사를 하지 않고
 * Service 로직에서 유효성 검사를 하고 있습니다.
 *
 * @author 서재건
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class JobAddReqDto {

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

    @Range(min = 1, max = 10, message = "47")
    private Integer creditRating;

    @NotBlank(message = "425")
    private String image;

    private List<Long> empowered;

    private Map<Long, Integer> jobLicenseList;

    @Builder
    public JobAddReqDto(String title, String detail, Integer total, Integer salary, String color, Integer creditRating, String image, List<Long> empowered, Map<Long, Integer> jobLicenseList) {
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
