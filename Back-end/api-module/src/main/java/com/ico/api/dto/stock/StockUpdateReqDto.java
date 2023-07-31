package com.ico.api.dto.stock;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * 투자 종목 수정 Req Dto
 *
 * @author 변윤경
 */
@Getter
@NoArgsConstructor
public class StockUpdateReqDto {
    @NotBlank(message = "708")
    private String title;

    @NotBlank(message = "727")
    private String content;

    @Builder
    public StockUpdateReqDto(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
