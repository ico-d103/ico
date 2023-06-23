package com.ico.api.dto.stock;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * 투자 이슈 등록
 * @author 변윤경
 */
@Getter
@NoArgsConstructor
public class IssueUploadReqDto {
    @NotNull(message = "711")
    private Integer amount;

    @NotBlank(message = "713")
    private String content;

    @NotNull(message =  "714")
    private Double price;

    @Builder
    public IssueUploadReqDto(Integer amount, String content, Double price) {
        this.amount = amount;
        this.content = content;
        this.price = price;
    }
}
