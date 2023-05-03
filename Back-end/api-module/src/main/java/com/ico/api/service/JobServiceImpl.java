package com.ico.api.service;

import com.ico.api.dto.JobAllResDto;
import com.ico.core.dto.JobDto;
import com.ico.core.entity.Job;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.JobRepository;
import com.ico.core.repository.NationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    private final NationRepository nationRepository;

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

    @Override
    public List<JobAllResDto> findAllJob() {
        // TODO: 토큰에서 nation id 값 받아오기 필요
        long nationId = 1;
        if (!nationRepository.existsById(nationId))
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);

        List<Job> jobList = jobRepository.findAllByNationId(nationId);
        List<JobAllResDto> resJobList = new ArrayList<>();
        for (Job job : jobList) {
            resJobList.add(new JobAllResDto().of(job));
        }
        return resJobList;
    }
}
