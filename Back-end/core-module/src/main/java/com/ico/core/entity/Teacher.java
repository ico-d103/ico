package com.ico.core.entity;

import com.ico.core.code.Role;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(fetch = FetchType.LAZY)
    private Nation nation;
    @Column(nullable = false, unique = true)
    private String identity;
    @Column(nullable = false)
    private String password;
    private String name;
    private boolean is_assigned;
    @Enumerated(EnumType.STRING)
    private Role role;

    public void encodeTeacherPassword(PasswordEncoder passwordEncoder){
        this.password = passwordEncoder.encode(password);
    }
}
