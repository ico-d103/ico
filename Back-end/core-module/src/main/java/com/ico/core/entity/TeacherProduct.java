package com.ico.core.entity;

import com.ico.core.dto.TeacherProductReqDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

/**
 * 교사 상품 Entity
 *
 * @author 변윤경
 * @author 강교철
 * @author 서재건
 */
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TeacherProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    private Nation nation;

    private String title;

    private int amount;

    private String images;

    private String detail;

    private byte count;

    @Column(name = "is_coupon")
    private Boolean isCoupon;

    private byte sold;

    private LocalDateTime date;

    @Builder
    public TeacherProduct(Long id, Nation nation, String title, int amount, String images, String detail, byte count, boolean isCoupon, byte sold, LocalDateTime date) {
        this.id = id;
        this.nation = nation;
        this.title = title;
        this.amount = amount;
        this.images = images;
        this.detail = detail;
        this.count = count;
        this.isCoupon = isCoupon;
        this.sold = sold;
        this.date = date;
    }

    /**
     * 교사 상품 수정 시 호출되는 메서드
     * @param dto
     */
    public void updateTeacherProduct(TeacherProductReqDto dto, byte sold) {
        this.title = dto.getTitle();
        this.amount = dto.getAmount();
        this.detail = dto.getDetail();
        this.count = dto.getCount();
        this.sold = sold;
        this.isCoupon = dto.getIsCoupon();
    }
}
