package com.ico.core.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

/**
 * 상점 거래액 내역
 *
 * @author 서재건
 */
@Entity(name = "shop_transaction")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ShopTransaction {

    @Id
    private Long id;

    @Column(name = "nation_id")
    private Long nationId;

    @CreatedDate
    private LocalDateTime date;

    @ColumnDefault("0")
    private int amount;

    @Builder
    public ShopTransaction(Long id, Long nationId, LocalDateTime date, int amount) {
        this.id = id;
        this.nationId = nationId;
        this.date = date;
        this.amount = amount;
    }
}
