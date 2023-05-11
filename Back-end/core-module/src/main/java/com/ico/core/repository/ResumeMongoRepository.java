package com.ico.core.repository;

import com.ico.core.entity.Resume;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 직업 신청 내역 관련 MongoRepository
 *
 * @author 서재건
 */
@Repository
public interface ResumeMongoRepository extends MongoRepository<Resume, String> {
    List<Resume> findAllByJobIdAndNationId(Long jobId, Long nationId);

    void deleteAllByStudentId(Long studentId);

    void deleteAllByNationId(Long nationId);

    List<Resume> findAllByNationId(Long nationId);

}
