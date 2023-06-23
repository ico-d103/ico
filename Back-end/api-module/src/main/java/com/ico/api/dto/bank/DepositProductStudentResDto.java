package com.ico.api.dto.bank;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

/**
 * 학생의 예금 상품 조회 Res
 *
 * @author 변윤경
 */
@Setter
@Getter
@NoArgsConstructor
public class DepositProductStudentResDto {
    List<DepositStudentResDto> myDeposit;
    List<DepositProductStudentColResDto> depositProduct;

    @Builder
    public DepositProductStudentResDto(List<DepositStudentResDto> myDeposit, List<DepositProductStudentColResDto> depositProduct) {
        this.myDeposit = myDeposit;
        this.depositProduct = depositProduct;
    }
}
