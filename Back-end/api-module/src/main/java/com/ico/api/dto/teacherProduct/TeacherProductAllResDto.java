package com.ico.api.dto.teacherProduct;

import com.ico.core.entity.TeacherProduct;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author 변윤경
 */
@Getter
@NoArgsConstructor
public class TeacherProductAllResDto {

    private Long id;

    private String title;

    private int amount;

    private String image;

    private byte count;

    private byte sold;

    private boolean isRental;

    @Builder
    public TeacherProductAllResDto(Long id, String title, int amount, String image, byte count, byte sold, boolean isRental) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.image = image;
        this.count = count;
        this.sold = sold;
        this.isRental = isRental;
    }


    /**
     * TeacherProduct TeacherProductAllResDto 생성
     *
     * @param product 교사상품
     * @return TeacherProductAllResDto
     */
    public TeacherProductAllResDto of(TeacherProduct product){
        return TeacherProductAllResDto.builder()
                .id(product.getId())
                .title(product.getTitle())
                .amount(product.getAmount())
                .image(product.getImage())
                .count(product.getCount())
                .sold(product.getSold())
                .isRental(product.getIsRental())
                .build();
    }
}
