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
public class DepositProductStudentResDto
{
    private int account;
    private List<DepositStudentResDto> myInfo;
    private List<DepositProductStudentColResDto> depositProduct;

    @Builder
    public DepositProductStudentResDto(int account, List<DepositStudentResDto> myInfo, List<DepositProductStudentColResDto> depositProduct) {
        this.account = account;
        this.myInfo = myInfo;
        this.depositProduct = depositProduct;
    }
}
