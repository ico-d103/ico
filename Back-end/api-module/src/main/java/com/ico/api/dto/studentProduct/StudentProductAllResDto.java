package com.ico.api.dto.studentProduct;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author 변윤경
 */
@Getter
@NoArgsConstructor
public class StudentProductAllResDto {

    private Long id;

    private String title;

    private int amount;

    private List<String> images;

    private byte count;

    private boolean isAssigned;

    private byte sold;

    private String name;

    private String date;

    @Builder
    public StudentProductAllResDto(Long id, String title, int amount, List<String> images, byte count, boolean isAssigned, byte sold, String name, String date) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.images = images;
        this.count = count;
        this.isAssigned = isAssigned;
        this.sold = sold;
        this.name = name;
        this.date = date;
    }
}
