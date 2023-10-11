package com.ico.core.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;


/**
 * 쿠폰 사용 신청 Document
 *
 * @author 서재건
 */
@Entity(name = "coupon_request")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CouponRequest {

    @Id
    private Long id;

    private Long nationId;

    private Long couponId;

    private String title;

    private String name;

    private byte number;

    @CreatedDate
    private LocalDateTime date;

    @Builder
    public CouponRequest(Long id, Long nationId, Long couponId, String title, String name, byte number, LocalDateTime date) {
        this.id = id;
        this.nationId = nationId;
        this.couponId = couponId;
        this.title = title;
        this.name = name;
        this.number = number;
        this.date = date;
    }
}
