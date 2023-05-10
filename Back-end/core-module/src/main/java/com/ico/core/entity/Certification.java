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
@AllArgsConstructor
@NoArgsConstructor
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(fetch = FetchType.EAGER)
    private Teacher teacher;
    private String image;
}
