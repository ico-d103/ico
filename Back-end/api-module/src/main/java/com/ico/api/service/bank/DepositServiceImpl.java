package com.ico.api.service.bank;

import com.ico.api.dto.bank.DepositReqDto;
import com.ico.api.service.transaction.TransactionService;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.entity.Deposit;
import com.ico.core.entity.DepositProduct;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.DepositRepository;
import com.ico.core.repository.DepositProductRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
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
    private final DepositRepository depositRepository;
    private final StudentRepository studentRepository;
    private final TransactionService transactionService;
    private final JwtTokenProvider jwtTokenProvider;
    private final DepositProductRepository depositProductRepository;
    private final DepositProductServiceImpl depositProductService;

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

        DepositProduct depositProduct = depositProductRepository.findByIdAndNationId(dto.getId(), nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_DEPOSIT_PRODUCT));

        // 예치 금액
        int amount = dto.getAmount();

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 신용 등급 확인
        Byte interestRate = depositProductService.getMyDepositInterest(student.getCreditRating(), depositProduct);

        // 잔액 확인
        if(student.getAccount() < amount){
            throw new CustomException(ErrorCode.LOW_BALANCE);
        }

        // 이자율이 0이상인지 확인
        LocalDateTime endDate;
        if(interestRate <= 0){
            throw new CustomException(ErrorCode.LOWER_INTEREST);
        }
        else{
            endDate = LocalDateTime.now().plusDays(depositProduct.getPeriod());
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
                .title(depositProduct.getTitle())
                .depositProductId(depositProduct.getId())
                .number(student.getNumber())
                .name(student.getName())
                .build();
        depositRepository.save(deposit);


        // 거래 내역 기록
        transactionService.addTransactionWithdraw("은행", studentId, amount, depositProduct.getTitle() + "예금");

    }

    /**
     * 예금 중도 해지, 수령
     * TODO: 학생이 예금 여러 개 가질 수 있으므로 로직 수정 필요
     */
    @Transactional
    @Override
    public void deleteDeposit(HttpServletRequest request, Long depositId) {
        Long studentId = jwtTokenProvider.getId(jwtTokenProvider.parseJwt(request));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 예금 신청 내역 확인 (학생 본인 확인 포함)
        Deposit deposit = depositRepository.findByIdAndStudentId(depositId, studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_DEPOSIT));

        // 오늘 날짜
        LocalDate now = LocalDate.now();

        //입금 금액
        int inputAmount = deposit.getAmount();
        // 거래 내역 타이틀
        String title;

        // 중도 해지
//        if(now.toLocalDate().isBefore(deposit.getEndDate().toLocalDate())){
        if(now.isBefore(deposit.getEndDate().toLocalDate())){
            // todo :  단어 순화하기
            title = "예금 중도 해지";
        }
        else{
            // todo :  단어 순화하기
            title = "예금 만기 수령 " + deposit.getInterest() + "%";
            inputAmount += inputAmount * deposit.getInterest() / 100;
        }

        // 계좌 잔고 변경
        student.setAccount(student.getAccount() + inputAmount);
        studentRepository.save(student);

        // 거래 내역 기록
        transactionService.addTransactionDeposit(studentId, "은행", inputAmount, title);

        // 예금 신청 내역 삭제
        depositRepository.delete(deposit);
    }
}
