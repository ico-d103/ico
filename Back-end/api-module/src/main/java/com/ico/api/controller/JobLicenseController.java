package com.ico.api.controller;

import com.ico.api.dto.job.JobLicenseDelReqDto;
import com.ico.api.dto.job.JobLicenseReqDto;
import com.ico.api.service.job.JobLicenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

/**
 * 직업에 대한 자격증 등급
 *
 * @author 강교철
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/jobLicense")
public class JobLicenseController {

    private final JobLicenseService jobLicenseService;

    @PostMapping("/teacher")
    public ResponseEntity<HttpStatus> createJobLicense(HttpServletRequest request, @Valid @RequestBody JobLicenseReqDto dto) {
        jobLicenseService.createJobLicense(request, dto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/teacher")
    public ResponseEntity<HttpStatus> deleteJobLicense(HttpServletRequest request, @RequestBody JobLicenseDelReqDto dto) {
        jobLicenseService.deleteJobLicense(request, dto);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
