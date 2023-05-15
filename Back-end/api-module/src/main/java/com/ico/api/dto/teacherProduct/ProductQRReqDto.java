package com.ico.api.dto.teacherProduct;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

/**
 * QR 상품 구매 dto
 *
 * @author 변윤경
 */
@Setter
@Getter
@NoArgsConstructor
public class ProductQRReqDto {
    @NotNull(message = "618")
    private Long id;

    @NotNull(message = "619")
    private Long unixTime;

    @Builder
    public ProductQRReqDto(Long id, Long unixTime) {
        this.id = id;
        this.unixTime = unixTime;
    }
}
