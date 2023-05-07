package com.ico.api.service.stock;

import com.ico.api.service.transaction.TransactionService;
import com.ico.core.entity.Invest;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.InvestRepository;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * @author 변윤경
 */
@Service
@RequiredArgsConstructor
public class InvestServiceImpl implements InvestService{
    private final StudentRepository studentRepository;
    private final InvestRepository investRepository;
    private final NationRepository nationRepository;
    private final TransactionService transactionService;

    /**
     * 주식 매수
     *
     * @param price 현재 지수
     * @param amount 매수 금액
     */
    @Override
    public void buyStock(int price, int amount) {
        long id = 1;
        // 학생 유효 검사
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 거래 가능 시간 확인
        Nation nation = nationRepository.findById(student.getNation().getId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STOCK));
        LocalTime currentTime = LocalTime.now();
        if(currentTime.isAfter(nation.getTrading_end()) || currentTime.isBefore(nation.getTrading_start())){
            throw new CustomException(ErrorCode.NOT_TRADING_TIME);
        }

        // 매수 여부 확인
        investRepository.findByStudentId(student.getId()).ifPresent(i -> {
            throw new CustomException(ErrorCode.ALREADY_HAVE_STOCK);
        });

        // 잔액 확인
        if(amount > student.getAccount()){
            throw new CustomException(ErrorCode.LOW_BALANCE);
        }

        // 금액 지불
        student.setAccount(student.getAccount() - amount);
        studentRepository.save(student);

        // 투자 내역 저장
        Invest invest = Invest.builder()
                .amount(amount)
                .price(price)
                .date(LocalDateTime.now())
                .student(student)
                .build();
        investRepository.save(invest);

        // 거래 내역 추가
        transactionService.addTransactionWithdraw(nation.getTitle() + " 증권", student.getId(), amount, nation.getStock() + " 지수 " + price);
    }
}
