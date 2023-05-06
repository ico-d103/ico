package com.ico.api.dto.job;

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
public class JobAvailableResDto {

    private String title;

    private int creditRating;

    private int count;

    private int total;

    private String image;

    private String color;

    @Builder
    public JobAvailableResDto(String title, int creditRating, int count, int total, String image, String color) {
        this.title = title;
        this.creditRating = creditRating;
        this.count = count;
        this.total = total;
        this.image = image;
        this.color = color;
    }

    /**
     * repository에서 불러온 Job을 JobAvailableResDto로 생성
     *
     * @param job
     * @return
     */
    public JobAvailableResDto of(Job job) {
        return JobAvailableResDto.builder()
                .title(job.getTitle())
                .creditRating(job.getCreditRating())
                .count(job.getCount())
                .total(job.getTotal())
                .image(job.getImage())
                .color(job.getColor())
                .build();
    }
}
