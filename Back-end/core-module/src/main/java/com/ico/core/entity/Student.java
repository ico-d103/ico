package com.ico.core.entity;

import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(fetch = FetchType.LAZY)
    private Nation nation;
    @OneToOne(fetch = FetchType.LAZY)
    private Job job;
    @Column(nullable = false, unique = true)
    private String identity;
    @Column(nullable = false)
    private String password;
    private String name;
    private int account;
    private boolean is_frozen;
    private byte credit_score;
    private byte number;
    @Enumerated(EnumType.STRING)
    private Role role;
    private byte count;

    public void encodeStudentPassword(PasswordEncoder passwordEncoder){
        this.password = passwordEncoder.encode(password);
    }

}
