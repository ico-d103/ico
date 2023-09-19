package com.ico.api.dto.teacherProduct;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 교상 상품 상세 조회 Res Dto
 *
 * @author 변윤경
 * @author 서재건
 */
@Getter
@Setter
@NoArgsConstructor
public class TeacherProductDetailResDto {
    private Long id;

    private String title;

    private int amount;

    private List<String> images;

    private String detail;

    private byte count;

    private Boolean isCoupon;

    private byte sold;

    private String date;

    private String seller;

    private Boolean isSeller;

    @Builder
    public TeacherProductDetailResDto(Long id, String title, int amount, List<String> images, String detail, byte count, boolean isCoupon, byte sold, String date, String seller, Boolean isSeller) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.images = images;
        this.detail = detail;
        this.count = count;
        this.isCoupon = isCoupon;
        this.sold = sold;
        this.date = date;
        this.seller = seller;
        this.isSeller = isSeller;
    }
}
