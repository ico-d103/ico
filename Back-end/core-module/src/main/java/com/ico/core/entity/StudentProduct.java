package com.ico.core.entity;

import lombok.*;
import javax.persistence.*;

/**
 * 학생 상품 Entity
 * @author 변윤경
 */

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    private String image;
    private String detail;
    private byte count;
    private boolean is_assigned;
}
