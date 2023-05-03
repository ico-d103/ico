package com.ico.core.entity;

import com.ico.core.code.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;


/**
 * @author 강교철
 */
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
