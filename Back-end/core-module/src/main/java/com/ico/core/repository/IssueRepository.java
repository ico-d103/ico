package com.ico.core.repository;

import com.ico.core.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author 변윤경
 * @author 강교철
 */
public interface IssueRepository extends JpaRepository<Issue, Long> {
    /**
     * 주식 이슈 최신순 조회
     *
     * @param nationId 국가ID
     * @return 투자 이슈 최신순 목록
     */
    List<Issue> findAllByNationIdOrderByIdDesc(Long nationId);

    List<Issue> findAllByNationId(Long nationId);
}
