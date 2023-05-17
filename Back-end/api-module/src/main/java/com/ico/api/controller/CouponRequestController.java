package com.ico.api.controller;


import com.ico.api.dto.coupon.CouponRequestResDto;
import com.ico.api.service.coupon.CouponRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


/**
 * 쿠폰 신청 내역 관련 controller
 *
 * @author 서재건
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coupon-request")
public class CouponRequestController {

    private final CouponRequestService couponRequestService;

    /**
     * 쿠폰 신청 내역 조회
     *
     * @return
     */
    @GetMapping("/teacher")
    public ResponseEntity<List<CouponRequestResDto>> findAllCouponRequest(HttpServletRequest request) {
        return ResponseEntity.ok(couponRequestService.findAllCouponRequest(request));
    }

    /**
     * 쿠폰 신청 승인
     *
     * @param couponRequestId
     * @return
     */
    @PostMapping("/teacher/{couponRequestId}")
    public ResponseEntity<HttpStatus> assignCouponRequest(@PathVariable String couponRequestId) {
        couponRequestService.assignCouponRequest(couponRequestId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 쿠폰 신청 반려
     *
     * @param couponRequestId
     * @return
     */
    @DeleteMapping("/teacher/{couponRequestId}")
    public ResponseEntity<HttpStatus> deleteCouponRequest(@PathVariable String couponRequestId) {
        couponRequestService.deleteCouponRequest(couponRequestId);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
