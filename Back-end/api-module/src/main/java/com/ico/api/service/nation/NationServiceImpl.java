package com.ico.api.service.nation;

import com.ico.api.dto.nation.NationCreditReqDto;
import com.ico.api.dto.nation.NationReqDto;
import com.ico.api.dto.nation.TradingTimeReqDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.api.util.Formatter;
import com.ico.core.code.Role;
import com.ico.core.code.Status;
import com.ico.core.code.TaxType;
import com.ico.core.data.Default_interest;
import com.ico.core.data.Default_job;
import com.ico.core.data.Default_rule;
import com.ico.core.data.Default_tax;
import com.ico.core.dto.StockReqDto;
import com.ico.core.document.DefaultNation;
import com.ico.core.entity.Immigration;
import com.ico.core.entity.Interest;
import com.ico.core.entity.Invest;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Rule;
import com.ico.core.entity.Stock;
import com.ico.core.entity.Student;
import com.ico.core.entity.StudentJob;
import com.ico.core.entity.StudentProduct;
import com.ico.core.entity.Tax;
import com.ico.core.entity.Teacher;
import com.ico.core.entity.TeacherProduct;
import com.ico.core.document.TreasuryHistory;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.DefaultNationRepository;
import com.ico.core.repository.ImmigrationRepository;
import com.ico.core.repository.InterestRepository;
import com.ico.core.repository.InvestRepository;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.RuleRepository;
import com.ico.core.repository.StockRepository;
import com.ico.core.repository.StudentJobRepository;
import com.ico.core.repository.StudentProductRepository;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TaxRepository;
import com.ico.core.repository.TeacherProductRepository;
import com.ico.core.repository.TeacherRepository;
import com.ico.core.repository.TreasuryHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

