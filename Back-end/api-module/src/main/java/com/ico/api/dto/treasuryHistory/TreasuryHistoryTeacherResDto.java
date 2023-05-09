package com.ico.api.dto.treasuryHistory;

import com.ico.core.entity.TreasuryHistory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 국고 사용 내역 조회 교사용 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class TreasuryHistoryTeacherResDto {

    private String date;

    private String title;

    private int amount;

    @Builder
    public TreasuryHistoryTeacherResDto(String date, String title, int amount) {
        this.date = date;
        this.title = title;
        this.amount = amount;
    }

    public TreasuryHistoryTeacherResDto of(TreasuryHistory treasuryHistory, String date) {
        return TreasuryHistoryTeacherResDto.builder()
                .date(date)
                .build();
    }
}
