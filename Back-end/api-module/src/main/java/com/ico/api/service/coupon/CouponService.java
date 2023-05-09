package com.ico.api.service.coupon;

import com.ico.api.dto.coupon.CouponResDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 쿠폰 관련 Service
 *
 * @author 서재건
 */
public interface CouponService {

    List<CouponResDto> findAllCoupon(HttpServletRequest request);

    void postCoupon(Long couponId, HttpServletRequest request);
}
