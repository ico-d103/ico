package com.ico.api.service.news;

import com.ico.api.dto.news.NewsReqDto;
import com.ico.api.dto.news.NewsResDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 학급 소식 관련 Service
 *
 * @author 서재건
 */
public interface NewsService {

    /**
     * 전체 학급 소식 조회
     *
     * @return
     */
    List<NewsResDto> findAllNews(HttpServletRequest request);

    /**
     * 학급 소식 추가
     *
     * @param dto
     */
    void addNews(NewsReqDto dto, HttpServletRequest request);

    /**
     * 학급 소식 수정
     *
     * @param dto
     * @param newsId
     */
    void updateNews(NewsReqDto dto, Long newsId, HttpServletRequest request);

    /**
     * 학급 소식 삭제
     *
     * @param newsId
     */
    void deleteNews(Long newsId, HttpServletRequest request);

    /**
     * 학급 소식 조회
     * (학급 소식 수정 페이지에서 사용됨)
     *
     * @param newsId
     * @param request
     * @return
     */
    NewsResDto findNews(long newsId, HttpServletRequest request);
}
