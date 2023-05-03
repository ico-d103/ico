package com.ico.api.dto;

import com.ico.core.entity.Job;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 학생이 인원미달 직업을 조회할 때 사용하는 Dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class JobShortFallResDto {

    private String title;

    private int creditRating;

    private int count;

    private int total;

    private String image;

    private String color;

    @Builder
    public JobShortFallResDto(String title, int creditRating, int count, int total, String image, String color) {
        this.title = title;
        this.creditRating = creditRating;
        this.count = count;
        this.total = total;
        this.image = image;
        this.color = color;
    }

    public JobShortFallResDto of(Job job) {
        return JobShortFallResDto.builder()
                .title(job.getTitle())
                .creditRating(job.getCreditRating())
                .count(job.getCount())
                .total(job.getTotal())
                .image(job.getImage())
                .color(job.getColor())
                .build();
    }
}
