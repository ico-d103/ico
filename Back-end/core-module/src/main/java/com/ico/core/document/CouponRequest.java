package com.ico.core.document;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


/**
 * 쿠폰 사용 신청 Document
 *
 * @author 서재건
 */
@Document(collection = "coupon_request")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CouponRequest {

    @Id
    private String id;

    private Long nationId;

    private Long couponId;

    private String title;

    private String name;

    private byte number;

    @CreatedDate
    private LocalDateTime date;

    @Builder
    public CouponRequest(String id, Long nationId, Long couponId, String title, String name, byte number, LocalDateTime date) {
        this.id = id;
        this.nationId = nationId;
        this.couponId = couponId;
        this.title = title;
        this.name = name;
        this.number = number;
        this.date = date;
    }
}
