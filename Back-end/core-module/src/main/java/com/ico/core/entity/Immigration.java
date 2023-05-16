package com.ico.core.entity;

import lombok.*;

import javax.persistence.*;

/**
 * @author 강교철
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Immigration {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToOne(fetch = FetchType.LAZY)
    private Nation nation;
    @OneToOne(fetch = FetchType.LAZY)
    private Student student;
}
