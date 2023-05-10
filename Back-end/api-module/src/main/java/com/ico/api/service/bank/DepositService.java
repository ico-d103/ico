package com.ico.api.service.bank;

import com.ico.api.dto.bank.DepositReqDto;

public interface DepositService {
    /**
     * 예금 신청
     * @param dto 예치 기간, 예치 금액
     */
    void createDeposit(DepositReqDto dto);
}
