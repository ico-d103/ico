package com.ico.core.repository;

import com.ico.core.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author 변윤경
 */
public interface CouponRepository extends JpaRepository<Coupon, Long> {
    Optional<Coupon> findByTeacherProductIdAndStudentId(Long productId, Long studentId);
}
