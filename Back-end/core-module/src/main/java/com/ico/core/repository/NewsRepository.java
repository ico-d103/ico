package com.ico.core.repository;

import com.ico.core.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 학급 규칙 관련 repository
 *
 * @author 서재건
 */
@Repository
public interface NewsRepository extends JpaRepository<News, Long> {

    /**
     * 학급 규칙 조회
     *
     * @param nationId
     * @return
     */
    List<News> findAllByNationId(Long nationId);

    /**
     * 학급 규칙 생성 시 제목 중복 체크
     *
     * @param nationId
     * @param title
     * @return
     */
    Optional<News> findByNationIdAndTitle(Long nationId, String title);

    /**
     * 학급 규칙 수정 시 제목 중복 제크
     *
     * @param ruleId
     * @param nationId
     * @param title
     * @return
     */
    Optional<News> findByIdNotAndNationIdAndTitle(Long ruleId, Long nationId, String title);
}
