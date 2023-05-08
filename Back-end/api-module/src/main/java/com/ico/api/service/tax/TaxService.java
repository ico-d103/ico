package com.ico.api.service.tax;

import com.ico.api.dto.tax.TaxResDto;

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
    List<TaxResDto> findAllTax();

}
