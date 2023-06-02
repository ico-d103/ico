package com.ico.api.controller;

import com.ico.api.dto.bank.DepositProductDto;
import com.ico.api.service.bank.DepositProductService;
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
import java.util.List;

/**
 * 예금 상품 Controller
 *
 * @author 변윤경
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/deposit-product")
public class DepositProductController {
    private final DepositProductService depositProductService;


    /**
     * 전체 예금 상품 목록 조회
     *
     * @param request
     * @return
     */
    @GetMapping("/all")
    public ResponseEntity<List<DepositProductDto>> findAllDeposit(HttpServletRequest request){
        return ResponseEntity.ok(depositProductService.findAllDeposit(request));
    }

    /**
     * 예금 상품 추가
     *
     * @param request
     * @param deposit
     * @return
     */
    @PostMapping("/teacher")
    public ResponseEntity<HttpStatus> addDeposit(HttpServletRequest request, @RequestBody DepositProductDto deposit){
        depositProductService.addDeposit(request, deposit);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 예금 상품 수정
     *
     * @param request
     * @param deposit
     * @param depositProductId
     * @return
     */
    @PutMapping("/teacher/{depositProductId}")
    public ResponseEntity<HttpStatus> updateDeposit(HttpServletRequest request, @RequestBody DepositProductDto deposit, @PathVariable Long depositProductId){
        depositProductService.updateDeposit(request, depositProductId, deposit);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 예금 상품 삭제
     *
     * @param depositProductId
     * @return
     */
    @DeleteMapping("/teacher/{depositProductId}")
    public ResponseEntity<HttpStatus> deleteDeposit(@PathVariable Long depositProductId){
        depositProductService.deleteDeposit(depositProductId);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
