package com.ico.api.controller;

import com.ico.api.dto.stock.StockCreateReqDto;
import com.ico.api.dto.stock.StockFindAllStudentResDto;
import com.ico.api.dto.stock.StockListColDto;
import com.ico.api.dto.stock.StockUpdateReqDto;
import com.ico.api.service.stock.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

/**
 *
 * @author 변윤경
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stock")
public class StockController {

    private final StockService stockService;

    /**
     * 교사의 투자 종목 등록
     * @param request
     * @param stockCreateReqDto
     * @return
     */
    @PostMapping("/teacher")
    public ResponseEntity<HttpStatus> createStock(HttpServletRequest request, @Valid @RequestBody StockCreateReqDto stockCreateReqDto){
        stockService.createStock(request, stockCreateReqDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 교사의 투자 종목 목록 조회
     *
     * @param request
     * @return
     */
    @GetMapping("/teacher")
    public ResponseEntity<List<StockListColDto>> findAllStock(HttpServletRequest request){
        return ResponseEntity.ok(stockService.findAllStock(request));
    }

    /**
     * 학생의 투자 종목 목록 조회
     *
     * @param request
     * @return
     */
    @GetMapping("/student")
    public ResponseEntity<StockFindAllStudentResDto> findAllStockStudent(HttpServletRequest request){
        return ResponseEntity.ok(stockService.findAllStockStudent(request));
    }

    /**
     * 투자 종목 수정
     *
     * @param request
     * @param stockId
     * @param stockUpdateReqDto
     * @return
     */
    @PutMapping("/teacher/{stockId}")
    public ResponseEntity<HttpStatus> updateStock(HttpServletRequest request, @PathVariable Long stockId, @Valid @RequestBody StockUpdateReqDto stockUpdateReqDto){
        stockService.updateStock(request, stockId, stockUpdateReqDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     *  투자 종목 삭제
     *
     * @param request
     * @param stockId
     * @return
     */
    @DeleteMapping("/teacher/{stockId}")
    public ResponseEntity<HttpStatus> deleteStock(HttpServletRequest request, @PathVariable Long stockId) {
        stockService.deleteStock(request, stockId);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
