package com.ico.api.service.bank;

import com.ico.api.dto.bank.DepositProductResDto;
import com.ico.core.dto.DepositUpdatetDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 예금 상품 Service
 *
 * @author 변윤경
 */
public interface DepositProductService {

    /**
     * 나라의 전체 예금 상품 조회
     *
     * @param request
     * @return
     */
    List<DepositProductResDto> findAllDeposit(HttpServletRequest request);

    /**
     * 예금 상품 추가
     *
     * @param request
     * @param dto
     */
    void addDeposit(HttpServletRequest request, DepositProductDto dto);

    /**
     * 예금 상품 수정
     *
     * @param request
     * @param depositId
     * @param dto
     */
    void updateDeposit(HttpServletRequest request, Long depositId, DepositUpdatetDto dto);

    /**
     * 예금 상품 삭제
     *
     * @param depositId
     */
    void deleteDeposit(Long depositId);

}
