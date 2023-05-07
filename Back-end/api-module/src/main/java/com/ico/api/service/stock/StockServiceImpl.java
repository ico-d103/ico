package com.ico.api.service.stock;

import com.ico.api.dto.stock.StockColDto;
import com.ico.api.dto.stock.StockResTeacherDto;
import com.ico.api.service.transaction.TransactionServiceImpl;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Stock;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 변윤경
 */
@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService{

    private final NationRepository nationRepository;
    private final StockRepository stockRepository;
    private final TransactionServiceImpl transactionService;

    /**
     * 교사 투자 이슈 목록 조회
     *
     * @return 교사화면의 투자 이슈 정보
     */
    @Override
    public StockResTeacherDto getIssueTeacher() {
        long nationId = 99;
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        // 투자 종목이 없을 시
        if(nation.getStock() == null || nation.getStock().equals("")){
            throw new CustomException(ErrorCode.NOT_FOUND_STOCK);
        }

        // issue 객체
        List<StockColDto> issuesRes = new ArrayList<>();
        List<Stock> issues = stockRepository.findAllByNationIdOrderByDateDesc(nationId);
        for(Stock issue : issues){
            StockColDto col = new StockColDto();
            col.setContent(issue.getContent());
            col.setAmount(issue.getAmount());
            col.setDate(issue.getDate().format(transactionService.dayFormatter));
            issuesRes.add(col);
        }

        // 반환값
        StockResTeacherDto res = new StockResTeacherDto();
        res.setStock(nation.getStock());
        res.setTradingStart(nation.getTrading_start());
        res.setTradingEnd(nation.getTrading_end());
        res.setIssue(issuesRes);

        return res;
    }
}

