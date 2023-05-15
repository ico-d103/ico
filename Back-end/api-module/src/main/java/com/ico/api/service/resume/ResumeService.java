package com.ico.api.service.resume;

import com.ico.api.dto.resume.ResumeResDto;

import javax.servlet.http.HttpServletRequest;
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
    void applyJob(Long jobId, HttpServletRequest request);

    /**
     * 하나의 직업에 신청자 목록 조회
     *
     * @param jobId
     * @return
     */
    List<ResumeResDto> findResume(Long jobId, HttpServletRequest request);


    /**
     * 교사가 직업 신청 승인
     *
     * @param resumeId
     */
    void assignResume(String resumeId, HttpServletRequest request);

    /**
     * 교사가 직업 신청 반려
     *
     * @param resumeId
     */
    void rejectResume(String resumeId, HttpServletRequest request);

    /**
     * 학생의 직업 신청 여부 확인
     *
     * @param request
     * @return
     */
    boolean checkRequestJob(Long jobId, HttpServletRequest request);
}
