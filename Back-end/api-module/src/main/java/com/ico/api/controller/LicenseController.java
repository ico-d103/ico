package com.ico.api.controller;

import com.ico.api.dto.license.NationLicenseResDto;
import com.ico.api.dto.license.StudentLicenseResDto;
import com.ico.api.service.nation.NationService;
import com.ico.api.service.teacher.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("api/license")
@RequiredArgsConstructor
public class LicenseController {

    private final TeacherService teacherService;
    private final NationService nationService;

    /**
     * 교사가 학생의 자격증 조회
     * @param request
     * @param studentId
     * @return
     */
    @GetMapping("/teacher/{studentId}")
    public ResponseEntity<List<StudentLicenseResDto>> getStudentLicense(HttpServletRequest request, @PathVariable Long studentId) {
        return ResponseEntity.ok(teacherService.getStudentLicense(request, studentId));
    }

    /**
     * 교사가 나라의 자격증 조회
     * @param request
     * @return LicenseResDto
     */
    @GetMapping("/teacher")
    public ResponseEntity<List<NationLicenseResDto>> getNationLicense(HttpServletRequest request) {
        return ResponseEntity.ok(nationService.getNationLicense(request));
    }
}
