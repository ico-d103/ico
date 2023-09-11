package com.ico.api.dto.teacherProduct;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * QR 상품 구매 후 구매 내역 반환 res에서 사용하는 column dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class BuyTransactionColDto {

    private String title;

    private int price;

    private int count;

    private String image;

    @Builder
    public BuyTransactionColDto(String title, int price, int count, String image) {
        this.title = title;
        this.price = price;
        this.count = count;
        this.image = image;
    }
}
