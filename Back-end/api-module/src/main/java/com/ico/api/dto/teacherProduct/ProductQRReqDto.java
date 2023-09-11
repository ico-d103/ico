package com.ico.api.dto.teacherProduct;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * QR 상품 구매 request dto
 *
 * @author 변윤경
 * @author 서재건
 */
@Setter
@Getter
@NoArgsConstructor
public class ProductQRReqDto {

    @NotEmpty(message = "622")
    List<ProductQRColDto> products;

    @NotNull(message = "619")
    private Long unixTime;

    @Builder
    public ProductQRReqDto(List<ProductQRColDto> products, Long unixTime) {
        this.products = products;
        this.unixTime = unixTime;
    }
}
