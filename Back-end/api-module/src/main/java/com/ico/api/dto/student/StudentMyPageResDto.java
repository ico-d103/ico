package com.ico.api.dto.student;

import com.ico.core.entity.StudentJob;
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

    private String color;

    private int deposit;

    private int invest;

    @Builder
    public StudentMyPageResDto(String school, int room, int number, String name, int account, int creditRating, String jobImage, String jobName, String color, int deposit, int invest) {
        this.school = school;
        this.room = room;
        this.number = number;
        this.name = name;
        this.account = account;
        this.creditRating = creditRating;
        this.jobImage = jobImage;
        this.jobName = jobName;
        this.color = color;
        this.deposit = deposit;
        this.invest = invest;
    }

    /**
     * 학생 내 정보 res dto 반환
     *
     * @param student
     * @param nation
     * @param studentJob
     * @return
     */
    public StudentMyPageResDto of(Student student, Nation nation, StudentJob studentJob, int depositAmount, int investAmount, String imgUrl) {
        return StudentMyPageResDto.builder()
                .school(nation.getSchool())
                .room(nation.getRoom())
                .number(student.getNumber())
                .name(student.getName())
                .account(student.getAccount())
                .creditRating(student.getCreditRating())
                .jobImage(imgUrl)
                .jobName(studentJob == null ? null : studentJob.getTitle())
                .color(studentJob == null ? null : studentJob.getColor())
                .deposit(depositAmount)
                .invest(investAmount)
                .build();
    }
}
