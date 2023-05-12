package com.ico.api.dto.job;

import com.ico.core.entity.Job;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * 직업 명함 조회 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class JobResDto {

    private Long id;

    private String title;

    private String detail;

    private int creditRating;

    private int wage;

    private String image;

    private String color;

    private int total;

    private int count;

    private List<String> studentNames;

    @Builder
    public JobResDto(Long id, String title, String detail, int creditRating, int wage, String image, String color, int total, int count, List<String> studentNames) {
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.creditRating = creditRating;
        this.wage = wage;
        this.image = image;
        this.color = color;
        this.total = total;
        this.count = count;
        this.studentNames = studentNames;
    }

    /**
     * 직업 명함 조회 dto 반환
     *
     * @param job
     * @return
     */
    public JobResDto of(Job job) {
        return JobResDto.builder()
                .id(job.getId())
                .title(job.getTitle())
                .detail(job.getDetail())
                .creditRating(job.getCreditRating())
                .wage(job.getWage())
                .image(job.getImage())
                .color(job.getColor())
                .total(job.getTotal())
                .count(job.getCount())
                .studentNames(job.getStudentNames().equals("") ? new ArrayList<>() : List.of(job.getStudentNames().split(",")))
                .build();
    }
}
