package com.ico.api.service.bank;

import com.ico.api.service.transaction.TransactionService;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.document.Saving;
import com.ico.core.entity.SavingProduct;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.SavingMongoRepository;
import com.ico.core.repository.SavingProductRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.time.DayOfWeek;
import java.time.LocalDateTime;

/**
 * 적금 신청/해지/수령
 *
 * @author 변윤경
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SavingServiceImpl implements SavingService{
    private final JwtTokenProvider jwtTokenProvider;
    private final SavingProductRepository savingProductRepository;
    private final StudentRepository studentRepository;
    private final TransactionService transactionService;
    private final SavingMongoRepository savingMongoRepository;
    private final SavingProductServiceImpl savingProductService;

    @Transactional
    @Override
    public void createSaving(HttpServletRequest request, Long savingProductId) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        SavingProduct savingProduct = savingProductRepository.findByIdAndNationId(savingProductId, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_SAVING_PRODUCT));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Byte interestRate = savingProductService.getMySavingInterest(student.getCreditRating(), savingProduct);

        int amount = savingProduct.getAmount();
        DayOfWeek day = LocalDateTime.now().getDayOfWeek();

        // 잔액 확인
        if(student.getAccount() < amount){
            throw new CustomException(ErrorCode.LOW_BALANCE);
        }

        // 이자율이 0이상인지 확인
        if(interestRate <= 0){
            throw new CustomException(ErrorCode.LOWER_INTEREST);
        }

        student.setAccount(student.getAccount() - amount);
        studentRepository.save(student);

        Saving saving = Saving.builder()
                .studentId(studentId)
                .interest(interestRate)
                .totalCount(savingProduct.getCount())
                .count((byte) 1)
                .creditRating(student.getCreditRating())
                .amount(savingProduct.getAmount())
                .day(day)
                .title(savingProduct.getTitle())
                .savingProductId(savingProductId)
                .number(student.getNumber())
                .name(student.getName())
                .build();
        savingMongoRepository.insert(saving);

        transactionService.addTransactionWithdraw("은행", studentId, amount, savingProduct.getTitle() + "적금");
    }

    @Transactional
    @Override
    public void deleteSaving(HttpServletRequest request, String savingId) {
        Long studentId = jwtTokenProvider.getId(jwtTokenProvider.parseJwt(request));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Saving saving = savingMongoRepository.findByIdAndStudentId(savingId, studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_SAVING));

        // 총 납입 금액
        int inputAmount = saving.getAmount() * saving.getCount();
        String title;

        // 납입 횟수가 미달이면
        if(saving.getCount() < saving.getTotalCount()){
            // todo :  단어 순화하기
            title = "적금 중도 해지";
        }
        else{
            // todo :  단어 순화하기
            title = "적금 만기 수령 " + saving.getInterest() + "%";
            // todo : 수식 이후에 변환하기
            inputAmount += inputAmount;
            }
            // 계좌 잔고 변경
            student.setAccount(student.getAccount() + inputAmount);
            studentRepository.save(student);

            // 거래 내역 기록
            transactionService.addTransactionDeposit(studentId, "은행", inputAmount, title);

            // 적금 삭제
            savingMongoRepository.delete(saving);
    }
}
