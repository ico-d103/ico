package com.ico.api.dto.bank;

import com.ico.core.entity.DepositProduct;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

/**
 * 예금 상품 추가 Req Dto
 *
 * @author 변윤경
 */
@Setter
@Getter
@NoArgsConstructor
public class DepositProductReqDto {

    @NotBlank(message = "725")
    private String title;

    @NotNull(message = "726")
    private Byte period;

    private List<Byte> interest;

    @Builder
    public DepositProductReqDto(String title, Byte period, List<Byte> interest) {
        this.title = title;
        this.period = period;
        this.interest = interest;
    }

    public DepositProductReqDto of(DepositProduct deposit){
        List<Byte> interest = new ArrayList<>();
        interest.add(deposit.getGrade_1());
        interest.add(deposit.getGrade_2());
        interest.add(deposit.getGrade_3());
        interest.add(deposit.getGrade_4());
        interest.add(deposit.getGrade_5());
        interest.add(deposit.getGrade_6());
        interest.add(deposit.getGrade_7());
        interest.add(deposit.getGrade_8());
        interest.add(deposit.getGrade_9());
        interest.add(deposit.getGrade_10());

        return DepositProductReqDto.builder()
                .title(deposit.getTitle())
                .period(deposit.getPeriod())
                .interest(interest)
                .build();
    }
}