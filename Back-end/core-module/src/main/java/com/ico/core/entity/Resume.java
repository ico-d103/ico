package com.ico.core.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * 직업 신청 내역 Document
 *
 * @author 서재건
 */
@Entity(name = "resume")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Resume {

    @Id
    private Long id;

    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "job_id")
    private Long jobId;

    @Column(name = "nation_id")
    private Long nationId;

    @Builder
    public Resume(Long id, Long studentId, Long jobId, Long nationId) {
        this.id = id;
        this.studentId = studentId;
        this.jobId = jobId;
        this.nationId = nationId;
    }
}
