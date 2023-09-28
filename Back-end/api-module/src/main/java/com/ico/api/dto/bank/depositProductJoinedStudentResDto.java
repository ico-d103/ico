package com.ico.api.dto.bank;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 교사의 예금 상품 별 학생 목록 조회 Res
 *
 * @author 변윤경
 */
@Setter
@Getter
@NoArgsConstructor
public class depositProductJoinedStudentResDto {
    private int number;

    private String name;

    private int amount;

    private String startDate;

    private String endDate;

    @Builder
    public depositProductJoinedStudentResDto(int number, String name, int amount, String startDate, String endDate) {
        this.number = number;
        this.name = name;
        this.amount = amount;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
