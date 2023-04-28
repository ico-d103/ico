package com.ico.api.service;

import com.ico.api.dto.StudentSignUpRequestDto;
import com.ico.core.entity.Role;
import com.ico.core.entity.Student;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService{

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public Long signUp(StudentSignUpRequestDto requestDto) throws Exception {

        Student student = Student.builder()
                .identity(requestDto.getIdentity())
                .password(requestDto.getPassword())
                .name(requestDto.getName())
                .account(0)
                .is_frozen(false)
                .credit_score((byte) 0)
                .role(Role.STUDENT)
                .count((byte) 0)
                .build();

        if (studentRepository.findStudentByIdentity(requestDto.getIdentity()).isPresent()) {
            throw new Exception("이미 존재하는 아이디 입니다.");
        }

        if (!requestDto.getPassword().equals(requestDto.getCheckedPassword())) {
            throw new Exception("비밀번호가 일치하지 않습니다.");
        }

        student.encodeStudentPassword(passwordEncoder);
//        student.addUserAuthority();
        studentRepository.save(student);

        return student.getId();
    }
}
