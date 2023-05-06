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

/**
 * 학생들이 구매한 쿠폰 Entity
 *
 * @author 변윤경
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "teacher_product_id")
    private TeacherProduct teacherProduct;

    private String title;

    private byte count;

    private boolean isAssigned;

    @Builder
    public Coupon(Long id, Student student, TeacherProduct teacherProduct, String title, byte count, boolean isAssigned) {
        this.id = id;
        this.student = student;
        this.teacherProduct = teacherProduct;
        this.title = title;
        this.count = count;
        this.isAssigned = isAssigned;
    }
}
