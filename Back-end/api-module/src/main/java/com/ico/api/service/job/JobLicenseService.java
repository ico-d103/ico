package com.ico.api.service.job;

import com.ico.api.dto.job.JobLicenseReqDto;
import com.ico.api.dto.job.JobLicenseResDto;

import javax.servlet.http.HttpServletRequest;

/**
 * 직업에 대한 자격증 등급 매기기
 *
 * @author 강교철
 */
public interface JobLicenseService {

    /**
     * 직업에 자격증 등급 부여
     * @param request
     * @param dto
     */
    void createJobLicense(HttpServletRequest request, JobLicenseReqDto dto);
    
    /**
     * 하나의 직업에 대한 자격증과 자격증 등급 
     * @param request
     * @param jobLicenseId
     * @return
     */
    JobLicenseResDto getDetailJobLicense(HttpServletRequest request, Long jobLicenseId);

    /**
     * 하나의 직업에 대한 자격증 등급 수정
     * @param request
     * @param JobLicenseId
     * @param dto
     */
    void updateJobLicense(HttpServletRequest request, Long JobLicenseId, JobLicenseReqDto dto);

    /**
     * 자격증 등급 삭제
     * @param request
     * @param JobLicenseId
     */
    void deleteJobLicense(HttpServletRequest request, Long JobLicenseId);
}
