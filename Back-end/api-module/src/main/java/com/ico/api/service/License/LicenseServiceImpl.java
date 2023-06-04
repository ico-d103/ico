package com.ico.api.service.License;

import com.ico.api.dto.license.NationLicenseResDto;
import com.ico.api.dto.license.StudentLicenseResDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.entity.Nation;
import com.ico.core.entity.NationLicense;
import com.ico.core.entity.Student;
import com.ico.core.entity.StudentLicense;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationLicenseRepository;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StudentLicenseRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class LicenseServiceImpl implements LicenseService{

    private final JwtTokenProvider jwtTokenProvider;
    private final StudentRepository studentRepository;
    private final NationLicenseRepository nationLicenseRepository;
    private final StudentLicenseRepository studentLicenseRepository;
    private final NationRepository nationRepository;

    @Override
    public List<StudentLicenseResDto> getTeacherStudentLicense(HttpServletRequest request, Long studentId) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

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
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

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
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        // 자격증명이 없을 때 에러
        if (subject == null) {
            throw new CustomException(ErrorCode.NOT_FOUND_SUBJECT);
        }
        // 자격증명이 이미 있을 때 에러
        boolean isSubject = nationLicenseRepository.findBySubjectAndNationId(subject, nationId).isPresent();
        if (isSubject) {
            throw new CustomException(ErrorCode.DUPLICATED_SUBJECT);
        }

        NationLicense license = nationLicenseRepository.findById(nationLicenseId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_LICENSE));
        // 자격증의 나라와 교사의 나라 일치 여부
        if (!nationId.equals(license.getNation().getId())) {
            throw new CustomException(ErrorCode.NOT_EQUAL_NATION);
        }
        // 자격증명이 수정
        license.setSubject(subject);
        nationLicenseRepository.save(license);
    }

    @Override
    public List<StudentLicenseResDto> getStudentLicense(HttpServletRequest request) {
        Long studentId = jwtTokenProvider.getId(jwtTokenProvider.parseJwt(request));

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
    public void deleteNationLicense(HttpServletRequest request, Long nationLicenseId) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        NationLicense license = nationLicenseRepository.findById(nationLicenseId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_LICENSE));

        // 자격증의 나라와 교사의 나라 일치 여부
        if (!nationId.equals(license.getNation().getId())) {
            throw new CustomException(ErrorCode.NOT_EQUAL_NATION);
        }

        nationLicenseRepository.delete(license);
    }

    @Override
    public String createNationLicense(HttpServletRequest request, String subject) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NATION));
        // 자격증명이 없을 때 에러
        if (subject == null) {
            throw new CustomException(ErrorCode.NOT_FOUND_SUBJECT);
        }
        // 자격증명이 이미 있을 때 에러
        boolean isSubject = nationLicenseRepository.findBySubjectAndNationId(subject, nationId).isPresent();
        if (isSubject) {
            throw new CustomException(ErrorCode.DUPLICATED_SUBJECT);
        }
        NationLicense license = NationLicense.builder()
                .nation(nation)
                .subject(subject)
                .build();
        nationLicenseRepository.save(license);
        return subject;
    }

//    TODO : 나중에
//    @Override
//    public void updateStudentLicense(HttpServletRequest request, StudentLicenseUpdateReqDto reqDto) {
//        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
//
//        List<StudentLicense> licenses = studentLicenseRepository.findAllBySubjectAndNationId(reqDto.getSubject(), nationId);
//        log.info("[SUBJECT] : {}", reqDto.getSubject());
//        if (licenses.isEmpty()) {
//            throw new CustomException(ErrorCode.NOT_FOUND_LICENSE);
//        }
//        // 학생들의 자격증 등급을 입력받은 수치로 업데이트
//        for (StudentLicense license : licenses) {
//            license.setRating((byte) reqDto.getRating().intValue());
//            studentLicenseRepository.save(license);
//        }
//    }

    @Override
    public void updateStudentDetailLicense(HttpServletRequest request, Long studentId, Map<Long, Integer> map) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        // 교사와 학생의 나라 일치 여부
        if (!nationId.equals(student.getNation().getId())) {
            throw new CustomException(ErrorCode.NOT_EQUAL_NATION_TEACHER_STUDENT);
        }

        List<StudentLicense> licenses = studentLicenseRepository.findAllByStudentId(studentId);
        for (StudentLicense license : licenses) {
            Integer rating = map.get(license.getId());

            if (rating == null) {
                continue;
            }

            license.setRating((byte) rating.intValue());
            studentLicenseRepository.save(license);
        }
    }
}
