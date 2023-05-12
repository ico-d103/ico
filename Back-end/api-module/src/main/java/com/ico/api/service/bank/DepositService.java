package com.ico.api.service.bank;

import com.ico.api.dto.bank.DepositReqDto;

import javax.servlet.http.HttpServletRequest;

/**
 * 예금 Service
 *
 * @author 변윤경
 */
public interface DepositService {
    /**
     * 예금 신청
     * @param dto 예치 기간, 예치 금액
     */
    void createDeposit(HttpServletRequest request, DepositReqDto dto);

    /**
     * 예금 중도 해지, 수령
     */
    void deleteDeposit(HttpServletRequest request);
}
