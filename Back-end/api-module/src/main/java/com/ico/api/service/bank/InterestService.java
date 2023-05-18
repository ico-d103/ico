package com.ico.api.service.bank;

import com.ico.api.dto.bank.InterestAllDto;
import com.ico.api.dto.bank.InterestStudentResDto;

import javax.servlet.http.HttpServletRequest;

/**
 * 국가의 이자율 Service
 *
 * @author 변윤경
 */
public interface InterestService {
    /**
     * 나의 이자율 조회
     *
     * @return 해당 장단기 이자율, 계좌 잔액
     */
    InterestStudentResDto myInterest(HttpServletRequest request);

    /**
     * 국가의 전체 이자율 조회
     *
     * @return 장기 이자율 리스트, 단기 이자율 리스트
     */
    InterestAllDto findAllInterest(HttpServletRequest request);

    /**
     * 이자율 수정
     *
     * @param dto 단기 이자율 값들, 장기 이자율 값들
     */
    void updateInterest(HttpServletRequest request, InterestAllDto dto);
}
