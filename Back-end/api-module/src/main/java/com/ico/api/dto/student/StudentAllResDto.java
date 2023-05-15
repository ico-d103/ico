package com.ico.api.dto.student;

import com.ico.core.entity.StudentJob;
import com.ico.core.entity.Student;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 학생이 반 친구 목록 조회하는 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class StudentAllResDto {

    private int number;

    private String name;

    private String jobName;

    private int creditRating;

    @Builder
    public StudentAllResDto(int number, String name, String jobName, int creditRating) {
        this.number = number;
        this.name = name;
        this.jobName = jobName;
        this.creditRating = creditRating;
    }

    /**
     * 학생의 반 친구 목록 조회 반환 dto 생성
     *
     * @param student
     * @param studentJob
     * @return
     */
    public StudentAllResDto of(Student student, StudentJob studentJob) {
        return StudentAllResDto.builder()
                .number(student.getNumber())
                .name(student.getName())
                .jobName(studentJob == null ? null : studentJob.getTitle())
                .creditRating(student.getCreditRating())
                .build();
    }
}
