package com.ico.api.dto.job;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * 직업 추가 req dto
 *
 * @author 서재건
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

    @NotNull(message = "426")
    private Integer creditRating;

    @NotBlank(message = "425")
    private String image;

    @NotEmpty(message = "111")
    private List<Long> powers;

    @NotEmpty(message = "42")
    private List<Long> licenseIds;

    @NotEmpty(message = "43")
    private List<Integer> ratings;

    @Builder
    public JobAddReqDto(String title, String detail, Integer total, Integer wage, String color, Integer creditRating, String image, List<Long> powers, List<Long> licenseIds, List<Integer> ratings) {
        this.title = title;
        this.detail = detail;
        this.total = total;
        this.salary = wage;
        this.color = color;
        this.creditRating = creditRating;
        this.image = image;
        this.powers = powers;
        this.licenseIds = licenseIds;
        this.ratings = ratings;
    }
}
