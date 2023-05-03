package com.ico.api.service;

import com.ico.core.dto.JobDto;

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
}