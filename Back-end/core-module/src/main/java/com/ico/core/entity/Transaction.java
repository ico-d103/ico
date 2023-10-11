package com.ico.core.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

/**
 * 거래 기록 내역 Document
 *
 * @author 변윤경
 */
@Entity(name = "transaction")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Transaction {
    @Id
    private Long id;

    @Column(name = "from_user")
    private String fromUser;

    @Column(name = "to_user")
    private String toUser;

    private int amount;

    private LocalDateTime date;

    private String title;

    @Builder
    public Transaction(Long id, String fromUser, String toUser, int amount, LocalDateTime date, String title) {
        this.id = id;
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.amount = amount;
        this.date = date;
        this.title = title;
    }
}
