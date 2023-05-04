package com.ico.api.service;

import com.ico.api.dto.ResumeResDto;

import java.util.List;

/**
 * 직업 신청 내역 Service
 *
 * @author 서재건
 */
public interface ResumeService {

    /**
     * 학생이 직업 신청
     *
     * @param jobId
     */
    void applyJob(Long jobId);

    /**
     * 하나의 직업에 신청자 목록 조회
     *
     * @param jobId
     * @return
     */
    List<ResumeResDto> findResume(Long jobId);
}
