package com.ico.core.repository;

import com.ico.core.entity.CouponRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * 쿠폰 신청 내역 관련 mongo repository
 *
 * @author 서재건
 */
public interface CouponRequestRepository extends JpaRepository<CouponRequest, Long> {

    List<CouponRequest> findAllByNationId(Long nationId);
}
