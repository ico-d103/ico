package com.ico.api.dto.job;

import com.ico.core.entity.StudentJob;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 직업 명함 조회 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class JobResDto {

    private Long id;

    private String title;

    private String detail;

    private int creditRating;

    private int wage;

    private String image;

    private String color;

    private int total;

    private int count;

    @Builder
    public JobResDto(Long id, String title, String detail, int creditRating, int wage, String image, String color, int total, int count) {
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.creditRating = creditRating;
        this.wage = wage;
        this.image = image;
        this.color = color;
        this.total = total;
        this.count = count;
    }

    /**
     * 직업 명함 조회 dto 반환
     *
     * @param studentJob
     * @return
     */
    public JobResDto of(StudentJob studentJob, String image) {
        return JobResDto.builder()
                .id(studentJob.getId())
                .title(studentJob.getTitle())
                .detail(studentJob.getDetail())
                .creditRating(studentJob.getCreditRating())
                .wage(studentJob.getWage())
                .image(image)
                .color(studentJob.getColor())
                .total(studentJob.getTotal())
                .count(studentJob.getCount())
                .build();
    }
}
