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

    private final TransactionService transactionService;

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

    /**
     * 학생 계좌 잔액 수정
     *
     * @param student 학생 객체
     * @param amount 지급/차감할 금액
     */
    private void updateAccount(Student student, int amount){
        if(student.getAccount() + amount < 0){
            throw new CustomException(ErrorCode.LOW_BALANCE);
        }
        student.setAccount(student.getAccount() + amount);
    }

    /**
     * 선생님이 임의로 돈 지급/차감
     *
     * @param id 학생 아이디
     * @param accountDto 학생
     */
    @Override
    public void teacherUpdateAccount(Long id, AccountDto accountDto){
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        int amount = accountDto.getAmount();

        // 잔액이 수정된 학생 객체
        updateAccount(student, amount);

        // 거래 내역 등록
        if(amount < 0){
            transactionService.addTransactionWithdraw("선생님", id, amount, accountDto.getTitle());
        }
        else{
            transactionService.addTransactionDeposit(id, "선생님", amount, accountDto.getTitle());
        }

        // 수정된 학생 객체 저장
        studentRepository.save(student);
    }

}
