package com.ico.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * 교사가 나라에 적용할 자격증을 수정하고 추가하는 테이블
 * 기본적으로는 MongoDB의 자격증 값이 나라를 생성할 때 나라별로 생성됨
 *
 * @author 강교철
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class NationLicense {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "nation_id")
    private Nation nation;

    private String subject;

    @Builder
    public NationLicense(Long id, Nation nation, String subject) {
        this.id = id;
        this.nation = nation;
        this.subject = subject;
    }
}
