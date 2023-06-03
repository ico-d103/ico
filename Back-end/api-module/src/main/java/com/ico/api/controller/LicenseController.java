package com.ico.api.controller;

import com.ico.api.dto.license.NationLicenseResDto;
import com.ico.api.dto.license.StudentLicenseResDto;
import com.ico.api.service.License.LicenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("api/license")
@RequiredArgsConstructor
public class LicenseController {

    private final LicenseService licenseService;

    /**
     * 교사가 학생의 자격증 조회
     * @param request
     * @param studentId
     * @return StudentLicenseResDto
     */
    @GetMapping("/teacher/{studentId}")
    public ResponseEntity<List<StudentLicenseResDto>> getTeacherStudentLicense(HttpServletRequest request, @PathVariable Long studentId) {
        return ResponseEntity.ok(licenseService.getTeacherStudentLicense(request, studentId));
    }

    /**
     * 교사가 나라의 자격증 조회
     * @param request
     * @return LicenseResDto
     */
    @GetMapping("/teacher")
    public ResponseEntity<List<NationLicenseResDto>> getTeacherNationLicense(HttpServletRequest request) {
        return ResponseEntity.ok(licenseService.getTeacherNationLicense(request));
    }

    /**
     * 교사가 나라의 자격증 수정
     * @param request
     * @param nationLicenseId
     * @param subject
     * @return ok
     */
    @PutMapping("/teacher/{nationLicenseId}")
    public ResponseEntity<HttpStatus> updateNationLicense(HttpServletRequest request, @PathVariable Long nationLicenseId, @RequestBody String subject) {
        licenseService.updateNationLicense(request, nationLicenseId, subject);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 학생이 자신의 자격증 조회
     * @param request
     * @return
     */
    @GetMapping("/student")
    public ResponseEntity<List<StudentLicenseResDto>> getStudentLicense(HttpServletRequest request) {
        return ResponseEntity.ok(licenseService.getStudentLicense(request));
    }
}
