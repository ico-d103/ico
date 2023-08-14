package com.ico.api.service.job;

import com.ico.api.dto.job.JobLicenseDelReqDto;
import com.ico.api.dto.job.JobLicenseReqDto;
import com.ico.api.dto.job.JobLicenseResDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.entity.JobLicense;
import com.ico.core.entity.NationLicense;
import com.ico.core.entity.StudentJob;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.JobLicenseRepository;
import com.ico.core.repository.NationLicenseRepository;
import com.ico.core.repository.StudentJobRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * 직업에 대한 자격증 등급
 *
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class JobLicenseServiceImpl implements JobLicenseService{

    private final JobLicenseRepository jobLicenseRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final StudentJobRepository studentJobRepository;
    private final NationLicenseRepository nationLicenseRepository;

    @Transactional
    @Override
    public void createJobLicense(HttpServletRequest request, JobLicenseReqDto dto) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        StudentJob studentJob = studentJobRepository.findByIdAndNationId(dto.getJobId(), nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.JOB_NOT_FOUND));

        NationLicense nationLicense = nationLicenseRepository.findByNationIdAndId(nationId, dto.getLicenseId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_LICENSE));

        JobLicense jobLicense = JobLicense.builder()
                .job(studentJob)
                .nationLicense(nationLicense)
                .rating(dto.getRating().byteValue())
                .build();
        log.info("[createJobLicense] 직업 자격증이 만들어졌습니다.");
        jobLicenseRepository.save(jobLicense);
    }

    @Override
    public void deleteJobLicense(HttpServletRequest request, JobLicenseDelReqDto dto) {
        List<JobLicense> jobLicenses = jobLicenseRepository.findAllById(dto.getJobLicenseIds());
        if (jobLicenses.isEmpty()) {
            log.info("[deleteJobLicense] 직업에 부여된 자격증이 없습니다.");
            throw new CustomException(ErrorCode.NOT_FOUND_JOB_LICENSE);
        }
        jobLicenseRepository.deleteAll(jobLicenses);
    }
}