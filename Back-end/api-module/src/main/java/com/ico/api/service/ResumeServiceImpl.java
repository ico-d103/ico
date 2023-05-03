package com.ico.api.service;

import com.ico.core.entity.Resume;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.JobRepository;
import com.ico.core.repository.ResumeMongoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 *
 *
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeMongoRepository resumeMongoRepository;

    private final JobRepository jobRepository;

    @Override
    public void applyJob(Long jobId) {
        // TODO: 로그인한 유저 정보 불러오기
        Long studentId = 1L;
        Long nationId = 1L;

        jobRepository.findById(jobId)
                .orElseThrow(() -> new CustomException(ErrorCode.JOB_NOT_FOUND));
        Resume resume = Resume.builder()
                .student_id(studentId)
                .job_id(jobId)
                .nation_id(nationId)
                .build();
        resumeMongoRepository.insert(resume);
    }
}
