package com.ico.api.dto.student;

import com.ico.core.entity.Job;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Student;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 학생 내 정보 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class StudentMyPageResDto {

    private String school;

    private int room;

    private int number;

    private String name;

    private int account;

    private int creditRating;

    private String jobImage;

    private String jobName;

    @Builder
    public StudentMyPageResDto(String school, int room, int number, String name, int account, int creditRating, String jobImage, String jobName) {
        this.school = school;
        this.room = room;
        this.number = number;
        this.name = name;
        this.account = account;
        this.creditRating = creditRating;
        this.jobImage = jobImage;
        this.jobName = jobName;
    }

    /**
     * 학생 내 정보 res dto 반환
     *
     * @param student
     * @param nation
     * @param job
     * @return
     */
    public StudentMyPageResDto of(Student student, Nation nation, Job job) {
        return StudentMyPageResDto.builder()
                .school(nation.getSchool())
                .room(nation.getRoom())
                .number(student.getNumber())
                .name(student.getName())
                .account(student.getAccount())
                .creditRating(student.getCreditRating())
                // TODO: 학생의 직업이 엾을 경우 추후에 학생 기본 이미지 반환
                .jobImage(job == null ? null : job.getImage())
                .jobName(job == null ? null : job.getTitle())
                .build();
    }
}
