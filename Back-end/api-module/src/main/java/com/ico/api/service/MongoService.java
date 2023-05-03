package com.ico.api.service;

import com.ico.core.entity.MongoDocument;
import com.ico.core.repository.MongoDBRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * MongoDB 연동 테스트 Service
 *
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MongoService {

    private final MongoDBRepository mongoDBRepository;

    /**
     * insert Test
     */
    public void insertTest() {
        MongoDocument mongoDocument = new MongoDocument();
        mongoDocument.setId("1");
        mongoDocument.setName("hello");
        mongoDBRepository.insert(mongoDocument);
    }
}
