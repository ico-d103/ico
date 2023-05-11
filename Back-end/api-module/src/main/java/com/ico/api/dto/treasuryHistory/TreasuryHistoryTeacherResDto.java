package com.ico.api.dto.treasuryHistory;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 교사용 국고 사용 내역 조회 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class TreasuryHistoryTeacherResDto {

    private int size;

    private List<TreasuryHistoryTeacherColDto> page;

    @Builder
    public TreasuryHistoryTeacherResDto(int size, List<TreasuryHistoryTeacherColDto> page) {
        this.size = size;
        this.page = page;
    }
}
