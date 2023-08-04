package com.ico.core.repository;

import com.ico.core.document.Resume;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

/**
 * 직업 관련 MongoDB 테스트
 *
 * @author 서재건
 */
@TestPropertySource(locations = "/application.yml")
@DataMongoTest
@ExtendWith(SpringExtension.class)
@DirtiesContext
class ResumeMongoRepositoryTest {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    ResumeMongoRepository resumeMongoRepository;

    @Test
    @DisplayName("직업 신청")
    public void job() {
        for (int i = 1; i <= 10; i++) {
            mongoTemplate.insert(new Resume(Integer.toString(i), 2L + i, 3L + i, 4L + i));
            Resume test = resumeMongoRepository.findById(Integer.toString(i)).orElseThrow(() -> new RuntimeException("empty"));

            Assertions.assertEquals(test.getNationId(), 4L + i);
        }
    }

}