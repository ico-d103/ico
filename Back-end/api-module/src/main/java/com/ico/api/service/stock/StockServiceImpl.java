package com.ico.api.service.stock;

import com.ico.api.dto.stock.StockCreateReqDto;
import com.ico.api.dto.stock.StockListColDto;
import com.ico.api.dto.stock.StockMyColResDto;
import com.ico.api.dto.stock.StockMyResDto;
import com.ico.api.dto.stock.StockUpdateReqDto;
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
import com.ico.core.repository.IssueRepository;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StockRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final StudentRepository studentRepository;
    private final InvestRepository investRepository;
    private final IssueRepository issueRepository;

    private final IssueServiceImpl issueService;
    private final TransactionService transactionService;

    @Transactional
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
        issueService.createIssue(dto.getAmount(), dto.getIssue(), nation, stock);
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

    @Override
    public List<StockMyResDto> findAllStockStudent(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        // 나라의 주식 종목 목록
        List<Stock> stocks = stockRepository.findAllByNationId(nationId);

        List<StockMyResDto> myStocks = new ArrayList<>();

        for (Stock stock : stocks) {
            StockMyResDto myStock = new StockMyResDto();
            myStock.setStockId(stock.getId());
            myStock.setTitle(stock.getTitle());

            // 종목에 대한 투자 내역 조회
            List<Invest> investList = investRepository.findAllByStudentIdAndStockId(studentId, stock.getId());

            if(!investList.isEmpty()){
                List<Issue> issueList = issueRepository.findAllByStockId(stock.getId());
                double lastPrice = issueList.get(issueList.size() - 1).getAmount();
                List<StockMyColResDto> stockList = new ArrayList<>();

                for (Invest invest : investList) {
                    double rate = (invest.getPrice() - lastPrice) / invest.getPrice();
                    stockList.add(new StockMyColResDto().of(invest, rate));
                }
                myStock.setStocklist(stockList);
                myStocks.add(myStock);
            }
        }
        return myStocks;
    }

    @Override
    public void updateStock(HttpServletRequest request, Long stockId, StockUpdateReqDto stockUpdateReqDto) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        Stock stock = stockRepository.findByIdAndNationId(stockId, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STOCK));

        stock.setTitle(stockUpdateReqDto.getTitle());
        stock.setContent(stockUpdateReqDto.getContent());
        stockRepository.save(stock);
    }

    @Override
    public void deleteStock(HttpServletRequest request, Long stockId) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        //국가 유효성 확인
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        Stock stock = stockRepository.findById(stockId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STOCK));

        // 학생들의 투자 내역
        List<Invest> invests = investRepository.findAllByNationId(nationId);

        // TODO : 프론트에서 받아오기
        // 가장 최신 주식 데이터 구하기
        List<Issue> issueList = issueRepository.findAllByNationIdOrderByIdDesc(nationId);
        if(issueList.isEmpty()){
            throw new CustomException(ErrorCode.NOT_FOUND_STOCK);
        }

        // 최신 지수
        double price = issueList.get(0).getAmount();
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

        issueRepository.deleteAll(issueList);

        stockRepository.delete(stock);
    }
}
