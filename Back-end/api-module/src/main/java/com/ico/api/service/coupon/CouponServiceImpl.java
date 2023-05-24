package com.ico.api.service.coupon;

import com.ico.api.dto.coupon.CouponResDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.entity.Coupon;
import com.ico.core.document.CouponRequest;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.CouponRepository;
import com.ico.core.repository.CouponRequestMongoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * 쿠폰 관련 Service 로직
 *
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final JwtTokenProvider jwtTokenProvider;

    private final CouponRepository couponRepository;

    private final CouponRequestMongoRepository couponRequestMongoRepository;

    @Override
    public List<CouponResDto> findAllCoupon(HttpServletRequest request) {
        Long studentId = jwtTokenProvider.getId(jwtTokenProvider.parseJwt(request));
        log.info("[findAllCoupon] studentId : {}", studentId);

        List<Coupon> couponList = couponRepository.findAllByStudentId(studentId);
        List<CouponResDto> dtoList = new ArrayList<>();
        for (Coupon coupon : couponList) {
            dtoList.add(new CouponResDto().of(coupon));
        }
        return dtoList;
    }

    @Override
    @Transactional
    public void postCoupon(Long couponId, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        log.info("[postCoupon] nationId : {}", nationId);
        log.info("[postCoupon] nationId : {}", studentId);

        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new CustomException(ErrorCode.COUPON_NOT_FOUND));

        if (coupon.isAssigned()) {
            log.info("[postCoupon] 해당 쿠폰은 승인 대기 중 입니다.");
            throw new CustomException(ErrorCode.ALREADY_ASSIGNED_COUPON);
        }
        coupon.setAssigned(true);

        Student student = coupon.getStudent();
        if (!studentId.equals(student.getId())) {
            log.info("[postCoupon] 신청하는 회원과 상품을 구매한 회원이 다른 경우");
            throw new CustomException(ErrorCode.FAIL_AUTHORIZATION);
        }

        CouponRequest couponRequest = CouponRequest.builder()
                .nationId(nationId)
                .couponId(coupon.getId())
                .title(coupon.getTitle())
                .name(student.getName())
                .number(student.getNumber())
        .build();

        couponRequestMongoRepository.insert(couponRequest);
    }
}
