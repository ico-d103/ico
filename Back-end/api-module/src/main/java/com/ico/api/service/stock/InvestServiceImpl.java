package com.ico.api.service.stock;

import com.ico.api.service.transaction.TransactionService;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.entity.Invest;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.InvestRepository;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * @author 변윤경
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class InvestServiceImpl implements InvestService{
    private final StudentRepository studentRepository;
    private final InvestRepository investRepository;
    private final NationRepository nationRepository;
    private final TransactionService transactionService;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 주식 매수
     *
     * @param price 현재 지수
     * @param amount 매수 금액
     */
    @Override
    public void buyStock(HttpServletRequest request, int price, int amount) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        // 학생 유효 검사
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        log.info("확생 유효 검사 완료");

        // 거래 가능 시간 확인
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STOCK));
        LocalTime currentTime = LocalTime.now();
        if(currentTime.isAfter(nation.getTrading_end()) || currentTime.isBefore(nation.getTrading_start())){
            throw new CustomException(ErrorCode.NOT_TRADING_TIME);
        }
        log.info("거래 가능 시간");

        // 매수 여부 확인
        investRepository.findByStudentId(studentId).ifPresent(i -> {
            throw new CustomException(ErrorCode.ALREADY_HAVE_STOCK);
        });
        log.info("매수 여부 확인");

        // 잔액 확인
        if(amount > student.getAccount()){
            throw new CustomException(ErrorCode.LOW_BALANCE);
        }
        log.info("구매 가능 잔고");

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
        transactionService.addTransactionWithdraw(nation.getTitle() + " 증권", studentId, amount, nation.getStock() + " 지수 " + price);
    }
}
