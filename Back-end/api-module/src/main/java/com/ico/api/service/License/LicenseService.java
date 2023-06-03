package com.ico.api.service.License;

import com.ico.api.dto.license.NationLicenseResDto;
import com.ico.api.dto.license.StudentLicenseResDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author 강교철
 */
public interface LicenseService {

    /**
     * 교사가 학생의 자격증 조회
     * @param request
     * @param studentId
     * @return
     */
    List<StudentLicenseResDto> getTeacherStudentLicense(HttpServletRequest request, Long studentId);

    /**
     * 교사가 나라의 자격증 조회
     * @param request
     * @return NationLicenseResDto
     */
    List<NationLicenseResDto> getTeacherNationLicense(HttpServletRequest request);

    /**
     * 교사가 나라의 자격증 수정
     * @param request
     * @param nationLicenseId
     */
    void updateNationLicense(HttpServletRequest request, Long nationLicenseId, String subject);

    /**
     * 학생 자신의 자격증 조회
     * @param request
     * @return
     */
    List<StudentLicenseResDto> getStudentLicense(HttpServletRequest request);
}
