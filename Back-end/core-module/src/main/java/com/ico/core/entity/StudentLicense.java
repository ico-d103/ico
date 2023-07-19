package com.ico.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * 나라에 작성된 자격증을 학생 개개인에게 적용
 * 기본적으로 나라에 입장할 때 학생에게 나라의 자격증이 자동으로 부여
 * @author 강교철
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class StudentLicense {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "nation_id")
    private Nation nation;

    private String subject;

    private Byte rating;

    @Column(name = "nation_license_id")
    private Long nationLicenseId;

    @Builder
    public StudentLicense(Long id, Student student, Nation nation, String subject, Byte rating, Long nationLicenseId) {
        this.id = id;
        this.student = student;
        this.nation = nation;
        this.subject = subject;
        this.rating = rating;
        this.nationLicenseId = nationLicenseId;
    }
}
