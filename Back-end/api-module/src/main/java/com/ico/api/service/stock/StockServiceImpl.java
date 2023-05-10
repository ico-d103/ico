package com.ico.api.service.stock;

import com.ico.api.dto.stock.StockMyResDto;
import com.ico.api.dto.stock.StockColDto;
import com.ico.api.dto.stock.StockStudentResDto;
import com.ico.api.dto.stock.StockTeacherResDto;
import com.ico.api.dto.stock.StockUploadReqDto;
import com.ico.core.entity.Invest;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Stock;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.InvestRepository;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
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

    private final NationRepository nationRepository;
    private final StockRepository stockRepository;
    private final InvestRepository investRepository;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

    /**
     * 교사 투자 이슈 목록 조회
     *
     * @return 교사화면의 투자 이슈 정보
     */
    @Override
    public StockTeacherResDto getIssueTeacher() {
        long nationId = 99;
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
    public StockStudentResDto getIssueStudent() {
        long nationId = 99;
        long studentId = 1;

        // 국가 정보, 투자 종목 여부 유효성 검사
        Nation nation = validCheckNationStock(nationId);

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
    public void uploadIssue(StockUploadReqDto dto) {
        long nationId = 99;
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        if(nation.getStock() == null || nation.getStock().equals("")){
            log.info("투자 종목이 생성되지 않았습니다.");
            throw new CustomException(ErrorCode.NOT_FOUND_STOCK);
        }

        if(nation.getTrading_start().isAfter(LocalTime.now()) && nation.getTrading_end().isBefore(LocalTime.now())){
            log.info("거래시간에는 투자 이슈 등록이 불가능합니다.");
            throw new CustomException(ErrorCode.NOT_UPLOAD_TIME);
        }

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
            col.setDate(issue.getDate().format(formatter));
            issuesRes.add(col);
        }

        return issuesRes;
    }


}

