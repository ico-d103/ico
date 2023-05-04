package com.ico.core.repository;

import com.ico.core.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * 직업 관련 Repository
 *
 * @author 서재건
 */
public interface JobRepository extends JpaRepository<Job, Long> {

    /**
     * 학급의 모든 직업 조히
     *
     * @param nationId
     * @return
     */
    List<Job> findAllByNationId(Long nationId);

    /**
     * 학급의 특정 직업 조회
     *
     * @param id
     * @param nationId
     * @return
     */
    Optional<Job> findByIdAndNationId(Long id, Long nationId);
}
