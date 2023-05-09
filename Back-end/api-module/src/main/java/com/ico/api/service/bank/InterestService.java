package com.ico.api.service.bank;

import com.ico.api.dto.bank.AllInterestResDto;
import com.ico.api.dto.bank.MyInterestResDto;

/**
 * @author 변윤경
 */
public interface InterestService {
    /**
     * 나의 이자율 조회
     * @return 해당 장단기 이자율, 계좌 잔액
     */
    MyInterestResDto myInterest();

    /**
     * 국가의 전체 이자율 조회
     *
     * @return 장기 이자율 리스트, 단기 이자율 리스트
     */
    AllInterestResDto findAllInterest();
}
