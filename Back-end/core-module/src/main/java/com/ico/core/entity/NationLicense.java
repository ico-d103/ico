package com.ico.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

/**
 * @author 강교철
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class NationLicense {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "nation_id")
    Nation nation;

    private String subject;

    private Byte rating;

    @Builder
    public NationLicense(Long id, Nation nation, String subject, Byte rating) {
        this.id = id;
        this.nation = nation;
        this.subject = subject;
        this.rating = rating;
    }
}
