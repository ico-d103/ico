package com.ico.api.service.job;

import com.ico.api.dto.job.JobAllResDto;
import com.ico.api.dto.job.JobAvailableResDto;
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
        // TODO: 토큰에서 nation id 값 받아오기 필요
        long nationId = 1;

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new CustomException(ErrorCode.JOB_NOT_FOUND));
        log.info("[updateJob] 해당 직업 존재");

        jobRepository.findByTitleAndNationId(dto.getTitle(), nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.ALREADY_EXIST_TITLE));
        log.info("[updateJob] 중복된 이름 없음");

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

    @Override
    public List<JobAvailableResDto> findAllShortFallJob() {
        // TODO: 토큰에서 nation id 값 받아오기 필요
        long nationId = 1;
        if (nationRepository.findById(nationId).isEmpty())
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);

        List<Job> jobList = jobRepository.findAllByNationId(nationId);
        List<JobAvailableResDto> resJobList = new ArrayList<>();
        for (Job job : jobList) {
            if (job.getCount() == job.getTotal())   continue;

            // 정원이 채워지지 않은 직업을 목록에 추가
            resJobList.add(new JobAvailableResDto().of(job));
        }
        return resJobList;
    }
}
