package com.ico.core.document;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Column;
import java.time.LocalDateTime;

/**
 * 분기별 거래 현황 기록
 *
 * @author 서재건
 */
@Document
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Inflation {

    @Id
    private String id;

    @Column(name = "nation_id")
    private Long nationId;

    @CreatedDate
    private LocalDateTime date;

    private long totalAccount;

    private long totalAmount;

    @Builder
    public Inflation(String id, Long nationId, LocalDateTime date, long totalAccount, long totalAmount) {
        this.id = id;
        this.nationId = nationId;
        this.date = date;
        this.totalAccount = totalAccount;
        this.totalAmount = totalAmount;
    }
}
