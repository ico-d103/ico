package com.ico.api.dto;

import com.ico.core.entity.StudentProduct;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author 변윤경
 */
@Getter
@NoArgsConstructor
public class StudentProductAllResDto {
    Long id;
    String title;
    int amount;
    String image;
    byte count;
    boolean is_assigned;
    byte sold;
    String name;

    @Builder
    public StudentProductAllResDto(Long id, String title, int amount, String image, byte count, boolean is_assigned, byte sold, String name) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.image = image;
        this.count = count;
        this.is_assigned = is_assigned;
        this.sold = sold;
        this.name = name;
    }

    /**
     * StudentProduct를 StudentProductAllResDto로 생성
     *
     * @param product 학생상품
     * @return StudentProductAllResDto
     */
    public StudentProductAllResDto of(StudentProduct product){
        return StudentProductAllResDto.builder()
                .id(product.getId())
                .title(product.getTitle())
                .amount(product.getAmount())
                .image(product.getImage())
                .count(product.getCount())
                .is_assigned(product.is_assigned())
                .sold(product.getSold())
                .name(product.getStudent().getName())
                .build();
    }
}
