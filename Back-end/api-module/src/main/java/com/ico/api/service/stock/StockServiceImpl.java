package com.ico.api.service.stock;

import com.ico.api.dto.stock.StockColDto;
import com.ico.api.dto.stock.StockMyResDto;
import com.ico.api.dto.stock.StockStudentResDto;
import com.ico.api.dto.stock.StockTeacherResDto;
import com.ico.api.dto.stock.StockUploadReqDto;
import com.ico.api.service.transaction.TransactionService;
import com.ico.api.user.JwtTokenProvider;
import com.ico.api.util.Formatter;
import com.ico.core.entity.Invest;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Stock;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.InvestRepository;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StockRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * 투지 이슈 Service
 *
 * @author 변윤경
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService{
    private final StudentRepository studentRepository;
    private final NationRepository nationRepository;
    private final StockRepository stockRepository;
    private final InvestRepository investRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final TransactionService transactionService;

    /**
     * 교사 투자 이슈 목록 조회
     *
     * @return 교사화면의 투자 이슈 정보
     */
    @Override
    public StockTeacherResDto getIssueTeacher(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        // 국가 정보, 투자 종목 여부 유효성 검사
        Nation nation = validCheckNationStock(nationId);

        // 반환값
        StockTeacherResDto res = new StockTeacherResDto();
        res.setStock(nation.getStock());
        res.setTradingStart(nation.getTrading_start());
        res.setTradingEnd(nation.getTrading_end());
        res.setIssue(getIssues(nationId));

        return res;
    }

    /**
     * 학생 투자 이슈 목록 조회
     * @return 학생 화면의 투자 이슈 정보
     */
    @Override
    public StockStudentResDto getIssueStudent(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        // 국가 정보, 투자 종목 여부 유효성 검사
        Nation nation = validCheckNationStock(nationId);

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Optional<Invest> invest = investRepository.findByStudentId(studentId);
        log.info("매수 여부 확인");

        StockMyResDto myStock = new StockMyResDto();
        log.info("학생 매수 정보");

        if(invest.isPresent()){
            log.info("매수 이력 있음");
            myStock.setPrice(invest.get().getPrice());
            myStock.setAmount(invest.get().getAmount());
        }
        else{
            log.info("매수 이력 없음");
            myStock.setPrice(0);
            myStock.setAmount(0);
        }

        // 반환값
        StockStudentResDto res = new StockStudentResDto();
        res.setAccount(student.getAccount());
        res.setStock(nation.getStock());
        res.setTradingStart(nation.getTrading_start());
        res.setTradingEnd(nation.getTrading_end());
        res.setMyStock(myStock);
        res.setIssue(getIssues(nationId));

        return res;
    }

    /**
     * 투자 이슈 등록
     * @param dto 지수, 내일의 투자 이슈
     */
    @Override
    public void uploadIssue(HttpServletRequest request, StockUploadReqDto dto) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        if(nation.getStock() == null || nation.getStock().equals("")){
            log.info("투자 종목이 생성되지 않았습니다.");
            throw new CustomException(ErrorCode.NOT_FOUND_STOCK);
        }

//        if(nation.getTrading_start().isAfter(LocalTime.now()) && nation.getTrading_end().isBefore(LocalTime.now())){
//            log.info("거래시간에는 투자 이슈 등록이 불가능합니다.");
//            throw new CustomException(ErrorCode.NOT_UPLOAD_TIME);
//        }

        double value = dto.getPrice();

        if(dto.getAmount() > 0){
            value += dto.getAmount() / 100.0 * value;
        }
        else{
            value -= Math.abs(dto.getAmount()) / 100.0 * value;
        }

        double res = Math.round(value * 100.0)/100.0;
        // 투지 이슈 등록
        Stock stock = Stock.builder()
                .date(LocalDateTime.now())
                .amount(res)
                .content(dto.getContent())
                .nation(nation)
                .build();
        stockRepository.save(stock);

    }

    /**
     * 투자 종목 삭제
     *
     * @param request
     */
    @Override
    public void deleteStock(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        //국가 유효성 확인 & 주식 존재 여부 확인
        Nation nation = validCheckNationStock(nationId);

        // 학생들의 투자 내역
        List<Invest> invests = investRepository.findAllByNationId(nationId);

        // 가장 최신 주식 데이터 구하기
        List<Stock> stockList = stockRepository.findAllByNationIdOrderByIdDesc(nationId);
        if(stockList.isEmpty()){
            throw new CustomException(ErrorCode.NOT_FOUND_STOCK);
        }

        // 최신 지수
        double price = stockList.get(0).getAmount();
        log.info("매도지수 : " + price);

        // 학생들 매도 일괄 처리
        for(Invest invest : invests){
            long studentId = invest.getStudent().getId();
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

            double purchasePrice = invest.getPrice();
            log.info("매수지수 : " + purchasePrice);

            double changeRate = (price - purchasePrice) / purchasePrice;
            log.info("수익률 : " + changeRate);

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

        stockRepository.deleteAll(stockList);

        // 나라의 투자 정보 삭제
        nation.setTrading_end(null);
        nation.setTrading_start(null);
        nation.setStock(null);
        nationRepository.save(nation);
    }

    /**
     * 국가 정보, 투자 종목 여부 검사
     * @param nationId 국가ID
     * @return 국가 객체
     */
    private Nation validCheckNationStock(Long nationId){
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        // 투자 종목이 없을 시
        if(nation.getStock() == null || nation.getStock().equals("")){
            throw new CustomException(ErrorCode.NOT_FOUND_STOCK);
        }

        return nation;
    }

    /**
     * 투자 이슈 목록
     * @param nationId 국가ID
     * @return 투자 이슈 목록 조회
     */
    private List<StockColDto> getIssues(Long nationId){
        List<StockColDto> issuesRes = new ArrayList<>();
        List<Stock> issues = stockRepository.findAllByNationIdOrderByIdDesc(nationId);
        for(Stock issue : issues){
            StockColDto col = new StockColDto();
            col.setContent(issue.getContent());
            col.setAmount(issue.getAmount());
            col.setDate(issue.getDate().format(Formatter.date));
            issuesRes.add(col);
        }

        return issuesRes;
    }


}

