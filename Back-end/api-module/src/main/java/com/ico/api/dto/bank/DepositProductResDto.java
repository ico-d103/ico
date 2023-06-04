package com.ico.api.dto.bank;

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
public class DepositProductResDto {
    private Long id;

    private String title;

    private Byte period;

    private List<Byte> interest;

    @Builder
    public DepositProductResDto(Long id, String title, Byte period, List<Byte> interest) {
        this.id = id;
        this.title = title;
        this.period = period;
        this.interest = interest;
    }


    public DepositProductResDto of(DepositProduct deposit){
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

        return DepositProductResDto.builder()
                .id(deposit.getId())
                .title(deposit.getTitle())
                .period(deposit.getPeriod())
                .interest(interest)
                .build();
    }
}
