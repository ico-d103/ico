package com.ico.api.dto.bank;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 학생 예금 신청 페이지 관련 res dto
 *
 * @author 변윤경
 */
@Getter
@Setter
@NoArgsConstructor
public class MyInterestResDto {

    private Byte creditRating;

    private Byte shortPeriod;

    private Byte longPeriod;

    private Integer account;

    @Builder
    public MyInterestResDto(Byte creditRating, Byte shortPeriod, Byte longPeriod, Integer account) {
        this.creditRating = creditRating;
        this.shortPeriod = shortPeriod;
        this.longPeriod = longPeriod;
        this.account = account;
    }
}
