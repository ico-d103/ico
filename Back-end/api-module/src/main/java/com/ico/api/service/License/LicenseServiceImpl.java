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
 * @author 서재건
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
        return getStudentLicenseList(studentId);
    }

    @Override
    public List<NationLicenseResDto> getTeacherNationLicense(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        List<NationLicense> licenses = nationLicenseRepository.findAllByNationId(nationId);
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

        return getStudentLicenseList(studentId);
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

    @Override
    public void updateStudentLicense(HttpServletRequest request, Map<Long, Boolean> map) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        for (Map.Entry<Long, Boolean> m : map.entrySet()) {
            StudentLicense license = studentLicenseRepository.findById(m.getKey())
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_LICENSE));
            // 나라일치 여부
            if (!nationId.equals(license.getNation().getId())) {
                throw new CustomException(ErrorCode.NOT_FOUND_LICENSE);
            }

            // 학생들의 자격증 등급 업데이트 / 디버깅과 유지보수를 위해 정규식 안씀
            int rating = license.getRating();
            if (m.getValue()) {
                if (rating == -1) {
                    license.setRating((byte) 7);
                } else if (rating == 0) {
                    throw new CustomException(ErrorCode.NOT_UP_LICENSE);
                } else {
                    license.setRating((byte) (rating - 1));
                }
            } else {
                if (rating == -1 || rating == 7) {
                    throw new CustomException(ErrorCode.NOT_DOWN_LICENSE);
                } else {
                    license.setRating((byte) (rating + 1));
                }
            }
            studentLicenseRepository.save(license);
        }
    }

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

            license.setRating(rating.byteValue());
            studentLicenseRepository.save(license);
        }
    }

    @Override
    public void updateAllStudentLicense(HttpServletRequest request, Long nationLicenseId) {

    }

    /**
     * 학생의 자격증 목록 조회
     *
     * @param studentId
     * @return
     */
    public List<StudentLicenseResDto> getStudentLicenseList(Long studentId) {
        List<StudentLicense> licenses = studentLicenseRepository.findAllByStudentId(studentId);

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
