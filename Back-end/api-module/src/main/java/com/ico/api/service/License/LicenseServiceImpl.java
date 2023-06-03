package com.ico.api.service.License;

import com.ico.api.dto.license.NationLicenseResDto;
import com.ico.api.dto.license.StudentLicenseResDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.entity.NationLicense;
import com.ico.core.entity.Student;
import com.ico.core.entity.StudentLicense;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationLicenseRepository;
import com.ico.core.repository.StudentLicenseRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
public class LicenseServiceImpl implements LicenseService{

    private final JwtTokenProvider jwtTokenProvider;
    private final StudentRepository studentRepository;
    private final NationLicenseRepository nationLicenseRepository;
    private final StudentLicenseRepository studentLicenseRepository;

    @Override
    public List<StudentLicenseResDto> getTeacherStudentLicense(HttpServletRequest request, Long studentId) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        if (!nationId.equals(student.getNation().getId())) {
            throw new CustomException(ErrorCode.NOT_EQUAL_NATION_TEACHER_STUDENT);
        }
        List<StudentLicense> licenses = studentLicenseRepository.findAllByStudentId(studentId);
        if (licenses.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_LICENSE);
        }
        List<StudentLicenseResDto> result = new ArrayList<>();
        for (StudentLicense license : licenses) {
            StudentLicenseResDto dto = StudentLicenseResDto.builder()
                    .id(license.getId())
                    .subject(license.getSubject())
                    .rating(license.getRating())
                    .build();
            result.add(dto);
        }
        return result;
    }

    @Override
    public List<NationLicenseResDto> getTeacherNationLicense(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);

        List<NationLicense> licenses = nationLicenseRepository.findAllByNationId(nationId);
        if (licenses.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_LICENSE);
        }
        List<NationLicenseResDto> result = new ArrayList<>();
        for (NationLicense license : licenses) {
            NationLicenseResDto dto = NationLicenseResDto.builder()
                    .id(license.getId())
                    .subject(license.getSubject())
                    .build();
            result.add(dto);
        }
        return result;
    }

    @Override
    public void updateNationLicense(HttpServletRequest request, Long nationLicenseId, String subject) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);

        NationLicense license = nationLicenseRepository.findById(nationLicenseId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_LICENSE));
        // 자격증의 나라와 교사의 나라 일치 여부
        if (!nationId.equals(license.getId())) {
            throw new CustomException(ErrorCode.NOT_EQUAL_NATION);
        }
        // 과목명 수정
        license.setSubject(subject);
        nationLicenseRepository.save(license);
    }

    @Override
    public List<StudentLicenseResDto> getStudentLicense(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long studentId = jwtTokenProvider.getId(token);

        List<StudentLicense> licenses = studentLicenseRepository.findAllByStudentId(studentId);
        if (licenses.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_LICENSE);
        }
        List<StudentLicenseResDto> result = new ArrayList<>();
        for (StudentLicense license : licenses) {
            StudentLicenseResDto dto = StudentLicenseResDto.builder()
                    .id(license.getId())
                    .subject(license.getSubject())
                    .rating(license.getRating())
                    .build();
            result.add(dto);
        }
        return result;
    }
}
