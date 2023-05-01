package com.ico.core.repository;

import com.ico.core.entity.MongoDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * MongoDB 연동 테스트 Repository
 *
 * @author 서재건
 */
@Repository
public interface MongoDBRepository extends MongoRepository<MongoDocument, String> {
}
