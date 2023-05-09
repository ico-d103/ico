package com.ico.api.dto.treasuryHistory;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * 국고 사용 내역 입력 req dto
 * 국고 사용 내역 조회 contents column dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class TreasuryHistoryDto {

    @NotBlank(message = "501")
    private String title;

    @NotNull(message = "502")
    private Integer amount;

    @Builder
    public TreasuryHistoryDto(String title, Integer amount) {
        this.title = title;
        this.amount = amount;
    }
}
