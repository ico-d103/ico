package com.ico.api.dto.bank;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 장기, 단기 이자율 res dto
 *
 * @author 변윤경
 */
@Setter
@Getter
@NoArgsConstructor
public class InterestAllDto {
    private List<Byte> shortPeriod;
    private List<Byte> longPeriod;

    @Builder
    public InterestAllDto(List<Byte> shortPeriod, List<Byte> longPeriod) {
        this.shortPeriod = shortPeriod;
        this.longPeriod = longPeriod;
    }
}
