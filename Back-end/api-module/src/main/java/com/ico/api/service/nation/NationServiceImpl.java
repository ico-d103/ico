package com.ico.api.service.nation;

import com.ico.api.dto.nation.NationCreditReqDto;
import com.ico.api.dto.nation.NationReqDto;
import com.ico.api.dto.nation.TradingTimeReqDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.code.Role;
import com.ico.core.dto.StockReqDto;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Stock;
import com.ico.core.entity.Teacher;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StockRepository;
import com.ico.core.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

/**
 * 나라 관련 Service
 *
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class NationServiceImpl implements NationService {

    private final NationRepository nationRepository;
    private final TeacherRepository teacherRepository;
    private final StockRepository stockRepository;
    private final JwtTokenProvider jwtTokenProvider;

    private static final NumberFormat numberFormat = NumberFormat.getInstance(Locale.US);

    @Override
    @Transactional
    public String createNation(NationReqDto reqDto, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Role role = jwtTokenProvider.getRole(token);

        // 교사만 반 생성
        if (role == Role.TEACHER) {
            String title = reqDto.getTitle();
            if (!nationRepository.findByTitle(title).isPresent()) {
                Nation nation = Nation.builder()
                        .school(reqDto.getSchool())
                        .grade((byte) reqDto.getGrade())
                        .room((byte) reqDto.getRoom())
                        .title(title)
                        .code(randomCode())
                        .currency(reqDto.getCurrency())
                        .treasury(0)
                        .credit_up((byte) 20)
                        .credit_down((byte) 50)
                        .build();
                nationRepository.save(nation);

                // 반을 생성했을 때 교사 테이블의 Nation 업데이트
                Long id = jwtTokenProvider.getId(token);
                Optional<Teacher> teacher = teacherRepository.findById(id);
                teacher.ifPresent(t -> {
                    t.setNation(nation);
                    teacherRepository.save(t);
                });
                // 반을 생성했을 때 교사의 토큰 업데이트 / 학생은 직접 확인 버튼을 눌러서 도메인/api/token 으로 직접 요청해야한다.
                return jwtTokenProvider.updateTokenCookie(request);
            } else {
                throw new CustomException(ErrorCode.DUPLICATED_NATION_NAME);
            }
        } else {
            throw new CustomException(ErrorCode.WRONG_ROLE);
        }
    }

    /**
     * 반 생성시 입장 코드 난수로 생성
     *
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

//    @Override
//    public Nation updateNation(NationReqDto reqDto, HttpServletRequest request) {
    // TODO : 나라 수정 때 사용할 것
//        String token = jwtTokenProvider.parseJwt(request);
//        Long id = jwtTokenProvider.getId(token);
//
//        if (id != null) {
//            Long nationId = teacherRepository.findById(id).get().getNation().getId();
//            Nation nation = nationRepository.findById(nationId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NATION));
//            nation.setSchool(reqDto.getSchool());
//            nation.setGrade((byte) reqDto.getGrade());
//            nation.setRoom((byte) reqDto.getRoom());
//            nation.setTitle(reqDto.getTitle());
//            nation.setCurrency(reqDto.getCurrency());
//            nation.setTrading_start(reqDto.getTrading_start());
//            nation.setTrading_end(reqDto.getTrading_end());
//            nationRepository.save(nation);
//            return nation;
//        }
//        else {
//            throw new CustomException(ErrorCode.NOT_FOUND_NATION);
//        }
//    }


    /**
     * 투자 종목 등록
     *
     * @param stockReqDto 종목 정보
     */
    @Transactional
    @Override
    public void createStock(StockReqDto stockReqDto) {
        Long nationId = 99L;
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
        map.put("treasury", numberFormat.format(nation.getTreasury()));
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
     * 투자 가능 시간 수정
     *
     * @param dto
     */
    @Override
    public void updateTradingTime(TradingTimeReqDto dto) {
        long nationId = 99;
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        nation.setTrading_start(dto.getTradingStart());
        nation.setTrading_end(dto.getTradingEnd());
        nationRepository.save(nation);
    }

}
