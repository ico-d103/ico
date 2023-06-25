package com.ico.api.dto.bank;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 학생의 예금 상품 디테일 Res Dto
 *
 * @author 변윤경
 */

@Setter
@Getter
@NoArgsConstructor
public class DepositProductDetailResDto {

    private String title;

    private byte period;

    private byte interest;

    @Builder
    public DepositProductDetailResDto(String title, byte period, byte interest) {
        this.title = title;
        this.period = period;
        this.interest = interest;
    }
}
