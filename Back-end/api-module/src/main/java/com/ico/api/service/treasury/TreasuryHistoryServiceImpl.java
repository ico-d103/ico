package com.ico.api.service.treasury;

import com.ico.api.dto.treasuryHistory.TreasuryHistoryColDto;
import com.ico.api.dto.treasuryHistory.TreasuryHistoryDto;
import com.ico.api.dto.treasuryHistory.TreasuryHistoryTeacherResDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.entity.Nation;
import com.ico.core.entity.TreasuryHistory;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.TreasuryHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.text.NumberFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

/**
 * 국고 사용 내역 관련 Service
 *
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TreasuryHistoryServiceImpl implements TreasuryHistoryService{

    private final TreasuryHistoryRepository treasuryHistoryRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final NationRepository nationRepository;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy.MM.dd-HH:mm");

    private static final NumberFormat numberFormat = NumberFormat.getInstance(Locale.US);

    @Override
    public List<TreasuryHistoryTeacherResDto> findAllTreasuryHistory(int page, int size, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("_id").descending());
        Page<TreasuryHistory> treasuryHistoryList = treasuryHistoryRepository.findAllByNationId(nationId, pageRequest);
        List<TreasuryHistoryTeacherResDto> dtoList = new ArrayList<>();
        for (TreasuryHistory treasuryHistory : treasuryHistoryList) {
            dtoList.add(new TreasuryHistoryTeacherResDto()
                    .of(treasuryHistory, treasuryHistory.getDate().format(formatter), numberFormat.format(treasuryHistory.getAmount())));
        }
        return dtoList;
    }

    @Transactional
    @Override
    public void addTreasuryHistory(TreasuryHistoryDto dto, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        if (nation.getTreasury() + dto.getAmount() < 0) {
            log.info("[addTreasuryHistory] 국고 잔액보다 사용하는 금액이 큰 경우");
            throw new CustomException(ErrorCode.LOW_BALANCE);
        }
        nation.setTreasury(nation.getTreasury() + dto.getAmount());
        nationRepository.save(nation);

        TreasuryHistory treasuryHistory = TreasuryHistory.builder()
                .nationId(nationId)
                .title(dto.getTitle())
                .source(dto.getSource())
                .amount(dto.getAmount())
                .build();
        treasuryHistoryRepository.insert(treasuryHistory);
    }

    @Override
    public Map<String, List<TreasuryHistoryColDto>> findTreasuryHistoryList(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        List<TreasuryHistory> treasuryHistories = treasuryHistoryRepository.findAllByNationIdOrderByIdDesc(nationId);

        Map<String, List<TreasuryHistoryColDto>> map = new LinkedHashMap<>();

        int curTreasury = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND))
                .getTreasury();

        for (TreasuryHistory treasuryHistory : treasuryHistories) {
            String[] dateTime = treasuryHistory.getDate().format(dateTimeFormatter).split("-");

            String source = treasuryHistory.getSource() + " · " + dateTime[1];
            int balance = curTreasury;
            curTreasury += -1 * treasuryHistory.getAmount();
            String date = dateTime[0];

            map.putIfAbsent(date, new ArrayList<>());
            map.get(date).add(TreasuryHistoryColDto.builder()
                            .title(treasuryHistory.getTitle())
                            .amount(numberFormat.format(treasuryHistory.getAmount()))
                            .source(source)
                            .balance(numberFormat.format(balance))
                    .build());
        }

        return map;
    }

}
