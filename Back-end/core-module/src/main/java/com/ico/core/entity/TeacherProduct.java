package com.ico.core.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @author 변윤경
 */
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TeacherProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    private Nation nation;

    @NotBlank(message = "605")
    private String title;

    @NotNull(message = "606")
    @Min(value = 1, message = "607")
    private int amount;

    @NotNull(message = "608")
    private String image;

    @NotBlank(message = "609")
    private String detail;

    @NotNull(message = "610")
    @Min(value = 1, message = "611")
    private byte count;

    @NotNull(message = "612")
    private String type;

    private byte sold;

    @Builder
    public TeacherProduct(Long id, Nation nation, String title, int amount, String image, String detail, byte count, String type, byte sold) {
        this.id = id;
        this.nation = nation;
        this.title = title;
        this.amount = amount;
        this.image = image;
        this.detail = detail;
        this.count = count;
        this.type = type;
        this.sold = sold;
    }
}
