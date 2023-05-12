package com.ico.core.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ico.core.dto.JobReqDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * 직업 Entity
 *
 * @author 서재건
 */
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // 외부에서 인스턴스 생성하는 것 방지
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    private Nation nation;

    private String title;

    private String detail;

    private String image;

    private int wage;

    @Column(name = "credit_rating")
    private byte creditRating;

    @ColumnDefault("0")
    private byte count;

    @ColumnDefault("0")
    private byte total;

    private String color;

    @ColumnDefault("")
    private String studentName;

    @Builder
    public Job(Long id, Nation nation, String title, String detail, String image, int wage, byte creditRating, byte count, byte total, String color, String studentName) {
        this.id = id;
        this.nation = nation;
        this.title = title;
        this.detail = detail;
        this.image = image;
        this.wage = wage;
        this.creditRating = creditRating;
        this.count = count;
        this.total = total;
        this.color = color;
        this.studentName = studentName;
    }

    /**
     * 직업 수정 시 처리하는 method
     *
     * @param dto
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public void updateJob(JobReqDto dto) {
        this.title = dto.getTitle();
        this.detail = dto.getDetail();
        this.total = dto.getTotal().byteValue();
        this.wage = dto.getWage();
        this.color = dto.getColor();
    }
}
