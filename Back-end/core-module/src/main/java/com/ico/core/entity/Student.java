package com.ico.core.entity;

import com.ico.core.code.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;


/**
 * 학생 정보 Entity
 *
 * @author 강교철
 * @author 서재건
 * @author 변윤경
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    private Nation nation;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_job_id")
    private StudentJob studentJob;

    @Column(nullable = false, unique = true)
    private String identity;

    private String name;

    private byte number;

    private int account;

    private boolean isFrozen;

    @ColumnDefault("700")
    private short creditScore;

    @ColumnDefault("6")
    private byte creditRating;

    private int salary;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(nullable = false)
    private String password;

    public void encodeStudentPassword(PasswordEncoder passwordEncoder){
        this.password = passwordEncoder.encode(password);
    }

}
