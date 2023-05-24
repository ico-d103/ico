package com.ico.core.document;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


/**
 * 예금 신청 내역 Document
 *
 * @author 변윤경
 */
@Document(collection = "deposit")
@Getter
@NoArgsConstructor
public class Deposit {
    @Id
    private String id;

    private Long studentId;

    private byte interest;

    @CreatedDate
    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private byte creditRating;

    private int amount;

    @Builder
    public Deposit(String id, Long studentId, byte interest, LocalDateTime startDate, LocalDateTime endDate, byte creditRating, int amount) {
        this.id = id;
        this.studentId = studentId;
        this.interest = interest;
        this.startDate = startDate;
        this.endDate = endDate;
        this.creditRating = creditRating;
        this.amount = amount;
    }
}
