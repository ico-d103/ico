package com.ico.api.dto.coupon;

import com.ico.core.document.CouponRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 쿠폰 신청 내역 조회 dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class CouponRequestResDto {

    private String id;

    private int number;

    private String name;

    private String title;

    private String date;

    @Builder
    public CouponRequestResDto(String id, int number, String name, String title, String date) {
        this.id = id;
        this.number = number;
        this.name = name;
        this.title = title;
        this.date = date;
    }

    /**
     * 쿠폰 신청 내역 조회 dto 생성
     *
     * @param couponRequest
     * @return
     */
    public CouponRequestResDto of(CouponRequest couponRequest, String date) {
        return CouponRequestResDto.builder()
                .id(couponRequest.getId())
                .number(couponRequest.getNumber())
                .name(couponRequest.getName())
                .title(couponRequest.getTitle())
                .date(date)
                .build();
    }
}
