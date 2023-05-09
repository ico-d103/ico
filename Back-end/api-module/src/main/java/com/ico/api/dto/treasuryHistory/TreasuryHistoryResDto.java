package com.ico.api.dto.treasuryHistory;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 국고 사용 내역 조회 학생용 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class TreasuryHistoryResDto {

    private String date;

    private List<TreasuryHistoryDto> contents;


}
