package com.ico.api.service.stock;

import com.ico.api.dto.stock.StockCreateReqDto;
import com.ico.api.dto.stock.StockListColDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author 변윤경
 */
public interface StockService {
    void createStock(HttpServletRequest request, StockCreateReqDto stockCreateReqDto);

    /**
     * 투자 종목 종류 조회
     * @param request
     * @return
     */
    List<StockListColDto> findAllStock(HttpServletRequest request);
}
