package com.ico.api.dto.bank;

import com.ico.core.entity.SavingProduct;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * 교사의 적금 상품조회 Res
 *
 * @author 변윤경
 */
@Setter
@Getter
@NoArgsConstructor
public class SavingProductTeacherResDto {
    private Long id;

    private String title;

    private Byte count;

    private int amount;

    private List<Byte> interest;

    private List<savingProductJoinedStudentResDto> students;

    @Builder
    public SavingProductTeacherResDto(Long id, String title, Byte count, int amount, List<Byte> interest, List<savingProductJoinedStudentResDto> students) {
        this.id = id;
        this.title = title;
        this.count = count;
        this.amount = amount;
        this.interest = interest;
        this.students = students;
    }

    public SavingProductTeacherResDto of(SavingProduct saving){
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

        return SavingProductTeacherResDto.builder()
                .id(saving.getId())
                .title(saving.getTitle())
                .count(saving.getCount())
                .amount(saving.getAmount())
                .interest(interest)
                .build();
    }
}
