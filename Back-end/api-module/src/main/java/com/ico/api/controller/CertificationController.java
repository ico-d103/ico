package com.ico.api.controller;

import com.ico.api.service.certification.CertificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
     * @return
     */
    @DeleteMapping("/admin/approve/{id}")
    public ResponseEntity<Void> approveCertification(@PathVariable Long id) {
        certificationService.approveCertification(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * 교사인증서 반려
     * @param id
     * @return
     */
    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<Void> deleteCertification(@PathVariable Long id) {
        certificationService.deleteCertification(id);
        return ResponseEntity.noContent().build();
    }
}
