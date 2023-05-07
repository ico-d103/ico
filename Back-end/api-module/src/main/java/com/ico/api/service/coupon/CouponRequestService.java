package com.ico.api.service.coupon;

import com.ico.api.dto.coupon.CouponRequestResDto;

import java.util.List;

/**
 * 쿠폰 신청 내역 관련 Service
 *
 * @author 서재건
 */
public interface CouponRequestService {

    /**
     * 쿠폰 신청 내역 조회
     *
     * @return
     */
    List<CouponRequestResDto> findAllCouponRequest();

    /**
     * 쿠폰 신청 승인
     *
     * @param couponRequestId
     */
    void assignCouponRequest(String couponRequestId);
}
