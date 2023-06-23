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
import java.util.List;

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

    private byte period;

    private byte grade_1;

    private byte grade_2;

    private byte grade_3;

    private byte grade_4;

    private byte grade_5;

    private byte grade_6;

    private byte grade_7;

    private byte grade_8;

    private byte grade_9;

    private byte grade_10;


    @Builder
    public DepositProduct(Long id, Nation nation, String title, byte period, byte grade_1, byte grade_2, byte grade_3, byte grade_4, byte grade_5, byte grade_6, byte grade_7, byte grade_8, byte grade_9, byte grade_10) {
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
        List<Byte> interests = dto.getInterest();

        this.title = dto.getTitle();
        this.period = dto.getPeriod();
        this.grade_1 = interests.get(0);
        this.grade_2 = interests.get(1);
        this.grade_3 = interests.get(2);
        this.grade_4 = interests.get(3);
        this.grade_5 = interests.get(4);
        this.grade_6 = interests.get(5);
        this.grade_7 = interests.get(6);
        this.grade_8 = interests.get(7);
        this.grade_9 = interests.get(8);
        this.grade_10 = interests.get(9);
    }
}
