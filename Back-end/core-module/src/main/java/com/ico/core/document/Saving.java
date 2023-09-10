package com.ico.core.document;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.DayOfWeek;
import java.time.LocalDateTime;

/**
 * 적금 신청 내역 Document
 *
 * @author 변윤경
 */
@Document(collection = "saving")
@Getter
@NoArgsConstructor
public class Saving {
    @Id
    private String id;

    private Long studentId;

    // 이자율
    private byte interest;

    // 적금 신청일
    @CreatedDate
    private LocalDateTime startDate;

    // 만기 조건 횟수
    private byte totalCount;

    // 현재 납입횟수
    private byte count;

    // 상품 신청당시 신용점수
    private byte creditRating;

    // 납입 금액
    private int amount;

    // 납입 요일
    private DayOfWeek day;

    // 적금 상품 이름
    private String title;

    // 적금 상품 id
    private Long savingProductId;

    // 학생 번호
    private byte number;

    // 학생이름
    private String name;

    @Builder
    public Saving(String id, Long studentId, byte interest, LocalDateTime startDate, byte totalCount, byte count, byte creditRating, int amount, DayOfWeek day, String title, Long savingProductId, byte number, String name) {
        this.id = id;
        this.studentId = studentId;
        this.interest = interest;
        this.startDate = startDate;
        this.totalCount = totalCount;
        this.count = count;
        this.creditRating = creditRating;
        this.amount = amount;
        this.day = day;
        this.title = title;
        this.savingProductId = savingProductId;
        this.number = number;
        this.name = name;
    }
}
