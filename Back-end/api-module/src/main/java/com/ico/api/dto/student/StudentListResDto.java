package com.ico.api.dto.student;

import com.ico.core.entity.Student;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 우리 반 학생 목록 조회 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class StudentListResDto {

    private String name;

    private int number;

    private int amount;

    private int creditRating;

    private String job;

    @Builder
    public StudentListResDto(String name, int number, int amount, int creditRating, String job) {
        this.name = name;
        this.number = number;
        this.amount = amount;
        this.creditRating = creditRating;
        this.job = job;
    }

    public StudentListResDto of(Student student) {
        return StudentListResDto.builder()
                .name(student.getName())
                .number(student.getNumber())
                .amount(student.getAccount())
                .creditRating(student.getCreditRating())
                .job(student.getJob() == null ? null : student.getJob().getTitle())
                .build();
    }
}
