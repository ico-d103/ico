package com.ico.api.dto.job;


import com.ico.core.entity.StudentJob;
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

    private int count;

    private List<String> studentNames;

    @Builder
    public JobAllColDto(Long id, String title, String image, String color, int creditRating, int total, String salary, int count, List<String> studentNames) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.color = color;
        this.creditRating = creditRating;
        this.total = total;
        this.salary = salary;
        this.count = count;
        this.studentNames = studentNames;
    }

    /**
     * repository에서 불러온 Job을 JobAllColDto로 생성
     *
     * @param studentJob
     * @return JobAllResDto
     */
    public JobAllColDto of(StudentJob studentJob, String salary, String image) {
        String studentNames = studentJob.getStudentNames();
        return JobAllColDto.builder()
                .id(studentJob.getId())
                .title(studentJob.getTitle())
                .image(image)
                .color(studentJob.getColor())
                .creditRating(studentJob.getCreditRating())
                .total(studentJob.getTotal())
                .salary(salary)
                .count(studentJob.getCount())
                .studentNames((studentNames == null || studentNames.equals(""))
                        ? new ArrayList<>() : List.of(studentNames.split(",")))
                .build();

    }

}
