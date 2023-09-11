package com.ico.api.dto.teacherProduct;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * QR 상품 구매 후 구매 내역 조회에서 사용하기 위해 Redis value로 저장되는 dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class QRColDto {

    String buyTime;

    List<ProductQRColDto> products;

    @Builder
    public QRColDto(String buyTime, List<ProductQRColDto> products) {
        this.buyTime = buyTime;
        this.products = products;
    }
}
