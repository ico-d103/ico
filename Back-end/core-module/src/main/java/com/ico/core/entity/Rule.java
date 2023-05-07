package com.ico.core.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * 학급 규칙
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Rule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "nation_id")
    private Nation nation;

    private String title;

    @Column(length = 1023)
    private String detail;

    @Builder
    public Rule(Long id, Nation nation, String title, String detail) {
        this.id = id;
        this.nation = nation;
        this.title = title;
        this.detail = detail;
    }
}
