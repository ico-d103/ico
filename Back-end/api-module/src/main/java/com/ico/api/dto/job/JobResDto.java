package com.ico.api.dto.job;

import com.ico.core.entity.Job;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 직업 명함 조회 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class JobResDto {

    private String title;

    private String detail;

    private int creditRating;

    private int wage;

    private String image;

    private String color;

    private int total;

    private int count;

    @Builder
    public JobResDto(String title, String detail, int creditRating, int wage, String image, String color, int total, int count) {
        this.title = title;
        this.detail = detail;
        this.creditRating = creditRating;
        this.wage = wage;
        this.image = image;
        this.color = color;
        this.total = total;
        this.count = count;
    }

    /**
     * 직업 명함 조회 dto 반환
     *
     * @param job
     * @return
     */
    public JobResDto of(Job job) {
        return JobResDto.builder()
                .title(job.getTitle())
                .detail(job.getDetail())
                .creditRating(job.getCreditRating())
                .wage(job.getWage())
                .image(job.getImage())
                .color(job.getColor())
                .total(job.getTotal())
                .count(job.getCount())
                .build();
    }
}
