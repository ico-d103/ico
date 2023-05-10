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
 */
@Setter
@Getter
@NoArgsConstructor
public class StudentProductDetailResDto {
    private Long id;

    private String title;

    private int amount;

    private List<String> image;

    private String detail;

    private byte count;

    private boolean isAssigned;

    private byte sold;

    private String date;

    @Builder

    public StudentProductDetailResDto(Long id, String title, int amount, List<String> image, String detail, byte count, boolean isAssigned, byte sold, String date) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.image = image;
        this.detail = detail;
        this.count = count;
        this.isAssigned = isAssigned;
        this.sold = sold;
        this.date = date;
    }
}
