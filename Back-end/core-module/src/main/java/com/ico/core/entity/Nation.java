package com.ico.core.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Nation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String school;
    private byte grade;
    private byte room;
    @Column(unique = true)
    private String title;
    @Column(unique = true)
    private String code;
    /**
     * 화폐 이름
     */
    private String currency;
    /**
     * 국고
     */
    @ColumnDefault("0")
    private int treasury;
    private String stock;
    private LocalTime trading_start;
    private LocalTime trading_end;
    @ColumnDefault("20")
    private byte credit_up;
    @ColumnDefault("50")
    private byte credit_down;
}
