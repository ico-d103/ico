package com.ico.api.service.inflation;

import com.ico.api.dto.inflation.InflationResDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.api.util.Formatter;
import com.ico.core.document.Inflation;
import com.ico.core.repository.InflationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * 분기별 거래 현황 Service 로직
 *
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class InflationServiceImpl implements InflationService{

    private final JwtTokenProvider jwtTokenProvider;

    private final InflationRepository inflationRepository;

    @Override
    public List<InflationResDto> findInflation(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        List<Inflation> inflationList = inflationRepository.findAllByNationIdOrderByIdDesc(nationId);

        List<InflationResDto> dtoList = new ArrayList<>();
        for (Inflation inflation : inflationList) {
            dtoList.add(new InflationResDto().of(inflation, inflation.getDate().format(Formatter.date)));
        }
        return dtoList;
    }
}
