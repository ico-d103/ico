package com.ico.api.service.student;

import com.ico.api.dto.license.StudentLicenseResDto;
import com.ico.api.dto.nation.CreditScoreAllReqDto;
import com.ico.api.dto.nation.CreditScoreReqDto;
import com.ico.api.dto.student.StudentAllResDto;
import com.ico.api.dto.student.StudentListResDto;
import com.ico.api.dto.student.StudentMyPageResDto;
import com.ico.api.dto.student.StudentResDto;
import com.ico.api.dto.transaction.TransactionColDto;
import com.ico.api.dto.user.AccountDto;
import com.ico.api.dto.user.StudentSignUpRequestDto;
import com.ico.api.service.License.LicenseServiceImpl;
import com.ico.api.service.S3UploadService;
import com.ico.api.service.transaction.TransactionService;
import com.ico.api.user.JwtTokenProvider;
import com.ico.api.util.Formatter;
import com.ico.core.code.Password;
import com.ico.core.code.Role;
import com.ico.core.document.Deposit;
import com.ico.core.document.Transaction;
import com.ico.core.entity.Invest;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Student;
import com.ico.core.entity.StudentJob;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.DepositMongoRepository;
import com.ico.core.repository.InvestRepository;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TeacherRepository;
import com.ico.core.repository.TransactionMongoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


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

    private final DepositMongoRepository depositMongoRepository;

    private final InvestRepository investRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final S3UploadService s3UploadService;

    private final LicenseServiceImpl licenseService;

    @Override
    public Long signUp(StudentSignUpRequestDto requestDto) {

        Student student = Student.builder()
                .identity(requestDto.getIdentity())
                .password(requestDto.getPassword())
                .name(requestDto.getName())
                .account(0)
                .isFrozen(false)
                .creditScore((short) 700)
                .creditRating((byte) 6)
                .role(Role.STUDENT)
                .salary(0)
                .pwStatus(Password.OK)
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

        List<Student> studentList = studentRepository.findAllByNationIdOrderByNumberAsc(nationId);
        List<StudentListResDto> resList = new ArrayList<>();
        for (Student student : studentList) {
            resList.add(new StudentListResDto().of(student));
        }
        return resList;
    }

    @Transactional(readOnly = true)
    @Override
    public StudentResDto findStudent(Long studentId, int page, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        String studentIdx = String.valueOf(studentId);

        // 페이지 size
        int size = 5;

        // 페이지 번호 갯수
        // page 변수는 인덱스 값으로 적용
        int totalPageNumber = (int) (((transactionMongoRepository.countByFromOrTo(studentIdx, studentIdx) - 1) / size) + 1);
        if (page < 0) {
            log.info("[findStudent] 1 미만의 페이지 번호를 넘겨받은 경우");
            page = 0;
        } else if (page >= totalPageNumber) {
            log.info("[findStudent] 페이지 번호의 최댓값보다 큰 번호를 넘겨받은 경우");
            page = totalPageNumber - 1;
        }

        Student student = studentRepository.findById(studentId).orElseThrow(() -> {
            log.info("[findStudent] studentId[{}]에 해당하는 학생이 없습니다.", studentId);
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        });

        // 아직 나라에 등록하지 않은 학생인 경우
        if (student.getNation() == null) {
            throw new CustomException(ErrorCode.EMPTY_NATION);
        }
        // 다른 나라 학생인 경우
        if (!student.getNation().getId().equals(nationId)) {
            throw new CustomException(ErrorCode.NOT_EQUAL_NATION_TEACHER_STUDENT);
        }

        // 최신순으로 조회
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        Page<Transaction> transactions = transactionMongoRepository.findAllByFromOrTo(studentIdx, studentIdx, pageRequest);

        // 최신순 날짜 별로 묶어서 순서가 있는 Map 생성
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
        Map<String, List<TransactionColDto>> map = new LinkedHashMap<>();

        for (Transaction transaction : transactions) {
            String date = transaction.getDate().format(formatter);
            int amount = transaction.getFrom().equals(String.valueOf(studentId)) ? -1 * transaction.getAmount() : transaction.getAmount();

            map.putIfAbsent(date, new ArrayList<>());
            map.get(date).add(TransactionColDto.builder()
                            .title(transaction.getTitle())
                            .amount(Formatter.number.format(amount))
                    .build());
        }
        // 학생의 자격증 목록 조회
        List<StudentLicenseResDto> licenses = licenseService.getStudentLicenseList(studentId);
        return new StudentResDto().of(student, map, totalPageNumber, licenses);
    }

    @Transactional(readOnly = true)
    @Override
    public StudentMyPageResDto findStudentMyPage(HttpServletRequest request) {
        Long studentId = jwtTokenProvider.getId(jwtTokenProvider.parseJwt(request));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        int depositAmount = 0;
        List<Deposit> depositList = depositMongoRepository.findAllByStudentId(studentId);
        for (Deposit deposit : depositList) {
            depositAmount += deposit.getAmount();
        }

        int investAmount = 0;
        Optional<Invest> invest = investRepository.findByStudentId(studentId);
        if (invest.isPresent()) {
            investAmount = invest.get().getAmount();
        }

        String imgUrl = null;
        StudentJob job;
        if ((job = student.getStudentJob()) != null) {
            imgUrl = s3UploadService.getFileURL(job.getImage());
        }

        return new StudentMyPageResDto().of(student, student.getNation(), student.getStudentJob(), depositAmount, investAmount, imgUrl);
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

        List<Student> studentList = studentRepository.findAllByNationIdOrderByNumberAsc(nationId);
        List<StudentAllResDto> dtoList = new ArrayList<>();
        for (Student student : studentList) {
            dtoList.add(new StudentAllResDto().of(student, student.getStudentJob()));
        }
        return dtoList;
    }

    @Override
    public Byte findStudentCreditRating(HttpServletRequest request) {
        Long studentId = jwtTokenProvider.getId(jwtTokenProvider.parseJwt(request));
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        return student.getCreditRating();
    }

    @Transactional
    @Override
    public void postAllCreditScore(CreditScoreAllReqDto dto, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        List<Student> studentList = studentRepository.findAllByIdIn(dto.getStudentIds());
        if (studentList.isEmpty()) {
            // 나라 id 에 해당하는 학생이 없는 경우
            throw new CustomException(ErrorCode.NATION_NOT_FOUNT_STUDENT);
        }

        for (Student student : studentList) {
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
    }

    @Override
    public Map<String, String> findAccount(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Student student = studentRepository.findById(jwtTokenProvider.getId(token))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Map<String, String> map = new HashMap<>();
        map.put("account", Formatter.number.format(student.getAccount()));

        return map;
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
