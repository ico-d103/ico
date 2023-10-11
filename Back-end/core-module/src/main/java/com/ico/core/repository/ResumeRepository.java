package com.ico.core.repository;

import com.ico.core.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 직업 신청 내역 관련 Repository
 *
 * @author 서재건
 */
@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findAllByJobIdAndNationId(Long jobId, Long nationId);

    void deleteAllByStudentId(Long studentId);

    void deleteAllByNationId(Long nationId);

    List<Resume> findAllByNationId(Long nationId);

    Optional<Resume> findByStudentIdAndJobId(Long studentId, Long jobId);

    void deleteAllByStudentIdIn(List<Long> ids);

    List<Resume> findAllByStudentId(Long studentId);

}
