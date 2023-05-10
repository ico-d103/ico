package com.ico.api.dto.bank;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 내가 신청한 예금 정보
 *
 * @author 변윤경
 */
@Getter
@Setter
@NoArgsConstructor
public class DepositStudentResDto {

    private byte interest;

    private String startDate;

    private String endDate;

    private byte creditRating;

    @Builder
    public DepositStudentResDto(byte interest, String startDate, String endDate, byte creditRating) {
        this.interest = interest;
        this.startDate = startDate;
        this.endDate = endDate;
        this.creditRating = creditRating;
    }
}
