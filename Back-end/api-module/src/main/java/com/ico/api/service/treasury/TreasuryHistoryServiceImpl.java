package com.ico.api.service.treasury;

import com.ico.api.dto.treasuryHistory.TreasuryHistoryResDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.entity.TreasuryHistory;
import com.ico.core.repository.TreasuryHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.text.NumberFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

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

    public static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

    private static final NumberFormat numberFormat = NumberFormat.getInstance(Locale.US);

    @Override
    public Page<TreasuryHistoryResDto> findAllTreasuryHistory(int page, int size, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("_id").descending());
        Page<TreasuryHistory> treasuryHistoryList = treasuryHistoryRepository.findAllByNationId(nationId, pageRequest);
        List<TreasuryHistoryResDto> dtoList = new ArrayList<>();
        for (TreasuryHistory treasuryHistory : treasuryHistoryList) {
            dtoList.add(new TreasuryHistoryResDto());
        }


        return null;
    }
}
