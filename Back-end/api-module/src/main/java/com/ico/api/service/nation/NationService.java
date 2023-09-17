package com.ico.api.service.nation;

import com.ico.api.dto.nation.NationCreditReqDto;
import com.ico.api.dto.nation.NationReqDto;
import com.ico.api.dto.nation.PaydayReqDto;
import com.ico.api.dto.nation.PaydayResDto;
import com.ico.api.dto.nation.TradingTimeReqDto;
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
     * ID 를 넘겨 줄 것
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

    /**
     * 나라의 월급일 지정
     * @param request
     * @param dto
     */
    void addPayday(HttpServletRequest request, PaydayReqDto dto);

    /**
     * 나라의 월급일 조회
     *
     * @param request
     * @return
     */
    PaydayResDto getPayday(HttpServletRequest request);

    /**
     * 나라의 월급일 삭제
     * @param request
     * @param date
     */
    void deletePayday(HttpServletRequest request, Byte date);
}
