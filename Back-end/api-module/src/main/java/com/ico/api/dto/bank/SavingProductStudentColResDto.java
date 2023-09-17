package com.ico.api.dto.bank;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 적금 상품별 나의 이자율 Res
 *
 * @author 변윤경
 */
@Setter
@Getter
@NoArgsConstructor
public class SavingProductStudentColResDto {
    private Long id;

    private String title;

    private Byte count;

    private int amount;

    private byte interest;

    @Builder
    public SavingProductStudentColResDto(Long id, String title, Byte count, int amount, byte interest) {
        this.id = id;
        this.title = title;
        this.count = count;
        this.amount = amount;
        this.interest = interest;
    }
}
