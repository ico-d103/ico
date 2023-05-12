package com.ico.api.service.user;

import com.ico.api.dto.user.LoginDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.code.Role;
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
    public String returnStatus(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        if (token != null) {
            Role role = jwtTokenProvider.getRole(token);
            if (role.equals(Role.STUDENT)) {
                Long studentId = jwtTokenProvider.getId(token);
                if (jwtTokenProvider.getNation(token) != null) {
                    return "home";
                } else {
                    Student student = studentRepository.findById(studentId)
                            .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
                    if (student.getNation() != null) {
                        return "check";
                    } else {
                        if (immigrationRepository.findByStudentId(studentId) != null) {
                            return "check";
                        }
                        return "enter";
                    }
                }
            } else if (role.equals(Role.TEACHER)) {
                if (jwtTokenProvider.getNation(token) != null) {
                    return "class/students";
                }
                return "create";
            }
            return "admin";
        }
        return "login";
    }
}

