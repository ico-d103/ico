package com.ico.api.service.treasury;

import com.ico.api.dto.treasuryHistory.TreasuryHistoryColDto;
import com.ico.api.dto.treasuryHistory.TreasuryHistoryDto;
import com.ico.api.dto.treasuryHistory.TreasuryHistoryTeacherColDto;
import com.ico.api.dto.treasuryHistory.TreasuryHistoryTeacherResDto;
import com.ico.api.util.Formatter;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.entity.Nation;
import com.ico.core.document.TreasuryHistory;
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
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
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

    @Override
    public TreasuryHistoryTeacherResDto findAllTreasuryHistory(int page, int size, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        // 페이지 번호 갯수
        // page 변수는 인덱스 값으로 적용
        int totalPageNumber = (int) (((treasuryHistoryRepository.countByNationId(nationId) - 1) / 10) + 1);
        if (page < 0) {
            log.info("[findAllTreasuryHistory] 1 미만의 페이지 번호를 넘겨받은 경우");
            page = 0;
        } else if (page >= totalPageNumber) {
            log.info("[findAllTreasuryHistory] 페이지 번호의 최댓값보다 큰 번호를 넘겨받은 경우");
            page = totalPageNumber - 1;
        }

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("_id").descending());
        Page<TreasuryHistory> treasuryHistoryList = treasuryHistoryRepository.findAllByNationId(nationId, pageRequest);
        List<TreasuryHistoryTeacherColDto> pageList = new ArrayList<>();
        for (TreasuryHistory treasuryHistory : treasuryHistoryList) {
            pageList.add(new TreasuryHistoryTeacherColDto()
                    .of(treasuryHistory, treasuryHistory.getDate().format(Formatter.date), Formatter.number.format(treasuryHistory.getAmount())));
        }

        return TreasuryHistoryTeacherResDto.builder()
                .size(totalPageNumber)
                .page(pageList)
                .build();
    }

    @Transactional
    @Override
    public void addTreasuryHistory(TreasuryHistoryDto dto, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

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
            String[] dateTime = treasuryHistory.getDate().format(Formatter.dateTime).split("-");

            String source = treasuryHistory.getSource() + " · " + dateTime[1];
            int balance = curTreasury;
            curTreasury += -1 * treasuryHistory.getAmount();
            String date = dateTime[0];

            map.putIfAbsent(date, new ArrayList<>());
            map.get(date).add(TreasuryHistoryColDto.builder()
                            .title(treasuryHistory.getTitle())
                            .amount(Formatter.number.format(treasuryHistory.getAmount()))
                            .source(source)
                            .balance(Formatter.number.format(balance))
                    .build());
        }

        return map;
    }

}
