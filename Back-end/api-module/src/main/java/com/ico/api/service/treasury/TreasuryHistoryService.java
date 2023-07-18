package com.ico.api.service.treasury;

import com.ico.api.dto.treasuryHistory.TreasuryHistoryColDto;
import com.ico.api.dto.treasuryHistory.TreasuryHistoryDto;
import com.ico.api.dto.treasuryHistory.TreasuryHistoryTeacherResDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 국고 사용 내역 관련 Service
 *
 * @author 서재건
 */
public interface TreasuryHistoryService {

    /**
     * 교사용 국고 사용 내역 목록 조회
     *
     * @param request
     * @return
     */
    TreasuryHistoryTeacherResDto findAllTreasuryHistory(int page, HttpServletRequest request);

    /**
     * 국고 사용 내역 입력
     *
     * @param dto
     */
    void addTreasuryHistory(TreasuryHistoryDto dto, HttpServletRequest request);

    /**
     * 학생용 국고 사용 내역 목록 조회
     *
     * @param request
     * @return
     */
    Map<String, List<TreasuryHistoryColDto>> findTreasuryHistoryList(HttpServletRequest request);

    /**
     * 국고 내역을 삭제하고 내역의 금액을 반환한다.
     *
     * @param treasuryHistoryId
     * @param request
     */
    void deleteTreasuryHistory(String treasuryHistoryId, HttpServletRequest request);
}
