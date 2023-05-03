package com.ico.core.repository;

import com.ico.core.entity.Resume;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * 직업 신청 내역 관련 MongoRepository
 *
 * @author 서재건
 */
@Repository
public interface ResumeMongoRepository extends MongoRepository<Resume, String> {
}
