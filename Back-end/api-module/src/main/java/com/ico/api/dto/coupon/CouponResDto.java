package com.ico.api.dto.coupon;

import com.ico.core.entity.Coupon;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 쿠폰 조회 관련 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class CouponResDto {

    private Long id;

    private String title;

    private int count;

    private boolean isAssigned;

    @Builder
    public CouponResDto(Long id, String title, int count, boolean isAssigned) {
        this.id = id;
        this.title = title;
        this.count = count;
        this.isAssigned = isAssigned;
    }

    /**
     * 쿠폰 목록 조회 dto
     *
     * @param coupon
     * @return
     */
    public CouponResDto of(Coupon coupon) {
        return CouponResDto.builder()
                .id(coupon.getId())
                .title(coupon.getTitle())
                .count(coupon.getCount())
                .isAssigned(coupon.isAssigned())
                .build();
    }
}
