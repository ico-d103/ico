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

    private String detail;

    private int creditRating;

    private int total;

    private int wage;

    private int count;

    private List<String> studentNames;

    private List<String> empowered;

    private List<JobLicenseResDto> jobLicenseList;

    @Builder
    public JobAllColDto(Long id, String title, String image, String color, String detail, int creditRating, int total, int wage, int count, List<String> studentNames, List<String> empowered, List<JobLicenseResDto> jobLicenseList) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.color = color;
        this.detail = detail;
        this.creditRating = creditRating;
        this.total = total;
        this.wage = wage;
        this.count = count;
        this.studentNames = studentNames;
        this.empowered = empowered;
        this.jobLicenseList = jobLicenseList;
    }

    /**
     * repository에서 불러온 Job을 JobAllColDto로 생성
     *
     * @param studentJob
     * @return JobAllResDto
     */
    public JobAllColDto of(StudentJob studentJob, String image, List<JobLicenseResDto> jobLicenseList) {
        String studentNames = studentJob.getStudentNames();
        String empowered = studentJob.getEmpowered();
        return JobAllColDto.builder()
                .id(studentJob.getId())
                .title(studentJob.getTitle())
                .image(image)
                .color(studentJob.getColor())
                .detail(studentJob.getDetail())
                .creditRating(studentJob.getCreditRating())
                .total(studentJob.getTotal())
                .wage(studentJob.getWage())
                .count(studentJob.getCount())
                .studentNames((studentNames == null || studentNames.isEmpty())
                        ? new ArrayList<>() : List.of(studentNames.split(",")))
                .empowered((empowered == null || empowered.isEmpty())
                        ? new ArrayList<>() : List.of(empowered.split(",")))
                .jobLicenseList(jobLicenseList)
                .build();

    }

}
