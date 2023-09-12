package com.ico.api.dto.teacherProduct;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 장바구니 상품 구매 column dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductQRColDto {
    @NotNull(message = "619")
    private Long id;
    @NotNull(message = "621")
    private Integer count;
}
