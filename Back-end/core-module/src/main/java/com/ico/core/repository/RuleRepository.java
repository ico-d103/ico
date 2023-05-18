package com.ico.core.repository;

import com.ico.core.entity.Rule;
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
public interface RuleRepository extends JpaRepository<Rule, Long> {

    /**
     * 학급 규칙 조회
     *
     * @param nationId
     * @return
     */
    List<Rule> findAllByNationId(Long nationId);

    /**
     * 학급 규칙 생성 시 제목 중복 체크
     *
     * @param nationId
     * @param title
     * @return
     */
    Optional<Rule> findByNationIdAndTitle(Long nationId, String title);

    /**
     * 학급 규칙 수정 시 제목 중복 제크
     *
     * @param ruleId
     * @param nationId
     * @param title
     * @return
     */
    Optional<Rule> findByIdNotAndNationIdAndTitle(Long ruleId, Long nationId, String title);
}
