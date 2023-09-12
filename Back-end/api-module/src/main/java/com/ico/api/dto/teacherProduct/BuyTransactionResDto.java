package com.ico.api.dto.teacherProduct;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * QR 상품 구매 후 구매 내역 조회 시 반환하는 res
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class BuyTransactionResDto {

    String seller;

    LocalDateTime date;

    List<BuyTransactionColDto> products;

    @Builder
    public BuyTransactionResDto(String seller, LocalDateTime date, List<BuyTransactionColDto> products) {
        this.seller = seller;
        this.date = date;
        this.products = products;
    }
}
