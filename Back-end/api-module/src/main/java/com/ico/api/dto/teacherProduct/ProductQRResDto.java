package com.ico.api.dto.teacherProduct;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * QR 상품 구매시 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class ProductQRResDto {

    private String title;

    private String seller;

    private int price;

    private LocalDateTime date;

    @Builder
    public ProductQRResDto(String title, String seller, int price, LocalDateTime date) {
        this.title = title;
        this.seller = seller;
        this.price = price;
        this.date = date;
    }
}
