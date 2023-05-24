package com.ico.core.document;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Column;

/**
 * 직업 신청 내역 Document
 *
 * @author 서재건
 */
@Document(collection = "resume")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Resume {

    @Id
    private String id;

    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "job_id")
    private Long jobId;

    @Column(name = "nation_id")
    private Long nationId;

    @Builder
    public Resume(String id, Long studentId, Long jobId, Long nationId) {
        this.id = id;
        this.studentId = studentId;
        this.jobId = jobId;
        this.nationId = nationId;
    }
}
