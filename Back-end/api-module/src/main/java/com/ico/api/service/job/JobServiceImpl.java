package com.ico.api.service.job;

import com.ico.api.dto.job.JobAddReqDto;
import com.ico.api.dto.job.JobAllResDto;
import com.ico.api.dto.job.JobAvailableResDto;
import com.ico.api.dto.job.JobResDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.dto.JobReqDto;
import com.ico.core.entity.Job;
import com.ico.core.entity.Nation;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.JobRepository;
import com.ico.core.repository.NationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
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

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void updateJob(Long jobId, JobReqDto dto, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new CustomException(ErrorCode.JOB_NOT_FOUND));
        log.info("[updateJob] 해당 직업 존재");

        if (jobRepository.findByIdNotAndTitleAndNationId(jobId, dto.getTitle(), nationId).isPresent()) {
                log.info("[updateJob] 중복된 이름 존재");
                throw new CustomException(ErrorCode.ALREADY_EXIST_TITLE);
        }
        if (job.getCount() > dto.getTotal()) {
            log.info("[updateJob] 배정된 인원보다 수정하는 총 인원이 적은 경우");
            throw new CustomException(ErrorCode.INVALID_JOB_TOTAL);
        }

        job.updateJob(dto);
        jobRepository.save(job);
        log.info("[updateJob] 수정 완료");
    }

    @Override
    public List<JobAllResDto> findAllJob(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        if (nationRepository.findById(nationId).isEmpty()) {
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);
        }

        List<Job> jobList = jobRepository.findAllByNationId(nationId);
        List<JobAllResDto> resJobList = new ArrayList<>();
        for (Job job : jobList) {
            resJobList.add(new JobAllResDto().of(job));
        }
        return resJobList;
    }

    @Override
    public List<JobAvailableResDto> findAllShortFallJob(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

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

    @Override
    public List<JobResDto> findJobList(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        if (nationRepository.findById(nationId).isEmpty()) {
            log.info("토큰의 nationId에 해당하는 나라가 존재하지 않는 경우");
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);
        }

        List<Job> jobList = jobRepository.findAllByNationId(nationId);
        List<JobResDto> dtoList = new ArrayList<>();
        for (Job job : jobList) {
            dtoList.add(new JobResDto().of(job));
        }
        return dtoList;
    }

    @Override
    public void addJob(JobAddReqDto dto, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        Job job = Job.builder()
                .nation(nation)
                .title(dto.getTitle())
                .detail(dto.getDetail())
                .image(dto.getImage())
                .wage(dto.getWage())
                .creditRating(dto.getCreditRating().byteValue())
                .total(dto.getTotal().byteValue())
                .color(dto.getColor())
                .build();
        jobRepository.save(job);
    }

    @Override
    public void deleteJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new CustomException(ErrorCode.JOB_NOT_FOUND));

        if (job.getCount() > 0) {
            log.info("[deleteJob] 배정된 인원이 존재하여 삭제할 수 없습니다.");
            throw new CustomException(ErrorCode.ALREADY_ASSIGNED_JOB);
        }

        jobRepository.delete(job);
    }
}
