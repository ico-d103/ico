package com.ico.api.service.user;

import com.ico.api.dto.user.LoginDto;
import com.ico.api.dto.user.PasswordReqDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.code.Password;
import com.ico.core.code.Role;
import com.ico.core.code.Status;
import com.ico.core.entity.Student;
import com.ico.core.entity.Teacher;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.CertificationRepository;
import com.ico.core.repository.ImmigrationRepository;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Optional;


/**
 * Member ServiceImpl
 *
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final ImmigrationRepository immigrationRepository;
    private final CertificationRepository certificationRepository;

    @Override
    public String login(LoginDto members) {
        Optional<Teacher> teacher = teacherRepository.findByIdentity(members.getIdentity());
        Optional<Student> student = studentRepository.findByIdentity(members.getIdentity());

        if (teacher.isPresent()) {
            // 받은 비밀번호를 인코딩하면 다르게 인코딩(암호화)돼서 비교가 안됌
            if (!passwordEncoder.matches(members.getPassword(), teacher.get().getPassword())) {       // DB의 인코딩 비밀번호를 복호화해서 비교함
                throw new CustomException(ErrorCode.PASSWORD_WRONG);
            }
        } else if (student.isPresent()) {
            if (!passwordEncoder.matches(members.getPassword(), student.get().getPassword())) {
                throw new CustomException(ErrorCode.PASSWORD_WRONG);
            }
        }
        return jwtTokenProvider.generateJwtToken(members);
    }

    @Override
    public boolean duplicated(String identity) {
        boolean teacher = teacherRepository.findByIdentity(identity).isPresent();
        boolean student = studentRepository.findByIdentity(identity).isPresent();
        return teacher || student;
    }

    @Transactional
    @Override
    public Map<String, Object> returnStatus(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Role role = jwtTokenProvider.getRole(token);
        Long memberId = jwtTokenProvider.getId(token);
        if (role.equals(Role.STUDENT)) {
            Student student = studentRepository.findById(memberId)
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            // 학생의 비밀번호가 초기화 되었을 때
            if (student.getPwStatus().equals(Password.RESET)) {
                return Map.of("status", "require_change_password", "role", role);
            }
            if (jwtTokenProvider.getNation(token) != null) {
                // 학생의 토큰에 NationId 값이 있고 직업 권한이 없을 때
                if (student.getEmpowered().isBlank()) {
                    return Map.of("status", "approved", "role", role);
                }
                // 학생의 토큰에 NationId 값이 있고 직업 권한이 있을 때
                return Map.of("status", "approved,"+student.getEmpowered(), "role", role);

            } else {
                if (student.getNation() != null) {
                    // 학생이 반 코드 요청을 보냈고 교사에게 승인 받은 후
                    return Map.of("status", "require_refresh_token", "role", role);
                } else {
                    if (immigrationRepository.findByStudentId(memberId) != null) {
                        // 학생이 반 코드 요청을 보냈고 교사에게 승인 받기 전
                        return Map.of("status", "require_approval", "role", role);
                    }
                    // 학생이 로그인 후에 아무것도 안했을 때
                    return Map.of("status", "require_submit_code", "role", role);
                }
            }
        } else if (role.equals(Role.TEACHER)) {
            Teacher teacher = teacherRepository.findById(memberId)
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            // 교사의 비밀번호가 초기화 되었을 때
            if (teacher.getPwStatus().equals(Password.RESET)) {
                return Map.of("status", "require_change_password", "role", role);
            }
            if (jwtTokenProvider.getNation(token) != null) {
                // 교사 토큰에 NationId가 있을 때
                return Map.of("status", "approved", "role", role);
            } else {
                if (teacher.getStatus().equals(Status.APPROVED)) {
                    // 교사가 교사 인증서 승인 받은 후
                    return Map.of("status", "require_create_nation", "role", role);
                } else if (teacher.getStatus().equals(Status.REJECT)) {
                    // 교사인증서 반려당했을 때
                    return Map.of("status", "require_submit_certification", "role", role);
                }
                // 교사가 교사 인증서 승인 받기 전
                return Map.of("status", "require_approval", "role", role);
            }
        }
        // Admin 계정이 로그인했을 때
        return Map.of("status", "admin", "role", role);
    }

    @Override
    public void changePassword(HttpServletRequest request, PasswordReqDto dto) {
        String token = jwtTokenProvider.parseJwt(request);
        Role role = jwtTokenProvider.getRole(token);
        // 학생일 때 학생의 비밀번호를 변경
        if (role.equals(Role.STUDENT)) {
            Student student = studentRepository.findById(jwtTokenProvider.getId(token))
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            // 현재 비밀번호와 입력한 비밀번호의 일치 여부
            if (passwordEncoder.matches(dto.getPassword(), student.getPassword())) {
                throw new CustomException(ErrorCode.DUPLICATED_PASSWORD);
            }
            // 바꾸는 비밀번호와 체크할 비밀번호의 일치 여부
            if (!dto.getPassword().equals(dto.getCheckedPassword())) {
                throw new CustomException(ErrorCode.WRONG_CHECKED_PW);
            }
            // 입력한 비밀번호로 교체
            student.setPassword(dto.getPassword());
            student.encodeStudentPassword(passwordEncoder);
            // 상태를 초기화
            student.setPwStatus(Password.OK);
            studentRepository.save(student);
        // 교사일 때 교사의 비밀번호를 변경
        } else if (role.equals(Role.TEACHER)) {
            Teacher teacher = teacherRepository.findById(jwtTokenProvider.getId(token))
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            // 현재 비밀번호와 입력한 비밀번호의 일치 여부
            if (passwordEncoder.matches(dto.getPassword(), teacher.getPassword())) {
                throw new CustomException(ErrorCode.DUPLICATED_PASSWORD);
            }
            // 바꾸는 비밀번호와 체크할 비밀번호의 일치 여부
            if (!dto.getPassword().equals(dto.getCheckedPassword())) {
                throw new CustomException(ErrorCode.WRONG_CHECKED_PW);
            }
            // 입력한 비밀번호로 교체
            teacher.setPassword(dto.getPassword());
            teacher.encodeTeacherPassword(passwordEncoder);
            // 상태를 초기화
            teacher.setPwStatus(Password.OK);
            teacherRepository.save(teacher);
        }
    }

    @Override
    public void notChangePassword(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Role role = jwtTokenProvider.getRole(token);
        // 비밀번호를 변경하지 않고 싶을 때 상태 업데이트
        if (role.equals(Role.STUDENT)) {
            Student student = studentRepository.findById(jwtTokenProvider.getId(token))
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            student.setPwStatus(Password.OK);
            studentRepository.save(student);
        } else if (role.equals(Role.TEACHER)) {
            Teacher teacher = teacherRepository.findById(jwtTokenProvider.getId(token))
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            teacher.setPwStatus(Password.OK);
            teacherRepository.save(teacher);
        }
    }
}

