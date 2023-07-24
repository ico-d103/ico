package com.ico.core.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

/**
 * 직업에 자격증 등급을 설정하는 Entity
 *
 * @author 강교철
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class JobLicense {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany(fetch = FetchType.LAZY)
    @Column(name = "license_id")
    private List<NationLicense> license;

    @OneToMany(fetch = FetchType.LAZY)
    @Column(name = "job_id")
    private List<StudentJob> job;

    private byte rating;
}
