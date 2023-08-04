package com.ico.api.service.job;

import com.ico.api.dto.job.JobLicenseDelReqDto;
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
     * 자격증 등급 삭제
     * @param request
     * @param dto
     */
    void deleteJobLicense(HttpServletRequest request, JobLicenseDelReqDto dto);
}
