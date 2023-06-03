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
 * @author 강교철
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class StudentLicense {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    Student student;

    @ManyToOne
    @JoinColumn(name = "nation_id")
    Nation nation;

    private String subject;

    private Byte rating;

    @Builder
    public StudentLicense(Long id, Student student, Nation nation, String subject, Byte rating) {
        this.id = id;
        this.student = student;
        this.nation = nation;
        this.subject = subject;
        this.rating = rating;
    }
}
