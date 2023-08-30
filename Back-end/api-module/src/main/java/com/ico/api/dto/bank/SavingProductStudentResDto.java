package com.ico.api.dto.bank;

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
    private int account;
    private List<SavingStudentResDto> mySaving;
    private List<SavingProductStudentColResDto> savingProduct;
}
