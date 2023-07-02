package com.ico.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

/**
 * @author 변윤경
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Issue {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    private Nation nation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    private double amount;

    private String content;

    private LocalDateTime date;

    @Builder
    public Issue(Long id, Nation nation, Stock stock, double amount, String content, LocalDateTime date) {
        this.id = id;
        this.nation = nation;
        this.stock = stock;
        this.amount = amount;
        this.content = content;
        this.date = date;
    }
}
