package com.ico.core.entity;

import com.ico.core.code.PowerEnum;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * 직업 권한 관련
 *
 * @author 강교철
 */
@Entity
@Getter
@NoArgsConstructor
public class Power {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private PowerEnum name;

    @Builder
    public Power(PowerEnum name) {
        this.name = name;
    }
}
