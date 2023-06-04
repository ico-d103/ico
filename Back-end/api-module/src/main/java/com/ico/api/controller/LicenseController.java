package com.ico.api.controller;

import com.ico.api.dto.license.NationLicenseResDto;
import com.ico.api.dto.license.StudentLicenseResDto;
import com.ico.api.service.License.LicenseService;
import lombok.RequiredArgsConstructor;
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
import java.util.List;
import java.util.Map;

/**
 * @author 강교철
 */
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
     * @param map
     * @return ok
     */
    @PutMapping("/teacher/{nationLicenseId}")
    public ResponseEntity<HttpStatus> updateNationLicense(HttpServletRequest request, @PathVariable Long nationLicenseId, @RequestBody Map<String, String> map) {
        licenseService.updateNationLicense(request, nationLicenseId, map.get("subject"));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 학생이 자신의 자격증 조회
     * @param request
     * @return StudentLicenseResDto
     */
    @GetMapping("/student")
    public ResponseEntity<List<StudentLicenseResDto>> getStudentLicense(HttpServletRequest request) {
        return ResponseEntity.ok(licenseService.getStudentLicense(request));
    }

    /**
     * 교사가 나라의 자격증을 삭제
     * @param request
     * @param nationLicenseId
     * @return ok
     */
    @DeleteMapping("/teacher/{nationLicenseId}")
    public ResponseEntity<HttpStatus> deleteNationLicense(HttpServletRequest request, @PathVariable Long nationLicenseId) {
        licenseService.deleteNationLicense(request, nationLicenseId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 교사가 나라의 자격증을 생성
     * @param request
     * @param map
     * @return
     */
    @PostMapping("/teacher")
    public ResponseEntity<String> createNationLicense(HttpServletRequest request, @RequestBody Map<String, String> map) {
        return ResponseEntity.ok(licenseService.createNationLicense(request, map.get("subject")));
    }

//    TODO : 나중에
//    /**
//     * 과목명과 등급을 입력받고 모든 학생의 자격증을 수정
//     * @param request
//     * @param reqDto
//     * @return
//     */
//    @PutMapping("/teacher")
//    public ResponseEntity<HttpStatus> updateStudentLicense(HttpServletRequest request, @RequestBody StudentLicenseUpdateReqDto reqDto) {
//        licenseService.updateStudentLicense(request, reqDto);
//        return ResponseEntity.ok(HttpStatus.OK);
//    }

    /**
     * 교사가 학생 한명의 자격증을 수정
     * @param request
     * @param studentId
     * @param map
     * @return
     */
    @PutMapping("/teacher/detail/{studentId}")
    public ResponseEntity<HttpStatus> updateStudentDetailLicense(HttpServletRequest request, @PathVariable Long studentId, @RequestBody Map<Long, Integer> map) {
        licenseService.updateStudentDetailLicense(request, studentId, map);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
