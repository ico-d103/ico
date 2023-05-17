package com.ico.api.controller;

import com.ico.api.dto.nation.NationCreditReqDto;
import com.ico.api.dto.nation.NationReqDto;
import com.ico.api.dto.nation.TradingTimeReqDto;
import com.ico.api.service.nation.NationService;
import com.ico.core.dto.StockReqDto;
import com.ico.core.entity.Nation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Map;

/**
 * @author 강교철
 * @author 변윤경
 * @author 서재건
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
    @GetMapping
    public ResponseEntity<Nation> getNation(HttpServletRequest request) {
        return ResponseEntity.ok(nationService.getNation(request));
    }

    /**
     * 투자 종목 등록
     *
     * @param stockReqDto 주식 이름, 시작가격, 첫번재 이슈, 거래 시간
     * @return Httpstatus
     */
    @PostMapping("/teacher/stock")
    public ResponseEntity<HttpStatus> createStock(HttpServletRequest request, @Valid @RequestBody StockReqDto stockReqDto){
        nationService.createStock(request, stockReqDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 국고 잔금 조회
     *
     * @param request
     * @return
     */
    @GetMapping("/treasury")
    public ResponseEntity<Map<String, String>> findTreasury(HttpServletRequest request) {
        return ResponseEntity.ok(nationService.findTreasury(request));
    }

    /**
     * 신용점수 등락폭 수정
     *
     * @param dto
     * @param request
     * @return
     */
    @PutMapping("/teacher/credit")
    public ResponseEntity<HttpStatus> updateCredit(@Valid @RequestBody NationCreditReqDto dto, HttpServletRequest request) {
        nationService.updateCredit(dto, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 투자 거래 시간 수정
     *
     * @param dto 거래 시작 시간, 거래 종료 시간
     * @return Httpstatus
     */
    @PutMapping("/teacher/trading-time")
    public ResponseEntity<HttpStatus> updateTradingTime(HttpServletRequest request, @Valid @RequestBody TradingTimeReqDto dto){
        nationService.updateTradingTime(request, dto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 교사가 자신이 생성한 나라 수정
     * @param reqDto
     * @param request
     * @return Nation
     */
    @PutMapping("/teacher")
    public ResponseEntity<Nation> updateNation(@Valid @RequestBody NationReqDto reqDto, HttpServletRequest request) {
        return ResponseEntity.ok(nationService.updateNation(reqDto, request));
    }

    /**
     * 교사의 나라 삭제
     * @param request
     * @return
     */
    @DeleteMapping("/teacher")
    public ResponseEntity<HttpStatus> deleteNation(HttpServletRequest request) {
        nationService.deleteNation(request);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
