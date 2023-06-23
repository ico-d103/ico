package com.ico.api.dto.bank;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 예금 상품별 나의 이자율 Res
 *
 * @author 변윤경
 */
@Setter
@Getter
@NoArgsConstructor
public class DepositProductStudentColResDto {
    private Long id;

    private String title;

    private byte period;

    private byte interest;

    @Builder
    public DepositProductStudentColResDto(Long id, String title, byte period, byte interest) {
        this.id = id;
        this.title = title;
        this.period = period;
        this.interest = interest;
    }
}
