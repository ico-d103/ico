package com.ico.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * 직업에 자격증 등급을 설정하는 Entity
 *
 * @author 강교철
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "job_license")
public class JobLicense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private NationLicense nationLicense;

    @ManyToOne(fetch = FetchType.LAZY)
    private StudentJob job;

    private byte rating;

    @Builder
    public JobLicense(Long id, NationLicense nationLicense, StudentJob job, byte rating) {
        this.id = id;
        this.nationLicense = nationLicense;
        this.job = job;
        this.rating = rating;
    }
}
