package com.ico.api.dto.stock;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 투자 종목 종류의 Col dto
 *
 * @author 변윤경
 */
@Getter
@Setter
@NoArgsConstructor
public class StockListColDto {
    private Long id;

    private String title;

    @Builder
    public StockListColDto(Long id, String title) {
        this.id = id;
        this.title = title;
    }
}
