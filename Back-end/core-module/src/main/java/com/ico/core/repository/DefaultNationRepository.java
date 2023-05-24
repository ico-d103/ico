package com.ico.core.repository;

import com.ico.core.document.DefaultNation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * 나라 기본 데이터 생성 관련 Repository
 *
 * @author 서재건
 */
@Repository
public interface DefaultNationRepository extends MongoRepository<DefaultNation, String> {
}
