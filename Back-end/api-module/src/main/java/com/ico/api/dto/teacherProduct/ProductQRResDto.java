package com.ico.api.dto.teacherProduct;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    private boolean type;

    private String date;

    @Builder
    public ProductQRResDto(String title, String seller, boolean type, String date) {
        this.title = title;
        this.seller = seller;
        this.type = type;
        this.date = date;
    }
}
