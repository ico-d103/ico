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
 * 이자율 정보 Entity
 *
 * @author 변윤경
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Interest {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "nation_id")
    Nation nation;

    private Byte creditRating;

    private Byte shortPeriod;

    private Byte longPeriod;

    @Builder
    public Interest(Long id, Nation nation, Byte creditRating, Byte shortPeriod, Byte longPeriod) {
        this.id = id;
        this.nation = nation;
        this.creditRating = creditRating;
        this.shortPeriod = shortPeriod;
        this.longPeriod = longPeriod;
    }
}
