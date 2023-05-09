package com.ico.core.entity;

import lombok.AccessLevel;
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
 * @author 변윤경
 */
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TeacherProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    private Nation nation;

    private String title;

    private int amount;

    private String image;

    private String detail;

    private byte count;

    private Boolean rental;
    private byte sold;

    @Builder
    public TeacherProduct(Long id, Nation nation, String title, int amount, String image, String detail, byte count, Boolean rental, byte sold) {
        this.id = id;
        this.nation = nation;
        this.title = title;
        this.amount = amount;
        this.image = image;
        this.detail = detail;
        this.count = count;
        this.rental = rental;
        this.sold = sold;
    }
}
