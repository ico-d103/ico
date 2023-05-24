package com.ico.core.document;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Column;
import java.time.LocalDateTime;

/**
 * 국고 사용 내역 Document
 *
 * @author 서재건
 */
@Document(collection = "treasury_history")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TreasuryHistory {

    @Id
    private String id;

    @Column(name = "nation_id")
    private Long nationId;

    private String title;

    private String source;

    private int amount;

    @Field
    @CreatedDate
    private LocalDateTime date;

    @Builder
    public TreasuryHistory(String id, Long nationId, String title, String source, int amount, LocalDateTime date) {
        this.id = id;
        this.nationId = nationId;
        this.title = title;
        this.source = source;
        this.amount = amount;
        this.date = date;
    }
}
