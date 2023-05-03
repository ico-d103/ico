package com.ico.api.service;

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
}
