package com.ico.core.dto;

import com.ico.core.entity.SavingProduct;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * 적금 상품 수정 dto
 *
 * @author 변윤경
 */
@Setter
@Getter
@NoArgsConstructor
public class SavingUpdateDto {
    private String title;

    private Byte count;

    private int amount;

    private List<Byte> interest;

    @Builder
    public SavingUpdateDto(String title, Byte count, int amount, List<Byte> interest) {
        this.title = title;
        this.count = count;
        this.amount = amount;
        this.interest = interest;
    }

    public SavingUpdateDto of(SavingProduct saving){
        List<Byte> interest = new ArrayList<>();
        interest.add(saving.getGrade_1());
        interest.add(saving.getGrade_2());
        interest.add(saving.getGrade_3());
        interest.add(saving.getGrade_4());
        interest.add(saving.getGrade_5());
        interest.add(saving.getGrade_6());
        interest.add(saving.getGrade_7());
        interest.add(saving.getGrade_8());
        interest.add(saving.getGrade_9());
        interest.add(saving.getGrade_10());

        return SavingUpdateDto.builder()
                .title(saving.getTitle())
                .count(saving.getCount())
                .amount(saving.getAmount())
                .interest(interest)
                .build();
    }
}
