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
    @OneToOne
    private Nation nation;
    @OneToOne
    private Student student;
}
