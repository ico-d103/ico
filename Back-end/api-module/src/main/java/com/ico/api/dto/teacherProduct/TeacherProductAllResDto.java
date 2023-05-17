package com.ico.api.dto.teacherProduct;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * @author 변윤경
 */
@Getter
@NoArgsConstructor
public class TeacherProductAllResDto {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

    private Long id;

    private String title;

    private int amount;

    private List<String> images;

    private byte count;

    private byte sold;

    private boolean rental;

    private String date;

    @Builder
    public TeacherProductAllResDto(Long id, String title, int amount, List<String> images, byte count, byte sold, boolean rental, String date) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.images = images;
        this.count = count;
        this.sold = sold;
        this.rental = rental;
        this.date = date;
    }
}
