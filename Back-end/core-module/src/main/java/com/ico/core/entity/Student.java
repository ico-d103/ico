package com.ico.core.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private Nation nation;

    @OneToOne(fetch = FetchType.LAZY)
    private Job job;

    @Column(unique = true)
    private String identity;

    private String password;

    private String name;
    private int account;
    private boolean is_frozen;

    private byte credit_score;
    private byte number;
    private String role;
    private byte count;

}
