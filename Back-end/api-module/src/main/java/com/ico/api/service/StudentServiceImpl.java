package com.ico.api.service;

import com.ico.api.dto.AccountDto;
import com.ico.api.dto.StudentSignUpRequestDto;
import com.ico.core.entity.Student;
import com.ico.core.code.Role;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Student ServiceImpl
 *
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService{

    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public Long signUp(StudentSignUpRequestDto requestDto) {

        Student student = Student.builder()
                .identity(requestDto.getIdentity())
                .password(requestDto.getPassword())
                .name(requestDto.getName())
                .account(0)
                .isFrozen(false)
                .creditScore((byte) 0)
                .role(Role.STUDENT)
                .salary(0)
                .build();

        if (teacherRepository.findByIdentity(requestDto.getIdentity()).isPresent()
                || studentRepository.findByIdentity(requestDto.getIdentity()).isPresent()) {
            throw new CustomException(ErrorCode.DUPLICATED_ID);
        }

        if (!requestDto.getPassword().equals(requestDto.getCheckedPassword())) {
            throw new CustomException(ErrorCode.PASSWORD_WRONG);
        }

        student.encodeStudentPassword(passwordEncoder);
        studentRepository.save(student);

        return student.getId();
    }

    @Override
    public void updateAccount(Long id, AccountDto accountDto) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        // 학생의 잔액 업데이트
        student.updateAccount(accountDto.getAmount());
        studentRepository.save(student);

        // todo : 계좌 내역에 추가
    }

}
