package com.ico.api.service.stock;

import com.ico.api.dto.stock.StockCreateReqDto;
import com.ico.api.dto.stock.StockListColDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Stock;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * @author 변윤경
 */

@Slf4j
@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService{
    private final JwtTokenProvider jwtTokenProvider;
    private final NationRepository nationRepository;
    private final StockRepository stockRepository;
    private final IssueServiceImpl issueService;

    @Override
    public void createStock(HttpServletRequest request, StockCreateReqDto dto) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NATION));

        // 투자 종목 등록
        Stock stock = Stock.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .nation(nation)
                .build();
        stockRepository.save(stock);

        // 이슈 등록
        issueService.createIssue(dto.getAmount(), dto.getIssue(), nation);
    }

    @Override
    public List<StockListColDto> findAllStock(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        List<StockListColDto> stocksRes = new ArrayList<>();
        List<Stock> stocks = stockRepository.findAllByNationId(nationId);

        for(Stock stock : stocks){
            StockListColDto col = new StockListColDto();
            col.setId(stock.getId());
            col.setTitle(stock.getTitle());
            stocksRes.add(col);
        }

        return stocksRes;
    }
}
