package com.ico.api.service.coupon;

import com.ico.api.dto.coupon.CouponRequestResDto;
import com.ico.core.entity.Coupon;
import com.ico.core.entity.CouponRequest;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.CouponRepository;
import com.ico.core.repository.CouponRequestMongoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * 쿠폰 신청 내역 관련 Service 로직
 *
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CouponRequestServiceImpl implements CouponRequestService{

    private final CouponRequestMongoRepository couponRequestMongoRepository;

    private final CouponRepository couponRepository;

    @Override
    public List<CouponRequestResDto> findAllCouponRequest() {
        // TODO: 로그인 통한 토큰 정보 받아고기
        Long nationId = 99L;

        List<CouponRequest> couponRequestList = couponRequestMongoRepository.findAllByNationId(nationId);
        List<CouponRequestResDto> dtoList = new ArrayList<>();

        for (CouponRequest couponRequest : couponRequestList) {
            dtoList.add(new CouponRequestResDto().of(couponRequest));
        }

        return dtoList;
    }

    @Transactional
    @Override
    public void assignCouponRequest(String couponRequestId) {
        CouponRequest couponRequest = couponRequestMongoRepository.findById(couponRequestId)
                .orElseThrow(() -> new CustomException(ErrorCode.REQUEST_NOT_FOUND));

        Long couponId = couponRequest.getCouponId();

        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new CustomException(ErrorCode.COUPON_NOT_FOUND));

        // 쿠폰 신청을 하지 않은 경우
        if (!coupon.isAssigned()) {
            log.info("[assignCouponRequest] 학생 쿠폰 신청 여부가 false인 경우");
            throw new CustomException(ErrorCode.INVALID_COUPON);
        }
        coupon.setAssigned(false);

        // 학생 쿠폰 재고가 0인 경우
        if (coupon.getCount() == 0) {
            log.info("[assignCouponRequest] 학생 쿠폰 재고가 0인 경우");
            throw new CustomException(ErrorCode.ZERO_COUPON);
        }
        // 학생 쿠폰 재고가 0이 되는 경우
        else if (coupon.getCount() == 1) {
            couponRepository.delete(coupon);
        }
        // 학생 쿠폰 재고가 1 이상인 경우
        else {
            coupon.setCount((byte) (coupon.getCount() - 1));
            couponRepository.save(coupon);
        }

        couponRequestMongoRepository.delete(couponRequest);

    }

    @Override
    public void deleteCouponRequest(String couponRequestId) {
        CouponRequest couponRequest = couponRequestMongoRepository.findById(couponRequestId)
                .orElseThrow(() -> new CustomException(ErrorCode.REQUEST_NOT_FOUND));

        couponRequestMongoRepository.delete(couponRequest);
    }
}
