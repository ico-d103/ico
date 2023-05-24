package com.ico.core.document;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * 거래 기록 내역 Document
 *
 * @author 변윤경
 */
@Document(collection = "transaction")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Transaction {
    @Id
    private String id;

    private String from;

    private String to;

    private int amount;

    private LocalDateTime date;

    private String title;

    @Builder
    public Transaction(String id, String from, String to, int amount, LocalDateTime date, String title) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.date = date;
        this.title = title;
    }
}
