package com.ico.core.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

/**
 * 분기별 거래 현황 기록
 *
 * @author 서재건
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Inflation {

    @Id
    private Long id;

    @Column(name = "nation_id")
    private Long nationId;

    @CreatedDate
    private LocalDateTime date;

    private long totalAccount;

    private long totalAmount;

    @Builder
    public Inflation(Long id, Long nationId, LocalDateTime date, long totalAccount, long totalAmount) {
        this.id = id;
        this.nationId = nationId;
        this.date = date;
        this.totalAccount = totalAccount;
        this.totalAmount = totalAmount;
    }
}
