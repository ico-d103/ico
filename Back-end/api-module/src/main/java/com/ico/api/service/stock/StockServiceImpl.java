package com.ico.api.service.stock;

import com.ico.api.dto.stock.StockCreateReqDto;
import com.ico.api.dto.stock.StockFindAllStudentResDto;
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

import javax.servlet.http.HttpServletRequest;
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
    private final JwtTokenProvider jwtTokenProvider;

    private final NationRepository nationRepository;
    private final StockRepository stockRepository;
    private final StudentRepository studentRepository;
    private final InvestRepository investRepository;
    private final IssueRepository issueRepository;

    private final IssueServiceImpl issueService;
    private final TransactionService transactionService;

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

    @Override
    public StockFindAllStudentResDto findAllStockStudent(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        List<StockListColDto> stocksRes = new ArrayList<>();
        List<Stock> stocks = stockRepository.findAllByNationId(nationId);

        for(Stock stock : stocks){
            StockListColDto col = new StockListColDto();
            col.setId(stock.getId());
            col.setTitle(stock.getTitle());
            stocksRes.add(col);
        }

        List<StockMyResDto> myStocks = new ArrayList<>();
        List<Invest> invests = investRepository.findAllByStudentId(studentId);
        // 투자 목록에서 주식 정보와 현재 가격 수익률 찾기
        for(Invest invest: invests){
            boolean not_stock = true;
            for(StockMyResDto myStock : myStocks){
                if(myStock.getStockId().equals(invest.getStock().getId())){
                    not_stock = false;
                    double rate = (invest.getPrice() - myStock.getLastPrice())/invest.getPrice();
                    myStock.getStocklist().add(new StockMyColResDto().of(invest, rate));
                    break;
                }
            }
            if(not_stock){
                for(Stock stock: stocks){
                    if(stock.getId().equals(invest.getStock().getId())){
                        StockMyResDto myStock = new StockMyResDto();
                        myStock.setStockId(stock.getId());
                        myStock.setTitle(stock.getTitle());
                        Optional<Issue> lastIssueOpt = issueRepository.findAllByNationIdOrderByIdDesc(nationId).stream().findFirst();
                        if(lastIssueOpt.isPresent()){
                            Issue latestIssue = lastIssueOpt.get();
                            double lastPrice = latestIssue.getAmount();
                            myStock.setLastPrice(lastPrice);
                            double rate = (invest.getPrice() - lastPrice)/invest.getPrice();
                            List<StockMyColResDto> stockList = new ArrayList<>();
                            stockList.add(new StockMyColResDto().of(invest, rate));
                            myStock.setStocklist(stockList);
                            myStocks.add(myStock);
                        }
                    }
                }

            }
        }
        StockFindAllStudentResDto res = new StockFindAllStudentResDto();
        res.setMyStocks(myStocks);
        res.setStockList(stocksRes);

        return res;
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
