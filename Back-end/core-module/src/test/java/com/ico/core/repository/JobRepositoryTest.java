package com.ico.core.repository;

import com.ico.core.entity.Job;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Job 관련 테스트 class
 *
 * @author 서재건
 */
@ExtendWith(SpringExtension.class)
@DataJpaTest
class JobRepositoryTest {

    @Autowired
    JobRepository jobRepository;

    @Test
    @DisplayName("직업 추가")
    Job jobInsert() {
        //given
        Job job = Job.builder()
                .color("빨강")
                .title("소방관")
                .image("소방관 일러스트")
                .detail("이 분은 소방관")
                .creditRating((byte) 5)
                .wage(2000)
                .build();

        //when
        Job savedJob = jobRepository.save(job);

        //then
        Assertions.assertEquals(savedJob.getColor(), job.getColor());
        Assertions.assertEquals(savedJob.getCreditRating(), job.getCreditRating());
        return savedJob;
    }

    @Test
    @DisplayName("직업 수정")
    void jobUpdate() {
        Job savedJob = jobInsert();

        savedJob.setColor("파랑");
        savedJob.setWage(1000);

        Job updateJob = jobRepository.save(savedJob);

        Assertions.assertEquals(savedJob.getColor(), updateJob.getColor());
        Assertions.assertEquals(savedJob.getWage(), updateJob.getWage());
        
    }

}