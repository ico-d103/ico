package com.ico.api.service.stock;

import com.ico.api.dto.stock.MyStockResDto;
import com.ico.api.dto.stock.StockColDto;
import com.ico.api.dto.stock.StockStudentResDto;
import com.ico.api.dto.stock.StockTeacherResDto;
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

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
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
        // 유효성 검사
        Nation nation = validCheck(nationId);

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
        // 유효성 검사
        Nation nation = validCheck(nationId);

        Optional<Invest> invest = investRepository.findByStudentId(studentId);
        log.info("매수 여부 확인");

        MyStockResDto myStock = new MyStockResDto();
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
     * 국가 정보, 투자 종목 여부 검사
     * @param nationId 국가ID
     * @return 국가 객체
     */
    private Nation validCheck(Long nationId){
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
        List<Stock> issues = stockRepository.findAllByNationIdOrderByDateDesc(nationId);
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

