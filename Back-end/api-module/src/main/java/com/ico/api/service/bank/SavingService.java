package com.ico.api.service.bank;

import com.ico.api.dto.bank.DepositReqDto;

import javax.servlet.http.HttpServletRequest;

/**
 * 적금 Service
 *
 * @author 변윤경
 */
public interface SavingService {
    /**
     * 적금신청
     *
     * @param request
     * @param savingProductId
     */
    void createSaving(HttpServletRequest request, Long savingProductId);

    /**
     * 적금 중도 해지, 수령
     *
     * @param request
     * @param savingId
     */
    void deleteSaving(HttpServletRequest request, String savingId);

}
