package com.ico.api.dto.bank;

import com.ico.core.entity.SavingProduct;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

/**
 * 적금 상품 추가 Req Dto
 *
 * @author 변윤경
 */
@Setter
@Getter
@NoArgsConstructor
public class SavingProductReqDto {
    @NotBlank(message = "733")
    private String title;

    @NotNull(message = "734")
    private Byte count;

    @NotNull(message = "735")
    private int amount;

    @NotNull(message = "736")
    private List<Byte> interest;

    @Builder
    public SavingProductReqDto(String title, Byte count, int amount, List<Byte> interest) {
        this.title = title;
        this.count = count;
        this.amount = amount;
        this.interest = interest;
    }

    public SavingProductReqDto of (SavingProduct saving){
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

        return SavingProductReqDto.builder()
                .title(saving.getTitle())
                .count(saving.getCount())
                .amount(saving.getAmount())
                .interest(interest)
                .build();
    }
}
