package com.ico.api.controller;


import com.ico.api.dto.news.NewsReqDto;
import com.ico.api.dto.news.NewsResDto;
import com.ico.api.service.news.NewsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

/**
 * 학급 소식 관련 Controller
 *
 * @author 서재건
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    /**
     * 학급 소식 조회
     *
     * @return
     */
    @GetMapping
    public ResponseEntity<List<NewsResDto>> findAllNews(HttpServletRequest request) {
        return ResponseEntity.ok(newsService.findAllNews(request));
    }

    /**
     * 학급 소식 추가
     *
     * @param dto
     * @return
     */
    @PostMapping
    public ResponseEntity<HttpStatus> addNews(@Valid @RequestBody NewsReqDto dto, HttpServletRequest request) {
        newsService.addNews(dto, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 학급 소식 수정
     *
     * @param dto
     * @param newsId
     * @param request
     * @return
     */
    @PutMapping("/{newsId}")
    public ResponseEntity<HttpStatus> updateNews(@Valid @RequestBody NewsReqDto dto, @PathVariable Long newsId, HttpServletRequest request) {
        newsService.updateNews(dto, newsId, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 학급 소식 삭제
     *
     * @param newsId
     * @param request
     * @return
     */
    @DeleteMapping("/{newsId}")
    public ResponseEntity<HttpStatus> deleteRule(@PathVariable Long newsId, HttpServletRequest request) {
        newsService.deleteNews(newsId, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
