package com.ico.api.service.stock;

import com.ico.api.dto.stock.StockCreateReqDto;
import com.ico.api.dto.stock.StockListColDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author 변윤경
 */
public interface StockService {

    /**
     * 투자 종목 생성
     * @param request
     * @param stockCreateReqDto
     */
    void createStock(HttpServletRequest request, StockCreateReqDto stockCreateReqDto);

    /**
     * 투자 종목 종류 조회
     * @param request
     * @return
     */
    List<StockListColDto> findAllStock(HttpServletRequest request);

    /**
     * 투자 종목 삭제
     * @param request
     * @param stockId
     */
    void deleteStock(HttpServletRequest request, Long stockId);
}
