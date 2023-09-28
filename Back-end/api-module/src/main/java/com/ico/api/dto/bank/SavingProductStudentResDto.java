package com.ico.api.dto.bank;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 학생의 적금 상품 조회 Res
 *
 * @author 변윤경
 */
@Setter
@Getter
@NoArgsConstructor
public class SavingProductStudentResDto {
    private String type;
    private int account;
    private List<SavingStudentResDto> myInfo;
    private List<SavingProductStudentColResDto> product;

    @Builder
    public SavingProductStudentResDto(int account, List<SavingStudentResDto> myInfo, List<SavingProductStudentColResDto> product) {
        this.type = "saving";
        this.account = account;
        this.myInfo = myInfo;
        this.product = product;
    }
}
