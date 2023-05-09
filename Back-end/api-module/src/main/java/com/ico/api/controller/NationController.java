package com.ico.api.controller;

import com.ico.api.dto.nation.NationReqDto;
import com.ico.core.dto.StockReqDto;
import com.ico.api.service.nation.NationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

/**
 * @author 강교철
 * @author 변윤경
 */
@RestController
@RequestMapping("/api/nation")
@RequiredArgsConstructor
public class NationController {

    private final NationService nationService;

    /**
     * 나라 생성
     * @param reqDto
     * @param request
     * @return OK
     */
    @PostMapping("/teacher")
    public ResponseEntity<?> createNation(@Valid @RequestBody NationReqDto reqDto, HttpServletRequest request) {
        return new ResponseEntity<>(nationService.createNation(reqDto, request), HttpStatus.OK);
    }

    /**
     * 나라 조회
     * @param request
     * @return Nation
     */
    @GetMapping("/teacher")
    public ResponseEntity<?> getNation(HttpServletRequest request) {

        return new ResponseEntity<>(nationService.getNation(request), HttpStatus.OK);
    }

    /**
     * 투자 종목 등록
     *
     * @param stockReqDto 주식 이름, 시작가격, 첫번재 이슈, 거래 시간
     * @return Httpstatus
     */
    @PostMapping("/teacher/stock")
    public ResponseEntity<HttpStatus> createStock(@Valid @RequestBody StockReqDto stockReqDto){
        nationService.createStock(stockReqDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
