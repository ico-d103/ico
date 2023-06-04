package com.ico.core.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ico.core.dto.DepositUpdatetDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * 예금 상품 Entity
 *
 * @author 변윤경
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class DepositProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    private Nation nation;

    private String title;

    private Byte period;

    private Byte grade_1;

    private Byte grade_2;

    private Byte grade_3;

    private Byte grade_4;

    private Byte grade_5;

    private Byte grade_6;

    private Byte grade_7;

    private Byte grade_8;

    private Byte grade_9;

    private Byte grade_10;

    @Builder
    public DepositProduct(Long id, Nation nation, String title, Byte period, Byte grade_1, Byte grade_2, Byte grade_3, Byte grade_4, Byte grade_5, Byte grade_6, Byte grade_7, Byte grade_8, Byte grade_9, Byte grade_10) {
        this.id = id;
        this.nation = nation;
        this.title = title;
        this.period = period;
        this.grade_1 = grade_1;
        this.grade_2 = grade_2;
        this.grade_3 = grade_3;
        this.grade_4 = grade_4;
        this.grade_5 = grade_5;
        this.grade_6 = grade_6;
        this.grade_7 = grade_7;
        this.grade_8 = grade_8;
        this.grade_9 = grade_9;
        this.grade_10 = grade_10;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public void updateDepositProduct(DepositUpdatetDto dto){
        this.title = dto.getTitle();
        this.period = dto.getPeriod();
        this.grade_1 = dto.getInterest().get(0);
        this.grade_2 = dto.getInterest().get(1);
        this.grade_3 = dto.getInterest().get(2);
        this.grade_4 = dto.getInterest().get(3);
        this.grade_5 = dto.getInterest().get(4);
        this.grade_6 = dto.getInterest().get(5);
        this.grade_7 = dto.getInterest().get(6);
        this.grade_8 = dto.getInterest().get(7);
        this.grade_9 = dto.getInterest().get(8);
        this.grade_10 = dto.getInterest().get(9);
    }
}
