package com.ico.api.service.stock;

import com.ico.api.service.transaction.TransactionService;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.entity.Invest;
import com.ico.core.entity.Issue;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Stock;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.InvestRepository;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.IssueRepository;
import com.ico.core.repository.StockRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

/**
 * @author 변윤경
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class InvestServiceImpl implements InvestService{
    private final IssueRepository issueRepository;
    private final StudentRepository studentRepository;
    private final InvestRepository investRepository;
    private final NationRepository nationRepository;
    private final TransactionService transactionService;
    private final JwtTokenProvider jwtTokenProvider;
    private final StockRepository stockRepository;

    /**
     * 주식 매수
     *
     * @param price 현재 지수
     * @param amount 매수 금액
     */
    @Override
    public void buyStock(HttpServletRequest request, double price, int amount, Long stockId) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        // 학생 유효 검사
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        log.info("확생 유효 검사 완료");

        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STOCK));

        LocalTime currentTime = LocalTime.now();
        // TODO : 거래 가능 시간 확인
//        if(currentTime.isAfter(nation.getTrading_end()) || currentTime.isBefore(nation.getTrading_start())){
//            throw new CustomException(ErrorCode.NOT_TRADING_TIME);
//        }
//        log.info("거래 가능 시간");

        // 투자 종목 여부 유효성 검사
        Stock stock = stockRepository.findById(stockId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STOCK));

        log.info("[buyStock] 주식 매수 시간 LocalTime : {}", currentTime);
        log.info("[buyStock] 주식 매수 시간 LocalDateTime : {}", LocalDateTime.now());


        // 잔액 확인
        if(amount > student.getAccount()){
            throw new CustomException(ErrorCode.LOW_BALANCE);
        }
        log.info("구매 가능 잔고");

        // 금액 지불
        student.setAccount(student.getAccount() - amount);
        studentRepository.save(student);

        log.info("[nation] : {}", nation.getId());
        // 투자 내역 저장
        Invest invest = Invest.builder()
                .amount(amount)
                .price(price)
                .date(LocalDateTime.now())
                .student(student)
                .nation(nation)
                .stock(stock)
                .build();
        investRepository.save(invest);

        // 거래 내역 추가
        transactionService.addTransactionWithdraw(nation.getTitle() + " 증권", studentId, amount, stock.getTitle() + " 지수");

    }

    /**
     * 주식 매도
     */
    @Transactional
    @Override
    public void sellStock(HttpServletRequest request, Long stockId) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        // 학생 유효검사
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 매수 내역 확인
        Invest invest = investRepository.findByStudentIdAndStockId(studentId, stockId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_INVEST));

        Nation nation = nationRepository.findById(student.getNation().getId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STOCK));
        // TODO : 거래 가능 시간 확인
//        LocalTime currentTime = LocalTime.now();
//        if(currentTime.isAfter(nation.getTrading_end()) || currentTime.isBefore(nation.getTrading_start())){
//            throw new CustomException(ErrorCode.NOT_TRADING_TIME);
//        }
        // 투자 종목 여부 유효성 검사
        Stock stock = stockRepository.findById(stockId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STOCK));

        // 국가의 주식 데이터가 없을 경우
        List<Issue> issueList = issueRepository.findAllByNationIdOrderByIdDesc(nationId);
        if(issueList.isEmpty()){
            throw new CustomException(ErrorCode.NOT_FOUND_STOCK);
        }

        // 수익률 계산
        double price = issueList.get(0).getAmount();
        log.info("매도지수 : " + price);

        double purchasePrice = invest.getPrice();
        log.info("매수지수 : " + purchasePrice);

        double changeRate = (price - purchasePrice) / purchasePrice;
        log.info("수익률 : " + changeRate);

        // 매도 금액 계산(소수점 내림 적용)
        int amount = invest.getAmount();
        int salePrice = (int) (amount + amount * changeRate);
        log.info("매도 이익 : " + salePrice);

        // 매도 금액 입금
        student.setAccount(student.getAccount() + salePrice);
        studentRepository.save(student);

        // 거래 내역 기록
        StringBuilder title = new StringBuilder("수익률 : ");
        title.append((int)(changeRate * 100)).append("%");
        transactionService.addTransactionDeposit(studentId, nation.getTitle()+" 증권", salePrice, String.valueOf(title));

        // 매수 이력 삭제
        investRepository.delete(invest);
    }
}
