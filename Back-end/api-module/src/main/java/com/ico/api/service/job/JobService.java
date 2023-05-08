package com.ico.api.service.job;

import com.ico.api.dto.job.JobAllResDto;
import com.ico.api.dto.job.JobAvailableResDto;
import com.ico.api.dto.job.JobResDto;
import com.ico.core.dto.JobReqDto;

import java.util.List;

/**
 * 직업 관련 Service interface
 *
 * @author 서재건
 */
public interface JobService {

    /**
     * 입력값으로 직업 내용 수정
     *
     * @param jobId
     * @param dto 직업 이름, 직업 설명, 총 인원, 임금, 색깔
     */
    void updateJob(Long jobId, JobReqDto dto);

    /**
     * 교사가 전체 직업 조회
     *
     * @return
     */
    List<JobAllResDto> findAllJob();

    /**
     * 학생이 인원 미달 직업을 조회
     *
     * @return
     */
    List<JobAvailableResDto> findAllShortFallJob();

    /**
     * 직업 명함 조회
     *
     * @return
     */
    List<JobResDto> findJobList();
}
