package com.ico.api.controller;


import com.ico.api.service.stock.InvestService;
import com.ico.core.dto.InvestReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

/**
 * @author 변윤경
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/invest")
public class InvestController {

    private final InvestService investService;

    /**
     * 주식 매수
     *
     * @param dto 현재 지수, 매수 금액
     * @return Httpstatus
     */
    @PostMapping("/student")
    public ResponseEntity<HttpStatus> buyStock(HttpServletRequest request, @Valid @RequestBody InvestReqDto dto) {
        investService.buyStock(request, dto.getPrice(), dto.getAmount());
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 주식 매도
     *
     * @return Httpstatus
     */
    @DeleteMapping("/student")
    public ResponseEntity<HttpStatus> sellStock(HttpServletRequest request) {
        investService.sellStock(request);
        return ResponseEntity.ok(HttpStatus.OK);
    }


}

