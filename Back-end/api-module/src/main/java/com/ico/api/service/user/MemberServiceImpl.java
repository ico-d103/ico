package com.ico.api.service.user;

import com.ico.api.dto.user.LoginDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.code.Role;
import com.ico.core.code.Status;
import com.ico.core.entity.Student;
import com.ico.core.entity.Teacher;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.ImmigrationRepository;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
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

    @Override
    public Map<String, Object> returnStatus(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Role role = jwtTokenProvider.getRole(token);
        Long memberId = jwtTokenProvider.getId(token);
        if (role.equals(Role.STUDENT)) {
            if (jwtTokenProvider.getNation(token) != null) {
                // 학생의 토큰에 NationId 값이 있을 때
                return Map.of("status", "approved", "role", role);
            } else {
                Student student = studentRepository.findById(memberId)
                        .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
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
            if (jwtTokenProvider.getNation(token) != null) {
                // 교사 토큰에 NationId가 있을 때
                return Map.of("status", "approved", "role", role);
            } else {
                Teacher teacher = teacherRepository.findById(memberId)
                        .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
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
}

