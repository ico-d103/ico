package com.ico.api.service.student;

import com.ico.api.dto.student.StudentListResDto;
import com.ico.api.dto.student.StudentMyPageResDto;
import com.ico.api.dto.student.StudentResDto;
import com.ico.api.dto.transaction.TransactionColDto;
import com.ico.api.dto.user.AccountDto;
import com.ico.api.dto.user.StudentSignUpRequestDto;
import com.ico.api.service.transaction.TransactionService;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.code.Role;
import com.ico.core.entity.Student;
import com.ico.core.entity.Transaction;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TeacherRepository;
import com.ico.core.repository.TransactionMongoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.text.NumberFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;


/**
 * Student ServiceImpl
 *
 * @author 강교철
 * @author 변윤경
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService{

    private final StudentRepository studentRepository;

    private final TeacherRepository teacherRepository;

    private final PasswordEncoder passwordEncoder;

    private final TransactionService transactionService;

    private final TransactionMongoRepository transactionMongoRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private static final NumberFormat numberFormat = NumberFormat.getInstance(Locale.US);

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

    @Transactional(readOnly = true)
    @Override
    public List<StudentListResDto> findAllStudent(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        List<Student> studentList = studentRepository.findAllByNationId(nationId);
        List<StudentListResDto> resList = new ArrayList<>();
        for (Student student : studentList) {
            resList.add(new StudentListResDto().of(student));
        }
        return resList;
    }

    @Transactional(readOnly = true)
    @Override
    public StudentResDto findStudent(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(() -> {
            log.info("[findStudent] studentId[{}]에 해당하는 학생이 없습니다.", studentId);
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        });
        // 최신순으로 조회
        List<Transaction> transactions = transactionMongoRepository.findAllByFromOrToOrderByIdDesc(String.valueOf(studentId), String.valueOf(studentId));

        // 최신순 날짜 별로 묶어서 순서가 있는 Map 생성
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
        Map<String, List<TransactionColDto>> map = new LinkedHashMap<>();

        for (Transaction transaction : transactions) {

            String date = transaction.getDate().format(formatter);
            int amount = transaction.getFrom().equals(String.valueOf(studentId)) ? -1 * transaction.getAmount() : transaction.getAmount();

            map.putIfAbsent(date, new ArrayList<>());
            map.get(date).add(TransactionColDto.builder()
                            .title(transaction.getTitle())
                            .amount(numberFormat.format(amount))
                    .build());
        }
        return new StudentResDto().of(student, map);
    }

    @Transactional(readOnly = true)
    @Override
    public StudentMyPageResDto findStudentMyPage(HttpServletRequest request) {
        Long studentId = jwtTokenProvider.getId(jwtTokenProvider.parseJwt(request));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        return new StudentMyPageResDto().of(student, student.getNation(), student.getJob());
    }

}
