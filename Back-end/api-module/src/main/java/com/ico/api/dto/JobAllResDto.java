package com.ico.api.dto;


import com.ico.core.entity.Job;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 교사가 전체 직업 조회할 때 사용하는 Dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor()
public class JobAllResDto {

    private Long id;

    private String title;

    private String image;

    private int total;

    private int count;

    private String color;

    @Builder
    public JobAllResDto(Long id, String title, String image, int total, int count, String color) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.total = total;
        this.count = count;
        this.color = color;
    }

    /**
     * repository에서 불러온 Job을 JobAllResDto로 생성
     *
     * @param job
     * @return JobAllResDto
     */
    public JobAllResDto of(Job job) {
        return JobAllResDto.builder()
                .id(job.getId())
                .title(job.getTitle())
                .image(job.getImage())
                .total(job.getTotal())
                .count(job.getCount())
                .color(job.getColor())
                .build();
    }

}
