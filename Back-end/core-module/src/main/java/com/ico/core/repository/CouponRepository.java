package com.ico.core.repository;

import com.ico.core.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * @author 변윤경
 * @author 서재건
 */
public interface CouponRepository extends JpaRepository<Coupon, Long> {
    Optional<Coupon> findByTeacherProductIdAndStudentId(Long productId, Long studentId);

    List<Coupon> findAllByStudentId(Long studentId);

}
