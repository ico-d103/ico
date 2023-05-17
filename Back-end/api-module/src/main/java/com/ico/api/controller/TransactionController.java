package com.ico.api.controller;

import com.ico.api.dto.transaction.TransactionResDto;
import com.ico.api.service.transaction.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 거래내역을 관련 Controller
 *
 * @author 변윤경
 * @author 서재건
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transaction")
public class TransactionController {

    private final TransactionService transactionService;

    /**
     * 학생 입출금 내역 조회
     *
     * @return
     */
    @GetMapping("/student")
    public ResponseEntity<Map<String, List<TransactionResDto>>> findTransaction(HttpServletRequest request) {
        return ResponseEntity.ok(transactionService.findTransaction(request));
    }

}
