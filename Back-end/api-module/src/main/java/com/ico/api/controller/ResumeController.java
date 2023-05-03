package com.ico.api.controller;

import com.ico.api.service.ResumeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<HttpStatus> applyJob(@PathVariable Long jobId) {
        resumeService.applyJob(jobId);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
