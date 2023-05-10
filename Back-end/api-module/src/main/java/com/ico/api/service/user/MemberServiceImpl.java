package com.ico.api.service.user;

import com.ico.api.dto.user.LoginDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.code.ImmigrationType;
import com.ico.core.entity.Student;
import com.ico.core.entity.Teacher;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    @Override
    public Map<String, String> login(LoginDto members) {
        Optional<Teacher> teacher = teacherRepository.findByIdentity(members.getIdentity());
        Optional<Student> student = studentRepository.findByIdentity(members.getIdentity());
        String type = "null";

        if (teacher.isPresent()) {
            // 받은 비밀번호를 인코딩하면 다르게 인코딩(암호화)돼서 비교가 안됌
            if (!passwordEncoder.matches(members.getPassword(), teacher.get().getPassword())) {       // DB의 인코딩 비밀번호를 복호화해서 비교함
                throw new CustomException(ErrorCode.PASSWORD_WRONG);
            }
        } else if (student.isPresent()) {
            ImmigrationType iType = student.get().getImmigrationType();
            if (!passwordEncoder.matches(members.getPassword(), student.get().getPassword())) {
                throw new CustomException(ErrorCode.PASSWORD_WRONG);
            }
            else {
                if (iType != null) {
                    type = student.get().getImmigrationType().toString();
                }
                else {
                    type = "null";
                }
            }
        }
        return Map.of("token", jwtTokenProvider.generateJwtToken(members), "status", type);
    }

    @Override
    public boolean duplicated(String identity) {
        boolean teacher = teacherRepository.findByIdentity(identity).isPresent();
        boolean student = studentRepository.findByIdentity(identity).isPresent();
        return teacher || student;
    }
}

