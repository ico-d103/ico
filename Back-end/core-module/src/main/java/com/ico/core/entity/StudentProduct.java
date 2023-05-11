package com.ico.core.entity;


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
import java.time.LocalDateTime;

/**
 * 학생 상품 Entity
 *
 * @author 변윤경
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class StudentProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    private Nation nation;

    private String title;

    private int amount;

    private String images;

    private String detail;

    private byte count;

    private boolean isAssigned;

    private byte sold;

    private LocalDateTime date;

    @Builder
    public StudentProduct(Long id, Student student, Nation nation, String title, int amount, String images, String detail, byte count, boolean isAssigned, byte sold, LocalDateTime date) {
        this.id = id;
        this.student = student;
        this.nation = nation;
        this.title = title;
        this.amount = amount;
        this.images = images;
        this.detail = detail;
        this.count = count;
        this.isAssigned = isAssigned;
        this.sold = sold;
        this.date = date;
    }
}
