package com.ico.core.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

/**
 * 학급 소식
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Entity
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "nation_id")
    private Nation nation;

    private String title;

    @Column(length = 1023)
    private String detail;

    private String author;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Builder
    public News(Long id, Nation nation, String title, String detail, String author) {
        this.id = id;
        this.nation = nation;
        this.title = title;
        this.detail = detail;
        this.author = author;
    }

    /**
     * 학급 소식 수정
     *
     * @param title
     * @param detail
     */
    public void updateNews(String title, String detail) {
        this.title = title;
        this.detail = detail;
    }
}
