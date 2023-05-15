package com.ico.api.dto.job;

import com.ico.core.entity.StudentJob;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 학생이 인원미달 직업을 조회할 때 사용하는 Dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class JobAvailableResDto {

    private Long id;

    private String title;

    private int creditRating;

    private int count;

    private int total;

    private String image;

    private String color;

    @Builder
    public JobAvailableResDto(Long id, String title, int creditRating, int count, int total, String image, String color) {
        this.id = id;
        this.title = title;
        this.creditRating = creditRating;
        this.count = count;
        this.total = total;
        this.image = image;
        this.color = color;
    }

    /**
     * repository에서 불러온 Job을 JobAvailableResDto로 생성
     *
     * @param studentJob
     * @return
     */
    public JobAvailableResDto of(StudentJob studentJob, String image) {
        return JobAvailableResDto.builder()
                .id(studentJob.getId())
                .title(studentJob.getTitle())
                .creditRating(studentJob.getCreditRating())
                .count(studentJob.getCount())
                .total(studentJob.getTotal())
                .image(image)
                .color(studentJob.getColor())
                .build();
    }
}
