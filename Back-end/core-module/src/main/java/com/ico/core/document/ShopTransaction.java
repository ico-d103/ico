package com.ico.core.document;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Column;
import java.time.LocalDateTime;

/**
 * 상점 거래액 내역
 *
 * @author 서재건
 */
@Document(collection = "shop_transaction")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ShopTransaction {

    @Id
    private String id;

    @Column(name = "nation_id")
    private Long nationId;

    @CreatedDate
    private LocalDateTime date;

    @ColumnDefault("0")
    private int amount;

    @Builder
    public ShopTransaction(String id, Long nationId, LocalDateTime date, int amount) {
        this.id = id;
        this.nationId = nationId;
        this.date = date;
        this.amount = amount;
    }
}
