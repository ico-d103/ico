package com.ico.core.repository;

import com.ico.core.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 학급 소식 관련 repository
 *
 * @author 서재건
 */
@Repository
public interface NewsRepository extends JpaRepository<News, Long> {

    List<News> findAllByNationId(Long nationId);

    /**
     * 전체 학급 소식 조회
     *
     * @param nationId
     * @return
     */
    List<News> findAllByNationIdOrderByUpdatedAtDesc(Long nationId);

    /**
     * 학급 소식 생성 시 제목 중복 체크
     *
     * @param nationId
     * @param title
     * @return
     */
    Optional<News> findByNationIdAndTitle(Long nationId, String title);

    /**
     * 학급 소식 수정 시 제목 중복 제크
     *
     * @param newsId
     * @param nationId
     * @param title
     * @return
     */
    Optional<News> findByIdNotAndNationIdAndTitle(Long newsId, Long nationId, String title);
}