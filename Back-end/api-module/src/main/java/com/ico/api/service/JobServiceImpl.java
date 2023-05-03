package com.ico.api.service;

import com.ico.core.dto.JobDto;
import com.ico.core.entity.Job;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 직업 관련 Service 로직 작성
 *
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService{

    private final JobRepository jobRepository;

    @Override
    public void updateJob(Long jobId, JobDto dto) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new CustomException(ErrorCode.JOB_NOT_FOUND));
        if (job.getCount() != 0) {
            throw new CustomException(ErrorCode.ALREADY_ASSIGNED);
        }
        log.info("[updateJob] 아직 배정 받은 인원 없어서 수정 가능");
        job.updateJob(dto);
        jobRepository.save(job);
        log.info("[updateJob] 수정 완료");
    }
}
