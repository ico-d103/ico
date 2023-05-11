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

    private long size;

    private List<TreasuryHistoryTeacherColDto> page;

    @Builder
    public TreasuryHistoryTeacherResDto(long size, List<TreasuryHistoryTeacherColDto> page) {
        this.size = size;
        this.page = page;
    }
}
