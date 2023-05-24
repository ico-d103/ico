package com.ico.api.service.bank;

import com.ico.api.dto.bank.DepositReqDto;
import com.ico.api.service.transaction.TransactionService;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.document.Deposit;
import com.ico.core.entity.Interest;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.DepositMongoRepository;
import com.ico.core.repository.InterestRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

/**
 * 예금 Service
 *
 * @author 변윤경
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class DepositServiceImpl implements DepositService{
    private final DepositMongoRepository depositMongoRepository;
    private final StudentRepository studentRepository;
    private final InterestRepository interestRepository;
    private final TransactionService transactionService;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 예금 신청
     *
     * @param dto 예치 기간, 예치 금액
     */
    @Transactional
    @Override
    public void createDeposit(HttpServletRequest request, DepositReqDto dto) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        // 예금 기간
        Boolean longPeriod = dto.getLongPeriod();

        // 예치 금액
        int amount = dto.getAmount();

        if(depositMongoRepository.findByStudentId(studentId).isPresent()){
            throw new CustomException(ErrorCode.ALREADY_EXIST_DEPOSIT);
        }

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 신용 등급 확인
        Interest interest = interestRepository.findByNationIdAndCreditRating(nationId, student.getCreditRating())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_INTEREST));

        // 잔액 확인
        if(student.getAccount() < amount){
            throw new CustomException(ErrorCode.LOW_BALANCE);
        }

        // 이자율이 0이상인지 확인
        byte interestRate;
        LocalDateTime endDate;
        if(longPeriod){
            if(interest.getLongPeriod() <= 0){
                throw new CustomException(ErrorCode.LOWER_INTEREST);
            }
            // 적용 이자율
            interestRate = interest.getLongPeriod();
//            endDate = LocalDateTime.now().plusDays(21);
//            endDate = LocalDateTime.now().plusHours(1);
            endDate = LocalDateTime.now().plusSeconds(5);
        }
        else {
            if(interest.getShortPeriod() <= 0){
                throw new CustomException(ErrorCode.LOWER_INTEREST);
            }
            // 적용 이자율
            interestRate = interest.getShortPeriod();
//            endDate = LocalDateTime.now().plusDays(7);
            endDate = LocalDateTime.now().plusSeconds(5);
        }

        // 예금 가격 출금
        student.setAccount(student.getAccount() - amount);
        studentRepository.save(student);

        // 예금 내역 db에 추가
        Deposit deposit = Deposit.builder()
                .studentId(student.getId())
                .interest(interestRate)
                .endDate(endDate)
                .creditRating(student.getCreditRating())
                .amount(dto.getAmount())
                .build();
        depositMongoRepository.insert(deposit);


        // 거래 내역 기록
        transactionService.addTransactionWithdraw("은행", studentId, amount, "예금");

    }

    /**
     * 예금 중도 해지, 수령
     */
    @Transactional
    @Override
    public void deleteDeposit(HttpServletRequest request) {
        Long studentId = jwtTokenProvider.getId(jwtTokenProvider.parseJwt(request));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 예금 신청 내역 확인
        Deposit deposit = depositMongoRepository.findByStudentId(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNT_DEPOSIT));

        // 오늘 날짜
        LocalDateTime now = LocalDateTime.now();

        //입금 금액
        int inputAmount = deposit.getAmount();
        // 거래 내역 타이틀
        String title;

        // 중도 해지
//        if(now.toLocalDate().isBefore(deposit.getEndDate().toLocalDate())){
        if(now.isBefore(deposit.getEndDate())){
            title = "예금 중도 해지";
        }
        else{
            title = "예금 수령 " + deposit.getInterest() +" %";
            inputAmount += inputAmount * deposit.getInterest() / 100;
        }

        // 계좌 잔고 변경
        student.setAccount(student.getAccount() + inputAmount);
        studentRepository.save(student);

        // 거래 내역 기록
        transactionService.addTransactionDeposit(studentId, "은행", inputAmount, title);

        // 예금 신청 내역 삭제
        depositMongoRepository.delete(deposit);
    }
}
