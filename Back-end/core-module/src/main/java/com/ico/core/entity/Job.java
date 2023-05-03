package com.ico.core.entity;

import com.ico.core.dto.JobDto;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
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
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // 외부에서 인스턴스 생성하는 것 방지
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

    /**
     * 직업 수정 시 처리하는 method
     *
     * @param dto
     */
    public void updateJob(JobDto dto) {
        this.title = dto.getTitle();
        this.detail = dto.getDetail();
        this.total = (byte) dto.getTotal();
        this.wage = dto.getWage();
        this.color = dto.getColor();
    }
}