package com.ico.api.service.treasury;

import com.ico.api.dto.treasuryHistory.TreasuryHistoryResDto;
import org.springframework.data.domain.Page;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 국고 사용 내역 관련 Service
 *
 * @author 서재건
 */
public interface TreasuryHistoryService {

    /**
     * 국고 사용 내역 목록 조회
     *
     * @param request
     * @return
     */
    Page<TreasuryHistoryResDto> findAllTreasuryHistory(int page, int size, HttpServletRequest request);
}
