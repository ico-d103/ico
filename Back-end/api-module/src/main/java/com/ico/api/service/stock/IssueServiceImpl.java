package com.ico.api.service.stock;

import com.ico.api.dto.stock.IssueColDto;
import com.ico.api.dto.stock.IssueStudentResDto;
import com.ico.api.dto.stock.IssueTeacherResDto;
import com.ico.api.dto.stock.IssueUploadReqDto;
import com.ico.api.dto.stock.StockMyColResDto;
import com.ico.api.service.transaction.TransactionService;
import com.ico.api.user.JwtTokenProvider;
import com.ico.api.util.Formatter;
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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 투지 이슈 Service
 *
 * @author 변윤경
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class IssueServiceImpl implements IssueService {
    private final StudentRepository studentRepository;
    private final NationRepository nationRepository;
    private final IssueRepository issueRepository;
    private final InvestRepository investRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final TransactionService transactionService;
    private final StockRepository stockRepository;

    /**
     * 교사 투자 이슈 목록 조회
     *
     * @return 교사화면의 투자 이슈 정보
     */
    @Override
    public IssueTeacherResDto getIssueTeacher(HttpServletRequest request, Long stockId) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        // 국가 정보
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        // 투자 종목 여부 유효성 검사
        Stock stock = stockRepository.findById(stockId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STOCK));

        // 반환값
        IssueTeacherResDto res = new IssueTeacherResDto();
        res.setStock(stock.getTitle());
        res.setContent(stock.getContent());
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
    public IssueStudentResDto getIssueStudent(HttpServletRequest request, Long stockId) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        // 국가 정보 유효성 검사
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 투자 종목 여부 유효성 검사
        Stock stock = stockRepository.findById(stockId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STOCK));

        List<Invest> invests = investRepository.findAllByStudentIdAndStockId(studentId, stockId);
        log.info("매수 여부 확인");

        List<StockMyColResDto> myStocks = new ArrayList<StockMyColResDto>();
        log.info("학생 매수 정보");

        List<IssueColDto> issues = getIssues(nationId);

        if(!invests.isEmpty()){
            log.info("매수 이력 있음");
            for (Invest invest : invests){
                double rate = (invest.getPrice() - issues.get(0).getAmount())/invest.getPrice();
                myStocks.add(new StockMyColResDto().of(invest, rate));
            }

        }

        // 반환값
        IssueStudentResDto res = new IssueStudentResDto();
        res.setAccount(student.getAccount());
        res.setStock(stock.getTitle());
        res.setContent(stock.getContent());
        res.setTradingStart(nation.getTrading_start());
        res.setTradingEnd(nation.getTrading_end());
        res.setMyStocks(myStocks);
        res.setIssue(issues);

        return res;
    }

    /**
     * 투자 이슈 등록
     * @param dto 지수, 내일의 투자 이슈
     */
    @Override
    public void uploadIssue(HttpServletRequest request, IssueUploadReqDto dto, Long stockId) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        // 투자 종목 여부 유효성 검사
        Stock stock = stockRepository.findById(stockId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STOCK));

        // TODO : 거래 시간 시 투자 종목 이슈 등록 불가
//        if(nation.getTrading_start().isAfter(LocalTime.now()) && nation.getTrading_end().isBefore(LocalTime.now())){
//            log.info("거래시간에는 투자 이슈 등록이 불가능합니다.");
//            throw new CustomException(ErrorCode.NOT_UPLOAD_TIME);
//        }

        // 투지 이슈 등록
        Issue issue = Issue.builder()
                .date(LocalDateTime.now())
                .amount(dto.getPrice())
                .content(dto.getContent())
                .nation(nation)
                .stock(stock)
                .build();
        issueRepository.save(issue);

    }

    /**
     * 이슈 생성
     * @param amount
     * @param content
     * @param nation
     * @param stock
     */
    public void createIssue(double amount, String content, Nation nation, Stock stock){
        Issue issue = Issue.builder()
                .date(LocalDateTime.now())
                .amount(amount)
                .stock(stock)
                .content(content)
                .nation(nation)
                .build();
        issueRepository.save(issue);
    }


    /**
     * 투자 이슈 목록 조회 함수
     * @param nationId 국가ID
     * @return 투자 이슈 목록 조회
     */
    private List<IssueColDto> getIssues(Long nationId){
        List<IssueColDto> issuesRes = new ArrayList<>();
        List<Issue> issues = issueRepository.findAllByNationIdOrderByIdDesc(nationId);

        for(int i = 0; i < issues.size() - 1; i++){
            IssueColDto col = new IssueColDto();

            int rate = 0;
            if(i < issues.size() - 2){
                rate = (int) ((issues.get(i).getAmount() - issues.get(i + 1).getAmount()) / issues.get(i + 1).getAmount()) * 100;
            }


            col.setContent(issues.get(i).getContent());
            col.setAmount(issues.get(i).getAmount());
            col.setDate(issues.get(i).getDate().format(Formatter.date));
            col.setRate(rate);
            issuesRes.add(col);
        }

        return issuesRes;
    }
}

