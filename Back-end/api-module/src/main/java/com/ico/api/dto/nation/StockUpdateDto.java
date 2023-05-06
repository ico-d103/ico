package com.ico.api.dto.nation;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
public class StockUpdateDto {
    private String stock;

    private LocalTime tradingStart;

    private LocalTime tradingEnd;

    private int amount;

    private String content;
}
