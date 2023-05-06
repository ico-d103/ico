package com.ico.core.repository;

import com.ico.core.entity.Rule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 학급 규칙 관련 repository
 *
 * @author 서재건
 */
@Repository
public interface RuleRepository extends JpaRepository<Rule, Long> {

    List<Rule> findAllByNationId(Long nationId);
}
