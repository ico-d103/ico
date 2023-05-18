package com.ico.api.dto.studentProduct;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 학생 상품 상세보기 ResDto
 *
 * @author 변윤경
 * @author 강교철
 */
@Setter
@Getter
@NoArgsConstructor
public class StudentProductDetailResDto {
    private Long id;

    private String title;

    private int amount;

    private List<String> images;

    private String detail;

    private byte count;

    private boolean isAssigned;

    private byte sold;

    private String date;

    private boolean isSeller;

    @Builder

    public StudentProductDetailResDto(Long id, String title, int amount, List<String> images, String detail, byte count, boolean isAssigned, byte sold, String date, boolean isSeller) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.images = images;
        this.detail = detail;
        this.count = count;
        this.isAssigned = isAssigned;
        this.sold = sold;
        this.date = date;
        this.isSeller = isSeller;
    }
}
