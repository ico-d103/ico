package com.ico.core.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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

    private Long student_id;

    private Long job_id;

    private Long nation_id;

    @Builder
    public Resume(String id, Long student_id, Long job_id, Long nation_id) {
        this.id = id;
        this.student_id = student_id;
        this.job_id = job_id;
        this.nation_id = nation_id;
    }
}
