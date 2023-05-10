package com.ico.api.service.tax;

import com.ico.core.dto.TaxReqDto;
import com.ico.api.dto.tax.TaxResDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 국세 관련 Service
 *
 * @author 서재건
 */
public interface TaxService {

    /**
     * 국세 목록 조회
     *
     * @return
     */
    List<TaxResDto> findAllTax(HttpServletRequest request);

    /**
     * 국세 정보 수정
     *
     * @param taxId
     * @param dto
     */
    void updateTax(Long taxId, TaxReqDto dto);

    /**
     * 국세 정보 추가
     *
     * @param dto
     */
    void addTax(TaxReqDto dto, HttpServletRequest request);

    /**
     * 국세 정보 삭제
     *
     * @param taxId
     */
    void deleteTax(Long taxId);
}
