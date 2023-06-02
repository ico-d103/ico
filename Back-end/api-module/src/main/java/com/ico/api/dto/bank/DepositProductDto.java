package com.ico.api.dto.bank;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class DepositProductDto {
    private String title;

    private Byte period;

    private List<Byte> interest;

    @Builder
    public DepositProductDto(String title, Byte period, List<Byte> interest) {
        this.title = title;
        this.period = period;
        this.interest = interest;
    }
}
