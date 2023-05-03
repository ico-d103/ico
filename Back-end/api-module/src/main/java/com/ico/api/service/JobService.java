package com.ico.api.service;

import com.ico.api.dto.JobAllResDto;
import com.ico.api.dto.JobAvailableResDto;
import com.ico.core.dto.JobDto;

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
    void updateJob(Long jobId, JobDto dto);

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
}
