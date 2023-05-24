package com.ico.core.repository;

import com.ico.core.document.CouponRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * 쿠폰 신청 내역 관련 mongo repository
 *
 * @author 서재건
 */
public interface CouponRequestMongoRepository extends MongoRepository<CouponRequest, String> {

    List<CouponRequest> findAllByNationId(Long nationId);
}
