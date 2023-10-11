package com.ico.api.dto.inflation;

import com.ico.core.entity.Inflation;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 인플레이션 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class InflationResDto {

    private String date;

    private long totalAccount;

    private long totalAmount;

    @Builder
    public InflationResDto(String date, long totalAccount, long totalAmount) {
        this.date = date;
        this.totalAccount = totalAccount;
        this.totalAmount = totalAmount;
    }

    /**
     * 인플레이션 res dto 변환
     *
     * @param inflation
     * @param date
     * @return
     */
    public InflationResDto of(Inflation inflation, String date) {
        return InflationResDto.builder()
                .date(date)
                .totalAccount(inflation.getTotalAccount())
                .totalAmount(inflation.getTotalAmount())
                .build();
    }
}
