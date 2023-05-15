package com.ico.api.controller;

import com.ico.api.dto.resume.ResumeResDto;
import com.ico.api.service.resume.ResumeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 직업 신청 내역 관련 Controller
 *
 * @author 서재건
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;


    /**
     * 학생이 직업 신청
     *
     * @param jobId
     * @return OK
     */
    @PostMapping("/student/{jobId}")
    public ResponseEntity<HttpStatus> applyJob(@PathVariable Long jobId, HttpServletRequest request) {
        resumeService.applyJob(jobId, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 하나의 직업에 신청자 목록 조회
     *
     * @param jobId
     * @return [{학생 id, 학생 name, 학생, number}]
     */
    @GetMapping("/teacher/{jobId}")
    public ResponseEntity<List<ResumeResDto>> findResume(@PathVariable Long jobId, HttpServletRequest request) {
        return ResponseEntity.ok(resumeService.findResume(jobId, request));
    }

    /**
     * 교사가 직업 신청 승인
     *
     * @param resumeId mongo _id는 String
     * @return OK
     */
    @PostMapping("/teacher/{resumeId}")
    public ResponseEntity<HttpStatus> assignResume(@PathVariable String resumeId, HttpServletRequest request) {
        resumeService.assignResume(resumeId, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 교사가 직업 신청 반려
     *
     * @param resumeId
     * @return OK
     */
    @DeleteMapping("/teacher/{resumeId}")
    public ResponseEntity<HttpStatus> rejectResume(@PathVariable String resumeId, HttpServletRequest request) {
        resumeService.rejectResume(resumeId, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 학생의 직업 신청 여부 확인
     *
     * @param request
     * @return
     */
    @GetMapping("/student/check/{jobId}")
    public ResponseEntity<Boolean> checkRequestJob(@PathVariable Long jobId, HttpServletRequest request) {
        return ResponseEntity.ok(resumeService.checkRequestJob(jobId, request));
    }

}