/**
 * 나라 관련 Service
 *
 * @author 강교철
 * @author 변윤경
 * @author 서재건
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class NationServiceImpl implements NationService {
    private final InterestRepository interestRepository;
    private final RuleRepository ruleRepository;
    private final StudentJobRepository studentJobRepository;
    private final StudentProductRepository studentProductRepository;
    private final TeacherProductRepository teacherProductRepository;
    private final ImmigrationRepository immigrationRepository;
    private final TaxRepository taxRepository;
    private final InvestRepository investRepository;
    private final TreasuryHistoryRepository treasuryHistoryRepository;
    private final NationRepository nationRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final StockRepository stockRepository;
    private final JwtTokenProvider jwtTokenProvider;

    private final DefaultNationRepository defaultNationRepository;

    @Override
    @Transactional
    public String createNation(NationReqDto reqDto, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Role role = jwtTokenProvider.getRole(token);

        // 교사만 반 생성
        if (role == Role.TEACHER) {
            String title = reqDto.getTitle();
            // 나라 이름 중복
            if (nationRepository.findByTitle(title).isEmpty()) {
                Long teacherId = jwtTokenProvider.getId(token);
                Teacher teacher = teacherRepository.findById(teacherId)
                        .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
                // 교사 인증 여부
                if (teacher.getStatus().equals(Status.APPROVED)){
                    // 교사가 만든 나라의 여부
                    if (teacher.getNation() == null) {
                        Nation nation = Nation.builder()
                                .school(reqDto.getSchool())
                                .grade((byte) reqDto.getGrade())
                                .room((byte) reqDto.getRoom())
                                .title(title)
                                .code(randomCode())
                                .currency(reqDto.getCurrency())
                                .treasury(0)
                                .credit_up((byte) 50)
                                .credit_down((byte) 20)
                                .build();
                        nationRepository.save(nation);

                        // 반을 생성했을 때 교사 테이블의 Nation 업데이트
                        teacher.setNation(nation);
                        teacherRepository.save(teacher);

                        // 나라의 기본 데이터 생성
                        createDefaultData(nation);
                        // 반을 생성했을 때 교사의 토큰 업데이트 / 학생은 직접 확인 버튼을 눌러서 도메인/api/token 으로 직접 요청해야한다.
                        return jwtTokenProvider.updateTokenCookie(request);
                    }
                    else {
                        throw new CustomException(ErrorCode.EXIST_TEACHER_NATION);
                    }
                }
                else {
                    throw new CustomException(ErrorCode.NOT_FOUND_TEACHER_CERTIFICATION);
                }
            }
            else {
                throw new CustomException(ErrorCode.DUPLICATED_NATION_NAME);
            }
        } else {
            throw new CustomException(ErrorCode.WRONG_ROLE);
        }
    }

    /**
     * 반 생성시 입장 코드 난수로 생성
     * @return code
     */
    private String randomCode() {

        // 5자리의 난수 코드 생성
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 5; i++) {
            int digit = random.nextInt(characters.length());
            codeBuilder.append(characters.charAt(digit));
        }
        String code = codeBuilder.toString();

        // 생성한 코드가 이미 Nation 테이블에 있는지 확인 
        Optional<Nation> nationCode = nationRepository.findByCode(code);
        if (nationCode.isPresent()) {
            // 코드 다시 생성
            return randomCode();
        }
        // 코드 반환
        return code;
    }

    @Override
    public Nation getNation(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        log.info("[getNation token] : {}", token);
        Long nationId = jwtTokenProvider.getNation(token);
        log.info("[getNation nationId] : {}", nationId);

        if (nationId != null) {
            Nation nation = nationRepository.findById(nationId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NATION));
            log.info("[getNation] nation 존재");
            return nation;
        } else {
            log.info("[getNation] nationId가 null입니다.");
            throw new CustomException(ErrorCode.NOT_FOUND_NATION);
        }

    }

    @Override
    public Nation updateNation(NationReqDto reqDto, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NATION));
        nation.setSchool(reqDto.getSchool());
        nation.setGrade((byte) reqDto.getGrade());
        nation.setRoom((byte) reqDto.getRoom());
        nation.setCurrency(reqDto.getCurrency());
        String title = reqDto.getTitle();
        // 나라 이름이 같지 않거나 현재 나라이름 일때만 수정 가능
        if (nationRepository.findByTitle(title).isEmpty() || title.equals(nation.getTitle())) {
            nation.setTitle(title);
        } else {
            throw new CustomException(ErrorCode.DUPLICATED_NATION_NAME);
        }
        nationRepository.save(nation);
        return nation;
    }


    /**
     * 투자 종목 등록
     *
     * @param stockReqDto 종목 정보
     */
    @Transactional
    @Override
    public void createStock(HttpServletRequest request, StockReqDto stockReqDto) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NATION));

        // 이미 주식 존재 여부 확인
        if (nation.getStock() == null || nation.getStock().equals("")) {
            // Nation에 주식 정보 업데이트
            nation.updateStock(stockReqDto);
            nationRepository.save(nation);

            // 주식 가격, 이슈 등록
            Stock stock = Stock.builder()
                    .nation(nation)
                    .amount(stockReqDto.getAmount())
                    .content(stockReqDto.getContent())
                    .date(LocalDateTime.now())
                    .build();
            stockRepository.save(stock);
        } else {
            throw new CustomException(ErrorCode.ALREADY_EXIST_STOCK);
        }
    }

    @Override
    public Map<String, String> findTreasury(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));
        Map<String, String> map = new HashMap<>();
        map.put("treasury", Formatter.number.format(nation.getTreasury()));
        return map;
    }

    @Override
    public void updateCredit(NationCreditReqDto dto, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));
        nation.updateCredit(dto.getCreditUp(), dto.getCreditDown());
        nationRepository.save(nation);
    }

    /**
     * 거래 시간 변경
     *
     * @param request
     * @param dto 거래 시작 시간, 종료 시간
     */
    @Override
    public void updateTradingTime(HttpServletRequest request, TradingTimeReqDto dto) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        nation.setTrading_start(dto.getTradingStart());
        nation.setTrading_end(dto.getTradingEnd());
        nationRepository.save(nation);
    }

    /**
     * 나라 생성 후 기본 데이터 추가
     *
     * @param nation
     */
    private void createDefaultData(Nation nation) {
        // 나라 생성 시 사용하는 기본 데이터 Document
        DefaultNation defaultNation = defaultNationRepository.findById("1")
                .orElseThrow(() -> {
                    log.info("[createDefaultData] _id 값에서 1이 존재하지 않는 에러 발생, default_nation 확인 필요");
                    throw new CustomException(ErrorCode.CHECK_DB);
                });
        // 세금
        List<Default_tax> taxList = defaultNation.getDefault_taxes();
        for (Default_tax data : taxList) {
            Tax tax = Tax.builder()
                    .nation(nation)
                    .title(data.getTitle())
                    .detail(data.getDetail())
                    .amount(data.getAmount())
                    .type(TaxType.valueOf(data.getType()))
                    .build();
            taxRepository.save(tax);
        }
        // 예금 이자율
        List<Default_interest> interestList = defaultNation.getDefault_interests();
        for (Default_interest data : interestList) {
            Interest interest = Interest.builder()
                    .nation(nation)
                    .creditRating((byte) data.getCredit_rating())
                    .shortPeriod((byte) data.getShort_period())
                    .longPeriod((byte) data.getLong_period())
                    .build();
            interestRepository.save(interest);
        }
        // 직업
        List<Default_job> studentJobList = defaultNation.getDefault_jobs();
        for (Default_job data : studentJobList) {
            StudentJob job = StudentJob.builder()
                    .nation(nation)
                    .title(data.getTitle())
                    .detail(data.getDetail())
                    .image(data.getImage())
                    .wage(data.getWage())
                    .creditRating((byte) data.getCredit_rating())
                    .count((byte) data.getCount())
                    .total((byte) data.getTotal())
                    .color(data.getColor())
                    .studentNames("")
                    .build();
            studentJobRepository.save(job);
        }
        // 학급규칙
        List<Default_rule> ruleList = defaultNation.getDefault_rules();
        for (Default_rule data : ruleList) {
            Rule rule = Rule.builder()
                    .nation(nation)
                    .title(data.getTitle())
                    .detail(data.getDetail())
                    .build();
            ruleRepository.save(rule);
        }
    }

    @Override
    @Transactional
    public void deleteNation(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);

        Long nationId = jwtTokenProvider.getNation(token);
        if (nationId == null) {
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);
        }
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        // Teacher
        Teacher teacher = teacherRepository.findByNationId(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        teacher.setNation(null);
        teacherRepository.save(teacher);

        // Student
        List<Student> students = studentRepository.findAllByNationId(nationId);
        for (Student student : students) {
            student.setNation(null);
            studentRepository.save(student);
        }

        // Immigration
        List<Immigration> immigrations = immigrationRepository.findAllByNationId(nationId);
        if (!immigrations.isEmpty()) {
            immigrationRepository.deleteAll(immigrations);
        }

        // Rule
        List<Rule> rules = ruleRepository.findAllByNationId(nationId);
        if (!rules.isEmpty()) {
            ruleRepository.deleteAll(rules);
        }

        // Stock
        List<Stock> stocks = stockRepository.findAllByNationId(nationId);
        if (!stocks.isEmpty()) {
            stockRepository.deleteAll(stocks);
        }

        // StudentJob
        List<StudentJob> jobs = studentJobRepository.findAllByNationId(nationId);
        if (!jobs.isEmpty()) {
            studentJobRepository.deleteAll(jobs);
        }

        // StudentProduct
        List<StudentProduct> studentProducts = studentProductRepository.findAllByNationId(nationId);
        if (!studentProducts.isEmpty()) {
            studentProductRepository.deleteAll(studentProducts);
        }

        // Tax
        List<Tax> taxes = taxRepository.findAllByNationId(nationId);
        if (!taxes.isEmpty()) {
            taxRepository.deleteAll(taxes);
        }

        // TeacherProduct
        List<TeacherProduct> teacherProducts = teacherProductRepository.findAllByNationId(nationId);
        if (!teacherProducts.isEmpty()) {
            teacherProductRepository.deleteAll(teacherProducts);
        }

        // Invest
        List<Invest> invests = investRepository.findAllByNationId(nationId);
        if (!invests.isEmpty()) {
            investRepository.deleteAll(invests);
        }

        // Interest
        List<Interest> interests = interestRepository.findAllByNationId(nationId);
        if (!interests.isEmpty()) {
            interestRepository.deleteAll(interests);
        }

        // TreasuryHistory(MongoDB)
        List<TreasuryHistory> treasuryHistories = treasuryHistoryRepository.findAllByNationId(nationId);
        if (!treasuryHistories.isEmpty()) {
            treasuryHistoryRepository.deleteAll(treasuryHistories);
        }

        // 연관관계 매핑을 모두 끊고 마지막에 삭제
        nationRepository.delete(nation);
    }
}
