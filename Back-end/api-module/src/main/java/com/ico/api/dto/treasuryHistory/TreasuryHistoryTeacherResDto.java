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

    private String source;

    private String amount;

    @Builder
    public TreasuryHistoryTeacherResDto(String date, String title, String source, String amount) {
        this.date = date;
        this.title = title;
        this.source = source;
        this.amount = amount;
    }

    /**
     * 국고 사용 내역 교사용 dto 반환
     *
     * @param treasuryHistory
     * @param date
     * @return
     */
    public TreasuryHistoryTeacherResDto of(TreasuryHistory treasuryHistory, String date, String amount) {
        return TreasuryHistoryTeacherResDto.builder()
                .date(date)
                .title(treasuryHistory.getTitle())
                .source(treasuryHistory.getSource())
                .amount(amount)
                .build();
    }
}
