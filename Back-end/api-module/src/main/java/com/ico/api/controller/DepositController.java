package com.ico.api.controller;

import com.ico.api.dto.bank.DepositReqDto;
import com.ico.api.service.bank.DepositService;
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
 * 예금 신청/조회/해지
 *
 * @author 변윤경
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/deposit")
public class DepositController {
    private final DepositService depositService;

    /**
     * 예금 신청
     *
     * @param dto 예금 기간, 예치 금액
     * @return Httpstatus
     */
    @PostMapping("/student")
    public ResponseEntity<HttpStatus> createDeposit(HttpServletRequest request, @Valid @RequestBody DepositReqDto dto){
        depositService.createDeposit(request, dto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 예금 중도 해지, 수령
     *
     * @return Httpstatus
     */
    @DeleteMapping("/student")
    public ResponseEntity<HttpStatus> deleteDeposit(HttpServletRequest request){
        depositService.deleteDeposit(request);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
