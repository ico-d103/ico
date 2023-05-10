package com.ico.api.controller;


import com.ico.api.dto.coupon.CouponResDto;
import com.ico.api.service.coupon.CouponService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 쿠폰 관련 Controller
 *
 * @author 서재건
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coupon")
public class CouponController {

    private final CouponService couponService;

    /**
     * 학생의 쿠폰 목록 조회
     *
     * @param request
     * @return
     */
    @GetMapping("/student")
    public ResponseEntity<List<CouponResDto>> findAllCoupon(HttpServletRequest request) {
        return ResponseEntity.ok(couponService.findAllCoupon(request));
    }

    /**
     * 쿠폰 사용 신청
     *
     * @param couponId
     * @return
     */
    @PostMapping("/student/{couponId}")
    public ResponseEntity<HttpStatus> postCoupon(@PathVariable Long couponId, HttpServletRequest request) {
        couponService.postCoupon(couponId, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
