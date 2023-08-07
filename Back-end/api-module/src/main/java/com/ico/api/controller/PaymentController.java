package com.ico.api.controller;

import com.ico.api.dto.payment.PaymentReqDto;
import com.ico.api.service.payment.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;


/**
 * 월급 관련 Controller
 *
 * @author 서재건
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService salaryService;

    /**
     * 선택한 학생들의 월급 일괄 지급
     *
     * @param dto
     * @param request
     * @return
     */
    @PostMapping("/teacher/salary")
    public ResponseEntity<HttpStatus> paySalary(@Valid @RequestBody PaymentReqDto dto, HttpServletRequest request) {
        salaryService.paySalary(dto, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
