package com.ico.api.controller;

import com.ico.core.dto.TaxReqDto;
import com.ico.api.dto.tax.TaxResDto;
import com.ico.api.service.tax.TaxService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public ResponseEntity<List<TaxResDto>> findAllTax(HttpServletRequest request) {
        return ResponseEntity.ok(taxService.findAllTax(request));
    }

    /**
     * 국세 정보 수정
     *
     * @param taxId
     * @param dto
     * @return
     */
    @PutMapping("/teacher/{taxId}")
    public ResponseEntity<HttpStatus> updateTax(@PathVariable Long taxId, @Valid @RequestBody TaxReqDto dto) {
        taxService.updateTax(taxId, dto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 국세 정보 추가
     *
     * @param dto
     * @param request
     * @return
     */
    @PostMapping("/teacher")
    public ResponseEntity<HttpStatus> addTax(@Valid @RequestBody TaxReqDto dto, HttpServletRequest request) {
        taxService.addTax(dto, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 국세 정보 삭제
     *
     * @param taxId
     * @return
     */
    @DeleteMapping("/teacher/{taxId}")
    public ResponseEntity<HttpStatus> deleteTax(@PathVariable Long taxId) {
        taxService.deleteTax(taxId);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
