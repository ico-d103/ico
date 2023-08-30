package com.ico.api.dto.bank;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 내가 신청한 적금 정보
 *
 * @author 변윤경
 */
@Setter
@Getter
@NoArgsConstructor
public class SavingStudentResDto {
    private String id;

    private String title;

    private byte interest;

    private String startDate;

    private String endDate;

    private byte creditRating;

    private int amount;

    private byte count;

    private boolean end;

    @Builder
    public SavingStudentResDto(String id, String title, byte interest, String startDate, String endDate, byte creditRating, int amount, byte count, boolean end) {
        this.id = id;
        this.title = title;
        this.interest = interest;
        this.startDate = startDate;
        this.endDate = endDate;
        this.creditRating = creditRating;
        this.amount = amount;
        this.count = count;
        this.end = end;
    }
}
