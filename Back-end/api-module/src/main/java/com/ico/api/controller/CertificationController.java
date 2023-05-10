package com.ico.api.controller;

import com.ico.api.dto.certification.CertificationResDto;
import com.ico.api.service.certification.CertificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @author 강교철
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/certification")
public class CertificationController {

    private final CertificationService certificationService;

    /**
     * 교사인증서 승인
     * @param id
     * @return OK
     */
    @DeleteMapping("/admin/approve/{id}")
    public ResponseEntity<HttpStatus> approveCertification(@PathVariable Long id, HttpServletRequest request) {
        certificationService.approveCertification(request, id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 교사인증서 반려
     * @param id
     * @return OK
     */
    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<HttpStatus> deleteCertification(@PathVariable Long id, HttpServletRequest request) {
        certificationService.deleteCertification(request, id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 교사인증서 조회
     * @param request
     * @param pageable
     * @return Page
     */
    @GetMapping("/admin")
    public ResponseEntity<Page<CertificationResDto>> allCertification(HttpServletRequest request, Pageable pageable) {

        return new ResponseEntity<>(certificationService.pageCertification(request, pageable), HttpStatus.OK);
    }
}
