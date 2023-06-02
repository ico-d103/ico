package com.ico.api.service.inflation;

import com.ico.api.dto.inflation.InflationResDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 분기별 거래 현황 Service
 *
 * @author 서재건
 */
public interface InflationService {

    /**
     * 해당 나라의 인플레이션 조회
     *
     * @param request
     * @return
     */
    List<InflationResDto> findInflation(HttpServletRequest request);
}
