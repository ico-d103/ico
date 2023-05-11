package com.ico.api.controller;

import com.ico.api.dto.nation.NationCreditReqDto;
import com.ico.api.dto.nation.NationReqDto;
import com.ico.core.dto.StockReqDto;
import com.ico.api.service.nation.NationService;
import com.ico.core.entity.Nation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<HttpStatus> createStock(@Valid @RequestBody StockReqDto stockReqDto){
        nationService.createStock(stockReqDto);
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
}
