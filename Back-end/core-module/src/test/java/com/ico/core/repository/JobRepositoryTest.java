//package com.ico.core.repository;
//
//import com.ico.core.dto.JobReqDto;
//import com.ico.core.entity.Job;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
///**
// * Job 관련 테스트 class
// *
// * @author 서재건
// */
//@ExtendWith(SpringExtension.class)
//@DataJpaTest
//class JobRepositoryTest {
//
//    @Autowired
//    JobRepository jobRepository;
//
//    /**
//     * 직업 객체 생성
//     *
//     * @return
//     */
//    private Job jobSetting() {
//        return Job.builder()
//                .color("빨강")
//                .title("소방관")
//                .image("소방관 일러스트")
//                .detail("이 분은 소방관")
//                .creditRating((byte) 5)
//                .wage(2000)
//                .build();
//    }
//
//    /**
//     * 직업 수정 시 받을 입력값 Dto 생성
//     *
//     * @return
//     */
//    private JobReqDto jobDtoSetting() {
//        return JobReqDto.builder()
//                .title("소방관")
//                .detail("나는야 소방관")
//                .total(4)
//                .wage(1000)
//                .color("빨강")
//                .build();
//    }
//
//    @Test
//    @DisplayName("직업 추가")
//    void jobInsert() {
//        //given
//        Job job = Job.builder()
//                .color("빨강")
//                .title("소방관")
//                .image("소방관 일러스트")
//                .detail("이 분은 소방관")
//                .creditRating((byte) 5)
//                .wage(2000)
//                .studentNames("김다나카")
//                .build();
//
//        //when
//        Job savedJob = jobRepository.save(job);
//
//        //then
//        Assertions.assertEquals(savedJob.getColor(), job.getColor());
//        Assertions.assertEquals(savedJob.getCreditRating(), job.getCreditRating());
//    }
//
//    @Test
//    @DisplayName("직업 수정")
//    void jobUpdate() {
//        //given
//        Job savedJob = jobSetting();
//        JobReqDto dto = jobDtoSetting();
//
//        //when
//        savedJob.updateJob(dto);
//        Job updateJob = jobRepository.save(savedJob);
//
//        //then
//        Assertions.assertEquals(savedJob.getDetail(), updateJob.getDetail());
//        Assertions.assertEquals(savedJob.getWage(), updateJob.getWage());
//
//    }
//
//}