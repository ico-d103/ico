package com.ico.api.dto.job;


import com.ico.core.entity.Job;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * 교사가 전체 직업 조회할 때 사용하는 Dto column
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor()
public class JobAllColDto {

    private Long id;

    private String title;

    private String image;

    private String color;

    private int creditRating;

    private int total;

    private String salary;

    private int recruitStudent;

    private List<String> studentNames;

    @Builder
    public JobAllColDto(Long id, String title, String image, String color, int creditRating, int total, String salary, int recruitStudent, List<String> studentNames) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.color = color;
        this.creditRating = creditRating;
        this.total = total;
        this.salary = salary;
        this.recruitStudent = recruitStudent;
        this.studentNames = studentNames;
    }

    /**
     * repository에서 불러온 Job을 JobAllColDto로 생성
     *
     * @param job
     * @return JobAllResDto
     */
    public JobAllColDto of(Job job, String salary) {
        return JobAllColDto.builder()
                .id(job.getId())
                .title(job.getTitle())
                .image(job.getImage())
                .color(job.getColor())
                .creditRating(job.getCreditRating())
                .total(job.getTotal())
                .salary(salary)
                .recruitStudent(job.getTotal() - job.getCount())
                .studentNames(job.getStudentName().equals("") ? new ArrayList<>() : List.of(job.getStudentName().split(",")))
                .build();

    }

}
