package com.ico.api.controller;

import com.ico.api.dto.tax.TaxResDto;
import com.ico.api.service.tax.TaxService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 국세 관련 Controller
 *
 * @author 서재건
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tax")
public class TaxController {

    private final TaxService taxService;

    /**
     * 국세 목록 조회
     *
     * @return
     */
    @GetMapping
    public ResponseEntity<List<TaxResDto>> findAllTax() {
        return ResponseEntity.ok(taxService.findAllTax());
    }
}
