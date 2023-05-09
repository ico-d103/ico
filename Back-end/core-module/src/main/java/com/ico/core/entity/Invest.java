package com.ico.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

/**
 * 투자 내역 조회
 *
 * @author 변윤경
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Invest {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    private int price;

    private int amount;

    @CreatedDate
    private LocalDateTime date;

    @Builder
    public Invest(Long id, Student student, int price, int amount, LocalDateTime date) {
        this.id = id;
        this.student = student;
        this.price = price;
        this.amount = amount;
        this.date = date;
    }
}
