package com.ico.api.service.nation;

import com.ico.api.dto.nation.NationCreditReqDto;
import com.ico.api.dto.nation.NationReqDto;
import com.ico.api.dto.nation.TradingTimeReqDto;
import com.ico.core.dto.StockReqDto;
import com.ico.core.entity.Nation;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author 강교철
 * @author 변윤경
 * @author 서재건
 */
public interface NationService {

    /**
     * request로 JwtTokenProvider의 parseJwt에서 token을 가져오고
     * role이 TEACHER일 때 Nation을 생성하고 교사 테이블의 Nation에
     * ID 을 넘겨 줄 것
     * @param reqDto
     * @param request
     */
    String createNation(NationReqDto reqDto, HttpServletRequest request);

    /**
     * 교사의 나라 조회
     * @param request
     * @return Nation
     */
    Nation getNation(HttpServletRequest request);

    /**
     * 교사가 자신이 생성한 나라 수정
     * @param reqDto
     * @param request
     * @return Nation
     */
    Nation updateNation(NationReqDto reqDto, HttpServletRequest request);

    /**
     * 투자 종목 등록
     * @param stockReqDto 종목 정보
     */
    public void createStock(HttpServletRequest request, StockReqDto stockReqDto);

    /**
     * 국고 잔금 조회
     *
     * @param request
     * @return
     */
    Map<String, String> findTreasury(HttpServletRequest request);

    /**
     * 신용점수 등락폭 수정
     *
     * @param dto
     * @param request
     */
    void updateCredit(NationCreditReqDto dto, HttpServletRequest request);

    /**
     * 거래 시간 변경
     *
     * @param request
     * @param dto 거래 시작 시간, 종료 시간
     */
    void updateTradingTime(HttpServletRequest request, TradingTimeReqDto dto);

    /**
     * 교사의 나라 삭제
     * @param request
     */
    void deleteNation(HttpServletRequest request);
}
