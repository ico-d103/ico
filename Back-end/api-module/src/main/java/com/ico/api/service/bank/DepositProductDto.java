package com.ico.api.service.bank;

import com.ico.core.entity.DepositProduct;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class DepositProductDto {
    private String title;

    private Byte period;

    private List<Byte> interest;

    @Builder
    public DepositProductDto(String title, Byte period, List<Byte> interest) {
        this.title = title;
        this.period = period;
        this.interest = interest;
    }

    public DepositProductDto of(DepositProduct deposit){
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

        return DepositProductDto.builder()
                .title(deposit.getTitle())
                .period(deposit.getPeriod())
                .interest(interest)
                .build();
    }
}
