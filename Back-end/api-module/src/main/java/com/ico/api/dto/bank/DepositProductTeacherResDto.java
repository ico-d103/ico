package com.ico.api.dto.bank;

import com.ico.core.entity.DepositProduct;
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
public class DepositProductTeacherResDto {
    private Long id;

    private String title;

    private Byte period;

    private List<Byte> interest;

    private List<depositProductJoinedStudentResDto> students;

    @Builder
    public DepositProductTeacherResDto(Long id, String title, Byte period, List<Byte> interest, List<depositProductJoinedStudentResDto> students) {
        this.id = id;
        this.title = title;
        this.period = period;
        this.interest = interest;
        this.students = students;
    }


    public DepositProductTeacherResDto of(DepositProduct deposit){
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

        return DepositProductTeacherResDto.builder()
                .id(deposit.getId())
                .title(deposit.getTitle())
                .period(deposit.getPeriod())
                .interest(interest)
                .build();
    }
}
