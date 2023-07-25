package com.ico.api.service.job;

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

        StudentJob studentJob = studentJobRepository.findById(dto.getJobId())
                .orElseThrow(() -> new CustomException(ErrorCode.JOB_NOT_FOUND));
        // 나라 일치 여부
        if (!studentJob.getNation().getId().equals(nationId)) {
            throw new CustomException(ErrorCode.NOT_EQUAL_NATION);
        }

        NationLicense nationLicense = nationLicenseRepository.findById(dto.getLicenseId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_LICENSE));
        // 나라 일치 여부
        if (!nationLicense.getNation().getId().equals(nationId)) {
            throw new CustomException(ErrorCode.NOT_EQUAL_NATION);
        }

        JobLicense jobLicense = JobLicense.builder()
                .job(studentJob)
                .license(nationLicense)
                .rating(dto.getRating().byteValue())
                .build();
        log.info("[createJobLicense] jobLicense가 만들어졌습니다.");
        jobLicenseRepository.save(jobLicense);
    }

    @Override
    public JobLicenseResDto getDetailJobLicense(HttpServletRequest request, Long jobLicenseId) {
        return null;
    }

    @Override
    public void updateJobLicense(HttpServletRequest request, Long JobLicenseId, JobLicenseReqDto dto) {

    }

    @Override
    public void deleteJobLicense(HttpServletRequest request, Long JobLicenseId) {

    }
}
