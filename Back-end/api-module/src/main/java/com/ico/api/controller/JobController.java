package com.ico.api.controller;

import com.ico.api.dto.job.JobAddReqDto;
import com.ico.api.dto.job.JobAllResDto;
import com.ico.api.dto.job.JobAvailableResDto;
import com.ico.api.dto.job.JobResDto;
import com.ico.api.service.job.JobService;
import com.ico.core.dto.JobReqDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

/**
 * 직업 관련 Controller
 * 
 * @author 서재건
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/job")
public class JobController {

    private final JobService jobService;

    /**
     * 입력값으로 직업 수정
     * 
     * @param jobId
     * @param dto 직업 이름, 직업 설명, 총 인원, 임금, 색깔
     * @return OK
     */
    @PutMapping("/teacher/{jobId}")
    public ResponseEntity<HttpStatus> updateJob(@PathVariable Long jobId, @Valid @RequestBody JobReqDto dto, HttpServletRequest request) {
        jobService.updateJob(jobId, dto, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 학생이 학급 잔여 직업 조회
     *
     * @return
     */
    @GetMapping("/student")
    public ResponseEntity<List<JobAvailableResDto>> findAllShortFallJob(HttpServletRequest request) {
        return ResponseEntity.ok(jobService.findAllShortFallJob(request));
    }

    /**
     * 교사가 전체 직업 조회
     *
     * @return
     */
    @GetMapping("/teacher/all")
    public ResponseEntity<JobAllResDto> findAllJob(HttpServletRequest request) {
        return ResponseEntity.ok(jobService.findAllJob(request));
    }

    /**
     * 공통) 직업 명함 조회
     *
     * @return
     */
    @GetMapping
    public ResponseEntity<List<JobResDto>> findJobList(HttpServletRequest request) {
        return ResponseEntity.ok(jobService.findJobList(request));
    }

    /**
     * 직업 추가
     *
     * @param dto
     * @param request
     * @return
     */
    @PostMapping("/teacher")
    public ResponseEntity<HttpStatus> addJob(@Valid @RequestBody JobAddReqDto dto, HttpServletRequest request) {
        jobService.addJob(dto, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 직업 삭제
     *
     * @param jobId
     * @return
     */
    @DeleteMapping("/teacher/{jobId}")
    public ResponseEntity<HttpStatus> deleteJob(@PathVariable Long jobId) {
        jobService.deleteJob(jobId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 직업 배정 초기화
     *
     * @param request
     * @return
     */
    @PutMapping("/teacher/reset")
    public ResponseEntity<HttpStatus> resetAllJob(HttpServletRequest request) {
        jobService.resetAllJob(request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 학생 개별 직업 배정 초기화
     *
     * @param studentId
     * @param request
     * @return
     */
    @PutMapping("/teacher/reset/{studentId}")
    public ResponseEntity<HttpStatus> resetJob(@PathVariable Long studentId, HttpServletRequest request) {
        jobService.resetJob(studentId, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
