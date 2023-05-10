package com.ico.api.service.bank;

import com.ico.api.dto.bank.DepositReqDto;
import com.ico.api.service.transaction.TransactionService;
import com.ico.core.entity.Deposit;
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

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class DepositServiceImpl implements DepositService{
    private final DepositMongoRepository depositMongoRepository;

    private final StudentRepository studentRepository;
    private final InterestRepository interestRepository;
    private final TransactionService transactionService;

    /**
     * 예금 신청
     *
     * @param dto 예치 기간, 예치 금액
     */
    @Transactional
    @Override
    public void createDeposit(DepositReqDto dto) {
        //todo : request
        long studentId = 1;
        long nationId = 99;

        // 예금 기간
        Boolean longPeriod = dto.getLongPeriod();
        // 예치 금액
        int amount = dto.getAmount();

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
            endDate = LocalDateTime.now().plusDays(21);
        }
        else {
            if(interest.getShortPeriod() <= 0){
                throw new CustomException(ErrorCode.LOWER_INTEREST);
            }
            // 적용 이자율
            interestRate = interest.getLongPeriod();
            endDate = LocalDateTime.now().plusDays(7);
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
                .build();
        depositMongoRepository.insert(deposit);


        // 거래 내역 기록
        transactionService.addTransactionWithdraw("은행", studentId, amount, "예금");

    }
}
