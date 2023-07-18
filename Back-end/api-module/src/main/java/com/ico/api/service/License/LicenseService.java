package com.ico.api.service.License;

import com.ico.api.dto.license.LicenseUpdateReqDto;
import com.ico.api.dto.license.NationLicenseResDto;
import com.ico.api.dto.license.StudentLicenseResDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

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

    /**
     * 교사가 나라의 자격증을 삭제
     * @param request
     * @param nationLicenseId
     */
    void deleteNationLicense(HttpServletRequest request, Long nationLicenseId);

    /**
     * 교사가 나라의 자격증을 생성
     * @param request
     * @param subject
     */
    String createNationLicense(HttpServletRequest request, String subject);

    /**
     * 학생들의 자격증 등급 조정
     * @param request
     * @param map
     */
    void updateStudentLicense(HttpServletRequest request, Map<Long, Boolean> map);

    /**
     * 교사가 학생 한명의 등급 조정
     * @param request
     * @param map
     */
    void updateStudentDetailLicense(HttpServletRequest request, Long studentId, Map<Long, Integer> map);

    /**
     * 모든 학생의 하나의 자격증 등급 조정
     * @param request
     * @param dto
     */
    void updateAllStudentLicense(HttpServletRequest request, LicenseUpdateReqDto dto);
}
