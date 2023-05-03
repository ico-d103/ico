package com.ico.api.controller;

import com.ico.api.dto.JobAllResDto;
import com.ico.core.dto.JobDto;
import com.ico.api.service.JobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<HttpStatus> updateJob(@PathVariable Long jobId, @Valid @RequestBody JobDto dto) {
        jobService.updateJob(jobId, dto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 교사가 전체 직업 조회
     *
     * @return
     */
    @GetMapping("/teacher/all")
    public ResponseEntity<List<JobAllResDto>> findAllJob() {
        List<JobAllResDto> jobList = jobService.findAllJob();
        return ResponseEntity.ok(jobList);
    }
}
