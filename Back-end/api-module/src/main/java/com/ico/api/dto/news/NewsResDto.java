package com.ico.api.dto.news;

import com.ico.core.entity.News;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 학급 소식 조회 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class NewsResDto {

    private Long id;

    private String title;

    private String detail;

    private String author;

    private String createdAt;

    private String updatedAt;

    @Builder
    public NewsResDto(Long id, String title, String detail, String author, String createdAt, String updatedAt) {
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.author = author;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    /**
     * 조회 Response Dto 생성
     *
     * @param news
     * @return
     */
    public NewsResDto of(News news, String createdAt, String updatedAt) {
        return NewsResDto.builder()
                .id(news.getId())
                .title(news.getTitle())
                .detail(news.getDetail())
                .author(news.getAuthor())
                .createdAt(createdAt)
                .updatedAt(updatedAt)
                .build();
    }
}
