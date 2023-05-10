package com.ico.api.service.student;

import com.ico.api.dto.nation.CreditScoreReqDto;
import com.ico.api.dto.student.StudentAllResDto;
import com.ico.api.dto.student.StudentListResDto;
import com.ico.api.dto.student.StudentMyPageResDto;
import com.ico.api.dto.student.StudentResDto;
import com.ico.api.dto.transaction.TransactionColDto;
import com.ico.api.dto.user.AccountDto;
import com.ico.api.dto.user.StudentSignUpRequestDto;
import com.ico.api.service.transaction.TransactionService;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.code.Role;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Student;
import com.ico.core.entity.Transaction;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
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
    private final NationRepository nationRepository;

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
    @Transactional
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

    @Override
    public void postCreditScore(Long studentId, CreditScoreReqDto dto, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        // 나라의 신용점수 등락폭에 맞게 신용점수 부여
        if (dto.getType()) {
            student.setCreditScore(getTotalCreditScore(student.getCreditScore(), nation.getCredit_up()));
        } else {
            student.setCreditScore(getTotalCreditScore(student.getCreditScore(),  -1 * nation.getCredit_down()));
        }

        // 신용점수에 맞는 신용등급 부여
        student.setCreditRating(checkCreditRating(student.getCreditScore()));

        studentRepository.save(student);
    }

    @Override
    public void suspendAccount(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if (student.isFrozen()) {
            log.info("[suspendAccount] 이미 학생의 계좌가 정지된 경우");
            throw new CustomException(ErrorCode.ALREADY_SUSPEND_ACCOUNT);
        }

        student.setFrozen(true);
        studentRepository.save(student);
    }

    @Override
    public void releaseAccount(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if (!student.isFrozen()) {
            log.info("[suspendAccount] 이미 학생의 계좌가 정지 해제된 경우");
            throw new CustomException(ErrorCode.ALREADY_RELEASE_ACCOUNT);
        }

        student.setFrozen(false);
        studentRepository.save(student);
    }

    @Transactional(readOnly = true)
    @Override
    public List<StudentAllResDto> findListStudent(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        List<Student> studentList = studentRepository.findAllByNationId(nationId);
        List<StudentAllResDto> dtoList = new ArrayList<>();
        for (Student student : studentList) {
            dtoList.add(new StudentAllResDto().of(student, student.getJob()));
        }
        return dtoList;
    }

    /**
     * 신용점수 부여 시 올바른 범위 내의 신용점수 부여
     *
     * @param studentCreditScore
     * @param creditUpDown
     * @return
     */
    private short getTotalCreditScore(int studentCreditScore, int creditUpDown) {
        int totalScore = studentCreditScore + creditUpDown;
        if (totalScore < 0) {
            return 0;
        } else if (totalScore > 1000) {
            return 1000;
        }
        return (short) totalScore;
    }

    /**
     * 신용점수에 맞는 신용등급 부여
     *
     * @param score
     * @return
     */
    private byte checkCreditRating(int score) {
        if (score >= 900) {
            return 1;
        } else if (score >= 870) {
            return 2;
        } else if (score >= 840) {
            return 3;
        } else if (score >= 805) {
            return 4;
        } else if (score >= 750) {
            return 5;
        } else if (score >= 655) {
            return 6;
        } else if (score >= 600) {
            return 7;
        } else if (score >= 517) {
            return 8;
        } else if (score >= 445) {
            return 9;
        } else {
            return 10;
        }
    }

}
